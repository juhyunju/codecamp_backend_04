// const express = require('express')
import express from 'express'
import { checkValadationPhone,getToken,sendTokenToSMS} from './phone.js'

const app = express()

app.use(express.json())

app.get('/boards', (req, res) => {
    // 1. 데이터를 조회하는 로직 -> DB 접속 데이터 꺼내오기
    const result = [
        {number: 1, writer:"철수",title:"철제목",contents:"철내용"},
        {number: 2, writer:"영희",title:"영제목",contents:"영내용"},
        {number: 3, writer:"훈이",title:"훈제목",contents:"훈내용"}
    ]
    // 2. 꺼내온 결과 응답 주기
    res.send(result)


})

app.post('/boards',(req,res) =>{
    // console.log(req.body.writer)
    // console.log(req.body.title)
    console.log(req.body.myphone)
    // 1. 데이터를 등록하는 로직 -> DB에 접속해서 데이터 저장하기

    // 2. 저장결과 응답 주기
    res.send("게시물 등록에 성공하였습니다.")
})


app.post('/tokens/phone',(req,res) => {
    const myphone = req.body.myphone
    // 1. 핸드폰번호 자릿수 맞는지 확인하기
    const isValid = checkValadationPhone(myphone)
    if(isValid === false){
        return
    }
    // 2. 핸드폰 6자리 만들기
    const mytoken = getToken()
    // 3. 핸드폰번호에 토큰 전송하기
    sendTokenToSMS(myphone,mytoken)
    res.send("인증완료")
    
})

app.listen(3000, () => {
    console.log(`서버를 켜는데 성공했습니다.`)
})

