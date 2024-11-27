import React from 'react'
import loadingGif from './loader.svg'

const Loader = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <img src={loadingGif} height="35%" width="35%" alt="loading..." />
    </div>
  )
}

export default Loader;