import React, { useRef } from 'react';

// Import the storybook libraries
import { storiesOf } from '@storybook/react';

import Cinema8Player from './Cinema8Player';

// Here we describe the stories we want to see of the Button. The component is
// pretty simple so we will just make two, one with text and one with emojis
// Simple call storiesOf and then chain .add() as many times as you wish
//
// .add() takes a name and then a function that should return what you want
// rendered in the rendering area
const playerWrapperStyle = {
  width: '480px',
  height: '270px'
}

const responsivePlayerWrapperStyle = {
  position: 'relative',
  paddingTop: '56.25%'
}

const PlayerDemo = () => {

  
  const playerRef = useRef(null);

  const play = () => {
    playerRef.current.play();
  }

  const pause = () => {
    playerRef.current.pause();
  }

  return (
    <>
      <div style={playerWrapperStyle}>
        <Cinema8Player
          ref= { playerRef }
          id= 'WDerp5Xy'
          autoplay= {false}      
          className='c8-player'
          // width='100%'
          // height='100%'
          // style={{position: 'absolute', top: '0', left: '0'}}
          onReady = {() => {
            console.log("On Ready");
          }}
          onProgress = {() => {
            console.log("On Progress");
          }}
          onPlay = {() => {
            console.log("On Play");
          }}
          onPause = {() => {
            console.log("On Pause");
          }}
          onEnd = {() => {
            console.log("On End");
          }}
        />  
    </div> 

    <br />
    <button onClick={play}>Play</button> &nbsp;
    <button onClick={pause}>Pause</button>


     {/* <br />  
      <div style={playerWrapperStyle}>
        <Cinema8Player 
          id= 'rJVAnWXg'
          onReady = {() => {
            console.log("On Ready");
          }}
        /> 
      </div>  */}
    </>
    
  )
}

storiesOf('Cinema8Player',module)
	.add('Demo #1', () => (
		<div>        
        <PlayerDemo />
    </div>
	),{
		notes: '',
		info: {  }
	})
