# **useRef**

자바스크립트에서는 `querySelector` 또는 `getElementById`와 같이 DOM을 선택하여 무언가를 처리해야 하는 경우가 있다. 이 때, 자바스크립트에서는 실제 DOM을 가지고 해당 일을 처리하는 것이지만, 리액트는 DOM을 추상화한 가상의 객체인 Virtual DOM을 가진다.

따라서, Virtual DOM을 가지는 리액트 내부에서 실제 DOM을 조작하는 `querySelector` 또는 `getElementById`를 사용한다면, 리액트 시스템을 벗어나게 된다.

결과적으로 리액트 내부에 존재하는 Virtual DOM을 조작하기 위해서는 리액트에서 제공하는 `useRef`를 사용해야한다는 것이다.

### **useRef 사용방법**

우선 react 내부에 존재하는 `useRef`를 import 해야한다.

```jsx
import React, { useRef } from "react";

function App() {
  /*-----내부코드-----*/
  return()
}
```

위와 같이 `useRef`를 import 해주면 이제 `useRef`를 사용할 수 있게 된다.

```jsx
import React, { useState, useRef } from "react";

export default function Example() {
  const [user, setUser] = useState([]);
  const inputRef = useRef();

  const addUser = () => {
    setUser([...user, inputRef.current.value]);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" placeholder="유저 추가" ref={inputRef} />
      <button onClick={addUser}>추가</button>
      <ul>
        {user.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
```

위의 예시는 state인 `user` 배열에 유저를 추가하면서 리스트로 보이게끔 하는 코드이다.

`useRef`로 `inputRef`라는 ref 객체를 하나 만들고 나서 자바스크립트에서 `querySelector` 또는 `getElementById`와 같이 해당 태그를 선택할 수 있도록 해당 태그에 ref값으로 `inputRef`을 넣어준다.

그렇다면 `inputRef.current`는 선택한 해당 태그의 DOM을 가리키게 되는데, 내부를 살펴보면 다양한 프로퍼티가 존재한다.

이 프로퍼티를 통해서 해당 태그의 `value`를 가져올 수도 있고, `focus()`를 통해 input에 포커싱을 해주는 것 등을 할 수 있게한다.

---

### **useRef 또 다른 사용 예시**

`useRef`는 위 처럼 Virtual DOM을 조작하기 위한 것 뿐만 아니라, 변수 관리에도 사용된다.

`useState`를 예로 들어보자, `useState`의 상태 값을 변수에 선언했다고 가정했을 때, 상태 값이 바뀔때마다 컴포넌트가 리렌더링되면서 변수도 같이 재선언된다. 하지만 `useRef`의 `.current` 프로퍼티는 변경되더라도 리렌더링을 발생시키지 않고, 값도 변화하지 않는다는 특징이 있다.

```jsx
import React, { useState, useRef } from "react";

export default function Example() {
  const [render, setRender] = useState(false);
  const [counter, setCounter] = useState(0);
  const countRef = useRef(0);
  let countVar = 0;

  console.log("렌더링 후 Ref: ", countRef.current);
  console.log("렌더링 후 Var: ", countVar);
  console.log("렌더링 후 State: ", counter);

  const increaseRef = () => {
    countRef.current = countRef.current + 1;
    console.log("Ref 현재 값 : ", countRef.current);
  };

  const increaseVar = () => {
    countVar = countVar + 1;
    console.log("Var 현재 값 : ", countVar);
  };

  const increaseState = () => {
    setCounter((prev) => prev + 1);
    console.log("State 현재 값 : ", counter);
  };

  const doRender = () => {
    setRender(!render);
  };

  return (
    <div>
      <header>
        <p>Ref: {countRef.current}</p>
        <p>Var: {countVar}</p>
        <p>state: {counter}</p>
      </header>
      <div>
        <button onClick={increaseRef}>Ref 증가</button>
        <button onClick={increaseVar}>Var 증가</button>
        <button onClick={increaseState}>State 증가</button>
        <button onClick={doRender}>렌더</button>
      </div>
    </div>
  );
}
```

위의 예시를 보자, Ref 증가 버튼과 Var증가 버튼을 각각 10번씩 누른다면 `countVar`과 `countRef.current`는 10의 값을 가질 것이다.

이 때, 렌더 버튼을 클릭하여 state 값을 변경시켜준다면, 리렌더링이 일어나게 될텐데, 함수형 컴포넌트는 말그대로 함수이기 때문에 컴포넌트 내부의 모든 변수들이 초기화된다.

하지만, 이 때, `countRef.current`는 초기화 되지않고 리렌더링이 되었을 때, `countRef.current`에 저장되어 있던 값 10을 화면에 띄워주게 된다.

또한, Ref 증가 버튼을 10번 눌렀을 때는 `increaseRef` 함수 내부만 동작하지만, State 증가 버튼을 10번 눌렀을 경우에는 리렌더링이 10번 일어난다.
