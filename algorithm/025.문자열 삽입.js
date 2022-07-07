let str = ""
function makeNumber(num){
    for( i = 1; i<=num; i++ ){
        str+=i  
        if(i!==num){
            str+="-"
        }
    }
    console.log(str)
}

makeNumber(5)
