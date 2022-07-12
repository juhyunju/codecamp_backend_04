function solution(s) {
    const center = Math.floor(s.length / 2)
    let answer = s[center]
    if(s.length % 2 === 0){
        answer = s[center-1] + answer
    }
    return answer
}


function solution(s) {
    const center = Math.floor(s.length / 2)

    let answer = s.length % 2 === 1 
                ? s[center]
                : s.slice(center-1, center+1)

    return answer

}