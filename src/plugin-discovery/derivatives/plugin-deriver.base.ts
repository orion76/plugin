import { IPluginDeriver } from "../../types";

export abstract class PluginDeriverBase<D extends object> implements IPluginDeriver<D> {
    protected abstract derivatives: D[];
    abstract getDerivativeId(derivative: D): string

    getDerivativeDefinition(derivativeId: string): D | undefined {
        return this.derivatives.find((d) => derivativeId === this.getDerivativeId(d));
    }

    getDerivativeDefinitions(): D[] {
        return Array.from(this.derivatives.values());
    }
} 