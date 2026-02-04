/**
 * Zovo Extension Template - TypeScript Type Definitions
 * Core interfaces and types for the extension
 */

// ============================================================================
// Storage Types
// ============================================================================

/** Extension settings */
export interface Settings {
  theme: 'light' | 'dark' | 'system';
  // Add your extension-specific settings here
}

/** Usage statistics */
export interface UsageStats {
  actionCount: number;
  lastActionDate: number;
  dailyActionCount: number;
  dailyResetDate: number;
}

/** Complete storage data structure */
export interface StorageData {
  settings: Settings;
  usageStats: UsageStats;
  onboardingComplete: boolean;
  installedAt: number;
}

// ============================================================================
// Messaging Types
// ============================================================================

/** Message actions for inter-script communication */
export type MessageAction =
  | 'GET_SETTINGS'
  | 'UPDATE_SETTINGS'
  | 'GET_STATS'
  | 'TRACK_ACTION'
  | 'PING';

/** Base message structure */
export interface Message<T = unknown> {
  action: MessageAction;
  payload?: T;
}

/** Generic message response */
export interface MessageResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============================================================================
// Constants
// ============================================================================

/** Free tier daily action limit (0 = unlimited) */
export const FREE_TIER_DAILY_LIMIT = 0;

/** Storage keys for chrome.storage */
export const STORAGE_KEYS = {
  SETTINGS: 'settings',
  USAGE_STATS: 'usageStats',
  ONBOARDING_COMPLETE: 'onboardingComplete',
  INSTALLED_AT: 'installedAt',
} as const;

/** Default extension settings */
export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
};

/** Default usage statistics */
export const DEFAULT_USAGE_STATS: UsageStats = {
  actionCount: 0,
  lastActionDate: 0,
  dailyActionCount: 0,
  dailyResetDate: Date.now(),
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}
