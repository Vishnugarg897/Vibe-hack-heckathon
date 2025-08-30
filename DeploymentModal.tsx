import React, { useState } from 'react';
import { X, Globe, Database, Shield, Zap, Check, ExternalLink } from 'lucide-react';
import { Component } from '../App';

interface DeploymentModalProps {
  projectName: string;
  components: Component[];
  onClose: () => void;
}

const DeploymentModal: React.FC<DeploymentModalProps> = ({ projectName, components, onClose }) => {
  const [deploymentStep, setDeploymentStep] = useState<'config' | 'deploying' | 'success'>('config');
  const [selectedProvider, setSelectedProvider] = useState<'vercel' | 'netlify' | 'supabase'>('vercel');
  const [deploymentUrl, setDeploymentUrl] = useState('');

  const providers = {
    vercel: { name: 'Vercel', icon: '▲', description: 'Optimized for React and Next.js' },
    netlify: { name: 'Netlify', icon: '◆', description: 'Great for static sites and JAMstack' },
    supabase: { name: 'Supabase', icon: '⚡', description: 'Full-stack with database included' },
  };

  const handleDeploy = async () => {
    setDeploymentStep('deploying');
    
    // Simulate deployment process
    setTimeout(() => {
      setDeploymentUrl(`https://${projectName.toLowerCase().replace(/\s+/g, '-')}.${selectedProvider}.app`);
      setDeploymentStep('success');
    }, 3000);
  };

  const deploymentFeatures = [
    { icon: <Globe className="w-5 h-5" />, title: 'Global CDN', description: 'Fast loading worldwide' },
    { icon: <Database className="w-5 h-5" />, title: 'Database Setup', description: 'Automated schema creation' },
    { icon: <Shield className="w-5 h-5" />, title: 'SSL Certificate', description: 'Secure HTTPS connection' },
    { icon: <Zap className="w-5 h-5" />, title: 'Auto Scaling', description: 'Handles traffic spikes' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-full flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Deploy Your Application</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-6">
          {deploymentStep === 'config' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Choose Deployment Platform</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(providers).map(([key, provider]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedProvider(key as 'vercel' | 'netlify' | 'supabase')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedProvider === key
                          ? 'border-purple-500 bg-purple-500 bg-opacity-20'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-2">{provider.icon}</div>
                      <div className="font-medium mb-1">{provider.name}</div>
                      <div className="text-sm text-gray-400">{provider.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Project Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Name</label>
                    <input
                      type="text"
                      value={projectName}
                      readOnly
                      className="w-full p-3 bg-gray-700 rounded border-none text-gray-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Environment</label>
                    <select className="w-full p-3 bg-gray-700 rounded border-none">
                      <option>Production</option>
                      <option>Staging</option>
                      <option>Development</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Deployment Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deploymentFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-700 rounded-lg">
                      <div className="text-green-500">{feature.icon}</div>
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-sm text-gray-400">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-medium mb-2">Generated Backend Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>User authentication system</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Database schema based on components</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>RESTful API endpoints</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>File upload handling</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {deploymentStep === 'deploying' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mb-6"></div>
              <h3 className="text-xl font-medium mb-2">Deploying Your Application</h3>
              <p className="text-gray-400 mb-6">This may take a few minutes...</p>
              
              <div className="w-full max-w-md space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Building frontend</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Generating backend APIs</span>
                  <Check className="w-4 h-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Setting up database</span>
                  <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Configuring SSL</span>
                  <div className="w-4 h-4"></div>
                </div>
              </div>
            </div>
          )}

          {deploymentStep === 'success' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-medium mb-2">Deployment Successful!</h3>
              <p className="text-gray-400 mb-6">Your application is now live on the web</p>
              
              <div className="w-full max-w-md bg-gray-700 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-400 mb-1">Your app is live at:</div>
                <div className="flex items-center justify-between">
                  <code className="text-green-400">{deploymentUrl}</code>
                  <button className="p-1 text-gray-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Site</span>
                </button>
                <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                  Share Link
                </button>
              </div>
            </div>
          )}
        </div>
        
        {deploymentStep === 'config' && (
          <div className="border-t border-gray-700 p-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {components.length} components ready for deployment
              </div>
              <button
                onClick={handleDeploy}
                className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Deploy to {providers[selectedProvider].name}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentModal;