import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { interactiveThemes } from './data';
import { BookOpen, HelpCircle, Check, Eye, EyeOff, Volume2, Sparkles, Navigation } from 'lucide-react';

interface InteractiveReaderProps {
  onScoreIncrement: (stars: number) => void;
  lang: 'ru' | 'am';
}

export default function InteractiveReader({ onScoreIncrement, lang }: InteractiveReaderProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>("aeropuerto");
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [readCount, setReadCount] = useState<number[]>([]);
  const [speakProgress, setSpeakProgress] = useState<number | null>(null);

  const activeTheme = interactiveThemes.find(theme => theme.id === activeThemeId) || interactiveThemes[0];
  const currentSentences = activeTheme.sentences;

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter(item => item !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
      if (!readCount.includes(id)) {
        setReadCount([...readCount, id]);
        onScoreIncrement(2); // Get 2 stars for translating/reading a sentence!
      }
    }
  };

  const revealAllObj = () => {
    const allIds = currentSentences.map(s => s.id);
    const newReveals = Array.from(new Set([...revealedIds, ...allIds]));
    setRevealedIds(newReveals);
    // Grant stars for all newly read in this theme
    const unread = allIds.filter(id => !readCount.includes(id));
    if (unread.length > 0) {
      onScoreIncrement(unread.length * 2);
      setReadCount([...readCount, ...unread]);
    }
  };

  const hideAllObj = () => {
    const allIds = currentSentences.map(s => s.id);
    setRevealedIds(revealedIds.filter(id => !allIds.includes(id)));
  };

  const handleSpeak = (text: string, id: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      utterance.rate = 0.85;
      
      utterance.onstart = () => setSpeakProgress(id);
      utterance.onend = () => setSpeakProgress(null);
      utterance.onerror = () => setSpeakProgress(null);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Ձայնային արտասանությունը հասանելի չէ այս բրաուզերում:");
    }
  };

  // Stats calculation
  const currentReadCount = currentSentences.filter(s => readCount.includes(s.id)).length;
  const isThemeCompleted = currentReadCount === currentSentences.length;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-rose-50 pb-6">
        <div>
          <span className="px-3 py-1 bg-rose-50 text-rose-600 text-xs font-semibold rounded-full uppercase tracking-wider">
            Ընթերցանություն և Թարգմանություն
          </span>
          <h2 className="text-2xl font-bold text-slate-800 mt-1 flex items-center gap-2">
            <BookOpen className="text-rose-500 w-6 h-6 animate-pulse" />
            Իսպանիայի Ճանապարհորդությունը
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Ընտրեք թեման և կարդացեք Գոռի ու Գայանեի պատմությունը: <b>Սեղմեք իսպաներենի վրա</b>՝ թարգմանությունը տեսնելու համար:
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={revealAllObj}
            className="flex-1 md:flex-none py-2 px-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-medium text-xs rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <Eye className="w-4 h-4" /> Բացել բոլորը
          </button>
          <button
            onClick={hideAllObj}
            className="flex-1 md:flex-none py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-xs rounded-xl transition duration-200 flex items-center justify-center gap-2"
          >
            <EyeOff className="w-4 h-4" /> Թաքցնել
          </button>
        </div>
      </div>

      {/* Theme Choice Tabs (Grid of 4 themes) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {interactiveThemes.map((theme) => {
          const isSelected = theme.id === activeThemeId;
          const countReadInTheme = theme.sentences.filter(s => readCount.includes(s.id)).length;
          const isComplete = countReadInTheme === theme.sentences.length;
          
          return (
            <button
              key={theme.id}
              onClick={() => setActiveThemeId(theme.id)}
              className={`p-3 rounded-2xl border-2 text-left transition-all duration-300 flex flex-col justify-between cursor-pointer select-none ${
                isSelected 
                  ? 'border-rose-400 bg-rose-50/20 shadow-md scale-[1.02]'
                  : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-rose-200'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-2xl filter drop-shadow">{theme.emoji}</span>
                {isComplete && (
                  <span className="bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                    ✓ 100%
                  </span>
                )}
              </div>
              <div className="mt-3">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-rose-500 line-clamp-1">
                  {theme.titleEs}
                </h4>
                <h3 className="text-xs font-bold text-slate-700 mt-0.5 line-clamp-1">
                  {theme.titleAm}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Theme Description */}
      <div className="bg-rose-50/10 border border-dashed border-rose-200 rounded-2xl p-4 mb-6">
        <p className="text-xs font-medium text-slate-500 italic flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-rose-400" />
          {activeTheme.description}
        </p>
      </div>

      {/* Progress Bar (Current Theme) */}
      <div className="mb-8 bg-slate-50 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 border border-slate-100">
        <div className="w-full">
          <div className="flex justify-between text-xs text-slate-600 font-semibold mb-2">
            <span>Ընթացիկ թեմայի կարդացված նախադասություններ</span>
            <span className="text-rose-600">{currentReadCount} / {currentSentences.length}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500 rounded-full"
              style={{ width: `${(currentReadCount / currentSentences.length) * 100}%` }}
            />
          </div>
        </div>
        {isThemeCompleted && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 py-1.5 px-3 rounded-xl border border-emerald-100 text-xs font-bold shrink-0 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-500 animate-bounce" />
            Թեման Անցած է! 🏆
          </motion.div>
        )}
      </div>

      {/* Story List (Exactly 10 Sentences) */}
      <div className="space-y-4">
        {currentSentences.map((item, index) => {
          const isRevealed = revealedIds.includes(item.id);
          const isRead = readCount.includes(item.id);
          
          return (
            <div 
              key={item.id}
              id={`sentence-card-${item.id}`}
              className={`border-2 rounded-2xl transition-all duration-300 overflow-hidden ${
                isRevealed 
                  ? 'border-rose-300 bg-rose-50/20 shadow-md translate-x-1' 
                  : 'border-slate-100 hover:border-rose-100 bg-white hover:shadow-sm'
              }`}
            >
              {/* Spanish Section (Clickable) */}
              <div 
                onClick={() => toggleReveal(item.id)}
                className="p-4 flex justify-between items-center cursor-pointer gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2 rounded-lg text-xs font-bold font-mono h-8 w-8 flex items-center justify-center shrink-0 ${
                    isRead 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className="space-y-1">
                    {item.location && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-500 flex items-center gap-1">
                        📍 {item.location}
                      </span>
                    )}
                    <p className="text-base text-slate-800 font-semibold leading-relaxed tracking-wide select-none">
                      {item.spanish}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Pronunciation button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(item.spanish, item.id);
                    }}
                    className={`p-2 rounded-full transition-all duration-200 ${
                      speakProgress === item.id 
                        ? 'bg-rose-100 text-rose-600 animate-ping' 
                        : 'bg-slate-100 hover:bg-rose-150 hover:scale-105 hover:text-rose-500 text-slate-400'
                    }`}
                    title="Լսել արտասանությունը"
                  >
                    <Volume2 className="w-4 h-4" style={{ width: '16px', height: '16px' }} />
                  </button>

                  <div className={`p-2 rounded-full ${
                    isRevealed ? 'text-rose-500 bg-rose-100/50' : 'text-slate-300'
                  }`}>
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Revealed Armenian translation & words section */}
              <AnimatePresence initial={false}>
                {isRevealed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-rose-50/40 border-t border-rose-100 px-5 py-4"
                  >
                    <div className="space-y-3">
                      {/* Translation text */}
                      <p className="text-slate-800 font-medium text-base border-l-4 border-rose-500 pl-3 py-0.5">
                        {item.armenian}
                      </p>

                      {/* Literal translation tips / vocabulary list */}
                      {item.notes && (
                        <div className="bg-white/80 border border-rose-50/50 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2 shadow-sm">
                          <HelpCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-bold text-rose-600 uppercase tracking-wide mr-1.5">ԲԱՌԱՐԱՆ.</span>
                            {item.notes}
                          </div>
                        </div>
                      )}
                      
                      {/* Gor & Gayane achievement spark */}
                      <div className="flex justify-end">
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Check className="w-3 h-3" /> Կարդացված է • +2 🌟
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer Encouragement */}
      <div className="mt-8 bg-amber-50 rounded-2xl p-5 border border-amber-100 flex items-center gap-4">
        <div className="p-3 bg-amber-100 rounded-xl text-amber-600 font-bold shrink-0">
          💡
        </div>
        <div>
          <h4 className="text-amber-800 font-bold text-sm">Ուսուցման Հուշում Գոռի և Գայանեի համար</h4>
          <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
            Կարդացեք նախադասությունները բարձրաձայն, այնուհետև սեղմեք՝ թարգմանությունը համեմատելու համար: Կարող եք նաև լսել իսպաներեն իսկական արտասանությունը՝ օգտագործելով բարձրախոսի կոճակը 🔊:
          </p>
        </div>
      </div>
    </div>
  );
}
