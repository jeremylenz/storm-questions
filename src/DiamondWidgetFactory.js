import React from 'react'
import { NodeWidgetFactory } from 'storm-react-diagrams'
import DiamonNodeWidget from './DiamondNodeWidget.js'

class DiamondWidgetFactory extends NodeWidgetFactory {
  constructor () {
    super("diamond");
  }

  generateReactWidget(diagramEngine, node) {
    return DiamonNodeWidget({ node: node })
  }
}

export default DiamondWidgetFactory;
