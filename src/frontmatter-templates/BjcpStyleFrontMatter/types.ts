export type BjcpStyleType = 'beer' | 'cider' | 'mead';

export type BjcpStat = {
  low?: number;
  high?: number;
  flexible?: boolean;
};

export type BjcpStyleStats = {
  ibu?: BjcpStat;
  srm?: BjcpStat;
  og: BjcpStat;
  fg: BjcpStat;
  abv: BjcpStat;
};

export type BjcpStyleFrontMatterProps = {
  type: BjcpStyleType;
  style: string;
  styleName: string;
  stats: BjcpStyleStats;
  examples: string[] | Record<string, string[]>;
};
