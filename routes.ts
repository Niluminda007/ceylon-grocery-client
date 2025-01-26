/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  "/", // Home page
  "/products",
  "/categories", // Categories page
  "/about", // About page
  "/contact", // Contact page
  "/api/fetch",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after logging in
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/";

export const checkoutRoutes = [
  "/checkout/info", // Checkout information page
  "/checkout/delivery", // Delivery options
  "/checkout/payment", // Payment options
  "/checkout/review", // Order review page
  "/checkout/complete", // Order completion/confirmation page
];
