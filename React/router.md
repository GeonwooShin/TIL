# **리액트 라우터**

기본적으로 라우팅이라는 것은 사용자가 요청한 URL에 따라 해당 화면을 보여주는 것으로 이해할 수 있다.

리액트는 **SPA**이기 때문에 전체 페이지를 하나의 페이지에 담아 동적으로 화면 변경이 일어나는데 리액트에서는 이 라우팅을 다양한 라이브러리를 통해 처리할 수 있다.

다양한 라이브러리 중 `react-router-dom`이라는 라이브러리를 사용해보자.

### **라이브러리 설치**

```
$ npm i react-router-dom
```

**현재 기준 react-router-dom 최신 버전인 6버전으로 설명**

---

### **react-router-dom 사용방법**

`react-router-dom` 라이브러리는 `BrowserRouter`과 `HashRouter`이 존재하는데 `BrowserRouter`은 HTML5의 history API를 사용하여 UI를 업데이트 하고, 이는 페이지를 새로고침 하지 않아도 주소가 변경되기 떄문에 일반적으로 `BrowserRouter`를 사용하도록 한다.

`BrowserRouter`은 `react-router-dom`을 적용하고 싶은 컴포넌트의 최상위 컴포넌트를 감싸주는 래퍼 컴포넌트의 역할을 한다.

따라서, 우선 App.js 파일 내부에 `react-router-dom`에 내장되어있는 `BrowserRouter`을 import 한다.

```jsx
import { BrowserRouter } from "react-router-dom";

function App() {
  return <BrowserRouter></BrowserRouter>;
}
```

이제 라우팅을 사용 할 준비 단계는 끝이 났고, 라우팅을 할 페이지를 만들어보자.

일반적으로 라우팅 페이지로 사용할 컴포넌트는 `pages`라는 폴더에 관리하도록 한다.

pages 내부에 `Home`과 `About` 컴포넌트를 생성한 후, 각 컴포넌트의 내부는 다음과 같다.

```jsx
export default function Home() {
  return (
    <div>
      <h1>Home!</h1>
    </div>
  );
}
```

```jsx
export default function About() {
  return (
    <div>
      <h1>About!</h1>
    </div>
  );
}
```

이제 각 컴포넌트로 이동할 수 있도록 라우터를 연결해보자

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

`BrowserRouter` 내부에 `Route` 컴포넌트를 통해 브라우저 주소 경로에 따라 해당 컴포넌트로 이동할 수 있도록하고 `Route` 컴포넌트는 `Routes`로 감싸주어야한다.

`Route`의 속성인 `path`에 해당 컴포넌트를 보여줄 경로를 설정하고 `element`로 컴포넌트를 연결해준다. 이 때, `element` 속성에는 JSX 형태로 태그와 함께 컴포넌트를 연결해준다.

이제는 주소창에 `주소/`를 입력하면 `Home` 컴포넌트가 화면에 나타날 것이고, `주소/About`을 입력하면 `About` 컴포넌트가 나타날 것이다.

하지만 웹페이지에서는 사용자가 해당 웹 서비스를 이용할 때 주소창에 일일이 원하는 서비스 탭을 입력해서 이동하지 않는다.

이것은 `Link`라는 컴포넌트로 해결할 수 있다.

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

위와 같이 `Link` 컴포넌트를 통해 속성 `to`가 가리키는 주소로 이동하는 것이 가능하다. 일반적으로 이런 동작은 HTML에서 `a` 태그가 담당했지만, 리액트에서 `a` 태그를 사용하게되면 브라우저에서는 페이지를 새로 불러오게되어 SPA의 역할을 하지 못한다.

---

### **URL 파라미터와 쿼리스트링**

기본적으로 페이지 주소에서 다음과 같은 주소를 본 적이 있을 것이다.

`www.xxxxx.com/about/123` 또는 `www.xxxxx.com/about?details=true` 이렇게 유동적인 값을 다음과 같이 정의 한다.

파라미터: `www.xxxxx.com/about/123`  
쿼리: `www.xxxxx.com/about?details=true`

파라미터와 쿼리를 사용하는 규칙을 따로 정해진게 없지만, 일반적으로 파라미터는 특정 id 또는 이름으로 조회를 하는 경우에 사용하고, 쿼리는 키워드나 요청에 필요한 옵션을 전달할 때 사용한다.

이제 위에서 만들어 놓은 컴포넌트에 몇가지 살을 덧 붙여서 파라미터와 쿼리를 사용해보자.

일단 추가적으로 **중첩 라우팅**을 설명하자면 라우팅 매핑을 여러개의 컴포넌트를 거쳐서 단계별로 정의하는 것이다.  
예를 들어 `https://www.xxxxx.com/About` 이라는 `About` 탭에서 특정 회원 `John`에 대한 페이지를 보여주고싶을 경우 `https://www.xxxxx.com/About/John`과 같이 라우팅을 매핑해야 한다. 이런 경우에는 중첩 라우팅을 통해 유연한 라우팅을 구현할 수 있다.

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />}>
          <Route path=":userName" element={<User />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

위의 예시는 중첩 라우팅을 구현한 것이다.

한가지 유의할 사항은 중첩 라우팅을 구현하는 경우에는 중첩 라우팅의 최상단 컴포넌트에 `<Outlet />` 컴포넌트를 추가해주어야 한다.

해당 중첩 라우팅의 최상단 컴포넌트는 `About` 컴포넌트 이므로 `<Outlet />` 컴포넌트를 추가해준 결과는 다음과 같다.

```jsx
import { Outlet } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>About!</h1>
      <Outlet />
    </div>
  );
}
```

이제 주소창에 `https://www.xxxxx.com/About/John`을 입력해보면 엘리먼트인 `User` 컴포넌트로 이동할 것이다.

특정 회원에 대한 페이지를 보여줄 `User` 컴포넌트는 다음과 같다.

```jsx
import { useParams } from "react-router-dom";

export default function User() {
  const { userName } = useParams();
  return (
    <div>
      <p>제 이름은 {userName}입니다.</p>
    </div>
  );
}
```

여기서 `params`로 넘어오는 값은 `useParams`를 통해 전달 받을 수 있다. 따라서 주소가 `https://www.xxxxx.com/About/John` 이라면, `John`은 `userName`의 `params`로 넘어오게 된다.

파라미터는 `useParams`를 통해 전달받을 수 있다는 것을 알았으니 쿼리를 받는 방법을 알아보자.

---

쿼리는 일반적으로 물음표 다음에 오는 것으로 쿼리는 `key = value` 형태를 띈다. 또한 쿼리가 여러개라면 `&`를 통해 추가적인 쿼리를 전달하는 것이 가능하다. 예시를 보자면 다음과 같다.

`www.xxxxx.com/about?details=true&q=true`

위의 예시로는 `details=true`, `q=true`라는 두 개의 쿼리가 존재한다는 것을 알 수 있다. 또한 쿼리는 url 경로에 어떠한 영향도 미치지 않는다.

이 쿼리는 라우터에서 `useLocation`을 통해서 전달 받을 수 있다. 다음 예제를 보자.

`About` 컴포넌트에서 location 이라는 변수에 `useLocation`객체를 받고 있다.

이 `location` 변수를 콘솔에 찍어보면 `pathname`, `search`와 같은 state를 확인 할 수가 있는데, `pathname`은 **URL에 도메인다음의 / 부터의 문자열**을 의미하고 `search`는 **pathname다음의 ?부터의 문자열**을 의미한다.

따라서 `www.xxxxx.com/about?details=true`와 같은 주소에서 `pathname` 다음의 ?부터의 문자열은 `?details=true`에 해당하고 이것이 바로 쿼리를 의미한다. 또한, 이 쿼리는 `search`에 해당한다.

```jsx
import { Outlet, useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <h1>About!</h1>
      <h1>{location.search}</h1>
      <Outlet />
    </div>
  );
}
```

하지만 `search`에서 얻을 수 있는 쿼리의 값은 `?`도 포함되어 있기 때문에, 쿼리를 `key`와 `value`로 받기 위해서는 쿼리스트링을 객체로 변환해주는 라이브러리인 `qs`의 도움이 필요하다.

```
$ npm i qs
```

위와 같이 qs 라이브러리를 설치하고 `QueryString()`의 첫번째 인자로 변환할 쿼리스트링을 넣어주고 두번째 인자로 `ignoreQueryPrefix`의 값을 `true`로 넣어주어야 `?`를 뺀 정확한 쿼리스트링을 `key` , `value` 형태의 객체로 받을 수 있다.

```jsx
import { Outlet, useLocation } from "react-router-dom";
import QueryString from "qs";

export default function About() {
  const location = useLocation();
  console.log(location);
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  console.log(queryData);
  return (
    <div>
      <h1>About!</h1>
      <h1>{location.search}</h1>
      <Outlet />
    </div>
  );
}
```

만약 접속한 주소가 `https://www.xxxxx.com/About?details=true` 라면 `location`의 `search`의 값은 `?detail=true` 일 것이고, 이 쿼리스트링을 사용하기 위해서 `qs` 라이브러리의 도움을 받아 출력한 `queryData`는 `{detail: true}` 라는 데이터를 가질 것이다.

### **useSearchParams**

추가적으로 쿼리를 읽어오는 방법으로는 `react-router-dom`에서 제공하는 `useSearchParams`가 있다.

url이 `http://localhost:3000/About/123?detail=true&page=3` 라고 가정하고, 다음 예시를 보자.

```jsx
import { useSearchParams } from "react-router-dom";

export default function User() {
  const [query, setQuery] = useSearchParams();
  const page = query.get("page");
  return (
    <div>
      <h1>{page}</h1>
    </div>
  );
}
```

위에서 사용되는 `get` 메서드로 쿼리의 키 값을 인자로 넣어주게 되면, 키에 해당하는 value 값을 받아오는 것이 가능하다. 따라서 위에서 가정한 url의 쿼리 중 `page`에 해당하는 value 값은 `3`이기 때문에 `3`을 받아오는 것이 가능하다.

또한, `setQuery` 함수를 통해서 쿼리의 값을 변경하는 것도 가능하다.

```jsx
import { useSearchParams } from "react-router-dom";

export default function User() {
  const [query, setQuery] = useSearchParams();
  const page = query.get("page");
  return (
    <div>
      <h1>{query.get("page")}</h1>
      <button onClick={() => setQuery({ page: 5 })}>쿼리 바꾸기</button>
    </div>
  );
}
```

위에서 `page`에 해당하는 쿼리 value를 받아와서 변수에 저장해 놓은 후 `setQuery` 함수를 통해 해당 쿼리의 값을 `5`로 바꿔주는 과정이다.

---

### **라우터 이동**

위와 같이 라우팅을 설정해놓고, 리액트에서 화면이동을 하기위해 사용하는 방법으로는 두 가지가 존재한다.

1. 위의 예시에서 언급한 `react-router-dom`에서 제공하는 **Link** 컴포넌트를 사용

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />}>
          <Route path=":userName" element={<User />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

위의 예시를 다시 가져와서 설명을 해보자면 `Link` 컴포넌트에 `to`라는 어트리뷰트를 주고 해당 경로로 이동하도록 한다. 이 때, `Link` 컴포넌트는 DOM에서 `a` 태그로 변환된다.

물론 `Link` 컴포넌트는 프로젝트 내에서 페이지를 전환한다.

2. `react-router-dom`에서 제공하는 `useNavigation`을 사용

```jsx
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <p>회원 가입</p>
      <button onClick={goToHome}>완료</button>
    </div>
  );
}
```

위의 예시 처럼 `useNavigation`은 페이지를 전환하기전에 추가적인 로직이 있을 경우 사용한다.

페이지 이동을 하는 데 사용하는 두 가지 방법은 `Link` 컴포넌트 사용과 `useNavigation` 사용이 있고, `Link` 컴포넌트는 오직 페이지 전환만이 필요한 경우에 사용하고, `useNavigation`은 페이지 전환 전에 추가적인 로직이 있을 경우에 사용한다.

또한, `useNavigation`은 다음과 같이 사용하는 것도 가능하다.

```jsx
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate(-1);
  };
  return (
    <div>
      <p>회원 가입</p>
      <button onClick={goToHome}>완료</button>
    </div>
  );
}
```

`navigate`의 인자로 설정한 `path` 값을 넘겨서 이동하게 하는 것도 가능하지만, 인자로 `path` 값이 아닌 숫자를 넘긴다면 숫자 만큼 원하는 경로로 이동하는 것이 가능하다.

위의 예시에서 인자로 넣어준 -1의 값은 뒤로 1페이지 이동을 의미한다.

---
