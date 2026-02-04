/**
 * Zovo Extension Template - Content Script
 * Runs on web pages to interact with page content
 */

import type { Message, MessageResponse } from '../lib/types';

// ============================================================================
// Message Handler
// ============================================================================

chrome.runtime.onMessage.addListener(
  (
    message: Message,
    _sender: chrome.runtime.MessageSender,
    sendResponse: (response: MessageResponse) => void
  ) => {
    handleMessage(message)
      .then(sendResponse)
      .catch((error: Error) => {
        console.error('Content script error:', error);
        sendResponse({ success: false, error: error.message });
      });

    // Return true to keep the message channel open
    return true;
  }
);

/**
 * Handle incoming messages
 */
async function handleMessage(message: Message): Promise<MessageResponse> {
  const { action } = message;

  switch (action) {
    case 'PING':
      return { success: true, data: 'pong' };

    // Add your extension-specific actions here
    // case 'YOUR_ACTION':
    //   return await handleYourAction(payload);

    default:
      return { success: false, error: `Unknown action: ${action}` };
  }
}

// ============================================================================
// Page Interaction Utilities
// ============================================================================

/**
 * Get the current page URL
 */
export function getCurrentUrl(): string {
  return window.location.href;
}

/**
 * Get the current page hostname
 */
export function getCurrentHostname(): string {
  return window.location.hostname;
}

/**
 * Query elements on the page
 */
export function queryElements<T extends Element>(selector: string): T[] {
  return Array.from(document.querySelectorAll<T>(selector));
}

/**
 * Wait for an element to appear
 */
export function waitForElement(
  selector: string,
  timeout = 5000
): Promise<Element | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);
  });
}

// ============================================================================
// Initialization
// ============================================================================

// Log when content script loads
console.debug('[EXTENSION_NAME] content script loaded');

// Export for module usage
export { getCurrentUrl, getCurrentHostname, queryElements, waitForElement };
