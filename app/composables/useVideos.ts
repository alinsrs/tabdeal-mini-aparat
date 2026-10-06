export interface NormalizedVideo {
    id: string;
    uid: string;
    title: string;
    duration: number | string;
    visitCount: number | string;
    thumbnail: string;
    createDate: string;
    channelName: string;
    channelLogo: string;
}

export interface VideoPagination {
    currentPage: number;
    perPage: number;
    totalItems: number | null;
    totalPages: number;
    hasNext: boolean;
}

export interface VideoListResult {
    items: NormalizedVideo[];
    pagination: VideoPagination;
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

export const useVideos = () => {
    const config = useRuntimeConfig();
    const route = useRoute();
    const router = useRouter();

    const channel = (config.public.defaultChannel as string) || 'tabdealplatform';
    const defaultLimit = Number(config.public.defaultPerPage) || 12;

    const page = computed(() => Math.max(1, Number(route.query.page) || 1));
    const perPage = computed(() => Math.max(1, Number(route.query.per_page) || defaultLimit));
    const searchQuery = computed(() => (route.query.q as string)?.trim() || '');

    const apiUrl = computed(() => {
        if (searchQuery.value) {
            const queryText = encodeURIComponent(`${channel} ${searchQuery.value}`);
            return `/aparat-v1/video/video/search/text/${queryText}`;
        }

        const offset = (page.value - 1) * perPage.value;
        return `/aparat-proxy/videobyuser/username/${channel}/perpage/${perPage.value}/curoffset/${offset}`;
    });

    const { data, status, error, refresh } = useFetch<VideoListResult>(
        () => apiUrl.value,
        {
            key: computed(() =>
                searchQuery.value
                    ? `search-${channel}-${searchQuery.value}`
                    : `videos-channel-${page.value}-${perPage.value}`
            ),
            transform: (response: any): VideoListResult => {
                const parsed = typeof response === 'string' ? JSON.parse(response) : response;

                let rawList: any[] = [];
                if (Array.isArray(parsed?.included)) {
                    rawList = parsed.included.filter((item: any) => item.type === 'Video');
                } else {
                    rawList = parsed?.videobyuser || parsed?.data || [];
                }

                const allItems: NormalizedVideo[] = rawList.map((item: any) => {
                    const attr = item.attributes || item;
                    const rawPoster =
                        attr.big_poster || attr.medium_poster || attr.small_poster || attr.poster || '';

                    let channelLogo = attr.profilePhoto || attr.sender_icon || '';
                    if (!channelLogo || !channelLogo.includes('static.cdn.asset.aparat.com')) {
                        channelLogo = FALLBACK_CHANNEL_LOGO;
                    }

                    return {
                        id: String(item.id || attr.uid || ''),
                        uid: attr.uid || item.uid,
                        title: attr.title || '',
                        duration: attr.duration || 0,
                        visitCount: attr.visit_cnt || attr.visitCount || 0,
                        thumbnail: resolveThumbnailUrl(rawPoster),
                        createDate: attr.sdate || attr.create_date || '',
                        channelName: attr.sender_name || attr.username || 'صرافی تبدیل',
                        channelLogo,
                    };
                });

                let totalItems: number | null = null;
                let totalPages = 1;
                let hasNext = false;

                if (searchQuery.value) {
                    totalItems = allItems.length;
                    totalPages = Math.max(1, Math.ceil(totalItems / perPage.value));
                    hasNext = page.value < totalPages;
                } else {
                    const hasForward = Boolean(parsed?.ui?.pagingForward);
                    totalItems = parsed?.ui?.total ?? null;
                    totalPages = totalItems
                        ? Math.ceil(totalItems / perPage.value)
                        : Math.max(page.value + (hasForward ? 1 : 0), 1);
                    hasNext = hasForward;
                }

                return {
                    items: allItems,
                    pagination: {
                        currentPage: page.value,
                        perPage: perPage.value,
                        totalItems,
                        totalPages,
                        hasNext,
                    },
                };
            },
        }
    );

    const displayedVideos = computed(() => {
        const list = data.value?.items || [];
        if (!searchQuery.value) {
            return list;
        }
        const start = (page.value - 1) * perPage.value;
        return list.slice(start, start + perPage.value);
    });

    const setPage = async (newPage: number) => {
        if (newPage === page.value) return;
        await router.push({
            path: '/',
            query: {
                ...route.query,
                page: newPage > 1 ? String(newPage) : undefined,
            },
        });
    };

    const search = async (term: string) => {
        await router.push({
            path: '/',
            query: {
                ...route.query,
                q: term.trim() ? term.trim() : undefined,
                page: undefined,
            },
        });
    };

    return {
        videos: displayedVideos,
        pagination: computed(() => data.value?.pagination || null),
        isLoading: computed(() => status.value === 'pending'),
        error,
        page,
        searchQuery,
        setPage,
        search,
        refresh,
    };
};