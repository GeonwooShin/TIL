## **ESlint**

`eslint`는 설정한 코딩 컨벤션에 위배되는 자바스크립트 문법 중 에러가 있는 곳을 찾아주고 해당 에러가 어떤것인지 알려주는 역할을 하는 것으로, 코드의 가독성을 높이고, 발생가능한 에러와 버그를 찾아서 일관성있는 코드를 만들어 내는것에 초점을 맞춘다.

### **ESlint 설치**

```
$ npm install -D eslint
```

다음과 같이 `ESlint`를 설치한다.

### **ESlint 설정**

프로젝트 최상단에 `ESlint`의 설정 파일인 `.eslintrc.js` 파일을 생성한다.

```js
module.exports = {};
```

`app.js`

```js
const a = 1;
```

모듈 생성 후 아무런 설정없이 위와 같은 `app.js`에 대하여 `npx eslint app.js`를 통해 `eslint`를 실행하면 아무런 결과를 출력하지 않고 수행을 종료한다.

`ESlint` 설정에는 `rules`라는 검사 규칙이 존재하는데, `app.js`에는 세미 콜론이 여러개 붙은 에러에 관하여 검사하는 규칙을 추가해보도록 하자.

```js
module.exports = {
  rules: {
    "no-extra-semi": "error",
  },
};
```

다음과 같이 여러개의 세미콜론에 대한 에러를 검사하는 규칙을 추가한 후 `eslint`를 실행하면 다음과 같은 결과를 출력한다.

```
error  Unnecessary semicolon  no-extra-semi
```

이렇게 `ESlint`에는 위의 규칙말고도 다양한 규칙이 존재하는데, 규칙 목록은 [이곳](https://eslint.org/docs/latest/rules/)에서 확인 가능하다.

이 때, 위에서 확인할 수 있는 규칙 목록 중 랜치 표시가 있는 규칙들은 `npx eslint app.js --fix`를 통해 `--fix` 옵션을 붙여 자동으로 수정하는 것이 가능하다.

### **Extensible Config**

`babel`에서의 프리셋과 같이 `ESlint`에서도 자주 사용되는 규칙을 여러개 정해놓은 설정이 존재하는데, 바로 `eslint:recommended`이다. 위에서 언급한 규칙 링크에서 체크 표시되어있는 규칙들은 `eslint:recommended`에 포함되어 있는 규칙이다. 설정 방법은 다음과 같다.

```js
module.exports = {
  extends: ["eslint:recommended"],
};
```
