var name = 'A';
var letter = 'Dear ' + name + '\n\
\ Hello ' + name ;
console.log(letter);

var letter = `Dear ${name}
 Hello ${name}.
 ${name}'s age is ${2}` ;
console.log(letter);
