




// nav more start
const NAV_MORE=document.getElementById('navMore');
const NAV_OPA=document.getElementById('navOpacity');
const NAV_LIST=document.getElementById('navMoreUl');
NAV_MORE.addEventListener('click',function(e){
  // e.target.firstElementChild.classList.toggle('active');
  NAV_LIST.classList.toggle('active');
  NAV_OPA.classList.toggle('active');
})
// nav more end