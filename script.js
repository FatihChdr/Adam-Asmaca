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
const scoreValue = document.getElementById('score-value');
const letterInput = document.getElementById('letter-input');  // Yeni eklenen satır

let correctLetters = [];
let wrongLetters = [];
let selectedWord;
let difficultyLevel = 'easy'; // Varsayılan zorluk seviyesi
let score = 0;

const wordLists = {
    easy: ['gül', 'kelebek', 'kuş', 'deniz', 'orman'],
    medium: ['papatya', 'şelale', 'dağ', 'gökkuşağı', 'balık'],
    hard: ['volkan', 'şimşek', 'gizemli', 'geceyarısı', 'cadılarbayramı'],
};

const themes = {
    easy: {
        backgroundColor: '#87CEEB',  // Light Blue
        textColor: '#000',
        buttonColor: '#00FA9A',  // Medium Spring Green
    },
    medium: {
        backgroundColor: '#F0E68C',  // Khaki
        textColor: '#000',
        buttonColor: '#FF8C00',  // Dark Orange
    },
    hard: {
        backgroundColor: '#8B0000',  // Dark Red
        textColor: '#FFF',
        buttonColor: '#4B0082',  // Indigo
    },
};

function applyTheme(theme) {
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.textColor;
    // Diğer elementlerin temalarını da aynı şekilde ayarlayabilirsiniz
}

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
        updateScore(1);
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
        message_el.innerText = `Malesef kaybettiniz. Doğru kelime: ${selectedWord}`;
        updateScore(-score); // Skoru sıfırla
    }
}

function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

function updateScore(value) {
    score += value;
    if (value < 0) {
        score = 0; // Eğer yanlış bilirse skoru sıfırla
    }
    scoreValue.innerText = score;
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
    applyTheme(themes[difficultyLevel]); // Zorluk seviyesine göre tema uygula
}

letterInput.addEventListener('input', function (e) {
    // Input alanına harf girişi yapıldığında çalışacak fonksiyon
    const letter = e.target.value.toLowerCase();

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

    // Input alanını temizle
    e.target.value = '';
});

// İlk başta temayı uygula
applyTheme(themes.easy);
displayWord();
