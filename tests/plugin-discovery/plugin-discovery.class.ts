import { PluginDiscoveryBase } from "../../src/plugin-discovery/plugin-discovery.base";
import { IPluginDefinitionWithDeriver } from "../../src/types";
import { testPluginDefinitions } from "./test-plugin-definitions.data";



export class PluginDiscoveryTest extends PluginDiscoveryBase<IPluginDefinitionWithDeriver> {
    protected definitions: IPluginDefinitionWithDeriver[] = testPluginDefinitions;

}