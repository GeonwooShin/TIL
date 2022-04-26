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

## **배열 메서드**

배열은 정적 메서드와 프로토타입 메서드를 제공한다.

배열 메서드는 원본 배열을 직접 변경하거나, 직접 변경하지않고 새로운 배열을 반환하는 메서드로 나뉜다.

원본 배열을 직접 변경하는 메서드는 되도록 사용하지 않는 편이 좋다.

### **1. Array.isArray**

이 메서드는 정적 메서드이고, 전달된 인수가 배열인지 아닌지에 따라 `true` 또는 `false` 값을 반환한다.

```js
const arr = [];

console.log(Array.isArray(arr)); // true
console.log(Array.isArray([])); // true
console.log(Array.isArray(new Array())); // true

console.log(Array.isArray()); // false
console.log(Array.isArray({})); // false
console.log(Array.isArray(null)); // false
console.log(Array.isArray(undefined)); // false
console.log(Array.isArray(1)); // false
console.log(Array.isArray("Hello")); // false
```

---

### **2. Array.prototype.indexOf**

이 메서드는 프로토타입 메서드로, 인수로 전달된 요소를 해당 배열에서 검색하여 인덱스를 반환한다.

만약 인수로 전달된 요소가 배열에 여러개 있다면, 첫번째로 검색된 인덱스를 반환한다.

인수로는 두개를 전달할 수 있는데, 첫 번째 인수는 검색할 요소, 두 번째 인수는 검색을 시작할 인덱스를 의미한다.

인수로 전달한 요소가 해당 배열에 존재하지 않는다면, `-1`을 반환한다.

```js
const user = ["Thomas", "Jake", "Jennie", "Hooper", "Gary", "Jake"];

console.log(user.indexOf("Gary")); // 4
console.log(user.indexOf("Jake")); // 1
console.log(user.indexOf("Bryan")); // -1
```

---

### **3. Array.prototype.push**

이 메서드는 전달받은 인수를 배열 마지막에 요소로 추가하는 메서드이며, 변경된 `length` 값을 반환한다.

```js
const fruit = ["banana", "cherry", "melon"];

fruit.push("kiwi", "grape");

console.log(fruit); // ['banana', 'cherry', 'melon', 'kiwi', 'grape']
```

이 메서드는 원본 배열을 직접 변경하기 때문에 성능면에서는 좋지않다.

따라서 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하는 [스프레드 문법](https://github.com/GeonwooShin/TIL/blob/master/JS/spreadSyntax.md)을 사용하는 것이 좋다.

---

### **4. Array.prototype.pop**

pop 메서드 또한 원본 배열을 조작하는 메서드로 해당 배열의 마지막 요소를 제거하고 해당 요소를 반환한다.

```js
const fruit = ["banana", "cherry", "kiwi", "grape", "melon"];

console.log(fruit.pop()); // melon

console.log(fruit); // ['banana', 'cherry', 'kiwi', 'grape']
```

---

### **5. Array.prototype.unshift**

unshift 메서드 또한 원본 배열을 조작하는 메서드로, 전달받은 인수를 배열의 맨 앞부터 요소로 추가한다.

메서드의 반환 값으로는 변경된 `length` 프로퍼티를 반환한다.

```js
const fruit = ["banana", "cherry"];

console.log(fruit.unshift("kiwi", "grape", "melon")); // 5

console.log(fruit); // ['kiwi', 'grape', 'melon', 'banana', 'cherry']
```

---

### **6. Array.prototype.shift**

shift 메서드 또한 원본 배열을 조작하는 메서드로, 배열의 첫 요소를 제거하는 메서드이다.

메서드는 제거된 요소를 반환하고, 빈배열에 메서드를 사용했다면 반환값으로는 `undefined`가 반환된다.

```js
const fruit = ["banana", "cherry", "kiwi", "grape", "melon"];

console.log(fruit.shift()); // banana

console.log(fruit); // ['cherry', 'kiwi', 'grape', 'melon']
```

---

### **7. Array.prototype.concat**

concat 메서드는 새로운 배열을 반환하는 메서드로, 원본 배열은 변경되지 않는다.

인수로 전달된 값은 원본배열에 마지막에 추가되어 그 상태로 새로운 배열을 반환한다.

```js
const fruit = ["banana", "cherry"];

const newFruit = fruit.concat("peach");

console.log(newFruit); // ['banana', 'cherry', 'peach']
console.log(fruit); // ['banana', 'cherry']
```

만약 `concat()` 메서드의 인수로 특정 값이 아닌 배열을 전달한 경우 인수로 전달한 배열을 해체하여 새로운 배열의 요소로 추가한다.

```js
const fruit1 = ["banana", "cherry"];
const fruit2 = ["grape", "pear"];

const newFruit = fruit1.concat(fruit2); // 배열 전달

console.log(newFruit); // ['banana', 'cherry', 'grape', 'pear']
```

`concat()` 메서드는 [스프레드 문법](https://github.com/GeonwooShin/TIL/blob/master/JS/spreadSyntax.md)으로 대체 가능하다.

```js
const fruit1 = ["banana", "cherry"];
const fruit2 = ["grape", "pear"];

const newFruit = [...fruit1, ...fruit2];

console.log(newFruit); // ['banana', 'cherry', 'grape', 'pear']
```

### **8. Array.prototype.slice**

slice 메서드는 인수로 전달된 범위의 요소들을 복사하여 배열로 반환하고 원본배열을 변경하지 않는다.

slice 메서드의 매개변수의 첫번째로 복사를 시작할 인덱스, 두번째로 복사를 종료할 인덱스를 받는다.

여기서 두번쨰로 전달받는 매개변수의 인덱스는 배열의 복사에 포함되지 않는다.

```js
const fruitsArr = ["grape", "banana", "strawberry", "melon"];

const newFruitsArr = fruitsArr.slice(0, 1); // 0 부터 1의 전까지

console.log(newFruitsArr); // ['grape']
```

만약에 메서드로 두번째 매개변수를 전달하지 않는다면 기본 값으로 `length` 프로퍼티가 전달된다.

```js
const fruitsArr = ["grape", "banana", "strawberry", "melon"];

const newFruitsArr = fruitsArr.slice(0);

console.log(newFruitsArr); // ['grape', 'banana', 'strawberry', 'melon']
```

메서드의 첫번째 매개변수에 음수가 전달된다면 배열의 끝에서 부터의 인덱스를 나타낸다.

```js
const fruitsArr = ["grape", "banana", "strawberry", "melon"];

const newFruitsArr = fruitsArr.slice(-3);

console.log(newFruitsArr);
```

따라서 위의 예제는 배열의 끝에서부터 요소를 세 개 복사하여 반환한다.

slice 메서드에 인수를 전달하지 않는다면, 원본배열 그대로를 복사하여 반환하게 되는데 이 때 생성된 복사본은 얕은 복사를 통해 생성되는 배열이다.

```js
const fruitsArr = ["grape", "banana", "strawberry", "melon"];

const newFruitsArr = fruitsArr.slice();

console.log(newFruitsArr);

console.log(fruitsArr === newFruitsArr); // false

console.log(fruitsArr[0]); // grape
console.log(newFruitsArr[0]); // grape
newFruitsArr[0] = "kiwi";

console.log(fruitsArr[0]); // grape
console.log(newFruitsArr[0]); // kiwi

console.log(fruitsArr[0] === newFruitsArr[0]); // true
```

### **9. Array.prototype.join**

`join` 메서드는 배열의 모든 요소를 문자열로 반환한 후 요소사이에 인수로 연결한 문자열을 반환하는 메서드이다.

인수로 아무것도 전달하지 않는다면 기본값은 `,` 이다.

**메서드의 반환값은 구분자로 연결한 문자열이다.**

```js
const fruit = ["banana", "grape", "cherry"];

console.log(fruit); // ['banana', 'grape', 'cherry']

console.log(fruit.join()); // banana,grape,cherry

console.log(fruit.join(":")); // banana:grape:cherry
```

---

### **10. Array.prototype.reverse**

`reverse` 메서드는 원본 배열의 순서를 반대로 뒤집는 메서드이며, **_이 때 원본 배열이 변경된다._**

반환값은 변경된 배열이다.

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const newArr = arr.reverse();

console.log(newArr); // [9, 8, 7, 6, 5, 4, 3, 2, 1]

console.log(arr); // [9, 8, 7, 6, 5, 4, 3, 2, 1]
```

---

### **11. Array.prototype.fill**

`fill` 메서드는 **fill(넣을 값, 여기부터, 여기전까지)** 로 작동하는 메서드이다.

인수로 전달 받은 값을 채우는 배열 프로토타입 함수이다.

**_이 메서드 또한, 원본 배열을 변경한다._**

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

arr.fill(0); // 인수로 전달받은 값을 배열의 처음부터 끝까지 해당 요소로 채운다.

console.log(arr); // [0, 0, 0, 0, 0, 0, 0, 0, 0]
```

인수로 넣을 값만 전달한다면 위의 예제와 같이 해당 전달받은 인수로 배열을 모두 바꿔 채운다.

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

arr.fill(0, 4); //

console.log(arr); // [1, 2, 3, 4, 0, 0, 0, 0, 0]
```

인수로 넣을 값과 시작할 인덱스 값을 같이 전달한다면, 시작할 인덱스부터 끝까지 첫번째 인수로 전달한 값으로 요소를 채운다.

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

arr.fill(0, 4, 6);

console.log(arr); // [1, 2, 3, 4, 0, 0, 7, 8, 9]
```

인수로 넣을 값, 시작할 인덱스, 종료할 인덱스로 인수를 모두 전달한다면  
종료할 인덱스 이전까지(즉, 종료할 인덱스는 포함하지 않는다) 인수로 전달한 값으로 요소를 채운다.

---

### **12. Array.prototype.includes**

`includes` 메서드는 배열 내에 인수로 넘겨준 요소가 존재하는지 검사하는 메서드이다.

첫 번째 인수로는 검색할 요소의 값을 넘겨주고, 두 번째 인수로는 검색을 시작할 인덱스를 지정해준다.

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(arr.includes(2)); //  true
console.log(arr.includes(2, 3)); // false
```

이 메서드는 `indexOf` 메서드 보다 효율적인 메서드이다.

---

### **13. Array.prototype.flat**

`flat` 메서드는 중첩 배열을 평탄화 해주는 메서드이다.

인수로는 중첩 배열을 평탄화 할 깊이가 들어간다. 인수로 `Infinity` 를 전달한다면 중첩 배열 모두를 평탄화 한다.

```js
const arr = [1, 2, [3, 4, 5, [6, 7, 8, [9]]]];

console.log(arr.flat()); // [1, 2, 3, 4, 5, Array(4)]
console.log(arr.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

위의 예제처럼 인수를 전달하지 않으면 기본 값이 `1`로 지정되어있고,

인수로 `Infinity` 를 전달한다면 중첩 배열 모두를 평탄화 한다.

---

## **배열 고차 함수**

고차함수라는 것은 함수를 인수로 전달받는 함수 또는 함수를 반환하는 함수를 의미한다.

### **1. Array.prototype.sort**

`sort` 메서드는 배열을 정렬하는 메서드이고, 기본적으로 오름차순으로 정렬이 이루어진다.

`sort` 메서드는 원본 배열을 직접변경하고, 반환값은 정렬된 배열이다.

```js
const fruit = ["grape", "melon", "apple", "banana"];

console.log(fruit.sort()); // ['apple', 'banana', 'grape', 'melon']

console.log(fruit); // ['apple', 'banana', 'grape', 'melon']
```

`sort` 메서드는 영어 뿐만 아니라 한글도 오름차순을 적용가능하다.

```js
const fruit = ["포도", "사과", "감", "레몬"];

console.log(fruit.sort()); // ['감', '레몬', '사과', '포도']

console.log(fruit); // ['감', '레몬', '사과', '포도']
```

만약, `sort` 메서드를 내림차순으로 정렬하고 싶다면 `reverse` 메서드를 사용하여 `sort` 메서드로 오름차순 정렬한 배열을 뒤집으면 된다.

```js
const fruit = ["grape", "melon", "apple", "banana"];

console.log(fruit.sort().reverse()); // ['melon', 'grape', 'banana', 'apple']

console.log(fruit); // ['melon', 'grape', 'banana', 'apple']
```

하지만, 숫자 요소를 정렬할 때는 `sort` 메서드에 인수로 비교 함수를 전달해야만 한다.

이 때, 비교 함수는 양수, 음수, 0 중에 하나를 반환해야만 하고

비교 함수의 반환 값이 0 보다 작으면 비교함수의 첫번째 인수를 우선하여 정렬하고

0이면 정렬하지 않고, 0 보다 크면 두번째 인수를 우선하여 정렬한다.

```js
const arr = [31, 24, 25, 1, 22, 9, 10, 2];

arr.sort((a, b) => a - b); // // 숫자 요소 오름차순 정렬

console.log(arr); // [1, 2, 9, 10, 22, 24, 25, 31]

arr.sort((a, b) => b - a); // 숫자 요소 내림차순 정렬

console.log(arr); // [31, 25, 24, 22, 10, 9, 2, 1]
```

그렇다면, 객체를 요소로 갖는 배열을 정렬하기 위해서는 어떤 과정을 거쳐야할까?

```js
const arr = [
  { name: "Adam", age: 25 },
  { name: "Harry", age: 12 },
  { name: "John", age: 41 },
  { name: "Thomson", age: 33 },
  { name: "Steve", age: 65 },
];

function compare(key) {
  return (a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0);
}

arr.sort(compare("age"));

console.log(arr);
```

위와 같이 정의한 메서드를 `sort` 메서드의 인수인 비교 함수로 전달하게되면 키 값인 `age` 로 객체가 정렬되는 것을 알 수 있다.

---

### **2. Array.prototype.forEach**

`forEach` 메서드는 반복문 `for`을 대체할 수 있는 고차 함수로써, 반복문을 활용하기 위해 변수를 선언해야하는 `for`과 달리 배열의 모든 요소를 순회하면서 콜백 함수를 반복적으로 수행하는 함수이다.

```js
const arr = [1, 2, 3, 4, 5];

const doubleArr = [];

arr.forEach((item) => {
  doubleArr.push(item * 2);
});

console.log(doubleArr); // [2, 4, 6, 8, 10]
```

위 처럼 `arr` 배열의 요소 5개를 모두 순회하면서 새로운 배열 `doubleArr`에 요소의 두배인 요소들을 삽입하도록 구현할 수 있다.

`forEach` 메서드는 콜백함수를 호출할 때 `forEach`를 호출한 배열의 요소값과 인덱스, `forEach` 메서드를 호출한 배열(this)를 순차적으로 전달한다.

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach((item, index, array) => {
  console.log(
    `현재 요소 값: ${item}, 현재 인덱스: ${index}, this: ${JSON.stringify(
      array
    )}`
  );
});
```

위 코드의 출력 결과는 다음과 같다.

```
현재 요소 값: 1, 현재 인덱스: 0, this: [1,2,3,4,5]
현재 요소 값: 2, 현재 인덱스: 1, this: [1,2,3,4,5]
현재 요소 값: 3, 현재 인덱스: 2, this: [1,2,3,4,5]
현재 요소 값: 4, 현재 인덱스: 3, this: [1,2,3,4,5]
현재 요소 값: 5, 현재 인덱스: 4, this: [1,2,3,4,5]
```

또한, `forEach` 메서드는 원본 배열을 변경하지 않지만, 직접 원본 배열을 조작하여 변경하는 것이 가능하다.

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach((item, index, array) => {
  array[index] = item * 2;
});

console.log(arr); // [2, 4, 6, 8, 10]
```

`for` 반복문은 희소배열의 존재하지 않는 요소를 포함하지만,

`forEach` 메서드는 희소배열에 있어 존재하지 않는 요소는 순회 대상에 포함하지 않는다.

```js
const arr = [1, , 3, , 5];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1, undefined, 3, undefined, 5
}

arr.forEach((item) => {
  console.log(item); // 1, 3, 5
});
```

---

### **3. Array.prototype.map**

`map` 메서드는 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백함수를 반복 호출하여 그 함수의 반환값으로 구성된 새로운 배열을 반환하는 메서드이다.

```js
const arr = [1, 2, 3, 4, 5];

const arr2 = arr.map((item) => item * 2);

console.log(arr2); // [2, 4, 6, 8, 10]
```

어떻게 보면, `forEach` 메서드와 비슷하게 보일수도 있지만, `forEach` 메서드는 항상 `undefined`를 반환하고  
`map` 메서드는 **_요소값을 다른 값으로 매핑한 새로운 배열을 반환한다_**는 차이점이 있다.

`map` 메서드를 통해 새롭게 생성된 배열은 기존 배열과 `length` 프로퍼티가 반드시 일치한다.

`map` 메서드는 `forEach` 메서드와 동일하게 콜백 함수 호출시에 인수로 배열의 요소, 인덱스, 배열을 전달한다.

```js
const arr = [1, 2, 3, 4, 5];

arr.map((item, index, array) => console.log(item, index, array));
```

위 예제의 출력 결과는 다음과 같다.

```
1 0 (5) [1, 2, 3, 4, 5]
2 1 (5) [1, 2, 3, 4, 5]
3 2 (5) [1, 2, 3, 4, 5]
4 3 (5) [1, 2, 3, 4, 5]
5 4 (5) [1, 2, 3, 4, 5]
```

---

### **4. Array.prototype.filter**

`filter` 메서드는 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백함수를 반복호출하고, 콜백 함수의 반환값이 `true`인 요소로만 구성된 새로운 배열을 반환한다.

```js
const arr = [1, 2, 3, 4, 5];

const arr2 = arr.filter((item) => item % 2 === 0);

console.log(arr2); // [2, 4]
```

위 예제는 전달받은 콜백함수의 반환값이 true인 즉, 짝수인 요소들로만 구성된 배열을 반환하는 예제이다.

따라서, `filter` 메서드를 통해 반환된 새로운 배열의 `length` 프로퍼티의 값은 원본 배열의 `length` 프로퍼티의 값보다 작거나 같다.

그리고, `filter` 메서드는 `forEach`, `map` 메서드와 마찬가지로 콜백 함수에 요소값, 인덱스, 배열을 전달받을 수 있다.

---

### **5. Array.prototype.reduce**

`reduce` 메서드는 배열의 모든 요소를 순회하면서 전달받은 콜백함수는 반복적으로 호출한다.

또한, 콜백 함수의 반환값을 다음 순회에 콜백 함수의 첫번째 인수로 전달해 결과값을 만들어 반환한다.

따라서 `reduce` 메서드는 **_하나의 결과값을 반환_**하며, 원본 배열을 변경하지 않는다.

`reduce` 메서드는 다음과 같이 콜백에 4개의 인수가 전달될 수 있다. 만약 배열의 요소가 5개라면

`reduce` 메서드를 총 5회 호출하게되는데 인수들의 변화는 다음과 같다

|     구분      | accumulator | currentValue | index |    array    |        콜백함수의 반환값        |
| :-----------: | :---------: | :----------: | :---: | :---------: | :-----------------------------: |
|  첫번째 순회  |  0(초기값)  |      1       |   0   | [1,2,3,4,5] | 1 (accumulator + currentValue)  |
|  두번째 순회  |      1      |      2       |   0   | [1,2,3,4,5] | 3 (accumulator + currentValue)  |
|  세번째 순회  |      3      |      3       |   0   | [1,2,3,4,5] | 6 (accumulator + currentValue)  |
|  네번째 순회  |      6      |      4       |   0   | [1,2,3,4,5] | 10 (accumulator + currentValue) |
| 다섯번째 순회 |     10      |      5       |   0   | [1,2,3,4,5] | 15 (accumulator + currentValue) |

```js
const num = [1, 2, 3, 4, 5];

const sum = num.reduce((acc, cur) => acc + cur, 0);

console.log(sum); // 15
```

`reduce` 메서드의 두 번째 인수로 전달하는 초기값은 생략하는 것이 가능하지만, 객체의 특정 프로퍼티 값을 합산하는 경우에는 반드시 초기값이 필요하기 때문에 가능하면 초기값을 생략하지 않는것이 좋다.

```js
const myCart = [
  { name: "computer", price: 700000 },
  { name: "laptop", price: 1700000 },
  { name: "keyboard", price: 120000 },
  { name: "t-shirt", price: 35000 },
  { name: "snack", price: 1200 },
];

const sum = myCart.reduce((acc, cur) => acc + cur.price, 0);

console.log(sum); // 2556200
```

---

### **6. Array.prototype.some**

`some` 메서드는 요소를 순회하면서 전달된 콜백함수의 반환값이 단 한번이라도 참이면 `true` 모두 거짓이면 `false`를 반환하는 메서드이다.

정리하면, 배열의 요소 중에 콜백함수를 통해 정의한 조건을 만족하는지에 따라 불리언 값을 반환한다.

`forEach` `map` `filter` 메서드와 마찬가지로 콜백함수는 요소값, 인덱스, 해당 배열을 전달받을 수 있다.

```js
const num = [1, 2, 3, 4, 6];

const result = num.some((item) => item > 5);

console.log(result); // true
```

위 예제는 배열의 요소중에 5보다 큰 요소가 있는지를 검사하는 과정인데 단 하나의 요소가 5보다 크기때문에  
반환값은 `true`이다.

```js
const num = [];

const result = num.some((item) => item > 5);

console.log(result); // false
```

만약 위와 같이 배열이 빈 배열이라면, 항상 `false`를 반환한다.

---

### **7. Array.prototype.every**

`every` 메서드는 `some`과 비슷한 메서드지만, 살짝 다른 차이점이 존재한다.  
`some` 메서드가 콜백함수의 반환값이 단 한번이라도 참이면 `true`를 반환하는 반면에  
`every` 메서드는 요소를 순회하면서 콜백함수의 반환값이 모두 참이어야만 `true`를 반환한다.

```js
const num = [6, 7, 8, 9, 1];

const result = num.every((item) => item > 5);

console.log(result); // false
```

위 예제는 배열의 요소 중 단 하나의 값만 콜백함수의 반환값이 `false`인데도 불구하고 `false`를 반환한다.

```js
const num = [];

const result = num.every((item) => item > 5);

console.log(result); // true
```

만약 위와 같이 배열이 빈 배열이라면, 항상 `true`를 반환한다.

---

### **8. Array.prototype.find**

`find` 메서드는 요소를 반환하는 메서드로, 인수로 전달된 콜백함수를 호출하여 반환값이 `true`인 첫 번째 요소를 반환한다.

`forEach` `map` `filter` 메서드와 마찬가지로 콜백함수는 요소값, 인덱스, 해당 배열을 전달받을 수 있다.

```js
const product = [
  { name: "melon", price: 5000 },
  { name: "strawberry", price: 7000 },
  { name: "grape", price: 4000 },
  { name: "apple", price: 2500 },
  { name: "kiwi", price: 4400 },
];

const fruit = product.find((item) => item.price === 4000);

console.log(fruit); // {name: 'grape', price: 4000}
```

여기서 `filter` 메서드와 `find` 메서드와의 차이점은

`filter` 메서드는 호출 결과가 `true`인 요소를 포함한 새로운 배열을 생성하여 반환한다는 것이고

`find` 메서드는 호출 결과가 `true`인 **첫번째 요소만을 배열이 아닌 해당 요소 값을 반환**한다는 것이다.

---

### **9. Array.prototype.findIndex**

`findIndex` 메서드는 `find` 메서드와 비슷한 메서드이지만 둘의 메서드는 차이점이 존재한다.

`find` 메서드는 호출 결과가 `true`인 첫번쨰 요소의 값을 반환하는 메서드이지만

`findIndex` 메서드는 호출 결과가 `true`인 첫번째 요소 값의 **_인덱스_**를 반환하는 메서드이다.

```js
const num = [4, 2, 16, 6, 5];

const result = num.findIndex((item) => item > 5);

console.log(result); // 2
```

콜백 함수의 조건(item > 5)을 만족하는 첫 번째 요소는 '16'이고 따라서 '16'의 인덱스인 2를 반환한다.

---

### **10. Array.prototype.flatMap**

`flatMap` 메서드는 기존 `flat` 메서드와 `map` 메서드가 합쳐진 메서드라고 볼 수 있다.

먼저 `map` 메서드를 수행 후 `flat` 메서드를 수행한 것으로 볼 수 있는데, 중첩 배열에 대해 `map`을 수행 후 평탄화 해주는 작업을 동시에 해주는 메서드 임을 알 수 있다.

만약 `map` 메서드를 사용하여 배열의 요소들을 3개씩 요소로 추가하고 싶을 때를 가정해보자.

```js
const num = [1, 2, 3, 4, 5];

const result = num.map((item) => [item, item, item]);

console.log(result); // [Array(3), Array(3), Array(3), Array(3), Array(3)]
```

위 처럼 중첩 배열로 만들어지는데 이 중첩 배열을 평탄화 해주기 위해서는 `flat` 메서드를 사용하여

```js
const num = [1, 2, 3, 4, 5];

const result = num.map((item) => [item, item, item]).flat();

console.log(result); // [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5]
```

위와 같이 평탄화된 배열로 나타낼 수 있다.

`map` 메서드와 `flat` 메서드를 체이닝 하는 것과 같은 결과를 낳는 메서드가 바로 `flatMap`이기 때문에

```js
const num = [1, 2, 3, 4, 5];

const result = num.flatMap((item) => [item, item, item]);

console.log(result); // [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5]
```

위와 같이 나타낼 수 있다.
