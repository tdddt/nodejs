//array, object

var f = function (){
  console.log(1+1);
  console.log(2);
}

console.log(f); //function은 다른 statement와는 다르게 값이 될 수 있음(변수저장O)
f();

var a = [f];
a[0]();

var o = {
  func:for
}
o.func();

//var i = if(true){console.log(1)};
//var w = while(true){console.log(1)};
