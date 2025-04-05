import { PluginDeriverBase } from "../../../src/deriver/plugin-deriver.base";
import { arrayToMap } from "../../../src/utils";
import { derivativeDefinitions } from "./derivative-definitions.data";
import { ITestPluginDerivative } from "./types";


export class PluginDeriverTest extends PluginDeriverBase<ITestPluginDerivative> {
    protected override derivatives: Map<string, ITestPluginDerivative> = arrayToMap<ITestPluginDerivative>(derivativeDefinitions, (d) => d.derivativeId);

    getDerivativeId(derivative: ITestPluginDerivative): string {
        return derivative.derivativeId;
    }
}