## **npm**

**npm**은 `Node.js`를 설치하면 자동으로 함께 설치되는 것으로 Node Package Manager의 약자이며 `Node.JS`에서 사용 가능한 모듈들을 패키지화 하여 모아둔 저장소 역할을 한다.

그렇다면 `Node.js`란 무엇일까? `Node.js`는 자바스크립트 플랫폼으로, 자바스크립트 엔진 위에서 동작하는 자바스크립트 런타임이다. 이 `Node.js`는 프론트엔드 개발에 있어서 중요한 역할을 한다.

1. **최신 스펙의 적용**

자바스크립트는 굉장히 빠르게 발전하고 있지만, 인터넷 브라우저는 이 빠른 발전을 지원하는데 있어 속도가 뒤쳐진다. 이렇게 자바스크립트의 최신 스펙을 브라우저에서 구현하기 위해서는 `Babel`, `Webpack`, `npm`과 같은 기술이 필요한데, 이 도구들은 `Node.js` 환경에서 작동한다.

2. **빌드의 자동화**

코딩이 끝난 후 파일 압축, 코드 난독화, 폴리필 추가 등 개발 이외의 작업을 거친 후 배포하는 빌드 과정을 이해하는데 적지 않은 역할을 하고, 라이브러리의 의존성을 해결하며, 테스트의 자동화에서 사용된다.

3. **개발 환경 설정**

리액트에서는 CRA, vue.js 에서는 vue-cli를 사용하면 손쉽게 개발환경을 갖출 수 있다. 하지만, 개발을 하다보면 각 프로젝트에 맞게 개발 환경을 직접 설정해야하는 경우도 발생하기 때문에 직접 개발 환경을 설정하기 위해서는 `Node.js`의 이해가 필요하다.

이제 `npm`을 사용하기 위해서 `Node.js`를 설치해보자.

[Node.js 사이트](https://nodejs.org/ko/)에서 `Node.js`를 설치 완료 했다면, 이제 `npm`을 사용할 수 있다.

### **npm 프로젝트 생성**

프로젝트를 npm 기반으로 생성하여 package.json을 만들기 위해서는 아래와 같은 명령어를 수행해야한다.

```
$ npm init
```

이제 이 명령어로 인해 생성된 package.json 파일을 들여다 보면 다음과 같다.

```json
{
  "name": "example", // 프로젝트 이름
  "version": "1.0.0", // 프로젝트 버전
  "description": "", // 프로젝트 설명
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1" // 프로젝트 명령어
  },
  "author": "", // 프로그램 작성자
  "license": "ISC" // 라이센스
}
```

### **npm 명령어**

위의 package.json 파일에서 주의 깊게 봐야할 것은 script인데, 해당 script를 실행시키기 위해서는 해당 명령어를 입력해주면 된다.

```
$ npm test
```

해당 명령어의 실행 결과로는 지정된 echo 명령어로 메세지를 출력한 후 에러코드 1을 주며 종료하는 동작을 수행한다. 다음과 같다.

```
"Error: no test specified"
npm ERR! Test failed.  See above for more details.
```

직접 사용자가 명령어를 추가하는 것도 가능하다.

```json
{
  "name": "example", // 프로젝트 이름
  "version": "1.0.0", // 프로젝트 버전
  "description": "", // 프로젝트 설명
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1", // 프로젝트 명령어
    "build": "echo \"새로운 스크립트 명령어 추가\""
  },
  "author": "", // 프로그램 작성자
  "license": "ISC" // 라이센스
}
```

이렇게 직접 추가한 스크립트 명령어는 `npm run`으로 실행한다.

```
$ npm run build
```

실행 결과는 다음과 같다.

```
"새로운 스크립트 명령어 추가"
```

이외에도 npm 에서 자주 사용하는 명령어로는 무엇이 있는지 살펴보자.

기본적으로 가장 많이 사용되는 명령어인 `npm install`은 서드 파티 라이브러리 패키지를 설치하기 위해 사용되는 명령어이다.

```
$ npm install [패키지 명]
```

위와 같이 패키지 명을 명시해주면서 npm install 명령어를 입력하면 지정한 해당 패키지를 설치하도록 하는 것이고

```
$ npm install
```

패키지 명을 명시하지 않고 npm install 명령어를 입력하게 되면, `package.json`의 `dependencies`에 정의되어 있는 모듈을 모두 설치하도록 한다.

추가적으로 npm install 명령어를 사용할 때, 추가적으로 옵션을 지정해준다면, 옵션에 따라 설치 방법이 다르게 작용한다.

```
$ npm install [패키지 명] -g

$ npm install [패키지 명] -D

$ npm install [패키지 명] --save
```

`-g` 옵션을 붙인 경우 : global을 뜻하며, 전역으로 설치하여 해당 프로젝트 뿐만 아니라 다른 프로젝트에서도 사용할 수 있도록 설치하는 것

`-D` 옵션을 붙인 경우 : devDependencies에 패키지를 추가하는 것으로, 개발할 때 필요한 라이브러리로 애플리케이션을 배포할 때는 devDependencies에 해당되는 라이브러리들은 포함되지않는다

`--save` 옵션을 붙인 경우 : dependencies에 패키지가 추가되는 것으로 npm5 부터는 해당 옵션을 붙이지 않아도 install시에 dependencies에 라이브러리가 추가된다. **즉, npm install [패키지 명] = npm install [패키지 명] --save**
