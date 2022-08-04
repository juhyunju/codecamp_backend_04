function solution(n) {
    const answer = [];
    let prev = 0; // 피보나치의 0번째 숫자를 의미
    let next = 1; // 피보나치의 1번째 숫자를 의미
    let sum = 1;

    for (let i = 2; i <= n; i++) {
        sum = (prev + next) % 1234567;
        prev = next;
        next = sum;
        answer.push(sum);
    }

    return answer[n - 2];
}
