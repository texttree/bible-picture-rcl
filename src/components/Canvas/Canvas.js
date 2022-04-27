import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Canvas = ({ verse, imageURL, canvasStyle, verseStyle }) => {
  const [currentImage, setCurrentImage] = useState();
  const [currWidth, setCurrWidth] = useState('0');
  const [currHeight, setCurrHeight] = useState('0');

  function backgroundCover(elementSizes, containerSizes) {
    let elementRatio = elementSizes.width / elementSizes.height,
      containerRatio = containerSizes.width / containerSizes.height;
    let width = null,
      height = null;
    if (containerRatio > elementRatio) {
      width = Math.ceil(containerSizes.width);
      height = Math.ceil(containerSizes.width / elementRatio);
    } else {
      width = Math.ceil(containerSizes.height * elementRatio);
      height = Math.ceil(containerSizes.height);
    }

    return { width, height };
  }

  useEffect(() => {
    const _currentImage = new Image();
    _currentImage.setAttribute('crossorigin', 'anonymous');
    _currentImage.src = imageURL;
    _currentImage.onload = () => setCurrentImage(_currentImage);
  }, [imageURL]);

  useEffect(() => {
    if (currentImage) {
      const { width, height } = backgroundCover(
        { width: currentImage.width, height: currentImage.height },
        { width: canvasStyle.width, height: canvasStyle.height }
      );
      setCurrWidth(width);
      setCurrHeight(height);
    }
  }, [currentImage]);

  useEffect(() => {
    if (currentImage) {
      function wrapText(context, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }

      const canvas = document.getElementById('myCanvas');
      const context = canvas.getContext('2d');
      const maxWidth = canvasStyle.width * 0.7;
      const lineHeight = verseStyle.lineHeight;
      let xx = (currWidth - canvasStyle.width) / 2;
      let yy = (currHeight - canvasStyle.height) / 2;
      const x = canvasStyle.width / 2;
      console.log(canvasStyle.width / 2);
      const y = 30;
      const text = verse;
      context.fillStyle = verseStyle.fillStyle;
      context.font = verseStyle.font;
      context.drawImage(currentImage, -xx, -yy, currWidth, currHeight);
      context.textAlign = 'center';
      wrapText(context, text, x, y, maxWidth, lineHeight);
    }
  }, [verse, currentImage, currWidth, currHeight]);

  return <canvas width={canvasStyle.width} height={canvasStyle.height} id="myCanvas" />;
};

Canvas.propTypes = {
  /** the text that will be in the picture */
  verse: PropTypes.string,
  /** url pictures*/
  image: PropTypes.string,
  /** object */
  canvasStyle: PropTypes.object,
  /** object*/
  verseStyle: PropTypes.object,
};
export default Canvas;
