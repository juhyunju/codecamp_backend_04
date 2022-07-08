const grade = (score) =>{
    if(100 < score || 0 > score){
        return "잘못된 점수입니다."
    }
    let answer = '';
    if(100 >= score && 90 <= score){
        answer = 'A'
    }else if (89>=score && 80 <= score){
        answer = 'B'
    }else if (79>=score && 70 <= score){
        answer = 'c'
    }else if (69>=score && 60 <= score){
        answer = 'D'
    }else if(59 >= score){
        answer = "F"
    }

    return answer
    
}

console.log(grade(105))  // "잘못된 점수입니다"
console.log(grade(-10))  // "잘못된 점수입니다"
console.log(grade(100))   // "A"
console.log(grade(86))   // "B"
console.log(grade(75))   // "C"
console.log(grade(66))   // "D"
console.log(grade(52))   // "F"