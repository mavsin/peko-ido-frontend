export interface ISocialLink {
  id: number;
  icon: string;
  href: string;
}

export interface IReturnValueOfStartTime {
  data?: bigint;
  [key: string]: object | bigint | undefined;
}
