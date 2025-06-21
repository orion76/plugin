import { IPluginDefinition, IPluginDeriver } from "../../types";
import { createDerivativedPluginId } from "../../utils";

export abstract class PluginDeriverBase<D extends object> implements IPluginDeriver<D> {
    protected abstract derivatives: D[];
    abstract getDerivativeId(derivative: D): string

    getDerivativeDefinition(derivativeId: string, basePluginDefinition: IPluginDefinition): D | undefined {
        return this.getDerivativeDefinitions(basePluginDefinition).find((d) => derivativeId === this.getDerivativeId(d));
    }
    createPluginId(basePluginDefinition: IPluginDefinition, derivativeDef: D) {
        const derivativeId = this.getDerivativeId(derivativeDef);
        return createDerivativedPluginId(basePluginDefinition.id, derivativeId);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDerivativeDefinitions(basePluginDefinition?: IPluginDefinition): D[] {
        return this.derivatives;
    }
} 