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

이렇게 `styled-components`를 사용하여 적용된 스타일은 네임 스페이스가 글로벌로 지정되지 않기 때문에, 각각의 컴포넌트에서 서로 다른 스타일을 적용하는 것이 가능하다.

### **스타일에 props 적용**

`styled-components`의 가장 큰 장점 중 하나는 props로 어떤 값을 받아오느냐에 따라 다른 스타일을 적용할 수 있다는 것이다.

다음 예시를 보자.

```jsx
import styled from "styled-components";

export default function Header() {
  return (
    <div>
      <NewButton>Button1</NewButton>
      <NewButton backgroundColor="green">Button2</NewButton>
      <NewButton active>Button3</NewButton>
    </div>
  );
}

const NewButton = styled.button`
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.backgroundColor || "yellow"};
  font-size: 16px;
  border: 1px solid orange;
  ${(props) =>
    props.active &&
    css`
      background-color: red;
      border: 1px solid red;
    `}
`;
```

만약 다른 색상을 가진 버튼을 만들기 위해서 반복적인 `styled-components`를 생성하는 것은 불필요한 행동이기 때문에 위와 같이 props를 통해서 단순하게 바꿔주고 싶은 스타일만 변경하는 것이 가능하다. 또한, 특정 props가 설정됐을 때의 스타일도 따로 지정해주는 것이 가능하다.

### **styled-components.attrs**

`styled-components`를 통해 `img`태그의 스타일링을 할 때, alt 속성 값을 넣어주는 과정이 필요할 수 있다. `img` 태그의 `alt` 속성은 해당 이미지를 보여줄 수 없을 때 텍스트로 이미지를 대체할 때 사용되는 값인데, 만약 이미지들이 같은 `alt` 속성을 가지는 이미지들을 스타일링 해야하는 경우, 다음과 같이 동일한 어트리뷰트를 부여하는 것이 가능하다.

```jsx
const ProductIMG = styled.img.attrs({ alt='상품 이미지' })`
  width: 100px;
  height: 80px;
`

function ItemList() {
  return (
    <div>
      <ProductIMG src="/xxx1">
      <ProductIMG src="/xxx2">
      <ProductIMG src="/xxx3">
    </div>
  )
}
```

### **스타일 상속**

자주 쓰는 css 속성을 변수에 담아 상속받아 재활용 하여 사용하는 것이다.

```jsx
const defaultColor = css`
  color: red;
  background-color: yellow;
`;

const Button = styled.button`
  ${defaultColor}
`;
```

이렇게 위와 같이 자주 사용되는 css 스타일링을 변수에 담아서 사용하는 것이 가능하다.

### **전역 스타일링**

위에서 설명했을 때, `styled-components`는 **네임 스페이스가 글로벌로 지정되지 않기 때문에, 각각의 컴포넌트에서 서로 다른 스타일을 적용하는 것이 가능하다** 라고 했지만, 때에 따라서 전역적으로 스타일링이 필요한 경우도 있다. 이 때에는 `createGlobalStyle`을 사용하여 프로젝트 전역에 적용하는 css를 만드는 것이 가능하다.

```jsx
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  body {
    font-size: 22px;
    color: red;
  }
`;
```

위와 같이 `createGlobalStyle`을 통해 만든 전역 스타일을 프로젝트 최상단에 추가해주면 일괄적으로 모든 하위 컴포넌트에 해당 스타일이 적용된다.

```jsx
import { GlobalStyle } from "./style/global";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
      <GlobalStyle />
    </React.StrictMode>
  </Provider>
);
```

### **ThemeProvider**

`ThemeProvider`은 `context API`의 작동 방식을 기반으로 하는 것으로, `ThemeProvider`로 감싸져 있는 하위 컴포넌트들은 `ThemeProvider`로 전달된 props를 사용하는 것이 가능하다. 기본적으로 `ThemeProvider`은 theme이라는 props를 전달받는데 이 props는 프로젝트에서 사용할 다양한 스타일링을 포함한 객체로 선언하는 것이 일반적이다.

```jsx
const fontSizes = {
  small: "10px",
  medium: "14px",
  large: "18px",
};

const paddings = {
  small: "10px",
  medium: "14px",
  large: "18px",
};

const margins = {
  small: "10px",
  medium: "14px",
  large: "18px",
};

export const theme = {
  fontSizes,
  paddings,
  margins,
};
```

이렇게 위와 같이 프로젝트 내에서 지켜야할 규격이나 색상 등을 미리 설정해놓은 후

```jsx
import { ThemeProvider } from "styled-components";
import { theme } from "./style/projectTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <App />
        <GlobalStyle />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
```

최상위 컴포넌트에 `ThemeProvider`의 `props`로 해당 theme을 import 하여 설정하면 해당 프로젝트의 모든 하위 컴포넌트에서 `props`로 전달 받은 스타일들을 손쉽게 사용하는 것이 가능하다.

```jsx
export default function Header() {
  return (
    <div>
      <h1>{count}</h1>
      <NewButton backgroundColor="green">+</NewButton>
      <NewButton>-</NewButton>
    </div>
  );
}

const NewButton = styled.button`
  width: 150px;
  height: 100px;
  background-color: ${(props) => props.backgroundColor || "yellow"};
  font-size: ${(props) => props.theme.fontSizes.small};
  border: 1px solid orange;
`;
```

위와 같이 `props.theme.fontSizes.small`은 10px 이기 때문에 font-size는 10px로 설정된다. 이렇게 `ThemeProvider`을 사용하여 프로젝트의 절대적인 규격과 스타일을 설정하여 스타일링을 일관적으로 작성할 수 있도록 도움을 줄 뿐만 아니라, 좀 더 직관적으로 스타일링이 어떻게 설정되어있는지도 확인하는 것이 가능하다.
