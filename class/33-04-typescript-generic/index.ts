interface IProfile {
    name: string;
    age: 13;
    school: string;
    hobby?: string;
}
// 타입과 인터페이스의 차이
// 타입은 한가지를 선언한다
// 인터페이스는 한번에 여러개를 선언한다
// 인터페이스는 선언 병합이 가능하다.
//   interface IProfile {
//     apple: string;
//   }

//   const bbb: IProfile = {};

// 1. Partial 타입
type Mytype = Partial<IProfile>;
// Partial 타입은 필수가 아닌 조건으로 만들어준다.

// 2. Required 타입
type Mytype2 = Required<IProfile>;
// Required 타입은 모두가 필수 요소로 만들어준다

// 3. Pick 타입
type Mytype3 = Pick<IProfile, "name" | "age">;
// Pick 타입은 내가 픽한 것만 사용할 수 있도록 해준다

// 4. Omit 타입
type Mytype4 = Omit<IProfile, "school">;
// Omit 타입은 내가 선언한 것을 제외한 모두를 사용하게 해준다

// 5. Record 타입
type ZZZZ = "aaa" | "qqq" | "rrr"; // union 타입
type Mytype5 = Record<ZZZ, IProfile>;
// Record 앞에 선언하는 것이 재료, 뒤에가 속성을 부여해준다.
// 근데 이거 쓸일있나모르겠눼
