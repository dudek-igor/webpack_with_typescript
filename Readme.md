# Webpack + TypeScript

- `npm run dev` - Development build with watch flag
- `npm start` - Webpack server on :5000 PORT
- `npm run build` - Production build
  <br/>

### Config:

Added ESLint Prettier Husky and Lind-Staged

### Webpack Config:

- TypeScript - `ts-loader`
- `CleanWebpackPlugin`
- `HtmlWbepackPlugin`
- `url-loader` for svg - limit 8192 bytes
- `file-loader` for png, jpg, jpeg, gif,
  (Url-loader koduje pliki do base64 i włącza je do codu. File-loader ładuje pliki do js-a tworząc oddzielne)
- mini-css-extract-plugin, css-loader , post-css-loader with autoprefixer
- TerserPlugin for minify js in production
- CssMinimizerPlugin for minify css in production

- If you want static files in html add CopyPlugin. \
  Install - `npm install copy-webpack-plugin --save-dev`

```js
const CopyPlugin = require('copy-webpack-plugin');
....
{
plugins: [
 new CopyPlugin({
      patterns: [
        {
          from: 'static/images',
          to: 'static/images',
        },
      ],
    }),
}
...
```

- If you want sass install `sass-loader` and add co webpack.common.js

```js
module: {
  rules: [
    {
      test: /\.(sass|scss)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [['autoprefixer']],
            },
          },
        },
        'sass-loader',
      ],
    },
  ];
}
```

- if you use images add [Image webpack loader](https://www.npmjs.com/package/image-webpack-loader) for compress

### Info - PL

- ts-loader używa tsc - kompilatora TypeScript i opiera się na konfiguracji tsconfig.json.
- w `tsconfig.json` nie można ustawić "module": `"CommonJS"`, w przeciwnym razie webpack nie będzie w stanie "wstrząsnąć Twoim kodem".

### Babel a TypeScript

Podstawowa wtyczka `@babel/plugin-transform-typescript` nie wykonuje żadnego sprawdzenia typu! /
Musimy zadać sobie pytania? \
Czy chcemy by pliki wyjściowe mają być takie same jak wejściowe - używamy tsc. \
Czy potrzebujemy pipeline z wieloma plikami wyjściowymi. Używamy babel do transpilacji i tsc do srpawdzania typów. \
Ograniczenia Babel z TS:

- Wadą korzystania z babel jest to, że podczas przejścia z TS do JS nie pojawia się sprawdzanie typów. Może to oznaczać, że błędy typu, których brakuje w edytorze, mogą przedostać się do kodu produkcyjnego.
- Babel nie może tworzyć plików .d.ts dla twojego TypeScript, co może utrudnić pracę z twoim projektem, jeśli jest to biblioteka.

### Zewnętrzne paczki

Pamiętajmy gdy używamy zewnętrznej biblioteki to żeby doinstlowywać jako `--save-dev` - definicje typów.

### Importowanie np. SVG

By obsłuż tzw non-code assets musimy stowrzyć custom.d.ts z definicją typów. I dodać go do tsconfig.json.

```ts
declare module '*.svg' {
  const content: any;
  export = content;
}
```

```json
{
  "compilerOptions": {
    "typeRoots": ["node_modules/@types", "@types"]
  }
}
```
