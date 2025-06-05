import { PluginDiscoveryBase } from "../../src/plugin-discovery/plugin-discovery.base";
import { IPluginDefinition } from "../../src/types";
import { TEST_PLUGIN_TYPE } from "./constants";
import { testPluginDefinitions } from "./test-plugin-definitions.data";



export class PluginDiscoveryTest extends PluginDiscoveryBase<IPluginDefinition> {
    override type = TEST_PLUGIN_TYPE;
    protected definitions: IPluginDefinition[] = testPluginDefinitions;

}