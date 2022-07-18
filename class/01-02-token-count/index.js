console.log('안녕하세요')

function getToken(a){

    if(a === undefined){
        console.log('error!!!')
        return
    } else if( a <= 0){
        console.log('error!!!')
        return
    } else if ( a > 10) {
        console.log('error!!! 갯수가 너무 많습니다..')
        return
    }
    const result = String(Math.floor(Math.random() * 10 ** a )).padStart(a, "0")
    console.log(result)
}
getToken(0)