import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// ==========================================================================
// ПОДКЛЮЧЕНИЕ К ВАШЕМУ ОБЛАКУ
// ==========================================================================
const SUPABASE_URL = "https://cngmceduijevcrwfkzsg.supabase.co";
const SUPABASE_ANON_KEY = "ВСТАВЬТЕ_СЮДА_ВАШ_ДЛИННЫЙ_ANON_PUBLIC_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// СЛОВАРЬ ПЕРЕВОДОВ
const translations = {
  ru: {
    title: "🐈 Дневник Цири",
    tabCare: "❤️ Уход",
    tabProfile: "📋 Профиль и Схемы",
    food: "Еда",
    water: "Вода",
    never: "Никогда",
    hAgo: "ч. назад",
    moodFull: "Цири сытая и довольная!",
    moodHungry: "Цири очень хочет есть или пить!",
    moodSnack: "Цири пора бы перекусить...",
    archiveDay: "🕵️‍♂️ Выбран день из архива:",
    adminOn: "Режим Admin: ВКЛ",
    adminOff: "Режим Admin: ВЫКЛ",
    adminPastBadge: "⚠️ Запись для Цири в прошлое",
    formTitle: "Форма Кормления",
    dry: "Сухой",
    wet: "Влажный",
    gramsPlace: "Граммы (г)",
    btnFeed: "Покормить",
    addOmega: "🐟 Добавить Омега-3",
    addMalt: "🧴 Добавить пасту для шерсти",
    btnWater: "Поменять воду 💦",
    returnToday: "Вернуться в Сегодня 📍",
    statsTitle: "📊 Статистика за ",
    todayWord: "сегодня",
    dryLabel: "🌾 Сухой корм:",
    wetLabel: "🥩 Влажный корм:",
    waterLabel: "💧 Смена воды:",
    omegaLabel: "🐟 Омега-3:",
    maltLabel: "🧴 Мальт-паста:",
    targetWord: "цель",
    reducedWord: "снижена на",
    dueToWet: "из-за влажного корма 🥩",
    times: "раз(а)",
    pcs: "шт.",
    noData: "Цирилла пока отдыхала, записей нет 🐾",
    journalTitle: "📖 Журнал за этот день",
    profileTitle: "📋 Параметры Цири",
    ageLabel: "Возраст Цири (месяцев):",
    weightLabel: "Ожидаемый вес во взрослом возрасте (кг):",
    weightHint: "* Укажите целевой вес взрослой кошки (обычно 3-5 кг)",
    statusLabel: "Статус:",
    statusKitten: "Цирилла растёт — активный рост 🍼",
    statusAdult: "Цири взрослая кошка 🐈",
    brandNorms: "💡 Текущие 100% нормы бренда с учётом активности:",
    onlyDry: "Только сухой корм:",
    onlyWet: "Только влажный корм:",
    mixedTitle: "🔄 Динамическое смешанное кормление Цири:",
    mixedDesc: "Приложение рассчитывает остаток сухого корма на лету. Каждый грамм влажного корма Цири пропорционально снижает суточную цель для сухого корма.",
    alertOmega: "⚠️ Внимание! Омега-3 уже добавлялась в этот день. Избыток омеги может быть вреден для Цирички!",
    foodOverfed: (diff) => `⚠️ Ой-ёй! Циричка за сегодня нахрумкалась больше чем надо (на ${diff} г)! Кажется, пора прятать пакет с кормом 😼`,
    foodPerfect: "✨ Цирилла идеально сыта, дневная норма выполнена! Отличный баланс для нашей принцессы 😺",
    foodUnderfed: (min, max) => `🍽️ Циричку пока недокормили. Нужно досыпать ещё ${min}-${max} г сухого корма, чтобы она росла сильной 😿`,
    foodEmpty: "🥣 Циричка сегодня ещё вообще не хрумкала сухой корм! Мисочка ждёт свою хозяйку 🍽️",
    logout: "Выйти 🚪",
    loginTitle: "🔐 Вход в семейный аккаунт Цири",
    loginBtn: "Войти",
    registerBtn: "Создать аккаунт",
    loadingText: "Загрузка данных из облака... ☁️",
    activityLabel: "Уровень активности Цири:",
    activityCalm: "💤 Спокойная / Малоподвижная",
    activityActive: "⚡ Активная / Бешеный тыгыдык"
  },
  en: {
    title: "🐈 Ciri's Diary",
    tabCare: "❤️ Care",
    tabProfile: "📋 Profile & Guide",
    food: "Food",
    water: "Water",
    never: "Never",
    hAgo: "h. ago",
    moodFull: "Ciri is full and happy!",
    moodHungry: "Ciri is very hungry or thirsty!",
    moodSnack: "Ciri should have a snack...",
    archiveDay: "🕵️‍♂️ Archive day selected:",
    adminOn: "Admin Mode: ON",
    adminOff: "Admin Mode: OFF",
    adminPastBadge: "⚠️ Log for Ciri into the past",
    formTitle: "Feeding Form",
    dry: "Dry",
    wet: "Wet",
    gramsPlace: "Grams (g)",
    btnFeed: "Feed",
    addOmega: "🐟 Add Omega-3",
    addMalt: "🧴 Add Malt Paste",
    btnWater: "Change Water 💦",
    returnToday: "Return to Today 📍",
    statsTitle: "📊 Stats for ",
    todayWord: "today",
    dryLabel: "🌾 Dry Food:",
    wetLabel: "🥩 Wet Food:",
    waterLabel: "💧 Water Changed:",
    omegaLabel: "🐟 Omega-3:",
    maltLabel: "🧴 Malt Paste:",
    targetWord: "target",
    reducedWord: "reduced by",
    dueToWet: "due to wet food 🥩",
    times: "time(s)",
    pcs: "pc.",
    noData: "Ciri was resting, no records found 🐾",
    journalTitle: "📖 Day Journal",
    profileTitle: "📋 Ciri's Parameters",
    ageLabel: "Ciri's Age (months):",
    weightLabel: "Expected Adult Weight (kg):",
    weightHint: "* Enter target weight of an adult cat (usually 3-5 kg)",
    statusLabel: "Status:",
    statusKitten: "Ciri is growing — active growth 🍼",
    statusAdult: "Ciri is an adult cat 🐈",
    brandNorms: "💡 Current 100% Brand Norms with Activity adjustment:",
    onlyDry: "Dry food only:",
    onlyWet: "Wet food only:",
    mixedTitle: "🔄 Ciri's Dynamic Mixed Feeding:",
    mixedDesc: "The app calculates dry food balance on the fly. Every gram of wet food consumed by Ciri proportionally reduces the daily dry food target.",
    alertOmega: "⚠️ Warning! Omega-3 has already been added on this day. Excess omega can be harmful to Ciri!",
    foodOverfed: (diff) => `⚠️ Oh-oh! Ciri crunched more than needed today (by ${diff} g)! Time to hide the food bag 😼`,
    foodPerfect: "✨ Ciri is perfectly full, daily norm completed! Great balance for our princess 😺",
    foodUnderfed: (min, max) => `🍽️ Ciri is underfed. Need to add ${min}-${max} g of dry food to keep her growing strong 😿`,
    foodEmpty: "🥣 Ciri hasn't crunched any dry food today! The bowl is waiting for its owner 🍽️",
    logout: "Logout 🚪",
    loginTitle: "🔐 Ciri's Family Account Login",
    loginBtn: "Login",
    registerBtn: "Sign Up",
    loadingText: "Fetching cloud data... ☁️",
    activityLabel: "Ciri's Activity Level:",
    activityCalm: "💤 Calm / Indoor",
    activityActive: "⚡ Active / Hyperactive"
  }
};

const monthNamesRu = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function App() {
  const [user, setUser] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [lang, setLang] = useState(() => localStorage.getItem('catLang') || 'ru');
  const [activeTab, setActiveTab] = useState('care');
  const [catAge, setCatAge] = useState(6);
  const [catAdultWeight, setCatAdultWeight] = useState(4);
  const [catActivity, setCatActivity] = useState('active'); 
  const [logs, setLogs] = useState([]);

  const [foodAmount, setFoodAmount] = useState('');
  const [foodType, setFoodType] = useState('dry');
  const [hasOmega3, setHasOmega3] = useState(false);
  const [hasMaltPaste, setHasMaltPaste] = useState(false);
  
  const getTodayString = () => new Date().toLocaleDateString('en-CA');
  const [selectedDate, setSelectedDate] = useState(getTodayString);
  const [calendarViewDate, setCalendarViewDate] = useState(new Date());
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoadingData(true);
      
      supabase.from('cat_profile').select('*').eq('id', 1).single().then(({ data }) => {
        if (data) {
          setCatAge(data.age);
          setCatAdultWeight(data.adult_weight);
          setCatActivity(data.activity_level || 'active'); 
        }
      });

      supabase.from('cat_logs').select('*').then(({ data }) => {
        if (data) {
          const mapped = data.map(item => ({
            id: item.id,
            type: item.type,
            foodType: item.food_type,
            amount: item.amount,
            omega3: item.omega3,
            maltPaste: item.malt_paste,
            timestamp: item.timestamp
          }));
          setLogs(mapped);
        }
        setIsLoadingData(false);
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('catLang', lang);
  }, [lang]);

  useEffect(() => {
    if (selectedDate === getTodayString()) {
      setIsAdminMode(false);
    }
  }, [selectedDate]);

  const t = translations[lang];

  const filteredLogs = logs.filter(log => new Date(log.timestamp).toLocaleDateString('en-CA') === selectedDate);

  const totalDrySelected = filteredLogs
    .filter(log => log.type === 'food' && log.foodType === 'dry')
    .reduce((sum, log) => sum + log.amount, 0);

  const totalWetSelected = filteredLogs
    .filter(log => log.type === 'food' && log.foodType === 'wet')
    .reduce((sum, log) => sum + log.amount, 0);

  const waterChangesSelected = filteredLogs.filter(log => log.type === 'water').length;
  const omega3CountSelected = filteredLogs.filter(log => log.omega3).length;
  const maltPasteCountSelected = filteredLogs.filter(log => log.maltPaste).length;

  const getCarniloveDryNorm = (adultWeight, age) => {
    let baseNorm = { min: 25, max: 45 };
    
    if (age >= 12) {
      baseNorm = { min: Math.round(adultWeight * 12), max: Math.round(adultWeight * 14) };
    } else {
      let ageGroup = '';
      if (age >= 2 && age <= 4) ageGroup = '2-4';
      else if (age > 4 && age <= 6) ageGroup = '4-6';
      else if (age > 6 && age <= 8) ageGroup = '6-8';
      else if (age > 8 && age < 12) ageGroup = '8-12';

      if (adultWeight <= 3) {
        if (ageGroup === '2-4') baseNorm = { min: 25, max: 45 };
        else if (ageGroup === '4-6') baseNorm = { min: 40, max: 50 };
        else if (ageGroup === '6-8') baseNorm = { min: 45, max: 55 };
        else baseNorm = { min: 50, max: 60 };
      } 
      else if (adultWeight <= 4) {
        if (ageGroup === '2-4') baseNorm = { min: 45, max: 55 };
        else if (ageGroup === '4-6') baseNorm = { min: 55, max: 65 };
        else if (ageGroup === '6-8') baseNorm = { min: 66, max: 75 };
        else baseNorm = { min: 70, max: 80 };
      } 
      else if (adultWeight <= 5) {
        if (ageGroup === '2-4') baseNorm = { min: 50, max: 55 };
        else if (ageGroup === '4-6') baseNorm = { min: 60, max: 65 };
        else if (ageGroup === '6-8') baseNorm = { min: 70, max: 75 };
        else baseNorm = { min: 75, max: 80 };
      } 
      else {
        if (ageGroup === '2-4') baseNorm = { min: 55, max: 55 };
        else if (ageGroup === '4-6') baseNorm = { min: 60, max: 60 };
        else if (ageGroup === '6-8') baseNorm = { min: 75, max: 75 };
        else baseNorm = { min: 80, max: 80 };
      }
    }

    if (catActivity === 'active') {
      return {
        min: Math.round(baseNorm.min * 1.5),
        max: Math.round(baseNorm.max * 1.5)
      };
    }
    return baseNorm;
  };

  const dryNorm = getCarniloveDryNorm(catAdultWeight, catAge);
  const wetPouchesNorm = catAdultWeight <= 3 ? 3.5 : catAdultWeight <= 6 ? 4.25 : 4.75;
  const totalWetGramsNorm = wetPouchesNorm * 85;

  const consumedWetFraction = totalWetSelected / totalWetGramsNorm;
  const dryFractionRemaining = Math.max(0, 1 - consumedWetFraction);

  const activeDryMin = Math.round(dryNorm.min * dryFractionRemaining);
  const activeDryMax = Math.round(dryNorm.max * dryFractionRemaining);
  const currentReductionPercent = Math.round(consumedWetFraction * 100);

  const remainingDryMin = Math.max(0, activeDryMin - totalDrySelected);
  const remainingDryMax = Math.max(0, activeDryMax - totalDrySelected);

  const getRemainingFoodStatus = () => {
    if (totalDrySelected > activeDryMax) return t.foodOverfed(totalDrySelected - activeDryMax);
    if (totalDrySelected >= activeDryMin && totalDrySelected <= activeDryMax) return t.foodPerfect;
    if (totalDrySelected > 0 && totalDrySelected < activeDryMin) return t.foodUnderfed(remainingDryMin, remainingDryMax);
    return t.foodEmpty;
  };

  const foodInfoClassName = () => {
    if (totalDrySelected > activeDryMax) return 'overfed';
    if (totalDrySelected >= activeDryMin && totalDrySelected <= activeDryMax) return 'perfect';
    if (totalDrySelected > 0 && totalDrySelected < activeDryMin) return 'underfed';
    return 'empty';
  };

  const datesWithLogs = new Set(logs.map(log => new Date(log.timestamp).toLocaleDateString('en-CA')));

  const handleAuth = async (mode) => {
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
      if (error) alert(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
      if (error) alert(error.message);
      else alert('Аккаунт создан! Нажмите "Войти".');
    }
  };

  const addLog = async (type, amount = 0) => {
    let logTimestamp = new Date();
    if (isAdminMode && selectedDate !== getTodayString()) {
      const [year, month, day] = selectedDate.split('-').map(Number);
      logTimestamp.setFullYear(year, month - 1, day);
    }

    const logId = Date.now();
    const newLogObj = {
      id: logId,
      type,
      foodType: type === 'food' ? foodType : null,
      amount: type === 'food' ? Number(amount) : 0,
      omega3: type === 'food' ? hasOmega3 : false,
      maltPaste: type === 'food' ? hasMaltPaste : false,
      timestamp: logTimestamp.toISOString(),
    };

    if (type === 'food' && hasOmega3) {
      const targetDayLogs = logs.filter(log => new Date(log.timestamp).toLocaleDateString('en-CA') === selectedDate);
      if (targetDayLogs.filter(log => log.omega3).length >= 1) {
        alert(t.alertOmega);
      }
    }

    setLogs([newLogObj, ...logs]);
    setFoodAmount('');
    setHasOmega3(false);
    setHasMaltPaste(false);

    await supabase.from('cat_logs').insert([{
      id: logId,
      type,
      food_type: newLogObj.foodType,
      amount: newLogObj.amount,
      omega3: newLogObj.omega3,
      malt_paste: newLogObj.maltPaste,
      timestamp: newLogObj.timestamp
    }]);

    if (!isAdminMode) {
      setSelectedDate(getTodayString());
      setCalendarViewDate(new Date());
    }
  };

  const updateProfileInCloud = async (newAge, newWeight, newActivity) => {
    setCatAge(newAge);
    setCatAdultWeight(newWeight);
    setCatActivity(newActivity);
    await supabase.from('cat_profile').update({ 
      age: newAge, 
      adult_weight: newWeight, 
      activity_level: newActivity 
    }).eq('id', 1);
  };

  const chronologicallySortedLogs = [...logs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const lastFoodLog = chronologicallySortedLogs.find(log => log.type === 'food');
  const lastWaterLog = chronologicallySortedLogs.find(log => log.type === 'water');
  const hoursSinceFood = getHoursPassed(lastFoodLog?.timestamp);
  const hoursSinceWater = getHoursPassed(lastWaterLog?.timestamp);

  let catMood = "😺";
  let catStatusText = t.moodFull;
  if (hoursSinceFood > 12 || hoursSinceWater > 24) {
    catMood = "😿";
    catStatusText = t.moodHungry;
  } else if (hoursSinceFood > 6 || hoursSinceWater > 12) {
    catMood = "😼";
    catStatusText = t.moodSnack;
  }

  const viewYear = calendarViewDate.getFullYear();
  const viewMonth = calendarViewDate.getMonth();
  const monthNames = lang === 'ru' ? monthNamesRu : monthNamesEn;
  const weekdayNames = lang === 'ru' ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const renderCalendarDays = () => {
    const totalDaysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayOfWeekIndex = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    const dayElements = [];
    for (let i = 0; i < firstDayOfWeekIndex; i++) {
      dayElements.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= totalDaysInMonth; day++) {
      const currentFullDateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasData = datesWithLogs.has(currentFullDateStr);
      const isSelected = selectedDate === currentFullDateStr;
      const isToday = getTodayString() === currentFullDateStr;
      const isFuture = new Date(currentFullDateStr) > new Date(getTodayString());

      dayElements.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${hasData ? 'has-data' : ''} ${isToday ? 'today' : ''} ${isFuture ? 'future' : ''}`}
          onClick={() => !isFuture && setSelectedDate(currentFullDateStr)}
        >
          {day}
          {hasData && <span className="data-dot"></span>}
        </div>
      );
    }
    return dayElements;
  };

  if (!user) {
    return (
      <div className="container auth-container">
        <h2>{t.loginTitle}</h2>
        <div className="auth-form">
          <input type="email" placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />
          <div className="auth-buttons">
            <button onClick={() => handleAuth('login')}>{t.loginBtn}</button>
            <button className="water-btn" onClick={() => handleAuth('register')}>{t.registerBtn}</button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoadingData) {
    return (
      <div className="container loading-container">
        <div className="spinner"></div>
        <p>{t.loadingText}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-box">
        <h1>{t.title}</h1>
        <div className="header-actions">
          <button className="lang-toggle-btn" onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}>
            {lang === 'ru' ? "🇬🇧 EN" : "🇷🇺 RU"}
          </button>
          <button className="logout-btn" onClick={() => supabase.auth.signOut()}>{t.logout}</button>
        </div>
      </div>

      <div className="tabs-nav">
        <button className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`} onClick={() => setActiveTab('care')}>{t.tabCare}</button>
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>{t.tabProfile}</button>
      </div>

      {activeTab === 'care' && (
        <>
          <div className="tamagotchi-screen">
            <div className="cat-avatar-container">
              <img src="/Ciri.jpg" alt="Ciri" className="cat-photo" onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="mood-badge">{catMood}</div>
            </div>
            <p className="status">{catStatusText}</p>
            <div className="last-actions">
              <p>🍗 {t.food}: {hoursSinceFood === Infinity ? t.never : `${hoursSinceFood} ${t.hAgo}`}</p>
              <p>💧 {t.water}: {hoursSinceWater === Infinity ? t.never : `${hoursSinceWater} ${t.hAgo}`}</p>
            </div>
          </div>

          {selectedDate !== getTodayString() && (
            <div className={`admin-banner ${isAdminMode ? 'active' : ''}`}>
              <div className="admin-info">
                <span>{t.archiveDay} <br/><strong>{selectedDate}</strong></span>
              </div>
              <label className="admin-switch">
                <input type="checkbox" checked={isAdminMode} onChange={(e) => setIsAdminMode(e.target.checked)} />
                <span className="slider"></span>
                <span className="switch-text">{isAdminMode ? t.adminOn : t.adminOff}</span>
              </label>
            </div>
          )}

          <div className={`controls ${isAdminMode ? 'admin-borders' : ''}`}>
            {isAdminMode && <div className="admin-badge">{t.adminPastBadge}</div>}
            
            <div className="feeding-card">
              <h3>{t.formTitle}</h3>
              <div className="type-selector">
                <label>
                  <input type="radio" name="foodType" value="dry" checked={foodType === 'dry'} onChange={() => setFoodType('dry')} /> 🌾 {t.dry}
                </label>
                <label>
                  <input type="radio" name="foodType" value="wet" checked={foodType === 'wet'} onChange={() => setFoodType('wet')} /> 🥩 {t.wet}
                </label>
              </div>

              <div className="action-box">
                <input type="number" placeholder={t.gramsPlace} value={foodAmount} onChange={(e) => setFoodAmount(e.target.value)} />
                <button onClick={() => foodAmount && addLog('food', foodAmount)}>{t.btnFeed}</button>
              </div>

              <div className="supplements">
                <label className="checkbox-label">
                  <input type="checkbox" checked={hasOmega3} onChange={(e) => setHasOmega3(e.target.checked)} />
                  <span>{t.addOmega}</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" checked={hasMaltPaste} onChange={(e) => setHasMaltPaste(e.target.checked)} />
                  <span>{t.addMalt}</span>
                </label>
              </div>
            </div>

            <div className="action-box">
              <button onClick={() => addLog('water')} className="water-btn">{t.btnWater}</button>
            </div>
          </div>

          <div className="calendar-widget">
            <div className="calendar-header">
              <button className="arrow-btn" onClick={() => setCalendarViewDate(new Date(viewYear, viewMonth - 1, 1))}>◀</button>
              <span className="current-month-year">{monthNames[viewMonth]} {viewYear}</span>
              <button className="arrow-btn" onClick={() => setCalendarViewDate(new Date(viewYear, viewMonth + 1, 1))}>▶</button>
            </div>
            <div className="calendar-weekdays">
              {weekdayNames.map((d, idx) => <div key={idx}>{d}</div>)}
            </div>
            <div className="calendar-grid">
              {renderCalendarDays()}
            </div>
            {selectedDate !== getTodayString() && (
              <button className="reset-date-btn-full" onClick={() => {
                setSelectedDate(getTodayString());
                setCalendarViewDate(new Date());
              }}>
                {t.returnToday}
              </button>
            )}
          </div>

          <div className="stats">
            <h3>{t.statsTitle} {selectedDate === getTodayString() ? t.todayWord : selectedDate}</h3>
            <p>
              {t.dryLabel} <strong>{totalDrySelected} g</strong> / {' '}
              <span className="target-hint">
                {t.targetWord}: {activeDryMin}-{activeDryMax}g 
                {currentReductionPercent > 0 && ` (${t.reducedWord} ${currentReductionPercent}% ${t.dueToWet})`}
              </span>
            </p>
            
            <div className={`remaining-food-alert ${foodInfoClassName()}`}>
              <strong>{getRemainingFoodStatus()}</strong>
            </div>

            <p>{t.wetLabel} <strong>{totalWetSelected} g</strong></p>
            <p>{t.waterLabel} <strong>{waterChangesSelected} {t.times}</strong></p>
            <p>{t.omegaLabel} <strong>{omega3CountSelected} {t.pcs}</strong></p>
            <p>{t.maltLabel} <strong>{maltPasteCountSelected} {t.times}</strong></p>
          </div>

          <div className="history">
            <h3>{t.journalTitle}</h3>
            {filteredLogs.length === 0 ? (
              <p className="no-data">{t.noData}</p>
            ) : (
              <ul>
                {filteredLogs.map(log => (
                  <li key={log.id}>
                    <span className="time">{new Date(log.timestamp).toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', {hour: '2-digit', minute:'2-digit'})}</span>
                    {log.type === 'food' ? (
                      <span>{log.foodType === 'dry' ? `🌾 ${t.dry}` : `🥩 ${t.wet}`}: {log.amount}g {log.omega3 && ' 🐟[Omega]'} {log.maltPaste && ' 🧴[Paste]'}</span>
                    ) : `💦 ${t.waterLabel}`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      {activeTab === 'profile' && (
        <div className="profile-card">
          <h3>{t.profileTitle}</h3>
          
          <div className="profile-inputs-grid">
            <div className="input-group">
              <label>{t.ageLabel}</label>
              <input type="number" value={catAge} onChange={(e) => updateProfileInCloud(Math.max(1, Number(e.target.value)), catAdultWeight, catActivity)} />
            </div>
            
            <div className="input-group">
              <label>{t.weightLabel}</label>
              <input type="number" step="0.5" value={catAdultWeight} onChange={(e) => updateProfileInCloud(catAge, Math.max(0.1, Number(e.target.value)), catActivity)} />
            </div>

            <div className="input-group full-width-input">
              <label>{t.activityLabel}</label>
              <select 
                className="activity-select"
                value={catActivity} 
                onChange={(e) => updateProfileInCloud(catAge, catAdultWeight, e.target.value)}
              >
                <option value="calm">{t.activityCalm}</option>
                <option value="active">{t.activityActive}</option>
              </select>
            </div>
          </div>

          <div className="status-hint-text">
            <small style={{color: '#7b1fa2', fontSize:'0.7rem'}}>{t.weightHint}</small>
          </div>

          <div className="status-badge" style={{marginTop: '12px'}}>
            {t.statusLabel} <strong>{catAge < 12 ? t.statusKitten : t.statusAdult}</strong>
          </div>
          <hr />
          <h3>{t.brandNorms}</h3>
          <blockquote>
            • <strong>{t.onlyDry}</strong> {dryNorm.min}-{dryNorm.max} g.<br />
            • <strong>{t.onlyWet}</strong> {totalWetGramsNorm} g ({wetPouchesNorm} {t.pcs}).
          </blockquote>
          <div className="mixed-feeding-box">
            <h4>{t.mixedTitle}</h4>
            <p>{t.mixedDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function getHoursPassed(timestamp) {
  if (!timestamp) return Infinity;
  return Math.floor((new Date() - new Date(timestamp)) / (1000 * 60 * 60));
}

export default App;