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
