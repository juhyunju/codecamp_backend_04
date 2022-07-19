// 타입추론
let aaa = "안녕하세요";
aaa = 3

// 타입명시
let bbb:string = "반갑습니다.";
bbb = 10;


// 타입명시가 필요한 상황
let ccc:number | string  = 1000;
ccc ="1000원"

// 숫자타입
let ddd:number = 10;
ddd = "철수!박"

// 블린타입
let eee:boolean = true;
eee = false;
eee = "false"; //안돼~ true로 작동 ~ 


// 배열타입
let fff:number[]= [1, 2, 3, 4, 5,"안녕"]; // 문자는 들어갈 수 가 없어!
let ggg:string[] = ['철','훈','짱',1]; // 숫자는 들어갈 수 가 없어!
let hhh = [1,2,3,4,'철','훈'];  // string | number [] 타입으로 추론됨

// 객체타입
interface IProfile {
    name:string
    age:string|number
    school: string
    hobby?: string // 있을 수도 있고 없을 수도 있다.
} 
const profile:IProfile = {
    name: "짱구",
    age : 90,
    school: "떡잎유치원"
};

profile.age = "8살"
profile.hobby = "잠자기"

// 함수타입

const add = (money1:number,money2:number,unit:string): string =>{ // money1은 디폴트로 any가 설정 되어있음. 안정성을 위해서는 앞에 타입을 명시 해주는것이 좋다

    return money1 + money2 + unit;
};

const result = add(2000,3000,"원")
