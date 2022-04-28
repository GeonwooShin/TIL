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
