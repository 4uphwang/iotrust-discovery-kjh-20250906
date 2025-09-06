// hooks/useDappsData.ts
import { useEffect, useState } from 'react';
import { DappService } from '../services/dappService';
import type { ListItem } from '../types/dappTypes';

export const useDappsData = () => {
    const [dapps, setDapps] = useState<ListItem[]>([]);
    const [favorites, setFavorites] = useState<ListItem[]>([]);

    const [loadingDapps, setLoadingDapps] = useState(false);
    const [loadingFavorites, setLoadingFavorites] = useState(false);

    const [errorDapps, setErrorDapps] = useState<Error | null>(null);
    const [errorFavorites, setErrorFavorites] = useState<Error | null>(null);

    const fetchDappsData = async () => {
        setLoadingDapps(true);
        setErrorDapps(null);
        try {
            const result = await DappService.getDapps();
            setDapps(result);
        } catch (err: any) {
            setErrorDapps(err);
            setDapps([]);
        } finally {
            setLoadingDapps(false);
        }
    };

    const fetchFavoritesData = async () => {
        setLoadingFavorites(true);
        setErrorFavorites(null);
        try {
            const result = await DappService.getFavorites();
            setFavorites(result);
        } catch (err: any) {
            setErrorFavorites(err);
            setFavorites([]);
        } finally {
            setLoadingFavorites(false);
        }
    };

    const fetchAll = async () => {
        await Promise.all([
            fetchDappsData(),
            fetchFavoritesData(),
        ]);
    };

    const deleteFavorite = async (itemId: string) => {
        try {
            await DappService.deleteFavorite(itemId);
            setFavorites(prev => prev.filter(f => f.id !== itemId));
        } catch (err: any) {
            console.error('즐겨찾기 삭제 실패', err);
            setErrorFavorites(err);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return {
        dapps,
        favorites,
        loadingDapps,
        loadingFavorites,
        errorDapps,
        errorFavorites,
        fetchAll,
        deleteFavorite,
    };
};