import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";
import { Sheet } from "react-modal-sheet";
import type { ListItem } from "../types/dappTypes";
import { FullScreenLoader } from "./FullScreenLoader";

type ListItemSheetProps = {
    open: boolean;
    onClose: () => void;
    item?: ListItem | null;
};

const ListItemSheet = ({ open, onClose, item }: ListItemSheetProps) => {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleClick = (item: ListItem) => {
        ;
        setLoading(true);

        // 전체 화면 로딩 표시를 위해 timeout 설정
        setTimeout(() => {
            setLoading(false);
            if (item.link) {
                window.location.href = item.link;
            } else {
                console.warn("링크가 없습니다");
            }
        }, 500);
    };

    if (!item) return null;


    return (
        <>
            {loading && <FullScreenLoader />}

            <Sheet isOpen={open} onClose={onClose} snapPoints={[600]} >
                <Sheet.Container style={{ maxHeight: 600 }}>
                    <Sheet.Header className="w-full flex justify-end p-2 z-50">
                        <div className="text-black p-2" onClick={onClose} >
                            <IoMdClose size={32} />
                        </div>
                    </Sheet.Header>

                    <Sheet.Content >

                        <div className="px-8 flex flex-col gap-y-4 h-full" >
                            <div className="flex items-center gap-x-4">
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    className="w-20 h-20 rounded-2xl object-cover shadow"
                                />
                                <div className="flex flex-col text-black">
                                    <span className="text-2xl font-bold">{item.name}</span>
                                    {item.network && (
                                        <span className="text-gray-500 text-sm">
                                            {Array.isArray(item.network)
                                                ? item.network.join(", ")
                                                : item.network}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {item.link && (
                                <div className="!text-black text-lg !font-normal" >
                                    {item.link}
                                </div>
                            )}

                            <div className="mt-5 text-2xl font-bold text-black">Description</div>

                            {item.description && (
                                <p className="text-gray-500">
                                    {
                                        // 언어 우선순위: 현재 언어 → 첫 번째 언어
                                        item.description[i18n.language.split("-")[0]] ??
                                        item.description[Object.keys(item.description)[0]]
                                    }
                                </p>
                            )}

                            <div className=" flex-1 flex justify-center items-end pb-6">
                                <div
                                    className="bg-emerald-500 w-fit h-fit px-10 py-3 rounded-full text-white font-bold"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(item);
                                    }}
                                >
                                    {t("go_to_dapp")}
                                </div>
                            </div>
                        </div>

                    </Sheet.Content>
                </Sheet.Container>
                <Sheet.Backdrop onTap={onClose} />

            </Sheet >
        </>
    );
};

export default ListItemSheet;