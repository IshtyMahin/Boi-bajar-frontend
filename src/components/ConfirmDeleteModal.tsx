import { useEffect } from "react";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  onConfirm,
  onCancel,
  isLoading,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed max-h-screen inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-center">
        <h3 className="text-lg font-semibold text-white">Confirm Delete</h3>
        <p className="text-gray-300 mt-2">
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={onConfirm}
            className={`btn btn-error text-white px-5 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button onClick={onCancel} className="btn btn-neutral px-5">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
