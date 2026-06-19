import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vocabulary } from './data';
import { WordPair } from './types';
import { RefreshCcw, HelpCircle, Star, Sparkles, Check, ArrowRight } from 'lucide-react';

interface WordBuilderGameProps {
  onScoreIncrement: (stars: number) => void;
}

export default function WordBuilderGame({ onScoreIncrement }: WordBuilderGameProps) {
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [scrambled, setScrambled] = useState<{ char: string; index: number; used: boolean }[]>([]);
  const [assembled, setAssembled] = useState<{ char: string; originalIndex: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  useEffect(() => {
    pickNewWord();
  }, []);

  const pickNewWord = () => {
    // Exclude recently used words if possible
    let available = vocabulary.filter(w => !usedWords.includes(w.id));
    if (available.length === 0) {
      available = vocabulary;
      setUsedWords([]);
    }

    const word = available[Math.floor(Math.random() * available.length)];
    // Strip "El " or "La " prefixes for easier builder spelling if any (optional, let's do clean clean raw spanish words)
    // Actually, to make it super clear, let's spell without "El" or "La" or keep it. Let's keep it clean without prefix.
    const cleanSpanish = word.spanish.replace(/^(el|la|los|las)\s+/i, '').toLowerCase();
    
    // Scramble letters
    const letters = cleanSpanish.split('').map((char, index) => ({
      char,
      index,
      used: false
    }));
    
    // Ensure it's shuffled
    const scrambledLetters = [...letters].sort(() => 0.5 - Math.random());
    
    setCurrentWord({
      ...word,
      spanish: cleanSpanish // normalized
    });
    setScrambled(scrambledLetters);
    setAssembled([]);
    setIsCorrect(false);
    setShowHint(false);
  };

  const handleCharClick = (tile: { char: string; index: number; used: boolean }, scrambledIdx: number) => {
    if (tile.used || isCorrect) return;

    // Add to assembled
    const newAssembled = [...assembled, { char: tile.char, originalIndex: tile.index }];
    setAssembled(newAssembled);

    // Mark as used
    const newScrambled = [...scrambled];
    newScrambled[scrambledIdx].used = true;
    setScrambled(newScrambled);

    // Verify spelling
    if (currentWord) {
      const currentAssembly = newAssembled.map(a => a.char).join('');
      if (currentAssembly === currentWord.spanish) {
        setIsCorrect(true);
        setCompletedCount(prev => prev + 1);
        setUsedWords(prev => [...prev, currentWord.id]);
        onScoreIncrement(6); // +6 stars for building a word
      }
    }
  };

  const handleRemoveAssembled = (assembledIdx: number) => {
    if (isCorrect) return;

    const tileToRemove = assembled[assembledIdx];
    
    // Remove from assembled
    const newAssembled = assembled.filter((_, idx) => idx !== assembledIdx);
    setAssembled(newAssembled);

    // Mark back as unused in scrambled
    const newScrambled = scrambled.map(tile => {
      if (tile.index === tileToRemove.originalIndex && tile.char === tileToRemove.char && tile.used) {
        return { ...tile, used: false };
      }
      return tile;
    });
    // In case of duplicates, let's do safe matching by only freeing the first one found
    let freed = false;
    const finalScrambled = scrambled.map(tile => {
      if (!freed && tile.index === tileToRemove.originalIndex && tile.char === tileToRemove.char && tile.used) {
        freed = true;
        return { ...tile, used: false };
      }
      return tile;
    });

    setScrambled(finalScrambled);
  };

  const clearAssembly = () => {
    if (isCorrect) return;
    setAssembled([]);
    setScrambled(scrambled.map(t => ({ ...t, used: false })));
  };

  if (!currentWord) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-violet-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-violet-50">
        <div className="flex items-center gap-1.5">
          <span className="p-1.5 bg-violet-50 rounded-lg text-violet-500">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full">
            Խաղ 2. Տառերի Կառուցում
          </span>
        </div>
        <span className="text-xs font-bold text-slate-500">
          Կառուցված բառեր: <span className="text-violet-600">{completedCount}</span>
        </span>
      </div>

      {/* Target Clue (Armenian translation) */}
      <div className="text-center py-6 bg-slate-55 rounded-3xl mb-6 relative overflow-hidden bg-slate-50 border border-slate-100">
        <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Թարգմանություն</span>
        <h3 className="text-2xl font-black text-slate-800 mt-1">{currentWord.armenian}</h3>
        
        {/* Dynamic prompt check */}
        {isCorrect && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 bg-emerald-500/95 flex flex-col items-center justify-center text-white p-4"
          >
            <div className="p-2 bg-white/25 rounded-full mb-1">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-bold">Հրաշալի՜ է!</h4>
            <p className="text-xs text-white/90">«{currentWord.spanish}» նշանակում է «{currentWord.armenian}»</p>
          </motion.div>
        )}
      </div>

      {/* Assembled Area */}
      <div className="min-h-16 flex items-center justify-center gap-2 p-3 bg-violet-50/20 border-2 border-dashed border-violet-200 rounded-2xl mb-6">
        <AnimatePresence>
          {assembled.length === 0 ? (
            <span className="text-xs text-slate-400 font-medium tracking-wide">
              Սեղմեք ստորին տառերի վրա՝ բառը հավաքելու համար:
            </span>
          ) : (
            assembled.map((tile, idx) => (
              <motion.button
                key={`assembled-${idx}`}
                initial={{ scale: 0.8, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.8, y: -10, opacity: 0 }}
                onClick={() => handleRemoveAssembled(idx)}
                className="w-10 h-10 bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center rounded-xl text-lg font-black uppercase shadow-sm cursor-pointer select-none border-b-4 border-violet-800"
              >
                {tile.char}
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Scrambled Area */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-6">
        {scrambled.map((tile, idx) => (
          <button
            key={`scrambled-${idx}`}
            onClick={() => handleCharClick(tile, idx)}
            disabled={tile.used || isCorrect}
            className={`w-11 h-11 flex items-center justify-center rounded-xl text-lg font-black uppercase transition-all duration-150 border-b-4 ${
              tile.used
                ? 'bg-slate-100 text-slate-350 border-transparent shadow-inner pointer-events-none opacity-40'
                : 'bg-white border-slate-200 hover:border-violet-400 text-slate-700 hover:scale-105 active:scale-95 shadow-md border-2 hover:bg-violet-50/10'
            }`}
          >
            {tile.char}
          </button>
        ))}
      </div>

      {/* Control Tools */}
      <div className="flex justify-between items-center gap-4">
        {/* Hint button */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowHint(prev => !prev)}
            disabled={isCorrect}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl transition font-bold text-xs flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" /> Հուշում
          </button>
          
          <button
            onClick={clearAssembly}
            disabled={assembled.length === 0 || isCorrect}
            className="p-2.5 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl transition font-bold text-xs flex items-center gap-1.5"
          >
            <RefreshCcw className="w-4 h-4" /> Մաքրել
          </button>
        </div>

        {isCorrect ? (
          <button
            onClick={pickNewWord}
            className="py-3 px-6 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl transition duration-200 flex items-center gap-1.5 shadow-md shadow-violet-100"
          >
            Հաջորդ բառը <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          showHint && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] text-violet-700 bg-violet-50 px-3 py-1.5 rounded-xl font-bold border border-violet-100"
            >
              Ինչպե՞ս է սկսվում: <b>{currentWord.spanish[0].toUpperCase()}</b>...
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}
