# **Date**

Date는 날짜와 시간에 관련된 정보와 그 정보를 다루는 메서드를 제공하는 표준 빌트인 객체이다.

UTC는 **국제 표준시** GMT는 **그리니치 평균시**를 뜻하고, KST는 **한국 표준시**를 뜻한다.

이렇게 현재 날짜와 시간은 자바스크립트가 실행된 시스템에 의해 어떤 표준시를 사용할지가 결정된다.

당연히 한국은 KST를 사용한다.

---

## **Date 생성자 함수**

---

### **new Date()**

```js
console.log(new Date()); // Mon Apr 11 2022 13:40:08 GMT+0900 (한국 표준시)

console.log(Date()); // Mon Apr 11 2022 13:40:08 GMT+0900 (한국 표준시)
```

Date는 생성자 함수이기 때문에 위와 같이 생성자 함수를 통해 객체를 만들 수 있다.

이 때, 생성자 함수에 인수를 전달하지 않고 Date 객체를 생성하면 기본적으로 현재 날짜와 시간을 나타낸다.

또한, Date 생성자 함수를 `new` 연산자가 없이 호출하게 되면, Date 객체가 아닌 문자열을 반환한다.

---

### **new Date(milliseconds)**

```js
console.log(new Date(3600000)); // Thu Jan 01 1970 10:00:00 GMT+0900 (한국 표준시)
```

위의 예제처럼 Date 생성자 함수에 인수로 숫자를 전달하게되면 인수는 밀리초를 의미하게되고  
객체는 이 인수만큼의 밀리초를 **1970년 1월 1일 00:00:00**을 기점으로 경과한 날짜와 시간을 반환한다.

---

### **new Date(dateString)**

```js
console.log(new Date("2020/11/20/19:00:00"));
//  Fri Nov 20 2020 19:00:00 GMT+0900 (한국 표준시)

console.log(new Date("Nov 20, 2020 19:00:00"));
//  Fri Nov 20 2020 19:00:00 GMT+0900 (한국 표준시)
```

Date() 생성자 함수의 인수로 숫자가 아닌 **Date.parse에 의해 해석 가능한 문자열**을 전달한다면  
지정된 날짜와 시간을 나타내는 Date 객체를 반환한다.

---

### **new Date(year, month[,day, hour, minute, second, millisecond])**

```js
console.log(new Date(2020, 10, 20, 19, 00, 00, 0));
// Fri Nov 20 2020 19:00:00 GMT+0900 (한국 표준시)
```

각각의 인수는 다음을 의미한다.

```
year : 년도를 나타내는 1900 이후의 정수 (0 ~ 99는 1900 ~ 1999로 나타난다.)
month : 월을 나타내는 정수. (단, 0 ~ 11까지의 정수로 0은 1월 11은 12월을 나타낸다.)
day : 일을 나타내는 정수 (1 ~ 31 까지의 정수)
hour : 시를 나타내는 정수 (0 ~ 23 까지의 정수)
minute : 분을 나타내는 정수 (0 ~ 59 까지의 정수)
second : 초를 나타내는 정수 (0 ~ 59 까지의 정수)
millisecond : 밀리초를 나타내는 정수 (0 ~ 999 까지의 정수)
```

---

## **Date 메서드**

---

### **1. Date.now()**

```js
console.log(Date.now()); // 1649653452190
```

Date.now() 메서드는 정적 메서드로 1970/01/01 00:00:00을 기준으로 현재까지 경과한 밀리초를 반환한다.

---

### **2. Date.parse()**

```js
console.log(Date.parse("2020/11/20/19:00:00")); // 1605866400000
console.log(Date.parse(new Date())); // 1649653833000
```

Date.parse() 메서드는 정적 메서드이고, 1970/01/01 00:00:00을 기준으로 하여 인수로 전달받은  
dateString까지의 밀리초를 숫자로 반환한다.

---

### **3. Date.prototype.getFullYear()**

```js
const today = new Date();

console.log(today.getFullYear()); // 2022

today.setFullYear(2020);
console.log(today.getFullYear()); // 2020

today.setFullYear(1998, 2, 18);
console.log(today.getFullYear()); // 1998
```

Date.prototype.getFullYear() 메서드는 프로토타입 메서드로 Date 객체의 연도를 반환한다.

이 때, **_setFullYear() 프로토타입 메서드로 인스턴스의 연,월,일을 설정할 수 있다._**

---

### **4. Date.prototype.getMonth()**

```js
const today = new Date();

console.log(today.getMonth()); // 3 => 4월을 의미

today.setMonth(11);
console.log(today.getMonth()); // 11 => 12월을 의미

today.setMonth(2, 18);
console.log(today.getMonth()); // 2 => 3월을 의미
```

Date.prototype.getMonth() 메서드는 프로토타입 메서드로 Date 객체의 월을 반환한다.

이 때, **_setMonth() 프로토타입 메서드로 인스턴스의 월,일을 설정할 수 있다._**

또한, Date 객체에서 월을 나타내는 정수는 **0 ~ 11**이라는 것을 꼭 기억하자.

---

### **5. Date.prototype.getDate()**

```js
const today = new Date();

console.log(today.getDate()); // 11

today.setDate(24);
console.log(today.getDate()); // 24

today.setDate(18);
console.log(today.getDate()); // 18
```

Date.prototype.getDate() 메서드는 프로토타입 메서드로 Date 객체의 일을 반환한다.

이 때, **_setDate() 프로토타입 메서드로 인스턴스의 일을 설정할 수 있다._**

또한, Date 객체에서 일을 나타내는 정수는 **1 ~ 31**이라는 것을 꼭 기억하자.

---

### **6. Date.prototype.getDay()**

```js
const today = new Date();

console.log(today.getDay()); // 1 => 월요일을 의미

const myBirth = new Date("1998/2/18/07:00:00");

console.log(today.getDay()); // 3 => 수요일을 의미
```

Date.prototype.getDay() 메서드는 Date 객체의 요일을 나타내는 정수를 반환한다.

각 정수에 해당하는 요일은 다음과 같다.

|  요일  | 반환 값 |
| :----: | :-----: |
| 일요일 |    0    |
| 월요일 |    1    |
| 화요일 |    2    |
| 수요일 |    3    |
| 목요일 |    4    |
| 금요일 |    5    |
| 토요일 |    6    |

---

### **7. Date.prototype.getHours()**

```js
const today = new Date();

console.log(today.getHours()); // 14

today.setHours(8); // 시간 지정
console.log(today.getHours()); // 8

today.setHours(17, 25, 0, 0); // 시/분/초/밀리초 지정
console.log(today.getHours()); // 17
```

Date.prototype.getHours() 메서드는 프로토타입 메서드로 Date 객체의 시간을 반환한다.

이 때, **_setHours() 프로토타입 메서드로 인스턴스의 시, 분, 초, 밀리초를 설정할 수 있다._**

또한, Date 객체에서 시를 나타내는 정수는 **0 ~ 23**이라는 것을 꼭 기억하자.

---

### **8. Date.prototype.getMinutes()**

```js
const today = new Date();

console.log(today.getMinutes()); // 37

today.setMinutes(8); // 분 지정
console.log(today.getMinutes()); // 8

today.setMinutes(25, 0, 0); // 분/초/밀리초 지정
console.log(today.getMinutes()); // 25
```

Date.prototype.getMinutes() 메서드는 프로토타입 메서드로 Date 객체의 분을 반환한다.

이 때, **_setMinutes() 프로토타입 메서드로 인스턴스의 분, 초, 밀리초를 설정할 수 있다._**

또한, Date 객체에서 분을 나타내는 정수는 **0 ~ 59**이라는 것을 꼭 기억하자.

---

### **9. Date.prototype.getSecond(), Date.prototype.getMilliseconds()**

```js
const today = new Date();

console.log(today.getSeconds(), today.getMilliseconds()); // 54 329

today.setSeconds(8); //  초 지정
today.setMilliseconds(8); // 밀리초 지정
console.log(today.getSeconds(), today.getMilliseconds()); // 8 8

today.setSeconds(8, 888); // 초/밀리초 지정
today.setMilliseconds(777); // 밀리초 지정
console.log(today.getSeconds(), today.getMilliseconds()); // 8 777
```

Date.prototype.getSecond(), Date.prototype.getMilliseconds() 메서드이고 각각 초와 밀리초를 반환한다.

이 때, **_setSecond() 프로토타입 메서드로 인스턴스의 초, 밀리초를 설정할 수 있고,_**  
**_setMillisecond() 프로토타입 메서드로 인스턴스의 밀리초를 설정할 수 있다._**

또한, Date 객체에서 초와 밀리초를 나타내는 정수는 각각 **0 ~ 59**,
**0 ~ 999** 라는 것을 꼭 기억하자.

---

### **10. Date.prototype.getTime()**

```js
const today = new Date();

console.log(today.getTime()); // 1649656144192

today.setTime(0);
console.log(today); // Thu Jan 01 1970 09:00:00 GMT+0900 (한국 표준시)

today.setTime(1649656144192);
console.log(today); // Mon Apr 11 2022 14:47:40 GMT+0900 (한국 표준시)
```

Date.prototype.getTime() 메서드는 1970년 1월 1일 00:00:00을 기점으로하여  
Date 객체의 시간까지 경과된 밀리초를 반환한다.

이 때, **_setTime() 프로토타입 메서드로 인스턴스에 밀리초를 전달하여 Date객체에 1970/01/01/00:00:00 을 기점으로 경과된 밀리초를 설정할 수 있다._**

---

### **11. Date.prototype.getTimezoneOffset()**

```js
const today = new Date();

console.log(today.getTimezoneOffset() / 60); // -9
```

위 메서드는 UTC와 Date 객체의 지정된 Locale 시간과의 차이를 분 단위로 반환한다.

메서드의 반환 값을 60으로 나누게 되면 UTC와 Date 객체가 가진 KST Locale의 차이인 -9를 확인할 수 있다.

---

### **12. Date.prototype.toDateString()**

```js
const today = new Date();

console.log(today.toDateString()); // Mon Apr 11 2022
```

위 메서드는 Date 객체의 날짜를 문자열로 반환한다.

---

### **13. Date.prototype.toTimeString()**

```js
const today = new Date();

console.log(today.toTimeString()); // 14:59:20 GMT+0900 (한국 표준시)
```

위 메서드는 Date 객체의 시간을 문자열로 반환한다.

---

### **14. Date.prototype.toISOString()**

```js
const today = new Date();

console.log(today.toISOString()); // 2022-04-11T06:02:11.487Z
console.log(today.toISOString().slice(0, 10)); // 2022-04-11
console.log(today.toISOString().slice(0, 10).replace(/-/g, "")); // 20220411
```

Date.prototype.toISOString() 메서드는 Date 객체의 날짜와 시간을 문자열로 반환하는 메서드이다.

또한, 반환되는 값이 문자열이기 때문에 메서드 체이닝을 통해 slice()와 replace() 메서드를 사용하여  
다음과 같이 간단하게 만드는 것도 가능하다.

---

### **15. Date.prototype.toLocaleString()**

```js
const today = new Date();

console.log(today.toLocaleString()); // 2022. 4. 11. 오후 3:05:38
console.log(today.toLocaleString("en-US")); // 4/11/2022, 3:05:38 PM
```

Date.prototype.toLocaleString() 메서드는 인수로 전달한 Locale을 기준으로 Date 객체의 날짜와 시간을 문자열로 반환하는 메서드이다.

인수를 생략하는 경우에는 브라우저가 동작중인 시스템의 Locale을 적용한다.

---

### **16. Date.prototype.toLocaleTimeString()**

```js
const today = new Date();

console.log(today.toLocaleTimeString()); // 오후 3:07:57
console.log(today.toLocaleTimeString("en-US")); // 3:07:57 PM
```

Date.prototype.toLocaleTimeString() 메서드는 인수로 전달한 Locale을 기준으로 Date 객체의 시간을 문자열로 반환하는 메서드이다.

인수를 생략하는 경우에는 브라우저가 동작중인 시스템의 Locale을 적용한다.
