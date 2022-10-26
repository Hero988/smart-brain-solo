import React from 'react';

// created a navigation pure function, we pass the on route change function as a prop to be able to use in the function
const Navigation = ({ onRouteChange, isSignedIn }) => {
    // we we are signin in then do the first part of code else do the second part of the code 
    if (isSignedIn) {
        return (
        // create a nav tag and added styles to make it appear at the top right of the screen
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* using tacyons to style this i.e. f3 and adding putting sign out as the text*/}
            {/* // when the signin button is clicked trigger the on onroutechange function and pass the 'signin' parameter, we do an arrow function so only when
            // onClick happens then you run the function instead of running the function everytime you render  */}
            {/* <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p> */}
        </nav>
        );
    } else {
        return(
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p> 
            <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p> */}
            </nav>
        );
    }
}

export default Navigation;      