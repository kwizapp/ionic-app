module.exports = {
  title: 'Kwizzapp Components',
  styleguideDir: 'docs',
  sections: [
    {
      name: 'Pages',
      content: 'docs/pages.md',
      components: 'src/pages/**/*.{js,jsx,ts,tsx}',
      exampleMode: 'hide', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
    },
    {
      name: 'UI Components',
      content: 'docs/components.md',
      components: 'src/components/**/*.{js,jsx,ts,tsx}',
      exampleMode: 'hide', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
    },
  ],
}
