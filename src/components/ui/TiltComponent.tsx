"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const Tilt = dynamic(() => import('react-parallax-tilt'), { ssr: false });

const TiltComponent = () => {
  return (
    <Tilt>
      <div style={{ height: '300px', backgroundColor: 'darkgreen', padding: '20px' }}>
        <h1 style={{ color: 'white' }}>React Parallax Tilt 👀</h1>
      </div>
    </Tilt>
  );
};

export default TiltComponent;