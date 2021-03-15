import ReactPixel from 'react-facebook-pixel';

function signUpFBEvent() {
  ReactPixel.init("293266404633982")
  ReactPixel.track("SIGN_UP")
}

export default signUpFBEvent;