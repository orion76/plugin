[![Node.js Package](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml/badge.svg?branch=master)](https://github.com/orion76/plugin/actions/workflows/npm-publish.yml)
[![npm version](https://img.shields.io/npm/v/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![npm downloads](https://img.shields.io/npm/dm/@orion76/plugin)](https://www.npmjs.com/package/@orion76/plugin)
[![license](https://img.shields.io/github/license/orion76/plugin)](./LICENSE)
[![typescript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
[![issues](https://img.shields.io/github/issues/orion76/plugin)](https://github.com/orion76/plugin/issues)
[![pull requests](https://img.shields.io/github/issues-pr/orion76/plugin)](https://github.com/orion76/plugin/pulls)
[![stars](https://img.shields.io/github/stars/orion76/plugin?style=social)](https://github.com/orion76/plugin/stargazers)
[![node](https://img.shields.io/node/v/@orion76/plugin)](https://nodejs.org/)   


# Библиотека для реализации архитектурного паттерна «Плагин»

[📖 Описание архитектурного паттерна "Plugin"](./plugin.md)  

## Интеграция в фреймворки и библиотеки
![Angular](https://avatars.githubusercontent.com/u/89942104?v=4&size=20) Angular 2+:  [@orion76/ng-plugin](https://github.com/orion76/ng-plugin)    


## Содержание

- [Краткий обзор](#краткий-обзор)
- [Преимущества](#преимущества)
- [Установка](#установка)
- [Ссылки](#ссылки)
- [Пример использования](#пример-использования)
- [Основная задача](#основная-задача)
- [Термины и определения](#термины-и-определения)
- ["Внешние" Классы и интерфейсы](#внешние-классы-и-интерфейсы)


**@orion76/plugin** — инструмент для реализации архитектурного паттерна «Плагин» в TypeScript/JavaScript-проектах. Позволяет создавать расширяемые приложения с чистой архитектурой и разделением слоёв (например, Clean Architecture, DDD).


## Краткий обзор
- Кроссплатформенная: содержит только интерфейсы, абстрактные классы и общую логику работы системы «Плагин».
- Не зависит от конкретных платформ и фреймворков.
- Позволяет легко добавлять, удалять и управлять функциональностью через плагины.
- Упрощает тестирование и поддержку кода.

## Преимущества
- Чистая архитектура и модульность.
- Простое расширение функциональности без изменения ядра.
- Лёгкая интеграция с Angular 2+ через [@orion76/ng-plugin](https://github.com/orion76/ng-plugin).

## Установка
```bash
npm install --save @orion76/plugin
```

## Ссылки
- [Plugin Architecture Design Pattern - A Beginner's Guide to Modularity](https://www.devleader.ca/2023/09/07/plugin-architecture-design-pattern-a-beginners-guide-to-modularity)
- Пример интеграции: [@orion76/ng-logger](https://github.com/orion76/ng-logger)

## Пример использования
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
	label: 'Мой плагин'
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

## Основная задача
Готовый инструмент для реализации архитектурного паттерна «Плагин» и разделения слоёв приложения.

## Термины и определения

- **Плагин (Plugin)** — независимый модуль, реализующий определённую функциональность и подключаемый к основной системе без изменения её ядра.
- **Определение плагина (Plugin Definition)** — объект-конфигурация, описывающий свойства, тип, идентификатор и класс плагина. Используется для регистрации и поиска плагинов.
- **Менеджер плагинов (Plugin Manager)** — центральный компонент, отвечающий за регистрацию, поиск, создание и управление экземплярами плагинов.
- **Экземпляр плагина (Plugin Instance)** — объект, созданный на основе определения плагина и реализующий его логику.
- **Дериватор (Deriver)** — вспомогательный класс, позволяющий создавать производные (derivative) плагины на основе базового определения.
- **Билдер плагинов (Plugin Builder)** — компонент, отвечающий за создание экземпляров плагинов по их определениям, с учётом внедрения зависимостей.
- **Plugin Discovery** — механизм поиска и предоставления определений плагинов для менеджера.


## "Внешние" Классы и интерфейсы


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
Своего рода конфиг плагина, обязательные поля:
* type - тип для групировки плагинов и связи их с PluginManager
* id - уникальный идентификатор плугина в пределах типа

> По сути, type и id - единственные "точки связи" плагина и его PluginManager.   

* label - Юзерфрендли идентификатор плагина, может использоваться для логирования и отладки.

Интерфейс **IPluginDefinition** может расширяться любыми другими свойствами, согласно логики работы плагина.


### Interface "IPlugin"
```typescript
interface IPlugin{
	type: string;
	id: string;
	label: string;
	definition: IPluginDefinition;
}
```
   
Как видно из интерфейса IPlugin, плугин это класс с одним обязательным свойством "definition" и геттерами полей "id","type" и "label" свойства "definition".    

Дополнительные  свойства и методы добавляются согласно логики работы плагина.   
Интерфейс типа свойства "definition" так же расширяется по необходимости.


### Interface "IPluginManager"
```typescript
export interface IPluginManager<P extends IPlugin = IPlugin> {
	getDefinition(id: string): P['definition'] | undefined;

	getDefinitions(): P['definition'][];

	getInstance(id: string): P;
}
```
PluginManager - единственный класс-элемент системы "Plugin", доступный , так сказать, из вне , т.е. сервисам разрабатываемого приложения.   
PluginManager работает с плагинами определенного тип (значение свойства type)
Имеет следующие методы:

*  getDefinition(id: string): P['definition'] | undefined
Возвращает PluginDefinition плагина по его ID.

* getDefinitions(): P['definition'][];
Возвращает PluginDefinition всех плагиинов данного типа.

* getInstance(id: string): P;
Возвращает непосредственно инстанс класса плагина по его ID
	
---
**Кратко, один из распространеных сценариев использования:**      

Сервис приложения получает в зависимостях PluginManager плагинов определенного типа.   
На основании информации, заключенной в PluginDefinition плагинов, принимает решение, какой плагин необходимо использовать.   
Получает у PluginManager инстанс плагина по его ID и вызывает необходимые методы плагина.

---


