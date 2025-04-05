import { Type } from "@angular/core";
import { IPlugin, IPluginBuilder, TPluginDefinition, TPluginFactory } from "../types";


export abstract class PluginBuilderBase<P extends IPlugin> implements IPluginBuilder<P> {

	protected factory: TPluginFactory<P> = (definition: TPluginDefinition<P>) => {
		return new (definition.pluginClass as Type<P>)(definition);
	};

	build(definition: TPluginDefinition<P>): P {
		return this.factory(definition);
	}
}
