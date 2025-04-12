import { PluginException } from '../../exceptions';
import { IPluginDefinition, IPluginDeriver, IPluginDiscovery, TOneOrTwoTuple } from '../../types';


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

	get pluginType() {
		return this.decorated.pluginType;
	};

	protected abstract decorated: IPluginDiscovery<BasePluginDef>;

	protected abstract createDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef>;

	protected derivers: Map<string, IPluginDeriver<DerivDef> | undefined> = new Map();
	private _definitionsCache: Map<string, PluginDef | BasePluginDef> = new Map();

	protected hasDeriver(basePLuginDefinition: BasePluginDef): boolean {
		return !!basePLuginDefinition.deriverClass;
	}

	getDefinition(pluginId: string, exceptionOnInvalid?: boolean): BasePluginDef | PluginDef | undefined {
		if (!this._definitionsCache.has(pluginId)) {
			const definition = this.createPluginDefinition(pluginId, exceptionOnInvalid);
			if (definition) {
				this._definitionsCache.set(pluginId, definition)
			}
		}

		return this._definitionsCache.get(pluginId);
	}
	getDefinitions(): (BasePluginDef | PluginDef)[] {
		const basePluginDefinitions = this.decorated.getDefinitions();

		return this.getDerivatives(basePluginDefinitions);
	}

	hasDefinition(pluginId: string): boolean {
		return Boolean(this.getDefinition(pluginId));
	}
	protected mergeDerivativeDefinition(id: string, pluginDefinition: BasePluginDef, derivativeDefinition: DerivDef): PluginDef {
		return { ...pluginDefinition, ...derivativeDefinition, id } as PluginDef;
	}
	protected createPluginDefinition(pluginId: string, exceptionOnInvalid = false): PluginDef | BasePluginDef | undefined {
		const [basePluginId, derivativeId] = this.decodePluginId(pluginId);
		const basePluginDefinition = this.decorated.getDefinition(basePluginId);

		if (!basePluginDefinition) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new PluginException(this.pluginType, pluginId, 'Base plugin definition not found.')
			)
		}

		if (!derivativeId) {
			return basePluginDefinition;
		}

		const deriver = this.getDeriver(basePluginDefinition);

		if (!deriver) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new PluginException(this.pluginType, pluginId, 'Deriver for base plugin ID is missing.')
			)
		}

		const derivativePluginDefinition = deriver.getDerivativeDefinition(derivativeId, basePluginDefinition);
		if (!derivativePluginDefinition) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new PluginException(this.pluginType, pluginId, 'Derivative definitio for derivative ID is missing.')
			)
		}

		return this.mergeDerivativeDefinition(pluginId, basePluginDefinition, derivativePluginDefinition);
	}



	protected decodePluginId(pluginId: string): TOneOrTwoTuple {
		return pluginId.split(':') as TOneOrTwoTuple;
	}
	protected encodePluginId(basePluginId: string, derivativeId: string) {
		return `${basePluginId}:${derivativeId} `;
	}
	protected getDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef> | undefined {
		const { id: pluginId } = basePLuginDefinition;

		if (!this.derivers.has(pluginId)) {
			const deriver = this.hasDeriver(basePLuginDefinition) ? this.createDeriver(basePLuginDefinition) : undefined;
			this.derivers.set(pluginId, deriver);
		}
		return this.derivers.get(pluginId)!;
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
				const derivativeId = deriver.getDerivativeId(derivativeDef);
				const pluginId = this.encodePluginId(basePluginId, derivativeId);

				if (!this._definitionsCache.has(pluginId)) {
					const pluginDef = this.mergeDerivativeDefinition(pluginId, basePluginDef, derivativeDef);
					this._definitionsCache.set(pluginId, pluginDef);
				}

			})
		})

		return Array.from(this._definitionsCache.values());
	}
}
