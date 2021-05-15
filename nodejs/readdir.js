var testFolder = './data'; //파일을 실행하고 있는 위치 기준에서 폴더 써주기
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
  console.log(filelist); //디렉토리에 있는 파일의 목록을 배열로 출력
});
