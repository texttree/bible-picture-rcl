# Canvas

A very Basic Material-UI button.

```jsx
import Canvas from './Canvas.js';

const image = 'https://cdn.pixabay.com/photo/2018/06/15/06/51/jesus-3476251_960_720.jpg';

canvasStyle = {
  width: '500',
  height: '300',
};
verseStyle = {
  maxWidth: 450,
  lineHeight: 25,
  font: '25pt Calibri',
  fillStyle: 'rgba(250,0,0,0.8)',
};
verse = 'Здесь должен быть стих, но,  что будет, если здесь будет намного больше текста';
<Canvas
  verseStyle={verseStyle}
  canvasStyle={canvasStyle}
  imageURL={image}
  verse={verse}
/>;
```
