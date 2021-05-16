var members = ['doto1', 'tdddt', 'geunju'];
console.log(members[1]); //tdddt
var i = 0;
while(i<members.length){
  console.log('array loop',members[i]);
  i = i+1;
}

var roles = {
  'programmer':'doto1',
  'designer' : 'tdddt',
  'manager' : 'geunju'
}
console.log(roles.designer);
console.log(roles['designer']);
for(var n in roles){
  console.log('object : ', n, '&value : ', roles[n]);
}
