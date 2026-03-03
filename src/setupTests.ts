/**
 * Jest setup file
 * Add global mocks and configuration here
 */

declare const global: {
  chrome: any;
};

// Mock chrome API
const mockChrome = {
  runtime: {
    sendMessage: () => {},
    onMessage: {
      addListener: () => {},
      removeListener: () => {},
    },
    getURL: (path: string) => `chrome-extension://mock-id/${path}`,
    getManifest: () => ({
      version: '1.0.0',
      name: 'Test Extension',
    }),
    onInstalled: {
      addListener: () => {},
    },
  },
  storage: {
    local: {
      get: async () => ({}),
      set: async () => {},
      remove: async () => {},
      clear: async () => {},
    },
    sync: {
      get: async () => ({}),
      set: async () => {},
      remove: async () => {},
      clear: async () => {},
    },
    onChanged: {
      addListener: () => {},
    },
  },
  tabs: {
    query: async () => [],
    sendMessage: async () => {},
    create: async () => {},
    update: async () => {},
  },
  action: {
    setBadgeText: () => {},
    setBadgeBackgroundColor: () => {},
  },
  alarms: {
    create: () => {},
    clear: () => {},
    onAlarm: {
      addListener: () => {},
    },
  },
  notifications: {
    create: () => {},
  },
};

(global as any).chrome = mockChrome;
