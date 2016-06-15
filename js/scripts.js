var win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];





var getImage = function (player){
  if (player === 0){
    console.log("x");
    return "<div id='x'><img src='./img/x.png'></div>";
  }else {
    return "<div id='O'><img src='./img/o.png'></div>";
  }
}

$(function () {
  $("div.square").click(function(){
    $("#"+this.id).append(getImage(turn));

  });
});
