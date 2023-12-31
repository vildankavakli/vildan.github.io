function blankCanvas() {
    ctx.clearRect(0, 0, 200, 150);
};

// Sabit kelime listesi ve seviyeye göre kelime seçimi
var levels = [
    ["abla", "ders", "cami", "okul"],
    ["fatih", "sultan", "mehmet", "vakıf"],
    ["program", "saman", "evliya", "ceylan", "köpek", "turkuaz", "cenaze", "deprem"],
    ["pijama", "gömlek", "balina", "pirana", "kuzgun", "timsah", "tarantula", "piton", "çaylak", "borçlu"],
    ["mahrem", "işaret", "hüsran", "gurbet", "kıyamet"]
];
var index = prompt("Hangi seviyede oynamak istersiniz? 1 ve 5 arasında bir rakam seçiniz!");
var wordChoices = levels[index - 1];
var gameWord = wordChoices[Math.floor(Math.random() * wordChoices.length)];
var wrongGuesses = [];
let wordState = new Array(gameWord.length).fill(false);

const wordDisplay = document.getElementById('wordDisplay');
for (let i = 0; i < gameWord.length; i++) {
    const letterSpan = document.createElement('span');
    letterSpan.innerText = "_";
    wordDisplay.appendChild(letterSpan);
}


function startGame() {
    document.getElementById("idResult").innerHTML = ("Başlayabilirsiniz.");
    gallows();
    createLetterBlanks();
};
const alphabet = "abcçdefgğhıijklmnoöpqrsştuüvyz".split('');

// Harfleri ekrana yazdır ve buton olarak oluştur
const lettersContainer = document.getElementById('letters');

alphabet.forEach(letter => {
    const letterButton = document.createElement('button');
    letterButton.innerText = letter;
    letterButton.addEventListener('click', () => checkLetter(letter));
    lettersContainer.appendChild(letterButton);
});


let wrongGuessCount = 0;

function checkLetter(clickedLetter) {
    let found = false;

    for (let i = 0; i < gameWord.length; i++) {
        if (gameWord[i] === clickedLetter && !wordState[i]) {
            wordState[i] = true;
            document.getElementById("idResult").innerHTML = "Doğru!";
            found = true;
            wordDisplay.children[i].innerText = clickedLetter;
        }
    }

    if (!found) {
        wrongGuessCount++;
        document.getElementById("idResult").innerHTML = "Doğru değil. Tekrar tahmin et!";
        wrongGuesses.push(clickedLetter);
        document.getElementById("idArrayOfWrongGuesses").innerHTML = wrongGuesses;
        drawHangman(wrongGuessCount);
    }

    if (wordState.every(status => status)) {
        alert("Tebrikler! Kelimeyi doğru tahmin ettiniz.");
        location.reload();
    }
}

function fillLetterBlanks(count) {
    var xValue = (count * 15) + 5;
    var letterValue = gameWord[count];
    fillLetters(letterValue, xValue);
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


function drawHangman(wrongGuessCountCount) {

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;

    switch (wrongGuessCountCount) {
        case 1:
            // Head
            ctx.beginPath();
            ctx.arc(100, 25, 12, 0, 2 * Math.PI);
            ctx.stroke();
            break;

        case 2:
            // Body
            ctx.moveTo(100, 35);
            ctx.lineTo(100, 70);
            ctx.stroke();
            break;

        case 3:
            // Left Arm
            ctx.moveTo(100, 55);
            ctx.lineTo(75, 40);
            ctx.stroke();
            break;

        case 4:
            // Right Arm
            ctx.moveTo(100, 55);
            ctx.lineTo(125, 40);
            ctx.stroke();
            break;

        case 5:
            // Left Leg
            ctx.moveTo(100, 70);
            ctx.lineTo(75, 85);
            ctx.stroke();
            break;

        case 6:
            // Right Leg
            ctx.moveTo(100, 70);
            ctx.lineTo(125, 85);
            ctx.stroke();
            break;

        default:
            break;
            if (wrongCount === 6) { // Eğer tüm bölümler tamamlanmışsa
                alert("Kaybettin");
            }

    }

}

