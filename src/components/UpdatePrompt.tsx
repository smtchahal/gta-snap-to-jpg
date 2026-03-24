import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#1c1f24] text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50 whitespace-nowrap">
      <span>A new version is available.</span>
      <button
        onClick={() => updateServiceWorker(true)}
        className="cursor-pointer bg-white text-[#1c1f24] font-semibold px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Update
      </button>
      <button
        onClick={() => setNeedRefresh(false)}
        className="cursor-pointer text-gray-400 hover:text-white transition-colors leading-none"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
};

export default UpdatePrompt;
