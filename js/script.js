const wordText=document.querySelector(".word"),
hintText=document.querySelector(".hint span"),
inputField=document.querySelector("input");
refreshBtn=document.querySelector(".refresh-word"),
checkBtn=document.querySelector(".check-word"),
timeText=document.querySelector(".time b");

let correctWord,timer;

const initTimer= maxTime =>{
    clearInterval(timer);
    timer=setInterval(()=>{
        if(maxTime>0){
            // maxTime--; //decrement maxTime by -1
            return timeText.innerText=maxTime;
        }
        clearInterval(timer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame(); //calling initGame function, so the game restart.
    },1000)
}

const initGame= ()=>{
    initTimer(30);
    //getting random object from words
    let randomObj=words[Math.floor(Math.random() * words.length)]
    // console.log(randomObj);
    let wordArray=randomObj.word.split("") //spliting each letter of the random word
    for(let i=wordArray.length;i>0;i--){
        let j=Math.floor(Math.random() * (i+1));//getting random number
        // let temp=wordArray[i];
        // wordArray[i]=wordArray[j];
        // wordArray[j]=temp;
        //Or we can do this
        [wordArray[i], wordArray[j]]=[wordArray[j], wordArray[i]]
    }
    wordText.innerHTML=wordArray.join(" ")// passing suffle word as word text
    hintText.innerHTML=randomObj.hint;
    correctWord=randomObj.word.toLocaleLowerCase();
    inputField.value="";
    //setting input maxlength attr value to word length
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
}
initGame();

const checkWord= ()=>{
    let userWord=inputField.value.toLowerCase();
    // console.log(userWord);
    if(!userWord) alert("Please enter a word to check");
    if(userWord !== correctWord)
        return alert(`Oops! ${userWord} is not the correct word`);
    else
        alert(`Congrats! ${userWord.toUpperCase()} is the correct word`);
    initGame();
}

refreshBtn.addEventListener('click',initGame);
checkBtn.addEventListener('click',checkWord);