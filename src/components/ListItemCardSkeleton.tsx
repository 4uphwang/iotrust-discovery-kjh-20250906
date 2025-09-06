const ListItemCardSkeleton = () => {
    return (
        <div className="flex items-center py-4 gap-x-4 border-gray-300 border-b animate-pulse">
            {/* 아이콘 영역 */}
            <div className="flex items-center justify-center bg-gray-200 h-20 w-20 rounded-lg" />

            {/* 텍스트 영역 */}
            <div className="flex flex-col flex-1 gap-y-2">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
        </div>
    );
};

export default ListItemCardSkeleton;