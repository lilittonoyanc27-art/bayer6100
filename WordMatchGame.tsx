import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { vocabulary } from './data';
import { WordPair } from './types';
import { Sparkles, RefreshCcw, HelpCircle, Flame, Star } from 'lucide-react';

interface WordMatchGameProps {
  onScoreIncrement: (stars: number) => void;
}

export default function WordMatchGame({ onScoreIncrement }: WordMatchGameProps) {
  const [spanishWords, setSpanishWords] = useState<{ id: string; text: string }[]>([]);
  const [armenianWords, setArmenianWords] = useState<{ id: string; text: string }[]>([]);
  const [selectedSpanish, setSelectedSpanish] = useState<string | null>(null);
  const [selectedArmenian, setSelectedArmenian] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1);
  const [statusMessage, setStatusMessage] = useState<string>('Գտե՛ք իսպաներեն և հայերեն զույգերը');

  useEffect(() => {
    startNewGame();
  }, [round]);

  const startNewGame = () => {
    // Select 6 random word pairs from the dictionary
    const shuffled = [...vocabulary].sort(() => 0.5 - Math.random());
    const selectedPairs = shuffled.slice(0, 6);

    const es = selectedPairs.map(p => ({ id: p.id, text: p.spanish })).sort(() => 0.5 - Math.random());
    const am = selectedPairs.map(p => ({ id: p.id, text: p.armenian })).sort(() => 0.5 - Math.random());

    setSpanishWords(es);
    setArmenianWords(am);
    setSelectedSpanish(null);
    setSelectedArmenian(null);
    setMatchedIds([]);
    setWrongMatch(false);
    setStatusMessage('Գտե՛ք իսպաներեն և հայերեն զույգերը');
  };

  const handleSpanishClick = (id: string) => {
    if (matchedIds.includes(id) || wrongMatch) return;
    setSelectedSpanish(id);
    checkMatch(id, selectedArmenian);
  };

  const handleArmenianClick = (id: string) => {
    if (matchedIds.includes(id) || wrongMatch) return;
    setSelectedArmenian(id);
    checkMatch(selectedSpanish, id);
  };

  const checkMatch = (esId: string | null, amId: string | null) => {
    if (!esId || !amId) return;

    if (esId === amId) {
      // Correct Match
      const nextMatched = [...matchedIds, esId];
      setMatchedIds(nextMatched);
      setSelectedSpanish(null);
      setSelectedArmenian(null);
      onScoreIncrement(4); // +4 stars per correct match
      
      const vocabularyItem = vocabulary.find(item => item.id === esId);
      setStatusMessage(`✨ Ճիշտ է! "${vocabularyItem?.spanish}" = "${vocabularyItem?.armenian}"`);

      if (nextMatched.length === 6) {
        setStatusMessage('🎉 Հրաշալի՜ է: Դուք համապատասխանեցրիք բոլոր զույգերը:');
      }
    } else {
      // Wrong Match
      setWrongMatch(true);
      setStatusMessage('❌ Փորձեք նորից: Սխալ համապատասխանություն:');
      setTimeout(() => {
        setSelectedSpanish(null);
        setSelectedArmenian(null);
        setWrongMatch(false);
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-blue-50">
        <div className="flex items-center gap-1.5">
          <span className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
            <Flame className="w-5 h-5" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            Խաղ 1. Բառերի Համապատասխանեցում
          </span>
        </div>
        <button
          onClick={startNewGame}
          className="p-2 hover:bg-slate-100 rounded-xl transition duration-150 text-slate-500"
          title="Թարմացնել բառերը"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Goal & Status Screen */}
      <div className={`p-4 rounded-2xl text-center font-bold text-xs mb-6 transition-all duration-300 ${
        matchedIds.length === 6
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
          : wrongMatch
          ? 'bg-rose-50 text-rose-800 border border-rose-100 animate-shake'
          : 'bg-blue-50 text-blue-800 border border-blue-100'
      }`}>
        {statusMessage}
      </div>

      {/* Two columns game board */}
      <div className="grid grid-cols-2 gap-6">
        {/* Spanish Word List */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-1">իսպաներեն</p>
          {spanishWords.map((word) => {
            const isSelected = selectedSpanish === word.id;
            const isMatched = matchedIds.includes(word.id);
            
            let btnClass = "border-slate-100 bg-slate-50 text-slate-800 hover:border-blue-300";
            if (isMatched) {
              btnClass = "border-emerald-500 bg-emerald-50 text-emerald-700 opacity-80 cursor-default";
            } else if (isSelected) {
              btnClass = wrongMatch
                ? "border-rose-400 bg-rose-50 text-rose-700"
                : "border-blue-500 bg-blue-50 text-blue-900 shadow-md scale-102";
            }

            return (
              <motion.button
                key={`es-${word.id}`}
                onClick={() => handleSpanishClick(word.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-2xl border-2 text-center font-bold text-sm transition-all duration-200 block truncate ${btnClass}`}
                whileHover={!isMatched ? { y: -2 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
              >
                {word.text}
              </motion.button>
            );
          })}
        </div>

        {/* Armenian Word List */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-1">հայերեն</p>
          {armenianWords.map((word) => {
            const isSelected = selectedArmenian === word.id;
            const isMatched = matchedIds.includes(word.id);
            
            let btnClass = "border-slate-100 bg-slate-50 text-slate-800 hover:border-blue-300";
            if (isMatched) {
              btnClass = "border-emerald-500 bg-emerald-50 text-emerald-700 opacity-80 cursor-default";
            } else if (isSelected) {
              btnClass = wrongMatch
                ? "border-rose-400 bg-rose-50 text-rose-700"
                : "border-blue-500 bg-blue-50 text-blue-900 shadow-md scale-102";
            }

            return (
              <motion.button
                key={`am-${word.id}`}
                onClick={() => handleArmenianClick(word.id)}
                disabled={isMatched}
                className={`w-full p-4 rounded-2xl border-2 text-center font-bold text-sm transition-all duration-200 block truncate ${btnClass}`}
                whileHover={!isMatched ? { y: -2 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
              >
                {word.text}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Finished Stage */}
      {matchedIds.length === 6 && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 pt-6 border-t border-slate-100 text-center"
        >
          <div className="flex justify-center gap-1.5 mb-3 text-amber-500">
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400 animate-bounce" />
            <Star className="w-5 h-5 fill-amber-400" />
          </div>
          <button
            onClick={() => setRound(prev => prev + 1)}
            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition duration-200 inline-flex items-center gap-2 shadow-md shadow-blue-100"
          >
            <Sparkles className="w-4 h-4" /> Հաջորդ Փուլը
          </button>
        </motion.div>
      )}
    </div>
  );
}
