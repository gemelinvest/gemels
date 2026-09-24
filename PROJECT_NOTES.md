# גמל INS — הערות פרויקט

אתר בית סטטי, נפרד ממערכת גמל אינווסט. הקוד לא נמצא בתוך ה-repository של ה-CRM.

## איך מריצים

```bash
cd /home/ubuntu/gemel-ins-site
npm install
npm run dev
```

פיתוח נפתח בדרך כלל על `http://localhost:4321`.

בנייה:

```bash
npm run build
npm run preview
npm run check
```

`npm run build` יוצר את `dist/` וגם את תמונת השיתוף `public/og.jpg`.

## איך משנים את הטלפון

מקום אחד:

`src/data/site.ts`

השדה `phone`:

```ts
export const phone = {
  display: "*0000",
  href: "tel:*0000",
};
```

כל כפתור וקישור טלפון באתר קוראים מהשדה הזה. אחרי שינוי, `display` ו-`href` צריכים להתארך יחד. לדוגמה מספר רגיל: `display: "03-0000000"` ו-`href: "tel:030000000"`.

## איפה משנים את תוכן האתר

הכול מרוכז ב-`src/data/site.ts`:

- כותרת ה-Hero, כפתורים וטקסט משנה
- רשימת השירותים
- אודות
- אזור המשפחה
- יתרונות הגישה
- מאמרים
- נושאי הטופס
- ניסוחי ה-CTA
- פריטי הניווט

הרכיבים רק מציגים את הנתונים. הם נמצאים ב-`src/components/`:

- `Header.astro`
- `Hero.astro`
- `Services.astro`
- `About.astro`
- `Benefits.astro`
- `FamilySection.astro`
- `Articles.astro`
- `ContactCTA.astro`
- `ContactForm.astro`
- `Footer.astro`

עמודים: `src/pages/`.

השירותים, המאמרים, האודות והמידע הרגולטורי מסומנים כתוכן זמני. אין באתר נתוני ניסיון, לקוחות, רישיונות או פרסים.

## איפה משנים SEO

- כותרת ותיאור של כל עמוד: הפרמטרים `title` ו-`description` ב-`BaseLayout` שבתוך העמוד.
- כתובת קנונית, Open Graph ו-JSON-LD: `src/layouts/BaseLayout.astro`.
- כתובת האתר: משתנה הסביבה `PUBLIC_SITE_URL`. דוגמה ב-`.env.example`. בלי שינוי, הכתובת היא `https://gemel-ins-site.example`.
- אימות Search Console בעתיד: `PUBLIC_GSC_VERIFICATION`. כשהערך ריק, תג האימות לא נכנס לעמוד.
- `sitemap-index.xml` נוצר בבנייה.
- `robots.txt` נוצר מ-`src/pages/robots.txt.ts`.
- מפת אתר לקוראים: `/map/`.

אין Google Analytics באתר.

## איפה משנים תמונות

קבצי המקור:

- `src/assets/hero-family-living-room.png`
- `src/assets/family-kitchen-morning.png`
- `src/assets/about-window-parent-child.png`
- `src/assets/article-quiet-table.png`
- `src/assets/article-balcony-plants.png`
- `src/assets/article-hands-tea.png`

הקישור בין תמונה לטקסט חלופי נמצא ב-`src/data/site.ts`. Astro מייצר בזמן בנייה גרסאות רספונסיביות.

`public/og.jpg` נוצרת אוטומטית מתמונת ה-Hero ב-`scripts/og.mjs`.

הלוגו הרשמי נמצא ב-`public/brand/logo.png` ומופיע בכותרת ובתחתית. אייקון הטאב הוא `public/brand/favicon.png`. הצבעים באתר נגזרים מהלוגו: כחול כהה וזהב.

## מידע שעדיין חסר

- ניסוח סופי ל-Hero, אודות, שירותים ו-CTA
- אילו שירותים באמת רלוונטיים
- לוגו רשמי
- מספר טלפון אמיתי במקום `*0000`
- כתובת האתר בפועל
- מדיניות פרטיות
- תנאי שימוש
- הצהרת נגישות אחרי בדיקה אמיתית
- מידע רגולטורי (הפוטר מסומן `PLACEHOLDER`)
- מאמרים אמיתיים
- חיבור הטופס לשרת
- כתובת, שעות פעילות, ופרופיל Google Business אם יוחלט לפרסם אותם

## לפני Production

1. להחליף את `PUBLIC_SITE_URL` לדומיין האמיתי ולבנות מחדש, כדי ש-canonical, sitemap ו-Open Graph יצביעו נכון.
2. להחליף טלפון, טקסטים, לוגו ותמונות.
3. לא לחבר Analytics לפני שמבקשים זאת.
4. לא למלא schema בכתובת, רישיון או שנות פעילות שלא סופקו.
5. לחבר את `submit` ב-`ContactForm.astro` לשרת. עד אז הטופס מודיע שהפנייה לא נשלחה.
6. להשלים מסמכים משפטיים ורגולטוריים.
7. להריץ בדיקת נגישות אמיתית לפני כל ניסוח שאומר שהאתר עומד בתקן.
8. לוודא שאין גלילה אופקית ב-360, 390, 768, 1024, 1280, 1440 ו-1920.

## Repository

האתר נבנה בתיקייה נפרדת: `/home/ubuntu/gemel-ins-site`.

יצירת `github.com/gemelinvest/gemel-ins-site` נכשלה. לטוקן של הסביבה אין הרשאה לפתוח repository חדש (`Resource not accessible by integration`). מערכת גמל אינווסט לא שונתה.
