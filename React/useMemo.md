# **useMemo**

`useMemo`는 리액트에서 렌더링 최적화에 필요한 React Hook으로 이름에서 알 수 있듯이 memoization의 특징을 갖는다.

memoization이란 쉽게 얘기하면, 이미 연산이 되어있는 값을 메모리에 저장해두고 꺼내어 쓰는 것을 말한다.

기본적으로 리액트 컴포넌트는 state가 변경되거나, 부모 컴포넌트로 부터 받은 props가 변경이 되면 리렌더링이 일어난다.

또한, 자식 컴포넌트는 부모 컴포넌트가 리렌더링되면 따라서 리렌더링이 된다. 이러한 문제를 막아주는 것이 `useMemo`의 특징이다.

그럼, 예시를 통해 `useMemo`의 쓰임을 알아보자.

### **useMemo 사용방법**

우선 react 내부에 존재하는 `useMemo`를 import 하는 것이 최우선이다.

```jsx
import React, { useMemo } from "react";

function App() {
  /*-----내부코드-----*/
  return()
}
```

위와 같이 `useMemo`를 import 해주면 이제 `useMemo`를 사용할 수 있게 된다.

```jsx
import { useState, useMemo } from "react";

const getValue = (value) => {
  console.log("숫자가 변경되었습니다.");
  return value;
};

const getText = (text) => {
  console.log("텍스트가 변경되었습니다.");
  return text;
};

function ChildApp({ value, text }) {
  const justValue = getValue(value);
  const justText = getText(text);
  return (
    <div>
      <p>{justValue}</p>
      <p>{justText}</p>
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  const onValueChange = () => {
    setValue((prev) => prev + 1);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={text} onChange={onTextChange} />
      <button onClick={onValueChange}>+</button>
      <ChildApp value={value} text={text} />
    </div>
  );
}

export default App;
```

위의 예제를 살펴보면 state인 `value`와 `text`를 자식 컴포넌트에게 props로 전달하고 있다. 이 때, state가 변경될 때 마다 부모컴포넌트는 리렌더링이 일어나고, 그에 따라서 자식 컴포넌트도 리렌더링이 일어난다.

하지만, 위의 예시는 어느 하나의 state만 변경되었을 때도 컴포넌트 내의 모든 것이 리렌더링이 된다는 문제가 발생한다.

결과적으로 위의 예시는 `value`만 변경되거나 `text`만 변경되었음에도 콘솔에 '숫자가 변경되었습니다.'와 '텍스트가 변경되었습니다.'가 모두 출력된다.

이 때, `useMemo`를 사용해보자.

```jsx
import { useState, useMemo } from "react";

const getValue = (value) => {
  console.log("숫자가 변경되었습니다.");
  return value;
};

const getText = (text) => {
  console.log("텍스트가 변경되었습니다.");
  return text;
};

function ChildApp({ value, text }) {
  const justValue = useMemo(() => getValue(value), [value]);
  const justText = useMemo(() => getText(text), [text]);
  return (
    <div>
      <p>{justValue}</p>
      <p>{justText}</p>
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);
  const [text, setText] = useState("");

  const onValueChange = () => {
    setValue((prev) => prev + 1);
  };

  const onTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="App">
      <input type="text" value={text} onChange={onTextChange} />
      <button onClick={onValueChange}>+</button>
      <ChildApp value={value} text={text} />
    </div>
  );
}

export default App;
```

위의 예시 처럼 dependency에 해당하는 특정 값이 변화하지 않는다면 memoization된 값을 계속 가지고 있고, 이 때 리렌더링에서 제외된다. dependency가 변화하면 그 때, 새로 memoization된 값을 저장한다. 이 떄는 리렌더링에 포함된다.

사실 memoization 자체가 메모리를 소비하는 행위고, 비용이 크기때문에 값을 반환하는데 굉장히 비싼 연산이 필요한 경우를 잘 판단해서 사용하는 것이 중요하다.
