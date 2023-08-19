import React from 'react';
import domtoimage from 'dom-to-image';

const ScreenshotTest = () => {
  const handleScreenshotClick = async () => {
    const elementToCapture = document.getElementById('test-element');

    if (elementToCapture) {
      try {
        const screenshotUrl = await domtoimage.toPng(elementToCapture);
        console.log('Screenshot URL:', screenshotUrl);
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    } else {
      console.error('Element with ID "test-element" not found.');
    }
  };

  return (
    <div>
      <div id="test-element">This is the element to capture.</div>
      <button onClick={handleScreenshotClick}>Capture Screenshot</button>
    </div>
  );
};

export default ScreenshotTest;
