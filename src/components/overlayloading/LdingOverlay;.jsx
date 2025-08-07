// src/components/LoadingOverlay.jsx
import { useSelector } from "react-redux";

const LoadingOverlay = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/90 z-[9999] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-500 border-dashed rounded-full animate-spin"></div>
      <p className="ml-4 text-lg font-semibold text-[#004B29]">Loading...</p>
    </div>
  );
};

export default LoadingOverlay;
