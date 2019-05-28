# vue-front-end

### What is included in the box?

- Typescript
- PWA
- Themes
- I18n Language with lazy load
- Stub store for development
- Firebase Authentication Email and Phone
- Firestore User Profile management
- Firestore Item CRUD

### Vuex Store Convention

We follow party this document [Vue Storefront Vuex Convention](https://docs.vuestorefront.io/guide/vuex/vuex-conventions.html) with minor adjustment of State names. Instead of using underscore separation we use `TitleCase`.


### Naming Rules

#### Interfaces

- Data models interface should begin with `I`. Example: IUser, ITheme, ILanguage.
- System interface for Vuex should be in `TitleCase`. Example: RootState, StoreExtra.

#### File naming

- Models (.models): contains files with interfaces, constants that are used by the app.
- Stores (.store): contains files of the stores.
- Routes (.routes): contains files of the views.

#### Import rules
Ordering and rules as follow:

- Library imports
- Dependencies import, should be from root (by alias @)
- Internal or children, should be relative


## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Run your unit tests

```
npm run test:unit
```
