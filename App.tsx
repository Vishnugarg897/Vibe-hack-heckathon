import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import AIAssistant from './components/AIAssistant';
import PreviewModal from './components/PreviewModal';
import DeploymentModal from './components/DeploymentModal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export interface Component {
  id: string;
  type: string;
  props: Record<string, any>;
  style: Record<string, any>;
  children?: Component[];
  position: { x: number; y: number };
}

function App() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeployment, setShowDeployment] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [projectName, setProjectName] = useState('My Web App');

  const addComponent = (componentData: Omit<Component, 'id' | 'position'>, position: { x: number; y: number }) => {
    const newComponent: Component = {
      ...componentData,
      id: `${componentData.type}-${Date.now()}`,
      position,
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (id: string, updates: Partial<Component>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
    if (selectedComponent?.id === id) {
      setSelectedComponent({ ...selectedComponent, ...updates });
    }
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <Header 
          projectName={projectName}
          onProjectNameChange={setProjectName}
          onPreview={() => setShowPreview(true)}
          onDeploy={() => setShowDeployment(true)}
          onAIAssistant={() => setShowAIAssistant(true)}
        />
        
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onAddComponent={addComponent} />
          
          <div className="flex-1 flex">
            <Canvas 
              components={components}
              selectedComponent={selectedComponent}
              onSelectComponent={setSelectedComponent}
              onUpdateComponent={updateComponent}
              onDeleteComponent={deleteComponent}
              onAddComponent={addComponent}
            />
            
            <PropertiesPanel 
              selectedComponent={selectedComponent}
              onUpdateComponent={updateComponent}
            />
          </div>
        </div>

        {showPreview && (
          <PreviewModal 
            components={components}
            onClose={() => setShowPreview(false)}
          />
        )}

        {showDeployment && (
          <DeploymentModal 
            projectName={projectName}
            components={components}
            onClose={() => setShowDeployment(false)}
          />
        )}

        {showAIAssistant && (
          <AIAssistant 
            components={components}
            onGenerateCode={setComponents}
            onClose={() => setShowAIAssistant(false)}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;