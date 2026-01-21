// types.ts
export enum ApiPath {
  // Dashboard paths
  DASHBOARD = "/dashboard",

  // About Us path
  ABOUT_US = "/about-us",

  // Article paths
  BLOGS = "/blogs",
  NEWS = "/articles",
  NEWS_SECTION = "/news-section",
  BLOG_SECTION = "/blog-section",
  DOCUMENTS = "/media-and-information",

  // Contact path
  CONTACT = "/contact",

  PRODUCTS_AND_SERVICES = "/product-and-service",

  PRODUCT_AGRICULTURE = "/product-agriculture",

  PRODUCT_LIVESTOCK = "/product-livestock",

  PRODUCT_FISHERY = "/product-fishery",
}

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiRequestConfig {
  path: ApiPath;
  method?: ApiMethod;
  pathParams?: Record<string, string>;
  queryParams?: any;
  body?: never;
  locale?: string; // i18n locale parameter for Strapi
}

const BASE_URL = process.env.NEXT_PUBLIC_URL_API || 'https://cbi-backend.my.id';
// Temporarily disable token to use Public permissions
const TOKEN = undefined; // process.env.NEXT_PUBLIC_TOKEN_API;

function replaceDynamicPathParams(
  path: string,
  params?: Record<string, string>,
): string {
  if (!params) return path;
  return Object.entries(params).reduce(
    (updatedPath, [key, value]) => updatedPath.replace(`:${key}`, value),
    path,
  );
}

// Helper function to build query string with locale
function buildQueryString(queryParams: any, locale?: string): string {
  let queryString = queryParams
    ? typeof queryParams === 'string'
      ? "?" + queryParams
      : "?" + new URLSearchParams(queryParams as Record<string, string>).toString()
    : "";
  
  // Add locale parameter for Strapi i18n
  if (locale) {
    queryString = queryString 
      ? `${queryString}&locale=${locale}` 
      : `?locale=${locale}`;
  }
  
  return queryString;
}

// Helper function to make a single fetch request
async function makeFetchRequest<T>(
  url: string,
  requestOptions: RequestInit
): Promise<{ data: T | null; status: number; ok: boolean }> {
  const response = await fetch(url, requestOptions);
  
  if (!response.ok) {
    return { data: null, status: response.status, ok: false };
  }
  
  const data = await response.json();
  return { data, status: response.status, ok: true };
}

export async function apiRequest<T>({
  path,
  pathParams,
  queryParams,
  method = ApiMethod.GET,
  body,
  locale,
}: ApiRequestConfig): Promise<T> {
  try {
    // Replace dynamic path parameters (e.g., :id)
    const resolvedPath = replaceDynamicPathParams(path, pathParams);

    // Request options
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    // Only add Authorization header if TOKEN exists
    if (TOKEN) {
      headers.Authorization = `Bearer ${TOKEN}`;
    }
    
    const requestOptions: RequestInit = {
      method,
      headers,
      // Use ISR with 60 second revalidation for better build compatibility
      // This allows static generation while keeping data reasonably fresh
      next: { revalidate: 60 },
    };

    // Add body for non-GET requests
    if (body && method !== ApiMethod.GET) {
      requestOptions.body = JSON.stringify(body);
    }

    // Build query string with requested locale
    const queryString = buildQueryString(queryParams, locale);
    const url = `${BASE_URL}/api${resolvedPath}${queryString}`;

    // Make the request
    const result = await makeFetchRequest<T>(url, requestOptions);

    // If request succeeded, return data
    if (result.ok && result.data) {
      return result.data;
    }

    // If we don't have data, throw an error
    throw new ApiError(
      "API request failed",
      result.status || 404,
      "Not Found",
    );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Re-throw API errors
    }
    // Handle network errors or other unexpected errors
    throw new ApiError(
      "Network error or unexpected error occurred",
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}
