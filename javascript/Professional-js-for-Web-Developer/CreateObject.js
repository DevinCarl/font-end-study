// 创建对象
// 1. 工厂模式
// 缺点： 没有解决对象识别问题
function createPerson(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		console.log(this.name);
	}

	return o;
}

var person1 = createPerson("devin", "28", "Software Engineer");
person1.sayName();

console.log("====================================================");
// 2. 构造函数模式
// 缺点：每个实例的方法都要在每个实例上创建一次
function Person(name, age, job) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function() {
		console.log(this.name);
	}
}

var person2 = new Person("devin", "28", "Software Engineer");
person2.sayName();
console.log(person2 instanceof Person);
console.log("====================================================");
// 3. 原型模式
// 缺点： a. 所有实例默认情况下都将取得相同的属性值
// 				b. 对于引用类型值的属性，所有实例共享一份
function Dog() {
}
Dog.prototype = {
	constructor: Dog,
	name: "dog",
	age: "5",
	sayName: function() {
		console.log(this.name);
	}
}
var dog1 = new Dog();
dog1.sayName();
var dog2 = new Dog();
dog2.sayName();
console.log("====================================================");
// 3.1 重写原型对象切断了现有原型与任何之前已经存在的对象实例之间联系
function Cat() {
}
var cat0 = new Cat();
Cat.prototype = {
	constructor: Cat,
	name: "gg",
	age: 3,
	sayName: function() {
		console.log(this.name);
	}
}

var cat1 = new Cat();
cat1.sayName();
// cat0.sayName();  // error: cat0.sayName is not a function

console.log("====================================================");
// 4. 组合使用构造函数模式和原型模式
// 构造函数模式用于定义实例属性； 原型模式定义方法和共享属性
function Bird(name, age, color) {
	this.name = name;
	this.age = age;
	this.color = color;
	this.friends = ["lili","Gray"];
}
Bird.prototype = {
	constructor: Bird,
	sayName: function() {
		console.log(this.name);
	}
}

var bird1 = new Bird("bird1", 2, "red");
bird1.sayName();
var bird2 = new Bird("bird2", 4, "blue");
console.log(bird1.sayName === bird2.sayName);

console.log(bird1.friends === bird2.friends);
bird2.friends.push("van");
console.log(bird2.friends);

console.log("====================================================");
// 5. 动态原型模式
// 把所有信息都封装在构造函数中
// 注意不能使用对象字面量重写原型
function Car(name, year, color) {
	this.name = name;
	this.year = year;
	this.color = color;

	if(typeof this.sayName != "function"){
		Car.prototype.sayName = function() {
				console.log(this.name);
			}
		
	}
}

var car1 = new Car("Baoma", 2015, "white");
console.log(car1);
car1.sayName()

console.log("====================================================");
// 6. 寄生构造函数模式
function Worker(name, age, job) {
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function() {
		console.log(this.name);
	}

	return o;
}
var worker1 = new Worker("zhang", 30, "cleaner");
worker1.sayName();
// 用于创建一个具有额外方法的特殊数组
function SpecialArray() {
	var values = new Array();
	values.push.apply(values, arguments);
	values.toPipedString = function() {
		return this.join("|");
	}

	return values;
}
var colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPipedString())
console.log("====================================================");
// 7. 稳妥构造函数模式
// 没有公共属性，方法不引用this对象
function Animal(name, age) {
	var o = new Object();

	o.sayName = function() {
		console.log(name);
	}
	return o
}

var cat1 = Animal("cat", 2);
cat1.sayName()