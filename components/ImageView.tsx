
import React, { useState } from 'react';
import { Icons } from '../constants';
import { generateImage } from '../services/geminiService';
import { GeneratedImage } from '../types';

const ImageView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [gallery, setGallery] = useState<GeneratedImage[]>([]);
  const [generating, setGenerating] = useState(false);
  const [selectedImg, setSelectedImg] = useState<GeneratedImage | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || generating) return;

    setGenerating(true);
    try {
      const url = await generateImage(prompt);
      const newImg: GeneratedImage = {
        id: Date.now().toString(),
        url,
        prompt,
        timestamp: Date.now()
      };
      setGallery(prev => [newImg, ...prev]);
      setSelectedImg(newImg);
    } catch (error) {
      console.error(error);
      alert("Failed to generate image. Please ensure your API key supports Gemini 2.5 Flash Image.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden">
      {/* Workspace */}
      <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6 overflow-y-auto custom-scrollbar bg-slate-900/50">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Imagine Studio</h1>
          <p className="text-slate-400">High-fidelity visual creation with Gemini 2.5.</p>
        </div>

        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to create in vivid detail..."
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl p-6 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
          />
          <button 
            onClick={handleGenerate}
            disabled={generating || !prompt.trim()}
            className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
          >
            {generating ? (
              <><i className="fa-solid fa-circle-notch animate-spin"></i> Generating...</>
            ) : (
              <><Icons.Image /> Generate</>
            )}
          </button>
        </div>

        {selectedImg ? (
          <div className="relative animate-in zoom-in-95 duration-500 aspect-square max-w-2xl mx-auto w-full group">
            <img 
              src={selectedImg.url} 
              alt={selectedImg.prompt} 
              className="w-full h-full object-cover rounded-3xl shadow-2xl border border-slate-700"
            />
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a 
                href={selectedImg.url} 
                download={`nexus-gen-${selectedImg.id}.png`}
                className="w-10 h-10 bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <Icons.Download />
              </a>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl">
              <p className="text-white text-sm line-clamp-2 italic">{selectedImg.prompt}</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-30 border-2 border-dashed border-slate-700 rounded-3xl">
            <div className="text-6xl mb-4"><Icons.Image /></div>
            <p>Your creation will appear here</p>
          </div>
        )}
      </div>

      {/* Gallery Sidebar */}
      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 glass p-6 overflow-y-auto custom-scrollbar shrink-0">
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Recent Creations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
          {gallery.map(img => (
            <button
              key={img.id}
              onClick={() => setSelectedImg(img)}
              className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                selectedImg?.id === img.id ? 'border-blue-500 scale-[0.98]' : 'border-transparent hover:border-slate-600'
              }`}
            >
              <img src={img.url} className="w-full h-full object-cover" alt="" />
            </button>
          ))}
          {gallery.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-sm">
              Empty gallery
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageView;
