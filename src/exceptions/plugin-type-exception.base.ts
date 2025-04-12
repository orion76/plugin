export class PluginTypeException extends Error {
	constructor(private _pluginType: string, message: string) {
		super(message);
	}

	get pluginType() {
		return this._pluginType;
	}
}
