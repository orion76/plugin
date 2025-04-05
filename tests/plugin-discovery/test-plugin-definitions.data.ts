import { IPluginDefinitionWithDeriver } from "../../src/types";
import { TEST_PLUGIN_TYPE } from "./constants";
import { PluginDeriverTest } from "./derivative/plugin-deriver.class";

export const testPluginDefinitions: IPluginDefinitionWithDeriver[] = [
    { id: 'id-1', label: 'plugin-1', type: TEST_PLUGIN_TYPE, deriverClass: PluginDeriverTest },
    { id: 'id-2', label: 'plugin-2', type: TEST_PLUGIN_TYPE, deriverClass: PluginDeriverTest },
    { id: 'id-3', label: 'plugin-3', type: TEST_PLUGIN_TYPE, deriverClass: PluginDeriverTest },
];
