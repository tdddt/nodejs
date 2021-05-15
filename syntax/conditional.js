var args = process.argv; //배열로 node가 들어있는 위치, 현재 파일의 위치 출력됨
//node syntax/conditional.js new 를 실행시키면 new가 배열의 마지막에 추가됨.

console.log(args[2]);

console.log('A');
console.log('B');
if(args[2]==='1'){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');
