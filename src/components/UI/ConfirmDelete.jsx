
const ConfirmDelete = ({ resourceName, onConfirm, onCloseModal, disabled }) => {
    return (
        <div className="p-6 max-w-96">
            <h3 className="text-lg font-bold mb-2">حذف {resourceName}</h3>
            <p className="text-gray-600 mb-6">
                آیا از حذف این {resourceName} مطمئن هستید؟    
            </p>
            <div className="flex justify-end gap-3">
                <button
                    disabled={disabled}
                    onClick={onCloseModal}
                    className="btn btn--light w-full"
                >
                    انصراف
                </button>
                <button
                    disabled={disabled}
                    onClick={() => {
                        onConfirm();
                        onCloseModal?.();
                    }}
                    className="btn btn--primary w-full bg-rose-500 text-white"
                >
                    حذف
                </button>
            </div>
        </div>
    );
};

export default ConfirmDelete;