import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MessageCircle, X, Trophy, Target, Zap, Moon, Sun, ArrowRight, ArrowLeft, Play, LogIn, Mail, Chrome, Facebook, Apple, Github } from 'lucide-react';

const Foundation = () => {
  const [pyramids, setPyramids] = useState([
    {
      id: 1,
      name: "Daily Exercise",
      streak: 7,
      bricks: [1, 2, 3, 4, 5, 6, 7],
      color: "from-blue-400 to-blue-600",
      lastCheckin: null,
      lastBrickAdded: null
    },
    {
      id: 2,
      name: "Read 30 minutes",
      streak: 12,
      bricks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      color: "from-green-400 to-green-600",
      lastCheckin: null,
      lastBrickAdded: null
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedPyramid, setSelectedPyramid] = useState(null);
  const [showSphynx, setShowSphynx] = useState(false);
  const [sphynxMessage, setSphynxMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);

  const colors = [
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-yellow-400 to-yellow-600",
    "from-red-400 to-red-600",
    "from-indigo-400 to-indigo-600",
    "from-teal-400 to-teal-600"
  ];

  const sphynxQuotes = [
    "Every brick you place today builds tomorrow's foundation! 🌟",
    "Consistency is the architect of greatness. Keep building! 🏗️",
    "Your pyramid grows stronger with each mindful action. 💪",
    "Small steps, mighty pyramids. What will you build today? ✨",
    "The strongest structures are built one brick at a time. 🧱",
    "Your dedication is the mortar that holds your dreams together! 🌈",
    "Each check-in is a victory worth celebrating! 🎉",
    "Progress, not perfection. Every brick matters! 🎯"
  ];

  useEffect(() => {
    const randomQuote = sphynxQuotes[Math.floor(Math.random() * sphynxQuotes.length)];
    setSphynxMessage(randomQuote);
  }, []);

  // Check for expired streaks on component mount and every day
  useEffect(() => {
    const checkExpiredStreaks = () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();
      
      setPyramids(prev => prev.map(pyramid => {
        if (pyramid.lastCheckin && pyramid.lastCheckin !== today.toDateString() && 
            pyramid.lastCheckin !== yesterdayStr && pyramid.streak > 0) {
          // Reset streak if more than 1 day has passed
          return {
            ...pyramid,
            streak: 0,
            bricks: [],
            lastCheckin: null,
            lastBrickAdded: null
          };
        }
        return pyramid;
      }));
    };
    
    checkExpiredStreaks();
    
    // Check daily at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      checkExpiredStreaks();
      // Set up daily interval
      const interval = setInterval(checkExpiredStreaks, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilMidnight);
    
    return () => clearTimeout(timeout);
  }, []);

  const addPyramid = () => {
    if (newHabitName.trim()) {
      const newPyramid = {
        id: Date.now(),
        name: newHabitName,
        streak: 0,
        bricks: [],
        color: colors[pyramids.length % colors.length],
        lastCheckin: null,
        lastBrickAdded: null
      };
      setPyramids([...pyramids, newPyramid]);
      setNewHabitName('');
      setShowAddForm(false);
    }
  };

  const deletePyramid = (id) => {
    setPyramids(pyramids.filter(p => p.id !== id));
  };

  const checkIn = (pyramidId) => {
    const today = new Date().toDateString();
    setPyramids(pyramids.map(p => {
      if (p.id === pyramidId && p.lastCheckin !== today) {
        const newStreak = p.streak + 1;
        const newBricks = [...p.bricks, newStreak];
        
        // Show confetti for milestones
        if (newStreak % 5 === 0) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
        
        return {
          ...p,
          streak: newStreak,
          bricks: newBricks,
          lastCheckin: today,
          lastBrickAdded: newStreak
        };
      }
      return p;
    }));
  };

  const getPyramidLayout = (bricks) => {
    if (bricks.length === 0) return [];
    
    const positions = [];
    
    // Create positions for authentic pyramid building
    for (let i = 0; i < bricks.length; i++) {
      const brickNum = i + 1;
      
      if (brickNum === 1) {
        positions.push({ brick: brickNum, row: 0, col: 0 });
      } else if (brickNum === 2) {
        positions.push({ brick: brickNum, row: 0, col: 1 });
      } else if (brickNum === 3) {
        positions.push({ brick: brickNum, row: 1, col: 0.5 });
      } else if (brickNum === 4) {
        positions.push({ brick: brickNum, row: 0, col: 2 });
      } else if (brickNum === 5) {
        positions.push({ brick: brickNum, row: 1, col: 1.5 });
      } else if (brickNum === 6) {
        positions.push({ brick: brickNum, row: 0, col: 3 });
      } else if (brickNum === 7) {
        positions.push({ brick: brickNum, row: 1, col: 2.5 });
      } else if (brickNum === 8) {
        positions.push({ brick: brickNum, row: 0, col: 4 });
      } else if (brickNum === 9) {
        positions.push({ brick: brickNum, row: 1, col: 3.5 });
      } else if (brickNum === 10) {
        positions.push({ brick: brickNum, row: 2, col: 1 });
      } else if (brickNum === 11) {
        positions.push({ brick: brickNum, row: 0, col: 5 });
      } else if (brickNum === 12) {
        positions.push({ brick: brickNum, row: 1, col: 4.5 });
      } else if (brickNum === 13) {
        positions.push({ brick: brickNum, row: 2, col: 2 });
      } else if (brickNum === 14) {
        positions.push({ brick: brickNum, row: 0, col: 6 });
      } else if (brickNum === 15) {
        positions.push({ brick: brickNum, row: 1, col: 5.5 });
      } else if (brickNum === 16) {
        positions.push({ brick: brickNum, row: 2, col: 3 });
      } else if (brickNum === 17) {
        positions.push({ brick: brickNum, row: 3, col: 1.5 });
      } else {
        // For higher numbers, follow the pattern
        const baseRowSize = Math.floor(Math.sqrt(brickNum * 2));
        const currentRow = Math.floor((brickNum - 1) / baseRowSize);
        const positionInRow = (brickNum - 1) % baseRowSize;
        positions.push({ brick: brickNum, row: currentRow, col: positionInRow });
      }
    }
    
    // Group by rows and sort
    const rows = {};
    positions.forEach(pos => {
      if (!rows[pos.row]) rows[pos.row] = [];
      rows[pos.row].push(pos);
    });
    
    // Convert to array and sort rows (bottom to top)
    const sortedRows = Object.keys(rows)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map(rowKey => 
        rows[rowKey].sort((a, b) => a.col - b.col)
      );
    
    return sortedRows;
  };

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        >
          🎉
        </div>
      ))}
    </div>
  );

  const PyramidView = ({ pyramid }) => {
    const rows = getPyramidLayout(pyramid.bricks);
    const today = new Date().toDateString();
    const canCheckIn = pyramid.lastCheckin !== today;
    
    // Calculate dynamic brick size based on pyramid size
    const totalBricks = pyramid.bricks.length;
    const baseSize = totalBricks > 20 ? 6 : totalBricks > 10 ? 7 : 8;
    const brickHeight = totalBricks > 20 ? 4 : totalBricks > 10 ? 5 : 6;

    return (
      <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {pyramid.name}
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {pyramid.streak} day streak 🔥
            </p>
          </div>
          <button
            onClick={() => deletePyramid(pyramid.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6 min-h-[200px] justify-end overflow-hidden">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-1">
              {row.map((pos, brickIndex) => {
                const isNewBrick = pyramid.lastBrickAdded === pos.brick;
                const isMilestone = pos.brick % 7 === 0;
                
                return (
                  <div
                    key={`${rowIndex}-${brickIndex}`}
                    className={`mx-0.5 rounded-sm shadow-md flex items-center justify-center text-white text-xs font-bold
                      transition-all duration-300 hover:scale-110 ${
                        isMilestone 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 ring-2 ring-yellow-300' 
                          : `bg-gradient-to-br ${pyramid.color}`
                      } ${
                        isNewBrick 
                          ? 'animate-bounce transform scale-110' 
                          : ''
                      }`}
                    style={{
                      width: `${baseSize * 4}px`,
                      height: `${brickHeight * 4}px`,
                      animationDelay: isNewBrick ? '0s' : 'none',
                      animationDuration: isNewBrick ? '0.6s' : 'none',
                      animationFillMode: isNewBrick ? 'both' : 'none'
                    }}
                  >
                    {pos.brick}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <button
          onClick={() => checkIn(pyramid.id)}
          disabled={!canCheckIn}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            canCheckIn
              ? `bg-gradient-to-r ${pyramid.color} text-white hover:shadow-lg transform hover:scale-105`
              : `${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'} cursor-not-allowed`
          }`}
        >
          {canCheckIn ? '✓ Check In Today' : '✓ Completed Today'}
        </button>
      </div>
    );
  };

  const SphynxChat = () => (
    <div className={`fixed bottom-4 right-4 ${showSphynx ? 'w-80' : 'w-auto'} transition-all duration-300 z-40`}>
      {showSphynx && (
        <div className={`mb-4 p-4 rounded-2xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                🦁
              </div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Sphynx
              </span>
            </div>
            <button
              onClick={() => setShowSphynx(false)}
              className={`p-1 rounded-lg hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-700' : ''}`}
            >
              <X size={16} />
            </button>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {sphynxMessage}
          </p>
          <button
            onClick={() => {
              const randomQuote = sphynxQuotes[Math.floor(Math.random() * sphynxQuotes.length)];
              setSphynxMessage(randomQuote);
            }}
            className="mt-2 text-xs text-purple-500 hover:text-purple-600 transition-colors"
          >
            Get new inspiration ✨
          </button>
        </div>
      )}
      
      <button
        onClick={() => setShowSphynx(!showSphynx)}
        className="w-14 h-14 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg 
          flex items-center justify-center text-white text-2xl hover:shadow-xl 
          transform hover:scale-110 transition-all duration-300"
      >
        {showSphynx ? <X size={24} /> : '🦁'}
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <div className={`p-6 ${darkMode ? 'bg-gray-800' : 'bg-white/80'} backdrop-blur-sm sticky top-0 z-30`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Foundation
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Build your habits, brick by brick
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 
                text-white px-4 py-2 rounded-xl hover:shadow-lg transform hover:scale-105 
                transition-all duration-300"
            >
              <Plus size={20} />
              Add Habit
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white/60'}`}>
            <div className="text-2xl font-bold text-blue-500">{pyramids.length}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Active Habits</div>
          </div>
          <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white/60'}`}>
            <div className="text-2xl font-bold text-green-500">
              {pyramids.reduce((sum, p) => sum + p.streak, 0)}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Days</div>
          </div>
          <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-800' : 'bg-white/60'}`}>
            <div className="text-2xl font-bold text-purple-500">
              {pyramids.reduce((sum, p) => sum + p.bricks.length, 0)}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Bricks</div>
          </div>
        </div>
      </div>

      {/* Pyramids Grid */}
      <div className="px-6 pb-20">
        <div className="grid gap-6">
          {pyramids.map(pyramid => (
            <PyramidView key={pyramid.id} pyramid={pyramid} />
          ))}
        </div>

        {pyramids.length === 0 && (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold mb-2">Start Building Your Foundation</h3>
            <p className="text-sm">Add your first habit to begin building pyramids!</p>
          </div>
        )}
      </div>

      {/* Add Habit Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-md p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Add New Habit
            </h3>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="Enter habit name..."
              className={`w-full p-3 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'
              }`}
              onKeyPress={(e) => e.key === 'Enter' && addPyramid()}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className={`flex-1 py-2 rounded-xl ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={addPyramid}
                className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                  text-white rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}

      <SphynxChat />
    </div>
  );
};

export default Foundation;