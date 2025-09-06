import Banner from "./Banner";

const DiscoveryPage = () => {
    return (
        <div className="min-h-screen w-screen bg-white text-black">
            {/* 배너 영역 */}
            <Banner />

            {/* 즐겨찾기 영역 */}
            <div className="p-4">
                즐겨찾기
            </div>

            {/* 서비스 리스트 영역 */}
            <div className="p-4">
                목록
            </div>
        </div>
    )
}

export default DiscoveryPage;