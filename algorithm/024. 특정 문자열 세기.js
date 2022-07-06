function countLetter(str) {
	let count = 0;
    for(i = 0; i<=str.length; i++){
        if(str[i] === 'a' || str[i] === 'A'){
            count++
        }
    }
    console.log(count)

}

countLetter("I am from Korea")
countLetter("A day without laughter is a day wasted.")