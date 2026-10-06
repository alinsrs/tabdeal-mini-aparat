export interface VideoDetails {
    id: string;
    uid: string;
    title: string;
    description: string;
    thumbnail: string;
    createDate: string;
    iframe: string;
    channelName: string;
    channelLogo: string;
    channelSubscribersCount: string;
    likesCount: number;
    visitCount: number;
    tags: string[];
}

const FALLBACK_CHANNEL_LOGO =
    'https://static.cdn.asset.aparat.com/profile-photo/8459674-897089-m.jpg';

function resolveThumbnailUrl(posterUrl: string): string {
    if (!posterUrl) return '';
    let url = posterUrl.startsWith('//') ? `https:${posterUrl}` : posterUrl;
    if (url.includes('-b__')) {
        url = url.replace('-b__', '-l__');
    }
    return url;
}

export const useVideoDetails = (uid: MaybeRefOrGetter<string>) => {
    const videoUid = toRef(uid);

    const { data, status, error, refresh } = useFetch<{ video: VideoDetails }>(
        () => `/aparat-v1/video/video/show/videohash/${videoUid.value}`,
        {
            key: computed(() => `video-details-${videoUid.value}`),
            transform: (response: any) => {
                const parsed = typeof response === 'string' ? JSON.parse(response) : response;
                const attr = parsed?.data?.attributes || {};

                const channelObj = parsed?.included?.find((item: any) => item.type === 'channel') || {};
                const channelAttr = channelObj.attributes || {};

                const likesCount = Number(
                    attr.like_cnt_non_formatted ??
                    attr.like_cnt ??
                    attr.like?.cnt ??
                    0
                );

                const visitCount = Number(
                    attr.visit_cnt_non_formatted ??
                    attr.visit_cnt_int ??
                    attr.visit_cnt ??
                    0
                );

                const rawTags = Array.isArray(attr.tags) ? attr.tags : [];
                const tags = rawTags
                    .map((t: any) => (typeof t === 'string' ? t : t?.name || t?.title || ''))
                    .filter((t: string) => Boolean(t && t.trim()));

                const frameSrc =
                    attr.frame ||
                    `https://www.aparat.com/video/video/embed/videohash/${videoUid.value}/vt/frame`;

                const iframe =
                    attr.iframe ||
                    `<iframe src="${frameSrc}" class="w-full h-full border-0 rounded-2xl" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

                const video: VideoDetails = {
                    id: String(parsed?.data?.id || attr.uid || ''),
                    uid: attr.uid || videoUid.value,
                    title: attr.title || '',
                    description: attr.description || '',
                    thumbnail: resolveThumbnailUrl(attr.big_poster || attr.medium_poster || attr.poster || ''),
                    createDate: attr.sdate || attr.date_exact || '',
                    iframe,
                    channelName: channelAttr.name || channelAttr.displayName || attr.sender_name || 'صرافی تبدیل',
                    channelLogo: channelAttr.avatar || attr.profilePhoto || FALLBACK_CHANNEL_LOGO,
                    channelSubscribersCount: channelAttr.follower_cnt || '۰',
                    likesCount,
                    visitCount,
                    tags,
                };

                return { video };
            },
        }
    );

    return {
        video: computed(() => data.value?.video || null),
        isLoading: computed(() => status.value === 'pending'),
        error,
        refresh,
    };
};