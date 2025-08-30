import React, { useState } from 'react';
import { X, Send, Sparkles, Code, Database, Wand2, Copy } from 'lucide-react';
import { Component } from '../App';

interface AIAssistantProps {
  components: Component[];
  onGenerateCode: (components: Component[]) => void;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ components, onGenerateCode, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with:\n\n• Building components and layouts\n• Generating backend APIs and database schemas\n• Writing custom code snippets\n• Optimizing your application\n• Adding advanced features\n\nWhat would you like to work on today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const quickActions = [
    { icon: <Code className="w-4 h-4" />, label: 'Generate Code', action: 'generate-code' },
    { icon: <Database className="w-4 h-4" />, label: 'Create Database', action: 'create-database' },
    { icon: <Wand2 className="w-4 h-4" />, label: 'Add Feature', action: 'add-feature' },
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'll help you create that component! Based on your description, I can generate a responsive design with proper styling and functionality.",
        "Great idea! I can set up a database schema for that with proper relationships and validation rules. Let me create the necessary tables and API endpoints.",
        "Perfect! I'll add that feature with all the necessary components and backend logic. This will include user authentication and data persistence.",
        "I can optimize your current layout for better performance and user experience. Let me suggest some improvements and generate the updated code.",
        "Excellent! I'll create a complete backend API for your application with proper error handling, validation, and documentation.",
      ];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages = {
      'generate-code': 'Please generate the complete React and Node.js code for my current design.',
      'create-database': 'Create a database schema based on my components and add authentication.',
      'add-feature': 'Add a user dashboard with analytics and data visualization.',
    };

    setInputValue(actionMessages[action as keyof typeof actionMessages] || '');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl h-4/5 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-3xl rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    {message.type === 'assistant' && (
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="mt-2 text-xs text-gray-400 hover:text-white flex items-center space-x-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {isGenerating && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-lg p-4 flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                    <span className="text-gray-300">AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-700 p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm transition-colors"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me to build components, generate code, or create backend features..."
                  className="flex-1 p-3 bg-gray-700 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isGenerating}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-80 border-l border-gray-700 p-4">
            <h3 className="font-medium mb-4">Current Project</h3>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-700 rounded p-3">
                <div className="text-gray-400 mb-1">Components</div>
                <div className="font-medium">{components.length} items</div>
              </div>
              
              <div className="bg-gray-700 rounded p-3">
                <div className="text-gray-400 mb-1">Status</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Ready to deploy</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded p-3">
                <div className="text-gray-400 mb-2">AI Capabilities</div>
                <ul className="space-y-1 text-xs">
                  <li>• Component generation</li>
                  <li>• Backend API creation</li>
                  <li>• Database schema design</li>
                  <li>• Code optimization</li>
                  <li>• Feature implementation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;