function solution(n, m) {
  let answer = [];
  let max = 0;

  for (let i = 1; i <= m; i++) {
    if (n % i === 0 && m % i === 0) {
      max = i;
    }
  }
  let min = 0;
  for (let i = m; i <= n * m; i += m) {
    if (i % n === 0) {
      min = i;
      break;
    }
  }
  return [max, min];
}
