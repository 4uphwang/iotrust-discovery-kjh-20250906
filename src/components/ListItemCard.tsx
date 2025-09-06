import { useTranslation } from "react-i18next";
import { FaBookmark } from "react-icons/fa";
import type { ListItem } from "../types/dappTypes";

export type ListItemCardProps = {
    item: ListItem;
    index?: number;
    onClick?: (item: ListItem) => void;
    onDelete?: (item: ListItem) => void;
    showDelete?: boolean;
    showLink?: boolean;
    currentPlatform?: 'iOS' | 'Android' | 'Web';
    currentEnvironment?: 'dev' | 'stage' | 'prod';
};

const ListItemCard = ({
    item,
    index,
    onClick,
    onDelete,
    showDelete = !!onDelete,
    showLink = false,
    currentPlatform = 'Web',
    currentEnvironment = 'prod',
}: ListItemCardProps) => {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language.split("-")[0];

    // 노출 조건 확인
    const isVisible =
        (!item.visibleFor || item.visibleFor.includes(currentLang)) &&
        (!item.platform || item.platform.includes(currentPlatform)) &&
        (!item.environment || item.environment.includes(currentEnvironment));

    if (!isVisible) return null;

    const descriptionText = item.description?.[currentLang];

    return (
        <div
            onClick={() => onClick?.(item)}
            className={`flex items-center py-4 gap-x-4 border-gray-300 border-b ${index === 0 ? 'border-t' : ''}`}
        >
            <div className="flex flex-col items-center justify-center bg-white h-20 w-20 rounded-lg shadow">
                <img src={item.icon} alt={item.name} className="aspect-square object-cover" />
            </div>
            <div className="flex flex-col flex-1 gap-y-1 text-start overflow-hidden">
                <span className={`text-2xl font-medium w-full truncate`}>{item.name}</span>
                {item.link && showLink && (
                    <span className={`text-lg text-gray-900 w-full truncate`}>{item.link}</span>
                )}
                {descriptionText && <span className="text-gray-700 truncate">{descriptionText}</span>}
            </div>
            {showDelete && onDelete && (
                <div
                    onClick={(e) => { e.stopPropagation(); onDelete(item); }}
                    className="flex flex-col items-center text-gray-400 px-3 py-1"
                >
                    <FaBookmark className="w-8 h-8" />
                    {t('dapp_favorite_delete')}
                </div>
            )}
        </div>
    );
};

export default ListItemCard;