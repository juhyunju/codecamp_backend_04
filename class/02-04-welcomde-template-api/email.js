export function checkValadationEmail(myemail){
    if(myemail === undefined || myemail.includes("@") === false){
        console.log("이메일을 제대로 입력해주세요")
        return false
    } else{
        return true
    }
}

export function getWelcomeTemplate({name,age,school}){
    const aaa = new Date()
    const yyyy = aaa.getFullYear()
    const mm = aaa.getMonth() + 1
    const dd = aaa.getDate()
    const today = `${yyyy} - ${mm}-${dd}`

    const mytemplate = `
            <html>
                <body>
                <h1>${name}님 가입을 환영합니다!</h1>
                <hr />
                <div>이름 : ${name}<div>
                <div>나이: ${age}<div>
                <div>학교: ${school}<div>
                <div>가입일 :${today}<div>
                </body/>
            </html>
            `
    // console.log(mytemplate)
    return mytemplate
}
export function sendTemplateToEmail(myemail,result){
    console.log(myemail + "주소로 가입환영 템플릿" + result + "을 전송합니다.")

}