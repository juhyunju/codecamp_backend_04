const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function solution(s, n) {
    let answer = "";
    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ") {
            answer += " ";
        } else {
            let idx = alphabet.indexOf(s[i]);
            const word = idx > 25 ? alphabet.slice(26) : alphabet.slice(0, 26);
            idx = word.indexOf(s[i]) + n;
            if (word[idx] === undefined) {
                idx -= 26;
            }
            answer += word[idx];
        }
    }
    return answer;
}
