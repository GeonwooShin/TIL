# **useCallback**

`useCallback`은 `useMemo`와 비슷한 특징을 가지는 React Hook으로, `useMemo`는 특정 결과값을 저장해두는 반면, `useCallback`은 특정 함수를 저장해두는 것이다.

### **useCallback 사용방법**

우선 react 내부에 존재하는 `useCallback`를 import 하는 것이 최우선이다.

```jsx
import React, { useCallback } from "react";

function App() {
  /*-----내부코드-----*/
  return()
}
```

위와 같이 `useCallback`를 import 해주면 이제 `useCallback`를 사용할 수 있게 된다.

`useCallback`의 형태는 아래와 같고, dependency가 변경되기 전까지 변수 `useCallbackEx`에 첫번째 인자로 들어온 함수가 저장되어 재사용하는 것이 가능하다.

```jsx
const useCallbackEx = useCallback(함수, [dependency]);
```

기본적으로 리액트 컴포넌트는 state가 변경되거나, 부모 컴포넌트로 부터 받은 props가 변경이 되면 리렌더링이 일어난다.

만약에 자식 컴포넌트가 부모 컴포넌트로 부터 props를 전달받았다고 가정해보자.

이 때, 부모 컴포넌트의 state가 변경된다면 리렌더링이 일어날 것이고, 부모 컴포넌트의 함수도 다시 선언된다.

자식 컴포넌트는 부모 컴포넌트로 부터 함수를 전달받는데 이 함수가 다시 선언된것을 변경되었다고 감지하여 자식 컴포넌트도 다시 렌더링이 일어난다.

이렇게 `useCallback`을 사용하여 함수의 재선언을 막아줄 수 있다.

```jsx
import React, { useCallback, useState } from "react";

export default function App() {
  const [value, setValue] = useState(0);

  const printValue = useCallback(() => {
    console.log(value);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setValue((prev) => prev + 1);
        }}
      >
        더하기
      </button>
      <button onClick={printValue}>출력하기</button>
    </div>
  );
}
```

위의 예시를 보면 dependency로 빈 배열이 들어가 있기 때문에, 첫 렌더링때만 함수가 선언되고, 이후 state가 바뀌어도 함수는 재선언 되지 않는다. 따라서 더하기 버튼을 눌러 `value`를 변경해도 콘솔에 출력되는 값은 초기 값인 `0`이다.

이렇게 컴포넌트 렌더링 시 함수를 새로 선언하는 것은 사실 성능에 아주 큰 영향을 미치지 않는다.

그렇다면 `useCallback`은 어떻게 써야 의미있는 쓰임새를 가질까?

```jsx
import React, { useCallback, useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(0);

  function a() {
    console.log(value);
  }

  useEffect(() => {
    a();
  }, [a]);

  function plusNumber() {
    setNumber((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={plusNumber}>number 더하기</button>
    </div>
  );
}
```

자바스크립트 내에서 함수는 객체로 인식되기 때문에 같은 로직을 가진 두 함수를 비교하게되면 메모리 참조 비교가 되어 `false`라는 값을 가진다.

만약, 위의 예시처럼 state `value`와 관련된 함수 `a`가 `useEffect`의 dependency로 들어간다고 가정해보자.

state인 `number`의 값이 변경됐음에도 불구하고 함수 a가 재선언되면서 메모리 참조값이 바뀌게되어 `useEffect`는 dependency로 들어온 함수 `a`가 변경되었다고 생각한다.

따라서 콘솔에는 `value`의 값이 찍히게된다.

```jsx
import React, { useCallback, useEffect, useState } from "react";

export default function App() {
  const [value, setValue] = useState(0);
  const [number, setNumber] = useState(0);

  const a = useCallback(() => {
    console.log(value);
  }, [value]);

  useEffect(() => {
    a();
  }, [a]);

  function plusNumber() {
    setNumber((prev) => prev + 1);
  }

  return (
    <div>
      <button onClick={plusNumber}>number 더하기</button>
    </div>
  );
}
```

이제 위의 예시 처럼 `useCallback`을 사용하여 dependency로 `value`를 주게되면 함수 `a`는 `number`의 값이 변경돼도 재선언이 되지 않으며, 따라서 dependency로 함수 `a`가 들어간 `useEffect`도 함수가 변경되었다고 여기지 않아서 콘솔에 `value` 값이 찍히지 않는다.

이렇게 의존 배열로 함수가 넘어 갈 때, 의도하지 않은 동작을 제어하기 위해서 `useCallback`을 사용한다면 보다 효과적인 React Hook을 사용할 수 있게된다.
