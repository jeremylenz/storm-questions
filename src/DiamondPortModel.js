import React from 'react'

class DiamondPortModel extends React.Component {

  constructor(position) {
    super(position);
    this.position = position;
  }

  serialize () {
    return Object.assign({}, super.serialize(), {
      position: this.position
    })
  }

  deSerialize (data) {
    super.deSerialize(data)
    this.position = data.position
  }

  render () {

  }
}

export default DiamondPortModel;
