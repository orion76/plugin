
import { PluginException } from "../../../src/exceptions";
import { testPluginDefinitions } from "../test-plugin-definitions.data";
import { derivativeDefinitions } from "./derivative-definitions.data";
import { PluginDiscoveryDecoratorTest } from "./plugin-discovery.decorator";

describe('class PluginDiscoveryWithDerivativeDecorator', () => {
    let decorator: PluginDiscoveryDecoratorTest;
    beforeEach(() => {
        decorator = new PluginDiscoveryDecoratorTest();
    })
    it('Plugin Discovery Decoraator should be created', () => {
        expect(decorator).toBeInstanceOf(PluginDiscoveryDecoratorTest);
    });

    describe('method getDefinition(id:string)', () => {
        describe('result SUCCES', () => {
            it('id for existed plugin definition, should return plugin definition', () => {
                const basePluginDefinition = testPluginDefinitions[0];
                const derivativeDefinition = derivativeDefinitions[0];

                const basePluginId = basePluginDefinition.id;
                const derivativeId = derivativeDefinition.derivativeId;

                const id = `${basePluginId}:${derivativeId}`

                const pluginDefinition = decorator.getDefinition(id);
                expect(pluginDefinition).toBeDefined();
                expect(pluginDefinition!.id).toEqual(id);
            });
        });
        describe('Base plugin definition is missing.', () => {

            // return undefined
            it('exceptionOnInvalid === undefined, should return undefined', () => {
                const exceptionOnInvalid = undefined;
                const id = `not-existed-plugin-id`;

                const definition = decorator.getDefinition(id, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // return undefined
            it('exceptionOnInvalid === false, should return undefined', () => {
                const exceptionOnInvalid = undefined;
                const id = `not-existed-plugin-id`;

                const definition = decorator.getDefinition(id, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // throw Error
            it('id for not existed plugin definition, exceptionOnInvalid === true, should throw Error ', () => {
                const exceptionOnInvalid = true;
                const id = `not-existed-plugin-id`;

                expect(() => decorator.getDefinition(id, exceptionOnInvalid))
                    .toThrow(new PluginException(decorator.type, id, 'Base plugin definition not found.'));
            });
        })
        describe('Base plugin definition is exists.', () => {

            // return undefined
            it('Derivative ID is missing in plugin ID, should retunr base plugin definition', () => {
                const basePluginDefinition = testPluginDefinitions[0];
                const id = basePluginDefinition.id;

                const definition = decorator.getDefinition(id);

                expect(definition).toBeDefined();
                expect(definition!.id).toEqual(id);
            });

        })
        describe('ID not exists', () => {

            // return undefined
            it('id for not existed plugin definition, exceptionOnInvalid === undefined, should return undefined', () => {
                const exceptionOnInvalid = undefined;
                const id = `not-existed-plugin-id:not-existed-derivative`;

                const definition = decorator.getDefinition(id, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // return undefined
            it('id for not existed plugin definition, exceptionOnInvalid === false, should return undefined', () => {
                const exceptionOnInvalid = false;
                const id = `not-existed-plugin-id:not-existed-derivative`;

                const definition = decorator.getDefinition(id, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // throw Error
            it('id for not existed plugin definition, exceptionOnInvalid === true, should throw Error ', () => {
                const exceptionOnInvalid = true;
                const id = `not-existed-plugin-id:not-existed-derivative`;

                expect(() => decorator.getDefinition(id, exceptionOnInvalid))
                    .toThrow(new PluginException(decorator.type, id, 'Base plugin definition not found.'));
            });
        });

        // +++ ID without drivative id
        describe('Plugin ID not contains derivative id', () => {
            // return undefined
            it('id not contains derivative id, should return base plugin definition', () => {
                const exceptionOnInvalid = undefined;
                const id = `plugin-id-1`;

                const definition = decorator.getDefinition(id, exceptionOnInvalid);

                expect(definition).toBeDefined();
            });
        });

    });

    describe('method getDefinitions()', () => {
        it('Should return plugin definitions', () => {
            const definitions = decorator.getDefinitions();
            const definitionsWithoutDerivativesCount = testPluginDefinitions.length - 1; // === 3
            const derivativesCount = derivativeDefinitions.length // === 6

            const expectedDefinitionsCount = definitionsWithoutDerivativesCount + derivativesCount;

            expect(definitions.length).toEqual(expectedDefinitionsCount);
        });
    });

    describe('method hasDefinition(id)', () => {
        it('id is existed plugin ID, should return true', () => {
            const baseDefinitionWithDeriverClassId = 'plugin-id-1';
            const derivativeId = 'derivative-id-5'
            const id = `${baseDefinitionWithDeriverClassId}:${derivativeId}`

            expect(decorator.hasDefinition(id)).toEqual(true);
        });
        it('id is NOT existed plugin ID, should return false', () => {
            const id = 'FAKE ID'

            expect(decorator.hasDefinition(id)).toEqual(false);
        });
    });
});