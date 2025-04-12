
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

    describe('method getDefinition(pluginId:string)', () => {
        describe('result SUCCES', () => {
            it('pluginId for existed plugin definition, should return plugin definition', () => {
                const basePluginDefinition = testPluginDefinitions[0];
                const derivativeDefinition = derivativeDefinitions[0];

                const basePluginId = basePluginDefinition.id;
                const derivativeId = derivativeDefinition.derivativeId;

                const pluginId = `${basePluginId}:${derivativeId}`

                const pluginDefinition = decorator.getDefinition(pluginId);
                expect(pluginDefinition).toBeDefined();
                expect(pluginDefinition!.id).toEqual(pluginId);
            });
        });
        describe('Base plugin definition is missing.', () => {

            // return undefined
            it('exceptionOnInvalid === undefined, should return undefined', () => {
                const exceptionOnInvalid = undefined;
                const pluginId = `not-existed-plugin-id`;

                const definition = decorator.getDefinition(pluginId, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // return undefined
            it('exceptionOnInvalid === false, should return undefined', () => {
                const exceptionOnInvalid = undefined;
                const pluginId = `not-existed-plugin-id`;

                const definition = decorator.getDefinition(pluginId, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // throw Error
            it('pluginId for not existed plugin definition, exceptionOnInvalid === true, should throw Error ', () => {
                const exceptionOnInvalid = true;
                const pluginId = `not-existed-plugin-id`;

                expect(() => decorator.getDefinition(pluginId, exceptionOnInvalid))
                    .toThrow(new PluginException(decorator.pluginType, pluginId, 'Base plugin definition not found.'));
            });
        })
        describe('Base plugin definition is exists.', () => {

            // return undefined
            it('Derivative ID is missing in plugin ID, should retunr base plugin definition', () => {
                const basePluginDefinition = testPluginDefinitions[0];
                const pluginId = basePluginDefinition.id;

                const definition = decorator.getDefinition(pluginId);

                expect(definition).toBeDefined();
                expect(definition!.id).toEqual(pluginId);
            });

        })
        describe('ID not exists', () => {

            // return undefined
            it('pluginId for not existed plugin definition, exceptionOnInvalid === undefined, should return undefined', () => {
                const exceptionOnInvalid = undefined;
                const pluginId = `not-existed-plugin-id:not-existed-derivative`;

                const definition = decorator.getDefinition(pluginId, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // return undefined
            it('pluginId for not existed plugin definition, exceptionOnInvalid === false, should return undefined', () => {
                const exceptionOnInvalid = false;
                const pluginId = `not-existed-plugin-id:not-existed-derivative`;

                const definition = decorator.getDefinition(pluginId, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // throw Error
            it('pluginId for not existed plugin definition, exceptionOnInvalid === true, should throw Error ', () => {
                const exceptionOnInvalid = true;
                const pluginId = `not-existed-plugin-id:not-existed-derivative`;

                expect(() => decorator.getDefinition(pluginId, exceptionOnInvalid))
                    .toThrow(new PluginException(decorator.pluginType, pluginId, 'Base plugin definition not found.'));
            });
        });

        // +++ ID without drivative id
        describe('Plugin ID not contains derivative id', () => {
            // return undefined
            it('pluginId not contains derivative id, should return base plugin definition', () => {
                const exceptionOnInvalid = undefined;
                const pluginId = `plugin-id-1`;

                const definition = decorator.getDefinition(pluginId, exceptionOnInvalid);

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

    describe('method hasDefinition(pluginId)', () => {
        it('pluginId is existed plugin ID, should return true', () => {
            const baseDefinitionWithDeriverClassId = 'plugin-id-1';
            const derivativeId = 'derivative-id-5'
            const pluginId = `${baseDefinitionWithDeriverClassId}:${derivativeId}`

            expect(decorator.hasDefinition(pluginId)).toEqual(true);
        });
        it('pluginId is NOT existed plugin ID, should return false', () => {
            const pluginId = 'FAKE ID'

            expect(decorator.hasDefinition(pluginId)).toEqual(false);
        });
    });
});