import { IPlugin, IType, TPluginDefinition, TPluginFactory } from "../types";
import { IPluginBuilder } from "../types";
import { Type } from "@angular/core";


export abstract class PluginBuilderBase<P extends IPlugin> implements IPluginBuilder<P> {

	protected defaultPluginClass?: IType<P>;
	protected factory: TPluginFactory<P> = (definition: TPluginDefinition<P>) => {
		return new (definition.pluginClass as Type<P>)(definition);
	};

	build(definition: TPluginDefinition<P>): P {
		if (!definition.pluginClass && this.defaultPluginClass) {
			definition.pluginClass = this.defaultPluginClass;
		}

		return this.factory(definition);
	}
}
