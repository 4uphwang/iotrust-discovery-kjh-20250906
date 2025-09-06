// src/hooks/useBanners.ts
import { useEffect, useState } from "react";
import { BannerService } from "../services/bannerService";
import type { BannerItem } from "../types/banner";

export const useBanners = () => {
    const [banners, setBanners] = useState<Record<string, BannerItem[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBanners = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await BannerService.getBanners();
                setBanners(data);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    return { banners, loading, error };
};