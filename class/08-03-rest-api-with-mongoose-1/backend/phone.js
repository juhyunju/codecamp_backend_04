import coolsms from 'coolsms-node-sdk'
import 'dotenv/config'

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
export async function sendTokenToSMS(myphone,result){
    const SMS_KEY = process.env.SMS_KEY
    const SMS_SECRET = process.env.SMS_SECRET
    const SMS_SENEDER=process.env.SMS_SENEDER
    const mysms = coolsms.default
    const messageService = new mysms({SMS_KEY},{SMS_SECRET})
    const response = await messageService.sendOne({
        to: myphone,
        from: {SMS_SENEDER},
        text: `[코드캠프] 안녕하세요? 요청하신 인증번호는" [${result}] 입니다.`
    })
    console.log(response)
    // console.log(myphone + "번호로 인증번호" + result + '을 전송합니다.')

}