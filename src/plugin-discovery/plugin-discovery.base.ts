import { PluginDefinitionNotFoundException } from "../exceptions";
import { IPluginDefinition, IPluginDiscovery } from "../types";


export abstract class PluginDiscoveryBase<D extends IPluginDefinition = IPluginDefinition> implements IPluginDiscovery<D> {
	abstract readonly type: string;
	protected abstract definitions: D[];

	getDefinition(id: string, exceptionOnInvalid: boolean): D | undefined {
		const definition = this.definitions.find((definition) => definition.id === id);
		if (exceptionOnInvalid && !definition) {
			throw new PluginDefinitionNotFoundException(this.type, id);
		}

		return definition;
	}

	getDefinitions(): D[] {
		return this.definitions;
	}

	hasDefinition(id: string): boolean {
		return Boolean(this.getDefinition(id, false));
	}
}
