# **객체 리터럴**

자바스크립트에서 객체는 빠질수 없는 것으로, 자바스크립트의 **거의 모든 것**이 객체이다.

객체는 변경이 가능한 값이며, 0개 이상의 프로퍼티로 이루어져 있다.

```js
const user = {
  name: "Joshua",
  age: 25,
};
```

위의 예제는 객체의 기본적인 형태이고, 위 객체는 두개의 프로퍼티를 가진다.

---

## **객체 생성**

### **객체 리터럴**

객체 리터럴은 아래 예제와 같이 객체를 생성한다.

```js
const product = {
  name: "computer",
  price: 1300000,
};

console.log(product); // {name: 'computer', price: 1300000}
```

### **Object 생성자 함수**

생성자 함수를 통해 객체를 생성하는 방법은 다음과 같다.

```js
const product = new Object();

console.log(product); // {}

product.name = "laptop";

console.log(product); // {name: 'laptop'}
```

처음에는 빈 객체를 생성했지만, 위처럼 프로퍼티를 동적으로 생성하는 것이 가능하다.

---

## **프로퍼티**

객체의 프로퍼티는 프로퍼티 키와 프로퍼티 값으로 이루어져 있다.

```js
const user = {
  name: "Joshua",
  age: 25,
};

console.log(user); // {name: 'Joshua', age: 25}
```

프로퍼티 키는 빈 문자열을 포함한 모든 문자열과 `Symbol` 값을프로퍼티 키로 가질 수 있고

프로퍼티 값으로는 값으로 표현할 수 있는 모든 것이 올 수 있다.

이 때, 위 예제의 `name` 과 `age`는 프로퍼티 키에 해당하고, `"Joshua"`와 `25`는 프로퍼티 값에 해당한다.

## **메서드**

그렇다면 프로퍼티 값으로는 값으로 표현할 수 있는 모든 것이 올 수 있기 때문에 함수도 오는 것이 가능하다.

```js
const user = {
  name: "Joshua",
  age: 25,
  Hi: function () {
    console.log(`Hi my name is ${this.name}`);
  },
};

user.Hi(); // Hi my name is Joshua
```

이 때, 위 객체의 메서드는 객체에 제한되어 있다. 따라서 위와 같이 함수를 호출한다.

---

## **프로퍼티 접근**

프로퍼티에 접근하는 방법으로는 두 가지의 방법이 있다. 첫 번째로는 마침표로 접근하는 방법, 두 번째로는 대괄호로 접근하는 방법이다.

예시를 통해 살펴 보자.

```js
const user = {
  name: "Thomas",
  age: 25,
  country: "USA",
};

console.log(user.name); // Thomas

console.log(user[age]); // Uncaught ReferenceError: age is not defined
```

이렇게 위와 같이 마침표 접근 연산자 우측 또는 대괄호 접근 연산자 내부에 프로퍼티 키를 넣어서 접근한다.

이 때, 대괄호 표기법을 사용하는 경우에는 프로퍼티 키를 반드시 `""` 안에 넣어야한다.

그렇지 않으면 아래처럼 자바스크립트 엔진이 프로퍼티 키가 아닌 식별자로 해석하여 오류가 발생한다.

```js
const user = {
  name: "Thomas",
  age: 25,
  country: "USA",
};

console.log(user.name); // Thomas

console.log(user["age"]); // 25
```

만약 객체에 존재하지 않는 프로퍼티 키에 접근한다면 에러가 발생하는 것이 아니라 `undefined`를 반환한다.

```js
const user = {
  name: "Thomas",
  age: 25,
  country: "USA",
};

console.log(user.name); // Thomas

console.log(user["age"]); // 25

console.log(user["height"]); // undefined
```

프로퍼티 키로 프로퍼티에 접근하는 방법은 네이밍 규칙에 따라 다른데, 만약 식별자 네이밍 규칙을 준수하는 프로퍼티 키라면 마침표 접근 연산자로 접근하는 것이 가능하지만, 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키라면 반드시 대괄호 접근자로 접근해야 한다.

```js
const user = {
  firstName: "Thomas",
  "last-name": "Luke",
};

console.log(user.firstName); // Thomas

console.log(user["firstName"]); // Thomas

console.log(user.last - name); // NaN

console.log(user["last-name"]); // Luke
```

위 처럼 네이밍 식별자 규칙을 준수하지 않는 프로퍼티 키를 마침표 접근 연산자로 접근하게 되면 브라우저에서는 `NaN`으로 평가되고, Node.js 환경에서는 `ReferenceError` 로 평가된다.

---

## **프로퍼티 동적 생성**

만약에 객체가 가지고 있지 않은 프로퍼티 키에 프로퍼티 값을 할당하게되면, 새로운 프로퍼티가 객체에 추가된다.

```js
const user = {
  name: "Mark",
  age: 33,
};

console.log(user); // {name: 'Mark', age: 33}

user.city = "Washington";
user["phone-number"] = "010-0000-1111";

console.log(user); // {name: 'Mark', age: 33, city: 'Washington', phone-number: '010-0000-1111'}
```

## **프로퍼티 삭제**

프로퍼티를 삭제하는 방법은 `delete` 연산자를 사용하여 수행할 수 있다.

이때, `delete` 연산자의 피연산자는 **프로퍼티 키**여야 한다.

```js
const greeting = {
  korea: "안녕하세요",
  america: "hello",
  france: "메롱",
};

console.log(greeting); // {korea: '안녕하세요', america: 'hello', france: '메롱'}

delete greeting.france;

console.log(greeting); // {korea: '안녕하세요', america: 'hello'}
```
