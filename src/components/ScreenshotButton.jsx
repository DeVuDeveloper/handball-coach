import React from 'react';
import html2canvas from 'html2canvas';

const ScreenshotButton = ({ targetId }) => {
  const handleScreenshotClick = () => {
    const elementToCapture = document.getElementById(targetId);

    if (elementToCapture) {
      html2canvas(elementToCapture).then(canvas => {
        const screenshotUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = screenshotUrl;
        link.download = 'screenshot.png';
        link.click();
      });
    }
  };

  return (
    <button class="screenshot-button "onClick={handleScreenshotClick}>Napravi snimak</button>
  );
};

export default ScreenshotButton;
