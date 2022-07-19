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
}

class SkyMonster extends Monster{
    constructor(qqq){
        super(qqq) // 부모한테 보내줘
    }
    run = () => {
        console.log("날아서 도망가버리기~")
    }
    // attach = () => {
    //     console.log("공격해~!~")
    //     console.log(`내 공격력은 ${this.power} 야 !!!!`)
    // }  부모클래스에 있는 매서드를 다시 자식 클래스에서 정의해주면 자식 매소드가 사용됨 이걸 오버라이딩 이라고함
    
}
class GroundMonster extends Monster{
    constructor(www){
        super(www)
    }
    run = () => {
        console.log("뛰어서 도망가버리기~")
    }
}

// const mymonster = new Monster(10)
// mymonster.attach()

const mymonster1 = new SkyMonster(150)
mymonster1.attach()
mymonster1.run()

const mymonster2 = new GroundMonster(10)
mymonster2.attach()
mymonster2.run()