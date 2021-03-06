import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { fn2 } from './util'

import '../style/index.less'

class Demo extends Component {
  render () {
    fn2()
    return (
      <div className="box">{this.props.text}</div>
    )
  }
}

ReactDOM.render(
  <Demo text="this is a text"></Demo>,
  document.querySelector('.container')
)