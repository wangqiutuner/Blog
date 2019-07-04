//原型链继承
function Parent() {
    this.name = "kevin";
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child() {}

Child.prototype = new Parent();

var c = new Child();

console.log(c.getName()); // kevin

//构造函数继承
function Parent() {
    this.names = ['kevin', 'daisy'];
}

function Child() {
    Parent.call(this);
}

var c1 = new Child();
c1.names.push('yayu');
console.log(c1.names); // ["kevin", "daisy", "yayu"]

var c2 = new Child();
console.log(c2.names); // ["kevin", "daisy"]

//组合继承
function Parent(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child(name, age) { //构造函数继承属性
    Parent.call(this, name);
    this.age = age;
}

Child.prototype = new Parent(); //原型链继承方法

var c1 = new Child("kevin", "18");
c1.colors.push("black");
console.log(c1.name); // kevin
console.log(c1.age); // 18
console.log(c1.colors); // ["red", "blue", "green", "black"]
c1.getName(); // kevin

var c2 = new Child("daisy", "20");
console.log(c2.name); // daisy
console.log(c2.age); // 20
console.log(c2.colors); // ["red", "blue", "green"]
c2.getName(); // daisy

//原型式继承
function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var persion = {
    name: "kevin",
    friends: ["daisy", "kelly"]
}

var p1 = createObj(persion);
var p2 = createObj(persion);

p1.name = "person1";
console.log(p2.name); // "kevin"

p1.friends.push("taylor");
console.log(p2.friends); // ["daisy", "kelly", "taylor"]

//寄生式继承
function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log(this.name + ',hi');
    }
    return clone;
}

var persion = {
    name: "kevin",
    friends: ["daisy", "kelly"]
}

var anotherPerson = createObj(persion);
anotherPerson.sayName(); // kevin,hi

//寄生组合式继承
function Parent(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child(name, age) { //构造函数继承属性
    Parent.call(this, name);
    this.age = age;
}

//寄生式继承
var prototype = Object.create(Parent.prototype); //创建对象
prototype.construtor = Parent; //加强对象
Child.prototype = prototype; //指定对象

var c1 = new Child("kevin", "18");
c1.colors.push("black");
console.log(c1.name); // kevin
console.log(c1.age); // 18
console.log(c1.colors); // ["red", "blue", "green", "black"]
c1.getName(); // kevin

var c2 = new Child("daisy", "20");
console.log(c2.name); // daisy
console.log(c2.age); // 20
console.log(c2.colors); // ["red", "blue", "green"]
c2.getName(); // daisy

//Class继承
class Parent {
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}

class Child extends Parent {
    constructor(name) {
        super(name)
    }
}

var child = new Child("kevin")
child.getName() // kevin
child instanceof Parent // true