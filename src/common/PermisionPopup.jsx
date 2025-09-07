import React from "react";

const PermisionPopup = ({ 
  isOpen, 
  title, 
  children, 
  onClose, 
  onConfirm, 
  confirmText = "Yes", 
  cancelText = "Cancel", 
  loading = false 
}) => {
  if (!isOpen) return null;

   return (
    <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
      {/* Dim / blur background but not full black */}
      <div 
        className="absolute inset-0  bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto" 
        onClick={onClose} 
      />

      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative z-10 animate-slideIn pointer-events-auto">
        {/* Title */}
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}

        {/* Content */}
        <div className="mb-4">{children}</div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermisionPopup;
