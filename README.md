# Reviews App
[посмотреть проект](https://itransition-final-project-front.vercel.app)

Приложение позволяет создавать обзоры на книги/фильмы/игры/муз.произведения и так далее.

- Неаутентифицированным пользователи доступен только режим read-only.
- Аутентифицированные пользователи имеют доступ ко всему, кроме админки.
- Поддержка аутентификации через социальные сети (На данный момент google/github/facebook)
- Администратор видит каждую страницу пользователя и каждый "обзор" как ее создатель 
 (например, может отредактировать или создать от имени пользователя с его страницы новый "обзор")
- Администратор (test@mail.com/qwerqwer) может генерировать рандомных пользователей (fakerjs)
- На каждой странице доступен полнотекстовый поиск по сайту (результаты поиска - всегда обозоры)
- У каждого пользователя есть его личная страница, на которой он видит список своих обзоров 
 (таблица с фильтраций и сортировками, возможность создать/удалить/редактировать обзор/открыть в режиме просмотра).
- Каждый обзор состоит из: названия обзора, названия произведения, тэгов (вводится несколько тэгов,
 необходимо автодополнение - когда пользователь начинает вводить тэг, выпадает список с вариантами слов,
 которые уже вводились ранее на сайте), текста обзора (с поддержкой форматирования markdown),
 опциональное изображение-иллюстрация (хранение в облаке) и оценки от автора по 10-б. шкале.
- На главной странице отображаются: последние добавленные обзоры, обзоры с самыми большими оценками, облако тэгов.
- Под обзором в режиме просмотра (или другими пользователями) в конце отображаются комментарии.
- Присутвует возможность смены темы, 

#### используемые технологии:
- [React js](https://ru.reactjs.org)
- [Typescript](https://www.typescriptlang.org)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [MUI](https://mui.com)
- [react-select](https://react-select.com/home)
- [react-hook-form](https://react-hook-form.com)
- [socket.io](https://socket.io)
- [axios](https://axios-http.com/ru/)
- [react-intl](https://formatjs.io/docs/react-intl/)
- [@uiw/react-md-editor](https://uiwjs.github.io/react-md-editor/)


#### используемые технологии на [бэкенд](https://github.com/OlegPolishchuk/itransition-final-project_back):

- [nodejs](https://nodejs.org/en/)
- [express](https://expressjs.com/ru/)
- [mongoose](https://mongoosejs.com)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)


#### для удобства написания кода использовались:
- [prettier](https://prettier.io)
- [esLint](https://eslint.org)

Что бы запустить приложение, нужно клонировать [репозиторий бэкенд](https://github.com/OlegPolishchuk/itransition-final-project_back) 
и запустить его (yarn start), затем пропишите:

### `yarn start`

Запускает приложение в режиме разработки
Откройте в браузере [http://localhost:3000](http://localhost:3000).

Страница перезагрузится, если вы внесете изменения.\
Вы также увидите любые ошибки lint в консоли

