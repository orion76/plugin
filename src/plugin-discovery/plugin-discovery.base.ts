import { IPluginDiscovery } from '../types';
import {IPluginDefinition} from '../types';


export abstract class PluginDiscoveryBase implements IPluginDiscovery {

	protected abstract definitions: IPluginDefinition[];

	getDefinition(pluginId: string, exceptionOnInvalid: boolean): IPluginDefinition | undefined {
		const definition = this.definitions.find((definition) => definition.id === pluginId);
		if (exceptionOnInvalid && !definition) {
			throw new Error(`Plugin definition not found. ID:${pluginId}`);
		}
		return definition;
	}

	getDefinitions(): IPluginDefinition[] {
		return this.definitions;
	}

	hasDefinition(pluginId: string): boolean {
		return Boolean(this.getDefinition(pluginId, false));
	}
}
