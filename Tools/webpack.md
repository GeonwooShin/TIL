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

기본적으로 용량이 작거나 사용 빈도가 높은 파일에 대해서는 type을 `asset/inline`으로 지정하여 사용하는 것이 일반적이다. 이는 `webpack`의 기본 asset type을 통해 간단하게 해결할 수 있다.

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
        type: "asset",
      },
    ],
  },
};
```

위의 예시처럼 type을 `asset`으로 지정하면 기본 조건에 따라서 크기가 `8kb` 미만인 파일에 대해서는 inline 모듈로 처리되고(base64 인코딩), 그 이상의 크기인 파일을 resource 모듈로 처리되기 때문에 크기에 따라 따로 resource 모듈과 inline 모듈을
지정하지 않아도 된다.

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
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 12 * 1024, // 12kb
          },
        },
      },
    ],
  },
};
```

혹시나 inline 모듈로 처리될 파일의 최소 크기를 변경하고 싶다면, 위와 같이 `maxSize`를 조절하는 것이 가능하다.

5. **plugins**

위에서 살펴본 loader는 파일을 해석하여 특정 모듈을 변환하는 기능을 담당한다. 반면에, plugin은 번들링 된 파일의 형태를 바꾸는 후속처리 기능을 담당한다. 단, plugin은 생성자 함수로 생성된 객체 인스턴스로만 추가되어야 한다. 이제 자주 사용되는 plugin들을 한 번 살펴보자.

### **BannerPlugin**

`BannerPlugin`은 기본적으로 웹팩이 제공하는 plugin으로 번들링 결과물에 데이터를 기록하기 위해 사용되는 plugin 으로 버전에 따라 올바르게 배포가 되었는지 알아볼 수 있다.

```js
const path = require("path");
const webpack = require("webpack");
const childProcess = require("child-process");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `,
    }),
  ],
};
```

웹팩에서 기본으로 제공하는 plugin이기 때문에 `require`을 통해 webpack을 받아온다. 생성자 함수로 생성된 `webpack.BannerPlugin`의 속성인 `banner`에는 번들링 결과물에 기록할 데이터를 넣어주고 있다. 위의 예시에는 빌드 시간, 커밋 버전, 작성자 데이터를 넣어주었다.

이 때, 노드에서 제공하는 `child-process`의 `execSync`를 사용하면 인자로 넘긴 문자열의 터미널 명령어를 실행하는 것이 가능하다. 따라서 위 플러그인을 통한 번들링의 결과는 `main.js` 파일 상단에 다음과 같은 주석이 추가된다.

```js
/*!
 *
 *         Build Date: 2022. 6. 27. 오후 10:03:48
 *         Commit Version: e9390dc
 *
 *         Author: GeonwooShin
 *
 *
 */
/*! 빌드 날짜: 2020. 1. 11. 오전 11:11:06 */
```

### **DefinePlugin**

애플리케이션 개발에 있어 개발 환경 뿐만 아니라 운영 환경, 로컬 환경과 같은 다양한 환경이 존재한다. 때때로 환경에 따라 API 주소가 다른 경우가 발생하기 때문에 환경에 의존적인 정보는 되도록 `DefinePlugin`으로 관리한다.

```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "api.domain": JSON.stringify("http://www.xxx.com"),
    }),
  ],
};
```

`DefinePlugin` 또한 웹팩에서 기본으로 제공하는 플러그인이며, 코드 조각이 아닌 문자를 넘기려면 `JSON.stringify` 함수를 통해 문자열화 한 후 넘긴다. 이렇게 속성으로 넘겨준 키를 `console.log(api.domain)` 해보면 값인 `http://www.xxx.com`이 출력되는 것으로 전역 상수화 되는 것을 알 수 있다.

### **HtmlWebpackPlugin**

`HtmlWebpackPlugin`은 써드파티 라이브러리이므로 `$ npm install html-webpack-plugin`으로 설치한다. 이 plugin은 html 파일이 output에 동적으로 생성된다. 자동으로 html 파일 내부에서 `<script>` 태그로 `main.js`가 추가된다.

```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

`templateParameters` 라는 속성으로 `index.html` 파일 내부에 `<%= key %>`로 되어 있는 부분을 해당 키의 값으로 바꿔주는 것도 가능하다.

```js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        key: 'value'
      }
    }),
  ]
};
```

`index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= key %></title>
  </head>
  <body></body>
</html>
```

빌드 후 생성된 `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>value</title>
  </head>
  <body></body>
</html>
```

위와 같이 변경된 것을 볼 수 있다.

또한, `minify` 속성을 통해 `index.html` 파일의 공백이나 주석을 지우는 것도 가능하다.

### **CleanWebpackPlugin**

`CleanWebpackPlugin`은 이전에 빌드 되었던 결과물을 제거하는 plugin으로, 새로운 빌드 후에도 남아있던 기존 빌드 결과물 때문에, 새로 빌드를 하기 전 수동적으로 빌드 폴더를 지워주는 대신 자동적으로 지워주는 역할을 담당한다.

```js
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [new CleanWebpackPlugin()],
};
```

`CleanWebpackPlugin`은 써드파티 라이브러리 이므로 `$ npm install clean-webpack-plugin`을 통해 설치한 후 require()을 통해 받아와서 사용하는데 `clean-webpack-plugin`은 `export default` 되어있지 않기 때문에 위와 같이 받아온다.
