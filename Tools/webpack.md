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

번들링의 결과를 어디로 내보낼 지 지정하는 옵션으로 번들링 된 파일 이름과 해당 파일이 저장될 경로를 직접 지정하는 것이 가능하다.

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
};
```

`output`의 경로는 절대 경로를 사용하기 때문에 `path.resolve`를 사용하여 계산하고, 이 함수는 노드의 모듈이기 때문에 외부 모듈을 가져오기 위해서는 `CommonJS`인 `require`을 이용하여 모듈을 가져와야 한다. 또한, output으로 번들링되는 파일의 이름은 entry에서 설정한 키 값으로 설정되어 생성된다. 따라서 현재 entry에서 설정된 키 값은 `main`이기 때문에 output인 파일 이름은 main.js로 생성된다.

4. **loader**

기본적으로 웹팩은 자바스크립트 파일만 이해할 수 있기 때문에, 자바스크립트 파일이 아닌 스타일시트, 이미지, 폰트 같은 것들은 `loader`를 통해 자바스크립트 코드로 가져오는 것이 가능해진다.

`loader`는 필수 속성으로 `test`와 `use`를 가진다. `test`는 변환해야하는 파일을 식별하는 역할을 수행하는 것으로 대개 정규표현식으로 작성한다. `use` 속성은 파일을 변환하는데 사용하는 로더를 의미한다.

### **css-loader, style-loader**

아래와 같이 `app.js`에서 `app.css`라는 css 파일을 import 한다고 가정했을 때

```js
import "./app.css";
```

css 파일을 자바스크립트로 불러와 사용하기 위해서는 css를 모듈로 변환해야 하고, 이 역할을 `css-loader`가 수행한다. 또한, 모듈로 변경된 css는 DOM에 추가가 되어야만 브라우저가 해석하여 사용할 수 있기 때문에, 이 역할을 수행하는 로더가 바로 `style-loader`이고, 일반적으로 `css-loader`와 `style-loader`는 함께 사용된다.

즉, 웹팩이 css 파일을 검색하고 css 파일을 찾으면 `css-loader`가 실행된 후, `css-loader`는 css 파일을 `json`파일로 로드하고 `style-loader`에 넘겨준다. `style-loader`는 `json`파일을 가져와 `<style>` 태그를 index.html에 삽입한다.

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

위의 예제는 `css`로 끝나는 모듈을 읽어 들여서 해당 로더를 적용한다. **이 때, 로더가 여러개라면 뒤쪽에 있는 로더부터 적용되어 앞쪽에 있는 로더로 이동하여 적용된다.**

### **file-loader, url-loader**

webpack 5버전 이전에는 `file-loader`를 통해 css 또는 scss 파일 이외의 이미지 또는 폰트 등을 모듈로 사용할 수 있도록 웹팩의 output으로 옮겨주는 것이 가능했고, `url-loader`를 통해 파일을 `base64 url`로 변환하여 문자열 형태로 소스코드에 넣어 사용할 수 있도록 했다.

**_하지만_**, `webpack` 5버전 이후 부터는 위와 같은 `file-loader, url-loader, raw-loader`와 같은 로더들을 `asset/modules`의 모듈 타입이 대체한다.

`asset/modules`는 파일 이외의 이미지, 폰트, 아이콘 등의 다양한 asset을 로더 추가 없이 사용할 수 있도록 도움을 주는 모듈로 즉, `asset/modules`는 asset 파일들을 처리하는 방식들을 모아놓은 모듈이라고 할 수 있다.

따라서 `file-loader`를 적용하고 싶은 경우에는 아래 예제와 같이 `asset/resource` 모듈 타입을 통해 사용하고

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
};
```

`url-loader`를 적용하려고 할 때는 아래 예제와 같이 `asset/inline` 모듈 타입을 사용한다.

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/inline",
      },
    ],
  },
};
```

5. **plugins**
