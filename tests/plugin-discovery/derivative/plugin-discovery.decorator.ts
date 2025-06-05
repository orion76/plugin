import { PluginException } from "../../../src/exceptions";
import { PluginDiscoveryDecorator } from "../../../src/plugin-discovery/derivatives/plugin-discovery.decorator";
import { IPlugin, IPluginDefinition, IPluginDeriver, IPluginDiscovery } from "../../../src/types";
import { PluginDiscoveryTest } from "../plugin-discovery.class";
import { ITestPluginDerivative } from "./types";



export class PluginDiscoveryDecoratorTest extends PluginDiscoveryDecorator<IPluginDefinition, ITestPluginDerivative> {
    protected override hasDeriver(basePLuginDefinition: IPluginDefinition<IPlugin, object>): boolean {
        return basePLuginDefinition.deriverClass !== undefined;
    }
    override get type() {
        return this.decorated.type;
    };
    protected override decorated: IPluginDiscovery<IPluginDefinition> = new PluginDiscoveryTest();
    protected override derivers = new Map<string, IPluginDeriver<ITestPluginDerivative>>();

    protected override createDeriver(basePLuginDefinition: IPluginDefinition<IPlugin, ITestPluginDerivative>): IPluginDeriver<ITestPluginDerivative> {
        const { deriverClass } = basePLuginDefinition;
        if (!deriverClass) {
            throw new PluginException(this.type, basePLuginDefinition.id, 'Plugin deriver class is missing');
        }
        return new deriverClass!();
    }
}