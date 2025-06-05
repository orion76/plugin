
import { IPluginDiscovery } from "../../src/types";
import { PluginDiscoveryTest } from "./plugin-discovery.class";
import { testPluginDefinitions } from "./test-plugin-definitions.data";


describe('PluginDiscovery', () => {
    let pluginDiscovery: IPluginDiscovery;
    beforeEach(() => {
        pluginDiscovery = new PluginDiscoveryTest()
    })
    it('should created', () => {
        expect(pluginDiscovery instanceof PluginDiscoveryTest).toBeTruthy();
    });
    describe('method getDefinition(id: string, exceptionOnInvalid: boolean): IPluginDefinition | undefined ', () => {
        describe('id is missing', () => {
            it('is argument exceptionOnInvalid has value "true", should throw error', () => {
                const FAKE_PLUGIN_ID = 'FAKE_PLUGIN_ID';
                const exceptionOnInvalid = true;
                expect(() => pluginDiscovery.getDefinition(FAKE_PLUGIN_ID, exceptionOnInvalid)).toThrow();
            });
            it('is argument exceptionOnInvalid has value "false", not throw error and should return undefined', () => {
                const FAKE_PLUGIN_ID = 'FAKE_PLUGIN_ID';
                const exceptionOnInvalid = false;
                expect(() => pluginDiscovery.getDefinition(FAKE_PLUGIN_ID, exceptionOnInvalid)).not.toThrow();
                expect(pluginDiscovery.getDefinition(FAKE_PLUGIN_ID, exceptionOnInvalid)).toBeUndefined();
            });
        });
        it('the plugin definition with id is present', () => {
            const PLUGIN_ID = 'plugin-id-3';
            let exceptionOnInvalid = true;
            expect(() => pluginDiscovery.getDefinition(PLUGIN_ID, exceptionOnInvalid)).not.toThrow();

            exceptionOnInvalid = false;
            expect(() => pluginDiscovery.getDefinition(PLUGIN_ID, exceptionOnInvalid)).not.toThrow();


            const definition = pluginDiscovery.getDefinition(PLUGIN_ID);
            const definitionIsPresent = Boolean(definition);
            if (definitionIsPresent) {
                expect(definition?.id).toEqual(PLUGIN_ID);
            }
            expect(definitionIsPresent).toEqual(true);

        });
    });
    describe('method hasDefinition(id: string): boolean;', () => {
        it('definition for id is present, should return TRUE', () => {
            const PLUGIN_ID = 'plugin-id-3';
            expect(pluginDiscovery.hasDefinition(PLUGIN_ID)).toEqual(true);
        });
        it('definition for id is NOT present, should return FALSE', () => {
            const FAKE_PLUGIN_ID = 'FAKE_PLUGIN_ID';
            expect(pluginDiscovery.hasDefinition(FAKE_PLUGIN_ID)).toEqual(false);
        });
    });

    describe('getDefinitions(): IPluginDefinition[]', () => {
        it('should return all plugin definitions', () => {
            const definitions = pluginDiscovery.getDefinitions();;
            expect(definitions.length).toEqual(testPluginDefinitions.length);
        });
    });
});
