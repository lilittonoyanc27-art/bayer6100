import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import InteractiveReader from './InteractiveReader';
import QuizGame from './QuizGame';
import WordMatchGame from './WordMatchGame';
import WordBuilderGame from './WordBuilderGame';
import SpeedTranslator from './SpeedTranslator';
import FillBlanksGame from './FillBlanksGame';
import MemoryGame from './MemoryGame';
import SentenceConstructor from './SentenceConstructor';
import { PlayerProfile } from './types';
import { 
  Sparkles, 
  Map, 
  BookOpen, 
  Lightbulb, 
  CheckCircle, 
  Award, 
  User, 
  Star, 
  Compass, 
  Activity, 
  Gamepad2, 
  Heart 
} from 'lucide-react';

export default function App() {
  // Current active view
  // 'dashboard' | 'reader' | 'quiz' | 'game1' | 'game2' | 'game3' | 'game4' | 'game5' | 'game6'
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Set up player profile (stored in localstorage so Gor or Gayane's stars persist!)
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    const saved = localStorage.getItem('es_learning_profile_gor_gayane');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return {
      name: 'Both',
      stars: 0,
      stats: {
        reader: 0,
        quiz: 0,
        game1: 0,
        game2: 0,
        game3: 0,
        game4: 0,
        game5: 0,
        game6: 0
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('es_learning_profile_gor_gayane', JSON.stringify(profile));
  }, [profile]);

  const handleIncrementStars = (amount: number) => {
    setProfile(prev => {
      const updatedStars = prev.stars + amount;
      
      // Update specific tab tracker
      const updatedStats = { ...prev.stats };
      if (activeTab === 'reader') updatedStats.reader += amount;
      else if (activeTab === 'quiz') updatedStats.quiz += amount;
      else if (activeTab === 'game1') updatedStats.game1 += amount;
      else if (activeTab === 'game2') updatedStats.game2 += amount;
      else if (activeTab === 'game3') updatedStats.game3 += amount;
      else if (activeTab === 'game4') updatedStats.game4 += amount;
      else if (activeTab === 'game5') updatedStats.game5 += amount;
      else if (activeTab === 'game6') updatedStats.game6 += amount;

      return {
        ...prev,
        stars: updatedStars,
        stats: updatedStats
      };
    });
  };

  const handleSelectName = (name: 'Gor' | 'Gayane' | 'Both') => {
    setProfile(prev => ({
      ...prev,
      name
    }));
  };

  const handleResetProgress = () => {
    if (window.confirm("Ցանկանո՞ւմ եք զրոյացնել աստղերն ու խաղերի առաջընթացը:")) {
      const defaultProfile: PlayerProfile = {
        name: 'Both',
        stars: 0,
        stats: {
          reader: 0,
          quiz: 0,
          game1: 0,
          game2: 0,
          game3: 0,
          game4: 0,
          game5: 0,
          game6: 0
        }
      };
      setProfile(defaultProfile);
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans leading-relaxed flex flex-col selection:bg-rose-500 selection:text-white">
      
      {/* Decorative Spanish/Armenian background touch */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 z-50 shadow-sm" />

      {/* Top Personalized Bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-rose-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-rose-100 group-hover:scale-105 transition-all duration-200">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-slate-800 flex items-center gap-1">
                Գոռ & Գայանե
                <span className="text-[10px] bg-amber-100 text-amber-850 px-1.5 py-0.5 rounded font-extrabold uppercase tracking-widest text-amber-700">ES 🇪🇸</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Իսպաներենի Ուսուցում</p>
            </div>
          </div>

          {/* User selector & Stars */}
          <div className="flex items-center gap-4">
            {/* Play as Selector */}
            <div className="hidden sm:flex bg-slate-100 p-1.5 rounded-xl border border-slate-150 gap-1 text-[11px] font-bold">
              <button 
                onClick={() => handleSelectName('Gor')}
                className={`px-3 py-1.5 rounded-lg transition ${profile.name === 'Gor' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                👦 Գոռ (Gor)
              </button>
              <button 
                onClick={() => handleSelectName('Gayane')}
                className={`px-3 py-1.5 rounded-lg transition ${profile.name === 'Gayane' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                👧 Գայանե (Gayane)
              </button>
              <button 
                onClick={() => handleSelectName('Both')}
                className={`px-3 py-1.5 rounded-lg transition ${profile.name === 'Both' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
              >
                👫 Միասին
              </button>
            </div>

            {/* Stars badge */}
            <motion.div 
              key={profile.stars}
              initial={{ scale: 0.8 }}
              animate={{ scale: [1, 1.15, 1] }}
              className="flex items-center gap-1.5 bg-gradient-to-br from-amber-400 to-orange-500 text-white py-1.5 px-3.5 rounded-2xl shadow-md font-black text-sm"
              title="Ընդհանուր Աստղեր"
            >
              <Star className="w-4 h-4 fill-white text-white animate-pulse" />
              <span>{profile.stars}</span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        
        {/* Mobile Name Selector */}
        <div className="sm:hidden mb-6 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ո՞վ է խաղում:</span>
          <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 text-[10px] font-bold">
            <button 
              onClick={() => handleSelectName('Gor')}
              className={`px-2.5 py-1 rounded bg-transparent ${profile.name === 'Gor' ? 'bg-rose-500 text-white font-bold' : 'text-slate-500'}`}
            >
              👦 Գոռ 
            </button>
            <button 
              onClick={() => handleSelectName('Gayane')}
              className={`px-2.5 py-1 rounded bg-transparent ${profile.name === 'Gayane' ? 'bg-rose-500 text-white font-bold' : 'text-slate-500'}`}
            >
              👧 Գայանե
            </button>
            <button 
              onClick={() => handleSelectName('Both')}
              className={`px-2.5 py-1 rounded bg-transparent ${profile.name === 'Both' ? 'bg-rose-500 text-white font-bold' : 'text-slate-500'}`}
            >
              👫 Երկուսով
            </button>
          </div>
        </div>

        {/* Content Render Switch */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Hero Banner card */}
              <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-amber-400">
                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl">ES</div>
                
                <div className="relative z-10 max-w-lg space-y-3">
                  <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-black tracking-widest rounded-full uppercase">
                    ¡Bienvenidos a España! 🇪🇸
                  </span>
                  <h2 className="text-2xl sm:text-3.5xl font-black leading-tight tracking-tight">
                    Ողջո՛ւյն, {profile.name === 'Both' ? 'Գոռ և Գայանե' : profile.name === 'Gor' ? 'Գոռ' : 'Գայանե'}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-semibold">
                    Այսօր մենք կսովորենք իսպաներեն զվարճալի խաղերի միջոցով։ Կարդացեք մեր ճանապարհորդության պատմությունը, անցեք ճամփորդական վիկտորինան և փորձեք բոլոր 6 հրաշալի ինտերակտիվ խաղերը։
                  </p>
                </div>
              </div>

              {/* Learning Sections Grid */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-rose-500" />
                    1. Գիրք և Թարգմանություններ (Interactive Reader)
                  </h3>
                  <div className="mt-3 grid gap-4 grid-cols-1">
                    <div 
                      onClick={() => setActiveTab('reader')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-rose-200 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-rose-50 rounded-xl text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition duration-200">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-rose-600 transition">Ընթերցանության Պատմություններ</h4>
                          <p className="text-xs text-slate-400 mt-0.5 font-medium">Կարդացեք իսպաներեն և սեղմեք՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար։</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:bg-rose-500 group-hover:text-white transition">Կարդալ</span>
                    </div>
                  </div>
                </div>

                {/* Travel Quiz Section */}
                <div>
                  <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-amber-500" />
                    2. Ճանապարհորդության Վիկտորինա (Travel Quiz)
                  </h3>
                  <div className="mt-3 grid gap-4 grid-cols-1">
                    <div 
                      onClick={() => setActiveTab('quiz')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-4 bg-amber-50 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition duration-200">
                          <Compass className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition">Իսպանական Արկածներ (10 հարց)</h4>
                          <p className="text-xs text-slate-400 mt-0.5 font-medium">Իսկական 10 հարցից բաղկացած վիկտորինա վանապարհորդության և Իսպանիայի մշակույթի մասին:</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:bg-amber-500 group-hover:text-white transition">Սկսել</span>
                    </div>
                  </div>
                </div>

                {/* 6 Interactive Games Section */}
                <div>
                  <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-violet-500" />
                    3. 6 Ինտերակտիվ Խաղեր (6 Interactive Games)
                  </h3>
                  
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-3">
                    
                    {/* Game 1: Word Match */}
                    <div 
                      onClick={() => setActiveTab('game1')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center font-bold">
                          1
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition">Բառերի Համապատասխանեցում</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Գտեք զույգերը իսպաներեն և հայերեն տարբերակների միջև։</p>
                      </div>
                      <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest self-end">Խաղալ &rarr;</span>
                    </div>

                    {/* Game 2: Word Builder */}
                    <div 
                      onClick={() => setActiveTab('game2')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-violet-50 text-violet-500 rounded-xl flex items-center justify-center font-bold">
                          2
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-violet-600 transition">Տառերի Կառուցում (Anagram)</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Կառուցեք ճիշտ իսպաներեն բառերը՝ խառնված տառերի բլոկներից։</p>
                      </div>
                      <span className="text-[9px] font-bold text-violet-500 uppercase tracking-widest self-end">Խաղալ &rarr;</span>
                    </div>

                    {/* Game 3: Speed Translator */}
                    <div 
                      onClick={() => setActiveTab('game3')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-rose-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center font-bold">
                          3
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-rose-600 transition">Արագ Թարգմանիչ</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Ակնթարթային ճիշտ/սխալ թարգմանության որոշում՝ ժամանակաչափով։</p>
                      </div>
                      <span className="text-[9px] font-bold text-rose-500 uppercase tracking-widest self-end">Խաղալ &rarr;</span>
                    </div>

                    {/* Game 4: Fill in Blanks */}
                    <div 
                      onClick={() => setActiveTab('game4')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center font-bold">
                          4
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-600 transition">Լրացրո՛ւ Բացթողումը</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Ընտրեք ճիշտ իսպաներեն բառը նախադասությունն ամբողջացնելու համար։</p>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest self-end">Խաղալ &rarr;</span>
                    </div>

                    {/* Game 5: Memory Cards */}
                    <div 
                      onClick={() => setActiveTab('game5')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center font-bold">
                          5
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-amber-600 transition">Զույգերի Մտապահում</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Մարզեք հիշողությունը՝ բացելով համապատասխան բառերի զույգերը:</p>
                      </div>
                      <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest self-end">Խաղալ &rarr;</span>
                    </div>

                    {/* Game 6: Sentence Constructor */}
                    <div 
                      onClick={() => setActiveTab('game6')}
                      className="bg-white p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 group"
                    >
                      <div className="space-y-2">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center font-bold">
                          6
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition">Նախադասության Կառուցող</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Կառուցեք ամբողջական նախադասություններ տրված բառերից:</p>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest self-end">Խաղալ &rarr;</span>
                    </div>

                  </div>
                </div>
              </div>

              {/* Reset progress line */}
              <div className="text-center pt-4">
                <button 
                  onClick={handleResetProgress}
                  className="text-xs text-slate-400 hover:text-rose-500 font-bold transition border-b border-slate-200 border-dashed pb-0.5"
                >
                  Զրոյացնել առաջընթացն ու աստղերը ⚙️
                </button>
              </div>

            </motion.div>
          )}

          {/* Active View Containers */}
          {activeTab !== 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              {/* Back navigation banner */}
              <div className="flex justify-between items-center bg-white py-3 px-5 rounded-2xl border border-slate-100 shadow-sm">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="text-xs font-black text-slate-600 hover:text-rose-500 transition flex items-center gap-1.5"
                >
                  &larr; Գլխավոր Էջ
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  <Activity className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>
                    {activeTab === 'reader' && 'Ընթերցանության Գիրք'}
                    {activeTab === 'quiz' && 'Ճանապարհորդության Վիկտորինա'}
                    {activeTab === 'game1' && 'Խաղ 1. Զույգեր'}
                    {activeTab === 'game2' && 'Խաղ 2. Տառեր'}
                    {activeTab === 'game3' && 'Խաղ 3. Արագ Թարգմանիչ'}
                    {activeTab === 'game4' && 'Խաղ 4. Լրացրո՛ւ Բացթողումը'}
                    {activeTab === 'game5' && 'Խաղ 5. Հիշողության Քարտեր'}
                    {activeTab === 'game6' && 'Խաղ 6. Նախադասություններ'}
                  </span>
                </div>
              </div>

              {/* Target Component */}
              {activeTab === 'reader' && (
                <InteractiveReader onScoreIncrement={handleIncrementStars} lang="am" />
              )}
              {activeTab === 'quiz' && (
                <QuizGame onScoreIncrement={handleIncrementStars} />
              )}
              {activeTab === 'game1' && (
                <WordMatchGame onScoreIncrement={handleIncrementStars} />
              )}
              {activeTab === 'game2' && (
                <WordBuilderGame onScoreIncrement={handleIncrementStars} />
              )}
              {activeTab === 'game3' && (
                <SpeedTranslator onScoreIncrement={handleIncrementStars} />
              )}
              {activeTab === 'game4' && (
                <FillBlanksGame onScoreIncrement={handleIncrementStars} />
              )}
              {activeTab === 'game5' && (
                <MemoryGame onScoreIncrement={handleIncrementStars} />
              )}
              {activeTab === 'game6' && (
                <SentenceConstructor onScoreIncrement={handleIncrementStars} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Modern Humble Footer */}
      <footer className="bg-white border-t border-slate-100 text-center py-6 mt-12 bg-white/70">
        <p className="text-[11px] font-bold text-slate-450 text-slate-400 tracking-wider">
          🇪🇸 ՄՇԱԿՎԱԾ Է ԳՈՌԻ ԵՎ ԳԱՅԱՆԵԻ ՀԱՄԱՐ • ԱՐԿԱԾԱՅԻՆ ԻՍՊԱՆԵՐԵՆ 🇦🇲
        </p>
        <p className="text-[10px] text-slate-300 mt-1 flex items-center justify-center gap-1 font-semibold">
          Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" /> for easy learning
        </p>
      </footer>

    </div>
  );
}
