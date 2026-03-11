1️⃣ What is the difference between var, let, and const?
var:if a variable is declared with var it can be reassigned.var is function scoped.example-
var a=10;
var a=20;

let:if a variable is declared with var it can be reassigned and redeclared.let is blocked scoped.example-
let a=10;
let b=20;
b=10;

const:if a variable is declared with var it can't be reassigned and redeclared.const is blocked scoped.example-
const a=10;//allowed
const b=20;
b=10;//not allowed

2️⃣ What is the spread operator (...)?
it is an operator that expands the elements of an array or object.it is also used to copy array and objects.example-
const arr=[1,2,2,3,3,4,5,6];
const arr2=[...arr,25,23];

3️⃣ What is the difference between map(), filter(), and forEach()?
map():using this function we can traverse an array or object and the output of this function is also an array.example-
const a=[2,6,10]
const double=a.map((n)=>n\*2);
console.log(double);//output:[4,12,20]

filter():using this function we can traverse an array or object and get the desired by matching a condition and the output of this function is also an array.example-
const a=[2,6,10,1,5,9]
const even=a.filter((n)=>n\2==0);
console.log(even);//output:[2,6,10]

foreach():using this function we can traverse an array or object but this function is doesnt an array.example-
const a=[2,6,10]
a.foreach((n)=>console.log(n));

4️⃣ What is an arrow function?
arrow function is a shorter form of writing a function in ES6.
normal function:
function add(a,b){
return a+b;
}
arrow function:
const add=(a,b)=>a+b;

5️⃣ What are template literals?
using template literal we can write multi line string which cant be done with "" or ''.using this we can also embedde expressions or value to the string.example:
const name="bithi";
const age=25;
const text=`my name is ${name}
and im ${age} years old`;
