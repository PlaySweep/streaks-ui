import React from 'react';
import { Spinner } from '@chakra-ui/react';
function LoadingWidget({children}) {
  return (
    <>
    <div style={{position: "fixed", top: "0", bottom: "0", left: "0", right: "0", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(17, 30, 75, 0.9)", textAlign: "center"}}>
      { children }
    </div>
    </>
  )
}

export default LoadingWidget;