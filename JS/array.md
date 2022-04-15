# **배열**

배열은 이터러블 자바스크립트에서 사용 빈도가 가장 높은 자료구조이다.

그렇다면 배열이란 어떻게 정의할 수 있을까?

배열이란, **여러개의 값을 순차적으로 나열한 자료구조**라고 할 수 있다.

여기서 순차적으로 나열한 각각의 값들을 **_요소_** 라고 한다.

이 요소가 될 수 있는 것은 원시값과 객체, 함수와 같이 자바스크립트에서 값으로 인정되는 모든 것이다.

또한 배열에서는 **인덱스**라는 것을 갖는데, 이 **인덱스**는 배열에서 요소의 위치를 나타낸다. (0부터 시작)

```js
const arr = [1, 2, 3];

console.log(arr[0]); // 1
console.log(arr[1]); // 2
console.log(arr[2]); // 3
console.log(arr.length); // 3
```

위의 예제처럼 인덱스를 통해 요소로 접근하기 위해서는 대괄호 표기법을 사용한다.

또한 배열은 배열의 길이를 나타내는 length 프로퍼티를 갖는다.

여기서 일반 적인 배열과 자바스크립트의 배열은 다른점을 갖는다.

자바스크립트의 배열은 배열의 요소를 위한 메모리 공간이 모두 동일한 크기를 갖지 않아도 된다.

또한, 배열의 요소가 연속적으로 이어져 있지 않을수도 있다. 이러한 배열을 희소 배열이라한다.

그렇다면, 희소 배열의 장점과 단점은 어떤 것이 있는지 알아보자.

### **희소 배열의 장점**

- 특정 요소를 검색하거나 요소를 삽입이나 삭제하는 경우 일반적인 배열보다 속도가 빠르다.

### **희소 배열의 단점**

- 일반 배열에 비해 인덱스로 요소에 접근하는 속도가 느리다.

**_이렇게 일반적인 배열과 달리 자바스크립트의 배열은 희소 배열을 허용하지만 되도록이면 배열의 프로퍼티_**  
**_length와 배열의 요소의 개수가 일치하도록 즉, 희소 배열이 아니도록 하는 것이 좋다._**

---

## **배열 생성**

### **1. 배열 리터럴**

```js
const fruit = ["banana", "orange", "grape"];
console.log(fruit[0]); //  banana
console.log(fruit.length); // 3

const fruit2 = ["cherry", , "kiwi"]; // 희소 배열
console.log(fruit2.length); // 3
```

배열 리터럴은 인덱스가 프로퍼티 키의 역할을 한다.

또한 변수 `fruit2`는 요소가 연속적으로 위치하지 않는 희소 배열 생성을 보여준다.

---

### **2. 배열 생성자 함수**

```js
const arr = new Array("banana");

console.log(arr); // ['banana']

const arr2 = new Array(10);

console.log(arr2); // (10) [empty × 10]

const arr3 = new Array(10, 11, 12);

console.log(arr3); // (3) [10, 11, 12]
```

위와 같이 `new Array()` 생성자 함수에 인수가 무엇이 전달되었는지에 따라 배열이 생성되는 방식이 다르다.

1. 인수로 하나의 숫자가 전달되는 경우 : 그 숫자의 크기를 가지는 배열을 생성한다. 이때는 희소 배열이 생성된다.

2. 인수로 여러개의 숫자나 숫자가 아닌 인수가 전달되는 경우 : 여러개의 숫자를 요소로하는 배열을 생성한다.

이 때, 인수로 하나의 숫자를 전달하는 경우 배열의 최대 크기는 2^32 - 1 개 이기 때문에 그 이상인 수를 인수로 전달하는 경우 `RangeError`가 발생한다.

---

### **3. Array.of**

인수로 전달하는 하나의 숫자가 배열의 크기가 아닌 요소를 의미하고 싶을 때는 `Array.of()`메서드를 사용한다.

```js
const arr1 = Array.of(10);

const arr2 = Array.of(10, 11, 12);

console.log(arr1); // [10]

console.log(arr2); // (3) [10, 11, 12]
```

주의할 점은, `new` 키워드를 쓰지 않는다는 것이다.

---

### **4. Array.from**

`Array.from` 메서드는 인수로 유사 배열 객체 또는 이터러블을 전달받아 배열로 반환하는데 두 번째 인수로 콜백 함수도 전달받을 수 있다.

```js
const obj = {
  0: "banana",
  1: "grape",
  2: "cherry",
  length: 3,
};
const iter = "Hi";

const arrayLike1 = Array.from(obj);
const arrayLike2 = Array.from(iter);

console.log(arrayLike1); // ['banana', 'grape', 'cherry']
console.log(arrayLike2); // ['H', 'i']
```

유사 배열 객체는 프로퍼티 키가 인덱스처럼 숫자로 이루어져 있고, 객체 내부에 `length` 프로퍼티가 존재한다. 또한 문자열과 같은 이터러블 또한, `Array.from` 메서드의 인수로 들어오는 것이 가능하다.

만약 length에 맞지 않는 요소가 있다면 해당 요소를 `undefined`로 채운다.

---

## **배열 요소 참조**

자바스크립트 배열은 인덱스가 **프로퍼티 키**의 역할을 한다고 설명했다.

또한, 배열의 프로퍼티 값. 즉, 요소를 참조하기 위해서는 대괄호 표기법을 사용해야 한다.

```js
const arr = ["banana", "grape", "orange"];

console.log(arr[0]); // 프로퍼티 키 0으로, 프로퍼티 값 'banana' 획득
```

만약 존재하지 않는 요소에 접근한다면 `undefined`를 반환한다.

```js
const arr = ["banana", "grape", "orange"];

console.log(arr[3]); // 인덱스가 3인 요소는 존재하지 않는다.
```

---

## **배열 요소 추가**

### **요소 추가**

배열에는 요소를 동적으로 추가하는 것이 가능하다.

존재하지 않는 인덱스에 값을 할당하게 되면, 새로운 요소가 추가되도록 동작한다.

이 때 length 프로퍼티의 값은 자동으로 갱신된다.

```js
const arr = [];

console.log(arr); // []
console.log(arr.length); // 0

arr[0] = "cherry";

console.log(arr); // ['cherry']
console.log(arr.length); // 1
```

이 때, 배열의 프로퍼티인 `length`보다 더 큰 인덱스에 값을 할당하게되면, 희소 배열이 된다.

```js
const fruit = ["cherry", "kiwi"];

fruit[3] = "banana";

console.log(fruit); // ['cherry', 'kiwi', empty, 'banana']
```

### **요소 값 재할당**

이미 인덱스에 요소가 존재할 때, 요소에 값을 재할당한다면 요소의 값이 재할당한 값으로 갱신된다.

```js
const arr = [];

arr[0] = "banana";

console.log(arr[0]); // banana

arr[0] = "cherry";

console.log(arr[0]); // cherry
```

이 때, 배열에 요소를 추가하거나 값을 재할당 하기위해서는 반드시 인덱스 값을 사용해야하지만

정수이외의 값은 인덱스로 사용하게되면, 요소가 아닌 프로퍼티를 생성하거나 재할당하게된다.

```js
const fruit = ["banana", "kiwi", "orange"];

fruit[3] = "cherry"; // 새로운 요소 추가
fruit["0"] = "grape"; // 기존 요소값 갱신

fruit[5.5] = "5.5"; // 정수가 아닌 수를 인덱스로 사용
fruit["hello"] = "hello"; // 문자열을 인덱스로 사용
fruit.hi = "hi";
console.log(fruit); // ['grape', 'kiwi', 'orange', 'cherry', 5.5: '5.5', hello: 'hello', hi: 'hi']
```

---

## **배열 요소 삭제**

배열은 객체이기 때문에 특정 요소 삭제를 위해서 `delete` 연산자를 사용할 수 있다.

```js
const fruit = ["banana", "kiwi", "orange"];

delete fruit[2]; // 인덱스 2의 요소를 삭제

console.log(fruit); // ['banana', 'kiwi', empty]
console.log(fruit[2]); // undefined
```

배열 요소를 삭제한다해도 배열의 `length` 프로퍼티에는 영향을 주지 않기 때문에 희소 배열이 된다.

따라서 해당 `delete` 연산자를 사용하는 대신 프로토타입 메서드인 splice()를 사용한다. 해당 메서드는 뒤에서 자세히 다뤄보자.

---
