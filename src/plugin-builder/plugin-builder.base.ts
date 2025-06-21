import { IPlugin, IPluginBuilder, TPluginDefinition } from "../types";


export abstract class PluginBuilderBase<P extends IPlugin> implements IPluginBuilder<P> {
	abstract build(definition: TPluginDefinition<P>): P 
}
