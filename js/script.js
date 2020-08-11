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
});