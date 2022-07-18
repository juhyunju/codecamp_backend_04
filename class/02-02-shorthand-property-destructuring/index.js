// 1.shorthand-property
function qqq(aaa){
    console.log(aaa.name)
    console.log(aaa.age)
    console.log(aaa.school)
  }
  
  qqq({ name, age, school })

  const name = "철수"
  const age = 12
  const school = "다람쥐 초등학교"
  const profile = {   //{name,age,school}
    name : name,
    age: age,
    school:school
  }


//2. destructuring
  function qqq({ apple, banana }){
    // const { apple, banana } = basket

}

const basket = {
    apple: 3,
    banana: 10
}
qqq(basket)
