'use client';
import {useEffect} from 'react';

export default function GoogleTranslate() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // Hide Google Translate bar that appears at top
    const hideTranslateBar = () => {
      // Hide all possible Google Translate bars and banners
      const selectors = [
        'body > .skiptranslate',
        'body > div[id^="google_translate"]:not(#google_translate_element)',
        '.goog-te-banner-frame',
        '#google_translate_element + div',
        'div[style*="position: absolute"][style*="left: -42px"]',
        'div[style*="position: absolute"][style*="top: -42px"]',
      ];

      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((bar: any) => {
            if (bar && bar.id !== 'google_translate_element') {
              bar.style.cssText = 'display: none !important; visibility: hidden !important; height: 0 !important; max-height: 0 !important; overflow: hidden !important; opacity: 0 !important; position: absolute !important; top: -9999px !important; left: -9999px !important;';
            }
          });
        } catch (e) {
          // Ignore selector errors
        }
      });
      
      // Hide iframes
      const iframes = document.querySelectorAll('iframe[src*="translate.googleapis.com"], iframe[src*="translate.google.com"]');
      iframes.forEach((iframe: any) => {
        iframe.style.cssText = 'display: none !important; visibility: hidden !important; height: 0 !important; width: 0 !important; position: absolute !important; top: -9999px !important; left: -9999px !important;';
        const parent = iframe.closest('.goog-te-banner-frame, .skiptranslate, div[style*="position: absolute"]');
        if (parent) {
          (parent as HTMLElement).style.cssText = 'display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important;';
        }
      });
    };

    // Wait for DOM to be ready
    const initTranslate = () => {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="translate_a/element.js"]');
      
      if (existingScript) {
        // Script already loaded, wait for element and initialize
        waitForElementAndInit();
        hideTranslateBar();
        // Set up observer to hide bar when it appears
        const observer = new MutationObserver(hideTranslateBar);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
      }

      // Create script with proper protocol
      const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
      const addScript = document.createElement('script');
      addScript.src = `${protocol}//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      addScript.async = true;
      addScript.defer = true;
      
      // Set up callback before appending script
      (window as any).googleTranslateElementInit = () => {
        // Wait a bit for DOM to be ready
        setTimeout(() => {
          waitForElementAndInit();
          hideTranslateBar();
          
          // Set up observer to continuously hide the bar
          const observer = new MutationObserver(hideTranslateBar);
          observer.observe(document.body, { childList: true, subtree: true });
        }, 100);
      };

      // Handle script load errors
      addScript.onerror = () => {
        console.error('Failed to load Google Translate script');
      };

      document.body.appendChild(addScript);
    };

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initTranslate);
    } else {
      // DOM already ready
      setTimeout(initTranslate, 100);
    }

    // Set up continuous hiding
    const hideInterval = setInterval(hideTranslateBar, 500);
    const observer = new MutationObserver(hideTranslateBar);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(hideInterval);
      observer.disconnect();
    };
  }, []);

  const waitForElementAndInit = () => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const checkElement = () => {
      attempts++;
      
      if (attempts > maxAttempts) {
        console.warn('Google Translate initialization timeout');
        return;
      }

      const element = document.getElementById('google_translate_element');
      
      if (element && (window as any).google?.translate) {
        // Check if already initialized
        if (!element.hasChildNodes() || element.children.length === 0) {
          try {
            new (window as any).google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,fr,ar,ta,te',
                layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
              },
              'google_translate_element'
            );
            
            // Wait a bit more for the select element to be created
            setTimeout(() => {
              const select = element.querySelector('select');
              if (select) {
                // Dispatch a custom event to notify LanguageSelector
                window.dispatchEvent(new CustomEvent('googleTranslateReady'));
              }
            }, 300);
          } catch (e) {
            console.error('Error initializing Google Translate:', e);
            // Retry after a delay
            if (attempts < maxAttempts) {
              setTimeout(checkElement, 200);
            }
          }
        } else {
          // Already initialized, notify LanguageSelector
          window.dispatchEvent(new CustomEvent('googleTranslateReady'));
        }
      } else {
        // Element or Google Translate not ready yet, try again
        setTimeout(checkElement, 100);
      }
    };
    
    // Start checking after a small delay to ensure DOM is ready
    setTimeout(checkElement, 100);
  };

  return null;
}

