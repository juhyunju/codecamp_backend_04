export function getToday() {

    const aaa = new Date()
    const yyyy = aaa.getFullYear()
    const mm = String(aaa.getMonth() + 1).padStart(2,'0')
    const dd = String(aaa.getDate()).padStart(2,'0')
    const hh = aaa.getHours()
    const minutes = aaa.getMinutes()
    const seconds = aaa.getSeconds()
    const today = `오늘은 ${yyyy}년 ${mm}월 ${dd}일 ${hh}:${minutes}:${seconds} 입니다.`

    return today
}

console.log(getToday())