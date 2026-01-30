addLayer('sc', {
  infoboxes: {
    introBox: {
      title: 'Softcaps',
      body() {
        return 'This layer displays all the Softcaps in all now, it really cost me a lot of time!!!'
      },
    },
    ScBox: {
      title: 'Softcap Formulas',
      body() {
        return "This tab displays all the Softcap Formulas in all now, the formula will be displayed like 'a,b', a means when the softcap starts at, and b means the strength of the softcap. For example, '10,0.5' means the resource beyond 10 is raised to 0.5 power. And '1e100,exp0.8' means the resource's exponent beyond 100 is raised to 0.8 power, in this way, 1e300 will be 2.06e169"
      },
    },
  },
  name: 'Softcaps',
  startData() {
    return {
      unlocked: true,
      points: n(0),
    }
  },
  symbol: 'S',
  color: '#ffffff',
  row: 'side',
  tooltip() {
    return 'Softcaps'
  },
  resource: 'Softcap Points',
  update(diff) {
    player.sc.points = tmp.sc.spCal
  },
  tabFormat: {
    Softcaps: {
      content: [
        ['infobox', 'introBox'],
        [
          'display-text',
          function () {
            return softcapCal()[1]
          },
        ],
      ],
    },
    'Softcap Formulas': {
      content: [
        ['infobox', 'ScBox'],
        [
          'display-text',
          function () {
            return softcapCal()[2]
          },
        ],
      ],
    },
    Upgrades: {
      content: [
        [
          'display-text',
          function () {
            return 'You have ' + format(player.softcap) + ' Softcaps.'
          },
        ],
        [
          'display-text',
          function () {
            return 'You have ' + format(player.sc.points) + ' Softcap Points'
          },
        ],
        [
          'display-text',
          function () {
            return 'You have ' + player.sc.points + ' Softcap Points exactly'
          },
        ],
        'upgrades',
      ],
      unlocked() {
        return hu('A', 35) || hm('F', 0)
      },
    },
  },
  spCal() {
    let sp = player.softcap
    if (hu('D', 16)) sp = sp.mul(ue('D', 16))
    if (hu('D', 24)) sp = sp.mul(ue('D', 24))
    if (hu('C', 16)) sp = sp.pow(2)
    if (hu('C', 26)) sp = sp.pow(3)
    if (hc('C', 11)) sp = sp.pow(1.1)
    if (sp.gte(100)) sp = sp.div(1e2).pow(0.2).mul(1e2) //Sc26
    if (sp.gte(1000)) sp = sp.div(1e3).pow(0.04).mul(1e3) //Sc38
    if (sp.gte(1e4)) sp = sp.div(1e4).pow(0.1).mul(1e4) //Sc95
    if (sp.gte(5e4)) sp = sp.div(5e4).pow(0.1).mul(5e4) //Sc221
    return sp.overflow(100000, 0.1)
  },
  upgrades: {
    11: {
      title: 'ScU1',
      description: function () {
        return 'Softcap Points boosts points.<br>Effect: ' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = mu("sc", 11) ? player.sc.points.max(1).pow(3) : player.sc.points.max(1)
        if (eff.gte(10)) eff = eff.div(10).pow(0.6).mul(10) //Sc11
        return eff
      },
      cost: n(10),
      canMaster: true,
      masterCost: n(16960),
      masteredDesc: function () {
        layers.E.buyables[24].unlocked()
        return `Softcap Points boosts points and ${layers.E.buyables[24].unlocked() || player.F.layerShown ? 'Eb12' : randomString(4)} base.<br>Effect: ` + format(this.effect()) + 'x'
      },
    },
    12: {
      title: 'ScU2',
      description: function () {
        return 'Softcap Points boosts A and B.<br>Effect: ' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.5)
        if (eff.gte(4)) eff = eff.div(4).pow(0.7).mul(4) //Sc17
        return eff
      },
      cost: n(16),
      unlocked() {
        return hu('sc', 11)
      },
    },
    13: {
      title: 'ScU3',
      description: function () {
        return 'Softcap Points boosts A10<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.3).log(2).max(1)
        return eff
      },
      cost: n(21),
      unlocked() {
        return hu('sc', 12)
      },
    },
    14: {
      title: 'ScU4',
      description: function () {
        return 'Softcap Points boosts A5<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.5).log(4).max(1)
        return eff
      },
      cost: n(25),
      unlocked() {
        return hu('sc', 13)
      },
    },
    15: {
      title: 'ScU5',
      description: function () {
        return 'Softcap Points boosts C3<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.8).log(8).max(1)
        return eff
      },
      cost: n(155),
      unlocked() {
        return hu('sc', 14)
      },
    },
    16: {
      title: 'ScU6',
      description: function () {
        return 'Softcap Points boosts C.<br>Effect: ' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.5)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc39
        return eff
      },
      cost: n(1048),
      unlocked() {
        return hu('sc', 15)
      },
    },
    21: {
      title: 'ScU7',
      description: function () {
        return 'Softcap Points boosts D.<br>Effect: ' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.33)
        if (eff.gte(10)) eff = eff.div(10).pow(0.5).mul(10) //Sc46
        return eff
      },
      cost: n(1141),
      unlocked() {
        return hu('D', 16) || hm('F', 0)
      },
    },
    22: {
      title: 'ScU8',
      description: function () {
        return 'Softcap Points boosts D1<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.7).log(7).max(1)
        return eff
      },
      cost: n(1160),
      unlocked() {
        return hu('sc', 21)
      },
    },
    23: {
      title: 'ScU9',
      description: function () {
        return 'Softcap Points boosts D11<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.6).log(6).max(1)
        return eff
      },
      tooltip: "Don't worry, it's not too powerful",
      cost: n(1818),
      unlocked() {
        return hu('sc', 22)
      },
    },
    24: {
      title: 'ScU10',
      description: function () {
        return 'Softcap Points boosts D18<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.4).log(10).max(1)
        if (mu("C", 16)) eff = eff.pow(2)
        return eff
      },
      cost: n(3030),
      unlocked() {
        return hu('sc', 23)
      },
    },
    25: {
      title: 'ScU11',
      description: function () {
        return 'Softcap Points boosts antimatter generation.<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.1).log(2).max(1)
        return eff
      },
      cost: n(4747),
      unlocked() {
        return hu('sc', 24)
      },
    },
    26: {
      title: 'ScU12',
      description: function () {
        return 'Softcap Points boosts Ab2 base<br>Effect: +' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(1).pow(0.3).log(9).sub(1).max(0)
        return eff
      },
      cost: n(6000),
      unlocked() {
        return hu('sc', 25)
      },
    },
    31: {
      title: 'ScU13',
      description: function () {
        return 'Softcap Points boosts A1.<br>Effect: ^' + format(this.effect())
      },
      effect() {
        let eff = player.sc.points.max(10000).log(10).pow(0.2).add(1).max(1)
        return eff
      },
      cost: n(10000),
      unlocked() {
        return hu('sc', 26)
      },
    },
    32: {
      title: 'ScU14',
      description: function () {
        return 'Softcap Points boosts E.<br>Effect: ' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = player.sc.points.max(10).log(10).pow(2)
        if (eff.gte(2)) eff = eff.div(2).pow(0.5).mul(2) //Sc129
        if (eff.gte(5)) eff = eff.div(5).pow(0.5).mul(5) //Sc130
        return eff
      },
      cost: n(10725),
      unlocked() {
        return hu('E', 43) || hm('F', 0)
      },
    },
    33: {
      title: 'ScU15',
      description: function () {
        return 'Softcap Points boosts Tickspeed base.<br>Effect: ' + format(this.effect()) + 'x'
      },
      effect() {
        let eff = player.sc.points.max(10).log(10).pow(0.2)
        return eff
      },
      cost: n(19050),
      unlocked() {
        return hu('sc', 32)
      },
    },
    34: {
      title: 'ScU16',
      description: function () {
        return 'Softcap Points boosts Em.<br>Effect: ^' + format(this.effect()) 
      },
      effect() {
        let eff = player.sc.points.max(10).log(10).pow(0.1).mul(1.25)
        return eff
      },
      cost: n(19915),
      unlocked() {
        return hu('sc', 32)
      },
    },
  },
}) //S

function softcapCal() {
  //The most important function???
  let sc = ''
  scf = '' //Softcap and Softcap Formula
  if (uesc('A', 11, n(2))) {
    sc += "Sc1: Reduce A1's Effect<br>"
    scf += 'Sc1: 2,0.5<br>'
  }
  if (uesc('A', 15, n(2))) {
    sc += "Sc2: Reduce A5's Effect<br>"
    scf += 'Sc2: 2,0.5<br>'
  }
  if (tmp.A.gainMult.gte(2)) {
    sc += "Sc3: Reduce A's Gainmult<br>"
    scf += 'Sc3: 2,0.5<br>'
  }
  if (uesc('A', 11, n(10))) {
    sc += "Sc4: Reduce A1's Effect<br>"
    scf += 'Sc4: 10,0.5<br>'
  }
  if (uesc('A', 24, n(2))) {
    sc += "Sc5: Reduce A10's Effect<br>"
    scf += 'Sc5: 2,0.5<br>'
  }
  if (uesc('A', 24, n(5))) {
    sc += "Sc6: Reduce A10's Effect<br>"
    scf += 'Sc6: 5,0.6<br>'
  }
  if (uesc('A', 24, n(10))) {
    sc += "Sc7: Reduce A10's Effect<br>"
    scf += 'Sc7: 10,0.7<br>'
  }
  if (player.points.gte(1e4)) {
    sc += 'Sc8: Reduce Points Gain<br>'
    scf += 'Sc8: 1e4,0.5<br>'
  }
  if (uesc('A', 35, n(5))) {
    sc += "Sc9: Reduce A17's Effect<br>"
    scf += 'Sc9: 5,0.5<br>'
  }
  if (player.points.gte(1e6)) {
    sc += 'Sc10: Reduce Points Gain<br>'
    scf += 'Sc10: 1e6,0.6<br>'
  }
  if (uesc('sc', 11, n(10))) {
    sc += "Sc11: Reduce ScU1's Effect<br>"
    scf += 'Sc11: 10,0.6<br>'
  }
  if (uesc('B', 11, n(5))) {
    sc += "Sc12: Reduce B1's Effect<br>"
    scf += 'Sc12: 5,0.5<br>'
  }
  if (uesc('B', 16, n(2.5))) {
    sc += "Sc13: Reduce B6's Effect<br>"
    scf += 'Sc13: 2.5,0.5<br>'
  }
  if (uesc('B', 21, n(4))) {
    sc += "Sc14: Reduce B7's Effect<br>"
    scf += 'Sc14: 4,0.5<br>'
  }
  if (tmp.B.gainMult.gte(10)) {
    sc += "Sc15: Reduce B's Gainmult<br>"
    scf += 'Sc15: 10,0.5<br>'
  }
  if (uesc('B', 11, n(100))) {
    sc += "Sc16: Reduce B1's Effect<br>"
    scf += 'Sc16: 100,0.5<br>'
  }
  if (uesc('sc', 12, n(4))) {
    sc += "Sc17: Reduce ScU2's Effect<br>"
    scf += 'Sc17: 4,0.7<br>'
  }
  if (uesc('B', 21, n(25))) {
    sc += "Sc18: Reduce B7's Effect<br>"
    scf += 'Sc18: 25,0.2<br>'
  }
  if (uesc('A', 15, n(100))) {
    sc += "Sc19: Reduce A5's Effect<br>"
    scf += 'Sc19: 100,0.5<br>'
  }
  if (player.points.gte(1e8)) {
    sc += 'Sc20: Reduce Points Gain<br>'
    scf += 'Sc20: 1e8,0.7<br>'
  }
  if (uesc('A', 24, n(100))) {
    sc += "Sc21: Reduce A10's Effect<br>"
    scf += 'Sc21: 100,0.8<br>'
  }
  if (uesc('B', 26, n(5))) {
    sc += "Sc22: Reduce B12's Effect<br>"
    scf += 'Sc22: 5,0.5<br>'
  }
  if (player.points.gte(1e10)) {
    sc += 'Sc23: Reduce Points Gain<br>'
    scf += 'Sc23: 1e10,0.8<br>'
  }
  if (uesc('C', 13, n(1e5))) {
    sc += "Sc24: Reduce C3's Effect<br>"
    scf += 'Sc24:1e5,0.25<br>'
  }
  if (uesc('B', 21, n(1e6))) {
    sc += "Sc25: Reduce B7's Effect<br>"
    scf += 'Sc25: 1e6,0.1<br>'
  }
  if (player.sc.points.gte(100)) {
    sc += 'Sc26: Reduce Softcap Points Gain<br>'
    scf += 'Sc26: 100,0.2<br>'
  }
  if (uesc('A', 35, n(1e10))) {
    sc += "Sc27: Reduce A17's Effect<br>"
    scf += 'Sc27: 1e10,0.1<br>'
  }
  if (tmp.C.gainMult.gte(10)) {
    sc += "Sc28: Reduce C's Gainmult<br>"
    scf += 'Sc28: 10,0.5<br>'
  }
  if (uesc('B', 16, n(1e4))) {
    sc += "Sc29: Reduce B6's Effect<br>"
    scf += 'Sc29: 1e6,0.1<br>'
  }
  if (uesc('C', 13, n(1e10))) {
    sc += "Sc30: Reduce C3's Effect<br>"
    scf += 'Sc30: 1e10,0.25<br>'
  }
  if (uesc('A', 11, n(1e10))) {
    sc += "Sc31: Reduce A1's Effect<br>"
    scf += 'Sc31: 1e10,0.7<br>'
  }
  if (uesc('A', 11, n(1e12))) {
    sc += "Sc32: Reduce A1's Effect<br>"
    scf += 'Sc32: 1e12,0.8<br>'
  }
  if (uesc('A', 15, n(1e6))) {
    sc += "Sc33: Reduce A5's Effect<br>"
    scf += 'Sc33: 1e6,0.5<br>'
  }
  if (uesc('C', 11, n(1e5))) {
    sc += "Sc34: Reduce C1's Effect<br>"
    scf += 'Sc34: 1e5,0.4<br>'
  }
  if (player.points.gte(1e35)) {
    sc += 'Sc35: Reduce Points Gain<br>'
    scf += 'Sc35: 35,0.9<br>'
  }
  if (uesc('C', 11, n(1e10))) {
    sc += "Sc36: Reduce C1's Effect<br>"
    scf += 'Sc36: 1e10,0.4<br>'
  }
  if (tmp.C.gainMult.gte(1e5)) {
    sc += "Sc37: Reduce C's Gainmult<br>"
    scf += 'Sc37: 1e5,0.2<br>'
  }
  if (player.sc.points.gte(1000)) {
    sc += 'Sc38: Reduce Softcap Points Gain<br>'
    scf += 'Sc38: 1000,0.04<br>'
  }
  if (uesc('sc', 16, n(10))) {
    sc += "Sc39: Reduce ScU6's Effect<br>"
    scf += 'Sc39: 10,0.5<br>'
  }
  if (uesc('C', 13, n(1e20))) {
    sc += "Sc40: Reduce C3's Effect<br>"
    scf += 'Sc40: 1e20,0.25<br>'
  }
  if (uesc('B', 16, n(1e6))) {
    sc += "Sc41: Reduce B6's Effect<br>"
    scf += 'Sc41: 1e6,0.01<br>'
  }
  if (uesc('D', 11, n(1e6))) {
    sc += "Sc42: Reduce D1's Effect<br>"
    scf += 'Sc42: 1e6,0.5<br>'
  }
  if (uesc('D', 15, n(1e3))) {
    sc += "Sc43: Reduce D5's Effect<br>"
    scf += 'Sc43: 1e3,0.5<br>'
  }
  if (tmp.A.gainMult.gte(1e7)) {
    sc += "Sc44: Reduce A's Gainmult<br>"
    scf += 'Sc44: 1e7,0.3<br>'
  }
  if (uesc('A', 35, n(1e20))) {
    sc += "Sc45: Reduce A17's Effect<br>"
    scf += 'Sc45: 1e20,0.1<br>'
  }
  if (uesc('sc', 21, n(10))) {
    sc += "Sc46: Reduce ScU7's Effect<br>"
    scf += 'Sc46: 10,0.5<br>'
  }
  if (uesc('D', 15, n(1e5))) {
    sc += "Sc47: Reduce D5's Effect<br>"
    scf += 'Sc47: 1e5,0.5<br>'
  }
  if (uesc('D', 11, n(1e20))) {
    sc += "Sc48: Reduce D1's Effect<br>"
    scf += 'Sc48: 1e20,0.25<br>'
  }
  if (uesc('D', 26, n(1e8))) {
    sc += "Sc49: Reduce D12's Effect<br>"
    scf += 'Sc49: 1e8,0.5<br>'
  }
  if (tmp.B.gainMult.gte(1e10)) {
    sc += "Sc50: Reduce B's Gainmult<br>"
    scf += 'Sc50: 1e10,0.5<br>'
  }
  if (uesc('D', 32, n(10))) {
    sc += "Sc51: Reduce D14's Effect<br>"
    scf += 'Sc51: 10,0.5<br>'
  }
  if (tmp.D.gainMult.gte(1e4)) {
    sc += "Sc52: Reduce D's Gainmult<br>"
    scf += 'Sc52: 1e4,0.4<br>'
  }
  if (tmp.C.gainMult.gte(1e9)) {
    sc += "Sc53: Reduce C's Gainmult<br>"
    scf += 'Sc53: 1e9,0.4<br>'
  }
  if (uesc('D', 11, n(1e100))) {
    sc += "Sc54: Decrease D1's Effect<br>"
    scf += 'Sc54: 1e100,exp0.1<br>'
  }
  if (tmp.A.gainMult.gte(1e9)) {
    sc += "Sc55: Reduce A's Gainmult<br>"
    scf += 'Sc55: 1e9,0.3<br>'
  }
  if (uesc('D', 25, n(1e4))) {
    sc += "Sc56: Reduce D11's Effect<br>"
    scf += 'Sc56: 1e5,0.25<br>'
  }
  if (uesc('D', 32, n(1e4))) {
    sc += "Sc57: Reduce D14's Effect<br>"
    scf += 'Sc57: 1e4,0.5<br>'
  }
  if (player.points.gte(1e100)) {
    sc += 'Sc58: Decrease Points Gain<br>'
    scf += 'Sc58: 1e100,exp0.8<br>'
  }
  if (tmp.B.gainMult.gte(1e25)) {
    sc += "Sc59: Reduce B's Gainmult<br>"
    scf += 'Sc59: 1e25,0.5<br>'
  }
  if (uesc('B', 11, n(1000))) {
    sc += "Sc60: Reduce B1's Effect<br>"
    scf += 'Sc60: 1000,0.5<br>'
  }
  if (uesc('D', 21, n(1e10))) {
    sc += "Sc61: Reduce D7's Effect<br>"
    scf += 'Sc61: 1e10,0.5<br>'
  }
  if (uesc('D', 21, n(1e20))) {
    sc += "Sc62: Reduce D7's Effect<br>"
    scf += 'Sc62: 1e20,0.5<br>'
  }
  if (uesc('B', 44, n(1e10))) {
    sc += "Sc63: Reduce B22's Effect<br>"
    scf += 'Sc63: 1e10,0.5<br>'
  }
  if (tmp.D.gainMult.gte(1e10)) {
    sc += "Sc64: Reduce D's Gainmult<br>"
    scf += 'Sc64: 1e10,0.4<br>'
  }
  if (tmp.C.gainMult.gte(1e20)) {
    sc += "Sc65: Reduce C's Gainmult<br>"
    scf += 'Sc65: 1e20,0.3<br>'
  }
  if (tmp.D.gainMult.gte(1e20)) {
    sc += "Sc66: Reduce D's Gainmult<br>"
    scf += 'Sc66: 1e20,0.1<br>'
  }
  if (tmp.B.gainMult.gte(1e40)) {
    sc += "Sc67: Reduce B's Gainmult<br>"
    scf += 'Sc67: 1e40,0.5<br>'
  }
  if (uesc('D', 36, n(1e3))) {
    sc += "Sc68: Reduce D18's Effect<br>"
    scf += 'Sc68: 1e3,0.5<br>'
  }
  if (uesc('B', 52, n(1e50))) {
    sc += "Sc69: Reduce B26's Effect<br>"
    scf += 'Sc69: 1e50,0.5<br>'
  }
  if (uesc('B', 44, n(1e30))) {
    sc += "Sc70: Reduce B22's Effect<br>"
    scf += 'Sc70: 1e30,0.25<br>'
  }
  if (player.points.gte(1e300)) {
    sc += 'Sc71: Decrease Points Gain<br>'
    scf += 'Sc71: 1e300,exp0.75<br>'
  }
  if (uesc('B', 61, n(1e10))) {
    sc += "Sc72: Reduce B31's Effect<br>"
    scf += 'Sc72: 1e10,0.5<br>'
  }
  if (uesc('B', 61, n(1e20))) {
    sc += "Sc73: Reduce B31's Effect<br>"
    scf += 'Sc73: 1e20,0.5<br>'
  }
  if (layers.B.buyables[11].base().gte(1e5)) {
    sc += "Sc74: Reduce Bb1's Base<br>"
    scf += 'Sc74: 1e5,0.2<br>'
  }
  if (layers.B.buyables[12].base().gte(1e5)) {
    sc += "Sc75: Reduce Bb2's Base<br>"
    scf += 'Sc75: 1e5,0.2<br>'
  }
  if (layers.B.buyables[21].base().gte(1e5)) {
    sc += "Sc76: Reduce Bb4's Base<br>"
    scf += 'Sc76: 1e5,0.2<br>'
  }
  if (layers.B.buyables[22].base().gte(1e5)) {
    sc += "Sc77: Reduce Bb5's Base<br>"
    scf += 'Sc77: 1e5,0.2<br>'
  }
  if (layers.B.buyables[23].base().gte(100)) {
    sc += "Sc78: Reduce Bb6's Base<br>"
    scf += 'Sc78: 100,0.5<br>'
  }
  if (tmp.D.gainMult.gte(1e30)) {
    sc += "Sc79: Reduce D's Gainmult<br>"
    scf += 'Sc79: 1e30,0.5<br>'
  }
  if (uesc('B', 61, n(1e50))) {
    sc += "Sc80: Reduce B31's Effect<br>"
    scf += 'Sc80: 1e50,0.5<br>'
  }
  if (uesc('B', 61, n(1e80))) {
    sc += "Sc81: Reduce B31's Effect<br>"
    scf += 'Sc81: 1e80,0.25<br>'
  }
  if (uesc('B', 61, n(1e100))) {
    sc += "Sc82: Reduce B31's Effect<br>"
    scf += 'Sc82: 1e100,0.25<br>'
  }
  if (tmp.B.gainMult.gte(1e100)) {
    sc += "Sc83: Reduce B's Gainmult<br>"
    scf += 'Sc83: 1e100,0.5<br>'
  }
  if (buyableEffect('A', 11).gte(1e200)) {
    sc += "Sc84: Reduce Ab1's Effect<br>"
    scf += 'Sc84: 1e200,0.25<br>'
  }
  if (tmp.C.gainMult.gte(1e60)) {
    sc += "Sc85: Reduce C's Gainmult<br>"
    scf += 'Sc85: 1e60,0.6<br>'
  }
  if (tmp.A.gainMult.gte(1e100)) {
    sc += "Sc86: Reduce A's Gainmult<br>"
    scf += 'Sc86: 1e100,0.8<br>'
  }
  if (player.points.gte('1e500')) {
    sc += 'Sc87: Decrease Points Gain<br>'
    scf += 'Sc87: 1e500,exp0.5<br>'
  }
  if (buyableEffect('A', 12).gte(10)) {
    sc += "Sc88: Reduce Ab2's Effect<br>"
    scf += 'Sc88: 10,0.5<br>'
  }
  if (buyableEffect('A', 11).gte('1e500')) {
    sc += "Sc89: Decrease Ab1's Effect<br>"
    scf += 'Sc89: 1e500,exp0.5<br>'
  }
  if (buyableEffect('B', 23).gte('1e1024')) {
    sc += "Sc90: Reduce Bb6's Effect<br>"
    scf += 'Sc90: 1e1024,0.1<br>'
  }
  if (buyableEffect('A', 12).gte(100)) {
    sc += "Sc91: Reduce Ab2's Effect<br>"
    scf += 'Sc91: 100,0.5<br>'
  }
  if (tmp.C.gainMult.gte(1e100)) {
    sc += "Sc92: Reduce C's Gainmult<br>"
    scf += 'Sc92: 1e100,0.8<br>'
  }
  if (uesc('A', 11, n(1e25))) {
    sc += "Sc93: Reduce A1's Effect<br>"
    scf += 'Sc93: 1e25,0.9<br>'
  }
  if (uesc('A', 11, n(1e30))) {
    sc += "Sc94: Decrease A1's Effect<br>"
    scf += 'Sc94: 1e30,exp0.5<br>'
  }
  if (player.sc.points.gte(1e4)) {
    sc += 'Sc95: Reduce Softcap Points Gain<br>'
    scf += 'Sc95: 1e4,0.1<br>'
  }
  if (challengeEffect("A", 41).gte(1.2)) {
    sc += "Sc96: Reduce Ac7's Effect<br>"
    scf += 'Sc96: 1.2,0.2<br>'
  }
  if (uesc('A', 24, n(1e20))) {
    sc += "Sc97: Reduce A10's Effect<br>"
    scf += 'Sc97: 1e20,0.5<br>'
  }
  if (uesc('A', 61, n(1e50))) {
    sc += "Sc98: Reduce A31's Effect<br>"
    scf += 'Sc98: 1e50,0.25<br>'
  }
  if (uesc('D', 11, n('ee6'))) {
    sc += "Sc99: Decrease D1's Effect<br>"
    scf += 'Sc99: 1e1000000,exp0.1<br>'
  }
  if (tmp.B.gainMult.gte(1e250)) {
    sc += "Sc100: Reduce B's Gainmult<br>"
    scf += 'Sc100: 1e250,0.5<br>'
  }
  if (tmp.A.gainMult.gte(1e250)) {
    sc += "Sc101: Reduce A's Gainmult<br>"
    scf += 'Sc101: 1e250,0.8<br>'
  }
  if (uesc('B', 73, n(1.2))) {
    sc += "Sc102: Reduce B39's Effect<br>"
    scf += 'Sc102: 1.2,0.5<br>'
  }
  if (uesc('E', 11, n('ee5'))) {
    sc += "Sc103: Reduce E1's Effect<br>"
    scf += 'Sc103: e1e5,0.5<br>'
  }
  if (uesc('E', 12, n(10))) {
    sc += "Sc104: Reduce E2's Effect<br>"
    scf += 'Sc104: 10,0.5<br>'
  }
  if (uesc('E', 15, n(2))) {
    sc += "Sc105: Reduce E5's Effect<br>"
    scf += 'Sc105: 2,0.5<br>'
  }
  if (challengeEffect('E', 11).gte(10) && hc('E', 11)) {
    sc += "Sc106: Reduce Ec1 Effect<br>"
    scf += 'Sc106: 150,0.8<br>'
  }
  if (uesc('E', 14, n(2))) {
    sc += "Sc107: Reduce E4's Effect<br>"
    scf += 'Sc107: 2,0.5<br>'
  }
  if (uesc('E', 23, n(10))) {
    sc += "Sc108: Reduce E9's Effect<br>"
    scf += 'Sc108: 10,0.5<br>'
  }
  if (tmp.E.gainMult.gte(1e5)) {
    sc += "Sc109: Reduce E's Gainmult<br>"
    scf += 'Sc109: 1e5,0.5<br>'
  }
  if (challengeEffect('E', 12).gte(2) && hc('E', 12)) {
    sc += "Sc110: Reduce Ec2's Effect<br>"
    scf += 'Sc110: 2,0.5<br>'
  }
  if (ue('E', 16)[0].gte(1e3) && hu('E', 16)) {
    sc += "Sc111: Reduce E6's first Effect<br>"
    scf += 'Sc111: 1e3,0.5<br>'
  }
  if (ue('E', 16)[1].gte(1e3) && hu('E', 16)) {
    sc += "Sc112: Reduce E6's second Effect<br>"
    scf += 'Sc112: 1e3,0.5<br>'
  }
  if (uesc('E', 13, n(2))) {
    sc += "Sc113: Reduce E3's Effect<br>"
    scf += 'Sc113: 2,0.5<br>'
  }
  if (uesc('E', 32, n(2))) {
    sc += "Sc114: Reduce E14's Effect<br>"
    scf += 'Sc114: 2,0.5<br>'
  }
  if (uesc('E', 31, n(1e3))) {
    sc += "Sc115: Reduce E13's Effect<br>"
    scf += 'Sc115: 1e5,0.5<br>'
  }
  if (uesc('E', 26, n(5))) {
    sc += "Sc116: Reduce E12's Effect<br>"
    scf += 'Sc116: 5,0.5<br>'
  }
  if (challengeEffect('E', 12).gte(1000) && hc('E', 12)) {
    sc += "Sc117: Reduce Ec2's Effect<br>"
    scf += 'Sc117: 1000,0.25<br>'
  }
  if (uesc('E', 36, n(4))) {
    sc += "Sc118: Reduce E18's Effect<br>"
    scf += 'Sc118: 4,0.5<br>'
  }
  if (uesc('E', 12, n(1000))) {
    sc += "Sc119: Reduce E2's Effect<br>"
    scf += 'Sc119: 1000,0.5<br>'
  }
  if (uesc('C', 32, n(5))) {
    sc += "Sc120: Reduce C14's Effect<br>"
    scf += 'Sc120: 5,0.5<br>'
  }
  if (ue('C', 33)[0].gte(2) && hu('C', 33)) {
    sc += "Sc121: Reduce C15's first Effect<br>"
    scf += 'Sc121: 2,0.5<br>'
  }
  if (ue('C', 33)[1].gte(2) && hu('C', 33)) {
    sc += "Sc122: Reduce C15's second Effect<br>"
    scf += 'Sc122: 2,0.5<br>'
  }
  if (uesc('E', 14, n(4))) {
    sc += "Sc123: Reduce E4's Effect<br>"
    scf += 'Sc123: 4,0.5<br>'
  }
  if (tmp.E.gainMult.gte(1e10)) {
    sc += "Sc124: Reduce E's Gainmult<br>"
    scf += 'Sc124: 1e10,0.75<br>'
  }
  if (uesc('E', 35, n(2))) {
    sc += "Sc125: Reduce E17's Effect<br>"
    scf += 'Sc125: 2,0.5<br>'
  }
  if (uesc('E', 13, n(5))) {
    sc += "Sc126: Reduce E3's Effect<br>"
    scf += 'Sc126: 5,0.5<br>'
  }
  if (ue('E', 22)[0].gte(1e4) && hu('E', 22)) {
    sc += "Sc127: Reduce E8's first Effect<br>"
    scf += 'Sc127: 1e4,0.5<br>'
  }
  if (ue('E', 22)[1].gte(1e4) && hu('E', 22)) {
    sc += "Sc128: Reduce E8's second Effect<br>"
    scf += 'Sc128: 1e4,0.5<br>'
  }
  if (uesc('sc', 32, n(2))) {
    sc += "Sc129: Reduce ScU14's Effect<br>"
    scf += 'Sc129: 2,0.5<br>'
  }
  if (uesc('sc', 32, n(5))) {
    sc += "Sc130: Reduce ScU14's Effect<br>"
    scf += 'Sc130: 5,0.5<br>'
  }
  if (uesc('E', 51, n(100))) {
    sc += "Sc131: Reduce E25's Effect<br>"
    scf += 'Sc131: 100,0.5<br>'
  }
  if (buyableEffect('E', 14).gte(0.01)) {
    sc += "Sc132: Reduce Eb3.5's Effect<br>"
    scf += 'Sc132: 0.01,/10<br>'
  }
  if (buyableEffect('E', 21).gte(1e5)) {
    sc += "Sc133: Reduce Eb4's Effect<br>"
    scf += 'Sc133: 1e5,0.2<br>'
  }
  if (tmp.A.gainMult.gte(1e300)) {
    sc += "Sc134: Reduce A's Gainmult<br>"
    scf += 'Sc134: 1e300,0.8<br>'
  }
  if (uesc('E', 13, n(10))) {
    sc += "Sc135: Reduce E3's Effect<br>"
    scf += 'Sc135: 10,0.5<br>'
  }
  if (uesc('E', 14, n(10))) {
    sc += "Sc136: Reduce E4's Effect<br>"
    scf += 'Sc136: 10,0.5<br>'
  }
  if (challengeEffect('E', 21)[0].gte(1e5) && hc('E', 21)) {
    sc += "Sc137: Reduce Ec3's first Effect<br>"
    scf += 'Sc137: 1e5,0.5<br>'
  }
  if (tmp.A.gainMult.gte('1e350')) {
    sc += "Sc138: Reduce A's Gainmult<br>"
    scf += 'Sc138: 1e350,0.8<br>'
  }
  if (uesc('E', 56, n(2))) {
    sc += "Sc139: Reduce E30's Effect<br>"
    scf += 'Sc139: 2,0.5<br>'
  }
  if (uesc('E', 54, n(1e10))) {
    sc += "Sc140: Reduce E28's Effect<br>"
    scf += 'Sc140: 1e10,0.5<br>'
  }
  if (uesc('E', 56, n(4))) {
    sc += "Sc141: Reduce E30's Effect<br>"
    scf += 'Sc141: 4,0.5<br>'
  }
  if (tmp.B.gainMult.gte(1e300)) {
    sc += "Sc142: Reduce B's Gainmult<br>"
    scf += 'Sc142: 1e300,0.5<br>'
  }
  if (uesc('E', 63, n(4))) {
    sc += "Sc143: Reduce E33's Effect<br>"
    scf += 'Sc143: 4,0.5<br>'
  }
  if (challengeEffect('E', 22)[0].gte(1e5) && hc('E', 22)) {
    sc += "Sc144: Reduce Ec4's first Effect<br>"
    scf += 'Sc144: 1e5,0.5<br>'
  }
  if (challengeEffect('E', 22)[1].gte(1e5) && hc('E', 22)) {
    sc += "Sc145: Reduce Ec4's second Effect<br>"
    scf += 'Sc145: 1e5,0.5<br>'
  }
  if (uesc('E', 51, n(1e4))) {
    sc += "Sc146: Reduce E25's Effect<br>"
    scf += 'Sc146: 1e4,0.5<br>'
  }
  if (uesc('E', 61, n(5))) {
    sc += "Sc147: Reduce E31's Effect<br>"
    scf += 'Sc147: 5,0.4<br>'
  }
  if (uesc('E', 51, n(1e5))) {
    sc += "Sc148: Reduce E25's Effect<br>"
    scf += 'Sc148: 1e5,0.5<br>'
  }
  if (buyableEffect('E', 11).gte(1e40)) {
    sc += "Sc149: Reduce Eb1's Effect<br>"
    scf += 'Sc149: 1e40,0.5<br>'
  }
  if (buyableEffect('E', 12).gte(1e40)) {
    sc += "Sc150: Reduce Eb2's Effect<br>"
    scf += 'Sc150: 1e40,0.5<br>'
  }
  if (uesc('B', 84, n(10))) {
    sc += "Sc151: Reduce B46's Effect<br>"
    scf += 'Sc151: 10,0.2<br>'
  }
  if (uesc('E', 66, n(1e100))) {
    sc += "Sc152: Reduce E36's Effect<br>"
    scf += 'Sc152: 1e100,0.5<br>'
  }
  if (buyableEffect('E', 13).gte(1e40)) {
    sc += "Sc153: Reduce Eb3's Effect<br>"
    scf += 'Sc153: 1e40,0.5<br>'
  }
  if (challengeEffect('E', 21)[1].gte(1e5) && hc('E', 21)) {
    sc += "Sc154: Reduce Ec3's second Effect<br>"
    scf += 'Sc154: 1e5,0.5<br>'
  }
  if (uesc('E', 65, n(100))) {
    sc += "Sc155: Reduce E35's Effect<br>"
    scf += 'Sc155: 100,0.8<br>'
  }
  if (uesc('E', 65, n(500))) {
    sc += "Sc156: Reduce E35's Effect<br>"
    scf += 'Sc156: 500,0.5<br>'
  }
  if (uesc('E', 71, n(10))) {
    sc += "Sc157: Reduce E37's Effect<br>"
    scf += 'Sc157: 10,0.5<br>'
  }
  if (uesc('E', 73, n(6))) {
    sc += "Sc158: Reduce E39's Effect<br>"
    scf += 'Sc158: 6,0.5<br>'
  }
  if (uesc('E', 61, n(20))) {
    sc += "Sc159: Reduce E31's Effect<br>"
    scf += 'Sc159: 20,0.2<br>'
  }
  if (uesc('E', 71, n(1000))) {
    sc += "Sc160: Reduce E37's Effect<br>"
    scf += 'Sc160: 1000,0.25<br>'
  }
  if (uesc('E', 73, n(10))) {
    sc += "Sc161: Reduce E39's Effect<br>"
    scf += 'Sc161: 10,0.5<br>'
  }
  if (buyableEffect('E', 32).gte(1e5)) {
    sc += "Sc162: Reduce Eb6's Effect<br>"
    scf += 'Sc162: 1e5,0.25<br>'
  }
  if (uesc('E', 71, n(1e5))) {
    sc += "Sc163: Reduce E37's Effect<br>"
    scf += 'Sc163: 1e5,0.5<br>'
  }
  if (uesc('E', 71, n(1e6))) {
    sc += "Sc164: Reduce E37's Effect<br>"
    scf += 'Sc164: 1e6,0.5<br>'
  }
  if (uesc('E', 83, n(2))) {
    sc += "Sc165: Reduce E45's Effect<br>"
    scf += 'Sc165: 2,0.5<br>'
  }
  if (buyableEffect('E', 32).gte(1e12)) {
    sc += "Sc166: Reduce Eb6's Effect<br>"
    scf += 'Sc166: 1e12,0.5<br>'
  }
  if (uesc('E', 36, n(1e3))) {
    sc += "Sc167: Reduce E18's Effect<br>"
    scf += 'Sc167: 1e3,0.6<br>'
  }
  if (uesc('E', 36, n(1e5))) {
    sc += "Sc168: Reduce E18's Effect<br>"
    scf += 'Sc168: 1e5,0.7<br>'
  }
  if (uesc('E', 82, n(1e7))) {
    sc += "Sc169: Reduce E44's Effect<br>"
    scf += 'Sc169: 1e7,0.5<br>'
  }
  if (uesc('E', 53, n(10))) {
    sc += "Sc161: Reduce E27's Effect<br>"
    scf += 'Sc161: 10,0.5<br>'
  }
  if (uesc('E', 54, n(1e60))) {
    sc += "Sc162: Reduce E28's Effect<br>"
    scf += 'Sc162: 1e60,0.5<br>'
  }
  if (buyableEffect('E', 33).gte(1e10)) {
    sc += "Sc165: Reduce Eb7's Effect<br>"
    scf += 'Sc165: 1e10,0.5<br>'
  }
  if (uesc('E', 94, n(2085))) {
    sc += "Sc171: Reduce E52's Effect<br>"
    scf += 'Sc171: 2085,0.5<br>'
  }
  if (buyableEffect('E', 31).gte(1e30)) {
    sc += "Sc172: Reduce Eb5's Effect<br>"
    scf += 'Sc172: 1e30,0.25<br>'
  }
  if (buyableEffect('E', 33).gte(1e15)) {
    sc += "Sc173: Reduce Eb7's Effect<br>"
    scf += 'Sc173: 1e15,0.25<br>'
  }
  if (uesc('E', 101, n(200))) {
    sc += "Sc175: Reduce E55's Effect<br>"
    scf += 'Sc175: 200,0.5<br>'
  }
  if (uesc('E', 102, n(200))) {
    sc += "Sc176: Reduce E56's Effect<br>"
    scf += 'Sc176: 100,0.5<br>'
  }
  if (tmp.E.upgrades[82].eff.gte(0.1)) {
    sc += "Sc177: Reduce E44's Power<br>"
    scf += 'Sc177: 0.1,/5<br>'
  }
  if (challengeEffect('E', 41).gte(1.15)) {
    sc += "Sc178: Reduce Ec7's Effect<br>"
    scf += 'Sc178: 1.15,0.5<br>'
  }
  if (tmp.E.ekgain.gte(1e20)) {
    sc += 'Sc179: Reduce Ek Gain<br>'
    scf += 'Sc179: 1e20,0.8<br>'
  }
  if (tmp.E.emgain.gte(1e100)) {
    sc += 'Sc180: Reduce Em Gain<br>'
    scf += 'Sc180: 1e100,0.6<br>'
  }
  if (uesc('E', 104, n(10))) {
    sc += "Sc181: Reduce E58's Effect<br>"
    scf += 'Sc181: 10,0.5<br>'
  }
  if (tmp.E.ekgain.gte(1e40)) {
    sc += 'Sc182: Reduce Ek Gain<br>'
    scf += 'Sc182: 1e40,0.8<br>'
  }
  if (challengeEffect('E', 42).gt(0.03)) {
    sc += "Sc183: Reduce Ec8's Effect<br>"
    scf += 'Sc183: 0.03,/25<br>'
  }
  if (tmp.F.effect.gt(10)) {
    sc += "Sc184: Reduce F's Effect<br>"
    scf += 'Sc184: 10,0.5<br>'
  }
  if (uesc('a', 11, n(10))) {
    sc += "Sc185: Reduce α1's Effect<br>"
    scf += 'Sc185: 10,0.6<br>'
  }
  if (uesc('a', 13, n(2))) {
    sc += "Sc186: Reduce α3's Effect<br>"
    scf += 'Sc186: 2,0.5<br>'
  }
  if (uesc('a', 14, n(10))) {
    sc += "Sc187: Reduce α4's Effect<br>"
    scf += 'Sc187: 10,0.5<br>'
  }
  if (uesc('a', 14, n(100))) {
    sc += "Sc188: Reduce α4's Effect<br>"
    scf += 'Sc188: 100,0.5<br>'
  }
  if (uesc('a', 14, n(1000))) {
    sc += "Sc189: Reduce α4's Effect<br>"
    scf += 'Sc189: 1000,0.5<br>'
  }
  if (uesc('a', 15, n(10))) {
    sc += "Sc190: Reduce α5's Effect<br>"
    scf += 'Sc190: 10,0.5<br>'
  }
  if (uesc('a', 14, n(1e4))) {
    sc += "Sc191: Reduce α4's Effect<br>"
    scf += 'Sc191: 1e4,0.5<br>'
  }
  if (uesc('a', 15, n(100))) {
    sc += "Sc192: Reduce α5's Effect<br>"
    scf += 'Sc192: 100,0.5<br>'
  }
  if (uesc('a', 16, n(10))) {
    sc += "Sc193: Reduce α6's Effect<br>"
    scf += 'Sc193: 10,0.5<br>'
  }
  if (uesc('a', 16, n(100))) {
    sc += "Sc194: Reduce α6's Effect<br>"
    scf += 'Sc194: 100,0.5<br>'
  }
  if (uesc('a', 14, n(1e5))) {
    sc += "Sc195: Reduce α4's Effect<br>"
    scf += 'Sc195: 1e5,0.5<br>'
  }
  if (uesc('a', 15, n(1000))) {
    sc += "Sc196: Reduce α5's Effect<br>"
    scf += 'Sc196: 1000,0.5<br>'
  }
  if (uesc('a', 16, n(1000))) {
    sc += "Sc197: Reduce α6's Effect<br>"
    scf += 'Sc197: 1000,0.5<br>'
  }
  if (uesc('a', 15, n(1e4))) {
    sc += "Sc198: Reduce α5's Effect<br>"
    scf += 'Sc198: 1e4,0.5<br>'
  }
  if (uesc('a', 16, n(1e4))) {
    sc += "Sc199: Reduce α6's Effect<br>"
    scf += 'Sc199: 1e4,0.1<br>'
  }
  if (uesc('a', 14, n(1e6))) {
    sc += "Sc200: Reduce α4's Effect<br>"
    scf += 'Sc200: 1e6,0.1<br>'
  }
  if (uesc('a', 15, n(1e5))) {
    sc += "Sc201: Reduce α5's Effect<br>"
    scf += 'Sc201: 1e5,0.1<br>'
  }
  if (uesc('a', 11, n(100))) {
    sc += "Sc202: Reduce α1's Effect<br>"
    scf += 'Sc202: 100,0.6<br>'
  }
  if (uesc('a', 21, n(10))) {
    sc += "Sc203: Reduce α7's Effect<br>"
    scf += 'Sc203: 10,0.5<br>'
  }
  if (uesc('a', 11, n(1e10))) {
    sc += "Sc204: Reduce α1's Effect<br>"
    scf += 'Sc204: 1e10,0.6<br>'
  }
  if (uesc('a', 21, n(100))) {
    sc += "Sc205: Reduce α7's Effect<br>"
    scf += 'Sc205: 100,0.5<br>'
  }
  if (uesc('a', 11, n(1e100))) {
    sc += "Sc206: Reduce α1's Effect<br>"
    scf += 'Sc206: 1e100,0.6<br>'
  }
  if (uesc('a', 21, n(1000))) {
    sc += "Sc207: Reduce α7's Effect<br>"
    scf += 'Sc207: 1000,0.5<br>'
  }
  if (uesc('a', 11, n(1e308))) {
    sc += "Sc208: Reduce α1's Effect<br>"
    scf += 'Sc208: 1e308,0.01<br>'
  }
  if (uesc('a', 21, n(1e4))) {
    sc += "Sc209: Reduce α7's Effect<br>"
    scf += 'Sc209: 1e4,0.1<br>'
  }
  if (uesc('a', 22, n(1e10))) {
    sc += "Sc210: Reduce α8's Effect<br>"
    scf += 'Sc210: 1e10,0.5<br>'
  }
  if (uesc('a', 23, n(10))) {
    sc += "Sc211: Reduce α9's Effect<br>"
    scf += 'Sc211: 10,0.5<br>'
  }
  if (uesc('a', 21, n(1e5))) {
    sc += "Sc212: Reduce α7's Effect<br>"
    scf += 'Sc212: 1e5,0.5<br>'
  }
  if (uesc('a', 23, n(1e6))) {
    sc += "Sc213: Reduce α9's Effect<br>"
    scf += 'Sc213: 1e6,0.5<br>'
  }
  if (uesc('a', 24, n(1000))) {
    sc += "Sc214: Reduce α10's Effect<br>"
    scf += 'Sc214: 1000,0.5<br>'
  }
  if (uesc('a', 25, n(1000))) {
    sc += "Sc215: Reduce α11's Effect<br>"
    scf += 'Sc215: 1000,0.5<br>'
  }
  if (uesc('a', 24, n(1e4))) {
    sc += "Sc216: Reduce α10's Effect<br>"
    scf += 'Sc216: 1e4,0.5<br>'
  }
  if (uesc('a', 26, n(10))) {
    sc += "Sc217: Reduce α12's Effect<br>"
    scf += 'Sc217: 10,0.5<br>'
  }
  if (player.sc.points.gte(5e4)) {
    sc += 'Sc218: Reduce Softcap Points Gain<br>'
    scf += 'Sc218: 5e4,0.1<br>'
  }
  if (tmp.D.gainMult.gte(1e256)) {
    sc += "Sc219: Reduce D's Gainmult<br>"
    scf += 'Sc219: 1e256,0.3<br>'
  }
  if (tmp.E.gainMult.gte(1e54)) {
    sc += "Sc220: Reduce E's Gainmult<br>"
    scf += 'Sc220: 1e54,0.5<br>'
  }
  if (uesc('a', 26, n(100))) {
    sc += "Sc221: Reduce α12's Effect<br>"
    scf += 'Sc221: 100,0.5<br>'
  }
  if (uesc('a', 24, n(1e6))) {
    sc += "Sc221: Reduce α10's Effect<br>"
    scf += 'Sc221: 1e6,0.1<br>'
  }
  if (uesc('a', 26, n(1e4))) {
    sc += "Sc222: Reduce α12's Effect<br>"
    scf += 'Sc222: 1e4,0.5<br>'
  }
  if (hm('F', 1) && tmp.F.milestones[1].effect.gte(1.3)) {
    sc += "Sc223: Reduce Fm2's Effect<br>"
    scf += 'Sc223: 1.3,0.5<br>'
  }
  if (uesc('b', 12, n(10))) {
    sc += "Sc224: Reduce β2's Effect<br>"
    scf += 'Sc224: 10,0.5<br>'
  }
  if (uesc('b', 12, n(100))) {
    sc += "Sc225: Reduce β2's Effect<br>"
    scf += 'Sc225: 100,0.5<br>'
  }
  if (uesc('b', 13, n(4))) {
    sc += "Sc226: Reduce β3's Effect<br>"
    scf += 'Sc226: 4,0.5<br>'
  }
  if (uesc('b', 12, n(1000))) {
    sc += "Sc227: Reduce β2's Effect<br>"
    scf += 'Sc227: 1000,0.5<br>'
  }
  if (uesc('D', 43, n(1e6))) {
    sc += "Sc228: Reduce D21's Effect<br>"
    scf += 'Sc228: 1e6,0.5<br>'
  }
  if (uesc('D', 44, n(5))) {
    sc += "Sc229: Reduce D22's Effect<br>"
    scf += 'Sc229: 4,0.5<br>'
  }
  if (uesc('D', 43, n(1e8))) {
    sc += "Sc230: Reduce D21's Effect<br>"
    scf += 'Sc230: 1e8,0.5<br>'
  }
  if (uesc('D', 44, n(10))) {
    sc += "Sc231: Reduce D22's Effect<br>"
    scf += 'Sc231: 10,0.5<br>'
  }
  return [sc.split('br').length - 1, sc, scf]
}
