## Brewing Frontmatter Plugin

This is a plugin for my beer/mead/cider brewing notes as kept in
[Obsidian](https://obsidian.md). The general idea is to use the structured data
of the Markdown frontmatter (i.e., the [YAML](https://yaml.org/)) to render the
"top-most part" of certain pages in the compiled notes.

**In other words: part of the _rendered page_ should come from the _data_ and
not just the notes.**

### How do I do a dev?

- Clone the repo to a local development folder. For convenience, you can place
  the folder in the `.obsidian/plugins/your-plugin-name` folder for the relevant
  notes vault.
- In the cloned repo, run `npm install`.
- Run `npm run dev` to compile your plugin from `main.tsx` to `main.js`.
- Make changes to `main.tsx` (or the modules it imports). Those changes should
  be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under
  your repo folder.

### What's the general architecture of this thing?

A little bit ad-hoc but...

- **Fact:** Certain types of notes (e.g., BJCP styles, brewing-related
  articles, homebrew recipes) are going to have predictable frontmatter
- **Assertion:** We want to use that frontmatter to generate part of the
  rendered viewable content for that Markdown document.
- **Assumption:** By placing certain types of notes into specific paths within
  the Obsidian Vault, we can use the `sourcePath` to tell use what _type of note_
  it is and therefore _which template to apply_ so as to consume the correct
  key/value pairs from the front matter.
