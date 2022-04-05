# **구조 분해 할당**

구조 분해 할당은 배열이나 객체를 해체하여 개별적인 변수에 담을 수 있도록하는 것이다.

구조 분해 할당의 특징으로 할당 연산자 우측에는 모든 이터러블이 올 수 있다.

또한, 할당 연사자 좌측에는 할당가능한 것은 모두 올 수 있다.

다양한 예제를 살펴보면서 구조 분해 할당을 이해해보자.

---

### **배열 구조 분해 할당**

```js
const arr = [123, 456];

// const a = arr[0];  // arr 배열의 인덱스로 접근
// const b = arr[1];  // arr 배열의 인덱스로 접근

const [a, b] = arr; // 인덱스로 접근하지 않고도 변수에 값 할당

console.log(a, b);
```

위 예제의 출력 결과는 **_123 456_** 이다.

구조 분해 할당을 사용하지 않고 변수에 배열의 값을 할당하려면 인덱스로 접근해야 하지만,  
구조 분해 할당을 사용한다면 간단하게 변수에 값을 할당할 수 있다.

---

### **요소 무시하기**

```js
const arr = [123, 456, 789, 111, 222];

const [a, b, , , c] = arr;

console.log(a, b, c);
```

위 예제의 출력 결과는 **_123 456 222_** 이다.

기본적으로 구조 분해 할당은 쉼표로 필요하지 않은 배열 요소를 무시할 수 있기 때문에 할당이 필요하지 않은 값은 쉼표로 무시할 수 있다.

---

### **Rest 요소**

```js
const [a, b, ...rest] = [1, 2, 3, 4, 5, 6];

console.log(rest);
```

위 예제의 출력 결과는 **_[3, 4, 5, 6]_** 이다.

(...)을 사용하는 경우에는 구조 분해로 할당하고 남은 부분을 하나의 변수에 할당이 가능하다.

---

### **객체 구조 분해 할당**

ES5에서는 객체의 프로퍼티를 변수에 할당하기 위해서는 프로퍼티 키를 사용해서 할당을 해야했다.

하지만, ES6에서는 객체의 각 프로퍼티를 객체로부터 추출하여 변수에 할당하는 방법을 사용한다.

```js
const product = {
  price: 25000,
  country: "Korea",
};

// const price = product.price; // ES5
// const country = product.country; // ES5

const { price, country } = product;

console.log(price, country);
```

객체 구조 분해 할당의 대상은 당연히 객체여야하고, 할당 기준은 **프로퍼티 키**이다.

따라서, 순서는 의미가 없고, 선언된 변수 이름과 프로퍼티 키가 일치하면 된다.

하지만, 객체의 프로퍼티 키와 다른 변수로 프로퍼티 값을 할당 받기 위해서는 아래와 같이 선언해야한다.

```js
const product = {
  price: 25000,
  country: "Korea",
};

const { price: a, country: b } = product;

console.log(a, b);
```

---

**객체를 인수로 전달받는 함수의 매개변수**

객체 구조 분해 할당은 객체를 인수로 전달받는 함수의 매개변수로도 사용이 가능하다.

```js
const fruit = {
  strawberry: 8000,
  watermelon: 15000,
  mango: 5000,
  grape: 5500,
};

// function printMangoAndGrapePrice(fruit) {
//   console.log(`mango: ${fruit.mango}, grape: ${fruit.grape}`);
// }

function printMangoAndGrapePrice({ mango, grape }) {
  console.log(`mango: ${mango}, grape: ${grape}`);
}

printMangoAndGrapePrice(fruit);
```

주석처리가 되어있는 것은 객체의 프로퍼티 키를 사용하여 접근하는 방법이고,  
실제 사용하는 함수는 객체 구조 분해 할당을 통해 객체의 프로퍼티에 접근하는 방법이다.
