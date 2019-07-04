//实现对象的深拷贝
function deepCopy(obj) {
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) { //筛选掉从原型链上继承的属性
            newObj[key] = typeof obj[key] === "object" ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

var obj = {
    a: [1, 2, 3],
    b: {
        c: 2,
        d: 3
    }
}

var newObj = deepCopy(obj);
newObj.b.c = 1;
console.log(obj.b.c); // 2