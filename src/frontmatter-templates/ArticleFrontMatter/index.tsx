import React from 'react';
import { ArticleFrontMatterProps } from './types';

class ArticleFrontMatter extends React.PureComponent<ArticleFrontMatterProps> {
  renderPublication() {
    const { publication, issue } = this.props;
    return (
      <><em>{publication}</em>{issue ? ` ${issue}` : ''}</>
    );
  }

  renderSource() {
    const { source } = this.props;
    if (source) {
      return (
        <>
          in <a href={source}>{this.renderPublication()}</a>
        </>
      );
    } else {
      return (
        <>
          in {this.renderPublication()}
        </>
      );
    }
  }

  render(): JSX.Element {
    const { title, author } = this.props;
    return (
      <div className="brewing-article-frontmatter">
        <h1>{title}</h1>
        <div>
          {author && `by ${author} `}
          {this.renderSource()}
        </div>
      </div>
    );
  }
}

export default ArticleFrontMatter;
