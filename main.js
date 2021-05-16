var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈(nodejs가 가지고 있는 비슷한 기능을 모아놓은 group)을 url이라는 변수를 통해 사용하겠다는 의()
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

//nodejs로 웹브라우저가 접속이 들어올 때마다 createServer의 callback함수를 호출함
//request = 요청할 때 웹브라우저가 보낸 정보들
//response = 응답할 때 우리가 웹브라우저한테 전송할 정보들
var app = http.createServer(function(request,response){
    var _url = request.url; //변수 url : query string의 값을 가지고 있음
    var queryData = url.parse(_url, true).query; //queryData를 출력하면 {id: 'HTML'}의 객체 형태로 출력됨 //queryData.id를 출력하면 HTML만 출력
    var pathname = url.parse(_url, true).pathname; //console.log(url.parse(_url, true)); //주어진 url의 정보를 보여줌.


    if(pathname==='/'){
      if(queryData.id===undefined){ //Home
        fs.readdir('./data',function(error,filelist){
          //console.log(filelist); //./data 디렉토리에 있는 파일을 배열형태로 출력
          var title = `Welcome`;
          var description = `Hello~~~! Welcome to Node.js!`;
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`);
          response.writeHead(200);
          response.end(html);
        });
      } else {
        fs.readdir('./data',function(error,filelist){
          var filteredId = path.parse(queryData.id).base;
          fs.readFile(`data/${filteredId}`,`utf8`,function(err,description){
              var title = queryData.id;
              var sanitizedTitle = sanitizeHtml(title);
              var sanitizedDescription = sanitizeHtml(description,{
                allowedTags:['h1']
              });
              var list = template.list(filelist);
              var html = template.HTML(title, list,
                `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                `<a href="/create">create</a>
                 <a href="/update?id=${sanitizedTitle}">update</a>
                 <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                 </form>`); //삭제는 링크가 아니라 폼으로 구현해야 함
            response.writeHead(200); //200은 파일이 성공적으로 전송되었다는 뜻
            //response.end(fs.readFileSync(__dirname + _url)); //사용자가 접속한 url에 따라 파일들을 읽어주 코드
            //response.end(queryData.id); //바로 위에 코드를 삭제하고 현재 줄의 코드를 입력하면 queryData.id가 웹브라우저에 출력
            response.end(html);
          });
        });
      }
    } else if(pathname==='/create'){ //입력받는 곳
      fs.readdir('./data',function(error,filelist){
        var title = `Web-create`;
        var list = template.list(filelist);
        var html = template.HTML(title, list,`
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `, '');
        response.writeHead(200);
        response.end(html);
      });
    } else if(pathname ==='/create_process'){ //입력받는 값에 따라 파일이 디렉토리에 생성되고, 페이지로 이동
      var body = '';
      request.on('data', function(data){
        body = body + data; //정보가 조각조각 들어오게 함
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var title = post.title; //title정보를 받음
        var description = post.description; //description정보를 받음
        fs.writeFile(`data/${title}`,description,'utf8',function(err){
          response.writeHead(302, {Location: `/?id=${title}`}); //302는 페이지를 다른 곳으로 리다이렉션하겠다는 뜻
          response.end();
        });
      });
    } else if(pathname==='/update'){
      fs.readdir('./data',function(error,filelist){
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`,`utf8`,function(err,description){
            var title = queryData.id;
            var list = template.list(filelist);
            var html = template.HTML(title, list,
              `<form action="/update_process" method="post">
                <input type = "hidden" name="id" value="${title}">
                <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                <p>
                  <textarea name="description" placeholder="description">${description}</textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>`,
              `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
          response.writeHead(200);
          response.end(html);
        });
      });
    } else if(pathname==='/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data; //정보가 조각조각 들어오게 함
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title; //title정보를 받음
        var description = post.description; //description정보를 받음
        fs.rename(`data/${id}`,`data/${title}`,function(error){
          fs.writeFile(`data/${title}`,description,'utf8',function(err){
            response.writeHead(302, {Location: `/?id=${title}`}); //302는 페이지를 다른 곳으로 리다이렉션하겠다는 뜻
            response.end();
          })
        });
      });
    } else if(pathname==='/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data; //정보가 조각조각 들어오게 함
      });
      request.on('end',function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`,function(error){
          response.writeHead(302, {Location: `/`});
          response.end();
        })
      });
    } else {
      response.writeHead(404); //파일을 찾을 수 없을 경우 404를 돌려 줌
      response.end('Not found');
    }
});
app.listen(3000);
