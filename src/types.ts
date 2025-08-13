/**
 * Кортеж из одной или двух строк, используется для идентификаторов плагинов и их производных.
 */
export type TOneOrTwoTuple = [string, string] | [string];
/**
 * Описание (definition) плагина. Используется для конфигурирования и регистрации плагинов.
 * @template P Тип плагина
 * @template D Дополнительные данные для дериваторов
 */
export interface IPluginDefinition<P extends IPlugin = IPlugin, D extends object = object> {
	type: string;
	id: string;
	label: string;
	pluginClass?: IType<P>;
	deriverClass?: IType<IPluginDeriver<D>>;
	disabled?: boolean;
}

/**
 * Базовый интерфейс плагина.
 */
export interface IPlugin {
	id: string;
	label: string;
	type: string;
	definition: IPluginDefinition;
}

/**
 * Тип конструктора класса плагина.
 */
export type PluginClass<P extends IPlugin> = { new(definition: TPluginDefinition<P>): P }
/**
 * Тип конструктора класса-дериватора.
 */
export type DeriverClass<D extends IPluginDeriver> = { new(): D }

 
/**
 * Универсальный тип конструктора для любого класса.
 * @template T
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IType<T> = { new(...args: any[]): T }

/**
 * Тип определения плагина для конкретного класса плагина.
 */
export type TPluginDefinition<P extends IPlugin> = P['definition'];

/**
 * Фабрика для создания экземпляра плагина.
 */
export type TPluginFactory<P extends IPlugin> = (definition: TPluginDefinition<P>, ...vars: unknown[]) => P;

/**
 * Интерфейс билдера плагинов (создание экземпляров по определению).
 */
export interface IPluginBuilder<P extends IPlugin = IPlugin> {
	/**
	 * Создать экземпляр плагина по определению
	 * @param definition Определение плагина
	 */
	build(definition: TPluginDefinition<P>): P;
}

export interface IPluginDiscovery<D extends IPluginDefinition = IPluginDefinition> {
	type: string;
	getDefinition(id: string, exceptionOnInvalid?: boolean): D | undefined;
	getDefinitions(): D[];
	hasDefinition(id: string): boolean;
}

export interface IPluginManager<P extends IPlugin = IPlugin> {
	getDefinition(id: string): P['definition'];
	getDefinitions(): P['definition'][];
	getInstance(id: string): P;
}

export interface IPluginDeriver<D extends object = object> {
	getDerivativeId(derivative: D): string,
	createPluginId(basePluginDefinition: IPluginDefinition, derivativeDef: D): string;
	getDerivativeDefinition(derivativeId: string, basePluginDefinition: IPluginDefinition): D | undefined;
	getDerivativeDefinitions(basePluginDefinition?: IPluginDefinition): D[];
}