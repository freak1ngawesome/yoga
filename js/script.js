window.addEventListener('DOMContentLoaded',function(){

  'use strict';

  let infoHeader = document.querySelector('.info-header'),
  infoHeaderTab = document.querySelectorAll('.info-header-tab'),
  infoTabcontent = document.querySelectorAll('.info-tabcontent');

  function showTab (a) {
    if (infoTabcontent[a].classList.contains('hide')){
      infoTabcontent[a].classList.remove('hide');
      infoTabcontent[a].classList.add('show');
    }
  }

  function hideTab (b) {
    for ( let i = b; i < infoTabcontent.length; i++){
      infoTabcontent[i].classList.remove('show');
      infoTabcontent[i].classList.add('hide');
    }
  }

  hideTab(1);

  infoHeader.addEventListener('click',function(event){
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')){
      for (let i = 0; i < infoHeaderTab.length; i++){
        if (target == infoHeaderTab[i]){
          hideTab(0);
          showTab(i);
          break;
        }
      }
    }
  });


  // Timer

  let dataDeadline = '2020-09-01';

  function getTimeRemaining (endtime){
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t/1000) % 60),
    minutes = Math.floor((t / 1000 / 60) % 60),
    hours = Math.floor((t / 1000 / 60 / 60));
    return {
      'seconds' : seconds,
      'minutes' : minutes,
      'hours' : hours,
      'total' : t
    }
  }

  function setClock (id, endtime){
    let timer = document.getElementById(id),
    hours = timer.querySelector('.hours'),
    minutes = timer.querySelector('.minutes'),
    seconds = timer.querySelector('.seconds'),
    timeIntenval = setInterval(updateClock, 1000);

    function updateClock(){
      
      let t = getTimeRemaining(endtime);
      if (t.hours < 10){
        hours.textContent = '0' + t.hours;
      } else { hours.textContent = t.hours;}
      if (t.minutes < 10){
        hours.textContent = '0' + t.minutes;
      } else { minutes.textContent = t.minutes;}
      if (t.seconds < 10){
        seconds.textContent = '0' + t.seconds;
      } else { seconds.textContent = t.seconds;}
      
      if (t.total <= 0){
        clearInterval(timeIntenval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  }


  setClock('timer', dataDeadline);


  // Modal

  let modalButton = document.querySelector('.more'),
  overlay = document.querySelector('.overlay'),
  modalClose = document.querySelector('.popup-close');

  modalButton.addEventListener('click', function(){
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });


  modalClose.addEventListener('click', function(){
    overlay.style.display = 'none';
    modalButton.classList.remove('more-splash');
    document.body.style.overflow = '';
    let form = overlay.querySelector('form');
    if (form.lastChild.classList.contains('status')){
      form.lastChild.textContent = '';
    }
  });
  let tabInfo = document.querySelector('.info');

  tabInfo.addEventListener('click',function(event){
    let target = event.target;
    if (target && target.classList.contains('description-btn')){
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  });


  // class Option{
  //   constructor(height, width, bg, fontSize, textAlign) {
  //     this.height = height;
  //     this.width = width;
  //     this.bg = bg;
  //     this.fontSize = fontSize;
  //     this.textAlign = textAlign;
  //   }
  //   createDiv() {
  //     let div = document.createElement('div');
  //     document.body.appendChild(div);
  //     let param = `height:${this.height}px;width:${this.width}px;background-color:${this.bg};font-size:${this.fontSize}px;text-align:${this.textAlign}`;
  //     div.style.cssText = param;
  //   }

  // }

  // let rectangle = new Option(200, 200, 'red', 20, 'center');
  // rectangle.createDiv();


  // Form

  // let message = {
  //   loading: 'Загрузка...',
  //   success: 'Спасибо, скоро мы с вами свяжемся!',
  //   failure: 'Что-то пошло не так...'
  // };

  // let mainForm = document.querySelector('.main-form'),
  // input = mainForm.getElementsByTagName('input'),
  // statusMessage = document.createElement('div');
  // statusMessage.classList.add('status');
  
  // mainForm.addEventListener('submit', function(event){
  //   event.preventDefault();
  //   mainForm.appendChild(statusMessage);

  //   let request = new XMLHttpRequest();
  //   request.open('POST','server.php');
  //   request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  //   let formData = new FormData(mainForm);
  //   request.send(formData); 
  // });


  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
};

  function sendForm(elem){
  let form = document.querySelector('.' + elem),
  input = form.getElementsByTagName('input'),
  statusMessage = document.createElement('div');
  statusMessage.classList.add('status');
  

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.appendChild(statusMessage);
    let formData = new FormData(form);
    function promForm(data) {
      return new Promise((resolve, reject)=>{
        
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  
        
  
        let obj = {};
        data.forEach(function(value, key) {
          obj[key] = value;
        });
        let json = JSON.stringify(obj);
  
        
  
        request.addEventListener('readystatechange', function() {
          if (request.readyState < 4) {
            resolve();
          } else if(request.readyState === 4 && request.status == 200) {
            resolve();
          } else {
            reject();
          }
        });
        request.send(json);
      });
    };
    
    
    promForm(formData)
      .then(()=>statusMessage.textContent = message.loading )
      .then(()=>{
      console.log('123');
      statusMessage.textContent = message.success;
    }).catch(()=>{
      statusMessage.textContent = message.failure;
    });
    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    };
  });
}
  sendForm('main-form_feedback');
  sendForm('main-form_popup');


  // Slider

  let slideIndex = 1,
  slides = document.querySelectorAll('.slider-item'),
  prevArrow = document.querySelector('.prev'),
  nextArrow = document.querySelector('.next'),
  dotsArea = document.querySelector('.slider-dots'),
  dots = document.querySelectorAll('.dot');

  function showSlide () {
    if (slideIndex >= 5){
      slideIndex = 1;
    };
    if (slideIndex <= 0){
      slideIndex = 4;
    };
    slides.forEach((item)=>{
      item.style.display = 'none';
    });
    slides[slideIndex - 1].style.display = 'block';
    dots.forEach((item)=>{
      item.classList.remove('dot-active');
    });
    dots[slideIndex - 1].classList.add('dot-active');
  }
  showSlide();
  prevArrow.addEventListener('click',()=>{
    slideIndex--;
    showSlide();
  });
  nextArrow.addEventListener('click',()=>{
    slideIndex++;
    showSlide();
  });
  dotsArea.addEventListener('click',(e)=>{
    // if (e.target.classList.contains('dot') && !e.target.classList.contains('dot-active')){

    // }
    if (e.target && e.target.classList.contains('dot')){
      dots.forEach((item,i)=>{
        if (e.target == item){
          slideIndex = i + 1;
          showSlide();
        }
      });
    }
  });

  // Calc
  let personsValue = document.querySelectorAll('.counter-block-input')[0],
  daysValue = document.querySelectorAll('.counter-block-input')[1],
  place = document.getElementById('select'),
  totalValue = document.getElementById('total'),
  persons = 0,
  days = 0,
  total = 0;
  totalValue.textContent = total;

  personsValue.addEventListener('change',function(){
    persons = this.value;
    if (daysValue.value == ''){
      return;
    }
    total = (persons * days)*4000;
    totalValue.textContent = total;
  });
  daysValue.addEventListener('change',function(){
    days = this.value;
    if (personsValue.value == ''){
      return;
    }

    total = (persons * days)*4000;
    totalValue.textContent = total;
  });

  place.addEventListener('change', function(){
    let a = total;
    totalValue.textContent = a * this.options[this.selectedIndex].value;
  });

});