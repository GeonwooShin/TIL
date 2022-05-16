# **useState**

리액트에서는 사용자의 행동으로 인해 동적으로 변화하는 값을 상태(state)라고 한다.

이 동적으로 변화하는 상태(state)를 컴포넌트 내에서 관리해주어야 하는데,

useState는 함수형 컴포넌트에서 상태를 관리해주기 위한 Hook으로 리액트의 Hook 중 하나이다.

### **useState 사용방법**

우선 react 내부에 존재하는 `useState`를 import 하는 것이 최우선이다.

```jsx
import React, { useState } from "react";

function App() {
  /*-----내부코드-----*/
  return()
}
```

위와 같이 `useState`를 import 해주면 이제 `useState`를 사용할 수 있게 된다.

이제 그럼 `useState`의 기본 구조를 살펴보자.

기본적으로 `useState`는 배열을 반환하게 된다. 이 떄 [디스트럭쳐링 할당](https://github.com/GeonwooShin/TIL/blob/master/JS/destructuring.md)을 통해 다음과 같이 기본 틀을 만들 수 있다.

`const [value, setValue] = useState(0)`

위에서 만들어 놓은 기본 틀을 살펴보면 첫번째 원소는 현재 상태(state)를 의미하고, 두번째 원소는 상태(state)를 바꿀 수 있는 함수를 의미한다.

`useState`의 인자인 `0`은 초기 값을 의미한다.

따라서 지금 상태는 초기 값 0을 가진 value와 이 value 값을 바꿀 수 있는 setValue 함수가 존재한다는 것을 알 수 있다. (기본적으로 상태 값을 바꾸는 함수는 set + 상태로 네이밍한다.)

```jsx
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>{value}</p>
      <button
        onClick={() => {
          setValue(value + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setValue(value - 1);
        }}
      >
        -
      </button>
    </div>
  );
}
```

위와 같이 간단하게 state를 조작하는 예시를 만들 수 있다. 여기서 `setValue` 상태 조작 함수는 인자로 값을 넣어주었다.

위의 예시를 조금 더 최적화 하자면 다음과 같이 만들 수 있다.

```jsx
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>{value}</p>
      <button
        onClick={() => {
          setValue((prev) => prev + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setValue((prev) => prev - 1);
        }}
      >
        -
      </button>
    </div>
  );
}
```

상태 조작 함수의 인자로 새로운 값 대신에 기존 값을 변경하는 함수를 넣어주는 것도 가능하다.
