# **Set**

Set 객체는 중복이 되지않는 값들의 집합이다. Set은 배열과 굉장히 유사하지만, 차이점이 존재한다.

|             구분              | 배열 | Set 객체 |
| :---------------------------: | :--: | :------: |
| 중복되는 값을 포함할 수 있다. |  O   |    X     |
|  요소의 순서에 의미가 있다.   |  O   |    X     |
| 요소를 인덱스로 접근 가능하다 |  O   |    X     |

---

### **Set 객체 생성**

Set 객체는 기본적으로 다음과 같이 생성자 함수를 통해 생성한다.

생성할 때 생성자 함수에 인수를 전달하지 않는다면, 빈 Set 객체가 생성된다.

그리고 중요한 것은 생성자 함수의 인수로는 이터러블이 와야 한다는 것이다.

일반 객체나 숫자 같이 이터러블이 아닌 것은 Set객체의 인수로 넣을 수 없다.

또한, 인수로 중복된 값의 이터러블이 온다면 중복된 인수는 Set 객체에 요소로 저장되지 않는다.

```js
const set1 = new Set(); // 빈 Set 객체
const set2 = new Set(1, 2, 3); // 인수가 이터러블이 아니므로 TypeError 발생
const set3 = new Set([1, 2, 3, 4, 5]);
const set4 = new Set([1, 2, 3, 4, 5, 2, 3, 4]); // 중복된 인수는 요소로 저장되지 않음
```

---

**_Set 인스턴스는 Set.prototype을 상속 받고_** 여러가지 메서드를 가진다.

### **1. 요소 추가**

Set 객체에 요소를 추가하는 경우에는 Set.prototype.add 메서드를 사용한다.

```js
const set1 = new Set([1, 2, 3, 4, 5]);
set1.add(6);

console.log(set1); // Set(8) {1, 2, 3, 4, 5, 6}
```

또한, add 메서드는 새로운 요소가 추가된 Set 객체를 반환하기 때문에 연속적인 add가 가능하다.

```js
const set1 = new Set([1, 2, 3, 4, 5]);
set1.add(6).add(7).add(8); // add 메서드는 새로운 요소가 추가된 Set 객체 반환

console.log(set1); // Set(8) {1, 2, 3, 4, 5, 6, 7, 8}
```

마지막으로, 일치 비교 연산자로 비교한 NaN은 서로 다르다고 되어있지만  
`NaN === NaN // false`  
Set 객체는 NaN과 NaN은 중복된 인수라고 판단하여 중복 추가를 허용하지 않는다.

---

### **2. 요소 삭제**

Set 객체의 요소를 삭제하는 경우에는 Set.prototype.delete 메서드를 사용한다.

```js
const set1 = new Set([1, 2, 3, 4, 5]);
set1.delete(4);

console.log(set1); // Set(4) {1, 2, 3, 5}
```

또한, delete 메서드는 삭제 성공여부를 기준으로 true, false를 반환한다.

배열과 달리 Set 객체는 요소를 인덱스로 접근 가능하지 않기 때문에 delete 메서드의 인수로는 인덱스가 아닌 **요소의 값을 전달해야한다.**

---

### **3. 요소 여부 확인**

Set 객체의 요소를 확인하기 위해서는 Set.prototype.has 메서드를 사용한다.

```js
const set1 = new Set([1, 2, 3, 4, 5]);
console.log(set1.has(11)); // false
```

has 메서드는 요소값의 존재 여부를 나타내는 true, false 값을 반환한다.

---

### **4. 요소 개수 확인**

Set 객체의 요소의 개수를 확인하기 위해서는 Set.prototype.size 프로퍼티를 사용한다.

여기서 중요한 점은 size는 메서드가 아니라 프로퍼티라는 점이다.

```js
const set1 = new Set([1, 2, 3, 4, 5]);

console.log(set1.size); // 5
```

---

### **5. 요소 전체 삭제**

Set 객체의 요소를 모두 삭제하기 위해서는 Set.prototype.clear 메서드를 사용한다.

clear 메서드는 항상 undefined를 반환한다.

```js
const set1 = new Set([1, 2, 3, 4, 5]);
set1.clear();
console.log(set1); // Set(0) {size: 0}
```

---

### **6. 요소 순회**

Set.prototype 메서드로는 forEach도 존재한다. 따라서 Set 객체안의 요소를 순회할 수 있다.

forEach 하면 바로 먼저 생각나는 것이 배열의 forEach 메서드인데 이 두 메서드에는 차이점이 존재한다.

배열은 인덱스로 요소에 접근이 가능하고, Set 객체는 인덱스로 접근이 가능하지 않다보니까

Set 객체의 forEach 메서드에서는 콜백함수의 두번째 인자로 현재 요소의 인덱스를 전달받지 않는다.

대신 현재 순회중인 요소값을 의미하는 첫번째 인수와 동일한 의미를 갖는다.

```js
const set1 = new Set([1, 2, 3, 4, 5]);

set1.forEach((number, index, set) => {
  console.log(number, set);
});
```

출력결과는 다음과 같다.

```
1 Set(5) {1, 2, 3, 4, 5}
2 Set(5) {1, 2, 3, 4, 5}
3 Set(5) {1, 2, 3, 4, 5}
4 Set(5) {1, 2, 3, 4, 5}
5 Set(5) {1, 2, 3, 4, 5}
```

## **집합 연산**

Set 객체의 가장 큰 특징이라 할 수있는 것이 바로 수학적인 집합을 구현할 수 있다는 것이다.

직접 Set 객체의 프로토 타입 메서드를 만들어 보자.

---

### **1. 교집합**

```js
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    if (this.has(value)) {
      result.add(value);
    }
  }

  return result;
};

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([2, 3, 4, 6, 7]);

console.log(set1.difference(set2)); // Set(3) {2, 3, 4}
```

더 간단하게 만들자면

```js
Set.prototype.intersection = function (set) {
  return new Set([...this].filter((number) => set.has(number)));
};

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([2, 3, 4, 6, 7]);

console.log(set1.difference(set2)); // Set(3) {2, 3, 4}
```

---

### **2. 차집합**

```js
Set.prototype.difference = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.delete(value);
  }

  return result;
};

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([2, 3, 4, 6, 7]);

console.log(set1.difference(set2)); // Set(2) {1, 5}
```

더 간단하게 만들자면

```js
Set.prototype.difference = function (set) {
  return new Set([...this].filter((number) => !set.has(number)));
};

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([2, 3, 4, 6, 7]);

console.log(set1.difference(set2)); // Set(2) {1, 5}
```

---

### **3. 합집합**

```js
Set.prototype.union = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.add(value);
  }

  return result;
};

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([2, 3, 4, 6, 7]);

console.log(set1.union(set2)); // Set(7) {1, 2, 3, 4, 5, 6, 7}
```

더 간단하게 만들자면

```js
Set.prototype.union = function (set) {
  return new Set([...this, ...set]);
};

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([2, 3, 4, 6, 7]);

console.log(set1.union(set2)); // Set(7) {1, 2, 3, 4, 5, 6, 7}
```
