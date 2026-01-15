'use client';
import {useEffect} from 'react';

export default function GoogleTranslate() {
  useEffect(() => {
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

    // Check if script already exists
    if (document.querySelector('script[src*="translate_a/element.js"]')) {
      // Script already loaded, wait for element and initialize
      waitForElementAndInit();
      hideTranslateBar();
      // Set up observer to hide bar when it appears
      const observer = new MutationObserver(hideTranslateBar);
      observer.observe(document.body, { childList: true, subtree: true });
      return () => observer.disconnect();
    }

    const addScript = document.createElement('script');
    addScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addScript.async = true;
    document.body.appendChild(addScript);

    (window as any).googleTranslateElementInit = () => {
      // Wait for element to be available in DOM
      waitForElementAndInit();
      hideTranslateBar();
      
      // Set up observer to continuously hide the bar
      const observer = new MutationObserver(hideTranslateBar);
      observer.observe(document.body, { childList: true, subtree: true });
    };
  }, []);

  const waitForElementAndInit = () => {
    const checkElement = () => {
      const element = document.getElementById('google_translate_element');
      if (element && (window as any).google?.translate) {
        // Check if already initialized
        if (!element.hasChildNodes()) {
          try {
            new (window as any).google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,fr,ar,ta,te',
                layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
              },
              'google_translate_element'
            );
          } catch (e) {
            console.error('Error initializing Google Translate:', e);
          }
        }
      } else {
        // Element not found yet, try again after a short delay
        setTimeout(checkElement, 100);
      }
    };
    
    // Start checking
    checkElement();
  };

  return null;
}

