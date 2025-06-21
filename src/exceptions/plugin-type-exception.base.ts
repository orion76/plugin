function formatMessage(pluginType: string, message: string) {
	return `PluginType: ${pluginType}. ${message}`;
}

export class PluginTypeException extends Error {
	constructor(private _type: string, message: string) {
		super(formatMessage(_type, message));
	}

	get type() {
		return this._type;
	}
}
