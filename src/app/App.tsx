import { useState } from 'react';
import { JavaScriptBasics } from './components/JavaScriptBasics';
import { UseStateDemo } from './components/UseStateDemo';
import { UseEffectDemo } from './components/UseEffectDemo';
import { UseContextDemo } from './components/UseContextDemo';
import { AdvancedHooksDemo } from './components/AdvancedHooksDemo';
import { PropsAndComposition } from './components/PropsAndComposition';
import { ConditionalAndLists } from './components/ConditionalAndLists';

/**
 * REACT.JS LEARNING APPLICATION
 *
 * This is a comprehensive React.js tutorial application designed for a 3-month internship program.
 * It covers all fundamental concepts with interactive demos and exercises.
 *
 * TOPICS COVERED:
 * 1. JavaScript Basics (var, const, let)
 * 2. useState Hook
 * 3. useEffect Hook
 * 4. useContext Hook
 * 5. Advanced Hooks (useReducer, useMemo, useCallback, useRef)
 * 6. Props and Component Composition
 * 7. Conditional Rendering and Lists
 *
 * HOW TO USE:
 * - Navigate through tabs to explore different topics
 * - Interact with demos to see concepts in action
 * - Read code comments to understand implementation
 * - Complete exercises at the end of each section
 * - Modify code to experiment and learn!
 */

export default function App() {
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState('javascript-basics');

  // Tab configuration
  const tabs = [
    { id: 'javascript-basics', label: 'JS Basics', icon: '📘' },
    { id: 'useState', label: 'useState', icon: '🎯' },
    { id: 'useEffect', label: 'useEffect', icon: '⚡' },
    { id: 'useContext', label: 'useContext', icon: '🌐' },
    { id: 'advanced-hooks', label: 'Advanced Hooks', icon: '🚀' },
    { id: 'props', label: 'Props & Composition', icon: '🧩' },
    { id: 'conditional-lists', label: 'Conditional & Lists', icon: '📝' }
  ];

  // Render the active component based on selected tab
  const renderContent = () => {
    switch (activeTab) {
      case 'javascript-basics':
        return <JavaScriptBasics />;
      case 'useState':
        return <UseStateDemo />;
      case 'useEffect':
        return <UseEffectDemo />;
      case 'useContext':
        return <UseContextDemo />;
      case 'advanced-hooks':
        return <AdvancedHooksDemo />;
      case 'props':
        return <PropsAndComposition />;
      case 'conditional-lists':
        return <ConditionalAndLists />;
      default:
        return <JavaScriptBasics />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">⚛️ React.js Learning Platform</h1>
          <p className="text-blue-100">
            Comprehensive internship training program - Master React fundamentals with interactive demos
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-4 font-medium text-sm whitespace-nowrap
                  border-b-2 transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            💡 <strong>Learning Tips:</strong> Experiment with the code, break things, fix them, and learn!
          </p>
          <p className="text-xs text-gray-400 mt-2">
            All code is heavily commented for your learning. Check the browser console for additional logs.
          </p>
        </div>
      </footer>
    </div>
  );
}