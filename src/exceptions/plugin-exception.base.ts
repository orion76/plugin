export class PluginExceptionBase extends Error {
	constructor(private _pluginType: string, private _pluginId: string, message: string) {
		super(message);
	}

	get pluginType() {
		return this._pluginType;
	}

	get pluginId() {
		return this._pluginId;
	}
}
