import { PluginException } from "./plugin-exception.base";

export class PluginDefinitionNotFoundException extends PluginException {
	constructor(type: string, id: string) {
		const _message = 'Plugin definition not found';
		super(type, id, _message);
	}
}
