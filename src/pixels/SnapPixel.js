import ReactPixel from 'react-snapchat-pixel';

function signUpSnapEvent() {
    ReactPixel.init("449640a0-1412-48c3-9050-4aef788a9a3f")
    ReactPixel.track("SIGN_UP")
}

export default signUpSnapEvent;