import React from 'react';
import {
  BjcpStat,
  BjcpStyleFrontMatterProps,
} from './types';

class BjcpStyleFrontMatter extends React.PureComponent<BjcpStyleFrontMatterProps> {
  toFixed(source: number, significantDigits: number): string {
    return Number.parseFloat(`${source}`).toFixed(significantDigits);
  };

  renderStatRange(
    stat: BjcpStat,
    significantDigits: number = 0,
    suffix: string = ''
  ): JSX.Element {
    if (stat.flexible === true) {
      return <em>Varies</em>;
    } else {
      return (
        <>
          {this.toFixed(stat.low, significantDigits)}-{this.toFixed(stat.high, significantDigits)}{suffix}
        </>
      );
    }
  };

  renderIbuCell(ibu: BjcpStat, cssClass: string): JSX.Element {
    return (
      <td className={cssClass}>
        {this.renderStatRange(ibu)}
        <br/><span className="bjcp-stats-label">IBU</span>
      </td>
    );
  }

  renderSrmCell(srm: BjcpStat, cssClass: string): JSX.Element {
    return (
      <td className={cssClass}>
        {this.renderStatRange(srm)}
        <br/><span className="bjcp-stats-label">SRM</span>
      </td>
    );
  }

  renderStatsBlock(): JSX.Element {
    const { type, stats } = this.props;
    if (!stats) return;

    const isBeer = type === 'beer';
    const cssClass = isBeer ? 'bjcp-stats-beer-cell' : 'bjcp-stats-cell';
    return (
      <table className="bjcp-stats-table">
        <tbody>
          <tr>
            <td colSpan={isBeer ? 5 : 3}>
              <strong>Vital Statistics</strong>
            </td>
          </tr>
          <tr>
            {isBeer ? this.renderIbuCell(stats.ibu, cssClass) : null}
            {isBeer ? this.renderSrmCell(stats.ibu, cssClass) : null}
            <td className={cssClass}>
              {this.renderStatRange(stats.og, 3)}
              <br/><span className="bjcp-stats-label">O.G.</span>
            </td>
            <td className={cssClass}>
              {this.renderStatRange(stats.fg, 3)}
              <br/><span className="bjcp-stats-label">F.G.</span>
            </td>
            <td className={cssClass}>
              {this.renderStatRange(stats.abv, 1, '%')}
              <br/><span className="bjcp-stats-label">ABV</span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  renderExamples(): JSX.Element {
    const { examples } = this.props;
    if (!examples) return;

    if (Array.isArray(examples)) {
      return <p>Examples: {examples.join(', ')}</p>;
    } else {
      return (
        <p>Examples: {
          Object.entries(examples).map(([country, examplesFrom], i, arr) => {
            return (
              <>
                [{country}] {examplesFrom.join(', ')}
                {i < arr.length - 1 ? '; ' : ''}
              </>
            );
          })
        }</p>
      );
    }
  }

  render(): JSX.Element {
    const {
      style,
      styleName,
    } = this.props;

    return (
      <div className="bjcp-style-frontmatter">
        <h1>{style}. {styleName}</h1>
        {this.renderStatsBlock()}
        {this.renderExamples()}
      </div>
    );
  }
}

export default BjcpStyleFrontMatter;
