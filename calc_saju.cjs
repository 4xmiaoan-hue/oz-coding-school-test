
const KoreanLunarCalendar = require('korean-lunar-calendar');

const calendar = new KoreanLunarCalendar();
calendar.setSolarDate(1998, 2, 24);
const gapja = calendar.getKoreanGapja();
console.log(JSON.stringify(gapja));
