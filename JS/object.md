# **객체 리터럴**

자바스크립트에서 객체는 빠질수 없는 것으로, 자바스크립트의 **거의 모든 것**이 객체이다.

객체는 변경이 가능한 값이며, 0개 이상의 프로퍼티로 이루어져 있고  
프로퍼티는 프로퍼티 키와 프로퍼티 값으로 이루어져 있다.

```js
const user = {
  name: "Joshua",
  age: 25,
};
```

위의 예제는 객체를 표현한 것이고, 두개의 프로퍼티를 가진다.

`name` 과 `age`는 프로퍼티 키이고, 'Joshua'와 25는 프로퍼티 값에 해당한다.

또한, 자바스크립트에서는 함수가 일급 객체이므로 값으로 취급할 수 있기 때문에 함수도 객체의 프로퍼티 값으로 사용할 수 있다. 이 때는 이 함수를 `메서드`라고 부른다.

```js
const user = {
  name: "Joshua",
  age: 25,
  hi: function () {
    console.log(`Hi my name is ${this.name} and I'm ${this.age} years old.`);
  },
};

user.hi(); // Hi my name is Joshua and I'm 25 years old.
```

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

### **생성자 함수**

생성자 함수를 통해 객체를 생성하는 방법은 다음과 같다.

```js
const product = new Object();

console.log(product); // {}

product.name = "laptop";

console.log(product); // {name: 'laptop'}
```

처음에는 빈 객체를 생성했지만, 위처럼 프로퍼티를 동적으로 생성하는 것이 가능하다.
