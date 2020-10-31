import './styles/information.message.scss';

import React from 'react';
import classnames from 'classnames';

const InformationMessage = ({message, className = '', onClick}) => {
  const classNames = classnames('message', className)
  return (
    <div className={classNames}>
      <span className="closebtn" onClick={onClick}>&times;</span>
      {message}
    </div>
  )
}

export {
  InformationMessage
}
