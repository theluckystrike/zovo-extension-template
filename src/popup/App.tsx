import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { messaging } from '../lib/messaging';
import type { Settings } from '../lib/types';

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await messaging.send<void, Settings>('GET_SETTINGS');
      if (response.success && response.data) {
        setSettings(response.data);
      } else {
        setError(response.error || 'Failed to load settings');
      }
    } catch (e) {
      setError('Failed to connect to extension');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsClick = () => {
    chrome.runtime.openOptionsPage();
  };

  if (loading) {
    return (
      <div className="zovo-popup">
        <Header title="[EXTENSION_NAME]" onSettingsClick={handleSettingsClick} />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-zovo-text-secondary">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="zovo-popup">
        <Header title="[EXTENSION_NAME]" onSettingsClick={handleSettingsClick} />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="text-zovo-error mb-2">Error</div>
          <div className="text-zovo-text-secondary text-sm">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="zovo-popup">
      <Header title="[EXTENSION_NAME]" onSettingsClick={handleSettingsClick} />

      <main className="flex-1 p-4">
        {/* Main content area - customize for your extension */}
        <div className="zovo-card mb-4">
          <h2 className="text-lg font-semibold mb-2">Welcome</h2>
          <p className="text-zovo-text-secondary text-sm">
            Your extension is ready to use. Customize this popup for your needs.
          </p>
        </div>

        {/* Action button example */}
        <button className="zovo-btn zovo-btn-primary zovo-btn-block">
          Primary Action
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default App;
