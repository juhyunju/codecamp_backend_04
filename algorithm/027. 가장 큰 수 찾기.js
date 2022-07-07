function bigNum(str){
    let big = 0
    for(let i = 0 ; i<str.length; i++){
        if(big<str[i]){
            big = Number(str[i])
        }
    }
    console.log(big)
}

bigNum("12345")