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
                setTimeout(()=>{
                    resultSection.style.display="flex";
                },2000);

                
            }
            else{
                timeProvided--;
                time.innerText=timeProvided;
            }
            

        }
        else{
            clearInterval(givenInterval);
            textTypingSection.setAttribute("disabled", "disabled");
            textTypingSection.style.backgroundColor="red";
            textTypingSection.placeholder="Time Out";
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
                                                //    Result-section-2   

const timeTaken = document.querySelector("#time-taken"); 
const wordsLeft = document.querySelector("#words-left");   
const charsLeft = document.querySelector("#chars-left");
const msgForUser =document.querySelector("#msg-user");
const restartBtn =document.querySelector("#restart-btn");

const performanceDisplay=()=>{
    charsLeft.innerText=(textProvided.length)-charCount;
    // let wordsLeftCal;
}


const restartBtnEvent=()=>{
    alert("Restarting......");
}

restartBtn.addEventListener("click",restartBtnEvent);


