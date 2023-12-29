var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.lineWidth = 3;

function blankCanvas() {
    ctx.clearRect(0, 0, 200, 150);
};

function gallows() {
    ctx.moveTo(30, 0);
    ctx.lineTo(100, 0);
    ctx.moveTo(100, 0);
    ctx.lineTo(100, 14);
    ctx.moveTo(30, 0);
    ctx.lineTo(30, 100);
    ctx.moveTo(5, 100);
    ctx.lineTo(55, 100);
    ctx.stroke();
};

function head() {
    ctx.beginPath();
    ctx.arc(100, 25, 12, 0, 2 * Math.PI);
    ctx.stroke();
};

function body() {
    ctx.moveTo(100, 35);
    ctx.lineTo(100, 70);
    ctx.stroke();
};

function leftArm() {
    ctx.moveTo(100, 55);
    ctx.lineTo(75, 40);
    ctx.stroke();
};

function rightArm() {
    ctx.moveTo(100, 55);
    ctx.lineTo(125, 40);
    ctx.stroke();
};

function leftLeg() {
    ctx.moveTo(100, 70);
    ctx.lineTo(75, 85);
    ctx.stroke();
};

function rightLeg() {
    ctx.moveTo(100, 70);
    ctx.lineTo(125, 85);
    ctx.stroke();
};

function letterBlanks(x, y) {
    ctx.moveTo(x, 130);
    ctx.lineTo(y, 130);
    ctx.stroke();
};

function fillLetters(letter, x) {
    ctx.font = "20px Comic Sans";
    ctx.fillText(letter, x, 125);
}

var levelOne = ["abla", "ders", "cami", "okul"];
var levelTwo = ["fatih", "sultan", "mehmet", "vakıf"];
var levelThree = ["program", "saman", "evliya", "ceylan", "köpek", "turkuaz", "cenaze", "deprem"];
var levelFour = ["pijama", "gömlek", "balina", "pirana", "kuzgun", "timsah", "tarantula", "piton", "çaylak", "borçlu"];
var levelFive = ["mahrem", "işaret", "hüsran", "gurbet", "kıyamet"];

var index = prompt("Hangi seviyede oynamak istersiniz? 1 ve 5 arasında bir rakam seçiniz!");
var levels = [levelOne, levelTwo, levelThree, levelFour, levelFive];
var wordChoices = levels[index - 1]
var gameWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];

function startGame() {
        document.getElementById("idResult").innerHTML = ("Başlayabilirsiniz.");
        gallows();
        createLetterBlanks();
};

function showGameword() {
    document.getElementById("idShowGameword").innerHTML = gameWord;
};

function createLetterBlanks() {
    var lettersLength = gameWord.length * 15
    for (i = 5; i < lettersLength; i += 15) {
        letterBlanks(i, i + 10);
    }
};

function fillLetterBlanks(count) {
    var xValue = (count * 15) + 5;
    var letterValue = gameWord[count];
    fillLetters(letterValue, xValue);
};

function fillInWholeWord() {
    for (i = 0; i < gameWord.length; i++) {
        fillLetterBlanks(i);
    }
};

function guessWord() {
    var guess = prompt("Kelime tahminin nedir?");
    if (guess === gameWord) {
        document.getElementById("idResult").innerHTML = "Doğru!";
        gameOver("Kazandın");
    } else {
        document.getElementById("idResult").innerHTML = "Doğru değil. Tekrar dene!";
        addBodyPart();
    }
};

var length = gameWord.length;
var wrongGuesses = [];
var numberOfMissedGuesses = -1;
var hangmanArray = [head, body, leftArm, rightArm, leftLeg, rightLeg];
var guessedWordCount = 0;

function guessLetter() {
    var guess = prompt("Bir harf tahmin et!");
    var letters = [];

    for (i = 0; i < length; i++) {
        if (guess === gameWord[i]) {
            letters.push(i);
        }
    }

    if (letters[0] != null) {
        document.getElementById("idResult").innerHTML = "Doğru!";
        lettersLength = letters.length;
        for (j = 0; j < lettersLength; j++) {
            fillLetterBlanks(letters[j]);
            guessedWordCount++;
        }
        if (guessedWordCount === gameWord.length) {
            gameOver("Kazandın");
        }
    } else {
        document.getElementById("idResult").innerHTML = "Doğru değil. Tekrar tahmin et!";
        wrongGuesses.push(guess);
        document.getElementById("idArrayOfWrongGuesses").innerHTML = wrongGuesses;
        addBodyPart();
    }
};

function addBodyPart() {
    numberOfMissedGuesses++;
    if (numberOfMissedGuesses === hangmanArray.length) {
        gameOver("Kaybettin");
    }
    var bodyPart = hangmanArray[numberOfMissedGuesses];
    bodyPart();
};

function gameOver(status) {
    fillInWholeWord();
    var ending = status + "! Tekrar oynamak ister misin?";
    var playAgain = confirm(ending);
    if (playAgain === true) {
        location.reload()
    } else {
        blankCanvas();
        document.getElementById("idResult").innerHTML = ("Tamam!");
    }
};

