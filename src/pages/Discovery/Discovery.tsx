import { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../../components/ConfirmDialog";
import ListItemCard from "../../components/ListItemCard";
import ListItemSheet from "../../components/ListItemSheet";
import { useDappsData } from "../../hooks/useDappsData";
import { CURRENT_ENV } from "../../lib/env";
import type { ListItem } from "../../types/dappTypes";
import Banner from "./Banner";

const DiscoveryPage = () => {
    const { t, i18n } = useTranslation();
    const { dapps, favorites, deleteFavorite } = useDappsData();

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
            <Banner />

            {/* 즐겨찾기 영역 */}
            <div className="p-8 w-full flex flex-col gap-y-2">
                <div className="text-xl text-left">{t('dapp_favorite_title')}</div>
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
                {dapps.map((item) => (
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
