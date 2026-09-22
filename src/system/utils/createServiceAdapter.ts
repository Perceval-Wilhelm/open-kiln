import { FEATURE_FLAGS } from "~config/feature-flags.config.ts";

type ServiceImplementations<T> = {
  mock: () => Promise<T>;
  real: () => Promise<T>;
};

type ServiceAdapterOptions = {
  featureFlagKey: keyof typeof FEATURE_FLAGS;
  cacheInstance?: boolean;
};

/**
 * Generic service adapter factory that switches between mock and real implementations
 * based on feature flags with optional caching
 */
export function createServiceAdapter<T extends Record<string, unknown>>(
  implementations: ServiceImplementations<T>,
  options: ServiceAdapterOptions,
): T {
  const { featureFlagKey, cacheInstance = false } = options;

  let cachedInstance: T | null = null;

  const getImplementation = async (): Promise<T> => {
    // Use cached instance if caching is enabled and instance exists
    if (cacheInstance && cachedInstance) {
      return cachedInstance;
    }

    // Check if global mock flag is enabled first
    const globalMockFlag = FEATURE_FLAGS.USE_MOCK_APIS;
    const specificMockFlag = FEATURE_FLAGS[featureFlagKey];

    // Use mock if either global flag is true OR specific flag is true
    const useMock = globalMockFlag || specificMockFlag;

    const instance = useMock ? await implementations.mock() : await implementations.real();

    // Cache the instance if caching is enabled
    if (cacheInstance) {
      cachedInstance = instance;
    }

    return instance;
  };

  // Create a proxy that lazily loads the implementation
  return new Proxy({} as T, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && prop in target) {
        return Reflect.get(target, prop, receiver);
      }

      // Return a function that loads the implementation and calls the method
      return async (...args: Array<unknown>) => {
        const implementation = await getImplementation();
        const method = implementation[prop as keyof T];

        if (typeof method === "function") {
          return method.apply(implementation, args);
        }

        return method;
      };
    },
  });
}
