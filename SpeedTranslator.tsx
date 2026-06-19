import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vocabulary } from './data';
import { WordPair } from './types';
import { Timer, Check, X, ShieldAlert, Award, RotateCcw, Play, Star, Sparkles } from 'lucide-react';

interface SpeedTranslatorProps {
  onScoreIncrement: (stars: number) => void;
}

export default function SpeedTranslator({ onScoreIncrement }: SpeedTranslatorProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentPair, setCurrentPair] = useState<{ spanish: string; armenianClue: string; isCorrectMatch: boolean } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(100); // percentage for bar
  const [round, setRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const SECONDS_LIMIT = 6; // 6 seconds for extra speed challenge!
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timerStartRef = useRef<number>(0);

  useEffect(() => {
    if (isPlaying && !gameEnded) {
      generateQuestion();
    }
    return () => stopTimer();
  }, [isPlaying, round, gameEnded]);

  const startPlaying = () => {
    setIsPlaying(true);
    setRound(1);
    setScore(0);
    setStreak(0);
    setGameEnded(false);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = () => {
    stopTimer();
    setTimeLeft(100);
    timerStartRef.current = Date.now();
    
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - timerStartRef.current;
      const progress = 100 - (elapsed / (SECONDS_LIMIT * 1000)) * 100;

      if (progress <= 0) {
        stopTimer();
        setTimeLeft(0);
        handleAnswer(null); // Time out!
      } else {
        setTimeLeft(progress);
      }
    }, 50);
  };

  const generateQuestion = () => {
    setFeedback(null);
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const actualWord = vocabulary[randomIndex];
    
    // Choose randomly whether to make it correct or incorrect match (50/50)
    const isCorrectMatch = Math.random() < 0.5;
    let armenianClue = actualWord.armenian;

    if (!isCorrectMatch) {
      // Pick a random alternative armenian word
      const alternatives = vocabulary.filter(w => w.id !== actualWord.id);
      const randomAlt = alternatives[Math.floor(Math.random() * alternatives.length)];
      armenianClue = randomAlt.armenian;
    }

    setCurrentPair({
      spanish: actualWord.spanish,
      armenianClue,
      isCorrectMatch
    });
    startTimer();
  };

  const handleAnswer = (userAsserted: boolean | null) => {
    stopTimer();
    if (!currentPair) return;

    const isCorrect = userAsserted !== null && userAsserted === currentPair.isCorrectMatch;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFeedback('correct');
      onScoreIncrement(3); // +3 stars per correct prediction
    } else {
      setStreak(0);
      setFeedback('wrong');
    }

    setTimeout(() => {
      if (round < 10) {
        setRound(prev => prev + 1);
      } else {
        setGameEnded(true);
      }
    }, 850);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-rose-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-rose-50">
        <div className="flex items-center gap-1.5">
          <span className="p-1.5 bg-rose-50 rounded-lg text-rose-500">
            <Timer className="w-5 h-5 animate-pulse" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
            Խաղ 3. Արագ Թարգմանիչ
          </span>
        </div>
        {isPlaying && !gameEnded && (
          <div className="flex items-center gap-2">
            {streak > 1 && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md text-[10px] font-bold uppercase tracking-widest animate-bounce flex items-center gap-0.5">
                🔥 Hot streak: {streak}
              </span>
            )}
            <span className="text-xs font-bold text-slate-500">
              Փուլ {round} / 10
            </span>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isPlaying ? (
          /* Start Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-5"
          >
            <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Timer className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-slate-800">Արագ արձագանքման խաղ</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Էկրանին կհայտնվեն իսպաներեն և հայերեն բառեր: Դուք ունեք ընդամենը <b>6 վայրկյան</b> ճիշտ կամ սխալ պատասխաններ տալու համար:
              </p>
            </div>
            <button
              onClick={startPlaying}
              className="py-3 px-6 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-4 h-4 fill-white" /> Սկսել Խաղալ
            </button>
          </motion.div>
        ) : gameEnded ? (
          /* Result Summary Screen */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 space-y-5"
          >
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-100 animate-bounce">
              <Award className="w-8 h-8 text-amber-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">Ակնթարթային Լիգա Ավարտված է!</h3>
              <p className="text-xs text-slate-500">Շատ արագ գլուխկոտրուկ:</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-slate-800">{score} / 10</p>
                <p className="text-[10px] uppercase font-bold text-slate-400">Ճիշտ</p>
              </div>
              <div className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-rose-600 flex items-center justify-center gap-0.5">
                  +{score * 3} <Star className="w-4 h-4 text-rose-500 fill-rose-500" />
                </p>
                <p className="text-[10px] uppercase font-bold text-rose-600">Աստղեր</p>
              </div>
            </div>

            <button
              onClick={startPlaying}
              className="py-2.5 px-5 bg-slate-100 hover:bg-rose-100 text-slate-650 font-bold text-xs rounded-lg transition duration-150 inline-flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" /> Կրկին Փորձել
            </button>
          </motion.div>
        ) : (
          /* Playing Screen */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Visual Timer Bar */}
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-75 ${
                  timeLeft > 50
                    ? 'bg-emerald-500'
                    : timeLeft > 25
                    ? 'bg-amber-400'
                    : 'bg-rose-500 animate-pulse'
                }`}
                style={{ width: `${timeLeft}%` }}
              />
            </div>

            {/* Flashcard Frame */}
            <div className={`p-8 rounded-3xl border-2 transition-all duration-300 ${
              feedback === 'correct'
                ? 'border-emerald-400 bg-emerald-50/20'
                : feedback === 'wrong'
                ? 'border-rose-400 bg-rose-50/20'
                : 'border-slate-100 bg-slate-50/50'
            }`}>
              <div className="space-y-4 text-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/80 px-2.5 py-1 rounded-full shadow-sm">Իսպաներեն</span>
                  <p className="text-3xl font-black text-rose-600 mt-2 select-none tracking-wide">{currentPair?.spanish}</p>
                </div>
                
                <div className="flex justify-center text-slate-350 select-none">
                  ═ ═ ═ ═ ═ ═ ═ ═
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/80 px-2.5 py-1 rounded-full shadow-sm">Արդյո՞ք նշանակում է</span>
                  <p className="text-2xl font-black text-slate-800 mt-2 select-none">{currentPair?.armenianClue}</p>
                </div>
              </div>
            </div>

            {/* Buttons YES / NO */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                disabled={feedback !== null}
                className="py-4 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-750 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-100/50 flex flex-col items-center justify-center gap-1.5 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="p-2 bg-white/20 rounded-full">
                  <Check className="w-5 h-5 text-white" />
                </div>
                ՃԻՇՏ Է (Sí)
              </button>

              <button
                onClick={() => handleAnswer(false)}
                disabled={feedback !== null}
                className="py-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-750 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-rose-100/50 flex flex-col items-center justify-center gap-1.5 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="p-2 bg-white/20 rounded-full">
                  <X className="w-5 h-5 text-white" />
                </div>
                ՍԽԱԼ Է (No)
              </button>
            </div>
            
            {/* Feedback alert */}
            {feedback !== null && (
              <div className="text-center">
                {feedback === 'correct' ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-bounce" /> Լա՜վ է! +3 աստղ
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-600 flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" /> Օ՜, սխալ էր:
                  </span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
