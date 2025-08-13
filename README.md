

[![Node.js Package](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml)
[![npm version](https://img.shields.io/npm/v/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![npm downloads](https://img.shields.io/npm/dm/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![license](https://img.shields.io/github/license/orion76/plugin)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![issues](https://img.shields.io/github/issues/orion76/plugin)](https://github.com/orion76/plugin/issues)
[![pull requests](https://img.shields.io/github/issues-pr/orion76/plugin)](https://github.com/orion76/plugin/pulls)
[![stars](https://img.shields.io/github/stars/orion76/plugin?style=social)](https://github.com/orion76/plugin/stargazers)
[![node](https://img.shields.io/node/v/@orion76/plugin)](https://nodejs.org/)


# Library for implementing the Plugin architectural pattern

### Library "Plugin"   
[🇷🇺 Библиотека "Plugin"(описание)](./docs/ru/README.md)   
[🇨🇳 插件架构库 (说明)](./docs/cn/README.md) | 

### The "Plugin" architectural pattern 
[🇬🇧 Plugin Pattern Description](./docs/en/plugin.md)   
[🇷🇺 Описание архитектурного паттерна "Plugin"](./docs/ru/plugin.md)   
[🇨🇳 插件架构模式说明](./docs/cn/plugin.md)   


### Integration with Frameworks and Libraries
![Angular 2+](https://img.shields.io/badge/Angular-6f42c1?logo=angular&logoColor=white&labelColor=9b59b6&style=flat-square) -  [@orion76/ng-plugin](https://github.com/orion76/ng-plugin)


## Table of Contents   
- [Overview](#overview)
- [Benefits](#benefits)
- [Installation](#installation)
- [Links](#links)
- [Usage Example](#usage-example)
- [Main Purpose](#main-purpose)
- [Terms and Definitions](#terms-and-definitions)
- [External Classes and Interfaces](#external-classes-and-interfaces)



**@orion76/plugin** is a tool for implementing the Plugin architectural pattern in TypeScript/JavaScript projects. It allows you to build extensible applications with clean architecture and layer separation (e.g., Clean Architecture, DDD).



## Overview
- Cross-platform: contains only interfaces, abstract classes, and the core logic of the Plugin system.
- Framework-agnostic: does not depend on any specific platform or framework.
- Easily add, remove, and manage functionality via plugins.
- Simplifies testing and code maintenance.

## Benefits
- Clean architecture and modularity.
- Easy extension of functionality without changing the core.
- Simple integration with Angular 2+ via [@orion76/ng-plugin](https://github.com/orion76/ng-plugin).

## Installation
```bash
npm install --save @orion76/plugin
```

## Links
- [Plugin Architecture Design Pattern - A Beginner's Guide to Modularity](https://www.devleader.ca/2023/09/07/plugin-architecture-design-pattern-a-beginners-guide-to-modularity)
- Integration example: [@orion76/ng-logger](https://github.com/orion76/ng-logger)

## Usage Example
```typescript
import { PluginManagerBase, PluginBase } from '@orion76/plugin';

export interface IMyPluginDefinition extends IPluginDefinition {
  propertyOne: boolean;
}

export interface IMyPlugin extends IPlugin {
  readonly propertyOne: boolean;
  methodOne(): void;
  methodTwo(): void;
}

const TEST_PLUGIN_TYPE = 'TEST_PLUGIN_TYPE';

@Plugin({
  id: 'my-plugin',
  type: TEST_PLUGIN_TYPE,
  label: 'My Plugin'
})
class MyPlugin extends PluginBase implements IMyPlugin {
  get propertyOne() {
  return this.definition.propertyOne;
  }
  methodOne() {
  console.log('methodOne is called.');
  }
  methodTwo() {
  console.log('methodTwo is called.');
  }
}

export class PluginManagerTest extends PluginManagerBase<IMyPlugin> {
  type = TEST_PLUGIN_TYPE;
  protected readonly pluginDiscovery: IPluginDiscovery = new PluginDiscoveryTest();
  protected readonly pluginBuilder: IPluginBuilder<IMyPlugin> = new PluginBuilderTest();
}

const pluginManager = new PluginManagerTest();

const definition = pluginManager.getDefinitions().find((definition) => definition.propertyOne === true);
if (definition) {
  const plugin = pluginManager.getInstance(definition.id);
  plugin.methodOne();
  plugin.methodTwo();
}
```

## Main Purpose
A ready-to-use tool for implementing the Plugin architectural pattern and separating application layers.

## Terms and Definitions
- **Plugin** — an independent module that implements specific functionality and can be connected to the main system without changing its core.
- **Plugin Definition** — a configuration object describing the properties, type, identifier, and class of a plugin. Used for registration and lookup.
- **Plugin Manager** — the central component responsible for registering, finding, creating, and managing plugin instances.
- **Plugin Instance** — an object created based on a plugin definition and implementing its logic.
- **Deriver** — a helper class that allows creating derivative plugins based on a base definition.
- **Plugin Builder** — a component responsible for creating plugin instances from their definitions, supporting dependency injection.
- **Plugin Discovery** — a mechanism for finding and providing plugin definitions to the manager.


## External Classes and Interfaces

### Interface "IPluginDefinition"
```typescript
interface IPluginDefinition<P extends IPlugin = IPlugin, D extends object = object> {
  type: string;
  id: string;
  label: string;
  pluginClass?: IType<P>;
  deriverClass?: IType<IPluginDeriver<D>>;
  disabled?: boolean;
}
```
A kind of plugin config, required fields:
* type — type for grouping plugins and linking them to the PluginManager
* id — unique plugin identifier within the type

> In fact, type and id are the only "connection points" between a plugin and its PluginManager.

* label — user-friendly plugin identifier, can be used for logging and debugging.

The **IPluginDefinition** interface can be extended with any other properties as needed by the plugin logic.

### Interface "IPlugin"
```typescript
interface IPlugin {
  type: string;
  id: string;
  label: string;
  definition: IPluginDefinition;
}
```

As seen from the IPlugin interface, a plugin is a class with one required property "definition" and getters for the "id", "type", and "label" fields of the "definition" property.

Additional properties and methods are added as required by the plugin logic.
The type of the "definition" property can also be extended as needed.

### Interface "IPluginManager"
```typescript
export interface IPluginManager<P extends IPlugin = IPlugin> {
  getDefinition(id: string): P['definition'] | undefined;
  getDefinitions(): P['definition'][];
  getInstance(id: string): P;
}
```
The PluginManager is the only class-element of the Plugin system available, so to speak, from the outside, i.e., to the services of the developed application.
PluginManager works with plugins of a specific type (the value of the type property).
It has the following methods:

*  getDefinition(id: string): P['definition'] | undefined
Returns the PluginDefinition of a plugin by its ID.

* getDefinitions(): P['definition'][];
Returns the PluginDefinitions of all plugins of this type.

* getInstance(id: string): P;
Returns the actual instance of the plugin class by its ID.

---
**Briefly, one of the common usage scenarios:**

The application service receives a PluginManager for plugins of a specific type as a dependency.
Based on the information contained in the PluginDefinitions, it decides which plugin to use.
It gets the plugin instance from the PluginManager by its ID and calls the required plugin methods.

---