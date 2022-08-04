function solution(d, budget) {
    const answer = [];

    // 모든 부서가 신청한 지원금에 따라 오름차순
    d.sort((a, b) => a - b);

    // 부서들이 신청한 금액의 총 합
    let sum = 0;
    for (let i = 0; i < d.length; i++) {
        sum += d[i];

        if (sum <= budget) {
            answer.push(d[i]);
        }
    }
    return answer.length;
}
