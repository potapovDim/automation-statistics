import './styles/button.css'

import React, {Component} from 'react'
import classnames from 'classnames'

class Button extends Component {
  render() {
    const {title, onClick, className = ''} = this.props
    const classNames = classnames('btn', className)
    return (
      <button onClick={onClick} className={classNames}>
        {title}
      </button>
    )
  }
}

export {
  Button
}
