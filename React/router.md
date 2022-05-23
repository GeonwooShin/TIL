# **리액트 라우터**

기본적으로 라우팅이라는 것은 사용자가 요청한 URL에 따라 해당 화면을 보여주는 것으로 이해할 수 있다.

리액트는 **SPA**이기 때문에 전체 페이지를 하나의 페이지에 담아 동적으로 화면 변경이 일어나는데 리액트에서는 이 라우팅을 다양한 라이브러리를 통해 처리할 수 있다.

다양한 라이브러리 중 `react-router-dom`이라는 라이브러리를 사용해보자.

### **라이브러리 설치**

```
$ npm i react-router-dom
```

**현재 기준 react-router-dom 최신 버전인 6버전으로 설명**

---

### **react-router-dom 사용방법**

`react-router-dom` 라이브러리는 `BrowserRouter`과 `HashRouter`이 존재하는데 `BrowserRouter`은 HTML5의 history API를 사용하여 UI를 업데이트 하고, 이는 페이지를 새로고침 하지 않아도 주소가 변경되기 떄문에 일반적으로 `BrowserRouter`를 사용하도록 한다.

`BrowserRouter`은 `react-router-dom`을 적용하고 싶은 컴포넌트의 최상위 컴포넌트를 감싸주는 래퍼 컴포넌트의 역할을 한다.

따라서, 우선 App.js 파일 내부에 `react-router-dom`에 내장되어있는 `BrowserRouter`을 import 한다.

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
  return <BrowserRouter></BrowserRouter>;
}
```

이제 라우팅을 사용 할 준비 단계는 끝이 났고, 라우팅을 할 페이지를 만들어보자.

일반적으로 라우팅 페이지로 사용할 컴포넌트는 `pages`라는 폴더에 관리하도록 한다.
