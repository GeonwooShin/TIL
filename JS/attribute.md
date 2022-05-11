## **객체 내부 슬롯**

모든 객체는 내부적으로 `[[Prototype]]` 이라는 슬롯을 가진다. 이 슬롯은 자바스크립트의 내부 슬롯이다.

따라서, 직접 접근할 수 없지만, `__proto__`를 통해서 간접적으로 접근하는 것이 가능하다.

```js
const obj = {};

console.log(obj.[[Prototype]]); // Uncaught SyntaxError: Unexpected token '['
console.log(obj.__proto__); // Object.prototype
```

---

## **프로퍼티 어트리뷰트**

프로퍼티 어트리뷰트는 **프로퍼티의 상태**를 나타내는 것으로, 프로퍼티의 값, 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부를 일컫는다.

이러한 프로퍼티 어트리뷰트는 프로퍼티를 생성할 때 기본값으로 자동적으로 정의된다.

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 슬롯 `[[Value]]`, `[[Writable]]`, `[[Enumerable]]`, `[[Configurable]]` 이다.

또한, 객체 내부슬롯이기 때문에 직접 접근은 불가능하고, `Object.getOwnPropertyDescriptor` 메서드를 사용하여 간접적으로 확인이 가능하다.

```js
const product = {
  name: "laptop",
  brand: "Apple",
  price: 1500000,
};

console.log(Object.getOwnPropertyDescriptor(product, "name"));
// {value: 'laptop', writable: true, enumerable: true, configurable: true}

console.log(Object.getOwnPropertyDescriptors(product));
/* 
brand: {value: 'Apple', writable: true, enumerable: true, configurable: true}
name: {value: 'laptop', writable: true, enumerable: true, configurable: true}
price: {value: 1500000, writable: true, enumerable: true, configurable: true}
*/
```

위의 예시처럼 `Object.getOwnPropertyDescriptor` 메서드를 사용하면 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.

`Object.getOwnPropertyDescriptor` 메서드의 첫 번째 매개변수로는 객체를 전달하고, 두 번째 매개변수로는 어트리뷰트 정보를 포함한 제공받고싶은 프로퍼티의 키를 **문자열**로 전달한다.

만약에 객체의 모든 프로퍼티 어트리뷰트 정보를 얻으려면 `Object.getOwnPropertyDescriptors` 메서드를 사용하여 매개 변수로 객체를 전달하면, 해당 객체의 모든 프로퍼티 어트리뷰트 정보를 얻을 수 있다.

---

## **프로퍼티의 종류**

프로퍼티는 일반적으로 우리가 알고있는 키와 값으로 구성된 **데이터 프로퍼티**와 값을 갖지는 않지만 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 **접근자 프로퍼티**가 존재한다.

### **데이터 프로퍼티**

데이터 프로퍼티가 갖는 프로퍼티 어트리뷰트는 다음과 같다.

```
1. [[Value]]

- 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값
- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당한다.
- 만약 프로퍼티가 없다면 동적 생성하여 [[Value]]에 값을 저장한다.

2. [[Writable]]

- 프로퍼티 값의 변경 가능 여부를 불리언 값으로 나타낸다.
- [[Writable]]의 값이 false인 경우 해당 프로퍼티는 값을 변경할 수 없는 읽기 전용이 된다.

3. [[Enumerable]]

- 프로퍼티의 열거 가능 여부를 불리언 값으로 나타낸다.
- [[Enumerable]] 값이 false인 경우 해당 프로퍼티는 for in, Object.keys 메서드 등으로 열거가 불가능하다.

4. [[Configurable]]

- 프로퍼티의 재정의 가능 여부를 불리언 값으로 나타낸다.
- [[Configurable]] 값이 false인 경우 해당 프로퍼티의 삭제가 불가능하고, 프로퍼티 어트리뷰트 값의 변경이 불가능해진다.
```

다음 예제를 살펴보자.

```js
const user = {
  name: "John",
  age: 19,
};

console.log(Object.getOwnPropertyDescriptor(user, "age"));
```

위의 예제에서는 콘솔에 `user` 객체가 가지는 `age` 프로퍼티의 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 가진다.

프로퍼티 디스크립터 객체는 다음과 같이 이루어져 있다.

```js
{value: 19, writable: true, enumerable: true, configurable: true}
```

위의 프로퍼티 디스크립터 객체의 프로퍼티에서 `value`는 프로퍼티가 생성될 때의 프로퍼티의 값으로 초기화되고, 나머지 `writable`, `enumerable`, `configurable`은 `true`로 초기화된다.

---

### **접근자 프로퍼티**

접근자 프로퍼티는 데이터 프로퍼티와 다르게 자체적인 값을 가지지 않으며, 데이터 프로퍼티의 값을 읽거나 저장할 때 관여하는 프로퍼티이다.

```
1. [[Get]]

- 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수이다.
- 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 그 결과가 프로퍼티 값으로 반환된다.

2. [[Set]]

- 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수이다.
- 접근자 프로퍼티 키로 값을 저장하면 그 결과가 프로퍼티 값으로 저장된다.

3. [[Enumerable]]

- 데이터 프로퍼티의 [[Enumerable]] 값과 같다

4. [[Configurable]]

- 데이터 프로퍼티의 [[Configurable]] 값과 같다
```

다음 예제를 살펴보자.

```js
const user1 = {
  name: "James",
  age: 39,
  get profile() {
    return `${this.name} ${this.age}`;
  },
  set userName(name) {
    this.name = name;
  },
};

console.log(user1.profile); // James 39

user1.userName = "Ryan";

console.log(user1.profile); // Ryan 39
```

위의 예제에서는 profile 이라는 getter 함수를 가지고, userName 이라는 setter 함수를 가진다.

userName 이라는 접근자 프로퍼티를 통해 프로퍼티 값을 저장한다.

따라서, 저장된 프로퍼티 값을 profile 이라는 접근자 프로퍼티를 통해 프로퍼티 값을 참조한다.

---

## **프로퍼티 정의**

`Object.defineProperty`를 통해 객체의 프로퍼티 어트리뷰트를 정의하는 것이 가능하다.

즉, 객체에 직접 새로운 어트리뷰트를 정의하거나 이미 존재하는 어트리뷰트를 수정하는 것이 가능하다.

```js
const obj = {
  name: "John",
  age: 39,
};

Object.defineProperty(obj, "city", {
  value: "NewYork",
});

console.log(Object.getOwnPropertyDescriptor(obj, "city"));
// {value: 'NewYork', writable: false, enumerable: false, configurable: false}

console.log(obj.city); // NewYork
```

위의 예제처럼 프로퍼티 `city`에 대한 프로퍼티 어트리뷰트 `value`를 정의 해주는 것이 가능하다.

하지만, 이 때 `city` 프로퍼티의 프로퍼티 어트리뷰트는 모두 기본값인 `false`로 설정된다.

따라서, 프로퍼티 키 `city`의 프로퍼티 값을 변경 또는 삭제하는 것이 불가하고, for in문이나 `Object.keys`로 접근하여 순회하는 것이 불가능하다.

```js
const obj = {
  name: "John",
  age: 39,
};

Object.defineProperty(obj, "city", {
  value: "NewYork",
  configurable: true,
});

Object.defineProperty(obj, "city", {
  writable: true,
});

obj.city = "Washington";

console.log(obj.city); // Washington
```

위의 예제를 보면 `configurable` 속성을 `true`로 설정했기 때문에 프로퍼티 어트리뷰트의 재정의가 가능해진다.

따라서, 다시 한번 `Object.defineProperty`를 통해 어트리뷰트를 재정의하는 것이 가능하기 때문에 `writable` 속성을 `true`로 설정하여 프로퍼티 값을 변경하는 것이 가능하도록 설정한다면 위 객체 프로퍼티 city의 값이 NewYork에서 Washington으로 변경된다.

이처럼 위에서 `Enumerable` 속성을 `true`로 설정해준다면 for in문이나 `Object.keys` 메소드를 사용하여 열거하는 것도 가능해진다.

---

객체의 다수의 프로퍼티 속성을 한번에 지정하려면 `Object.defineProperties` 메서드를 사용한다.

```js
const user = {
  name: "John",
  age: 39,
};

Object.defineProperties(user, {
  name: {
    value: "Ryan",
    writable: false,
    enumerable: false,
    configurable: false,
  },
  age: {
    value: 42,
    writable: false,
    enumerable: false,
    configurable: false,
  },
});

console.log(Object.getOwnPropertyDescriptors(user));
/* age:
configurable: false
enumerable: false
value: 42
writable: false
*/

/*
name:
configurable: false
enumerable: false
value: "Ryan"
writable: false
*/
```

---

## **객체 보호**

|          메서드          | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 속성 변경 | 프로퍼티 값 변경 |
| :----------------------: | :-----------: | :-----------: | :----------------: | :--------------: |
| Object.preventExtensions |       x       |       o       |         o          |        o         |
|       Object.seal        |       x       |       x       |         o          |        o         |
|      Object.freeze       |       x       |       x       |         x          |        x         |

### **Object.preventExtensions**

`Object.preventExtensions` 메서드는 객체의 확장을 막는 것으로 새로운 프로퍼티를 추가하는 것을 막는다.

```js
const user = {
  name: "John",
  age: 39,
};

Object.preventExtensions(user); // 객체 확장 방지

user.city = "NewYork"; // 프로퍼티 추가 불가능
user.name = "Amy"; // 프로퍼티 값의 변경 가능
delete user.age; // 프로퍼티 삭제 가능
console.log(user); // {name: 'Amy'}

console.log(Object.getOwnPropertyDescriptor(user, "name"));
// {value: 'Amy', writable: true, enumerable: true, configurable: true}

Object.defineProperty(user, "name", {
  writable: false,
}); // 프로퍼티 속성 변경 가능

console.log(Object.getOwnPropertyDescriptor(user, "name"));
// {value: 'Amy', writable: false, enumerable: true, configurable: true}
```

따라서 위의 예시와 같이 프로퍼티 값을 변경하거나 삭제하는 것, 그리고 프로퍼티의 속성을 변경하는 것에는 문제가 없다.

### **Object.seal**

`Object.seal` 메서드는 객체를 밀봉시키는 것으로 새로운 프로퍼티 추가, 프로퍼티 삭제를 막아준다.

프로퍼티 값의 변경은 가능하고, 객체의 프로퍼티 속성이 `writable` 의 값이 `true`인 경우에는 `configurable` 속성을 제외한 나머지 프로퍼티 속성 변경이 가능하지만, `writable` 속성의 값이 `false`인 경우에는 모든 프로퍼티 속성 변경이 불가능하다.

```js
const user = {
  name: "John",
  age: 39,
};

Object.seal(user);

console.log(Object.isSealed(user)); // true

user.city = "NewYork"; // 프로퍼티 추가 불가능
user.name = "Amy"; // 프로퍼티 값 변경 가능
delete user.age; // 프로퍼티 삭제 불가능
console.log(user); // {name: 'Amy', age: 39}

console.log(Object.getOwnPropertyDescriptor(user, "age"));
// {value: 'Amy', writable: true, enumerable: true, configurable: false}

Object.defineProperty(user, "age", {
  value: 33,
}); // 프로퍼티 속성 변경 가능

Object.defineProperty(user, "age", {
  value: 35,
}); // 프로퍼티 속성 변경 가능

Object.defineProperty(user, "age", {
  writable: false,
}); // 프로퍼티 속성 변경 가능 단, 이 변경 이후로 부터 프로퍼티 속성 변경 불가능

console.log(Object.getOwnPropertyDescriptor(user, "age"));
// {value: 'Amy', writable: false, enumerable: true, configurable: false}
```

`Object.seal` 메서드는 `Object.isSealed` 메서드를 통해 밀봉이 되었는지 안되었는지 불리언 값으로 확인이 가능하다. `Object.seal` 메서드를 사용하면 해당 객체의 프로퍼티 속성인 `configurable` 의 값은 `false`로 변경된다.

이 때, 객체의 프로퍼티 속성 중 `writable`의 기본 값은 `true`이기 때문에 `configurable`의 값이 `false`임에도 불구하고 프로퍼티 속성의 변경이 가능하다.

후에 프로퍼티 속성 `writable`의 값을 `false`로 바꿔준다면, 프로퍼티 속성의 변경이 불가해진다.

### **Object.freeze**

`Object.freeze` 메서드는 객체를 동결시키는 것으로 프로퍼티 추가 및 삭제 금지, 프로퍼티 어트리뷰트 재정의와 프로퍼티 값 변경 또한 금지된다. 즉, 동결 상태인 객체는 읽기 전용 객체이다.

```js
const user = {
  id: "hayden0011",
  name: "Hayden",
  email: "hayden0011@gmail.com",
};

Object.freeze(user); // 객체 동결

console.log(Object.isFrozen(user)); // 객체 동결 확인

user.phoneNumber = "010-0000-0000"; // 프로퍼티 추가 불가능
user.name = "Bryan"; // 프로퍼티 값 변경 불가능
delete user.name; // 프로퍼티 삭제 불가능

// Object.defineProperty(user, "name", {
//   enumerable: false,
// });  // 프로퍼티 어트리뷰트 재정의 불가능

console.log(Object.getOwnPropertyDescriptor(user, "name"));
// {value: 'Hayden', writable: false, enumerable: true, configurable: false}
```
