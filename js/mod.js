let modInfo = {
  name: 'AAST NG- Extended',
  id: 'AASTNGsub',
  author: 'Original<sup>3</sup>ed by 4294967296, Original<sup>2</sup>ed by QqQe308, Originaled by 0100000a7, Modded by kanaenagi',
  pointsName: 'points',
  modFiles: [
    'layers/alpha.js',
    'layers/beta.js',
    'layers/A.js',
    'layers/B.js',
    'layers/C.js',
    'layers/D.js',
    'layers/E.js',
    'layers/F.js',
    'layers/ach.js',
    'layers/softcaps.js',
    'layers/super-softcaps.js',
    'layers/ma.js',
    'layers/test.js',
    'tree.js',
  ],


  initialStartPoints: new Decimal(0), // Used for hard resets and new players
  offlineLimit: 12, // In hours
}

var qqq //used for testing effects, finding limits, etc.

// Set your version in num and name
let VERSION = {
  num: '0.16.1',
  name: '',
}

let changelog = `
<h1>Changelog:</h1><br>
<h2>v0.16.1 2026/1/28 15:00-2026/1/30 19:00 </h2><br>
<h3>- Rebalanced Pre-Bm11.</h3><br>
<h3>- Recounted softcap.</h3><br>
<h3>Endgame: 1e572 B (169 + <span style="color: rgb(255, 197, 215)">30</span> softcaps)</h3><br>

<h2>v0.16 2026/1/17 13:50-2026/1/24 16:30 </h2><br>
<h3>- Rebalanced Pre-Em.</h3><br>
<h3>- Added Tickspeed.</h3><br>
<h3>Endgame: 1e150 Antimatter (156 + <span style="color: rgb(255, 197, 215)">25</span> softcaps)</h3><br>

<h2>v0.14 2025/7/11 21:10-2025/7/12 22:30</h2><br>
<h3>- Added Mastery Layer.</h3><br>
<h3>- Rebalanced Layer C and D.</h3><br>
<h3>Endgame: 1e437 A (91 + <span style="color: rgb(255, 197, 215)">14</span> softcaps)</h3><br>

<h2>v0.1 2025/7/11 14:30-2025/7/11 21:10</h2><br>
<h3>- Added Super Softcap Layer.</h3><br>
<h3>- Added Antimatter.</h3><br>
<h3>- Rebalanced Layer A and B.</h3><br>
<h3>- The first release of this mod.</h3><br>
<h3>Endgame: 1e12 points (22 + <span style="color: rgb(255, 197, 215)">7</span> softcaps)</h3><br>
<br><br><br><br><br>
<h1>AAST Changelog:</h1><br>
<h2>v0.35 2024/5/4-2025/7/??</h2><br>
<h3>- Added F layer.
<br>- Added α layer and β layer.
<br>- Changed some text display and coding.
<br>- You may need to re-buy softcap upgrades.
<br>- From now on, the gane will be more different from the original game.
<br>Endgame: ??? F (??? softcaps)</h3><br>

<h2>v0.3 2024/9/7-2025/5/4</h2><br>
<h3>- Rebalanced late-E with more upgrades and contents.
<br>- Added softcap formulas and toggle devSpeed.
<br>- Completely Reconstruct coding.
<br>Endgame: 1.80e308 E (183 softcaps)</h3><br>

<h2>v0.25 2024/7/17-2024/7/25</h2><br>
<h3>- Rebalanced early-E with more upgrades and contents.
<br>- Added many new features.
<br>Endgame: 6.66e66 E (150 softcaps)</h3><br>

<h2>v0.2 2024/7/11-2024/7/16</h2><br>
<h3>- Rebalanced D with more upgrades and contents.
<br>- Added D challenges, A buyables and many new features.
<br>Endgame: 1e525 B (100 softcaps)</h3><br>

<h2>v0.1 2024/7/9-2024/7/10</h2><br>
<h3>- Rebalanced A, B and C with more upgrades and contents.
<br>- Added Softcap Layer.
<br>- Added Test and some Qol contents.
<br>- The first release of this mod.
<br>Endgame: 1e12 C</h3>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ['blowUpEverything']

function getStartPoints() {
  return n(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints() {
  return !isEndgame()
}

// Calculate points/sec!
function getRawPointsGen() {
  //points gain if no softcaps
  let gain = n(1)
  gain = gain.mul(hu('A', 11) ? ue('A', 11) : 1)
  gain = gain.mul(hu('A', 15) ? ue('A', 15) : 1)
  gain = gain.mul(hu('A', 24) ? ue('A', 24) : 1)
  gain = gain.mul(hu('A', 35) ? ue('A', 35) : 1)
  gain = gain.mul(hu('B', 11) ? ue('B', 11) : 1)
  gain = gain.mul(hu('B', 21) ? ue('B', 21) : 1)
  gain = gain.mul(hu('B', 26) ? ue('B', 26) : 1)
  gain = gain.mul(hu('B', 44) ? ue('B', 44) : 1)
  gain = gain.mul(hu('B', 52) ? ue('B', 52) : 1)
  gain = gain.mul(hu('sc', 11) ? ue('sc', 11) : 1)
  gain = gain.mul(hm('C', 3) ? 1000 : 1)

  gain = gain.mul(hu('C', 11) ? ue('C', 11) : 1)
  gain = gain.mul(hu('C', 13) ? ue('C', 13) : 1)
  gain = gain.mul(hu('D', 11) ? ue('D', 11) : 1)
  gain = gain.mul(hu('D', 15) ? ue('D', 15) : 1)
  gain = gain.mul(hu('D', 21) ? ue('D', 21) : 1)
  gain = gain.mul(hu('D', 32) ? ue('D', 32) : 1)
  gain = gain.mul(hu('E', 11) ? ue('E', 11) : 1)
  gain = gain.mul(hu('D', 43) ? ue('D', 43) : 1)
  gain = gain.mul(hu('E', 85) ? ue('E', 85) : 1)
  gain = gain.mul(buyableEffect('B', 23))

  gain = gain.mul(hu('a', 11) ? ue('a', 11) : 1)

  if (!hu('C', 13) && hu('A', 12) && gain.gte(1)) gain = gain.pow(layers.A.antimatterEffect())

  if (inChallenge('A', 21)) gain = gain.pow(0.5)
  if (inChallenge('A', 31)) gain = gain.pow(0.15)
  if (inChallenge('C', 11)) gain = gain.pow(0.45)
  if (hc('D', 21)) gain = gain.pow(1.1)
  if (inChallenge('E', 42)) gain = gain.pow(player.points.add(10).log(10).pow(-0.12))

  if (hc('A', 21)) gain = gain.mul(50)
  if (hc('A', 22)) gain = gain.mul(100)
  if (hc('A', 31)) gain = gain.mul(2e5)
  if (hc('C', 11)) gain = gain.mul(1000)
  if (hc('C', 12)) gain = gain.mul(8000)

  if (hu('C', 13) && hu('A', 12) && gain.gte(1)) gain = gain.pow(layers.A.antimatterEffect())
  if (mu("C", 12)) gain = gain.pow(3)
  if (mu("C", 15)) gain = gain.pow(2)
  if (hu("E", 55)) gain = gain.pow(3)
  if (hasAchievement("ac", 57)) gain = gain.pow(layers.ma.effect())

  if (inChallenge('C', 21)) gain = expPow(gain, 0.1)
  if (inChallenge('C', 22)) gain = expPow(gain, 0.25)
  if (inChallenge('E', 32)) gain = expPow(gain, layers.E.challenges[32].nerf())
  if (inChallenge('A', 32)) gain = gain.max(1).log10()
  if (inChallenge('A', 41)) gain = gain.max(1).log10().pow(30)
  if (inChallenge('D', 21)) gain = gain.max(1).slog()
  if (inChallenge('D', 22)) gain = n(0)
  if (inChallenge('E', 11)) gain = gain.max(0.7105533743096611).addTP(-0.8)
  if (inChallenge('E', 31)) gain = gain.div(layers.E.challenges[31].nerf())
  return gain
}
function getPointGen() {
  if (!canGenPoints()) return n(0)

  let gain = getRawPointsGen().overflow(100, 0.5) //Ssc2
  if (gain.gte(1e4)) gain = gain.div(1e4).pow(0.5).mul(1e4) //Sc8
  if (gain.gte(1e6)) gain = gain.div(1e6).pow(0.6).mul(1e6) //Sc10
  if (gain.gte(1e8)) gain = gain.div(1e8).pow(0.7).mul(1e8) //Sc20
  if (gain.gte(1e10)) gain = gain.div(1e10).pow(0.8).mul(1e10) //Sc23
  if (gain.gte(1e35)) gain = gain.div(1e35).pow(0.9).mul(1e35) //Sc35
  if (gain.max(1).log10().gte(100)) gain = n(10).pow(gain.log10().sub(100).pow(0.8).add(100)) //Sc58
  if (gain.max(1).log10().gte(300)) gain = n(10).pow(gain.log10().sub(299).pow(0.75).add(299)) //Sc71
    .overflow(Number.MAX_VALUE, 0.5) //Ssc13
  if (gain.max(1).log10().gte(500)) gain = n(10).pow(gain.log10().sub(499).pow(0.5).add(499)) //Sc87
    .overflow("1e500", 0.75, 2) // Ssc14
    .overflow("1e600", 0.25) // Ssc17
    .tetraflow("1e1000", 0.5)
  if (inChallenge('D', 11)) gain = n(10).pow(gain.max(1).log10().pow(0.1)) //Sc58boosted

  return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {
    devSpeed: n(1),
    softcap: n(0),
  }
}
var shitDown = false

// Display extra things at the top of the page
var displayThings = [
  function () {
    let a = 'Current endgame: 1e572 B'
    let tick = 0
    for (i = 0; i<lastTenTicks.length; i++){
			tick += lastTenTicks[i] / 10
		}
    if (isEndgame()) a = a + '<br>You are past endgame! B is capped at 1e572.'
    if (gcs('te', 12)) a = a + '<br>You have played the game for ' + formatTime(player.timePlayed) + '.'
    if (gcs('te', 13)) a = a + `<br>Current FPS:  ${tick == 0 ? "0" : format((tick/1000) ** -1)}.`
    if (gcs('te', 14)) a = a + '<br>Raw Points: ' + format(getRawPointsGen()) + '.'
    if (gcs('te', 21)) a = a + '<br>There are ' + format(player.softcap, 0) + ' softcaps in all now.'
    if (gcs('te', 31)) a = a + '<br>There are ' + format(player.ssc.points, 0) + ' super softcaps in all now.'
    if (gcs('te', 23)) a = a + '<br>Softcap Point: ' + format(player.sc.points)
    return a
  },
]
// Determines when the game "ends"
function isEndgame() {
  return hm("B", 10)
}

// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return 3600 // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) { }

function gba(a, b) {
  return getBuyableAmount(a, b)
}

function gcs(a, b) {
  return getClickableState(a, b)
}

function ue(layer, id) {
  return upgradeEffect(layer, id)
}

function ha(layer, id) {
  return hasAchievement(layer, id)
}

function hu(layer, id) {
  return hasUpgrade(layer, id)
}

function hm(layer, id) {
  return hasMilestone(layer, id)
}

function hc(layer, id) {
  return hasChallenge(layer, id)
}

function sc(eff, start, power) {
  if (eff.gte(start)) return eff.div(start).pow(power).mul(start)
  else return eff
}
//对于变量eff，超出start的部分变成原来的power次方

function scExp(eff, startExp, power) {
  if (eff.max(10).log10().gte(startExp)) return n(10).pow(eff.log10().sub(startExp).pow(power).add(startExp))
  else return eff
}
//对于变量eff，指数超出startExp的部分指数变成原来的power次方

function uesc(layer, id, start) {
  return ue(layer, id).gte(start) && hu(layer, id)
} //是否触发升级效果软上限

function n(a) {
  return new Decimal(a)
}

Decimal.prototype.softcap = function (start, power, mode = 0, dis = false) {
  var x = this
  if (!dis && x.gte(start)) {
    if ([0, 'pow'].includes(mode)) x = x.div(start).max(1).pow(power).mul(start)
    if ([1, 'mul'].includes(mode)) x = x.sub(start).div(power).add(start)
    if ([2, 'exp'].includes(mode)) x = expPow(x.div(start), power).mul(start)
    if ([3, 'log'].includes(mode)) x = x.div(start).log(power).add(1).mul(start)
  }
  return x
}

Decimal.prototype.anti_softcap = function (start, power, mode = 0, dis) {
  let x = this
  if (x.gte(start) && !dis) {
    if ([0, "pow"].includes(mode)) x = x.div(start).max(1).root(power).mul(start)
    if ([1, "mul"].includes(mode)) x = x.sub(start).div(power).add(start)
    if ([2, "exp"].includes(mode)) x = expRoot(x.div(start), power).mul(start)
    if ([3, "log"].includes(mode)) x = Decimal.pow(power, x.div(start).sub(1)).mul(start)
  }
  return x
}

Decimal.prototype.scale = function (s, p, mode, rev = false, dis = false) {
  var x = this

  if (dis || Decimal.lte(x, s)) return x

  switch (mode) {
    case 'L':
      // (x-s)*p+s
      return rev ? x.sub(s).div(p).add(s) : x.sub(s).mul(p).add(s)
    case 'P':
      // (x/s)^p*s
      return rev ? x.div(s).root(p).mul(s) : x.div(s).pow(p).mul(s)
    case 'E1':
      // p^(x-s)*s
      return rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p, x.sub(s)).mul(s)
    case 'E2':
      // p^(x/s-1)*s, p >= 2.71828
      return rev ? x.div(s).max(1).log(p).add(1).mul(s) : Decimal.pow(p, x.div(s).sub(1)).mul(s)
    case 'ME1': {
      // p^(x-s)*x
      let ln_p = Decimal.ln(p)
      return rev ? Decimal.pow(p, s).mul(x).mul(ln_p).lambertw().div(ln_p) : Decimal.pow(p, x.sub(s)).mul(x)
    }
    case 'ME2': {
      // p^(x/s-1)*x
      let ln_p = Decimal.ln(p)
      return rev ? x.mul(p).mul(ln_p).div(s).lambertw().mul(s).div(ln_p) : Decimal.pow(p, x.div(s).sub(1)).mul(x)
    }
    case 'D': {
      // 10^((lg(x)/s)^p*s)
      let s10 = Decimal.log10(s)
      return rev ? Decimal.pow(10, x.log10().div(s10).root(p).mul(s10)) : Decimal.pow(10, x.log10().div(s10).pow(p).mul(s10))
    }
  }

  /*
    s = E(s)
    p = E(p)
    var x = this.clone()
    if (x.gte(s)) {
        if ([0, "pow"].includes(mode)) x = rev ? x.div(s).root(p).mul(s) : x.div(s).pow(p).mul(s)
        if ([1, "exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(s) : Decimal.pow(p,x.sub(s)).mul(s)
        if ([2, "dil"].includes(mode)) {
        let s10 = s.log10()
        x = rev ? Decimal.pow(10,x.log10().div(s10).root(p).mul(s10)) : Decimal.pow(10,x.log10().div(s10).pow(p).mul(s10))
        }
        if ([3, "alt_exp"].includes(mode)) x = rev ? x.div(s).max(1).log(p).add(1).mul(s) : Decimal.pow(p,x.div(s).sub(1)).mul(s)
    }
    return x
    */
}

function overflow(number, start, power, meta = 1) {
  if (isNaN(number.mag)) return new Decimal(0)
  start = Decimal.iteratedexp(10, meta - 1, 1.0001).max(start)
  if (number.gte(start)) {
    let s = start.iteratedlog(10, meta)
    number = Decimal.iteratedexp(10, meta, number.iteratedlog(10, meta).div(s).pow(power).mul(s))
  }
  return number
}

Decimal.prototype.overflow = function (start, power, meta) {
  return overflow(this, start, power, meta)
}
Decimal.prototype.tetraflow = function (start, power) {
  return tetraflow(this, start, power)
}

function tetraflow(number, start, power) {
  // EXPERIMENTAL FUNCTION - x => 10^^((slog10(x)-slog10(s))*p+slog10(s))
  if (isNaN(number.mag)) return new Decimal(0)
  start = n(start)
  if (number.gte(start)) {
    let s = start.slog(10)
    // Fun Fact: if 0 < number.slog(10) - start.slog(10) < 1, such like overflow(number,start,power,start.slog(10).sub(1).floor())
    number = Decimal.tetrate(10, number.slog(10).div(s).pow(power).mul(s))
  }
  return number
}

function expPow(a, b) {
  return Decimal.pow(10, Decimal.max(a, 1).log10().add(1).pow(b).sub(1))
}
// function expPow(a,b) { return Decimal.lt(a,10) ? new Decimal(a) : Decimal.pow(10,Decimal.log10(a).pow(b)) }

function revExpPow(a, b) {
  return Decimal.pow(10, Decimal.max(a, 1).log10().add(1).root(b).sub(1))
} // return expPow(a,Decimal.invert(b))

function addTP(num, add) {
  if (isNaN(num.mag)) return new Decimal(0)
  return Decimal.tetrate(10, num.slog(10).add(add))
}

Decimal.prototype.addTP = function (power) {
  return addTP(this, power)
}

function mulTP(num, mul) {
  if (isNaN(num.mag)) return new Decimal(0)
  return Decimal.tetrate(10, num.slog(10).mul(mul))
}

Decimal.prototype.mulTP = function (power) {
  return mulTP(this, power)
}

function listItems(arr) {
  if (!arr.length) return '';
  if (arr.length === 1) return arr[0];

  const last = arr.pop();
  return arr.join(', ') + ' and ' + last;
}

const randomString_chars = `ABCDEFGHJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz1234567890?!;=+-/@#$%^&*~|"'()[]{},.`;
function randomString(length) {
  let result = '';

  for (let i = 0; i < length; i++) {
    result += randomString_chars[Math.floor(Math.random() * randomString_chars.length)];
  }

  return result;
}