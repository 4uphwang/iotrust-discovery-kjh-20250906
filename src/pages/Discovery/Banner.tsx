import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { supportLanguage, type SupportedLanguage } from "../../lib/i18n";

function renderDescription(desc: string, boldKeywords: string[] = []) {
    if (!boldKeywords.length) return desc;

    let parts = [<>{desc}</>];

    boldKeywords.forEach((keyword) => {
        parts = parts.flatMap((part) => {
            if (typeof part === 'string' || part.props?.children) {
                const text = typeof part === 'string' ? part : part.props.children;
                const splitArr = text.split(keyword);

                return splitArr.flatMap((str: string, idx: number) => {
                    if (idx === splitArr.length - 1) return str;
                    return [str, <strong key={keyword + idx}>{keyword}</strong>];
                });
            }
            return part;
        });
    });

    return parts;
}


export default function Banner() {
    const { i18n } = useTranslation();
    const lang: SupportedLanguage = supportLanguage.includes(i18n.language as SupportedLanguage)
        ? (i18n.language as SupportedLanguage)
        : supportLanguage[0];

    const currentBanners: BannerItem[] = banners[lang];
    const total = currentBanners.length;

    return (
        <div className="relative w-full h-48 overflow-hidden">
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                loop={true}
                navigation={false}
                modules={[Pagination, Navigation, Autoplay]}
            >
                {currentBanners.map((banner: any, idx: number) => (
                    <SwiperSlide key={idx}>
                        <img src={banner.image} alt="banner" className="w-full h-48 object-cover" />
                        {/* 배너 설명 & 버튼 */}
                        {
                            banner.description && (
                                <div className="absolute top-8 left-5 flex flex-col text-white z-50">
                                    <p className="text-xl text-left whitespace-pre-wrap">{renderDescription(banner.description, banner.boldKeywords)}</p>
                                    {banner.buttonText && (
                                        <a
                                            href={banner.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-8 inline-block w-fit bg-white !text-black !font-bold text-lg px-5 py-2 rounded-full"
                                        >
                                            {banner.buttonText}
                                        </a>
                                    )}
                                </div>
                            )
                        }

                        {/* 하단 우측 인덱스 */}
                        <div className="absolute bottom-3 right-3 text-white text-sm bg-black/50 px-2 py-1 rounded">
                            {idx + 1} / {total}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
}


export type BannerItem = {
    image: string;
    link: string;
    buttonText?: string;
    description?: string;
    boldKeywords?: string[];
};

export const banners = {
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
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_dcent.png',
            description: "Enhance your security with D'CENT biometric wallet",
            link: 'https://store.dcentwallet.com',
            buttonText: 'Buy Now',
        },
        {
            image: 'https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/banner_blog.png',
            description: "Visit the new D’CENT Blog to explore the latest updates first!",
            link: 'https://store.dcentwallet.com/blogs/post',
            buttonText: 'Explore',
        },
    ],
};