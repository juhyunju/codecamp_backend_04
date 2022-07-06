function makeOdd(num){ //5 
	let str = '';
    for( i = 0; i<=num; i++){
        if(i % 2 !==0){
            str +=i
        }
    }
    console.log(str)
}
makeOdd(7)
makeOdd(5)//1357