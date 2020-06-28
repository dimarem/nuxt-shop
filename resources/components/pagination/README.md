# Компонент пагинации для фреймворка Nuxt.js

### Входные параметры:

* current_page: порядковый номер текущей страницы (необязательный, по умолчанию 1);
* number_of_pages: общее количество страниц;
* base: базовый url;
* search: объект содержащий поисковые параметры;
* max_links: максимальное количество отображаемых ссылок (необязательный, по умолчанию 10).

### Примеры использования:

```javascript
  <Pagination
    :current_page="1"
    :number_of_pages="25"
    :max_links="5"
    base="/"
  />
```

С поисковыми параметрами:

```javascript
  <Pagination
    :current_page="1"
    :number_of_pages="25"
    :search="{ foo: 1, bar: 2 }"
    base="/"
  />
```
