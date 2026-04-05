/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode, MouseEvent } from 'react';
import { Heart, Share2, Sparkles, Users, Calendar, Trophy, Gamepad2, BookOpen, UserCircle, ChevronLeft, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Constants ---

type Language = 'en' | 'hi' | 'mr' | 'es' | 'fr' | 'de' | 'ja';
type View = 'home' | 'calculator' | 'quizzes' | 'personality' | 'games' | 'quiz_active' | 'game_active' | 'fun_questions';
type Mode = 'love' | 'friend';

interface TranslationSet {
  title: string;
  loveCalc: string;
  bffCalc: string;
  quizzes: string;
  personality: string;
  games: string;
  funQuestions: string;
  nextQuestion: string;
  calculate: string;
  yourName: string;
  partnerName: string;
  friendName: string;
  birthDate: string;
  share: string;
  back: string;
  score: string;
  verdict: string;
  prediction: string;
  catchHeart: string;
  scoreLabel: string;
  timeLabel: string;
  start: string;
  gameOver: string;
}

const translations: Record<Language, TranslationSet> = {
  en: {
    title: "Love & Friend Hub",
    loveCalc: "Love Calculator",
    bffCalc: "BFF Calculator",
    quizzes: "Fun Quizzes",
    personality: "Personality Tests",
    games: "Mini Games",
    funQuestions: "Fun Questions",
    nextQuestion: "Next Question 🎲",
    calculate: "Calculate Destiny ✨",
    yourName: "Your Name",
    partnerName: "Partner Name",
    friendName: "Friend Name",
    birthDate: "Birth Date",
    share: "Share on WhatsApp",
    back: "Back to Home",
    score: "Match Score",
    verdict: "Verdict",
    prediction: "Prediction",
    catchHeart: "Catch the Heart",
    scoreLabel: "Score",
    timeLabel: "Time",
    start: "Start Game",
    gameOver: "Game Over!",
  },
  hi: {
    title: "लव और फ्रेंड हब",
    loveCalc: "लव कैलकुलेटर",
    bffCalc: "BFF कैलकुलेटर",
    quizzes: "मज़ेदार क्विज़",
    personality: "व्यक्तित्व परीक्षण",
    games: "मिनी गेम्स",
    funQuestions: "मज़ेदार सवाल",
    nextQuestion: "अगला सवाल 🎲",
    calculate: "भाग्य की गणना करें ✨",
    yourName: "आपका नाम",
    partnerName: "साथी का नाम",
    friendName: "दोस्त का नाम",
    birthDate: "जन्म तिथि",
    share: "व्हाट्सएप पर साझा करें",
    back: "होम पर वापस जाएं",
    score: "मैच स्कोर",
    verdict: "फैसला",
    prediction: "भविष्यवाणी",
    catchHeart: "दिल पकड़ो",
    scoreLabel: "स्कोर",
    timeLabel: "समय",
    start: "खेल शुरू करें",
    gameOver: "खेल खत्म!",
  },
  mr: {
    title: "लव्ह आणि फ्रेंड हब",
    loveCalc: "लव्ह कॅल्क्युलेटर",
    bffCalc: "BFF कॅल्क्युलेटर",
    quizzes: "मजेशीर क्विझ",
    personality: "व्यक्तिमत्व चाचणी",
    games: "मिनी गेम्स",
    funQuestions: "मजेशीर प्रश्न",
    nextQuestion: "पुढचा प्रश्न 🎲",
    calculate: "नशिबाची गणना करा ✨",
    yourName: "तुमचे नाव",
    partnerName: "जोडीदाराचे नाव",
    friendName: "मित्राचे नाव",
    birthDate: "जन्म तारीख",
    share: "व्हॉट्सॲपवर शेअर करा",
    back: "होमवर परत जा",
    score: "मॅच स्कोर",
    verdict: "निकाल",
    prediction: "भविष्यवाणी",
    catchHeart: "हृदय पकडा",
    scoreLabel: "स्कोर",
    timeLabel: "वेळ",
    start: "खेळ सुरू करा",
    gameOver: "खेळ संपला!",
  },
  es: {
    title: "Centro de Amor y Amigos",
    loveCalc: "Calculadora de Amor",
    bffCalc: "Calculadora de Mejores Amigos",
    quizzes: "Cuestionarios Divertidos",
    personality: "Pruebas de Personalidad",
    games: "Mini Juegos",
    funQuestions: "Preguntas Divertidas",
    nextQuestion: "Siguiente Pregunta 🎲",
    calculate: "Calcular Destino ✨",
    yourName: "Tu Nombre",
    partnerName: "Nombre de la Pareja",
    friendName: "Nombre del Amigo",
    birthDate: "Fecha de Nacimiento",
    share: "Compartir en WhatsApp",
    back: "Volver a Inicio",
    score: "Puntuación de Pareja",
    verdict: "Veredicto",
    prediction: "Predicción",
    catchHeart: "Atrapa el Corazón",
    scoreLabel: "Puntuación",
    timeLabel: "Tiempo",
    start: "Empezar Juego",
    gameOver: "¡Juego Terminado!",
  },
  fr: {
    title: "Hub Amour et Amitié",
    loveCalc: "Calculateur d'Amour",
    bffCalc: "Calculateur de Meilleurs Amis",
    quizzes: "Quiz Amusants",
    personality: "Tests de Personnalité",
    games: "Mini-Jeux",
    funQuestions: "Questions Amusantes",
    nextQuestion: "Question Suivante 🎲",
    calculate: "Calculer le Destin ✨",
    yourName: "Votre Nom",
    partnerName: "Nom du Partenaire",
    friendName: "Nom de l'Ami",
    birthDate: "Date de Naissance",
    share: "Partager sur WhatsApp",
    back: "Retour à l'Accueil",
    score: "Score de Match",
    verdict: "Verdict",
    prediction: "Prédiction",
    catchHeart: "Attrape le Cœur",
    scoreLabel: "Score",
    timeLabel: "Temps",
    start: "Commencer le Jeu",
    gameOver: "Jeu Terminé !",
  },
  de: {
    title: "Liebe & Freunde Hub",
    loveCalc: "Liebesrechner",
    bffCalc: "BFF-Rechner",
    quizzes: "Lustige Quizze",
    personality: "Persönlichkeitstests",
    games: "Minispiele",
    funQuestions: "Lustige Fragen",
    nextQuestion: "Nächste Frage 🎲",
    calculate: "Schicksal berechnen ✨",
    yourName: "Dein Name",
    partnerName: "Name des Partners",
    friendName: "Name des Freundes",
    birthDate: "Geburtsdatum",
    share: "Auf WhatsApp teilen",
    back: "Zurück zur Startseite",
    score: "Match-Score",
    verdict: "Urteil",
    prediction: "Vorhersage",
    catchHeart: "Fang das Herz",
    scoreLabel: "Punktzahl",
    timeLabel: "Zeit",
    start: "Spiel starten",
    gameOver: "Spiel vorbei!",
  },
  ja: {
    title: "愛と友情のハブ",
    loveCalc: "愛の計算機",
    bffCalc: "親友計算機",
    quizzes: "楽しいクイズ",
    personality: "性格診断",
    games: "ミニゲーム",
    funQuestions: "楽しい質問",
    nextQuestion: "次の質問 🎲",
    calculate: "運命を計算する ✨",
    yourName: "あなたの名前",
    partnerName: "パートナーの名前",
    friendName: "友達の名前",
    birthDate: "生年月日",
    share: "WhatsAppで共有",
    back: "ホームに戻る",
    score: "マッチスコア",
    verdict: "判定",
    prediction: "予測",
    catchHeart: "ハートをキャッチ",
    scoreLabel: "スコア",
    timeLabel: "時間",
    start: "ゲーム開始",
    gameOver: "ゲームオーバー！",
  }
};

// --- Main App Component ---

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<View>('home');
  const [mode, setMode] = useState<Mode>('love');
  const [activeQuiz, setActiveQuiz] = useState<any>(null);

  useEffect(() => {
    console.log("App mounted, current view:", view);
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'home': return <HomeView setView={setView} setMode={setMode} lang={lang} setLang={setLang} />;
      case 'calculator': return <CalculatorView mode={mode} lang={lang} setView={setView} />;
      case 'quizzes': return <QuizzesView type="quiz" lang={lang} setView={setView} setQuizData={setActiveQuiz} />;
      case 'personality': return <QuizzesView type="personality" lang={lang} setView={setView} setQuizData={setActiveQuiz} />;
      case 'games': return <GamesView lang={lang} setView={setView} />;
      case 'fun_questions': return <FunQuestionsView lang={lang} setView={setView} />;
      case 'quiz_active': return <ActiveQuizView quizData={activeQuiz} lang={lang} setView={setView} />;
      case 'game_active': return <CatchHeartGame lang={lang} setView={setView} />;
      default: return <HomeView setView={setView} setMode={setMode} lang={lang} setLang={setLang} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fff0f3] flex flex-col items-center justify-center p-4 font-sans text-[#444]">
      <AnimatePresence mode="wait">
        <motion.div
          key={view + lang}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="w-full max-w-md"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Sub-Views ---

function HomeView({ setView, setMode, lang, setLang }: { setView: (v: View) => void, setMode: (m: Mode) => void, lang: Language, setLang: (l: Language) => void }) {
  const t = translations[lang];
  
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100 text-center">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {(['en', 'hi', 'mr', 'es', 'fr', 'de', 'ja'] as Language[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${lang === l ? 'bg-[#ff4d6d] text-white' : 'bg-pink-50 text-[#ff4d6d]'}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <Languages size={20} className="text-pink-300 ml-2 shrink-0" />
      </div>

      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }}>
        <Heart className="mx-auto text-[#ff4d6d] fill-[#ff4d6d] mb-4" size={48} />
      </motion.div>
      
      <h1 className="text-3xl font-black text-gray-800 mb-8 tracking-tight">{t.title}</h1>

      <div className="grid grid-cols-1 gap-4">
        <MenuButton icon={<Heart size={20} fill="currentColor" />} label={t.loveCalc} color="bg-[#ff4d6d]" onClick={() => { setMode('love'); setView('calculator'); }} />
        <MenuButton icon={<Users size={20} />} label={t.bffCalc} color="bg-pink-500" onClick={() => { setMode('friend'); setView('calculator'); }} />
        <MenuButton icon={<BookOpen size={20} />} label={t.quizzes} color="bg-purple-500" onClick={() => setView('quizzes')} />
        <MenuButton icon={<UserCircle size={20} />} label={t.personality} color="bg-indigo-500" onClick={() => setView('personality')} />
        <MenuButton icon={<BookOpen size={20} />} label={t.funQuestions} color="bg-teal-500" onClick={() => setView('fun_questions')} />
        <MenuButton icon={<Gamepad2 size={20} />} label={t.games} color="bg-orange-500" onClick={() => setView('games')} />
      </div>

    </div>
  );
}

function CalculatorView({ mode, lang, setView }: { mode: Mode, lang: Language, setView: (v: View) => void }) {
  const t = translations[lang];
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [dob1, setDob1] = useState('');
  const [dob2, setDob2] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!name1 || !name2) return;
    setIsCalculating(true);
    setResult(null);

    setTimeout(() => {
      const combined = [name1, name2].sort().join("").toLowerCase();
      let hash = 0;
      for (let i = 0; i < combined.length; i++) hash = combined.charCodeAt(i) + ((hash << 5) - hash);
      
      const score = Math.abs(hash % 101);
      const year = 2026 + Math.abs(hash % 8);
      
      let verdict = "";
      if (mode === 'love') {
        if (score > 80) verdict = "🔥 Perfect match! Plan the wedding!";
        else if (score > 60) verdict = "💖 Strong vibes! A romantic date will work wonders.";
        else if (score > 40) verdict = "🤔 Needs effort. Maybe chocolates or a movie night?";
        else verdict = "💔 Oops… better luck next time!";
      } else {
        if (score > 80) verdict = "🍕 BFFs Forever! Unstoppable duo!";
        else if (score > 60) verdict = "🌟 True Friends! Always there for each other.";
        else if (score > 40) verdict = "🤝 Good bond. Spend more time together!";
        else verdict = "🍃 Just acquaintances for now.";
      }

      setResult({
        score,
        verdict,
        prediction: mode === 'love' ? `Wedding Year: ${year}` : `Friendship: ${score - 40} years!`
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100 relative">
      <button onClick={() => setView('home')} className="absolute top-6 left-6 text-gray-400 hover:text-[#ff4d6d] transition-colors">
        <ChevronLeft size={24} />
      </button>
      
      <h2 className="text-2xl font-black text-center mb-8 mt-4">
        {mode === 'love' ? t.loveCalc : t.bffCalc}
      </h2>

      <div className="space-y-4">
        <InputGroup label={t.yourName} value={name1} onChange={setName1} placeholder="Rahul" />
        <InputGroup label={t.birthDate} value={dob1} onChange={setDob1} type="date" />
        
        <div className="flex justify-center py-2">
          <Heart className="text-pink-200" fill="currentColor" size={24} />
        </div>

        <InputGroup label={mode === 'love' ? t.partnerName : t.friendName} value={name2} onChange={setName2} placeholder="Priya" />
        <InputGroup label={t.birthDate} value={dob2} onChange={setDob2} type="date" />

        <button
          onClick={calculate}
          disabled={isCalculating || !name1 || !name2}
          className="w-full bg-[#ff4d6d] text-white font-black py-5 rounded-2xl shadow-xl shadow-pink-100 transition-all active:scale-95 flex items-center justify-center gap-2 text-xl mt-4"
        >
          {isCalculating ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Sparkles size={24} /></motion.div> : t.calculate}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 p-6 rounded-3xl bg-pink-50 border-2 border-dashed border-pink-200 text-center">
            <div className="text-5xl font-black text-[#ff4d6d] mb-2">{result.score}%</div>
            <div className="font-bold text-gray-800">{result.verdict}</div>
            <div className="text-sm text-gray-500 mb-6">{result.prediction}</div>
            <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`I checked our compatibility! ❤️ We are a ${result.score}% Match! 😍 Check yours here: ${window.location.href}`)}`, '_blank')} className="w-full bg-[#25d366] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-100">
              <Share2 size={20} /> {t.share}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuizzesView({ type, lang, setView, setQuizData }: { type: 'quiz' | 'personality', lang: Language, setView: (v: View) => void, setQuizData: (d: any) => void }) {
  const t = translations[lang];
  
  const items = type === 'quiz' ? [
    { id: 'partner', title: lang === 'en' ? "How well do you know your partner?" : lang === 'hi' ? "आप अपने साथी को कितना जानते हैं?" : "तुम्ही तुमच्या जोडीदाराला किती ओळखता?", icon: <Heart size={20} />, color: "bg-pink-500" },
    { id: 'friend', title: lang === 'en' ? "Friendship Strength Test" : lang === 'hi' ? "दोस्ती की ताकत का परीक्षण" : "मैत्रीची ताकद चाचणी", icon: <Users size={20} />, color: "bg-blue-500" },
    { id: 'gk', title: lang === 'en' ? "General Knowledge 🎯" : lang === 'hi' ? "सामान्य ज्ञान 🎯" : "सामान्य ज्ञान 🎯", icon: <Trophy size={20} />, color: "bg-green-500" },
  ] : [
    { id: 'introvert', title: lang === 'en' ? "Are you Introvert or Extrovert?" : lang === 'hi' ? "क्या आप अंतर्मुखी हैं या बहिर्मुखी?" : "तुम्ही अंतर्मुख आहात की बहिर्मुख?", icon: <UserCircle size={20} />, color: "bg-indigo-500" },
    { id: 'bollywood', title: lang === 'en' ? "Which Bollywood Couple are you?" : lang === 'hi' ? "आप कौन सी बॉलीवुड जोड़ी हैं?" : "तुम्ही कोणती बॉलिवूड जोडी आहात?", icon: <Sparkles size={20} />, color: "bg-yellow-500" },
  ];

  const startQuiz = (id: string) => {
    let questions = [];
    if (id === 'partner') {
      questions = [
        { q: lang === 'en' ? "What is their favorite food?" : "उनका पसंदीदा खाना क्या है?", options: ["Pizza", "Biryani", "Burger", "Pasta"] },
        { q: lang === 'en' ? "Where is their dream vacation?" : "उनकी सपनों की छुट्टी कहाँ है?", options: ["Paris", "Maldives", "Switzerland", "Bali"] },
        { q: lang === 'en' ? "What is their biggest fear?" : "उनका सबसे बड़ा डर क्या है?", options: ["Spiders", "Heights", "Darkness", "Loneliness"] },
        { q: lang === 'en' ? "What is their favorite movie?" : "उनकी पसंदीदा फिल्म क्या है?", options: ["DDLJ", "Jab We Met", "Yeh Jawaani Hai Deewani", "Tamasha"] },
        { q: lang === 'en' ? "What makes them happiest?" : "उन्हें सबसे ज्यादा खुशी क्या देती है?", options: ["Food", "Travel", "Sleep", "You! ❤️"] },
      ];
    } else if (id === 'friend') {
      questions = [
        { q: lang === 'en' ? "How did you first meet?" : "आप पहली बार कैसे मिले?", options: ["School", "College", "Mutual Friend", "Social Media"] },
        { q: lang === 'en' ? "What is your favorite activity together?" : "एक साथ आपकी पसंदीदा गतिविधि क्या है?", options: ["Eating", "Gaming", "Talking", "Traveling"] },
        { q: lang === 'en' ? "Who is more likely to get into trouble?" : "किसके मुसीबत में पड़ने की संभावना अधिक है?", options: ["Me", "Them", "Both", "Neither"] },
        { q: lang === 'en' ? "What is your inside joke about?" : "आपका इनसाइड जोक किस बारे में है?", options: ["A Teacher", "An Ex", "A Funny Incident", "Something Weird"] },
        { q: lang === 'en' ? "How long will you be friends?" : "आप कब तक दोस्त रहेंगे?", options: ["1 Year", "5 Years", "10 Years", "Forever! ♾️"] },
      ];
    } else if (id === 'gk') {
      questions = [
        { q: lang === 'en' ? "What is the capital of India?" : "भारत की राजधानी क्या है?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: "Delhi" },
        { q: lang === 'en' ? "Which planet is known as the Red Planet?" : "किस ग्रह को लाल ग्रह के रूप में जाना जाता है?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
        { q: lang === 'en' ? "Who wrote the national anthem of India?" : "भारत का राष्ट्रगान किसने लिखा था?", options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Mahatma Gandhi"], answer: "Rabindranath Tagore" },
      ];
    } else if (id === 'introvert') {
      questions = [
        { q: lang === 'en' ? "A party on Friday night?" : "शुक्रवार की रात एक पार्टी?", options: ["I'm there!", "Maybe for an hour", "I'd rather stay home", "Only if there's food"] },
        { q: lang === 'en' ? "Talking to strangers?" : "अजनबियों से बात करना?", options: ["Easy!", "I can manage", "Terrifying", "I avoid it"] },
        { q: lang === 'en' ? "How do you recharge?" : "आप खुद को कैसे रिचार्ज करते हैं?", options: ["Being with people", "Being alone", "Sleeping", "Watching a movie"] },
        { q: lang === 'en' ? "Your ideal weekend?" : "आपका आदर्श सप्ताहांत?", options: ["Clubbing", "Hiking", "Reading a book", "Gaming"] },
        { q: lang === 'en' ? "In a group discussion?" : "एक समूह चर्चा में?", options: ["I lead", "I participate", "I listen", "I stay quiet"] },
      ];
    } else if (id === 'bollywood') {
      questions = [
        { q: lang === 'en' ? "Your love style?" : "आपकी प्रेम शैली?", options: ["Classic Romance", "Fun & Quirky", "Deep & Intense", "Modern & Cool"] },
        { q: lang === 'en' ? "Ideal date?" : "आदर्श तिथि?", options: ["Candlelight Dinner", "Road Trip", "Movie Night", "Adventure Park"] },
        { q: lang === 'en' ? "How do you handle fights?" : "आप झगड़ों को कैसे संभालते हैं?", options: ["Silent Treatment", "Talk it out", "Grand Gesture", "Cry & Hug"] },
        { q: lang === 'en' ? "Your couple vibe?" : "आपका कपल वाइब?", options: ["Royal", "Chill", "Crazy", "Sweet"] },
        { q: lang === 'en' ? "Favorite Bollywood song?" : "पसंदीदा बॉलीवुड गाना?", options: ["Tum Hi Ho", "Mauja Hi Mauja", "Kesariya", "Dil Diyan Gallan"] },
      ];
    }
    setQuizData({ id, questions, title: items.find(i => i.id === id)?.title });
    setView('quiz_active');
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100 relative">
      <button onClick={() => setView('home')} className="absolute top-6 left-6 text-gray-400 hover:text-[#ff4d6d] transition-colors">
        <ChevronLeft size={24} />
      </button>
      <h2 className="text-2xl font-black text-center mb-8 mt-4">{type === 'quiz' ? t.quizzes : t.personality}</h2>
      <div className="space-y-4">
        {items.map(item => (
          <button key={item.id} onClick={() => startQuiz(item.id)} className={`w-full p-6 rounded-3xl text-white font-bold flex items-center gap-4 transition-all active:scale-95 ${item.color} shadow-lg shadow-gray-100`}>
            <div className="bg-white/20 p-2 rounded-xl">{item.icon}</div>
            <span className="text-left">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FunQuestionsView({ lang, setView }: { lang: Language, setView: (v: View) => void }) {
  const t = translations[lang];
  
  const questions: Record<Language, string[]> = {
    en: [
      "If I give you ₹1 lakh, what will you do for your crush?",
      "If you could swap lives with a celebrity for one day, who would it be?",
      "What’s the craziest thing you’d do for free pizza?",
      "If you had superpowers for 24 hours, what’s the first thing you’d do?",
      "What’s the funniest prank you’ve ever pulled?",
      "If you could time travel, which year would you visit first?",
      "What’s the most embarrassing thing you’d do for ₹5000?",
      "If you could be invisible for a day, what’s the first place you’d go?",
      "What is the most useless talent you have?",
      "If you were a ghost, who would you haunt first?",
      "What's the weirdest food combination you actually enjoy?",
      "If you could only eat one thing for the rest of your life, what would it be?"
    ],
    hi: [
      "अगर मैं आपको ₹1 लाख दूं, तो आप अपने क्रश के लिए क्या करेंगे?",
      "अगर आप एक दिन के लिए किसी सेलिब्रिटी के साथ जीवन बदल सकें, तो वह कौन होगा?",
      "मुफ्त पिज्जा के लिए आप सबसे पागलपन भरी चीज क्या करेंगे?",
      "अगर आपके पास 24 घंटों के लिए महाशक्तियां हों, तो आप सबसे पहले क्या करेंगे?",
      "आपने अब तक का सबसे मजेदार प्रैंक कौन सा किया है?",
      "अगर आप समय यात्रा कर सकें, तो आप सबसे पहले किस साल में जाएंगे?",
      "₹5000 के लिए आप सबसे शर्मनाक काम क्या करेंगे?",
      "अगर आप एक दिन के लिए अदृश्य हो सकें, तो आप सबसे पहले किस जगह जाएंगे?",
      "आपके पास सबसे बेकार टैलेंट क्या है?",
      "अगर आप भूत होते, तो आप सबसे पहले किसे डराते?",
      "अजीबोगरीब खाने का कॉम्बिनेशन क्या है जो आपको पसंद है?",
      "अगर आपको पूरी जिंदगी सिर्फ एक ही चीज खानी पड़े, तो वह क्या होगी?"
    ],
    mr: [
      "जर मी तुम्हाला ₹१ लाख दिले, तर तुम्ही तुमच्या क्रशसाठी काय कराल?",
      "जर तुम्ही एका दिवसासाठी एखाद्या सेलिब्रिटीसोबत आयुष्य बदलू शकलात, तर तो कोण असेल?",
      "मोफत पिझ्झासाठी तुम्ही केलेली सर्वात वेडी गोष्ट कोणती असेल?",
      "जर तुमच्याकडे २४ तासांसाठी सुपरपॉवर्स असत्या, तर तुम्ही सर्वात आधी काय केले असते?",
      "तुम्ही आतापर्यंत केलेली सर्वात मजेशीर मस्करी (prank) कोणती?",
      "जर तुम्ही वेळेत प्रवास (time travel) करू शकलात, तर तुम्ही सर्वात आधी कोणत्या वर्षाला भेट द्याल?",
      "₹५००० साठी तुम्ही केलेली सर्वात लाजीरवाणी गोष्ट कोणती असेल?",
      "जर तुम्ही एका दिवसासाठी अदृश्य झालात, तर तुम्ही सर्वात आधी कोणत्या ठिकाणी जाल?",
      "तुमच्याकडे असलेले सर्वात निरुपयोगी टैलेंट कोणते?",
      "जर तुम्ही भूत असता, तर तुम्ही सर्वात आधी कोणाला घाबरवले असते?",
      "तुम्हाला आवडणारे सर्वात विचित्र खाद्य संयोजन (food combination) कोणते?",
      "जर तुम्हाला आयुष्यभर फक्त एकच गोष्ट खावी लागली, तर ती कोणती असेल?"
    ],
    es: [
      "Si te doy ₹1 lakh, ¿qué harías por tu crush?",
      "Si pudieras intercambiar vidas con una celebridad por un día, ¿quién sería?",
      "¿Qué es lo más loco que harías por una pizza gratis?",
      "Si tuvieras superpoderes por 24 horas, ¿qué sería lo primero que harías?",
      "¿Cuál es la broma más divertida que has hecho?",
      "Si pudieras viajar en el tiempo, ¿qué año visitarías primero?",
      "¿Qué es lo más vergonzoso que harías por ₹5000?",
      "Si pudieras ser invisible por un día, ¿cuál sería el primer lugar al que irías?"
    ],
    fr: [
      "Si je vous donne ₹1 lakh, que feriez-vous pour votre crush ?",
      "Si vous pouviez échanger votre vie avec une célébrité pendant une journée, qui serait-ce ?",
      "Quelle est la chose la plus folle que vous feriez pour une pizza gratuite ?",
      "Si vous aviez des super-pouvoirs pendant 24 heures, quelle serait la première chose que vous feriez ?",
      "Quelle est la farce la plus drôle que vous ayez jamais faite ?",
      "Si vous pouviez voyager dans le temps, quelle année visiteriez-vous en premier ?",
      "Quelle est la chose la plus embarrassante que vous feriez pour ₹5000 ?",
      "Si vous pouviez être invisible pendant une journée, quel serait le premier endroit où vous iriez ?"
    ],
    de: [
      "Wenn ich dir ₹1 Lakh gebe, was würdest du für deinen Schwarm tun?",
      "Wenn du für einen Tag das Leben mit einem Prominenten tauschen könntest, wer wäre das?",
      "Was ist das Verrückteste, was du für eine kostenlose Pizza tun würdest?",
      "Wenn du für 24 Stunden Superkräfte hättest, was würdest du als Erstes tun?",
      "Was ist der lustigste Streich, den du je gespielt hast?",
      "Wenn du durch die Zeit reisen könntest, welches Jahr würdest du zuerst besuchen?",
      "Was ist das Peinlichste, was du für ₹5000 tun würdest?",
      "Wenn du für einen Tag unsichtbar sein könntest, wohin würdest du als Erstes gehen?"
    ],
    ja: [
      "もし私があなたに10万ルピーをあげたら、あなたは好きな人のために何をしますか？",
      "もし1日だけ有名人と人生を入れ替えられるとしたら、誰になりたいですか？",
      "無料のピザのためにあなたができる最もクレイジーなことは何ですか？",
      "もし24時間スーパーパワーが使えたら、最初に何をしますか？",
      "今までで一番面白かったいたずらは何ですか？",
      "もしタイムトラベルができるとしたら、最初にどの年に行きたいですか？",
      "5000ルピーのためにあなたができる最も恥ずかしいことは何ですか？",
      "もし1日だけ透明人間になれるとしたら、最初にどこに行きますか？"
    ]
  };

  const currentQuestions = questions[lang] || questions['en'];
  const [currentQuestion, setCurrentQuestion] = useState(currentQuestions[0]);

  const nextQuestion = () => {
    const filtered = currentQuestions.filter(q => q !== currentQuestion);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentQuestion(random);
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100 relative min-h-[400px] flex flex-col items-center justify-center">
      <button onClick={() => setView('home')} className="absolute top-6 left-6 text-gray-400 hover:text-[#ff4d6d] transition-colors">
        <ChevronLeft size={24} />
      </button>
      
      <div className="mb-8">
        <div className="bg-teal-50 p-4 rounded-full text-teal-500 mb-4 inline-block">
          <BookOpen size={32} />
        </div>
        <h2 className="text-2xl font-black text-center">{t.funQuestions}</h2>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="bg-teal-50 p-8 rounded-3xl border-2 border-dashed border-teal-200 text-center mb-8 w-full"
        >
          <p className="text-xl font-bold text-teal-800 leading-relaxed">
            "{currentQuestion}"
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={nextQuestion}
        className="w-full bg-teal-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-teal-100 transition-all active:scale-95 flex items-center justify-center gap-2 text-xl"
      >
        {t.nextQuestion}
      </button>
    </div>
  );
}

function ActiveQuizView({ quizData, lang, setView }: { quizData: any, lang: Language, setView: (v: View) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (selected: string) => {
    const q = quizData.questions[currentIdx];
    let points = 0;
    
    if (q.answer) {
      if (selected === q.answer) {
        points = 1;
      }
    } else {
      points = Math.floor(Math.random() * 20) + 10;
    }

    setScore(prev => prev + points);

    if (currentIdx < quizData.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    let resultText = "";
    if (quizData.id === 'bollywood') {
      const couples = ["Shah Rukh & Gauri", "Ranbir & Alia", "Ranveer & Deepika", "Vicky & Katrina"];
      resultText = couples[Math.floor(Math.random() * couples.length)];
    } else if (quizData.id === 'introvert') {
      resultText = score > 50 ? "Extrovert 🌟" : "Introvert 🏠";
    } else if (quizData.id === 'gk') {
      resultText = `${score}/${quizData.questions.length} Correct`;
    } else {
      resultText = `${score}% Match`;
    }

    return (
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100 text-center">
        <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
        <h2 className="text-2xl font-black mb-2">{lang === 'en' ? "Result!" : "परिणाम!"}</h2>
        <div className="text-4xl font-black text-[#ff4d6d] mb-6">{resultText}</div>
        <button onClick={() => setView('home')} className="w-full bg-[#ff4d6d] text-white font-bold py-4 rounded-2xl mb-4">
          {translations[lang].back}
        </button>
      </div>
    );
  }

  const q = quizData.questions[currentIdx];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">Question {currentIdx + 1}/{quizData.questions.length}</span>
        <div className="w-24 h-2 bg-pink-50 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${((currentIdx + 1) / quizData.questions.length) * 100}%` }} className="h-full bg-[#ff4d6d]" />
        </div>
      </div>
      <h3 className="text-xl font-black mb-8 text-gray-800">{q.q}</h3>
      <div className="space-y-3">
        {q.options.map((opt: string, i: number) => (
          <button key={i} onClick={() => handleAnswer(opt)} className="w-full p-4 rounded-2xl border-2 border-pink-50 hover:border-[#ff4d6d] hover:bg-pink-50 transition-all font-bold text-gray-600 text-left">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function GamesView({ lang, setView }: { lang: Language, setView: (v: View) => void }) {
  const t = translations[lang];
  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100 relative">
      <button onClick={() => setView('home')} className="absolute top-6 left-6 text-gray-400 hover:text-[#ff4d6d] transition-colors">
        <ChevronLeft size={24} />
      </button>
      <h2 className="text-2xl font-black text-center mb-8 mt-4">{t.games}</h2>
      <div className="space-y-4">
        <button onClick={() => setView('game_active')} className="w-full p-6 rounded-3xl text-white font-bold flex items-center gap-4 transition-all active:scale-95 bg-orange-500 shadow-lg shadow-orange-100">
          <div className="bg-white/20 p-2 rounded-xl"><Heart size={20} fill="white" /></div>
          <span className="text-left">{t.catchHeart}</span>
        </button>
        <div className="p-6 rounded-3xl bg-gray-50 border border-dashed border-gray-200 text-gray-400 text-center font-bold opacity-50">
          Love Puzzle (Coming Soon)
        </div>
      </div>
    </div>
  );
}

function CatchHeartGame({ lang, setView }: { lang: Language, setView: (v: View) => void }) {
  const t = translations[lang];
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hearts, setHearts] = useState<{ id: number, x: number, y: number, scale: number }[]>([]);
  const [feedback, setFeedback] = useState<{ id: number, x: number, y: number }[]>([]);

  // Difficulty scaling: speed increases as score goes up
  const getDuration = () => {
    const base = 2.0;
    const reduction = Math.min(1.2, score * 0.08);
    return Math.max(0.6, base - reduction);
  };

  const getSpawnRate = () => {
    const base = 700;
    const reduction = Math.min(450, score * 15);
    return Math.max(250, base - reduction);
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setHearts([]);
    }
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (isPlaying) {
      const spawnInterval = setInterval(() => {
        const corners = [
          { x: 10, y: 10 },
          { x: 85, y: 10 },
          { x: 10, y: 85 },
          { x: 85, y: 85 }
        ];
        const corner = corners[Math.floor(Math.random() * corners.length)];
        const newHeart = {
          id: Date.now() + Math.random(),
          x: corner.x,
          y: corner.y,
          scale: Math.random() * 0.5 + 0.8
        };
        setHearts(prev => [...prev, newHeart]);
        
        // Auto-remove heart after some time if not clicked
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, getDuration() * 1000);
      }, getSpawnRate());
      
      return () => clearInterval(spawnInterval);
    }
  }, [isPlaying, score]);

  const catchHeart = (e: MouseEvent, id: number, x: number, y: number) => {
    e.stopPropagation();
    setScore(prev => prev + 1);
    setHearts(prev => prev.filter(h => h.id !== id));
    
    const feedbackId = Date.now();
    setFeedback(prev => [...prev, { id: feedbackId, x, y }]);
    setTimeout(() => {
      setFeedback(prev => prev.filter(f => f.id !== feedbackId));
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-pink-100 text-center overflow-hidden relative min-h-[500px] select-none">
      <div className="flex justify-between mb-8 relative z-20">
        <div className="bg-pink-50 px-4 py-2 rounded-full font-bold text-[#ff4d6d] shadow-sm">
          {t.scoreLabel}: <motion.span key={score} initial={{ scale: 1.5 }} animate={{ scale: 1 }}>{score}</motion.span>
        </div>
        <div className="bg-pink-50 px-4 py-2 rounded-full font-bold text-[#ff4d6d] shadow-sm">
          {t.timeLabel}: {timeLeft}s
        </div>
      </div>

      {!isPlaying && timeLeft === 30 && (
        <div className="mt-20 relative z-20">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart className="mx-auto text-[#ff4d6d] mb-4" size={64} fill="#ff4d6d" />
          </motion.div>
          <h3 className="text-2xl font-black mb-6">{t.catchHeart}</h3>
          <button onClick={() => setIsPlaying(true)} className="bg-[#ff4d6d] text-white font-bold px-10 py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
            {t.start}
          </button>
        </div>
      )}

      {!isPlaying && timeLeft === 0 && (
        <div className="mt-20 relative z-20">
          <Trophy className="mx-auto text-yellow-500 mb-4" size={64} />
          <h3 className="text-2xl font-black mb-2">{t.gameOver}</h3>
          <div className="text-6xl font-black text-[#ff4d6d] mb-8">{score}</div>
          <button onClick={() => setView('home')} className="bg-[#ff4d6d] text-white font-bold px-10 py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
            {t.back}
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="absolute inset-0 z-10">
          <AnimatePresence>
            {hearts.map(h => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, scale: 0, x: `${h.x}%`, y: `${h.y}%` }}
                animate={{ opacity: 1, scale: h.scale }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => catchHeart(e, h.id, h.x, h.y)}
                className="absolute cursor-pointer p-4 -m-4"
              >
                <Heart className="text-[#ff4d6d] fill-[#ff4d6d] drop-shadow-md" size={40} />
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {feedback.map(f => (
              <motion.div
                key={f.id}
                initial={{ opacity: 1, y: `${f.y}%`, x: `${f.x}%`, scale: 0.5 }}
                animate={{ opacity: 0, y: `${f.y - 15}%`, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute pointer-events-none text-[#ff4d6d] font-black text-2xl z-30 drop-shadow-sm"
              >
                +1
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// --- Helper Components ---

function MenuButton({ icon, label, color, onClick }: { icon: ReactNode, label: string, color: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-3xl text-white font-bold flex items-center gap-4 transition-all active:scale-95 ${color} shadow-lg shadow-gray-100 hover:brightness-110`}
    >
      <div className="bg-white/20 p-2 rounded-xl">{icon}</div>
      <span className="text-lg">{label}</span>
    </button>
  );
}

function InputGroup({ label, value, onChange, placeholder, type = "text" }: { label: string, value: string, onChange: (v: string) => void, placeholder?: string, type?: string }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-[#ff4d6d] bg-gray-50/50 text-gray-700 font-medium"
      />
    </div>
  );
}
