'use strict'
var gCount = 1;
var gNums = [];
var gTimeBegan = null;
var gTimerInterval = null;
var gSize = 16;

function init() {
    gNums = createNums()
}

function renderBoard() {
    var strHTML = '';
    for (var i = 0; i < Math.sqrt(gSize); i++) {
        strHTML += '<tr>';
        for (var j = 0; j < Math.sqrt(gSize); j++) {
            var num = gNums.pop();
            strHTML += `<td data-num="${num}"
            class="number"
            onclick="cellClicked(this)">
            ${num}</td>`
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML

    renderNextNum()
}

function renderNextNum() {
    var nextNum = document.querySelector('.nextNum');
    nextNum.innerText = gCount;
}

function renderTimer() {
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - gTimeBegan);
    var sec = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();
    document.querySelector(".timer").innerHTML = (sec > 9 ? sec : "0" + sec) + "." +
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
}

function cellClicked(elNum) {
    var numClicked = elNum.getAttribute('data-num');
    if ((gCount + '') === numClicked) {

        if (numClicked === '1') {
            gTimeBegan = new Date();
            gTimerInterval = setInterval(renderTimer, 10);
        }
        else if (numClicked === (gSize + '')) {
            clearInterval(gTimerInterval);
            elNum.classList.add('occupied');
            openModal();
            return;
        }
        elNum.innerText = '';
        elNum.classList.add('clicked');
        gCount++;
        renderNextNum();
    }

}

function chooseLevel(elCheck) {
    if (elCheck.value === '16') gSize = 16;
    else if(elCheck.value === '25') gSize = 25;
    else gSize = 36;
    gNums = [];
    Restart();

}

function Restart(){
    gCount = 1;
    document.querySelector(".timer").innerHTML = '00' + "." + '000';
    clearInterval(gTimerInterval);
    init();
    renderBoard();
}

function createNums() {
    for (var i = 1; i <= gSize; i++) {
        gNums.push(i);
    }
    shuffle(gNums);
    return gNums;
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function openModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    setTimeout(function () {elModal.style.display = 'none';} , 5000);
}

function closeModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'none';
}

function toggleGame() {
    renderBoard();
    Restart();
}