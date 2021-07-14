import React from 'react';
import logo from '../../../dist/img/hammerhead.svg';

const SiteHeader = () => {
  return (
    <div>
      <img src={logo} alt="My Happy SVG"/>
      <h1>Hammerhead</h1>
      <h3>for DataTech</h3>
    </div>
  );
};

export default SiteHeader;
