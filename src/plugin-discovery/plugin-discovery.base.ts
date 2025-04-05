import { IPluginDefinition, IPluginDiscovery } from "../types";


export abstract class PluginDiscoveryBase<D extends IPluginDefinition = IPluginDefinition> implements IPluginDiscovery<D> {

	protected abstract definitions: D[];

	getDefinition(pluginId: string, exceptionOnInvalid: boolean): D | undefined {
		const definition = this.definitions.find((definition) => definition.id === pluginId);
		if (exceptionOnInvalid && !definition) {
			throw new Error(`Plugin definition not found. ID:${pluginId}`);
		}
		return definition;
	}

	getDefinitions(): D[] {
		return this.definitions;
	}

	hasDefinition(pluginId: string): boolean {
		return Boolean(this.getDefinition(pluginId, false));
	}
}
