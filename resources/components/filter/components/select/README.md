# Компонент Select

### Входные параметры:

* title: заголовок select
* options: массив опций; каждый элемент представляет объект, обязательным атрибутом которого должно быть "value" - значение возвращаемое опцией (примитив); необязательным - "content", значение которого будет использоваться для отображения пользователю; если оно не указано, вместо него будет использовано значение артибута "value" (предпологается, что значение атрибута "value" будет уникальным).
* disabled: индикатор активности компонента (true|false)

### Пример использования:

```javascript
  <Select 
    v-model="bind"
    title="some title" 
    :options="options" 
    class="some-class"
  />
```

Где "options": "[{value: 'option value 1'}, {value: 'option value 2'}]" или "[{value: "option value 1", content: "option content 1"}, {value: "option value 2", content: "option content 2"}]"
