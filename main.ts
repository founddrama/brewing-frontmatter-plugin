import { Plugin, MarkdownPostProcessorContext } from 'obsidian';

const toFixed = (source: string, significantDigits: number): string => (
  Number.parseFloat(source).toFixed(significantDigits)
);

type BjcpStat = {
  low?: string;
  high?: string;
  flexible?: boolean;
};
const renderStatRange = (
  stat: BjcpStat,
  significantDigits: number = 0,
  suffix: string = ''
): string => {
  if (stat.flexible === true) {
    return '<em>Varies</em>';
  } else {
    return `${toFixed(stat.low, significantDigits)}-${toFixed(stat.high, significantDigits)}${suffix}`;
  }
};

export default class BjcpPlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
      console.log('el => ', el);
      console.log('ctx => ', ctx);
      const { frontmatter } = ctx;

      if (!frontmatter.style || !frontmatter.style_name || !frontmatter.stats) {
        return;
      }

      let frontMatterContainer = el.querySelector('.frontmatter-container');
      if (frontMatterContainer !== null) {
        const { stats } = frontmatter;
        const isBeer = frontmatter.type === 'beer';
        const cssClass = isBeer ? 'bjcp-stats-beer-cell' : 'bjcp-stats-cell';
        
        let frontMatterFancy = document.createElement('div');

        const beerOnlyCells = `
<td class="${cssClass}">
  ${renderStatRange(stats.ibu)}
  <br/><small>IBU</small>
</td>
<td class="${cssClass}">
  ${renderStatRange(stats.srm)}
  <br/><small>SRM</small>
</td>
`;

        frontMatterFancy.innerHTML = `
<h1>${frontmatter.style}. ${frontmatter.style_name}</h1>
<table class="bjcp-stats-table">
  <tr>
    <td colspan="5">
      Vital Statistics
    </td>
  </tr>
  <tr>
    ${isBeer ? beerOnlyCells : ''}
    <td class="${cssClass}">
      ${renderStatRange(stats.og, 3)}
      <br/><small>O.G.</small>
    </td>
    <td class="${cssClass}">
      ${renderStatRange(stats.fg, 3)}
      <br/><small>F.G.</small>
    </td>
    <td class="${cssClass}">
      ${renderStatRange(stats.abv, 1, '%')}
      <br/><small>ABV</small>
    </td>
  </tr>
</table>
<p>Examples: ${frontmatter.examples.join(', ')}</p>
        `;

        el.appendChild(frontMatterFancy);
      }
    });
  }
}
