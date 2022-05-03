# **원시 타입**

자바스크립트에서 원시 타입에 해당하는 타입을 살펴 보자.

```
1. String
2. Number
3. Symbol
4. Boolean
5. null
6. undefined
```

위의 타입들은 원시 타입에 해당하고 따라서 변경이 불가능한 값이다. 변경이 불가능하다는 것은 재할당이 불가능하다는 것이 아니다.

원시 값을 변수에 할당하면 변수에는 실제 값이 저장되고, 변수에 객체를 할당하면 참조 값이 저장된다.

따라서 해당 변수를 다른 변수에 할당하는 경우, 원시 값은 원본의 원시 값이 복사되어 저장되고, 이를 값에 의한 전달이라 한다(**실제로는 메모리 주소**).

반면 객체는 원본의 참조 값이 복사되며, 이를 참조에 의한 전달이라한다.

```js
let name = "John";

name = "Ryan";

console.log(name);
```

예를 들어 위의 예제처럼 재할당은 가능하지만 재할당을 하는 경우 메모리상에 저장된 'John'이라는 값이 'Ryan'이라는 값으로 덮어씌워지는 것이 아니라 메모리에 또 다른 문자열인 'Ryan'이 생성되는 것으로 메모리에는 'John'과 'Ryan'이 모두 존재하게 된다.

이 때 식별자 `name`은 메모리에 생성된 'John'의 주소가 아닌 'Ryan'의 주소를 참조하게된다.

반면에 위의 타입을 제외한 모든 값은 객체 타입이고 이러한 객체 타입은 변경이 가능한 값이다. (물론 배열도 객체이기 때문에 변경이 가능한 값이다.)

```js
const product = {
  laptop: "Apple",
  monitor: "LG",
  TV: {
    brand: "Samsung",
    price: 15000000,
  },
};

let favorite = product.monitor;

product.monitor = "Samsung";
console.log(favorite); // 'LG'

favorite = product.monitor;
console.log(favorite); // 'Samsung'
```

위의 예제에서는 `favorite` 변수에 객체 `product.monitor` 값을 할당한 것이다.

이 때, 객체 `product.monitor` 값을 변경한 후 콘솔에 `favorite` 변수를 찍어봤을때 결과는 어떻게 될까?

객체 `product.monitor`의 값이 변경되었으니 `product.monitor` 값을 할당한 변수 `favorite`도 변경된 값을 가진다고 생각할 수도 있지만,

변수 `favorite`에 `product.monitor` 값을 할당했을 때 메모리에 이미 존재하는 `product.monitor`를 참조하는 것이 아니라 해당 `product.monitor`의 **_값_**을 메모리에 새로 생성하여 그 새로 생성된 값을 참조하기 때문에 객체의 프로퍼티 값이 변경되더라도 변수 `favorite`이 참조하는 값은 변경되지 않는다.

다음 예제를 살펴보자.

```js
const user1 = {
  isLogin: true,
  userName: "John",
};

const user2 = user1;

console.log(user1, user2);
// {isLogin: true, userName: 'John'} {isLogin: true, userName: 'John'}

user2.userName = "Thomas";

console.log(user1, user2);
// {isLogin: true, userName: 'Thomas'} {isLogin: true, userName: 'Thomas'}

console.log(user1 === user2); // true
```

분명 `user2` 변수에 `user1` 객체를 할당하고 `user2`의 프로퍼티를 변경하였는데, `user1`의 프로퍼티 또한 변경되었다. 이 때는 `user1`과 `user2`가 동일한 객체를 참조하고 있기 때문이다.

또한, 같은 참조 값을 가지기 때문에 `user1 === user2`의 값은 `true`가 나온다.

이렇게 변경을 의도한 객체와 더불어 의도하지 않은 객체까지 변경되는 경우에 대한 대응이 필요하다.

---

## **불변 데이터 패턴**

위에서 언급한 것처럼 다른 객체를 참조한 객체를 변경하도록 시도하면, 의도하지 않은 객체의 변경이 일어나기 때문에

다른 객체를 참조한 객체에 대해 변경이 필요한 경우에는 두 가지 방법을 사용하여 의도하지 않은 객체의 변경을 방지한다.

1. Object.assign
2. Object.freeze

### **Object.assign**

`Object.assign`은 첫 번째 인자로 받는 객체로 두 번째 인자로 받는 객체의 프로퍼티를 복사하는 것이다.

리턴값으로는 첫 번째 객체를 반환한다.

```js
const user1 = {
  name: "John",
  age: 39,
  city: {
    address: "Busan",
  },
};

const user2 = Object.assign({}, user1);

console.log(user1 === user2); // false

user2.age = 45; // user2 객체의 프로퍼티 변경

console.log(user1, user2);
// {name: 'John', age: 39, city: {…}} {name: 'John', age: 45, city: {…}}
```

위처럼 `Object.assign`을 사용하면 `user2`의 프로퍼티 값을 변경해도 `user1`에 영향을 주지 않는다.

또한, `user1`과 `user2`는 참조값이 다르기 때문에 `user1 === user2`의 값은 `false`가 나온다.

하지만 `Obejct.assign`을 사용하면서 주의해야할 점은 객체내부의 객체 즉 `Nested Object`는 깊은 복사가 이루어지지 않는다는 것이다.

```js
const user1 = {
  name: "Bryan",
  age: 25,
  spec: {
    height: 175,
    weight: 68,
  },
};

const user2 = Object.assign({}, user1);

user2.spec.height = 180;
user2.spec.weight = 77;

console.log(user1.spec, user2.spec);
// {height: 180, weight: 77} {height: 180, weight: 77}
```

위의 예제를 살펴보면 `user1`을 깊은복사 한 `user2`의 `Nested Object`의 값을 변경했을 때, `user1`의 `Nested Object` 또한 값이 변경되는 것을 알 수 있다.

따라서, 이 점을 유의하도록 하자.

---

### **Object.freeze**
