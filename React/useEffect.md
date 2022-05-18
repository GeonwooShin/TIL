# **useEffect**

함수형 컴포넌트 이전에 클래스형 컴포넌트에서는 `componentDidMount()` `componentDidUpdate()` `componentWillUnmount()`와 같은 라이프 사이클 메서드가 존재한다. 함수형 컴포넌트에서도 클래스형 컴포넌트에서 처럼 Side Effect를 실행할 수 있도록하는 Hook이 존재하는데 그것이 바로 `useEffect()`이다.

함수형 컴포넌트는 말 그대로 함수이다. 따라서 렌더링 시점에 함수가 실행되고, state 또는 props가 변화하는 시점에도 함수가 재실행된다.

이 때, state 또는 props가 변화할 때 마다 함수형 컴포넌트안에 정의된 모든 것들이 재실행된다고 하면 많은 자원의 낭비이기 때문에 이 문제를 `useEffect()`로 해소할 수 있다.

### \*_useState 사용방법_

우선 react 내부에 존재하는 `useEffect`를 import 해야한다.

```jsx
import React, { useEffect } from "react";

function App() {
  /*-----내부코드-----*/
  return()
}
```

위와 같이 `useEffect`를 import 해주면 이제 `useEffect`를 사용할 수 있게 된다.

이제 그럼 `useEffect`의 기본 구조를 살펴보자.

`useEffect`는 함수이고, 첫 번째 인자로는 실행할 함수, 두 번째 인자로는 dependency를 받는다.

이 때, dependency는 배열의 형태이다. 이 두 번째 인자가 의미하는 것은 dependency의 element의 값이 변경된다면 `useEffect()`의 첫 번째 인자인 콜백함수가 실행된다는 것이다.

```jsx
import React, { useEffect, useState } from "react";

function Example() {
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("change");
  });

  function plus() {
    setValue(value + 1);
  }

  function minus() {
    setNumber(number - 1);
  }

  return (
    <div>
      <p>{number}</p>
      <p>{value}</p>
      <button onClick={minus}>Minus</button>
      <button onClick={plus}>Plus</button>
    </div>
  );
}
```

위의 예시는 각각 다른 `value`와 `number`라는 state를 설정해주었고, `plus`함수는 `value`의 값을 1씩 올리고, `minus`함수는 `number`의 값을 1씩 빼는 역할을 한다.

위의 `useEffect()` 함수는 dependency로 아무것도 가지고 있지 않다.

렌더링되는 시점과 state 또는 props가 변화할 때 마다 함수형 컴포넌트안에 정의된 모든 것들이 실행된다고 위에서 설명했기 때문에

위의 예시는 처음 렌더링이 되는 시점과 state인 `value`가 변하든 `number`가 변하든간에 항상 `useEffect()` 안의 콜백 함수가 실행된다.

그렇다면 다음 예시를 보자.

```jsx
import React, { useEffect, useState } from "react";

function Example() {
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("change");
  }, []);

  function plus() {
    setValue(value + 1);
  }

  function minus() {
    setNumber(number - 1);
  }

  return (
    <div>
      <p>{number}</p>
      <p>{value}</p>
      <button onClick={minus}>Minus</button>
      <button onClick={plus}>Plus</button>
    </div>
  );
}
```

위 처럼 dependency로 빈 배열을 주게되면, 클래스형 컴포넌트에서 사용되는 `componentDidMount()`와 비슷한 역할을 하게된다.

따라서, 맨 처음 렌더링되는 시점에 한 번만 실행된다.

그렇다면 dependency로 `value`를 넣어준다면 실행 결과는 어떻게될까?

```jsx
import React, { useEffect, useState } from "react";

function Example() {
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log("change");
  }, [value]);

  function plus() {
    setValue(value + 1);
  }

  function minus() {
    setNumber(number - 1);
  }

  return (
    <div>
      <p>{number}</p>
      <p>{value}</p>
      <button onClick={minus}>Minus</button>
      <button onClick={plus}>Plus</button>
    </div>
  );
}
```

위의 예시는 state인 `number`가 변화해도 `useEffect`는 실행되지 않고, `value`가 변화함에 따라서 `useEffect`가 실행될 것이다.

이렇게 `useEffect`는 함수형 컴포넌트 내에 콜백함수를 렌더링이 일어날 때 마다 실행될 수 있게 하고, 렌더링이 일어날 때마다 콜백 함수를 실행하도록 하는 것은 비효율적이기 때문에 두번째 인자인 dependency로 특정 값을 받아, 그 값이 변하지 않는다면 다음 렌더딩이 일어났을 때 해당 콜백 함수를 실행하지 않도록 하는 것으로 정리할 수 있다.
