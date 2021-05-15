console.log(Math.round(1.6)); //2
console.log(Math.round(1.4)); //1

function sum(first, second){ //매개변수 = parameter
  console.log('a');
  return first+second; //return을 만나면 함수는 즉시 실행 종료
  //return 1.값 출력 2.함수 종료 의 두가지 기능
  console.log('b'); //윗 줄에 return이 있기 때문에 출력X
};
console.log(sum(2,4)); //각각의 입력 값, 인자 = argument.
