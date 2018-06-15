# Gulp file structure bulid Platform
I have made the Gulp build a platform that is difficult to write each time.
## Motivation

## Build status

Git : [https://git-scm.com/][1]

npm install

NodeJS : [https://nodejs.org/ko][2]

IDE or Editor Download


## Members
+ phantom05

## Tech/framework used
Ex.- npm
### Built with
```
npm i gulp-concat gulp-uglify gulp-minify-html gulp-sass gulp-babel gulp-imagemin gulp-uglifycss gulp-livereload gulp-rename gulp-watch gulp-webserver babel-core babel-preset-env gulp-rename -D
```

## Features
+ GNB, LNB, SNB, RNB Menu
  + Toggle Menu
  + Accordion
  + Button Menu
+ Slide
  + Dot Slide
  + Button Slide
  + both Slide
+ Rolling Slide
  + Same _Slide
+ Loading Bar
+ Drag Implement
+ Modal

## Installation
```javascript
git clone or Download https://github.com/FrontPublisher-WeekStudy/refo

File creation

$ cd yourfile

$ npm init

npm i -D gulp

$ npm i gulp-concat gulp-uglify gulp-minify-html gulp-sass gulp-babel gulp-imagemin gulp-uglifycss gulp-livereload gulp-rename gulp-watch gulp-webserver -D

//Edit Files
$ gulp

```

## API Reference
Use it if you need JQuery.
```javascript
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
```
## How to use?
1.  Install node.js 
2. Clone or Download -> -> asset-> index.html

## Contribute
+ phantom05

## Credits
+ [Phantom05][0]

## Directory structure

<pre>
┌── .git
├── public                                     # 모든 파일이 들어갈 폴더
│   ├── dist                                   # src에서 컴파일 된 파일들이 들어갈 폴더
│   │   ├── index.html                         # 전체 파일 관리 폴더
│   │   ├── css                                # Scss 컴파일링 후 변경된 css파일 폴더
│   │   │   ├── base                            # 선언해둘 css파일의 base 폴더
│   │   │   │   ├── common.css                  # src 폴더 에서 컴파일 된 reset Css파일
│   │   │   │   ├── font.css                    # src 폴더 에서 컴파일 된 font Css파일
│   │   │   │   └── react.css                   # src 폴더 에서 컴파일 된 react Css파일
│   │   │   ├── component                       # 컴포넌트로 사용할 Scss파일 폴더
│   │   │   │   ├── footer.css                  # src 폴더 에서 컴파일 된 footer Scss파일
│   │   │   │   ├── form.css                    # src 폴더 에서 컴파일 된 form Scss파일
│   │   │   │   ├── header.css                  # src 폴더 에서 컴파일 된 header Scss파일
│   │   │   │   └── main.css                    # src 폴더 에서 컴파일 된 main Scss파일
│   │   │   ├── lib                             # 라이브러리 폴더
│   │   │   └── modules                         # Scss 함수식 및 모듈로 사용할 폴더
│   │   │       └── mixin.css                   # src 폴더 에서 컴파일 된 mixin css 파일
│   │   ├── img                                # src 폴더 에서 컴파일 된 img파일들을 넣을 폴더
│   │   │   └── 200937431.jpg                  # src 폴더 에서 컴파일 된 img파일들
│   │   ├── js                                 # Babel 트렌스파일링 후 변경된 JS파일 폴더
│   │   │   ├── script.js                      # src 폴더 에서 컴파일 된 Script 파일
│   │   │   │       
│   │   │   └── component                      # 컴포넌트로 사용할 css파일 폴더
│   │   │       ├── index.js                   # src 폴더 에서 트렌스파일 된 js 파일
│   │   │       └── sub.js                     # src 폴더 에서 트렌스파일 된 js 파일
│   │   └─ min     
│   │      ├── common.min.css                  # reset css파일을 min파일로 변환 시킨 파일
│   │      ├── font.min.css                    # 컴파일된 css를 min파일로 변환(최종 적용 파일)
│   │      ├── footer.min.css                  # 컴파일된 css를 min파일로 변환(최종 적용 파일)
│   │      ├── form.min.css                    # 컴파일된 css를 min파일로 변환(최종 적용 파일)
│   │      ├── header.min.css                  # 컴파일된 css를 min파일로 변환(최종 적용 파일)
│   │      ├── main.min.css                    # 컴파일된 css를 min파일로 변환(최종 적용 파일)
│   │      ├── mixin.min.css                   # 컴파일된 css를 min파일로 변환(최종 적용 파일)
│   │      ├── react.min.css                   # 컴파일된 css를 min파일로 변환(최종 적용 파일)
│   │      └── script.min.js                   # index.html에 적용될 JS min파일(모든 js concat 후 uglify)
│   ├─ lib                                     # 라이브러리 폴더
│   └─ src                                     # 작업하여 저장할 src 폴더
│      ├── index.html                          # index.html 파일
│      │       
│      ├── img                                 # 작성할 때 사용할 img 폴더
│      │   ├── 200937431.jpg                   # 사용할 image들
│      ├── js                                  # 작성 대 사용할 js폴더
│      │   ├── index.js                        # 메인으로 사용할 js파일
│      │   │       
│      │   └─components                        # js 작성시 사용 할 컴포넌트 폴더
│      │          sub.js                       # 컴포넌트로 사용할 js 파일
│      └── sass                                # 작성할 Scss 파일의 폴더
│          ├── base                            # 선언해둘 Scss파일의 base 폴더
│          │   ├── common.scss                 # reset Scss파일
│          │   ├── font.scss                   # font Scss파일
│          │   └── react.scss                  # react Scss파일
│          ├── component                       # 컴포넌트로 사용할 Scss파일 폴더
│          │   ├── footer.scss                 # footer Scss파일
│          │   ├── form.scss                   # form Scss파일
│          │   ├── header.scss                 # header Scss파일
│          │   └── main.scss                   # main Scss파일
│          ├── lib                             # 라이브러리 폴더
│          └── modules                         # Scss 함수식 및 모듈로 사용할 폴더
│              └── mixin.scss                  # mixin Scss 파일
├── node_modules                               # Node Packages 모듈
├── .babelrc                                   # babel 의존성 파일
├── package.json                               # Node Packages 모듈
├── package-lock.json                          # Node Packages 모듈
└── README.md                                  # 설명 및 가이드
</pre>

## License
A short snippet describing the license (MIT, Apache etc)

MIT © [Phantom05][0]

[0]:https://github.com/Phantom05
[1]:https://git-scm.com/
[2]:https://nodejs.org/ko