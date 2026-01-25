addLayer('ssc', {
  infoboxes: {
    introBox: {
      title: 'Super Softcap',
      body() {
        return 'This layer displays all the Super Softcap in all now.'
      },
    },
    ScBox: {
      title: 'Super Softcap Formulas',
      body() {
        return 'This tab displays all the Softcap Formulas in all now'
      },
    },
  },
  name: 'Super Softcaps',
  startData() {
    return {
      unlocked: true,
      points: n(0),
    }
  },
  symbol: 'Ss',
  color: 'rgb(255, 197, 215)',
  row: 'side',
  tooltip() {
    return 'Super Softcaps'
  },
  resource: 'Super Softcap Points',
  update(diff) {
    player.ssc.points = tmp.ssc.spCal
  },
  spCal(){return n(superSoftcapCal()[2])},
  tabFormat: {
    Softcaps: {
      content: [
        ['infobox', 'introBox'],
        [
          'display-text',
          function () {
            return superSoftcapCal()[0]
          },
        ],
      ],
    },
    'Formulas': {
      content: [
        ['infobox', 'ScBox'],
        [
          'display-text',
          function () {
            return superSoftcapCal()[1]
          },
        ],
      ],
    },
  },
  layerShown() {
    return true
  },
}) //SS

const superSoftcapDatas = [
  {
    unlocked: () => ue('A', 11).gte(10),
    requirement: '10x A1 mult',
    effects: 'A1 mult is overflowed to 0.5',
  },
  {
    unlocked: () => getPointGen().gte(100),
    requirement: '100 points/s',
    effects: 'points generation is overflowed to 0.5',
  },
  {
    unlocked: () => layers.A.antimatterEffect().gte(5),
    requirement: "^5.00 antimatter's effect",
    effects: "antimatter's effect is power-softcapped to 0.5",
  },
  {
    unlocked: () => ue('A', 15).gte(10),
    requirement: '10x A5 mult',
    effects: 'A5 mult is overflowed to 0.75',
  },
  {
    unlocked: () => ue('B', 11).gte(50),
    requirement: '50x B1 mult',
    effects: 'B1 mult is overflowed to 0.5',
  },
  {
    unlocked: () => ue('A', 24).gte(50),
    requirement: '50x A10 mult',
    effects: 'A10 mult is overflowed to 0.75',
  },
  {
    unlocked: () => layers.A.antimatterEffect().gte(12.5),
    requirement: "^12.50 antimatter's effect",
    effects: "antimatter's effect is overflowed to 0.65",
  },
  {
    unlocked: () => ue('C', 11).gte(2000),
    requirement: '2000x C1 mult',
    effects: 'C1 mult is overflowed to 0.75',
  },
  {
    unlocked: () => layers.A.antimatterGain().gte(10),
    requirement: '10 Antimatter/sec',
    effects: 'Antimatter generation is overflowed to 0.5',
  },
  {
    unlocked: () => layers.B.gainMult().gte(1e50),
    requirement: '1e50 B GainMult',
    effects: 'B GainMult is overflowed to 0.5',
  },
  {
    unlocked: () => layers.D.challenges[11].effect().gte(1.5),
    requirement: '1.5 Dc1 Effect',
    effects: 'Dc1 Effect is power-softcapped to 0.1',
  },
  {
    unlocked: () => layers.A.antimatterGain().gte(1e10),
    requirement: '1e10 antimatter generation',
    effects: 'Antimatter generation is overflowed to 0.5',
  },
  {
    unlocked: () => getPointGen().gte(Number.MAX_VALUE),
    requirement: '1.7976e308 points/s',
    effects: 'points generation is overflowed to 0.5',
  },
  {
    unlocked: () => getPointGen().gte("1e500"),
    requirement: '1e500 points/s',
    effects: 'points generation is double-overflowed to 0.75',
  },
  {
    unlocked: () => layers.A.upgrades[21].effect().gte(1.1),
    requirement: '^1.1 Mastered A7 effect',
    effects: 'Mastered A7 effect is power-softcapped to 0.1',
  },
  {
    unlocked: () => layers.A.buyables[111].effect().gte(1.2),
    requirement: '^1.2 Tickspeed effect',
    effects: 'Tickspeed effect is power-softcapped to 0.5',
  },
  {
    unlocked: () => getPointGen().gte("1e600"),
    requirement: '1e600 points/s',
    effects: 'points generation is overflowed to 0.25',
  },
  {
    unlocked: () => layers.A.antimatterGain().gte(1e100),
    requirement: '1e100 antimatter generation',
    effects: 'Antimatter generation is overflowed to 0.5',
  },
  {
    unlocked: () => ue('E', 11).gte("ee6"),
    requirement: '1e1000000x E1 mult',
    effects: 'E1 mult is overflowed to 0.5',
  },
  {
    unlocked: () => ue('E', 12).gte(1e5),
    requirement: '1e5x E2 mult',
    effects: 'E2 mult is overflowed to 0.5',
  },
  {
    unlocked: () => ue('D', 15).gte(1e100),
    requirement: '1e100x D5 mult',
    effects: 'D5 mult is overflowed to 0.5',
  },
  {
    unlocked: () => ue('D', 16).gte(1e25),
    requirement: '1e25x D6 mult',
    effects: 'D6 mult is overflowed to 0.5',
  },
  {
    unlocked: () => ue('A', 35).gte("1e500"),
    requirement: '1e500x A17 mult',
    effects: 'A17 mult is overflowed to 0.5',
  },
  {
    unlocked: () => layers.A.buyables[100].effect().gte("1e10000"),
    requirement: '1e10000x AD mult',
    effects: 'AD mult is overflowed to 0.5',
  },
  {
    unlocked: () => layers.A.buyables[13].effect().gte(4),
    requirement: '^4 Ab3 effect',
    effects: 'Ab3 effect is pow-softcapped to 0.5',
  },
  /*
  {
    unlocked: () => layers.ma.effect().gte(1000),
    requirement: '^1000 Mastered Upgrades effect',
    effects: 'Mastered Upgrades effect is overflowed to 0.5',
  },
  {
    unlocked: () => challengeCompletions('A', 41) >= 12,
    requirement: '12 Ac7 completions',
    effects: 'Ac7 completions is log-softcapped to 100',
  },
  {
    unlocked: () => layers.E.buyables[14].effect().gte(0.042),
    requirement: '+0.042 Eb3.5 effect',
    effects: 'Eb3.5 effect is pow-softcapped to 0.25',
  },
  */
].map((item, index) => ({
  ...item,
  id: index + 1,
}))

function superSoftcapCal() {
  const unlockedData = superSoftcapDatas.filter((item) => item.unlocked())
  const requirements = unlockedData.map((item) => `SSc${item.id}: ${item.requirement}`)
  const effects = unlockedData.map((item) => `SSc${item.id}: ${item.effects}`)

  return [requirements.join('<br>'), effects.join('<br>'),requirements.length]
}
