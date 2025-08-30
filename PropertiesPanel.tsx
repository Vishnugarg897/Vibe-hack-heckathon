import React from 'react';
import { Component } from '../App';
import { Settings, Palette, Code, Database } from 'lucide-react';

interface PropertiesPanelProps {
  selectedComponent: Component | null;
  onUpdateComponent: (id: string, updates: Partial<Component>) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedComponent,
  onUpdateComponent,
}) => {
  const [activeTab, setActiveTab] = React.useState<'style' | 'props' | 'data'>('style');

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-gray-800 border-l border-gray-700 p-4">
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Select a component to edit its properties</p>
          </div>
        </div>
      </div>
    );
  }

  const updateStyle = (property: string, value: string) => {
    onUpdateComponent(selectedComponent.id, {
      style: {
        ...selectedComponent.style,
        [property]: value,
      },
    });
  };

  const updateProps = (property: string, value: any) => {
    onUpdateComponent(selectedComponent.id, {
      props: {
        ...selectedComponent.props,
        [property]: value,
      },
    });
  };

  const tabs = [
    { id: 'style', label: 'Style', icon: <Palette className="w-4 h-4" /> },
    { id: 'props', label: 'Props', icon: <Code className="w-4 h-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700">
      <div className="border-b border-gray-700">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'style' | 'props' | 'data')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-white bg-gray-700 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 overflow-y-auto h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold capitalize">{selectedComponent.type}</h3>
          <p className="text-sm text-gray-400">ID: {selectedComponent.id}</p>
        </div>

        {activeTab === 'style' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <input
                type="color"
                value={selectedComponent.style.backgroundColor || '#374151'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="w-full h-10 rounded border-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Text Color</label>
              <input
                type="color"
                value={selectedComponent.style.color || '#ffffff'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-full h-10 rounded border-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Width</label>
                <input
                  type="text"
                  value={selectedComponent.style.width || ''}
                  onChange={(e) => updateStyle('width', e.target.value)}
                  placeholder="auto"
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height</label>
                <input
                  type="text"
                  value={selectedComponent.style.height || ''}
                  onChange={(e) => updateStyle('height', e.target.value)}
                  placeholder="auto"
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Padding</label>
              <input
                type="text"
                value={selectedComponent.style.padding || ''}
                onChange={(e) => updateStyle('padding', e.target.value)}
                placeholder="0px"
                className="w-full p-2 bg-gray-700 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Border Radius</label>
              <input
                type="text"
                value={selectedComponent.style.borderRadius || ''}
                onChange={(e) => updateStyle('borderRadius', e.target.value)}
                placeholder="0px"
                className="w-full p-2 bg-gray-700 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <input
                type="text"
                value={selectedComponent.style.fontSize || ''}
                onChange={(e) => updateStyle('fontSize', e.target.value)}
                placeholder="16px"
                className="w-full p-2 bg-gray-700 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Font Weight</label>
              <select
                value={selectedComponent.style.fontWeight || 'normal'}
                onChange={(e) => updateStyle('fontWeight', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-sm"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Light</option>
                <option value="bolder">Extra Bold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Text Align</label>
              <select
                value={selectedComponent.style.textAlign || 'left'}
                onChange={(e) => updateStyle('textAlign', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Border</label>
              <input
                type="text"
                value={selectedComponent.style.border || ''}
                onChange={(e) => updateStyle('border', e.target.value)}
                placeholder="1px solid #ccc"
                className="w-full p-2 bg-gray-700 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Box Shadow</label>
              <select
                value={selectedComponent.style.boxShadow || 'none'}
                onChange={(e) => updateStyle('boxShadow', e.target.value)}
                className="w-full p-2 bg-gray-700 rounded text-sm"
              >
                <option value="none">None</option>
                <option value="0 1px 3px rgba(0, 0, 0, 0.1)">Small</option>
                <option value="0 4px 6px rgba(0, 0, 0, 0.1)">Medium</option>
                <option value="0 10px 15px rgba(0, 0, 0, 0.1)">Large</option>
                <option value="0 20px 25px rgba(0, 0, 0, 0.1)">Extra Large</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Margin</label>
                <input
                  type="text"
                  value={selectedComponent.style.margin || ''}
                  onChange={(e) => updateStyle('margin', e.target.value)}
                  placeholder="0px"
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Z-Index</label>
                <input
                  type="number"
                  value={selectedComponent.style.zIndex || ''}
                  onChange={(e) => updateStyle('zIndex', e.target.value)}
                  placeholder="auto"
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'props' && (
          <div className="space-y-4">
            {selectedComponent.type === 'text' && (
              <div>
                <label className="block text-sm font-medium mb-2">Text</label>
                <textarea
                  value={selectedComponent.props.text || ''}
                  onChange={(e) => updateProps('text', e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded text-sm h-20"
                />
              </div>
            )}

            {selectedComponent.type === 'button' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Button Text</label>
                  <input
                    type="text"
                    value={selectedComponent.props.text || ''}
                    onChange={(e) => updateProps('text', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Variant</label>
                  <select
                    value={selectedComponent.props.variant || 'primary'}
                    onChange={(e) => updateProps('variant', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                  </select>
                </div>
              </>
            )}

            {selectedComponent.type === 'image' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={selectedComponent.props.src || ''}
                    onChange={(e) => updateProps('src', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={selectedComponent.props.alt || ''}
                    onChange={(e) => updateProps('alt', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'input' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Placeholder</label>
                  <input
                    type="text"
                    value={selectedComponent.props.placeholder || ''}
                    onChange={(e) => updateProps('placeholder', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Input Type</label>
                  <select
                    value={selectedComponent.props.type || 'text'}
                    onChange={(e) => updateProps('type', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="tel">Phone</option>
                    <option value="url">URL</option>
                  </select>
                </div>
              </>
            )}

            {selectedComponent.type === 'textarea' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Placeholder</label>
                  <input
                    type="text"
                    value={selectedComponent.props.placeholder || ''}
                    onChange={(e) => updateProps('placeholder', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Rows</label>
                  <input
                    type="number"
                    value={selectedComponent.props.rows || 4}
                    onChange={(e) => updateProps('rows', parseInt(e.target.value))}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                    min="1"
                    max="20"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'navbar' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={selectedComponent.props.brand || ''}
                    onChange={(e) => updateProps('brand', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Navigation Links (one per line)</label>
                  <textarea
                    value={selectedComponent.props.links?.join('\n') || ''}
                    onChange={(e) => updateProps('links', e.target.value.split('\n').filter(Boolean))}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-20"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'hero' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={selectedComponent.props.title || ''}
                    onChange={(e) => updateProps('title', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <textarea
                    value={selectedComponent.props.subtitle || ''}
                    onChange={(e) => updateProps('subtitle', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Button Text</label>
                  <input
                    type="text"
                    value={selectedComponent.props.buttonText || ''}
                    onChange={(e) => updateProps('buttonText', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={selectedComponent.props.title || ''}
                    onChange={(e) => updateProps('title', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={selectedComponent.props.content || ''}
                    onChange={(e) => updateProps('content', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-20"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'footer' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Copyright Text</label>
                  <input
                    type="text"
                    value={selectedComponent.props.copyright || ''}
                    onChange={(e) => updateProps('copyright', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Footer Links (one per line)</label>
                  <textarea
                    value={selectedComponent.props.links?.join('\n') || ''}
                    onChange={(e) => updateProps('links', e.target.value.split('\n').filter(Boolean))}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-16"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'list' && (
              <div>
                <label className="block text-sm font-medium mb-2">Items (one per line)</label>
                <textarea
                  value={selectedComponent.props.items?.join('\n') || ''}
                  onChange={(e) => updateProps('items', e.target.value.split('\n').filter(Boolean))}
                  className="w-full p-2 bg-gray-700 rounded text-sm h-32"
                />
              </div>
            )}

            {selectedComponent.type === 'grid' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Columns</label>
                  <input
                    type="number"
                    value={selectedComponent.props.columns || 3}
                    onChange={(e) => updateProps('columns', parseInt(e.target.value))}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                    min="1"
                    max="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Grid Items (one per line)</label>
                  <textarea
                    value={selectedComponent.props.items?.join('\n') || ''}
                    onChange={(e) => updateProps('items', e.target.value.split('\n').filter(Boolean))}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-32"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'user-profile' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={selectedComponent.props.name || ''}
                    onChange={(e) => updateProps('name', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    value={selectedComponent.props.role || ''}
                    onChange={(e) => updateProps('role', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'shopping-cart' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Items Count</label>
                  <input
                    type="number"
                    value={selectedComponent.props.items || 0}
                    onChange={(e) => updateProps('items', parseInt(e.target.value))}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Total Amount</label>
                  <input
                    type="text"
                    value={selectedComponent.props.total || ''}
                    onChange={(e) => updateProps('total', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'search' && (
              <div>
                <label className="block text-sm font-medium mb-2">Placeholder</label>
                <input
                  type="text"
                  value={selectedComponent.props.placeholder || ''}
                  onChange={(e) => updateProps('placeholder', e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                />
              </div>
            )}

            {selectedComponent.type === 'notification' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={selectedComponent.props.title || ''}
                    onChange={(e) => updateProps('title', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    value={selectedComponent.props.message || ''}
                    onChange={(e) => updateProps('message', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-16"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={selectedComponent.props.type || 'info'}
                    onChange={(e) => updateProps('type', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  >
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </>
            )}

            {selectedComponent.type === 'testimonial' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Quote</label>
                  <textarea
                    value={selectedComponent.props.quote || ''}
                    onChange={(e) => updateProps('quote', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <input
                    type="text"
                    value={selectedComponent.props.author || ''}
                    onChange={(e) => updateProps('author', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    value={selectedComponent.props.role || ''}
                    onChange={(e) => updateProps('role', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'pricing-card' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Plan Name</label>
                  <input
                    type="text"
                    value={selectedComponent.props.plan || ''}
                    onChange={(e) => updateProps('plan', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="text"
                    value={selectedComponent.props.price || ''}
                    onChange={(e) => updateProps('price', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Period</label>
                  <input
                    type="text"
                    value={selectedComponent.props.period || ''}
                    onChange={(e) => updateProps('period', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                  <textarea
                    value={selectedComponent.props.features?.join('\n') || ''}
                    onChange={(e) => updateProps('features', e.target.value.split('\n').filter(Boolean))}
                    className="w-full p-2 bg-gray-700 rounded text-sm h-24"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'progress-bar' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Label</label>
                  <input
                    type="text"
                    value={selectedComponent.props.label || ''}
                    onChange={(e) => updateProps('label', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Progress (%)</label>
                  <input
                    type="number"
                    value={selectedComponent.props.progress || 0}
                    onChange={(e) => updateProps('progress', parseInt(e.target.value))}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                    min="0"
                    max="100"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'badge' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Text</label>
                  <input
                    type="text"
                    value={selectedComponent.props.text || ''}
                    onChange={(e) => updateProps('text', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Variant</label>
                  <select
                    value={selectedComponent.props.variant || 'primary'}
                    onChange={(e) => updateProps('variant', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </>
            )}

            {selectedComponent.type === 'breadcrumb' && (
              <div>
                <label className="block text-sm font-medium mb-2">Breadcrumb Items (one per line)</label>
                <textarea
                  value={selectedComponent.props.items?.join('\n') || ''}
                  onChange={(e) => updateProps('items', e.target.value.split('\n').filter(Boolean))}
                  className="w-full p-2 bg-gray-700 rounded text-sm h-20"
                />
              </div>
            )}

            {selectedComponent.type === 'timer' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Time</label>
                  <input
                    type="text"
                    value={selectedComponent.props.time || ''}
                    onChange={(e) => updateProps('time', e.target.value)}
                    placeholder="HH:MM:SS"
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Label</label>
                  <input
                    type="text"
                    value={selectedComponent.props.label || ''}
                    onChange={(e) => updateProps('label', e.target.value)}
                    className="w-full p-2 bg-gray-700 rounded text-sm"
                  />
                </div>
              </>
            )}

            {selectedComponent.type === 'map' && (
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={selectedComponent.props.location || ''}
                  onChange={(e) => updateProps('location', e.target.value)}
                  className="w-full p-2 bg-gray-700 rounded text-sm"
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'data' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2">Database Connection</h4>
              <p className="text-sm text-gray-400 mb-3">Connect this component to a data source</p>
              <button className="w-full bg-green-600 hover:bg-green-700 p-2 rounded text-sm transition-colors">
                Connect to Database
              </button>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2">API Integration</h4>
              <p className="text-sm text-gray-400 mb-3">Fetch data from an API endpoint</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-sm transition-colors">
                Add API Endpoint
              </button>
            </div>

            <div className="p-4 bg-gray-700 rounded-lg">
              <h4 className="font-medium mb-2">Real-time Updates</h4>
              <p className="text-sm text-gray-400 mb-3">Enable live data updates</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded text-sm transition-colors">
                Enable Real-time
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;