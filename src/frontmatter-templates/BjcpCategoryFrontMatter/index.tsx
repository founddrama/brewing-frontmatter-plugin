import React from 'react';
import { BjcpCategoryFrontMatterProps } from './types';

class BjcpCategoryFrontMatter extends React.PureComponent<BjcpCategoryFrontMatterProps> {
  render(): JSX.Element {
    const {
      category,
      categoryName,
    } = this.props;

    return (
      <div className="bjcp-style-frontmatter">
        <h1>{category}. {categoryName}</h1>
      </div>
    );
  }
}

export default BjcpCategoryFrontMatter;
