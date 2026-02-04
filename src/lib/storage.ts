/**
 * Zovo Extension Template - Storage Utilities
 * Generic Chrome storage operations with TypeScript support
 */

import {
  Settings,
  UsageStats,
  DEFAULT_SETTINGS,
  DEFAULT_USAGE_STATS,
  STORAGE_KEYS,
} from './types';

// ============================================================================
// Generic Storage Operations
// ============================================================================

/**
 * Get a value from chrome.storage.local
 */
export async function get<T>(key: string): Promise<T | null> {
  try {
    const result = await chrome.storage.local.get(key);
    return (result[key] as T) ?? null;
  } catch (e) {
    console.error(`Storage get error for ${key}:`, e);
    return null;
  }
}

/**
 * Set a value in chrome.storage.local
 */
export async function set<T>(key: string, value: T): Promise<void> {
  try {
    await chrome.storage.local.set({ [key]: value });
  } catch (e) {
    console.error(`Storage set error for ${key}:`, e);
    throw e;
  }
}

/**
 * Remove a value from chrome.storage.local
 */
export async function remove(key: string): Promise<void> {
  try {
    await chrome.storage.local.remove(key);
  } catch (e) {
    console.error(`Storage remove error for ${key}:`, e);
    throw e;
  }
}

/**
 * Clear all storage
 */
export async function clear(): Promise<void> {
  try {
    await chrome.storage.local.clear();
  } catch (e) {
    console.error('Storage clear error:', e);
    throw e;
  }
}

// ============================================================================
// Settings Operations
// ============================================================================

/**
 * Get extension settings
 */
export async function getSettings(): Promise<Settings> {
  const settings = await get<Settings>(STORAGE_KEYS.SETTINGS);
  return settings ?? { ...DEFAULT_SETTINGS };
}

/**
 * Update extension settings
 */
export async function updateSettings(updates: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const updated = { ...current, ...updates };
  await set(STORAGE_KEYS.SETTINGS, updated);
  return updated;
}

// ============================================================================
// Usage Statistics
// ============================================================================

/**
 * Get usage statistics
 */
export async function getStats(): Promise<UsageStats> {
  const stats = await get<UsageStats>(STORAGE_KEYS.USAGE_STATS);
  return stats ?? { ...DEFAULT_USAGE_STATS };
}

/**
 * Increment action count
 */
export async function incrementActionCount(): Promise<UsageStats> {
  const stats = await getStats();
  const now = Date.now();
  const today = new Date().toDateString();
  const lastDate = new Date(stats.dailyResetDate).toDateString();

  // Reset daily count if it's a new day
  if (today !== lastDate) {
    stats.dailyActionCount = 0;
    stats.dailyResetDate = now;
  }

  stats.actionCount++;
  stats.dailyActionCount++;
  stats.lastActionDate = now;

  await set(STORAGE_KEYS.USAGE_STATS, stats);
  return stats;
}

/**
 * Reset daily action count
 */
export async function resetDailyCount(): Promise<void> {
  const stats = await getStats();
  stats.dailyActionCount = 0;
  stats.dailyResetDate = Date.now();
  await set(STORAGE_KEYS.USAGE_STATS, stats);
}

// ============================================================================
// Installation & Onboarding
// ============================================================================

/**
 * Set installation timestamp
 */
export async function setInstalledAt(): Promise<void> {
  const existing = await get<number>(STORAGE_KEYS.INSTALLED_AT);
  if (!existing) {
    await set(STORAGE_KEYS.INSTALLED_AT, Date.now());
  }
}

/**
 * Get installation timestamp
 */
export async function getInstalledAt(): Promise<number | null> {
  return get<number>(STORAGE_KEYS.INSTALLED_AT);
}

/**
 * Check if onboarding is complete
 */
export async function isOnboardingComplete(): Promise<boolean> {
  const complete = await get<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE);
  return complete ?? false;
}

/**
 * Mark onboarding as complete
 */
export async function completeOnboarding(): Promise<void> {
  await set(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
}

// ============================================================================
// Export Storage Object
// ============================================================================

export const storage = {
  // Generic
  get,
  set,
  remove,
  clear,

  // Settings
  getSettings,
  updateSettings,

  // Statistics
  getStats,
  incrementActionCount,
  resetDailyCount,

  // Installation
  setInstalledAt,
  getInstalledAt,
  isOnboardingComplete,
  completeOnboarding,
};

export default storage;
