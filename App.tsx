
import React, { useState, useCallback, useRef } from 'react';
import Header from './components/Header';
import ImageDisplay from './components/ImageDisplay';
import { ImageState, PresetEnhancement } from './types';
import { PRESET_ENHANCEMENTS } from './constants';
import { enhanceImage } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<ImageState>({
    original: null,
    enhanced: null,
    loading: false,
    error: null,
  });
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_ENHANCEMENTS[0].id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setState(prev => ({
          ...prev,
          original: e.target?.result as string,
          enhanced: null,
          error: null
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onEnhance = async (specificPrompt?: string) => {
    if (!state.original) {
      setState(prev => ({ ...prev, error: "Please upload an image first." }));
      return;
    }

    const finalPrompt = specificPrompt || customPrompt || PRESET_ENHANCEMENTS.find(p => p.id === selectedPresetId)?.prompt || PRESET_ENHANCEMENTS[0].prompt;

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await enhanceImage(state.original, finalPrompt);
      setState(prev => ({ ...prev, enhanced: result, loading: false }));
    } catch (err: any) {
      setState(prev => ({ ...prev, loading: false, error: err.message || "Something went wrong." }));
    }
  };

  const handleReset = () => {
    setState({
      original: null,
      enhanced: null,
      loading: false,
      error: null,
    });
    setCustomPrompt('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-6">
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 shadow-sm animate-bounce">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{state.error}</span>
          </div>
        )}

        {/* Upload Section */}
        {!state.original ? (
          <div className="max-w-2xl mx-auto py-20 px-4">
            <div 
              className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center bg-white shadow-xl hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload your headshot</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">Select a casual photo, and we'll transform it into a polished, professional LinkedIn profile picture.</p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Choose File
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*" 
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Visuals */}
            <div className="lg:col-span-2">
              <ImageDisplay 
                original={state.original} 
                enhanced={state.enhanced} 
                loading={state.loading} 
              />
            </div>

            {/* Right Column: Controls */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Polish Options</h3>
                  <button 
                    onClick={handleReset}
                    className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Clear All
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Smart Enhancements</p>
                  {PRESET_ENHANCEMENTS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPresetId(preset.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center space-x-4 ${
                        selectedPresetId === preset.id 
                        ? 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-100' 
                        : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{preset.icon}</span>
                      <span className="font-semibold text-sm">{preset.label}</span>
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Custom AI Instructions (Optional)
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g. 'Make my blazer navy blue' or 'Add glasses'..."
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none h-24 resize-none"
                  />
                </div>

                <button
                  onClick={() => onEnhance()}
                  disabled={state.loading}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform active:scale-95 ${
                    state.loading 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-200 hover:-translate-y-1'
                  }`}
                >
                  {state.loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Polishing...
                    </span>
                  ) : (
                    'Polish Profile'
                  )}
                </button>
                <p className="text-[10px] text-gray-400 text-center mt-3 uppercase tracking-widest font-bold">Powered by Gemini 2.5 Flash Image</p>
              </div>
              
              <div className="bg-indigo-900 text-indigo-100 p-6 rounded-2xl shadow-sm border border-indigo-800">
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pro Tips
                </h4>
                <ul className="text-xs space-y-2 opacity-90 leading-relaxed">
                  <li>• Use high-resolution source photos for best results.</li>
                  <li>• Front-facing photos work better for expression changes.</li>
                  <li>• The AI excels at adding professional backgrounds.</li>
                  <li>• Smart-casual attire prompts help look approachable.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Bar for Mobile Action */}
      {state.original && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex space-x-4">
           <button
             onClick={handleReset}
             className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold"
           >
             Reset
           </button>
           <button
             onClick={() => onEnhance()}
             disabled={state.loading}
             className={`flex-[2] py-3 rounded-xl font-bold text-white ${state.loading ? 'bg-gray-400' : 'bg-blue-600'}`}
           >
             {state.loading ? 'Polishing...' : 'Polish Now'}
           </button>
        </div>
      )}
    </div>
  );
};

export default App;
