import { IPluginDefinition } from "../../src/types";
import { TEST_PLUGIN_TYPE } from "./constants";
import { PluginDeriverTest } from "./derivative/plugin-deriver.class";

export const testPluginDefinitions: IPluginDefinition[] = [
    { id: 'plugin-id-1', label: 'plugin-label-1', type: TEST_PLUGIN_TYPE, deriverClass: PluginDeriverTest },
    { id: 'plugin-id-2', label: 'plugin-label-2', type: TEST_PLUGIN_TYPE },
    { id: 'plugin-id-3', label: 'plugin-label-3', type: TEST_PLUGIN_TYPE },
    { id: 'plugin-id-4', label: 'plugin-label-4', type: TEST_PLUGIN_TYPE },
];
