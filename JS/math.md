# **Math**

Math는 수학적인 계산을 위해서 필요한 프로퍼티와 메서드를 제공하는 표준 빌트인 객체이다.

Math는 생성자 함수가 아니기 때문에 프로토타입 메서드를 가지지 않으며

오직 정적 메서드와 정적 프로퍼티만을 가진다.

예제를 통해 프로퍼티와 메서드에 대해 살펴보자.

---

## **Math 프로퍼티**

---

### **Math.PI**

```js
const PI = Math.PI;

console.log(PI); // 3.141592653589793
```

흔히 잘 알고 있는 원주율 PI값을 반환하는 프로퍼티 이다.

---

## **Math 메서드**

---

### **1. Math.abs**

```js
console.log(Math.abs(-1000)); // 1000
console.log(Math.abs(1000)); // 1000
console.log(Math.abs("-1000")); // 1000
console.log(Math.abs("")); // 0
console.log(Math.abs(null)); // 0
console.log(Math.abs(undefined)); // NaN
console.log(Math.abs("string")); // NaN
console.log(Math.abs()); // NaN
```

Math.abs() 메서드는 전달받은 인수의 절대값을 반환하는 메서드로 절대값은 항상 0 또는 양수여야한다.

---

### **2. Math.round**

```js
const pi = Math.PI;

console.log(Math.round(pi)); // 3
```

Math.round() 메서드는 전달받은 인수의 소수점 자리를 **_반올림_** 한 **정수**를 반환한다.

---

### **3. Math.ceil**

```js
console.log(Math.ceil(1.2)); // 2
console.log(Math.ceil(1.6)); // 2
console.log(Math.ceil(-1.8)); // -1
```

Math.ceil() 메서드는 전달받은 인수의 소수점 자리를 **_올림_** 한 **정수**를 반환한다.

이 때, **_인수로 음수를 전달하든 양수를 전달하든 더 큰 정수가 된다는 것을 기억하자._**

---

### **4. Math.floor**

```js
console.log(Math.floor(1.2)); // 1
console.log(Math.floor(1.6)); // 1
console.log(Math.floor(-1.8)); // -2
```

Math.floor() 메서드는 전달받은 인수의 소수점 자리를 **_버림_** 한 **정수**를 반환한다.

이 때, **_인수로 음수를 전달하든 양수를 전달하든 더 작은 정수가 된다는 것을 기억하자._**

---

### **5. Math.sqrt**

```js
console.log(Math.sqrt(64)); // 8
console.log(Math.sqrt(36)); // 6
```

Math.sqrt() 메서드는 전달받은 인수의 제곱근을 반환한다. 즉, 전달받은 인수에 루트를 씌우는 것과 같다.

---

### **6. Math.random**

```js
const random = Math.floor(Math.random() * 10 + 1);

console.log(random); // 1 ~ 10 까지의 범위의 랜덤한 수
```

Math.random() 메서드는 0부터 1 **미만**의 랜덤한 실수를 반환한다.

따라서 **특정 범위의 랜덤한 정수를 얻으려는 함수는 다음과 같이 만들 수 있다.**

```js
function rand(min, max) {
  return Math.floor(Math.random() * (max - mix) + min);
}

console.log(rand(4, 19)); // 4 ~ 19 까지 범위의 랜덤한 수
```

---

### **7. Math.max**

```js
const random = Math.floor(Math.random() * 10 + 1);

console.log(random); // 1 ~ 10 까지의 범위의 랜덤한 수
```

Math.max() 메서드는 전달받은 인수들 중 가장 큰 수를 반환하는 메서드이다.

메서드에 인수를 전달하지 않는다면 `-Infinity`를 반환한다.

```js
const a = [1, 124, 22, 124125, 16463463];

console.log(Math.max(...a)); // 16463463
```

Math.max() 메서드의 인수로 배열을 전달하기 위해서는 스프레드 문법을 사용하거나

Function.prototype.apply() 메서드를 사용하도록 한다.

---

### **8. Math.min**

```js
const arr = [12, 2, 41, -11, -123];

console.log(Math.min.apply(null, arr)); // -123
console.log(Math.min(...arr)); // -123
```

Math.min() 메서드는 전달받은 인수들 중 가장 작은 수를 반환하는 메서드이다.

메서드에 인수를 전달하지 않는다면 `Infinity`를 반환한다.

Math.min() 메서드의 인수로 배열을 전달하기 위해서는 스프레드 문법을 사용하거나

Function.prototype.apply() 메서드를 사용하도록 한다.
