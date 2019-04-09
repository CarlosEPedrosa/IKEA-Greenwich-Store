import React from 'react';

export default ({text, buttonType, handleClick, isActive}) => {
  return (
    <button
      onClick={handleClick}
      className={`button ${buttonType}-button${isActive ? ' active' : ''}`}
    >
      {text}
    </button>
  );
};
