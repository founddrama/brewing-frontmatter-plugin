import { Plugin, MarkdownPostProcessorContext } from 'obsidian';
import React from 'react';
import ReactDOM from 'react-dom';
import BjcpCategoryFrontMatter from './src/frontmatter-templates/BjcpCategoryFrontMatter';
import BjcpStyleFrontMatter from './src/frontmatter-templates/BjcpStyleFrontMatter';
import ArticleFrontMatter from 'src/frontmatter-templates/ArticleFrontMatter';

export default class BjcpPlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
      const { frontmatter, sourcePath } = ctx;

      if (ctx.getSectionInfo(el).lineStart === 0 && !!frontmatter) {
        let componentToRender;
        if (/^BJCP\/(?:Beer|Mead|Cider) Styles/.test(sourcePath)) {
          if (/\d{1,2}[A-Z]\d?\. [\w-\s]+\.md$/.test(sourcePath)) {
            componentToRender = this.renderBjcpStyleFrontMatter(frontmatter);
          } else if (/\d{1,2}\. [\w-\s]+\.md$/.test(sourcePath)) {
            componentToRender = this.renderBjcpCategoryFrontMatter(frontmatter);
          }
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

  renderBjcpCategoryFrontMatter(frontmatter: any): JSX.Element {
    return (
      <BjcpCategoryFrontMatter
        type={frontmatter.type}
        category={frontmatter.category}
        categoryName={frontmatter.category_name}
        styles={frontmatter.styles}
      />
    );
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
    const { source, source_url } = frontmatter;
    return (
      <ArticleFrontMatter
        title={frontmatter.title}
        author={frontmatter.author}
        publication={frontmatter.publication}
        source={source || source_url}
        issue={frontmatter.issue}
      />
    );
  }
}
