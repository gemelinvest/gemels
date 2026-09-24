import type { ImageMetadata } from "astro";
import heroImage from "../assets/hero-family-living-room.png";
import familyImage from "../assets/family-kitchen-morning.png";
import aboutImage from "../assets/about-window-parent-child.png";
import articleTable from "../assets/article-quiet-table.png";
import articleBalcony from "../assets/article-balcony-plants.png";
import articleTea from "../assets/article-hands-tea.png";

export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}`;
}

export const phone = {
  display: "*0000",
  href: "tel:*0000",
} as const;

export const brand = {
  name: "גמל INS",
  latinName: "Gemel INS",
} as const;

export const nav = [
  { href: withBase("/"), label: "דף הבית" },
  { href: withBase("/#about"), label: "אודות" },
  { href: withBase("/#services"), label: "שירותים" },
  { href: withBase("/articles/"), label: "מאמרים" },
  { href: withBase("/#contact"), label: "צור קשר" },
] as const;

export const legalNav = [
  { href: withBase("/privacy/"), label: "מדיניות פרטיות" },
  { href: withBase("/accessibility/"), label: "הצהרת נגישות" },
  { href: withBase("/terms/"), label: "תנאי שימוש" },
  { href: withBase("/map/"), label: "מפת אתר" },
] as const;

export type ServiceIcon =
  | "gemel"
  | "pension"
  | "insurance"
  | "savings"
  | "finance"
  | "personal";

export const services: {
  id: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
  placeholder: true;
}[] = [
  {
    id: "gemel",
    title: "קופות גמל",
    summary: "מקום לתיאור קופות הגמל. הניסוח יאושר לפני פרסום.",
    icon: "gemel",
    placeholder: true,
  },
  {
    id: "pension",
    title: "פנסיה",
    summary: "מקום לתיאור הליווי הפנסיוני. הניסוח יאושר לפני פרסום.",
    icon: "pension",
    placeholder: true,
  },
  {
    id: "insurance",
    title: "ביטוחים",
    summary: "מקום לתיאור הביטוחים. הניסוח יאושר לפני פרסום.",
    icon: "insurance",
    placeholder: true,
  },
  {
    id: "savings",
    title: "חיסכון",
    summary: "מקום לתיאור פתרונות החיסכון. הניסוח יאושר לפני פרסום.",
    icon: "savings",
    placeholder: true,
  },
  {
    id: "finance",
    title: "פתרונות פיננסיים",
    summary: "מקום לתיאור. ייתכן שהתחום אינו רלוונטי עד לאישור.",
    icon: "finance",
    placeholder: true,
  },
  {
    id: "personal",
    title: "שירות אישי",
    summary: "מקום לתיאור אופן הליווי. הניסוח יאושר לפני פרסום.",
    icon: "personal",
    placeholder: true,
  },
];

export const hero = {
  eyebrow: "גמל INS",
  title: "העתיד שלך, בידיים טובות",
  subtitle: "ליווי מקצועי ופתרונות מותאמים לך ולמשפחה שלך",
  primaryCta: { href: withBase("/#contact"), label: "צור קשר" },
  secondaryCta: { href: withBase("/#services"), label: "לעוד מידע" },
  image: heroImage,
  imageAlt: "משפחה צעירה, הורים ושני ילדים, יושבים יחד על ספה בסלון מואר",
};

export const about = {
  id: "about",
  eyebrow: "אודות",
  title: "אודות גמל INS",
  paragraphs: [
    "גמל INS הוא השם שמופיע באתר הזה. כאן ייכנס הסיפור של החברה, הגישה שלה, והדרך שבה היא יושבת מול משפחות.",
    "בעמוד אין נתונים על שנות ניסיון, מספר לקוחות, רישיונות, פרסים או גופים שאיתם עובדים. הפרטים האלה יתווספו רק אחרי שתספקו אותם.",
  ],
  cta: { href: withBase("/#contact"), label: "דברו איתנו" },
  image: aboutImage,
  imageAlt: "הורה וילד עומדים ליד חלון בבית מואר",
};

export const family = {
  eyebrow: "משפחה ועתיד",
  title: "ביטחון שמתחיל בבית",
  text: "החלטות על חיסכון וביטוח נוגעות לאנשים שחיים איתנו. כשהניסוח הסופי יהיה מוכן, הוא יישב כאן לצד התמונה.",
  cta: { href: withBase("/#contact"), label: "צור קשר" },
  image: familyImage,
  imageAlt: "משפחה צעירה יושבת סביב שולחן אוכל במטבח מואר",
};

export const benefits = {
  eyebrow: "הגישה",
  title: "איך הליווי יכול להיראות",
  note: "הניסוח זמני וממתין לאישור. אין כאן הבטחות או נתונים על החברה.",
  items: [
    {
      title: "שיחה בגובה העיניים",
      text: "מקום להסבר איך מתחילים שיחה, בלי מונחים מיותרים.",
    },
    {
      title: "התאמה לבית",
      text: "מקום לתיאור איך בודקים מה מתאים למשפחה, אחרי אישור התוכן.",
    },
    {
      title: "סדר במסמכים",
      text: "מקום להסביר איך אוספים מידע, כשהתהליך יוגדר.",
    },
    {
      title: "כתובת אחת לפנייה",
      text: "טלפון וטופס במקום אחד, עד שיוגדרו ערוצי שירות נוספים.",
    },
  ],
};

export const articles: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateLabel: string;
  image: ImageMetadata;
  imageAlt: string;
  placeholder: true;
}[] = [
  {
    slug: "draft-home-table",
    title: "טיוטה: שיחה רגועה סביב השולחן",
    excerpt: "כרטיס מקום לאזור המאמרים. זה אינו מאמר רשמי ואין בו ייעוץ.",
    date: "2026-09-24",
    dateLabel: "24 בספטמבר 2026",
    image: articleTable,
    imageAlt: "שולחן עץ עם מחברת סגורה, כוס וצמח, באור יום",
    placeholder: true,
  },
  {
    slug: "draft-morning-balcony",
    title: "טיוטה: בוקר במרפסת",
    excerpt: "מקום שמור לתוכן אורגני עתידי. אין לקרוא את זה כמידע על מוצרים.",
    date: "2026-09-24",
    dateLabel: "24 בספטמבר 2026",
    image: articleBalcony,
    imageAlt: "מרפסת דירה עם עציצים וכיסא באור בוקר",
    placeholder: true,
  },
  {
    slug: "draft-tea",
    title: "טיוטה: כוס תה וזמן לשאול",
    excerpt: "תקציר זמני. המאמר עצמו ייכתב ויוחלף כשיהיה תוכן מאושר.",
    date: "2026-09-24",
    dateLabel: "24 בספטמבר 2026",
    image: articleTea,
    imageAlt: "שתי ידיים מחזיקות כוסות תה מעל שולחן עץ",
    placeholder: true,
  },
];

export const contactTopics = [
  "קופות גמל",
  "פנסיה",
  "ביטוחים",
  "חיסכון",
  "פתרונות פיננסיים",
  "שירות אישי",
  "אחר",
] as const;

export const ctas = {
  primary: {
    eyebrow: "שיחת היכרות",
    title: "רוצים להבין מה מתאים לכם?",
    text: "אנחנו כאן כדי לעזור.",
  },
  closing: {
    eyebrow: "גמל INS",
    title: "נשמח לשמוע מכם",
    text: "אפשר להתקשר עכשיו, או להשאיר פרטים בטופס. הטופס עדיין לא מחובר לשרת.",
  },
};

export function articlePath(slug: string) {
  return withBase(`/articles/${slug}/`);
}
