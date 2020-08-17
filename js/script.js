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

  let dataDeadline = '2020-08-15';

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
  })

});