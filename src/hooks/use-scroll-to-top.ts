/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect} from "react";
import {useLocation} from "react-router";

/**
 * A custom hook that scrolls the window to the top when the route changes
 * @param options Optional configuration object
 * @param options.behavior The scroll behavior ('auto' | 'smooth')
 * @param options.topOffset The number of pixels from the top to scroll to
 * @param options.dependencies Additional dependencies that should trigger a scroll to top
 */
interface ScrollToTopOptions {
  behavior?: ScrollBehavior;
  topOffset?: number;
  dependencies?: any[];
}

/**
 * Hook to automatically scroll to the top of the page when route changes
 * or when specified dependencies change
 */
export const useScrollToTop = (options: ScrollToTopOptions = {}) => {
  const {pathname} = useLocation();
  const {behavior = "smooth", topOffset = 0, dependencies = []} = options;

  useEffect(() => {
    window.scrollTo({
      top: topOffset,
      behavior: behavior,
    });
  }, [pathname, topOffset, behavior, ...dependencies]);
};

/**
 * Component that uses the useScrollToTop hook
 * Useful for wrapping around your app or specific routes
 */
export const ScrollToTop = (
  props: ScrollToTopOptions & {children?: React.ReactNode}
) => {
  const {children, ...options} = props;
  useScrollToTop(options);
  return children;
};

/**
 * Utility function to manually scroll to top
 * @param options Configuration options for the scroll
 */
export const scrollToTop = (
  options: Omit<ScrollToTopOptions, "dependencies"> = {}
) => {
  const {behavior = "smooth", topOffset = 0} = options;
  window.scrollTo({
    top: topOffset,
    behavior,
  });
};
