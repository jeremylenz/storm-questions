import { AbstractInstanceFactory } from 'storm-react-diagrams'
import { DiamondNodeModel } from "./DiamondNodeModel";
import { DiamondPortModel } from "./DiamondPortModel";

export class DiamondNodeFactory extends AbstractInstanceFactory {
	constructor() {
		super("DiamondNodeModel");
	}

	getInstance() {
		return new DiamondNodeModel();
	}
}

export class DiamondPortFactory extends AbstractInstanceFactory {
	constructor() {
		super("DiamondPortModel");
	}

	getInstance() {
		return new DiamondPortModel();
	}
}
