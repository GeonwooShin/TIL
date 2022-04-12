# **RegExp**

RegExp는 정해진 패턴을 가진 문자열을 표현하기위해 사용되는 것으로 자바스크립트의 고유 문법은 아니다.

정규 표현식을 사용하지 않으면, 특정 패턴을 가진 문자열을 표현하기 위해 반복문과 조건문을 사용해야한다.

---

## **정규 표현식의 구성요소**

정규 표현식은 패턴과 플래그로 구성되어 있는데, 각 구성요소는 다음을 뜻한다.

- 패턴 : `/`를 사용하여 열고 닫고, 문자열 내에서 찾아야 할 특정한 조건을 의미한다.
- 플래그 : 정규 표현식의 검색 방식을 의미한다.

기본적인 생성과 메서드를 살펴보고 패턴과 플래그에 대해 좀 더 자세하게 살펴보자.

---

## **정규 표현식 생성**

### **1. 정규 표현식 리터럴**

```js
const a = "Hello World";

const pattern = /world/;
```

### **2. 정규 표현식 생성자 함수**

```js
const a = "Hello World";

const pattern2 = new RegExp(/world/);
```

---

## **정규 표현식 메서드**

### **1. RegExp.prototype.exec()**

```js
const a = "Hello World";
const pattern = /World/;

console.log(pattern.exec(a)); // ['World', index: 6, input: 'Hello World', groups: undefined]
```

RegExp.prototype.exec()는 프로토타입 메서드로 인수로 전달받은 문자열을 정규 표현식 패턴으로 검색하고

정해진 패턴에 맞는 문자열이 있다면 그 검색 결과를 배열로 반환한다.

만약, 정해진 패턴에 맞는 문자열이 없다면 `null`을 반환한다.

---

### **2. RegExp.prototype.test()**

```js
const a = "Hello World";
const pattern = /World/;

console.log(pattern.test(a)); // true
```

RegExp.prototype.test()는 프로토타입 메서드로 인수로 전달받은 문자열을 정규 표현식 패턴으로 검색하고

정해진 패턴에 맞는 문자열이 있다면 `true`

정해진 패턴에 맞는 문자열이 없다면 `false`를 반환한다.

---

### **3. String.prototype.match()**

```js
const a = "Hello World";
const pattern = /World/;

console.log(a.match(pattern)); // ['World', index: 6, input: 'Hello World', groups: undefined]
```

String.prototype.match()는 String 빌트인 객체가 제공하는 프로토타입 메서드로 인수로 전달받은 정규 표현식과의 검색 결과를 배열로 반환한다.

---

## **플래그**

| 플래그 |    의미     |                              설명                               |
| :----: | :---------: | :-------------------------------------------------------------: |
|   i    | Ignore case |            대소문자를 구별하지 않고 패턴을 검색한다.            |
|   g    |   Global    | 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다. |
|   m    | Multi line  |         문자열의 행이 바뀌더라도 패턴 검색을 계속한다.          |

```js
const a = "Hello World, this is my world";

console.log(a.match(/world/gi)); // 대소문자 구별하지 않고 모든 world 검색.
```

플래그를 사용하지 않는 경우에는  
대소문자를 구별하고, 매칭 대상이 여러개여도 반드시 첫 번째 매칭 대상만 검색한다.

---

## **패턴**

### **1. 문자열 검색**

```js
const a = "Hello World, this is my world";

const regExp = /world/;

console.log(regExp.test(a)); // true
```

특정 문자열을 검색하기위해서는 정규 표현식의 패턴의 시작과 끝인 `/`사이에 해당하는 문자열을 넣어준다.

---

### **2. 임의의 문자열 검색**

```js
const a = "Hello World, this is my world";

const regExp = /...../g;

console.log(a.match(regExp)); // ['Hello', ' Worl', 'd, th', 'is is', ' my w']
```

임의의 문자는 `.`으로 나타낼 수 있고, 이 `.`은 어떤 내용이든 상관없는 문자 한 개를 의미한다.

만약 임의의 문자 5개를 나타내고 싶다면 `.....`으로 표현할 수 있다.

---

### **3. 반복 검색**

```js
const a = "Hello World, this is my world";

const regExp = /l{1,2}/g; // l이 최소 1개 최대 2개 들어가는 문자열 검색

console.log(a.match(regExp)); // ['ll', 'l', 'l']
```

{x, y}이 의미하는 것은 최소 x번, 최대 y번을 의미한다.

{x}는 {x, x}와 같은 의미이다. => x번 반복되는 문자열

{x,}는 최소 x번 반복되는 문자열을 의미한다.

```js
const a = "Hello World, this is my world";

const regExp = /l+/g;

console.log(a.match(regExp));
```

위 예제에서 `+`가 의미하는 것은 앞선 패턴이 최소 한 번 이상 반복되는 문자열을 의미한다.

이 `+`는 `{1,}`과 같은 의미를 가진다.

```js
const a = "Hello World, this is my world";

const regExp = /is?/g;

console.log(a.match(regExp)); // ['is', 'is']
```

위 예제에서 `?`가 의미하는 것은 앞선 패턴이 최대 한 번(0번 포함)이상 반복되는 문자열을 의미한다.

---

### **4. OR 검색**

```js
const a = "Hello World, this is my world";

const regExp = /i|s/g;

console.log(a.match(regExp)); // ['i', 's', 'i', 's']
```

`|`은 or의 의미를 갖고, `/X|Y/`의 의미는 X 또는 Y를 의미한다.

따라서 위의 예제에서는 i 또는 s를 전역 검색한다는 뜻을 가진다.

`X|Y`을 더 간단히 표현하자면 `[XY]`로 나타낼 수 있다.

범위를 지정하기 위해서는 `[X-Z]` 처럼 `-`를 사용하여 범위를 지정한다.

이와 같은 방법으로 쉽게 나타낼 수 있는 것은 **알파벳 검색, 숫자 검색과 같은 것들이 있다.**

다음 예제를 보자.

```js
const a = "Hello World, this is my world 123 22 15 124124";

const regExp1 = /[A-Z]+/gi;
const regExp2 = /[0-9]+/gi;

console.log(a.match(regExp1)); // ['Hello', 'World', 'this', 'is', 'my', 'world']
console.log(a.match(regExp2)); // ['123', '22', '15', '124124']
```

위 숫자 검색 예제를 더 간단하게 만든다면

```js
const a = "Hello World, this is my world 123 22 15 124124";

const regExp = /[\d]+/gi;

console.log(a.match(regExp)); // ['123', '22', '15', '124124']
```

`\d`는 숫자를 의미하고, `\D`는 숫자가 아닌 문자를, `\w`는 알파벳, 숫자, 언더스코어를 의미하고, `\W`는 알파벳, 숫자, 언더스코어가 아닌 문자를 의미한다.

---

### **5. NOT 검색**

```js
const a = "Hello World, this is my world 123 22 15 124124";

const regExp = /[^A-Za-z, ]+/gi; // 대소문자 알파벳 또는 쉼표 또는 띄어쓰기가 아닌 문자를 의미한다.

console.log(a.match(regExp));
```

`[...]` 안에서 사용되는 `^`는 not의 의미를 갖는다.

---

### **6. 시작 위치로 검색**

```js
const a = "Hello World, this is my world";

const regExp = /^Hello/; // Hello로 시작하는 문자열 검색

console.log(a.match(regExp));
```

`[...]` 밖에서 사용되는 `^`는 문자열의 시작이라는 의미를 갖는다.

---

### **7. 마지막 위치로 검색**

```js
const a = "Hello";

const regExp = /o$/;

console.log(a.match(regExp)); // ['o', index: 4, input: 'Hello', groups: undefined]
```

`#`는 문자열의 마지막을 뜻한다.
