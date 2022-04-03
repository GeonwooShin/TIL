# **이터러블**

이터러블은 이터러블 프로토콜을 따르는 객체를 의미한다.

그럼 여기서, 이터러블 프로토콜은 무엇일까?

이터러블 프로토콜이란, **Symbol.iterator** 메소드를 정의해주거나, 프로토타입 상속을 통해 상속받은 Symbol.iterator 메서드를 가지고 있는 것을 **_이터러블 프로토콜_** 이라고 한다.

따라서, 이 이터러블 프로토콜의 조건을 충족하면 **_이터러블_** 이라고 한다.

중요한 점은 이터러블 객체는 for of문으로 순회할 수 있고, 스프레드 문법과 디스트럭처링 할당이 가능하다.

자바스크립트에서는 빌트인 이터러블을 제공한다. 그 종류로는 아래와 같다.

```
1. Array  => Array.prototype[Symbol.iterator]

2. String  => String.prototype[Symbol.iterator]

3. Map  => Map.prototype[Symbol.iterator]

4. Set  => Set.prototype[Symbol.iterator]

5. TypedArray  => TypedArray.prototype[Symbol.iterator]

6. arguments  => arguments.prototype[Symbol.iterator]

7. DOM 컬렉션  => HTMLCollection.prototype[Symbol.iterator],
                NodeList.prototype[Symbol.iterator]
```

이터러블 프로토콜을 준수하는 위와 같은 빌트인 이터러블은 for of 문과 스프레드 문법, 디스트럭처링 할당을 사용할 수 있다고 했다. 예제를 한 번 살펴보자

---

### **for of 문 예제 1)**

```js
const b = [1, 2, 3];

for (const item of b) {
  console.log(item);
}
```

배열은 이터러블이기 때문에 위와 같이 for of 문을 사용할 수 있다.

스프레드 문법과, 디스트럭처링은 다음에 따로 파트를 나누어 설명하도록 하겠다.

---

## **이터레이터**

이터레이터는 **_이터러블의 Symbol.iterator 메서드를 호출하면 반환되는 것_**으로, next() 메서드를 갖는다.

예시를 한번 보자

---

### **이터레이터 예제 1)**

```js
const a = ["a", "b", "c", "d", "e"];

const iterator = a[Symbol.iterator]();

for (let i = 0; i <= a.length; i++) {
  console.log(iterator.next());
}
```

이터레이터의 next 메서드는 이터러블의 각 요소를 순회하는 포인터와 같은 역할을 한다.

따라서, 위 예제의 출력 결과는 다음과 같다.

```
{value: 'a', done: false}
{value: 'b', done: false}
{value: 'c', done: false}
{value: 'd', done: false}
{value: 'e', done: false}
{value: undefined, done: true}
```

value 프로퍼티는 현재 순회중인 이터러블의 값, done 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.

---

그렇다면 이번에는 유사 배열과 이터러블의 차이에 대해 알아보자.

## **유사 배열 vs 이터러블**

---

자바스크립트에서는 기본적으로 일반 객체는 이터러블 프로토콜을 준수하는 이터러블이 아니다.

다음 예제를 살펴보자.

---

### **일반 객체 예제 1)**

```js
let object = {
  0: "a",
  1: "b",
  length: 2,
};

for (let i = 0; i < object.length; i++) {
  console.log(object[i]);
}
```

이렇게 일반 객체는 인덱스와 length 프로퍼티가 존재해서 배열인 것 같은 느낌을 준다.

그러나 이터러블이 아니기 때문에 for of 문, 스프레드 문법, 디스트럭처링 할당을 사용할 수 없다.

하지만, 일반 객체를 이터러블로 만들수 없는 것은 아니다. 일반 객체도 이터러블로 구현할 수 있다.

### **사용자 정의 이터러블 예제 1)**

```js
let range = {
  from: 1,
  to: 5,
};

range[Symbol.iterator] = function () {
  return {
    current: this.from,
    last: this.to,
    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    },
  };
};

for (let num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

```
1. 이터러블 프로토콜을 준수하려면 Symbol.iterator 메서드를 가지고 있어야 하기 때문에
   range 객체에 Symbol.iterator 메서드를 직접 구현한다.

2. 이터러블의 Symbol.iterator 메서드를 호출하게 되면 이터레이터를 반환해야 하기 때문에
   next() 메서드를 구현하여 value와 done 프로퍼티를 구현해준다.

3. 일반 객체인 range가 for of 문을 사용할 수 있게 된다.
```
