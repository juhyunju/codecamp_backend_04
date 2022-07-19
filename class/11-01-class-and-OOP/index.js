const aaa = new Date()
console.log(aaa.getFullYear())
console.log(aaa.getMonth()+1)

class Monster {
    power = 10
    constructor(aaa){
        this.power = aaa
        
    }
    attach = () => {
        console.log("공격해~!~")
        console.log(`내 공격력은 ${this.power} 야 !!!!`)
    }
    run = () =>{
        console.log("도망가~!!!")
    }
}

const mymonster = new Monster(10)
mymonster.attach()
mymonster.run()

const mymonster2 = new Monster(50)
mymonster2.attach()
mymonster2.run()