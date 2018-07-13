document.addEventListener('DOMContentLoaded', function () {
  function shoppingBoxFunc() {
    const productTab = document.getElementById('productTab');
    const mallTab = document.getElementById('mallTab');
    const menTab = document.getElementById('menTab');
    const productContent = document.getElementById('productShopContent');
    const productBanner = document.getElementById('productShopBanner');
    const MallContent = document.getElementById('shopMallContent');
    const MallBanner = document.getElementById('shopMallBanner');
    const MENConent = document.getElementById('MENConent');
    const MENBanner = document.getElementById('MENBanner');
    const tabBox = document.getElementById('tabBox');
    const mainTab = document.getElementsByClassName('mainTab');
    const allMenu = document.getElementsByClassName('allMenu');

    //shop top tab
    tabBox.addEventListener('click', function (e) {
      for (var i = 0; i < mainTab.length; i++) {
        mainTab[i].classList.remove('shop_active');
      }
      if (e.target.tagName == 'A') e.target.classList.add('shop_active');
    })

    productTab.addEventListener('click', function (e) {
      tabChange(e)
    })
    mallTab.addEventListener('click', function (e) {
      tabChange(e)
    })
    menTab.addEventListener('click', function (e) {
      tabChange(e)
    })

    function tabChange(e) {
      e.preventDefault();

      if (e.target.id === 'productTab') {

        productContent.classList.add('tabActive');
        productBanner.classList.add('tabActive');

        MENConent.classList.remove('tabActive');
        MENBanner.classList.remove('tabActive');

        MallContent.classList.remove('tabActive');
        MallBanner.classList.remove('tabActive');
      } else if (e.target.id === 'mallTab') {

        MallContent.classList.add('tabActive');
        MallBanner.classList.add('tabActive');

        MENConent.classList.remove('tabActive');
        MENBanner.classList.remove('tabActive');

        productContent.classList.remove('tabActive');
        productBanner.classList.remove('tabActive');
      } else if (e.target.id === 'menTab') {

        MENConent.classList.add('tabActive');
        MENBanner.classList.add('tabActive');

        MallContent.classList.remove('tabActive');
        MallBanner.classList.remove('tabActive');

        productContent.classList.remove('tabActive');
        productBanner.classList.remove('tabActive');
      }
      return;
    }

    // product func
    function productFunc() {
      //shop_banner_item
      const shopBannerList = [{
          title: '잇수다 LAB ',
          content: '여름신상데일리룩',
          green: ' 1+1＆무료배송',
          color: '1',
          url: 'https://www.naver.com1',
        },
        {
          title: '인유어핏 ',
          content: '장마 땐 레인플랫 ',
          green: ' 최대 40%할인',
          color: '1',
          url: 'https://www.naver.com2',
        },
        {
          title: '골드리프 ',
          content: '세련된 썸머룩 톡톡5% 추가할인!',
          url: 'https://www.naver.com3',
        },
        {
          title: '다닝AA ',
          content: '여름신상모자',
          green: ' 최대 40%할인',
          color: "2",
          url: 'https://www.naver.com4',
        },
        {
          title: '차차룰루 ',
          content: '페미닌룩 모음전',
          green: ' 전상품 무료배송!',
          color: '1',
          url: 'https://www.naver.com5',
        },
        {
          title: '프리스카제이',
          content: '14K 여자 발찌 후기 370개 인증',
          url: 'https://www.naver.com6',
        },
        {
          title: 'vichi',
          content: '소장가치 비치',
          green: ' 바캉스준비는비치',
          color: '2',
          url: 'https://www.naver.com7',
        },
        {
          title: '메이드인109',
          content: '여름 후드 집업 톡톡친구 15%할인',
          url: 'https://www.naver.com8',
        },
        {
          title: '메이퍼플',
          content: '여름신상 전품목',
          url: 'https://www.naver.com9',
        },
        {
          title: '땡스메리',
          content: '장마 땐 레인플랫 최대 40% 할인',
          green: ' 당일+무료배송',
          color: '1',
          url: 'https://www.naver.com10',
        },
        {
          title: '유니콩',
          content: '키작녀 데일리룩',
          green: ' 150~159cm ',
          color: '1',
          url: 'https://www.naver.com11',
        },
        {
          title: '세냥이',
          content: '핸드메이드귀걸이 특가 세일!',
          url: 'https://www.naver.com12',
        },
        {
          title: '경기행복샵',
          content: '경기테크노파크와 중소기업착한소비',
          url: 'https://www.naver.com13',
        },
        {
          title: '레어템옴므',
          content: '여름신상전품목 무료배송 행사중',
          url: 'https://www.naver.com14',
        },
        {
          title: '노블리카',
          content: '여름신상밀짚모자 40% 할인!',
          url: 'https://www.naver.com15',
        }, {
          title: '서울샵',
          content: '중소기업 우수',
          green: ' 리빙삼품 모음전',
          color: '1',
          url: 'https://www.naver.com16',
        },
        {
          title: '데이러브',
          content: '지금부터여름내내',
          green: ' 신상샌들 SALE',
          color: '2',
          url: 'https://www.naver.com17',
        },
        {
          title: '러블리아미에',
          content: '데일리룩 휴가룩 1벌사도 무료배송',
          url: 'https://www.naver.com18',
        },
        {
          title: '다채몰',
          content: '소상공인과 함께 경제적인 아이템',
          url: 'https://www.naver.com19',
        },
        {
          title: '피그민트',
          content: '세원한리넨아이템',
          green: ' 기획전 세일 ',
          color: '2',
          url: 'https://www.naver.com20',
        },
        {
          title: '프라스카제이',
          content: '14K 여자 발찌 후기 370개 인증',
          url: 'https://www.naver.com21',
        },
        {
          title: '키올',
          content: '후기가 인정하는 ',
          green: ' 레터링모던컬러티',
          color: '1',
          url: 'https://www.naver.com22',
        },
        {
          title: '로웰',
          content: '1+1 여름롱스커트',
          green: ' 최대50%할인',
          color: '1',
          url: 'https://www.naver.com23',
        },
        {
          title: '에어라운드',
          content: '여름엔 커플발찌 무료배송',
          url: 'https://www.naver.com24',
        },
        {
          title: '킬링파트',
          content: '롱레이어드반팔티 최대 20% 할인',
          url: 'https://www.naver.com25',
        },
      ]
      const shopRefreshBt = document.getElementById('shopRefreshBt');
      const shopBannerli = document.getElementsByClassName('shop_banner_li');

      //data produce
      let shopDataFuc = function () {
        var cnt = 0;
        var numCheck = [];
        var resData = [];

        while (true) {
          var ranNum = Math.floor(Math.random() * shopBannerList.length);
          if (cnt == 0) {
            numCheck[0] = ranNum;
            resData[0] = shopBannerList[ranNum];
            cnt++;
          } else {
            if (!numCheck.includes(ranNum)) {
              numCheck[cnt] = ranNum;
              resData[cnt] = shopBannerList[ranNum];
              cnt++;
            }
          }
          if (cnt == 7) break;
        }

        //view produce
        for (var sh_cnt = 0; sh_cnt < shopBannerli.length; sh_cnt++) {
          shopBannerli[sh_cnt].innerHTML = '';
          let aTag = document.createElement('a');
          aTag.href = resData[sh_cnt].url;

          let title = document.createElement('span');
          title.textContent = resData[sh_cnt].title;
          title.classList.add('ft-pp');
          title.classList.add('bn-title');

          let shopContent = document.createElement('span');
          shopContent.textContent = resData[sh_cnt].content;

          aTag.appendChild(title);
          aTag.appendChild(shopContent)
          shopBannerli[sh_cnt].append(aTag)

          if (resData[sh_cnt].color == '2') shopContent.classList.add('ft-gr');

          if (resData[sh_cnt].green) {
            let green = document.createElement('span');
            green.textContent = resData[sh_cnt].green;
            if (resData[sh_cnt].color == '1') green.classList.add('ft-gr');

            shopBannerli[sh_cnt].lastElementChild.append(green);
          }
        }
        return;
      }
      shopDataFuc();

      shopRefreshBt.addEventListener('click', function (e) {
        e.preventDefault();
        shopDataFuc();
      })

      // shop Content Prev Next
      const shopContentList = [{
          shopContentList: [{
              img: '../img/shoppingBox/sh1.jpg',
              text1: '올리자마자~',
              text2: '인기폭발신상',
              url: 'https://www.naver.com1',
            },
            {
              img: '../img/shoppingBox/sh2.jpg',
              text1: '감각적 디자인',
              text2: '다들~뒤돌아봐',
              url: 'https://www.naver.com2',
            },
            {
              img: '../img/shoppingBox/sh3.jpg',
              text1: '휘게 전상품',
              text2: '20%특가할인!',
              url: 'https://www.naver.com3',
            },
            {
              img: '../img/shoppingBox/sh4.jpg',
              text1: '이게뭐길래~',
              text2: '쿨링감폭발해?',
              url: 'https://www.naver.com4',
            },
            {
              img: '../img/shoppingBox/sh5.jpg',
              text1: '고급스러운~',
              text2: '명품스타일~',
              url: 'https://www.naver.com5',
            },
            {
              img: '../img/shoppingBox/sh6.jpg',
              text1: '모두들 극찬해',
              text2: '인생 생리대',
              url: 'https://www.naver.com6',
            },
            {
              img: '../img/shoppingBox/sh7.jpg',
              text1: '시원하게~',
              text2: '피로를 싺~',
              url: 'https://www.naver.com7',
            },
            {
              img: '../img/shoppingBox/sh8.jpg',
              text1: '퀄리티~좋아요',
              text2: '전상품 5%',
              url: 'https://www.naver.com8',
            },
            {
              img: '../img/shoppingBox/sh9.jpg',
              text1: '볼륨감원해?',
              text2: '나를 입어봐~',
              url: 'https://www.naver.com9',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh10.jpg',
              text1: '대체불가 핏감',
              text2: '후회없는 선택',
              url: 'https://www.naver.com10',
            },
            {
              img: '../img/shoppingBox/sh11.jpg',
              text1: '올리자마자~',
              text2: '인기폭발신상',
              url: 'https://www.naver.com11',
            },
            {
              img: '../img/shoppingBox/sh12.jpg',
              text1: '차원이다르죠?',
              text2: '안사면 후회해',
              url: 'https://www.naver.com12',
            },
            {
              img: '../img/shoppingBox/sh13.jpg',
              text1: '허기진 밤을',
              text2: '달래줄 98kcal',
              url: 'https://www.naver.com13',
            },
            {
              img: '../img/shoppingBox/sh14.jpg',
              text1: '원단좋고 시원',
              text2: '브랜드 그이상',
              url: 'https://www.naver.com14',
            },
            {
              img: '../img/shoppingBox/sh15.jpg',
              text1: 'ALL SALE',
              text2: '지금이 기회!',
              url: 'https://www.naver.com15',
            },
            {
              img: '../img/shoppingBox/sh16.jpg',
              text1: '농심라면 특가',
              text2: '오늘만이가격!',
              url: 'https://www.naver.com16',
            },
            {
              img: '../img/shoppingBox/sh17.jpg',
              text1: '세련미 폭발!',
              text2: '여름이 더예뻐',
              url: 'https://www.naver.com17',
            },
            {
              img: '../img/shoppingBox/sh18.jpg',
              text1: '헉! 색소침착',
              text2: '100%환불가능',
              url: 'https://www.naver.com18',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh19.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com19',
            },
            {
              img: '../img/shoppingBox/sh20.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com20',
            },
            {
              img: '../img/shoppingBox/sh21.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com21',
            },
            {
              img: '../img/shoppingBox/sh22.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com22',
            },
            {
              img: '../img/shoppingBox/sh23.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com23',
            },
            {
              img: '../img/shoppingBox/sh24.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com24',
            },
            {
              img: '../img/shoppingBox/sh25.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com25',
            },
            {
              img: '../img/shoppingBox/sh26.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com26',
            },
            {
              img: '../img/shoppingBox/sh27.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com27',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh28.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com28',
            },
            {
              img: '../img/shoppingBox/sh29.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com29',
            },
            {
              img: '../img/shoppingBox/sh30.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com30',
            },
            {
              img: '../img/shoppingBox/sh31.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com31',
            },
            {
              img: '../img/shoppingBox/sh32.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com32',
            },
            {
              img: '../img/shoppingBox/sh33.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com33',
            },
            {
              img: '../img/shoppingBox/sh34.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com34',
            },
            {
              img: '../img/shoppingBox/sh35.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com35',
            },
            {
              img: '../img/shoppingBox/sh36.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com36',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh1.jpg',
              text1: '올리자마자~',
              text2: '인기폭발신상',
              url: 'https://www.naver.com1',
            },
            {
              img: '../img/shoppingBox/sh2.jpg',
              text1: '감각적 디자인',
              text2: '다들~뒤돌아봐',
              url: 'https://www.naver.com2',
            },
            {
              img: '../img/shoppingBox/sh3.jpg',
              text1: '휘게 전상품',
              text2: '20%특가할인!',
              url: 'https://www.naver.com3',
            },
            {
              img: '../img/shoppingBox/sh4.jpg',
              text1: '이게뭐길래~',
              text2: '쿨링감폭발해?',
              url: 'https://www.naver.com4',
            },
            {
              img: '../img/shoppingBox/sh5.jpg',
              text1: '고급스러운~',
              text2: '명품스타일~',
              url: 'https://www.naver.com5',
            },
            {
              img: '../img/shoppingBox/sh6.jpg',
              text1: '모두들 극찬해',
              text2: '인생 생리대',
              url: 'https://www.naver.com6',
            },
            {
              img: '../img/shoppingBox/sh7.jpg',
              text1: '시원하게~',
              text2: '피로를 싺~',
              url: 'https://www.naver.com7',
            },
            {
              img: '../img/shoppingBox/sh8.jpg',
              text1: '퀄리티~좋아요',
              text2: '전상품 5%',
              url: 'https://www.naver.com8',
            },
            {
              img: '../img/shoppingBox/sh9.jpg',
              text1: '볼륨감원해?',
              text2: '나를 입어봐~',
              url: 'https://www.naver.com9',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh10.jpg',
              text1: '대체불가 핏감',
              text2: '후회없는 선택',
              url: 'https://www.naver.com10',
            },
            {
              img: '../img/shoppingBox/sh11.jpg',
              text1: '올리자마자~',
              text2: '인기폭발신상',
              url: 'https://www.naver.com11',
            },
            {
              img: '../img/shoppingBox/sh12.jpg',
              text1: '차원이다르죠?',
              text2: '안사면 후회해',
              url: 'https://www.naver.com12',
            },
            {
              img: '../img/shoppingBox/sh13.jpg',
              text1: '허기진 밤을',
              text2: '달래줄 98kcal',
              url: 'https://www.naver.com13',
            },
            {
              img: '../img/shoppingBox/sh14.jpg',
              text1: '원단좋고 시원',
              text2: '브랜드 그이상',
              url: 'https://www.naver.com14',
            },
            {
              img: '../img/shoppingBox/sh15.jpg',
              text1: 'ALL SALE',
              text2: '지금이 기회!',
              url: 'https://www.naver.com15',
            },
            {
              img: '../img/shoppingBox/sh16.jpg',
              text1: '농심라면 특가',
              text2: '오늘만이가격!',
              url: 'https://www.naver.com16',
            },
            {
              img: '../img/shoppingBox/sh17.jpg',
              text1: '세련미 폭발!',
              text2: '여름이 더예뻐',
              url: 'https://www.naver.com17',
            },
            {
              img: '../img/shoppingBox/sh18.jpg',
              text1: '헉! 색소침착',
              text2: '100%환불가능',
              url: 'https://www.naver.com18',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh19.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com19',
            },
            {
              img: '../img/shoppingBox/sh20.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com20',
            },
            {
              img: '../img/shoppingBox/sh21.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com21',
            },
            {
              img: '../img/shoppingBox/sh22.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com22',
            },
            {
              img: '../img/shoppingBox/sh23.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com23',
            },
            {
              img: '../img/shoppingBox/sh24.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com24',
            },
            {
              img: '../img/shoppingBox/sh25.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com25',
            },
            {
              img: '../img/shoppingBox/sh26.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com26',
            },
            {
              img: '../img/shoppingBox/sh27.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com27',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh28.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com28',
            },
            {
              img: '../img/shoppingBox/sh29.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com29',
            },
            {
              img: '../img/shoppingBox/sh30.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com30',
            },
            {
              img: '../img/shoppingBox/sh31.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com31',
            },
            {
              img: '../img/shoppingBox/sh32.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com32',
            },
            {
              img: '../img/shoppingBox/sh33.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com33',
            },
            {
              img: '../img/shoppingBox/sh34.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com34',
            },
            {
              img: '../img/shoppingBox/sh35.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com35',
            },
            {
              img: '../img/shoppingBox/sh36.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com36',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh1.jpg',
              text1: '올리자마자~',
              text2: '인기폭발신상',
              url: 'https://www.naver.com1',
            },
            {
              img: '../img/shoppingBox/sh2.jpg',
              text1: '감각적 디자인',
              text2: '다들~뒤돌아봐',
              url: 'https://www.naver.com2',
            },
            {
              img: '../img/shoppingBox/sh3.jpg',
              text1: '휘게 전상품',
              text2: '20%특가할인!',
              url: 'https://www.naver.com3',
            },
            {
              img: '../img/shoppingBox/sh4.jpg',
              text1: '이게뭐길래~',
              text2: '쿨링감폭발해?',
              url: 'https://www.naver.com4',
            },
            {
              img: '../img/shoppingBox/sh5.jpg',
              text1: '고급스러운~',
              text2: '명품스타일~',
              url: 'https://www.naver.com5',
            },
            {
              img: '../img/shoppingBox/sh6.jpg',
              text1: '모두들 극찬해',
              text2: '인생 생리대',
              url: 'https://www.naver.com6',
            },
            {
              img: '../img/shoppingBox/sh7.jpg',
              text1: '시원하게~',
              text2: '피로를 싺~',
              url: 'https://www.naver.com7',
            },
            {
              img: '../img/shoppingBox/sh8.jpg',
              text1: '퀄리티~좋아요',
              text2: '전상품 5%',
              url: 'https://www.naver.com8',
            },
            {
              img: '../img/shoppingBox/sh9.jpg',
              text1: '볼륨감원해?',
              text2: '나를 입어봐~',
              url: 'https://www.naver.com9',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh10.jpg',
              text1: '대체불가 핏감',
              text2: '후회없는 선택',
              url: 'https://www.naver.com10',
            },
            {
              img: '../img/shoppingBox/sh11.jpg',
              text1: '올리자마자~',
              text2: '인기폭발신상',
              url: 'https://www.naver.com11',
            },
            {
              img: '../img/shoppingBox/sh12.jpg',
              text1: '차원이다르죠?',
              text2: '안사면 후회해',
              url: 'https://www.naver.com12',
            },
            {
              img: '../img/shoppingBox/sh13.jpg',
              text1: '허기진 밤을',
              text2: '달래줄 98kcal',
              url: 'https://www.naver.com13',
            },
            {
              img: '../img/shoppingBox/sh14.jpg',
              text1: '원단좋고 시원',
              text2: '브랜드 그이상',
              url: 'https://www.naver.com14',
            },
            {
              img: '../img/shoppingBox/sh15.jpg',
              text1: 'ALL SALE',
              text2: '지금이 기회!',
              url: 'https://www.naver.com15',
            },
            {
              img: '../img/shoppingBox/sh16.jpg',
              text1: '농심라면 특가',
              text2: '오늘만이가격!',
              url: 'https://www.naver.com16',
            },
            {
              img: '../img/shoppingBox/sh17.jpg',
              text1: '세련미 폭발!',
              text2: '여름이 더예뻐',
              url: 'https://www.naver.com17',
            },
            {
              img: '../img/shoppingBox/sh18.jpg',
              text1: '헉! 색소침착',
              text2: '100%환불가능',
              url: 'https://www.naver.com18',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh19.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com19',
            },
            {
              img: '../img/shoppingBox/sh20.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com20',
            },
            {
              img: '../img/shoppingBox/sh21.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com21',
            },
            {
              img: '../img/shoppingBox/sh22.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com22',
            },
            {
              img: '../img/shoppingBox/sh23.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com23',
            },
            {
              img: '../img/shoppingBox/sh24.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com24',
            },
            {
              img: '../img/shoppingBox/sh25.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com25',
            },
            {
              img: '../img/shoppingBox/sh26.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com26',
            },
            {
              img: '../img/shoppingBox/sh27.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com27',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh28.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com28',
            },
            {
              img: '../img/shoppingBox/sh29.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com29',
            },
            {
              img: '../img/shoppingBox/sh30.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com30',
            },
            {
              img: '../img/shoppingBox/sh31.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com31',
            },
            {
              img: '../img/shoppingBox/sh32.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com32',
            },
            {
              img: '../img/shoppingBox/sh33.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com33',
            },
            {
              img: '../img/shoppingBox/sh34.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com34',
            },
            {
              img: '../img/shoppingBox/sh35.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com35',
            },
            {
              img: '../img/shoppingBox/sh36.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com36',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh19.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com19',
            },
            {
              img: '../img/shoppingBox/sh20.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com20',
            },
            {
              img: '../img/shoppingBox/sh21.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com21',
            },
            {
              img: '../img/shoppingBox/sh22.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com22',
            },
            {
              img: '../img/shoppingBox/sh23.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com23',
            },
            {
              img: '../img/shoppingBox/sh24.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com24',
            },
            {
              img: '../img/shoppingBox/sh25.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com25',
            },
            {
              img: '../img/shoppingBox/sh26.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com26',
            },
            {
              img: '../img/shoppingBox/sh27.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com27',
            },
          ]
        },
        {
          shopContentList: [{
              img: '../img/shoppingBox/sh28.jpg',
              text1: '필드위의 여신',
              text2: '반응완전 최고',
              url: 'https://www.naver.com28',
            },
            {
              img: '../img/shoppingBox/sh29.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com29',
            },
            {
              img: '../img/shoppingBox/sh30.jpg',
              text1: '헬로월드',
              text2: '헬로월드',
              url: 'https://www.naver.com30',
            },
            {
              img: '../img/shoppingBox/sh31.jpg',
              text1: '모공축소 세럼',
              text2: '40% 한정특가!',
              url: 'https://www.naver.com31',
            },
            {
              img: '../img/shoppingBox/sh32.jpg',
              text1: '지금이 기회~!',
              text2: 'EVENT SALE~!',
              url: 'https://www.naver.com32',
            },
            {
              img: '../img/shoppingBox/sh33.jpg',
              text1: '썸머세트인기',
              text2: '고민없이예뻐',
              url: 'https://www.naver.com33',
            },
            {
              img: '../img/shoppingBox/sh34.jpg',
              text1: '쓰임 총결산',
              text2: '최대 56%↓',
              url: 'https://www.naver.com34',
            },
            {
              img: '../img/shoppingBox/sh35.jpg',
              text1: '센스있는 코디',
              text2: '자신감 급상승',
              url: 'https://www.naver.com35',
            },
            {
              img: '../img/shoppingBox/sh36.jpg',
              text1: '침구심야특가!',
              text2: '지금이 기회~',
              url: 'https://www.naver.com36',
            },
          ]
        },

      ]

      const shopPaging = document.getElementById('shopPaging');
      const shopPrev = document.getElementById('shopPrev');
      const shopNext = document.getElementById('shopNext');
      const shopContentItem = document.getElementsByClassName('shop_content_item');

      const shopPrevNextBt = document.getElementsByClassName('shopContentArrow');
      const pageMount = document.getElementById('pageMount');
      let pageingNum = 1;

      let shopCtBtData = 0;
      const resData = [];

      let shopContentFuc = function (e) {
        let dataModule = []

        for (var cnt = 0; cnt < shopContentList[pageingNum - 1].shopContentList.length; cnt++) {
          dataModule.push(shopContentList[pageingNum - 1].shopContentList[cnt])
        }

        for (var ci = 0; ci < 9; ci++) {
          shopContentItem[ci].innerHTML = '';
          let url = document.createElement('a');
          url.href = dataModule[ci].url

          let div = document.createElement('div');
          div.classList.add('shop_mw');

          let imgTag = document.createElement('img');
          imgTag.src = dataModule[ci].img;

          let p = document.createElement('p');
          p.classList.add('shop_content_tx');

          let span1 = document.createElement('span');
          let span2 = document.createElement('span');
          span1.innerHTML = dataModule[ci].text1
          span2.innerHTML = dataModule[ci].text2

          p.append(span1);
          p.append(span2);

          div.append(imgTag)
          url.append(div)
          url.append(p);

          shopContentItem[ci].appendChild(url);
        }
      }
      shopContentFuc();

      pageMount.textContent = '/' + shopContentList.length;

      for (var i = 0; i < shopPrevNextBt.length; i++) {
        shopPrevNextBt[i].addEventListener('click', function (e) {
          e.preventDefault();
          if (e.target.id === 'shopPrev') {
            (pageingNum < 2) ? pageingNum = shopContentList.length: pageingNum--;
          } else {
            (pageingNum > shopContentList.length - 1) ? pageingNum = 1: pageingNum++
          }
          shopPaging.innerHTML = pageingNum;
          shopContentFuc(e.target.id);
        })
      }
      //product
      return;
    }
    productFunc()

    // MENS func
    // banner
    const MENRefreshBt = document.getElementById('MENRefreshBt');
    const MENBannerListBox = document.getElementById('MENBannerListBox');
    const MENArrowBt = document.getElementById('MENArrowBt');
    const MENCurrentPaging = document.getElementById('MENCurrentPaging');
    const MENPagingMount = document.getElementById('MENPagingMount');
    let MENData = [];

    function MENMallFunc() {
      //MENContent
      const MENContentList = [{
          MENContentList: [{
              img: '../img/MENContentList/sh1.jpg',
              text1: '자꾸 배나와?',
              text2: '입기만하면쏚~',
              url: 'https://www.naver.com1',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh2.jpg',
              text1: '한달 34,800원',
              text2: '남자들이 더찾아',
              url: 'https://www.naver.com2',
              title: '얼굴 보호대',
            },
            {
              img: '../img/MENContentList/sh3.jpg',
              text1: '손목에 웬 펌프?',
              text2: '공기주입식 깁스',
              url: 'https://www.naver.com3',
              title: '시원한 린넨셔츠',
            },
            {
              img: '../img/MENContentList/sh4.jpg',
              text1: '자고난뒤 피곤?',
              text2: '왜 진작 몰랐지?',
              url: 'https://www.naver.com4',
              title: '피로 회복제',
            },
            {
              img: '../img/MENContentList/sh5.jpg',
              text1: '긴팔이더시원해!',
              text2: '추성훈티5,900원',
              url: 'https://www.naver.com5',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh6.jpg',
              text1: '1만원대 진짜?',
              text2: '프리미엄 칼라티',
              url: 'https://www.naver.com6',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh7.jpg',
              text1: '입냄새 잇몸질환',
              text2: '이거 하나면 끝!',
              url: 'https://www.naver.com7',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh8.jpg',
              text1: '풀커버 강화유리',
              text2: '이 가격 실화?!',
              url: 'https://www.naver.com8',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh9.jpg',
              text1: '비싸서 못샀던거',
              text2: '웹일로 이가격?!',
              url: 'https://www.naver.com9',
              title: '손목 보호대',
            },
          ]
        },
        {
          MENContentList: [{
              img: '../img/MENContentList/sh10.jpg',
              text1: '와 진짜!',
              text2: '향수?필요없네~',
              url: 'https://www.naver.com10',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh11.jpg',
              text1: '피곤한 남자들',
              text2: '붙여봐 해결돼~',
              url: 'https://www.naver.com11',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh12.jpg',
              text1: '헉! 3만원대라니',
              text2: '없어서 못샀던거',
              url: 'https://www.naver.com12',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh13.jpg',
              text1: '엘칸토 리퍼브',
              text2: '39,600원~',
              url: 'https://www.naver.com13',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh14.jpg',
              text1: '제발',
              text2: '잠 좀풀자고싶어',
              url: 'https://www.naver.com14',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh15.jpg',
              text1: '여름이니까~',
              text2: '드라이기능성티!',
              url: 'https://www.naver.com15',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh16.jpg',
              text1: '3in1 구스다운',
              text2: '회원 93%할인',
              url: 'https://www.naver.com16',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh17.jpg',
              text1: '자동차 스크래치',
              text2: '제거 타올 등장!',
              url: 'https://www.naver.com17',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh18.jpg',
              text1: '시원한 착용감',
              text2: '데일리 리넨셔츠',
              url: 'https://www.naver.com18',
              title: '손목 보호대',
            },
          ]
        },
        {
          MENContentList: [{
              img: '../img/MENContentList/sh19.jpg',
              text1: '눕자마자 기절!',
              text2: '나에게 딱 맞춰!',
              url: 'https://www.naver.com19',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh20.jpg',
              text1: '엄마 나 키컸어!',
              text2: '5cm 인생역전',
              url: 'https://www.naver.com20',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh21.jpg',
              text1: '단 일주일 1+1',
              text2: '슬랙스 3만원대!',
              url: 'https://www.naver.com21',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh22.jpg',
              text1: '미운티아 여름',
              text2: '의류창고개방!',
              url: 'https://www.naver.com22',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh23.jpg',
              text1: '이가격에 나올',
              text2: '신발이 아닌ㄴ데',
              url: 'https://www.naver.com23',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh24.jpg',
              text1: '아무리 더워도',
              text2: '스타일 포기못해!',
              url: 'https://www.naver.com24',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh25.jpg',
              text1: '요즘 이거없는',
              text2: '사람이 어딨어',
              url: 'https://www.naver.com25',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh26.jpg',
              text1: '호랑이 기운?',
              text2: '진짜부럽지않네~',
              url: 'https://www.naver.com26',
              title: '손목 보호대',
            },
            {
              img: '../img/MENContentList/sh27.jpg',
              text1: '비싸서 못샀던거',
              text2: '드디어~한국상륙',
              url: 'https://www.naver.com27',
              title: '손목 보호대',
            },
          ]
        },
      ]
      let MENContentPagingNum = 0;
      const MENContentBox = document.getElementById('MENContentBox');

      MENPagingMount.innerHTML = '/' + MENContentList.length;
      MENArrowBt.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.tagName == 'A') {
          if (e.target.className == 'shop_prev') {
            (MENContentPagingNum < 1) ? MENContentPagingNum = MENContentList.length - 1: MENContentPagingNum--;
          } else if (e.target.className == 'shop_next') {
            (MENContentPagingNum >= MENContentList.length - 1) ? MENContentPagingNum = 0: MENContentPagingNum++;
          }
        }
        MENCurrentPaging.innerHTML = MENContentPagingNum + 1;
        MENContentFunc()
      })

      function MENContentFunc() {
        MENContentBox.innerHTML = '';
        let ul = document.createElement('ul');
        ul.classList.add('contents_mens_ul');
        for (var i = 0; i < 9; i++) {
          let li = document.createElement('li');
          let a = document.createElement('a');
          let div = document.createElement('div');
          let img = document.createElement('img');

          let p = document.createElement('p');
          let span1 = document.createElement('span');
          let span2 = document.createElement('span');

          li.classList.add('mens_content_list');
          a.href = MENContentList[MENContentPagingNum].MENContentList[i].url;

          div.classList.add('ms_md');
          img.src = MENContentList[MENContentPagingNum].MENContentList[i].img;
          img.alt = MENContentList[MENContentPagingNum].MENContentList[i].title;

          p.classList.add('mens_tx');
          span1.classList.add('mens_content_span');
          span2.classList.add('mens_content_span');
          span1.innerHTML = MENContentList[MENContentPagingNum].MENContentList[i].text1;
          span2.innerHTML = MENContentList[MENContentPagingNum].MENContentList[i].text2;

          p.appendChild(span1);
          p.appendChild(span2);
          div.appendChild(img);
          a.appendChild(div);
          a.appendChild(p);

          li.appendChild(a);
          ul.appendChild(li)
        }
        MENContentBox.appendChild(ul);
      }
      MENContentFunc();

      //MENBanner
      const MENBannerList = [{
          url: 'https:www.google.com1',
          src: '../img/MENSBanner/mb1.jpg',
          title: 'USB충전기',
          text1: '이렇게간편할수가',
          text2: '컴팩트하게USB 충전',
          text3: '더액션',
        },
        {
          url: 'https:www.google.com2',
          src: '../img/MENSBanner/mb2.jpg',
          title: '머리고정젤',
          text1: '땀범벅~머리고정',
          text2: '특가 2+1 진행중',
          text3: '엠도씨',
        },
        {
          url: 'https:www.google.com3',
          src: '../img/MENSBanner/mb3.jpg',
          title: '휴대폰 게임기',
          text1: '반응 장난아니야~',
          text2: '못사서 안달났어~',
          text3: '폰뿌',
        },
        {
          url: 'https:www.google.com4',
          src: '../img/MENSBanner/mb4.jpg',
          title: '구스다운방풍',
          text1: '방수방풍기능 3in1',
          text2: '구스다운 93%',
          text3: '슈나이더 스포츠',
        },
        {
          url: 'https:www.google.com5',
          src: '../img/MENSBanner/mb5.jpg',
          title: '무선이어폰',
          text1: '터치 볼륨컨트롤',
          text2: '무선이어폰 입고',
          text3: '펀픽',
        },
        {
          url: 'https:www.google.com6',
          src: '../img/MENSBanner/mb6.jpg',
          title: '가로모드 폰거치대',
          text1: '운전자를위한 정면',
          text2: '가로모드 폰거치대',
          text3: '비비드망고',
        },
        {
          url: 'https:www.google.com7',
          src: '../img/MENSBanner/mb7.jpg',
          title: '고음질! 이어폰',
          text1: '최대 15시간 사용',
          text2: '고음질 무선이어폰',
          text3: '앱스토리몰',
        },
        {
          url: 'https:www.google.com8',
          src: '../img/MENSBanner/mb8.jpg',
          title: '액션캡짱',
          text1: '5만원대',
          text2: '가성비 액션캡',
          text3: '앱스토리몰',
        },
        {
          url: 'https:www.google.com9',
          src: '../img/MENSBanner/mb9.jpg',
          title: '빠른 움직임',
          text1: '가볍고편한 클로그',
          text2: '언제나 신기 좋아',
          text3: '스포츠다이렉트',
        },
        {
          url: 'https:www.google.com10',
          src: '../img/MENSBanner/mb10.jpg',
          title: '언더아머 러닝화',
          text1: '이런게 진짜 특가!',
          text2: '언더아머 러닝화',
          text3: '스포츠다이렉트',
        },
        {
          url: 'https:www.google.com11',
          src: '../img/MENSBanner/mb11.jpg',
          title: '그라펜 샴푸',
          text1: '샴푸로 대머리탈출',
          text2: '지금사면 1+1',
          text3: '그라펜',
        },
        {
          url: 'https:www.google.com12',
          src: '../img/MENSBanner/mb12.jpg',
          title: '손풍기',
          text1: '이거들면 여자들 다!',
          text2: '시원 시원',
          text3: '선풍기',
        },
        {
          url: 'https:www.google.com13',
          src: '../img/MENSBanner/mb13.jpg',
          title: '손풍기',
          text1: '이거들면 여자들 다!',
          text2: '시원 시원',
          text3: '선풍기',
        },
        {
          url: 'https:www.google.com14',
          src: '../img/MENSBanner/mb14.jpg',
          title: '손풍기',
          text1: '이거들면 여자들 다!',
          text2: '시원 시원',
          text3: '선풍기',
        },
        {
          url: 'https:www.google.com15',
          src: '../img/MENSBanner/mb15.jpg',
          title: '손풍기',
          text1: '이거들면 여자들 다!',
          text2: '시원 시원',
          text3: '선풍기',
        },
        {
          url: 'https:www.google.com16',
          src: '../img/MENSBanner/mb16.jpg',
          title: '손풍기',
          text1: '이거들면 여자들 다!',
          text2: '시원 시원',
          text3: '선풍기',
        },
        {
          url: 'https:www.google.com17',
          src: '../img/MENSBanner/mb17.jpg',
          title: '손풍기',
          text1: '이거들면 여자들 다!',
          text2: '시원 시원',
          text3: '선풍기',
        },
        {
          url: 'https:www.google.com18',
          src: '../img/MENSBanner/mb18.jpg',
          title: '손풍기',
          text1: '이거들면 여자들 다!',
          text2: '시원 시원',
          text3: '선풍기',
        },
      ]

      MENRefreshBt.addEventListener('click', function (e) {
        e.preventDefault();
        MENData = [];
        MENBannerFunc()
      })

      function MENBannerFunc() {
        MENBannerListBox.innerHTML = '';
        let ul = document.createElement('ul');
        for (var cnt = 0; cnt < 3; cnt++) {
          let randomNum = Math.floor(Math.random() * MENBannerList.length);
          if (MENData.includes(randomNum)) {
            cnt = cnt - 1;
            continue;
          } else {
            MENData.push(randomNum);
          }
          const li = document.createElement('il');
          const a = document.createElement('a');
          const img = document.createElement('img');
          const spanParent = document.createElement('span');
          const span1 = document.createElement('span');
          const span2 = document.createElement('span');
          const span3 = document.createElement('span');

          li.classList.add('MEN_banner_list');
          a.classList.add('MENBanner_anch');
          a.href = MENBannerList[randomNum].url;

          img.src = MENBannerList[randomNum].src;
          img.alt = MENBannerList[randomNum].title;
          img.classList.add('MEN_img_float');

          spanParent.classList.add('MEN_banner_txbox');
          span3.classList.add('MEN_color_tx');
          span1.textContent = MENBannerList[randomNum].text1;
          span2.textContent = MENBannerList[randomNum].text2;
          span3.textContent = MENBannerList[randomNum].text3;

          spanParent.appendChild(span1);
          spanParent.appendChild(span2);
          spanParent.appendChild(span3);

          a.appendChild(img);
          a.appendChild(spanParent);
          li.appendChild(a);
          ul.appendChild(li);
        }
        MENBannerListBox.appendChild(ul);
        return;
      }
      MENBannerFunc();
      return
    }
    MENMallFunc();


    //shopping Mall

    const mallPagingBox = document.getElementById('mallPagingBox');
    const mallCurrentPaging = document.getElementById('mallCurrentPaging');
    const mallContentBox = document.getElementById('mallContentBox');
    const mallContentListLi = document.getElementsByClassName('mall_content_list');
    const mallPagingMount = document.getElementById('mallPagingMount');

    const mallContentList = [{
        mallContentList: [{ //MALL TOP
            title: '립컬러',
            url: 'https:www.google.com1',
            src: '../img/shoppingMallContentList/tt1-1.jpg',
            text1: '나만 알고싶은',
            text2: '너무예쁜 립컬러',
          },
          {
            title: '홍콩 제니쿠키',
            url: 'https:www.google.com2',
            src: '../img/shoppingMallContentList/tt1-2.jpg',
            text1: '줄 서서 먹는',
            text2: '홍콩 제니쿠키',
          },
          {
            title: '펄박스',
            url: 'https:www.google.com3',
            src: '../img/shoppingMallContentList/tt1-3.jpg',
            text1: '펄 좋아한다고?',
            text2: '주목! 너무예뻐~',
          },
          {
            title: '눈썹키트',
            url: 'https:www.google.com4',
            src: '../img/shoppingMallContentList/tt1-4.jpg',
            text1: '눈썹 그리지말고',
            text2: '자연스럽게 붙여',
          },
          {
            title: '화장품 패킷',
            url: 'https:www.google.com5',
            src: '../img/shoppingMallContentList/tt1-5.jpg',
            text1: '귀여워 소장할래',
            text2: '미니제품 포함!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com6',
            src: '../img/shoppingMallContentList/tt1-6.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL1
            title: '미니선풍기1',
            url: 'https:www.google.com7/malllist1',
            src: '../img/shoppingMallContentList/tt2-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기2',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/tt2-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기3',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/tt2-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL2
            title: '미니선풍기4',
            url: 'https:www.google.com10/malllist1',
            src: '../img/shoppingMallContentList/tt3-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기5',
            url: 'https:www.google.com11',
            src: '../img/shoppingMallContentList/tt3-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기6',
            url: 'https:www.google.com12',
            src: '../img/shoppingMallContentList/tt3-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL3
            title: '미니선풍기7',
            url: 'https:www.google.com13/malllist1',
            src: '../img/shoppingMallContentList/tt4-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기8',
            url: 'https:www.google.com14',
            src: '../img/shoppingMallContentList/tt4-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기9',
            url: 'https:www.google.com15',
            src: '../img/shoppingMallContentList/tt4-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
        ],
      },
      {
        mallContentList: [{ //MALL TOP
            title: '미니선풍기',
            url: 'https:www.google.com1',
            src: '../img/shoppingMallContentList/tt5-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com2',
            src: '../img/shoppingMallContentList/tt5-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com3',
            src: '../img/shoppingMallContentList/tt5-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com4',
            src: '../img/shoppingMallContentList/tt5-4.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com5',
            src: '../img/shoppingMallContentList/tt5-5.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com6',
            src: '../img/shoppingMallContentList/tt5-6.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL 1
            title: '미니선풍기',
            url: 'https:www.google.com7/malllist2',
            src: '../img/shoppingMallContentList/tt6-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/tt6-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/tt6-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL 2
            title: '미니선풍기',
            url: 'https:www.google.com10/malllist2',
            src: '../img/shoppingMallContentList/tt7-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com11',
            src: '../img/shoppingMallContentList/tt7-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com12',
            src: '../img/shoppingMallContentList/tt7-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL3
            title: '미니선풍기',
            url: 'https:www.google.com13/malllist2',
            src: '../img/shoppingMallContentList/tt8-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com14',
            src: '../img/shoppingMallContentList/tt8-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com15',
            src: '../img/shoppingMallContentList/tt8-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
        ],
      },
      {
        mallContentList: [{ //MALL TOP
            title: '미니선풍기',
            url: 'https:www.google.com1',
            src: '../img/shoppingMallContentList/tt9-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com2',
            src: '../img/shoppingMallContentList/tt9-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com3',
            src: '../img/shoppingMallContentList/tt9-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com4',
            src: '../img/shoppingMallContentList/tt9-4.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com5',
            src: '../img/shoppingMallContentList/tt9-5.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com6',
            src: '../img/shoppingMallContentList/tt9-6.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL 1
            title: '미니선풍기',
            url: 'https:www.google.com7malllist3',
            src: '../img/shoppingMallContentList/tt10-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/tt10-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/tt10-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL 2
            title: '미니선풍기',
            url: 'https:www.google.com10/com7malllist3',
            src: '../img/shoppingMallContentList/tt11-1.gif',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com11/',
            src: '../img/shoppingMallContentList/tt11-2.gif',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com12',
            src: '../img/shoppingMallContentList/tt11-3.gif',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL3
            title: '미니선풍기',
            url: 'https:www.google.com13/com7malllist3',
            src: '../img/shoppingMallContentList/tt12-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com14',
            src: '../img/shoppingMallContentList/tt12-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com15',
            src: '../img/shoppingMallContentList/tt12-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
        ]
      },
      {
        mallContentList: [{ //MALL TOP
            title: '립컬러',
            url: 'https:www.google.com1',
            src: '../img/shoppingMallContentList/tt1-1.jpg',
            text1: '나만 알고싶은',
            text2: '너무예쁜 립컬러',
          },
          {
            title: '홍콩 제니쿠키',
            url: 'https:www.google.com2',
            src: '../img/shoppingMallContentList/tt1-2.jpg',
            text1: '줄 서서 먹는',
            text2: '홍콩 제니쿠키',
          },
          {
            title: '펄박스',
            url: 'https:www.google.com3',
            src: '../img/shoppingMallContentList/tt1-3.jpg',
            text1: '펄 좋아한다고?',
            text2: '주목! 너무예뻐~',
          },
          {
            title: '눈썹키트',
            url: 'https:www.google.com4',
            src: '../img/shoppingMallContentList/tt1-4.jpg',
            text1: '눈썹 그리지말고',
            text2: '자연스럽게 붙여',
          },
          {
            title: '화장품 패킷',
            url: 'https:www.google.com5',
            src: '../img/shoppingMallContentList/tt1-5.jpg',
            text1: '귀여워 소장할래',
            text2: '미니제품 포함!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com6',
            src: '../img/shoppingMallContentList/tt1-6.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL1
            title: '미니선풍기1',
            url: 'https:www.google.com7/malllist1',
            src: '../img/shoppingMallContentList/tt2-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기2',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/tt2-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기3',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/tt2-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL2
            title: '미니선풍기4',
            url: 'https:www.google.com10/malllist1',
            src: '../img/shoppingMallContentList/tt3-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기5',
            url: 'https:www.google.com11',
            src: '../img/shoppingMallContentList/tt3-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기6',
            url: 'https:www.google.com12',
            src: '../img/shoppingMallContentList/tt3-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL3
            title: '미니선풍기7',
            url: 'https:www.google.com13/malllist1',
            src: '../img/shoppingMallContentList/tt4-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기8',
            url: 'https:www.google.com14',
            src: '../img/shoppingMallContentList/tt4-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기9',
            url: 'https:www.google.com15',
            src: '../img/shoppingMallContentList/tt4-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
        ],
      },
      {
        mallContentList: [{ //MALL TOP
            title: '미니선풍기',
            url: 'https:www.google.com1',
            src: '../img/shoppingMallContentList/tt9-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com2',
            src: '../img/shoppingMallContentList/tt9-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com3',
            src: '../img/shoppingMallContentList/tt9-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com4',
            src: '../img/shoppingMallContentList/tt9-4.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com5',
            src: '../img/shoppingMallContentList/tt9-5.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com6',
            src: '../img/shoppingMallContentList/tt9-6.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL 1
            title: '미니선풍기',
            url: 'https:www.google.com7malllist3',
            src: '../img/shoppingMallContentList/tt10-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/tt10-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/tt10-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL 2
            title: '미니선풍기',
            url: 'https:www.google.com10/com7malllist3',
            src: '../img/shoppingMallContentList/tt11-1.gif',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com11/',
            src: '../img/shoppingMallContentList/tt11-2.gif',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com12',
            src: '../img/shoppingMallContentList/tt11-3.gif',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          { //MALL3
            title: '미니선풍기',
            url: 'https:www.google.com13/com7malllist3',
            src: '../img/shoppingMallContentList/tt12-1.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com14',
            src: '../img/shoppingMallContentList/tt12-2.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
          {
            title: '미니선풍기',
            url: 'https:www.google.com15',
            src: '../img/shoppingMallContentList/tt12-3.jpg',
            text1: '날개없는 선풍기',
            text2: '풍속짱! 휴대용!',
          },
        ]
      },
      {
        mallTextList: [{
            text: '매일 달라지는 상품과 혜택! 오늘의 특가',
            url: 'https:www.godgoogle.com/1',
          },
          {
            text: '바쁜 내 남자를 위한 올인원 4종 UP TO 51%',
            url: 'https:www.godgoogle.com/2',
          },
          {
            text: '홈데이몰 핫딜로 한방에 OK! 망설이면 후회',
            url: 'https:www.godgoogle.com/3',
          },
          {
            text: '매일 달라지는 상품과 혜택! 오늘의 특가',
            url: 'https:www.godgoogle.com/1',
          },
          {
            text: '바쁜 내 남자를 위한 올인원 4종 UP TO 51%',
            url: 'https:www.godgoogle.com/2',
          },
        ]
      },
      {
        mallTitleList: [{
            title: '올리브영',
            url: 'https:www.google.com1',
            src: '../img/shoppingMallContentList/title/tt1.gif',
            id: 'mall_title1',
          },
          {
            title: '퍼플',
            url: 'https:www.google.com2',
            src: '../img/shoppingMallContentList/title/tt2.gif',
            id: 'mall_title2',
          },
          {
            title: '한샘몰',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/title/tt8.gif',
            id: 'mall_title8',
          },
          {
            title: 'NAIN',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/title/tt9.gif',
            id: 'mall_title9',
          },
          {
            title: 'WBSKIN',
            url: 'https:www.google.com3',
            src: '../img/shoppingMallContentList/title/tt3.gif',
            id: 'mall_title3',
          },
          {
            title: 'MOMEDAYMALL',
            url: 'https:www.google.com4',
            src: '../img/shoppingMallContentList/title/tt4.gif',
            id: 'mall_title4',
          },
          {
            title: 'SINBIANG',
            url: 'https:www.google.com5',
            src: '../img/shoppingMallContentList/title/tt5.gif',
            id: 'mall_title5',
          },
          {
            title: '실리쿨',
            url: 'https:www.google.com6',
            src: '../img/shoppingMallContentList/title/tt6.gif',
            id: 'mall_title6',
          },
          {
            title: '카멜브라운',
            url: 'https:www.google.com7',
            src: '../img/shoppingMallContentList/title/tt7.gif',
            id: 'mall_title7',
          },
          {
            title: '한샘몰',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/title/tt8.gif',
            id: 'mall_title8',
          },
          {
            title: 'NAIN',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/title/tt9.gif',
            id: 'mall_title9',
          },
          {
            title: 'WIZWID',
            url: 'https:www.google.com10',
            src: '../img/shoppingMallContentList/title/tt10.gif',
            id: 'mall_title10',
          },
          {
            title: '그녀희제',
            url: 'https:www.google.com11',
            src: '../img/shoppingMallContentList/title/tt11.gif',
            id: 'mall_title11',
          },
          {
            title: 'UPDOWN SHOP',
            url: 'https:www.google.com12',
            src: '../img/shoppingMallContentList/title/tt12.gif',
            id: 'mall_title12',
          },
          {
            title: '한샘몰',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/title/tt8.gif',
            id: 'mall_title8',
          },
          {
            title: 'NAIN',
            url: 'https:www.google.com9',
            src: '../img/shoppingMallContentList/title/tt9.gif',
            id: 'mall_title9',
          },
          {
            title: '실리쿨',
            url: 'https:www.google.com6',
            src: '../img/shoppingMallContentList/title/tt6.gif',
            id: 'mall_title6',
          },
          {
            title: '카멜브라운',
            url: 'https:www.google.com7',
            src: '../img/shoppingMallContentList/title/tt7.gif',
            id: 'mall_title7',
          },
          {
            title: '한샘몰',
            url: 'https:www.google.com8',
            src: '../img/shoppingMallContentList/title/tt8.gif',
            id: 'mall_title8',
          },
        ]
      },
    ]

    let mallPaging = 0;
    mallPagingMount.innerHTML = '/' + (mallContentList.length - 2);
    mallPagingBox.addEventListener('click', function (e) {
      e.preventDefault();
      let mallpageMount = mallContentList.length - 2
      if (e.target.id == 'mallPrevBt') {
        (mallPaging < 1) ? mallPaging = mallpageMount - 1: mallPaging--;
      } else if (e.target.id == 'mallNextBt') {
        (mallPaging >= mallpageMount - 1) ? mallPaging = 0: mallPaging++;
      }
      mallCurrentPaging.innerHTML = mallPaging + 1;
      mallContentFunc();
      return;
    })


    //mallContentBox
    function mallContentFunc() {
      mallContentBox.innerHTML = '';
      let ul = document.createElement('ul');

      function mallTitleFunc() {
        let div = document.createElement('div');
        let a = document.createElement('a');
        let img = document.createElement('img');
        let spanParent = document.createElement('span');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');

        ul.classList.add('mall_title_ul');
        div.classList.add('mall_title_link');
        img.classList.add('mall_title_img');
        spanParent.classList.add('mall_nowlink_box');

        a.href = mallContentList[mallContentList.length - 1].mallTitleList[mallPaging].url;
        img.src = mallContentList[mallContentList.length - 1].mallTitleList[mallPaging].src;
        img.alt = mallContentList[mallContentList.length - 1].mallTitleList[mallPaging].title;

        span1.classList.add('mall_nowLink');
        span1.innerHTML = '바로가기';
        span2.innerHTML = '＞';

        spanParent.appendChild(span1);
        spanParent.appendChild(span2);

        a.appendChild(img);
        a.appendChild(spanParent);
        div.appendChild(a);
        mallContentBox.appendChild(div);
      }
      mallTitleFunc();

      function mallContentListFunc() {
        for (var cnt = 0; cnt < 6; cnt++) {
          let mallContentData = mallContentList[mallPaging].mallContentList[cnt];
          let listLi = document.createElement('li');
          let listA = document.createElement('a');
          let listImg = document.createElement('img');
          let listSpanParents = document.createElement('span');
          let listSpan1 = document.createElement('span');
          let listSpan2 = document.createElement('span');

          listLi.classList.add('mall_content_list');
          listImg.classList.add('mall_content_img');
          listSpanParents.classList.add('mall_text_box');

          listA.href = mallContentData.url;
          listImg.src = mallContentData.src;
          listImg.alt = mallContentData.title;

          listSpan1.innerHTML = mallContentData.text1;
          listSpan2.innerHTML = mallContentData.text2;

          listSpanParents.appendChild(listSpan1);
          listSpanParents.appendChild(listSpan2);

          listA.appendChild(listImg);
          listA.appendChild(listSpanParents);
          listLi.appendChild(listA);
          ul.appendChild(listLi);
          mallContentBox.appendChild(ul);
        }
      }
      mallContentListFunc();

      //mattBanner
      const shopMallBanner = document.getElementById('shopMallBanner');
      let malllistCnt = 0;

      function mallBannerFunc() {
        shopMallBanner.innerHTML = ''
        //mallTextBanner
        function mallTextBannerFunc() {
          let div = document.createElement('div');
          let a = document.createElement('a');
          let span1Parent = document.createElement('span');
          let span1 = document.createElement('span');
          let span2 = document.createElement('span');

          div.classList.add('mall_sale_box');
          span1Parent.classList.add('mall_sale_icon');
          span1.classList.add('blind');
          span2.classList.add('mall_sale_anchor');
          span2.innerHTML = mallContentList[mallContentList.length - 2].mallTextList[mallPaging].text;
          span1.innerHTML = 'sale';
          a.href = mallContentList[mallContentList.length - 2].mallTextList[mallPaging].url;

          span1Parent.appendChild(span1);
          a.appendChild(span1Parent);
          a.appendChild(span2);
          div.appendChild(a);
          shopMallBanner.appendChild(div)

          return;
        }
        mallTextBannerFunc();

        for (let mallTitleCnt = 0; mallTitleCnt < 3; mallTitleCnt++) {
          let mallTitleData = mallContentList[mallContentList.length - 1].mallTitleList[mallTitleCnt + 3 + (mallPaging * 3)];
          let divParents = document.createElement('div');
          let div = document.createElement('div');
          let a = document.createElement('a');
          let img = document.createElement('img');
          let spanParent = document.createElement('span');
          let span1 = document.createElement('span');
          let span2 = document.createElement('span');
          let mallBannerUl = document.createElement('ul');

          mallBannerUl.classList.add('mall_title_ul');
          divParents.classList.add('mall_bx');
          div.classList.add('mall_title_link');
          img.classList.add('mall_title_img');
          spanParent.classList.add('mall_nowlink_box');
          span1.classList.add('mall_nowLink');
          ul.classList.add('mall_title_ul')

          a.href = mallTitleData.url;
          img.src = mallTitleData.src;
          img.alt = mallTitleData.title;

          span1.innerHTML = '바로가기';
          span2.innerHTML = '＞';

          spanParent.appendChild(span1);
          spanParent.appendChild(span2);
          a.appendChild(img);
          a.appendChild(spanParent);
          div.appendChild(a);
          divParents.appendChild(div);

          shopMallBanner.appendChild(divParents);
          shopMallBanner.appendChild(mallBannerUl);

          function mallBannerContCnt() {
            for (let mallBannerContCnt = 0; mallBannerContCnt < 3; mallBannerContCnt++) {
              let mallBannerListData = mallContentList[mallPaging].mallContentList[(malllistCnt + 6)];
              malllistCnt++;
              let mallBannerLi = document.createElement('li');
              let mallBannerA = document.createElement('a');
              let mallBannerimg = document.createElement('img');
              let mallBannerSpanParent = document.createElement('span');
              let mallBannerSpan1 = document.createElement('span');
              let mallBannerSpan2 = document.createElement('span');

              mallBannerLi.classList.add('mall_content_list');
              mallBannerimg.classList.add('mall_content_img');
              mallBannerSpanParent.classList.add('mall_text_box');
              mallBannerSpan1.classList.add('mall_tx_span');

              mallBannerA.href = mallBannerListData.url;
              mallBannerimg.src = mallBannerListData.src;
              mallBannerimg.alt = mallBannerListData.title;
              mallBannerSpan1.innerHTML = mallBannerListData.text1;
              mallBannerSpan2.innerHTML = mallBannerListData.text2;

              mallBannerSpanParent.appendChild(mallBannerSpan1);
              mallBannerSpanParent.appendChild(mallBannerSpan2);

              mallBannerA.appendChild(mallBannerimg);
              mallBannerA.appendChild(mallBannerSpanParent);
              mallBannerLi.appendChild(mallBannerA);

              mallBannerUl.appendChild(mallBannerLi);
            }

            return;
          }
          mallBannerContCnt();
        }
        return
      }
      mallBannerFunc();
      return;
    }
    mallContentFunc();
  }
  shoppingBoxFunc();
}) //load