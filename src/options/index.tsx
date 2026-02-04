import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { messaging } from '../lib/messaging';
import type { Settings } from '../lib/types';
import '../popup/styles.css';

const Options: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await messaging.send<void, Settings>('GET_SETTINGS');
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;

    setSaving(true);
    try {
      const response = await messaging.send('UPDATE_SETTINGS', settings);
      if (response.success) {
        setMessage({ type: 'success', text: 'Settings saved!' });
      } else {
        setMessage({ type: 'error', text: response.error || 'Failed to save settings' });
      }
    } catch (e) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    if (settings) {
      setSettings({ ...settings, [key]: value });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zovo-black text-zovo-text-primary flex items-center justify-center">
        <div className="text-zovo-text-secondary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zovo-black text-zovo-text-primary p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="#7C3AED" />
            <text
              x="20"
              y="28"
              fontFamily="Inter, system-ui, sans-serif"
              fontSize="24"
              fontWeight="700"
              fill="white"
              textAnchor="middle"
            >
              z
            </text>
          </svg>
          <div>
            <h1 className="text-2xl font-semibold">[EXTENSION_NAME]</h1>
            <p className="text-zovo-text-secondary">Settings</p>
          </div>
        </div>

        {/* Settings Form */}
        <div className="space-y-6">
          {/* Theme Setting */}
          <div className="zovo-card">
            <h2 className="text-lg font-semibold mb-4">Appearance</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Theme</label>
                <select
                  value={settings?.theme || 'system'}
                  onChange={(e) =>
                    updateSetting('theme', e.target.value as 'light' | 'dark' | 'system')
                  }
                  className="zovo-input"
                >
                  <option value="system">System</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>

          {/* Add more settings sections here */}
          <div className="zovo-card">
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <p className="text-zovo-text-secondary text-sm">
              [EXTENSION_NAME] is part of the Zovo family of privacy-first Chrome extensions.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-zovo-text-muted">Version:</span>{' '}
                <span className="text-zovo-text-secondary">
                  {chrome.runtime.getManifest().version}
                </span>
              </p>
              <p>
                <span className="text-zovo-text-muted">Website:</span>{' '}
                <a
                  href="https://zovo.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zovo-violet hover:underline"
                >
                  zovo.one
                </a>
              </p>
              <p>
                <span className="text-zovo-text-muted">Support:</span>{' '}
                <a
                  href="mailto:hello@zovo.one"
                  className="text-zovo-violet hover:underline"
                >
                  hello@zovo.one
                </a>
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={saveSettings}
              disabled={saving}
              className="zovo-btn zovo-btn-primary"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>

            {message && (
              <span
                className={`text-sm ${
                  message.type === 'success' ? 'text-zovo-success' : 'text-zovo-error'
                }`}
              >
                {message.text}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mount React app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>
  );
}
