import { PluginTestOne } from "./plugin.class";
import { IPluginDefinitionTest } from "./types";

const TEST_PLUGIN_TYPE = 'TEST_PLUGIN_TYPE';


export const pluginDefinitionTest: IPluginDefinitionTest = {
    id: 'plugin-id',
    type: TEST_PLUGIN_TYPE,
    label: "plugin label",
    pluginClass: PluginTestOne,
    propertyOne: false,
    propertyTwo: 0,
    propertyThree: ""
}