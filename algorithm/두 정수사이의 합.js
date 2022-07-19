function solution(a, b) {
    let answer = 0;
    if ( a < b ){ // 5 > 3 
        for(let i = a; i<=b; i++){  
            answer += i
        }
    }else if(a > b ){
        for(let j = b; j<=a; j++ ){
            answer += j
        }
    }else {
        answer = a
    }
    return answer;
}