import { PluginException } from "./plugin-exception.base";


export class PluginInstanceNotCreatedException extends PluginException {
	constructor(pluginType: string, pluginId: string, reason: unknown) {
		const _message = `Plugin instance not created. Reason: ${String(reason) }`;
		super(pluginType, pluginId, _message);
	}
}
