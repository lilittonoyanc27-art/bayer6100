import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { travelQuizQuestions } from './data';
import { Compass, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, Star, AlertTriangle } from 'lucide-react';

interface QuizGameProps {
  onScoreIncrement: (stars: number) => void;
}

export default function QuizGame({ onScoreIncrement }: QuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isAnswered) return;
    
    const currentQuestion = travelQuizQuestions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      onScoreIncrement(5); // 5 stars per correct answer!
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion.id]);
    }
    
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentIndex + 1 < travelQuizQuestions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
    setWrongAnswers([]);
  };

  const currentQuestion = travelQuizQuestions[currentIndex];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100 max-w-2xl mx-auto">
      {/* Upper Badge */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-amber-50">
        <div className="flex items-center gap-1.5">
          <span className="p-1.5 bg-amber-50 rounded-lg text-amber-500">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            Ճանապարհորդության Վիկտորինա (10 հարց)
          </span>
        </div>
        {!showResults && (
          <span className="text-xs font-bold text-slate-500">
            Հարց: <span className="text-amber-600">{currentIndex + 1}</span> / {travelQuizQuestions.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={currentIndex}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Question Text */}
            <h3 className="text-lg font-bold text-slate-800 leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Options */}
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option;
                const isCorrectAns = option === currentQuestion.correctAnswer;
                
                let buttonStyle = "border-slate-100 hover:border-amber-200 bg-slate-50 text-slate-700";
                let icon = null;

                if (isAnswered) {
                  if (isCorrectAns) {
                    buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-800";
                    icon = <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
                  } else if (isSelected) {
                    buttonStyle = "border-rose-400 bg-rose-50 text-rose-800";
                    icon = <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
                  } else {
                    buttonStyle = "border-slate-100 bg-slate-50/50 text-slate-400 opacity-60";
                  }
                } else if (isSelected) {
                  buttonStyle = "border-amber-500 bg-amber-50/80 text-amber-900 shadow-sm scale-[1.01]";
                }

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-2xl border-2 font-medium transition-all duration-200 flex items-center justify-between gap-3 text-sm ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Actions & Explanation block */}
            <div className="pt-3">
              {isAnswered && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-slate-50 border border-slate-150 rounded-2xl p-4 mb-4 text-xs text-slate-600 line-height-relaxed"
                >
                  <p className="font-bold flex items-center gap-1.5 text-amber-700 mb-1">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    Բացատրություն
                  </p>
                  {currentQuestion.explanation}
                </motion.div>
              )}

              <div className="flex justify-end">
                {!isAnswered ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className={`py-3 px-6 rounded-xl font-bold text-xs transition duration-200 shadow-sm ${
                      selectedOption
                        ? 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white shadow-amber-200'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Պատասխանել
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="py-3 px-6 bg-slate-800 hover:bg-slate-900 active:bg-black text-white font-bold text-xs rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-md"
                  >
                    {currentIndex + 1 < travelQuizQuestions.length ? 'Հաջորդ հարցը' : 'Պատասխաններ'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Results Screen */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-6 space-y-6"
          >
            <div className="flex justify-center">
              <div className="p-4 bg-amber-50 rounded-full border border-amber-100 flex items-center justify-center animate-bounce">
                <Award className="w-16 h-16 text-amber-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">
                Շնորհավորո՛ւմ ենք Գոռ և Գայանե
              </h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Դուք ավարտեցիք իսպաներենի ճանապարհորդության վիկտորինան և ստացաք արժեքավոր գիտելիքներ:
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-slate-800">{score} / 10</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Ճիշտ պատասխաններ</p>
              </div>
              <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-2xl">
                <p className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                  +{score * 5} <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                </p>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">Վաստակած Աստղեր</p>
              </div>
            </div>

            {/* Recommendation badge depending on performance */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 text-xs text-amber-800 max-w-md mx-auto border border-amber-105/50 font-medium">
              {score === 10 ? (
                <span>🌟 <b>Ֆանտաստի՜կ։ 10/10 ձեռքբերում։</b> Գոռն ու Գայանեն իսպաներենի իսկական փորձագետներ են։</span>
              ) : score >= 7 ? (
                <span>🎉 <b>Շատ լավ է: {score}/10!</b> Դուք հիանալի պատրաստված եք իսպանական արկածներին։</span>
              ) : (
                <span>📚 <b>{score}/10: Փորձեք ևս մեկ անգամ:</b> Կարդացեք պատմությունները և բարձրացրեք ձեր գիտելիքները:</span>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={handleRestart}
                className="py-3 px-6 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 font-bold text-xs rounded-xl transition duration-200 flex items-center justify-center gap-2 mx-auto border-2 border-slate-250 border-dashed"
              >
                <RotateCcw className="w-4 h-4" /> Խաղալ նորից
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
