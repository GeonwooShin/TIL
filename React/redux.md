# **redux**

일반적으로 `redux + react`를 많이 쓰게되면서, 리덕스를 리액트 상태관리 라이브러리로 알고 있지만, 리덕스는 자바스크립트 상태관리 라이브러리이다.

하지만 나는 리액트에서 사용하는 `redux`를 전제로 설명을 시작하겠다.

그렇다면 일단 `redux`는 무엇을 위해 사용하는 것일까?

이 질문에 답하기 위해서는 우선적으로 `상태(state)`에 대해서 먼저 살펴보는 것이 좋겠다.

상태(state)라는 것은 쉽게 말해서 **컴포넌트 안에서 관리되는 데이터**를 뜻한다.

예를 한 번 들어보자. (함수형 컴포넌트)

```jsx
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  return <div>{value}</div>;
}
```

이제 위의 예시에서 함수형 컴포넌트 내부에서 상태(state)를 관리할 수 있게 되었다.

이 때, 어느 다른 컴포넌트에서 위의 해당 데이터를 필요로 한다면 어떻게 될까?

`react`는 `SPA`을 기반으로 하기 때문에 수 많은 컴포넌트가 존재할 것이고, 어느 한 컴포넌트에서 관리하는 데이터를 다른 컴포넌트에서 조작하기 위해서는 `props`로 해당 `상태(state)`를 전달받아야 하기 때문에 굉장히 복잡해질 것이다.

이러한 문제점을 해결하기 위해서 사용하는 것이 바로 `redux`이다. 또한 리덕스를 통해 상태를 안정적으로 관리하기 위해서는 다음과 같은 규칙을 따라야 한다.

### **리덕스 규칙**

1. **단일 스토어 사용을 권장한다.**

- 애플리케이션의 디버깅을 원활하게 하고, 쉽게 클라이언트에서 데이터를 받아들일수 있도록 하나의 애플리케이션 안에서는 하나의 스토어만 사용한다.

2. **상태는 읽기 전용이어야 한다.**

- 상태를 변화 시키는 방법은 무조건 액션 단 하나만이 이용된다. 이를 통해 상태 변경에 대한 추적이 용이해진다.

3. **리듀서는 순수함수여야 한다.**

- redux는 `state` 객체의 주소를 비교하여 `state`의 변경을 감지한다. 변경 전 `state`와 변경 후 `state`를 비교할 수 있도록 기존 상태의 `state`를 변경하는 것이 아니라, 새로운 `state`를 만들어서 교체해야 한다. 기존 상태의 `state`를 변경한다면 `state` 객체의 주소는 동일하기 때문에 변경이 감지되지 않아 `state`가 변경되었다고 판단하지 않는다.

---

### **리덕스 개념**

![리덕스 흐름](https://kyun2da.dev/c98922b5a476e12b853576324f12f5c4/redux-data-flow.gif)

위의 그림은 리덕스의 흐름도인데, 기본적으로 리덕스의 개념은 다음과 같다.

1. 유저가 버튼을 클릭한다.
2. 버튼에 연결된 디스패치를 실행해 액션을 일으킨다.
3. 스토어는 이전 상태와 현재 액션으로 리듀서 함수를 실행하고, 그 리턴 값을 새로운 상태로 저장한다.
4. 스토어는 스토어를 구독하고 있던 UI들에게 업데이트 사실을 알려준다.
5. 스토어의 데이터가 필요한 각각의 UI들은 데이터가 업데이트 되었는지 확인한다.
6. 데이터가 변경된 요소는 새 데이터로 강제로 리렌더링 된다.

이제 리덕스에 대해서 구체적으로 알아보도록 하자.

---

### **라이브러리 설치**

```
$ npm i redux
$ npm i react-redux
```

리덕스를 사용하기에는 `redux`만 설치해도 충분하지만, 리액트에서 리덕스를 사용하기 위해서는 `react-redux`도 설치해주어야 한다.

---

### **리덕스 기본 개념**

![리덕스 기본 개념](https://image.toast.com/aaaabcy/post/1598521393339redux.png)

리덕스가 상태를 관리하는 과정은 다음과 같다. 순서대로 리덕스 예제를 만들어 보면서 하나하나가 무엇을 의미하는지 알아보자.

1. **Store**

스토어는 앱에 단 하나만 존재하는 것으로, state를 저장해 놓는 곳이다. 스토어는 다음과 같이 생성할 수 있다.

```jsx
import { createStore } from "redux";

const store = createStore(리듀서);

export default store;
```

위와 같이 생성한 스토어의 인자로는 리듀서 함수가 들어와야 한다.

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

또한 해당 스토어를 프로젝트에 적용하기 위해서 `<Provider>`을 이용해 `store`를 적용시켜 주도록 한다.

2. **Action**

`Action`은 상태의 변화가 필요할 때 발생시키는 것으로 `Action`은 하나의 객체로 표현된다.

이 때, 다른 컴포넌트에서 액션을 쉽게 발생시키기 위해서 액션 생성 함수를 만들어서 사용한다.

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

위의 액션 생성자함수의 객체들은 `type` 필드를 반드시 가져야 하고, 필요에 따라 다른 데이터도 넣을 수 있다.

이제 리듀서를 만들어보자.

3. **Reducer**

리듀서는 액션의 `type`에 따라 그에 맞는 변화를 일으키는 함수이다. 첫 번째 인자로는 초기 상태 값을, 두 번째 인자로는 전달 받은 액션 객체를 받는다.

```jsx
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNT:
      return { ...state, number: state.number + 1 };
    case MINUS_COUNT:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
};
```

4. **Dispatch**

리듀서로 액션 객체가 전해질 수 있는 방법은 `dispatch`를 사용하는 것이다.

`dispatch`는 스토어의 내장함수이고 액션을 발생시키는 것이다. 이 함수가 호출되면 스토어는 리듀서 함수를 실행시켜서 새로운 상태를 만들어 준다.

```jsx
<button onClick={() => {store.dispach(addCount())}}>더하기</button>
<button onClick={() => {store.dispach(minusCount())}}>빼기</button>
```

5. **subscribe**

`subscribe` 또한 스토어의 내장 함수이고, 함수가 매개변수로 들어간다. 일반적으로 `subscribe`는 변화를 감지하기 하기 때문에 `action`이 `dispatch` 될 때 마다 매개변수인 함수가 실행된다.

```jsx
<button onClick={() => {store.dispach(addCount())}}>더하기</button>
<button onClick={() => {store.dispach(minusCount())}}>빼기</button>

store.subscribe(() => {
  console.log('변화 감지')
})
```

위와 같은 예제가 있다면, 더하기 버튼 또는 빼기 버튼을 클릭할 때마다 `subscribe`는 매개변수로 들어온 함수를 실행하게 되는 것이다.
