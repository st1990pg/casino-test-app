import React, { useEffect, useState } from 'react';
import roulette from '../img/roulette.png';

const LoaderMain = (props) => {
  const [display, setDisplay] = useState(true);
  const background = {
    backgroundImage: `url(${roulette})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  useEffect(() => {
    if (props.display === false) {
      const timer = setTimeout(() => {
        console.log('This will run after 1 second!');
        setDisplay(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [props.display]);

  return (
    <>
      {display && (
        <div
          id="loader"
          className={!props.display ? 'none' : ''}
          style={background}
        ></div>
      )}
    </>
  );
};

export default LoaderMain;
