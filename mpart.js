var M = {
  v:'v',
  f:function(){
    console.log(this.v);
  }
}

module.exports = M; //모듈 바깥에서 M을 사용할 수 있도록 export
