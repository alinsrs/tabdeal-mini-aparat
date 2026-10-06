import {APARAT_BASE_URL, CHANNEL_USERNAME, normalizeVideoItem, PER_PAGE} from "~/server/utils/aparat.ts";

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = Math.max(1, Number(query.page) || 1);
    const search = (query.q as string)?.trim() || '';

    let apiUrl = '';

    if (search) {
        // Aparat search endpoint: videoBySearch/text/{query}/perpage/{perPage}/cpage/{page}
        apiUrl = `${APARAT_BASE_URL}/videoBySearch/text/${encodeURIComponent(search)}/perpage/${PER_PAGE}/cpage/${page}`;
    } else {
        // Aparat channel list endpoint: videoByCustom/username/{username}/perpage/{perPage}/cpage/{page}
        apiUrl = `${APARAT_BASE_URL}/videoByCustom/username/${CHANNEL_USERNAME}/perpage/${PER_PAGE}/cpage/${page}`;
    }

    try {
        const rawData = await $fetch<any>(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; TabdealProxy/1.0)',
            },
        });

        // Extract list based on which endpoint responded
        const rawList = rawData.videobysearch || rawData.videobycustom || [];
        const items = Array.isArray(rawList) ? rawList.map(normalizeVideoItem) : [];

        return {
            items,
            pagination: {
                currentPage: page,
                perPage: PER_PAGE,
                totalItems: rawData.ui?.total || null,
                totalPages: rawData.ui?.total ? Math.ceil(rawData.ui.total / PER_PAGE) : null,
            },
        };
    } catch (error: any) {
        throw createError({
            statusCode: error?.response?.status || 500,
            statusMessage: 'Failed to fetch videos from Aparat API',
        });
    }
});