import { IPluginDefinitionWithDeriver, IPluginDeriver, IPluginDiscovery, TOneOrTwoTuple } from '../../types';


function getUndefinedOrThrowError(exceptionOnInvalid: boolean, errorFactory: () => void): undefined {
	if (!exceptionOnInvalid) {
		return undefined;
	}
	throw errorFactory();
}

export abstract class PluginDiscoveryWithDerivativesDecorator<
	BasePluginDef extends IPluginDefinitionWithDeriver = IPluginDefinitionWithDeriver,
	DerivDef extends object = object,
	PluginDef extends BasePluginDef & DerivDef = BasePluginDef & DerivDef
> implements IPluginDiscovery<PluginDef> {

	protected abstract decorated: IPluginDiscovery<BasePluginDef>;

	protected abstract createDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef>;

	protected derivers: Map<string, IPluginDeriver<DerivDef>> = new Map();
	private _definitionsCache: Map<string, PluginDef> = new Map();


	getDefinition(pluginId: string, exceptionOnInvalid?: boolean): PluginDef | undefined {
		if (!this._definitionsCache.has(pluginId)) {
			const definition = this.createPluginDefinition(pluginId, exceptionOnInvalid);
			if (definition) {
				this._definitionsCache.set(pluginId, definition)
			}
		}

		return this._definitionsCache.get(pluginId);
	}
	getDefinitions(): PluginDef[] {
		const basePluginDefinitions = this.decorated.getDefinitions();

		return this.getDerivatives(basePluginDefinitions);
	}

	hasDefinition(pluginId: string): boolean {
		return Boolean(this.getDefinition(pluginId));
	}
	protected mergeDerivativeDefinition(id: string, pluginDefinition: BasePluginDef, derivativeDefinition: DerivDef): PluginDef {
		return { ...pluginDefinition, ...derivativeDefinition, id } as PluginDef;
	}
	protected createPluginDefinition(pluginId: string, exceptionOnInvalid = false): PluginDef | undefined {
		const [basePluginId, derivativeId] = this.decodePluginId(pluginId);

		if (!derivativeId) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new Error(`Plugin Id does not contain a derivative ID. Plugin ID: ${pluginId}`)
			)
		}

		const basePluginDefinition = this.decorated.getDefinition(basePluginId);

		if (!basePluginDefinition) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new Error(`Base plugin definition not found. Plugin ID: ${pluginId}`)
			)
		}

		const deriver = this.getDeriver(basePluginDefinition);

		if (!deriver) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new Error(`Deriver for base plugin ID is missing. Plugin ID: ${basePluginId}`)
			)
		}

		const derivativePluginDefinition = deriver.getDerivativeDefinition(derivativeId, basePluginDefinition);
		if (!derivativePluginDefinition) {
			return getUndefinedOrThrowError(
				exceptionOnInvalid,
				() => new Error(`Derivative definitio for derivative ID is missing: ${derivativeId}`)
			)
		}

		return this.mergeDerivativeDefinition(pluginId, basePluginDefinition, derivativePluginDefinition);
	}



	protected decodePluginId(pluginId: string): TOneOrTwoTuple {
		return pluginId.split(':') as TOneOrTwoTuple;
	}
	protected encodePluginId(basePluginId: string, derivativeId: string) {
		return `${basePluginId}:${derivativeId}`;
	}
	protected getDeriver(basePLuginDefinition: BasePluginDef): IPluginDeriver<DerivDef> {
		const { id: pluginId } = basePLuginDefinition;
		if (!this.derivers.has(pluginId)) {
			const deriver = this.createDeriver(basePLuginDefinition);
			this.derivers.set(pluginId, deriver);
		}
		return this.derivers.get(pluginId)!;
	}

	protected getDerivatives(basePluginDefinitions: BasePluginDef[]): PluginDef[] {

		basePluginDefinitions.forEach((basePluginDef) => {
			const { id: basePluginId } = basePluginDef;
			const deriver = this.getDeriver(basePluginDef);
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
