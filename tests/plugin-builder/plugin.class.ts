
import { PluginBase } from "../../src/plugin/plugin.base";
import { IPluginDefinitionTest, IPluginTest } from "./types";

export class PluginTestOne extends PluginBase implements IPluginTest {
    constructor(protected _definition: IPluginDefinitionTest) {
        super();

    }
    metnodOne(): number {
        return 42;
    }

    get definition(): IPluginDefinitionTest {
        return this._definition;
    }
}

// export class PluginTestTwo extends PluginBase implements IPluginTest {
//     constructor(protected _definition: IPluginDefinitionTest) {
//         super();
//     }

//     get definition(): IPluginDefinitionTest {
//         return this._definition;
//     }
// } 

export class PluginTestThree extends PluginBase implements IPluginTest {
    constructor(protected _definition: IPluginDefinitionTest) {
        super();
    }
    metnodOne(): number {
        return 3;
    }

    get definition(): IPluginDefinitionTest {
        return this._definition;
    }
} 