// Back end logic
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(mark){
  this.mark = mark;
  this.runs = 0;
  this.score = 0;
  // this.squares=[];
}

Player.prototype.mark = function () {
  return this.mark;
}

function Square (position){
  this.position = position;
  this.player = [];
  this.mark="";
}

Square.prototype.markedBy = function () {
  if (this.mark){
    return this.player;
  }else{
    return false;
  }
}

Square.prototype.getMark = function (player) {
  this.mark= player.mark;
  this.player = player;
}

//Board
function Board (){
  this.square = [];
}

Board.prototype.init = function () {
  for (var i = 0; i < 9; i++) {
    var newSquare = new Square(i);
    this.square.push(newSquare);
  }
}

Board.prototype.find = function (position) {
  return board[position];
}

function Game (){
    this.board = [];
    this.player = [];
    this.ties = 0;
    this.turn = "";
  }

Game.prototype.init = function () {
  this.board = new Board();
  this.board.init();
  this.player.push(new Player("X"));
  this.player.push(new Player("O"));
  this.turn = getRandom(0,1).toString();
}

Game.prototype.nextTurn = function () {
    this.turn === "0"?this.turn = "1":this.turn = "0";
}

Game.prototype.currentPlayer = function () {
    return this.player[this.turn];
}

Game.prototype.gameOver = function () {
  var wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    //get squares played by this player
    var plays = [];
    for (var i = 0; i < this.board.square.length; i++) {
      if (this.board.square[i].markedBy() === this.player[this.turn]){
        plays.push(this.board.square[i].position);
      }
    }
    plays.sort();
    var result = false;
    var combinations = combine(plays);

      wins.forEach(function (win){
        for (var i = 0; i < combinations.length; i++) {
          if (combinations[i].join("") === win.join("")){
            result =  true;
          }
        }
      });
  return result;
}

var combine = function(a) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = 3; i < 4; i++) {
        fn(i, a, [], all);
    }
    if (a.length<4){
    	all.push(a);
    }
    return all;
}

var getImage = function (turn){
  if (turn === "0"){
    return "<div id='x'><img src='./img/x.png'></div>";
  }else {
    return "<div id='O'><img src='./img/o.png'></div>";
  }
}

var clearBoard = function (){
  for (var i = 0; i <9; i++) {
    $("div#"+i).empty();
  }
}

//Front End logic
$(function () {
  var newGame = new Game();
  newGame.init();
  var playCount = 1;
  $("div.square").click(function(){
    if (playCount <= 9){
    //  console.log(newGame);
      var currentSquare = this.id;
      var currentPlayer= newGame.currentPlayer();
      newGame.player[newGame.turn].runs++;
    //  console.log(newGame.board.square[currentSquare].markedBy());
      if(!newGame.board.square[currentSquare].markedBy()){
        newGame.board.square[currentSquare].getMark(currentPlayer);

        $("#"+currentSquare).append(getImage(newGame.turn));

        if(currentPlayer.runs >= 3){
          if(newGame.gameOver()){
            var playerNum = parseInt(newGame.turn) + 1;
            alert ("Player"+ playerNum +" has Won!");
            //console.log(newGame.Player,newGame.turn);
            newGame.player[newGame.turn].score++;
            playCount = 11;
          }else if (playCount === 9) {
            alert("tie");
            newGame.ties++;
          }
        }
        newGame.nextTurn();
        playCount++;
        }
      }else{
        newGame.board = new Board;
        newGame.board.init()
        clearBoard();
        playCount=1;
        newGame.player[0].runs=0;
        newGame.player[1].runs=0;
      }
    });

});
