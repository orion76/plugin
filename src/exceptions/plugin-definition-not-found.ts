import {PluginExceptionBase} from './plugin-exception.base';

export class PluginDefinitionNotFoundException extends PluginExceptionBase {
	constructor(pluginType: string, pluginId: string) {
		const _message = 'Plugin definition not found';
		super(pluginType, pluginId, _message);
	}
}
