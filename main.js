var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈(nodejs가 가지고 있는 비슷한 기능을 모아놓은 group)을 url이라는 변수를 통해 사용하겠다는 의()

var app = http.createServer(function(request,response){
    var _url = request.url;
    //변수 url : query string의 값을 가지고 있음

    var queryData = url.parse(_url, true).query;
    //queryData를 출력하면 {id: 'HTML'}의 객체 형태로 출력됨
    //queryData.id를 출력하면 HTML만 출력

    var pathname = url.parse(_url, true).pathname;
    //console.log(url.parse(_url, true)); //주어진 url의 정보를 보여줌.

    if(pathname==='/'){
      if(queryData.id===undefined){ //Home
        fs.readdir('./data',function(error,filelist){
          //console.log(filelist); //./data 디렉토리에 있는 파일을 배열형태로 출력
          var title = `Welcome`;
          var description = `Hello~~~!
          Welcome to Node.js!`;

          var list = '<ul>';
          var i = 0;
          while(i<filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i = i + 1;
          }
          list = list + '</ul>';
          /*
          var list = `<ul>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ul>`;
          */

          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      } else {
        fs.readdir('./data',function(error,filelist){
          var list = '<ul>';
          var i = 0;
          while(i<filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i = i + 1;
          }
          list = list + '</ul>';

          fs.readFile(`data/${queryData.id}`,`utf8`,function(err,description){
              var title = queryData.id;
              var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200); //200은 파일이 성공적으로 전송되었다는 뜻
            //response.end(fs.readFileSync(__dirname + _url)); //사용자가 접속한 url에 따라 파일들을 읽어주 코드
            //response.end(queryData.id); //바로 위에 코드를 삭제하고 현재 줄의 코드를 입력하면 queryData.id가 웹브라우저에 출력

            response.end(template);
          });
        });
      }
    } else {
      response.writeHead(404); //파일을 찾을 수 없을 경우 404를 돌려 줌
      response.end('Not found');
    }




});
app.listen(3000);
