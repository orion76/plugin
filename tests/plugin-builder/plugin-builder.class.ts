

import { PluginBuilderBase } from "../../src/public-api";
import { IPluginDefinitionTest, IPluginTest } from "./types";

export class PluginBuilderTest extends PluginBuilderBase<IPluginTest> {
    override build(definition: IPluginDefinitionTest): IPluginTest {
        const { pluginClass } = definition;
        if (!pluginClass) {
            throw new Error('Plugin class is missing.')
        }
        return new pluginClass(definition)
    }
}