function getSec(ang1){
  var sec=ang1-Math.floor(ang1*100)/100;
  return (sec*10000).toFixed(0)-0;
}
function getMinute(ang1){
  var minute=Math.floor(ang1*100)/100-Math.floor(ang1);
  return (minute*100).toFixed(0)-0;
}
/*
  return the angel
  @return {ang,min,sec}
*/
function getAngel(ang){
  return {
    ang:ang<0?-Math.floor(-ang):Math.floor(ang),
    min:ang<0?getMinute(-ang):getMinute(ang),
    sec:ang<0?getSec(-ang):getSec(ang)
  }
}
function add(ang1,ang2) {
  if(ang1<0){
    if(ang2>0){
      return minus(ang2,-ang1)
    }
  }else{
    if(ang2<0){
      return minus(ang1,-ang2)
    }
  }
  var angel1=getAngel(ang1)
  var angel2=getAngel(ang2)
  var angel={
    ang:0,
    min:0,
    sec:0
  }
  angel.sec=(angel1.sec+angel2.sec)%60
  angel.min=(angel1.min+angel2.min+Math.floor((angel1.sec+angel2.sec)/60))%60
  angel.ang=(angel1.ang+angel2.ang)+Math.floor((angel1.min+angel2.min)/60)
  return angel;
}
function minus(ang1,ang2) {
  if(ang1<0){
    if(ang2>0){
      return add(ang1,-ang2)
    }
  }else if(ang1==0){
    return getAngel(-ang2)
  }else{
    if(ang2<0){
      return add(ang1,-ang2)
    }
  }
  if(ang1<ang2){
    return getAngel(-toAngel(minus(ang2,ang1)))
  }
  var a1=getAngel(ang1)
  var a2=getAngel(ang2)
  var angel={
    ang:0,
    min:0,
    sec:0
  }
  angel.sec=a1.sec>=a2.sec?a1.sec-a2.sec:(a1.sec+60-a2.sec)
  angel.min=(a1.min>=a2.min?a1.min-a2.min:a1.min+60-a2.min)-(a1.sec>=a2.sec?0:1)
  angel.ang=a1.ang-a2.ang-(a1.min>=a2.min?0:1)
  return angel
}
function printAngel(ang) {
  return `${Object.is(ang.ang,-0)?'-':''}${ang.ang}°${ang.min<10?'0'+ang.min:ang.min}′${ang.sec<10?'0'+ang.sec:ang.sec}″`
}
function toAngel(ang) {
  if(Object.keys(ang).length==0){
    return 0;
  }
  let absAng=Math.abs(ang.ang)+ang.min*0.01+ang.sec*0.0001
  return ang.ang<0||Object.is(ang.ang,-0)?(-absAng).toFixed(4):absAng.toFixed(4);
}