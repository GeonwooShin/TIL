## **JSX**

JSX는 자바스크립트와 XML을 추가한 문법으로 자바스크립트의 확장 문법이다.

JSX는 자바스크립트 트랜스파일러인 Babel을 필요로하는데, [Babel](https://github.com/GeonwooShin/TIL/blob/master/Tools/babel.md)은 일반적인 자바스크립트 문법이 아닌 JSX를 자바스크립트 문법으로 변환시켜주는 역할을 수행할 수 있다.

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
import React from "react";

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
import React from "react";

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
import React from "react";

function App() {
  return (
    <div>Hello</div>
    <h1>JSX</h1>
  )
}
```

위의 예시는 하나의 부모 태그로 감싸주지 않았기 때문에 에러가 발생한다. 그렇다면 위의 예시를 JSX 문법을 준수해서 표현한다면 다음과 같은 몇가지 방법이 존재한다.

### **방법 1**

```js
import React from "react";

function App() {
  return (
    <div>
      <div>Hello</div>
      <h1>JSX</h1>
    </div>
  );
}
```

위의 예시는 여러개의 태그를 하나의 부모 태그로 감싸주었기 때문에 JSX 문법에 어긋나지 않는다.

### **방법 2**

```js
import React from "react";

function App() {
  return (
    <Fragment>
      <div>Hello</div>
      <h1>JSX</h1>
    </Fragment>
  );
}
```

만약 단순하게 부모 태그로 감싸주기 위해서 <div>와 같이 의미가 없는 태그를 사용한다면 DOM 트리에 의도치않게 `<div>` 태그가 삽입되는 상황이 발생할 수 있다. 따라서 위와 같이 리액트의 `Fragment`로 부모 태그와 같은 역할을 수행하도록 하면서 DOM 트리에는 삽입되지않게 하는 것이 가능하다.

### **방법 3**

```js
import React from "react";

function App() {
  return (
    <>
      <div>Hello</div>
      <h1>JSX</h1>
    </>
  );
}
```

`Fragment` 태그는 위와 같이 `<></>`로 대체가 가능하다.

---

## **JSX내 자바스크립트 표현식**

JSX 내부에서 자바스크립트 문법을 사용하기 위해서는 `{}` 중괄호가 필요하다.

다음 예제를 살펴보자.

```js
import React from "react";

const users = ["Thomas", "Lexi", "Bryan"];

function App() {
  return (
    <>
      <h1>UserNames</h1>
      {users.map((user) => (
        <li>{user}</li>
      ))}
    </>
  );
}
```

위의 예제에서는 `{}` 내부에서 자바스크립트 문법을 사용하여 배열 `users`를 map으로 순회함으로써 `<li>` 태그로 배열의 각 요소를 리턴하고 있다.

또한, 조건을 통한 렌더링이 필요할 때는 JSX 외부에서 if문을 사용하거나 JSX 내부에서는 조건부 연산자를 사용하도록 한다.

```js
import React from "react";

function App() {
  const name = "Thomas";
  return (
    <>
      {name === "Thomas" ? (
        <p>저의 이름은 Thomas입니다.</p>
      ) : (
        <p>저의 이름은 Thomas가 아닙니다.</p>
      )}
    </>
  );
}
```

위와 같이 조건에 따라 렌더링이 되는 것을 볼 수 있다.

```js
import React from "react";

function App() {
  const name = "Thomas";
  return <>{name === "Thomas" && <p>저의 이름은 Thomas 입니다.</p>}</>;
}
```

또한, 삼항연잔자를 사용할수있다.

```js
import React from "react";

function App() {
  const name = "Thomas";
  return (
    <>
      {(() => {
        if (name === "Thomas") {
          return <p>저의 이름은 Thomas 입니다.</p>;
        } else {
          return <p>저의 이름은 Thomas가 아닙니다.</p>;
        }
      })()}
    </>
  );
}
```

만약에, JSX 내부에서 if문을 사용하고 싶다면, 위 예시와 같이 즉시실행함수를 통해 사용하는 것이 가능하다.

---

JSX 내부에서는 HTML 어트리뷰트를 camelCase로 작성해야한다.

```js
import React from "react";

function App() {
  return (
    <div>
      <h1 style={{ backgroundColor: "yellow" }}>HELLO</h1>
    </div>
  );
}
```

또한 HTML 내부에서 사용하는 어트리뷰트 `class`는 JSX 내부에서는 `className`으로 사용한다.

```js
import React from "react";

function App() {
  <div>
    <h1 className="greeting">HELLO</h1>
  </div>;
}
```
