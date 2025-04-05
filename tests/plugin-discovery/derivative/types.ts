import { IPluginDefinition } from "../../../src/types";
import { TEST_PLUGIN_TYPE } from "../constants";


export interface ITestPluginDefinition extends IPluginDefinition {
    type: typeof TEST_PLUGIN_TYPE,
    pluginDefinitionField: string
}

export interface ITestPluginDerivative {
    derivativeId: string,
    fieldOne: string,
    fieldTwo: number,
    fieldThree: boolean
}

