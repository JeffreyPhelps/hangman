// Jeffrey Phelps DU Web Dev Bootcamp Week 3 Homework Hangman Game

var bkgrndMusic = []
bkgrndMusic.push("./audio/nflmusic1.mp3");
bkgrndMusic.push("./audio/nflmusic2.mp3");
bkgrndMusic.push("./audio/nflmusic3.mp3");
bkgrndMusic.push("./audio/nflmusic4.mp3");
bkgrndMusic.push("./audio/nflmusic5.mp3");
bkgrndMusic.push("./audio/nflmusic6.mp3");
bkgrndMusic.push("./audio/nflmusic7.mp3");

var myAudio1 = document.createElement("audio");
myAudio1.src = "./audio/rightletter.mp3";

var myAudio2 = document.createElement("audio");
myAudio2.src = "./audio/wrongletter.mp3";

var myAudio3 = document.createElement("audio");
myAudio3.src = "./audio/youwin.mp3";

var myAudio4 = document.createElement("audio");
myAudio4.src = "./audio/youlose.mp3";

var myAudio5 = document.createElement("audio");
myAudio5.src = bkgrndMusic[Math.floor(Math.random() * bkgrndMusic.length)];

var words = ["ELWAY", "MONTANA", "BRADY", "BRADSHAW", "CUNNINGHAM", "RODGERS", 
  "MOON", "NAMATH", "STARR", "MANNING", "UNITAS", "MARINO", "YOUNG", "KELLY", 
  "STAUBACH", "TARKENTON", "BREES", "AIKMAN", "FAVRE", "FOUTS", "STABLER", 
  "ROETHLISBERGER", "WARNER", "BAUGH", "GRAHAM", "THEISMANN", "MORTON", 
  "PLUNKETT", "ESIASON", "SIMMS", "TITTLE", "VANBROCKLIN", "ELWAY", 
  "ANDERSON", "DAWSON", "JURGENSEN", "LUCKMAN", "BLANDA", "JAWORSKI", 
  "BLEDSOE", "MCNAIR", "MORRALL", "LAYNE", "GABRIEL", "GRIESE", "MCNABB"];
      
var game = {
  guessed: [],
  left: 11,
  start: function() {
    myAudio2.play();
    myAudio5.play();
    this.complete = false;
    this.word = words[Math.floor(Math.random() * words.length)];
    this.$right = document.getElementById('right');
    this.$wrong = document.getElementById('wrong');
    this.$remain = document.getElementById('remain');
    this.$right.innerHTML = '_'.repeat(this.word.length);
  },
  
  guess: function(letter) {
    if (this.left > 0 && this.complete != true) {
      if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
        this.right(letter);
      } else {
        this.wrong(letter);
      }
    }
  },
  
  right: function(letter) {
    for(var i = 0; i < this.word.length; i++) {
      if (this.word[i] == letter) {
        myAudio1.play();
        var word = this.$right.innerHTML.split('');
        word[i] = letter;
        this.$right.innerHTML = word.join('');
      }
    }
    if (this.$right.innerHTML.indexOf('_') < 0) {
      myAudio3.play();
      this.complete = true;
      alert('you win! The QB was: ' + this.word);
    }
  },
  
  wrong: function(letter) {
    myAudio2.play();
    this.guessed.push(letter);
    this.$wrong.innerHTML += ' ' + letter;
    this.left--;
    this.$remain.innerHTML = this.left;
    if (this.left < 1) {
      myAudio5.pause();
      myAudio4.play();
      this.complete = true;
      alert('you lose! The QB was: ' + this.word);
    }
  }
};

game.start();

document.onkeyup = function(event) {
  var letter = String.fromCharCode(event.keyCode).toUpperCase();
  game.guess(letter);
};

document.getElementById("musicButton").onclick = function() {
  myAudio5.pause();
  myAudio3.pause();
};

document.getElementById("resetButton").onclick = function() {
  window.location.reload();
};