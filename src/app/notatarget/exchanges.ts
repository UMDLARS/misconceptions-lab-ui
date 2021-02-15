// MultiExchanges was used for an API that we probably won't end up using
export interface MultiExchanges {
  'data': {
    'currency': 'BTC',
    'rates': {
      'AED': string,
      'AFN': string,
      'ALL': string,
      'BTC': string,
      'ETH': string,
      'ETC': string
    }
  };
}
export interface Exchange {
  'USD': number;
}
