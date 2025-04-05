

import { IPluginBuilder } from "../../src/types";
import { pluginDefinitionTest } from "./data";
import { PluginBuilderTest } from "./plugin-builder.class";
import { PluginTestOne } from "./plugin.class";

import { IPluginTest } from "./types";


describe('PluginBuilder', () => {
    let pluginBuilder: IPluginBuilder<IPluginTest>;
    beforeEach(() => {
        pluginBuilder = new PluginBuilderTest()
    })
    it('should created', () => {
        expect(pluginBuilder).toBeInstanceOf(PluginBuilderTest);
    });
    describe('method  "build(definition:IPluginDefinition)" should return plugin instance', () => {
        it('plugin from  pluginClass', () => {
            const plugin = pluginBuilder.build(pluginDefinitionTest)
            expect(plugin).toBeInstanceOf(PluginTestOne);
        });
    });

});
