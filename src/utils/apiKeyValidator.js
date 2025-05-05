/**
 * Validate environment variables and API keys
 * @throws {Error} If required environment variables are missing
 */
export const validateEnvironmentVariables = () => {
  const requiredEnvVars = [
    'VITE_TMDB_API_KEY',
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_PROJECT_ID'
  ];

  const missingVars = requiredEnvVars.filter(varName => {
    const value = import.meta.env[varName];
    return !value || value.trim() === '' || value === 'YOUR_API_KEY_HERE';
  });

  if (missingVars.length > 0) {
    console.error('Missing or invalid environment variables:', missingVars);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

/**
 * Validate API key format (basic check)
 * @param {string} apiKey - API key to validate
 * @returns {boolean} Whether the API key looks valid
 */
export const isValidApiKeyFormat = (apiKey) => {
  // Basic format checks - adjust regex as needed for specific API key formats
  const apiKeyRegex = /^[a-zA-Z0-9_-]{10,}$/;
  return apiKeyRegex.test(apiKey);
};
