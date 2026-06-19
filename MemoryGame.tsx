import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vocabulary } from './data';
import { RefreshCcw, Eye, Award, Star, BookOpen, Sparkles } from 'lucide-react';

interface MemoryCard {
  uniqueId: string; // combination of type + id
  wordId: string;
  text: string;
  lang: 'es' | 'am';
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onScoreIncrement: (stars: number) => void;
}

export default function MemoryGame({ onScoreIncrement }: MemoryGameProps) {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedInRound, setSelectedInRound] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState<number>(0);
  const [turns, setTurns] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  useEffect(() => {
    initializeCards();
  }, []);

  const initializeCards = () => {
    // Pick 6 random pairs from the vocabulary
    const shuffledPairs = [...vocabulary].sort(() => 0.5 - Math.random());
    const selectedPairs = shuffledPairs.slice(0, 6);

    const cardList: MemoryCard[] = [];

    selectedPairs.forEach(pair => {
      // Spanish card
      cardList.push({
        uniqueId: `es-${pair.id}`,
        wordId: pair.id,
        text: pair.spanish,
        lang: 'es',
        isFlipped: false,
        isMatched: false
      });
      // Armenian card
      cardList.push({
        uniqueId: `am-${pair.id}`,
        wordId: pair.id,
        text: pair.armenian,
        lang: 'am',
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle final deck
    const shuffledCards = cardList.sort(() => 0.5 - Math.random());

    setCards(shuffledCards);
    setSelectedInRound([]);
    setMatchedCount(0);
    setTurns(0);
    setIsBusy(false);
  };

  const handleCardClick = (cardIndex: number) => {
    if (isBusy) return;
    const card = cards[cardIndex];
    if (card.isFlipped || card.isMatched) return;

    // Flip card
    const updatedCards = [...cards];
    updatedCards[cardIndex].isFlipped = true;
    setCards(updatedCards);

    const nextSelected = [...selectedInRound, cardIndex];
    setSelectedInRound(nextSelected);

    if (nextSelected.length === 2) {
      setIsBusy(true);
      setTurns(prev => prev + 1);

      const firstCardIndex = nextSelected[0];
      const secondCardIndex = nextSelected[1];
      const card1 = cards[firstCardIndex];
      const card2 = cards[secondCardIndex];

      if (card1.wordId === card2.wordId && card1.lang !== card2.lang) {
        // MATCH found!
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstCardIndex].isMatched = true;
          matchedCards[secondCardIndex].isMatched = true;
          setCards(matchedCards);
          setSelectedInRound([]);
          setMatchedCount(prev => prev + 1);
          onScoreIncrement(5); // +5 stars per matching pair!
          setIsBusy(false);
        }, 500);
      } else {
        // MISMATCH, flip back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCardIndex].isFlipped = false;
          resetCards[secondCardIndex].isFlipped = false;
          setCards(resetCards);
          setSelectedInRound([]);
          setIsBusy(false);
        }, 1200);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-105/90 border-amber-100 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-amber-50">
        <div className="flex items-center gap-1.5">
          <span className="p-1.5 bg-amber-50 rounded-lg text-amber-500">
            <BookOpen className="w-5 h-5 animate-pulse" />
          </span>
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            Խաղ 5. Զույգերի Մտապահում
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-500">
            Քայլեր: <span className="text-amber-600">{turns}</span>
          </span>
          <button
            onClick={initializeCards}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition duration-150"
            title="Խառնել քարտերը"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {matchedCount === 6 ? (
        /* Winner stage */
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-100 animate-bounce">
            <Award className="w-8 h-8 text-amber-500" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-slate-800">Հիանալի՜ է, Գոռ և Գայանե</h3>
            <p className="text-xs text-slate-500 font-medium">Անցած է {turns} քայլում:</p>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl max-w-xs mx-auto">
            <p className="text-2xl font-black text-amber-600 flex items-center justify-center gap-0.5">
              +30 <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
            </p>
            <p className="text-[10px] uppercase font-bold text-amber-700">Բոնուսային Աստղեր</p>
          </div>

          <button
            onClick={initializeCards}
            className="py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition duration-150 inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" /> Նոր Խաղ
          </button>
        </motion.div>
      ) : (
        /* Board stage */
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card, idx) => {
            const isShown = card.isFlipped || card.isMatched;
            
            return (
              <div 
                key={card.uniqueId}
                onClick={() => handleCardClick(idx)}
                className="perspective-1000 h-24 cursor-pointer select-none relative"
              >
                {/* Visual Card body representation */}
                <motion.div
                  animate={{ rotateY: isShown ? 180 : 0 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full h-full rounded-2xl relative preserve-3d transition-shadow duration-200 border-2 ${
                    card.isMatched
                      ? 'border-emerald-250 bg-emerald-500/15 ring-2 ring-emerald-400/20'
                      : card.isFlipped
                      ? 'border-amber-300 bg-amber-50/50'
                      : 'border-slate-100 hover:border-amber-200 bg-gradient-to-br from-indigo-500 to-amber-400 shadow-md hover:scale-[1.02]'
                  }`}
                >
                  {/* Card Front (Face down / Hidden pattern) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center backface-hidden"
                    style={{ display: isShown ? 'none' : 'flex' }}
                  >
                    <div className="text-white text-3xl font-black select-none">?</div>
                  </div>

                  {/* Card Back (Shown content) */}
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center px-2 py-1 backface-hidden rotate-y-180 text-center"
                    style={{ display: isShown ? 'flex' : 'none' }}
                  >
                    {/* Tiny language indicator */}
                    <span className={`text-[8px] uppercase font-bold px-1.5 py-0.5 rounded-full absolute top-1.5 ${
                      card.lang === 'es' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {card.lang === 'es' ? 'esp' : 'arm'}
                    </span>
                    <span className="text-xs font-bold text-slate-800 leading-snug mt-2 block break-words max-w-full">
                      {card.text}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
