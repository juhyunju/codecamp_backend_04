const month = {
  1: 31,
  2: 29,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
const weekDay = ["FRI", "SAT", "SUN", "MON", "TUE", "WED", "THU"];
function solution(a, b) {
  let answer = 0;

  for (let i = 1; i < a; i++) {
    answer += month[i];
  }
  answer += b - 1;

  return weekDay[answer % 7];
}
