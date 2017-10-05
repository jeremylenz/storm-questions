import React from 'react'

class TrayWidget extends React.Component {
  render () {
    return <div className="tray">{this.props.children}</div>;
  }
}

export default TrayWidget;
