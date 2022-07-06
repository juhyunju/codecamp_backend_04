let str = "1"
function makeNumber(num){
    for( i = 2; i<=num; i++ ){
        str = str +'-' + i 
    }
    console.log(str)
}

makeNumber(5)
makeNumber(7)