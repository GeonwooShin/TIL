# **버블링**

쉽게 얘기해서 DOM TREE 구조에서 이벤트가 발생한 요소부터 거슬러 올라가는 것을 의미한다.

---

## **예제 1)**

```html
<div class="container">
  <button class="btn">BUTTON</button>
</div>
```

위와 같은 html 구조를 가지고 있다고 가정하고 각각의 요소에 이벤트를 등록해보자

```js
const container = document.querySelector(".container");
const btn = document.querySelector(".btn");

container.addEventListener("click", () => {
  console.log("div!");
});

btn.addEventListener("click", () => {
  console.log("btn!");
});
```

이렇게 div, button 각각의 요소에 이벤트를 등록해 두었다.

---

## **예제 1 실행 결과**

- **div** 클릭 한 경우 : `div!` 출력
- **button** 클릭 한 경우 : `btn!` 출력 후 `div!` 출력

위 예제에서의 버블링 단계는 **button > div > body > html > document > window** 로 이루어져 있다.

**따라서 '어떤 요소를 클릭하느냐에 따라 그 요소에 등록된 핸들러가 동작하고 핸들러가 동작한 요소의 최상단 요소 까지 핸들러가 동작한다' 라는게 가장 중요한 포인트라고 생각한다.**

---

## **활용 방안**

---

버블링의 가장 큰 장점은 이벤트 위임이다.

아래와 같이 수 많은 `<li>` 요소에 이벤트를 등록해야 한다면 요소의 갯수 만큼 이벤트 핸들러를 등록해야 할까?

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  ...
</ul>
```

버블링의 특성을 잘 활용한다면  
수 많은 `<li>` 요소에 이벤트를 등록하는 대신 `<ul>` 요소에 이벤트를 등록해서 여러개의 하위 요소에도 이벤트를 위임하도록 하는 것이 효과적인 방법이다.
