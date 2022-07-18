console.log('안녕하세요')

function getToken(a){
    const result = String(Math.floor(Math.random() * 10 ** a )).padStart(a, "0")
    console.log(result)
}
getToken(3)


function add(a,b){
    const result = a+b
    console.log(result)
}
add(3,4)

function add2(a,b){
    const result = a+b
    return result
}
console.log(add2(3,4))