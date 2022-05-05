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
