import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import BeyondThePages from "../Games/BeyondThePages";
import ReadingForestChallenge from "./Challenges/Reading_Forest";
// @ts-ignore
import SingaporeAdventure from "../Games/singapore-adventure/Game";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Types
type Tab = "activity" | "friends" | "feed" | "game";

//interface Companion {
 // name: string;
  //role: string;
  //personality: string;
//}

interface Post {
  id: number;
  user: string;
  time: string;
  content: string;
}

interface InteractiveFeatures {
  storyMap: {
    locations: string[];
    challenges: string[];
  };
  rewards: {
    items: string[];
    badges: string[];
    powers: string[];
  };
}

// Constants
const LEVELS = ["Novice Reader", "Story Explorer", "Literary Master"];
const ONTARIO_CRITERIA = ["Reading", "Writing", "Oral Communication", "Media Literacy"];
const USER_SCORES = [75, 85, 90, 80];
const PEER_SCORES = [70, 80, 85, 78];
const POSTS_PER_PAGE = 10;

const GAME_ELEMENTS = {
  companions: [
    { name: "Lexi the Explorer", role: "Reading Guide", personality: "Encouraging, adventurous" },
    { name: "Professor Owl", role: "Academic Mentor", personality: "Wise, patient" },
  ],
};

const INTERACTIVE_FEATURES: InteractiveFeatures = {
  storyMap: {
    locations: ["Reading Forest", "Grammar Castle", "Culture Bridge"],
    challenges: ["Story Puzzles", "Language Quests", "Cultural Missions"],
  },
  rewards: {
    items: ["Magic Bookmarks", "Knowledge Crystals"],
    badges: ["Reading Champion", "Culture Explorer"],
    powers: ["Hint Boost", "Skip Challenge"],
  },
};

// Component
const Activity: React.FC = () => {
  // State
  const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(LEVELS[0]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [selectedTab, setSelectedTab] = useState<Tab>("activity");
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Generate mock posts
  const mockPosts: Post[] = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    user: `User${index + 1}`,
    time: `${Math.floor(Math.random() * 60)} min ago`,
    content: `This is a sample post from User${index + 1}. It's a great day to read books and explore!`,
  }));

  // Handlers
  const handleCompanionHelp = (companionName: string) => {
    const companion = GAME_ELEMENTS.companions.find((c) => c.name === companionName);
    if (companion) {
      alert(`${companion.name} says: Here's some advice!`);
    }
  };

  const startChallenge = (challenge: string) => {
    setCurrentChallenge(challenge);
  };

  const completeChallenge = () => {
    if (currentChallenge) {
      setAchievements(prev => [...prev, currentChallenge]);
      setCurrentChallenge(null);

      if (achievements.length + 1 >= 3) {
        const nextLevelIndex = LEVELS.indexOf(currentLevel) + 1;
        if (nextLevelIndex < LEVELS.length) {
          setCurrentLevel(LEVELS[nextLevelIndex]);
        }
      }
    }
  };

  const loadMorePosts = () => {
    setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, mockPosts.length));
  };

  // Components
  const CompanionsSection = () => (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Companions</h2>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {GAME_ELEMENTS.companions.map((companion) => (
          <button
            key={companion.name}
            onClick={() => handleCompanionHelp(companion.name)}
            className="p-3 bg-white rounded-full shadow flex-shrink-0 w-24 h-24 text-center hover:bg-blue-200"
          >
            <p className="text-xs font-bold">{companion.name}</p>
            <p className="text-xs">{companion.role}</p>
          </button>
        ))}
      </div>
    </section>
  );

  const ChallengesSection = () => (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Choose a Challenge</h2>
      <div className="grid grid-cols-3 gap-4">
        {INTERACTIVE_FEATURES.storyMap.locations.map((location, index) => (
          <button
            key={location}
            onClick={() => startChallenge(location)}
            className="p-4 bg-blue-100 rounded-lg text-center shadow hover:bg-blue-200 transition"
          >
            <h3 className="font-bold text-sm">{location}</h3>
            <p className="text-xs text-gray-500">
              {INTERACTIVE_FEATURES.storyMap.challenges[index]}
            </p>
          </button>
        ))}
      </div>
    </section>
  );

  const InventorySection = () => (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Your Inventory</h2>
      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Your Avatar</h3>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-300 rounded-full flex-shrink-0" />
            <div>
              <p className="text-lg font-semibold">Level 2 Explorer</p>
              <p className="text-gray-500">XP: 150 / 300</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Your Items</h3>
          <ul className="list-disc list-inside text-gray-700">
            {INTERACTIVE_FEATURES.rewards.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Your Cash</h3>
          <p className="text-gray-700 mb-4">💰 500 Coins</p>
          <button
            onClick={() => alert("You bought a new item!")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Buy Magic Bookmark (100 Coins)
          </button>
        </div>
      </div>
    </section>
  );

  const FriendsSection = () => (
    <section className="mb-6 px-4 text-center">
      <h2 className="text-xl font-semibold mb-4">Friends' Progress</h2>
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 bg-blue-300 rounded-full flex-shrink-0" />
          <div>
            <p className="text-lg font-semibold">Your Avatar</p>
            <p className="text-gray-500">Level 2</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {["Alice", "Bob", "Charlie"].map((friend) => (
          <div
            key={friend}
            className="p-3 bg-white rounded-lg shadow flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-pink-300 rounded-full flex-shrink-0" />
              <div>
                <span className="font-semibold text-sm">{friend}</span>
                <p className="text-xs text-gray-500">Level {Math.floor(Math.random() * 3) + 1}</p>
              </div>
            </div>
            <button
              onClick={() => alert(`You sent a message to ${friend}!`)}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  const FeedSection = () => (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>

      <div className="p-4 bg-white rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <Bar
          data={{
            labels: ONTARIO_CRITERIA,
            datasets: [
              {
                label: "Your Scores",
                data: USER_SCORES,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
              {
                label: "Peers' Average Scores",
                data: PEER_SCORES,
                backgroundColor: "rgba(192, 75, 75, 0.6)",
                borderColor: "rgba(192, 75, 75, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: "Performance Comparison",
              },
            },
          }}
        />
      </div>

      <ul className="space-y-3 mb-6">
        <li className="p-3 bg-white rounded-lg shadow">🎉 You completed "Story Puzzles" challenge!</li>
        <li className="p-3 bg-white rounded-lg shadow">🏆 You earned "Reading Champion" badge!</li>
        <li className="p-3 bg-white rounded-lg shadow">🎓 You've advanced to "{currentLevel}" level!</li>
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">User Posts</h3>
        <div className="space-y-4">
          {mockPosts.slice(0, visiblePosts).map((post) => (
            <div
              key={post.id}
              className="p-4 bg-white rounded-lg shadow flex space-x-4"
            >
              <div className="w-12 h-12 bg-blue-300 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-sm">{post.user}</h3>
                  <span className="text-xs text-gray-500">{post.time}</span>
                </div>
                <p className="text-sm mt-2 text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
        {visiblePosts < mockPosts.length && (
          <div className="text-center mt-4">
            <button
              onClick={loadMorePosts}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-green-50 to-green-100">
      <header className="w-full bg-white shadow-md fixed top-0 z-10 pt-[env(safe-area-inset-top)]">
        <h1 className="text-xl font-bold text-center py-3">Adventure Time!</h1>
      </header>

      <main className="flex-1 pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(4.5rem+env(safe-area-inset-bottom))] px-4 overflow-y-auto">
      {selectedTab === "activity" && (
          <div>
            {currentChallenge === "Reading Forest" ? (
              <ReadingForestChallenge />
            ) : (
              <>
                <CompanionsSection />
                <ChallengesSection />
                {currentChallenge && (
                  <section className="mb-6">
                    <div className="p-4 bg-yellow-100 rounded-lg text-center">
                      <p className="mb-2">{currentChallenge}</p>
                      <button
                        onClick={completeChallenge}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full font-semibold"
                      >
                        Complete Challenge
                      </button>
                    </div>
                  </section>
                )}
                <InventorySection />
              </>
            )}
          </div>
        )}
        {selectedTab === "friends" && <FriendsSection />}
        {selectedTab === "feed" && <FeedSection />}
        {selectedTab === "game" && (
          <div>
            {!selectedGame ? (
              <div className="py-6">
                <h2 className="text-2xl font-bold text-center mb-8">Choose a Game</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div 
                    onClick={() => setSelectedGame("BeyondThePages")}
                    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-green-300"
                  >
                    <div className="h-40 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-5xl">📚</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Beyond The Pages</h3>
                    <p className="text-gray-600 text-sm">
                      Explore a world of literature and embark on a journey through famous books and stories.
                    </p>
                    <button className="mt-4 bg-amber-600 text-white px-4 py-2 rounded-lg w-full">
                      Start Adventure
                    </button>
                  </div>
                  
                  <div 
                    onClick={() => setSelectedGame("SingaporeAdventure")}
                    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-green-300"
                  >
                    <div className="h-40 bg-blue-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-5xl">🌆</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Singapore Adventure</h3>
                    <p className="text-gray-600 text-sm">
                      Discover the culture and history of Singapore through an interactive adventure game.
                    </p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
                      Start Adventure
                    </button>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <p className="text-sm text-gray-500">
                    More games coming soon! Check back for updates.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 flex justify-end">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300"
                  >
                    <span className="mr-1">←</span> Back to Games
                  </button>
                </div>
                
                {selectedGame === "BeyondThePages" && <BeyondThePages />}
                {selectedGame === "SingaporeAdventure" && <SingaporeAdventure />}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="w-full bg-white shadow-md fixed bottom-0 z-10 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around py-3">
          {(["activity", "friends", "feed", "game", "SingaporeAdventure"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`text-sm ${
                selectedTab === tab ? "text-green-500 font-semibold" : "text-gray-400"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </footer>
    </div>
  )
};

export default Activity;