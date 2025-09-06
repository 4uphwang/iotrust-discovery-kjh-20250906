// hooks/useDappsData.ts
import { useEffect, useState } from 'react';
import { DappService } from '../services/dappService';
import type { ListItem } from '../types/dappTypes';

export const useDappsData = () => {
    const [dapps, setDapps] = useState<ListItem[]>([]);
    const [favorites, setFavorites] = useState<ListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchDapps = async () => {
        setLoading(true);
        setError(null);
        try {
            const [dappsData, favoritesData] = await Promise.all([
                DappService.getDapps(),
                DappService.getFavorites(),
            ]);
            setDapps(dappsData);
            setFavorites(favoritesData);
        } catch (err: any) {
            setDapps([]);
            setFavorites([]);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteFavorite = async (itemId: string) => {
        try {
            await DappService.deleteFavorite(itemId);
            // 삭제 성공 시 로컬 상태 업데이트
            setFavorites(prev => prev.filter(f => f.id !== itemId));
        } catch (err: any) {
            console.error('즐겨찾기 삭제 실패', err);
            // 필요시 error 상태에 반영 가능
            setError(err);
        }
    };

    useEffect(() => {
        fetchDapps();
    }, []);

    return { dapps, favorites, loading, error, refetch: fetchDapps, deleteFavorite };
};