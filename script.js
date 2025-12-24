const questions = [
  {q:"Abnormal uterine bleeding is any bleeding that does not match normal cyclical withdrawal bleeding in frequency, duration, or amount in reproductive-age women.", a:true},
  {q:"Polymenorrhea describes regular menses occurring too frequently (<21 days) with normal amount and duration.", a:true},
  {q:"Oligomenorrhea refers to frequent cycles with cycle length <21 days.", a:false},
  {q:"Menorrhagia is regular cycles with increased duration and amount of bleeding.", a:true},
  {q:"Hypomenorrhea is regular cycles with decreased duration and decreased amount of bleeding.", a:true},
  {q:"Polymenorrhagia refers to frequent cycles that are heavy and prolonged.", a:true},
  {q:"Metrorrhagia refers to irregular bleeding affecting frequency only with normal duration and amount.", a:false},
  {q:"Metromenorrhagia describes irregular, prolonged, and excessive menstruation.", a:true},
  {q:"Intermenstrual bleeding is bleeding that occurs between regular menses.", a:true},
  {q:"Mid-physiological ovulatory spotting may occur at midcycle and is related to ovulation.", a:true},
  {q:"Abnormal uterine bleeding can be classified by cause, patient age, or type of bleeding.", a:true},
  {q:"The three broad causes of AUB are local lesions, general lesions, and dysfunctional uterine bleeding.", a:true},
  {q:"Adenomyosis is a local cause of regular excessive bleeding (menorrhagia).", a:true},
  {q:"An IUCD can be a local cause of menorrhagia.", a:true},
  {q:"Pelvic infection such as endometritis is a local cause of regular excessive bleeding.", a:true},
  {q:"Cervical polyp may produce irregular bleeding (metrorrhagia).", a:true},
  {q:"Carcinoma of the uterus, cervix, or vagina may present with irregular bleeding.", a:true},
  {q:"Endometriosis causes only regular excessive bleeding and not irregular bleeding.", a:false},
  {q:"Complications of pregnancy can cause irregular genital bleeding.", a:true},
  {q:"General causes include hypothyroidism, coagulation disorders, systemic disease, and obesity.", a:true},
  {q:"Steroid hormone withdrawal may cause breakthrough bleeding.", a:true},
  {q:"Psychosomatic disturbances are not possible causes of abnormal uterine bleeding.", a:false},
  {q:"Estrogen withdrawal bleeding can occur in the first week of life due to maternal estrogen.", a:true},
  {q:"In childhood bleeding, foreign body or vulvovaginitis may be causes.", a:true},
  {q:"Dysfunctional uterine bleeding is the commonest cause at puberty.", a:true},
  {q:"During childbearing period, DUB is more common than pregnancy complications.", a:false},
  {q:"In perimenopause, DUB, adenomyosis, and cervical cancer are common causes.", a:true},
  {q:"Postmenopausal bleeding is any genital tract bleeding occurring 12 months after menopause.", a:true},
  {q:"Malignancy of genital tract is a cause of postmenopausal bleeding.", a:true},
  {q:"Estrogen withdrawal due to HRT may cause postmenopausal bleeding.", a:true},
  {q:"Severe genital tract infection is not a cause of postmenopausal bleeding.", a:false},
  {q:"Trauma such as decubitus ulcers or retained pessaries may cause vaginal bleeding.", a:true},
  {q:"Rectal or renal bleeding can never be mistaken for vaginal bleeding.", a:false},
  {q:"Management of AUB depends on clinical picture, investigations, and cause.", a:true},
  {q:"Key D/C abbreviations such as 5/18 for polymenorrhea are universally standardized.", a:false},
  {q:"Uterine fibroids can cause menorrhagia.", a:true},
  {q:"Cervicitis and cervical erosion may cause irregular bleeding.", a:true},
  {q:"Tuberculous endometritis is a uterine inflammatory cause of AUB.", a:true},
  {q:"Asherman’s syndrome is a traumatic uterine cause of abnormal bleeding.", a:true},
  {q:"Coagulation disorders affect only childhood bleeding.", a:false},
  {q:"Obesity is a general cause contributing to abnormal uterine bleeding.", a:true},
  {q:"Pregnancy and its complications must always be excluded in reproductive-age bleeding.", a:true},
  {q:"Carcinoma of the cervix is a common cause of abnormal bleeding in women aged 40–50.", a:true},
  {q:"Diagnosis and treatment are summarized as C/P, investigations, and treating the cause.", a:true}
];

let index=0;
let answered=false;
let results=[];

const qText=document.getElementById("questionText");
const counter=document.getElementById("counter");
const trueBtn=document.getElementById("trueBtn");
const falseBtn=document.getElementById("falseBtn");
const nextBtn=document.getElementById("nextBtn");
const retryBtn=document.getElementById("retryBtn");
const qList=document.getElementById("questionsList");

function toggleMenu(){
  const m=document.getElementById("sideMenu");
  const o=document.getElementById("overlay");
  if(m.style.right==="0px"){m.style.right="-250px";o.style.display="none";}
  else{m.style.right="0";o.style.display="block";}
}

function startQuiz(){
  shuffle();
  index=0;
  results=Array(questions.length).fill(null);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.querySelector(".options").style.display="flex";
  document.getElementById("questionsBtn").style.display="block";
  retryBtn.style.display="none";
  loadQuestion();
}

function loadQuestion(){
  answered=false;
  trueBtn.style.background="#3498db";
  falseBtn.style.background="#3498db";
  nextBtn.style.display="none";
  counter.innerText=`Question ${index+1} / ${questions.length}`;
  qText.innerText=questions[index].q;
}

function answer(val){
  if(answered) return;
  answered=true;
  const correct=questions[index].a;
  results[index]=(val===correct);

  if(val===correct){
    (val?trueBtn:falseBtn).style.background="#27ae60";
  }else{
    (val?trueBtn:falseBtn).style.background="#e74c3c";
    (correct?trueBtn:falseBtn).style.background="#27ae60";
  }

  if(results.every(r=>r!==null)){
    finishQuiz();
  }else{
    nextBtn.style.display="inline-block";
  }
}

function nextQuestion(){
  index = results.findIndex((r,i)=>r===null && i>index);
  if(index===-1){
    index = results.findIndex(r=>r===null);
  }
  loadQuestion();
}

function finishQuiz(){
  qText.innerText=`✅ Finished — Score: ${results.filter(r=>r).length} / ${questions.length}`;
  document.querySelector(".options").style.display="none";
  document.getElementById("questionsBtn").style.display="none";
  nextBtn.style.display="none";
  retryBtn.style.display="inline-block";
}

function retryQuiz(){
  startQuiz();
}

function toggleQuestions(){
  qList.innerHTML="";
  qList.style.display=qList.style.display==="block"?"none":"block";
  results.forEach((r,i)=>{
    const d=document.createElement("div");
    d.className="q-item "+(r===true?"correct":r===false?"wrong":"unanswered");
    d.innerText=i+1;
    d.onclick=()=>{
      index=i;
      loadQuestion();
      qList.style.display="none";
    };
    qList.appendChild(d);
  });
}

function shuffle(){
  questions.sort(()=>Math.random()-0.5);
}