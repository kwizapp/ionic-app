# kwiz Ionic

## How to Run

1. Install the Ionic CLI

    ```bash
    npm install -g @ionic/cli
    ```

2. Build tailwind styles

    ```bash
    # once
    npm run build:style

    # watch mode
    npm run dev:style
    ```

3. Start Poster API (see corresponding README):

    ```bash
    npm run dev
    ```

4. Start Metadata API (see corresponding README):

    ```bash
    npm run dev
    ```

5. Start Nest API (see corresponding README):

    ```bash
    npm run dev
    ```

6. Start developing with

    ```bash
    ionic serve
    ```

This will open up the app in your browser on port 8100. For a mobile preview, use the browser's built-in features for that.

## Code Quality

We use `eslint` and `prettier` to define consistent code formatting and code quality.

To ensure this consistency, we have a central [repository](https://github.com/kwizapp/kwiz-dotfiles) that contains the configuration for the whole organization.

See these [packages](https://github.com/kwizapp/kwiz-dotfiles/packages) for more information.
