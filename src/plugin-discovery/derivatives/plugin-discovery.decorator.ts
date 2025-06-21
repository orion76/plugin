import { PluginException } from '../../exceptions';
import { IPluginDefinition, IPluginDeriver, IPluginDiscovery } from '../../types';
import { splitDerivativedPluginId } from '../../utils';


function getUndefinedOrThrowError(exceptionOnInvalid: boolean, errorFactory: () => void): undefined {
	if (!exceptionOnInvalid) {
		return undefined;
	}
	throw errorFactory();
}

export abstract class PluginDiscoveryDecorator<
	BasePluginDef extends IPluginDefinition = IPluginDefinition,
	DerivDef extends object = object,
	PluginDef extends BasePluginDef & DerivDef = BasePluginDef & DerivDef
> implements IPluginDiscovery<BasePluginDef | PluginDef> {

	get type() {
		return this.decorated.type;
	};

	protected abstract decorated: IPluginDiscovery<BasePluginDef>;

	protected abstract createDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef>;

	protected derivers: Map<string, IPluginDeriver<DerivDef> | undefined> = new Map();
	private _definitionsCache: Map<string, PluginDef | BasePluginDef> = new Map();

	protected hasDeriver(basePLuginDefinition: BasePluginDef): boolean {
		return !!basePLuginDefinition.deriverClass;
	}

	getDefinition(id: string, exceptionOnInvalid?: boolean): BasePluginDef | PluginDef | undefined {
		if (!this._definitionsCache.has(id)) {
			const definition = this._createPluginDefinition(id, exceptionOnInvalid);
			if (definition) {
				this._definitionsCache.set(id, definition)
			}
		}
		const _definition = this._definitionsCache.get(id);

		if (!_definition && exceptionOnInvalid) {
			throw new PluginException(this.type, id, 'Definition not found.');
		}

		return _definition;
	}
	getDefinitions(): (BasePluginDef | PluginDef)[] {
		const basePluginDefinitions = this.decorated.getDefinitions();
		const derivatives = this.getDerivatives(basePluginDefinitions)

		return derivatives;
	}

	hasDefinition(id: string): boolean {
		return Boolean(this.getDefinition(id));
	}
	protected createPluginDefinition(id: string, pluginDefinition: BasePluginDef, derivativeDefinition: DerivDef): PluginDef {
		return { ...pluginDefinition, ...derivativeDefinition, id } as PluginDef;
	}

	protected getBasePluginId(id: string): string {
		return splitDerivativedPluginId(id)[0];
	}

	protected getDerivativeId(id: string): string | undefined {
		return splitDerivativedPluginId(id)[1];
	}

	private _createPluginDefinition(id: string, exceptionOnInvalid = false): PluginDef | BasePluginDef | undefined {
		const basePluginId = this.getBasePluginId(id);
		const basePluginDefinition = this.decorated.getDefinition(basePluginId);

		if (!basePluginDefinition) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new PluginException(this.type, id, 'Base plugin definition not found.')
			)
		}

		const derivativeId = this.getDerivativeId(id)
		if (!derivativeId) {
			return basePluginDefinition;
		}

		const deriver = this.getDeriver(basePluginDefinition);

		if (!deriver) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new PluginException(this.type, id, 'Deriver for base plugin ID is missing.')
			)
		}

		const derivativePluginDefinition = deriver.getDerivativeDefinition(derivativeId, basePluginDefinition);
		if (!derivativePluginDefinition) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new PluginException(this.type, id, 'Derivative definitio for derivative ID is missing.')
			)
		}

		return this.createPluginDefinition(id, basePluginDefinition, derivativePluginDefinition);
	}

	protected getDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef> | undefined {
		const { id: id } = basePLuginDefinition;

		if (!this.derivers.has(id)) {
			const deriver = this.hasDeriver(basePLuginDefinition) ? this.createDeriver(basePLuginDefinition) : undefined;
			this.derivers.set(id, deriver);
		}
		return this.derivers.get(id)!;
	}


	protected getDerivatives(basePluginDefinitions: BasePluginDef[]): (BasePluginDef | PluginDef)[] {

		basePluginDefinitions.forEach((basePluginDef) => {
			const { id: basePluginId } = basePluginDef;
			const deriver = this.getDeriver(basePluginDef);
			if (!deriver) {
				if (!this._definitionsCache.has(basePluginId)) {
					this._definitionsCache.set(basePluginId, basePluginDef);
				}
				return;
			}
			const derivativeDefinitions = deriver.getDerivativeDefinitions(basePluginDef);

			derivativeDefinitions.forEach(derivativeDef => {
				const id = deriver.createPluginId(basePluginDef, derivativeDef);

				if (!this._definitionsCache.has(id)) {
					const pluginDef = this.createPluginDefinition(id, basePluginDef, derivativeDef);
					this._definitionsCache.set(id, pluginDef);
				}

			})
		})

		return Array.from(this._definitionsCache.values());
	}
}
