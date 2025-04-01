
import { IPluginDiscovery } from "../../types";
import { PluginDiscoveryTest, testPluginDefinitions } from "./plugin-discovery.class";


describe('PluginDiscovery', () => {
    let pluginDiscovery: IPluginDiscovery;
    beforeEach(() => {
        pluginDiscovery = new PluginDiscoveryTest()
    })
    it('should created', () => {
        expect(pluginDiscovery instanceof PluginDiscoveryTest).toBeTruthy();
    });
    describe('method getDefinition(pluginId: string, exceptionOnInvalid: boolean): IPluginDefinition | undefined ', () => {
        describe('pluginId is missing', () => {
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
        it('the plugin definition with pluginId is present', () => {
            const PLUGIN_ID = 'id-4';
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
    describe('method hasDefinition(pluginId: string): boolean;', () => {
        it('definition for pluginId is present, should return TRUE', () => {
            const PLUGIN_ID = 'id-4';
            expect(pluginDiscovery.hasDefinition(PLUGIN_ID)).toEqual(true);
        });
        it('definition for pluginId is NOT present, should return FALSE', () => {
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
