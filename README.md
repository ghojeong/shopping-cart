# shopping-cart

E-commerce website with shopping-cart

## 프로젝트 실행법

`git clone https://github.com/ghojeong/shopping-cart.git`

`cd ./shopping-cart`

`npm i`

`npm start`

## Directory Structure

```
└── src
    ├── actions
    ├── assets
    ├── components
    ├── epics
    ├── lib
    ├── models
    ├── pages
    ├── reducers
    ├── routes
    ├── scss
    ├── selectors
    └── services
```

- actions
  - [리덕스 액션](https://redux.js.org/basics/actions)을 정의해 놓은 디렉토리
- assets
  - 프로그램에 사용되는 정적인 데이터들이 있는 파일들이 있는 디렉토리
- components
  - [리액트 컴포넌트](https://ko.reactjs.org/docs/components-and-props.html)를 모아놓은 디렉토리
- epics
  - [redux-observable의 에픽](https://redux-observable.js.org/docs/basics/Epics.html)을 정의해 놓은 디렉토리
- lib
  - 나중에 모듈로 분리할 필요가 있는 로직을 정리한 디렉토리
- models
  - DTO에 사용되는 데이터 모델들을 정의해 놓은 디렉토리
  - 지금은 interface 로 정의되어 있지만, instance 를 직접 만들고 수정할 필요가 있을 경우 class 로 만들 수도 있다.
- pages
  - 웹 페이지를 모아놓은 디렉토리
  - [Next.js 의 pages](https://nextjs.org/docs/basic-features/pages)를 미약하게 흉내내서 이름지은 디렉토리명이다.
- reducers
  - [리덕스 리듀서](https://redux.js.org/basics/reducers)를 정의해 놓은 디렉토리
- routes
  - `pages`에 정의된 페이지로 이동할 수 있도록, 라우팅과 관련한 것들을 모아놓은 디렉토리
- scss
  - scss 파일들을 모아놓은 디렉토리
  - 스타일링은 전부 scss 에서 할 수 있도록 강제한다.
- selectors
  - store 에서 데이터를 가져오는 [selector](https://react-redux.js.org/next/api/hooks#useselector) 를 정의한 디렉토리
  - react-redux 라이브러리의 useSelector 훅을 사용하기 위한 selector 함수들을 모아놓은 디렉토리이다.
- services
  - [MVC 패턴의 service](https://pjh3749.tistory.com/89)
  - 싱글톤 패턴에 따라 하나의 인스턴스로 http 통신을 함
