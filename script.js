const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const playAgainBtn = document.getElementById('play-again');
const easyBtn = document.getElementById('easy-btn');
const mediumBtn = document.getElementById('medium-btn');
const hardBtn = document.getElementById('hard-btn');

let correctLetters = [];
let wrongLetters = [];
let selectedWord;
let difficultyLevel = 'easy'; // Varsayılan zorluk seviyesi

const wordLists = {
    easy: ['hilalaşkımm', 'ilaydadostim', 'emrebey'],
    medium: ['halilbur', 'geyşahan', 'acur'],
    hard: ['ömerinevi', 'malavuran', 'aşkuşum']
};

function getRandomWord() {
    const words = wordLists[difficultyLevel];
    let newWord;

    do {
        newWord = words[Math.floor(Math.random() * words.length)];
    } while (newWord === selectedWord);

    return newWord;
}

function displayWord() {
    word_el.innerHTML = selectedWord
        .split('')
        .map(letter => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </div>`
        )
        .join('');

    const w = word_el.innerText.replace(/\s/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler kazandınız.';
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
      ${wrongLetters.length > 0 ? '<h3>Hatalı Harfler</h3>' : ''}
      ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'Malesef kaybettiniz.';
    }
}

function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

playAgainBtn.addEventListener('click', function () {
    correctLetters = [];
    wrongLetters = [];
    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});

easyBtn.addEventListener('click', function () {
    changeDifficulty('easy');
});

mediumBtn.addEventListener('click', function () {
    changeDifficulty('medium');
});

hardBtn.addEventListener('click', function () {
    changeDifficulty('hard');
});

function restartGame() {
    correctLetters = [];
    wrongLetters = [];
    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
}

function changeDifficulty(level) {
    difficultyLevel = level;
    restartGame();
}

window.addEventListener('keydown', function (e) {
    const letter = e.key.toLowerCase(); // Küçük harfe çevir

    if (/^[a-zçğıöşü]$/.test(letter)) { // Türkçe karakterleri de kontrol et
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {
                displayMessage();
            }
        }
    }
});

displayWord();
