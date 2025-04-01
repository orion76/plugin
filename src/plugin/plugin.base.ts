import { IPluginDefinition, IPlugin } from "../types";



export abstract class PluginBase implements IPlugin {

	abstract get definition(): IPluginDefinition;

	get id() {
		return this.definition.id;
	}

	get label(): string {
		return this.definition.label;
	}
}
