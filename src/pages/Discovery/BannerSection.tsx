import { useTranslation } from "react-i18next";
import { CgSpinner } from "react-icons/cg";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Banner from "../../components/Banner";
import { useBanners } from "../../hooks/useBanners";
import { supportLanguage, type SupportedLanguage } from "../../lib/i18n";
import type { BannerItem } from "../../types/banner";


export default function BannerSection() {
    const { i18n } = useTranslation();
    const { banners, loading, error } = useBanners();
    const lang: SupportedLanguage = supportLanguage.includes(i18n.language as SupportedLanguage)
        ? (i18n.language as SupportedLanguage)
        : supportLanguage[0];

    const currentBanners: BannerItem[] = banners?.[lang] ?? [];
    const total = currentBanners.length;

    if (loading) {
        return (
            <div className="relative w-full h-48 flex items-center justify-center bg-gray-100">
                <CgSpinner size={32} className="animate-spin" />
            </div>
        );
    }

    if (error || total === 0) return null;


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
                        <Banner item={banner} idx={idx} total={total} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
}
