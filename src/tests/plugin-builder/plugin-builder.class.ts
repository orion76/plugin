import { PluginBuilderBase } from "../../plugin-builder/plugin-builder.base";
import { PluginTestThree } from "./plugin.class";

export class PluginBuilderTest extends PluginBuilderBase<PluginTestThree> {
    protected override  defaultPluginClass = PluginTestThree;
}