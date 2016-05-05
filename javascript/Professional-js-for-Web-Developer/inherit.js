// 继承
// 1. 原型链
// 问题：
//	1. 引用类型值 
// 	2. 创建子类型实例时，没办法在不影响所有对象实例的情况下，给超类型的构造函数中传递参数 
function SuperObject() {
	this.name = "super";
}
SuperObject.prototype.getSuperName = function() {
	return this.name;
}

function SubObject() {
	this.subname = "sub"
}
// 继承SuperObject[替换原型]
SubObject.prototype = new SuperObject();
// 添加新方法[必须在替换原型之后]
SubObject.prototype.getSubName = function() {
	return this.subname
}

var ins = new SubObject();
console.log(ins.getSuperName(), ins.getSubName());

// 确定原型与实例的关系
console.log( ins instanceof Object);
console.log( ins instanceof SuperObject);
console.log( ins instanceof SubObject);
console.log( Object.prototype.isPrototypeOf(ins));
console.log( SuperObject.prototype.isPrototypeOf(ins));
console.log( SubObject.prototype.isPrototypeOf(ins));

console.log("====================================================");
// 2. 借用构造函数 constructor stealing
// 问题：
//	1. 方法都在构造函数中定义，超类型的原型中的方法对子类不可见 
function SuperObject2(name) {
	this.name = name;
	this.getName = function () {
		return this.name
	}
	this.colors = ["red", "green", "blue"];
}
SuperObject2.prototype.getSuperName = function() {
	return this.name;
}

function SubObject2(name) {
	this.subname = name;
	// 继承SuperObject
	SuperObject2.call(this, "sub");
}

var ins2 = new SubObject2("ins");
ins2.colors.push("black");
console.log(ins2.name, ins2.subname, ins2.colors, ins2.getName());

// 确定原型与实例的关系
console.log( ins2 instanceof SuperObject2);
console.log( ins2 instanceof SubObject2);

var ins22 = new SubObject2("ins2");
console.log(ins22.name, ins22.subname, ins22.colors);

console.log("====================================================");
// 3. 组合继承 combination inheritance
// 问题：
//	1. 无论在什么情况下，都会调用两次超类型构造函数

function SuperObject3(name) {
	this.name = name;
	this.colors = ["red", "green", "blue"];
}

SuperObject3.prototype.sayName = function() {
	console.log(this.name); 
}

function SubObject3(name, age) {
	// 继承SuperObject属性
	SuperObject3.call(this, "sub3");

	this.subname = name;
	this.age = age;
}
// 继承SuperObject方法
SubObject3.prototype = new SuperObject3();
SubObject3.prototype.constructor = SubObject3;
// 添加新方法
SubObject3.prototype.sayAge = function() {
	console.log(this.age); 
}

var ins3 = new SubObject3("ins3","30");
ins3.colors.push("black3");
console.log(ins3.colors);
ins3.sayName();
ins3.sayAge();

var ins33 = new SubObject3("ins33","33");
ins33.colors.push("black33");
console.log(ins33.colors);
ins33.sayName();
ins33.sayAge();

console.log( ins3 instanceof SuperObject3);
console.log( ins3 instanceof SubObject3);

console.log("====================================================");
// 4. 原型式继承 prototypal inheritance
function inheritObject(o) {
	function F() { };
	F.prototype = o;
	return new F();
}

var person = {
	name: "Devin",
	friends: ["abc", "def"]
}

var person1 = inheritObject(person);
person1.name = "zhangsan";
person1.friends.push("lisi");

var person2 = inheritObject(person);
person2.name = "wangwu";
person2.friends.push("ligang")

console.log(person.friends);

var people = {
	name: "people",
}

var chinese = Object.create(people, {
	nation: {
		value: "China"
	},
	getNation: {
		value: function () {
			console.log(this.name);
		}
	}, 
})
console.log(chinese.nation);
chinese.getNation()

console.log("====================================================");
// 5. 寄生式继承 parasitic
function createSub(original) {
	var clone = inheritObject(original);
	clone.sayHi = function () {
		console.log("Hi");
	}
	return clone;
}

var person3 = createSub(person);
person3.sayHi();


console.log("====================================================");
// 6. 寄生组合式继承
function inheritPrototype(subType, superType) {
	var prototype = Object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}

function SuperType(name) {
	this.name = name;
	this.numbers = [1, 2, 3]
}
SuperType.prototype.sayName = function() {
	console.log(this.name);
}
SuperType.prototype.sayNumbers = function() {
	console.log(this.numbers);
}

function SubType(name, age) {
	SuperType.call(this, name);
	this.age = age;
}
inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
	console.log(this.age);
}

var ins6 = new SubType("ins6", 60);
ins6.numbers.push(4);
ins6.sayName();
ins6.sayNumbers();
ins6.sayAge();

var ins66 = new SubType("ins66", 66);
ins66.sayName();
ins66.sayNumbers();
ins66.sayAge();