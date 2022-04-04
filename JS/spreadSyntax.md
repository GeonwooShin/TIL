# **스프레드 문법**

스프레드 문법은 여러 값이 모인 하나의 집합을 풀어서 개별적인 값의 목록으로 만드는 것이다.

저번에 살펴봤듯이, 스프레드 문법은 이터러블 프로토콜을 따르는 [이터러블](https://github.com/GeonwooShin/TIL/blob/master/JS/iterable.md)만이 사용할 수 있다.

예제를 살펴보자.

```js
const a = [1, 2, 3];

console.log(...a);
```

위 예제의 출력 결과는 **_1 2 3_** 이다.

이 출력결과가 의미하는 것은 스프레드 문법이 **값을 나타내는 것이 아니라, 목록을 만든다**는 것을 의미한다.

### **변수 할당 예제**

```js
const a = [1, 2, 3];

const b = ...a // SyntaxError: Unexpected token '...'
```

따라서, 스프레드 문법의 결과는 값이 아니기 때문에 **_변수에 할당할 수 없다._**

---

## **스프레드 문법의 사용**

---

**1. 함수호출문의 인수로 사용하는 경우**

배열 자체를 인수로 전달하고 싶을 때의 경우를 예시로 들어보자.

```js
function add(x, y, z) {
  console.log(x + y + z);
}

const arr = [2, 4, 6];

add.apply(null, arr); // Function.prototype.apply() 사용

add(...arr); // 스프레드 문법 사용
```

스프레드 문법을 사용하지 않는다면 Function.prototype.apply()를 사용해야한다.

하지만 스프레드 문법을 사용하면 더 간단하게 나타낼 수 있다.

---

**1. 배열 리터럴 내부에서 사용하는 경우**

ES5에서는 배열을 결합, 요소 추가, 복사하기 위해서는 각각 concat, splice, slice 메서드를 사용해야 했다.

이 방법도 스프레드 문법으로 해결할 수 있다.

`1. concat`

```js
const a = [1, 2];
const b = [3, 4];

const c = a.concat(b); // concat 메서드 사용

console.log(c); // [1, 2, 3, 4]

const d = [...a, ...b]; // 스프레드 문법 사용

console.log(d); // [1, 2, 3, 4]
```

`2. splice`

```js
const number = [1, 2, 3, 4, 5, 6, 7];
const fruits = ["apple", "banana"];

// number.splice(1, 0, fruits);
number.splice(1, 0, ...fruits); // 스프레드 문법 사용
console.log(number); // [1, 'apple', 'banana', 2, 3, 4, 5, 6, 7]
```

스프레드 문법을 사용하지 않고 splice 메서드에 세 번째 인수로 배열을 전달하게 되면 출력결과는  
**_[1, Array(2), 2, 3, 4, 5, 6, 7]_** 처럼 배열 배열 자체가 추가되는 것을 알 수 있다.

이 때 splice 메서드의 세 번째 인수로 스프레드 문법을 사용하게 되면 배열 자체가 추가되는 것이 아니라  
**_[1, 'apple', 'banana', 2, 3, 4, 5, 6, 7]_** 처럼 배열의 목록이 추가되는 것을 알 수 있다.

`3. slice`

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = arr1.slice(arr1);

console.log(arr2);

const arr3 = [...arr1];

console.log(arr3);
```

배열 복사를 위해 ES5에서는 slice 메서드를 사용했지만, 스프레드 문법으로 간결하게 배열을 복사할 수 있다.

이 때, 복사는 slice와 스프레드 문법 모두 얕은 복사로 이루어 진다.

```js
const arr1 = [1, 2, 3, 4, 5];
const arr2 = arr1.slice(arr1);

console.log(arr2);
console.log(arr1 === arr2); // false

const arr3 = [...arr1];

console.log(arr3);
console.log(arr1 === arr3); // false
```

---
