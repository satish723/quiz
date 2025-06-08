let quizcategory="programming";
let firstpage=document.querySelector(".container");
let secondpage=document.querySelector(".quiz-container");
let thirdpage=document.querySelector(".result-container");
let answeroptions=document.querySelector(".answer-options");
let nextbtn=document.querySelector(".next-question-btn");
let retrybtn=document.querySelector(".try-again-btn");
let qstatus=document.querySelector(".question-status");
let times=document.querySelector(".time");
let timeb=document.querySelector(".quiz-timer");
let resmsg=document.querySelector(".result-message");
let correct=0;
let currentquestion=null;
let count=1;
const timelimit=15;
let time=timelimit;
let timer=null;
let maxquestion=5;
const his=[];
const showConfetti=()=>
    {
        const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

        function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio),
            })
        );
        }

        fire(0.25, {
        spread: 26,
        startVelocity: 55,
        });

        fire(0.2, {
        spread: 60,
        });

        fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        });

        fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        });

        fire(0.1, {
        spread: 120,
        startVelocity: 45,
        });
    };
const starttimer = () =>{
    timer=setInterval(() =>
    { 
      time--;
      times.innerHTML=`${time}s`;
      if(time<=0)
      { 
        timeb.style.background="red";
        clearInterval(timer);
        timer=null;
        rendorquestion();
        return;
      }
    },1000);
}
const firstpages = () => {
    if (timer) clearInterval(timer);
    timer = null;
    time = timelimit;
    count = 1;
    correct = 0;
    his.length = 0;
    timeb.style.background = "#32313c";
    times.innerHTML = `${time}s`;
    secondpage.style.display = "none";
    thirdpage.style.display = "none";
    firstpage.style.display = "block";
};

const resultpage = () =>
{   
    secondpage.style.display="none";
    thirdpage.style.display="block";
    firstpage.style.display="none";
    showConfetti();
    resmsg.innerHTML=`You answered <b>${correct}</b> out of <b>${maxquestion}</b> questions correctly. Great Effort!`;
};
const secondpages = () => {
    quizcategory = document.querySelector(".category-option.active").textContent;
    maxquestion = parseInt(document.querySelector(".question-option.active").textContent);
    
    count = 1;
    correct = 0;
    his.length = 0;
    time = timelimit;
    if (timer) clearInterval(timer);
    
    secondpage.style.display = "block";
    thirdpage.style.display = "none";
    firstpage.style.display = "none";
    rendorquestion();
};


const getrandomquestion = ()=>{
    const categoryquestions =questions.find(cat => cat.category.toLowerCase()===quizcategory.toLowerCase()).questions || [];
    const avail= categoryquestions.filter((_,index) => !his.includes(index));
    const randomquestion= avail[Math.floor(Math.random()* avail.length)];
    his.push(categoryquestions.indexOf(randomquestion));
    return randomquestion;
};
const highlightans = () => {
    const op = answeroptions.querySelectorAll(".answer-option")[currentquestion.correctAnswer];
    op.classList.add("correct");
    const icon = `<span class="material-symbols-rounded">check_circle</span>`;
    op.insertAdjacentHTML("beforeend", icon);
    time=15;
};

const handlecase = (option,index) => 
{
  const iscorrect =currentquestion.correctAnswer === index;
  option.classList.add(iscorrect?'correct':'incorrect');
  const icon =`<span class="material-symbols-rounded">${iscorrect ? 'check_circle': 'cancel'}</span>`;
  option.insertAdjacentHTML("beforeend", icon);
  answeroptions.querySelectorAll(".answer-option").forEach(btn => btn.style.pointerEvents = "none");
  !iscorrect? highlightans() :"";
  if (iscorrect)
    correct++;
  nextbtn.style.visibility="visible";
  console.log(correct);
  clearInterval(timer);
  time=15;
};
const rendorquestion = ()=>
{   if(count>maxquestion)
    {
        console.log("quiz over");
        resultpage();
    }
    timeb.style.background="#32313c";
    time=15;
    times.innerHTML=`${time}s`;
    currentquestion=getrandomquestion();
    if(!currentquestion)
        return 
    document.querySelector(".question").textContent= currentquestion.question;
    answeroptions.innerHTML="";
    nextbtn.style.visibility="hidden";
    console.log(currentquestion);
    qstatus.innerHTML="";
    qstatus.innerHTML=`<b>${count}</b> of <b>${maxquestion}</b> questions`;
    count+=1;
    currentquestion.options.forEach((option,index) => {
        const li=document.createElement("li");
        li.classList.add("answer-option");
        li.textContent= option;
        answeroptions.appendChild(li);
        li.addEventListener("click",() =>handlecase(li,index));
    });
    starttimer();
};
nextbtn.addEventListener("click",rendorquestion);
retrybtn.addEventListener("click",() => firstpages());
document.querySelector(".start-quiz-button").addEventListener("click",secondpages);
document.querySelectorAll(".category-option, .question-option").forEach(option =>{
    option.addEventListener("click",()=>
    {
        option.parentNode.querySelector(".active").classList.remove("active");
        option.classList.add("active");
    });
});
