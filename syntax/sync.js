var fs = require('fs');

/*
//readFileSync
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

//async
console.log('A');
//nodejs가 파일을 읽는 작업이 끝나면 3번째 인자로 준 함수를 실행시킴
fs.readFile('syntax/sample.txt', 'utf8',function(err,result){
  console.log(result);
});
console.log('C');
