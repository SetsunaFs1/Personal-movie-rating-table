# Таблица личного рейтинга фильмов

### Цель проекта: 
создание небольшого приложения на React + Typescript - личный рейтинг фильмов.

### Используемые стеки: 
React, TS, Vite, MaterialUI, json-server.

### В рамках проекта выполнены следующие задачи:

- Таблица с пятью полями,
- Иммитация сервера с помощью данной библиотеки https://github.com/typicode/json-server,
- Форма  создания новой записи в таблице,
- Форма валидирует все поля,
- Форма отправляется по API и запись добавляется в таблицу со своевременной отрисовкой компонента таблицы.

Из-за заданных требований к заданию стейт-менеджер избыточен.

файл db.json находится в корне проекта.

### Что планирую доработать:

- Улучшить валидацию полей, чтобы поля проверялись в момент ввода текста; подключить библиотеку для валидации,
- Добавить фильтрацию столбцов,
- Добавить управление по кнопкам редактировать/удалить записи,
- Добавить цвет оценки в зависимости от цифры.

### Результат: 
Реализована таблица и отображение данных с сервера с возможностью добавлени новой записи.
