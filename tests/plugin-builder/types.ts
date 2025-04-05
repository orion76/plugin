import { IPlugin, IPluginDefinition } from "../../src/types";

export interface IPluginTest extends IPlugin {
    metnodOne(): number;
}

export interface IPluginDefinitionTest extends IPluginDefinition<IPluginTest> {
    propertyOne: boolean,
    propertyTwo: number,
    propertyThree: string,
}
