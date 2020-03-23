# kwiz Ionic

## How to Run

Install the Ionic CLI

```bash
npm install -g @ionic/cli
```

Start developing with

```bash
ionic serve
```

This will open up the app in your browser on port 8100. For a mobile preview, use the browser's built-in features for that.

## Code Quality

We use `eslint` and `prettier` to define consistent code formatting and code quality.

To ensure this consistency, we have a central [repository](https://github.com/kwizapp/eslint-config) that contains the configuration for the whole organization.

**eslint**
we extend the the eslint config inside `.eslintrc.js`:

```javascript
module.exports = {
  extends: ['@kwizapp/eslint-config/react'],
}
```

**prettier**
we add the `prettier.config` inside `.prettierrc.js`:

```javascript
module.exports = {
  ...require('@kwizapp/eslint-config/prettier.config'),
}
```
