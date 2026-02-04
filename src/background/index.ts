/**
 * Zovo Extension Template - Background Service Worker
 * Handles extension lifecycle, message routing, and coordination
 */

import { storage } from '../lib/storage';
import { messaging } from '../lib/messaging';
import { analytics } from '../lib/analytics';

// ============================================================================
// Extension Lifecycle
// ============================================================================

/** Handle extension installation */
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.debug('[EXTENSION_NAME] installed');

    // Set installation timestamp
    await storage.setInstalledAt();

    // Initialize storage with defaults
    await storage.getSettings();
    await storage.getStats();

    // Track installation
    await analytics.track('extension_installed', {
      version: chrome.runtime.getManifest().version,
    });

    // Open onboarding page (optional)
    // chrome.tabs.create({
    //   url: chrome.runtime.getURL('onboarding/welcome.html'),
    // });

  } else if (details.reason === 'update') {
    const previousVersion = details.previousVersion;
    const currentVersion = chrome.runtime.getManifest().version;
    console.debug(`[EXTENSION_NAME] updated from ${previousVersion} to ${currentVersion}`);

    // Track update
    await analytics.track('extension_updated', {
      previousVersion,
      currentVersion,
    });
  }
});

// ============================================================================
// Message Handling
// ============================================================================

/** Set up message listeners */
messaging.createListener({
  GET_SETTINGS: async () => {
    return storage.getSettings();
  },

  UPDATE_SETTINGS: async (payload: unknown) => {
    await storage.updateSettings(payload as Record<string, unknown>);
    return { success: true };
  },

  GET_STATS: async () => {
    return storage.getStats();
  },

  TRACK_ACTION: async () => {
    const stats = await storage.incrementActionCount();
    return stats;
  },

  PING: async () => {
    return 'pong';
  },
});

// ============================================================================
// Tab Events (Optional)
// ============================================================================

// Uncomment if you need to react to tab changes
/*
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // Handle tab activation
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    // Handle page load complete
  }
});
*/

// ============================================================================
// Alarms (Optional)
// ============================================================================

// Set up periodic tasks
async function setupAlarms(): Promise<void> {
  // Example: Daily reset alarm
  await chrome.alarms.clear('dailyReset');
  chrome.alarms.create('dailyReset', {
    periodInMinutes: 1440, // 24 hours
  });
}

// Handle alarm events
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'dailyReset') {
    console.debug('Daily reset triggered');
    await storage.resetDailyCount();
  }
});

// ============================================================================
// Initialization
// ============================================================================

// Set up alarms on startup
setupAlarms().catch(console.error);

// Log initialization
console.debug('[EXTENSION_NAME] background service worker initialized');

// Track session start
analytics.track('session_start', {
  version: chrome.runtime.getManifest().version,
}).catch(console.error);
