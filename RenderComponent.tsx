import React from 'react';
import { Component } from '../App';
import { Trash2, Edit3, Move } from 'lucide-react';

interface RenderComponentProps {
  component: Component;
  isSelected: boolean;
  onUpdate: (updates: Partial<Component>) => void;
  onDelete: () => void;
}

const RenderComponent: React.FC<RenderComponentProps> = ({ 
  component, 
  isSelected, 
  onUpdate, 
  onDelete 
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - component.position.x,
      y: e.clientY - component.position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    onUpdate({
      position: {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);
  const renderComponentContent = () => {
    switch (component.type) {
      case 'text':
        return (
          <div style={component.style}>
            {component.props.text}
          </div>
        );
      
      case 'button':
        return (
          <button 
            style={component.style}
            className="hover:opacity-90 transition-opacity"
          >
            {component.props.text}
          </button>
        );
      
      case 'container':
        return (
          <div 
            style={component.style}
            className="border-2 border-dashed border-gray-600 flex items-center justify-center"
          >
            <div className="text-gray-400 text-sm p-2">Container</div>
          </div>
        );
      
      case 'image':
        return (
          <img 
            src={component.props.src}
            alt={component.props.alt}
            style={component.style}
            className="object-cover"
          />
        );
      
      case 'input':
        return (
          <input
            type={component.props.type}
            placeholder={component.props.placeholder}
            style={component.style}
            className="focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            placeholder={component.props.placeholder}
            rows={component.props.rows}
            style={component.style}
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        );
      
      case 'navbar':
        return (
          <nav style={component.style} className="flex items-center justify-between">
            <div className="text-xl font-bold text-white">{component.props.brand}</div>
            <div className="flex space-x-6">
              {component.props.links.map((link: string, index: number) => (
                <a key={index} href="#" className="text-gray-300 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </nav>
        );
      
      case 'hero':
        return (
          <div style={component.style}>
            <h1 className="text-4xl font-bold text-white mb-4">{component.props.title}</h1>
            <p className="text-xl text-gray-300 mb-8">{component.props.subtitle}</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              {component.props.buttonText}
            </button>
          </div>
        );
      
      case 'card':
        return (
          <div style={component.style}>
            <h3 className="text-lg font-semibold text-white mb-3">{component.props.title}</h3>
            <p className="text-gray-300">{component.props.content}</p>
          </div>
        );
      
      case 'footer':
        return (
          <footer style={component.style}>
            <div className="flex justify-between items-center">
              <div className="text-gray-400">{component.props.copyright}</div>
              <div className="flex space-x-4">
                {component.props.links.map((link: string, index: number) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        );
      
      case 'list':
        return (
          <ul style={component.style} className="space-y-1">
            {component.props.items.map((item: string, index: number) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'grid':
        return (
          <div 
            style={{ 
              ...component.style, 
              display: 'grid', 
              gridTemplateColumns: `repeat(${component.props.columns}, 1fr)` 
            }}
          >
            {component.props.items.map((item: string, index: number) => (
              <div key={index} className="bg-gray-700 p-4 rounded text-center">
                {item}
              </div>
            ))}
          </div>
        );
      
      case 'calendar':
        return (
          <div style={component.style} className="text-center">
            <div className="text-lg font-semibold mb-2">December 2024</div>
            <div className="grid grid-cols-7 gap-1 text-sm">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="p-1 font-medium text-gray-400">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div key={i} className="p-1 hover:bg-gray-600 rounded cursor-pointer">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'chart':
        return (
          <div style={component.style}>
            <div className="text-lg font-semibold mb-4">Chart</div>
            <div className="flex items-end space-x-2 h-24">
              {component.props.data.map((value: number, index: number) => (
                <div
                  key={index}
                  className="bg-purple-500 w-8 rounded-t"
                  style={{ height: `${(value / Math.max(...component.props.data)) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
        );
      
      case 'user-profile':
        return (
          <div style={component.style} className="text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-3"></div>
            <div className="font-semibold">{component.props.name}</div>
            <div className="text-sm text-gray-400">{component.props.role}</div>
          </div>
        );
      
      case 'shopping-cart':
        return (
          <div style={component.style}>
            <div className="flex justify-between items-center">
              <span>Cart ({component.props.items} items)</span>
              <span className="font-semibold">{component.props.total}</span>
            </div>
          </div>
        );
      
      case 'contact-form':
        return (
          <div style={component.style}>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full p-2 bg-gray-600 rounded border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-2 bg-gray-600 rounded border-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea 
                placeholder="Message" 
                className="w-full p-2 bg-gray-600 rounded border-none focus:outline-none focus:ring-2 focus:ring-purple-500 h-20"
              ></textarea>
              <button className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded transition-colors">
                Send Message
              </button>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div style={component.style} className="bg-gray-700 rounded flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                ▶
              </div>
              <div className="text-sm text-gray-400">Video Player</div>
            </div>
          </div>
        );
      
      case 'input':
        return (
          <input
            type={component.props.type}
            placeholder={component.props.placeholder}
            style={component.style}
            className="focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            placeholder={component.props.placeholder}
            rows={component.props.rows}
            style={component.style}
            className="focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        );
      
      case 'navbar':
        return (
          <nav style={component.style} className="flex items-center justify-between">
            <div className="text-xl font-bold text-white">{component.props.brand}</div>
            <div className="flex space-x-6">
              {component.props.links.map((link: string, index: number) => (
                <a key={index} href="#" className="text-gray-300 hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </nav>
        );
      
      case 'hero':
        return (
          <div style={component.style}>
            <h1 className="text-4xl font-bold text-white mb-4">{component.props.title}</h1>
            <p className="text-xl text-gray-300 mb-8">{component.props.subtitle}</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              {component.props.buttonText}
            </button>
          </div>
        );
      
      case 'card':
        return (
          <div style={component.style}>
            <h3 className="text-lg font-semibold text-white mb-3">{component.props.title}</h3>
            <p className="text-gray-300">{component.props.content}</p>
          </div>
        );
      
      case 'footer':
        return (
          <footer style={component.style}>
            <div className="flex justify-between items-center">
              <div className="text-gray-400">{component.props.copyright}</div>
              <div className="flex space-x-4">
                {component.props.links.map((link: string, index: number) => (
                  <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        );
      
      case 'search':
        return (
          <div className="relative" style={{ width: component.style.width }}>
            <input
              type="text"
              placeholder={component.props.placeholder}
              style={component.style}
              className="focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        );
      
      case 'notification':
        return (
          <div style={component.style} className="flex items-start space-x-3">
            <Bell className="w-5 h-5 mt-1" />
            <div>
              <div className="font-medium">{component.props.title}</div>
              <div className="text-sm opacity-90">{component.props.message}</div>
            </div>
          </div>
        );
      
      case 'testimonial':
        return (
          <div style={component.style}>
            <div className="text-lg italic text-gray-300 mb-4">"{component.props.quote}"</div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
              <div>
                <div className="font-medium text-white">{component.props.author}</div>
                <div className="text-sm text-gray-400">{component.props.role}</div>
              </div>
            </div>
          </div>
        );
      
      case 'pricing-card':
        return (
          <div style={component.style}>
            <h3 className="text-xl font-bold text-white mb-2">{component.props.plan}</h3>
            <div className="text-3xl font-bold text-purple-400 mb-1">{component.props.price}</div>
            <div className="text-gray-400 mb-6">{component.props.period}</div>
            <ul className="space-y-2 mb-6">
              {component.props.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
              Choose Plan
            </button>
          </div>
        );
      
      case 'progress-bar':
        return (
          <div style={component.style}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">{component.props.label}</span>
              <span className="text-sm text-gray-400">{component.props.progress}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${component.props.progress}%` }}
              ></div>
            </div>
          </div>
        );
      
      case 'badge':
        return (
          <span style={component.style} className="inline-block">
            {component.props.text}
          </span>
        );
      
      case 'breadcrumb':
        return (
          <nav style={component.style}>
            <ol className="flex items-center space-x-2">
              {component.props.items.map((item: string, index: number) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <a href="#" className={index === component.props.items.length - 1 ? 'text-white' : 'hover:text-white transition-colors'}>
                    {item}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        );
      
      case 'accordion':
        return (
          <div style={component.style}>
            {component.props.items.map((item: any, index: number) => (
              <div key={index} className="border-b border-gray-600 last:border-b-0">
                <button className="w-full text-left p-4 hover:bg-gray-600 transition-colors flex justify-between items-center">
                  <span className="font-medium text-white">{item.title}</span>
                  <span className="text-gray-400">+</span>
                </button>
                <div className="p-4 text-gray-300 text-sm bg-gray-600">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'timer':
        return (
          <div style={component.style}>
            <div className="text-sm text-gray-400 mb-2">{component.props.label}</div>
            <div className="text-2xl font-mono font-bold text-white">{component.props.time}</div>
          </div>
        );
      
      case 'map':
        return (
          <div style={component.style} className="bg-gray-700 rounded flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-300">{component.props.location}</div>
            </div>
          </div>
        );
      
      default:
        return <div>Unknown component type</div>;
    }
  };

  return (
    <div 
      className="relative group"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {renderComponentContent()}
      
      {isSelected && (
        <div className="absolute -top-10 -right-2 flex space-x-1 bg-gray-800 rounded-lg p-1 shadow-lg">
          <button
            className="p-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            title="Move"
          >
            <Move className="w-4 h-4" />
          </button>
          <button
            className="p-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RenderComponent;