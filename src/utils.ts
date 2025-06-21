import { TOneOrTwoTuple } from "./types"

export function createDerivativedPluginId(basePluginId: string, derivativeId: string): string {
    return `${basePluginId}:${derivativeId}`
}

export function splitDerivativedPluginId(id: string): TOneOrTwoTuple {
    return id.split(':') as TOneOrTwoTuple;
}