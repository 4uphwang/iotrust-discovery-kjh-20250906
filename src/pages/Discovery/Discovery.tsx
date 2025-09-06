import { useState } from "react";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../../components/ConfirmDialog";
import ListItemCard from "../../components/ListItemCard";
import ListItemSheet from "../../components/ListItemSheet";
import { CURRENT_ENV } from "../../lib/env";
import type { ListItem } from "../../types/dappTypes";
import Banner from "./Banner";

const DiscoveryPage = () => {
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState(mockFavorites);

    // 바텀시트 제어용 상태
    const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // 삭제 확인 시트
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleItemClick = (item: ListItem) => {
        setSelectedItem(item);
        setIsSheetOpen(true);
    };

    const handleDelete = (index: number) => {
        setDeleteIndex(index);
        setIsConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            setFavorites((prev) => prev.filter((_, idx) => idx !== deleteIndex));
            setDeleteIndex(null);
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-screen bg-white text-black">
            {/* 배너 영역 */}
            <Banner />

            {/* 즐겨찾기 영역 */}
            <div className="p-8 w-full flex flex-col gap-y-2">
                <div className="text-xl text-left">{t('dapp_favorite_title')}</div>
                {favorites.map((item, idx) => (
                    <ListItemCard
                        item={item}
                        key={idx}
                        onClick={() => handleItemClick(item)}
                        onDelete={() => handleDelete(idx)}
                        showLink={true}
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

            {/* 서비스 리스트 영역 */}
            <div className="px-8 w-full flex flex-col gap-y-2">
                <div className="text-xl text-left">{t('dapp_list_title')}</div>
                {dappList.map((item, idx) => (
                    <ListItemCard
                        item={item}
                        key={idx}
                        onClick={() => handleItemClick(item)}
                        currentEnvironment={CURRENT_ENV}
                        currentPlatform="iOS"
                    />
                ))}
            </div>

            <ListItemSheet
                open={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                item={selectedItem}
            />
        </div>
    )
}

export default DiscoveryPage;

export const mockFavorites: ListItem[] = [
    {
        name: "OpenSea, The largest NFT marketplace",
        link: "https://opensea.io",
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_opensea.png",
    },
    {
        name: "MoonPay",
        link: "https://buy.moonpay.com/v2/buy",
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_moonpay.png",
    },
    {
        name: "Rarible - NFT Marketplace for Brands, Communities and Traders",
        link: "https://rarible.com/",
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_rarible.png",
    },
];


export const dappList: ListItem[] = [
    {
        name: "MoonPay",
        description: {
            en: "MoonPay offers simple and safer way to buy crypto instantly using VISA/Mastercard payment",
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_moonpay.png",
        link: "https://buy.moonpay.com",
        visibleFor: ["en"],
        platform: ["iOS"],
    },
    {
        name: "FTSO Portal",
        description: {
            en: "FTSO Portal is a service by D’CENT to provide fast and easy way to delegate Vote Power to the user’s favorite FTSO provider. By delegating Vote Power, users can earn passive income as reward.",
            ko: "FTSO Portal은 사용자가 원하는 FTSO provider에 Vote Power 쉽고 빠르게 위임할 수 있는 기능을 제공하는 디센트의 서비스입니다. 사용자는 Vote Power 위임을 통해 패시브인컴(passive income)을 보상으로 받을 수 있습니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_ftso.png",
        link: "https://ftsoportal.com/",
        network: ["Songbird", "Flare"],
        visibleFor: ["en", "ko"],
    },
    {
        name: "Astar Portal",
        description: {
            en: "Astar Portal is the official Astar Network application for using everything that Astar Network offers.",
            ko: "아스타포탈은 Astar Network에서 제공하는 모든 것을 사용하기 위한 Astar Network의 공식 애플리케이션입니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_astar.png",
        link: "https://portal.astar.network/",
        network: ["Astar"],
        visibleFor: ["en", "ko"],
        environment: ["dev", "stage"], // 개발/스테이징 환경만 노출
    },
    {
        name: "1inch",
        description: {
            en: "1inch is a decentralized exchange (DEX) aggregator. It's designed to roll liquidity and pricing from all major DEXes into one platform, making it easy to get the best price for the desired trade.",
            ko: "1inch는 모든 주요 DEX 거래소의 유동성과 가격 정보를 하나의 플랫폼에서 제공합니다. 원하는 거래의 가격을 쉽게 조회하여 토큰을 교환할 수 있습니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_1inch.png",
        link: "https://app.1inch.io/",
        network: ["Ethereum"],
        visibleFor: ["en", "ko"],
    },
    {
        name: "XDSea",
        description: {
            en: "XDSea is the world's first and largest peer-to-peer decentralized marketplace for buying and selling NFTs built on the XDC Network.",
            ko: "XDSea는 XDC 네트워크에 구축된 NFT를 사고 파는 세계 최초이자 최대 규모의 P2P 분산형 시장입니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_xdsea.png",
        network: ["XDC Network"],
        visibleFor: ["en", "ko"],
    },
    {
        name: "Compound",
        description: {
            en: "Compound is Ethereum's algorithmic money market protocol that allows users to earn interest or borrow assets through collateral. Anyone can supply assets to Compound's liquidity pool and earn continuous compound interest immediately.",
            ko: "Compound는 담보를 통해 이자를 얻거나 자산을 빌릴 수 있는 이더리움 기반의 머니 마켓 프로토콜입니다. 컴파운드의 유동성 풀에 자산을 공급하면 복리이자를 얻을 수 있습니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_compound.png",
        link: "https://app.compound.finance/",
        network: ["Ethereum"],
        visibleFor: ["en", "ko"],
    },
    {
        name: "PoolTogether",
        description: {
            en: "PoolTogether is an Ethereum based application that makes saving money as fun as a game. You join a pool by getting a “savings ticket”. Each Savings Ticket gives you a chance to win a prize, but even if you don’t win, you keep all your money!",
            ko: "PoolTogether는 저축을 재미있게 하는 이더리움 기반의 서비스입니다. 자산을 예치하면 “저축 티켓“을 받아 '풀'에 참여합니다. 각 저축 티켓은 풀에서 발생한 이자를 받을 수있는 기회를 제공하지만, 당첨되지 않더라도 손실이 없습니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_pooltogether.png",
        link: "https://app.pooltogether.com/",
        network: ["Ethereum"],
        visibleFor: ["en", "ko"],
    },
    {
        name: "OpenSea",
        description: {
            en: "OpenSea is a marketplace for digital goods, including collectibles, game items, digital art, and other digital assets backed by blockchain such as Ethereum.",
            ko: "OpenSea는 수집품, 게임 아이템, 디지털 아트와 같은 이더리움 기반의 디지털 상품 및 디지털 자산을 거래할 수 있는 마켓 플레이스입니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_opensea.png",
        link: "https://opensea.io/",
        network: ["Ethereum", "Polygon"],
        visibleFor: ["en", "ko"],
    },
    {
        name: "BlueWhale",
        description: {
            ko: "블루웨일 프로토콜은 사용하기 쉬운 디파이 서비스를 지향하는 프로젝트입니다. 디파이 대시보드, DEX 어그리게이터, 자동 재예치 서비스 등 탈중앙화 금융(DeFi) 관련 서비스 제공을 통해 클레이튼 디파이 생태계 활동을 더 쉽고 효율적으로 만듭니다."
        },
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_bluewhale.png",
        link: "https://bwpm.io/",
        network: ["Kaia"],
        visibleFor: ["ko"], // 한국어 사용자만
    },
];