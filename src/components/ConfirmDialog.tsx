
type ConfirmDialogProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
};

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "확인",
    cancelLabel = "취소",
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-col z-10 mx-4">
                {title && <h2 className="text-2xl font-medium">{title}</h2>}
                <hr className="border-t-2 border-dashed border-gray-300 my-3" />
                {description && <p className="text-xl text-gray-700">{description}</p>}

                <div className="flex w-full gap-3 mt-3">
                    <div
                        className="flex-1 py-2 flex justify-center items-center rounded-lg bg-white border border-gray-200"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </div>
                    <div
                        className={`flex-1 py-2 flex justify-center items-center rounded-lg text-gray-500 border border-gray-300 shadow-sm `}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmLabel}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;