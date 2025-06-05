import { PluginInstanceNotCreatedException } from '../exceptions';
import { IPluginDiscovery } from '../types';
import { IPluginManager } from '../types';
import { IPlugin } from '../types';
import { IPluginBuilder } from "../types";


export abstract class PluginManagerBase<P extends IPlugin> implements IPluginManager<P> {
	_instances = new Map<string, IPlugin>();

	abstract readonly type: string

	getDefinition(id: string): P['definition'] | undefined {
		return this.pluginDiscovery.getDefinition(id, true);
	}

	protected abstract readonly pluginDiscovery: IPluginDiscovery;
	protected abstract readonly pluginBuilder: IPluginBuilder;

	getDefinitions<P extends IPlugin = IPlugin>(): P['definition'][] {
		return this.pluginDiscovery.getDefinitions();
	}

	/**
	 *
	 * @param id
	 */
	getInstance<P extends IPlugin = IPlugin>(id: string): P {

		if (!this._instances.has(id)) {
			try {
				const definition = this.getDefinition(id);
				if (!definition) {
					throw new Error(`Plugin definition for id: "${id}" not found.`);
				}
				this._instances.set(id, this.pluginBuilder.build(definition));

			} catch (error: Error | unknown) {
				throw new PluginInstanceNotCreatedException(this.type, id, error)
			}
		}
		return this._instances.get(id) as P;
	}
}
