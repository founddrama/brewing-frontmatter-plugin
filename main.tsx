import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom';
import BjcpStyleFrontMatter from './src/frontmatter-templates/BjcpStyleFrontMatter';
import ArticleFrontMatter from 'src/frontmatter-templates/ArticleFrontMatter';

export default class BjcpPlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
      console.log('MarkdownPostProcessorContext => ', ctx);
      const { frontmatter, sourcePath } = ctx;

      if (ctx.getSectionInfo(el).lineStart === 0 && !!frontmatter) {
        let componentToRender;
        if (/^BJCP\/(?:Beer|Mead|Cider) Styles/.test(sourcePath)) {
          componentToRender = this.renderBjcpStyleFrontMatter(frontmatter);
        }

        if (/^Articles\//.test(sourcePath)) {
        componentToRender = this.renderArticleFrontMatter(frontmatter);
        }

        const frontMatterFancy = document.createElement('div');
        el.appendChild(frontMatterFancy);
        ReactDOM.render(
          <React.StrictMode>
            {componentToRender}
          </React.StrictMode>,
          frontMatterFancy
        );
      }
    });
  }

  renderBjcpStyleFrontMatter(frontmatter: any): JSX.Element {
    return (
      <BjcpStyleFrontMatter
        type={frontmatter.type}
        style={frontmatter.style}
        styleName={frontmatter.style_name}
        stats={frontmatter.stats}
        examples={frontmatter.examples}
      />
    );
  }

  renderArticleFrontMatter(frontmatter: any) {
    return (
      <ArticleFrontMatter
        title={frontmatter.title}
        author={frontmatter.author}
        publication={frontmatter.publication}
        source={frontmatter.source}
        issue={frontmatter.issue}
      />
    );
  }
}
