import React from 'react'
import TrayWidget from './TrayWidget'
import TrayItemWidget from './TrayItemWidget'
import Diagram from './diagram'
import { DefaultNodeModel, DefaultPortModel } from 'storm-react-diagrams'

class BodyWidget extends React.Component {

  constructor () {
    super()
    this.state = {
      nodeToAdd: null
    }
  }

  addNode = () => {

    var newNode = new DefaultNodeModel("New Node", "rgb(0,64,255)")
		newNode.x = 400;
		newNode.y = 150;
		newNode.addPort(new DefaultPortModel(true, "in"))
		newNode.addPort(new DefaultPortModel(false, "Maybe"))
		newNode.addPort(new DefaultPortModel(false, "Definitely"))
		newNode.addPort(new DefaultPortModel(false, "Totally"))

    this.setState(
      {nodeToAdd: newNode}
    )


  }



  render () {
    return (
      <div className='put-it-in-a-div body'>
        <div className='content'>
        <TrayWidget>
  				<TrayItemWidget model={{ type: "in" }} name="Symptom A?" color="rgb(192,255,0)" />
  				<TrayItemWidget model={{ type: "out" }} name="Symptom B?" color="rgb(0,192,255)" />
          <button onClick={this.addNode}>Add Node</button>

  			</TrayWidget>
        <Diagram incomingNode={this.state.nodeToAdd}/>
        </div>
      </div>

    )
  }
}

export default BodyWidget
