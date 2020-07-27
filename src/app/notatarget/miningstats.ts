export interface MiningStats {

  'hashrate': number;
  'luck': number;
  'nodes': [
    {
      'avgBlockTime': string,
      'blockReward': string,
      'difficulty': string,
      'networkhashps': string
    }
    ];
  'stats': any;
  'workersTotal': number;
}

