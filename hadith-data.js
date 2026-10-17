const hadithData = [
  {
    id: 1,
    english:
      "The Messenger of Allah said: The best of you are those who are best to their families. Source: Tirmidhi",
    arabic: "خيركم خيركم لأهله، وأنا خيركم لأهلي.",
    bosnian:
      "Allahov Poslanik je rekao: Najbolji među vama su oni koji su najbolji prema svojoj porodici. Izvor: Tirmizi",
  },
  {
    id: 2,
    english: "Indeed, with hardship comes ease. Quran 94:5-6",
    arabic: "فإن مع العسر يسرا، إن مع العسر يسرا.",
    bosnian: "Doista, uz teškoću dolazi olakšanje. Kur'an 94:5-6",
  },
  {
    id: 3,
    english:
      "Richness is not having many possessions; true richness is richness of the soul. Source: Bukhari and Muslim",
    arabic: "ليس الغنى عن كثرة العرض، ولكن الغنى غنى النفس.",
    bosnian:
      "Bogatstvo nije u mnoštvu imetka; pravo bogatstvo je bogatstvo duše. Izvor: Buhari i Muslim",
  },
  {
    id: 4,
    english:
      "Whoever believes in Allah and the Last Day should speak good or remain silent. Source: Bukhari and Muslim",
    arabic: "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت.",
    bosnian:
      "Ko vjeruje u Allaha i Sudnji dan, neka govori dobro ili neka šuti. Izvor: Buhari i Muslim",
  },
  {
    id: 5,
    english: "Actions are judged by intentions. Source: Bukhari and Muslim",
    arabic: "إنما الأعمال بالنيات.",
    bosnian: "Djela se vrednuju prema namjerama. Izvor: Buhari i Muslim",
  },
  {
    id: 6,
    english: "Allah is with those who are patient. Quran 2:153",
    arabic: "إن الله مع الصابرين.",
    bosnian: "Allah je, zaista, sa strpljivima. Kur'an 2:153",
  },
  {
    id: 7,
    english:
      "None of you truly believes until he loves for his brother what he loves for himself. Source: Bukhari and Muslim",
    arabic: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.",
    bosnian:
      "Niko od vas neće potpuno vjerovati dok ne bude volio svome bratu ono što voli sebi. Izvor: Buhari i Muslim",
  },
  {
    id: 8,
    english:
      "The strong person is the one who controls himself when angry. Source: Bukhari and Muslim",
    arabic: "ليس الشديد بالصرعة، إنما الشديد الذي يملك نفسه عند الغضب.",
    bosnian:
      "Jak nije onaj koji savlada drugoga, nego onaj koji se savlada u srdžbi. Izvor: Buhari i Muslim",
  },
  {
    id: 9,
    english: "Every soul will taste death. Quran 3:185",
    arabic: "كل نفس ذائقة الموت.",
    bosnian: "Svaka duša će smrt okusiti. Kur'an 3:185",
  },
  {
    id: 10,
    english:
      "The most beloved deeds to Allah are those done regularly, even if they are small. Source: Bukhari and Muslim",
    arabic: "أحب الأعمال إلى الله أدومها وإن قل.",
    bosnian:
      "Allahu najdraža djela su ona koja se rade ustrajno, makar bila mala. Izvor: Buhari i Muslim",
  },
  {
    id: 11,
    english: "A good word is charity. Source: Bukhari and Muslim",
    arabic: "الكلمة الطيبة صدقة.",
    bosnian: "Lijepa riječ je sadaka. Izvor: Buhari i Muslim",
  },
  {
    id: 12,
    english:
      "Allah does not look at your appearance or wealth, but He looks at your hearts and deeds. Source: Muslim",
    arabic: "إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم.",
    bosnian:
      "Allah ne gleda u vaš izgled niti imetak, nego gleda u vaša srca i djela. Izvor: Muslim",
  },
];

function getHadithByIndex(index) {
  return hadithData[index % hadithData.length];
}

function getHadithOfDay() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / 86400000);
  return getHadithByIndex(dayOfYear);
}
