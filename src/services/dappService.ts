import { serviceInstance } from "../lib/api/client";
import { CURRENT_ENV } from "../lib/env";
import type { ListItem } from "../types/dappTypes";


export const DappService = {
    getDapps: async (): Promise<ListItem[]> => {
        if (CURRENT_ENV === "dev") {
            // mock 환경에서는 배열에서 삭제만 하고 반환
            return Promise.resolve(dappList);
        }
        return serviceInstance.get<ListItem[]>("/dapps").then(res => res.data) ?? [];
    },

    getFavorites: async (): Promise<ListItem[]> => {
        if (CURRENT_ENV === "dev") {
            return Promise.resolve(mockFavorites);
        }
        return serviceInstance.get<ListItem[]>("/favorites").then(res => res.data) ?? [];
    },

    deleteFavorite: async (itemId: string) => {
        if (CURRENT_ENV === "dev") {
            return Promise.resolve();
        }
        return serviceInstance.delete(`/favorites/${itemId}`);
    },
};


export const mockFavorites: ListItem[] = [
    {
        id: 'f1',
        name: "OpenSea, The largest NFT marketplace",
        link: "https://opensea.io",
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_opensea.png",
    },
    {
        id: 'f2',
        name: "MoonPay",
        link: "https://buy.moonpay.com/v2/buy",
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_moonpay.png",
    },
    {
        id: 'f3',
        name: "Rarible - NFT Marketplace for Brands, Communities and Traders",
        link: "https://rarible.com/",
        icon: "https://raw.githubusercontent.com/KyungeunKim/iotrust-frontend-homework/main/images/icon_rarible.png",
    },
];


export const dappList: ListItem[] = [
    {
        id: 'd1',
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
        id: 'd2',
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
        id: 'd3',
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
        id: 'd4',
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
        id: 'd5',
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
        id: 'd6',
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
        id: 'd7',
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
        id: 'd8',
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
        id: 'd9',
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