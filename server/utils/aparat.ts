export const APARAT_BASE_URL = 'https://www.aparat.com/etc/api';
export const CHANNEL_USERNAME = 'tabdealplatform';
export const PER_PAGE = 12;

export interface NormalizedVideo {
    id: string;
    uid: string;
    title: string;
    description?: string;
    duration: number | string;
    visitCount: number | string;
    thumbnail: string;
    createDate: string;
    channelName: string;
    channelLogo: string;
}

export function normalizeVideoItem(item: any): NormalizedVideo {
    return {
        id: item.id || item.uid,
        uid: item.uid,
        title: item.title,
        description: item.description || '',
        duration: item.duration,
        visitCount: item.visit_cnt || item.visitCount || 0,
        thumbnail: item.big_poster || item.small_poster || item.profilePhoto,
        createDate: item.sdate || item.create_date,
        channelName: item.sender_name || item.username || 'تبدیل',
        channelLogo: item.profilePhoto || item.sender_icon || item.channel_profilePhoto || '',
    };
}