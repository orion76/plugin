export class PluginException extends Error {
	constructor(private _type: string, private _id: string, message: string) {
		super(message);
	}

	get type() {
		return this._type;
	}

	get id() {
		return this._id;
	}
}
