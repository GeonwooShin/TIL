# **Map**

Map 객체는 key, value 쌍으로 이루어진 컬렉션이다. Map은 객체와 굉장히 유사하지만, 차이점이 존재한다.

|          구분          |          객체           |       Map 객체        |
| :--------------------: | :---------------------: | :-------------------: |
| 키로 사용할 수 있는 값 |   문자열 또는 심벌 값   | 객체를 포함한 모든 값 |
|        이터러블        |            X            |           O           |
|     요소 개수 확인     | Object.keys(obj).length |       map.size        |

---

### **Map 객체 생성**

Map 객체는 기본적으로 다음과 같이 생성자 함수를 통해 생성한다.

생성할 때 생성자 함수에 인수를 전달하지 않는다면, 빈 Map 객체가 생성된다.

그리고 중요한 것은 생성자 함수의 인수로는 이터러블이 와야 한다는 것이다.

이 때 전달되는 인수는 **key, value 쌍**이어야 한다.

또한, 인수로 중복된 키를 갖는 요소가 온다면 값이 덮어써져 Map 객체에 요소로 저장된다.

```js
const map1 = new Map(); // 빈 Set 객체

const map2 = new Map([
  ["name", "kyle"],
  ["city", "seoul"],
]); // 기본적으로 2차원 배열로 인수를 넣어준다.

const map3 = new Map([
  [123, 456],
  [123, 789],
]); // 중복된 키를 갖는 요소는 값이 덮어써진다.
```

---

**_Map 또한 프로토타입을 갖기 때문에_** 여러가지 메서드를 가진다.

### **1. 요소 추가**

Map 객체에 요소를 추가하는 경우에는 Map.prototype.set 메서드를 사용한다.

```js
const map1 = new Map([["key1", "value1"]]);
map1.set("key2", "value2");

console.log(map1); // Map(2) {'key1' => 'value1', 'key2' => 'value2'}
```

또한, set 메서드는 새로운 요소가 추가된 Map 객체를 반환하기 때문에 연속적인 set이 가능하다.

```js
const map1 = new Map([["key1", "value1"]]);
map1.set("key2", "value2").set("key3", "value3"); // set 메서드는 새로운 요소가 추가된 Map 객체 반환

console.log(map1); // Map(3) {'key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3'}
```

마지막으로, 일치 비교 연산자로 비교한 NaN은 서로 다르다고 되어있지만  
`NaN === NaN // false`  
Map 객체는 NaN과 NaN은 중복된 인수라고 판단하여 중복 추가를 허용하지 않는다.

```js
const map1 = new Map();

const user = {
  name: "James",
  age: 15,
};

map1.set(user, "student");

console.log(map1);
```

**Map 객체와 일반 객체의 가장 큰 차이점은 키 값으로 사용할 수 있는 타입에 있다.**  
일반 객체는 문자열 또는 심벌 값만 키로 사용할 수 있는 반면, Map 객체는 키 타입에 제한을 두지 않는다.  
따라서 위 예제와 같이 일반 객체를 키로 사용할 수 있다.

---

### **2. 요소 취득**

Map 객체의 특정한 요소를 얻기위한 경우에는 Set.prototype.get 메서드를 사용한다.

```js
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
const getValue = map1.get("key1");

console.log(getValue); // value1
```

get 메서드는 key를 인수로 받고 value를 리턴한다. 만약 get메서드의 인수로 없는 key를 전달한다면,  
`undefined`를 반환한다.

---

### **3. 요소 삭제**

Map 객체의 요소를 삭제하는 경우에는 Map.prototype.delete 메서드를 사용한다.

```js
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);
map1.delete("key2");

console.log(map1); // Map(1) {'key1' => 'value1'}
```

또한, delete 메서드는 삭제 성공여부를 기준으로 true, false를 반환한다.

---

### **4. 요소 여부 확인**

Map 객체의 요소를 확인하기 위해서는 Map.prototype.has 메서드를 사용한다.

```js
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);

console.log(map1.has("key1")); // true
```

has 메서드는 요소값의 존재 여부를 나타내는 true, false 값을 반환한다.

---

### **5. 요소 개수 확인**

Map 객체의 요소의 개수를 확인하기 위해서는 Map.prototype.size 프로퍼티를 사용한다.

여기서 중요한 점은 size는 메서드가 아니라 프로퍼티라는 점이다.

```js
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);

console.log(map1.size); // 3
```

---

### **6. 요소 전체 삭제**

Map 객체의 요소를 모두 삭제하기 위해서는 Map.prototype.clear 메서드를 사용한다.

clear 메서드는 항상 undefined를 반환한다.

```js
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key3", "value3"],
]);

map1.clear();

console.log(map1); // Map(0) {size: 0}
```

---

### **7. 요소 순회**

Map.prototype 메서드로는 forEach도 존재한다. 따라서 Map 객체안의 요소를 순회할 수 있다.

Map.prototype.forEach 와 Array.prototype.forEach는 비슷한 점이 존재한다.

두 메서드 모두 콜백 함수와 forEach 메서드의 콜백 함수 내부에서 this로 사용될 객체를 인수로 전달한다.

이 때 콜백 함수에 전달하는 세가지 인수는 다음과 같다.

```
첫 번째 인수: 현재 순회 중인 요소의 value

두 번째 인수: 현재 순회 중인 요소의 key

세 번째 인수: 현재 순회 중인 Map 객체
```

```js
const map1 = new Map();

const user1 = {
  name: "James",
  age: 25,
};
const user2 = {
  name: "Johnson",
  age: 33,
};
map1.set(user1, "student");
map1.set(user2, "worker");

map1.forEach((v, k, map) => console.log(v, k, map));
```

따라서, 출력결과는 다음과 같다.

```
student {name: 'James', age: 25} Map(2) {{…} => 'student', {…} => 'worker'}
worker {name: 'Johnson', age: 33} Map(2) {{…} => 'student', {…} => 'worker'}
```

---

## **객체 반환**

Map 객체는 keys, values, entries 와 같은 객체 반환 메서드가 존재한다.  
예제로 확인해 보면 다음과 같다.

```js
const map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
]);

console.log(map1.keys()); // 요소 키를 값으로 갖는 이터레이터를 반환한다.
console.log(map1.values()); // 요소 값을 값으로 갖는 이터레이터를 반환한다.
console.log(map1.entries()); // 요소 키와 값을 값으로 갖는 이터레이터를 반환한다.

for (const key of map1.keys()) {
  console.log(key); //  key1 key2
}

for (const value of map1.values()) {
  console.log(value); //  value1 value2
}

for (const entry of map1.entries()) {
  console.log(entry); //  [key1, value1] [key2, value2]
}
```
