// src/components/BotpressChat.tsx
import React, { useEffect } from 'react';

const BotpressChat: React.FC = () => {
  
  useEffect(() => {
    // --- URLs exactas de los scripts proporcionados por el usuario ---
    const scriptUrl1 = "https://cdn.botpress.cloud/webchat/v2.3/inject.js";
    const scriptUrl2 = "https://files.bpcontent.cloud/2025/04/20/16/20250420164012-LOMRRTJZ.js"; // Script de configuración específico

    let script1: HTMLScriptElement | null = null;
    let script2: HTMLScriptElement | null = null;

    // Check if the first script already exists to avoid duplicates
    const existingScript1 = document.querySelector(`script[src="${scriptUrl1}"]`);
    if (existingScript1) {
      // If script1 exists, assume script2 might also exist or will be loaded by it.
      // Depending on Botpress's injection logic, forcing reload might be needed or might cause issues.
      // For simplicity here, we assume if script1 exists, we don't need to add them again.
      // console.log('Botpress script 1 already loaded.'); 
      return; 
    }

    // --- 1. Create and append the first script (Webchat Loader) ---
    script1 = document.createElement('script');
    script1.src = scriptUrl1;
    script1.async = true;
    
    // --- 2. Define the onload handler for the first script ---
    // This ensures the second script (configuration) is added only after the first one is loaded.
    script1.onload = () => {
      // Check if the second script already exists (just in case)
       const existingScript2 = document.querySelector(`script[src="${scriptUrl2}"]`);
       if (existingScript2) {
           // console.log('Botpress script 2 already loaded.');
           return;
       }
      
      // Create and append the second script (Configuration)
      script2 = document.createElement('script');
      script2.src = scriptUrl2;
      script2.async = true;
      document.body.appendChild(script2);
      // console.log('Botpress script 2 added.');
    };
    
    script1.onerror = () => {
        console.error('Error loading Botpress inject script.');
    };

    // Append the first script to the body to start loading
    document.body.appendChild(script1);
    // console.log('Botpress script 1 added.');

    // --- 3. Cleanup function executed when the component unmounts ---
    return () => {
      // console.log('Cleaning up Botpress scripts...');
      // Remove the first script if it was added by this instance
      const currentScript1 = document.querySelector(`script[src="${scriptUrl1}"]`);
      if (currentScript1 && document.body.contains(currentScript1)) {
        // console.log('Removing Botpress script 1');
        document.body.removeChild(currentScript1);
      }
      
      // Remove the second script if it was added by this instance
      const currentScript2 = document.querySelector(`script[src="${scriptUrl2}"]`);
      if (currentScript2 && document.body.contains(currentScript2)) {
        // console.log('Removing Botpress script 2');
        document.body.removeChild(currentScript2);
      }

      // Optional: Attempt to remove the webchat container div itself.
      // This might be necessary if Botpress doesn't clean up its own DOM elements properly on script removal.
      // Use with caution, verify the selector is correct and doesn't remove unintended elements.
      // const webchatContainer = document.querySelector('#botpress-webchat-container'); // Default ID, verify this
      // if (webchatContainer && webchatContainer.parentElement === document.body) {
      //   console.log('Removing Botpress webchat container');
      //   document.body.removeChild(webchatContainer);
      // }
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // This component doesn't render any visible elements itself
  return null; 
};

export default BotpressChat;
