import React from 'react';
import './ImageLinkForm.css'

// created a ImageLinkForm pure function, we can destructure OnInputChange that we are getting from the props to be able to access it
const ImageLinkForm = ({OnInputChange, onButtonSubmit}) => {
     return (
          <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
               <div className='pa4 br3 shadow-5 form center'>
               {/* onChange mimics what the HTML does whenever Input changes, {} - is an expression. So what we are saying here is whenever you are writing something in the 
               input pass that to the OnInputChange function */}
                 <input className='f4 pa2 w-70 center' type={'text'} onChange={OnInputChange} />
                 {/* whenever the button is clicked pass that the button has been clicked to the onButtonSubmit method */}
                 <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
               </div>
            </div>
          </div>
     )
}

export default ImageLinkForm;