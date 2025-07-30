


# Библиотека для реализации архитектурного паттерна Plugin
Идея библиотеки Plugin была заимствована у CMF Drupal 8.   

## Install
```
npm install --save @orion76/plugin
```
## Links

* [Plugin Architecture Design Pattern - A Beginner's Guide to Modularity](https://www.devleader.ca/2023/09/07/plugin-architecture-design-pattern-a-beginners-guide-to-modularity)
> Plugin architecture is a design pattern in software engineering where the application is structured in a way that allows pieces of its functionality, termed as 'plugins', to be added and removed seamlessly. These plugins are standalone components that interact with the main application, providing specific features or functionalities.

   
	  
* 



## Основная задача
Готовый инструмент для реализации архитектурного паттерна "Plugin". 
А также для разделения слоев приложения (Clean Architecture, DDD и т.п.).

Данная библиотека кроссплатформенная, то есть содержит только интерфейсы, абстрактные классы и общую логику работы системы "Plugin".

Для интеграции системы с платформой Angular 2+ предназначена отдельная библиотека
[@orion76/ng-plugin](https://github.com/orion76/ng-plugin)   

> Пример использования системы Plugin: [@orion76/ng-logger](https://github.com/orion76/ng-logger)
"Плагинами" являются инстансы логгеров и транспортов логов
Проект написан больше в целях демонстрации работы системы Plugin


## "Внешние" Классы и интерфейсы

### Термины и определения: @TODO

### Interface "IPluginDefinition"
```
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
```
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
```
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

## "Внутренние" Классы и интерфейсы реализации системы "Plugin"

### Термины и определения: @TODO


### PluginManager  
PluginManager имеет следующие классы-зависимости:
* PluginDiscovery - класс отвечает за предоставление PluginDefinitions для PluginManager   
Источник PluginDefinition может быть любым и определяется как раз реализацией класса PluginDiscovery.

> Например в библиотеке интеграции данной системы c Angular 2+ [@orion76/ng-plugin](https://github.com/orion76/ng-plugin), дефолтный PluginDiscovery получает PluginDefinition из аргумента декоратора класса плагина - **@Plugin**(_definition: IPluginDefinition_) .   

* PluginBuilder - класс отвечает за создание инстанса класса плугина.

> Реализация класса в основном зависит от платформы использования данной библиотеки.   
> Например в библиотеке [@orion76/ng-plugin](https://github.com/orion76/ng-plugin), PluginBuilder для билда инстанса плагина использует стандартную систему Dependency Injection Angular 17+.
> т.е. классы плагинов являются injectable и в свою очередь для внедрения собстенных зависимостей могут использовать декоратор **@Inject** или функцию **inject()**.   


### PluginDiscovery


