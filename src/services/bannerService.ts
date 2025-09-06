import { serviceInstance } from "../lib/api/client";
import { CURRENT_ENV } from "../lib/env";
import type { BannerItem } from "../types/banner";

export const BannerService = {
    getBanners: async (): Promise<Record<string, BannerItem[]>> => {
        if (CURRENT_ENV === "dev") {
            return Promise.resolve(mockBanners);
        }

        try {
            const res = await serviceInstance.get<Record<string, BannerItem[]>>("/banners");
            return res.data ?? {};
        } catch (err) {
            console.error("Failed to fetch banners:", err);
            return {};
        }
    },
};


export const mockBanners = {
    ko: [
        {
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_mapo_kr.png',
            link: 'https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
        },
        {
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_dcent.png',
            description: '디센트 지문인증형 지갑으로\n한층 더 강화된 보안을 경험하세요!',
            boldKeywords: ["디센트 지문인증형 지갑"],
            link: 'https://store-kr.dcentwallet.com',
            buttonText: '구매하기',
        },
        {
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_blog.png',
            description: '새로운 디센트 블로그를 방문하여\n최신 업데이트를 먼저 확인해보세요!',
            boldKeywords: ["디센트 블로그"],
            link: 'https://store-kr.dcentwallet.com/blogs/post',
            buttonText: '확인하기',
        },
    ],
    en: [
        {
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_mapo_en.png',
            link: 'https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol',
        },
        {
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_blog.png',
            description: "Visit the new D’CENT Blog\nto explore the latest updates first!",
            boldKeywords: ["D’CENT Blog"],
            link: 'https://store.dcentwallet.com/blogs/post',
            buttonText: 'Explore',
        },
        {
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_dcent.png',
            description: "Enhance your security with\nD'CENT biometric wallet",
            boldKeywords: ["D'CENT biometric wallet"],
            link: 'https://store.dcentwallet.com',
            buttonText: 'Buy Now',
        },
    ],
};