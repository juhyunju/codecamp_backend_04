// const express = require('express')
import express from 'express'

const app = express()

app.get('/aaa', (req, res) => {
    res.send('Hello World! 반가워유~')
})

// app.post('/qqq',(req,res) =>{

// })

app.listen(3000, () => {
    console.log(`서버를 켜는데 성공했습니다.`)
})