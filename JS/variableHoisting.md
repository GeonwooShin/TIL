# **호이스팅**

호이스팅은 변수 또는 함수의 선언이 해당 [스코프](https://github.com/GeonwooShin/TIL/blob/master/JS/scope.md)의 최상단으로 끌어올려 **_지는 것 같은_** 현상을 의미한다.

여기서 핵심은 **끌어올려진다**가 아닌 **끌어올려 지는 것 같다**는 것이다.

뿐만 아니라, **서로 다른 스코프 범위를 가지는 var과 let, const는 호이스팅에서도 다르게 동작한다.**

따라서, 이번에는 변수 호이스팅에 대해서 먼저 다뤄보도록 하겠다.

---

자바스크립트 엔진은 코드의 실행 전에 실행 컨텍스트를 위한 과정(소스코드 평가)을 거치는데

이 과정에서 자바스크립트 엔진은 모든 변수/함수 선언을 스코프에 우선적으로 등록하게된다.

하지만, 위에서 언급했듯이 var과 let, const는 서로 다른 점이 존재한다.

먼저 var을 이용한 변수 호이스팅에 대해서 살펴보자.

---

## **var 변수 호이스팅 예제 1)**

```js
console.log(a);

a = "Hi!";

console.log(a);

var a;
```

위의 예제를 살펴보면 먼저 콘솔에 출력되는 결과는 'undefined' 이고, 두번째로 출력되는 결과는 'Hi!'이다.

var 키워드에서 변수 호이스팅을 설명하자면 다음과 같다.

```
1. var a; 라는 변수 선언문은 맨 밑에 있지만, 변수 호이스팅으로 인해 스코프의
   최상단으로 끌어 올려진 것처럼 동작한다. 따라서 a 변수가 선언된다.


2. var 키워드로 선언한 변수는 암묵적으로 선언과 동시에 undefined로 초기화 된다.


3. 따라서, 예제 1) 첫줄의 console.log(a)는 'undefined'가 출력된다.


4. 두번째 줄에서 변수 a의 값을 'Hi!'로 할당한다.


5. 값을 새로 할당한 변수 a를 콘솔에 찍어보면 'Hi!'가 출력된다.
```

**_이렇게 var 키워드를 통한 변수 호이스팅은 에러를 발생시키지 않지만, 가독성을 떨어뜨린다._**

---

## **let 변수 호이스팅**

var 변수와 다르게 let 키워드로 선언한 변수는 호이스팅이 일어나지 않는 것처럼 동작한다.

분명 모든 변수/함수 선언을 스코프에 우선적으로 등록하게된다 했는데, 무슨 말일까?

그건 바로 var과 let, const의 초기화 단계에 대한 차이때문이다.

아까 위에서 var 키워드로 선언한 변수는 선언과 동시에 **undefined로 초기화가 이루어진다** 했다.

하지만 let, const로 선언된 변수는 **선언**과 **초기화 단계**가 분리되어 진행된다.

따라서, 초기화 이전에 변수를 참조하려고 하면 참조 에러가 발생해 호이스팅이 발생하지 않는것처럼 보인다.

---

## **let 변수 호이스팅 예제 1)**

```js
console.log(a);

let a;

console.log(a);

a = "Hi";

console.log(a);
```

```
1. 변수 호이스팅으로 변수 선언이 되지만, 동시에 초기화 단계는 진행하지 않는다.


2. 따라서, 처음 a를 콘솔에 출력하면 ReferenceError가 발생한다.


3. 변수 선언문 (let a;) 에서 초기화 단계가 진행된다.


4. 두번째 콘솔 출력은 undefined가 출력된다.


5. 변수 a에 'Hi!'를 할당하고, 할당 단계가 진행된다.


6. 세번째 콘솔 출력은 'Hi!'를 출력한다.
```

이렇게 var 키워드로 선언한 변수와 다르게 let 키워드로 선언한 변수에서 초기화 전까지 변수를 참조할 수 없는 구간을 **_일시적 사각지대(TDZ)_** 라고 한다.

![TDZ](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQacIQkC_Bwe2BvjrPUBiX9iDvf1_a5feaC-IVSHSiXXHjJHv8FWd5xmixw0TXUaGrg6lQ&usqp=CAU)

---

## **let과 const의 차이점**

---

const 키워드와 let 키워드는 같은 블록 레벨 스코프를 가지고, 변수 호이스팅이 발생하지 않는 것처럼 동작한다는 공통점을 가지고 있다. 하지만, const와 let 사이에는 차이점도 존재한다.

1. const는 변수 선언과 초기화가 동시에 일어나야 한다.

```js
const a = 1;

const b; // SyntaxError 발생
b = 2;
```

---

2. var, let은 재할당이 자유로운데 비해 const 키워드로 선언한 변수는 재할당이 불가능하다.

```js
const a = 1;

a = 2; // TypeError 발생
```

---

3. 가독성과 유지보수를 위해 **상수**로 사용한다.

```js
const RATE = 0.5;

let price = 32000;

let payment = price * RATE;

console.log(payment);
```