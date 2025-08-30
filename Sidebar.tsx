import React from 'react';
import { useDrag } from 'react-dnd';
import { 
  Type, 
  Square, 
  Image, 
  MousePointer, 
  List, 
  Grid3X3,
  Calendar,
  BarChart,
  Users,
  ShoppingCart,
  Mail,
  Video,
  Navigation,
  Star,
  FileText,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  MessageCircle,
  Bell,
  Search
} from 'lucide-react';
import { Component } from '../App';

interface ComponentItem {
  type: string;
  label: string;
  icon: React.ReactNode;
  defaultProps: Record<string, any>;
  defaultStyle: Record<string, any>;
}

const componentLibrary: ComponentItem[] = [
  {
    type: 'text',
    label: 'Text',
    icon: <Type className="w-5 h-5" />,
    defaultProps: { text: 'Your text here' },
    defaultStyle: { color: '#ffffff', fontSize: '16px' }
  },
  {
    type: 'button',
    label: 'Button',
    icon: <MousePointer className="w-5 h-5" />,
    defaultProps: { text: 'Click me', variant: 'primary' },
    defaultStyle: { backgroundColor: '#8B5CF6', color: '#ffffff', padding: '8px 16px', borderRadius: '8px' }
  },
  {
    type: 'container',
    label: 'Container',
    icon: <Square className="w-5 h-5" />,
    defaultProps: {},
    defaultStyle: { backgroundColor: '#374151', padding: '20px', borderRadius: '8px' }
  },
  {
    type: 'image',
    label: 'Image',
    icon: <Image className="w-5 h-5" />,
    defaultProps: { src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300', alt: 'Sample image' },
    defaultStyle: { width: '200px', height: '150px', borderRadius: '8px' }
  },
  {
    type: 'list',
    label: 'List',
    icon: <List className="w-5 h-5" />,
    defaultProps: { items: ['Item 1', 'Item 2', 'Item 3'] },
    defaultStyle: { color: '#ffffff' }
  },
  {
    type: 'grid',
    label: 'Grid',
    icon: <Grid3X3 className="w-5 h-5" />,
    defaultProps: { columns: 3, items: ['Card 1', 'Card 2', 'Card 3', 'Card 4', 'Card 5', 'Card 6'] },
    defaultStyle: { gap: '16px' }
  },
  {
    type: 'input',
    label: 'Input Field',
    icon: <Type className="w-5 h-5" />,
    defaultProps: { placeholder: 'Enter text...', type: 'text' },
    defaultStyle: { width: '200px', padding: '8px 12px', backgroundColor: '#374151', color: '#ffffff', borderRadius: '6px', border: '1px solid #6B7280' }
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: <Type className="w-5 h-5" />,
    defaultProps: { placeholder: 'Enter your message...', rows: 4 },
    defaultStyle: { width: '300px', padding: '8px 12px', backgroundColor: '#374151', color: '#ffffff', borderRadius: '6px', border: '1px solid #6B7280' }
  },
  {
    type: 'navbar',
    label: 'Navigation Bar',
    icon: <List className="w-5 h-5" />,
    defaultProps: { brand: 'Brand', links: ['Home', 'About', 'Services', 'Contact'] },
    defaultStyle: { backgroundColor: '#1F2937', padding: '12px 24px', width: '100%' }
  },
  {
    type: 'hero',
    label: 'Hero Section',
    icon: <Square className="w-5 h-5" />,
    defaultProps: { title: 'Welcome to Our Platform', subtitle: 'Build amazing things with our tools', buttonText: 'Get Started' },
    defaultStyle: { backgroundColor: '#1F2937', padding: '60px 24px', textAlign: 'center', width: '100%' }
  },
  {
    type: 'card',
    label: 'Card',
    icon: <Square className="w-5 h-5" />,
    defaultProps: { title: 'Card Title', content: 'This is a sample card with some content.' },
    defaultStyle: { backgroundColor: '#374151', padding: '20px', borderRadius: '12px', width: '250px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }
  },
  {
    type: 'footer',
    label: 'Footer',
    icon: <Square className="w-5 h-5" />,
    defaultProps: { copyright: '© 2024 Your Company', links: ['Privacy', 'Terms', 'Support'] },
    defaultStyle: { backgroundColor: '#111827', padding: '24px', width: '100%', textAlign: 'center' }
  },
  {
    type: 'calendar',
    label: 'Calendar',
    icon: <Calendar className="w-5 h-5" />,
    defaultProps: {},
    defaultStyle: { backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }
  },
  {
    type: 'chart',
    label: 'Chart',
    icon: <BarChart className="w-5 h-5" />,
    defaultProps: { type: 'bar', data: [10, 20, 30, 40, 50] },
    defaultStyle: { backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }
  },
  {
    type: 'user-profile',
    label: 'User Profile',
    icon: <Users className="w-5 h-5" />,
    defaultProps: { name: 'John Doe', role: 'Designer' },
    defaultStyle: { backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }
  },
  {
    type: 'shopping-cart',
    label: 'Shopping Cart',
    icon: <ShoppingCart className="w-5 h-5" />,
    defaultProps: { items: 3, total: '$99.99' },
    defaultStyle: { backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }
  },
  {
    type: 'contact-form',
    label: 'Contact Form',
    icon: <Mail className="w-5 h-5" />,
    defaultProps: {},
    defaultStyle: { backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }
  },
  {
    type: 'video',
    label: 'Video Player',
    icon: <Video className="w-5 h-5" />,
    defaultProps: { src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4' },
    defaultStyle: { width: '300px', height: '200px', borderRadius: '8px' }
  },
  {
    type: 'search',
    label: 'Search Bar',
    icon: <Search className="w-5 h-5" />,
    defaultProps: { placeholder: 'Search...' },
    defaultStyle: { width: '300px', padding: '10px 40px 10px 12px', backgroundColor: '#374151', color: '#ffffff', borderRadius: '20px', border: '1px solid #6B7280' }
  },
  {
    type: 'notification',
    label: 'Notification',
    icon: <Bell className="w-5 h-5" />,
    defaultProps: { title: 'New Message', message: 'You have a new notification', type: 'info' },
    defaultStyle: { backgroundColor: '#1E40AF', padding: '16px', borderRadius: '8px', width: '300px', color: '#ffffff' }
  },
  {
    type: 'testimonial',
    label: 'Testimonial',
    icon: <MessageCircle className="w-5 h-5" />,
    defaultProps: { quote: 'This product changed my life!', author: 'Jane Smith', role: 'CEO, Company' },
    defaultStyle: { backgroundColor: '#374151', padding: '24px', borderRadius: '12px', width: '350px' }
  },
  {
    type: 'pricing-card',
    label: 'Pricing Card',
    icon: <CreditCard className="w-5 h-5" />,
    defaultProps: { plan: 'Pro Plan', price: '$29', period: '/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    defaultStyle: { backgroundColor: '#374151', padding: '24px', borderRadius: '12px', width: '280px', textAlign: 'center' }
  },
  {
    type: 'progress-bar',
    label: 'Progress Bar',
    icon: <BarChart className="w-5 h-5" />,
    defaultProps: { progress: 75, label: 'Progress' },
    defaultStyle: { width: '300px', backgroundColor: '#374151', padding: '16px', borderRadius: '8px' }
  },
  {
    type: 'badge',
    label: 'Badge',
    icon: <Star className="w-5 h-5" />,
    defaultProps: { text: 'New', variant: 'primary' },
    defaultStyle: { backgroundColor: '#8B5CF6', color: '#ffffff', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }
  },
  {
    type: 'breadcrumb',
    label: 'Breadcrumb',
    icon: <Navigation className="w-5 h-5" />,
    defaultProps: { items: ['Home', 'Products', 'Category', 'Item'] },
    defaultStyle: { color: '#9CA3AF', fontSize: '14px' }
  },
  {
    type: 'accordion',
    label: 'Accordion',
    icon: <FileText className="w-5 h-5" />,
    defaultProps: { items: [{ title: 'Section 1', content: 'Content for section 1' }, { title: 'Section 2', content: 'Content for section 2' }] },
    defaultStyle: { backgroundColor: '#374151', borderRadius: '8px', width: '400px' }
  },
  {
    type: 'timer',
    label: 'Timer',
    icon: <Clock className="w-5 h-5" />,
    defaultProps: { time: '10:30:45', label: 'Time Remaining' },
    defaultStyle: { backgroundColor: '#374151', padding: '20px', borderRadius: '8px', textAlign: 'center' }
  },
  {
    type: 'map',
    label: 'Map',
    icon: <MapPin className="w-5 h-5" />,
    defaultProps: { location: 'New York, NY' },
    defaultStyle: { backgroundColor: '#374151', width: '400px', height: '250px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }
  }
];

interface DraggableComponentProps {
  component: ComponentItem;
  onAddComponent: (component: Omit<Component, 'id' | 'position'>, position: { x: number; y: number }) => void;
}

const DraggableComponent: React.FC<DraggableComponentProps> = ({ component, onAddComponent }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: {
      type: component.type,
      props: component.defaultProps,
      style: component.defaultStyle,
      onAddComponent
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-move transition-all duration-200 hover:bg-gray-600 ${
        isDragging ? 'opacity-50 bg-gray-600' : 'bg-gray-700'
      }`}
    >
      <div className="text-purple-400">{component.icon}</div>
      <span className="text-sm font-medium">{component.label}</span>
    </div>
  );
};

interface SidebarProps {
  onAddComponent: (component: Omit<Component, 'id' | 'position'>, position: { x: number; y: number }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onAddComponent }) => {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-200">Components</h2>
        <div className="space-y-2">
          {componentLibrary.map((component) => (
            <DraggableComponent key={component.type} component={component} onAddComponent={onAddComponent} />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">Backend Features</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Authentication</span>
          </div>
          <div className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Database</span>
          </div>
          <div className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>API Routes</span>
          </div>
          <div className="flex items-center space-x-2 p-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>File Storage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;