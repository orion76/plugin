export type TOneOrTwoTuple = [string, string] | [string];
export interface IPluginDefinition<P extends IPlugin = IPlugin, D extends object = object> {
	pluginType: string;
	id: string;
	label: string;
	pluginClass?: IType<P>;
	deriverClass?: IType<IPluginDeriver<D>>;
	disabled?: boolean;
}

export interface IPlugin {
	id: string;
	label: string;
	definition: IPluginDefinition;

}

export type PluginClass<P extends IPlugin> = { new(definition: TPluginDefinition<P>): P }
export type DeriverClass<D extends IPluginDeriver> = { new(): D }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IType<T> = { new(...args: any[]): T }

export type TPluginDefinition<P extends IPlugin> = P['definition'];

export type TPluginFactory<P extends IPlugin> = (definition: TPluginDefinition<P>, ...vars: unknown[]) => P;

export interface IPluginBuilder<P extends IPlugin = IPlugin> {
	build(definition: TPluginDefinition<P>): P;
}

export interface IPluginDiscovery<D extends IPluginDefinition = IPluginDefinition> {
	pluginType: string;

	getDefinition(pluginId: string, exceptionOnInvalid?: boolean): D | undefined;

	getDefinitions(): D[];

	hasDefinition(pluginId: string): boolean;
}

export interface IPluginManager<P extends IPlugin = IPlugin> {
	getDefinition(pluginId: string): P['definition'] | undefined;

	getDefinitions(): P['definition'][];

	getInstance(pluginId: string): P;
}

export interface IPluginDeriver<D extends object = object> {
	getDerivativeId(derivative: D): string,
	getDerivativeDefinition(derivativeId: string, basePluginDefinition: IPluginDefinition): D | undefined;
	getDerivativeDefinitions(basePluginDefinition: IPluginDefinition): D[];
}