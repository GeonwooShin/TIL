## **babel**

`babel`은 자바스크립트 컴파일러로 프론트엔드 개발에 있어서 `크로스 브라우징` 이슈를 해결하는 역할을 담당한다.

크롬, 사파리, 파이어 폭스, IE 등 다양한 브라우저는 각각 지닌 자바스크립트 엔진이 다르기 때문에 최신 문법의 자바스크립트 문법을 이해하지 못하는 경우가 발생한다. 따라서 최신 자바스크립트 문법을 사용하여도 `babel`을 통해 모든 브라우저에서 코드가 동작하도록 호환성을 지켜주는 역할을 한다.

### **babel 설치**

```
$ npm install -D @babel/core @babel/cli
```

### **babel 실행**

```
$ npx babel xxx.js
```

위와 같이 npx를 통해 간단하게 바벨을 실행할 수 있다.

### **babel 실행 과정**

`babel`은 기본적으로 세 가지의 단계를 거친다.

1. 코드를 AST로 변환하는 Parsing 단계
2. AST를 변경하는 Transforming 단계
3. 변경된 결과물을 출력하는 Printing 단계

`babel`은 코드를 AST로 변환하고 변경된 결과물을 출력하는 **파싱과 출력만을 담당한다**.

위 단계에서 변환 단계를 담당하는 것은 바로 `babel`의 `plugin`이다.

`app.js`

```js
const name = "Johnson";
const hello = `Hello, my name is ${name}`;
console.log(hello);
```

다음과 같이 `ECMA2015` 이상의 코드를 작성해보았을 때 `$ npx babel app.js`를 통해 `babel`을 실행해보면 다음과 같은 결과가 출력된다.

```
const name = "Johnson";
const hello = `Hello, my name is ${name}`;
console.log(hello);
```

위에서 얘기한 것 처럼 AST를 변환하는 작업은 `plugin`이 담당하기 때문에, 플러그인을 설정하지 않고 그냥 `babel`을 실행하면 빌드 이전 코드와 변경된 것이 없다.

### **babel plugin**

따라서, 코드를 변환하기 위해서 플러그인을 설정해보자.

위의 예제에서 사용된 `template literal`과 관련된 plugin을 설치해보자.

```
$ npm install -D @babel/plugin-transform-template-literals
```

이렇게 설치한 plugin을 `$ npx babel app.js --plugins @babel/plugin-transform-template-literals` 을 사용하여 `babel`을 실행해보면 다음과 같은 결과가 출력되는 것을 확인할 수 있다.

```
const name = "Johnson";
const hello = "Hello, my name is ".concat(name);
console.log(hello);
```

`template literal` 코드가 `concat` 함수로 변환된 것을 볼 수 있다.

`webpack`에서 커맨드 라인이 길어지는 경우를 대비하여 `webpack.config.js` 파일로 웹팩 설정을 하는 것과 같이 `babel`도 커맨드 라인이 길어질수록 불편하기 때문에 `babel.config.js` 파일에 `babel` 설정이 가능하다.

`babel.config.js`

```js
module.exports = {
  plugins: ["@babel/plugin-transform-template-literals"],
};
```

### **babel preset**

프로젝트를 진행하다보면 위에서 다뤘던 `template-literal` 말고도 더 많은 plugin이 필요한데, 이 때 마다 각각의 plugin을 설치하고 `babel.config.js`에 plugin을 추가해주는 방식은 굉장히 비효율적이다. 따라서 필요한 여러가지 plugin들을 세트로 모아놓은 것이 바로 `preset`이다.

커스텀 `preset`을 한 번 만들어 보자.

`custom-preset.js`

```js
module.exports = function myBabelPreset() {
  return {
    plugins: [
      "@babel/plugin-transform-template-literals",
      "@babel/plugin-transform-arrow-functions",
    ],
  };
};
```

이제 `babel.config.js`에 plugin 대신 preset을 설정한다.

`babel.config.js`

```js
module.exports = {
  presets: ["./my-babel-preset.js"],
};
```

그 후 `$ npx babel app.js`를 실행하면 플러그인이 정상적으로 수행되어 코드가 정상적으로 변환된것을 볼 수 있다.

### **다양한 preset**
