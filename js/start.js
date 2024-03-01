const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
let check = 0;
const endpoint = 30;
let index = 0;
let compare = [];
const select = [0, 0, 0, 0];

function calResult(){
    select[0] = select[0] / 16;
    select[1] = select[1] / 19;
    select[2] = select[2] / 27;
    select[3] = select[3] / 15;

    var result = select.indexOf(Math.max(...select));
    return result;
}
function begin(){
    var bt = document.querySelector('.btn');

    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.Animation = "fadeOut 1s";
    setTimeout(() => {
        
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.Animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
    bt.disabled = true;
}
function goNext(qIdx){
    if(qIdx+3 > endpoint){
        goResult();
        return;
    }
    for(let i = 1; i <=3; i++){
        var q = document.querySelector(`.qBox${i}`);
        q.innerHTML = qnaList[qIdx+i-1].q;
        // for(let j in qnaList[qIdx+i-1].a){
        //     addAnswer(i, qnaList[qIdx+i-1].a[j].answer, qIdx);
        // }
    }
}

function setResult(){
    let point = calResult(); 
    const resultName = document.querySelector('.resultName');
    const resultWeak = document.querySelector('.resultWeak');
    resultName.innerHTML = infoList[point].name;
    resultWeak.innerHTML = infoList[point].weak;
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image_' + point + '.png';

    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);
    
    const resultDesc = document.querySelector('.resultDesc');
    

    var div_1 = document.createElement('div');
    div_1.textContent = infoList[point].desc1;
    div_1.style.color = 'red';
    var div_2 = document.createElement('div');
    div_2.textContent = infoList[point].desc2;
    div_2.style.color = 'black';
    var div_3 = document.createElement('div');
    div_3.textContent = infoList[point].desc3;
    div_3.style.color = 'red';
    resultDesc.appendChild(div_1);
    resultDesc.appendChild(div_2);
    resultDesc.appendChild(div_3);
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.Animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.Animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)
    }, 450);
    setResult();
}
// function addAnswer(idx, answerText, qIdx) {
//     var a = document.querySelector(`.answerBox${idx}`);
//     var answer = document.createElement('button');
//     answer.classList.add('answerList');
//     answer.classList.add('my-3');
//     answer.classList.add('px-4');
//     answer.classList.add('fadeIn');
//     a.appendChild(answer);
//     answer.innerHTML = answerText;
//     answer.addEventListener("click", function () {
//         check++;
//         var answerList = document.querySelectorAll(`.answerBox${idx} .answerList`);
//         this.classList.add('clicked');
//         for (let j = 0; j < answerList.length; j++) {
//             answerList[j].disabled = true;
//         }
//         if(check === 3){
//             for (let i = 1; i <= 3; i++){
//                 var answerList = document.querySelectorAll(`.answerBox${i} .answerList`);
//                 for (let j = 0; j < answerList.length; j++) {
//                     if(qIdx === 27){
//                         break;
//                     }
//                     answerList[j].style.WebkitAnimation = "fadeOut 1s";
//                     answerList[j].style.Animation = "fadeOut 1s";
//                 }
//             }
//             setTimeout(() =>{
//                 for (let i = 1; i <= 3; i++){
//                     var answerList = document.querySelectorAll(`.answerBox${i} .answerList`);
//                     for (let j = 0; j < answerList.length; j++) {
//                         if(qIdx === 27){
//                             break;
//                         }
//                         answerList[j].style.display = 'none';
//                     }
//                 }
//                 check = 0;
//                 goNext(qIdx+3);
//             }, 950)
//         }
//     }, false);
// }

function answerClicked(e){
    var answerElement = e.parentNode;
    var answerArray = Array.from(answerElement.classList);
    var answerClass = answerArray[0];
    var num = parseInt(answerClass.slice(-1));
    var o_answer = document.querySelector(`.${answerClass} .o`);
    var x_answer = document.querySelector(`.${answerClass} .x`);
    var status = document.querySelector('.statusBar');
    // 동일한 질문 비교 구문, 다른 선택지를 선택할 수 있게 함.
    if(!compare.includes(answerClass)){
        check++;
        compare.push(answerClass);
    }
    status.style.width = (100/endpoint) * (index+check) + '%';
    if(e.classList.contains('o')){
        o_answer.classList.add('clicked');
        if(x_answer.classList.contains('clicked')){
            x_answer.classList.remove('clicked');
        }
        var target = qnaList[num+index-1].a[0].type;
        for(let i = 0; i < target.length; i++){
            select[target[i]] += 1;
        }
        o_answer.disabled = true;
        x_answer.disabled = false;
    }
    if(e.classList.contains('x')){
        x_answer.classList.add('clicked');
        if(o_answer.classList.contains('clicked')){
            o_answer.classList.remove('clicked');
        }
        var target = qnaList[num+index-1].a[1].type;
        for(let i = 0; i < target.length; i++){
            select[target[i]] += 1;
        }
        o_answer.disabled = false;
        x_answer.disabled = true;
    }
    if(check === 3){
        index += 3;
        check = 0;
        compare = [];
        if(index >= 30){
            goNext(index);
            return;
        }
        var answerList = document.querySelectorAll('.answerList');
        var qBox = document.querySelectorAll('.qBox');
        for (let j = 0; j < answerList.length; j++) {
            answerList[j].style.WebkitAnimation = "fadeOut 1s";
            answerList[j].style.Animation = "fadeOut 1s";
            answerList[j].disabled = true;
        }
        for (let j = 0; j < qBox.length; j++){
            qBox[j].style.WebkitAnimation = "fadeOut 1s";
            qBox[j].style.Animation = "fadeOut 1s";
        }   
        setTimeout(() => {
            goNext(index);
            for (let j = 0; j < answerList.length; j++) {
                answerList[j].style.WebkitAnimation = "fadeIn 1s";
                answerList[j].style.Animation = "fadeIn 1s";
                answerList[j].disabled = false;
            }
            for (let j = 0; j < qBox.length; j++){
                qBox[j].style.WebkitAnimation = "fadeIn 1s";
                qBox[j].style.Animation = "fadeIn 1s";
            }
            for (let j = 0; j < answerList.length; j++) {
                if(answerList[j].classList.contains('clicked')){
                    answerList[j].classList.remove('clicked');
                }
            }
        }, 950);
    }
}