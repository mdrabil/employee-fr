import React from "react";

const LoadingButton = ({
  loading,
  children,
  onClick,
  className = "bg-blue-500 text-white px-3 py-1 rounded",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} flex items-center justify-center gap-2 `}
      disabled={loading}
    >
      <span>{children}</span>
      {loading && (
        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
    </button>
  );
};

export default LoadingButton;
