import { PluginDiscoveryBase } from "../../src/plugin-discovery/plugin-discovery.base";
import { IPluginDefinition } from "../../src/types";


const TEST_PLUGIN_TYPE = 'TEST_PLUGIN_TYPE';

export const testPluginDefinitions: IPluginDefinition[] = [
    { id: 'id-1', label: 'plugin-1', type: TEST_PLUGIN_TYPE },
    { id: 'id-2', label: 'plugin-2', type: TEST_PLUGIN_TYPE },
    { id: 'id-3', label: 'plugin-3', type: TEST_PLUGIN_TYPE },
    { id: 'id-4', label: 'plugin-4', type: TEST_PLUGIN_TYPE },
    { id: 'id-5', label: 'plugin-5', type: TEST_PLUGIN_TYPE },
    { id: 'id-6', label: 'plugin-6', type: TEST_PLUGIN_TYPE },
];

export class PluginDiscoveryTest extends PluginDiscoveryBase {
    protected definitions: IPluginDefinition[] = testPluginDefinitions;

}