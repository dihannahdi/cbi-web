/**
 * SAFE DATA ACCESS UTILITIES
 * Prevents "Cannot read properties of undefined" errors
 */

/**
 * Safely access nested object properties
 * Returns defaultValue if path doesn't exist
 */
export function safeGet<T>(
  obj: any,
  path: string,
  defaultValue: T | null = null
): T | null {
  try {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === null || result === undefined) {
        return defaultValue;
      }
      result = result[key];
    }
    
    return result !== undefined ? result : defaultValue;
  } catch (error) {
    console.warn(`safeGet failed for path "${path}":`, error);
    return defaultValue;
  }
}

/**
 * Safely access image URL
 * Returns placeholder if image is missing
 */
export function safeImageUrl(
  image: any,
  placeholder: string = '/images/placeholder.png'
): string {
  if (!image) return placeholder;
  if (typeof image === 'string') return image;
  if (image.url) return image.url;
  return placeholder;
}

/**
 * Safely access array with fallback
 */
export function safeArray<T>(
  arr: T[] | null | undefined,
  defaultValue: T[] = []
): T[] {
  return Array.isArray(arr) ? arr : defaultValue;
}

/**
 * Safely render content with fallback
 */
export function safeRender<T>(
  data: T | null | undefined,
  renderFn: (data: T) => React.ReactNode,
  fallback: React.ReactNode = null
): React.ReactNode {
  if (!data) return fallback;
  
  try {
    return renderFn(data);
  } catch (error) {
    console.error('safeRender failed:', error);
    return fallback;
  }
}

/**
 * Validate required fields in data object
 * Returns array of missing field names
 */
export function validateRequiredFields(
  data: any,
  requiredFields: string[]
): string[] {
  const missing: string[] = [];
  
  for (const field of requiredFields) {
    if (safeGet(data, field) === null) {
      missing.push(field);
    }
  }
  
  return missing;
}

/**
 * Log missing data for debugging
 */
export function logMissingData(
  componentName: string,
  data: any,
  requiredFields: string[]
) {
  if (process.env.NODE_ENV === 'development') {
    const missing = validateRequiredFields(data, requiredFields);
    if (missing.length > 0) {
      console.warn(
        `[${componentName}] Missing required fields:`,
        missing.join(', ')
      );
      console.warn('Data received:', data);
    }
  }
}

/**
 * Create safe component wrapper that validates data
 */
export function withDataValidation<P extends { data: any }>(
  Component: React.ComponentType<P>,
  requiredFields: string[],
  componentName: string
) {
  return function SafeComponent(props: P) {
    logMissingData(componentName, props.data, requiredFields);
    
    const missing = validateRequiredFields(props.data, requiredFields);
    
    if (missing.length > 0) {
      return (
        <div className="my-4 rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800">
            ⚠️ {componentName}: Missing required data ({missing.join(', ')})
          </p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}

/**
 * Type-safe data fetcher with error handling
 */
export async function safeFetch<T>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      return {
        data: null,
        error: `HTTP ${response.status}: ${response.statusText}`
      };
    }
    
    const data = await response.json();
    return { data: data as T, error: null };
  } catch (error) {
    console.error('safeFetch error:', error);
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
