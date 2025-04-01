export interface IType<T> extends Function {
	new(...args: any[]): T;
}

export interface IPluginDefinition<P extends IPlugin = IPlugin> {
	type: string;
	id: string;
	label: string;
	pluginClass?: IType<P>;
	disabled?: boolean;
}

export interface IPlugin {
	id: string;
	label: string;
	definition: IPluginDefinition
}

export type TPluginDefinition<P extends IPlugin> = P['definition'];

export type TPluginFactory<P extends IPlugin> = (definition: TPluginDefinition<P>, ...vars: any[]) => P;

export interface IPluginBuilder<P extends IPlugin = IPlugin> {
	build(definition: TPluginDefinition<P>): P;
}

export interface IPluginDiscovery {

	getDefinition(pluginId: string, exceptionOnInvalid?: boolean): IPluginDefinition | undefined;

	getDefinitions(): IPluginDefinition[];

	hasDefinition(pluginId: string): boolean;
}

export interface IPluginManager<P extends IPlugin = IPlugin> {
	getDefinition(pluginId: string): P['definition'] | undefined;

	getDefinitions(): P['definition'][];

	getInstance(pluginId: string): P;
}

