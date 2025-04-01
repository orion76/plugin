
import { PluginBase } from "../../plugin/plugin.base";
import { IPluginDefinition } from "../../types";


export class PluginTest extends PluginBase {
	constructor(private _definition: IPluginDefinition) {
		super();
	}

	get definition() {
		return this._definition;
	}
}
