export interface MiningStats {

  'hashrate': number;
  'luck': number;
  'nodes': [
    {
      'avgBlockTime': number,
      'blockReward': number,
      'difficulty': number,
      'networkhashps': number
    }
    ];
  'stats': any;
  'workersTotal': number;
}

