
import { PluginBase } from "../../src/plugin/plugin.base";
import { IPluginDefinition } from "../../src/types";




export class PluginTest extends PluginBase {
	constructor(private _definition: IPluginDefinition) {
		super();
	}

	get definition() {
		return this._definition;
	}
}
