import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fillBlanksData } from './data';
import { Sparkles, HelpCircle, CheckCircle2, ArrowRight, Star, RefreshCcw } from 'lucide-react';

interface FillBlanksGameProps {
  onScoreIncrement: (stars: number) => void;
}

export default function FillBlanksGame({ onScoreIncrement }: FillBlanksGameProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedWord(option);
  };

  const handleCheck = () => {
    if (!selectedWord || isAnswered) return;

    const currentItem = fillBlanksData[currentIndex];
    const isCorrect = selectedWord === currentItem.correct;

    if (isCorrect) {
      setScore(prev => prev + 1);
      onScoreIncrement(5); // +5 stars per blank filled
    }

    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedWord(null);
    setIsAnswered(false);
    setShowHint(false);

    if (currentIndex + 1 < fillBlanksData.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setSelectedWord(null);
    setIsAnswered(false);
    setCompleted(false);
    setScore(0);
    setShowHint(false);
  };

  const currentItem = fillBlanksData[currentIndex];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-emerald-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-emerald-50">
        <div className="flex items-center gap-1.5">
          <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-500">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Խաղ 4. Լրացրո՛ւ Բացթողումը
          </span>
        </div>
        {!completed && (
          <span className="text-xs font-bold text-slate-500">
            Առաջադրանք: <span className="text-emerald-600">{currentIndex + 1}</span> / {fillBlanksData.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6"
          >
            {/* Clues */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center space-y-1">
              <span className="text-[10px] font-extrabold tracking-widest text-emerald-600 uppercase">Հայերեն թարգմանություն</span>
              <p className="text-base font-bold text-slate-800">{currentItem.translation}</p>
            </div>

            {/* Incomplete Spanish Sentence */}
            <div className="text-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-3xl bg-white space-y-4">
              <p className="text-xl font-bold text-slate-800 leading-relaxed">
                {currentItem.sentence.split('_______').map((part, index, arr) => (
                  <span key={index}>
                    {part}
                    {index < arr.length - 1 && (
                      <span className={`inline-block min-w-28 mx-1 px-3 py-1 pb-1.5 border-b-2 text-center rounded-lg transition-all duration-300 font-extrabold uppercase tracking-wide text-sm ${
                        selectedWord 
                          ? isAnswered 
                            ? selectedWord === currentItem.correct 
                              ? 'bg-emerald-500 text-white border-emerald-600 scale-102' 
                              : 'bg-rose-500 text-white border-rose-600 scale-102'
                            : 'bg-emerald-55 bg-emerald-50 text-emerald-800 border-emerald-450 border-emerald-400'
                          : 'bg-slate-100 text-transparent border-slate-400 border-dashed'
                      }`}>
                        {selectedWord || '______'}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-3 gap-3">
              {currentItem.options.map((option) => {
                const isSelected = selectedWord === option;
                const isCorrectOption = option === currentItem.correct;
                
                let btnStyle = "border-slate-100 bg-slate-50 text-slate-700 hover:border-emerald-300";
                
                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 pointer-events-none";
                  } else if (isSelected) {
                    btnStyle = "border-rose-400 bg-rose-50 text-rose-800 pointer-events-none";
                  } else {
                    btnStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60 pointer-events-none";
                  }
                } else if (isSelected) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm scale-101";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    disabled={isAnswered}
                    className={`p-3.5 rounded-2xl border-2 font-bold text-center text-xs transition-all duration-150 uppercase tracking-wider ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Help / Check block */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setShowHint(prev => !prev)}
                disabled={isAnswered}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl font-bold text-xs transition duration-150 inline-flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" /> Հուշում
              </button>

              <div className="flex items-center gap-3">
                {showHint && !isAnswered && (
                  <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                    💡 {currentItem.hint}
                  </span>
                )}

                {!isAnswered ? (
                  <button
                    onClick={handleCheck}
                    disabled={!selectedWord}
                    className={`py-3 px-6 rounded-xl font-bold text-xs shadow-sm transition duration-150 ${
                      selectedWord
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-100'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Ստուգել
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition duration-150 flex items-center justify-center gap-1.5"
                  >
                    Հաջորդը
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Completed summary */
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">Գերազանց է, Գոռ և Գայանե</h3>
              <p className="text-xs text-slate-500">Դուք հաջողությամբ լրացրեցիք բոլոր նախադասությունները:</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-slate-800">{score} / {fillBlanksData.length}</p>
                <p className="text-[10px] uppercase font-bold text-slate-400">Ճիշտ</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-emerald-600 flex items-center justify-center gap-0.5">
                  +{score * 5} <Star className="w-4 h-4 text-emerald-500 fill-emerald-400" />
                </p>
                <p className="text-[10px] uppercase font-bold text-emerald-600">Աստղեր</p>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="py-2.5 px-5 bg-slate-100 hover:bg-emerald-100 text-slate-650 font-bold text-xs rounded-lg transition duration-150 inline-flex items-center gap-2 mx-auto"
            >
              <RefreshCcw className="w-4 h-4" /> Նորից սկսել
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
