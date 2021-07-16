import React, { useState } from 'react';

const Header = ({slide, setSlide}) => {

  const menuSlide = () => {
    let element = document.getElementById('menu');
    if (!slide) {
      element.classList.add('show');
      setSlide(true);
    } else {
      element.classList.remove('show');
      setSlide(false);
    }
  }

  return (
    <header>
      <div id="header">
        <div className="burger" onClick={menuSlide}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>
    </header>
  );

};

export default Header;
