import React, { useEffect, useRef, useState } from "react";
import Matter, { World, Bodies, Body, Vector } from "matter-js";
import darwinChunks from "./books/darwin_variation_chunks.json";
import botanicalBackground from './essets/botanical-garden-background.jpg';
// 업데이트된 맵 데이터: 더 풍부한 서사구조 및 NPC 상호작용
const SingaporeBotanicGardenMap = {
  prologue: [
    "Singapore, 1942 - As Japanese forces occupy Singapore, a team of botanists secretly hides the last known seed of Rafflesia singaporensis, a mythical flower said to possess unique healing properties.",
    "Present Day - You've been invited by the Singapore Botanic Gardens to participate in their 160th anniversary celebration. Little do you know, you're about to uncover the greatest botanical mystery in Singapore's history..."
  ],
  locations: [
    {
      id: "hub",
      name: "Heritage Trail Hub",
      description: "The central junction connecting four significant locations in the Gardens' Heritage Trail.",
      npc: {
        name: "Prof. Rajan",
        title: "Chief Botanist",
        avatar: "👨🏽‍🔬",
        text: "Ah, you must be our guest from the International Botanical Society! I'm Professor Rajan, head of rare plant conservation here. We've recently discovered fragments of an 80-year-old diary hinting at a hidden Rafflesia seed. The clues point to four locations where my predecessors worked during the war. Would you help us solve this historical mystery?",
        options: ["I'm ready to help!"],
        correctAnswer: "I'm ready to help!",
        onSuccess: {
          knowledge: "Excellent! Visit all four locations and collect the historical artifacts. When combined, they'll reveal the seed's hiding place!"
        }
      },
      obstacles: [
        { 
          type: "singaporeanRoom", 
          x: 300, 
          y: 200, 
          width: 150,
          height: 150, 
          color: "red" 
        },
        { 
          type: "botanicLesson", 
          x: 700, 
          y: 200, 
          width: 150, 
          height: 150, 
          color: "green" 
        },
        { 
          type: "mysteryRoom", 
          x: 300, 
          y: 600, 
          width: 150, 
          height: 150, 
          color: "purple"
        },
        { 
          type: "laneToFinish", 
          x: 700, 
          y: 600, 
          width: 150, 
          height: 150, 
          color: "orange" 
        }
      ],
      triggers: [
        { x: 300, y: 200, width: 150, height: 150, action: "enterSingaporeanRoom" },
        { x: 700, y: 200, width: 150, height: 150, action: "enterBotanicLesson" },
        { x: 300, y: 600, width: 150, height: 150, action: "enterMysteryRoom" },
        { x: 700, y: 600, width: 150, height: 150, action: "enterLaneToFinish" }
      ]
    },
    {
      id: "singaporeanRoom",
      name: "The Orchidarium",
      description: "A climate-controlled conservatory housing Singapore's national flower and its hybrids.",
      npc: {
        name: "Dr. Mei Ling",
        title: "Orchid Specialist",
        avatar: "👩🏻‍🌾",
        text: "*carefully pruning an orchid* You must be Professor Rajan's investigator! During WWII, my grandmother hybridized orchids here as camouflage. She left something behind... But first, tell me - why were Vanda Miss Joaquim orchids particularly significant during the occupation?",
        quiz: {
          question: "Why were Vanda Miss Joaquim orchids important during WWII?",
          options: [
            "Their roots were edible during food shortages",
            "They symbolized resistance in secret communications",
            "Their scent repelled Japanese inspectors",
            "They bloomed on Singapore's surrender date"
          ],
          correctAnswer: "They symbolized resistance in secret communications"
        },
        onSuccess: { 
          nextLocation: "hub", 
          reward: "glass_slide",
          message: "*nods* Correct. White orchids meant 'safe to meet', while red ones signaled danger. *hands you a tiny glass slide* This contains pollen from the last pre-war hybrid. Under a microscope, you'll see coordinates scratched into the glass - the first clue!"
        }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "botanicLesson",
      name: "Heritage Tree Grove",
      description: "A collection of ancient trees preserved since the Gardens' founding.",
      npc: {
        name: "Mr. Tan",
        title: "Arborist",
        avatar: "👨🏽‍🦳",
        text: "*patting a massive Tembusu tree* This old fellow was here when the British surrendered. The head gardener during the occupation - my grandfather - buried something at the base of these trees... But first, prove you understand our living history by sharing your thoughts on century-old trees in botanical research:",
        writing: true,
        onSuccess: { 
          nextLocation: "hub", 
          reward: "wax_seal",
          message: "*smiles* Excellent insights! These trees are indeed living time capsules. *digs up a small tin* Here's my grandfather's wax seal. The imprint shows a section of the Gardens' original layout - match it with other clues!"
        }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "mysteryRoom",
      name: "The Colonial Herbarium",
      description: "A room showcasing Singapore's preserved botanical specimens from the colonial era.",
      npc: {
        name: "Ms. Zhang",
        title: "Historical Botanist",
        avatar: "👩🏻‍💼",
        text: "*sorting through dried specimens* So you're looking for the Rafflesia clues! My great-aunt was the assistant herbarium keeper during the war. She preserved many local plants for identification. Can you identify which of these plants is NOT native to Singapore?",
        quiz: {
          question: "Which of these plants is NOT native to Singapore?",
          options: [
            "Tembusu",
            "Pitcher Plant",
            "Hibiscus",
            "Poinsettia"
          ],
          correctAnswer: "Poinsettia"
        },
        onSuccess: { 
          nextLocation: "hub", 
          reward: "pressed_leaf",
          message: "Correct! Poinsettias are from Mexico. *hands you a carefully pressed leaf* This preserved specimen has a tiny map fragment drawn in invisible ink. When heated gently, it reveals part of a garden grid system from the 1940s!"
        }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    },
    {
      id: "laneToFinish",
      name: "The Sundial Garden",
      description: "An ancient garden feature with a perfectly calibrated sundial from colonial times.",
      npc: {
        name: "Dr. Kumar",
        title: "Garden Historian",
        avatar: "👨🏾‍🏫",
        text: "*adjusting his glasses* Fascinating that you've made it this far in your quest! The original garden timekeeper has one final secret. During the war, the sundial keeper encoded a message in the time shadows. But first, let's see if you know your Singapore history. When was Singapore Botanic Gardens established?",
        quiz: {
          question: "When was Singapore Botanic Gardens established?",
          options: [
            "1822",
            "1859",
            "1901",
            "1945"
          ],
          correctAnswer: "1859"
        },
        onSuccess: { 
          nextLocation: "hub", 
          reward: "bronze_key",
          message: "Precisely correct! In 1859, just 40 years after Singapore's founding. *presents a small bronze key* This unlocks a compartment in the sundial base. Inside is a diagram showing the exact position where the sun's shadow falls on a specific date - the final piece of your puzzle!"
        }
      },
      triggers: [
        { x: 900, y: 700, width: 80, height: 80, action: "returnToHub" }
      ]
    }
  ]
};
// 게임 컴포넌트
const SingaporeAdventureGame = () => {
    // 기존 상태 선언
    const [currentLocation, setCurrentLocation] = useState("hub");
    const [score, setScore] = useState(0);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [inventory, setInventory] = useState([]);
    const [gameState, setGameState] = useState("playing");
    const [currentQuest, setCurrentQuest] = useState("Find the lost rare seed by exploring Singapore");
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
    const [showRewardAnimation, setShowRewardAnimation] = useState(false);
    const [completedTests, setCompletedTests] = useState([]);
    const [randomTextChunk, setRandomTextChunk] = useState("");
    const [writingInput, setWritingInput] = useState(""); 
    const [welcomeDismissed, setWelcomeDismissed] = useState(false);
    const [debugLog, setDebugLog] = useState("Welcome to Singapore! Use arrow keys to move or click the colored areas.");
    const [directionControls, setDirectionControls] = useState({
      up: false,
      down: false,
      left: false,
      right: false
    });
    const [isTouchingControl, setIsTouchingControl] = useState({
      up: false,
      down: false,
      left: false,
      right: false
    });
    const [playerPosition, setPlayerPosition] = useState({ x: 500, y: 400 });
    const [interactingAnimal, setInteractingAnimal] = useState(null);
    
    // 모달 관련 상태
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState([]);
    const [showAttractionsInfo, setShowAttractionsInfo] = useState(false);
    
    // 배경 및 동물 관련 상태 
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [animalMovements, setAnimalMovements] = useState({});
    const [showNPCModal, setShowNPCModal] = useState(false);

    const handleTouchStart = (direction) => {
      setIsTouchingControl(prev => ({ ...prev, [direction]: true }));
      
      // movementKeysRef도 함께 업데이트
      if (direction === 'up') movementKeysRef.current.ArrowUp = true;
      if (direction === 'down') movementKeysRef.current.ArrowDown = true;
      if (direction === 'left') movementKeysRef.current.ArrowLeft = true;
      if (direction === 'right') movementKeysRef.current.ArrowRight = true;
    };
    
    const handleTouchEnd = (direction) => {
      setIsTouchingControl(prev => ({ ...prev, [direction]: false }));
      
      // movementKeysRef도 함께 업데이트
      if (direction === 'up') movementKeysRef.current.ArrowUp = false;
      if (direction === 'down') movementKeysRef.current.ArrowDown = false;
      if (direction === 'left') movementKeysRef.current.ArrowLeft = false;
      if (direction === 'right') movementKeysRef.current.ArrowRight = false;
    };
    
    // 기존 터치 핸들러 대신 간소화된 직접 이동 핸들러
const handleDirectMove = (direction) => {
  if (!playerRef.current) return;
  
  const speed = 20; // 한 번에 20px씩 이동
  const pos = playerRef.current.position;
  let newX = pos.x;
  let newY = pos.y;
  
  switch (direction) {
    case 'up':
      newY = pos.y - speed;
      break;
    case 'down':
      newY = pos.y + speed;
      break;
    case 'left':
      newX = pos.x - speed;
      break;
    case 'right':
      newX = pos.x + speed;
      break;
  }
  
  Body.setPosition(playerRef.current, { x: newX, y: newY });
  setPlayerPosition({ x: newX, y: newY }); // 상태 업데이트 추가
  setDebugLog(`직접 이동: ${direction} (x:${Math.round(newX)}, y:${Math.round(newY)})`);
  checkProximityToLocations(newX, newY);
  checkAnimalProximity(newX, newY); // 동물 확인 추가
};
    
    // refs 정의
    const movementKeysRef = useRef({
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      w: false,
      a: false,
      s: false,
      d: false
    });
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const playerRef = useRef(null);
    const obstaclesRef = useRef([]);
    const triggersRef = useRef([]);
    const rafRef = useRef(null);
    const isInitializedRef = useRef(false);
    const decorationsRef = useRef([]);
    const buildingsRef = useRef([]);
    const animalsRef = useRef([]);
    const backgroundImageRef = useRef(new Image());
    
    const chunks = darwinChunks;
    const locationData = SingaporeBotanicGardenMap.locations.find((loc) => loc.id === currentLocation);
    
    // Matter.js 초기화와 update 함수를 한 번에 처리하는 useEffect
    useEffect(() => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        // 이미지를 직접 설정 (불필요한 로딩 제거)
        setBackgroundImage({ src: botanicalBackground });

        // 엔진 초기화
        const engine = Matter.Engine.create();
        engine.gravity.y = 0;
        engineRef.current = engine;

        const render = Matter.Render.create({
            element: canvasRef.current,
            engine,
            options: {
                width: 1000,
                height: 800,
                wireframes: false,
                background: "transparent", // 배경을 투명하게 설정
                // 배경 이미지는 CSS로 별도 처리
            },
        });
        renderRef.current = render;

        // 플레이어 설정 - 기존 코드 수정
        const player = Bodies.circle(500, 400, 20, {
            restitution: 0.0,
            friction: 0.01,
            frictionAir: 0.001,
            density: 0.005,
            render: { 
                fillStyle: "transparent", // 투명하게 변경
                sprite: {
                    // 이모티콘을 렌더링할 수 없으므로 플레이어는 투명하게 처리
                }
            },
            isPlayer: true, // 플레이어 식별용 플래그
            label: "player"
        });
        playerRef.current = player;
        World.add(engine.world, player);

        // 경계 설정
        const boundaries = [
            Bodies.rectangle(500, -25, 1000, 50, { isStatic: true }),
            Bodies.rectangle(500, 825, 1000, 50, { isStatic: true }),
            Bodies.rectangle(-25, 400, 50, 800, { isStatic: true }),
            Bodies.rectangle(1025, 400, 50, 800, { isStatic: true }),
        ];
        World.add(engine.world, boundaries);

        // 초기 씬 설정 함수 호출
        updateSceneObjects(engine);
        
        // Render 실행
        Matter.Render.run(render);
        
        // 게임 루프 정의 - 이 함수만 사용
        const gameLoop = () => {
            if (engine && playerRef.current && gameState === "playing") {
                Matter.Engine.update(engine, 1000 / 60);
                
                // 플레이어 움직임 처리 - 직접 이동 방식으로 변경
                const keys = movementKeysRef.current;
                const speed = 5; // 속도 증가
                const currentPos = playerRef.current.position;
                let newX = currentPos.x;
                let newY = currentPos.y;
                
                if (keys.ArrowUp || keys.w) newY -= speed;
                if (keys.ArrowDown || keys.s) newY += speed;
                if (keys.ArrowLeft || keys.a) newX -= speed;
                if (keys.ArrowRight || keys.d) newX += speed;
                
                // 위치가 변경되었으면 직접 위치 업데이트
                if (newX !== currentPos.x || newY !== currentPos.y) {
                    Body.setPosition(playerRef.current, { x: newX, y: newY });
                    setPlayerPosition({ x: newX, y: newY }); // 상태 업데이트 추가
                    setDebugLog(`위치: x=${Math.round(newX)}, y=${Math.round(newY)}`);
                    checkProximityToLocations(newX, newY);
                    checkAnimalProximity(newX, newY); // 동물 확인 추가
                }
                
                // 트리거 충돌 감지 개선
                triggersRef.current.forEach((trigger) => {
                    if (Matter.Bounds.contains(trigger.bounds, playerRef.current.position)) {
                        switch(trigger.label) {
                            case "enterSingaporeanRoom":
                                setCurrentLocation("singaporeanRoom");
                                break;
                            case "enterBotanicLesson":
                                setCurrentLocation("botanicLesson");
                                break;
                            case "enterMysteryRoom":
                                setCurrentLocation("mysteryRoom");
                                break;
                            case "enterLaneToFinish":
                                setCurrentLocation("laneToFinish");
                                break;
                            case "returnToHub":
                                setCurrentLocation("hub");
                                break;
                        }
                    }
                });

                // 모든 테스트를 완료했고, 4개의 아이템을 모두 수집했는지 확인
                const allLocations = ["singaporeanRoom", "botanicLesson", "mysteryRoom", "laneToFinish"];
                if (currentLocation === "hub" && 
                    allLocations.every(loc => completedTests.includes(loc)) && 
                    inventory.length >= 4) {
                    // 엔딩 시나리오로 이동
                    setGameState("gameOver");
                }
            }
            
            rafRef.current = requestAnimationFrame(gameLoop);
        };
        
        // 게임 루프 시작 - 이것만 유지
        rafRef.current = requestAnimationFrame(gameLoop);
        
        // 정리 함수
        return () => {
            Matter.Render.stop(render);
            Matter.World.clear(engine.world, false);
            Matter.Engine.clear(engine);
            cancelAnimationFrame(rafRef.current);
        };
    }, [gameState]);

    // 위치 변경 시 장면 업데이트
    useEffect(() => {
        // 위치가 변경되면 장애물/트리거 업데이트
        if (engineRef.current && playerRef.current && isInitializedRef.current) {
            // 기존 장애물과 트리거 제거
            obstaclesRef.current.forEach((obs) => World.remove(engineRef.current.world, obs));
            triggersRef.current.forEach((trig) => World.remove(engineRef.current.world, trig));
            obstaclesRef.current = [];
            triggersRef.current = [];
            
            // 새 장애물/트리거 추가
            locationData?.obstacles?.forEach((obs) => {
                let body;
                if (obs.type === "singaporeanRoom" || obs.type === "botanicLesson" || 
                    obs.type === "mysteryRoom" || obs.type === "laneToFinish") {
                  body = Bodies.rectangle(obs.x, obs.y, obs.width, obs.height, { 
                    isStatic: true, 
                    isSensor: true,
                    render: { fillStyle: "transparent", opacity: 0 }  // 완전히 투명하게 설정
                  });
                } else if (obs.type === "tree") {
                  body = Bodies.circle(obs.x, obs.y, obs.radius, { 
                    isStatic: true, 
                    render: { fillStyle: "#2e5d28", opacity: 0.7 }  // 더 자연스러운 나무 색상
                  });
                } else {
                  body = Bodies.rectangle(obs.x, obs.y, obs.width, obs.height, { 
                    isStatic: true, 
                    render: { fillStyle: "transparent", opacity: 0 }  // 완전히 투명하게 설정
                  });
                }
                obstaclesRef.current.push(body);
                World.add(engineRef.current.world, body);
            });
            
            locationData?.triggers?.forEach((trigger) => {
                const triggerBody = Bodies.rectangle(trigger.x, trigger.y, trigger.width, trigger.height, {
                    isStatic: true,
                    isSensor: true,
                    label: trigger.action,
                    render: { 
                      fillStyle: "transparent",  // 완전히 투명하게 변경
                      opacity: 0
                    }
                });
                triggersRef.current.push(triggerBody);
                World.add(engineRef.current.world, triggerBody);
            });
            
            // 위치 초기화는 장소가 바뀔 때만
            if (currentLocation !== "hub") {
              Body.setPosition(playerRef.current, { x: 500, y: 400 });
              Body.setVelocity(playerRef.current, { x: 0, y: 0 });
              
              // 랜덤 텍스트 설정
              const randomIndex = Math.floor(Math.random() * 100);
              setCurrentChunkIndex(randomIndex);
              setRandomTextChunk(chunks[randomIndex].text);
            }
        }
    }, [currentLocation]);
    // 키보드 입력 수정 - 보다 반응성 좋게 개선
useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key;
    if (key in movementKeysRef.current) {
      movementKeysRef.current[key] = true;
      e.preventDefault(); // 브라우저 기본 동작 방지
    }
  };
  
  const handleKeyUp = (e) => {
    const key = e.key;
    if (key in movementKeysRef.current) {
      movementKeysRef.current[key] = false;
      e.preventDefault(); // 브라우저 기본 동작 방지
    }
  };
  
  // 확인용 로그
  console.log("키보드 이벤트 리스너 등록됨");
  
  // 이벤트 리스너 등록
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  
  // 정리 함수
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  };
}, []);
    // NPC 답변/퀴즈 처리 함수 수정
const handleAnswer = (answer) => {
  if (!locationData?.npc) return;
  
  // For writing exercises, always consider it "correct" but provide feedback
  const isCorrect = locationData.npc.writing 
    ? true 
    : (locationData.npc.quiz
        ? answer === locationData.npc.quiz.correctAnswer
        : answer === locationData.npc.correctAnswer);
  
  if (isCorrect) {
    // Update score and XP
    setScore((prev) => prev + 10);
    setXp((prev) => {
      const newXp = prev + 10;
      if (newXp >= level * 20) setLevel((prev) => prev + 1);
      return newXp;
    });
    
    // Special handling for hub welcome message
    if (currentLocation === "hub" && answer === "I'm ready to help!") {
      setWelcomeDismissed(true);
      setDebugLog("Let's start exploring Singapore's botanical treasures!");
      return; // Exit early, no location change needed
    }
    
    // 장소별 다른 문해력 요소 강조
    let literacySkillImproved = "";
    switch(currentLocation) {
      case "singaporeanRoom":
        literacySkillImproved = "Cultural Literacy: Understanding symbolism in historical context";
        break;
      case "botanicLesson": 
        literacySkillImproved = "Scientific Literacy: Analyzing and synthesizing botanical knowledge";
        break;
      case "mysteryRoom":
        literacySkillImproved = "Visual Literacy: Identifying and categorizing visual information";
        break;
      case "laneToFinish":
        literacySkillImproved = "Historical Literacy: Contextualizing events in time";
        break;
    }
    
    // 문해력 향상 알림 표시
    if (literacySkillImproved) {
      setDebugLog(`${literacySkillImproved} improved! +10 XP`);
    }
    
    // Special handling for writing exercise
    if (locationData.npc.writing) {
      // Custom reward message for the botanic lesson
      setDebugLog("Scientific writing skills improved! Your analysis shows deep understanding.");
      
      // Add special writing score based on quality
      const writingQuality = Math.min(10, Math.max(5, Math.floor(answer.length / 20)));
      setScore((prev) => prev + writingQuality);
      
      // Short delay before showing success
      setTimeout(() => {
        const { nextLocation, reward, message } = locationData.npc.onSuccess || {};
        
        // Add location to completed tests
        if (!completedTests.includes(currentLocation)) {
          setCompletedTests((prev) => [...prev, currentLocation]);
        }
        
        // Add reward to inventory with special animation
        if (reward) {
          setInventory((prev) => [...new Set([...prev, reward])]);
          setShowRewardAnimation(true);
          
          setTimeout(() => setShowRewardAnimation(false), 1500);
        }
        
        // Show success message
        setDebugLog(message || "Thank you for your thoughtful response!");
        
        // Close NPC modal
        setShowNPCModal(false);
        
        // Return to the specified location
        setTimeout(() => {
          if (nextLocation) setCurrentLocation(nextLocation);
        }, 1000);
      }, 1000);
    }
    else {
      // Handle regular quiz success
      const { nextLocation, reward, message } = locationData.npc.onSuccess || {};
      
      // Add location to completed tests
      if (!completedTests.includes(currentLocation)) {
        setCompletedTests((prev) => [...prev, currentLocation]);
      }
      
      // Add reward to inventory
      if (reward) {
        setInventory((prev) => [...new Set([...prev, reward])]);
        setShowRewardAnimation(true);
        
        setTimeout(() => setShowRewardAnimation(false), 1000);
      }
      
      // Show success message if available
      if (message) {
        setDebugLog(message);
      }
      
      // Close NPC modal
      setShowNPCModal(false);
      
      // Return to hub after a short delay
      setTimeout(() => {
        if (nextLocation) setCurrentLocation(nextLocation);
      }, 1000);
    }
  } else {
    // 틀렸을 때 문해력 유형에 따른 다른 힌트 제공
    let hint = "";
    switch(currentLocation) {
      case "singaporeanRoom":
        hint = "Think about how flowers might have been used for secret communication during wartime.";
        break;
      case "botanicLesson": 
        hint = "Consider both the scientific and cultural value of ancient trees.";
        break;
      case "mysteryRoom":
        hint = "Look at the geographical origins of these plants - which one isn't from Southeast Asia?";
        break;
      case "laneToFinish":
        hint = "The Gardens were established during the British colonial period, before Singapore's independence.";
        break;
    }
    
    alert(`Incorrect! ${hint} Please try again.`);
    setScore((prev) => Math.max(0, prev - 5));
  }
};
// 장면 업데이트 함수를 컴포넌트 내부에 독립적인 함수로 정의
const updateSceneObjects = (engine) => {
    if (!engineRef.current) return;
    
    const currentEngine = engine || engineRef.current;
    
    // 기존 장애물과 트리거 제거
    obstaclesRef.current.forEach((obs) => World.remove(currentEngine.world, obs));
    triggersRef.current.forEach((trig) => World.remove(currentEngine.world, trig));
    // 기존 장식과 건물 제거
    decorationsRef.current?.forEach((deco) => World.remove(currentEngine.world, deco));
    buildingsRef.current?.forEach((building) => World.remove(currentEngine.world, building));
    
    obstaclesRef.current = [];
    triggersRef.current = [];
    decorationsRef.current = [];
    buildingsRef.current = [];
    
    // 허브에 있을 때만 장식 추가
    if (currentLocation === "hub") {
      decorationsRef.current = createGardenObjects(currentEngine);
    } else {
      // 다른 장소에 있을 때는 건물 추가
      buildingsRef.current = createLocationBuildings(currentEngine, currentLocation);
    }
    
    // 장애물과 트리거 추가
    locationData?.obstacles?.forEach((obs) => {
      let body;
      if (obs.type === "singaporeanRoom" || obs.type === "botanicLesson" || 
          obs.type === "mysteryRoom" || obs.type === "laneToFinish") {
        body = Bodies.rectangle(obs.x, obs.y, obs.width, obs.height, { 
          isStatic: true, 
          isSensor: true,
          render: { fillStyle: "transparent", opacity: 0 }  // 완전히 투명하게 설정
        });
      } else if (obs.type === "tree") {
        body = Bodies.circle(obs.x, obs.y, obs.radius, { 
          isStatic: true, 
          render: { fillStyle: "#2e5d28", opacity: 0.7 }  // 더 자연스러운 나무 색상
        });
      } else {
        body = Bodies.rectangle(obs.x, obs.y, obs.width, obs.height, { 
          isStatic: true, 
          render: { fillStyle: "transparent", opacity: 0 }  // 완전히 투명하게 설정
        });
      }
      obstaclesRef.current.push(body);
      World.add(currentEngine.world, body);
    });
    
    locationData?.triggers?.forEach((trigger) => {
      const triggerBody = Bodies.rectangle(trigger.x, trigger.y, trigger.width, trigger.height, {
        isStatic: true,
        isSensor: true,
        label: trigger.action,
        render: { 
          fillStyle: "transparent",  // 완전히 투명하게 변경
          opacity: 0
        }
      });
      triggersRef.current.push(triggerBody);
      World.add(currentEngine.world, triggerBody);
    });
    
    // 동물 렌더링 정보만 저장 (물리 엔진에 추가하지 않음)
    if (currentLocation === "hub" && decorationsRef.current?.animalData) {
      animalsRef.current = decorationsRef.current.animalData;
    } else {
      animalsRef.current = [];
    }
};
// 1. 클릭으로 방문할 수 있는 임시 함수 추가
const visitRoom = (roomId) => {
  console.log(`직접 방문: ${roomId}`);
  setCurrentLocation(roomId);
  setDebugLog(`이동: ${roomId}`);
  
  // 위치 변경 시 NPC 모달 표시
  if (roomId !== "hub") {
    setShowNPCModal(true);
  }
  
  switch(roomId) {
    case "singaporeanRoom":
      setCurrentQuest("Learn about Singaporean orchids and their cultural significance");
      break;
    case "botanicLesson":
      setCurrentQuest("Explore Singapore's heritage trees and conservation efforts");
      break;
    case "mysteryRoom":
      setCurrentQuest("Discover Singapore's botanical history through preserved specimens");
      break;
    case "laneToFinish":
      setCurrentQuest("Test your knowledge of Singapore Botanic Gardens history");
      break;
    default:
      setCurrentQuest("Choose an area to explore");
  }
};

// 2. 디버그 옵션 추가 (문제 진단을 위함)
const resetPlayer = () => {
  if (playerRef.current) {
    Body.setPosition(playerRef.current, { x: 500, y: 400 });
    Body.setVelocity(playerRef.current, { x: 0, y: 0 });
    setDebugLog("Player position reset");
  }
};
// Writing evaluation function with enhanced feedback for botanical knowledge
const evaluateWriting = (text) => {
  const feedback = [];

  // Content-related feedback
  if (text.length < 80) {
    feedback.push("Your response is quite brief. Try adding more specific examples about heritage trees.");
  } else if (text.length > 200) {
    feedback.push("Excellent detail! Your comprehensive response shows deep understanding of botanical heritage.");
  }

  const treeKeywords = ["rings", "climate", "dna", "history", "biodiversity", "conservation", "growth", "carbon", "ecosystem", "adaptation"];
  const keywordsFound = treeKeywords.filter(word => text.toLowerCase().includes(word));
  
  if (keywordsFound.length === 0) {
    feedback.push("Consider including scientific concepts like tree rings, DNA evidence, or climate history in your response.");
  } else if (keywordsFound.length >= 3) {
    feedback.push("Excellent botanical knowledge! You've incorporated key scientific concepts: " + keywordsFound.join(", ") + ".");
  } else {
    feedback.push("Good start! You've mentioned " + keywordsFound.join(", ") + ". Heritage trees also offer insights into evolutionary adaptation and climate change.");
  }

  // Structure-related feedback
  const paragraphCount = text.split(/\n\n+/).length;
  if (paragraphCount < 2) {
    feedback.push("Consider organizing your thoughts into multiple paragraphs, perhaps separating scientific value from historical significance.");
  } else {
    feedback.push("Your well-structured paragraphs effectively separate different aspects of heritage tree importance.");
  }

  // Overall assessment
  let overallFeedback = "";
  if (keywordsFound.length >= 4 && text.length > 150) {
    overallFeedback = "Outstanding botanical analysis! Mr. Tan is visibly impressed with your understanding of heritage trees' scientific importance.";
  } else if (keywordsFound.length >= 2 || text.length > 100) {
    overallFeedback = "Well done! Mr. Tan appreciates your insights into these living botanical treasures.";
  } else {
    overallFeedback = "Thank you for your response. With more specific botanical details, you'd impress even the most dedicated arborists.";
  }
  
  feedback.push(overallFeedback);
  
  return feedback;
};

// These state variables are already defined above - using existing ones

// 식물원 쓰기 버튼 클릭 핸들러
const handleWritingSubmit = () => {
  if (writingInput.trim().length > 20) {
    const feedback = evaluateWriting(writingInput);
    setCurrentFeedback(feedback);
    setShowFeedbackModal(true);
  } else {
    alert("Please write a more detailed response (at least 20 characters)");
  }
};

// 모달 닫기 핸들러
const closeFeedbackModal = () => {
  setShowFeedbackModal(false);
  handleAnswer(writingInput);
  setWritingInput("");
};
// 게임 환경에 동물과 식물 오브젝트 추가하기
const createGardenObjects = (engine) => {
  const gardenObjects = [];
  
  // 동물 오브젝트 (물리 엔진에 등록할 필요 없이 시각적으로만 표시)
  const animals = [
    { 
      type: "butterfly", 
      x: 120, 
      y: 150, 
      width: 30, 
      height: 30, 
      color: "#FFA500", 
      label: "Painted Jezebel",
      message: "Hello! I'm a Painted Jezebel butterfly. We're native to Singapore and help pollinate many beautiful flowers!",
      fact: "Did you know? Singapore has over 280 butterfly species!"
    },
    { 
      type: "bird", 
      x: 850, 
      y: 230, 
      width: 35, 
      height: 25, 
      color: "#4169E1", 
      label: "Blue-throated Bee-eater",
      message: "Greetings! I'm a Blue-throated Bee-eater. I catch insects in mid-air!",
      fact: "Fun fact: We migrate from northern Asia to Singapore during winter months."
    },
    { 
      type: "lizard", 
      x: 400, 
      y: 700, 
      width: 40, 
      height: 15, 
      color: "#228B22", 
      label: "Green Crested Lizard",
      message: "*blinks* Oh, hello there! I'm a Green Crested Lizard, one of Singapore's native reptiles.",
      fact: "Cool fact: My bright colors help me blend perfectly with tropical foliage!"
    },
    { 
      type: "squirrel", 
      x: 750, 
      y: 650, 
      width: 30, 
      height: 25, 
      color: "#8B4513", 
      label: "Plantain Squirrel",
      message: "Hi there! I'm a Plantain Squirrel. Watch me jump between trees in the gardens!",
      fact: "Botanical note: We help disperse seeds throughout the gardens, planting future trees!"
    },
  ];
  
  // 식물과 구조물 (물리적 장애물로 등록)
  const plants = [
    // 장식용 나무들
    { type: "tree", x: 80, y: 80, radius: 25, color: "#006400", isStatic: true, label: "Durian Tree" },
    { type: "tree", x: 920, y: 80, radius: 25, color: "#006400", isStatic: true, label: "Tembusu Tree" },
    { type: "tree", x: 80, y: 720, radius: 25, color: "#228B22", isStatic: true, label: "Rambutan Tree" },
    { type: "tree", x: 920, y: 720, radius: 25, color: "#228B22", isStatic: true, label: "Angsana Tree" },
    
    // 꽃밭과 덤불
    { type: "flowerbed", x: 150, y: 400, width: 60, height: 60, color: "#FF69B4", isStatic: true, label: "Orchid Display" },
    { type: "flowerbed", x: 850, y: 400, width: 60, height: 60, color: "#FF1493", isStatic: true, label: "Heliconia Garden" },
    { type: "flowerbed", x: 500, y: 150, width: 80, height: 40, color: "#9932CC", isStatic: true, label: "Vanda Miss Joaquim" },
    { type: "flowerbed", x: 500, y: 650, width: 80, height: 40, color: "#FF4500", isStatic: true, label: "Tropical Lilies" },
    
    // 허브 중앙 연못
    { type: "pond", x: 500, y: 400, radius: 50, color: "#87CEFA", isStatic: true, isSensor: true, label: "Swan Lake" },
    
    // 작은 정자들과 벤치
    { type: "gazebo", x: 250, y: 350, width: 30, height: 30, color: "#A0522D", isStatic: true, label: "Heritage Gazebo" },
    { type: "gazebo", x: 750, y: 350, width: 30, height: 30, color: "#A0522D", isStatic: true, label: "Bandstand" },
    { type: "bench", x: 200, y: 500, width: 50, height: 15, color: "#8B4513", isStatic: true, label: "Wooden Bench" },
    { type: "bench", x: 800, y: 500, width: 50, height: 15, color: "#8B4513", isStatic: true, label: "Wooden Bench" },
    
    // 연결 통로
    { type: "path", x: 500, y: 300, width: 100, height: 8, color: "#D2B48C", isStatic: true, label: "Heritage Trail" },
    { type: "path", x: 500, y: 500, width: 100, height: 8, color: "#D2B48C", isStatic: true, label: "Heritage Trail" },
    { type: "path", x: 400, y: 400, width: 8, height: 100, color: "#D2B48C", isStatic: true, label: "Heritage Trail" },
    { type: "path", x: 600, y: 400, width: 8, height: 100, color: "#D2B48C", isStatic: true, label: "Heritage Trail" },
  ];
  
  // 동물은 Physics 엔진에 넣지 않고 시각적으로만 렌더링하기 위해 별도 저장
  gardenObjects.animalData = animals;
  
  // 식물과 구조물은 물리적 객체로 추가
  plants.forEach(plant => {
    let body;
    
    if (plant.radius) { // 원형 객체 (나무, 연못 등)
      body = Bodies.circle(plant.x, plant.y, plant.radius, {
        isStatic: plant.isStatic,
        isSensor: !!plant.isSensor,
        render: { fillStyle: plant.color }
      });
    } else { // 사각형 객체 (꽃밭, 정자, 벤치 등)
      body = Bodies.rectangle(plant.x, plant.y, plant.width, plant.height, {
        isStatic: plant.isStatic,
        isSensor: !!plant.isSensor,
        render: { fillStyle: plant.color }
      });
    }
    
    body.label = plant.label || plant.type;
    gardenObjects.push(body);
    // engine에 추가
    World.add(engine.world, body);
  });
  
  return gardenObjects;
};
// 각 장소 건물 디자인 추가
const createLocationBuildings = (engine, currentLocation) => {
  // 이전 오브젝트 제거
  const buildingObjects = [];
  
  if (currentLocation === "hub") {
    return [];
  }
  
  let building;
  
  // 건물 유형에 따라 다른 디자인 적용
  switch (currentLocation) {
    case "singaporeanRoom":
      // 오키드리움 (돔 모양 건물)
      building = [
        // 메인 돔 (중앙 원형 구조물)
        Bodies.circle(500, 300, 120, {
          isStatic: true,
          isSensor: true,
          render: { fillStyle: "#E0FFFF", opacity: 0.7 }
        }),
        
        // 베이스 구조 (직사각형 건물)
        Bodies.rectangle(500, 400, 300, 180, {
          isStatic: true,
          isSensor: true,
          render: { fillStyle: "#E6E6FA", opacity: 0.7 }
        }),
        
        // 오키드 전시대 (작은 테이블)
        Bodies.rectangle(400, 450, 60, 40, {
          isStatic: true,
          render: { fillStyle: "#DDA0DD" }
        }),
        Bodies.rectangle(600, 450, 60, 40, {
          isStatic: true,
          render: { fillStyle: "#DDA0DD" }
        }),
        
        // 장식용 난초들
        Bodies.circle(400, 450, 10, {
          isStatic: true,
          render: { fillStyle: "#FF69B4" }
        }),
        Bodies.circle(600, 450, 10, {
          isStatic: true,
          render: { fillStyle: "#DA70D6" }
        }),
        Bodies.circle(500, 500, 10, {
          isStatic: true,
          render: { fillStyle: "#9370DB" }
        })
      ];
      break;
      
    case "botanicLesson":
      // 유산 나무 숲 (야외 공간)
      building = [
        // 중앙 거대 나무
        Bodies.circle(500, 350, 70, {
          isStatic: true,
          render: { fillStyle: "#556B2F" }
        }),
        
        // 보조 나무들
        Bodies.circle(400, 300, 40, {
          isStatic: true,
          render: { fillStyle: "#6B8E23" }
        }),
        Bodies.circle(600, 300, 40, {
          isStatic: true,
          render: { fillStyle: "#6B8E23" }
        }),
        Bodies.circle(350, 450, 30, {
          isStatic: true,
          render: { fillStyle: "#8FBC8F" }
        }),
        Bodies.circle(650, 450, 30, {
          isStatic: true,
          render: { fillStyle: "#8FBC8F" }
        }),
        
        // 나무 주변 경계석
        Bodies.rectangle(500, 440, 180, 10, {
          isStatic: true,
          render: { fillStyle: "#A9A9A9" }
        }),
        
        // 벤치
        Bodies.rectangle(400, 500, 80, 20, {
          isStatic: true,
          render: { fillStyle: "#8B4513" }
        }),
        Bodies.rectangle(600, 500, 80, 20, {
          isStatic: true,
          render: { fillStyle: "#8B4513" }
        })
      ];
      break;
      
    case "mysteryRoom":
      // 식민지 식물표본관 (고전적 건물)
      building = [
        // 메인 건물
        Bodies.rectangle(500, 350, 300, 200, {
          isStatic: true,
          isSensor: true,
          render: { fillStyle: "#F5DEB3", opacity: 0.7 }
        }),
        
        // 지붕
        Bodies.polygon(500, 250, 3, 100, {
          isStatic: true,
          isSensor: true,
          render: { fillStyle: "#CD853F", opacity: 0.8 }
        }),
        
        // 기둥
        Bodies.rectangle(400, 400, 20, 240, {
          isStatic: true,
          render: { fillStyle: "#D2B48C" }
        }),
        Bodies.rectangle(600, 400, 20, 240, {
          isStatic: true,
          render: { fillStyle: "#D2B48C" }
        }),
        
        // 표본 전시대
        Bodies.rectangle(450, 380, 80, 30, {
          isStatic: true,
          render: { fillStyle: "#A0522D" }
        }),
        Bodies.rectangle(550, 380, 80, 30, {
          isStatic: true,
          render: { fillStyle: "#A0522D" }
        }),
        
        // 표본 유리병
        Bodies.rectangle(450, 365, 15, 15, {
          isStatic: true,
          render: { fillStyle: "#E0FFFF" }
        }),
        Bodies.rectangle(480, 365, 15, 15, {
          isStatic: true,
          render: { fillStyle: "#E0FFFF" }
        }),
        Bodies.rectangle(550, 365, 15, 15, {
          isStatic: true,
          render: { fillStyle: "#E0FFFF" }
        }),
        Bodies.rectangle(580, 365, 15, 15, {
          isStatic: true,
          render: { fillStyle: "#E0FFFF" }
        })
      ];
      break;
      
    case "laneToFinish":
      // 해시계 정원 (원형 야외 공간)
      building = [
        // 중앙 해시계
        Bodies.circle(500, 400, 40, {
          isStatic: true,
          render: { fillStyle: "#B8860B" }
        }),
        
        // 해시계 중앙 기둥
        Bodies.rectangle(500, 400, 10, 30, {
          isStatic: true,
          render: { fillStyle: "#8B4513" }
        }),
        
        // 시간 마커 (12개)
        ...Array(12).fill().map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const radius = 80;
          return Bodies.circle(
            500 + radius * Math.cos(angle),
            400 + radius * Math.sin(angle),
            8,
            {
              isStatic: true,
              render: { fillStyle: "#D2B48C" }
            }
          );
        }),
        
        // 원형 경계석
        Bodies.circle(500, 400, 100, {
          isStatic: true,
          isSensor: true,
          render: { 
            fillStyle: "transparent", 
            strokeStyle: "#A9A9A9", 
            lineWidth: 15 
          }
        }),
        
        // 방문자 벤치 (4개 방향)
        Bodies.rectangle(500, 520, 80, 20, {
          isStatic: true,
          render: { fillStyle: "#8B4513" }
        }),
        Bodies.rectangle(500, 280, 80, 20, {
          isStatic: true,
          render: { fillStyle: "#8B4513" }
        }),
        Bodies.rectangle(380, 400, 20, 80, {
          isStatic: true,
          render: { fillStyle: "#8B4513" }
        }),
        Bodies.rectangle(620, 400, 20, 80, {
          isStatic: true,
          render: { fillStyle: "#8B4513" }
        })
      ];
      break;
      
    default:
      building = [];
  }
  
  // 객체 추가
  building.forEach(body => {
    buildingObjects.push(body);
    World.add(engine.world, body);
  });
  
  return buildingObjects;
};
// 동물 애니메이션을 위한 refs 및 상태 추가
// 동물 애니메이션을 위한 refs 및 상태 추가
useEffect(() => {
  // 5초마다 동물 위치 업데이트
  const animalAnimationInterval = setInterval(() => {
    if (currentLocation === "hub" && animalsRef.current?.length > 0) {
      const newMovements = {...animalMovements};
      
      animalsRef.current.forEach((animal, index) => {
        // 작은 랜덤 이동 적용
        const moveX = Math.random() * 30 - 15; // -15 ~ 15
        const moveY = Math.random() * 30 - 15; // -15 ~ 15
        
        // 새 위치가 화면 안에 있는지 확인
        const newX = Math.min(950, Math.max(50, animal.x + moveX));
        const newY = Math.min(750, Math.max(50, animal.y + moveY));
        
        // 업데이트된 좌표 저장
        newMovements[index] = { x: newX, y: newY };
        
        // 원본 데이터도 갱신 (다음 움직임을 위해)
        animal.x = newX;
        animal.y = newY;
      });
      
      setAnimalMovements(newMovements);
    }
  }, 5000);
  
  return () => clearInterval(animalAnimationInterval);
}, [currentLocation, animalMovements]);

// 방문 감지 및 처리 함수
const checkProximityToLocations = (playerX, playerY) => {
  if (currentLocation !== "hub") return;
  
  const locations = [
    { id: "singaporeanRoom", x: 300, y: 200, radius: 80 },
    { id: "botanicLesson", x: 700, y: 200, radius: 80 },
    { id: "mysteryRoom", x: 300, y: 600, radius: 80 },
    { id: "laneToFinish", x: 700, y: 600, radius: 80 }
  ];
  
  // 플레이어가 특정 장소 근처에 있는지 확인
  for (const loc of locations) {
    const distance = Math.sqrt(
      Math.pow(playerX - loc.x, 2) + Math.pow(playerY - loc.y, 2)
    );
    
    if (distance < loc.radius) {
      // 근처에 있으면 해당 장소로 이동
      visitRoom(loc.id);
      break;
    }
  }
};

// 플레이어와 동물 간의 거리 확인 함수
const checkAnimalProximity = (playerX, playerY) => {
  if (currentLocation !== "hub" || !animalsRef.current) return;
  
  let foundAnimal = null;
  const interactionDistance = 50; // 상호작용 거리 설정
  
  for (const animal of animalsRef.current) {
    const animalPos = animalMovements[animalsRef.current.indexOf(animal)] || animal;
    const distance = Math.sqrt(
      Math.pow(playerX - animalPos.x, 2) + 
      Math.pow(playerY - animalPos.y, 2)
    );
    
    if (distance < interactionDistance) {
      foundAnimal = animal;
      break;
    }
  }
  
  // 이전과 다른 동물과 상호작용하는 경우만 상태 업데이트
  if (foundAnimal !== interactingAnimal) {
    setInteractingAnimal(foundAnimal);
    
    if (foundAnimal) {
      // 동물을 만나면 점수 획득
      setScore(prev => prev + 2);
      setDebugLog(`You met ${foundAnimal.label}!`);
    }
  }
};

// 장소에 들어갔을 때 NPC 대화 모달 표시하는 컴포넌트 추가
const NPCModal = ({ locationData, onAnswerSubmit, onWritingSubmit, writingInput, setWritingInput, randomTextChunk }) => {
  const npc = locationData?.npc;
  
  if (!npc) return null;
  
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-lg z-50 w-[min(92vw,600px)] max-h-[80vh] overflow-y-auto">
      <div className="flex items-start">
        <div className="text-4xl mr-4">{npc.avatar}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold">{npc.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{npc.title}</p>
          
          <p className="mb-4">{npc.text}</p>
          
          {randomTextChunk && (
            <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200 italic text-sm">
              "{randomTextChunk}"
              <div className="mt-1 text-xs text-gray-500">— Charles Darwin, "The Variation of Animals and Plants under Domestication"</div>
            </div>
          )}
          
          {/* 다양한 유형의 질문 처리 */}
          {npc.quiz ? (
            <div className="space-y-3">
              <h4 className="font-bold">{npc.quiz.question}</h4>
              {npc.quiz.options.map((option) => (
                <button
                  key={option}
                  onClick={() => onAnswerSubmit(option)}
                  className="block w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded mb-2 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : npc.writing ? (
            <div className="space-y-3">
              <textarea
                value={writingInput}
                onChange={(e) => setWritingInput(e.target.value)}
                placeholder="Share your thoughts on the importance of heritage trees in botanical research..."
                className="w-full p-3 border border-green-300 rounded h-40 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              <button
                onClick={() => onWritingSubmit(writingInput)}
                className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 transition-colors"
              >
                Submit Response
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {npc.options.map((option) => (
                <button
                  key={option}
                  onClick={() => onAnswerSubmit(option)}
                  className="block w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded mb-2 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 모든 중복 return 문을 제거하고 아래 return 문만 남깁니다
return (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
    {/* 실제 게임 영역 - 중앙 배치 및 크기 제한 */}
    <div className="relative w-[1000px] h-[800px] overflow-hidden shadow-2xl rounded-lg">
      {/* 배경 이미지 */}
      <div 
          className="absolute inset-0 z-0" 
          style={backgroundImage 
              ? { 
                  backgroundImage: `url(${backgroundImage.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.95)"
              } 
              : {
                  backgroundImage: "linear-gradient(135deg, #c9f3c0, #8ed184, #b4e2a7, #c9f3c0)",
                  backgroundSize: "cover"
              }
          }
      />
      
      {/* 게임 컨테이너 */}
      <div className="relative z-10 w-full h-full">
          {/* 게임 캔버스 */}
          <div ref={canvasRef} className="w-full h-full" />
          
          {/* 동물 렌더링 */}
          {currentLocation === "hub" && animalsRef.current?.length > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              {animalsRef.current.map((animal, index) => {
                const position = animalMovements[index] || animal;
                const animalEmojis = {
                  butterfly: "🦋",
                  bird: "🐦",
                  lizard: "🦎",
                  squirrel: "🐿️"
                };
                
                return (
                  <div 
                    key={`animal-${index}`}
                    className="absolute transition-all duration-1000 flex items-center justify-center"
                    style={{
                      left: position.x - 15,
                      top: position.y - 15,
                      width: animal.width,
                      height: animal.height,
                      fontSize: animal.width * 0.75
                    }}
                    title={animal.label}
                  >
                    {animalEmojis[animal.type] || "🐾"}
                  </div>
                );
              })}
            </div>
          )}
          
          {/* 게임 UI 요소들 */}
          {currentLocation === "hub" && (
            <>
              {/* 가시적인 색상 블록 대신 버튼 형태로 변경 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-8 z-20">
                <button
                  onClick={() => visitRoom("singaporeanRoom")} 
                  className="w-40 h-40 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center p-4"
                >
                  <span className="text-4xl mb-2">🌺</span>
                  <h3 className="text-lg font-bold text-red-800">Orchidarium</h3>
                  <p className="text-xs text-red-600">Explore Singapore's orchids</p>
                </button>
                
                <button
                  onClick={() => visitRoom("botanicLesson")} 
                  className="w-40 h-40 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center p-4"
                >
                  <span className="text-4xl mb-2">🌳</span>
                  <h3 className="text-lg font-bold text-green-800">Heritage Trees</h3>
                  <p className="text-xs text-green-600">Discover ancient trees</p>
                </button>
                
                <button
                  onClick={() => visitRoom("mysteryRoom")} 
                  className="w-40 h-40 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center p-4"
                >
                  <span className="text-4xl mb-2">🔬</span>
                  <h3 className="text-lg font-bold text-purple-800">Herbarium</h3>
                  <p className="text-xs text-purple-600">Study plant specimens</p>
                </button>
                
                <button
                  onClick={() => visitRoom("laneToFinish")} 
                  className="w-40 h-40 bg-white bg-opacity-80 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center p-4"
                >
                  <span className="text-4xl mb-2">⏱️</span>
                  <h3 className="text-lg font-bold text-amber-800">Sundial Garden</h3>
                  <p className="text-xs text-amber-600">Learn about timekeeping</p>
                </button>
              </div>
              
              {/* 정보 간판은 유지 */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 border-2 border-green-800 rounded-lg p-3 shadow-lg z-50">
                <h2 className="text-xl text-green-800 font-bold">Singapore Botanic Gardens</h2>
                <p className="text-sm text-green-700">Visit all four locations to solve the botanical mystery</p>
              </div>
            </>
          )}
      </div>
      
      {/* 나머지 UI 요소들 */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded-lg z-50">
        <div className="font-bold">Score: {score} | XP: {xp} | Level: {level}</div>
        <div className="text-sm">Current Quest: {currentQuest}</div>
        <div className="flex mt-1 space-x-2">
            {inventory.map((item, idx) => (
                <div key={idx} className="h-8 w-8 bg-yellow-100 rounded flex items-center justify-center" title={item}>
                    {item === "glass_slide" && "🔍"}
                    {item === "wax_seal" && "🔖"}
                    {item === "pressed_leaf" && "🍃"}
                    {item === "bronze_key" && "🗝️"}
                </div>
            ))}
        </div>
      </div>
      
      {/* 다른 장소에서 허브로 돌아가는 버튼 */}
      {currentLocation !== "hub" && (
          <button
              onClick={() => setCurrentLocation("hub")}
              className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors z-50"
          >
              Return to Garden Map
          </button>
      )}

      {/* 로그 메시지 */}
      <div className="absolute bottom-16 left-4 bg-white bg-opacity-80 p-2 rounded-lg max-w-md z-50">
          <div className="text-sm italic">{debugLog}</div>
      </div>

      {/* 게임 진행 상황 표시 - 허브에 도달하면 표시 */}
      {currentLocation === "hub" && completedTests.length > 0 && (
        <div className="absolute top-20 right-4 bg-white p-3 rounded shadow-lg z-30">
          <h3 className="font-bold text-green-700 mb-2">Quest Progress:</h3>
          <ul className="text-left">
            <li className="flex items-center">
              <div className="w-3 h-3 bg-red-500 mr-2"></div>
              <span>Orchidarium: {completedTests.includes("singaporeanRoom") ? "✅" : "⬜️"}</span>
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-green-500 mr-2"></div>
              <span>Heritage Trees: {completedTests.includes("botanicLesson") ? "✅" : "⬜️"}</span>
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 mr-2"></div>
              <span>Herbarium: {completedTests.includes("mysteryRoom") ? "✅" : "⬜️"}</span>
            </li>
            <li className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 mr-2"></div>
              <span>Sundial: {completedTests.includes("laneToFinish") ? "✅" : "⬜️"}</span>
            </li>
          </ul>
          {completedTests.length >= 4 && (
            <div className="mt-2 p-2 bg-green-100 text-green-800 rounded text-sm animate-pulse">
              All locations complete! The mystery will soon be solved...
            </div>
          )}
        </div>
      )}

      {/* 게임 종료 시 표시할 엔딩 시퀀스 */}
      {gameState === "gameOver" && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl max-h-[90vh] overflow-y-auto text-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 rounded-t-lg"></div>
            
            <h1 className="text-3xl font-bold text-green-700 mb-4 mt-2">The Botanical Mystery Solved!</h1>
            <p className="text-xl mb-6">You've uncovered Singapore's greatest botanical secret!</p>
            
            <div className="mb-6 bg-green-50 p-4 rounded border border-green-200">
              <p className="italic">By combining all four historical artifacts - the glass slide with pollen, the wax seal imprint, the pressed leaf map, and the sundial key - you've revealed the location of the mythical Rafflesia singaporensis seed.</p>
              <p className="italic mt-2">Following the coordinates to a hidden section of the Gardens, you discover a special temperature-controlled vault beneath the oldest heritage tree. Inside, preserved in amber, is the dormant seed that botanists have searched for since World War II!</p>
            </div>
            
            <div className="mb-6">
              <p className="mb-2 font-semibold text-green-800">Your botanical achievements:</p>
              <ul className="text-left inline-block">
                <li>✓ Final score: {score} points</li>
                <li>✓ Historical texts analyzed: {currentChunkIndex + 1} / {chunks.length}</li>
                <li>✓ Artifacts collected: {inventory.length} / 4</li>
                <li>✓ Botanical knowledge level: {level}</li>
              </ul>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              Start a New Botanical Adventure
            </button>
            
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 rounded-b-lg"></div>
          </div>
        </div>
      )}

      {/* 동물 상호작용 말풍선 */}
      {interactingAnimal && (
        <div 
          className="absolute z-50 bg-white p-4 rounded-lg shadow-lg"
          style={{
            left: playerPosition.x + 40,
            top: playerPosition.y - 20,
            width: 250
          }}
        >
          <h3 className="text-lg font-bold">{interactingAnimal.label}</h3>
          <p className="text-sm">{interactingAnimal.message}</p>
          <p className="text-xs text-gray-500 italic">{interactingAnimal.fact}</p>
        </div>
      )}

      {/* 나머지 모달 및 UI 컴포넌트 */}
      {/* ... */}
      {/* 방향키 UI 추가 - 오른쪽 하단에 위치 */}
      <div className="absolute bottom-16 right-4 z-50 select-none">
        <div className="grid grid-cols-3 gap-1">
          {/* 위쪽 화살표 */}
          <div className="col-start-2">
            <button
              className={`w-16 h-16 bg-white bg-opacity-70 rounded-lg flex items-center justify-center text-2xl shadow ${isTouchingControl.up ? 'bg-green-200' : ''}`}
              onClick={() => handleDirectMove('up')}
            >
              ↑
            </button>
          </div>
          
          {/* 왼쪽, 아래, 오른쪽 화살표 */}
          <div className="col-start-1">
            <button
              className={`w-16 h-16 bg-white bg-opacity-70 rounded-lg flex items-center justify-center text-2xl shadow ${isTouchingControl.left ? 'bg-green-200' : ''}`}
              onClick={() => handleDirectMove('left')}
            >
              ←
            </button>
          </div>
          <div className="col-start-2">
            <button
              className={`w-16 h-16 bg-white bg-opacity-70 rounded-lg flex items-center justify-center text-2xl shadow ${isTouchingControl.down ? 'bg-green-200' : ''}`}
              onClick={() => handleDirectMove('down')}
            >
              ↓
            </button>
          </div>
          <div className="col-start-3">
            <button
              className={`w-16 h-16 bg-white bg-opacity-70 rounded-lg flex items-center justify-center text-2xl shadow ${isTouchingControl.right ? 'bg-green-200' : ''}`}
              onClick={() => handleDirectMove('right')}
            >
              →
            </button>
          </div>
        </div>
      </div>
      {/* 플레이어 캐릭터 - 이모티콘 */}
      <div 
        className="absolute z-20 transition-all duration-100 select-none pointer-events-none"
        style={{
          left: playerPosition.x - 20, 
          top: playerPosition.y - 30, 
          fontSize: '40px'
        }}
      >
        👨‍🔬
      </div>
      {/* NPC 모달 표시 */}
      {showNPCModal && currentLocation !== "hub" && (
        <NPCModal
          locationData={locationData}
          onAnswerSubmit={handleAnswer}
          onWritingSubmit={handleWritingSubmit}
          writingInput={writingInput}
          setWritingInput={setWritingInput}
          randomTextChunk={randomTextChunk}
        />
      )}
    </div>
  </div>
);

// 추가 스타일 정의 root = createRoot(document.getElementById('root')!);

};

export default SingaporeAdventureGame;