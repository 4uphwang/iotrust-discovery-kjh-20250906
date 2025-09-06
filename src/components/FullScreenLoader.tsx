import { createPortal } from "react-dom";
import { CgSpinner } from "react-icons/cg";

export function FullScreenLoader() {
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <CgSpinner size={48} className="animate-spin text-white" />
        </div>,
        document.body
    );
}