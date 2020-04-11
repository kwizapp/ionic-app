# kwiz Ionic

## How to Run

Install the Ionic CLI

```bash
npm install -g @ionic/cli
```

Build tailwind styles

```bash
# once
npm run build:style

# watch mode
npm run dev:style
```

Start Nest API (see README to create `.env`)

Start developing with

```bash
ionic serve
```

This will open up the app in your browser on port 8100. For a mobile preview, use the browser's built-in features for that.

## Code Quality

We use `eslint` and `prettier` to define consistent code formatting and code quality.

To ensure this consistency, we have a central [repository](https://github.com/kwizapp/kwiz-dotfiles) that contains the configuration for the whole organization.

See these [packages](https://github.com/kwizapp/kwiz-dotfiles/packages) for more information.
