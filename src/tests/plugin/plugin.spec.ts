import { IPluginDefinition, IPlugin } from '../../types';
import {PluginTest} from './plugin.class';


const PLUGIN_TEST = 'PLUGIN_TEST'

const pluginDefinition: IPluginDefinition = {
	id: 'testPluginId',
	label: 'testPluginLabel',
	type: PLUGIN_TEST
}

describe('Plugin', () => {
	let plugin: IPlugin;
	beforeEach(() => {
		plugin = new PluginTest(pluginDefinition)
	})
	it('should created', () => {
		expect(plugin instanceof PluginTest).toBeTruthy();
	});
	it('getter "definition"  should return plugin definition', () => {
		expect(plugin.definition).toEqual(pluginDefinition);
	});
});
