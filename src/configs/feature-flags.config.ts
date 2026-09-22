// Feature flags to control mock vs real implementations
export const FEATURE_FLAGS = {
  // Set to true to use mock implementations, false for real API calls
  USE_MOCK_APIS: false,

  // Individual feature mocks (optional granular control)
  USE_MOCK_SESSION_API: false, // Sessions and services
  USE_MOCK_CHAT_API: false,
  USE_MOCK_SERVER_STATUS_API: false, // Keep server status real by default
} as const;

// Helper to check if we should use mock for a specific feature
export const shouldUseMock = (feature: keyof typeof FEATURE_FLAGS): boolean => {
  // Global override
  if ("USE_MOCK_APIS" in FEATURE_FLAGS && FEATURE_FLAGS.USE_MOCK_APIS) {
    return true;
  }

  return FEATURE_FLAGS[feature] ?? false;
};
