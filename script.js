                                                          // Welcome screen

const readyBtn=document.querySelector("#ready-btn");
const welcomeScreen=document.querySelector(".welcome-section");

const readyBtnEvent=()=>{
    // alert("Typing Speed Test Started");
    welcomeScreen.classList.add("welcome-section-close");
    welcomeScreen.classList.remove("welcome-section"); 
}

readyBtn.addEventListener("click",readyBtnEvent);

                                                         // Main screen 
// accessing elements 
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
var stopBtnClicked=0;
var textProvided = "";
var charProvided = "";

var typedText ="";
var typedChar="";

var errorCount=0;
var charCount=0;
var wordCount=0;
var timeTakenForTyping=0;


const textProvider=(first,second)=>{
    textProvided = textToTypeContainer.innerText=textForTyping[first][second];
    
}


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

const check=()=>{                                                    // checking current input and comparing from provided
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
       }
       else{

        charCount++;
        errorCount++;
       }

       statistics();
       
    })

}

const statistics =()=>{
    errors.innerText=errorCount;
   
    let accurateTypedChar= charCount-errorCount;
    let accuracyCal=(accurateTypedChar*100)/charCount;
    accuracy.innerText=accuracyCal.toFixed(0);
    cpm.innerText=charCount;
    wpm.innerText=wordCount;
    
    performanceDisplay(charCount,wordCount);
}



const startTypingTest=()=>{
    textProvider(2,4);
    timeProvider();
    check();
    
}

const stopBtnEvent=()=>{
    stopBtnClicked++;
    textTypingSection.setAttribute("disabled", "disabled");
    textTypingSection.style.backgroundColor="red";
    textTypingSection.placeholder="Stopped";

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

stopBtn.addEventListener("click",stopBtnEvent);


                                                   // Result Section
                                                   // Result Section-1
const star1=document.querySelector("#star-1");  
const star2=document.querySelector("#star-2");  
const star3=document.querySelector("#star-3");
const star4=document.querySelector("#star-4");  
const star5=document.querySelector("#star-5");
const ratingMsg=document.querySelector("#rating-msg"); 

star1.addEventListener("click",()=>{
    ratingMsg.innerText="Could be better ⭐😞";

})
star2.addEventListener("click",()=>{
    ratingMsg.innerText="Okay ⭐⭐😐";

})
star3.addEventListener("click",()=>{
    ratingMsg.innerText="Good ⭐⭐⭐🙂";

})
star4.addEventListener("click",()=>{
    ratingMsg.innerText="Great ⭐⭐⭐⭐😃";

})                                          //    Result-section-2   
star5.addEventListener("click",()=>{
    ratingMsg.innerText="⭐⭐⭐⭐⭐😍";

})
const timeTaken = document.querySelector("#time-taken"); 
const wordsLeft = document.querySelector("#words-left");   
const charsLeft = document.querySelector("#chars-left");
const msgForUser =document.querySelector("#msg-user");
const restartBtn =document.querySelector("#restart-btn");

const performanceDisplay=(CharCountResult,wordCountResult)=>{
    
    var wordsInTextProvided=0;

    for(let i=0;i<textProvided.length;i++){
        if(textProvided[i]===" "){
            wordsInTextProvided++;
        }
    }
    // console.log(wordsInTextProvided);
  console.log(CharCountResult);
    if(CharCountResult==0){
        timeTaken.innerText="60s";
        charsLeft.innerText=textProvided.length;
        wordsLeft.innerText=wordsInTextProvided;
        performanceMsg(CharCountResult);
    }
    else{

    timeTaken.innerText=timeTakenForTyping;
    // console.log(timeTakenForTyping);

    charsLeft.innerText=(textProvided.length)-CharCountResult;

    var wordCountCal=(wordsInTextProvided - wordCountResult) ;
    wordsLeft.innerText= wordCountCal;
   
    performanceMsg(CharCountResult);

    }

    
    
}

const performanceMsg=(charTyped)=>{
    if(charTyped==textProvided.length){
        msgForUser.innerText="Incredible job! Your typing speed and accuracy are outstanding!";
    }
    else if(charTyped==((textProvided.length)-5)){
        msgForUser.innerText="Your typing speed is good, keep practicing and you'll see great progress!";

    }
    else if(charTyped==0){
        msgForUser.innerText="You have not typed anything!";
    }
    else if(charTyped>textProvided.length || charTyped <0){
        msgForUser.innerText="You exceed on chars.";

    }
    else{
        msgForUser.innerText="Practice more. You'll get better over time.";

    }
}


const restartBtnEvent=()=>{
    alert("Restarting......");
}

restartBtn.addEventListener("click",restartBtnEvent);


