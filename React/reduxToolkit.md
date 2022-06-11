# **redux toolkit**

상태관리를 담당하는 `redux`라는 것을 알아보았는데, 이 `redux`는 장점만이 있는 것이 아니라 단점도 존재한다.

효과적인 `redux`를 사용하기 위해서는 굉장히 다양한 추가적인 라이브러리를 설치해야 되는데 일반적으로 `redux`를 리액트 내에서 사용하기 위해 설치하는 `react-redux`, 불변성 유지를 위한 `immutable/immer`, 비동기 통신을 위한 `redux-thunk`, `redux-saga`, `redux-pender`과 같은 라이브러리가 추가적으로 설치된다.

따라서, 개발자 마다 취향이 다르기 때문에 이 라이브러리의 설치가 제 각각으로 이루어지는 문제로 이어질 수 있다.

또한, `redux`에서는 많은 양의 보일러 플레이트가 존재하고, 사용하는 액션과 리듀서들을 상태관리와 관련된 여러 컴포넌트에서 모두 바인딩 해주어야 하기 때문에 반복적인 코드 사용이 나타난다.

위와 같은 문제를 해결할 수 있는 방법으로는 `redux-toolkit`을 사용하는 것이다.

`redux-toolkit`을 사용하면 **리듀서, 액션 타입, 액션 생성함수, 초기 상태**를 하나의 함수로 선언하는 것이 가능하다. 또한, `redux`에서는 `state`를 변경하는 것이 아닌 새로운 `state`를 만들어 반환했지만, `redux-toolkit`의 `createReducer`와 `createSlice`는 이러한 `immer` 라이브러리를 내재하고 있기 때문에 `state`의 **직접 변경이 가능하다.**

이제 `redux-toolkit`의 사용 방법을 알아보자.

### **redux-toolkit 설치**

```
$ npm i @reduxjs/toolkit
```

### **store 생성**

기존 `redux`를 사용했을 때 스토어 생성은 `createStore`을 이용하여 진행했다.

`redux-toolkit`에서는 `configureStore`을 통해 스토어를 생성한다.

리덕스를 통해 개발을 진행할 때 편리한 디버깅을 위해 크롬 익스텐션인 `Redux DevTools`를 설치하는데

기존 `createStore`을 사용하는 경우 이 툴을 사용하기 위해서 `createStore` 인자로 다음과 같이 익스텐션을 추가해 주어야 했다.

```jsx
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

하지만 아래와 같이 리덕스 툴킷에서 `configureStore`을 통해 스토어를 생성하면 디폴트로 `Redux DevTools`을 제공한다.

```jsx
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: rootReducer });
```

이렇게 생성한 스토어를 리액트 애플리케이션에 연결해주자.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
```

### **createAction**

기존 `redux`에서는 액션을 생성하려면 아래와 같이 함수를 정의해야 했다.

```jsx
const ADD_COUNT = "ADD_COUNT";
const MINUS_COUNT = "MINUS_COUNT";

function addCount() {
  return {
    type: ADD_COUNT,
  };
}

function minusCount() {
  return {
    type: MINUS_COUNT,
  };
}
```

하지만 `redux-toolkit`에서는 `createAction` 함수를 통해 액션을 생성한다. 위의 액션을 `redux-toolkit`에서의 액션으로 정의한다면 다음과 같이 정의할 수 있다. 새

```jsx
import { createAction } from "@reduxjs/toolkit";

const addCount = createAction("ADD_COUNT");
const minusCount = createAction("MINUS_COUNT");

console.log(addCount());
console.log(minusCount());
```

훨씬 간결해진 것을 볼 수 있다. 위의 createAction 함수를 전달 받는 `addCount`와 `minusCount`를 콘솔에 다음과 같이 찍어보면 객체를 반환하는데 이 객체는 `type`과 `payload`를 가진다.

`type`은 `createAction` 함수에 넣어준 인자가 `type`이 되고, 해당 액션을 실행하면서 인자로 넣어준 것이 `payload`로 함께 전달되는 것이다.

이 액션을 가지고 리듀서를 정의해보자.

```jsx

```
