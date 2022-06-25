## **Webpack**

웹팩이라는 것을 지칭할 수 있는 간단한 단어는 **모듈 번들러**라고 할 수 있다. 그렇다면 모듈이라는 것은 무엇이고 번들러라는 것은 무엇인지 알아보자.

기본적으로 모듈이라는 것은 여러개로 분리된 특정 파일 각각을 말한다. 쉽게 예를 들자면 흔히 알고있는 `import`를 통해 가져오는 것이 존재하고 있는 파일 하나하나를 모듈이라고 할 수 있다. 이렇게 애플리케이션 개발에 여러 모듈들을 사용하여 여러 개로 나뉜 파일들을 하나의 파일로 만들어 주는 개념이 바로 **번들링**이라고 한다.

### **webpack의 장점**

그렇다면 `webpack`으로 인한 모듈의 번들링의 장점은 무엇이 있을까?

1. 여러개의 파일을 번들링하여 하나의 파일로 만들어 HTTP의 요청 횟수가 줄어든다.

2. 모듈 단위의 개발을 통해 가독성 증가의 효과와 유지보수가 용이하다는 효과가 있다.

3. 모듈 시스템을 지원하지 않는 브라우저에서도 모듈 시스템을 사용할 수 있다.

### **모듈 시스템**

`export`를 통해 모듈을 내보내고 `import`를 통해 모듈을 가져오는 것이 가능하다.

예를 들어 `app.js`와 `math.js`가 있다고 가정해보자 각각 두 파일의 코드는 다음과 같다.

`math.js`

```js
export function sum(a, b) {
  return a + b;
}
```

`app.js`

```js
import { sum } from "./math.js";

console.log(sum(1, 2));
```

이렇게 `app.js`는 모듈화 된 `math.js`를 가져와 사용하는 것이 가능하다. 그렇다면 크롬 브라우저의 `index.html`에는 다음과 같이 모듈 시스템을 사용한다는 것을 명시해주어야 한다.

```html
...
<script type="module" src="app.js"></script>
```

이렇게 크롬 브라우저의 모듈 시스템을 잠깐 알아봤다. 하지만, 크롬 뿐만이 아니라 모든 브라우저에서 모듈 시스템을 사용하려고 한다면 이 때 `webpack`이 중요한 역할을 한다.

### **webpack 설치**

```
$ npm install -D webpack webpack-cli
```

[npm정리](https://github.com/GeonwooShin/TIL/blob/master/Tools/npm.md)에서 알 수 있듯이 `webpack`은 개발할 때 필요한 라이브러리 이기 때문에 `-D` 옵션을 붙여서 설치한다.

### **webpack 설정**

웹팩을 설정하는데 있어 가장 중요한 핵심 개념은 **Mode, Entry, Output, Loader, Plugin**이다. 하나 씩 살펴 보자.

```
npx webpack --mode development --entry ./src/app.js .......
```

위와 같이 명령어를 통해서도 웹팩 설정이 가능하지만, 많은 옵션을 설정하기 위해서는 명령어를 통해서 웹팩 설정에 한계가 있기 때문에 `webpack.config.js`라는 파일을 만들어 그 안에서 웹팩을 설정하는 것이 효율적이다.

1. **mode**

```js
module.exports = {
  mode: "development",
};
```

웹팩의 모드로 설정할 수 있는 값은 `development, production, none`으로 구성되어 있고, 최적화 방법 중 어느 것을 사용할 것인지 지정하는 역할을 담당한다.

디폴트 값인 production 모드는 자체적으로 코드를 최적화시켜서 용량을 줄이는 효과를 가진다.

2. **entry**

entry 옵션은 번들링의 시작 지점을 의미하는데, entry로 설정된 지점으로 부터 import 된 모든 모듈과 라이브러리에 대한 의존성을 찾는 역할을 담당한다.

```js
module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
};
```

다음과 같이 설정해주었다면 `app.js` 파일을 기점으로 번들링이 시작된다.

3. **output**
