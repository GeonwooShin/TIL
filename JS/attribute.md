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
