import { PluginException } from "./plugin-exception.base";


export class PluginInstanceNotCreatedException extends PluginException {
	constructor(type: string, id: string, reason: unknown) {
		const _message = `Plugin instance not created.\nReason:\n ${String(reason) }`;
		super(type, id, _message);
	}
}
