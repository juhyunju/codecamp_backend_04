export function checkValadationPhone(myphone){
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log('핸드폰번호를 제대로 입력해주세요.')
        return false
    }else{
        return true
    }
}
export function getToken(){
    const a = 6
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
    // console.log(result)
    return result

}
export function sendTokenToSMS(myphone,result){
    console.log(myphone + "번호로 인증번호" + result + '을 전송합니다.')

}