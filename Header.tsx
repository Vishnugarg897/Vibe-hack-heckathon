import React, { useState } from 'react';
import { Play, Upload, Sparkles, Settings, Save, Code } from 'lucide-react';

interface HeaderProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  onPreview: () => void;
  onDeploy: () => void;
  onAIAssistant: () => void;
}

const Header: React.FC<HeaderProps> = ({
  projectName,
  onProjectNameChange,
  onPreview,
  onDeploy,
  onAIAssistant,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between relative">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">BuilderAI</span>
        </div>
        
        <div className="h-6 w-px bg-gray-600" />
        
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => onProjectNameChange(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
              className="bg-gray-700 text-white px-3 py-1 rounded border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-300 hover:text-white font-medium px-2 py-1 rounded hover:bg-gray-700 transition-colors"
            >
              {projectName}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={onAIAssistant}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-4 py-2 rounded-lg transition-all duration-200"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Assistant</span>
        </button>
        
        <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors">
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
        
        <button 
          onClick={onPreview}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
        >
          <Play className="w-4 h-4" />
          <span>Preview</span>
        </button>
        
        <button 
          onClick={onDeploy}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Deploy</span>
        </button>

        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors relative"
        >
          <Settings className="w-5 h-5" />
        </button>
        
        {showSettings && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h3 className="font-medium mb-3">Project Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Theme</label>
                  <select className="w-full p-2 bg-gray-700 rounded text-sm">
                    <option>Dark</option>
                    <option>Light</option>
                    <option>Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Grid Size</label>
                  <select className="w-full p-2 bg-gray-700 rounded text-sm">
                    <option>8px</option>
                    <option>16px</option>
                    <option>24px</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Snap to Grid</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Auto Save</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;