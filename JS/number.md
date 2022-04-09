# **Number**

Number은 자바스크립트 표준 빌트인 객체로 숫자을 다루기 위한 메서드와 프로퍼티를 제공해준다.

이제 Number 객체를 만들어보자

---

## **Number 생성자 함수**

```js
const numObj = new Number();
const numObj2 = new Number(123);

console.log(numObj); // Number {0}
console.log(numObj2); // Number {123}
```

Number 생성자 함수에 인수를 전달하지 않으면 객체 내부 원시값으로 0을 할당한 Number객체가 생성된다.

Number 생성자 함수에 인수로 문자열을 전달하면 전달받은 숫자를 가진 Number 객체가 생성된다.

만약 생성자 함수의 인수로 숫자가 아닌 다른 값을 전달한다면, 강제 타입 변환을 통해 변환된 숫자를 할당한 Number 객체가 생성된다.

하지만, 만약 인수가 숫자로 변환될 수 없는 값이라면 NaN을 할당한 Number 객체가 생성된다.

다음은 Number 객체의 프로퍼티와 메서드에 대해 살펴보자.

---

## **Number 프로퍼티**

---

### **1. Number.EPSILON**

Number.EPSILON은 두 개의 표현 가능한 숫자 사이의 최소 간격을 뜻한다.

이 프로퍼티는 부동소수점의 오차를 해결하기 위해 사용되는 것이다.

다음 예제를 보자.

```js
console.log(0.2 + 0.1); //  0.30000000000000004

function isEqual(x, y) {
  return Math.abs(x - y) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); //  true
```

0.1과 0.2를 더한 값이 0.3이 아닌 0.30000000000000004라는 값이 나오는데 이러한 오차를 해결하기 위해

Number.EPSILON으로 부동소수점 오차를 해결한다.

---

### **2. Number.MAX_VALUE**

Number.MAX_VALUE는 자바스크립트에서 표현 가능한 가장 큰 양수를 의미한다.

Number.MAX_VALUE 보다 큰 값은 Infinity 라고 한다.

다음 예제를 보자.

```js
console.log(Number.MAX_VALUE); //  1.7976931348623157e+308
```

---

### **3. Number.MIN_VALUE**

Number.MIN_VALUE는 자바스크립트에서 표현 가능한 가장 작은 양수를 의미한다.

Number.MIN_VALUE 보다 작은 값은 0이다.

```js
console.log(Number.MIN_VALUE); //  5e-324
```

---

### **4. Number.MAX_SAFE_INTEGER**

Number.MAX_SAFE_INTEGER은 자바스크립트에서 안전하게 표현 가능한 가장 큰 정수를 의미한다.

```js
console.log(Number.MAX_SAFE_INTEGER); //  9007199254740991
```

---

### **5. Number.MIN_SAFE_INTEGER**

Number.MIN_SAFE_INTEGER은 자바스크립트에서 안전하게 표현 가능한 가장 작은 정수를 의미한다.

```js
console.log(Number.MIN_SAFE_INTEGER); //  -9007199254740991
```

이 외에도 양과 음의 무한대를 나타내는 Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY

숫자가 아님을 나타내는 Number.NaN 프로퍼티가 존재한다.

---

## **Number 메서드**

---

Number 객체에는 정적 메서드와 프로토타입 메서드가 존재한다. 예제를 통해 살펴보자.

### **1. Number.IsFinite**

Number.IsFinite는 인수로 전달되는 값이 유한수라면 true, 무한수라면 false를 반환한다.

```js
console.log(Number.isFinite(0)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN)); //false
```

**_이 때, NaN은 항상 false를 반환한다._**

또한, Number 메서드인 Number.isFinite() 말고도 빌트인 전역 함수인 isFinite()가 존재하는데

Number.isFinite()와 다르게 isFinite()는 인수로 전달 받은 값을 암묵적 타입 변환을 통해 검사를 수행한다.

```js
console.log(Number.isFinite(null)); // false (암묵적 타입 변환 x)
console.log(isFinite(null)); // true  (null이 0으로 암묵적 타입 변환)
```

---

### **2. Number.isInteger**

Number.isInteger는 인수로 전달되는 값이 정수라면 true, 정수가 아니라면 false를 반환한다.

```js
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(0.5)); // false
console.log(Number.isInteger(Infinity)); // false
console.log(Number.isInteger(NaN)); // false

console.log(Number.isInteger("123")); // false '암묵적 타입 변환 실행 X'
```

**_이 때, isInteger로 검사전에 암묵적 타입 변환이 실행되지 않는다._**

---

### **3. Number.isNaN**

Number.isNaN는 인수로 전달되는 값이 정수라면 true, 정수가 아니라면 false를 반환한다.

```js
console.log(Number.isInteger(123)); // true
console.log(Number.isInteger(0.5)); // false
console.log(Number.isInteger(Infinity)); // false
console.log(Number.isInteger(NaN)); // false

console.log(Number.isInteger("123")); // false '암묵적 타입 변환 실행 X'
```

**_이 때, isInteger로 검사전에 암묵적 타입 변환이 실행되지 않는다._**

또한, Number 메서드인 Number.isNaN() 말고도 빌트인 전역 함수인 isNaN()가 존재하는데

Number.isNaN()와 다르게 isNaN()는 인수로 전달 받은 값을 암묵적 타입 변환을 통해 검사를 수행한다.

```js
console.log(Number.isNaN(undefined)); // false (암묵적 타입 변환 x)
console.log(isNaN(undefined)); // true  (undefined가 NaN으로 암묵적 타입 변환)
```

---

## **Number.prototype 메서드**

---

지금 부터는 정적 메서드가 아닌 프로토타입 메서드를 살펴보자.

### **1. Number.prototype.toExponential**

toExponential() 메서드는 숫자를 지수 표기법으로 바꿔서 반환하는데, 반환 값은 **_문자열_** 이다.

또한 이 메서드는 숫자 리터럴 자체에는 사용할 수 없고, 그룹연산자로 묶어서 사용이 가능하다.

```js
const a = new Number(124);

console.log(a.toExponential());
console.log(124.toExponential()); // Invalid or unexpected token
console.log((124).toExponential());
```

---

### **2. Number.prototype.toFixed**

toFixed() 메서드는 숫자를 반올림해서 반환하는데, 반환 값은 **_문자열_** 이다.

인수로는 소수점 자리수를 뜻하기 때문에 toFixed(2)는 소수점 이하 2자리 수까지 유효하다는 것을 의미한다.

인수를 생략한다면 기본 값으로 0이 들어간다.

```js
const a = new Number(124.9162489);

console.log(a.toFixed()); // 기본값으로 0이들어간다. 따라서 결과는 125
console.log(a.toFixed(2)); // 124.92
```

---

### **3. Number.prototype.toPrecision**

toPrecision() 메서드의 인수로는 유효한 자릿수를 전달한다.

만약 전달 받은 인수로 해당 숫자를 표현하지 못하는 경우에는 지수 표기법으로 결과를 반환한다.

인수를 생략한다면 기본 값으로 0이 들어간다. 0은 0 자릿수 유효를 뜻하는 것이 아닌, 전체 자릿수 유효를 뜻한다.

반면 직접 0을 인수로 전달하면 RangeError가 발생한다.

```js
const a = new Number(124.9162489);

console.log(a.toPrecision()); //  기본 값 0
// console.log(a.toPrecision(0)); //  RangeError 발생
console.log(a.toPrecision(4)); // 4 자릿수 까지 유효하도록 나머지 반올림하여 반환
```

---

### **4. Number.prototype.toString**

toString() 메서드는 숫자를 문자열로 반환하는 메서드이다.

이 메서드는 인수로 진법을 나타내는 2~36 사이의 숫자하나를 전달받는다.

만약 `(124).toString(2)` 라면 **_숫자 124를 2진법으로 나타내어 문자열로 반환하라_** 라는 뜻을 가진다.

인수를 전달하는 것을 생략한다면 기본 값으로 10진법이 들어간다.

```js
const a = new Number(10);

console.log(a.toString()); // 10진법으로 나타낸 10 : 10
console.log(a.toString(2)); // 2진법으로 나타낸 10 :1010
console.log(a.toString(8)); // 8진법으로 나타낸 10 :12
```

---
