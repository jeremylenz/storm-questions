import React from 'react'
import { PortModel } from 'storm-react-diagrams'

class DiamondPortModel extends PortModel {

  constructor(pos) {
    super(pos);
    this.position = pos;
  }

  serialize () {
    return Object.assign({}, super.serialize(), {
      position: this.position
    })
  }

  deSerialize(data) {
    super.deSerialize(data)
    this.position = data.position
  }


}

export default DiamondPortModel;
