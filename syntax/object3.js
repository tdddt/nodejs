var q = {
  v1 : 'v1',
  v2 : 'v2',
  f1 : function (){
    console.log(this.v1); //함수가 객체 안에서 사용될 때, 함수가 자신이 속해 있는 객체를 참조할 수 있는 키워드 this
  },
  f2 : function (){
    console.log(this.v2);
  }
}

q.f1();
q.f2();

//함수는 값이다
//객체는 값을 저장하는 그릇이다.(함수도 담을 수 있음)
