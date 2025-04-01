

import { IPluginBuilder } from "../../types";
import { pluginDefinitionTest, pluginDefinitionTestWithPluginClass } from "./data";
import { PluginBuilderTest } from "./plugin-builder.class";
import { PluginTestOne, PluginTestThree } from "./plugin.class";

import { IPluginTest } from "./types";


describe('PluginBuilder', () => {
    let pluginBuilder: IPluginBuilder<IPluginTest>;
    beforeEach(() => {
        pluginBuilder = new PluginBuilderTest()
    })
    it('should created', () => {
        expect(pluginBuilder).toBeInstanceOf(PluginBuilderTest);
    });
    describe('method  "build(definition:IPluginDefinition)"  should return plugin instance', () => {
        it('plugin from  pluginClass', () => {
            const plugin = pluginBuilder.build(pluginDefinitionTestWithPluginClass)
            expect(plugin).toBeInstanceOf(PluginTestOne);
        });
        it('plugin from  defaultPluginClass', () => {
            const plugin = pluginBuilder.build(pluginDefinitionTest)
            expect(plugin).toBeInstanceOf(PluginTestThree);
        });
    });

});
