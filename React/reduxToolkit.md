# **redux toolkit**

상태관리를 담당하는 `redux`라는 것을 알아보았는데, 이 `redux`는 장점만이 있는 것이 아니라 단점도 존재한다.

효과적인 `redux`를 사용하기 위해서는 굉장히 다양한 추가적인 라이브러리를 설치해야 되는데 일반적으로 `redux`를 리액트 내에서 사용하기 위해 설치하는 `react-redux`, 불변성 유지를 위한 `immutable/immer`, 비동기 통신을 위한 `redux-thunk`, `redux-saga`, `redux-pender`과 같은 라이브러리가 추가적으로 설치된다.

따라서, 개발자 마다 취향이 다르기 때문에 이 라이브러리의 설치가 제 각각으로 이루어지는 문제로 이어질 수 있다.

또한, `redux`에서는 많은 양의 보일러 플레이트가 존재하고, 사용하는 액션과 리듀서들을 상태관리와 관련된 여러 컴포넌트에서 모두 바인딩 해주어야 하기 때문에 반복적인 코드 사용이 나타난다.

위와 같은 문제를 해결할 수 있는 방법으로는 `redux-toolkit`을 사용하는 것이다.

`redux-toolkit`을 사용하면 **리듀서, 액션 타입, 액션 생성함수, 초기 상태**를 하나의 함수로 선언하는 것이 가능하다. 또한, `redux`에서는 `state`를 변경하는 것이 아닌 새로운 `state`를 만들어 반환했지만, `redux-toolkit`의 `createReducer`와 `createSlice`는 이러한 `immer` 라이브러리를 내재하고 있기 때문에 `state`의 **직접 변경이 가능하다.**

이제 `redux-toolkit`의 사용 방법을 알아보자.

### **redux-toolkit 설치**

```
$ npm i @reduxjs/toolkit
```

### **store 생성**
