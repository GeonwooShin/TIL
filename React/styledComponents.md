## **StyledComponent**

현대의 웹은 JS, CSS, HTML 세 가지로만 분리되어 있는 것이 아닌, 웹 사이트 자체를 여러개의 컴포넌트로 분리하여 구성한다. 이 때, 리액트를 사용하는 경우 `JSX`를 통해서 자바스크립트가 HTML을 포함하는 형태를 취하기 때문에 이 CSS 또한 자바스크립트 내에서 포함되는 형태를 띄는 CSS-in-JS의 대표적 라이브러리 `styled-components`를 사용하여 컴포넌트를 구상할 때 JS, HTML, CSS를 손쉽게 관리할 수 있다.

`styled-components` 사용법은 다음과 같다.

### **styled-components 설치**

```
$ npm i styled-components
```

### **styled-components 사용 방법**

`styled-components`를 사용하는 방법으로는 크게 두 가지로 나뉜다. 첫 번째로는 이미 정의되어 있는 `HTML` 엘리먼트에 스타일을 적용하는 경우, 두 번째로는 직접 정의한 리액트 컴포넌트에 스타일을 적용하는 경우다.

일단, `HTML` 엘리먼트에 스타일을 적용하는 경우에 대해서 먼저 알아보자. HTML 엘리먼트는 이미 속성이 정의되어 있기 때문에 태그의 속성에 접근하여 스타일을 적용한다.

```jsx
import styled from "styled-components";

styled.button`
  border: 1px solid black;
  background-color: transparent;
`;
```

다음으로 직접 정의한 리액트 컴포넌트에 스타일을 적용하는 방법은 `styled`의 인자로 스타일을 적용하고 싶은 컴포넌트를 전달한다.

```jsx
import styled from "styled-components";

styled(Button)`
  border: 1px solid black;
  background-color: transparent;
`;
```
