'use strict';

window.addEventListener('DOMContentLoaded', function () {

  // nav more start
  var NAV_MORE = document.getElementById('navMore');
  var NAV_OPA = document.getElementById('navOpacity');
  var NAV_LIST = document.getElementById('navMoreUl');
  NAV_MORE.addEventListener('click', function (e) {
    // e.target.firstElementChild.classList.toggle('active');
    NAV_LIST.classList.toggle('active');
    NAV_OPA.classList.toggle('active');
  });
  // nav more end

  // news stand
  function newsStandFunc() {
    var newsStandData = [{
      newsStandPage: [{
        title: '석간 문화일보',
        url: 'https:www.google.com1',
        src: './img/api/ns1.png'
      }, {
        title: '한국일보',
        url: 'https:www.google.com2',
        src: './img/api/ns2.png'
      }, {
        title: '데일리안',
        url: 'https:www.google.com3',
        src: './img/api/ns3.png'
      }, {
        title: '메일노동뉴스',
        url: 'https:www.google.com4',
        src: './img/api/ns4.png'
      }, {
        title: '시사위크',
        url: 'https:www.google.com5',
        src: './img/api/ns5.png'
      }, {
        title: '시사채널',
        url: 'https:www.google.com6',
        src: './img/api/ns6.png'
      }, {
        title: '광주방송',
        url: 'https:www.google.com7',
        src: './img/api/ns7.png'
      }, {
        title: '스포츠동아',
        url: 'https:www.google.com8',
        src: './img/api/ns8.png'
      }, {
        title: '스포츠조선',
        url: 'https:www.google.com9',
        src: './img/api/ns9.png'
      }, {
        title: 'TV조선',
        url: 'https:www.google.com10',
        src: './img/api/ns10.png'
      }, {
        title: '비즈한국',
        url: 'https:www.google.com11',
        src: './img/api/ns11.png'
      }, {
        title: '엘아이엘아이컴',
        url: 'https:www.google.com12',
        src: './img/api/ns12.png'
      }, {
        title: '오센',
        url: 'https:www.google.com13',
        src: './img/api/ns13.png'
      }, {
        title: '케이제이디',
        url: 'https:www.google.com14',
        src: './img/api/ns14.png'
      }, {
        title: '스코어데일리',
        url: 'https:www.google.com15',
        src: './img/api/ns15.png'
      }, {
        title: '스포츠뉴스',
        url: 'https:www.google.com16',
        src: './img/api/ns16.png'
      }, {
        title: '농민신문',
        url: 'https:www.google.com17',
        src: './img/api/ns17.png'
      }, {
        title: '사이언스타임즈',
        url: 'https:www.google.com18',
        src: './img/api/ns18.png'
      }, {
        title: '',
        url: 'https:www.google.com1',
        src: './img/api/ns19.png'
      }]
    }, {
      newsStandPage: [{
        title: '석간 문화일보',
        url: 'https:www.google.com1',
        src: './img/api/ns20.png'
      }, {
        title: '한국일보',
        url: 'https:www.google.com2',
        src: './img/api/ns21.png'
      }, {
        title: '데일리안',
        url: 'https:www.google.com3',
        src: './img/api/ns22.png'
      }, {
        title: '메일노동뉴스',
        url: 'https:www.google.com4',
        src: './img/api/ns23.png'
      }, {
        title: '시사위크',
        url: 'https:www.google.com5',
        src: './img/api/ns24.png'
      }, {
        title: '시사채널',
        url: 'https:www.google.com6',
        src: './img/api/ns25.png'
      }, {
        title: '광주방송',
        url: 'https:www.google.com7',
        src: './img/api/ns26.png'
      }, {
        title: '스포츠동아',
        url: 'https:www.google.com8',
        src: './img/api/ns27.png'
      }, {
        title: '스포츠조선',
        url: 'https:www.google.com9',
        src: './img/api/ns28.png'
      }, {
        title: 'TV조선',
        url: 'https:www.google.com10',
        src: './img/api/ns29.png'
      }, {
        title: '비즈한국',
        url: 'https:www.google.com11',
        src: './img/api/ns30.png'
      }, {
        title: '엘아이엘아이컴',
        url: 'https:www.google.com12',
        src: './img/api/ns31.png'
      }, {
        title: '오센',
        url: 'https:www.google.com13',
        src: './img/api/ns32.png'
      }, {
        title: '케이제이디',
        url: 'https:www.google.com14',
        src: './img/api/ns33.png'
      }, {
        title: '스코어데일리',
        url: 'https:www.google.com15',
        src: './img/api/ns34.png'
      }, {
        title: '스포츠뉴스',
        url: 'https:www.google.com16',
        src: './img/api/ns35.png'
      }, {
        title: '농민신문',
        url: 'https:www.google.com17',
        src: './img/api/ns36.png'
      }, {
        title: '사이언스타임즈',
        url: 'https:www.google.com18',
        src: './img/api/ns37.png'
      }, {
        title: '',
        url: 'https:www.google.com1',
        src: './img/api/ns38.png'
      }]
    }, {
      newsStandPage: [{
        title: '석간 문화일보',
        url: 'https:www.google.com1',
        src: './img/api/ns39.png'
      }, {
        title: '한국일보',
        url: 'https:www.google.com2',
        src: './img/api/ns40.png'
      }, {
        title: '데일리안',
        url: 'https:www.google.com3',
        src: './img/api/ns41.png'
      }, {
        title: '메일노동뉴스',
        url: 'https:www.google.com4',
        src: './img/api/ns42.png'
      }, {
        title: '시사위크',
        url: 'https:www.google.com5',
        src: './img/api/ns43.png'
      }, {
        title: '시사채널',
        url: 'https:www.google.com6',
        src: './img/api/ns44.png'
      }, {
        title: '광주방송',
        url: 'https:www.google.com7',
        src: './img/api/ns45.png'
      }, {
        title: '스포츠동아',
        url: 'https:www.google.com8',
        src: './img/api/ns46.png'
      }, {
        title: '스포츠조선',
        url: 'https:www.google.com9',
        src: './img/api/ns47.png'
      }, {
        title: 'TV조선',
        url: 'https:www.google.com10',
        src: './img/api/ns48.png'
      }, {
        title: '비즈한국',
        url: 'https:www.google.com11',
        src: './img/api/ns49.png'
      }, {
        title: '엘아이엘아이컴',
        url: 'https:www.google.com12',
        src: './img/api/ns50.png'
      }, {
        title: '오센',
        url: 'https:www.google.com13',
        src: './img/api/ns51.png'
      }, {
        title: '케이제이디',
        url: 'https:www.google.com14',
        src: './img/api/ns52.png'
      }, {
        title: '스코어데일리',
        url: 'https:www.google.com15',
        src: './img/api/ns53.png'
      }, {
        title: '스포츠뉴스',
        url: 'https:www.google.com16',
        src: './img/api/ns54.png'
      }, {
        title: '농민신문',
        url: 'https:www.google.com17',
        src: './img/api/ns55.png'
      }, {
        title: '사이언스타임즈',
        url: 'https:www.google.com18',
        src: './img/api/ns56.png'
      }, {
        title: '',
        url: 'https:www.google.com1',
        src: './img/api/ns57.png'
      }]
    }];

    var newsArrowBox = document.getElementById('newsArrowBox');
    var newsPrevBt = document.getElementById('newsPrevBt');
    var newsNextBt = document.getElementById('newsNextBt');
    var arrowBt = document.getElementsByClassName('arrow_ab_box');
    var newsStandView = document.getElementById('newsStandView');

    var pageNum = 0;
    newsPrevBt.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      pageNum--;
      if (pageNum < 0) pageNum = newsStandData.length - 1;
      newsPageFunc(pageNum);
    });

    newsNextBt.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      pageNum++;
      if (pageNum > newsStandData.length - 1) pageNum = 0;
      newsPageFunc(pageNum);
    });

    function newsPageFunc(p) {
      newsStandView.innerHTML = '';
      var ul = document.createElement('ul');
      ul.classList.add('api_ul');

      for (var cnt = 0; cnt < 18; cnt++) {
        var newsData = newsStandData[pageNum].newsStandPage[cnt];
        var li = document.createElement('il');
        var a = document.createElement('a');
        var img = document.createElement('img');
        li.classList.add('apu_list');

        a.classList.add('api_item');
        a.href = newsData.url;
        a.appendChild(img);
        img.src = newsData.src;
        img.alt = newsData.title;
        li.appendChild(a);
        ul.appendChild(li);
      }
      newsStandView.appendChild(ul);
    }
    newsPageFunc();
  }
  newsStandFunc();
});