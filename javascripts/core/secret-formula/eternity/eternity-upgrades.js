GameDatabase.eternity.upgrades = {
  idMultEP: {
    id: 1,
    cost: 5,
    description: "Infinity Dimensions multiplier based on unspent EP (x+1)",
    effect: () => player.eternityPoints.plus(1),
    formatEffect: value => `${shortenMoney(value)}x`
  },
  idMultEternities: {
    id: 2,
    cost: 10,
    description: "Infinity Dimension multiplier based on Eternities ((x/200)^log4(2x))",
    effect: function() {
      const log4 = Math.log4;
      const eternities = Math.min(player.eternities, 100000);
      const base = eternities / 200 + 1;
      const pow = Math.log(eternities * 2 + 1) / log4;
      const mult1 = new Decimal((player.eternities - 100000) / 200 + 1);
      const mult2 = Math.log((player.eternities - 100000) * 2 + 1) / log4;
      const totalMult = mult1.times(mult2).clampMin(1);
      return Decimal.pow(base, pow).times(totalMult);
    },
    formatEffect: value => `${shortenMoney(value)}x`
  },
  idMultICRecords: {
    id: 3,
    description: "Infinity Dimensions multiplier based on sum of Infinity Challenge times",
    effect: function() {
      const sumOfRecords = Math.max(infchallengeTimes, Effects.min(750, Achievement(112)));
      return Decimal.pow(2, 30000 / sumOfRecords);
    },
    formatEffect: value => `${shortenMoney(value)}x`
  },
  tdMultAchs: {
    id: 4,
    description: "Your achievement bonus affects Time Dimensions",
    effect: () => player.achPow,
    formatEffect: value => `${shortenMoney(value)}x`
  },
  tdMultTheorems: {
    id: 5,
    description: "Time Dimensions are multiplied by your unspent Time Theorems",
    effect: () => Math.max(player.timestudy.theorem, 1),
    formatEffect: value => `${shortenMoney(value)}x`
  },
  tdMultRealTime: {
    id: 6,
    description: "Time Dimensions are multiplied by days played",
    effect: () => Time.totalTimePlayed.totalDays,
    formatEffect: value => `${shortenMoney(value)}x`
  }
};