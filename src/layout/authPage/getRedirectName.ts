/**
 * Utility function to extract a friendly redirect name from a URL
 * @param redirectUrl - The full redirect URL
 * @returns A formatted, user-friendly name for the redirect destination
 */
export const getRedirectName = (redirectUrl: string | undefined): string => {
  if (!redirectUrl) return '';

  try {
    const url = new URL(redirectUrl);
    const hostname = url.hostname;

    // Switch based on hostname patterns
    switch (true) {
      case hostname.includes('portal.shepherdcms'):
        return 'Portal';
      case hostname.includes('admin.shepherdcms'):
        return 'Admin';
      case hostname.includes('shepherdcms'):
        return 'ShepherdCMS';
      case hostname.includes('localhost'):
        // Try to extract from first path segment if available
        const pathSegment = url.pathname.split('/').filter(Boolean)[0];
        if (pathSegment) {
          return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1);
        }
        return 'Portal';
      default:
        // Fallback: try to extract domain name
        const domainParts = hostname.split('.');
        const mainDomain = domainParts[domainParts.length - 2] || hostname;
        return mainDomain.charAt(0).toUpperCase() + mainDomain.slice(1);
    }
  } catch (error) {
    // If URL parsing fails, try the old method
    try {
      const parts = redirectUrl.split(/[/.]/);
      if (parts[2]) {
        return parts[2].charAt(0).toUpperCase() + parts[2].slice(1).toLowerCase();
      }
    } catch {
      return '';
    }
    return '';
  }
};
