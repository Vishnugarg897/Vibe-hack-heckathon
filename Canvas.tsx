import React from 'react';
import { useDrop } from 'react-dnd';
import { Component } from '../App';
import RenderComponent from './RenderComponent';

interface CanvasProps {
  components: Component[];
  selectedComponent: Component | null;
  onSelectComponent: (component: Component) => void;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
  onDeleteComponent: (id: string) => void;
  onAddComponent: (component: Omit<Component, 'id' | 'position'>, position: { x: number; y: number }) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent,
  onAddComponent,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item: any, monitor) => {
      const canvasRect = document.getElementById('canvas')?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      
      if (clientOffset && canvasRect) {
        const x = clientOffset.x - canvasRect.left;
        const y = clientOffset.y - canvasRect.top;
        
        onAddComponent({
          type: item.type,
          props: item.props,
          style: item.style
        }, { x, y });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex-1 relative bg-gray-900">
      <div 
        ref={drop}
        id="canvas"
        className={`w-full h-full p-8 transition-colors ${
          isOver ? 'bg-gray-800' : 'bg-gray-900'
        }`}
      >
        {components.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <div className="w-24 h-24 mx-auto mb-4 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-3xl">+</span>
              </div>
              <p className="text-lg font-medium mb-2">Start Building</p>
              <p className="text-sm">Drag components from the sidebar to get started</p>
            </div>
          </div>
        ) : (
          <>
            {components.map((component) => (
              <div
                key={component.id}
                className={`absolute cursor-pointer ${
                  selectedComponent?.id === component.id
                    ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900'
                    : ''
                }`}
                style={{
                  left: component.position.x,
                  top: component.position.y,
                }}
                onClick={() => onSelectComponent(component)}
              >
                <RenderComponent 
                  component={component} 
                  isSelected={selectedComponent?.id === component.id}
                  onUpdate={(updates) => onUpdateComponent(component.id, updates)}
                  onDelete={() => onDeleteComponent(component.id)}
                />
              </div>
            ))}
          </>
        )}
        
        {isOver && (
          <div className="absolute inset-0 bg-purple-500 bg-opacity-10 border-2 border-dashed border-purple-500 pointer-events-none">
            <div className="flex items-center justify-center h-full">
              <span className="text-purple-400 font-medium">Drop component here</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas;