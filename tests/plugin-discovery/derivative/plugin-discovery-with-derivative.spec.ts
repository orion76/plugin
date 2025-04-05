
import { testPluginDefinitions } from "../test-plugin-definitions.data";
import { derivativeDefinitions } from "./derivative-definitions.data";
import { PluginDiscoveryWithDerivativeDecoratorTest } from "./plugin-discovery-with-derivative.class";

describe('class PluginDiscoveryWithDerivativeDecorator', () => {
    let decorator: PluginDiscoveryWithDerivativeDecoratorTest;
    beforeEach(() => {
        decorator = new PluginDiscoveryWithDerivativeDecoratorTest();
    })
    it('Plugin Discovery Decoraator should be created', () => {
        expect(decorator).toBeInstanceOf(PluginDiscoveryWithDerivativeDecoratorTest);
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
                    .toThrowError(`Base plugin definition not found. Plugin ID: ${pluginId}`);
            });
        });

        // +++ ID without drivative id
        describe('Plugin ID not contagins derivative id', () => {
            // return undefined
            it('pluginId not contains derivative id, exceptionOnInvalid === undefined, should return undefined', () => {
                const exceptionOnInvalid = undefined;
                const pluginId = `not-existed-plugin-id`;

                const definition = decorator.getDefinition(pluginId, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // return undefined
            it('pluginId not contains derivative id, exceptionOnInvalid === false, should return undefined', () => {
                const exceptionOnInvalid = false;
                const pluginId = `not-existed-plugin-id`;

                const definition = decorator.getDefinition(pluginId, exceptionOnInvalid);

                expect(definition).toBeUndefined();
            });

            // throw Error
            it('pluginId not contains derivative id, exceptionOnInvalid === true, should throw Error ', () => {
                const exceptionOnInvalid = true;
                const pluginId = `not-existed-plugin-id`;

                expect(() => decorator.getDefinition(pluginId, exceptionOnInvalid))
                    .toThrowError(`Plugin Id does not contain a derivative ID. Plugin ID: ${pluginId}`);
            });
        });

    });

    describe('method getDefinitions()', () => {
        it('Should return plugin definitions', () => {
            const definitions = decorator.getDefinitions();
            const expectedDefinitionsCount = testPluginDefinitions.length * derivativeDefinitions.length;

            expect(definitions.length).toEqual(expectedDefinitionsCount);
        });
    });

    describe('method hasDefinition(pluginId)', () => {
        it('pluginId is existed plugin ID, should return true', () => {
            const pluginId = 'id-2:derivative-id-5'

            expect(decorator.hasDefinition(pluginId)).toEqual(true);
        });
        it('pluginId is NOT existed plugin ID, should return false', () => {
            const pluginId = 'FAKE ID'

            expect(decorator.hasDefinition(pluginId)).toEqual(false);
        });
    });
});