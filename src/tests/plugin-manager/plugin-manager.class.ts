import { PluginManagerBase } from "../../plugin-manager/plugin-manager.base";
import { IPlugin, IPluginDiscovery, IPluginBuilder } from "../../types";
import { PluginBuilderTest } from "../plugin-builder/plugin-builder.class";

import { PluginDiscoveryTest } from "../plugin-discovery/plugin-discovery.class";


interface IPluginTest extends IPlugin {

}
const TEST_PLUGIN_TYPE = 'TEST_PLUGIN_TYPE';

export class PluginManagerTest extends PluginManagerBase<IPluginTest> {
    pluginType = TEST_PLUGIN_TYPE;
    protected readonly pluginDiscovery: IPluginDiscovery = new PluginDiscoveryTest();
    protected readonly pluginBuilder: IPluginBuilder = new PluginBuilderTest()
}