import { PluginDiscoveryWithDerivativesDecorator } from "../../../src/plugin-discovery/derivatives/plugin-discovery-with-derivatives.decorator";
import { IPlugin, IPluginDefinitionWithDeriver, IPluginDeriver, IPluginDiscovery } from "../../../src/types";
import { PluginDiscoveryTest } from "../plugin-discovery.class";
import { ITestPluginDerivative } from "./types";



export class PluginDiscoveryWithDerivativeDecoratorTest extends PluginDiscoveryWithDerivativesDecorator<IPluginDefinitionWithDeriver, ITestPluginDerivative> {
    protected override decorated:IPluginDiscovery<IPluginDefinitionWithDeriver> = new PluginDiscoveryTest();
    protected override derivers = new Map<string, IPluginDeriver<ITestPluginDerivative>>();

    protected override createDeriver(basePLuginDefinition: IPluginDefinitionWithDeriver<IPlugin, ITestPluginDerivative>): IPluginDeriver<ITestPluginDerivative> {
        const { deriverClass } = basePLuginDefinition
        return new deriverClass();
    }
}