import React, { useState, useEffect } from 'react';

// AnimationStyles 컴포넌트 단순화
const AnimationStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .animate-float {
      animation: floating 3s ease-in-out infinite;
    }
    
    @keyframes floating {
      0% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0); }
    }
  `}} />
);

// Image paths
const mapImage = "/assets/map.png";
const libraryImage = "/assets/bookcase.png";
const characterImage = "/assets/character.png";
const bookcaseImage = "/assets/bookcase.png";
const bookImage = "/assets/book.png";

// Book data with pages, mini-tasks, chapters, and rewards
const books = [
    {
        id: "book1",
        title: "Romance of the Three Kingdoms",
        culture: "Chinese",
        totalPages: 120,
        content: "Zhuge Liang, the Sleeping Dragon, was a master strategist who helped Liu Bei establish his kingdom during the tumultuous period of the Three Kingdoms...",
        questions: [
            {
                text: "Fill in the blank: Zhuge Liang was known as the ______ Dragon.",
                options: ["Sleeping", "Golden", "Flying"],
                answer: "Sleeping",
            },
        ],
        chapters: [
            { 
                title: "The Three Oath Brothers", 
                pages: 20, 
                miniTask: {
                    pageNumber: 15,
                    question: "What was the name of the peach garden where Liu Bei, Guan Yu, and Zhang Fei took their oath?",
                    options: ["Wulong Garden", "Eternal Peach Garden", "Heavenly Garden", "Imperial Garden"],
                    answer: "Eternal Peach Garden",
                    reward: 50,
                    literacySkill: "Historical Context"
                }
            },
            { 
                title: "Zhuge Liang's Strategies", 
                pages: 30, 
                miniTask: {
                    pageNumber: 38,
                    question: "Which strategy did Zhuge Liang use to acquire 100,000 arrows?",
                    options: ["Arrow Theft Strategy", "Empty Fort Strategy", "Borrowing Arrows with Straw Boats", "Night Ambush"],
                    answer: "Borrowing Arrows with Straw Boats",
                    reward: 60,
                    literacySkill: "Strategic Thinking"
                }
            },
            { 
                title: "Battle of Red Cliffs", 
                pages: 25,
                miniTask: {
                    pageNumber: 52,
                    question: "Who suggested the fire attack strategy at the Battle of Red Cliffs?",
                    options: ["Liu Bei", "Zhou Yu", "Zhuge Liang", "Sun Quan"],
                    answer: "Zhou Yu",
                    reward: 40,
                    literacySkill: "Character Analysis"
                }
            },
            { 
                title: "Rise and Fall of Kingdoms", 
                pages: 45,
                miniTask: {
                    pageNumber: 85,
                    question: "Which kingdom ultimately unified China after the Three Kingdoms period?",
                    options: ["Wei", "Shu", "Wu", "Jin"],
                    answer: "Jin",
                    reward: 70,
                    literacySkill: "Historical Outcome"
                }
            }
        ],
        reward: {
            title: "Master Strategist",
            description: "You've gained insights into ancient Chinese military strategy and politics",
            points: 200,
            badge: "🏆"
        }
    },
    {
        id: "book2",
        title: "The Tale of Genji",
        culture: "Japanese",
        totalPages: 150,
        content: "The Tale of Genji, often considered the world's first novel, explores courtly life and relationships in Heian Japan. Written by Lady Murasaki Shikibu in the early 11th century, it provides a fascinating glimpse into Japanese aristocratic society...",
        questions: [
            {
                text: "Which literary device is primarily used in The Tale of Genji?",
                options: ["Metaphor", "Stream of Consciousness", "Allegory"],
                answer: "Stream of Consciousness",
            },
        ],
        chapters: [
            { 
                title: "The Shining Prince", 
                pages: 35,
                miniTask: {
                    pageNumber: 22,
                    question: "What special quality made Genji known as 'the Shining Prince'?",
                    options: ["His wealth", "His beauty", "His intelligence", "His royal status"],
                    answer: "His beauty",
                    reward: 45,
                    literacySkill: "Character Description"
                }
            },
            { 
                title: "Court Intrigues", 
                pages: 40,
                miniTask: {
                    pageNumber: 65,
                    question: "What form of communication was frequently used for courtship in the Heian court?",
                    options: ["Dance performances", "Poetry exchange", "Gift giving", "Musical duets"],
                    answer: "Poetry exchange",
                    reward: 55,
                    literacySkill: "Cultural Context"
                }
            },
            { 
                title: "Exile and Return", 
                pages: 30,
                miniTask: {
                    pageNumber: 92,
                    question: "What natural phenomena often reflect emotion in The Tale of Genji?",
                    options: ["Earthquakes", "Seasons", "Ocean tides", "Wind direction"],
                    answer: "Seasons",
                    reward: 50,
                    literacySkill: "Symbolism"
                }
            },
            { 
                title: "The Legacy", 
                pages: 45,
                miniTask: {
                    pageNumber: 128,
                    question: "Who wrote The Tale of Genji?",
                    options: ["Lady Murasaki", "Princess Michiko", "Empress Suiko", "Lady Aoi"],
                    answer: "Lady Murasaki",
                    reward: 60,
                    literacySkill: "Literary History"
                }
            }
        ],
        reward: {
            title: "Court Poet",
            description: "You've mastered the art of Heian court literature and cultural nuances",
            points: 250,
            badge: "📜"
        }
    },
    {
        id: "book3",
        title: "The Tale of Hong Gil-dong",
        culture: "Korean",
        totalPages: 90,
        content: "Hong Gil-dong, a legendary figure in Korean literature, fights against social injustice and seeks equality. Written by Heo Gyun during the Joseon Dynasty, this tale is considered one of Korea's earliest novels and explores themes of social reform...",
        questions: [
            {
                text: "What central theme is explored in The Tale of Hong Gil-dong?",
                options: ["Revenge", "Social Equality", "Political Power"],
                answer: "Social Equality",
            },
        ],
        chapters: [
            { 
                title: "The Illegitimate Son", 
                pages: 20,
                miniTask: {
                    pageNumber: 12,
                    question: "Why couldn't Hong Gil-dong call his father 'father'?",
                    options: ["He was adopted", "He was born to a concubine", "He had a different father", "He was disowned"],
                    answer: "He was born to a concubine",
                    reward: 40,
                    literacySkill: "Social Structure"
                }
            },
            { 
                title: "Martial Arts Training", 
                pages: 15,
                miniTask: {
                    pageNumber: 28,
                    question: "Which martial art did Hong Gil-dong master?",
                    options: ["Taekwondo", "Ssireum", "Geomdo", "Taekkyon"],
                    answer: "Taekkyon",
                    reward: 35,
                    literacySkill: "Cultural Knowledge"
                }
            },
            { 
                title: "The Bandit Leader", 
                pages: 25,
                miniTask: {
                    pageNumber: 45,
                    question: "What was the name of Hong Gil-dong's bandit group?",
                    options: ["Hwalbindang", "Imjindang", "Hwarangdo", "Amogae"],
                    answer: "Hwalbindang",
                    reward: 45,
                    literacySkill: "Detail Retention"
                }
            },
            { 
                title: "The Ideal Society", 
                pages: 30,
                miniTask: {
                    pageNumber: 75,
                    question: "Where did Hong Gil-dong establish his ideal society?",
                    options: ["Jeju Island", "Yul Island", "Baekdu Mountain", "Hanyang City"],
                    answer: "Yul Island",
                    reward: 55,
                    literacySkill: "Thematic Understanding"
                }
            }
        ],
        reward: {
            title: "Social Reformer",
            description: "You've gained insights into traditional Korean concepts of justice and social reform",
            points: 180,
            badge: "⚖️"
        }
    },
];

// 실제 책 내용 데이터
const bookContents = {
  'book1': [
    {
      title: "The Tale of Genji",
      pages: [
        { 
          page: 1, 
          content: [
            "In a certain reign (whose can it have been?) someone of no very great rank, among all His Majesty's Consorts and Intimates, enjoyed exceptional favor.",
            "Those others who had always assumed that pride of place was properly theirs despised her as a dreadful woman, while the lesser Intimates were unhappier still."
          ]
        },
        { 
          page: 2, 
          content: [
            "The way she waited on him day after day only stirred up feeling against her, and perhaps this growing burden of resentment was what affected her health and obliged her often to withdraw from court.",
            "His Majesty, who was deeply fond of her, was sad that she should be unwell so often, and to make matters worse, she then gave birth to a son, the eldest he had ever had."
          ]
        },
      ]
    }
  ],
  'book2': [
    {
      title: "Don Quixote",
      pages: [
        { 
          page: 1, 
          content: [
            "In a village of La Mancha, the name of which I have no desire to call to mind, there lived not long since one of those gentlemen that keep a lance in the lance-rack, an old buckler, a lean hack, and a greyhound for coursing.",
            "An olla of rather more beef than mutton, a salad on most nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra on Sundays, made away with three-quarters of his income."
          ]
        },
        { 
          page: 2, 
          content: [
            "The rest of it went in a doublet of fine cloth and velvet breeches and shoes to match for holidays, while on week-days he made a brave figure in his best homespun.",
            "He had in his house a housekeeper past forty, a niece under twenty, and a lad for the field and market-place, who used to saddle the hack as well as handle the bill-hook."
          ]
        },
      ]
    }
  ],
};

// 캐릭터 성장 단계 정의
const characterLevels = [
  { level: 1, title: "Novice Reader", minPages: 0, scale: 1.0, emoji: "👶" },
  { level: 2, title: "Curious Bookworm", minPages: 10, scale: 1.2, emoji: "👦" },
  { level: 3, title: "Dedicated Scholar", minPages: 30, scale: 1.4, emoji: "👨" },
  { level: 4, title: "Knowledge Seeker", minPages: 60, scale: 1.6, emoji: "👨‍🎓" },
  { level: 5, title: "Literary Expert", minPages: 100, scale: 1.8, emoji: "👨‍🏫" },
  { level: 6, title: "Wisdom Master", minPages: 150, scale: 2.0, emoji: "🧙‍♂️" },
];

// BeyondThePages 컴포넌트 단순화
const BeyondThePages = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [showLibrarian, setShowLibrarian] = useState(false);
  const [showCharacterCreation, setShowCharacterCreation] = useState(false);
  const [librarianMessage, setLibrarianMessage] = useState("");
  const [introStep, setIntroStep] = useState(0);
  const [characterEmoji, setCharacterEmoji] = useState("👤");
  const [score, setScore] = useState(0);
  const [characterLevel, setCharacterLevel] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpMessage, setLevelUpMessage] = useState("");
  const [readingStats, setReadingStats] = useState({ totalPagesRead: 0 });
  const [readingRecords, setReadingRecords] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCharacterMessageVisible, setIsCharacterMessageVisible] = useState(false);
  const [characterMessage, setCharacterMessage] = useState("");
  const [characterSize, setCharacterSize] = useState(1.0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [readingSpeed, setReadingSpeed] = useState(1);
  const [showReadingReward, setShowReadingReward] = useState(false);

  // 퀴즈 기능
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizResult, setQuizResult] = useState(null);
  const [quizStreak, setQuizStreak] = useState(0);

  const bookQuizzes = {
    'book1': [
      {
        question: "In 'The Tale of Genji', who enjoyed exceptional favor from His Majesty?",
        options: [
          "A high-ranking official",
          "Someone of no very great rank",
          "The Emperor's sister",
          "A foreign princess"
        ],
        correct: 1,
        explanation: "The story begins by mentioning someone of no very great rank who enjoyed exceptional favor from His Majesty."
      },
      {
        question: "What major event happened to the favored consort in the story?",
        options: [
          "She was banished from court",
          "She married another nobleman",
          "She gave birth to a son",
          "She became the Empress"
        ],
        correct: 2,
        explanation: "The text mentions she gave birth to a son, the eldest His Majesty ever had."
      }
    ],
    'book2': [
      {
        question: "Where did Don Quixote live according to the story?",
        options: [
          "In Seville",
          "In Barcelona",
          "In a village of La Mancha",
          "In Madrid"
        ],
        correct: 2,
        explanation: "The story begins with 'In a village of La Mancha, the name of which I have no desire to call to mind...'"
      }
    ]
  };

  // 책갈피 기능
  const [bookmarks, setBookmarks] = useState({});

  // 컬렉션 아이템
  const [collectedItems, setCollectedItems] = useState([]);
  const collectionItems = [
    { id: "item1", name: "Golden Quill", icon: "✒️", description: "A legendary writing instrument of famous authors", rarity: "rare" },
    { id: "item2", name: "Wisdom Glasses", icon: "👓", description: "Helps you see deeper meaning in texts", rarity: "uncommon" },
    { id: "item3", name: "Bookmark of Time", icon: "🔖", description: "Ancient bookmark that never loses your place", rarity: "common" },
    { id: "item4", name: "Literary Map", icon: "🗺️", description: "Shows connections between different literary works", rarity: "rare" },
    { id: "item5", name: "Infinite Inkwell", icon: "🖋️", description: "Contains ink that never runs dry", rarity: "epic" },
    { id: "item6", name: "Character's Hat", icon: "🎩", description: "Worn by a famous character in literature", rarity: "uncommon" }
  ];

  // 독서 챌린지
  const [readingChallenges, setReadingChallenges] = useState({
    daily: { target: 5, current: 0, completed: false },
    weekly: { target: 25, current: 0, completed: false },
    streak: { days: 0, lastCompleted: null }
  });

  // 업적 시스템
  const [achievements, setAchievements] = useState({
    firstBook: { title: "First Steps", description: "Read your first book", completed: false, icon: "🏆" },
    readingStreak: { title: "Consistent Reader", description: "Maintain a 3-day reading streak", completed: false, icon: "🔥" },
    quickReader: { title: "Speed Reader", description: "Read 10 pages in under 5 minutes", completed: false, icon: "⚡" },
    knowledgeSeeker: { title: "Knowledge Seeker", description: "Answer 5 quiz questions correctly", completed: false, icon: "🧠" },
    worldExplorer: { title: "Cultural Explorer", description: "Read books from 3 different cultures", completed: false, icon: "🌍" }
  });

  // 미니 게임 - 단어 찾기
  const [wordGameActive, setWordGameActive] = useState(false);
  const [wordGameData, setWordGameData] = useState({
    words: [],
    found: [],
    timeLeft: 60
  });

  // 랜덤 리딩 관련 상태 추가
  const [showRandomReading, setShowRandomReading] = useState(false);
  const [randomReadingContent, setRandomReadingContent] = useState(null);
  const [randomReadingTimer, setRandomReadingTimer] = useState(300); // 5분 = 300초
  const [randomReadingActive, setRandomReadingActive] = useState(false);
  const [randomReadingCompleted, setRandomReadingCompleted] = useState(false);

  // 배틀 시스템 - 독서력을 활용한 대결 기능
  const [showBattleMode, setShowBattleMode] = useState(false);
  const [battleOpponent, setBattleOpponent] = useState(null);
  const [battleStatus, setBattleStatus] = useState('preparing'); // preparing, inProgress, complete
  const [battleResult, setBattleResult] = useState(null);
  const [battleQuestions, setBattleQuestions] = useState([]);
  const [currentBattleQuestion, setCurrentBattleQuestion] = useState(0);
  const [battlePoints, setBattlePoints] = useState(0);

  // 문학 책 수집 앨범
  const [bookCollection, setBookCollection] = useState({});

  // 문학 캐릭터 시스템 추가
  const literaryCharacters = [
    { id: 'sherlock', name: 'Sherlock Holmes', power: 95, intellect: 100, wisdom: 90, emoji: '🕵️‍♂️', unlocked: true },
    { id: 'dorian', name: 'Dorian Gray', power: 60, intellect: 75, charm: 100, emoji: '🧝‍♂️', unlocked: false },
    { id: 'juliet', name: 'Juliet', power: 50, emotion: 100, charm: 90, emoji: '👸', unlocked: false },
    { id: 'atticus', name: 'Atticus Finch', power: 70, wisdom: 100, justice: 100, emoji: '👨‍⚖️', unlocked: false },
    { id: 'hermione', name: 'Hermione Granger', power: 85, intellect: 95, wisdom: 90, emoji: '🧙‍♀️', unlocked: false },
    { id: 'gandalf', name: 'Gandalf', power: 100, wisdom: 100, magic: 100, emoji: '🧙‍♂️', unlocked: false },
    { id: 'katniss', name: 'Katniss Everdeen', power: 90, courage: 95, survival: 100, emoji: '🏹', unlocked: false },
  ];

  const [unlockedCharacters, setUnlockedCharacters] = useState(['sherlock']);
  const [activeCompanion, setActiveCompanion] = useState('sherlock');

  // 독서 스킬 트리
  const [skillPoints, setSkillPoints] = useState(0);
  const [skills, setSkills] = useState({
    'speed_reading': { level: 0, maxLevel: 5, name: 'Speed Reading', effect: 'Read 10% faster per level', icon: '⚡' },
    'deep_analysis': { level: 0, maxLevel: 5, name: 'Deep Analysis', effect: '+20% quiz points per level', icon: '🔍' },
    'vocabulary': { level: 0, maxLevel: 5, name: 'Vocabulary Master', effect: 'Unlock 10% more words per level', icon: '📝' },
    'memory': { level: 0, maxLevel: 5, name: 'Photographic Memory', effect: '10% chance per level to instantly memorize a page', icon: '🧠' },
    'cultural_insight': { level: 0, maxLevel: 5, name: 'Cultural Insight', effect: 'Gain deeper understanding of cultural contexts', icon: '🌍' },
  });

  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [helpMessage, setHelpMessage] = useState("Hi there! I'm Buddy, your reading buddy! Need help with your literary adventure?");

  const libraryIntro = [
    "Welcome to the Secret Library of Literary Worlds! I am the Guardian of Books, keeper of stories from across cultures and time.",
    "This library contains literary treasures from around the world. Each book offers insights into different cultures and traditions.",
    "As you read, you'll grow wiser and your character will evolve. The more you explore, the more powerful your literary knowledge becomes.",
    "Now, it's time to choose your reading companion who will grow alongside you on this journey."
  ];

  const handleStartGame = () => {
    console.log("Starting game...");
    setGameStarted(true);
    setCurrentStep(""); // 초기 단계 설정
    setIntroStep(0);    // 대화 단계 초기화
    
    // 첫 메시지 설정 후 NPC 표시
    setLibrarianMessage(libraryIntro[0]);
    setShowLibrarian(true);
  };

  const displayNextLibrarianMessage = () => {
    console.log(`Current intro step: ${introStep}, Total messages: ${libraryIntro.length}`);
    
    if (introStep < libraryIntro.length - 1) {
      // 아직 더 보여줄 메시지가 있으면 다음 메시지 표시
      setIntroStep(prevStep => prevStep + 1);
      setLibrarianMessage(libraryIntro[introStep + 1]);
    } else {
      // 모든 메시지를 다 보여줬으면 캐릭터 생성 화면으로 전환
      console.log("All intro messages shown, showing character creation");
      setShowCharacterCreation(true);
    }
  };

  const completeCharacterCreation = () => {
    setIsTransitioning(true);
    setShowLibrarian(false);
    setShowCharacterCreation(false);
    
    setTimeout(() => {
      setCurrentStep("outside");
      setIsTransitioning(false);
    }, 500);
  };

  const updateCharacterLevel = (pagesRead) => {
    const currentLevel = characterLevel;
    let newLevel = 0;

    for (let i = characterLevels.length - 1; i >= 0; i--) {
      if (pagesRead >= characterLevels[i].minPages) {
        newLevel = i;
        break;
      }
    }

    if (newLevel > currentLevel) {
      setCharacterLevel(newLevel);
      setCharacterSize(characterLevels[newLevel].scale);
      setCharacterEmoji(characterLevels[newLevel].emoji);
      setLevelUpMessage(`Level Up! You are now a ${characterLevels[newLevel].title}!`);
      setShowLevelUp(true);

      setTimeout(() => {
        setShowLevelUp(false);
      }, 3000);
    }
  };

  const updateReadingRecord = (bookId, page) => {
    setReadingRecords(prev => {
      const bookRecord = prev[bookId] || { lastPage: 0, startTime: new Date(), completedTasks: [] };
      return {
        ...prev,
        [bookId]: {
          ...bookRecord,
          lastPage: Math.max(bookRecord.lastPage, page),
          lastReadTime: new Date()
        }
      };
    });

    setReadingStats(prev => {
      const newTotalPages = prev.totalPagesRead + 1;
      setTimeout(() => updateCharacterLevel(newTotalPages), 100);
      return {
        ...prev,
        totalPagesRead: newTotalPages
      };
    });
  };

  const showCharacterMessage = (message) => {
    setCharacterMessage(message);
    setIsCharacterMessageVisible(true);

    setTimeout(() => {
      setIsCharacterMessageVisible(false);
    }, 5000);
  };

  const toggleReadingJournal = () => {
    // Placeholder for reading journal toggle
  };

  const toggleAchievements = () => {
    // Placeholder for achievements toggle
  };

  const returnToMap = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep("outside");
      setIsTransitioning(false);
    }, 500);
  };

  const enterLibrary = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep("library");
      setIsTransitioning(false);
    }, 500);
  };

  const startReading = (book) => {
    setSelectedBook(book);
    setCurrentStep("reading");

    const encouragements = [
      "Great choice! This book will expand your horizons.",
      "I'm excited to see what you'll learn from this one!",
      "This is one of my favorites! Enjoy the journey.",
      "Reading is power! Let's grow together with this book."
    ];

    showCharacterMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
  };

  const calculateLevelProgress = () => {
    const pagesRead = readingStats.totalPagesRead;
    const currentLevel = getCharacterLevel();
    const nextLevel = getNextCharacterLevel();
    
    if (!nextLevel) return 100;
    
    const currentMin = currentLevel.minPages;
    const nextMin = nextLevel.minPages;
    const range = nextMin - currentMin;
    const progress = ((pagesRead - currentMin) / range) * 100;
    
    return Math.min(Math.max(0, progress), 100);
  };

  const getCharacterLevel = () => {
    const pagesRead = readingStats.totalPagesRead;
    
    for (let i = characterLevels.length - 1; i >= 0; i--) {
      if (pagesRead >= characterLevels[i].minPages) {
        return characterLevels[i];
      }
    }
    
    return characterLevels[0];
  };

  const getNextCharacterLevel = () => {
    const pagesRead = readingStats.totalPagesRead;
    
    for (let i = 0; i < characterLevels.length; i++) {
      if (pagesRead < characterLevels[i].minPages) {
        return characterLevels[i];
      }
    }
    
    return null;
  };

  // nextPage 함수 수정
  const nextPage = () => {
    if (currentPage < selectedBook.totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      
      // 독서 기록 업데이트
      updateReadingRecord(selectedBook.id, newPage);
      
      // 보상 알림 표시
      setShowReadingReward(true);
      setTimeout(() => setShowReadingReward(false), 2000);
      
      // 미션 체크 로직 추가
      if (dailyMission && dailyMission.id === 1) {
        const readPagesCount = localStorage.getItem('mission_read_pages') || 0;
        const newCount = parseInt(readPagesCount) + 1;
        localStorage.setItem('mission_read_pages', newCount);
        
        if (newCount >= 5 && !missionCompleted) {
          completeMission();
        }
      }
      
      // 캐릭터에게 메시지 표시 (가끔)
      if (Math.random() > 0.7) {
        const messages = [
          "Great progress! Keep reading!",
          "You're learning so much!",
          "I can feel myself growing smarter!",
          "This book is fascinating!"
        ];
        showCharacterMessage(messages[Math.floor(Math.random() * messages.length)]);
      }

      checkMissionProgress('read_page');
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateReadingRecord(selectedBook.id, newPage);
    }
  };

  const loadBookContent = (bookId, page) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return [];
    
    const bookData = bookContents[bookId];
    if (bookData && bookData[0] && bookData[0].pages) {
      const pageData = bookData[0].pages.find(p => p.page === page);
      if (pageData) {
        return pageData.content;
      }
    }
    
    return [
      `This is page ${page} of ${book.title}.`,
      `In this chapter, the author discusses important themes related to ${book.culture} culture and traditions.`,
      `The narrative explores ideas of ${["love", "honor", "family", "duty", "freedom"][Math.floor(Math.random() * 5)]} in a profound way.`
    ];
  };

  const currentPageContent = loadBookContent(selectedBook?.id, currentPage);

  const adjustReadingSpeed = (speed) => {
    setReadingSpeed(speed);
  };

  // submitQuizAnswer 함수 수정
  const submitQuizAnswer = (answerIndex) => {
    if (!currentQuiz) return;
    
    const correct = answerIndex === currentQuiz.correct;
    
    setQuizResult({
      correct,
      explanation: currentQuiz.explanation
    });
    
    if (correct) {
      setScore(prev => prev + 10);
      setQuizStreak(prev => prev + 1);
      
      // 미션 체크 로직 추가
      if (dailyMission && dailyMission.id === 2 && !missionCompleted) {
        completeMission();
      }
      
      if (quizStreak + 1 >= 3) {
        const randomItem = collectionItems[Math.floor(Math.random() * collectionItems.length)];
        if (!collectedItems.some(item => item.id === randomItem.id)) {
          setCollectedItems(prev => [...prev, randomItem]);
          displaySpecialReward(`You earned: ${randomItem.icon} ${randomItem.name}!`);
        }
        
        setQuizStreak(0);
      }
      
      updateAchievement('knowledgeSeeker');
    } else {
      setQuizStreak(0);
    }

    checkMissionProgress('quiz_correct');
  };

  const updateAchievement = (achievementId) => {
    if (achievements[achievementId] && !achievements[achievementId].completed) {
      if (achievementId === 'knowledgeSeeker') {
        const currentCorrectAnswers = localStorage.getItem('quizCorrectAnswers') || 0;
        const newCorrectAnswers = parseInt(currentCorrectAnswers) + 1;
        localStorage.setItem('quizCorrectAnswers', newCorrectAnswers);
        
        if (newCorrectAnswers >= 5) {
          const updatedAchievements = { ...achievements };
          updatedAchievements[achievementId].completed = true;
          setAchievements(updatedAchievements);
          
          showAchievementNotification(achievements[achievementId]);
        }
      }
    }
  };

  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const showAchievementNotification = (achievement) => {
    setCurrentAchievement(achievement);
    setShowAchievement(true);
    
    playSound('achievement');
    
    setTimeout(() => {
      setShowAchievement(false);
    }, 5000);
  };

  const [showSpecialReward, setShowSpecialReward] = useState(false);
  const [specialRewardText, setSpecialRewardText] = useState("");

  const displaySpecialReward = (text) => {
    setSpecialRewardText(text);
    setShowSpecialReward(true);
    
    playSound('reward');
    
    setTimeout(() => {
      setShowSpecialReward(false);
    }, 4000);
  };

  const playSound = (type) => {
    const sounds = {
      page: new Audio('/sounds/page_turn.mp3'),
      achievement: new Audio('/sounds/achievement.mp3'),
      reward: new Audio('/sounds/reward.mp3'),
      quiz: new Audio('/sounds/quiz.mp3')
    };
    
    try {
      if (sounds[type]) {
        sounds[type].play();
      }
    } catch (e) {
      console.log("Sound could not be played");
    }
  };

  const toggleBookmark = () => {
    if (!selectedBook) return;
    
    setBookmarks(prev => {
      const bookId = selectedBook.id;
      const bookmarkPages = prev[bookId] || [];
      
      if (bookmarkPages.includes(currentPage)) {
        return {
          ...prev,
          [bookId]: bookmarkPages.filter(p => p !== currentPage)
        };
      } else {
        showCharacterMessage("Page bookmarked! You can return to it easily later.");
        return {
          ...prev,
          [bookId]: [...bookmarkPages, currentPage]
        };
      }
    });
  };

  const startWordGame = () => {
    const content = currentPageContent.join(' ');
    const words = content.match(/\b[A-Z][a-z]{3,}\b/g) || ["Character", "Story", "Setting", "Theme", "Plot"];
    
    const uniqueWords = [...new Set(words)].slice(0, 8);
    
    setWordGameData({
      words: uniqueWords,
      found: [],
      timeLeft: 60
    });
    
    setWordGameActive(true);
    
    const timer = setInterval(() => {
      setWordGameData(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const findWord = (word) => {
    setWordGameData(prev => {
      const newFound = [...prev.found, word];
      
      if (newFound.length === prev.words.length) {
        setScore(prev => prev + 50);
        displaySpecialReward("Word Master! +50 points");
        setWordGameActive(false);
      }
      
      return { ...prev, found: newFound };
    });
  };

  const updateReadingChallenge = () => {
    const today = new Date().toDateString();
    
    setReadingChallenges(prev => {
      const dailyCompleted = prev.daily.current + 1 >= prev.daily.target;
      const weeklyCompleted = prev.weekly.current + 1 >= prev.weekly.target;
      
      let streak = { ...prev.streak };
      if (streak.lastCompleted !== today && dailyCompleted) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (streak.lastCompleted === yesterdayStr) {
          streak = {
            days: streak.days + 1,
            lastCompleted: today
          };
          
          if (streak.days >= 3) {
            updateAchievement('readingStreak');
          }
        } else {
          streak = {
            days: 1,
            lastCompleted: today
          };
        }
      }
      
      return {
        daily: {
          ...prev.daily,
          current: prev.daily.current + 1,
          completed: dailyCompleted
        },
        weekly: {
          ...prev.weekly,
          current: prev.weekly.current + 1,
          completed: weeklyCompleted
        },
        streak: streak
      };
    });
  };

  const startRandomReading = () => {
    const randomBookIndex = Math.floor(Math.random() * books.length);
    const randomBook = books[randomBookIndex];
    const randomPage = Math.floor(Math.random() * (randomBook.totalPages || 10)) + 1;

    const content = {
      book: randomBook,
      page: randomPage,
      title: randomBook.title,
      author: randomBook.author,
      culture: randomBook.culture,
      content: generateRandomContent(randomBook.title, randomBook.culture)
    };

    setRandomReadingContent(content);
    setRandomReadingTimer(300);
    setRandomReadingActive(true);
    setRandomReadingCompleted(false);
    setShowRandomReading(true);

    startRandomReadingTimer();
  };

  const generateRandomContent = (title, culture) => {
    const contentTemplates = [
      {
        title: "Cultural Insights",
        paragraphs: [
          `This passage from "${title}" reveals important aspects of ${culture} culture, particularly regarding social structures and traditions.`,
          `In ${culture} literature, themes of family, honor, and connection to nature are often prominently featured. This excerpt exemplifies those themes through vivid descriptions and character interactions.`,
          `The author employs literary techniques common in ${culture} storytelling, such as metaphorical language, proverbs, and references to historical events that shaped the cultural identity.`,
          `Readers unfamiliar with ${culture} might miss some of the subtle cultural references, but the universal themes of human experience shine through regardless of one's background.`
        ]
      },
      {
        title: "Historical Context",
        paragraphs: [
          `When "${title}" was written, ${culture} was undergoing significant social and political transformations that influenced the author's perspective.`,
          `This passage reflects the tensions between traditional values and modernization that characterized this period in ${culture} history.`,
          `The characters in this excerpt navigate complex social expectations while questioning established norms, mirroring real-life dynamics of the time.`,
          `Understanding the historical context of ${culture} during this period enriches one's appreciation of the nuanced commentary the author provides through the narrative.`
        ]
      },
      {
        title: "Literary Significance",
        paragraphs: [
          `"${title}" is considered a defining work in ${culture} literature for its innovative narrative structure and profound thematic depth.`,
          `This excerpt showcases the author's distinctive voice and stylistic choices that influenced generations of writers from ${culture} and beyond.`,
          `The careful balance between descriptive prose and philosophical reflection demonstrates the sophisticated literary tradition from which this work emerges.`,
          `Critics have noted how this particular section of the text establishes motifs that recur throughout the work, creating a rich tapestry of meaning and symbolism.`
        ]
      }
    ];

    const template = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
    return {
      title: template.title,
      paragraphs: template.paragraphs
    };
  };

  const startRandomReadingTimer = () => {
    const timer = setInterval(() => {
      setRandomReadingTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setRandomReadingCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeRandomReading = () => {
    setScore(prev => prev + 20);
    setReadingStats(prev => ({
      ...prev,
      totalPagesRead: prev.totalPagesRead + 1
    }));
    updateReadingChallenge();

    if (Math.random() < 0.2) {
      const randomItem = collectionItems[Math.floor(Math.random() * collectionItems.length)];
      if (!collectedItems.some(item => item.id === randomItem.id)) {
        setCollectedItems(prev => [...prev, randomItem]);
        displaySpecialReward(`Quick Reader Reward: ${randomItem.icon} ${randomItem.name}!`);
      }
    }

    setShowRandomReading(false);
    showCharacterMessage("Great job with the random reading! Your knowledge is expanding!");
  };

  const startLiteraryBattle = () => {
    const opponents = [
      { name: 'Book Wizard', level: 3, power: 65, avatar: '🧙‍♂️', speciality: 'fantasy' },
      { name: 'Mystery Maven', level: 4, power: 70, avatar: '🕵️‍♀️', speciality: 'mystery' },
      { name: 'Poetry Professor', level: 5, power: 75, avatar: '👩‍🏫', speciality: 'poetry' },
      { name: 'History Sage', level: 6, power: 80, avatar: '👴', speciality: 'historical' }
    ];
    
    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
    setBattleOpponent(randomOpponent);
    
    const battleQuestions = generateBattleQuestions(randomOpponent.speciality);
    setBattleQuestions(battleQuestions);
    setCurrentBattleQuestion(0);
    setBattlePoints(0);
    setBattleStatus('preparing');
    setShowBattleMode(true);
  };

  const generateBattleQuestions = (speciality) => {
    const questions = {
      'fantasy': [
        {
          question: "Which of these is NOT one of the houses at Hogwarts?",
          options: ["Gryffindor", "Hufflepuff", "Ravenclaw", "Dragonborn"],
          correct: 3,
          points: 10
        },
        {
          question: "Who wrote 'The Lord of the Rings'?",
          options: ["C.S. Lewis", "J.R.R. Tolkien", "George R.R. Martin", "Terry Pratchett"],
          correct: 1,
          points: 10
        },
        {
          question: "What magical substance can transform any metal into gold?",
          options: ["Elixir of Life", "Philosopher's Stone", "Ambrosia", "Mithril"],
          correct: 1,
          points: 15
        }
      ],
      'mystery': [
        {
          question: "Who is the famous detective created by Arthur Conan Doyle?",
          options: ["Hercule Poirot", "Sherlock Holmes", "Miss Marple", "Auguste Dupin"],
          correct: 1,
          points: 10
        },
        {
          question: "In Agatha Christie's novels, which of these is NOT a detective she created?",
          options: ["Hercule Poirot", "Miss Marple", "Inspector Morse", "Tommy & Tuppence"],
          correct: 2,
          points: 15
        }
      ],
    };
    
    return questions[speciality] || questions['fantasy'];
  };

  const submitBattleAnswer = (answerIndex) => {
    const currentQuestion = battleQuestions[currentBattleQuestion];
    
    if (answerIndex === currentQuestion.correct) {
      setBattlePoints(prev => prev + currentQuestion.points);
      
      if (activeCompanion === 'sherlock' && battleOpponent.speciality === 'mystery') {
        setBattlePoints(prev => prev + Math.floor(currentQuestion.points * 0.3));
      }
    }
    
    if (currentBattleQuestion < battleQuestions.length - 1) {
      setCurrentBattleQuestion(prev => prev + 1);
    } else {
      setTimeout(() => {
        const playerPower = battlePoints + (literaryCharacters.find(c => c.id === activeCompanion)?.power || 0);
        const opponentPower = battleOpponent.power * 10;
        
        const result = {
          win: playerPower > opponentPower,
          playerScore: playerPower,
          opponentScore: opponentPower
        };
        
        setBattleResult(result);
        setBattleStatus('complete');
        
        if (result.win) {
          setScore(prev => prev + battlePoints);
          setSkillPoints(prev => prev + 1);
          
          if (Math.random() < 0.3 && literaryCharacters.some(c => !unlockedCharacters.includes(c.id))) {
            const lockedCharacters = literaryCharacters.filter(c => !unlockedCharacters.includes(c.id));
            const randomCharacter = lockedCharacters[Math.floor(Math.random() * lockedCharacters.length)];
            
            setUnlockedCharacters(prev => [...prev, randomCharacter.id]);
            showSpecialReward(`New Character Unlocked! ${randomCharacter.emoji} ${randomCharacter.name}`);
          }
        }
      }, 1000);
    }
  };

  const upgradeSkill = (skillId) => {
    if (skillPoints > 0 && skills[skillId].level < skills[skillId].maxLevel) {
      setSkills(prev => ({
        ...prev,
        [skillId]: {
          ...prev[skillId],
          level: prev[skillId].level + 1
        }
      }));
      
      setSkillPoints(prev => prev - 1);
      
      showCharacterMessage(`Your ${skills[skillId].name} skill increased to level ${skills[skillId].level + 1}!`);
    }
  };

  const unlockLiteraryCharacter = (characterId) => {
    if (!unlockedCharacters.includes(characterId)) {
      setUnlockedCharacters(prev => [...prev, characterId]);
      showSpecialReward(`New Character Unlocked! ${literaryCharacters.find(c => c.id === characterId).emoji} ${literaryCharacters.find(c => c.id === characterId).name}`);
    }
  };

  const handleHelpOption = (option) => {
    switch(option) {
      case 'books':
        setHelpMessage("Try exploring books from different cultures! The CJK filter shows works from Chinese, Japanese, and Korean literature.");
        break;
      case 'characters':
        setHelpMessage("You can unlock literary characters by winning battles! Each character gives you special bonuses when reading certain types of books.");
        break;
      case 'challenges':
        setHelpMessage("Complete daily reading challenges to earn bonus points and maintain your reading streak!");
        break;
      case 'battle':
        setHelpMessage("In Literary Battles, you'll answer questions about books and literature. Your knowledge and your companion's abilities determine if you win!");
        break;
      default:
        setHelpMessage("Hi there! I'm Buddy, your reading buddy! Need help with your literary adventure?");
    }
    
    setShowHelpOptions(false);
  };

  const [showSkillTree, setShowSkillTree] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);

  // 기존 코드에 추가할 상태와 상수들

  // 게임 상태 부분에 추가할 코드:
  const [dailyMission, setDailyMission] = useState(null);
  const [missionCompleted, setMissionCompleted] = useState(false);
  const [showMissionBanner, setShowMissionBanner] = useState(true);

  // 상수 부분에 추가할 코드:
  const possibleMissions = [
    { id: 1, task: "Read 5 pages of any book", reward: 50, icon: "📚" },
    { id: 2, task: "Complete one quiz with a correct answer", reward: 75, icon: "🧠" },
    { id: 3, task: "Learn 3 new vocabulary words", reward: 60, icon: "🔤" },
    { id: 4, task: "Bookmark a favorite page", reward: 40, icon: "🔖" },
    { id: 5, task: "Win a literary battle", reward: 100, icon: "⚔️" },
    { id: 6, task: "Complete a random reading session", reward: 70, icon: "🎲" },
    { id: 7, task: "Upgrade one skill", reward: 80, icon: "🌟" },
    { id: 8, task: "Read about a new culture", reward: 65, icon: "🌍" },
    { id: 9, task: "Visit the library", reward: 30, icon: "🏛️" },
    { id: 10, task: "Interact with your literary companion", reward: 45, icon: "👤" },
  ];

  // useEffect 훅 추가
  useEffect(() => {
    // 게임이 시작되면 오늘의 미션 생성
    if (gameStarted && currentStep === "outside") {
      // 현재 날짜를 기반으로 고정된 미션 선택(하루마다 변경)
      const today = new Date().setHours(0, 0, 0, 0);
      const missionIndex = today % possibleMissions.length;
      setDailyMission(possibleMissions[missionIndex]);
    }
  }, [gameStarted, currentStep]);

  // 미션 완료 함수
  const completeMission = () => {
    if (dailyMission && !missionCompleted) {
      setScore(prev => prev + dailyMission.reward);
      setMissionCompleted(true);
      displaySpecialReward(`Mission Completed! +${dailyMission.reward} points`);
      
      // 간혹 보너스 보상 추가
      if (Math.random() < 0.3) {
        setSkillPoints(prev => prev + 1);
        displaySpecialReward(`Mission Bonus: +1 Skill Point!`);
      }
    }
  };

  // 미션 진행 확인 함수 (예시)
  const checkMissionProgress = (action) => {
    if (!dailyMission || missionCompleted) return;
    
    switch (action) {
      case 'read_page':
        if (dailyMission.id === 1) {
          // 페이지 읽기 미션 진행도 업데이트
          // 실제로는 카운터를 만들어 5페이지를 모두 읽었는지 확인
          completeMission();
        }
        break;
      case 'quiz_correct':
        if (dailyMission.id === 2) {
          completeMission();
        }
        break;
      // 다른 미션 종류별 처리...
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 w-screen min-h-[100dvh] bg-amber-50 overflow-hidden flex flex-col">
      <AnimationStyles />
      
      <div className="fixed top-0 left-0 bg-black text-white p-1 text-xs opacity-70 z-50">
        gameStarted: {gameStarted ? 'true' : 'false'}, 
        currentStep: {currentStep}, 
        showLibrarian: {showLibrarian ? 'true' : 'false'},
        introStep: {introStep}
      </div>
      
      {!gameStarted && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-200">
          <div className="text-center max-w-3xl p-6">
            <h1 className="text-4xl font-bold text-amber-800 mb-6">Beyond The Pages</h1>
            <p className="text-xl mb-8 text-amber-700">
              Embark on a journey through world literature, enhance your reading skills,
              and grow your knowledge with every page turned.
            </p>
            <button 
              onClick={handleStartGame}
              className="px-8 py-4 bg-amber-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-amber-700 transition-colors"
            >
              Begin Your Literary Journey
            </button>
          </div>
        </div>
      )}
      
      {gameStarted && currentStep === "" && showLibrarian && (
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('/assets/bookcase.png')] bg-cover bg-center opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 to-amber-950/70"></div>
          
          <div className="relative z-10 w-full max-w-4xl px-6">
            <div className="flex flex-col items-center mb-6">
              <div className="text-8xl mb-4">🧙‍♀️</div>
              <div className="bg-amber-800 bg-opacity-90 text-amber-50 p-6 rounded-xl w-full">
                <h2 className="text-2xl font-bold mb-4">Librarian of the Secret Archives</h2>
                <div className="min-h-[100px] mb-4">
                  <p className="text-lg">{librarianMessage}</p>
                </div>
                
                {!showCharacterCreation && (
                  <button 
                    onClick={displayNextLibrarianMessage}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-full text-white font-bold"
                  >
                    Continue
                  </button>
                )}
                
                {showCharacterCreation && (
                  <div className="bg-amber-700 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-4">Choose your reading companion:</h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {/* 남성 캐릭터 */}
                      <div 
                        key="male-child"
                        onClick={() => setCharacterEmoji("👦")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "👦" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">👦</div>
                        <div className="text-xs text-white">Boy</div>
                      </div>
                      <div 
                        key="male-adult"
                        onClick={() => setCharacterEmoji("👨")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "👨" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">👨</div>
                        <div className="text-xs text-white">Man</div>
                      </div>
                      <div 
                        key="male-wizard"
                        onClick={() => setCharacterEmoji("🧙‍♂️")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "🧙‍♂️" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">🧙‍♂️</div>
                        <div className="text-xs text-white">Wizard</div>
                      </div>
                      
                      {/* 여성 캐릭터 */}
                      <div 
                        key="female-child"
                        onClick={() => setCharacterEmoji("👧")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "👧" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">👧</div>
                        <div className="text-xs text-white">Girl</div>
                      </div>
                      <div 
                        key="female-adult"
                        onClick={() => setCharacterEmoji("👩")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "👩" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">👩</div>
                        <div className="text-xs text-white">Woman</div>
                      </div>
                      <div 
                        key="female-wizard"
                        onClick={() => setCharacterEmoji("🧙‍♀️")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "🧙‍♀️" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">🧙‍♀️</div>
                        <div className="text-xs text-white">Sorceress</div>
                      </div>
                      
                      {/* 젠더 중립적 옵션 */}
                      <div 
                        key="neutral-person"
                        onClick={() => setCharacterEmoji("🧑")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "🧑" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">🧑</div>
                        <div className="text-xs text-white">Person</div>
                      </div>
                      <div 
                        key="neutral-scholar"
                        onClick={() => setCharacterEmoji("🧑‍🎓")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "🧑‍🎓" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">🧑‍🎓</div>
                        <div className="text-xs text-white">Scholar</div>
                      </div>
                      <div 
                        key="neutral-mage"
                        onClick={() => setCharacterEmoji("🪄")}
                        className={`text-5xl p-4 bg-amber-600 hover:bg-amber-500 rounded-lg cursor-pointer flex flex-col items-center ${characterEmoji === "🪄" ? 'ring-4 ring-yellow-300' : ''}`}
                      >
                        <div className="mb-2">🪄</div>
                        <div className="text-xs text-white">Mage</div>
                      </div>
                    </div>
                    <button
                      onClick={completeCharacterCreation}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-400 rounded-lg text-white text-xl font-bold"
                    >
                      Enter the Literary World
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {gameStarted && currentStep === "outside" && !showLibrarian && (
        <div className="w-full h-full pt-12 pb-24 relative">
          {/* Today's Mission 배너 */}
          {dailyMission && showMissionBanner && (
            <div className="absolute top-2 left-0 right-0 mx-auto w-full max-w-md z-20">
              <div className={`bg-amber-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between
                ${missionCompleted ? 'bg-green-700' : 'bg-amber-800'}`}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{dailyMission.icon}</div>
                  <div>
                    <div className="font-bold text-sm">Today's Mission!</div>
                    <div className="text-xs text-amber-100">{dailyMission.task} • {missionCompleted ? 'Completed!' : `+${dailyMission.reward} pts`}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {missionCompleted ? (
                    <div className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full">
                      ✓ Complete
                    </div>
                  ) : (
                    <div className="text-amber-200 text-xs">
                      In Progress...
                    </div>
                  )}
                  <button 
                    onClick={() => setShowMissionBanner(false)} 
                    className="ml-2 text-white opacity-70 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* 기존 외부 맵 화면 내용 유지 */}
          <div className="w-full h-full bg-amber-50 relative">
            {/* 배경 */}
            <div className="absolute inset-0 bg-[url('/assets/map.png')] bg-cover bg-center opacity-30"></div>
            
            {/* 라이브러리 건물 - 화면 상단에 배치 */}
            <div 
              className="absolute top-24 left-1/2 transform -translate-x-1/2 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setCurrentStep("library")}
            >
              <div className="w-full h-full bg-[url('/assets/castle.png')] bg-contain bg-no-repeat bg-center"></div>
              <div className="absolute -bottom-12 left-0 right-0 text-center">
                <div className="bg-amber-800 text-amber-50 px-6 py-3 rounded-full inline-block font-bold text-xl">
                  Enter Cultural Library
                </div>
              </div>
            </div>
            
            {/* 게임 액션 버튼 영역 - 화면 중앙에 배치하되, 아래로 약간 이동 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 mt-20">
              <h3 className="font-bold text-2xl text-amber-800 mb-4 text-center">Literary Adventures</h3>
              
              {/* 게임 액션 버튼 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-[min(92vw,600px)]">
                {/* 일일 챌린지 */}
                <div className="bg-white p-5 rounded-lg shadow-md border border-amber-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-amber-100 p-3 rounded-full text-2xl">🔥</div>
                    <div>
                      <h3 className="font-bold text-amber-800">Daily Challenges</h3>
                      <p className="text-xs text-amber-600">Keep your reading streak alive</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Daily Reading</span>
                        <span>{readingChallenges.daily.current}/{readingChallenges.daily.target} pages</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 transition-all duration-300"
                          style={{ width: `${(readingChallenges.daily.current / readingChallenges.daily.target) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* 읽기 스트릭 */}
                    {readingChallenges.streak.days > 0 && (
                      <div className="flex items-center gap-2 text-amber-800 font-bold mt-2">
                        <span>🔥</span> {readingChallenges.streak.days} Day Streak!
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 랜덤 리딩 버튼 */}
                <div 
                  onClick={startRandomReading}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-amber-400"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-amber-400/40 p-3 rounded-full text-2xl">🎲</div>
                    <div>
                      <h3 className="font-bold">Random Reading</h3>
                      <p className="text-xs text-amber-100">5-minute quick session</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">
                    Read a random excerpt from world literature. Perfect for when you have just a few minutes!
                  </p>
                  <div className="mt-3 text-right">
                    <span className="bg-amber-400/40 px-2 py-1 rounded text-xs font-bold">+20 pts</span>
                  </div>
                </div>
                
                {/* 문학 배틀 버튼 */}
                <div 
                  onClick={startLiteraryBattle}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-purple-400"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-400/40 p-3 rounded-full text-2xl">⚔️</div>
                    <div>
                      <h3 className="font-bold">Literary Battle</h3>
                      <p className="text-xs text-purple-100">Test your knowledge</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">
                    Challenge literary opponents to question battles. Use your companion's special abilities to win!
                  </p>
                  <div className="mt-3 text-right">
                    <span className="bg-purple-400/40 px-2 py-1 rounded text-xs font-bold">Earn skill points</span>
                  </div>
                </div>
                
                {/* 스킬 트리 버튼 */}
                <div 
                  onClick={() => setShowSkillTree(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer border border-green-400"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-400/40 p-3 rounded-full text-2xl">🧠</div>
                    <div>
                      <h3 className="font-bold">Skill Tree</h3>
                      <p className="text-xs text-green-100">Upgrade your abilities</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90">
                    Enhance your reading abilities with specialized skills. Use skill points to level up!
                  </p>
                  <div className="mt-3 text-right">
                    <span className="bg-green-400/40 px-2 py-1 rounded text-xs font-bold">
                      {skillPoints} skill points available
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 문학 캐릭터 패널 - 화면 우측 상단에 배치 */}
            <div className="absolute top-6 right-6 bg-white p-3 rounded-lg shadow-md flex items-center gap-3 cursor-pointer hover:bg-amber-50 transition-colors border border-amber-100"
              onClick={() => setShowCharacters(true)}
            >
              <div className="text-3xl">
                {literaryCharacters.find(c => c.id === activeCompanion)?.emoji || '👤'}
              </div>
              <div>
                <div className="font-bold text-amber-800">
                  {literaryCharacters.find(c => c.id === activeCompanion)?.name || 'Your Companion'}
                </div>
                <div className="text-xs text-amber-600">
                  {unlockedCharacters.length}/{literaryCharacters.length} characters
                </div>
              </div>
            </div>
          </div>
          
          {/* 우측 하단 도움말 강아지 캐릭터 - z-index 높게 설정 */}
          <div className="fixed bottom-6 right-6 flex items-end z-[100]">
            {/* 말풍선 */}
            <div className="bg-white rounded-2xl rounded-br-none shadow-lg p-4 mb-2 mr-4 max-w-xs relative">
              <p className="text-gray-800">
                Hi there! I'm Buddy, your reading buddy! Need help with your literary adventure?
              </p>
              <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white transform rotate-45"></div>
            </div>
            
            {/* 강아지 캐릭터 */}
            <div 
              className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform border-2 border-amber-300 overflow-hidden"
              onClick={() => setShowHelpOptions ? setShowHelpOptions(!showHelpOptions) : alert("Need help? I'm here to assist with your literary journey!")}
            >
              <span className="text-3xl" role="img" aria-label="Puppy assistant">🐶</span>
            </div>
            
            {/* 도움말 옵션 팝업 */}
            {showHelpOptions && (
              <div className="absolute bottom-20 right-0 bg-white rounded-xl shadow-xl p-3 z-50 w-64">
                <h3 className="font-bold text-amber-800 mb-2 px-2">How can I help?</h3>
                <div className="space-y-1">
                  <button 
                    onClick={() => handleHelpOption('books')}
                    className="w-full text-left px-3 py-2 hover:bg-amber-50 rounded-lg flex items-center"
                  >
                    <span className="mr-2">📚</span> About the library
                  </button>
                  <button 
                    onClick={() => handleHelpOption('characters')}
                    className="w-full text-left px-3 py-2 hover:bg-amber-50 rounded-lg flex items-center"
                  >
                    <span className="mr-2">👤</span> Literary characters
                  </button>
                  <button 
                    onClick={() => handleHelpOption('challenges')}
                    className="w-full text-left px-3 py-2 hover:bg-amber-50 rounded-lg flex items-center"
                  >
                    <span className="mr-2">🎯</span> Reading challenges
                  </button>
                  <button 
                    onClick={() => handleHelpOption('battle')}
                    className="w-full text-left px-3 py-2 hover:bg-amber-50 rounded-lg flex items-center"
                  >
                    <span className="mr-2">⚔️</span> Literary battles
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {gameStarted && currentStep === "library" && !showLibrarian && (
        <div className="w-full h-full bg-amber-100 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-amber-800">Cultural Library</h2>
            <button 
              onClick={returnToMap}
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
            >
              Return to Map
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="font-bold text-lg text-amber-800 mb-2">Your Reading Journey</h3>
            <div className="flex justify-between text-sm">
              <div>
                <div className="font-bold">Total Books</div>
                <div className="text-2xl text-amber-600">{books.length}</div>
              </div>
              <div>
                <div className="font-bold">Books Started</div>
                <div className="text-2xl text-amber-600">
                  {Object.keys(readingRecords).length}
                </div>
              </div>
              <div>
                <div className="font-bold">Books Completed</div>
                <div className="text-2xl text-amber-600">
                  {Object.values(readingRecords).filter(record => 
                    record.lastPage >= books.find(b => b.id === record.bookId)?.totalPages || 0
                  ).length}
                </div>
              </div>
              <div>
                <div className="font-bold">Pages Read</div>
                <div className="text-2xl text-amber-600">{readingStats.totalPagesRead}</div>
              </div>
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => {
                const bookRecord = readingRecords[book.id] || {};
                const progress = bookRecord.lastPage ? (bookRecord.lastPage / book.totalPages) * 100 : 0;
                const isCompleted = bookRecord.lastPage >= book.totalPages;
                
                return (
                  <div 
                    key={book.id}
                    onClick={() => startReading(book)}
                    className={`bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer
                      ${isCompleted ? 'border-l-4 border-green-500' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-amber-900 mb-1">{book.title}</h3>
                      {isCompleted && <div className="text-green-500 text-xl">✓</div>}
                    </div>
                    <p className="text-amber-700 mb-1">{book.author}</p>
                    <p className="text-xs text-gray-600 mb-3">{book.culture}</p>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {book.description || `A classic work from ${book.culture} literature exploring themes of ${["identity", "belonging", "love", "conflict", "nature"][Math.floor(Math.random() * 5)]}.`}
                    </p>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{bookRecord.lastPage || 0}/{book.totalPages} pages ({Math.round(progress)}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${isCompleted ? 'bg-green-500' : 'bg-amber-500'}`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      {bookRecord.lastReadTime && (
                        <div className="text-xs text-gray-500 mt-2">
                          Last read: {new Date(bookRecord.lastReadTime).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {currentStep === "reading" && selectedBook && (
        <div className="w-full h-full bg-amber-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-amber-800">{selectedBook.title}</h2>
              <p className="text-sm text-amber-600">{selectedBook.author}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Reading Speed:</span>
                {[1, 2, 5].map((speed) => (
                  <button 
                    key={speed}
                    onClick={() => adjustReadingSpeed(speed)}
                    className={`px-2 py-1 rounded text-sm ${readingSpeed === speed ? 'bg-amber-700 text-white' : 'bg-amber-200'}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentStep("library")}
                className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700"
              >
                Back to Library
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Page {currentPage} of {selectedBook.totalPages}</span>
              <span>{Math.round((currentPage / selectedBook.totalPages) * 100)}% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-600 transition-all duration-300"
                style={{ width: `${(currentPage / selectedBook.totalPages) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow flex flex-col border-t-4 border-amber-600">
            <div className="mb-4 text-center italic text-gray-500 text-sm border-b pb-2">
              {selectedBook.title} - {selectedBook.culture}
            </div>
            
            <div className="flex-grow overflow-y-auto prose max-w-none mb-4">
              {currentPageContent && currentPageContent.map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed text-gray-800">
                  {paragraph}
                </p>
              ))}
              
              {(!currentPageContent || currentPageContent.length === 0) && (
                <div className="text-center text-gray-500 italic py-8">
                  This page appears to be blank or missing content.
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <h3 className="font-bold text-sm text-amber-800 mb-2">Key Words & Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {["Consort", "Intimates", "His Majesty", "La Mancha", "lance-rack"].map((word) => (
                  <div key={word} className="bg-amber-100 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-amber-200">
                    {word}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between pt-3 border-t border-gray-200">
              <button
                onClick={prevPage}
                disabled={currentPage <= 1}
                className={`px-4 py-2 rounded-l-lg flex items-center gap-1 ${currentPage <= 1 ? 'bg-gray-300 text-gray-500' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
              >
                <span>←</span> Previous
              </button>
              
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= selectedBook.totalPages) {
                      setCurrentPage(page);
                      updateReadingRecord(selectedBook.id, page);
                    }
                  }}
                  className="w-16 text-center border rounded py-1 mx-2"
                  min="1"
                  max={selectedBook.totalPages}
                />
                <span className="text-gray-600">of {selectedBook.totalPages}</span>
              </div>
              
              <button
                onClick={nextPage}
                disabled={currentPage >= selectedBook.totalPages}
                className={`px-4 py-2 rounded-r-lg flex items-center gap-1 ${currentPage >= selectedBook.totalPages ? 'bg-gray-300 text-gray-500' : 'bg-amber-600 text-white hover:bg-amber-700'}`}
              >
                Next <span>→</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 my-3">
            <button
              onClick={toggleBookmark}
              className={`px-3 py-1 rounded-full flex items-center gap-1 text-sm ${
                bookmarks[selectedBook?.id]?.includes(currentPage)
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <span>🔖</span> {bookmarks[selectedBook?.id]?.includes(currentPage) ? 'Bookmarked' : 'Bookmark'}
            </button>
            
            <button
              onClick={startQuiz}
              className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 text-sm hover:bg-amber-200"
            >
              <span>🧠</span> Quiz Yourself
            </button>
            
            <button
              onClick={startWordGame}
              className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1 text-sm hover:bg-amber-200"
            >
              <span>🔤</span> Word Game
            </button>
          </div>
          
          {showReadingReward && (
            <div className="fixed bottom-24 right-6 bg-amber-100 border border-amber-300 p-3 rounded-lg shadow-lg animate-fadeIn">
              <div className="text-amber-800 font-bold flex items-center gap-2">
                <span className="text-lg">+1</span> <span>Reading Point!</span>
              </div>
              <p className="text-xs text-amber-700 mt-1">Your character grows with every page!</p>
            </div>
          )}
        </div>
      )}
      
      {showQuiz && currentQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 m-4">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-amber-800">Knowledge Check</h3>
              <p className="text-gray-600 text-sm">Test your understanding of what you've read</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <p className="font-bold mb-4">{currentQuiz.question}</p>
              
              {!quizResult && (
                <div className="space-y-2">
                  {currentQuiz.options.map((option, index) => (
                    <div 
                      key={index}
                      onClick={() => submitQuizAnswer(index)}
                      className="bg-white p-3 rounded border border-gray-200 cursor-pointer hover:bg-amber-100"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
              
              {quizResult && (
                <div className={`p-4 rounded-lg mt-4 ${quizResult.correct ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
                  <div className="font-bold mb-2">
                    {quizResult.correct ? 'Correct! +10 points' : 'Not quite right'}
                  </div>
                  <p>{quizResult.explanation}</p>
                  
                  {quizResult.correct && quizStreak > 1 && (
                    <div className="mt-2 text-amber-800 font-bold">
                      🔥 {quizStreak} Question Streak! Keep going!
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              {quizResult && (
                <button
                  onClick={() => setShowQuiz(false)}
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Continue
                </button>
              )}
            </div>
            
            <div className="flex justify-between">
              <div>
                Found: {wordGameData.found.length}/{wordGameData.words.length}
              </div>
              <button
                onClick={() => setWordGameActive(false)}
                className="px-4 py-1 bg-amber-600 text-white rounded hover:bg-amber-700"
              >
                Exit Game
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showAchievement && currentAchievement && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-amber-800 text-amber-50 px-6 py-4 rounded-lg shadow-lg animate-bounce">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{currentAchievement.icon}</div>
            <div>
              <div className="font-bold">Achievement Unlocked!</div>
              <div className="text-lg">{currentAchievement.title}</div>
              <div className="text-xs opacity-80">{currentAchievement.description}</div>
            </div>
          </div>
        </div>
      )}
      
      {showSpecialReward && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-600 to-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          <div className="text-center font-bold">{specialRewardText}</div>
        </div>
      )}
      
      {showRandomReading && randomReadingContent && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-amber-200">
              <div>
                <h2 className="text-2xl font-bold text-amber-800">Random Reading Challenge</h2>
                <p className="text-amber-700 text-sm">{randomReadingContent.title} • {randomReadingContent.culture}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-mono font-bold text-lg 
                ${randomReadingTimer <= 60 ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                {Math.floor(randomReadingTimer / 60)}:{(randomReadingTimer % 60).toString().padStart(2, '0')}
              </div>
            </div>
            <div className="flex-grow overflow-y-auto mb-6">
              <div className="bg-amber-50 p-4 rounded-lg mb-4">
                <h3 className="font-bold text-lg">{randomReadingContent.content.title}</h3>
                <p className="text-sm text-amber-700">From: {randomReadingContent.title} (Page {randomReadingContent.page})</p>
              </div>
              <div className="prose max-w-none">
                {randomReadingContent.content.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-amber-200 pt-4 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Read carefully to earn bonus points!
              </div>
              {randomReadingCompleted ? (
                <button
                  onClick={completeRandomReading}
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  Complete (+20 points)
                </button>
              ) : (
                <button
                  onClick={() => setShowRandomReading(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Exit (No points)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {showBattleMode && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 m-4">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 text-4xl p-3 rounded-full">
                  {literaryCharacters.find(c => c.id === activeCompanion)?.emoji || '👤'}
                </div>
                <div>
                  <h3 className="font-bold text-lg">You & {literaryCharacters.find(c => c.id === activeCompanion)?.name}</h3>
                  <div className="text-sm text-gray-600">
                    Knowledge Power: {battlePoints + (literaryCharacters.find(c => c.id === activeCompanion)?.power || 0)}
                  </div>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-amber-800">VS</div>
              
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-bold text-lg text-right">{battleOpponent?.name}</h3>
                  <div className="text-sm text-gray-600 text-right">
                    Level {battleOpponent?.level} • Power: {battleOpponent?.power * 10}
                  </div>
                </div>
                <div className="bg-gray-100 text-4xl p-3 rounded-full">
                  {battleOpponent?.avatar}
                </div>
              </div>
            </div>
            
            {battleStatus === 'preparing' && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-amber-800 mb-4">Literary Battle Challenge</h2>
                <p className="mb-6">
                  Test your knowledge against {battleOpponent?.name}, who specializes in {battleOpponent?.speciality} literature.
                </p>
                <p className="text-sm mb-8 text-gray-600">
                  Answer questions correctly to gain points. Use your literary companion's abilities to gain an advantage!
                </p>
                <button
                  onClick={() => setBattleStatus('inProgress')}
                  className="px-8 py-3 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 font-bold"
                >
                  Begin Battle!
                </button>
              </div>
            )}
            
            {battleStatus === 'inProgress' && currentBattleQuestion < battleQuestions.length && (
              <div>
                <div className="mb-4 text-right">
                  <span className="bg-amber-100 px-3 py-1 rounded-full text-amber-800 font-bold">
                    Question {currentBattleQuestion + 1}/{battleQuestions.length}
                  </span>
                </div>
                
                <div className="bg-amber-50 p-5 rounded-lg mb-6">
                  <h3 className="font-bold text-xl mb-4">{battleQuestions[currentBattleQuestion].question}</h3>
                  
                  <div className="space-y-3 mt-6">
                    {battleQuestions[currentBattleQuestion].options.map((option, index) => (
                      <div 
                        key={index}
                        onClick={() => submitBattleAnswer(index)}
                        className="bg-white p-4 rounded border border-gray-200 cursor-pointer hover:bg-amber-100 transition-colors"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-right text-sm">
                    <span className="text-amber-800">Points: +{battleQuestions[currentBattleQuestion].points}</span>
                    
                    {activeCompanion === 'sherlock' && battleOpponent?.speciality === 'mystery' && (
                      <span className="ml-2 bg-green-100 px-2 py-0.5 rounded text-green-800">
                        Sherlock: +30% bonus on mystery questions
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {battleStatus === 'complete' && battleResult && (
              <div className="text-center py-6">
                <div className={`text-4xl mb-6 ${battleResult.win ? 'text-green-500' : 'text-red-500'}`}>
                  {battleResult.win ? '🏆 Victory!' : '😓 Defeat'}
                </div>
                
                <div className="flex justify-center items-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl mb-2">
                      {literaryCharacters.find(c => c.id === activeCompanion)?.emoji || '👤'}
                    </div>
                    <div className="font-bold text-xl text-amber-800">{battleResult.playerScore}</div>
                    <div className="text-sm text-gray-500">Your Score</div>
                  </div>
                  
                  <div className="text-2xl">VS</div>
                  
                  <div className="text-center">
                    <div className="text-5xl mb-2">
                      {battleOpponent?.avatar}
                    </div>
                    <div className="font-bold text-xl text-gray-700">{battleResult.opponentScore}</div>
                    <div className="text-sm text-gray-500">Opponent Score</div>
                  </div>
                </div>
                
                {battleResult.win && (
                  <div className="bg-amber-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-lg text-amber-800">Battle Rewards:</h3>
                    <ul className="mt-2 space-y-1">
                      <li className="flex items-center gap-2">
                        <span>✓</span> {battlePoints} points added to your score
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> 1 Skill Point earned
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> 30% chance to unlock a new Literary Character
                      </li>
                    </ul>
                  </div>
                )}
                
                <button
                  onClick={() => setShowBattleMode(false)}
                  className={`px-8 py-3 rounded-lg shadow font-bold
                    ${battleResult.win ? 
                      'bg-amber-600 text-white hover:bg-amber-700' : 
                      'bg-gray-200 text-gray-800 hover:bg-gray-300'}`
                  }
                >
                  {battleResult.win ? 'Claim Rewards & Continue' : 'Try Again Later'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {showSkillTree && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-800">Reading Skill Tree</h2>
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-800">
                  <span className="font-bold">{skillPoints}</span> Skill Points
                </div>
                <button
                  onClick={() => setShowSkillTree(false)}
                  className="text-amber-800 hover:text-amber-950"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {Object.entries(skills).map(([skillId, skill]) => (
                <div 
                  key={skillId} 
                  className={`bg-white border rounded-lg p-4 relative overflow-hidden
                    ${skill.level === skill.maxLevel ? 
                      'border-amber-400 shadow-amber-200 shadow-md' : 
                      'border-gray-200'}`
                  }
                >
                  <div 
                    className="absolute inset-0 bg-amber-50 opacity-60"
                    style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                  ></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-3xl">{skill.icon}</div>
                      <div className="bg-amber-100 px-2 py-0.5 rounded text-sm font-bold">
                        Lv {skill.level}/{skill.maxLevel}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg text-amber-900 mb-1">{skill.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{skill.effect}</p>
                    
                    {skill.level < skill.maxLevel ? (
                      <button 
                        onClick={() => upgradeSkill(skillId)}
                        disabled={skillPoints <= 0}
                        className={`w-full py-2 rounded text-center text-sm font-bold
                          ${skillPoints > 0 ? 
                            'bg-amber-600 text-white hover:bg-amber-700' : 
                            'bg-gray-200 text-gray-500 cursor-not-allowed'}`
                        }
                      >
                        {skillPoints > 0 ? 'Upgrade Skill' : 'Need Skill Points'}
                      </button>
                    ) : (
                      <div className="w-full py-2 rounded text-center text-sm font-bold bg-green-100 text-green-800">
                        Fully Mastered!
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-bold text-amber-800 mb-2">How to earn Skill Points:</h3>
              <ul className="text-sm space-y-1 text-amber-900">
                <li className="flex items-center gap-2">
                  <span>•</span> Win Literary Battles against opponents
                </li>
                <li className="flex items-center gap-2">
                  <span>•</span> Complete full books in your reading journey
                </li>
                <li className="flex items-center gap-2">
                  <span>•</span> Achieve 7-day reading streaks
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {showCharacters && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 m-4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-amber-800">Literary Characters</h2>
              <button
                onClick={() => setShowCharacters(false)}
                className="text-amber-800 hover:text-amber-950"
              >
                ✕
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Literary characters can assist you in your reading journey. Each character provides
              unique bonuses and abilities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {literaryCharacters.map(character => {
                const isUnlocked = unlockedCharacters.includes(character.id);
                const isActive = activeCompanion === character.id;
                
                return (
                  <div 
                    key={character.id}
                    className={`border rounded-lg p-4 flex gap-4 relative
                      ${isUnlocked ? (isActive ? 'border-amber-500 bg-amber-50' : 'border-gray-200') : 
                      'border-gray-200 opacity-60'}`
                    }
                  >
                    <div 
                      className={`text-5xl flex items-center justify-center min-w-[60px]
                        ${!isUnlocked && 'grayscale'}`
                      }
                    >
                      {character.emoji}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{character.name}</h3>
                        {isActive && (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">Active</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                        {Object.entries(character).filter(([key]) => 
                          !['id', 'name', 'emoji', 'unlocked'].includes(key)
                        ).map(([stat, value]) => (
                          <div key={stat} className="flex items-center text-sm">
                            <span className="capitalize text-gray-600">{stat}:</span>
                            <div className="ml-1 w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-amber-500"
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                            <span className="ml-1 text-xs font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                      
                      {isUnlocked ? (
                        <button
                          onClick={() => setActiveCompanion(character.id)}
                          className={`mt-3 px-4 py-1 rounded text-sm font-bold
                            ${isActive ? 
                              'bg-amber-100 text-amber-800 cursor-default' : 
                              'bg-amber-600 text-white hover:bg-amber-700'}`
                          }
                          disabled={isActive}
                        >
                          {isActive ? 'Current Companion' : 'Select'}
                        </button>
                      ) : (
                        <div className="mt-3 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-0.5 rounded">
                            Locked - Win battles to unlock
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {isUnlocked && character.id === 'sherlock' && (
                      <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">
                        +30% Mystery Bonus
                      </div>
                    )}
                    
                    {isUnlocked && character.id === 'hermione' && (
                      <div className="absolute -top-2 -right-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-bold">
                        +40% Quiz Points
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-bold text-amber-800 mb-2">Character Benefits:</h3>
              <ul className="text-sm space-y-1 text-amber-900">
                <li className="flex items-center gap-2">
                  <span>•</span> Each character provides unique bonuses during Literary Battles
                </li>
                <li className="flex items-center gap-2">
                  <span>•</span> Characters can give special insights when reading certain books
                </li>
                <li className="flex items-center gap-2">
                  <span>•</span> Unlock all characters to earn the "Literary Circle" achievement
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="absolute bottom-6 right-6 z-40 flex flex-col items-center">
      </div>
    </div>
  );
};

export default BeyondThePages;