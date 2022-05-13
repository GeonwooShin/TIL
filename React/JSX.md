## **JSX**

JSX는 자바스크립트와 XML을 추가한 문법으로 자바스크립트의 확장 문법이다.

JSX는 자바스크립트 트랜스파일러인 Babel을 필요로하는데, Babel은 일반적인 자바스크립트 문법이 아닌 JSX를 자바스크립트 문법으로 변환시켜준다.

```js
import React from "react";

function App() {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Hello")
  );
}
```

```js
function App() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
```

두 번째 예시는 JSX로 작성한 문법이고, Babel을 통해 첫 번째 예시와 같이 변환된다.

만약에 더 복잡한 형태라면 `React.createElement`를 남발해야하고, 가독성도 좋지않다.

따라서, 컴포넌트를 개발하는데 있어서 필요한 HTML요소를 JSX는 가독성도 높고 쉽게 개발할 수 있는 환경을 만들어 준다.

이 때, JSX를 Babel을 통해 제대로 자바스크립트 형태로 변환하기 위해서는 몇가지 규칙을 따라야 한다.

---

## **JSX 문법**

### **1. 태그 닫힘**

```js
function App() {
  return (
    <div>
      <h1>Hello</h1>
      <div>
    </div>
  );
}
```

위와 같이 태그가 닫히지 않는다면 에러가 발생하기 때문에 태그를 열었다면 항상 닫아주어야 한다.

예를 들어, `<div>`로 태그를 열었다면 `</div>`로 태그를 닫아주어야 한다.

이 때, 태그를 엶과 동시에 닫는 태그 즉, `<input>` 과 같은 태그는 self closing을 통해 `<input />`과 같이 닫아주어야 한다.

### **2. 태그 감싸기**

JSX 문법으로는 가상 DOM에서 컴포넌트는 하나의 DOM 트리 구조로 이루어져야 하기 때문에 여러 개의 태그가 존재한다면 반드시 하나의 부모 태그로 감싸주어야 한다.

```js
function App() {
  return (
    <div>Hello</div>
    <h1>JSX</h1>
  )
}
```

위의 예시는 하나의 부모 태그로 감싸주지 않았기 때문에 에러가 발생한다. 그렇다면 위의 예시를 JSX 문법을 준수해서 표현한다면 다음과 같은 몇가지 방법이 존재한다.
