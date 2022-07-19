// // private, public, protected


// // 1. public
// class Aaa1 {
//     constructor(public mypower){
//         // this.mypower = mypower;  // public ,private,protected readonly 등 1개만 포함 되면 자동으로 셋팅됨!!!  

//     }
//     ggg(){
//         console.log(this.mypower) // 안에서 접근 가능
//         this.mypower = 10 // 안에서 수정 가능

//     }
// }

// class Aaa2 extends Aaa1{
//     ggg(){
//         console.log(this.mypower) // 자식이 접근가능
//         this.mypower = 10 // 자식이 수정가능

//     }
// }

// const aaaa = new Aaa2(50)
// console.log(aaaa.mypower) // 클래스 밖에서 접근 가능
// aaaa.mypower = 10; // 밖에서 수정 가능





// 2. protected
// class Aaa1 {
//     constructor(protected mypower){
//         // this.mypower = mypower;  // public ,private, protected readonly 등 1개만 포함 되면 자동으로 셋팅됨!!!  

//     }
//     ggg(){
//         console.log(this.mypower) // 안에서 접근 가능
//         this.mypower = 10 // 안에서 수정 가능

//     }
// }

// class Aaa2 extends Aaa1{
//     ggg(){
//         console.log(this.mypower) // 자식이 접근가능
//         this.mypower = 10 // 자식이 수정가능

//     }
// }

// const aaaa = new Aaa2(50)
// console.log(aaaa.mypower) // 클래스 밖에서 접근 못함
// aaaa.mypower = 10; // 밖에서 수정 못함




// 3. private
// class Aaa1 {
//     constructor(private mypower){
//         // this.mypower = mypower;  // public ,private, protected readonly 등 1개만 포함 되면 자동으로 셋팅됨!!!  

//     }
//     ggg(){
//         console.log(this.mypower) // 안에서 접근 가능
//         this.mypower = 10 // 안에서 수정 가능

//     }
// }

// class Aaa2 extends Aaa1{
//     ggg(){
//         console.log(this.mypower) // 자식이 접근불가
//         this.mypower = 10 // 자식이 수정불가

//     }
// }

// const aaaa = new Aaa2(50)
// console.log(aaaa.mypower) // 클래스 밖에서 접근 못함
// aaaa.mypower = 10; // 밖에서 수정 못함



//4. readonly
class Aaa1 {
    constructor(readonly mypower){
        // this.mypower = mypower;  // public ,private, protected readonly 등 1개만 포함 되면 자동으로 셋팅됨!!!  

    }
    ggg(){
        console.log(this.mypower) // 안에서 접근만됨
        this.mypower = 10 // 나도 수정 불가

    }
}

class Aaa2 extends Aaa1{
    ggg(){
        console.log(this.mypower) // 자식이 접근만됨
        this.mypower = 10 // 자식이 수정불가

    }
}

const aaaa = new Aaa2(50)
console.log(aaaa.mypower) // 클래스 밖에서 접근만됨
aaaa.mypower = 10; // 밖에서 수정 못함

