// HTML'den gelen elementleri seçme
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
const keyboardContainer = document.getElementById('keyboard-container');
const keyboardButtons = document.querySelectorAll('.keyboard-key');

// Oyun için gerekli değişkenler
let correctLetters = [];
let wrongLetters = [];
let selectedWord;
let difficultyLevel = 'easy'; // Varsayılan zorluk seviyesi
let score = 0;

// Ekran klavyesi düğmelerine tıklama olayını ekle
keyboardButtons.forEach(button => {
    button.addEventListener('click', () => {
        const clickedLetter = button.innerText;
        checkLetter(clickedLetter);
    });
});

// Harfi kontrol etme fonksiyonu
function checkLetter(letter) {
    letter = letter.toUpperCase(); // Harfi büyük harfe çevir

    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
        // Bu harfi zaten kontrol ettik, mesajı göster
        displayMessage("Bu harfi zaten girdiniz.");
    } else {
        // Harfi kontrol et ve duruma göre işlem yap
        if (selectedWord.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
        } else {
            wrongLetters.push(letter);
            updateWrongLetters();
        }
    }
}

// Kelime listesi
const wordLists = {
    easy: ['gül', 'kelebek', 'kuş', 'deniz', 'orman'],
    medium: ['papatya', 'şelale', 'dağ', 'gökkuşağı', 'balık'],
    hard: ['volkan', 'şimşek', 'gizemli', 'geceyarısı', 'cadılarbayramı'],
};

// Tema renkleri
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

// Tema uygulama fonksiyonu
function applyTheme(theme) {
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.textColor;
    easyBtn.style.backgroundColor = theme.buttonColor;
    mediumBtn.style.backgroundColor = theme.buttonColor;
    hardBtn.style.backgroundColor = theme.buttonColor;
    // Diğer elementlerin temalarını da aynı şekilde ayarlayabilirsiniz
}

// Temayı uygula
applyTheme(themes.easy);

// Oyunu başlatma fonksiyonu
function startGame() {
    correctLetters = [];
    wrongLetters = [];
    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
}

// Zorluk seviyesi değiştirme fonksiyonu
function changeDifficulty(level) {
    difficultyLevel = level;
    startGame();
    applyTheme(themes[level]);
}

// Kelime listesinden rastgele bir kelime seçme fonksiyonu
function getRandomWord() {
    const words = wordLists[difficultyLevel];
    let newWord;

    do {
        newWord = words[Math.floor(Math.random() * words.length)];
    } while (newWord === selectedWord);

    return newWord.toUpperCase(); // Seçilen kelimeyi büyük harfe çevirerek döndür
}

// Kelimeyi ekranda gösterme fonksiyonu
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

// Yanlış harfleri güncelleme fonksiyonu
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

// Mesajı ekranda gösterme fonksiyonu
function displayMessage(msg) {
    message_el.innerText = msg;
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000);
}

// Skoru güncelleme fonksiyonu
function updateScore(value) {
    score += value;
    if (value < 0) {
        score = 0; // Eğer yanlış bilirse skoru sıfırla
    }
    scoreValue.innerText = score;
}

// Yeniden oyunu başlatma butonuna tıklama olayını dinle
playAgainBtn.addEventListener('click', function () {
    startGame();
});

// Zorluk seviyelerine tıklama olayını dinle
easyBtn.addEventListener('click', function () {
    changeDifficulty('easy');
});

mediumBtn.addEventListener('click', function () {
    changeDifficulty('medium');
});

hardBtn.addEventListener('click', function () {
    changeDifficulty('hard');
});

// Oyunu başlat
startGame();
