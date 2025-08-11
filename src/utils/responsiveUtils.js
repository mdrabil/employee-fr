// Responsive utility functions and constants

// Breakpoint constants
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Responsive class utilities
export const RESPONSIVE_CLASSES = {
  // Container classes
  container: 'w-full max-w-full overflow-x-hidden',
  containerPadding: 'p-2 md:p-4 lg:p-6',
  
  // Text classes
  text: {
    xs: 'text-xs md:text-sm',
    sm: 'text-sm md:text-base',
    base: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl',
    xl: 'text-xl md:text-2xl',
    '2xl': 'text-2xl md:text-3xl',
  },
  
  // Spacing classes
  spacing: {
    xs: 'space-y-1 md:space-y-2',
    sm: 'space-y-2 md:space-y-3',
    base: 'space-y-3 md:space-y-4',
    lg: 'space-y-4 md:space-y-6',
    xl: 'space-y-6 md:space-y-8',
  },
  
  // Grid classes
  grid: {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-4',
  },
  
  // Flex classes
  flex: {
    row: 'flex flex-col md:flex-row',
    col: 'flex flex-col',
    center: 'flex items-center justify-center',
    between: 'flex flex-col md:flex-row justify-between items-start md:items-center',
  },
  
  // Button classes
  button: {
    primary: 'w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-3 px-4 md:px-6 rounded transition-colors text-sm md:text-base font-medium',
    secondary: 'w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white py-2 md:py-3 px-4 md:px-6 rounded transition-colors text-sm md:text-base font-medium',
    danger: 'w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white py-2 md:py-3 px-4 md:px-6 rounded transition-colors text-sm md:text-base font-medium',
  },
  
  // Input classes
  input: 'w-full p-2 md:p-3 border rounded text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-orange-400',
  
  // Table classes
  table: {
    wrapper: 'table-responsive',
    cell: 'px-2 md:px-4 py-2 text-xs md:text-sm',
    header: 'px-2 md:px-4 py-2 text-xs md:text-sm font-medium',
  },
};

// Responsive helper functions
export const getResponsiveValue = (mobile, tablet, desktop) => {
  return {
    mobile,
    tablet: tablet || mobile,
    desktop: desktop || tablet || mobile,
  };
};

// Check if current screen size matches breakpoint
export const isScreenSize = (breakpoint) => {
  if (typeof window === 'undefined') return false;
  
  const width = window.innerWidth;
  switch (breakpoint) {
    case 'xs':
      return width >= BREAKPOINTS.xs && width < BREAKPOINTS.sm;
    case 'sm':
      return width >= BREAKPOINTS.sm && width < BREAKPOINTS.md;
    case 'md':
      return width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
    case 'lg':
      return width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl;
    case 'xl':
      return width >= BREAKPOINTS.xl && width < BREAKPOINTS['2xl'];
    case '2xl':
      return width >= BREAKPOINTS['2xl'];
    default:
      return false;
  }
};

// Check if screen is mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < BREAKPOINTS.md;
};

// Check if screen is tablet
export const isTablet = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.md && window.innerWidth < BREAKPOINTS.lg;
};

// Check if screen is desktop
export const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS.lg;
};

// Get current screen size
export const getCurrentScreenSize = () => {
  if (typeof window === 'undefined') return 'lg';
  
  const width = window.innerWidth;
  if (width < BREAKPOINTS.sm) return 'xs';
  if (width < BREAKPOINTS.md) return 'sm';
  if (width < BREAKPOINTS.lg) return 'md';
  if (width < BREAKPOINTS.xl) return 'lg';
  if (width < BREAKPOINTS['2xl']) return 'xl';
  return '2xl';
};

// Responsive hook for React components
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState(getCurrentScreenSize());
  const [isMobileScreen, setIsMobileScreen] = useState(isMobile());
  const [isTabletScreen, setIsTabletScreen] = useState(isTablet());
  const [isDesktopScreen, setIsDesktopScreen] = useState(isDesktop());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getCurrentScreenSize());
      setIsMobileScreen(isMobile());
      setIsTabletScreen(isTablet());
      setIsDesktopScreen(isDesktop());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    screenSize,
    isMobile: isMobileScreen,
    isTablet: isTabletScreen,
    isDesktop: isDesktopScreen,
  };
};

// Import useState and useEffect for the hook
import { useState, useEffect } from 'react';
