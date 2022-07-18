import { getToday } from "./utils.js"
import nodemailer from 'nodemailer'
import { response } from "express"
import 'dotenv/config'

export function checkValidationEmail(myemail){
    if(myemail === undefined || myemail.includes("@") === false){
        console.log("에러 발생!!! 이메일을 제대로 입력해 주세요!!!")
        return false
    } else {
        return true
    }
}


export function getWelcomeTemplate({ name, age, school }){
    const mytemplate = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <hr />
                <div>이름: ${name}</div>
                <div>나이: ${age}살</div>
                <div>학교: ${school}</div>
                <div>가입일: ${getToday()}</div>
            </body>
        </html>
    `
    return mytemplate
    // console.log(mytemplate)
}

export async function sendTemplateToEmail(myemail, result){
    const EMAIL_USER = process.env.EMAIL_USER
    const EMAIL_PASS = process.env.EMAIL_PASS
    const EMAIL_SENDER = process.env.EMAIL_SENDER
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    })
    const reponse = await transporter.sendMail({
        from: EMAIL_SENDER,
        to: myemail,
        subject:"[졸려] 미치기직전 축하합니다",
        html: result

    })
    console.log(response)
    // console.log(myemail + "주소로 가입환영 템플릿" + result + "을 전송합니다!!!")
}