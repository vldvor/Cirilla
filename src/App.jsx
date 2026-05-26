import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

// ==========================================================================
// ПОДКЛЮЧЕНИЕ К ВАШЕМУ ОБЛАКУ (ДАННЫЕ ВШИТЫ)
// ==========================================================================
const SUPABASE_URL = "https://cngmceduijevcrwfkzsg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZ21jZWR1aWpldmNyd2ZrenNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNTk3NTAsImV4cCI6MjA5NDgzNTc1MH0.iNb0gCvlmW2ETwTocMpIxyIERHMqllV5ZMLb67gpW9w";
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
    formTitle: "Форма Кормления и Ухода",
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
    dueToWet: "г сухого эквивалента (пропорция 1:2) 🥩",
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
    brandNorms: "💡 Текущие 100% нормы бренда с учётом параметров:",
    onlyDry: "Официальная норма бренда:",
    onlyWet: "Только влажный корм:",
    mixedTitle: "🔄 Динамическое смешанное кормление Цири (1 к 2):",
    mixedDesc: "Каждые 2 грамма съеденного влажного корма уменьшают суточную цель сухого корма ровно на 1 грамм. Это обеспечивает идеальный баланс калорий.",
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
    activityActive: "⚡ Активная / Бешеный тыгыдык",
    healthLabel: "Состояние здоровья Цирички:",
    healthHealthy: "🟢 Здорова (Расчёт по бренду)",
    healthSick: "🏥 Приболела (Ручной ввод нормы ветеринара)",
    medicationLabel: "Лекарство",
    btnGiveMed: "Дать лекарство 💊",
    medPlace: "Название лекарства (например, Синулокс)",
    consecutiveAlert: (days) => `⚠️ ВНИМАНИЕ! Цирилла недоедает уже ${days} дня(ей) подряд! Вероятно, принцесса плохо себя чувствует или ей не подходит дозировка. Понаблюдайте за поведением!`,
    customDryMinLabel: "Вет. норма сухого корма МИН (г):",
    customDryMaxLabel: "Вет. норма сухого корма МАКС (г):",
    
    vetReportBtn: "📄 Сформировать отчёт для ветеринара",
    vetModalTitle: "📋 Конструктор медицинского отчёта",
    vetPeriod7: "За последние 7 дней",
    vetPeriod30: "За последние 30 дней",
    vetClose: "Закрыть ✖",
    vetPrint: "🖨️ Распечатать / Сохранить в PDF",
    vetTableDate: "Дата",
    vetTableDry: "Сухой корм",
    vetTableWet: "Влажный корм",
    vetTableWater: "Вода",
    vetTableMeds: "Лекарства и добавки",
    vetBlankHeader: "МЕДИЦИНСКИЙ БЛАНК ПАЦИЕНТА ЦИРИЛЛЫ",
    vetTotalDry: "Всего сухого корма съедено:",
    vetTotalWet: "Всего влажного корма съедено:",
    vetTotalWater: "Всего смен воды:"
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
    formTitle: "Feeding & Care Form",
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
    dueToWet: "g of dry equivalent (1:2 ratio) 🥩",
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
    brandNorms: "💡 Current 100% Base Dry Food Norms:",
    onlyDry: "Official Brand Norm:",
    onlyWet: "Wet food only:",
    mixedTitle: "🔄 Dynamic Mixed Feeding (1 to 2):",
    mixedDesc: "Every 2 grams of wet food consumed reduces the daily dry food target by exactly 1 gram. This ensures perfect caloric balance.",
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
    activityActive: "⚡ Active / Hyperactive",
    healthLabel: "Ciri's Health Status:",
    healthHealthy: "🟢 Healthy (Brand formulas)",
    healthSick: "🏥 Unwell (Manual vet dosage input)",
    medicationLabel: "Medicine",
    btnGiveMed: "Give Medicine 💊",
    medPlace: "Medicine name (e.g., Sinulox)",
    consecutiveAlert: (days) => `⚠️ WARNING! Ciri has been underfed for ${days} consecutive days! She might be feeling unwell, please check her condition closely!`,
    customDryMinLabel: "Vet Dry Food Norm MIN (g):",
    customDryMaxLabel: "Vet Dry Food Norm MAX (g):",
    
    vetReportBtn: "📄 Generate Report for Veterinarian",
    vetModalTitle: "📋 Vet Medical Report Builder",
    vetPeriod7: "Last 7 Days",
    vetPeriod30: "Last 30 Days",
    vetClose: "Close ✖",
    vetPrint: "🖨️ Print / Save to PDF",
    vetTableDate: "Date",
    vetTableDry: "Dry Food",
    vetTableWet: "Wet Food",
    vetTableWater: "Water",
    vetTableMeds: "Meds & Supplements",
    vetBlankHeader: "MEDICAL BLANK OF PATIENT CIRILLA",
    vetTotalDry: "Total dry food consumed:",
    vetTotalWet: "Total wet food consumed:",
    vetTotalWater: "Total water updates:"
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
  const [catHealthStatus, setCatHealthStatus] = useState('healthy'); 
  const [customDryMin, setCustomDryMin] = useState(40);
  const [customDryMax, setCustomDryMax] = useState(60);
  const [logs, setLogs] = useState([]);

  const [showVetReport, setShowVetReport] = useState(false);
  const [vetDaysPeriod, setVetDaysPeriod] = useState(7);

  const [foodAmount, setFoodAmount] = useState('');
  const [foodType, setFoodType] = useState('dry'); 
  const [medicationName, setMedicationName] = useState(''); 
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
          setCatHealthStatus(data.health_status || 'healthy'); 
          setCustomDryMin(data.custom_dry_min || 40); 
          setCustomDryMax(data.custom_dry_max || 60); 
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
            medicationName: item.medication_name, 
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
    if (catHealthStatus === 'sick') {
      return { min: customDryMin, max: customDryMax };
    }

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
      baseNorm.min = Math.round(baseNorm.min * 1.5);
      baseNorm.max = Math.round(baseNorm.max * 1.5);
    }

    return baseNorm;
  };

  const dryNorm = getCarniloveDryNorm(catAdultWeight, catAge);
  const wetFoodDryEquivalent = totalWetSelected / 2;
  const activeDryMin = Math.max(0, Math.round(dryNorm.min - wetFoodDryEquivalent));
  const activeDryMax = Math.max(0, Math.round(dryNorm.max - wetFoodDryEquivalent));

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

  const checkConsecutiveUnderfedDays = () => {
    let consecutiveDays = 0;
    for (let i = 1; i <= 3; i++) {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - i);
      const pastDateStr = pastDate.toLocaleDateString('en-CA');
      
      const dayLogs = logs.filter(log => new Date(log.timestamp).toLocaleDateString('en-CA') === pastDateStr);
      const dryEaten = dayLogs.filter(log => log.type === 'food' && log.foodType === 'dry').reduce((sum, l) => sum + l.amount, 0);
      const wetEaten = dayLogs.filter(log => log.type === 'food' && log.foodType === 'wet').reduce((sum, l) => sum + l.amount, 0);
      
      const checkActiveDryMin = Math.max(0, Math.round(dryNorm.min - (wetEaten / 2)));

      if (dryEaten < checkActiveDryMin) {
        consecutiveDays++;
      } else {
        break; 
      }
    }
    return consecutiveDays;
  };
  const underfedConsecutiveDays = checkConsecutiveUnderfedDays();

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

  const addLog = async (type, amount = 0, medName = null) => {
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
      medicationName: type === 'medication' ? medName : null,
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
    setMedicationName('');
    setHasOmega3(false);
    setHasMaltPaste(false);

    await supabase.from('cat_logs').insert([{
      id: logId,
      type,
      food_type: newLogObj.foodType,
      amount: newLogObj.amount,
      omega3: newLogObj.omega3,
      malt_paste: newLogObj.maltPaste,
      medication_name: newLogObj.medicationName,
      timestamp: newLogObj.timestamp
    }]);

    if (!isAdminMode) {
      setSelectedDate(getTodayString());
      setCalendarViewDate(new Date());
    }
  };

  const updateProfileInCloud = async (newAge, newWeight, newActivity, newHealth, newCustomMin, newCustomMax) => {
    setCatAge(newAge);
    setCatAdultWeight(newWeight);
    setCatActivity(newActivity);
    setCatHealthStatus(newHealth);
    setCustomDryMin(newCustomMin);
    setCustomDryMax(newCustomMax);
    await supabase.from('cat_profile').update({ 
      age: newAge, 
      adult_weight: newWeight, 
      activity_level: newActivity,
      health_status: newHealth,
      custom_dry_min: Number(newCustomMin),
      custom_dry_max: Number(newCustomMax)
    }).eq('id', 1);
  };

  const getVetReportData = () => {
    const reportRows = [];
    for (let i = 0; i < vetDaysPeriod; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('en-CA');
      
      const dayLogs = logs.filter(log => new Date(log.timestamp).toLocaleDateString('en-CA') === dateStr);
      
      const dryAmount = dayLogs.filter(l => l.type === 'food' && l.foodType === 'dry').reduce((sum, l) => sum + l.amount, 0);
      const wetAmount = dayLogs.filter(l => l.type === 'food' && l.foodType === 'wet').reduce((sum, l) => sum + l.amount, 0);
      const waterCount = dayLogs.filter(l => l.type === 'water').length;
      
      const meds = [];
      dayLogs.forEach(l => {
        if (l.type === 'medication' && l.medicationName) meds.push(`💊 ${l.medicationName}`);
        if (l.omega3) meds.push("🐟 Omega-3");
        if (l.maltPaste) meds.push("🧴 Паста");
      });

      reportRows.push({
        date: d.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US', {day: '2-digit', month: '2-digit'}),
        dry: dryAmount,
        wet: wetAmount,
        water: waterCount,
        meds: meds.join(', ') || '—'
      });
    }
    return reportRows;
  };

  const reportData = getVetReportData();
  const reportTotalDry = reportData.reduce((sum, r) => sum + r.dry, 0);
  const reportTotalWet = reportData.reduce((sum, r) => sum + r.wet, 0);
  const reportTotalWater = reportData.reduce((sum, r) => sum + r.water, 0);

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

  return (
    <div className="container">
      {!showVetReport && (
        <button className="vet-report-top-btn no-print" onClick={() => setShowVetReport(true)}>
          {t.vetReportBtn}
        </button>
      )}

      {showVetReport && (
        <div className="vet-report-overlay">
          <div className="vet-report-header-box no-print">
            <h2>{t.vetModalTitle}</h2>
            <div className="vet-period-controls">
              <button className={`tab-btn ${vetDaysPeriod === 7 ? 'active' : ''}`} onClick={() => setVetDaysPeriod(7)}>{t.vetPeriod7}</button>
              <button className={`tab-btn ${vetDaysPeriod === 30 ? 'active' : ''}`} onClick={() => setVetDaysPeriod(30)}>{t.vetPeriod30}</button>
            </div>
            <div className="vet-action-buttons">
              <button className="print-btn" onClick={() => window.print()}>{t.vetPrint}</button>
              <button className="close-btn" onClick={() => setShowVetReport(false)}>{t.vetClose}</button>
            </div>
          </div>

          <div className="printable-medical-blank">
            <div className="blank-title">{t.vetBlankHeader}</div>
            <div className="blank-meta">
              <p>• <strong>Возраст:</strong> {catAge} мес. | <strong>Вес:</strong> {catAdultWeight} кг</p>
              <p>• <strong>Уровень активности:</strong> {catActivity === 'active' ? t.activityActive : t.activityCalm}</p>
              <p>• <strong>Текущее состояние здоровья:</strong> {catHealthStatus === 'sick' ? t.healthSick : t.healthHealthy}</p>
            </div>

            <table className="blank-table">
              <thead>
                <tr>
                  <th>{t.vetTableDate}</th>
                  <th>{t.vetTableDry}</th>
                  <th>{t.vetTableWet}</th>
                  <th>{t.vetTableWater}</th>
                  <th>{t.vetTableMeds}</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((row, index) => (
                  <tr key={index}>
                    <td><strong>{row.date}</strong></td>
                    <td>{row.dry} г</td>
                    <td>{row.wet} г</td>
                    <td>{row.water} {t.times}</td>
                    <td>{row.meds}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="blank-summary">
              <p>📈 {t.vetTotalDry} <strong>{reportTotalDry} г</strong></p>
              <p>📉 {t.vetTotalWet} <strong>{reportTotalWet} г</strong></p>
              <p>💦 {t.vetTotalWater} <strong>{reportTotalWater} {t.times}</strong></p>
            </div>
          </div>
        </div>
      )}

      {!showVetReport && (
        <>
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
              {underfedConsecutiveDays >= 3 && (
                <div className="consecutive-underfed-alert">
                  {t.consecutiveAlert(underfedConsecutiveDays)}
                </div>
              )}

              <div className="tamagotchi-screen">
                <div className="cat-avatar-container">
                  <img src="/Ciri.jpg" alt="Ciri" className="cat-photo" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="mood-badge">{catMood}</div>
                </div>
                <p className="status">{catStatusText}</p>
                {catHealthStatus === 'sick' && <div className="sick-status-badge">🏥 Режим лечения: ручная норма ({customDryMin}-{customDryMax} г)</div>}
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
                    <label>
                      <input type="radio" name="foodType" value="medication" checked={foodType === 'medication'} onChange={() => setFoodType('medication')} /> 💊 {t.medicationLabel}
                    </label>
                  </div>

                  {foodType === 'medication' ? (
                    <div className="action-box">
                      <input type="text" placeholder={t.medPlace} value={medicationName} onChange={(e) => setMedicationName(e.target.value)} />
                      <button onClick={() => medicationName && addLog('medication', 0, medicationName)} className="med-btn">{t.btnGiveMed}</button>
                    </div>
                  ) : (
                    <div className="action-box">
                      <input type="number" placeholder={t.gramsPlace} value={foodAmount} onChange={(e) => setFoodAmount(e.target.value)} />
                      <button onClick={() => foodAmount && addLog('food', foodAmount)}>{t.btnFeed}</button>
                    </div>
                  )}

                  {foodType !== 'medication' && (
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
                  )}
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
                    {wetFoodDryEquivalent > 0 && ` (${t.reducedWord} ${Math.round(wetFoodDryEquivalent)}${t.dueToWet})`}
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
                        ) : log.type === 'water' ? (
                          `💦 ${t.waterLabel}`
                        ) : (
                          <span className="med-log-item">💊 {t.medicationLabel}: <strong>{log.medicationName}</strong></span>
                        )}
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
                  <input type="number" value={catAge} onChange={(e) => updateProfileInCloud(Math.max(1, Number(e.target.value)), catAdultWeight, catActivity, catHealthStatus, customDryMin, customDryMax)} />
                </div>
                
                <div className="input-group">
                  <label>{t.weightLabel}</label>
                  <input type="number" step="0.5" value={catAdultWeight} onChange={(e) => updateProfileInCloud(catAge, Math.max(0.1, Number(e.target.value)), catActivity, catHealthStatus, customDryMin, customDryMax)} />
                </div>

                <div className="input-group full-width-input">
                  <label>{t.activityLabel}</label>
                  <select className="activity-select" value={catActivity} onChange={(e) => updateProfileInCloud(catAge, catAdultWeight, e.target.value, catHealthStatus, customDryMin, customDryMax)}>
                    <option value="calm">{t.activityCalm}</option>
                    <option value="active">{t.activityActive}</option>
                  </select>
                </div>

                <div className="input-group full-width-input">
                  <label>{t.healthLabel}</label>
                  <select className="activity-select health-select" value={catHealthStatus} onChange={(e) => updateProfileInCloud(catAge, catAdultWeight, catActivity, e.target.value, customDryMin, customDryMax)}>
                    <option value="healthy">{t.healthHealthy}</option>
                    <option value="sick">{t.healthSick}</option>
                  </select>
                </div>

                {catHealthStatus === 'sick' && (
                  <>
                    <div className="input-group">
                      <label style={{color: '#c62828'}}>{t.customDryMinLabel}</label>
                      <input type="number" value={customDryMin} onChange={(e) => updateProfileInCloud(catAge, catAdultWeight, catActivity, catHealthStatus, Math.max(0, Number(e.target.value)), customDryMax)} />
                    </div>
                    <div className="input-group">
                      <label style={{color: '#c62828'}}>{t.customDryMaxLabel}</label>
                      <input type="number" value={customDryMax} onChange={(e) => updateProfileInCloud(catAge, catAdultWeight, catActivity, catHealthStatus, customDryMin, Math.max(0, Number(e.target.value)))} />
                    </div>
                  </>
                )}
              </div>

              <div className="status-hint-text">
                <small style={{color: '#7b1fa2', fontSize:'0.7rem'}}>{t.weightHint}</small>
              </div>

              <div className="status-badge" style={{marginTop: '12px'}}>
                {t.statusLabel} <strong>{catAge < 12 ? t.statusKitten : t.statusAdult}</strong>
              </div>
              <hr />
              <h3>{t.brandNorms}</h3>
              blockquote>
                • <strong>{t.onlyDry}</strong> {dryNorm.min}-{dryNorm.max} g.<br />
              </blockquote>
              <div className="mixed-feeding-box">
                <h4>{t.mixedTitle}</h4>
                <p>{t.mixedDesc}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function getHoursPassed(timestamp) {
  if (!timestamp) return Infinity;
  return Math.floor((new Date() - new Date(timestamp)) / (1000 * 60 * 60));
}

export default App;