console.log('안녕하세요')
function createTokenOfPhone(myphone){
    // 1. 핸드폰번호 자릿수 맞는지 확인하기
    if(myphone.length !== 10 && myphone.length !== 11){
        console.log('핸드폰번호를 제대로 입력해주세요.')
        return
    }
    // 2. 핸드폰 토큰 6자리 만들기
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
    console.log(result)

    // 3. 핸드폰번호에 토큰 전송하기
    console.log(myphone + "번호로 인증번호" + result + '을 전송합니다.')
    // console.log()



}
createTokenOfPhone('01012345678')