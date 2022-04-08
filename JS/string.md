# **String**

String은 자바스크립트 표준 빌트인 객체로 문자열을 다루기 위한 메서드와 프로퍼티를 제공해준다.

이제 String 객체를 만들어보자

---

### **String 생성자 함수**

```js
const strObj = new String();
const strObj2 = new String("인수 전달");

console.log(strObj); // String {''}
console.log(strObj2); // String {'인수 전달'}
```

String 생성자 함수에 인수를 전달하지 않는다면 빈 문자열을 가진 String 객체가 생성되고,

String 생성자 함수에 인수로 문자열을 전달하면 전달받은 문자열을 가진 String 객체가 생성된다.

이렇게 생성한 String 생성자 함수를 콘솔에 출력해보면 내부에는 PrimitiveValue 라는 원시 값과 함께

Prototype이 존재한다.

또한 String 객체는 동시에 **배열처럼 인덱스를 나타내는 숫자 형식의 문자열을 프로퍼티 키, 각 문자를 프로퍼티 값으로 갖는 이터러블이다.**

다음 예제를 살펴보자.

---

### **String 객체를 인덱스로 접근**

```js
const strObj = new String("hi");

console.log(strObj[0]); // h

strObj[0] = "G";

console.log(strObj[0]); // h
```

위처럼 인덱스를 사용하여 각 문자에 접근이 가능하다.

하지만 문자열은 원시 값이기 때문에 변경이 불가능하다.

---

String 객체는 prototype 메서드와 함께 프로퍼티도 가지고 있는데 바로 length 프로퍼티이다.

### **length 프로퍼티 예제 1)**

```js
const strObj = new String("hi");

console.log(strObj.length); // 2
```

이렇게 String 객체는 length 프로퍼티를 가지고있고, 인덱스를 이용해 접근이 가능하기 때문에  
String 객체는 **_유사 배열 객체_** 라고 한다.

그럼 이제 String 객체가 prototype 메서드로 가지고 있는 다양한 메서드의 활용을 한 번 알아보자.

---

### **1. String.prototype.indexOf()**

이 메서드는 문자열을 인수로 전달하고 그 전달받은 인수의 첫번째 인덱스를 반환한다.

예제를 보자.

```js
const strObj = new String("hello world!");

console.log(strObj.indexOf("wor"));
```

indexOf() 메서드에 전달한 인수는 "wor"이다. 따라서 문자열의 첫번째 즉, 'w'의 인덱스를 반환한다.

결과적으로 w의 인덱스인 6을 반환하게 된다.

추가적으로 두 번째 인수로 인덱스를 줄 수 있는데, 그 인덱스가 가진 뜻은 검색을 시작할 곳을 뜻한다.

```js
const strObj = new String("hello world!");

console.log(strObj.indexOf("wor", 7));
```

인덱스 7부터 "wor"을 검색하고 첫 번째 인덱스를 반환해달라는 뜻이다. 하지만 여기서 인덱스 7이후에는  
"wor"이라는 문자열이 존재하지 않기 때문에 `-1`을 반환한다.

---

### **2. String.prototype.includes()**

이 메서드는 인수로 전달받은 문자열이 존재하는지 판단하여 불리언 값을 리턴하는 메서드다.

예제를 보자.

```js
const strObj = new String("hello world!");

console.log(strObj.includes("world"));
```

문자열 "hello world!"에 인수로 전달한 "world"라는 문자열을 포함하기 때문에 true를 반환하게된다.

includes() 메서드도 또한, 두 번째 인수로 검색을 시작할 인덱스를 전달하는 것이 가능하다.

---

### **3. String.prototype.startsWith()**

이 메서드는 인수로 전달한 문자열로 시작하는지를 확인하는 메서드이다.

```js
const strObj = new String("hello world!");

console.log(strObj.startsWith("hellow"));
```

startWith() 메서드에 전달한 인수는 "hellow"이다. String 객체 strObj는 hellow로 문자열이 시작하지 않으니

메서드는 false를 반환하게된다.

---

### **4. String.prototype.endsWith()**

인수로 전달한 문자열로 시작하는지 확인하는 메서드인 startsWith() 메서드와 반대로 이 메서드는

인수로 전달한 문자열로 끝이나는지 확인하는 메서드이다.

```js
const strObj = new String("hello world!");

console.log(strObj.endsWith("!"));
```

endsWith() 메서드에 전달한 인수는 "!"이다. String 객체 strObj는 "!"로 문자열이 끝나기때문에

메서드는 true를 반환하게된다.

---

### **5. String.prototype.charAt()**

charAt() 메서드의 인수로는 인덱스가 들어온다. 따라서 전달받은 인덱스가 가리키는 문자를 반환한다.

```js
const strObj = new String("hello world!");

for (let i = 0; i < strObj.length; i++) {
  console.log(strObj.charAt(i));
}
```

문자열의 인덱스는 0 ~ (문자열의 길이 -1) 이기 때문에 String 객체의 프로퍼티인 length 전까지만 반복문이  
돌아가게 하고 charAt() 메서드에 해당 변수 `i`를 주게되면 모든 문자가 콘솔에 출력되게끔 할 수 있다.

---

### **6. String.prototype.substring()**

charAt() 메서드는 인수로 전달받은 인덱스의 문자 하나만 반환하지만  
substring() 메서드는 전달받은 첫 번째 인수부터 전달받은 두 번째 인수까지의 부분 **문자열**을 반환한다.

```js
const strObj = new String("hello world!");

console.log(strObj.substring(0, 5)); // hello
```

첫 번째 인수 부터 두 번째 인수까지를 반환한다는 뜻은 일반적으로 두 번째 인수가 첫 번째 인수보다 작은 정수여야 한다는 것을 의미한다.

하지만, 다음과 같이 동작한다는 것도 알아둘 필요가 있다.

```
1. 첫 번째 인수 > 두 번째 인수인 경우에는 두 인수가 교환된다.

2. 인수 < 0 또는 NaN인 경우에는 0으로 취급한다.

3. 인수 > 문자열의 길이인 경우에는 str.length로 취급한다.
```

---

### **7. String.prototype.slice()**

slice() 메서드는 substring() 메서드와 같은 성격을 띄지만, 한 가지 차이점이 존재한다. 예시를 통해 알아보자.

```js
const strObj = new String("hello world!");

console.log(strObj.substring(-6)); // Hello world!
console.log(strObj.slice(-6)); // world!
```

substring() 메서드에서는 음수로 전달된 인수는 0으로 취급되는 반면  
slice() 메서드에서는 음수로 전달된 인수는 뒤에서부터를 의미한다.

따라서, 위 예제와 같이 slice() 메서드로 전달된 **-6**은 뒤에서부터 6자리를 의미한다.

---

### **8. String.prototype.toUpperCase()**

toUpperCase() 메서드는 해당 문자열을 모두 대문자로 변경해주는 메서드이다.

```js
const strObj = new String("Hello world!");

console.log(strObj.toUpperCase()); // HELLO WORLD!
```

---

### **9. String.prototype.toLowerCase()**

toLowerCase() 메서드는 해당 문자열을 모두 소문자로 변경해주는 메서드이다.

```js
const strObj = new String("Hello world!");

console.log(strObj.toLowerCase()); // hello world!
```

---

### **10. String.prototype.trim()**

trim() 메서드는 문자열의 앞, 뒤에 존재하는 공백을 삭제하는 문자열을 반환하는 메서드이다.

```js
const strObj = new String("         Trim          ");

const trimStrObj = strObj.trim();
console.log(`Hello${trimStrObj}World`); // HelloTrimWorld
```

앞, 뒤의 공백문자를 모두가 아닌 앞 또는 뒤만 공백문자를 제거하고 싶다면 trimStart(), trimEnd()를 사용한다.

```js
const strObj = new String("         Trim          ");

const trimStartStrObj = strObj.trimStart();
console.log(`Hello${trimStartStrObj}World`); // HelloTrim       World
```

```js
cconst strObj = new String("         Trim          ");

const trimEndStrObj = strObj.trimEnd();
console.log(`Hello${trimEndStrObj}World`); // Hello       TrimWorld
```

---

### **11. String.prototype.replace()**

replace() 메서드는 첫 번째 인수로 교체당할 문자열, 두 번째 인수로 교체할 문자열을 넘긴다.

특이점은 첫 번째 인수로 정규표현식이 올 수 있다는 점이다.

```js
const strObj = new String("Hello world!");

console.log(strObj.replace("world", "javascript")); // Hello javascript!
```

```js
const strObj = new String("Hello world!");

console.log(strObj.replace(/hello/gi, "javascript")); // javascript world!
```

---

### **11. String.prototype.split()**

split() 메서드는 첫 번째 인수로 전달한 문자열 또는 정규표현식으로 문자열을 구분하여 배열을 반환한다.

인수로 빈 문자열을 전달한다면 문자열을 각각 하나의 문자로 배열을 반환한다.

인수로 아무것도 넘기지 않는다면 문자열 전체를 하나의 요소로하는 배열을 반환한다.

```js
const strObj = new String("Hello world!");

console.log(strObj.split(" ")); // ['Hello', 'world']
```

두 번째 인수로 전달받는 것은 반환할 배열의 길이이다.

```js
const strObj = new String("Hello world!");

console.log(strObj.split(" ", 1)); // ['Hello']
```

split() 메서드는 배열을 반환하기 때문에 Array.prototype 메서드를 조합하여 문자열을 역순으로 만들 수 있다.

```js
const strObj = new String("Hello world!");

const reverseStrObj = strObj.split("").reverse().join("");

console.log(reverseStrObj); //  !dlrow olleH
```
