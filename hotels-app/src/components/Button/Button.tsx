import React from 'react';
import './Button.css';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

function Button({message, handleAction, buttonStyle}: { message: string, handleAction(): void, buttonStyle: ButtonType}) {
  const handleButtonStyle = (buttonStyle: ButtonType) => {
    switch (buttonStyle) {
      case ButtonType.Primary:
        return 'primary';
      case ButtonType.Secondary:
        return 'secondary';
      default:
        return '';
    }
  }
  return (
    <button className={`button  ${handleButtonStyle(buttonStyle)}`}onClick={handleAction}>
      {message}
    </button>
  );
}

export default Button;