import { useState } from "react";
import type { BannerItem } from "../types/banner";
import { FullScreenLoader } from "./FullScreenLoader";

type BannerItemProps = {
    item: BannerItem;
    idx: number;
    total: number;
};

export default function Banner({ item, idx, total }: BannerItemProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);

        // 전체 화면 로딩 표시를 위해 timeout 설정
        setTimeout(() => {
            setLoading(false);
            window.location.href = item.link;
        }, 500);
    };



    return (
        <>
            {loading && <FullScreenLoader />}

            <a href={item.link} onClick={handleClick} className="relative block w-full h-48" >
                <img src={item.image} alt="item" className="w-full h-48 object-cover" />
                {
                    item.description && (
                        <div className="absolute w-full top-8 left-5 flex flex-col text-white z-50">
                            <p className="text-xl text-left whitespace-pre-wrap">{renderDescription(item.description, item.boldKeywords)}</p>
                            {item.buttonText && (
                                <span className="mt-8 inline-block w-fit bg-white !text-black !font-bold text-lg px-5 py-2 rounded-full">{item.buttonText}</span>
                            )}
                        </div>
                    )
                }

                {/* 하단 우측 인덱스 */}
                <div className="absolute bottom-3 right-3 text-white text-sm bg-black/50 px-2 py-1 rounded">
                    {idx + 1} / {total}
                </div>
            </a>
        </>
    )
}


function renderDescription(desc: string, boldKeywords: string[] = []) {
    if (!boldKeywords.length) return desc;

    let parts = [<>{desc}</>];

    boldKeywords.forEach((keyword) => {
        parts = parts.flatMap((part) => {
            if (typeof part === 'string' || part.props?.children) {
                const text = typeof part === 'string' ? part : part.props.children;
                const splitArr = text.split(keyword);

                return splitArr.flatMap((str: string, idx: number) => {
                    if (idx === splitArr.length - 1) return str;
                    return [str, <strong key={keyword + idx}>{keyword}</strong>];
                });
            }
            return part;
        });
    });

    return parts;
}