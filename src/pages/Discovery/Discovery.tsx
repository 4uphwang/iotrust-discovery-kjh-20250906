import { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../../components/ConfirmDialog";
import ListItemCard from "../../components/ListItemCard";
import ListItemCardSkeleton from "../../components/ListItemCardSkeleton";
import ListItemSheet from "../../components/ListItemSheet";
import { useDappsData } from "../../hooks/useDappsData";
import { CURRENT_ENV } from "../../lib/env";
import type { ListItem } from "../../types/dappTypes";
import BannerSection from "./BannerSection";

const DiscoveryPage = () => {
    const { t, i18n } = useTranslation();
    const { dapps, favorites, deleteFavorite, loadingDapps, loadingFavorites, errorDapps, errorFavorites, fetchAll } = useDappsData();

    const visibleDapps = dapps.filter(item =>
        (!item.visibleFor || item.visibleFor.includes(i18n.language)) &&
        (!item.platform || item.platform.includes('iOS')) &&
        (!item.environment || item.environment.includes(CURRENT_ENV))
    );

    // 바텀시트 제어용 상태
    const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // 삭제 확인 시트
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleItemClick = (item: ListItem) => {
        setSelectedItem(item);
        setIsSheetOpen(true);
    };

    const handleDelete = (itemId: string) => {
        setDeleteItemId(itemId);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (deleteItemId !== null) {
            await deleteFavorite(deleteItemId)
            setDeleteItemId(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-screen bg-white text-black">
            {/* 배너 영역 */}
            <BannerSection />

            {/* 즐겨찾기 영역 */}
            <div className="p-8 w-full flex flex-col gap-y-2">
                <div className="text-xl text-left">{t('dapp_favorite_title')}</div>

                {loadingFavorites && Array.from({ length: 3 }).map((_, idx) => (
                    <ListItemCardSkeleton key={idx} />
                ))}

                {!!errorFavorites || (!loadingFavorites && favorites.length === 0) && (
                    <div className="py-4 text-center text-gray-500">{t('dapp_no_favorites')}</div>
                )}

                {favorites.map((item) => (
                    <ListItemCard
                        item={item}
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        onDelete={() => handleDelete(item.id)}
                        showLink={true}
                    />
                ))}
            </div>

            {/* 서비스 리스트 영역 */}
            <div className="px-8 w-full flex flex-col gap-y-2">
                <div className="text-xl text-left">{t('dapp_list_title')}</div>

                {loadingDapps && Array.from({ length: 4 }).map((_, idx) => (
                    <ListItemCardSkeleton key={idx} />
                ))}


                {!!errorDapps || (!loadingDapps && visibleDapps.length === 0) && (
                    <div className="py-4 text-center text-gray-500">{t('dapp_no_dapps_available')}</div>
                )}

                {visibleDapps.map((item) => (
                    <ListItemCard
                        item={item}
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                    />
                ))}
            </div>


            {/* 삭제 확인 바텀시트 */}
            <ConfirmDialog
                open={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
                title={`${t('dapp_favorite_title')} ${t('dapp_favorite_delete')}`}
                description={t('dapp_favorite_delete_confirm')}
                confirmLabel={t('button_confirm')}
                cancelLabel={t('button_cancel')}
            />

            {/** 자세히 보기 바텀시트 */}
            <ListItemSheet
                open={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                item={selectedItem}
            />
        </div>
    )
}

export default DiscoveryPage;
