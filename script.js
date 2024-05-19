                       // Welcome screen - Provide Necessary Info 

const readyBtn=document.querySelector("#ready-btn");
const welcomeScreen=document.querySelector(".welcome-section");

const handleReadyBtnClick=()=>{
    // alert("Typing Speed Test Started");
    welcomeScreen.classList.add("welcome-section-close");
    welcomeScreen.classList.remove("welcome-section"); 
}

readyBtn.addEventListener("click",handleReadyBtnClick);

                                            // Main screen - Typing test interface
// accessing elements on main screen 

let wpm=document.querySelector("#wpm");
let cpm=document.querySelector("#cpm");
let errors=document.querySelector("#errors");
let time=document.querySelector("#time");
let accuracy=document.querySelector("#accuracy");  

let textToTypeContainer=document.querySelector("#text-to-type-container");
let textTypingSection=document.querySelector("#text-of-typing-section");   

let startBtn=document.querySelector("#start-btn");
let stopBtn=document.querySelector("#stop-btn");

let resultSection =document.querySelector("#result-section");

// text for typing 
const textForTyping =[
   [ "The sun is shining brightly today.",
    "I love to eat pizza with extra cheese.",
    "My cat likes to sleep on the soft rug.",
    "The red car drove slowly down the road.",
    "We went for a walk in the park yesterday." 
   ],

    [
        "The quick brown fox jumps over the lazy dog.",
        "Pack my box with five dozen liquor jugs.",
        "How razorback-jumping frogs can level six piqued gymnasts!",
        "Jinxed wizards pluck ivy from the big quilt.",
        "The five boxing wizards jump quickly."
    ],

    [
        "Scientists have discovered a new species of deep-sea fish.",
        "The intricacies of quantum mechanics baffle even the brightest minds.",
        "Philosophers debate the nature of existence and the meaning of life.",
        "Literature offers a window into the human condition and our collective experiences.",
        "Artists express their emotions and perspectives through their creative works."
    ]

]
// Declaration of variable used 
var stopBtnClicked=0;
var textProvided = "";
var charProvided = "";

var typedText ="";
var typedChar="";

var errorCount=0;
var charCount=0;
var wordCount=1;
var timeTakenForTyping=0;

// provide text as typing test start
const textProvider=(first,second)=>{
    textProvided = textToTypeContainer.innerText=textForTyping[first][second];
    
}

// provide time as typing test start
const timeProvider=()=>{
    let timeProvided=60;
    time.innerText=timeProvided;

    const timing=()=>{
        if(timeProvided!==0){
            if(stopBtnClicked>=1){
                
                clearInterval(givenInterval);
                timeTakenForTyping=60-timeProvided;
                setTimeout(()=>{
                    resultSection.style.display="flex";
                },2000);

                
            }
            else{
                timeProvided--;
                time.innerText=timeProvided;
                timeTakenForTyping=60-timeProvided;
            }
            

        }
        else{
            
            clearInterval(givenInterval);
            textTypingSection.setAttribute("disabled", "disabled");
            textTypingSection.style.backgroundColor="red";
            textTypingSection.placeholder="Time Out";
            timeTakenForTyping=60-timeProvided;
            setTimeout(()=>{
                resultSection.style.display="flex";
            },2000);
        }
       
    }
   var givenInterval= setInterval(timing,1000);
      
}
// This event listener prevent user to press backspace and type more chars then provided
textTypingSection.addEventListener("keydown", (e) => {
    const { key } = e;
    const isBackspace = key === "Backspace";
    const isMaxLengthReached = textTypingSection.value.length >= textProvided.length;
    
    if (isBackspace || isMaxLengthReached) {
        e.preventDefault();
    }
});

// Checking and matching typed chars and words.
const checkTyping=()=>{                                                    // checking current input and comparing from provided
    textTypingSection.addEventListener("input",()=>{
       typedText=textTypingSection.value;
       let currentIndex=typedText.length;
       typedChar=typedText[currentIndex-1];
       charProvided= textProvided[currentIndex-1]

       if(typedChar===charProvided){

           if(typedChar===" "){
               wordCount++;
           }
        charCount++;
        textTypingSection.classList.remove("incorrect-char");
        textTypingSection.classList.add("correct-char");
       }
       else{

        // charCount++; // In case of wrong char entered no increment in char count bcz its creates final performance.
        errorCount++;
        textTypingSection.classList.remove("correct-char");
        textTypingSection.classList.add("incorrect-char");
       }

       statistics();
       
    })

}

// Creating statistics and displaying
const statistics =()=>{
    errors.innerText=errorCount;
   
    let accurateTypedChar= charCount-errorCount;
    let accuracyCal=(accurateTypedChar*100)/charCount;
    accuracy.innerText=accuracyCal.toFixed(0);
    cpm.innerText=charCount;
    wpm.innerText=wordCount;

    performanceDisplay(charCount,wordCount);
}

// generating random number
const getRandomInt=(min,max)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
  return  Math.floor(Math.random()*(max-min+1))+min;
}

// Handle typing test start event
const startTypingTest=()=>{

    let firstNo=getRandomInt(0,textForTyping.length-1);
    let secondNo=getRandomInt(0,textForTyping[firstNo].length-1);
    textProvider(firstNo,secondNo);
    timeProvider();
    checkTyping();
    
}


const handleStopBtnClick=()=>{ 
    stopBtnClicked++;
    textTypingSection.setAttribute("disabled", "disabled");
    textTypingSection.style.backgroundColor="red";
    textTypingSection.placeholder="Stopped";
    if(textTypingSection.value==""){

        performanceDisplay(charCount,wordCount);
    }

}

                                                      // Control Section 
startBtn.addEventListener("click",()=>{
    textTypingSection.removeAttribute("disabled");
    textTypingSection.placeholder ="Star typing here ....";
    startTypingTest();
    startBtn.classList.add("remove-start-btn");
    stopBtn.style.display="inline";
    performanceDisplay();
})

stopBtn.addEventListener("click",handleStopBtnClick);


                                                   // Result Section
                                                   // Result Section-1
const contactMeBtn =document.querySelector("#contact-me-btn");                                                   
const stars = document.querySelectorAll(".star");
const ratingMsg = document.querySelector("#rating-msg");

const messages = [
    "Could be better ⭐😞",
    "Okay ⭐⭐😐",
    "Good ⭐⭐⭐🙂",
    "Great ⭐⭐⭐⭐😃",
    "Amazing ⭐⭐⭐⭐⭐😍"
];

// Handle Contact Me btn clicked event
contactMeBtn.addEventListener("click",()=>{
    window.open("https://github.com/dev-kant-kumar", "_blank");
})

stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
        highlightStars(index);
        ratingMsg.innerText = messages[index];
    });

    star.addEventListener("click", () => {
        setRating(index);
    });
});

function highlightStars(index) {
    stars.forEach((star, i) => {
        if (i <= index) {
            star.classList.add("star-hover");
        } else {
            star.classList.remove("star-hover");
        }
    });
}

function setRating(index) {
    stars.forEach((star, i) => {
        if (i <= index) {
            star.classList.add("star-hover");
        } else {
            star.classList.remove("star-hover");
        }
    });
    ratingMsg.innerText = messages[index];
    
}

const timeTaken = document.querySelector("#time-taken"); 
const wordsLeft = document.querySelector("#words-left");   
const charsLeft = document.querySelector("#chars-left");
const msgForUser =document.querySelector("#msg-user");
const restartBtn =document.querySelector("#restart-btn");

const performanceDisplay=(CharCountResult,wordCountResult)=>{
    
    const wordsInTextProvided=textProvided.split(" ").length;
    const charsInTextProvided = textProvided.length;

    if(CharCountResult==1){
        timeTaken.innerText="60s";
        charsLeft.innerText=charsInTextProvided;
        wordsLeft.innerText=wordsInTextProvided;
    }
    else{

       timeTaken.innerText=timeTakenForTyping;
       charsLeft.innerText=charsInTextProvided - CharCountResult;
       wordsLeft.innerText=wordsInTextProvided - wordCountResult ;
    
    }
    performanceMsg(CharCountResult);

    
    
}

const performanceMsg=(charTyped)=>{
    if(charTyped==0){
        msgForUser.innerText="You have not typed anything!";
    }
    else if(charTyped==textProvided.length){
        msgForUser.innerText="Incredible job! Your typing speed and accuracy are outstanding!";
    }
    else if(charTyped>=textProvided.length-5){
        msgForUser.innerText="Your typing speed is good, keep practicing and you'll see great progress!";
    }
    else if(charTyped>textProvided.length || charTyped <0){
        msgForUser.innerText="You exceed on chars.";
    }
    else{
        msgForUser.innerText="Practice more. You'll get better over time.";
    }
}


const handleRestartBtnClick=()=>{
    alert("Restarting......");
}

restartBtn.addEventListener("click",handleRestartBtnClick);


