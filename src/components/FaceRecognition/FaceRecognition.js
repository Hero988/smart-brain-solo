import React from 'react';
import './FaceRecognition.css';

// created a FaceRecognition pure function, we are recieveing the imageURL and we need to destructure it
const FaceRecognition = ({ imageUrl, box }) => {
  return (
    // center defined in app.css (puts the image in the center)
    <div className='center ma'>
        {/* aboslute, mt2, center and ma are all tachyons classes */}
      <div className='absolute mt2'>
        {/* shows the image in the bottom of the page, now the src of the image is the imageURL, the height is automatically going to be adjusted to the width */}
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        {/* creating an empty div and this is where the bounding box border is going to display (i.e. the box on the face), now we are passing the box values that we calculated
        from calculateFaceLocation as the style i.e. the top row of the border is going to = box.topRow */}
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;