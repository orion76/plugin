import { IPluginManager } from "../../types";
import { PluginManagerTest } from "./plugin-manager.class";


describe('PluginManager', () => {
    let pluginManager: IPluginManager;
    beforeEach(() => {
        pluginManager = new PluginManagerTest()
    })
    it('should created', () => {
        expect(pluginManager instanceof PluginManagerTest).toBeTruthy();
    });
    it('getter "definition"  should return plugin definition', () => {
        // expect(plugin.definition).toEqual(pluginDefinition);
    });
});
