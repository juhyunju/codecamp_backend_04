let count = 0;
let sum = 0;
let rank = ""
const myShopping = [
    { category: "과일", price: 12000　},
    { category: "의류", price:10000　 },
    { category: "의류", price: 20000　},
    { category: "장난감", price: 9000 },
    { category: "과일", price: 5000　 },
    { category: "의류", price: 10000  },
    { category: "과일", price: 8000　　},
    { category: "의류", price: 7000　　},
    { category: "장난감", price: 5000  },
    { category: "의류", price: 10000　 },
]

for(let i = 0; i<myShopping.length; i++){
    if(myShopping[i].category === "의류"){
        sum += myShopping[i].price
        count++;
    }}

    if(count >= 5){
        rank = "Gold"
    }else if (count === 3 || count === 4){
        rank = "Silver"
    }else if (count === 0 || count === 2){
        rank = "Bronze"
    }
    
console.log(`의류를 구매한 횟수는 총${count}회 금액은 ${57000}이며 등급은 ${rank}입니다.`)
