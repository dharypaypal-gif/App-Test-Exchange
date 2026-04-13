/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Home, 
  Layout, 
  Coins, 
  User, 
  Plus, 
  ChevronRight, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  ExternalLink, 
  Upload, 
  Check, 
  X, 
  Settings,
  BarChart3,
  Users,
  MessageSquare,
  Search,
  Bell,
  Moon,
  Sun,
  Monitor,
  Mail,
  Smartphone,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  FirebaseUser
} from './firebase';

// --- Types ---

type Screen = 'HOME' | 'APP_DETAILS' | 'TESTING_FLOW' | 'MY_POINTS' | 'MY_APPS' | 'REVIEW_PANEL' | 'ADD_APP' | 'PROFILE' | 'MY_SUBMISSIONS' | 'ACCOUNT_SETTINGS' | 'NOTIFICATIONS' | 'APPEARANCE' | 'LOGIN' | 'WELCOME_WIZARD';
type Language = 'en' | 'ar';
type SubmissionStatus = 'pending' | 'approved' | 'rejected';
type Theme = 'light' | 'dark' | 'system';

const translations = {
  en: {
    // ... existing translations
    app1Name: "DevFlow Pro",
    app1Desc: "A productivity tool for developers to manage their daily tasks and code snippets.",
    app1Inst: "1. Install the app from the link.\n2. Create a new project.\n3. Add at least 3 tasks.\n4. Take a screenshot of your dashboard.",
    app2Name: "CodeSync",
    app2Desc: "Real-time code collaboration platform with built-in terminal.",
    app2Inst: "1. Open the app.\n2. Join a public room.\n3. Type some code in the editor.\n4. Verify the terminal output.",
    app3Name: "BugHunter",
    app3Desc: "Automated bug reporting tool for Android developers.",
    app3Inst: "1. Trigger a crash in the sample app.\n2. Check if BugHunter captures the log.\n3. Export the report to PDF.",
    uiMaster: "UI Master",
    mySubmissions: "My Submissions",
    step1: "Step 1: Join Google Group",
    step2: "Step 2: Install App",
    step3: "Step 3: Confirm Installation",
    step4: "Step 4: Submit Request",
    joinedGroup: "Have you joined the Google Group?",
    openGroup: "Open Group",
    iHaveJoined: "I have joined the group",
    openAppLink: "Open App Link",
    installAppDesc: "Download and install the app",
    haveInstalled: "Have you installed the app?",
    submitForApproval: "Submit for Approval",
    submissionSummary: "Summary of steps",
    testerEmail: "Tester Email",
    submissionTime: "Submission Time",
    statusPending: "Pending",
    statusApproved: "Approved",
    statusRejected: "Rejected",
    exploreApps: "Explore Apps",
    earnPoints: "Earn points by testing new tools",
    searchPlaceholder: "Search apps...",
    recommended: "Recommended",
    seeAll: "See all",
    pts: "pts",
    testers: "testers",
    joinGroup: "Join Group",
    appLink: "App Link",
    description: "Description",
    instructions: "Instructions",
    startTest: "Start Test",
    testingFlow: "Testing Flow",
    timeRemaining: "Time Remaining",
    keepOpen: "Keep the app open for at least 15 minutes",
    uploadScreenshot: "Upload Screenshot",
    tapToUpload: "Tap to upload or drag and drop",
    validationQuestions: "Validation Questions",
    encounterCrashes: "Did you encounter any crashes?",
    yes: "Yes",
    no: "No",
    rateUI: "Rate the user interface (1-5)",
    specificFeedback: "Any specific feedback?",
    feedbackPlaceholder: "Write your thoughts here...",
    submitTest: "Submit Test",
    myPoints: "My Points",
    trackEarnings: "Track your earnings and rewards",
    availableBalance: "Available Balance",
    totalEarned: "Total Earned",
    pending: "Pending",
    history: "History",
    devConsole: "Developer Console",
    manageApps: "Manage your submitted apps",
    activeApps: "Active Apps",
    totalTesters: "Total Testers",
    yourApps: "Your Apps",
    submittedOn: "Submitted on",
    testersProgress: "Testers Progress",
    reviewSubmissions: "Review Submissions",
    new: "New",
    viewFullscreen: "View Fullscreen",
    answers: "Answers",
    reject: "Reject",
    approve: "Approve",
    addNewApp: "Add New App",
    appName: "App Name",
    enterAppName: "Enter app name",
    appDescription: "Description",
    whatDoesAppDo: "What does your app do?",
    googleGroupLink: "Google Group Link",
    requiredTesters: "Required Testers",
    costToPublish: "Cost to publish",
    yourBalance: "Your Balance",
    publishApp: "Publish App",
    profile: "Profile",
    reputation: "Reputation",
    tests: "Tests",
    apps: "Apps",
    accountSettings: "Account Settings",
    notifications: "Notifications",
    appearance: "Appearance",
    language: "Language",
    arabic: "العربية",
    english: "English",
    home: "Home",
    points: "Points",
    myApps: "My Apps",
    submissionSuccess: "Submission successful!",
    appSubmitted: "App submitted for review!",
    light: "Light",
    dark: "Dark",
    system: "System",
    saveChanges: "Save Changes",
    pushNotifications: "Push Notifications",
    emailNotifications: "Email Notifications",
    marketingEmails: "Marketing Emails",
    themeMode: "Theme Mode",
    chooseTheme: "Choose your preferred appearance",
    fullName: "Full Name",
    emailAddress: "Email Address",
    bio: "Bio",
    profileUpdated: "Profile updated successfully!",
    settingsSaved: "Settings saved!",
    logout: "Log Out",
    loginWithGoogle: "Sign in with Google",
    welcomeTitle: "Welcome to Test Swap!",
    welcomeDesc: "Join our community of testers and developers. Earn points by testing apps and help others improve their products.",
    getStarted: "Get Started",
    joinGroupTitle: "Join our Google Group",
    joinGroupDesc: "To start testing, you must be a member of our official Google Group. This is required by Google Play for closed testing.",
    alreadyJoined: "I've already joined",
    finishSetup: "Finish Setup",
    loginTitle: "Test & Earn",
    loginSubtitle: "The ultimate platform for Android app testing exchange.",
    errorLogin: "Failed to sign in. Please try again.",
  },
  ar: {
    // ... existing translations
    app1Name: "ديف فلو برو",
    app1Desc: "أداة إنتاجية للمطورين لإدارة مهامهم اليومية ومقتطفات الكود.",
    app1Inst: "1. قم بتثبيت التطبيق من الرابط.\n2. أنشئ مشروعاً جديداً.\n3. أضف 3 مهام على الأقل.\n4. التقط لقطة شاشة للوحة التحكم الخاصة بك.",
    app2Name: "كود سينك",
    app2Desc: "منصة تعاون برمجية في الوقت الفعلي مع محطة طرفية مدمجة.",
    app2Inst: "1. افتح التطبيق.\n2. انضم إلى غرفة عامة.\n3. اكتب بعض الكود في المحرر.\n4. تحقق من مخرجات المحطة الطرفية.",
    app3Name: "باج هانتر",
    app3Desc: "أداة آلية للإبلاغ عن الأخطاء لمطوري أندرويد.",
    app3Inst: "1. تسبب في توقف مفاجئ في التطبيق التجريبي.\n2. تحقق مما إذا كان باج هانتر يلتقط السجل.\n3. قم بتصدير التقرير إلى ملف PDF.",
    uiMaster: "يو آي ماستر",
    mySubmissions: "تقديماتي",
    step1: "الخطوة 1: الانضمام لمجموعة جوجل",
    step2: "الخطوة 2: تثبيت التطبيق",
    step3: "الخطوة 3: تأكيد التثبيت",
    step4: "الخطوة 4: إرسال الطلب",
    joinedGroup: "هل انضممت إلى مجموعة جوجل؟",
    openGroup: "فتح المجموعة",
    iHaveJoined: "لقد انضممت إلى المجموعة",
    openAppLink: "فتح رابط التطبيق",
    installAppDesc: "قم بتحميل وتثبيت التطبيق",
    haveInstalled: "هل قمت بتثبيت التطبيق؟",
    submitForApproval: "إرسال للموافقة",
    submissionSummary: "ملخص الخطوات",
    testerEmail: "بريد المختبر",
    submissionTime: "وقت التقديم",
    statusPending: "قيد الانتظار",
    statusApproved: "تمت الموافقة",
    statusRejected: "مرفوض",
    exploreApps: "استكشف التطبيقات",
    earnPoints: "اكسب النقاط من خلال اختبار الأدوات الجديدة",
    searchPlaceholder: "ابحث عن التطبيقات...",
    recommended: "موصى به",
    seeAll: "عرض الكل",
    pts: "نقطة",
    testers: "مختبرين",
    joinGroup: "انضم للمجموعة",
    appLink: "رابط التطبيق",
    description: "الوصف",
    instructions: "التعليمات",
    startTest: "ابدأ الاختبار",
    testingFlow: "مسار الاختبار",
    timeRemaining: "الوقت المتبقي",
    keepOpen: "أبقِ التطبيق مفتوحاً لمدة 15 دقيقة على الأقل",
    uploadScreenshot: "رفع لقطة شاشة",
    tapToUpload: "اضغط للرفع أو اسحب وأفلت",
    validationQuestions: "أسئلة التحقق",
    encounterCrashes: "هل واجهت أي توقف مفاجئ؟",
    yes: "نعم",
    no: "لا",
    rateUI: "قيم واجهة المستخدم (1-5)",
    specificFeedback: "أي ملاحظات محددة؟",
    feedbackPlaceholder: "اكتب أفكارك هنا...",
    submitTest: "إرسال الاختبار",
    myPoints: "نقاطي",
    trackEarnings: "تتبع أرباحك ومكافآتك",
    availableBalance: "الرصيد المتاح",
    totalEarned: "إجمالي الأرباح",
    pending: "قيد الانتظار",
    history: "السجل",
    devConsole: "لوحة المطور",
    manageApps: "إدارة تطبيقاتك المقدمة",
    activeApps: "التطبيقات النشطة",
    totalTesters: "إجمالي المختبرين",
    yourApps: "تطبيقاتك",
    submittedOn: "تم التقديم في",
    testersProgress: "تقدم المختبرين",
    reviewSubmissions: "مراجعة التقديمات",
    new: "جديد",
    viewFullscreen: "عرض بملء الشاشة",
    answers: "الإجابات",
    reject: "رفض",
    approve: "موافقة",
    addNewApp: "إضافة تطبيق جديد",
    appName: "اسم التطبيق",
    enterAppName: "أدخل اسم التطبيق",
    appDescription: "الوصف",
    whatDoesAppDo: "ماذا يفعل تطبيقك؟",
    googleGroupLink: "رابط مجموعة جوجل",
    requiredTesters: "المختبرين المطلوبين",
    costToPublish: "تكلفة النشر",
    yourBalance: "رصيدك",
    publishApp: "نشر التطبيق",
    profile: "الملف الشخصي",
    reputation: "السمعة",
    tests: "اختبارات",
    apps: "تطبيقات",
    accountSettings: "إعدادات الحساب",
    notifications: "الإشعارات",
    appearance: "المظهر",
    logout: "تسجيل الخروج",
    language: "اللغة",
    arabic: "العربية",
    english: "English",
    home: "الرئيسية",
    points: "النقاط",
    myApps: "تطبيقاتي",
    submissionSuccess: "تم الإرسال بنجاح!",
    appSubmitted: "تم تقديم التطبيق للمراجعة!",
    light: "فاتح",
    dark: "داكن",
    system: "تلقائي",
    saveChanges: "حفظ التغييرات",
    pushNotifications: "تنبيهات الهاتف",
    emailNotifications: "تنبيهات البريد",
    marketingEmails: "رسائل تسويقية",
    themeMode: "وضع المظهر",
    chooseTheme: "اختر المظهر المفضل لديك",
    fullName: "الاسم الكامل",
    emailAddress: "البريد الإلكتروني",
    bio: "نبذة شخصية",
    profileUpdated: "تم تحديث الملف الشخصي بنجاح!",
    settingsSaved: "تم حفظ الإعدادات!",
    loginWithGoogle: "تسجيل الدخول عبر جوجل",
    welcomeTitle: "مرحباً بك في Test Swap!",
    welcomeDesc: "انضم إلى مجتمعنا من المختبرين والمطورين. اربح النقاط من خلال اختبار التطبيقات وساعد الآخرين في تحسين منتجاتهم.",
    getStarted: "ابدأ الآن",
    joinGroupTitle: "انضم إلى مجموعة جوجل الخاصة بنا",
    joinGroupDesc: "لبدء الاختبار، يجب أن تكون عضواً في مجموعة جوجل الرسمية الخاصة بنا. هذا متطلب من جوجل بلاي للاختبار المغلق.",
    alreadyJoined: "لقد انضممت بالفعل",
    finishSetup: "إنهاء الإعداد",
    loginTitle: "اختبر واربح",
    loginSubtitle: "المنصة الأمثل لتبادل اختبار تطبيقات أندرويد.",
    errorLogin: "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.",
  }
};

interface AppItem {
  id: string;
  name: string;
  icon: string;
  reward: number;
  testersNeeded: number;
  testersCount: number;
  description: string;
  instructions: string;
}

interface PointHistory {
  id: string;
  app: string;
  points: number;
  date: string;
  status: 'pending' | 'confirmed';
}

interface Submission {
  id: string;
  appName: string;
  testerName: string;
  testerEmail: string;
  testerReputation: number;
  status: SubmissionStatus;
  submittedAt: string;
  answers?: string[];
}

// --- Mock Data ---

const MOCK_APPS: AppItem[] = [
  {
    id: '1',
    name: 'DevFlow Pro',
    icon: 'https://picsum.photos/seed/devflow/100/100',
    reward: 1,
    testersNeeded: 20,
    testersCount: 12,
    description: 'A productivity tool for developers to manage their daily tasks and code snippets.',
    instructions: '1. Install the app from the link.\n2. Create a new project.\n3. Add at least 3 tasks.\n4. Take a screenshot of your dashboard.'
  },
  {
    id: '2',
    name: 'CodeSync',
    icon: 'https://picsum.photos/seed/codesync/100/100',
    reward: 1,
    testersNeeded: 15,
    testersCount: 5,
    description: 'Real-time code collaboration platform with built-in terminal.',
    instructions: '1. Open the app.\n2. Join a public room.\n3. Type some code in the editor.\n4. Verify the terminal output.'
  },
  {
    id: '3',
    name: 'BugHunter',
    icon: 'https://picsum.photos/seed/bughunter/100/100',
    reward: 1,
    testersNeeded: 10,
    testersCount: 8,
    description: 'Automated bug reporting tool for Android developers.',
    instructions: '1. Trigger a crash in the sample app.\n2. Check if BugHunter captures the log.\n3. Export the report to PDF.'
  }
];

const MOCK_HISTORY: PointHistory[] = [
  { id: '1', app: 'DevFlow Pro', points: 1, date: '2024-03-20', status: 'confirmed' },
  { id: '2', app: 'CodeSync', points: 1, date: '2024-03-21', status: 'pending' },
  { id: '3', app: 'UI Master', points: 1, date: '2024-03-18', status: 'confirmed' }
];

const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    appName: 'DevFlow Pro',
    testerName: 'Alex Dev',
    testerEmail: 'alex.dev@example.com',
    testerReputation: 4.8,
    status: 'pending',
    submittedAt: '2024-03-22 14:30',
    answers: ['Yes, it was smooth', 'The dark mode looks great', 'No issues found']
  },
  {
    id: '2',
    appName: 'DevFlow Pro',
    testerName: 'Sarah Coder',
    testerEmail: 'sarah.c@example.com',
    testerReputation: 4.5,
    status: 'approved',
    submittedAt: '2024-03-21 09:15',
    answers: ['A bit laggy on startup', 'Love the icons', 'Found a typo in settings']
  },
  {
    id: '3',
    appName: 'CodeSync',
    testerName: 'John Tester',
    testerEmail: 'john.t@example.com',
    testerReputation: 4.2,
    status: 'rejected',
    submittedAt: '2024-03-20 18:45',
    answers: ['App crashed twice', 'UI is confusing']
  }
];

// --- Components ---

const Badge = ({ children, variant = 'primary' }: { children: React.ReactNode, variant?: 'primary' | 'success' | 'accent' | 'warning' | 'error' }) => {
  const styles = {
    primary: 'bg-primary-start/20 text-primary-start border-primary-start/30',
    success: 'bg-success/20 text-success border-success/30',
    accent: 'bg-accent/20 text-accent border-accent/30',
    warning: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    error: 'bg-error/20 text-error border-error/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  icon: Icon,
  disabled = false
}: { 
  children?: React.ReactNode, 
  onClick?: () => void, 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger',
  className?: string,
  icon?: any,
  disabled?: boolean
}) => {
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed";
  const variants = {
    primary: "gradient-primary text-white shadow-lg shadow-primary-start/20",
    secondary: "bg-border text-text hover:bg-border/80",
    outline: "border border-border text-text hover:bg-border/50",
    ghost: "text-text-muted hover:text-text hover:bg-border/50",
    danger: "bg-error/20 text-error border border-error/30 hover:bg-error/30"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [points, setPoints] = useState(0);
  const [navHistory, setNavHistory] = useState<Screen[]>(['HOME']);
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');

  // Wizard State
  const [wizardStep, setWizardStep] = useState(1);
  const [isGroupJoined, setIsGroupJoined] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [welcomeStep, setWelcomeStep] = useState(1);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  // Auth Listener
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // Fetch or create user data
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setPoints(data.points || 0);
          if (data.isNewUser) {
            setCurrentScreen('WELCOME_WIZARD');
          }
        } else {
          // New user
          const newData = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            points: 10, // Starting points
            isNewUser: true,
            createdAt: new Date().toISOString(),
            role: 'user'
          };
          await setDoc(doc(db, 'users', firebaseUser.uid), newData);
          setUserData(newData);
          setPoints(10);
          setCurrentScreen('WELCOME_WIZARD');
        }
      } else {
        setUserData(null);
        setPoints(0);
        setCurrentScreen('LOGIN');
      }
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Persistence
  React.useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  React.useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => {
    const root = window.document.documentElement;
    const applyTheme = (t: Theme) => {
      if (t === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(systemTheme);
      } else {
        root.classList.remove('light', 'dark');
        root.classList.add(t);
      }
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const navigate = (screen: Screen) => {
    setNavHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (navHistory.length > 1) {
      const newHistory = [...navHistory];
      newHistory.pop();
      setNavHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
      alert(t.errorLogin);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const completeWelcomeWizard = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), { isNewUser: false });
      setUserData({ ...userData, isNewUser: false });
      navigate('HOME');
    }
  };

  // --- Screen Renderers ---

  const renderLogin = () => (
    <div className="flex-1 flex flex-col items-center p-6 pt-20 text-center space-y-8">
      <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl shadow-primary-start/40">
        <img src="/logo.png" alt="Test Swap" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{t.loginTitle}</h1>
        <p className="text-text-muted max-w-xs mx-auto">{t.loginSubtitle}</p>
      </div>
      <Button onClick={handleLogin} className="w-full max-w-xs py-4" icon={Mail}>
        {t.loginWithGoogle}
      </Button>
    </div>
  );

  const renderWelcomeWizard = () => {
    return (
      <div className="flex-1 flex flex-col p-6 space-y-8 overflow-y-auto no-scrollbar">
        <div className="max-w-md mx-auto w-full space-y-8 pt-12">
          <AnimatePresence mode="wait">
            {welcomeStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto text-success">
                  <Star size={40} />
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">{t.welcomeTitle}</h1>
                  <p className="text-text-muted leading-relaxed">{t.welcomeDesc}</p>
                </div>
                <Button onClick={() => setWelcomeStep(2)} className="w-full py-4">{t.getStarted}</Button>
              </motion.div>
            )}

            {welcomeStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full bg-primary-start/10 flex items-center justify-center mx-auto text-primary-start">
                    <ShieldCheck size={40} />
                  </div>
                  <h1 className="text-2xl font-bold">{t.joinGroupTitle}</h1>
                  <p className="text-text-muted text-sm">{t.joinGroupDesc}</p>
                </div>

                <div className="glass-card p-6 space-y-4">
                  <div className="p-4 bg-border rounded-xl font-mono text-xs text-primary-start break-all">
                    https://groups.google.com/g/test-swap
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    icon={ExternalLink}
                    onClick={() => window.open('https://groups.google.com/g/test-swap', '_blank')}
                  >
                    {t.openGroup}
                  </Button>
                </div>

                <Button onClick={completeWelcomeWizard} className="w-full py-4">{t.finishSetup}</Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 pb-24">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t.exploreApps}</h1>
          <p className="text-text-muted text-sm">{t.earnPoints}</p>
        </div>
        <button className="p-2 bg-border rounded-full relative">
          <Bell size={20} />
          <span className={`absolute top-1 ${isRtl ? 'left-1' : 'right-1'} w-2 h-2 bg-accent rounded-full border-2 border-background`}></span>
        </button>
      </header>

      <div className="relative">
        <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-text-muted`} size={18} />
        <input 
          type="text" 
          placeholder={t.searchPlaceholder} 
          className={`w-full bg-border border border-border rounded-xl py-3 ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:outline-none focus:border-primary-start/50 transition-colors`}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">{t.recommended}</h2>
          <button className="text-accent text-sm font-medium">{t.seeAll}</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_APPS.map(app => {
          const appName = app.id === '1' ? t.app1Name : app.id === '2' ? t.app2Name : t.app3Name;
          return (
            <motion.div 
              key={app.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedApp(app); navigate('APP_DETAILS'); }}
              className="glass-card p-4 flex items-center gap-4 cursor-pointer hover:border-primary-start/30 transition-colors"
            >
              <img src={app.icon} alt={appName} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{appName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="accent">+{app.reward} {t.pts}</Badge>
                  <span className="text-text-muted text-xs flex items-center gap-1">
                    <Users size={12} /> {app.testersCount}/{app.testersNeeded}
                  </span>
                </div>
              </div>
              <ChevronRight className={`text-text-muted ${isRtl ? 'rotate-180' : ''}`} size={20} />
            </motion.div>
          );
        })}
        </div>
      </div>
    </div>
  </div>
);

  const renderAppDetails = () => {
    const appName = selectedApp?.id === '1' ? t.app1Name : selectedApp?.id === '2' ? t.app2Name : t.app3Name;
    const appDesc = selectedApp?.id === '1' ? t.app1Desc : selectedApp?.id === '2' ? t.app2Desc : t.app3Desc;
    const appInst = selectedApp?.id === '1' ? t.app1Inst : selectedApp?.id === '2' ? t.app2Inst : t.app3Inst;

    return (
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col">
          <div className="relative h-48">
          <img src={selectedApp?.icon} alt="" className="w-full h-full object-cover blur-xl opacity-30" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          <button onClick={goBack} className={`absolute top-6 ${isRtl ? 'right-6' : 'left-6'} p-2 bg-black/50 backdrop-blur-md rounded-full`}>
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
        </div>

        <div className="px-6 -mt-12 space-y-6 pb-24">
          <div className="flex items-end gap-4">
            <img src={selectedApp?.icon} alt={appName} className="w-24 h-24 rounded-2xl shadow-2xl border-2 border-white/10" referrerPolicy="no-referrer" />
            <div className="pb-2">
              <h1 className="text-2xl font-bold">{appName}</h1>
              <Badge variant="accent">+{selectedApp?.reward} {t.pts}</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" icon={MessageSquare}>{t.joinGroup}</Button>
            <Button variant="outline" className="flex-1" icon={ExternalLink}>{t.appLink}</Button>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-lg">{t.description}</h2>
            <p className="text-text-muted leading-relaxed">{appDesc}</p>
          </div>

          <div className="glass-card p-5 space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <AlertCircle size={20} className="text-primary-start" />
              {t.instructions}
            </h2>
            <div className="space-y-3">
              {appInst?.split('\n').map((line, i) => (
                <p key={i} className="text-sm text-text-muted flex gap-3">
                  <span className="text-primary-start font-bold">{i + 1}.</span>
                  {line.replace(/^\d+\.\s*/, '')}
                </p>
              ))}
            </div>
          </div>

          <Button onClick={() => navigate('TESTING_FLOW')} className="w-full py-4 text-lg">{t.startTest}</Button>
        </div>
      </div>
    </div>
    );
  };

  const renderTestingFlow = () => {
    const steps = [
      { id: 1, title: t.step1 },
      { id: 2, title: t.step2 },
      { id: 3, title: t.step3 },
      { id: 4, title: t.step4 },
    ];

    const canGoToNext = () => {
      if (wizardStep === 1) return isGroupJoined;
      if (wizardStep === 2) return true; // Just clicking the link is enough to proceed to confirm
      if (wizardStep === 3) return isAppInstalled;
      return true;
    };

    const handleNext = async () => {
      if (wizardStep < 4) {
        setWizardStep(wizardStep + 1);
      } else {
        setIsSubmitting(true);
        try {
          if (user) {
            const newPoints = points + 1;
            await updateDoc(doc(db, 'users', user.uid), {
              points: newPoints
            });
            setPoints(newPoints);
            setUserData(prev => prev ? { ...prev, points: newPoints } : null);
          }
          
          setTimeout(() => {
            setIsSubmitting(false);
            alert(t.submissionSuccess);
            setWizardStep(1);
            setIsGroupJoined(false);
            setIsAppInstalled(false);
            navigate('MY_SUBMISSIONS');
          }, 1500);
        } catch (error) {
          console.error("Error updating points:", error);
          setIsSubmitting(false);
          alert("Error submitting. Please try again.");
        }
      }
    };

    return (
      <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
        <div className="max-w-2xl mx-auto w-full space-y-8">
          <header className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 bg-border rounded-full">
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <h1 className="text-xl font-bold">{t.testingFlow}</h1>
        </header>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between px-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  wizardStep >= step.id ? 'bg-primary-start text-white' : 'bg-border text-text-muted'
                }`}>
                  {wizardStep > step.id ? <Check size={16} /> : step.id}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 bg-border relative">
                  <motion.div 
                    className="absolute inset-0 bg-primary-start"
                    initial={{ width: 0 }}
                    animate={{ width: wizardStep > step.id ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={wizardStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">{steps[wizardStep - 1].title}</h2>

            {wizardStep === 1 && (
              <div className="glass-card p-6 space-y-6">
                <div className="space-y-2">
                  <p className="text-text-muted leading-relaxed">{t.joinedGroup}</p>
                  <p className="text-xs text-primary-start font-mono">test-swap@googlegroups.com</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  icon={ExternalLink}
                  onClick={() => window.open('https://groups.google.com/g/test-swap', '_blank')}
                >
                  {t.openGroup}
                </Button>
                <label className="flex items-center gap-3 p-4 bg-border rounded-xl cursor-pointer hover:bg-border/80 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={isGroupJoined}
                    onChange={(e) => setIsGroupJoined(e.target.checked)}
                    className="w-5 h-5 accent-primary-start"
                  />
                  <span className="text-sm font-medium">{t.iHaveJoined}</span>
                </label>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="glass-card p-6 space-y-6">
                <p className="text-text-muted leading-relaxed">{t.installAppDesc}</p>
                <div className="p-4 bg-black/5 rounded-xl border border-border font-mono text-xs break-all text-primary-start">
                  https://play.google.com/store/apps/details?id=com.example.app
                </div>
                <Button variant="outline" className="w-full" icon={ExternalLink}>{t.openAppLink}</Button>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="glass-card p-6 space-y-6">
                <p className="text-text-muted leading-relaxed">{t.haveInstalled}</p>
                <div className="flex items-center justify-between p-4 bg-border rounded-xl">
                  <span className="text-sm font-medium">{t.no}</span>
                  <button 
                    onClick={() => setIsAppInstalled(!isAppInstalled)}
                    className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${isAppInstalled ? 'bg-success' : 'bg-border'}`}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isAppInstalled ? (isRtl ? '-translate-x-6' : 'translate-x-6') : 'translate-x-0'}`} />
                  </button>
                  <span className="text-sm font-medium">{t.yes}</span>
                </div>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="glass-card p-6 space-y-6">
                <h3 className="font-bold text-lg">{t.submissionSummary}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-success">
                    <CheckCircle2 size={18} />
                    <span>{t.iHaveJoined}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-success">
                    <CheckCircle2 size={18} />
                    <span>{t.haveInstalled}</span>
                  </div>
                </div>
                <p className="text-xs text-text-muted italic">By submitting, you confirm that you have followed all instructions correctly.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="pt-4">
          <Button 
            onClick={handleNext} 
            disabled={!canGoToNext() || isSubmitting}
            className={`w-full py-4 text-lg ${isSubmitting ? 'opacity-70' : ''}`}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-primary-start/30 border-t-primary-start rounded-full animate-spin" />
            ) : (
              wizardStep === 4 ? t.submitForApproval : t.seeAll.replace(t.seeAll, isRtl ? 'التالي' : 'Next')
            )}
          </Button>
          {wizardStep > 1 && (
            <button 
              onClick={() => setWizardStep(wizardStep - 1)}
              className="w-full py-4 text-text-muted text-sm font-medium hover:text-text transition-colors"
            >
              {isRtl ? 'السابق' : 'Previous'}
            </button>
          )}
        </div>
      </div>
    </div>
    );
  };

  const renderMyPoints = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <header className="text-center space-y-2">
        <h1 className="text-xl font-bold">{t.myPoints}</h1>
        <p className="text-text-muted text-sm">{t.trackEarnings}</p>
      </header>

      <div className="gradient-primary rounded-3xl p-8 text-center space-y-2 shadow-2xl shadow-primary-start/30">
        <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-2">
          <Coins size={32} className="text-white" />
        </div>
        <div className="text-5xl font-bold text-white">{points.toLocaleString()}</div>
        <p className="text-white/70 font-medium">{t.availableBalance}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 space-y-1">
          <p className="text-xs text-text-muted uppercase font-bold">{t.totalEarned}</p>
          <p className="text-xl font-bold text-success">2,450</p>
        </div>
        <div className="glass-card p-4 space-y-1">
          <p className="text-xs text-text-muted uppercase font-bold">{t.pending}</p>
          <p className="text-xl font-bold text-accent">125</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-lg">{t.history}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_HISTORY.map(item => {
            const appName = item.app === 'DevFlow Pro' ? t.app1Name : item.app === 'CodeSync' ? t.app2Name : t.uiMaster;
            return (
              <div key={item.id} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${item.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'}`}>
                    {item.status === 'confirmed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{appName}</h4>
                    <p className="text-xs text-text-muted">{item.date}</p>
                  </div>
                </div>
                <div className={isRtl ? 'text-left' : 'text-right'}>
                  <p className={`font-bold ${item.status === 'confirmed' ? 'text-success' : 'text-accent'}`}>+{item.points}</p>
                  <p className="text-[10px] uppercase tracking-tighter text-white/30">{item.status === 'confirmed' ? t.approve : t.pending}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
  );

  const renderMyApps = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t.devConsole}</h1>
          <p className="text-text-muted text-sm">{t.manageApps}</p>
        </div>
        <Button onClick={() => navigate('ADD_APP')} variant="primary" className="p-3 rounded-full" icon={Plus}></Button>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 space-y-2">
          <BarChart3 size={20} className="text-primary-start" />
          <div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-text-muted">{t.activeApps}</p>
          </div>
        </div>
        <div className="glass-card p-4 space-y-2">
          <Users size={20} className="text-accent" />
          <div>
            <p className="text-2xl font-bold">42</p>
            <p className="text-xs text-text-muted">{t.totalTesters}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-bold text-lg">{t.yourApps}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_APPS.slice(0, 2).map(app => (
            <div key={app.id} className="glass-card p-4 space-y-4">
              <div className="flex items-center gap-4">
                <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <h3 className="font-bold">{app.name}</h3>
                  <p className="text-xs text-text-muted">{t.submittedOn} Mar 15, 2024</p>
                </div>
                <button onClick={() => navigate('REVIEW_PANEL')} className="p-2 bg-border rounded-lg text-accent relative">
                  <MessageSquare size={18} />
                  <span className={`absolute -top-1 ${isRtl ? '-left-1' : '-right-1'} w-4 h-4 bg-error text-[10px] font-bold flex items-center justify-center rounded-full text-white`}>2</span>
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-text-muted">{t.testersProgress}</span>
                  <span>{app.testersCount}/{app.testersNeeded}</span>
                </div>
                <div className="h-2 bg-border rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-primary" 
                    style={{ width: `${(app.testersCount / app.testersNeeded) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );

  const renderReviewPanel = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <header className="flex items-center gap-4">
        <button onClick={goBack} className="p-2 bg-border rounded-full">
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
        </button>
        <div>
          <h1 className="text-xl font-bold">{t.reviewSubmissions}</h1>
          <p className="text-text-muted text-sm">DevFlow Pro</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MOCK_SUBMISSIONS.map(sub => (
          <div key={sub.id} className="glass-card overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-start to-accent flex items-center justify-center font-bold text-sm text-white">
                  {sub.testerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{sub.testerName}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-text-muted">
                    <Star size={10} className="text-yellow-500 fill-yellow-500" />
                    {sub.testerReputation} {t.reputation}
                  </div>
                </div>
              </div>
              <Badge variant={sub.status === 'pending' ? 'warning' : sub.status === 'approved' ? 'success' : 'error'}>
                {sub.status === 'pending' ? t.statusPending : sub.status === 'approved' ? t.statusApproved : t.statusRejected}
              </Badge>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <div className="space-y-1">
                  <p className="text-[10px] text-text-muted uppercase font-bold">{t.testerEmail}</p>
                  <p className="text-sm text-text">{sub.testerEmail}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-text-muted uppercase font-bold">{t.submissionTime}</p>
                  <p className="text-sm text-text">{sub.submittedAt}</p>
                </div>
              </div>

              {sub.answers && sub.answers.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-[10px] font-bold text-text-muted uppercase">{t.answers}</h5>
                  <div className="space-y-2">
                    {sub.answers.map((ans, i) => (
                      <div key={i} className="bg-border p-3 rounded-lg text-sm text-text">
                        {ans}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sub.status === 'pending' && (
                <div className="flex gap-3 pt-2">
                  <Button variant="danger" className="flex-1" icon={X}>{t.reject}</Button>
                  <Button variant="primary" className="flex-1" icon={Check}>{t.approve}</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

  const renderMySubmissions = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 bg-white/5 rounded-full">
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <h1 className="text-xl font-bold">{t.mySubmissions}</h1>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_SUBMISSIONS.map(sub => (
          <div key={sub.id} className="glass-card p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-border flex items-center justify-center text-primary-start">
              <Layout size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">{sub.appName}</h3>
              <p className="text-xs text-text-muted">{sub.submittedAt}</p>
            </div>
            <Badge variant={sub.status === 'pending' ? 'warning' : sub.status === 'approved' ? 'success' : 'error'}>
              {sub.status === 'pending' ? t.statusPending : sub.status === 'approved' ? t.statusApproved : t.statusRejected}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  </div>
);

  const renderAddApp = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        <header className="flex items-center gap-4">
        <button onClick={goBack} className="p-2 bg-border rounded-full">
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
        </button>
        <h1 className="text-xl font-bold">{t.addNewApp}</h1>
      </header>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-border cursor-pointer hover:bg-border/80 transition-colors">
            <Plus size={24} className="text-text-muted" />
            <span className="text-[10px] text-text-muted font-bold uppercase">Icon</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">{t.appName}</label>
              <input type="text" placeholder={t.enterAppName} className="w-full bg-border border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary-start/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">{t.appDescription}</label>
              <textarea placeholder={t.whatDoesAppDo} className="w-full bg-border border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary-start/50 h-32 resize-none"></textarea>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">{t.googleGroupLink}</label>
              <input type="text" defaultValue="https://groups.google.com/g/test-swap" className="w-full bg-border border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary-start/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text">{t.requiredTesters}</label>
              <div className="flex items-center gap-4 p-4 bg-border rounded-xl border border-border">
                <input type="range" min="5" max="50" className="flex-1 accent-primary-start" />
                <span className="font-bold text-primary-start">20</span>
              </div>
            </div>
            <div className="glass-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{t.costToPublish}</span>
                <span className="font-bold text-accent">20 {t.pts}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{t.yourBalance}</span>
                <span>{points} {t.pts}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={() => { alert(t.appSubmitted); navigate('MY_APPS'); }} className="w-full py-4">{t.publishApp}</Button>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <header className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 bg-border rounded-full">
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <h1 className="text-xl font-bold">{t.accountSettings}</h1>
        </header>

        <div className="flex flex-col items-center gap-4 p-6 glass-card">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-start to-accent p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/user/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary-start text-white rounded-full border-4 border-background shadow-lg">
              <Upload size={14} />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold">Layla Almansouri</h2>
            <p className="text-sm text-text-muted">dharypaypal@gmail.com</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">{t.fullName}</label>
              <input type="text" defaultValue="Layla Almansouri" className="w-full bg-border border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary-start/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">{t.emailAddress}</label>
              <input type="email" defaultValue="dharypaypal@gmail.com" className="w-full bg-border border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary-start/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-muted">{t.bio}</label>
              <textarea defaultValue="Senior Android Developer" className="w-full bg-border border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary-start/50 h-32 resize-none"></textarea>
            </div>
          </div>

          <Button onClick={() => { alert(t.profileUpdated); goBack(); }} className="w-full py-4">{t.saveChanges}</Button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <header className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 bg-border rounded-full">
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <h1 className="text-xl font-bold">{t.notifications}</h1>
        </header>

        <div className="space-y-4">
          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-start/10 text-primary-start rounded-xl">
                <Smartphone size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">{t.pushNotifications}</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-primary-start rounded-full p-1 flex items-center justify-end">
              <div className="w-4 h-4 bg-white rounded-full" />
            </button>
          </div>

          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 text-accent rounded-xl">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">{t.emailNotifications}</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-primary-start rounded-full p-1 flex items-center justify-end">
              <div className="w-4 h-4 bg-white rounded-full" />
            </button>
          </div>

          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 text-success rounded-xl">
                <Bell size={20} />
              </div>
              <div>
                <p className="font-medium text-sm">{t.marketingEmails}</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-border rounded-full p-1 flex items-center justify-start">
              <div className="w-4 h-4 bg-white rounded-full" />
            </button>
          </div>
        </div>

        <Button onClick={() => { alert(t.settingsSaved); goBack(); }} className="w-full py-4">{t.saveChanges}</Button>
      </div>
    </div>
  );

  const renderAppearance = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <header className="flex items-center gap-4">
          <button onClick={goBack} className="p-2 bg-border rounded-full">
            <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          </button>
          <h1 className="text-xl font-bold">{t.appearance}</h1>
        </header>

        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-bold text-lg">{t.themeMode}</h2>
            <p className="text-sm text-text-muted">{t.chooseTheme}</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => setTheme('light')}
              className={`glass-card p-4 flex items-center justify-between transition-all ${theme === 'light' ? 'border-primary-start bg-primary-start/5' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${theme === 'light' ? 'bg-primary-start text-white' : 'bg-border text-text-muted'}`}>
                  <Sun size={20} />
                </div>
                <span className="font-medium">{t.light}</span>
              </div>
              {theme === 'light' && <CheckCircle2 size={20} className="text-primary-start" />}
            </button>

            <button 
              onClick={() => setTheme('dark')}
              className={`glass-card p-4 flex items-center justify-between transition-all ${theme === 'dark' ? 'border-primary-start bg-primary-start/5' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-primary-start text-white' : 'bg-border text-text-muted'}`}>
                  <Moon size={20} />
                </div>
                <span className="font-medium">{t.dark}</span>
              </div>
              {theme === 'dark' && <CheckCircle2 size={20} className="text-primary-start" />}
            </button>

            <button 
              onClick={() => setTheme('system')}
              className={`glass-card p-4 flex items-center justify-between transition-all ${theme === 'system' ? 'border-primary-start bg-primary-start/5' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${theme === 'system' ? 'bg-primary-start text-white' : 'bg-border text-text-muted'}`}>
                  <Monitor size={20} />
                </div>
                <span className="font-medium">{t.system}</span>
              </div>
              {theme === 'system' && <CheckCircle2 size={20} className="text-primary-start" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto no-scrollbar pb-24">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.profile}</h1>
        <button className="p-2 bg-border rounded-full"><Settings size={20} /></button>
      </header>

      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-start to-accent p-1">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/user/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className={`absolute bottom-0 ${isRtl ? 'left-0' : 'right-0'} p-1.5 bg-success rounded-full border-4 border-background`}>
            <Check size={12} className="text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">Layla Almansouri</h2>
          <p className="text-text-muted text-sm">Senior Android Developer</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-bold">4.9</p>
          <p className="text-[10px] text-text-muted uppercase font-bold">{t.reputation}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-bold">24</p>
          <p className="text-[10px] text-text-muted uppercase font-bold">{t.tests}</p>
        </div>
        <div className="glass-card p-3 text-center">
          <p className="text-lg font-bold">3</p>
          <p className="text-[10px] text-text-muted uppercase font-bold">{t.apps}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-border rounded-xl text-text-muted">
              <Settings size={20} />
            </div>
            <span className="font-medium">{t.language}</span>
          </div>
          <div className="flex bg-border rounded-lg p-1">
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang === 'en' ? 'bg-primary-start text-white' : 'text-text-muted'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('ar')}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${lang === 'ar' ? 'bg-primary-start text-white' : 'text-text-muted'}`}
            >
              AR
            </button>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-between group" 
          icon={CheckCircle2}
          onClick={() => navigate('MY_SUBMISSIONS')}
        >
          {t.mySubmissions} <ChevronRight size={18} className={`text-text-muted group-hover:text-text transition-colors ${isRtl ? 'rotate-180' : ''}`} />
        </Button>
        <Button variant="ghost" className="w-full justify-between group" icon={User} onClick={() => navigate('ACCOUNT_SETTINGS')}>
          {t.accountSettings} <ChevronRight size={18} className={`text-text-muted group-hover:text-text transition-colors ${isRtl ? 'rotate-180' : ''}`} />
        </Button>
        <Button variant="ghost" className="w-full justify-between group" icon={Bell} onClick={() => navigate('NOTIFICATIONS')}>
          {t.notifications} <ChevronRight size={18} className={`text-text-muted group-hover:text-text transition-colors ${isRtl ? 'rotate-180' : ''}`} />
        </Button>
        <Button variant="ghost" className="w-full justify-between group" icon={Layout} onClick={() => navigate('APPEARANCE')}>
          {t.appearance} <ChevronRight size={18} className={`text-text-muted group-hover:text-text transition-colors ${isRtl ? 'rotate-180' : ''}`} />
        </Button>
        <Button variant="ghost" className="w-full justify-between group text-error hover:bg-error/5" icon={LogOut} onClick={handleLogout}>
          {t.logout}
        </Button>
      </div>
    </div>
  </div>
  );

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-start border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`app-container selection:bg-primary-start/30 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Desktop Sidebar */}
      {user && currentScreen !== 'WELCOME_WIZARD' && (
        <aside className="desktop-sidebar">
          <div className="flex items-center gap-3 px-4 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary-start/20">
              <img src="/logo.png" alt="Test Swap" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <span className="text-xl font-bold tracking-tight">Test Swap</span>
          </div>

          <nav className="flex flex-col gap-2">
            <SidebarItem 
              active={currentScreen === 'HOME' || currentScreen === 'APP_DETAILS' || currentScreen === 'TESTING_FLOW'} 
              icon={Home} 
              label={t.home} 
              onClick={() => navigate('HOME')} 
              isRtl={isRtl}
            />
            <SidebarItem 
              active={currentScreen === 'MY_POINTS'} 
              icon={Coins} 
              label={t.points} 
              onClick={() => navigate('MY_POINTS')} 
              isRtl={isRtl}
            />
            <SidebarItem 
              active={currentScreen === 'MY_APPS' || currentScreen === 'REVIEW_PANEL' || currentScreen === 'ADD_APP'} 
              icon={Layout} 
              label={t.myApps} 
              onClick={() => navigate('MY_APPS')} 
              isRtl={isRtl}
            />
            <SidebarItem 
              active={currentScreen === 'PROFILE' || currentScreen === 'MY_SUBMISSIONS' || currentScreen === 'ACCOUNT_SETTINGS' || currentScreen === 'NOTIFICATIONS' || currentScreen === 'APPEARANCE'} 
              icon={User} 
              label={t.profile} 
              onClick={() => navigate('PROFILE')} 
              isRtl={isRtl}
            />
          </nav>

          <div className="mt-auto">
            <div className="glass-card p-4 bg-primary-start/5 border-primary-start/10">
              <p className="text-xs text-text-muted uppercase font-bold mb-1">{t.availableBalance}</p>
              <p className="text-xl font-bold text-primary-start">{points.toLocaleString()} {t.pts}</p>
            </div>
          </div>
        </aside>
      )}

      <div className={user && currentScreen !== 'WELCOME_WIZARD' ? "main-content" : "w-full min-h-screen flex flex-col"}>
        {/* Status Bar Mock - Only on Mobile */}
        {user && currentScreen !== 'WELCOME_WIZARD' && (
          <div className="h-10 px-6 flex items-center justify-between text-[10px] font-bold text-text-muted select-none md:hidden">
            <span>9:41</span>
            <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-4 h-2.5 border border-border rounded-[2px] relative">
                <div className={`absolute inset-[1px] bg-text-muted ${isRtl ? 'right-0' : 'left-0'} w-2/3`}></div>
              </div>
              <span>5G</span>
            </div>
          </div>
        )}

        <main className="flex-1 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {!user && renderLogin()}
              {user && currentScreen === 'WELCOME_WIZARD' && renderWelcomeWizard()}
              {user && currentScreen === 'HOME' && renderHome()}
              {user && currentScreen === 'APP_DETAILS' && renderAppDetails()}
              {user && currentScreen === 'TESTING_FLOW' && renderTestingFlow()}
              {user && currentScreen === 'MY_POINTS' && renderMyPoints()}
              {user && currentScreen === 'MY_APPS' && renderMyApps()}
              {user && currentScreen === 'REVIEW_PANEL' && renderReviewPanel()}
              {user && currentScreen === 'ADD_APP' && renderAddApp()}
              {user && currentScreen === 'PROFILE' && renderProfile()}
              {user && currentScreen === 'ACCOUNT_SETTINGS' && renderAccountSettings()}
              {user && currentScreen === 'NOTIFICATIONS' && renderNotifications()}
              {user && currentScreen === 'APPEARANCE' && renderAppearance()}
              {user && currentScreen === 'MY_SUBMISSIONS' && renderMySubmissions()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation - Only on Mobile */}
        {user && currentScreen !== 'WELCOME_WIZARD' && (
          <nav className="md:hidden sticky bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border px-6 py-4 pb-8 flex items-center justify-between z-50">
            <NavItem 
              active={currentScreen === 'HOME' || currentScreen === 'APP_DETAILS' || currentScreen === 'TESTING_FLOW'} 
              icon={Home} 
              label={t.home} 
              onClick={() => navigate('HOME')} 
            />
            <NavItem 
              active={currentScreen === 'MY_POINTS'} 
              icon={Coins} 
              label={t.points} 
              onClick={() => navigate('MY_POINTS')} 
            />
            <NavItem 
              active={currentScreen === 'MY_APPS' || currentScreen === 'REVIEW_PANEL' || currentScreen === 'ADD_APP'} 
              icon={Layout} 
              label={t.myApps} 
              onClick={() => navigate('MY_APPS')} 
            />
            <NavItem 
              active={currentScreen === 'PROFILE' || currentScreen === 'MY_SUBMISSIONS' || currentScreen === 'ACCOUNT_SETTINGS' || currentScreen === 'NOTIFICATIONS' || currentScreen === 'APPEARANCE'} 
              icon={User} 
              label={t.profile} 
              onClick={() => navigate('PROFILE')} 
            />
          </nav>
        )}

        {/* Home Indicator - Only on Mobile */}
        {user && currentScreen !== 'WELCOME_WIZARD' && (
          <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-border rounded-full z-50"></div>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ active, icon: Icon, label, onClick, isRtl }: { active: boolean, icon: any, label: string, onClick: () => void, isRtl: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-primary-start text-white shadow-lg shadow-primary-start/20' 
          : 'text-text-muted hover:text-text hover:bg-border'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className={`ml-auto w-1.5 h-1.5 rounded-full bg-white ${isRtl ? 'mr-auto ml-0' : ''}`}
        />
      )}
    </button>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all ${active ? 'text-primary-start' : 'text-text-muted hover:text-text'}`}
    >
      <div className={`p-1 rounded-lg transition-colors ${active ? 'bg-primary-start/10' : ''}`}>
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
