import { ENV } from "./env.js";

class APIKeyRotator {
  constructor(keys) {
    // Filter out undefined/null keys
    this.keys = keys.filter(key => key);
    this.currentIndex = 0;
    
    if (this.keys.length === 0) {
      throw new Error('No API keys provided');
    }
  }

  getNextKey() {
    const key = this.keys[this.currentIndex];
    
    // Move to next key (circular rotation)
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    
    return key;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  getTotalKeys() {
    return this.keys.length;
  }
}

// Create singleton instance with all API keys
const apiKeyRotator = new APIKeyRotator([
  ENV.FALLYTICS_AI_KEY1,
  ENV.FALLYTICS_AI_KEY2,
  ENV.FALLYTICS_AI_KEY3,
  ENV.FALLYTICS_AI_KEY4,
]);

export default apiKeyRotator;