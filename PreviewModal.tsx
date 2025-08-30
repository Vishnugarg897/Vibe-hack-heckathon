import React from 'react';
import { X, ExternalLink, Smartphone, Tablet, Monitor } from 'lucide-react';
import { Component } from '../App';
import RenderComponent from './RenderComponent';

interface PreviewModalProps {
  components: Component[];
  onClose: () => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ components, onClose }) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const viewModes = {
    desktop: { width: '100%', icon: <Monitor className="w-4 h-4" /> },
    tablet: { width: '768px', icon: <Tablet className="w-4 h-4" /> },
    mobile: { width: '375px', icon: <Smartphone className="w-4 h-4" /> },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full h-full max-w-7xl max-h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="flex space-x-2">
              {Object.entries(viewModes).map(([mode, config]) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as 'desktop' | 'tablet' | 'mobile')}
                  className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                    viewMode === mode
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {config.icon}
                  <span className="capitalize">{mode}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>Open in New Tab</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden bg-white">
          <div className="h-full flex items-center justify-center p-8">
            <div
              className="bg-white border shadow-lg h-full overflow-auto transition-all duration-300"
              style={{ 
                width: viewModes[viewMode].width,
                maxWidth: '100%',
                position: 'relative'
              }}
            >
              {components.map((component) => (
                <div
                  key={component.id}
                  className="absolute"
                  style={{
                    left: component.position.x,
                    top: component.position.y,
                  }}
                >
                  <RenderComponent 
                    component={component} 
                    isSelected={false}
                    onUpdate={() => {}}
                    onDelete={() => {}}
                  />
                </div>
              ))}
              
              {components.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <p className="text-lg">No components to preview</p>
                    <p className="text-sm">Add some components to see them here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;