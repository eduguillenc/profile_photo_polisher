
import React from 'react';

interface ImageDisplayProps {
  original: string | null;
  enhanced: string | null;
  loading: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ original, enhanced, loading }) => {
  if (!original && !enhanced && !loading) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* Original Image Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Original</span>
          {original && (
             <span className="text-xs text-gray-400">Source Image</span>
          )}
        </div>
        <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center relative group">
          {original ? (
            <img src={original} alt="Original" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-300 flex flex-col items-center">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">No image uploaded</span>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Image Card */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-blue-500 overflow-hidden relative">
        <div className="p-3 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Enhanced</span>
          {enhanced && (
             <a 
              href={enhanced} 
              download="linkedin-polished-profile.png"
              className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
             >
               Download
             </a>
          )}
        </div>
        <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center relative">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-blue-600 font-medium animate-pulse">Polishing your profile...</p>
              <p className="text-xs text-gray-500 mt-2 px-8 text-center">Refining skin tones, adjusting lighting, and preparing your background...</p>
            </div>
          ) : enhanced ? (
            <img src={enhanced} alt="Enhanced" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-300 flex flex-col items-center">
              <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm">Click 'Polish Profile' to start</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
