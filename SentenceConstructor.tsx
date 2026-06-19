import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sentenceConstructorData } from './data';
import { Sparkles, Trash2, ArrowRight, Star, RefreshCcw, CheckCircle2, AlertCircle } from 'lucide-react';

interface SentenceConstructorProps {
  onScoreIncrement: (stars: number) => void;
}

export default function SentenceConstructor({ onScoreIncrement }: SentenceConstructorProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [wordPool, setWordPool] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    loadSentence();
  }, [currentIndex]);

  const loadSentence = () => {
    const item = sentenceConstructorData[currentIndex];
    // Shuffle pool
    const shuffledPool = [...item.pool].sort(() => 0.5 - Math.random());
    setWordPool(shuffledPool);
    setSelectedWords([]);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const handleWordSelect = (word: string, poolIdx: number) => {
    if (isAnswered) return;
    
    // Add to selection
    setSelectedWords(prev => [...prev, word]);
    
    // Remove from pool (using index to avoid removing duplicates)
    setWordPool(prev => prev.filter((_, idx) => idx !== poolIdx));
  };

  const handleWordDeselect = (word: string, selectedIdx: number) => {
    if (isAnswered) return;

    // Remove from selection
    setSelectedWords(prev => prev.filter((_, idx) => idx !== selectedIdx));

    // Return to pool
    setWordPool(prev => [...prev, word]);
  };

  const handleCheck = () => {
    const item = sentenceConstructorData[currentIndex];
    
    // Normalize and join
    const userSentence = selectedWords.join(' ').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();
    const correctSentence = item.words.join(' ').toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"").trim();

    const checkSuccess = userSentence === correctSentence;

    setIsCorrect(checkSuccess);
    setIsAnswered(true);

    if (checkSuccess) {
      setScore(prev => prev + 1);
      onScoreIncrement(8); // +8 stars for sentence construction, since it's the hardest game!
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < sentenceConstructorData.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);
    }
  };

  const handleResetSentence = () => {
    if (isAnswered) return;
    loadSentence();
  };

  const handleRestartFull = () => {
    setCurrentIndex(0);
    setGameCompleted(false);
    setScore(0);
    loadSentence();
  };

  const currentItem = sentenceConstructorData[currentIndex];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-indigo-50">
        <div className="flex items-center gap-1.5">
          <span className="p-1.5 bg-indigo-50 rounded-lg text-indigo-500">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            Խաղ 6. Նախադասության Կառուցում
          </span>
        </div>
        {!gameCompleted && (
          <span className="text-xs font-bold text-slate-500">
            Նախադասություն: <span className="text-indigo-600">{currentIndex + 1}</span> / {sentenceConstructorData.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!gameCompleted ? (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Clue sentence in Armenian */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Թարգմանել հետևյալ նախադասությունը</span>
              <p className="text-base font-black text-slate-800 mt-1">{currentItem?.armenian}</p>
            </div>

            {/* Target Assembly Area */}
            <div className={`min-h-20 p-4 border-2 border-dashed rounded-2xl flex flex-wrap items-center justify-center gap-2 transition-all duration-350 ${
              isAnswered
                ? isCorrect 
                  ? 'bg-emerald-50 border-emerald-300' 
                  : 'bg-rose-50 border-rose-300'
                : 'bg-slate-50/20 border-indigo-200'
            }`}>
              {selectedWords.length === 0 ? (
                <span className="text-xs text-slate-400 font-medium tracking-wide">
                  Սեղմեք ստորին բառային բլոկների վրա՝ նախադասությունը կազմելու համար:
                </span>
              ) : (
                selectedWords.map((word, idx) => (
                  <motion.button
                    key={`selected-${idx}`}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    onClick={() => handleWordDeselect(word, idx)}
                    disabled={isAnswered}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs select-none border-b-4 transition duration-150 ${
                      isAnswered
                        ? isCorrect
                          ? 'bg-emerald-600 border-emerald-800 text-white'
                          : 'bg-rose-600 border-rose-800 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-800 active:scale-95'
                    }`}
                  >
                    {word}
                  </motion.button>
                ))
              )}
            </div>

            {/* Pool of Available Words */}
            <div className="pt-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center mb-3">Բլոկների ցանկ</p>
              
              <div className="flex flex-wrap items-center justify-center gap-2">
                {wordPool.map((word, idx) => (
                  <button
                    key={`pool-word-${idx}`}
                    onClick={() => handleWordSelect(word, idx)}
                    disabled={isAnswered}
                    className="px-3.5 py-2 bg-white border-2 border-slate-200 hover:border-indigo-400 font-semibold text-xs rounded-xl shadow-sm hover:scale-105 active:scale-95 transition-all text-slate-700"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            {/* Verification State Alerts */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 rounded-2xl flex items-center gap-3 border ${
                  isCorrect
                    ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                    : 'bg-rose-50 border-rose-100 text-rose-800'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div className="text-xs font-semibold">
                      <b>Ճիշտ է!</b> Դուք հիանալի կերպով կազմեցիք նախադասությունը: (+8 🌟)
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div className="text-xs">
                      <span className="font-bold">Փորձեք նորից:</span> Ճիշտ պատասխանն էր՝ <b>«{currentItem.words.join(' ')}»</b>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Control buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <button
                onClick={handleResetSentence}
                disabled={selectedWords.length === 0 || isAnswered}
                className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl font-bold text-xs transition duration-150 flex items-center gap-1.5"
              >
                <RefreshCcw className="w-4 h-4" /> Մաքրել
              </button>

              {!isAnswered ? (
                <button
                  onClick={handleCheck}
                  disabled={selectedWords.length === 0}
                  className={`py-3 px-6 rounded-xl font-bold text-xs shadow-sm transition duration-150 ${
                    selectedWords.length > 0
                      ? 'bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
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
                  Հաջորդ նախադասությունը
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          /* Level end */
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto border border-indigo-100 animate-bounce">
              <CheckCircle2 className="w-8 h-8 text-indigo-500" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">Գրագետ Շարադրանք Ավարտված!</h3>
              <p className="text-xs text-slate-500">Դուք կարողանում եք ճիշտ կառուցել իսպաներեն խոսքը:</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-slate-800">{score} / {sentenceConstructorData.length}</p>
                <p className="text-[10px] uppercase font-bold text-slate-400">Ճիշտ</p>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-indigo-600 flex items-center justify-center gap-0.5">
                  +{score * 8} <Star className="w-4 h-4 text-indigo-500 fill-indigo-400" />
                </p>
                <p className="text-[10px] uppercase font-bold text-indigo-600">Աստղեր</p>
              </div>
            </div>

            <button
              onClick={handleRestartFull}
              className="py-2.5 px-5 bg-slate-100 hover:bg-indigo-100 text-slate-650 font-bold text-xs rounded-lg transition duration-150 inline-flex items-center gap-2 mx-auto"
            >
              <Trash2 className="w-4 h-4" /> Նորից սկսել
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
