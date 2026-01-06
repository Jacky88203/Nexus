
import React, { useState } from 'react';
import { ChatMessage } from '../types';
import { Icons } from '../constants';
import { researchWithGemini } from '../services/geminiService';

const ResearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ChatMessage | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);
    setResult(null);

    try {
      const data = await researchWithGemini(query);
      setResult({
        id: Date.now().toString(),
        role: 'assistant',
        content: data.text,
        timestamp: Date.now(),
        sources: data.sources
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 md:p-8 space-y-6">
      <div className="max-w-4xl mx-auto w-full space-y-2">
        <h1 className="text-3xl font-bold">Research Lab</h1>
        <p className="text-slate-400">Powered by Google Search Grounding for real-time accuracy.</p>
      </div>

      <div className="max-w-4xl mx-auto w-full relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ask a complex research question..."
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl py-5 pl-7 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button 
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Explore'}
        </button>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full overflow-y-auto custom-scrollbar">
        {loading && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="animate-pulse">Retrieving live data and verifying sources...</p>
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass p-8 rounded-3xl border border-slate-700/50">
              <div className="prose prose-invert max-w-none text-lg leading-relaxed text-slate-200">
                {result.content}
              </div>
            </div>

            {result.sources && result.sources.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Sources & Citations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.sources.map((source, idx) => (
                    <a 
                      key={idx} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 glass rounded-xl hover:bg-slate-800 transition-all border border-slate-800 hover:border-blue-500/50 group"
                    >
                      <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 transition-transform">
                        <Icons.Search />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate text-slate-200">{source.title}</p>
                        <p className="text-xs text-slate-500 truncate">{source.uri}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!result && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-12">
            {['Latest space exploration news', 'Current global economic trends', 'Advancements in fusion energy'].map(suggestion => (
              <button 
                key={suggestion}
                onClick={() => { setQuery(suggestion); }}
                className="p-6 text-left glass rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all group"
              >
                <div className="mb-4 text-blue-500 group-hover:scale-110 transition-transform"><Icons.Search /></div>
                <p className="text-sm font-medium">{suggestion}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchView;
