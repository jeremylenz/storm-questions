import React from 'react';
import {
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DiagramModel,
	DefaultNodeModel,
	LinkModel,
	DefaultPortModel,
	DiagramWidget,
	DefaultNodeInstanceFactory,
	DefaultPortInstanceFactory,
	LinkInstanceFactory
} from 'storm-react-diagrams';


class Diagram extends React.Component {

	constructor() {
		super()

		this.state = { loading:true,
									 engine: null }
	}

	componentDidMount() {
		//1) setup the diagram engine
		var engine = new DiagramEngine();
		engine.registerNodeFactory(new DefaultNodeFactory());
		engine.registerLinkFactory(new DefaultLinkFactory());

		//2) setup the diagram model
		var model = new DiagramModel();

		//3-A) create a default node
		var node1 = new DefaultNodeModel("Have you had any coughs lately?", "rgb(0,192,255)");
		var port1 = node1.addPort(new DefaultPortModel(false, "out-1", "Yes"));
		node1.x = 100;
		node1.y = 100;

		//3-B) create another default node
		var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
		var port2 = node2.addPort(new DefaultPortModel(true, "in-1", "IN"));
		node2.x = 400;
		node2.y = 100;

		//3-C) link the 2 nodes together
		var link1 = new LinkModel();
		link1.setSourcePort(port1);
		link1.setTargetPort(port2);

		//4) add the models to the root graph
		model.addNode(node1);
		model.addNode(node2);
		model.addLink(link1);

		// create additional node & link
		var node3 = new DefaultNodeModel("Node 3", "rgb(0,64,255)")
		var port3 = node1.addPort(new DefaultPortModel(false, "out-2", "No"))
		var port4 = node3.addPort(new DefaultPortModel(true, "in-2"))
		node3.x = 600;
		node3.y = 150;
		var link2 = new LinkModel();
		link2.setSourcePort(port3);
		link2.setTargetPort(port4);
		model.addNode(node3);
		model.addLink(link2);

		node1.addListener({
      entityRemoved: (node) => {
        console.log('Removed', node.id)
      },
      selectionChanged: (node, isSelected) => {
        console.log(isSelected ? 'Selected' : 'Unselected', node)
      }
    });
		model.addListener({
      linksUpdated:(entity, isAdded) => {
        console.log(isAdded ? 'added' : 'removed', entity)
      },
      nodesUpdated: (entity, isAdded) => {
        console.log(isAdded ? 'added' : 'removed', entity)
      }
    });


		//5) load model into engine
		engine.setDiagramModel(model);

		//!------------- SERIALIZING ------------------

		var str = JSON.stringify(model.serializeDiagram());

		//!------------- DESERIALIZING ----------------

		//we need this to help the system know what models to create form the JSON
		engine.registerInstanceFactory(new DefaultNodeInstanceFactory());
		engine.registerInstanceFactory(new DefaultPortInstanceFactory());
		engine.registerInstanceFactory(new LinkInstanceFactory());

		//deserialize the model
		var model2 = new DiagramModel();
		// console.log(str)
		model2.deSerializeDiagram(JSON.parse(str), engine);
		engine.setDiagramModel(model2);

		this.setState( { engine: engine,
		 									loading: false })

	}

	addNode = () => {
		let currentEngine = this.state.engine
		let currentModel = currentEngine.getDiagramModel()

		var newNode = new DefaultNodeModel("New Node", "rgb(0,64,255)")
		newNode.x = 400;
		newNode.y = 150;
		var port5 = newNode.addPort(new DefaultPortModel(true, "in"))
		var port4 = newNode.addPort(new DefaultPortModel(false, "Maybe"))
		var port5 = newNode.addPort(new DefaultPortModel(false, "Definitely"))
		var port6 = newNode.addPort(new DefaultPortModel(false, "Totally"))

		currentModel.addNode(newNode)
		currentEngine.setDiagramModel(currentModel)

		this.setState( { engine: currentEngine })
	}

  render () {


		return (
			<div className='put-it-in-a-div'>
			{(this.state.loading === false) &&
				<div>

				<button onClick={this.addNode}>Add Node</button>
				<DiagramWidget diagramEngine={this.state.engine} />;
			</div>
			}
			{this.state.loading &&
				'loading'
			}
		</div>
		)
    }

} // end of class

export default Diagram;
