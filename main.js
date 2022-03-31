var foo = 0;
var i = 0;
for (var i = 0; i < 10; i++) {
  foo += i;
}
console.log(foo, i);

let bar = 0;
let z = 0;
for (let z = 0; z < 10; z++) {
  bar += z;
  console.log(z);
}
console.log(bar, z);

// // var은 함수레벨 스코프만 인정한다.

// var x = "global";

// function zzz() {
//   var x = "local";
//   console.log(x);
//   return x;
// }

// zzz();
// console.log(x);

// var a = "global scope(a)";

// function foo() {
//   var a = "local scope(foo)";
//   var b = "local scope(foo)";

//   console.log(a); // 'local scope(foo)'

//   function bar() {
//     var b = "local scope(bar)";
//     console.log(a); // 'local scope(foo)'
//     console.log(b); // 'local scope(bar)'
//   }

//   bar();
// }

// foo();

// console.log(a); // 'global scope(a)'
// console.log(b);
