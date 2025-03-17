let submit = document.querySelector('.submit-btn');
let calstart = document.querySelector('.start-date');
let calend = document.querySelector('.end-date');
let weekday = document.querySelectorAll('.weekday');
let leave = document.querySelector('.leave-hours');
let work = document.querySelector('.work-hours');
let main = document.querySelector('.main');
let result = document.querySelector('.result');


let weeklist = []; 
let total = 0;
let currentTotal=0;

weekday.forEach((element) => {
    let clickcount = 0;
    element.addEventListener('click', () => {
        clickcount++;
        if(clickcount===1){
            weeklist.push(element.id);
            element.style.backgroundColor= "hsl(261deg 80% 48%)";
            element.style.boxShadow="0 0 10px  hsl(261deg 80% 48%)"
        }else if(clickcount===2){
            weeklist.push(element.id);
            element.style.backgroundColor= " #30d5c8";
            element.style.boxShadow="0 0 10px  #30d5c8";
        }else if(clickcount===3){
            clickcount=0;
            element.style.backgroundColor= "";
            element.style.boxShadow="";
            weeklist = weeklist.filter(item => item!== element.id);
        }
        console.log(weeklist);
    })
})


submit.addEventListener('click', () => {
    let target = 100 - Number(document.querySelector('.target-percent').value);
    let startdate = new Date(calstart.value);
    let enddate = new Date(calend.value);
    let currentpercent = 100 - Number(document.querySelector('.percent').value);
    
    let weekdaysCount = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };

    let currentDate = new Date(startdate);
    while (currentDate <= enddate) {
        let day = currentDate.getDay(); 
        let dayName = Object.keys(weekdaysCount)[day];
        weekdaysCount[dayName]++;

        currentDate.setDate(currentDate.getDate() + 1); 
    }

    weeklist.forEach((day) => {
        total += weekdaysCount[day];
    });

    total += Number(work.value) - Number(leave.value);
    let takeable = Math.floor(total*(target/100));
    
    weekdaysCount = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };

    currentDate = new Date();
    while (currentDate <= enddate) {
        let day = currentDate.getDay(); 
        let dayName = Object.keys(weekdaysCount)[day];
        weekdaysCount[dayName]++;

        currentDate.setDate(currentDate.getDate() + 1); 
    }

    weeklist.forEach((day) => {
        currentTotal += weekdaysCount[day];
    });

    let taken = Math.floor(currentTotal*((100-Number(document.querySelector('.percent').value))/100));

    let left = takeable - taken;

    if(left>0){
        main.innerHTML=`<div class="result text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text font-extrabold text-4xl" >You can take ${left} more leaves!</div>
        <button onclick="window.location.href='/'" class="back mt-10"> Go Back </button>`;
    }else if(left===0){
        main.innerHTML=`<div class="result text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text font-extrabold text-4xl" >You cannot take any more leaves!</div>
        <button onclick="window.location.href='/'" class="back mt-10"> Go Back </button>`;
    }else{
        main.innerHTML=`<div class="result text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text font-extrabold text-4xl" >You are already short on attendance!</div>
        <button onclick="window.location.href='/'" class="back mt-10"> Go Back </button>`;
    }

});
