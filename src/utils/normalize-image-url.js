/**
 * @file normalize-image-url.js
 * @description
 * Utility functions for normalizing image URLs, specifically handling
 * Cloudinary URLs to ensure they use HTTPS and are properly formatted.
 */

/**
 * Regular expression pattern to match Cloudinary-hosted images.
 * Matches URLs starting with "http://", "https://", or "//" from res.cloudinary.com or media.cloudinary.com
 *
 * @constant {RegExp}
 */
const CLOUDINARY_HOST_PATTERN = /(^https?:)?\/\/(?:res|media)\.cloudinary\.com\//i;

/**
 * Normalize an image URL.
 *
 * This function ensures:
 * - URLs that start with '//' and are hosted on Cloudinary are prefixed with 'https:'.
 * - URLs that start with 'http://' on Cloudinary are replaced with 'https://'.
 * - Non-Cloudinary URLs or already normalized URLs are returned as-is.
 * - Non-string or empty URLs return `null`.
 *
 * @param {string} url - The image URL to normalize.
 * @returns {string|null} - The normalized URL, or null if input is invalid.
 *
 * @example
 * normalizeImageUrl("//res.cloudinary.com/demo/image/upload/sample.jpg")
 * // Returns: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
 *
 * normalizeImageUrl("http://res.cloudinary.com/demo/image/upload/sample.jpg")
 * // Returns: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
 *
 * normalizeImageUrl("https://example.com/image.png")
 * // Returns: "https://example.com/image.png"
 */
export const normalizeImageUrl = (url) => {
  if (typeof url !== "string") {
    return url ?? null;
  }

  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return null;
  }

  if (trimmedUrl.startsWith("//") && CLOUDINARY_HOST_PATTERN.test(trimmedUrl)) {
    return `https:${trimmedUrl}`;
  }

  if (trimmedUrl.startsWith("http://") && CLOUDINARY_HOST_PATTERN.test(trimmedUrl)) {
    return trimmedUrl.replace(/^http:\/\//i, "https://");
  }

  return trimmedUrl;
};

/**
 * Normalize a user's profile image URL.
 *
 * This function takes a user object and normalizes its `profileImageUrl` field
 * using `normalizeImageUrl`. It returns a new object with the normalized image URL.
 *
 * @param {Object} user - The user object to normalize.
 * @param {string} user.profileImageUrl - The URL of the user's profile image.
 * @returns {Object|null} - A new user object with the normalized `profileImageUrl`.
 *
 * @example
 * normalizeUserProfileImage({ profileImageUrl: "//res.cloudinary.com/demo/image/upload/sample.jpg" })
 * // Returns: { profileImageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg" }
 *
 * normalizeUserProfileImage(null)
 * // Returns: null
 */
export const normalizeUserProfileImage = (user) => {
  if (!user || typeof user !== "object") {
    return user;
  }

  return {
    ...user,
    profileImageUrl: normalizeImageUrl(user.profileImageUrl),
  };
};