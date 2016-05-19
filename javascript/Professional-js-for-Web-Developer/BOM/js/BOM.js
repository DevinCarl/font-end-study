console.log(window, self);

// 尝试访问未声明的变量会抛出错误，但通过查询window对象，可以知道某个可能未声明的变量是否存在。
// 报错
// var newVal = oldVal; 
var newVal = window.oldVal;
console.log(newVal);


// 获取窗口大小
var pageWidth = window.innerWidth,
  pageHeight = window.innerHeight;

if (typeof pageWidth != "number") {
	if (document.compatMode = "CSS1Compat") {
		pageWidth = document.documentElement.clientWidth;
		pageHeight = document.documentElement.clientHeight;
	}else {
		pageWidth = document.body.clientWidth;
		pageHeight = document.body.clientHeight;
	}
}
console.log(pageWidth, pageHeight);


// 弹出窗口屏蔽检测
var blocked = false;
try{
	var wroxWin = window.open("//www.baidu.com","_blank");
	if (wroxWin == null) {
		blocked = true;
	}
}catch (ex) {
	blocked = true;
}
if (blocked) {
	console.log("The popup was blocked!")
}

// 间歇调用和超时调用 setInterval()  setTimeOut()

var start = 0,
	end = 10;
function setHtmlStyle() {
	start++;

	console.log(start);

	if (start < end) {
		setTimeout(setHtmlStyle, 500);
	} else {
		console.log("setTimeOut Done");
	}
}

setTimeout(setHtmlStyle, 500);


// window.print();
window.find("间歇调用")