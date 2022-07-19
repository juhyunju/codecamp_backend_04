function solution(x) {
    let answer = true;
    let a = x.toString()
    let sum = 0
    for(let i = 0; i<a.length; i++){
        sum += Number(a[i])
        if(x % sum === 0){
            answer = true
        }else {
            answer = false
        }
    } return answer
}