

import { PluginBuilderBase } from "../../src/public-api";
import { PluginTestThree } from "./plugin.class";

export class PluginBuilderTest extends PluginBuilderBase<PluginTestThree> {
    protected override  defaultPluginClass = PluginTestThree;
}