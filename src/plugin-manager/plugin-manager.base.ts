import { PluginInstanceNotCreatedException } from '../exceptions/plugin-instance-not-created';
import { IPluginDiscovery } from '../types';
import { IPluginManager } from '../types';
import { IPlugin } from '../types';
import { IPluginBuilder } from "../types";


export abstract class PluginManagerBase<P extends IPlugin> implements IPluginManager<P> {
	_instances = new Map<string, IPlugin>();

	abstract readonly pluginType: string

	getDefinition(pluginId: string): P['definition'] | undefined {
		return this.pluginDiscovery.getDefinition(pluginId, true);
	}

	protected abstract readonly pluginDiscovery: IPluginDiscovery;
	protected abstract readonly pluginBuilder: IPluginBuilder;

	getDefinitions<P extends IPlugin = IPlugin>(): P['definition'][] {
		return this.pluginDiscovery.getDefinitions();
	}

	/**
	 *
	 * @param pluginId
	 */
	getInstance<P extends IPlugin = IPlugin>(pluginId: string): P {

		if (!this._instances.has(pluginId)) {
			try {
				const definition = this.getDefinition(pluginId);
				if (!definition) {
					throw new Error(`Plugin definition for pluginId: "${pluginId}" not found.`);
				}
				this._instances.set(pluginId, this.pluginBuilder.build(definition));

			} catch (error: Error | unknown) {
				throw new PluginInstanceNotCreatedException(this.pluginType, pluginId, error)
			}
		}
		return this._instances.get(pluginId) as P;
	}
}
