let speech;
let countdownTimer;
let seconds = 0;
let isPlaying = false;
let isPaused = false;
let currentQuestion = 0;
let selectedAnswer = null;
let correctAnswers = 0;
let currentOptions = [];
let currentCorrectAnswer = "";
let hasAnswered = false;
let hasStartedListening = false;
let speechRate = 0.9;
let currentTestIndex = 0;

// Metinler
const tomText = "Hello! My name is Tom. I am 16 years old. I live in Ankara with my family. I get up at seven o'clock and go to school by bus. My favourite subject is English. After school, I play basketball with my friends.";

const alexText = "This is my friend Alex. He is tall and thin. He has short brown hair and blue eyes. Alex usually wears glasses. He is very friendly and helpful. He likes talking to people and making new friends. Alex is also hardworking. He studies a lot and always helps his classmates.";

const vocabularyText = "Welcome to the vocabulary test! This section will test your knowledge of English words, grammar, and usage. Read each question carefully and choose the best answer from the options given. Good luck!";

// Sorular - Test 1: Tom
const questionsDataTom = [ 
    { q: "How old is Tom?", correct: "16", options: ["14", "15", "16", "17"] },
    { q: "Where does Tom live?", correct: "Ankara", options: ["İstanbul", "Ankara", "İzmir", "Bursa"] },
    { q: "How does Tom go to school?", correct: "By bus", options: ["By car", "On foot", "By bus", "By bike"] },
    { q: "What is Tom's favourite subject?", correct: "English", options: ["Math", "Science", "English", "History"] },
    { q: "What does Tom do after school?", correct: "Plays basketball", options: ["Studies", "Watches TV", "Plays basketball", "Sleeps"] }
];

// Sorular - Test 2: Alex
const questionsDataAlex = [
    { q: "What does Alex look like?", correct: "Tall and thin", options: ["Short and fat", "Tall and thin", "Tall and strong", "Short and thin"] },
    { q: "What color are Alex's eyes?", correct: "Blue", options: ["Brown", "Green", "Blue", "Black"] },
    { q: "What does Alex usually wear?", correct: "Glasses", options: ["A hat", "A jacket", "Glasses", "A cap"] },
    { q: "What kind of personality does Alex have?", correct: "Friendly and helpful", options: ["Shy and quiet", "Lazy and rude", "Friendly and helpful", "Angry and noisy"] },
    { q: "Why is Alex hardworking?", correct: "He studies a lot", options: ["He plays sports", "He studies a lot", "He watches TV", "He sleeps early"] }
];

// Sorular - Test 3: Vocabulary
const questionsDataVocabulary = [
    { q: "Which word means 'very big'?", correct: "huge", options: ["small", "tiny", "huge", "short"] },
    { q: "I am ___ because I didn't sleep well.", correct: "tired", options: ["hungry", "tired", "angry", "noisy"] },
    { q: "Which one is a place?", correct: "hospital", options: ["doctor", "hospital", "driver", "teacher"] },
    { q: "What is the opposite of early?", correct: "late", options: ["fast", "slow", "late", "soon"] },
    { q: "Which word is related to weather?", correct: "cloudy", options: ["cloudy", "friendly", "careful", "quiet"] },
    { q: "My brother is very ___ He always helps people.", correct: "kind", options: ["kind", "lazy", "shy", "sad"] },
    { q: "Which one is a transportation word?", correct: "bicycle", options: ["kitchen", "bicycle", "pillow", "window"] },
    { q: "I usually ___ my homework in the evening.", correct: "do", options: ["make", "do", "take", "get"] },
    { q: "Which word means 'not cheap'?", correct: "expensive", options: ["expensive", "boring", "easy", "old"] },
    { q: "She is wearing a ___ dress today.", correct: "beautiful", options: ["beautiful", "beautifully", "beauty", "beautify"] },
    { q: "I'm very hungry I ___ a sandwich now.", correct: "am eating", options: ["eat", "eats", "am eating", "ate"] },
    { q: "My sister ___ TV every evening.", correct: "watches", options: ["watch", "watches", "is watch", "watching"] },
    { q: "There ___ two dogs in the park.", correct: "are", options: ["is", "was", "are", "be"] },
    { q: "This bag is ___ than mine 💼", correct: "heavier", options: ["heavy", "heavier", "heaviest", "more heavy"] },
    { q: "He ___ ride a bike very well 🚲", correct: "can", options: ["must", "should", "can", "need"] },
    { q: "We usually ___ breakfast at 7 a.m. 🍳", correct: "have", options: ["have", "has", "had", "having"] },
    { q: "My keys are ___ the table 🔑", correct: "on", options: ["in", "on", "at", "under"] },
    { q: "___ Ayşe like some ice cream? 🍦", correct: "Does", options: ["Are", "Do", "Did", "Does"] },
    { q: "I was so tired last night that I ___ asleep during the movie 😴", correct: "fell", options: ["fall", "fell", "fallen", "falling"] },
    { q: "If it ___ tomorrow, we'll stay at home and watch movies 🍿", correct: "rains", options: ["rain", "rains", "rained", "will rain"] },
    { q: "She speaks English very well ___ she lived in London for two years 🇬🇧", correct: "because", options: ["but", "so", "because", "although"] },
    { q: "My phone battery was dead, ___ I couldn't call anyone 📱", correct: "so", options: ["but", "because", "so", "although"] },
    { q: "Which sentence is correct? ✅", correct: "He doesn't like coffee.", options: ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He didn't likes coffee."] },
    { q: "🐱🐶 'It's raining cats and dogs.' What is the meaning of this sentence?", correct: "Çok şiddetli yağmur yağıyor", options: ["Hayvanlar yağıyor", "Çok sıcak hava", "Çok şiddetli yağmur yağıyor", "Hava çok soğuk"] },
    { q: "👀📖 'Don't judge a book by its cover.' What does this proverb mean?", correct: "İnsanları dış görünüşüne göre yargılama", options: ["Kitap okumak önemlidir", "İnsanları dış görünüşüne göre yargılama", "Kapaklar çok önemlidir", "Kitap pahalıdır"] },
    { q: "🐦🌅 'The early bird catches the worm.' What does this saying mean?", correct: "Erken kalkan yol alır", options: ["Kuşlar sabah uçar", "Erken kalkan yol alır", "Solucanlar tehlikelidir", "Geç kalmak iyidir"] },
    { q: "🤐👅 'Loose lips sink ships.' What does this proverb convey?", correct: "Dikkatsiz konuşmak sorun çıkarır", options: ["Çok konuşmak eğlencelidir", "Sessizlik sıkıcıdır", "Dikkatsiz konuşmak sorun çıkarır", "Gemiler batmaz"] },
    { q: "🐘❓ 'An elephant in the room.' What does this idiom mean?", correct: "Büyük ama konuşulmayan bir problem", options: ["Hayvanat bahçesi", "Büyük ama konuşulmayan bir problem", "Çok büyük bir oda", "Korkunç bir hayvan"] },
    { q: "How do you spell:", correct: "introduce", options: ["introduce", "intruduce", "introdouce", "interduce"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "different", options: ["diferent", "different", "diffrent", "differant"], speakOnlyAnswer: true }
];

// UZATMA SORULARI
const overtimeQuestions = [
    { q: "How do you spell:", correct: "experience", options: ["experiance", "experience", "experence", "expiriance"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "quality", options: ["qualaty", "quality", "quallity", "qalite"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "important", options: ["impotant", "important", "importent", "imporant"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "English", options: ["Inglish", "Engilish", "English", "Inglishh"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "quite", options: ["quiet", "quite", "qiuet", "quait"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "appearance", options: ["apperance", "appearence", "appearance", "appearnce"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "physical education", options: ["physical edukation", "fisical education", "physical education", "physical edication"], speakOnlyAnswer: true },
    { q: "How do you spell:", correct: "congratulations", options: ["congradulations", "congratilations", "congratulations", "congratualtions"], speakOnlyAnswer: true }
];

let currentQuestionsData = questionsDataTom;

// Metni temizle (emoji ve underscore kaldır)
function cleanTextForSpeech(text) {
    text = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    text = text.replace(/_+/g, ' ');
    return text.trim();
}

// Hız ayarı değiştiğinde
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('readingText').textContent = tomText;
});

// SES EFEKTLERİ
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct') {
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        } else if (type === 'wrong') {
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.15);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } else if (type === 'click') {
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } else if (type === 'complete') {
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.6);
        } else if (type === 'overtime') {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const osc = audioContext.createOscillator();
                    const gain = audioContext.createGain();
                    osc.connect(gain);
                    gain.connect(audioContext.destination);
                    osc.frequency.setValueAtTime(1000, audioContext.currentTime);
                    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + 0.1);
                }, i * 200);
            }
        }
    } catch (e) {
        console.log("Ses hatası:", e);
    }
}

// Zaman formatı
function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Array karıştırma
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Seçenekleri oluştur
function generateOptions(questionIndex) {
    const question = currentQuestionsData[questionIndex];
    currentCorrectAnswer = question.correct;
    return shuffleArray([...question.options]);
}

// SORU EKRANI ZAMAN SAYACI
function startQuestionTimer() {
    clearInterval(countdownTimer);
    seconds = 10;
    
    const timerElement = document.getElementById('questionTimer');
    if (!timerElement) return;
    
    timerElement.textContent = formatTime(seconds);
    
    countdownTimer = setInterval(() => {
        seconds--;
        timerElement.textContent = formatTime(seconds);
        
        if (seconds <= 0) {
            clearInterval(countdownTimer);
            showBlackScreen();
        }
    }, 1000);
}

// ResponsiveVoice ile tüm sesleri durdur
function stopAllSpeech() {
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.cancel();
    }
}

// SORUYU SESLİ OKU
function readQuestion() {
    if (typeof responsiveVoice === 'undefined') {
        console.log("ResponsiveVoice not available");
        return;
    }
    
    const currentQuestionData = currentQuestionsData[currentQuestion];
    
    if (currentQuestionData.speakOnlyAnswer) {
        responsiveVoice.speak(currentCorrectAnswer, "UK English Male", {
            rate: speechRate,
            pitch: 1.0,
            volume: 1.0
        });
        return;
    }
    
    let textToSpeak = cleanTextForSpeech(currentQuestionData.q);
    
    responsiveVoice.speak(textToSpeak, "UK English Male", {
        rate: speechRate,
        pitch: 1.0,
        volume: 1.0
    });
}

// METİN OKUMA - OTOMATİK SÜRELİ
function readText() {
    if (hasStartedListening) {
        return;
    }
    
    if (typeof responsiveVoice === 'undefined' || !responsiveVoice) {
        alert("Text-to-speech is not available!");
        return;
    }
    
    playSound('click');
    hasStartedListening = true;
    isPlaying = true;
    isPaused = false;
    
    const listenBtn = document.getElementById('listenBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (listenBtn) listenBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'flex';
    if (resumeBtn) resumeBtn.style.display = 'none';
    
    const text = document.getElementById('readingText').textContent;
    
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    const speedFactor = 1 / speechRate;
    const baseSeconds = wordCount / 2.5;
    const adjustedSeconds = baseSeconds * speedFactor;
    const estimatedSeconds = Math.ceil(adjustedSeconds * 1.25);
    const readingTime = Math.max(estimatedSeconds, 8);
    const finalReadingTime = Math.min(readingTime, 90);
    
    console.log(`Metin analizi: ${wordCount} kelime, Hız: ${speechRate}x, Süre: ${finalReadingTime}s`);
    
    startDynamicReadingTimer(finalReadingTime);
    
    const infoElement = document.querySelector('.info');
    if (infoElement) {
        infoElement.textContent = "Test will start automatically after listening";
    }
    
    responsiveVoice.speak(text, "UK English Male", {
        rate: speechRate,
        pitch: 1.0,
        volume: 1.0,
        onstart: function() {
            console.log("Okuma başladı");
        },
        onend: function() {
            console.log("Okuma bitti, sorulara geçiliyor...");
            if (isPlaying) {
                skipToQuestions();
            }
        }
    });
    
    const safetyTimer = setTimeout(() => {
        if (isPlaying && hasStartedListening) {
            console.log("Güvenlik timer'ı tetiklendi, sorulara geçiliyor...");
            skipToQuestions();
        }
    }, (finalReadingTime + 3) * 1000);
    
    window.safetyTimeout = safetyTimer;
}

// DİNAMİK OKUMA ZAMANLAYICISI
function startDynamicReadingTimer(duration) {
    clearInterval(countdownTimer);
    seconds = duration;
    
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    
    timerElement.textContent = formatTime(seconds);
    timerElement.style.color = '#10b981';
    timerElement.style.fontWeight = 'bold';
    
    countdownTimer = setInterval(() => {
        seconds--;
        timerElement.textContent = formatTime(seconds);
        
        if (seconds <= 5) {
            timerElement.style.color = '#ef4444';
            timerElement.style.animation = 'pulse 1s infinite';
        }
        
        if (seconds <= 0) {
            clearInterval(countdownTimer);
            if (isPlaying && hasStartedListening) {
                console.log("Zaman doldu, sorulara geçiliyor...");
                skipToQuestions();
            }
        }
    }, 1000);
}

// SKIP TO QUESTIONS FONKSİYONU
function skipToQuestions() {
    if (!hasStartedListening) return;
    
    console.log("skipToQuestions çağrıldı");
    
    clearInterval(countdownTimer);
    if (window.safetyTimeout) {
        clearTimeout(window.safetyTimeout);
    }
    
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.cancel();
    }
    
    isPlaying = false;
    isPaused = false;
    
    const listenBtn = document.getElementById('listenBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (listenBtn) listenBtn.style.display = 'flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (resumeBtn) resumeBtn.style.display = 'none';
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = '00:00';
        timerElement.style.color = '';
        timerElement.style.animation = '';
    }
    
    const infoElement = document.querySelector('.info');
    if (infoElement) {
        infoElement.textContent = "Test will start automatically after listening";
    }
    
    setTimeout(() => {
        document.getElementById('mainScreen').classList.remove('active');
        document.getElementById('questionScreen').classList.add('active');
        showQuestion();
    }, 500);
}

// DİREKT SORULARA GEÇ (SKIP BUTONU)
function skipToQuestionsDirectly() {
    playSound('click');
    
    clearInterval(countdownTimer);
    if (window.safetyTimeout) {
        clearTimeout(window.safetyTimeout);
    }
    
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.cancel();
    }
    
    isPlaying = false;
    isPaused = false;
    hasStartedListening = false;
    
    const listenBtn = document.getElementById('listenBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (listenBtn) listenBtn.style.display = 'flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (resumeBtn) resumeBtn.style.display = 'none';
    
    document.getElementById('mainScreen').classList.remove('active');
    document.getElementById('questionScreen').classList.add('active');
    showQuestion();
}

// OKUMA DURAKLAT
function pauseReading() {
    playSound('click');
    
    if (isPlaying && !isPaused) {
        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.pause();
        }
        
        isPaused = true;
        isPlaying = false;
        clearInterval(countdownTimer);
        
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeBtn = document.getElementById('resumeBtn');
        
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (resumeBtn) resumeBtn.style.display = 'flex';
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.style.color = '#f59e0b';
        }
    }
}

// OKUMAYA DEVAM ET
function resumeReading() {
    playSound('click');
    
    if (isPaused) {
        if (typeof responsiveVoice !== 'undefined') {
            responsiveVoice.resume();
        }
        
        isPaused = false;
        isPlaying = true;
        
        const timerElement = document.getElementById('timer');
        
        countdownTimer = setInterval(() => {
            seconds--;
            timerElement.textContent = formatTime(seconds);
            
            if (seconds <= 5) {
                timerElement.style.color = '#ef4444';
            } else {
                timerElement.style.color = '#10b981';
            }
            
            if (seconds <= 0) {
                clearInterval(countdownTimer);
                if (isPlaying) {
                    skipToQuestions();
                }
            }
        }, 1000);
        
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeBtn = document.getElementById('resumeBtn');
        
        if (pauseBtn) pauseBtn.style.display = 'flex';
        if (resumeBtn) resumeBtn.style.display = 'none';
    }
}

// SORUYU GÖSTER - TIKLAMA YOK, SADECE SİYAH EKRAN
function showQuestion() { 
    clearInterval(countdownTimer);
    hasAnswered = false;
    selectedAnswer = null;
    
    if (currentQuestion >= currentQuestionsData.length) {
        if (currentTestIndex === 0) {
            loadAlexTest();
        } else if (currentTestIndex === 1) {
            loadVocabularyTest();
        } else if (currentTestIndex === 2) {
            showOvertimeScreen();
        } else {
            showFinalResults();
        }
        return;
    }
    
    currentOptions = generateOptions(currentQuestion);
    
    const totalQuestions = questionsDataTom.length + questionsDataAlex.length + questionsDataVocabulary.length;
    let currentQuestionNumber = currentQuestion + 1;
    if (currentTestIndex === 1) {
        currentQuestionNumber = questionsDataTom.length + currentQuestion + 1;
    } else if (currentTestIndex === 2) {
        currentQuestionNumber = questionsDataTom.length + questionsDataAlex.length + currentQuestion + 1;
    }
    
    document.getElementById('current').textContent = currentQuestionNumber;
    document.getElementById('total').textContent = totalQuestions;
    
    let questionText = currentQuestionsData[currentQuestion].q;
    document.getElementById('questionText').textContent = questionText;
    
    readQuestion();
    
    const progress = ((currentQuestionNumber - 1) / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    const optionsHTML = `
        <div class="option">
            <span class="option-letter">A</span>
            <span class="option-text">${currentOptions[0]}</span>
        </div>
        <div class="option">
            <span class="option-letter">B</span>
            <span class="option-text">${currentOptions[1]}</span>
        </div>
        <div class="option">
            <span class="option-letter">C</span>
            <span class="option-text">${currentOptions[2]}</span>
        </div>
        <div class="option">
            <span class="option-letter">D</span>
            <span class="option-text">${currentOptions[3]}</span>
        </div>
    `;
    
    document.getElementById('options').innerHTML = optionsHTML;
    
    // TIKLAMA YOK - sadece görsel göster
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
        opt.style.pointerEvents = 'none';
        opt.style.cursor = 'default';
    });
    
    startQuestionTimer();
}

// MEVCUT SORUYU GEÇ
function skipCurrentQuestion() {
    playSound('click');
    stopAllSpeech();
    clearInterval(countdownTimer);
    
    currentQuestion++;
    
    if (currentTestIndex === 3) {
        // Overtime soruları için
        if (currentQuestion >= overtimeQuestions.length) {
            showOvertimeResults();
        } else {
            showOvertimeQuestion();
        }
    } else {
        // Normal sorular için
        if (currentQuestion >= currentQuestionsData.length) {
            if (currentTestIndex === 0) {
                loadAlexTest();
            } else if (currentTestIndex === 1) {
                loadVocabularyTest();
            } else if (currentTestIndex === 2) {
                showOvertimeScreen();
            }
        } else {
            showQuestion();
        }
    }
}

// ALEX TESTİNİ YÜKLE
function loadAlexTest() {
    currentTestIndex = 1;
    currentQuestion = 0;
    hasStartedListening = false;
    isPaused = false;
    currentQuestionsData = questionsDataAlex;
    
    document.getElementById('readingText').textContent = alexText;
    
    const listenBtn = document.getElementById('listenBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (listenBtn) {
        listenBtn.style.display = 'flex';
        listenBtn.disabled = false;
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (resumeBtn) resumeBtn.style.display = 'none';
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = '00:00';
    }
    
    document.getElementById('questionScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
}

// VOCABULARY TESTİNİ YÜKLE
function loadVocabularyTest() {
    currentTestIndex = 2;
    currentQuestion = 0;
    hasStartedListening = false;
    isPaused = false;
    currentQuestionsData = questionsDataVocabulary;
    
      const mainTitle = document.querySelector('#mainScreen h1');
    if (mainTitle) {
        mainTitle.textContent = '📖 English Vocabulary Test';
    }
    
    const listenBtn = document.getElementById('listenBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (listenBtn) {
        listenBtn.style.display = 'flex';
        listenBtn.disabled = false;
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (resumeBtn) resumeBtn.style.display = 'none';
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = '00:00';
    }
    
    document.getElementById('questionScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
}

// UZATMA EKRANI GÖSTER
function showOvertimeScreen() {
    playSound('overtime');
    stopAllSpeech();
    
    document.getElementById('questionScreen').innerHTML = `
        <div class="overtime-screen">
            <h1>🎯 40 Questions Completed!</h1>
            
            <div class="overtime-buttons">
                <button onclick="closeProgram()" class="btn close-btn">
                    ❌ Close Program
                </button>
                
                <button onclick="startOvertime()" class="btn overtime-btn">
                    ⭐ Start Overtime (8 Extra Questions)
                </button>
            </div>
            
            <p class="overtime-info">
                Overtime includes spelling questions with pronunciations
            </p>
        </div>
    `;
    
    document.getElementById('questionScreen').classList.add('active');
}

// PROGRAMI KAPAT
function closeProgram() {
    playSound('click');
    
    document.getElementById('questionScreen').innerHTML = `
        <div class="closing-screen">
            <h1>👋 Goodbye!</h1>
            <div class="checkmark-circle" style="margin: 40px auto;">
                ✓
            </div>
            <p class="closing-message">Thank you for taking the test!</p>
            <p class="closing-message">You can close this window now.</p>
        </div>
    `;
    
    setTimeout(() => {
        window.close();
    }, 3000);
}

// UZATMA SORULARINI BAŞLAT
function startOvertime() {
    playSound('click');
    
    currentTestIndex = 3;
    currentQuestion = 0;
    correctAnswers = 0;
    currentQuestionsData = overtimeQuestions;
    
    document.getElementById('questionScreen').innerHTML = `
        <h1>⭐ Overtime Question <span id="current">1</span>/<span id="total">8</span></h1>
        
        <div class="progress">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        
        <div class="timer-box overtime-timer">
            ⏱ Time: <span id="questionTimer">00:10</span>
        </div>
        
        <h2 id="questionText"></h2>
        
        <div id="options" class="options"></div>
    `;
    
    showOvertimeQuestion();
}

// UZATMA SORUSUNU GÖSTER - TIKLAMA YOK, SADECE SİYAH EKRAN
function showOvertimeQuestion() {
    clearInterval(countdownTimer);
    hasAnswered = false;
    selectedAnswer = null;
    
    if (currentQuestion >= overtimeQuestions.length) {
        showOvertimeResults();
        return;
    }
    
    currentOptions = generateOptions(currentQuestion);
    
    document.getElementById('current').textContent = currentQuestion + 1;
    document.getElementById('total').textContent = overtimeQuestions.length;
    
    document.getElementById('questionText').textContent = currentQuestionsData[currentQuestion].q;
    
    if (typeof responsiveVoice !== 'undefined') {
        responsiveVoice.speak(currentQuestionsData[currentQuestion].correct, "UK English Male", {
            rate: speechRate,
            pitch: 1.0,
            volume: 1.0
        });
    }
    
    const progress = (currentQuestion / overtimeQuestions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    const optionsHTML = `
        <div class="option">
            <span class="option-letter">A</span>
            <span class="option-text">${currentOptions[0]}</span>
        </div>
        <div class="option">
            <span class="option-letter">B</span>
            <span class="option-text">${currentOptions[1]}</span>
        </div>
        <div class="option">
            <span class="option-letter">C</span>
            <span class="option-text">${currentOptions[2]}</span>
        </div>
        <div class="option">
            <span class="option-letter">D</span>
            <span class="option-text">${currentOptions[3]}</span>
        </div>
    `;
    
    document.getElementById('options').innerHTML = optionsHTML;
    
    // TIKLAMA YOK - sadece görsel göster
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'wrong');
        opt.style.pointerEvents = 'none';
        opt.style.cursor = 'default';
    });
    
    startQuestionTimer();
}

// UZATMA SONUÇLARI
function showOvertimeResults() {
    playSound('complete');
    stopAllSpeech();
    
    document.getElementById('questionScreen').innerHTML = `
        <div class="overtime-result-screen">
            <h1>⭐ Overtime Completed!</h1>
            
            <div class="final-buttons">
                <button onclick="closeProgram()" class="btn close-btn">
                    ❌ Close Program
                </button>
                
                <button onclick="restartFullTest()" class="btn restart-btn">
                    🔄 Restart Full Test
                </button>
            </div>
        </div>
    `;
}

// FİNAL SONUÇLAR
function showFinalResults() {
    stopAllSpeech();
    clearInterval(countdownTimer);
    playSound('complete');
    
    document.getElementById('questionScreen').innerHTML = `
        <h1>🎯 Test Completed!</h1>
        
        <div class="result-box">
            <div class="result-item">
                <h3>Correct Answers</h3>
                <div class="result-value">${correctAnswers}/${currentQuestionsData.length}</div>
            </div>
            
            <div class="result-item">
                <h3>Your Score</h3>
                <div class="result-value">${(correctAnswers/currentQuestionsData.length*100).toFixed(0)}%</div>
            </div>
        </div>
        
        <div class="message">
            ${correctAnswers === currentQuestionsData.length ? 'Perfect! 🎉' : 
              correctAnswers >= 3 ? 'Good job! 👍' : 
              'Keep practicing! 💪'}
        </div>
        
        <button onclick="restartTest()" class="btn restart-btn">🔄 Try Again</button>
    `;
}

// SİYAH EKRAN GÖSTER
function showBlackScreen() {
    stopAllSpeech();
    clearInterval(countdownTimer);
    
    document.getElementById('questionScreen').classList.remove('active');
    
    const screenHTML = `
        <div class="black-screen-overlay">
            <button onclick="showCorrectAnswer()" class="btn show-answer-btn">Show Correct Answer</button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', screenHTML);
    document.body.style.backgroundColor = '#000';
}

// DOĞRU CEVABI GÖSTER - UZATMA SORULARI DA DAHİL
function showCorrectAnswer() {
    playSound('correct');
    
    const blackScreen = document.querySelector('.black-screen-overlay');
    if (blackScreen) {
        blackScreen.remove();
    }
    
    const correctOpt = currentOptions.findIndex(opt => opt === currentCorrectAnswer);
    const correctLetter = ['A', 'B', 'C', 'D'][correctOpt];
    
    // Uzatma sorusunda mıyız kontrol et
    const isOvertimeQuestion = currentTestIndex === 3;
    
    const screenHTML = `
        <div class="answer-display">
            <div class="answer-content">
                <div class="checkmark-circle">✓</div>
                <h1>${isOvertimeQuestion ? '⭐ Correct Spelling!' : 'Perfect!'}</h1>
                <p class="answer-label">${isOvertimeQuestion ? 'Correct Spelling' : 'Correct Answer'}</p>
                <div class="answer-box">
                    <span class="answer-letter">${correctLetter}</span>
                    <span class="answer-text">${currentCorrectAnswer}</span>
                </div>
                ${isOvertimeQuestion ? 
                    `<p style="font-size: 24px; color: rgba(255,255,255,0.8); margin-top: 20px; font-style: italic;">
                        Pronunciation: ${currentCorrectAnswer}
                    </p>` 
                    : ''}
                <button onclick="goToNextQuestion()" class="btn next-btn">Next Question →</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', screenHTML);
}

// SONRAKİ SORUYA GEÇ - DÜZELTİLMİŞ
function goToNextQuestion() {
    playSound('click');
    stopAllSpeech();
    
    const answerScreen = document.querySelector('.answer-display');
    if (answerScreen) {
        answerScreen.remove();
    }
    
    document.body.style.backgroundColor = '';
    
    currentQuestion++;
    
    // Overtime soruları için özel kontrol
    if (currentTestIndex === 3) {
        if (currentQuestion >= overtimeQuestions.length) {
            document.getElementById('questionScreen').classList.add('active');
            showOvertimeResults();
        } else {
            document.getElementById('questionScreen').classList.add('active');
            showOvertimeQuestion();
        }
    } else {
        // Normal sorular için
        if (currentQuestion >= currentQuestionsData.length) {
            if (currentTestIndex === 0) {
                loadAlexTest();
            } else if (currentTestIndex === 1) {
                loadVocabularyTest();
            } else if (currentTestIndex === 2) {
                showOvertimeScreen();
            }
        } else {
            document.getElementById('questionScreen').classList.add('active');
            showQuestion();
        }
    }
}

// TÜM TESTİ TEKRAR BAŞLAT
function restartFullTest() {
    playSound('click');
    stopAllSpeech();
    clearInterval(countdownTimer);
    
    currentTestIndex = 0;
    currentQuestion = 0;
    correctAnswers = 0;
    selectedAnswer = null;
    hasAnswered = false;
    hasStartedListening = false;
    isPaused = false;
    currentQuestionsData = questionsDataTom;
    
    document.getElementById('questionScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
    
    document.getElementById('readingText').textContent = tomText;
    
    document.body.style.backgroundColor = '';
    
    const listenBtn = document.getElementById('listenBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (listenBtn) {
        listenBtn.style.display = 'flex';
        listenBtn.disabled = false;
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (resumeBtn) resumeBtn.style.display = 'none';
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = '00:00';
    }
}

// ESKİ RESTART FONKSİYONU
function restartTest() {
    playSound('click');
    stopAllSpeech();
    clearInterval(countdownTimer);
    
    currentTestIndex = 0;
    currentQuestion = 0;
    correctAnswers = 0;
    selectedAnswer = null;
    hasAnswered = false;
    hasStartedListening = false;
    isPaused = false;
    currentQuestionsData = questionsDataTom;
    
    document.getElementById('questionScreen').classList.remove('active');
    document.getElementById('mainScreen').classList.add('active');
    
    document.getElementById('readingText').textContent = tomText;
    
    document.body.style.backgroundColor = '';
    
    const listenBtn = document.getElementById('listenBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    
    if (listenBtn) {
        listenBtn.style.display = 'flex';
        listenBtn.disabled = false;
    }
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (resumeBtn) resumeBtn.style.display = 'none';
    
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = '00:00';
    }
}
