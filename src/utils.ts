export type TGetIdFunction<T> = (item: T) => string

export function arrayToMap<T>(items: T[], getIdFunction: TGetIdFunction<T>): Map<string, T> {
    return items.reduce(
        (mapItems, item) => mapItems.set(getIdFunction(item), item),
        new Map<string, T>()
    )
}