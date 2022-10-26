import React from 'react';
import Clarifai from 'clarifai';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

// initialize with my api key, most useful APIs have API keys
const app = new Clarifai.App({
  apiKey: 'fa28353da0e74973aab0dba7292a9522'
})

// inital state of the app 
const initialState = {
  // this is what the user will input in he imageLinkForm
  input: '',
  //  this image URL should get displayed when you click submit
  imageUrl: '',
  //  this box will contain the values that we recieve i.e. the bounding box 
  box: {},
  //  the route state keeps track on where we are on the page (we want it to start on signin)
  route: 'home',
  // tracks if the user is signed in or not. Default is false
  isSignedIn: false,
  // tracking the user object
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends React.Component {
  // we need to create a state so that our app know what the value is that the user enters, remembers the value and updates it anytime it gets changed
  constructor() {
    super();
    this.state = initialState;
  }

// function that detects when there is something writting in the ImageLinkForm
OnInputChange = (event) => {
  // gets whatever value is inside the ImageLinkForm and sets the input state to that value inside the ImageLinkForm
  this.setState({ input: event.target.value })
}

// function loads the user with the user paramater and will just update the state with the user that we recieved
loadUser = (data) => {
  this.setState({
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
  })
}


//  function that we call based on the bouding box values that we get from clarafi 
calculateFaceLocation = (data) => {
  //  when it responds back, it gets the bounding box i.e. the box showing where the face is (the bounding box is a % of the image i.e. .22 at 22% of the image)
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  // we are getting the input image ID from faceRecognition i.e. the image that gets displayed in our app
  const image = document.getElementById('inputimage')
  // gets the width of the image and converts it to a number
  const width = Number(image.width);
  // gets the height of the image and converts it to a number
  const height = Number(image.height);
  // we want to return an object and this object is what is going to fill up the box state, it will need to figure out the first, second, third and fource dot and 
  // then wrap it in a border
  return {
    // we are getting the left coloum percentage and timesing that by the width and we are going to get the width of the actual displayed image and where the left
    // colum should be
    leftCol: clarifaiFace.left_col * width,
    // the top row will say the hight of it is the percentage of the image height
    topRow: clarifaiFace.top_row * height,
    // we want to get the number which is the total the percentage - the width from the left hand side
    rightCol: width - (clarifaiFace.right_col * width),
    // we want to get the number which is the total the percentage - the width from the top side
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

// this function changes the state of the box array to the returned values from the calculateFaceLocation
displayFaceBox = (box) => {
  // changes the box state to the box paramater 
  this.setState({ box: box });
}

// function that detects what is inside the ImageLinkForm value
onButtonSubmit = () => {
  // when you click submit the image url is equal to what was put in the input box
  this.setState({ imageUrl: this.state.input })
  // when the button is clicked run this clarifai api that detects the face (we need to do npm insall clarifai), this predicts from the image URL where the face is
  // (make sure to update axios to version 0.27.2 to get this to work) also when you click the button using the color model we get the color of the image as the response
  // now we are stating the URL as whatever we write in the input box 
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //  we get the data (response) and we call the calculateFaceLocation function and we pass the response as a parameter, so now this.calculateFaceLocation takes a response
    //  and returns an object and that returned object is now going into the displayfacebox funcion
    .then(response => {
      // if we get a response from clarafai
      if (response) {
        // fetch the image url from the server
        fetch('https://vast-everglades-17243.herokuapp.com/image', {
          // we specifiy that we want to do a PUT method (i.e. update the values)
          method: 'put',
          // we specifi that it is a JSON file
          headers: { 'Content-type': 'application/json' },
          // we then convert the this.state.SigninEmail and this.state.SigninPassword from JavaScript to JSON and we put the email as this.state.SigninEmail 
          // password as this.state.SigninPassword
          body: JSON.stringify({
            id: this.state.id
          })
        })
          // we convert the response to JavaScript
          .then(response => response.json())
          // we then set the state of the user entries to the count number 
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    // if there is an error we atch the error and put it in the console.log
    .catch(err => console.log(err))
}

// this function changes the route state to home, we pass the route that we need to change it too
onRouteChange = (route) => {
  if (route === 'signout') {
    // we want to remove all the information and replace it with the initial state
    this.setState(initialState)
  } else if (route === 'home') {
    this.setState({ isSignedIn: true })
  }
  this.setState({ route: route })
}

render() {
  // destructuring what we are saying here is isSignedIn = this.state so i.e. this.state.isSignedIn (add const)
  const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">
      {/* component - Navigation component (sign out e.t.c), we pass the onRouteChange function as a prop to be able to be used in the onRouteChange component 
        we are tracking what is what state isSignedIn is*/}
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      {/* wrap everthing in curley bracets to make it a javascript expression and then use an if statement. So what we are saying here is if the state of the route is = 
        home (?) then do everything else i.e. logo,rand,imagelinkform,facerecognition if the route is not equal to home (:) do the other ternary  this.state.route === 'signin'*/}
      {route === 'home'
        //  {/* component - signin component (allows you to sign in), we then pass a function that when the route does change do this function  */}
        ? <div>
          {/* {/* component - logo component just to add a logo to the project} */}
          <Logo />
          {/* component - rank will give us our name and rank and we update the name to the state name and the entries to the state entries */}
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          {/* component - ImageLinkForm component to be able to enter an image url, we then pass OnInputChange as a property and remember to do this. becuase OnInputChange is 
        property of the app. We then pass onButtonSubmit as a property */}
          <ImageLinkForm OnInputChange={this.OnInputChange} onButtonSubmit={this.onButtonSubmit} />
          {/* component - FaceRecognition component shows the image at the bottom of the screen with the face in a box. We passed the imageURL in our FaceRecognition component 
        by passing imageURL as a property, we are passing the box state as a property so we can grab it in our FaceRecognition component */}
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : (
          // if the state is equal to the signin in form (?) then return the sign in form otherwise (:) return the register form
          route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
      <ParticlesBg type="fountain" bg={true} />
    </div>
  );
}
}

export default App;


