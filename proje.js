const word_e1 = document.getElementById('word');

const correctLetters = ['j', 'a'];
const wrongLetters = [];

function getRandomWord() {
    const words = ["javascript", "java", "python"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    const selectedWord = getRandomWord();

    word_e1.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class = "letter">
                ${correctLetters.includes(letter) ? letter: ''}
            </div>
        `).join('')}
    `;
}

displayWord();