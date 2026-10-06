import {APARAT_BASE_URL} from "~/server/utils/aparat.ts";

export default defineEventHandler(async (event) => {
    const uid = getRouterParam(event, 'uid');

    if (!uid) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Video UID is required',
        });
    }

    try {
        const rawData = await $fetch<any>(`${APARAT_BASE_URL}/video/videohash/${uid}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; TabdealProxy/1.0)',
            },
        });

        const video = rawData?.video;

        if (!video) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Video not found',
            });
        }

        return {
            uid: video.uid,
            title: video.title,
            description: video.description || '',
            duration: video.duration,
            visitCount: video.visit_cnt || 0,
            channelName: video.sender_name || video.username || '',
            channelSubscribersCount: video.follow_cnt || 0,
            channelLogo: video.profilePhoto || video.sender_icon || '',
            createdDate: video.sdate || video.create_date || '',
            tags: Array.isArray(video.tags)
                ? video.tags.map((t: any) => (typeof t === 'string' ? t : t.name || t.title))
                : [],
            likesCount: video.like_cnt || 0,
            iframe: video.frame ||
                `<iframe src="https://www.aparat.com/video/video/embed/videohash/${video.uid}/vt/frame" allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>`,
        };
    } catch (error: any) {
        throw createError({
            statusCode: error?.statusCode || error?.response?.status || 500,
            statusMessage: error?.message || 'Failed to retrieve video details',
        });
    }
});