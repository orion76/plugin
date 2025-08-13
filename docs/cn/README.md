[![Node.js Package](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml)
[![npm version](https://img.shields.io/npm/v/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![npm downloads](https://img.shields.io/npm/dm/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![license](https://img.shields.io/github/license/orion76/plugin)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![issues](https://img.shields.io/github/issues/orion76/plugin)](https://github.com/orion76/plugin/issues)
[![pull requests](https://img.shields.io/github/issues-pr/orion76/plugin)](https://github.com/orion76/plugin/pulls)
[![stars](https://img.shields.io/github/stars/orion76/plugin?style=social)](https://github.com/orion76/plugin/stargazers)
[![node](https://img.shields.io/node/v/@orion76/plugin)](https://nodejs.org/)   

# 用于实现插件架构模式的库

[📖 插件架构模式说明](./plugin.md)  
## 集成到框架和库
![Angular](https://avatars.githubusercontent.com/u/89942104?v=4&size=20) Angular 2+:  [@orion76/ng-plugin](https://github.com/orion76/ng-plugin)    

## 目录
- [概述](#概述)
- [优势](#优势)
- [安装](#安装)
- [相关链接](#相关链接)
- [使用示例](#使用示例)
- [主要目标](#主要目标)
- [术语和定义](#术语和定义)
- [外部类和接口](#外部类和接口)

**@orion76/plugin** 是一个用于在 TypeScript/JavaScript 项目中实现“插件”架构模式的工具。它允许您构建具有清晰架构和分层（如 Clean Architecture、DDD）的可扩展应用程序。
## 概述
- 跨平台：仅包含接口、抽象类和插件系统的核心逻辑。
- 与具体平台和框架无关。
- 通过插件轻松添加、删除和管理功能。
- 简化测试和代码维护。

## 优势
- 清晰的架构和模块化。
- 无需更改核心即可轻松扩展功能。
- 通过 [@orion76/ng-plugin](https://github.com/orion76/ng-plugin) 轻松集成到 Angular 2+。
## 安装
```bash
npm install --save @orion76/plugin
```

## 相关链接
- [Plugin Architecture Design Pattern - A Beginner's Guide to Modularity](https://www.devleader.ca/2023/09/07/plugin-architecture-design-pattern-a-beginners-guide-to-modularity)
- 集成示例: [@orion76/ng-logger](https://github.com/orion76/ng-logger)

## 使用示例
```typescript
import { PluginManagerBase, PluginBase} from '@orion76/plugin';

export interface IMyPluginDefinition extends IPluginDefinition{
  propertyOne: boolean;
}

export interface IMyPlugin extends IPlugin{
  readonly propertyOne: boolean;
  methodOne()
  methodTwo()
}

const TEST_PLUGIN_TYPE = 'TEST_PLUGIN_TYPE';

@Plugin({
  id: 'my-plugin',
  type: TEST_PLUGIN_TYPE,
  label: '我的插件'
})
class MyPlugin extends PluginBase implements IMyPlugin{
  get propertyOne(){
    return this.definition.propertyOne;
  }
  methodOne(){
    console.log('methodOne is called.')
  }
  methodTwo(){
    console.log('methodTwo is called.')
  }
}

export class PluginManagerTest extends PluginManagerBase<IPluginTest> {
  type = TEST_PLUGIN_TYPE;
  protected readonly pluginDiscovery: IPluginDiscovery = new PluginDiscoveryTest();
  protected readonly pluginBuilder: IPluginBuilder<IPluginTest> = new PluginBuilderTest()
}

const pluginManager = new PluginManagerTest();

const definition =pluginManager.getDefinitions().find((definition)=>definition.properyOne ===true);
if( definition ){
  const plugin = pluginManager.getInstance(definition.id);
  plugin.methodOne();
  plugin.methodTwo();
}

```

## 主要目标
用于实现插件架构模式和应用分层的现成工具。

## 术语和定义

- **插件 (Plugin)** — 实现特定功能并可在不更改核心系统的情况下连接到主系统的独立模块。
- **插件定义 (Plugin Definition)** — 描述插件属性、类型、标识符和类的配置对象。用于注册和查找插件。
- **插件管理器 (Plugin Manager)** — 负责注册、查找、创建和管理插件实例的核心组件。
- **插件实例 (Plugin Instance)** — 基于插件定义创建并实现其逻辑的对象。
- **派生器 (Deriver)** — 辅助类，用于基于基础定义创建派生（derivative）插件。
- **插件构建器 (Plugin Builder)** — 负责根据插件定义创建插件实例并支持依赖注入的组件。
- **插件发现 (Plugin Discovery)** — 为管理器查找和提供插件定义的机制。


## 外部类和接口


### 接口 "IPluginDefinition"
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
插件的配置对象，必填字段：
* type - 用于对插件分组并将其与 PluginManager 关联的类型
* id - 类型范围内插件的唯一标识符

> 实际上，type 和 id 是插件与其 PluginManager 之间的唯一“连接点”。

* label - 用户友好的插件标识符，可用于日志记录和调试。

**IPluginDefinition** 接口可根据插件逻辑扩展为其他属性。


### 接口 "IPlugin"
```typescript
interface IPlugin{
  type: string;
  id: string;
  label: string;
  definition: IPluginDefinition;
}
```
如 IPlugin 接口所示，插件是一个具有一个必需属性 "definition" 以及 "id"、"type" 和 "label" 字段 getter 的类。

可根据插件逻辑添加其他属性和方法。
"definition" 属性的类型接口也可根据需要扩展。


### 接口 "IPluginManager"
```typescript
export interface IPluginManager<P extends IPlugin = IPlugin> {
  getDefinition(id: string): P['definition'] | undefined;

  getDefinitions(): P['definition'][];

  getInstance(id: string): P;
}
```
PluginManager 是“插件”系统中唯一可供外部（即应用服务）访问的类元素。
PluginManager 处理特定类型（type 属性值）的插件。
具有以下方法：

*  getDefinition(id: string): P['definition'] | undefined
返回指定 ID 插件的 PluginDefinition。

* getDefinitions(): P['definition'][];
返回所有此类型插件的 PluginDefinition。

* getInstance(id: string): P;
根据 ID 返回插件类的实际实例。
  
---
**简要的常见使用场景：**      

应用服务通过依赖注入获得特定类型插件的 PluginManager。
根据 PluginDefinition 中包含的信息，决定使用哪个插件。
通过 PluginManager 根据 ID 获取插件实例并调用所需方法。

---

[![Node.js Package](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml)
[![npm version](https://img.shields.io/npm/v/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![npm downloads](https://img.shields.io/npm/dm/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![license](https://img.shields.io/github/license/orion76/plugin)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![issues](https://img.shields.io/github/issues/orion76/plugin)](https://github.com/orion76/plugin/issues)
[![pull requests](https://img.shields.io/github/issues-pr/orion76/plugin)](https://github.com/orion76/plugin/pulls)
[![stars](https://img.shields.io/github/stars/orion76/plugin?style=social)](https://github.com/orion76/plugin/stargazers)
[![node](https://img.shields.io/node/v/@orion76/plugin)](https://nodejs.org/)   


# 插件架构库
## 与框架和库的集成
![Angular](https://img.shields.io/badge/Angular-6f42c1?logo=angular&logoColor=white&labelColor=9b59b6&style=flat-square) Angular 2+:  [@orion76/ng-plugin](https://github.com/orion76/ng-plugin)  

[📖 插件架构模式说明](./plugin.md)  

**@orion76/plugin** 是一个用于在 TypeScript/JavaScript 项目中实现插件架构模式的工具。它允许你构建具有清晰架构和分层（如 Clean Architecture、DDD）的可扩展应用。

## 概述
- 跨平台：仅包含接口、抽象类和插件系统的核心逻辑。
- 与框架无关：不依赖于任何特定平台或框架。
- 通过插件轻松添加、移除和管理功能。
- 简化测试和代码维护。

## 优势
- 清晰的架构和模块化。
- 无需更改核心即可轻松扩展功能。
- 通过 [@orion76/ng-plugin](https://github.com/orion76/ng-plugin) 可简单集成到 Angular 2+。

## 安装
```bash
npm install --save @orion76/plugin
```

## 链接
- [插件架构设计模式 - 模块化初学者指南](https://www.devleader.ca/2023/09/07/plugin-architecture-design-pattern-a-beginners-guide-to-modularity)
- 集成示例: [@orion76/ng-logger](https://github.com/orion76/ng-logger)

## 使用示例
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
  label: '我的插件'
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

## 主要目标
一个用于实现插件架构模式和应用分层的开箱即用工具。

## 术语与定义
- **插件（Plugin）** —— 实现特定功能并可在不更改核心的情况下连接到主系统的独立模块。
- **插件定义（Plugin Definition）** —— 描述插件属性、类型、标识符和类的配置对象。用于注册和查找。
- **插件管理器（Plugin Manager）** —— 负责注册、查找、创建和管理插件实例的核心组件。
- **插件实例（Plugin Instance）** —— 基于插件定义创建并实现其逻辑的对象。
- **派生器（Deriver）** —— 用于基于基础定义创建派生插件的辅助类。
- **插件构建器（Plugin Builder）** —— 负责根据定义创建插件实例并支持依赖注入的组件。
- **插件发现（Plugin Discovery）** —— 用于查找和提供插件定义给管理器的机制。


## 外部类和接口

### 接口 "IPluginDefinition"
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
插件配置对象，必填字段：
* type —— 用于分组插件并将其与 PluginManager 关联的类型
* id —— 在类型内唯一的插件标识符

> 实际上，type 和 id 是插件与其 PluginManager 之间唯一的“连接点”。

* label —— 便于用户识别的插件标识符，可用于日志和调试。

**IPluginDefinition** 接口可根据插件逻辑扩展其他属性。

### 接口 "IPlugin"
```typescript
interface IPlugin {
  type: string;
  id: string;
  label: string;
  definition: IPluginDefinition;
}
```

如接口 IPlugin 所示，插件是一个具有必需属性 "definition" 的类，并通过该属性的 "id"、"type" 和 "label" 字段的 getter 进行访问。

可根据插件逻辑添加其他属性和方法。
"definition" 属性的类型也可根据需要扩展。

### 接口 "IPluginManager"
```typescript
export interface IPluginManager<P extends IPlugin = IPlugin> {
  getDefinition(id: string): P['definition'] | undefined;
  getDefinitions(): P['definition'][];
  getInstance(id: string): P;
}
```
PluginManager 是插件系统中唯一可供外部（即应用服务）访问的类元素。
PluginManager 处理特定类型（type 属性值）的插件。
它具有以下方法：

*  getDefinition(id: string): P['definition'] | undefined
根据 ID 返回插件的 PluginDefinition。

* getDefinitions(): P['definition'][];
返回此类型所有插件的 PluginDefinition。

* getInstance(id: string): P;
根据 ID 返回插件类的实际实例。

---
**常见用法场景简述：**

应用服务通过依赖注入获得特定类型插件的 PluginManager。
根据 PluginDefinition 中的信息决定使用哪个插件。
通过 PluginManager 根据 ID 获取插件实例并调用所需方法。

---

## 插件系统的内部类和接口

### PluginManager
PluginManager 依赖以下类：
* PluginDiscovery —— 负责为 PluginManager 提供 PluginDefinition 的类。PluginDefinition 的来源可以是任何内容，由 PluginDiscovery 类的实现决定。

> 例如，在 Angular 2+ 集成库 [@orion76/ng-plugin](https://github.com/orion76/ng-plugin) 中，默认的 PluginDiscovery 从插件类装饰器的参数 **@Plugin**(_definition: IPluginDefinition_) 获取 PluginDefinition。

* PluginBuilder —— 负责创建插件类实例的类。

> 该类的实现主要取决于本库的使用平台。
> 例如，在 [@orion76/ng-plugin](https://github.com/orion76/ng-plugin) 库中，PluginBuilder 使用标准的 Angular 17+ 依赖注入系统来构建插件实例。即插件类是可注入的，并且可以使用 **@Inject** 装饰器或 **inject()** 函数注入自己的依赖。

### PluginDiscovery
// ...
