import { PluginDeriverBase } from "../../../src/plugin-discovery/derivatives/plugin-deriver.base";
import { derivativeDefinitions } from "./derivative-definitions.data";
import { ITestPluginDerivative } from "./types";


export class PluginDeriverTest extends PluginDeriverBase<ITestPluginDerivative> {
    protected override derivatives=derivativeDefinitions;

    getDerivativeId(derivative: ITestPluginDerivative): string {
        return derivative.derivativeId;
    }
}