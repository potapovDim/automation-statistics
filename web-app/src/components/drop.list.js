import './styles/drop.list.scss'

import React from 'react'
import classnames from 'classnames'
import {Button} from '../elements/button'

const DropList = ({title, items = [], className, children, buttonClassName}) => {
  const classNames = classnames('dropdown', className);
  const buttonClassNames = classnames('btn', buttonClassName);

  return (<div className={classNames}>
    <Button className={buttonClassNames} title={title}/>
    <div className="dropdown-content">
      {children}
      {items.map(({name, click}, index) => <Button key={index} onClick={click} title={name} />)}
    </div>
  </div>)
}

export {
  DropList
}
