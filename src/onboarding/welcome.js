/**
 * Welcome/Onboarding Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const getStartedBtn = document.getElementById('getStarted');

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Mark onboarding as complete
      try {
        await chrome.storage.local.set({ onboardingComplete: true });
      } catch (error) {
        console.error('Failed to save onboarding status:', error);
      }

      // Close the tab
      window.close();
    });
  }
});
