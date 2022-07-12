function solution(n) {
    let answer = 0;
    for(i = 0; i<=n; i++){
        if(n%i === 0){
            answer += i
            console.log(answer)
        }
    }
    return answer;
}