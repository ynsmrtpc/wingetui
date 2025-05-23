var fo = Object.defineProperty;
var mo = (t, i, e) => i in t ? fo(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var Ge = (t, i, e) => mo(t, typeof i != "symbol" ? i + "" : i, e);
import { screen as ho, app as wi, ipcMain as Ot, BrowserWindow as hs } from "electron";
import { createRequire as go } from "node:module";
import { fileURLToPath as yo } from "node:url";
import Dt from "node:path";
import se, { platform as xo } from "os";
import Fe from "fs";
import Yn from "path";
import te, { spawn as xn } from "child_process";
import So from "util";
import wo from "https";
import Co from "http";
import vo from "net";
import Lo from "buffer";
import bo from "string_decoder";
var Te = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Io(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var gs = {};
const _o = "5.25.11", Oo = {
  version: _o
};
var T = {};
const Qe = se, ke = Fe, Po = Yn, Jn = te.spawn, Ao = te.exec, Qt = te.execSync, Eo = So;
let Bt = process.platform;
const Qn = Bt === "linux" || Bt === "android", ys = Bt === "darwin", Qi = Bt === "win32", xs = Bt === "freebsd", Ss = Bt === "openbsd", ws = Bt === "netbsd";
let Sn = 0, Pt = "", De = "", Xe = null, Ve = null;
const Zn = process.env.WINDIR || "C:\\Windows";
let pe, Wt = "", di = [], er = !1, Hi = "";
const vr = "$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8 ; ", Un = "--###START###--", Lr = "--ERROR--", qi = "--###ENDCMD###--", $n = "--##ID##--", Oi = {
  windowsHide: !0,
  maxBuffer: 1024 * 2e4,
  encoding: "UTF-8",
  env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
}, Zi = {
  maxBuffer: 1024 * 2e4,
  encoding: "UTF-8",
  stdio: ["pipe", "pipe", "ignore"]
};
function Mo(t) {
  let i = parseInt(t, 10);
  return isNaN(i) && (i = 0), i;
}
function To(t) {
  let i = !1, e = "", n = "";
  for (const s of t)
    s >= "0" && s <= "9" || i ? (i = !0, e += s) : n += s;
  return [n, e];
}
const Gi = new String(), zn = new String().replace, Hn = new String().toLowerCase, Cs = new String().toString, vs = new String().substr, Ls = new String().substring, bs = new String().trim, Is = new String().startsWith, _s = Math.min;
function Do(t) {
  return t && {}.toString.call(t) === "[object Function]";
}
function Bo(t) {
  let i = [], e = {};
  for (let n = 0; n < t.length; n++) {
    let s = Object.keys(t[n]);
    s.sort(function(o, a) {
      return o - a;
    });
    let r = "";
    for (let o = 0; o < s.length; o++)
      r += JSON.stringify(s[o]), r += JSON.stringify(t[n][s[o]]);
    ({}).hasOwnProperty.call(e, r) || (i.push(t[n]), e[r] = !0);
  }
  return i;
}
function Vo(t, i) {
  return t.sort(function(e, n) {
    let s = "", r = "";
    return i.forEach(function(o) {
      s = s + e[o], r = r + n[o];
    }), s < r ? -1 : s > r ? 1 : 0;
  });
}
function ko() {
  return Sn === 0 && (Sn = Qe.cpus().length), Sn;
}
function Ze(t, i, e, n, s) {
  e = e || ":", i = i.toLowerCase(), n = n || !1, s = s || !1;
  let r = "";
  return t.some((o) => {
    let a = o.toLowerCase().replace(/\t/g, "");
    if (n && (a = a.trim()), a.startsWith(i) && (!s || a.match(i + e) || a.match(i + " " + e))) {
      const l = n ? o.trim().split(e) : o.split(e);
      if (l.length >= 2)
        return l.shift(), r = l.join(e).trim(), !0;
    }
  }), r;
}
function No(t, i) {
  return i = i || 16, t.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
    return String.fromCharCode(parseInt(arguments[1], i));
  });
}
function Fo(t) {
  let i = "", e = 0;
  return t.split("").forEach((n) => {
    n >= "0" && n <= "9" ? e === 1 && e++ : (e === 0 && e++, e === 1 && (i += n));
  }), i;
}
function Wo(t, i) {
  i = i || "", t = t.toUpperCase();
  let e = 0, n = 0, s = Fo(t), r = t.split(s);
  if (r.length >= 2) {
    r[2] && (r[1] += r[2]);
    let o = r[1] && r[1].toLowerCase().indexOf("pm") > -1 || r[1].toLowerCase().indexOf("p.m.") > -1 || r[1].toLowerCase().indexOf("p. m.") > -1 || r[1].toLowerCase().indexOf("n") > -1 || r[1].toLowerCase().indexOf("ch") > -1 || r[1].toLowerCase().indexOf("ös") > -1 || i && r[1].toLowerCase().indexOf(i) > -1;
    return e = parseInt(r[0], 10), n = parseInt(r[1], 10), e = o && e < 12 ? e + 12 : e, ("0" + e).substr(-2) + ":" + ("0" + n).substr(-2);
  }
}
function Ro(t, i) {
  const e = {
    date: "",
    time: ""
  };
  i = i || {};
  let n = (i.dateFormat || "").toLowerCase(), s = i.pmDesignator || "";
  const r = t.split(" ");
  if (r[0]) {
    if (r[0].indexOf("/") >= 0) {
      const o = r[0].split("/");
      o.length === 3 && (o[0].length === 4 ? e.date = o[0] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[2]).substr(-2) : o[2].length === 2 ? (n.indexOf("/d/") > -1 || n.indexOf("/dd/") > -1, e.date = "20" + o[2] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[0]).substr(-2)) : (t.toLowerCase().indexOf("pm") > -1 || t.toLowerCase().indexOf("p.m.") > -1 || t.toLowerCase().indexOf("p. m.") > -1 || t.toLowerCase().indexOf("am") > -1 || t.toLowerCase().indexOf("a.m.") > -1 || t.toLowerCase().indexOf("a. m.") > -1 || n.indexOf("/d/") > -1 || n.indexOf("/dd/") > -1) && n.indexOf("dd/") !== 0 ? e.date = o[2] + "-" + ("0" + o[0]).substr(-2) + "-" + ("0" + o[1]).substr(-2) : e.date = o[2] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[0]).substr(-2));
    }
    if (r[0].indexOf(".") >= 0) {
      const o = r[0].split(".");
      o.length === 3 && (n.indexOf(".d.") > -1 || n.indexOf(".dd.") > -1 ? e.date = o[2] + "-" + ("0" + o[0]).substr(-2) + "-" + ("0" + o[1]).substr(-2) : e.date = o[2] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[0]).substr(-2));
    }
    if (r[0].indexOf("-") >= 0) {
      const o = r[0].split("-");
      o.length === 3 && (e.date = o[0] + "-" + ("0" + o[1]).substr(-2) + "-" + ("0" + o[2]).substr(-2));
    }
  }
  if (r[1]) {
    r.shift();
    let o = r.join(" ");
    e.time = Wo(o, s);
  }
  return e;
}
function Go(t, i) {
  let e = i > 0, n = 1, s = 0, r = 0, o = [];
  for (let l = 0; l < t.length; l++)
    n <= i ? (/\s/.test(t[l]) && !e && (r = l - 1, o.push({
      from: s,
      to: r + 1,
      cap: t.substring(s, r + 1)
    }), s = r + 2, n++), e = t[l] === " ") : (!/\s/.test(t[l]) && e && (r = l - 1, s < r && o.push({
      from: s,
      to: r,
      cap: t.substring(s, r)
    }), s = r + 1, n++), e = t[l] === " ");
  r = 5e3, o.push({
    from: s,
    to: r,
    cap: t.substring(s, r)
  });
  let a = o.length;
  for (let l = 0; l < a; l++)
    o[l].cap.replace(/\s/g, "").length === 0 && l + 1 < a && (o[l].to = o[l + 1].to, o[l].cap = o[l].cap + o[l + 1].cap, o.splice(l + 1, 1), a = a - 1);
  return o;
}
function Uo(t, i, e) {
  for (let n = 0; n < t.length; n++)
    if (t[n][i] === e)
      return n;
  return -1;
}
function $o() {
  if (Hi = "powershell.exe", Qi) {
    const t = `${Zn}\\system32\\WindowsPowerShell\\v1.0\\powershell.exe`;
    ke.existsSync(t) && (Hi = t);
  }
}
function Os() {
  if (Qe.type() === "Windows_NT" && !Pt && (Pt = Zn + "\\system32\\wbem\\wmic.exe", !ke.existsSync(Pt)))
    try {
      const t = Qt("WHERE WMIC", Oi).toString().split(`\r
`);
      t && t.length ? Pt = t[0] : Pt = "wmic";
    } catch {
      Pt = "wmic";
    }
  return Pt;
}
function zo(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      try {
        Ps(Os() + " " + t).then((e) => {
          i(e, "");
        });
      } catch (e) {
        i("", e);
      }
    });
  });
}
function Ho() {
  return Qi ? `"${process.env.VBOX_INSTALL_PATH || process.env.VBOX_MSI_INSTALL_PATH}\\VBoxManage.exe"` : "vboxmanage";
}
function wn(t) {
  let i = "", e, n = "";
  if (t.indexOf(Un) >= 0) {
    e = t.split(Un);
    const r = e[1].split($n);
    i = r[0], r.length > 1 && (t = r.slice(1).join($n));
  }
  t.indexOf(qi) >= 0 && (e = t.split(qi), n = e[0]);
  let s = -1;
  for (let r = 0; r < di.length; r++)
    di[r].id === i && (s = r, di[r].callback(n));
  s >= 0 && di.splice(s, 1);
}
function qo() {
  pe || (pe = Jn(Hi, ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-Command", "-"], {
    stdio: "pipe",
    windowsHide: !0,
    maxBuffer: 1024 * 2e4,
    encoding: "UTF-8",
    env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
  }), pe && pe.pid && (er = !0, pe.stdout.on("data", function(t) {
    Wt = Wt + t.toString("utf8"), t.indexOf(qi) >= 0 && (wn(Wt), Wt = "");
  }), pe.stderr.on("data", function() {
    wn(Wt + Lr);
  }), pe.on("error", function() {
    wn(Wt + Lr);
  }), pe.on("close", function() {
    pe && pe.kill();
  })));
}
function jo() {
  try {
    pe && (pe.stdin.write("exit" + Qe.EOL), pe.stdin.end(), er = !1);
  } catch {
    pe && pe.kill();
  }
  pe = null;
}
function Ps(t) {
  if (er) {
    const i = Math.random().toString(36).substring(2, 12);
    return new Promise((e) => {
      process.nextTick(() => {
        function n(s) {
          e(s);
        }
        di.push({
          id: i,
          cmd: t,
          callback: n,
          start: /* @__PURE__ */ new Date()
        });
        try {
          pe && pe.pid && pe.stdin.write(vr + "echo " + Un + i + $n + "; " + Qe.EOL + t + Qe.EOL + "echo " + qi + Qe.EOL);
        } catch {
          e("");
        }
      });
    });
  } else {
    let i = "";
    return new Promise((e) => {
      process.nextTick(() => {
        try {
          const n = Jn(Hi, ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-ExecutionPolicy", "Unrestricted", "-Command", "-"], {
            stdio: "pipe",
            windowsHide: !0,
            maxBuffer: 2048e4,
            encoding: "UTF-8",
            env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
          });
          if (n && !n.pid && n.on("error", function() {
            e(i);
          }), n && n.pid) {
            n.stdout.on("data", function(s) {
              i = i + s.toString("utf8");
            }), n.stderr.on("data", function() {
              n.kill(), e(i);
            }), n.on("close", function() {
              n.kill(), e(i);
            }), n.on("error", function() {
              n.kill(), e(i);
            });
            try {
              n.stdin.write(vr + t + Qe.EOL), n.stdin.write("exit" + Qe.EOL), n.stdin.end();
            } catch {
              n.kill(), e(i);
            }
          } else
            e(i);
        } catch {
          e(i);
        }
      });
    });
  }
}
function Xo(t, i, e) {
  let n = "";
  return e = e || {}, new Promise((s) => {
    process.nextTick(() => {
      try {
        const r = Jn(t, i, e);
        r && !r.pid && r.on("error", function() {
          s(n);
        }), r && r.pid ? (r.stdout.on("data", function(o) {
          n += o.toString();
        }), r.on("close", function() {
          r.kill(), s(n);
        }), r.on("error", function() {
          r.kill(), s(n);
        })) : s(n);
      } catch {
        s(n);
      }
    });
  });
}
function Ko() {
  if (Qi) {
    if (!De)
      try {
        const e = Qt("chcp", Oi).toString().split(`\r
`)[0].split(":");
        De = e.length > 1 ? e[1].replace(".", "").trim() : "";
      } catch {
        De = "437";
      }
    return De;
  }
  if (Qn || ys || xs || Ss || ws) {
    if (!De)
      try {
        const e = Qt("echo $LANG", Zi).toString().split(`\r
`)[0].split(".");
        De = e.length > 1 ? e[1].trim() : "", De || (De = "UTF-8");
      } catch {
        De = "UTF-8";
      }
    return De;
  }
}
function Yo() {
  if (Xe !== null)
    return Xe;
  if (Xe = !1, Qi)
    try {
      const t = Qt("WHERE smartctl 2>nul", Oi).toString().split(`\r
`);
      t && t.length ? Xe = t[0].indexOf(":\\") >= 0 : Xe = !1;
    } catch {
      Xe = !1;
    }
  if (Qn || ys || xs || Ss || ws)
    try {
      Xe = Qt("which smartctl 2>/dev/null", Zi).toString().split(`\r
`).length > 0;
    } catch {
      Eo.noop();
    }
  return Xe;
}
function Jo(t) {
  const i = [
    "BCM2708",
    "BCM2709",
    "BCM2710",
    "BCM2711",
    "BCM2712",
    "BCM2835",
    "BCM2836",
    "BCM2837",
    "BCM2837B0"
  ];
  if (Ve !== null)
    t = Ve;
  else if (t === void 0)
    try {
      t = ke.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split(`
`), Ve = t;
    } catch {
      return !1;
    }
  const e = Ze(t, "hardware"), n = Ze(t, "model");
  return e && i.indexOf(e) > -1 || n && n.indexOf("Raspberry Pi") > -1;
}
function Qo() {
  let t = [];
  try {
    t = ke.readFileSync("/etc/os-release", { encoding: "utf8" }).toString().split(`
`);
  } catch {
    return !1;
  }
  const i = Ze(t, "id", "=");
  return i && i.indexOf("raspbian") > -1;
}
function Zo(t, i, e) {
  e || (e = i, i = Oi);
  let n = "chcp 65001 > nul && cmd /C " + t + " && chcp " + De + " > nul";
  Ao(n, i, function(s, r) {
    e(s, r);
  });
}
function ea() {
  const t = ke.existsSync("/Library/Developer/CommandLineTools/usr/bin/"), i = ke.existsSync("/Applications/Xcode.app/Contents/Developer/Tools"), e = ke.existsSync("/Library/Developer/Xcode/");
  return t || e || i;
}
function ta() {
  const t = process.hrtime();
  return !Array.isArray(t) || t.length !== 2 ? 0 : +t[0] * 1e9 + +t[1];
}
function ia(t, i) {
  i = i || "";
  const e = [];
  return t.forEach((n) => {
    n.startsWith(i) && e.indexOf(n) === -1 && e.push(n);
  }), e.length;
}
function na(t, i) {
  i = i || "";
  const e = [];
  return t.forEach((n) => {
    n.startsWith(i) && e.push(n);
  }), e.length;
}
function ra(t, i) {
  typeof i > "u" && (i = !1);
  const e = t || "";
  let n = "";
  const s = _s(e.length, 2e3);
  for (let r = 0; r <= s; r++)
    e[r] === void 0 || e[r] === ">" || e[r] === "<" || e[r] === "*" || e[r] === "?" || e[r] === "[" || e[r] === "]" || e[r] === "|" || e[r] === "˚" || e[r] === "$" || e[r] === ";" || e[r] === "&" || e[r] === "]" || e[r] === "#" || e[r] === "\\" || e[r] === "	" || e[r] === `
` || e[r] === "\r" || e[r] === "'" || e[r] === "`" || e[r] === '"' || e[r].length > 1 || i && e[r] === "(" || i && e[r] === ")" || i && e[r] === "@" || i && e[r] === " " || i && e[r] == "{" || i && e[r] == ";" || i && e[r] == "}" || (n = n + e[r]);
  return n;
}
function sa() {
  const t = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let i = !0, e = "";
  try {
    e.__proto__.replace = zn, e.__proto__.toLowerCase = Hn, e.__proto__.toString = Cs, e.__proto__.substr = vs, e.__proto__.substring = Ls, e.__proto__.trim = bs, e.__proto__.startsWith = Is;
  } catch {
    Object.setPrototypeOf(e, Gi);
  }
  i = i || t.length !== 62;
  const n = Date.now();
  if (typeof n == "number" && n > 16e11) {
    const s = n % 100 + 15;
    for (let c = 0; c < s; c++) {
      const u = Math.random() * 61.99999999 + 1, f = parseInt(Math.floor(u).toString(), 10), p = parseInt(u.toString().split(".")[0], 10), d = Math.random() * 61.99999999 + 1, m = parseInt(Math.floor(d).toString(), 10), h = parseInt(d.toString().split(".")[0], 10);
      i = i && u !== d, i = i && f === p && m === h, e += t[f - 1];
    }
    i = i && e.length === s;
    let r = Math.random() * s * 0.9999999999, o = e.substr(0, r) + " " + e.substr(r, 2e3);
    try {
      o.__proto__.replace = zn;
    } catch {
      Object.setPrototypeOf(o, Gi);
    }
    let a = o.replace(/ /g, "");
    i = i && e === a, r = Math.random() * s * 0.9999999999, o = e.substr(0, r) + "{" + e.substr(r, 2e3), a = o.replace(/{/g, ""), i = i && e === a, r = Math.random() * s * 0.9999999999, o = e.substr(0, r) + "*" + e.substr(r, 2e3), a = o.replace(/\*/g, ""), i = i && e === a, r = Math.random() * s * 0.9999999999, o = e.substr(0, r) + "$" + e.substr(r, 2e3), a = o.replace(/\$/g, ""), i = i && e === a;
    const l = e.toLowerCase();
    i = i && l.length === s && l[s - 1] && !l[s];
    for (let c = 0; c < s; c++) {
      const u = e[c];
      try {
        u.__proto__.toLowerCase = Hn;
      } catch {
        Object.setPrototypeOf(e, Gi);
      }
      const f = l ? l[c] : "", p = u.toLowerCase();
      i = i && p[0] === f && p[0] && !p[1];
    }
  }
  return !i;
}
function oa(t) {
  return ("00000000" + parseInt(t, 16).toString(2)).substr(-8);
}
function aa(t) {
  const i = ke.lstatSync, e = ke.readdirSync, n = Po.join;
  function s(c) {
    return i(c).isDirectory();
  }
  function r(c) {
    return i(c).isFile();
  }
  function o(c) {
    return e(c).map(function(u) {
      return n(c, u);
    }).filter(s);
  }
  function a(c) {
    return e(c).map(function(u) {
      return n(c, u);
    }).filter(r);
  }
  function l(c) {
    try {
      return o(c).map(function(p) {
        return l(p);
      }).reduce(function(p, d) {
        return p.concat(d);
      }, []).concat(a(c));
    } catch {
      return [];
    }
  }
  return ke.existsSync(t) ? l(t) : [];
}
function As(t) {
  Ve === null ? Ve = t : t === void 0 && (t = Ve);
  const i = {
    "0002": {
      type: "B",
      revision: "1.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0003": {
      type: "B",
      revision: "1.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0004": {
      type: "B",
      revision: "2.0",
      memory: 256,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0005": {
      type: "B",
      revision: "2.0",
      memory: 256,
      manufacturer: "Qisda",
      processor: "BCM2835"
    },
    "0006": {
      type: "B",
      revision: "2.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0007": {
      type: "A",
      revision: "2.0",
      memory: 256,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0008": {
      type: "A",
      revision: "2.0",
      memory: 256,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0009": {
      type: "A",
      revision: "2.0",
      memory: 256,
      manufacturer: "Qisda",
      processor: "BCM2835"
    },
    "000d": {
      type: "B",
      revision: "2.0",
      memory: 512,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "000e": {
      type: "B",
      revision: "2.0",
      memory: 512,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "000f": {
      type: "B",
      revision: "2.0",
      memory: 512,
      manufacturer: "Egoman",
      processor: "BCM2835"
    },
    "0010": {
      type: "B+",
      revision: "1.2",
      memory: 512,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0011": {
      type: "CM1",
      revision: "1.0",
      memory: 512,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0012": {
      type: "A+",
      revision: "1.1",
      memory: 256,
      manufacturer: "Sony UK",
      processor: "BCM2835"
    },
    "0013": {
      type: "B+",
      revision: "1.2",
      memory: 512,
      manufacturer: "Embest",
      processor: "BCM2835"
    },
    "0014": {
      type: "CM1",
      revision: "1.0",
      memory: 512,
      manufacturer: "Embest",
      processor: "BCM2835"
    },
    "0015": {
      type: "A+",
      revision: "1.1",
      memory: 256,
      manufacturer: "512MB	Embest",
      processor: "BCM2835"
    }
  }, e = [
    "BCM2835",
    "BCM2836",
    "BCM2837",
    "BCM2711",
    "BCM2712"
  ], n = [
    "Sony UK",
    "Egoman",
    "Embest",
    "Sony Japan",
    "Embest",
    "Stadium"
  ], s = {
    "00": "A",
    "01": "B",
    "02": "A+",
    "03": "B+",
    "04": "2B",
    "05": "Alpha (early prototype)",
    "06": "CM1",
    "08": "3B",
    "09": "Zero",
    "0a": "CM3",
    "0c": "Zero W",
    "0d": "3B+",
    "0e": "3A+",
    "0f": "Internal use only",
    10: "CM3+",
    11: "4B",
    12: "Zero 2 W",
    13: "400",
    14: "CM4",
    15: "CM4S",
    16: "Internal use only",
    17: "5",
    18: "CM5",
    19: "500",
    "1a": "CM5 Lite"
  }, r = Ze(t, "revision", ":", !0), o = Ze(t, "model:", ":", !0), a = Ze(t, "serial", ":", !0);
  let l = {};
  if ({}.hasOwnProperty.call(i, r))
    l = {
      model: o,
      serial: a,
      revisionCode: r,
      memory: i[r].memory,
      manufacturer: i[r].manufacturer,
      processor: i[r].processor,
      type: i[r].type,
      revision: i[r].revision
    };
  else {
    const c = ("00000000" + Ze(t, "revision", ":", !0).toLowerCase()).substr(-8), u = parseInt(oa(c.substr(2, 1)).substr(5, 3), 2) || 0, f = n[parseInt(c.substr(3, 1), 10)], p = e[parseInt(c.substr(4, 1), 10)], d = c.substr(5, 2);
    l = {
      model: o,
      serial: a,
      revisionCode: r,
      memory: 256 * Math.pow(2, u),
      manufacturer: f,
      processor: p,
      type: {}.hasOwnProperty.call(s, d) ? s[d] : "",
      revision: "1." + c.substr(7, 1)
    };
  }
  return l;
}
function ca(t) {
  if (Ve === null && t !== void 0)
    Ve = t;
  else if (t === void 0 && Ve !== null)
    t = Ve;
  else
    try {
      t = ke.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split(`
`), Ve = t;
    } catch {
      return !1;
    }
  const i = As(t);
  return i.type === "4B" || i.type === "CM4" || i.type === "CM4S" || i.type === "400" ? "VideoCore VI" : i.type === "5" || i.type === "500" ? "VideoCore VII" : "VideoCore IV";
}
function la(t) {
  const i = t.map(function(s) {
    return new Promise(function(r) {
      let o = new Array(2);
      s.then(function(a) {
        o[0] = a;
      }).catch(function(a) {
        o[1] = a;
      }).then(function() {
        r(o);
      });
    });
  }), e = [], n = [];
  return Promise.all(i).then(function(s) {
    return s.forEach(function(r) {
      r[1] ? (e.push(r[1]), n.push(null)) : (e.push(null), n.push(r[0]));
    }), {
      errors: e,
      results: n
    };
  });
}
function ua(t) {
  return function() {
    const i = Array.prototype.slice.call(arguments);
    return new Promise(function(e, n) {
      i.push(function(s, r) {
        s ? n(s) : e(r);
      }), t.apply(null, i);
    });
  };
}
function pa(t) {
  return function() {
    const i = Array.prototype.slice.call(arguments);
    return new Promise(function(e) {
      i.push(function(n, s) {
        e(s);
      }), t.apply(null, i);
    });
  };
}
function fa() {
  let t = "";
  if (Qn)
    try {
      t = Qt("uname -v", Zi).toString();
    } catch {
      t = "";
    }
  return t;
}
function da(t) {
  const i = ["array", "dict", "key", "string", "integer", "date", "real", "data", "boolean", "arrayEmpty"];
  let n = t.indexOf("<plist version"), s = t.length;
  for (; t[n] !== ">" && n < s; )
    n++;
  let r = 0, o = !1, a = !1, l = !1, c = [{ tagStart: "", tagEnd: "", tagContent: "", key: "", data: null }], u = "", f = t[n];
  for (; n < s; )
    u = f, n + 1 < s && (f = t[n + 1]), u === "<" ? (a = !1, f === "/" ? l = !0 : c[r].tagStart ? (c[r].tagContent = "", c[r].data || (c[r].data = c[r].tagStart === "array" ? [] : {}), r++, c.push({ tagStart: "", tagEnd: "", tagContent: "", key: null, data: null }), o = !0, a = !1) : o || (o = !0)) : u === ">" ? (c[r].tagStart === "true/" && (o = !1, l = !0, c[r].tagStart = "", c[r].tagEnd = "/boolean", c[r].data = !0), c[r].tagStart === "false/" && (o = !1, l = !0, c[r].tagStart = "", c[r].tagEnd = "/boolean", c[r].data = !1), c[r].tagStart === "array/" && (o = !1, l = !0, c[r].tagStart = "", c[r].tagEnd = "/arrayEmpty", c[r].data = []), a && (a = !1), o && (o = !1, a = !0, c[r].tagStart === "array" && (c[r].data = []), c[r].tagStart === "dict" && (c[r].data = {})), l && (l = !1, c[r].tagEnd && i.indexOf(c[r].tagEnd.substr(1)) >= 0 && (c[r].tagEnd === "/dict" || c[r].tagEnd === "/array" ? (r > 1 && c[r - 2].tagStart === "array" && c[r - 2].data.push(c[r - 1].data), r > 1 && c[r - 2].tagStart === "dict" && (c[r - 2].data[c[r - 1].key] = c[r - 1].data), r--, c.pop(), c[r].tagContent = "", c[r].tagStart = "", c[r].tagEnd = "") : (c[r].tagEnd === "/key" && c[r].tagContent ? c[r].key = c[r].tagContent : (c[r].tagEnd === "/real" && c[r].tagContent && (c[r].data = parseFloat(c[r].tagContent) || 0), c[r].tagEnd === "/integer" && c[r].tagContent && (c[r].data = parseInt(c[r].tagContent) || 0), c[r].tagEnd === "/string" && c[r].tagContent && (c[r].data = c[r].tagContent || ""), c[r].tagEnd === "/boolean" && (c[r].data = c[r].tagContent || !1), c[r].tagEnd === "/arrayEmpty" && (c[r].data = c[r].tagContent || []), r > 0 && c[r - 1].tagStart === "array" && c[r - 1].data.push(c[r].data), r > 0 && c[r - 1].tagStart === "dict" && (c[r - 1].data[c[r].key] = c[r].data)), c[r].tagContent = "", c[r].tagStart = "", c[r].tagEnd = "")), c[r].tagEnd = "", o = !1, a = !1)) : (o && (c[r].tagStart += u), l && (c[r].tagEnd += u), a && (c[r].tagContent += u)), n++;
  return c[0].data;
}
function br(t) {
  return typeof t == "string" && !isNaN(t) && !isNaN(parseFloat(t));
}
function ma(t) {
  const i = t.split(`
`);
  for (let n = 0; n < i.length; n++) {
    if (i[n].indexOf(" = ") >= 0) {
      const s = i[n].split(" = ");
      if (s[0] = s[0].trim(), s[0].startsWith('"') || (s[0] = '"' + s[0] + '"'), s[1] = s[1].trim(), s[1].indexOf('"') === -1 && s[1].endsWith(";")) {
        const r = s[1].substring(0, s[1].length - 1);
        br(r) || (s[1] = `"${r}";`);
      }
      if (s[1].indexOf('"') >= 0 && s[1].endsWith(";")) {
        const r = s[1].substring(0, s[1].length - 1).replace(/"/g, "");
        br(r) && (s[1] = `${r};`);
      }
      i[n] = s.join(" : ");
    }
    i[n] = i[n].replace(/\(/g, "[").replace(/\)/g, "]").replace(/;/g, ",").trim(), i[n].startsWith("}") && i[n - 1] && i[n - 1].endsWith(",") && (i[n - 1] = i[n - 1].substring(0, i[n - 1].length - 1));
  }
  t = i.join("");
  let e = {};
  try {
    e = JSON.parse(t);
  } catch {
  }
  return e;
}
function ha(t, i) {
  let e = 0;
  const n = t.split("."), s = i.split(".");
  return n[0] < s[0] ? e = 1 : n[0] > s[0] ? e = -1 : n[0] === s[0] && n.length >= 2 && s.length >= 2 && (n[1] < s[1] ? e = 1 : n[1] > s[1] ? e = -1 : n[1] === s[1] && (n.length >= 3 && s.length >= 3 ? n[2] < s[2] ? e = 1 : n[2] > s[2] && (e = -1) : s.length >= 3 && (e = 1))), e;
}
function ga(t) {
  const e = [
    {
      key: "Mac15,12",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M3",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac14,15",
      name: "MacBook Air",
      size: "15-inch",
      processor: "M2",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac14,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M2",
      year: "2022",
      additional: ""
    },
    {
      key: "MacBookAir10,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "M1",
      year: "2020",
      additional: ""
    },
    {
      key: "MacBookAir9,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: ""
    },
    {
      key: "MacBookAir8,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookAir8,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2018",
      additional: ""
    },
    {
      key: "MacBookAir7,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "MacBookAir7,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBookAir7,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBookAir6,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Early 2014",
      additional: ""
    },
    {
      key: "MacBookAir6,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Early 2014",
      additional: ""
    },
    {
      key: "MacBookAir6,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2013",
      additional: ""
    },
    {
      key: "MacBookAir6,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2013",
      additional: ""
    },
    {
      key: "MacBookAir5,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookAir5,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookAir4,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "MacBookAir4,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "MacBookAir3,2",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Late 2010",
      additional: ""
    },
    {
      key: "MacBookAir3,1",
      name: "MacBook Air",
      size: "11-inch",
      processor: "",
      year: "Late 2010",
      additional: ""
    },
    {
      key: "MacBookAir2,1",
      name: "MacBook Air",
      size: "13-inch",
      processor: "",
      year: "Mid 2009",
      additional: ""
    },
    {
      key: "Mac16,1",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,6",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4 Pro",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,8",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M4 Max",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,5",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M4 Pro",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,6",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M4 Max",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac15,3",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,6",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,8",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,10",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M3 Max",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,7",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,9",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Pro",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac15,11",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M3 Max",
      year: "Nov 2023",
      additional: ""
    },
    {
      key: "Mac14,5",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,9",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,6",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,10",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M2 Max",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,7",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "M2",
      year: "2022",
      additional: ""
    },
    {
      key: "MacBookPro18,3",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M1 Pro",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro18,4",
      name: "MacBook Pro",
      size: "14-inch",
      processor: "M1 Max",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro18,1",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M1 Pro",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro18,2",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "M1 Max",
      year: "2021",
      additional: ""
    },
    {
      key: "MacBookPro17,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "M1",
      year: "2020",
      additional: ""
    },
    {
      key: "MacBookPro16,3",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro16,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2020",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro16,1",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro16,4",
      name: "MacBook Pro",
      size: "16-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacBookPro15,4",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2019",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro15,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2018",
      additional: ""
    },
    {
      key: "MacBookPro15,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2018",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro14,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro14,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2017",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro14,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "MacBookPro13,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2016",
      additional: "Two Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro13,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "2016",
      additional: "Four Thunderbolt 3 ports"
    },
    {
      key: "MacBookPro13,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "2016",
      additional: ""
    },
    {
      key: "MacBookPro11,4",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2015",
      additional: ""
    },
    {
      key: "MacBookPro11,5",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2015",
      additional: ""
    },
    {
      key: "MacBookPro12,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBookPro11,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacBookPro11,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacBookPro11,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacBookPro10,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookPro10,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "MacBookPro9,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookPro9,2",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacBookPro8,3",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Early 2011",
      additional: ""
    },
    {
      key: "MacBookPro8,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Early 2011",
      additional: ""
    },
    {
      key: "MacBookPro8,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Early 2011",
      additional: ""
    },
    {
      key: "MacBookPro6,1",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBookPro6,2",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBookPro7,1",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBookPro5,2",
      name: "MacBook Pro",
      size: "17-inch",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "MacBookPro5,3",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Mid 2009",
      additional: ""
    },
    {
      key: "MacBookPro5,5",
      name: "MacBook Pro",
      size: "13-inch",
      processor: "",
      year: "Mid 2009",
      additional: ""
    },
    {
      key: "MacBookPro5,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Late 2008",
      additional: ""
    },
    {
      key: "MacBookPro4,1",
      name: "MacBook Pro",
      size: "15-inch",
      processor: "",
      year: "Early 2008",
      additional: ""
    },
    {
      key: "MacBook10,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "MacBook9,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "Early 2016",
      additional: ""
    },
    {
      key: "MacBook8,1",
      name: "MacBook",
      size: "12-inch",
      processor: "",
      year: "Early 2015",
      additional: ""
    },
    {
      key: "MacBook7,1",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacBook6,1",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Late 2009",
      additional: ""
    },
    {
      key: "MacBook5,2",
      name: "MacBook",
      size: "13-inch",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "Mac14,13",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,14",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac13,1",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2022",
      additional: ""
    },
    {
      key: "Mac13,2",
      name: "Mac Studio",
      size: "",
      processor: "",
      year: "2022",
      additional: ""
    },
    {
      key: "Mac16,11",
      name: "Mac mini",
      size: "",
      processor: "M4 Pro",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac16,10",
      name: "Mac mini",
      size: "",
      processor: "M4",
      year: "2024",
      additional: ""
    },
    {
      key: "Mac14,3",
      name: "Mac mini",
      size: "",
      processor: "M2",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,12",
      name: "Mac mini",
      size: "",
      processor: "M2 Pro",
      year: "2023",
      additional: ""
    },
    {
      key: "Macmini9,1",
      name: "Mac mini",
      size: "",
      processor: "M1",
      year: "2020",
      additional: ""
    },
    {
      key: "Macmini8,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2018",
      additional: ""
    },
    {
      key: "Macmini7,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2014",
      additional: ""
    },
    {
      key: "Macmini6,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "Macmini6,2",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "Macmini5,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "Macmini5,2",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "Macmini4,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "Macmini3,1",
      name: "Mac mini",
      size: "",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "Mac16,3",
      name: "iMac",
      size: "24-inch",
      processor: "M4",
      year: "2024",
      additional: "Four ports"
    },
    {
      key: "Mac16,2",
      name: "iMac",
      size: "24-inch",
      processor: "M4",
      year: "2024",
      additional: "Two ports"
    },
    {
      key: "Mac15,5",
      name: "iMac",
      size: "24-inch",
      processor: "M3",
      year: "2023",
      additional: "Four ports"
    },
    {
      key: "Mac15,4",
      name: "iMac",
      size: "24-inch",
      processor: "M3",
      year: "2023",
      additional: "Two ports"
    },
    {
      key: "iMac21,1",
      name: "iMac",
      size: "24-inch",
      processor: "M1",
      year: "2021",
      additional: ""
    },
    {
      key: "iMac21,2",
      name: "iMac",
      size: "24-inch",
      processor: "M1",
      year: "2021",
      additional: ""
    },
    {
      key: "iMac20,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2020",
      additional: "Retina 5K"
    },
    {
      key: "iMac20,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2020",
      additional: "Retina 5K"
    },
    {
      key: "iMac19,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2019",
      additional: "Retina 5K"
    },
    {
      key: "iMac19,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2019",
      additional: "Retina 4K"
    },
    {
      key: "iMacPro1,1",
      name: "iMac Pro",
      size: "",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "iMac18,3",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "2017",
      additional: "Retina 5K"
    },
    {
      key: "iMac18,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2017",
      additional: "Retina 4K"
    },
    {
      key: "iMac18,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "2017",
      additional: ""
    },
    {
      key: "iMac17,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2015",
      additional: "Retina 5K"
    },
    {
      key: "iMac16,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2015",
      additional: "Retina 4K"
    },
    {
      key: "iMac16,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2015",
      additional: ""
    },
    {
      key: "iMac15,1",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2014",
      additional: "Retina 5K"
    },
    {
      key: "iMac14,4",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2014",
      additional: ""
    },
    {
      key: "iMac14,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "iMac14,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "iMac13,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "iMac13,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2012",
      additional: ""
    },
    {
      key: "iMac12,2",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "iMac12,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2011",
      additional: ""
    },
    {
      key: "iMac11,3",
      name: "iMac",
      size: "27-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "iMac11,2",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "iMac10,1",
      name: "iMac",
      size: "21.5-inch",
      processor: "",
      year: "Late 2009",
      additional: ""
    },
    {
      key: "iMac9,1",
      name: "iMac",
      size: "20-inch",
      processor: "",
      year: "Early 2009",
      additional: ""
    },
    {
      key: "Mac14,8",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2023",
      additional: ""
    },
    {
      key: "Mac14,8",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2023",
      additional: "Rack"
    },
    {
      key: "MacPro7,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2019",
      additional: ""
    },
    {
      key: "MacPro7,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "2019",
      additional: "Rack"
    },
    {
      key: "MacPro6,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Late 2013",
      additional: ""
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Mid 2012",
      additional: ""
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro Server",
      size: "",
      processor: "",
      year: "Mid 2012",
      additional: "Server"
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: ""
    },
    {
      key: "MacPro5,1",
      name: "Mac Pro Server",
      size: "",
      processor: "",
      year: "Mid 2010",
      additional: "Server"
    },
    {
      key: "MacPro4,1",
      name: "Mac Pro",
      size: "",
      processor: "",
      year: "Early 2009",
      additional: ""
    }
  ].filter((s) => s.key === t);
  if (e.length === 0)
    return {
      key: t,
      model: "Apple",
      version: "Unknown"
    };
  const n = [];
  return e[0].size && n.push(e[0].size), e[0].processor && n.push(e[0].processor), e[0].year && n.push(e[0].year), e[0].additional && n.push(e[0].additional), {
    key: t,
    model: e[0].name,
    version: e[0].name + " (" + n.join(", ") + ")"
  };
}
function ya(t, i = 5e3) {
  const e = t.startsWith("https:") || t.indexOf(":443/") > 0 || t.indexOf(":8443/") > 0 ? wo : Co, n = Date.now();
  return new Promise((s) => {
    const r = e.get(t, function(o) {
      o.on("data", () => {
      }), o.on("end", () => {
        s({
          url: t,
          statusCode: o.statusCode,
          message: o.statusMessage,
          time: Date.now() - n
        });
      });
    }).on("error", function(o) {
      s({
        url: t,
        statusCode: 404,
        message: o.message,
        time: Date.now() - n
      });
    }).setTimeout(i, () => {
      r.close(), s({
        url: t,
        statusCode: 408,
        message: "Request Timeout",
        time: Date.now() - n
      });
    });
  });
}
function xa(t) {
  return t.replace(/To Be Filled By O.E.M./g, "");
}
function Sa() {
}
T.toInt = Mo;
T.splitByNumber = To;
T.execOptsWin = Oi;
T.execOptsLinux = Zi;
T.getCodepage = Ko;
T.execWin = Zo;
T.isFunction = Do;
T.unique = Bo;
T.sortByKey = Vo;
T.cores = ko;
T.getValue = Ze;
T.decodeEscapeSequence = No;
T.parseDateTime = Ro;
T.parseHead = Go;
T.findObjectByKey = Uo;
T.getWmic = Os;
T.wmic = zo;
T.darwinXcodeExists = ea;
T.getVboxmanage = Ho;
T.powerShell = Ps;
T.powerShellStart = qo;
T.powerShellRelease = jo;
T.execSafe = Xo;
T.nanoSeconds = ta;
T.countUniqueLines = ia;
T.countLines = na;
T.noop = Sa;
T.isRaspberry = Jo;
T.isRaspbian = Qo;
T.sanitizeShellString = ra;
T.isPrototypePolluted = sa;
T.decodePiCpuinfo = As;
T.getRpiGpu = ca;
T.promiseAll = la;
T.promisify = ua;
T.promisifySave = pa;
T.smartMonToolsInstalled = Yo;
T.linuxVersion = fa;
T.plistParser = da;
T.plistReader = ma;
T.stringObj = Gi;
T.stringReplace = zn;
T.stringToLower = Hn;
T.stringToString = Cs;
T.stringSubstr = vs;
T.stringSubstring = Ls;
T.stringTrim = bs;
T.stringStartWith = Is;
T.mathMin = _s;
T.WINDIR = Zn;
T.getFilesInPath = aa;
T.semverCompare = ha;
T.getAppleModel = ga;
T.checkWebsite = ya;
T.cleanString = xa;
T.getPowershell = $o;
var Pi = {};
const Cn = Fe, Et = se, v = T, Zt = te.exec, jt = te.execSync, Mi = v.promisify(te.exec);
let it = process.platform;
const en = it === "linux" || it === "android", tn = it === "darwin", nn = it === "win32", Ci = it === "freebsd", vi = it === "openbsd", Li = it === "netbsd", rn = it === "sunos";
function wa(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        manufacturer: "",
        model: "Computer",
        version: "",
        serial: "-",
        uuid: "-",
        sku: "-",
        virtual: !1
      };
      if ((en || Ci || vi || Li) && Zt("export LC_ALL=C; dmidecode -t system 2>/dev/null; unset LC_ALL", function(n, s) {
        let r = s.toString().split(`
`);
        e.manufacturer = j(v.getValue(r, "manufacturer")), e.model = j(v.getValue(r, "product name")), e.version = j(v.getValue(r, "version")), e.serial = j(v.getValue(r, "serial number")), e.uuid = j(v.getValue(r, "uuid")).toLowerCase(), e.sku = j(v.getValue(r, "sku number"));
        const o = `echo -n "product_name: "; cat /sys/devices/virtual/dmi/id/product_name 2>/dev/null; echo;
            echo -n "product_serial: "; cat /sys/devices/virtual/dmi/id/product_serial 2>/dev/null; echo;
            echo -n "product_uuid: "; cat /sys/devices/virtual/dmi/id/product_uuid 2>/dev/null; echo;
            echo -n "product_version: "; cat /sys/devices/virtual/dmi/id/product_version 2>/dev/null; echo;
            echo -n "sys_vendor: "; cat /sys/devices/virtual/dmi/id/sys_vendor 2>/dev/null; echo;`;
        try {
          r = jt(o, v.execOptsLinux).toString().split(`
`), e.manufacturer = j(e.manufacturer === "" ? v.getValue(r, "sys_vendor") : e.manufacturer), e.model = j(e.model === "" ? v.getValue(r, "product_name") : e.model), e.version = j(e.version === "" ? v.getValue(r, "product_version") : e.version), e.serial = j(e.serial === "" ? v.getValue(r, "product_serial") : e.serial), e.uuid = j(e.uuid === "" ? v.getValue(r, "product_uuid").toLowerCase() : e.uuid);
        } catch {
          v.noop();
        }
        if (e.serial || (e.serial = "-"), e.manufacturer || (e.manufacturer = ""), e.model || (e.model = "Computer"), e.version || (e.version = ""), e.sku || (e.sku = "-"), e.model.toLowerCase() === "virtualbox" || e.model.toLowerCase() === "kvm" || e.model.toLowerCase() === "virtual machine" || e.model.toLowerCase() === "bochs" || e.model.toLowerCase().startsWith("vmware") || e.model.toLowerCase().startsWith("droplet"))
          switch (e.virtual = !0, e.model.toLowerCase()) {
            case "virtualbox":
              e.virtualHost = "VirtualBox";
              break;
            case "vmware":
              e.virtualHost = "VMware";
              break;
            case "kvm":
              e.virtualHost = "KVM";
              break;
            case "bochs":
              e.virtualHost = "bochs";
              break;
          }
        if (e.manufacturer.toLowerCase().startsWith("vmware") || e.manufacturer.toLowerCase() === "xen")
          switch (e.virtual = !0, e.manufacturer.toLowerCase()) {
            case "vmware":
              e.virtualHost = "VMware";
              break;
            case "xen":
              e.virtualHost = "Xen";
              break;
          }
        if (!e.virtual)
          try {
            const a = jt("ls -1 /dev/disk/by-id/ 2>/dev/null", v.execOptsLinux).toString();
            a.indexOf("_QEMU_") >= 0 && (e.virtual = !0, e.virtualHost = "QEMU"), a.indexOf("_VBOX_") >= 0 && (e.virtual = !0, e.virtualHost = "VirtualBox");
          } catch {
            v.noop();
          }
        if (!e.virtual && (Et.release().toLowerCase().indexOf("microsoft") >= 0 || Et.release().toLowerCase().endsWith("wsl2"))) {
          const a = parseFloat(Et.release().toLowerCase());
          e.virtual = !0, e.manufacturer = "Microsoft", e.model = "WSL", e.version = a < 4.19 ? "1" : "2";
        }
        if ((Ci || vi || Li) && !e.virtualHost)
          try {
            const l = jt("dmidecode -t 4", v.execOptsLinux).toString().split(`
`);
            switch (v.getValue(l, "manufacturer", ":", !0).toLowerCase()) {
              case "virtualbox":
                e.virtualHost = "VirtualBox";
                break;
              case "vmware":
                e.virtualHost = "VMware";
                break;
              case "kvm":
                e.virtualHost = "KVM";
                break;
              case "bochs":
                e.virtualHost = "bochs";
                break;
            }
          } catch {
            v.noop();
          }
        (Cn.existsSync("/.dockerenv") || Cn.existsSync("/.dockerinit")) && (e.model = "Docker Container");
        try {
          const a = jt('dmesg 2>/dev/null | grep -iE "virtual|hypervisor" | grep -iE "vmware|qemu|kvm|xen" | grep -viE "Nested Virtualization|/virtual/"');
          a.toString().split(`
`).length > 0 && (e.model === "Computer" && (e.model = "Virtual machine"), e.virtual = !0, a.toString().toLowerCase().indexOf("vmware") >= 0 && !e.virtualHost && (e.virtualHost = "VMware"), a.toString().toLowerCase().indexOf("qemu") >= 0 && !e.virtualHost && (e.virtualHost = "QEMU"), a.toString().toLowerCase().indexOf("xen") >= 0 && !e.virtualHost && (e.virtualHost = "Xen"), a.toString().toLowerCase().indexOf("kvm") >= 0 && !e.virtualHost && (e.virtualHost = "KVM"));
        } catch {
          v.noop();
        }
        e.manufacturer === "" && e.model === "Computer" && e.version === "" ? Cn.readFile("/proc/cpuinfo", function(a, l) {
          if (!a) {
            let c = l.toString().split(`
`);
            if (e.model = v.getValue(c, "hardware", ":", !0).toUpperCase(), e.version = v.getValue(c, "revision", ":", !0).toLowerCase(), e.serial = v.getValue(c, "serial", ":", !0), v.getValue(c, "model:", ":", !0), v.isRaspberry(c)) {
              const u = v.decodePiCpuinfo(c);
              e.model = u.model, e.version = u.revisionCode, e.manufacturer = "Raspberry Pi Foundation", e.raspberry = {
                manufacturer: u.manufacturer,
                processor: u.processor,
                type: u.type,
                revision: u.revision
              };
            }
          }
          t && t(e), i(e);
        }) : (t && t(e), i(e));
      }), tn && Zt("ioreg -c IOPlatformExpertDevice -d 2", function(n, s) {
        if (!n) {
          let r = s.toString().replace(/[<>"]/g, "").split(`
`);
          const o = v.getAppleModel(v.getValue(r, "model", "=", !0));
          e.manufacturer = v.getValue(r, "manufacturer", "=", !0), e.model = o.key, e.type = Es(o.version), e.version = o.version, e.serial = v.getValue(r, "ioplatformserialnumber", "=", !0), e.uuid = v.getValue(r, "ioplatformuuid", "=", !0).toLowerCase(), e.sku = v.getValue(r, "board-id", "=", !0) || v.getValue(r, "target-sub-type", "=", !0);
        }
        t && t(e), i(e);
      }), rn && (t && t(e), i(e)), nn)
        try {
          v.powerShell("Get-CimInstance Win32_ComputerSystemProduct | select Name,Vendor,Version,IdentifyingNumber,UUID | fl").then((n, s) => {
            if (s)
              t && t(e), i(e);
            else {
              let r = n.split(`\r
`);
              e.manufacturer = v.getValue(r, "vendor", ":"), e.model = v.getValue(r, "name", ":"), e.version = v.getValue(r, "version", ":"), e.serial = v.getValue(r, "identifyingnumber", ":"), e.uuid = v.getValue(r, "uuid", ":").toLowerCase();
              const o = e.model.toLowerCase();
              (o === "virtualbox" || o === "kvm" || o === "virtual machine" || o === "bochs" || o.startsWith("vmware") || o.startsWith("qemu") || o.startsWith("parallels")) && (e.virtual = !0, o.startsWith("virtualbox") && (e.virtualHost = "VirtualBox"), o.startsWith("vmware") && (e.virtualHost = "VMware"), o.startsWith("kvm") && (e.virtualHost = "KVM"), o.startsWith("bochs") && (e.virtualHost = "bochs"), o.startsWith("qemu") && (e.virtualHost = "KVM"), o.startsWith("parallels") && (e.virtualHost = "Parallels"));
              const a = e.manufacturer.toLowerCase();
              (a.startsWith("vmware") || a.startsWith("qemu") || a === "xen" || a.startsWith("parallels")) && (e.virtual = !0, a.startsWith("vmware") && (e.virtualHost = "VMware"), a.startsWith("xen") && (e.virtualHost = "Xen"), a.startsWith("qemu") && (e.virtualHost = "KVM"), a.startsWith("parallels") && (e.virtualHost = "Parallels")), v.powerShell('Get-CimInstance MS_Systeminformation -Namespace "root/wmi" | select systemsku | fl ').then((l, c) => {
                if (!c) {
                  let u = l.split(`\r
`);
                  e.sku = v.getValue(u, "systemsku", ":");
                }
                e.virtual ? (t && t(e), i(e)) : v.powerShell("Get-CimInstance Win32_bios | select Version, SerialNumber, SMBIOSBIOSVersion").then((u, f) => {
                  if (f)
                    t && t(e), i(e);
                  else {
                    let p = u.toString();
                    (p.indexOf("VRTUAL") >= 0 || p.indexOf("A M I ") >= 0 || p.indexOf("VirtualBox") >= 0 || p.indexOf("VMWare") >= 0 || p.indexOf("Xen") >= 0 || p.indexOf("Parallels") >= 0) && (e.virtual = !0, p.indexOf("VirtualBox") >= 0 && !e.virtualHost && (e.virtualHost = "VirtualBox"), p.indexOf("VMware") >= 0 && !e.virtualHost && (e.virtualHost = "VMware"), p.indexOf("Xen") >= 0 && !e.virtualHost && (e.virtualHost = "Xen"), p.indexOf("VRTUAL") >= 0 && !e.virtualHost && (e.virtualHost = "Hyper-V"), p.indexOf("A M I") >= 0 && !e.virtualHost && (e.virtualHost = "Virtual PC"), p.indexOf("Parallels") >= 0 && !e.virtualHost && (e.virtualHost = "Parallels")), t && t(e), i(e);
                  }
                });
              });
            }
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}
Pi.system = wa;
function j(t) {
  const i = t.toLowerCase();
  return i.indexOf("o.e.m.") === -1 && i.indexOf("default string") === -1 && i !== "default" && t || "";
}
function Ca(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        vendor: "",
        version: "",
        releaseDate: "",
        revision: ""
      }, n = "";
      if ((en || Ci || vi || Li) && (process.arch === "arm" ? n = "cat /proc/cpuinfo | grep Serial" : n = "export LC_ALL=C; dmidecode -t bios 2>/dev/null; unset LC_ALL", Zt(n, function(s, r) {
        let o = r.toString().split(`
`);
        e.vendor = v.getValue(o, "Vendor"), e.version = v.getValue(o, "Version");
        let a = v.getValue(o, "Release Date");
        e.releaseDate = v.parseDateTime(a).date, e.revision = v.getValue(o, "BIOS Revision"), e.serial = v.getValue(o, "SerialNumber");
        let l = v.getValue(o, "Currently Installed Language").split("|")[0];
        if (l && (e.language = l), o.length && r.toString().indexOf("Characteristics:") >= 0) {
          const u = [];
          o.forEach((f) => {
            if (f.indexOf(" is supported") >= 0) {
              const p = f.split(" is supported")[0].trim();
              u.push(p);
            }
          }), e.features = u;
        }
        const c = `echo -n "bios_date: "; cat /sys/devices/virtual/dmi/id/bios_date 2>/dev/null; echo;
            echo -n "bios_vendor: "; cat /sys/devices/virtual/dmi/id/bios_vendor 2>/dev/null; echo;
            echo -n "bios_version: "; cat /sys/devices/virtual/dmi/id/bios_version 2>/dev/null; echo;`;
        try {
          o = jt(c, v.execOptsLinux).toString().split(`
`), e.vendor = e.vendor ? e.vendor : v.getValue(o, "bios_vendor"), e.version = e.version ? e.version : v.getValue(o, "bios_version"), a = v.getValue(o, "bios_date"), e.releaseDate = e.releaseDate ? e.releaseDate : v.parseDateTime(a).date;
        } catch {
          v.noop();
        }
        t && t(e), i(e);
      })), tn && (e.vendor = "Apple Inc.", Zt(
        "system_profiler SPHardwareDataType -json",
        function(s, r) {
          try {
            const o = JSON.parse(r.toString());
            if (o && o.SPHardwareDataType && o.SPHardwareDataType.length) {
              let a = o.SPHardwareDataType[0].boot_rom_version;
              a = a ? a.split("(")[0].trim() : null, e.version = a;
            }
          } catch {
            v.noop();
          }
          t && t(e), i(e);
        }
      )), rn && (e.vendor = "Sun Microsystems", t && t(e), i(e)), nn)
        try {
          v.powerShell('Get-CimInstance Win32_bios | select Description,Version,Manufacturer,@{n="ReleaseDate";e={$_.ReleaseDate.ToString("yyyy-MM-dd")}},BuildNumber,SerialNumber,SMBIOSBIOSVersion | fl').then((s, r) => {
            if (!r) {
              let o = s.toString().split(`\r
`);
              const a = v.getValue(o, "description", ":"), l = v.getValue(o, "SMBIOSBIOSVersion", ":");
              a.indexOf(" Version ") !== -1 ? (e.vendor = a.split(" Version ")[0].trim(), e.version = a.split(" Version ")[1].trim()) : a.indexOf(" Ver: ") !== -1 ? (e.vendor = v.getValue(o, "manufacturer", ":"), e.version = a.split(" Ver: ")[1].trim()) : (e.vendor = v.getValue(o, "manufacturer", ":"), e.version = l || v.getValue(o, "version", ":")), e.releaseDate = v.getValue(o, "releasedate", ":"), e.revision = v.getValue(o, "buildnumber", ":"), e.serial = j(v.getValue(o, "serialnumber", ":"));
            }
            t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}
Pi.bios = Ca;
function va(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        manufacturer: "",
        model: "",
        version: "",
        serial: "-",
        assetTag: "-",
        memMax: null,
        memSlots: null
      }, n = "";
      if (en || Ci || vi || Li) {
        process.arch === "arm" ? n = "cat /proc/cpuinfo | grep Serial" : n = "export LC_ALL=C; dmidecode -t 2 2>/dev/null; unset LC_ALL";
        const s = [];
        s.push(Mi(n)), s.push(Mi("export LC_ALL=C; dmidecode -t memory 2>/dev/null")), v.promiseAll(
          s
        ).then((r) => {
          let o = r.results[0] ? r.results[0].toString().split(`
`) : [""];
          e.manufacturer = j(v.getValue(o, "Manufacturer")), e.model = j(v.getValue(o, "Product Name")), e.version = j(v.getValue(o, "Version")), e.serial = j(v.getValue(o, "Serial Number")), e.assetTag = j(v.getValue(o, "Asset Tag"));
          const a = `echo -n "board_asset_tag: "; cat /sys/devices/virtual/dmi/id/board_asset_tag 2>/dev/null; echo;
            echo -n "board_name: "; cat /sys/devices/virtual/dmi/id/board_name 2>/dev/null; echo;
            echo -n "board_serial: "; cat /sys/devices/virtual/dmi/id/board_serial 2>/dev/null; echo;
            echo -n "board_vendor: "; cat /sys/devices/virtual/dmi/id/board_vendor 2>/dev/null; echo;
            echo -n "board_version: "; cat /sys/devices/virtual/dmi/id/board_version 2>/dev/null; echo;`;
          try {
            o = jt(a, v.execOptsLinux).toString().split(`
`), e.manufacturer = j(e.manufacturer ? e.manufacturer : v.getValue(o, "board_vendor")), e.model = j(e.model ? e.model : v.getValue(o, "board_name")), e.version = j(e.version ? e.version : v.getValue(o, "board_version")), e.serial = j(e.serial ? e.serial : v.getValue(o, "board_serial")), e.assetTag = j(e.assetTag ? e.assetTag : v.getValue(o, "board_asset_tag"));
          } catch {
            v.noop();
          }
          if (o = r.results[1] ? r.results[1].toString().split(`
`) : [""], e.memMax = v.toInt(v.getValue(o, "Maximum Capacity")) * 1024 * 1024 * 1024 || null, e.memSlots = v.toInt(v.getValue(o, "Number Of Devices")) || null, v.isRaspberry()) {
            const l = v.decodePiCpuinfo();
            e.manufacturer = l.manufacturer, e.model = "Raspberry Pi", e.serial = l.serial, e.version = l.type + " - " + l.revision, e.memMax = Et.totalmem(), e.memSlots = 0;
          }
          t && t(e), i(e);
        });
      }
      if (tn) {
        const s = [];
        s.push(Mi("ioreg -c IOPlatformExpertDevice -d 2")), s.push(Mi("system_profiler SPMemoryDataType")), v.promiseAll(
          s
        ).then((r) => {
          let o = r.results[0] ? r.results[0].toString().replace(/[<>"]/g, "").split(`
`) : [""];
          e.manufacturer = v.getValue(o, "manufacturer", "=", !0), e.model = v.getValue(o, "model", "=", !0), e.version = v.getValue(o, "version", "=", !0), e.serial = v.getValue(o, "ioplatformserialnumber", "=", !0), e.assetTag = v.getValue(o, "board-id", "=", !0);
          let a = r.results[1] ? r.results[1].toString().split("        BANK ") : [""];
          a.length === 1 && (a = r.results[1] ? r.results[1].toString().split("        DIMM") : [""]), a.shift(), e.memSlots = a.length, Et.arch() === "arm64" && (e.memSlots = 0, e.memMax = Et.totalmem()), t && t(e), i(e);
        });
      }
      if (rn && (t && t(e), i(e)), nn)
        try {
          const s = [], r = parseInt(Et.release()) >= 10, o = r ? "MaxCapacityEx" : "MaxCapacity";
          s.push(v.powerShell("Get-CimInstance Win32_baseboard | select Model,Manufacturer,Product,Version,SerialNumber,PartNumber,SKU | fl")), s.push(v.powerShell(`Get-CimInstance Win32_physicalmemoryarray | select ${o}, MemoryDevices | fl`)), v.promiseAll(
            s
          ).then((a) => {
            let l = a.results[0] ? a.results[0].toString().split(`\r
`) : [""];
            e.manufacturer = j(v.getValue(l, "manufacturer", ":")), e.model = j(v.getValue(l, "model", ":")), e.model || (e.model = j(v.getValue(l, "product", ":"))), e.version = j(v.getValue(l, "version", ":")), e.serial = j(v.getValue(l, "serialnumber", ":")), e.assetTag = j(v.getValue(l, "partnumber", ":")), e.assetTag || (e.assetTag = j(v.getValue(l, "sku", ":"))), l = a.results[1] ? a.results[1].toString().split(`\r
`) : [""], e.memMax = v.toInt(v.getValue(l, o, ":")) * (r ? 1024 : 1) || null, e.memSlots = v.toInt(v.getValue(l, "MemoryDevices", ":")) || null, t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}
Pi.baseboard = va;
function Es(t) {
  return t = t.toLowerCase(), t.indexOf("macbookair") >= 0 || t.indexOf("macbook air") >= 0 || t.indexOf("macbookpro") >= 0 || t.indexOf("macbook pro") >= 0 || t.indexOf("macbook") >= 0 ? "Notebook" : t.indexOf("macmini") >= 0 || t.indexOf("mac mini") >= 0 || t.indexOf("imac") >= 0 || t.indexOf("macstudio") >= 0 || t.indexOf("mac studio") >= 0 ? "Desktop" : t.indexOf("macpro") >= 0 || t.indexOf("mac pro") >= 0 ? "Tower" : "Other";
}
function La(t) {
  const i = [
    "Other",
    "Unknown",
    "Desktop",
    "Low Profile Desktop",
    "Pizza Box",
    "Mini Tower",
    "Tower",
    "Portable",
    "Laptop",
    "Notebook",
    "Hand Held",
    "Docking Station",
    "All in One",
    "Sub Notebook",
    "Space-Saving",
    "Lunch Box",
    "Main System Chassis",
    "Expansion Chassis",
    "SubChassis",
    "Bus Expansion Chassis",
    "Peripheral Chassis",
    "Storage Chassis",
    "Rack Mount Chassis",
    "Sealed-Case PC",
    "Multi-System Chassis",
    "Compact PCI",
    "Advanced TCA",
    "Blade",
    "Blade Enclosure",
    "Tablet",
    "Convertible",
    "Detachable",
    "IoT Gateway ",
    "Embedded PC",
    "Mini PC",
    "Stick PC"
  ];
  return new Promise((e) => {
    process.nextTick(() => {
      let n = {
        manufacturer: "",
        model: "",
        type: "",
        version: "",
        serial: "-",
        assetTag: "-",
        sku: ""
      };
      if ((en || Ci || vi || Li) && Zt(`echo -n "chassis_asset_tag: "; cat /sys/devices/virtual/dmi/id/chassis_asset_tag 2>/dev/null; echo;
            echo -n "chassis_serial: "; cat /sys/devices/virtual/dmi/id/chassis_serial 2>/dev/null; echo;
            echo -n "chassis_type: "; cat /sys/devices/virtual/dmi/id/chassis_type 2>/dev/null; echo;
            echo -n "chassis_vendor: "; cat /sys/devices/virtual/dmi/id/chassis_vendor 2>/dev/null; echo;
            echo -n "chassis_version: "; cat /sys/devices/virtual/dmi/id/chassis_version 2>/dev/null; echo;`, function(r, o) {
        let a = o.toString().split(`
`);
        n.manufacturer = j(v.getValue(a, "chassis_vendor"));
        const l = parseInt(v.getValue(a, "chassis_type").replace(/\D/g, ""));
        n.type = j(l && !isNaN(l) && l < i.length ? i[l - 1] : ""), n.version = j(v.getValue(a, "chassis_version")), n.serial = j(v.getValue(a, "chassis_serial")), n.assetTag = j(v.getValue(a, "chassis_asset_tag")), t && t(n), e(n);
      }), tn && Zt("ioreg -c IOPlatformExpertDevice -d 2", function(s, r) {
        if (!s) {
          let o = r.toString().replace(/[<>"]/g, "").split(`
`);
          const a = v.getAppleModel(v.getValue(o, "model", "=", !0));
          n.manufacturer = v.getValue(o, "manufacturer", "=", !0), n.model = a.key, n.type = Es(a.model), n.version = a.version, n.serial = v.getValue(o, "ioplatformserialnumber", "=", !0), n.assetTag = v.getValue(o, "board-id", "=", !0) || v.getValue(o, "target-type", "=", !0), n.sku = v.getValue(o, "target-sub-type", "=", !0);
        }
        t && t(n), e(n);
      }), rn && (t && t(n), e(n)), nn)
        try {
          v.powerShell("Get-CimInstance Win32_SystemEnclosure | select Model,Manufacturer,ChassisTypes,Version,SerialNumber,PartNumber,SKU,SMBIOSAssetTag | fl").then((s, r) => {
            if (!r) {
              let o = s.toString().split(`\r
`);
              n.manufacturer = j(v.getValue(o, "manufacturer", ":")), n.model = j(v.getValue(o, "model", ":"));
              const a = parseInt(v.getValue(o, "ChassisTypes", ":").replace(/\D/g, ""));
              n.type = a && !isNaN(a) && a < i.length ? i[a - 1] : "", n.version = j(v.getValue(o, "version", ":")), n.serial = j(v.getValue(o, "serialnumber", ":")), n.assetTag = j(v.getValue(o, "partnumber", ":")), n.assetTag || (n.assetTag = j(v.getValue(o, "SMBIOSAssetTag", ":"))), n.sku = j(v.getValue(o, "sku", ":"));
            }
            t && t(n), e(n);
          });
        } catch {
          t && t(n), e(n);
        }
    });
  });
}
Pi.chassis = La;
var ti = {};
const Me = se, Ce = Fe, N = T, F = te.exec, hi = te.execSync;
let Ne = process.platform;
const ii = Ne === "linux" || Ne === "android", ve = Ne === "darwin", Le = Ne === "win32", tr = Ne === "freebsd", ir = Ne === "openbsd", nr = Ne === "netbsd", ba = Ne === "sunos";
function Ia() {
  let t = (/* @__PURE__ */ new Date()).toString().split(" ");
  const i = {
    current: Date.now(),
    uptime: Me.uptime(),
    timezone: t.length >= 7 ? t[5] : "",
    timezoneName: Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : t.length >= 7 ? t.slice(6).join(" ").replace(/\(/g, "").replace(/\)/g, "") : ""
  };
  if (ve || ii)
    try {
      const n = hi("date +%Z && date +%z && ls -l /etc/localtime 2>/dev/null", N.execOptsLinux).toString().split(Me.EOL);
      n.length > 3 && !n[0] && n.shift();
      let s = n[0] || "";
      return (s.startsWith("+") || s.startsWith("-")) && (s = "GMT"), {
        current: Date.now(),
        uptime: Me.uptime(),
        timezone: n[1] ? s + n[1] : s,
        timezoneName: n[2] && n[2].indexOf("/zoneinfo/") > 0 && n[2].split("/zoneinfo/")[1] || ""
      };
    } catch {
      N.noop();
    }
  return i;
}
ti.time = Ia;
function ai(t) {
  t = t || "", t = t.toLowerCase();
  let i = Ne;
  return Le ? i = "windows" : t.indexOf("mac os") !== -1 || t.indexOf("macos") !== -1 ? i = "apple" : t.indexOf("arch") !== -1 ? i = "arch" : t.indexOf("cachy") !== -1 ? i = "cachy" : t.indexOf("centos") !== -1 ? i = "centos" : t.indexOf("coreos") !== -1 ? i = "coreos" : t.indexOf("debian") !== -1 ? i = "debian" : t.indexOf("deepin") !== -1 ? i = "deepin" : t.indexOf("elementary") !== -1 ? i = "elementary" : t.indexOf("endeavour") !== -1 ? i = "endeavour" : t.indexOf("fedora") !== -1 ? i = "fedora" : t.indexOf("gentoo") !== -1 ? i = "gentoo" : t.indexOf("mageia") !== -1 ? i = "mageia" : t.indexOf("mandriva") !== -1 ? i = "mandriva" : t.indexOf("manjaro") !== -1 ? i = "manjaro" : t.indexOf("mint") !== -1 ? i = "mint" : t.indexOf("mx") !== -1 ? i = "mx" : t.indexOf("openbsd") !== -1 ? i = "openbsd" : t.indexOf("freebsd") !== -1 ? i = "freebsd" : t.indexOf("opensuse") !== -1 ? i = "opensuse" : t.indexOf("pclinuxos") !== -1 ? i = "pclinuxos" : t.indexOf("puppy") !== -1 ? i = "puppy" : t.indexOf("popos") !== -1 ? i = "popos" : t.indexOf("raspbian") !== -1 ? i = "raspbian" : t.indexOf("reactos") !== -1 ? i = "reactos" : t.indexOf("redhat") !== -1 ? i = "redhat" : t.indexOf("slackware") !== -1 ? i = "slackware" : t.indexOf("sugar") !== -1 ? i = "sugar" : t.indexOf("steam") !== -1 ? i = "steam" : t.indexOf("suse") !== -1 ? i = "suse" : t.indexOf("mate") !== -1 ? i = "ubuntu-mate" : t.indexOf("lubuntu") !== -1 ? i = "lubuntu" : t.indexOf("xubuntu") !== -1 ? i = "xubuntu" : t.indexOf("ubuntu") !== -1 ? i = "ubuntu" : t.indexOf("solaris") !== -1 ? i = "solaris" : t.indexOf("tails") !== -1 ? i = "tails" : t.indexOf("feren") !== -1 ? i = "ferenos" : t.indexOf("robolinux") !== -1 ? i = "robolinux" : ii && t && (i = t.toLowerCase().trim().replace(/\s+/g, "-")), i;
}
function _a() {
  let t = Me.hostname;
  if (ii || ve)
    try {
      t = hi("hostname -f 2>/dev/null", N.execOptsLinux).toString().split(Me.EOL)[0];
    } catch {
      N.noop();
    }
  if (tr || ir || nr)
    try {
      t = hi("hostname 2>/dev/null").toString().split(Me.EOL)[0];
    } catch {
      N.noop();
    }
  if (Le)
    try {
      t = hi("echo %COMPUTERNAME%.%USERDNSDOMAIN%", N.execOptsWin).toString().replace(".%USERDNSDOMAIN%", "").split(Me.EOL)[0];
    } catch {
      N.noop();
    }
  return t;
}
function Oa(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        platform: Ne === "win32" ? "Windows" : Ne,
        distro: "unknown",
        release: "unknown",
        codename: "",
        kernel: Me.release(),
        arch: Me.arch(),
        hostname: Me.hostname(),
        fqdn: _a(),
        codepage: "",
        logofile: "",
        serial: "",
        build: "",
        servicepack: "",
        uefi: !1
      };
      if (ii && F("cat /etc/*-release; cat /usr/lib/os-release; cat /etc/openwrt_release", function(n, s) {
        let r = {};
        s.toString().split(`
`).forEach(function(u) {
          u.indexOf("=") !== -1 && (r[u.split("=")[0].trim().toUpperCase()] = u.split("=")[1].trim());
        }), e.distro = (r.DISTRIB_ID || r.NAME || "unknown").replace(/"/g, ""), e.logofile = ai(e.distro);
        let a = (r.VERSION || "").replace(/"/g, ""), l = (r.DISTRIB_CODENAME || r.VERSION_CODENAME || "").replace(/"/g, "");
        const c = (r.PRETTY_NAME || "").replace(/"/g, "");
        c.indexOf(e.distro + " ") === 0 && (a = c.replace(e.distro + " ", "").trim()), a.indexOf("(") >= 0 && (l = a.split("(")[1].replace(/[()]/g, "").trim(), a = a.split("(")[0].trim()), e.release = (a || r.DISTRIB_RELEASE || r.VERSION_ID || "unknown").replace(/"/g, ""), e.codename = l, e.codepage = N.getCodepage(), e.build = (r.BUILD_ID || "").replace(/"/g, "").trim(), Pa().then((u) => {
          e.uefi = u, Ms().then((f) => {
            e.serial = f.os, t && t(e), i(e);
          });
        });
      }), (tr || ir || nr) && F("sysctl kern.ostype kern.osrelease kern.osrevision kern.hostuuid machdep.bootmethod kern.geom.confxml", function(n, s) {
        let r = s.toString().split(`
`);
        const o = N.getValue(r, "kern.ostype"), a = ai(o), l = N.getValue(r, "kern.osrelease").split("-")[0], c = N.getValue(r, "kern.uuid"), u = N.getValue(r, "machdep.bootmethod"), f = s.toString().indexOf("<type>efi</type>") >= 0, p = u ? u.toLowerCase().indexOf("uefi") >= 0 : f || null;
        e.distro = o || e.distro, e.logofile = a || e.logofile, e.release = l || e.release, e.serial = c || e.serial, e.codename = "", e.codepage = N.getCodepage(), e.uefi = p || null, t && t(e), i(e);
      }), ve && F("sw_vers; sysctl kern.ostype kern.osrelease kern.osrevision kern.uuid", function(n, s) {
        let r = s.toString().split(`
`);
        e.serial = N.getValue(r, "kern.uuid"), e.distro = N.getValue(r, "ProductName"), e.release = (N.getValue(r, "ProductVersion", ":", !0, !0) + " " + N.getValue(r, "ProductVersionExtra", ":", !0, !0)).trim(), e.build = N.getValue(r, "BuildVersion"), e.logofile = ai(e.distro), e.codename = "macOS", e.codename = e.release.indexOf("10.4") > -1 ? "OS X Tiger" : e.codename, e.codename = e.release.indexOf("10.5") > -1 ? "OS X Leopard" : e.codename, e.codename = e.release.indexOf("10.6") > -1 ? "OS X Snow Leopard" : e.codename, e.codename = e.release.indexOf("10.7") > -1 ? "OS X Lion" : e.codename, e.codename = e.release.indexOf("10.8") > -1 ? "OS X Mountain Lion" : e.codename, e.codename = e.release.indexOf("10.9") > -1 ? "OS X Mavericks" : e.codename, e.codename = e.release.indexOf("10.10") > -1 ? "OS X Yosemite" : e.codename, e.codename = e.release.indexOf("10.11") > -1 ? "OS X El Capitan" : e.codename, e.codename = e.release.indexOf("10.12") > -1 ? "Sierra" : e.codename, e.codename = e.release.indexOf("10.13") > -1 ? "High Sierra" : e.codename, e.codename = e.release.indexOf("10.14") > -1 ? "Mojave" : e.codename, e.codename = e.release.indexOf("10.15") > -1 ? "Catalina" : e.codename, e.codename = e.release.startsWith("11.") ? "Big Sur" : e.codename, e.codename = e.release.startsWith("12.") ? "Monterey" : e.codename, e.codename = e.release.startsWith("13.") ? "Ventura" : e.codename, e.codename = e.release.startsWith("14.") ? "Sonoma" : e.codename, e.codename = e.release.startsWith("15.") ? "Sequoia" : e.codename, e.uefi = !0, e.codepage = N.getCodepage(), t && t(e), i(e);
      }), ba && (e.release = e.kernel, F("uname -o", function(n, s) {
        let r = s.toString().split(`
`);
        e.distro = r[0], e.logofile = ai(e.distro), t && t(e), i(e);
      })), Le) {
        e.logofile = ai(), e.release = e.kernel;
        try {
          const n = [];
          n.push(N.powerShell("Get-CimInstance Win32_OperatingSystem | select Caption,SerialNumber,BuildNumber,ServicePackMajorVersion,ServicePackMinorVersion | fl")), n.push(N.powerShell("(Get-CimInstance Win32_ComputerSystem).HypervisorPresent")), n.push(N.powerShell("Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SystemInformation]::TerminalServerSession")), N.promiseAll(
            n
          ).then((s) => {
            let r = s.results[0] ? s.results[0].toString().split(`\r
`) : [""];
            e.distro = N.getValue(r, "Caption", ":").trim(), e.serial = N.getValue(r, "SerialNumber", ":").trim(), e.build = N.getValue(r, "BuildNumber", ":").trim(), e.servicepack = N.getValue(r, "ServicePackMajorVersion", ":").trim() + "." + N.getValue(r, "ServicePackMinorVersion", ":").trim(), e.codepage = N.getCodepage();
            const o = s.results[1] ? s.results[1].toString().toLowerCase() : "";
            e.hypervisor = o.indexOf("true") !== -1;
            const a = s.results[2] ? s.results[2].toString() : "";
            e.remoteSession = a.toString().toLowerCase().indexOf("true") >= 0, Aa().then((l) => {
              e.uefi = l, t && t(e), i(e);
            });
          });
        } catch {
          t && t(e), i(e);
        }
      }
    });
  });
}
ti.osInfo = Oa;
function Pa() {
  return new Promise((t) => {
    process.nextTick(() => {
      Ce.stat("/sys/firmware/efi", function(i) {
        if (i)
          F('dmesg | grep -E "EFI v"', function(e, n) {
            if (!e) {
              const s = n.toString().split(`
`);
              return t(s.length > 0);
            }
            return t(!1);
          });
        else
          return t(!0);
      });
    });
  });
}
function Aa() {
  return new Promise((t) => {
    process.nextTick(() => {
      try {
        F('findstr /C:"Detected boot environment" "%windir%\\Panther\\setupact.log"', N.execOptsWin, function(i, e) {
          if (i)
            F("echo %firmware_type%", N.execOptsWin, function(n, s) {
              if (n)
                return t(!1);
              {
                const r = s.toString() || "";
                return t(r.toLowerCase().indexOf("efi") >= 0);
              }
            });
          else {
            const n = e.toString().split(`
\r`)[0];
            return t(n.toLowerCase().indexOf("efi") >= 0);
          }
        });
      } catch {
        return t(!1);
      }
    });
  });
}
function Ea(t, i) {
  let e = {
    kernel: Me.release(),
    apache: "",
    bash: "",
    bun: "",
    deno: "",
    docker: "",
    dotnet: "",
    fish: "",
    gcc: "",
    git: "",
    grunt: "",
    gulp: "",
    homebrew: "",
    java: "",
    mongodb: "",
    mysql: "",
    nginx: "",
    node: "",
    //process.versions.node,
    npm: "",
    openssl: "",
    perl: "",
    php: "",
    pip3: "",
    pip: "",
    pm2: "",
    postfix: "",
    postgresql: "",
    powershell: "",
    python3: "",
    python: "",
    redis: "",
    systemOpenssl: "",
    systemOpensslLib: "",
    tsc: "",
    v8: process.versions.v8,
    virtualbox: "",
    yarn: "",
    zsh: ""
  };
  function n(s) {
    if (s === "*")
      return {
        versions: e,
        counter: 34
      };
    if (!Array.isArray(s)) {
      s = s.trim().toLowerCase().replace(/,+/g, "|").replace(/ /g, "|"), s = s.split("|");
      const r = {
        versions: {},
        counter: 0
      };
      return s.forEach((o) => {
        if (o)
          for (let a in e)
            ({}).hasOwnProperty.call(e, a) && a.toLowerCase() === o.toLowerCase() && !{}.hasOwnProperty.call(r.versions, a) && (r.versions[a] = e[a], a === "openssl" && (r.versions.systemOpenssl = "", r.versions.systemOpensslLib = ""), r.versions[a] || r.counter++);
      }), r;
    }
  }
  return new Promise((s) => {
    process.nextTick(() => {
      if (N.isFunction(t) && !i)
        i = t, t = "*";
      else if (t = t || "*", typeof t != "string")
        return i && i({}), s({});
      const r = n(t);
      let o = r.counter, a = /* @__PURE__ */ function() {
        return function() {
          --o === 0 && (i && i(r.versions), s(r.versions));
        };
      }(), l = "";
      try {
        if ({}.hasOwnProperty.call(r.versions, "openssl") && (r.versions.openssl = process.versions.openssl, F("openssl version", function(c, u) {
          if (!c) {
            let p = u.toString().split(`
`)[0].trim().split(" ");
            r.versions.systemOpenssl = p.length > 0 ? p[1] : p[0], r.versions.systemOpensslLib = p.length > 0 ? p[0] : "openssl";
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "npm") && F("npm -v", function(c, u) {
          c || (r.versions.npm = u.toString().split(`
`)[0]), a();
        }), {}.hasOwnProperty.call(r.versions, "pm2") && (l = "pm2", Le && (l += ".cmd"), F(`${l} -v`, function(c, u) {
          if (!c) {
            let f = u.toString().split(`
`)[0].trim();
            f.startsWith("[PM2]") || (r.versions.pm2 = f);
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "yarn") && F("yarn --version", function(c, u) {
          c || (r.versions.yarn = u.toString().split(`
`)[0]), a();
        }), {}.hasOwnProperty.call(r.versions, "gulp") && (l = "gulp", Le && (l += ".cmd"), F(`${l} --version`, function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            r.versions.gulp = (f.toLowerCase().split("version")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "homebrew") && (l = "brew", F(`${l} --version`, function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            r.versions.homebrew = (f.toLowerCase().split(" ")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "tsc") && (l = "tsc", Le && (l += ".cmd"), F(`${l} --version`, function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            r.versions.tsc = (f.toLowerCase().split("version")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "grunt") && (l = "grunt", Le && (l += ".cmd"), F(`${l} --version`, function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            r.versions.grunt = (f.toLowerCase().split("cli v")[1] || "").trim();
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "git"))
          if (ve) {
            const c = Ce.existsSync("/usr/local/Cellar/git") || Ce.existsSync("/opt/homebrew/bin/git");
            N.darwinXcodeExists() || c ? F("git --version", function(u, f) {
              if (!u) {
                let p = f.toString().split(`
`)[0] || "";
                p = (p.toLowerCase().split("version")[1] || "").trim(), r.versions.git = (p.split(" ")[0] || "").trim();
              }
              a();
            }) : a();
          } else
            F("git --version", function(c, u) {
              if (!c) {
                let f = u.toString().split(`
`)[0] || "";
                f = (f.toLowerCase().split("version")[1] || "").trim(), r.versions.git = (f.split(" ")[0] || "").trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "apache") && F("apachectl -v 2>&1", function(c, u) {
          if (!c) {
            const f = (u.toString().split(`
`)[0] || "").split(":");
            r.versions.apache = f.length > 1 ? f[1].replace("Apache", "").replace("/", "").split("(")[0].trim() : "";
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "nginx") && F("nginx -v 2>&1", function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            r.versions.nginx = (f.toLowerCase().split("/")[1] || "").trim();
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "mysql") && F("mysql -V", function(c, u) {
          if (!c) {
            let f = u.toString().split(`
`)[0] || "";
            if (f = f.toLowerCase(), f.indexOf(",") > -1) {
              f = (f.split(",")[0] || "").trim();
              const p = f.split(" ");
              r.versions.mysql = (p[p.length - 1] || "").trim();
            } else
              f.indexOf(" ver ") > -1 && (f = f.split(" ver ")[1], r.versions.mysql = f.split(" ")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "php") && F("php -v", function(c, u) {
          if (!c) {
            let p = (u.toString().split(`
`)[0] || "").split("(");
            p[0].indexOf("-") && (p = p[0].split("-")), r.versions.php = p[0].replace(/[^0-9.]/g, "");
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "redis") && F("redis-server --version", function(c, u) {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split(" ");
            r.versions.redis = N.getValue(p, "v", "=", !0);
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "docker") && F("docker --version", function(c, u) {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split(" ");
            r.versions.docker = p.length > 2 && p[2].endsWith(",") ? p[2].slice(0, -1) : "";
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "postfix") && F("postconf -d | grep mail_version", function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`) || [];
            r.versions.postfix = N.getValue(f, "mail_version", "=", !0);
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "mongodb") && F("mongod --version", function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`)[0] || "";
            r.versions.mongodb = (f.toLowerCase().split(",")[0] || "").replace(/[^0-9.]/g, "");
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "postgresql") && (ii ? F("locate bin/postgres", function(c, u) {
          if (c)
            F("psql -V", function(f, p) {
              if (!f) {
                const d = p.toString().split(`
`)[0].split(" ") || [];
                r.versions.postgresql = d.length ? d[d.length - 1] : "", r.versions.postgresql = r.versions.postgresql.split("-")[0];
              }
              a();
            });
          else {
            const f = u.toString().split(`
`).sort();
            f.length ? F(f[f.length - 1] + " -V", function(p, d) {
              if (!p) {
                const m = d.toString().split(`
`)[0].split(" ") || [];
                r.versions.postgresql = m.length ? m[m.length - 1] : "";
              }
              a();
            }) : a();
          }
        }) : Le ? N.powerShell("Get-CimInstance Win32_Service | select caption | fl").then((c) => {
          c.split(/\n\s*\n/).forEach((f) => {
            if (f.trim() !== "") {
              let p = f.trim().split(`\r
`), d = N.getValue(p, "caption", ":", !0).toLowerCase();
              if (d.indexOf("postgresql") > -1) {
                const m = d.split(" server ");
                m.length > 1 && (r.versions.postgresql = m[1]);
              }
            }
          }), a();
        }) : F("postgres -V", function(c, u) {
          if (c)
            F("pg_config --version", function(f, p) {
              if (!f) {
                const d = p.toString().split(`
`)[0].split(" ") || [];
                r.versions.postgresql = d.length ? d[d.length - 1] : "";
              }
            });
          else {
            const f = u.toString().split(`
`)[0].split(" ") || [];
            r.versions.postgresql = f.length ? f[f.length - 1] : "";
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "perl") && F("perl -v", function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`) || "";
            for (; f.length > 0 && f[0].trim() === ""; )
              f.shift();
            f.length > 0 && (r.versions.perl = f[0].split("(").pop().split(")")[0].replace("v", ""));
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "python"))
          if (ve)
            try {
              const u = hi("sw_vers").toString().split(`
`), f = N.getValue(u, "ProductVersion", ":"), p = Ce.existsSync("/usr/local/Cellar/python"), d = Ce.existsSync("/opt/homebrew/bin/python");
              N.darwinXcodeExists() && N.semverCompare("12.0.1", f) < 0 || p || d ? F(p ? "/usr/local/Cellar/python -V 2>&1" : d ? "/opt/homebrew/bin/python -V 2>&1" : "python -V 2>&1", function(h, y) {
                if (!h) {
                  const g = y.toString().split(`
`)[0] || "";
                  r.versions.python = g.toLowerCase().replace("python", "").trim();
                }
                a();
              }) : a();
            } catch {
              a();
            }
          else
            F("python -V 2>&1", function(c, u) {
              if (!c) {
                const f = u.toString().split(`
`)[0] || "";
                r.versions.python = f.toLowerCase().replace("python", "").trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "python3"))
          if (ve) {
            const c = Ce.existsSync("/usr/local/Cellar/python3") || Ce.existsSync("/opt/homebrew/bin/python3");
            N.darwinXcodeExists() || c ? F("python3 -V 2>&1", function(u, f) {
              if (!u) {
                const p = f.toString().split(`
`)[0] || "";
                r.versions.python3 = p.toLowerCase().replace("python", "").trim();
              }
              a();
            }) : a();
          } else
            F("python3 -V 2>&1", function(c, u) {
              if (!c) {
                const f = u.toString().split(`
`)[0] || "";
                r.versions.python3 = f.toLowerCase().replace("python", "").trim();
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "pip"))
          if (ve) {
            const c = Ce.existsSync("/usr/local/Cellar/pip") || Ce.existsSync("/opt/homebrew/bin/pip");
            N.darwinXcodeExists() || c ? F("pip -V 2>&1", function(u, f) {
              if (!u) {
                const d = (f.toString().split(`
`)[0] || "").split(" ");
                r.versions.pip = d.length >= 2 ? d[1] : "";
              }
              a();
            }) : a();
          } else
            F("pip -V 2>&1", function(c, u) {
              if (!c) {
                const p = (u.toString().split(`
`)[0] || "").split(" ");
                r.versions.pip = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        if ({}.hasOwnProperty.call(r.versions, "pip3"))
          if (ve) {
            const c = Ce.existsSync("/usr/local/Cellar/pip3") || Ce.existsSync("/opt/homebrew/bin/pip3");
            N.darwinXcodeExists() || c ? F("pip3 -V 2>&1", function(u, f) {
              if (!u) {
                const d = (f.toString().split(`
`)[0] || "").split(" ");
                r.versions.pip3 = d.length >= 2 ? d[1] : "";
              }
              a();
            }) : a();
          } else
            F("pip3 -V 2>&1", function(c, u) {
              if (!c) {
                const p = (u.toString().split(`
`)[0] || "").split(" ");
                r.versions.pip3 = p.length >= 2 ? p[1] : "";
              }
              a();
            });
        ({}).hasOwnProperty.call(r.versions, "java") && (ve ? F("/usr/libexec/java_home -V 2>&1", function(c, u) {
          !c && u.toString().toLowerCase().indexOf("no java runtime") === -1 ? F("java -version 2>&1", function(f, p) {
            if (!f) {
              const m = (p.toString().split(`
`)[0] || "").split('"');
              r.versions.java = m.length === 3 ? m[1].trim() : "";
            }
            a();
          }) : a();
        }) : F("java -version 2>&1", function(c, u) {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split('"');
            r.versions.java = p.length === 3 ? p[1].trim() : "";
          }
          a();
        })), {}.hasOwnProperty.call(r.versions, "gcc") && (ve && N.darwinXcodeExists() || !ve ? F("gcc -dumpversion", function(c, u) {
          c || (r.versions.gcc = u.toString().split(`
`)[0].trim() || ""), r.versions.gcc.indexOf(".") > -1 ? a() : F("gcc --version", function(f, p) {
            if (!f) {
              const d = p.toString().split(`
`)[0].trim();
              if (d.indexOf("gcc") > -1 && d.indexOf(")") > -1) {
                const m = d.split(")");
                r.versions.gcc = m[1].trim() || r.versions.gcc;
              }
            }
            a();
          });
        }) : a()), {}.hasOwnProperty.call(r.versions, "virtualbox") && F(N.getVboxmanage() + " -v 2>&1", function(c, u) {
          if (!c) {
            const p = (u.toString().split(`
`)[0] || "").split("r");
            r.versions.virtualbox = p[0];
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "bash") && F("bash --version", function(c, u) {
          if (!c) {
            const p = u.toString().split(`
`)[0].split(" version ");
            p.length > 1 && (r.versions.bash = p[1].split(" ")[0].split("(")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "zsh") && F("zsh --version", function(c, u) {
          if (!c) {
            const p = u.toString().split(`
`)[0].split("zsh ");
            p.length > 1 && (r.versions.zsh = p[1].split(" ")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "fish") && F("fish --version", function(c, u) {
          if (!c) {
            const p = u.toString().split(`
`)[0].split(" version ");
            p.length > 1 && (r.versions.fish = p[1].split(" ")[0]);
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "bun") && F("bun -v", function(c, u) {
          if (!c) {
            const f = u.toString().split(`
`)[0].trim();
            r.versions.bun = f;
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "deno") && F("deno -v", function(c, u) {
          if (!c) {
            const p = u.toString().split(`
`)[0].trim().split(" ");
            p.length > 1 && (r.versions.deno = p[1]);
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "node") && F("node -v", function(c, u) {
          if (!c) {
            let f = u.toString().split(`
`)[0].trim();
            f.startsWith("v") && (f = f.slice(1)), r.versions.node = f;
          }
          a();
        }), {}.hasOwnProperty.call(r.versions, "powershell") && (Le ? N.powerShell("$PSVersionTable").then((c) => {
          const u = c.toString().toLowerCase().split(`
`).map((f) => f.replace(/ +/g, " ").replace(/ +/g, ":"));
          r.versions.powershell = N.getValue(u, "psversion"), a();
        }) : a()), {}.hasOwnProperty.call(r.versions, "dotnet") && (Le ? N.powerShell('gci "HKLM:\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP" -recurse | gp -name Version,Release -EA 0 | where { $_.PSChildName -match "^(?!S)\\p{L}"} | select PSChildName, Version, Release').then((c) => {
          const u = c.toString().split(`\r
`);
          let f = "";
          u.forEach((p) => {
            p = p.replace(/ +/g, " ");
            const d = p.split(" ");
            f = f || (d[0].toLowerCase().startsWith("client") && d.length > 2 || d[0].toLowerCase().startsWith("full") && d.length > 2 ? d[1].trim() : "");
          }), r.versions.dotnet = f.trim(), a();
        }) : a());
      } catch {
        i && i(r.versions), s(r.versions);
      }
    });
  });
}
ti.versions = Ea;
function Ma(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      if (Le)
        try {
          const e = "CMD";
          N.powerShell(`Get-CimInstance -className win32_process | where-object {$_.ProcessId -eq ${process.ppid} } | select Name`).then((n) => {
            let s = "CMD";
            n && n.toString().toLowerCase().indexOf("powershell") >= 0 && (s = "PowerShell"), t && t(s), i(s);
          });
        } catch {
          t && t(result), i(result);
        }
      else {
        let e = "";
        F("echo $SHELL", function(n, s) {
          n || (e = s.toString().split(`
`)[0]), t && t(e), i(e);
        });
      }
    });
  });
}
ti.shell = Ma;
function Ta() {
  let t = [];
  try {
    const i = Me.networkInterfaces();
    for (let e in i)
      ({}).hasOwnProperty.call(i, e) && i[e].forEach(function(n) {
        if (n && n.mac && n.mac !== "00:00:00:00:00:00") {
          const s = n.mac.toLowerCase();
          t.indexOf(s) === -1 && t.push(s);
        }
      });
    t = t.sort(function(e, n) {
      return e < n ? -1 : e > n ? 1 : 0;
    });
  } catch {
    t.push("00:00:00:00:00:00");
  }
  return t;
}
function Ms(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        os: "",
        hardware: "",
        macs: Ta()
      }, n;
      if (ve && F("system_profiler SPHardwareDataType -json", function(s, r) {
        if (!s)
          try {
            const o = JSON.parse(r.toString());
            if (o.SPHardwareDataType && o.SPHardwareDataType.length > 0) {
              const a = o.SPHardwareDataType[0];
              e.os = a.platform_UUID.toLowerCase(), e.hardware = a.serial_number;
            }
          } catch {
            N.noop();
          }
        t && t(e), i(e);
      }), ii && F(`echo -n "os: "; cat /var/lib/dbus/machine-id 2> /dev/null ||
cat /etc/machine-id 2> /dev/null; echo;
echo -n "hardware: "; cat /sys/class/dmi/id/product_uuid 2> /dev/null; echo;`, function(r, o) {
        const a = o.toString().split(`
`);
        if (e.os = N.getValue(a, "os").toLowerCase(), e.hardware = N.getValue(a, "hardware").toLowerCase(), !e.hardware) {
          const l = Ce.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split(`
`), c = N.getValue(l, "serial");
          e.hardware = c || "";
        }
        t && t(e), i(e);
      }), (tr || ir || nr) && F("sysctl -i kern.hostid kern.hostuuid", function(s, r) {
        const o = r.toString().split(`
`);
        e.os = N.getValue(o, "kern.hostid", ":").toLowerCase(), e.hardware = N.getValue(o, "kern.hostuuid", ":").toLowerCase(), e.os.indexOf("unknown") >= 0 && (e.os = ""), e.hardware.indexOf("unknown") >= 0 && (e.hardware = ""), t && t(e), i(e);
      }), Le) {
        let s = "%windir%\\System32";
        process.arch === "ia32" && Object.prototype.hasOwnProperty.call(process.env, "PROCESSOR_ARCHITEW6432") && (s = "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"), N.powerShell("Get-CimInstance Win32_ComputerSystemProduct | select UUID | fl").then((r) => {
          let o = r.split(`\r
`);
          e.hardware = N.getValue(o, "uuid", ":").toLowerCase(), F(`${s}\\reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid`, N.execOptsWin, function(a, l) {
            n = l.toString().split(`
\r`)[0].split("REG_SZ"), e.os = n.length > 1 ? n[1].replace(/\r+|\n+|\s+/ig, "").toLowerCase() : "", t && t(e), i(e);
          });
        });
      }
    });
  });
}
ti.uuid = Ms;
var wt = {};
const Be = se, he = te.exec, sn = te.execSync, ji = Fe, P = T;
let nt = process.platform;
const ni = nt === "linux" || nt === "android", on = nt === "darwin", an = nt === "win32", cn = nt === "freebsd", ln = nt === "openbsd", un = nt === "netbsd", pn = nt === "sunos";
let Xt = 0, Y = {
  user: 0,
  nice: 0,
  system: 0,
  idle: 0,
  irq: 0,
  steal: 0,
  guest: 0,
  load: 0,
  tick: 0,
  ms: 0,
  currentLoad: 0,
  currentLoadUser: 0,
  currentLoadSystem: 0,
  currentLoadNice: 0,
  currentLoadIdle: 0,
  currentLoadIrq: 0,
  currentLoadSteal: 0,
  currentLoadGuest: 0,
  rawCurrentLoad: 0,
  rawCurrentLoadUser: 0,
  rawCurrentLoadSystem: 0,
  rawCurrentLoadNice: 0,
  rawCurrentLoadIdle: 0,
  rawCurrentLoadIrq: 0,
  rawCurrentLoadSteal: 0,
  rawCurrentLoadGuest: 0
}, L = [], vn = 0;
const Ln = {
  8346: "1.8",
  8347: "1.9",
  8350: "2.0",
  8354: "2.2",
  "8356|SE": "2.4",
  8356: "2.3",
  8360: "2.5",
  2372: "2.1",
  2373: "2.1",
  2374: "2.2",
  2376: "2.3",
  2377: "2.3",
  2378: "2.4",
  2379: "2.4",
  2380: "2.5",
  2381: "2.5",
  2382: "2.6",
  2384: "2.7",
  2386: "2.8",
  2387: "2.8",
  2389: "2.9",
  2393: "3.1",
  8374: "2.2",
  8376: "2.3",
  8378: "2.4",
  8379: "2.4",
  8380: "2.5",
  8381: "2.5",
  8382: "2.6",
  8384: "2.7",
  8386: "2.8",
  8387: "2.8",
  8389: "2.9",
  8393: "3.1",
  "2419EE": "1.8",
  "2423HE": "2.0",
  "2425HE": "2.1",
  2427: "2.2",
  2431: "2.4",
  2435: "2.6",
  "2439SE": "2.8",
  "8425HE": "2.1",
  8431: "2.4",
  8435: "2.6",
  "8439SE": "2.8",
  4122: "2.2",
  4130: "2.6",
  "4162EE": "1.7",
  "4164EE": "1.8",
  "4170HE": "2.1",
  "4174HE": "2.3",
  "4176HE": "2.4",
  4180: "2.6",
  4184: "2.8",
  "6124HE": "1.8",
  "6128HE": "2.0",
  "6132HE": "2.2",
  6128: "2.0",
  6134: "2.3",
  6136: "2.4",
  6140: "2.6",
  "6164HE": "1.7",
  "6166HE": "1.8",
  6168: "1.9",
  6172: "2.1",
  6174: "2.2",
  6176: "2.3",
  "6176SE": "2.3",
  "6180SE": "2.5",
  3250: "2.5",
  3260: "2.7",
  3280: "2.4",
  4226: "2.7",
  4228: "2.8",
  4230: "2.9",
  4234: "3.1",
  4238: "3.3",
  4240: "3.4",
  4256: "1.6",
  4274: "2.5",
  4276: "2.6",
  4280: "2.8",
  4284: "3.0",
  6204: "3.3",
  6212: "2.6",
  6220: "3.0",
  6234: "2.4",
  6238: "2.6",
  "6262HE": "1.6",
  6272: "2.1",
  6274: "2.2",
  6276: "2.3",
  6278: "2.4",
  "6282SE": "2.6",
  "6284SE": "2.7",
  6308: "3.5",
  6320: "2.8",
  6328: "3.2",
  "6338P": "2.3",
  6344: "2.6",
  6348: "2.8",
  6366: "1.8",
  "6370P": "2.0",
  6376: "2.3",
  6378: "2.4",
  6380: "2.5",
  6386: "2.8",
  "FX|4100": "3.6",
  "FX|4120": "3.9",
  "FX|4130": "3.8",
  "FX|4150": "3.8",
  "FX|4170": "4.2",
  "FX|6100": "3.3",
  "FX|6120": "3.6",
  "FX|6130": "3.6",
  "FX|6200": "3.8",
  "FX|8100": "2.8",
  "FX|8120": "3.1",
  "FX|8140": "3.2",
  "FX|8150": "3.6",
  "FX|8170": "3.9",
  "FX|4300": "3.8",
  "FX|4320": "4.0",
  "FX|4350": "4.2",
  "FX|6300": "3.5",
  "FX|6350": "3.9",
  "FX|8300": "3.3",
  "FX|8310": "3.4",
  "FX|8320": "3.5",
  "FX|8350": "4.0",
  "FX|8370": "4.0",
  "FX|9370": "4.4",
  "FX|9590": "4.7",
  "FX|8320E": "3.2",
  "FX|8370E": "3.3",
  // ZEN Desktop CPUs
  1200: "3.1",
  "Pro 1200": "3.1",
  "1300X": "3.5",
  "Pro 1300": "3.5",
  1400: "3.2",
  "1500X": "3.5",
  "Pro 1500": "3.5",
  1600: "3.2",
  "1600X": "3.6",
  "Pro 1600": "3.2",
  1700: "3.0",
  "Pro 1700": "3.0",
  "1700X": "3.4",
  "Pro 1700X": "3.4",
  "1800X": "3.6",
  "1900X": "3.8",
  1920: "3.2",
  "1920X": "3.5",
  "1950X": "3.4",
  // ZEN Desktop APUs
  "200GE": "3.2",
  "Pro 200GE": "3.2",
  "220GE": "3.4",
  "240GE": "3.5",
  "3000G": "3.5",
  "300GE": "3.4",
  "3050GE": "3.4",
  "2200G": "3.5",
  "Pro 2200G": "3.5",
  "2200GE": "3.2",
  "Pro 2200GE": "3.2",
  "2400G": "3.6",
  "Pro 2400G": "3.6",
  "2400GE": "3.2",
  "Pro 2400GE": "3.2",
  // ZEN Mobile APUs
  "Pro 200U": "2.3",
  "300U": "2.4",
  "2200U": "2.5",
  "3200U": "2.6",
  "2300U": "2.0",
  "Pro 2300U": "2.0",
  "2500U": "2.0",
  "Pro 2500U": "2.2",
  "2600H": "3.2",
  "2700U": "2.0",
  "Pro 2700U": "2.2",
  "2800H": "3.3",
  // ZEN Server Processors
  7351: "2.4",
  "7351P": "2.4",
  7401: "2.0",
  "7401P": "2.0",
  "7551P": "2.0",
  7551: "2.0",
  7251: "2.1",
  7261: "2.5",
  7281: "2.1",
  7301: "2.2",
  7371: "3.1",
  7451: "2.3",
  7501: "2.0",
  7571: "2.2",
  7601: "2.2",
  // ZEN Embedded Processors
  V1500B: "2.2",
  V1780B: "3.35",
  V1202B: "2.3",
  V1404I: "2.0",
  V1605B: "2.0",
  V1756B: "3.25",
  V1807B: "3.35",
  3101: "2.1",
  3151: "2.7",
  3201: "1.5",
  3251: "2.5",
  3255: "2.5",
  3301: "2.0",
  3351: "1.9",
  3401: "1.85",
  3451: "2.15",
  // ZEN+ Desktop
  "1200|AF": "3.1",
  "2300X": "3.5",
  "2500X": "3.6",
  2600: "3.4",
  "2600E": "3.1",
  "1600|AF": "3.2",
  "2600X": "3.6",
  2700: "3.2",
  "2700E": "2.8",
  "Pro 2700": "3.2",
  "2700X": "3.7",
  "Pro 2700X": "3.6",
  "2920X": "3.5",
  "2950X": "3.5",
  "2970WX": "3.0",
  "2990WX": "3.0",
  // ZEN+ Desktop APU
  "Pro 300GE": "3.4",
  "Pro 3125GE": "3.4",
  "3150G": "3.5",
  "Pro 3150G": "3.5",
  "3150GE": "3.3",
  "Pro 3150GE": "3.3",
  "3200G": "3.6",
  "Pro 3200G": "3.6",
  "3200GE": "3.3",
  "Pro 3200GE": "3.3",
  "3350G": "3.6",
  "Pro 3350G": "3.6",
  "3350GE": "3.3",
  "Pro 3350GE": "3.3",
  "3400G": "3.7",
  "Pro 3400G": "3.7",
  "3400GE": "3.3",
  "Pro 3400GE": "3.3",
  // ZEN+ Mobile
  "3300U": "2.1",
  "PRO 3300U": "2.1",
  "3450U": "2.1",
  "3500U": "2.1",
  "PRO 3500U": "2.1",
  "3500C": "2.1",
  "3550H": "2.1",
  "3580U": "2.1",
  "3700U": "2.3",
  "PRO 3700U": "2.3",
  "3700C": "2.3",
  "3750H": "2.3",
  "3780U": "2.3",
  // ZEN2 Desktop CPUS
  3100: "3.6",
  "3300X": "3.8",
  3500: "3.6",
  "3500X": "3.6",
  3600: "3.6",
  "Pro 3600": "3.6",
  "3600X": "3.8",
  "3600XT": "3.8",
  "Pro 3700": "3.6",
  "3700X": "3.6",
  "3800X": "3.9",
  "3800XT": "3.9",
  3900: "3.1",
  "Pro 3900": "3.1",
  "3900X": "3.8",
  "3900XT": "3.8",
  "3950X": "3.5",
  "3960X": "3.8",
  "3970X": "3.7",
  "3990X": "2.9",
  "3945WX": "4.0",
  "3955WX": "3.9",
  "3975WX": "3.5",
  "3995WX": "2.7",
  // ZEN2 Desktop APUs
  "4300GE": "3.5",
  "Pro 4300GE": "3.5",
  "4300G": "3.8",
  "Pro 4300G": "3.8",
  "4600GE": "3.3",
  "Pro 4650GE": "3.3",
  "4600G": "3.7",
  "Pro 4650G": "3.7",
  "4700GE": "3.1",
  "Pro 4750GE": "3.1",
  "4700G": "3.6",
  "Pro 4750G": "3.6",
  "4300U": "2.7",
  "4450U": "2.5",
  "Pro 4450U": "2.5",
  "4500U": "2.3",
  "4600U": "2.1",
  "PRO 4650U": "2.1",
  "4680U": "2.1",
  "4600HS": "3.0",
  "4600H": "3.0",
  "4700U": "2.0",
  "PRO 4750U": "1.7",
  "4800U": "1.8",
  "4800HS": "2.9",
  "4800H": "2.9",
  "4900HS": "3.0",
  "4900H": "3.3",
  "5300U": "2.6",
  "5500U": "2.1",
  "5700U": "1.8",
  // ZEN2 - EPYC
  "7232P": "3.1",
  "7302P": "3.0",
  "7402P": "2.8",
  "7502P": "2.5",
  "7702P": "2.0",
  7252: "3.1",
  7262: "3.2",
  7272: "2.9",
  7282: "2.8",
  7302: "3.0",
  7352: "2.3",
  7402: "2.8",
  7452: "2.35",
  7502: "2.5",
  7532: "2.4",
  7542: "2.9",
  7552: "2.2",
  7642: "2.3",
  7662: "2.0",
  7702: "2.0",
  7742: "2.25",
  "7H12": "2.6",
  "7F32": "3.7",
  "7F52": "3.5",
  "7F72": "3.2",
  // Epyc (Milan)
  "7773X": "2.2",
  7763: "2.45",
  7713: "2.0",
  "7713P": "2.0",
  7663: "2.0",
  7643: "2.3",
  "7573X": "2.8",
  "75F3": "2.95",
  7543: "2.8",
  "7543P": "2.8",
  7513: "2.6",
  "7473X": "2.8",
  7453: "2.75",
  "74F3": "3.2",
  7443: "2.85",
  "7443P": "2.85",
  7413: "2.65",
  "7373X": "3.05",
  "73F3": "3.5",
  7343: "3.2",
  7313: "3.0",
  "7313P": "3.0",
  "72F3": "3.7",
  // ZEN3
  "5600X": "3.7",
  "5800X": "3.8",
  "5900X": "3.7",
  "5950X": "3.4",
  "5945WX": "4.1",
  "5955WX": "4.0",
  "5965WX": "3.8",
  "5975WX": "3.6",
  "5995WX": "2.7",
  "7960X": "4.2",
  "7970X": "4.0",
  "7980X": "3.2",
  "7965WX": "4.2",
  "7975WX": "4.0",
  "7985WX": "3.2",
  "7995WX": "2.5",
  // ZEN4
  9754: "2.25",
  "9754S": "2.25",
  9734: "2.2",
  "9684X": "2.55",
  "9384X": "3.1",
  "9184X": "3.55",
  "9654P": "2.4",
  9654: "2.4",
  9634: "2.25",
  "9554P": "3.1",
  9554: "3.1",
  9534: "2.45",
  "9474F": "3.6",
  "9454P": "2.75",
  9454: "2.75",
  "9374F": "3.85",
  "9354P": "3.25",
  9354: "3.25",
  9334: "2.7",
  "9274F": "4.05",
  9254: "2.9",
  9224: "2.5",
  "9174F": "4.1",
  9124: "3.0"
}, Ir = {
  1: "Other",
  2: "Unknown",
  3: "Daughter Board",
  4: "ZIF Socket",
  5: "Replacement/Piggy Back",
  6: "None",
  7: "LIF Socket",
  8: "Slot 1",
  9: "Slot 2",
  10: "370 Pin Socket",
  11: "Slot A",
  12: "Slot M",
  13: "423",
  14: "A (Socket 462)",
  15: "478",
  16: "754",
  17: "940",
  18: "939",
  19: "mPGA604",
  20: "LGA771",
  21: "LGA775",
  22: "S1",
  23: "AM2",
  24: "F (1207)",
  25: "LGA1366",
  26: "G34",
  27: "AM3",
  28: "C32",
  29: "LGA1156",
  30: "LGA1567",
  31: "PGA988A",
  32: "BGA1288",
  33: "rPGA988B",
  34: "BGA1023",
  35: "BGA1224",
  36: "LGA1155",
  37: "LGA1356",
  38: "LGA2011",
  39: "FS1",
  40: "FS2",
  41: "FM1",
  42: "FM2",
  43: "LGA2011-3",
  44: "LGA1356-3",
  45: "LGA1150",
  46: "BGA1168",
  47: "BGA1234",
  48: "BGA1364",
  49: "AM4",
  50: "LGA1151",
  51: "BGA1356",
  52: "BGA1440",
  53: "BGA1515",
  54: "LGA3647-1",
  55: "SP3",
  56: "SP3r2",
  57: "LGA2066",
  58: "BGA1392",
  59: "BGA1510",
  60: "BGA1528",
  61: "LGA4189",
  62: "LGA1200",
  63: "LGA4677",
  64: "LGA1700",
  65: "BGA1744",
  66: "BGA1781",
  67: "BGA1211",
  68: "BGA2422",
  69: "LGA1211",
  70: "LGA2422",
  71: "LGA5773",
  72: "BGA5773"
}, _r = {
  LGA1150: "i7-5775C i3-4340 i3-4170 G3250 i3-4160T i3-4160 E3-1231 G3258 G3240 i7-4790S i7-4790K i7-4790 i5-4690K i5-4690 i5-4590T i5-4590S i5-4590 i5-4460 i3-4360 i3-4150 G1820 G3420 G3220 i7-4771 i5-4440 i3-4330 i3-4130T i3-4130 E3-1230 i7-4770S i7-4770K i7-4770 i5-4670K i5-4670 i5-4570T i5-4570S i5-4570 i5-4430",
  LGA1151: "i9-9900KS E-2288G E-2224 G5420 i9-9900T i9-9900 i7-9700T i7-9700F i7-9700E i7-9700 i5-9600 i5-9500T i5-9500F i5-9500 i5-9400T i3-9350K i3-9300 i3-9100T i3-9100F i3-9100 G4930 i9-9900KF i7-9700KF i5-9600KF i5-9400F i5-9400 i3-9350KF i9-9900K i7-9700K i5-9600K G5500 G5400 i7-8700T i7-8086K i5-8600 i5-8500T i5-8500 i5-8400T i3-8300 i3-8100T G4900 i7-8700K i7-8700 i5-8600K i5-8400 i3-8350K i3-8100 E3-1270 G4600 G4560 i7-7700T i7-7700K i7-7700 i5-7600K i5-7600 i5-7500T i5-7500 i5-7400 i3-7350K i3-7300 i3-7100T i3-7100 G3930 G3900 G4400 i7-6700T i7-6700K i7-6700 i5-6600K i5-6600 i5-6500T i5-6500 i5-6400T i5-6400 i3-6300 i3-6100T i3-6100 E3-1270 E3-1270 T4500 T4400",
  1155: "G440 G460 G465 G470 G530T G540T G550T G1610T G1620T G530 G540 G1610 G550 G1620 G555 G1630 i3-2100T i3-2120T i3-3220T i3-3240T i3-3250T i3-2100 i3-2105 i3-2102 i3-3210 i3-3220 i3-2125 i3-2120 i3-3225 i3-2130 i3-3245 i3-3240 i3-3250 i5-3570T i5-2500T i5-2400S i5-2405S i5-2390T i5-3330S i5-2500S i5-3335S i5-2300 i5-3450S i5-3340S i5-3470S i5-3475S i5-3470T i5-2310 i5-3550S i5-2320 i5-3330 i5-3350P i5-3450 i5-2400 i5-3340 i5-3570S i5-2380P i5-2450P i5-3470 i5-2500K i5-3550 i5-2500 i5-3570 i5-3570K i5-2550K i7-3770T i7-2600S i7-3770S i7-2600K i7-2600 i7-3770 i7-3770K i7-2700K G620T G630T G640T G2020T G645T G2100T G2030T G622 G860T G620 G632 G2120T G630 G640 G2010 G840 G2020 G850 G645 G2030 G860 G2120 G870 G2130 G2140 E3-1220L E3-1220L E3-1260L E3-1265L E3-1220 E3-1225 E3-1220 E3-1235 E3-1225 E3-1230 E3-1230 E3-1240 E3-1245 E3-1270 E3-1275 E3-1240 E3-1245 E3-1270 E3-1280 E3-1275 E3-1290 E3-1280 E3-1290"
};
function Da(t) {
  let i = "";
  for (const e in _r)
    _r[e].split(" ").forEach((s) => {
      t.indexOf(s) >= 0 && (i = e);
    });
  return i;
}
function Ui(t) {
  let i = t;
  return t = t.toLowerCase(), t.indexOf("intel") >= 0 && (i = "Intel"), t.indexOf("amd") >= 0 && (i = "AMD"), t.indexOf("qemu") >= 0 && (i = "QEMU"), t.indexOf("hygon") >= 0 && (i = "Hygon"), t.indexOf("centaur") >= 0 && (i = "WinChip/Via"), t.indexOf("vmware") >= 0 && (i = "VMware"), t.indexOf("Xen") >= 0 && (i = "Xen Hypervisor"), t.indexOf("tcg") >= 0 && (i = "QEMU"), t.indexOf("apple") >= 0 && (i = "Apple"), t.indexOf("sifive") >= 0 && (i = "SiFive"), t.indexOf("thead") >= 0 && (i = "T-Head"), t.indexOf("andestech") >= 0 && (i = "Andes Technology"), i;
}
function Ti(t) {
  t.brand = t.brand.replace(/\(R\)+/g, "®").replace(/\s+/g, " ").trim(), t.brand = t.brand.replace(/\(TM\)+/g, "™").replace(/\s+/g, " ").trim(), t.brand = t.brand.replace(/\(C\)+/g, "©").replace(/\s+/g, " ").trim(), t.brand = t.brand.replace(/CPU+/g, "").replace(/\s+/g, " ").trim(), t.manufacturer = Ui(t.brand);
  let i = t.brand.split(" ");
  return i.shift(), t.brand = i.join(" "), t;
}
function bn(t) {
  let i = "0";
  for (let e in Ln)
    if ({}.hasOwnProperty.call(Ln, e)) {
      let n = e.split("|"), s = 0;
      n.forEach((r) => {
        t.indexOf(r) > -1 && s++;
      }), s === n.length && (i = Ln[e]);
    }
  return parseFloat(i);
}
function Ba() {
  return new Promise((t) => {
    process.nextTick(() => {
      const i = "unknown";
      let e = {
        manufacturer: i,
        brand: i,
        vendor: "",
        family: "",
        model: "",
        stepping: "",
        revision: "",
        voltage: "",
        speed: 0,
        speedMin: 0,
        speedMax: 0,
        governor: "",
        cores: P.cores(),
        physicalCores: P.cores(),
        performanceCores: P.cores(),
        efficiencyCores: 0,
        processors: 1,
        socket: "",
        flags: "",
        virtualization: !1,
        cache: {}
      };
      Ts().then((n) => {
        if (e.flags = n, e.virtualization = n.indexOf("vmx") > -1 || n.indexOf("svm") > -1, on && he("sysctl machdep.cpu hw.cpufrequency_max hw.cpufrequency_min hw.packages hw.physicalcpu_max hw.ncpu hw.tbfrequency hw.cpufamily hw.cpusubfamily", function(s, r) {
          let o = r.toString().split(`
`);
          const l = P.getValue(o, "machdep.cpu.brand_string").split("@");
          e.brand = l[0].trim();
          const c = l[1] ? l[1].trim() : "0";
          e.speed = parseFloat(c.replace(/GHz+/g, ""));
          let u = P.getValue(o, "hw.tbfrequency") / 1e9;
          u = u < 0.1 ? u * 100 : u, e.speed = e.speed === 0 ? u : e.speed, Xt = e.speed, e = Ti(e), e.speedMin = P.getValue(o, "hw.cpufrequency_min") ? P.getValue(o, "hw.cpufrequency_min") / 1e9 : e.speed, e.speedMax = P.getValue(o, "hw.cpufrequency_max") ? P.getValue(o, "hw.cpufrequency_max") / 1e9 : e.speed, e.vendor = P.getValue(o, "machdep.cpu.vendor") || "Apple", e.family = P.getValue(o, "machdep.cpu.family") || P.getValue(o, "hw.cpufamily"), e.model = P.getValue(o, "machdep.cpu.model"), e.stepping = P.getValue(o, "machdep.cpu.stepping") || P.getValue(o, "hw.cpusubfamily"), e.virtualization = !0;
          const f = P.getValue(o, "hw.packages"), p = P.getValue(o, "hw.physicalcpu_max"), d = P.getValue(o, "hw.ncpu");
          if (Be.arch() === "arm64") {
            e.socket = "SOC";
            try {
              const m = sn("ioreg -c IOPlatformDevice -d 3 -r | grep cluster-type").toString().split(`
`), h = m.filter((g) => g.indexOf('"E"') >= 0).length, y = m.filter((g) => g.indexOf('"P"') >= 0).length;
              e.efficiencyCores = h, e.performanceCores = y;
            } catch {
              P.noop();
            }
          }
          f && (e.processors = parseInt(f) || 1), p && d && (e.cores = parseInt(d) || P.cores(), e.physicalCores = parseInt(p) || P.cores()), Ds().then((m) => {
            e.cache = m, t(e);
          });
        }), ni) {
          let s = "", r = [];
          Be.cpus()[0] && Be.cpus()[0].model && (s = Be.cpus()[0].model), he('export LC_ALL=C; lscpu; echo -n "Governor: "; cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null; echo; unset LC_ALL', function(o, a) {
            o || (r = a.toString().split(`
`)), s = P.getValue(r, "model name") || s, s = P.getValue(r, "bios model name") || s, s = P.cleanString(s);
            const l = s.split("@");
            if (e.brand = l[0].trim(), e.speed = l[1] ? parseFloat(l[1].trim()) : 0, e.speed === 0 && (e.brand.indexOf("AMD") > -1 || e.brand.toLowerCase().indexOf("ryzen") > -1) && (e.speed = bn(e.brand)), e.speed === 0) {
              const h = qn();
              h.avg !== 0 && (e.speed = h.avg);
            }
            Xt = e.speed, e.speedMin = Math.round(parseFloat(P.getValue(r, "cpu min mhz").replace(/,/g, ".")) / 10) / 100, e.speedMax = Math.round(parseFloat(P.getValue(r, "cpu max mhz").replace(/,/g, ".")) / 10) / 100, e = Ti(e), e.vendor = Ui(P.getValue(r, "vendor id")), e.family = P.getValue(r, "cpu family"), e.model = P.getValue(r, "model:"), e.stepping = P.getValue(r, "stepping"), e.revision = P.getValue(r, "cpu revision"), e.cache.l1d = P.getValue(r, "l1d cache"), e.cache.l1d && (e.cache.l1d = parseInt(e.cache.l1d) * (e.cache.l1d.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l1d.indexOf("K") !== -1 ? 1024 : 1)), e.cache.l1i = P.getValue(r, "l1i cache"), e.cache.l1i && (e.cache.l1i = parseInt(e.cache.l1i) * (e.cache.l1i.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l1i.indexOf("K") !== -1 ? 1024 : 1)), e.cache.l2 = P.getValue(r, "l2 cache"), e.cache.l2 && (e.cache.l2 = parseInt(e.cache.l2) * (e.cache.l2.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l2.indexOf("K") !== -1 ? 1024 : 1)), e.cache.l3 = P.getValue(r, "l3 cache"), e.cache.l3 && (e.cache.l3 = parseInt(e.cache.l3) * (e.cache.l3.indexOf("M") !== -1 ? 1024 * 1024 : e.cache.l3.indexOf("K") !== -1 ? 1024 : 1));
            const c = P.getValue(r, "thread(s) per core") || "1", u = P.getValue(r, "socket(s)") || "1", f = parseInt(c, 10), p = parseInt(u, 10) || 1, d = parseInt(P.getValue(r, "core(s) per socket"), 10);
            if (e.physicalCores = d ? d * p : e.cores / f, e.performanceCores = f > 1 ? e.cores - e.physicalCores : e.cores, e.efficiencyCores = f > 1 ? e.cores - f * e.performanceCores : 0, e.processors = p, e.governor = P.getValue(r, "governor") || "", e.vendor === "ARM" && P.isRaspberry()) {
              const h = P.decodePiCpuinfo();
              e.family = e.manufacturer, e.manufacturer = h.manufacturer, e.brand = h.processor, e.revision = h.revisionCode, e.socket = "SOC";
            }
            if (P.getValue(r, "architecture") === "riscv64") {
              const h = ji.readFileSync("/proc/cpuinfo").toString().split(`
`), y = P.getValue(h, "uarch") || "";
              if (y.indexOf(",") > -1) {
                const g = y.split(",");
                e.manufacturer = Ui(g[0]), e.brand = g[1];
              }
            }
            let m = [];
            he('export LC_ALL=C; dmidecode –t 4 2>/dev/null | grep "Upgrade: Socket"; unset LC_ALL', function(h, y) {
              m = y.toString().split(`
`), m && m.length && (e.socket = P.getValue(m, "Upgrade").replace("Socket", "").trim() || e.socket), t(e);
            });
          });
        }
        if (cn || ln || un) {
          let s = "", r = [];
          Be.cpus()[0] && Be.cpus()[0].model && (s = Be.cpus()[0].model), he("export LC_ALL=C; dmidecode -t 4; dmidecode -t 7 unset LC_ALL", function(o, a) {
            let l = [];
            if (!o) {
              const d = a.toString().split("# dmidecode"), m = d.length > 1 ? d[1] : "";
              l = d.length > 2 ? d[2].split("Cache Information") : [], r = m.split(`
`);
            }
            if (e.brand = s.split("@")[0].trim(), e.speed = s.split("@")[1] ? parseFloat(s.split("@")[1].trim()) : 0, e.speed === 0 && (e.brand.indexOf("AMD") > -1 || e.brand.toLowerCase().indexOf("ryzen") > -1) && (e.speed = bn(e.brand)), e.speed === 0) {
              const d = qn();
              d.avg !== 0 && (e.speed = d.avg);
            }
            Xt = e.speed, e.speedMin = e.speed, e.speedMax = Math.round(parseFloat(P.getValue(r, "max speed").replace(/Mhz/g, "")) / 10) / 100, e = Ti(e), e.vendor = Ui(P.getValue(r, "manufacturer"));
            let c = P.getValue(r, "signature");
            c = c.split(",");
            for (let d = 0; d < c.length; d++)
              c[d] = c[d].trim();
            e.family = P.getValue(c, "Family", " ", !0), e.model = P.getValue(c, "Model", " ", !0), e.stepping = P.getValue(c, "Stepping", " ", !0), e.revision = "";
            const u = parseFloat(P.getValue(r, "voltage"));
            e.voltage = isNaN(u) ? "" : u.toFixed(2);
            for (let d = 0; d < l.length; d++) {
              r = l[d].split(`
`);
              let m = P.getValue(r, "Socket Designation").toLowerCase().replace(" ", "-").split("-");
              m = m.length ? m[0] : "";
              const h = P.getValue(r, "Installed Size").split(" ");
              let y = parseInt(h[0], 10);
              const g = h.length > 1 ? h[1] : "kb";
              y = y * (g === "kb" ? 1024 : g === "mb" ? 1024 * 1024 : g === "gb" ? 1024 * 1024 * 1024 : 1), m && (m === "l1" ? (e.cache[m + "d"] = y / 2, e.cache[m + "i"] = y / 2) : e.cache[m] = y);
            }
            e.socket = P.getValue(r, "Upgrade").replace("Socket", "").trim();
            const f = P.getValue(r, "thread count").trim(), p = P.getValue(r, "core count").trim();
            p && f && (e.cores = parseInt(f, 10), e.physicalCores = parseInt(p, 10)), t(e);
          });
        }
        if (pn && t(e), an)
          try {
            const s = [];
            s.push(P.powerShell("Get-CimInstance Win32_processor | select Name, Revision, L2CacheSize, L3CacheSize, Manufacturer, MaxClockSpeed, Description, UpgradeMethod, Caption, NumberOfLogicalProcessors, NumberOfCores | fl")), s.push(P.powerShell("Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl")), s.push(P.powerShell("(Get-CimInstance Win32_ComputerSystem).HypervisorPresent")), Promise.all(
              s
            ).then((r) => {
              let o = r[0].split(`\r
`), a = P.getValue(o, "name", ":") || "";
              a.indexOf("@") >= 0 ? (e.brand = a.split("@")[0].trim(), e.speed = a.split("@")[1] ? parseFloat(a.split("@")[1].trim()) : 0, Xt = e.speed) : (e.brand = a.trim(), e.speed = 0), e = Ti(e), e.revision = P.getValue(o, "revision", ":"), e.vendor = P.getValue(o, "manufacturer", ":"), e.speedMax = Math.round(parseFloat(P.getValue(o, "maxclockspeed", ":").replace(/,/g, ".")) / 10) / 100, e.speed === 0 && (e.brand.indexOf("AMD") > -1 || e.brand.toLowerCase().indexOf("ryzen") > -1) && (e.speed = bn(e.brand)), e.speed === 0 && (e.speed = e.speedMax), e.speedMin = e.speed;
              let l = P.getValue(o, "description", ":").split(" ");
              for (let h = 0; h < l.length; h++)
                l[h].toLowerCase().startsWith("family") && h + 1 < l.length && l[h + 1] && (e.family = l[h + 1]), l[h].toLowerCase().startsWith("model") && h + 1 < l.length && l[h + 1] && (e.model = l[h + 1]), l[h].toLowerCase().startsWith("stepping") && h + 1 < l.length && l[h + 1] && (e.stepping = l[h + 1]);
              const c = P.getValue(o, "UpgradeMethod", ":");
              Ir[c] && (e.socket = Ir[c]);
              const u = Da(a);
              u && (e.socket = u);
              const f = P.countLines(o, "Caption"), p = P.getValue(o, "NumberOfLogicalProcessors", ":"), d = P.getValue(o, "NumberOfCores", ":");
              f && (e.processors = parseInt(f) || 1), d && p && (e.cores = parseInt(p) || P.cores(), e.physicalCores = parseInt(d) || P.cores()), f > 1 && (e.cores = e.cores * f, e.physicalCores = e.physicalCores * f), e.cache = Bs(r[0], r[1]);
              const m = r[2] ? r[2].toString().toLowerCase() : "";
              e.virtualization = m.indexOf("true") !== -1, t(e);
            });
          } catch {
            t(e);
          }
      });
    });
  });
}
function Va(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      Ba().then((e) => {
        t && t(e), i(e);
      });
    });
  });
}
wt.cpu = Va;
function qn() {
  let t = Be.cpus(), i = 999999999, e = 0, n = 0, s = [], r = [];
  if (t && t.length && t[0].speed)
    for (let o in t)
      r.push(t[o].speed > 100 ? (t[o].speed + 1) / 1e3 : t[o].speed / 10);
  else if (ni)
    try {
      const o = sn('cat /proc/cpuinfo | grep "cpu MHz" | cut -d " " -f 3', P.execOptsLinux).toString().split(`
`).filter((a) => a.length > 0);
      for (let a in o)
        r.push(Math.floor(parseInt(o[a], 10) / 10) / 100);
    } catch {
      P.noop();
    }
  if (r && r.length) {
    for (let o in r)
      n = n + r[o], r[o] > e && (e = r[o]), r[o] < i && (i = r[o]), s.push(parseFloat(r[o].toFixed(2)));
    return n = n / r.length, {
      min: parseFloat(i.toFixed(2)),
      max: parseFloat(e.toFixed(2)),
      avg: parseFloat(n.toFixed(2)),
      cores: s
    };
  } else
    return {
      min: 0,
      max: 0,
      avg: 0,
      cores: s
    };
}
function ka(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = qn();
      if (e.avg === 0 && Xt !== 0) {
        const n = parseFloat(Xt);
        e = {
          min: n,
          max: n,
          avg: n,
          cores: []
        };
      }
      t && t(e), i(e);
    });
  });
}
wt.cpuCurrentSpeed = ka;
function Na(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        main: null,
        cores: [],
        max: null,
        socket: [],
        chipset: null
      };
      if (ni) {
        try {
          const r = sn('cat /sys/class/thermal/thermal_zone*/type  2>/dev/null; echo "-----"; cat /sys/class/thermal/thermal_zone*/temp 2>/dev/null;', P.execOptsLinux).toString().split(`-----
`);
          if (r.length === 2) {
            const o = r[0].split(`
`), a = r[1].split(`
`);
            for (let l = 0; l < o.length; l++) {
              const c = o[l].trim();
              c.startsWith("acpi") && a[l] && e.socket.push(Math.round(parseInt(a[l], 10) / 100) / 10), c.startsWith("pch") && a[l] && (e.chipset = Math.round(parseInt(a[l], 10) / 100) / 10);
            }
          }
        } catch {
          P.noop();
        }
        const n = 'for mon in /sys/class/hwmon/hwmon*; do for label in "$mon"/temp*_label; do if [ -f $label ]; then value=${label%_*}_input; echo $(cat "$label")___$(cat "$value"); fi; done; done;';
        try {
          he(n, function(s, r) {
            r = r.toString();
            const o = r.toLowerCase().indexOf("tdie");
            o !== -1 && (r = r.substring(o));
            let a = r.split(`
`), l = 0;
            if (a.forEach((c) => {
              const u = c.split("___"), f = u[0], p = u.length > 1 && u[1] ? u[1] : "0";
              p && f && f.toLowerCase() === "tctl" && (l = e.main = Math.round(parseInt(p, 10) / 100) / 10), p && (f === void 0 || f && f.toLowerCase().startsWith("core")) ? e.cores.push(Math.round(parseInt(p, 10) / 100) / 10) : p && f && e.main === null && (f.toLowerCase().indexOf("package") >= 0 || f.toLowerCase().indexOf("physical") >= 0 || f.toLowerCase() === "tccd1") && (e.main = Math.round(parseInt(p, 10) / 100) / 10);
            }), l && e.main === null && (e.main = l), e.cores.length > 0) {
              e.main === null && (e.main = Math.round(e.cores.reduce((u, f) => u + f, 0) / e.cores.length));
              let c = Math.max.apply(Math, e.cores);
              e.max = c > e.main ? c : e.main;
            }
            if (e.main !== null) {
              e.max === null && (e.max = e.main), t && t(e), i(e);
              return;
            }
            he("sensors", function(c, u) {
              if (!c) {
                let f = u.toString().split(`
`), p = null, d = !0, m = "";
                if (f.forEach(function(h) {
                  h.trim() === "" ? d = !0 : d && (h.trim().toLowerCase().startsWith("acpi") && (m = "acpi"), h.trim().toLowerCase().startsWith("pch") && (m = "pch"), h.trim().toLowerCase().startsWith("core") && (m = "core"), d = !1);
                  let y = /[+-]([^°]*)/g, g = h.match(y), x = h.split(":")[0].toUpperCase();
                  m === "acpi" ? x.indexOf("TEMP") !== -1 && e.socket.push(parseFloat(g)) : m === "pch" && x.indexOf("TEMP") !== -1 && !e.chipset && (e.chipset = parseFloat(g)), (x.indexOf("PHYSICAL") !== -1 || x.indexOf("PACKAGE") !== -1) && (e.main = parseFloat(g)), x.indexOf("CORE ") !== -1 && e.cores.push(parseFloat(g)), x.indexOf("TDIE") !== -1 && p === null && (p = parseFloat(g));
                }), e.cores.length > 0) {
                  e.main = Math.round(e.cores.reduce((y, g) => y + g, 0) / e.cores.length);
                  let h = Math.max.apply(Math, e.cores);
                  e.max = h > e.main ? h : e.main;
                } else
                  e.main === null && p !== null && (e.main = p, e.max = p);
                if (e.main !== null || e.max !== null) {
                  t && t(e), i(e);
                  return;
                }
              }
              ji.stat("/sys/class/thermal/thermal_zone0/temp", function(f) {
                f === null ? ji.readFile("/sys/class/thermal/thermal_zone0/temp", function(p, d) {
                  if (!p) {
                    let m = d.toString().split(`
`);
                    m.length > 0 && (e.main = parseFloat(m[0]) / 1e3, e.max = e.main);
                  }
                  t && t(e), i(e);
                }) : he("/opt/vc/bin/vcgencmd measure_temp", function(p, d) {
                  if (!p) {
                    let m = d.toString().split(`
`);
                    m.length > 0 && m[0].indexOf("=") && (e.main = parseFloat(m[0].split("=")[1]), e.max = e.main);
                  }
                  t && t(e), i(e);
                });
              });
            });
          });
        } catch {
          t && t(e), i(e);
        }
      }
      if ((cn || ln || un) && he("sysctl dev.cpu | grep temp", function(n, s) {
        if (!n) {
          let r = s.toString().split(`
`), o = 0;
          r.forEach(function(a) {
            const l = a.split(":");
            if (l.length > 1) {
              const c = parseFloat(l[1].replace(",", "."));
              c > e.max && (e.max = c), o = o + c, e.cores.push(c);
            }
          }), e.cores.length && (e.main = Math.round(o / e.cores.length * 100) / 100);
        }
        t && t(e), i(e);
      }), on) {
        let n = null;
        try {
          n = require("osx-temperature-sensor");
        } catch {
          n = null;
        }
        if (n && (e = n.cpuTemperature(), e.main && (e.main = Math.round(e.main * 100) / 100), e.max && (e.max = Math.round(e.max * 100) / 100), e.cores && e.cores.length))
          for (let s = 0; s < e.cores.length; s++)
            e.cores[s] = Math.round(e.cores[s] * 100) / 100;
        t && t(e), i(e);
      }
      if (pn && (t && t(e), i(e)), an)
        try {
          P.powerShell('Get-CimInstance MSAcpi_ThermalZoneTemperature -Namespace "root/wmi" | Select CurrentTemperature').then((n, s) => {
            if (!s) {
              let r = 0;
              n.split(`\r
`).filter((a) => a.trim() !== "").filter((a, l) => l > 0).forEach(function(a) {
                let l = (parseInt(a, 10) - 2732) / 10;
                isNaN(l) || (r = r + l, l > e.max && (e.max = l), e.cores.push(l));
              }), e.cores.length && (e.main = r / e.cores.length);
            }
            t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}
wt.cpuTemperature = Na;
function Ts(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = "";
      if (an)
        try {
          he('reg query "HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0" /v FeatureSet', P.execOptsWin, function(n, s) {
            if (!n) {
              let r = s.split("0x").pop().trim(), o = parseInt(r, 16).toString(2), a = "0".repeat(32 - o.length) + o, l = [
                "fpu",
                "vme",
                "de",
                "pse",
                "tsc",
                "msr",
                "pae",
                "mce",
                "cx8",
                "apic",
                "",
                "sep",
                "mtrr",
                "pge",
                "mca",
                "cmov",
                "pat",
                "pse-36",
                "psn",
                "clfsh",
                "",
                "ds",
                "acpi",
                "mmx",
                "fxsr",
                "sse",
                "sse2",
                "ss",
                "htt",
                "tm",
                "ia64",
                "pbe"
              ];
              for (let c = 0; c < l.length; c++)
                a[c] === "1" && l[c] !== "" && (e += " " + l[c]);
              e = e.trim().toLowerCase();
            }
            t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
      if (ni)
        try {
          he("export LC_ALL=C; lscpu; unset LC_ALL", function(n, s) {
            n || s.toString().split(`
`).forEach(function(o) {
              o.split(":")[0].toUpperCase().indexOf("FLAGS") !== -1 && (e = o.split(":")[1].trim().toLowerCase());
            }), e ? (t && t(e), i(e)) : ji.readFile("/proc/cpuinfo", function(r, o) {
              if (!r) {
                let a = o.toString().split(`
`);
                e = P.getValue(a, "features", ":", !0).toLowerCase();
              }
              t && t(e), i(e);
            });
          });
        } catch {
          t && t(e), i(e);
        }
      (cn || ln || un) && he("export LC_ALL=C; dmidecode -t 4 2>/dev/null; unset LC_ALL", function(n, s) {
        let r = [];
        if (!n) {
          let o = s.toString().split("	Flags:");
          (o.length > 1 ? o[1].split("	Version:")[0].split(`
`) : []).forEach(function(l) {
            let c = (l.indexOf("(") ? l.split("(")[0].toLowerCase() : "").trim().replace(/\t/g, "");
            c && r.push(c);
          });
        }
        e = r.join(" ").trim().toLowerCase(), t && t(e), i(e);
      }), on && he("sysctl machdep.cpu.features", function(n, s) {
        if (!n) {
          let r = s.toString().split(`
`);
          r.length > 0 && r[0].indexOf("machdep.cpu.features:") !== -1 && (e = r[0].split(":")[1].trim().toLowerCase());
        }
        t && t(e), i(e);
      }), pn && (t && t(e), i(e));
    });
  });
}
wt.cpuFlags = Ts;
function Ds(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        l1d: null,
        l1i: null,
        l2: null,
        l3: null
      };
      if (ni)
        try {
          he("export LC_ALL=C; lscpu; unset LC_ALL", function(n, s) {
            n || s.toString().split(`
`).forEach(function(o) {
              let a = o.split(":");
              a[0].toUpperCase().indexOf("L1D CACHE") !== -1 && (e.l1d = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toUpperCase().indexOf("L1I CACHE") !== -1 && (e.l1i = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toUpperCase().indexOf("L2 CACHE") !== -1 && (e.l2 = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toUpperCase().indexOf("L3 CACHE") !== -1 && (e.l3 = parseInt(a[1].trim()) * (a[1].indexOf("M") !== -1 ? 1024 * 1024 : a[1].indexOf("K") !== -1 ? 1024 : 1));
            }), t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
      if ((cn || ln || un) && he("export LC_ALL=C; dmidecode -t 7 2>/dev/null; unset LC_ALL", function(n, s) {
        let r = [];
        n || (r = s.toString().split("Cache Information"), r.shift());
        for (let o = 0; o < r.length; o++) {
          const a = r[o].split(`
`);
          let l = P.getValue(a, "Socket Designation").toLowerCase().replace(" ", "-").split("-");
          l = l.length ? l[0] : "";
          const c = P.getValue(a, "Installed Size").split(" ");
          let u = parseInt(c[0], 10);
          const f = c.length > 1 ? c[1] : "kb";
          u = u * (f === "kb" ? 1024 : f === "mb" ? 1024 * 1024 : f === "gb" ? 1024 * 1024 * 1024 : 1), l && (l === "l1" ? (e.cache[l + "d"] = u / 2, e.cache[l + "i"] = u / 2) : e.cache[l] = u);
        }
        t && t(e), i(e);
      }), on && he("sysctl hw.l1icachesize hw.l1dcachesize hw.l2cachesize hw.l3cachesize", function(n, s) {
        n || s.toString().split(`
`).forEach(function(o) {
          let a = o.split(":");
          a[0].toLowerCase().indexOf("hw.l1icachesize") !== -1 && (e.l1d = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toLowerCase().indexOf("hw.l1dcachesize") !== -1 && (e.l1i = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toLowerCase().indexOf("hw.l2cachesize") !== -1 && (e.l2 = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1)), a[0].toLowerCase().indexOf("hw.l3cachesize") !== -1 && (e.l3 = parseInt(a[1].trim()) * (a[1].indexOf("K") !== -1 ? 1024 : 1));
        }), t && t(e), i(e);
      }), pn && (t && t(e), i(e)), an)
        try {
          const n = [];
          n.push(P.powerShell("Get-CimInstance Win32_processor | select L2CacheSize, L3CacheSize | fl")), n.push(P.powerShell("Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl")), Promise.all(
            n
          ).then((s) => {
            e = Bs(s[0], s[1]), t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}
function Bs(t, i) {
  let e = {
    l1d: null,
    l1i: null,
    l2: null,
    l3: null
  }, n = t.split(`\r
`);
  e.l1d = 0, e.l1i = 0, e.l2 = P.getValue(n, "l2cachesize", ":"), e.l3 = P.getValue(n, "l3cachesize", ":"), e.l2 ? e.l2 = parseInt(e.l2, 10) * 1024 : e.l2 = 0, e.l3 ? e.l3 = parseInt(e.l3, 10) * 1024 : e.l3 = 0;
  const s = i.split(/\n\s*\n/);
  let r = 0, o = 0, a = 0;
  return s.forEach(function(l) {
    const c = l.split(`\r
`), u = P.getValue(c, "CacheType"), f = P.getValue(c, "Level"), p = P.getValue(c, "InstalledSize");
    f === "3" && u === "3" && (e.l1i = e.l1i + parseInt(p, 10) * 1024), f === "3" && u === "4" && (e.l1d = e.l1d + parseInt(p, 10) * 1024), f === "3" && u === "5" && (r = parseInt(p, 10) / 2, o = parseInt(p, 10) / 2), f === "4" && u === "5" && (a = a + parseInt(p, 10) * 1024);
  }), !e.l1i && !e.l1d && (e.l1i = r, e.l1d = o), a && (e.l2 = a), e;
}
wt.cpuCache = Ds;
function Fa() {
  return new Promise((t) => {
    process.nextTick(() => {
      let i = Be.loadavg().map(function(r) {
        return r / P.cores();
      }), e = parseFloat(Math.max.apply(Math, i).toFixed(2)), n = {};
      if (Date.now() - Y.ms >= 200) {
        Y.ms = Date.now();
        const r = Be.cpus().map(function(g) {
          return g.times.steal = 0, g.times.guest = 0, g;
        });
        let o = 0, a = 0, l = 0, c = 0, u = 0, f = 0, p = 0, d = [];
        if (vn = r && r.length ? r.length : 0, ni)
          try {
            const g = sn("cat /proc/stat 2>/dev/null | grep cpu", P.execOptsLinux).toString().split(`
`);
            if (g.length > 1 && (g.shift(), g.length === r.length))
              for (let x = 0; x < g.length; x++) {
                let w = g[x].split(" ");
                if (w.length >= 10) {
                  const S = parseFloat(w[8]) || 0, C = parseFloat(w[9]) || 0;
                  r[x].times.steal = S, r[x].times.guest = C;
                }
              }
          } catch {
            P.noop();
          }
        for (let g = 0; g < vn; g++) {
          const x = r[g].times;
          o += x.user, a += x.sys, l += x.nice, u += x.idle, c += x.irq, f += x.steal || 0, p += x.guest || 0;
          let w = L && L[g] && L[g].totalTick ? L[g].totalTick : 0, S = L && L[g] && L[g].totalLoad ? L[g].totalLoad : 0, C = L && L[g] && L[g].user ? L[g].user : 0, _ = L && L[g] && L[g].sys ? L[g].sys : 0, O = L && L[g] && L[g].nice ? L[g].nice : 0, U = L && L[g] && L[g].idle ? L[g].idle : 0, I = L && L[g] && L[g].irq ? L[g].irq : 0, W = L && L[g] && L[g].steal ? L[g].steal : 0, V = L && L[g] && L[g].guest ? L[g].guest : 0;
          L[g] = x, L[g].totalTick = L[g].user + L[g].sys + L[g].nice + L[g].irq + L[g].steal + L[g].guest + L[g].idle, L[g].totalLoad = L[g].user + L[g].sys + L[g].nice + L[g].irq + L[g].steal + L[g].guest, L[g].currentTick = L[g].totalTick - w, L[g].load = L[g].totalLoad - S, L[g].loadUser = L[g].user - C, L[g].loadSystem = L[g].sys - _, L[g].loadNice = L[g].nice - O, L[g].loadIdle = L[g].idle - U, L[g].loadIrq = L[g].irq - I, L[g].loadSteal = L[g].steal - W, L[g].loadGuest = L[g].guest - V, d[g] = {}, d[g].load = L[g].load / L[g].currentTick * 100, d[g].loadUser = L[g].loadUser / L[g].currentTick * 100, d[g].loadSystem = L[g].loadSystem / L[g].currentTick * 100, d[g].loadNice = L[g].loadNice / L[g].currentTick * 100, d[g].loadIdle = L[g].loadIdle / L[g].currentTick * 100, d[g].loadIrq = L[g].loadIrq / L[g].currentTick * 100, d[g].loadSteal = L[g].loadSteal / L[g].currentTick * 100, d[g].loadGuest = L[g].loadGuest / L[g].currentTick * 100, d[g].rawLoad = L[g].load, d[g].rawLoadUser = L[g].loadUser, d[g].rawLoadSystem = L[g].loadSystem, d[g].rawLoadNice = L[g].loadNice, d[g].rawLoadIdle = L[g].loadIdle, d[g].rawLoadIrq = L[g].loadIrq, d[g].rawLoadSteal = L[g].loadSteal, d[g].rawLoadGuest = L[g].loadGuest;
        }
        let m = o + a + l + c + f + p + u, h = o + a + l + c + f + p, y = m - Y.tick;
        n = {
          avgLoad: e,
          currentLoad: (h - Y.load) / y * 100,
          currentLoadUser: (o - Y.user) / y * 100,
          currentLoadSystem: (a - Y.system) / y * 100,
          currentLoadNice: (l - Y.nice) / y * 100,
          currentLoadIdle: (u - Y.idle) / y * 100,
          currentLoadIrq: (c - Y.irq) / y * 100,
          currentLoadSteal: (f - Y.steal) / y * 100,
          currentLoadGuest: (p - Y.guest) / y * 100,
          rawCurrentLoad: h - Y.load,
          rawCurrentLoadUser: o - Y.user,
          rawCurrentLoadSystem: a - Y.system,
          rawCurrentLoadNice: l - Y.nice,
          rawCurrentLoadIdle: u - Y.idle,
          rawCurrentLoadIrq: c - Y.irq,
          rawCurrentLoadSteal: f - Y.steal,
          rawCurrentLoadGuest: p - Y.guest,
          cpus: d
        }, Y = {
          user: o,
          nice: l,
          system: a,
          idle: u,
          irq: c,
          steal: f,
          guest: p,
          tick: m,
          load: h,
          ms: Y.ms,
          currentLoad: n.currentLoad,
          currentLoadUser: n.currentLoadUser,
          currentLoadSystem: n.currentLoadSystem,
          currentLoadNice: n.currentLoadNice,
          currentLoadIdle: n.currentLoadIdle,
          currentLoadIrq: n.currentLoadIrq,
          currentLoadSteal: n.currentLoadSteal,
          currentLoadGuest: n.currentLoadGuest,
          rawCurrentLoad: n.rawCurrentLoad,
          rawCurrentLoadUser: n.rawCurrentLoadUser,
          rawCurrentLoadSystem: n.rawCurrentLoadSystem,
          rawCurrentLoadNice: n.rawCurrentLoadNice,
          rawCurrentLoadIdle: n.rawCurrentLoadIdle,
          rawCurrentLoadIrq: n.rawCurrentLoadIrq,
          rawCurrentLoadSteal: n.rawCurrentLoadSteal,
          rawCurrentLoadGuest: n.rawCurrentLoadGuest
        };
      } else {
        let r = [];
        for (let o = 0; o < vn; o++)
          r[o] = {}, r[o].load = L[o].load / L[o].currentTick * 100, r[o].loadUser = L[o].loadUser / L[o].currentTick * 100, r[o].loadSystem = L[o].loadSystem / L[o].currentTick * 100, r[o].loadNice = L[o].loadNice / L[o].currentTick * 100, r[o].loadIdle = L[o].loadIdle / L[o].currentTick * 100, r[o].loadIrq = L[o].loadIrq / L[o].currentTick * 100, r[o].rawLoad = L[o].load, r[o].rawLoadUser = L[o].loadUser, r[o].rawLoadSystem = L[o].loadSystem, r[o].rawLoadNice = L[o].loadNice, r[o].rawLoadIdle = L[o].loadIdle, r[o].rawLoadIrq = L[o].loadIrq, r[o].rawLoadSteal = L[o].loadSteal, r[o].rawLoadGuest = L[o].loadGuest;
        n = {
          avgLoad: e,
          currentLoad: Y.currentLoad,
          currentLoadUser: Y.currentLoadUser,
          currentLoadSystem: Y.currentLoadSystem,
          currentLoadNice: Y.currentLoadNice,
          currentLoadIdle: Y.currentLoadIdle,
          currentLoadIrq: Y.currentLoadIrq,
          currentLoadSteal: Y.currentLoadSteal,
          currentLoadGuest: Y.currentLoadGuest,
          rawCurrentLoad: Y.rawCurrentLoad,
          rawCurrentLoadUser: Y.rawCurrentLoadUser,
          rawCurrentLoadSystem: Y.rawCurrentLoadSystem,
          rawCurrentLoadNice: Y.rawCurrentLoadNice,
          rawCurrentLoadIdle: Y.rawCurrentLoadIdle,
          rawCurrentLoadIrq: Y.rawCurrentLoadIrq,
          rawCurrentLoadSteal: Y.rawCurrentLoadSteal,
          rawCurrentLoadGuest: Y.rawCurrentLoadGuest,
          cpus: r
        };
      }
      t(n);
    });
  });
}
function Wa(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      Fa().then((e) => {
        t && t(e), i(e);
      });
    });
  });
}
wt.currentLoad = Wa;
function Ra() {
  return new Promise((t) => {
    process.nextTick(() => {
      const i = Be.cpus();
      let e = 0, n = 0, s = 0, r = 0, o = 0, a = 0;
      if (i && i.length) {
        for (let c = 0, u = i.length; c < u; c++) {
          const f = i[c].times;
          e += f.user, n += f.sys, s += f.nice, r += f.irq, o += f.idle;
        }
        let l = o + r + s + n + e;
        a = (l - o) / l * 100;
      }
      t(a);
    });
  });
}
function Ga(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      Ra().then((e) => {
        t && t(e), i(e);
      });
    });
  });
}
wt.fullLoad = Ga;
var rr = {};
const We = se, gi = te.exec, $i = te.execSync, M = T, Ua = Fe;
let rt = process.platform;
const Vs = rt === "linux" || rt === "android", ks = rt === "darwin", Ns = rt === "win32", Fs = rt === "freebsd", Ws = rt === "openbsd", Rs = rt === "netbsd", Gs = rt === "sunos", Or = {
  "0x014F": "Transcend Information",
  "0x2C00": "Micron Technology Inc.",
  "0x802C": "Micron Technology Inc.",
  "0x80AD": "Hynix Semiconductor Inc.",
  "0x80CE": "Samsung Electronics Inc.",
  "0xAD00": "Hynix Semiconductor Inc.",
  "0xCE00": "Samsung Electronics Inc.",
  "0x02FE": "Elpida",
  "0x5105": "Qimonda AG i. In.",
  "0x8551": "Qimonda AG i. In.",
  "0x859B": "Crucial",
  "0x04CD": "G-Skill"
}, Pr = {
  "017A": "Apacer",
  "0198": "HyperX",
  "029E": "Corsair",
  "04CB": "A-DATA",
  "04CD": "G-Skill",
  "059B": "Crucial",
  "00CE": "Samsung",
  1315: "Crucial",
  "014F": "Transcend Information",
  "2C00": "Micron Technology Inc.",
  "802C": "Micron Technology Inc.",
  "80AD": "Hynix Semiconductor Inc.",
  "80CE": "Samsung Electronics Inc.",
  AD00: "Hynix Semiconductor Inc.",
  CE00: "Samsung Electronics Inc.",
  "02FE": "Elpida",
  5105: "Qimonda AG i. In.",
  8551: "Qimonda AG i. In.",
  "859B": "Crucial"
};
function $a(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        total: We.totalmem(),
        free: We.freemem(),
        used: We.totalmem() - We.freemem(),
        active: We.totalmem() - We.freemem(),
        // temporarily (fallback)
        available: We.freemem(),
        // temporarily (fallback)
        buffers: 0,
        cached: 0,
        slab: 0,
        buffcache: 0,
        swaptotal: 0,
        swapused: 0,
        swapfree: 0,
        writeback: null,
        dirty: null
      };
      if (Vs)
        try {
          Ua.readFile("/proc/meminfo", function(n, s) {
            if (!n) {
              const r = s.toString().split(`
`);
              e.total = parseInt(M.getValue(r, "memtotal"), 10), e.total = e.total ? e.total * 1024 : We.totalmem(), e.free = parseInt(M.getValue(r, "memfree"), 10), e.free = e.free ? e.free * 1024 : We.freemem(), e.used = e.total - e.free, e.buffers = parseInt(M.getValue(r, "buffers"), 10), e.buffers = e.buffers ? e.buffers * 1024 : 0, e.cached = parseInt(M.getValue(r, "cached"), 10), e.cached = e.cached ? e.cached * 1024 : 0, e.slab = parseInt(M.getValue(r, "slab"), 10), e.slab = e.slab ? e.slab * 1024 : 0, e.buffcache = e.buffers + e.cached + e.slab;
              let o = parseInt(M.getValue(r, "memavailable"), 10);
              e.available = o ? o * 1024 : e.free + e.buffcache, e.active = e.total - e.available, e.swaptotal = parseInt(M.getValue(r, "swaptotal"), 10), e.swaptotal = e.swaptotal ? e.swaptotal * 1024 : 0, e.swapfree = parseInt(M.getValue(r, "swapfree"), 10), e.swapfree = e.swapfree ? e.swapfree * 1024 : 0, e.swapused = e.swaptotal - e.swapfree, e.writeback = parseInt(M.getValue(r, "writeback"), 10), e.writeback = e.writeback ? e.writeback * 1024 : 0, e.dirty = parseInt(M.getValue(r, "dirty"), 10), e.dirty = e.dirty ? e.dirty * 1024 : 0;
            }
            t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
      if (Fs || Ws || Rs)
        try {
          gi("/sbin/sysctl hw.realmem hw.physmem vm.stats.vm.v_page_count vm.stats.vm.v_wire_count vm.stats.vm.v_active_count vm.stats.vm.v_inactive_count vm.stats.vm.v_cache_count vm.stats.vm.v_free_count vm.stats.vm.v_page_size", function(n, s) {
            if (!n) {
              let r = s.toString().split(`
`);
              const o = parseInt(M.getValue(r, "vm.stats.vm.v_page_size"), 10), a = parseInt(M.getValue(r, "vm.stats.vm.v_inactive_count"), 10) * o, l = parseInt(M.getValue(r, "vm.stats.vm.v_cache_count"), 10) * o;
              e.total = parseInt(M.getValue(r, "hw.realmem"), 10), isNaN(e.total) && (e.total = parseInt(M.getValue(r, "hw.physmem"), 10)), e.free = parseInt(M.getValue(r, "vm.stats.vm.v_free_count"), 10) * o, e.buffcache = a + l, e.available = e.buffcache + e.free, e.active = e.total - e.free - e.buffcache, e.swaptotal = 0, e.swapfree = 0, e.swapused = 0;
            }
            t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
      if (Gs && (t && t(e), i(e)), ks) {
        let n = 4096;
        try {
          n = M.toInt($i("sysctl -n vm.pagesize").toString()) || n;
        } catch {
          M.noop();
        }
        try {
          gi('vm_stat 2>/dev/null | grep "Pages active"', function(s, r) {
            if (!s) {
              let o = r.toString().split(`
`);
              e.active = parseInt(o[0].split(":")[1], 10) * n, e.buffcache = e.used - e.active, e.available = e.free + e.buffcache;
            }
            gi("sysctl -n vm.swapusage 2>/dev/null", function(o, a) {
              if (!o) {
                let l = a.toString().split(`
`);
                l.length > 0 && l[0].replace(/,/g, ".").replace(/M/g, "").trim().split("  ").forEach((f) => {
                  f.toLowerCase().indexOf("total") !== -1 && (e.swaptotal = parseFloat(f.split("=")[1].trim()) * 1024 * 1024), f.toLowerCase().indexOf("used") !== -1 && (e.swapused = parseFloat(f.split("=")[1].trim()) * 1024 * 1024), f.toLowerCase().indexOf("free") !== -1 && (e.swapfree = parseFloat(f.split("=")[1].trim()) * 1024 * 1024);
                });
              }
              t && t(e), i(e);
            });
          });
        } catch {
          t && t(e), i(e);
        }
      }
      if (Ns) {
        let n = 0, s = 0;
        try {
          M.powerShell("Get-CimInstance Win32_PageFileUsage | Select AllocatedBaseSize, CurrentUsage").then((r, o) => {
            o || r.split(`\r
`).filter((l) => l.trim() !== "").filter((l, c) => c > 0).forEach(function(l) {
              l !== "" && (l = l.trim().split(/\s\s+/), n = n + (parseInt(l[0], 10) || 0), s = s + (parseInt(l[1], 10) || 0));
            }), e.swaptotal = n * 1024 * 1024, e.swapused = s * 1024 * 1024, e.swapfree = e.swaptotal - e.swapused, t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
      }
    });
  });
}
rr.mem = $a;
function za(t) {
  function i(n) {
    return {}.hasOwnProperty.call(Or, n) ? Or[n] : n;
  }
  function e(n) {
    const s = n.replace("0x", "").toUpperCase();
    return s.length === 4 && {}.hasOwnProperty.call(Pr, s) ? Pr[s] : n;
  }
  return new Promise((n) => {
    process.nextTick(() => {
      let s = [];
      if ((Vs || Fs || Ws || Rs) && gi('export LC_ALL=C; dmidecode -t memory 2>/dev/null | grep -iE "Size:|Type|Speed|Manufacturer|Form Factor|Locator|Memory Device|Serial Number|Voltage|Part Number"; unset LC_ALL', function(r, o) {
        if (!r) {
          let a = o.toString().split("Memory Device");
          a.shift(), a.forEach(function(l) {
            let c = l.split(`
`);
            const u = M.getValue(c, "Size"), f = u.indexOf("GB") >= 0 ? parseInt(u, 10) * 1024 * 1024 * 1024 : parseInt(u, 10) * 1024 * 1024;
            let p = M.getValue(c, "Bank Locator");
            if (p.toLowerCase().indexOf("bad") >= 0 && (p = ""), parseInt(M.getValue(c, "Size"), 10) > 0) {
              const d = M.toInt(M.getValue(c, "Total Width")), m = M.toInt(M.getValue(c, "Data Width"));
              s.push({
                size: f,
                bank: p,
                type: M.getValue(c, "Type:"),
                ecc: m && d ? d > m : !1,
                clockSpeed: M.getValue(c, "Configured Clock Speed:") ? parseInt(M.getValue(c, "Configured Clock Speed:"), 10) : M.getValue(c, "Speed:") ? parseInt(M.getValue(c, "Speed:"), 10) : null,
                formFactor: M.getValue(c, "Form Factor:"),
                manufacturer: e(M.getValue(c, "Manufacturer:")),
                partNum: M.getValue(c, "Part Number:"),
                serialNum: M.getValue(c, "Serial Number:"),
                voltageConfigured: parseFloat(M.getValue(c, "Configured Voltage:")) || null,
                voltageMin: parseFloat(M.getValue(c, "Minimum Voltage:")) || null,
                voltageMax: parseFloat(M.getValue(c, "Maximum Voltage:")) || null
              });
            } else
              s.push({
                size: 0,
                bank: p,
                type: "Empty",
                ecc: null,
                clockSpeed: 0,
                formFactor: M.getValue(c, "Form Factor:"),
                partNum: "",
                serialNum: "",
                voltageConfigured: null,
                voltageMin: null,
                voltageMax: null
              });
          });
        }
        if (!s.length) {
          s.push({
            size: We.totalmem(),
            bank: "",
            type: "",
            ecc: null,
            clockSpeed: 0,
            formFactor: "",
            partNum: "",
            serialNum: "",
            voltageConfigured: null,
            voltageMin: null,
            voltageMax: null
          });
          try {
            let a = $i("cat /proc/cpuinfo 2>/dev/null", M.execOptsLinux), l = a.toString().split(`
`), c = M.getValue(l, "revision", ":", !0).toLowerCase();
            if (M.isRaspberry(l)) {
              const u = {
                0: 400,
                1: 450,
                2: 450,
                3: 3200,
                4: 4267
              };
              s[0].type = "LPDDR2", s[0].type = c && c[2] && c[2] === "3" ? "LPDDR4" : s[0].type, s[0].type = c && c[2] && c[2] === "4" ? "LPDDR4X" : s[0].type, s[0].ecc = !1, s[0].clockSpeed = c && c[2] && u[c[2]] || 400, s[0].clockSpeed = c && c[4] && c[4] === "d" ? 500 : s[0].clockSpeed, s[0].formFactor = "SoC", a = $i("vcgencmd get_config sdram_freq 2>/dev/null", M.execOptsLinux), l = a.toString().split(`
`);
              let f = parseInt(M.getValue(l, "sdram_freq", "=", !0), 10) || 0;
              f && (s[0].clockSpeed = f), a = $i("vcgencmd measure_volts sdram_p 2>/dev/null", M.execOptsLinux), l = a.toString().split(`
`);
              let p = parseFloat(M.getValue(l, "volt", "=", !0)) || 0;
              p && (s[0].voltageConfigured = p, s[0].voltageMin = p, s[0].voltageMax = p);
            }
          } catch {
            M.noop();
          }
        }
        t && t(s), n(s);
      }), ks && gi("system_profiler SPMemoryDataType", function(r, o) {
        if (!r) {
          const a = o.toString().split(`
`), l = M.getValue(a, "ecc", ":", !0).toLowerCase();
          let c = o.toString().split("        BANK "), u = !0;
          c.length === 1 && (c = o.toString().split("        DIMM"), u = !1), c.shift(), c.forEach(function(f) {
            let p = f.split(`
`);
            const d = (u ? "BANK " : "DIMM") + p[0].trim().split("/")[0], m = parseInt(M.getValue(p, "          Size"));
            m ? s.push({
              size: m * 1024 * 1024 * 1024,
              bank: d,
              type: M.getValue(p, "          Type:"),
              ecc: l ? l === "enabled" : null,
              clockSpeed: parseInt(M.getValue(p, "          Speed:"), 10),
              formFactor: "",
              manufacturer: i(M.getValue(p, "          Manufacturer:")),
              partNum: M.getValue(p, "          Part Number:"),
              serialNum: M.getValue(p, "          Serial Number:"),
              voltageConfigured: null,
              voltageMin: null,
              voltageMax: null
            }) : s.push({
              size: 0,
              bank: d,
              type: "Empty",
              ecc: null,
              clockSpeed: 0,
              formFactor: "",
              manufacturer: "",
              partNum: "",
              serialNum: "",
              voltageConfigured: null,
              voltageMin: null,
              voltageMax: null
            });
          });
        }
        if (!s.length) {
          const a = o.toString().split(`
`), l = parseInt(M.getValue(a, "      Memory:")), c = M.getValue(a, "      Type:"), u = M.getValue(a, "      Manufacturer:");
          l && c && s.push({
            size: l * 1024 * 1024 * 1024,
            bank: "0",
            type: c,
            ecc: !1,
            clockSpeed: null,
            formFactor: "SOC",
            manufacturer: i(u),
            partNum: "",
            serialNum: "",
            voltageConfigured: null,
            voltageMin: null,
            voltageMax: null
          });
        }
        t && t(s), n(s);
      }), Gs && (t && t(s), n(s)), Ns) {
        const r = "Unknown|Other|DRAM|Synchronous DRAM|Cache DRAM|EDO|EDRAM|VRAM|SRAM|RAM|ROM|FLASH|EEPROM|FEPROM|EPROM|CDRAM|3DRAM|SDRAM|SGRAM|RDRAM|DDR|DDR2|DDR2 FB-DIMM|Reserved|DDR3|FBD2|DDR4|LPDDR|LPDDR2|LPDDR3|LPDDR4|Logical non-volatile device|HBM|HBM2|DDR5|LPDDR5".split("|"), o = "Unknown|Other|SIP|DIP|ZIP|SOJ|Proprietary|SIMM|DIMM|TSOP|PGA|RIMM|SODIMM|SRIMM|SMD|SSMP|QFP|TQFP|SOIC|LCC|PLCC|BGA|FPBGA|LGA".split("|");
        try {
          M.powerShell("Get-CimInstance Win32_PhysicalMemory | select DataWidth,TotalWidth,Capacity,BankLabel,MemoryType,SMBIOSMemoryType,ConfiguredClockSpeed,Speed,FormFactor,Manufacturer,PartNumber,SerialNumber,ConfiguredVoltage,MinVoltage,MaxVoltage,Tag | fl").then((a, l) => {
            if (!l) {
              let c = a.toString().split(/\n\s*\n/);
              c.shift(), c.forEach(function(u) {
                let f = u.split(`\r
`);
                const p = M.toInt(M.getValue(f, "DataWidth", ":")), d = M.toInt(M.getValue(f, "TotalWidth", ":")), m = parseInt(M.getValue(f, "Capacity", ":"), 10) || 0, h = M.getValue(f, "Tag", ":"), y = M.splitByNumber(h);
                m && s.push({
                  size: m,
                  bank: M.getValue(f, "BankLabel", ":") + (y[1] ? "/" + y[1] : ""),
                  // BankLabel
                  type: r[parseInt(M.getValue(f, "MemoryType", ":"), 10) || parseInt(M.getValue(f, "SMBIOSMemoryType", ":"), 10)],
                  ecc: p && d ? d > p : !1,
                  clockSpeed: parseInt(M.getValue(f, "ConfiguredClockSpeed", ":"), 10) || parseInt(M.getValue(f, "Speed", ":"), 10) || 0,
                  formFactor: o[parseInt(M.getValue(f, "FormFactor", ":"), 10) || 0],
                  manufacturer: M.getValue(f, "Manufacturer", ":"),
                  partNum: M.getValue(f, "PartNumber", ":"),
                  serialNum: M.getValue(f, "SerialNumber", ":"),
                  voltageConfigured: (parseInt(M.getValue(f, "ConfiguredVoltage", ":"), 10) || 0) / 1e3,
                  voltageMin: (parseInt(M.getValue(f, "MinVoltage", ":"), 10) || 0) / 1e3,
                  voltageMax: (parseInt(M.getValue(f, "MaxVoltage", ":"), 10) || 0) / 1e3
                });
              });
            }
            t && t(s), n(s);
          });
        } catch {
          t && t(s), n(s);
        }
      }
    });
  });
}
rr.memLayout = za;
const Ar = te.exec, Rt = Fe, q = T;
let st = process.platform;
const Ha = st === "linux" || st === "android", qa = st === "darwin", ja = st === "win32", Xa = st === "freebsd", Ka = st === "openbsd", Ya = st === "netbsd", Ja = st === "sunos";
function Qa(t, i, e) {
  const n = {};
  let s = q.getValue(t, "BatteryStatus", ":").trim();
  if (s >= 0) {
    const r = s ? parseInt(s) : 0;
    n.status = r, n.hasBattery = !0, n.maxCapacity = e || parseInt(q.getValue(t, "DesignCapacity", ":") || 0), n.designedCapacity = parseInt(q.getValue(t, "DesignCapacity", ":") || i), n.voltage = parseInt(q.getValue(t, "DesignVoltage", ":") || 0) / 1e3, n.capacityUnit = "mWh", n.percent = parseInt(q.getValue(t, "EstimatedChargeRemaining", ":") || 0), n.currentCapacity = parseInt(n.maxCapacity * n.percent / 100), n.isCharging = r >= 6 && r <= 9 || r === 11 || r !== 3 && r !== 1 && n.percent < 100, n.acConnected = n.isCharging || r === 2, n.model = q.getValue(t, "DeviceID", ":");
  } else
    n.status = -1;
  return n;
}
var Za = function(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = {
        hasBattery: !1,
        cycleCount: 0,
        isCharging: !1,
        designedCapacity: 0,
        maxCapacity: 0,
        currentCapacity: 0,
        voltage: 0,
        capacityUnit: "",
        percent: 0,
        timeRemaining: null,
        acConnected: !0,
        type: "",
        model: "",
        manufacturer: "",
        serial: ""
      };
      if (Ha) {
        let n = "";
        Rt.existsSync("/sys/class/power_supply/BAT1/uevent") ? n = "/sys/class/power_supply/BAT1/" : Rt.existsSync("/sys/class/power_supply/BAT0/uevent") && (n = "/sys/class/power_supply/BAT0/");
        let s = !1, r = "";
        Rt.existsSync("/sys/class/power_supply/AC/online") ? r = "/sys/class/power_supply/AC/online" : Rt.existsSync("/sys/class/power_supply/AC0/online") && (r = "/sys/class/power_supply/AC0/online"), r && (s = Rt.readFileSync(r).toString().trim() === "1"), n ? Rt.readFile(n + "uevent", function(o, a) {
          if (o)
            t && t(e), i(e);
          else {
            let l = a.toString().split(`
`);
            e.isCharging = q.getValue(l, "POWER_SUPPLY_STATUS", "=").toLowerCase() === "charging", e.acConnected = s || e.isCharging, e.voltage = parseInt("0" + q.getValue(l, "POWER_SUPPLY_VOLTAGE_NOW", "="), 10) / 1e6, e.capacityUnit = e.voltage ? "mWh" : "mAh", e.cycleCount = parseInt("0" + q.getValue(l, "POWER_SUPPLY_CYCLE_COUNT", "="), 10), e.maxCapacity = Math.round(parseInt("0" + q.getValue(l, "POWER_SUPPLY_CHARGE_FULL", "=", !0, !0), 10) / 1e3 * (e.voltage || 1));
            const c = parseInt("0" + q.getValue(l, "POWER_SUPPLY_VOLTAGE_MIN_DESIGN", "="), 10) / 1e6;
            e.designedCapacity = Math.round(parseInt("0" + q.getValue(l, "POWER_SUPPLY_CHARGE_FULL_DESIGN", "=", !0, !0), 10) / 1e3 * (c || e.voltage || 1)), e.currentCapacity = Math.round(parseInt("0" + q.getValue(l, "POWER_SUPPLY_CHARGE_NOW", "="), 10) / 1e3 * (e.voltage || 1)), e.maxCapacity || (e.maxCapacity = parseInt("0" + q.getValue(l, "POWER_SUPPLY_ENERGY_FULL", "=", !0, !0), 10) / 1e3, e.designedCapacity = parseInt("0" + q.getValue(l, "POWER_SUPPLY_ENERGY_FULL_DESIGN", "=", !0, !0), 10) / 1e3 | e.maxCapacity, e.currentCapacity = parseInt("0" + q.getValue(l, "POWER_SUPPLY_ENERGY_NOW", "="), 10) / 1e3);
            const u = q.getValue(l, "POWER_SUPPLY_CAPACITY", "="), f = parseInt("0" + q.getValue(l, "POWER_SUPPLY_ENERGY_NOW", "="), 10), p = parseInt("0" + q.getValue(l, "POWER_SUPPLY_POWER_NOW", "="), 10), d = parseInt("0" + q.getValue(l, "POWER_SUPPLY_CURRENT_NOW", "="), 10), m = parseInt("0" + q.getValue(l, "POWER_SUPPLY_CHARGE_NOW", "="), 10);
            e.percent = parseInt("0" + u, 10), e.maxCapacity && e.currentCapacity && (e.hasBattery = !0, u || (e.percent = 100 * e.currentCapacity / e.maxCapacity)), e.isCharging && (e.hasBattery = !0), f && p ? e.timeRemaining = Math.floor(f / p * 60) : d && m ? e.timeRemaining = Math.floor(m / d * 60) : d && e.currentCapacity && (e.timeRemaining = Math.floor(e.currentCapacity / d * 60)), e.type = q.getValue(l, "POWER_SUPPLY_TECHNOLOGY", "="), e.model = q.getValue(l, "POWER_SUPPLY_MODEL_NAME", "="), e.manufacturer = q.getValue(l, "POWER_SUPPLY_MANUFACTURER", "="), e.serial = q.getValue(l, "POWER_SUPPLY_SERIAL_NUMBER", "="), t && t(e), i(e);
          }
        }) : (t && t(e), i(e));
      }
      if ((Xa || Ka || Ya) && Ar("sysctl -i hw.acpi.battery hw.acpi.acline", function(n, s) {
        let r = s.toString().split(`
`);
        const o = parseInt("0" + q.getValue(r, "hw.acpi.battery.units"), 10), a = parseInt("0" + q.getValue(r, "hw.acpi.battery.life"), 10);
        e.hasBattery = o > 0, e.cycleCount = null, e.isCharging = q.getValue(r, "hw.acpi.acline") !== "1", e.acConnected = e.isCharging, e.maxCapacity = null, e.currentCapacity = null, e.capacityUnit = "unknown", e.percent = o ? a : null, t && t(e), i(e);
      }), qa && Ar('ioreg -n AppleSmartBattery -r | egrep "CycleCount|IsCharging|DesignCapacity|MaxCapacity|CurrentCapacity|DeviceName|BatterySerialNumber|Serial|TimeRemaining|Voltage"; pmset -g batt | grep %', function(n, s) {
        if (s) {
          let r = s.toString().replace(/ +/g, "").replace(/"+/g, "").replace(/-/g, "").split(`
`);
          e.cycleCount = parseInt("0" + q.getValue(r, "cyclecount", "="), 10), e.voltage = parseInt("0" + q.getValue(r, "voltage", "="), 10) / 1e3, e.capacityUnit = e.voltage ? "mWh" : "mAh", e.maxCapacity = Math.round(parseInt("0" + q.getValue(r, "applerawmaxcapacity", "="), 10) * (e.voltage || 1)), e.currentCapacity = Math.round(parseInt("0" + q.getValue(r, "applerawcurrentcapacity", "="), 10) * (e.voltage || 1)), e.designedCapacity = Math.round(parseInt("0" + q.getValue(r, "DesignCapacity", "="), 10) * (e.voltage || 1)), e.manufacturer = "Apple", e.serial = q.getValue(r, "BatterySerialNumber", "=") || q.getValue(r, "Serial", "="), e.model = q.getValue(r, "DeviceName", "=");
          let o = null, l = q.getValue(r, "internal", "Battery").split(";");
          if (l && l[0]) {
            let c = l[0].split("	");
            c && c[1] && (o = parseFloat(c[1].trim().replace(/%/g, "")));
          }
          l && l[1] ? (e.isCharging = l[1].trim() === "charging", e.acConnected = l[1].trim() !== "discharging") : (e.isCharging = q.getValue(r, "ischarging", "=").toLowerCase() === "yes", e.acConnected = e.isCharging), e.maxCapacity && e.currentCapacity && (e.hasBattery = !0, e.type = "Li-ion", e.percent = o !== null ? o : Math.round(100 * e.currentCapacity / e.maxCapacity), e.isCharging || (e.timeRemaining = parseInt("0" + q.getValue(r, "TimeRemaining", "="), 10)));
        }
        t && t(e), i(e);
      }), Ja && (t && t(e), i(e)), ja)
        try {
          const n = [];
          n.push(q.powerShell("Get-CimInstance Win32_Battery | select BatteryStatus, DesignCapacity, DesignVoltage, EstimatedChargeRemaining, DeviceID | fl")), n.push(q.powerShell("(Get-WmiObject -Class BatteryStaticData -Namespace ROOT/WMI).DesignedCapacity")), n.push(q.powerShell("(Get-CimInstance -Class BatteryFullChargedCapacity -Namespace ROOT/WMI).FullChargedCapacity")), q.promiseAll(
            n
          ).then((s) => {
            if (s) {
              let r = s.results[0].split(/\n\s*\n/), o = [];
              const a = (u) => /\S/.test(u);
              for (let u = 0; u < r.length; u++)
                a(r[u]) && (!o.length || !a(r[u - 1])) && o.push([]), a(r[u]) && o[o.length - 1].push(r[u]);
              let l = s.results[1].split(`\r
`).filter((u) => u), c = s.results[2].split(`\r
`).filter((u) => u);
              if (o.length) {
                let u = !1, f = [];
                for (let p = 0; p < o.length; p++) {
                  let d = o[p][0].split(`\r
`);
                  const m = l && l.length >= p + 1 && l[p] ? q.toInt(l[p]) : 0, h = c && c.length >= p + 1 && c[p] ? q.toInt(c[p]) : 0, y = Qa(d, m, h);
                  !u && y.status > 0 && y.status !== 10 ? (e.hasBattery = y.hasBattery, e.maxCapacity = y.maxCapacity, e.designedCapacity = y.designedCapacity, e.voltage = y.voltage, e.capacityUnit = y.capacityUnit, e.percent = y.percent, e.currentCapacity = y.currentCapacity, e.isCharging = y.isCharging, e.acConnected = y.acConnected, e.model = y.model, u = !0) : y.status !== -1 && f.push(
                    {
                      hasBattery: y.hasBattery,
                      maxCapacity: y.maxCapacity,
                      designedCapacity: y.designedCapacity,
                      voltage: y.voltage,
                      capacityUnit: y.capacityUnit,
                      percent: y.percent,
                      currentCapacity: y.currentCapacity,
                      isCharging: y.isCharging,
                      timeRemaining: null,
                      acConnected: y.acConnected,
                      model: y.model,
                      type: "",
                      manufacturer: "",
                      serial: ""
                    }
                  );
                }
                !u && f.length && (e = f[0], f.shift()), f.length && (e.additionalBatteries = f);
              }
            }
            t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}, Us = {};
const Di = Fe, Gt = te.exec, In = te.execSync, D = T;
let ot = process.platform, ci = "";
const Bi = ot === "linux" || ot === "android", ec = ot === "darwin", Er = ot === "win32", tc = ot === "freebsd", ic = ot === "openbsd", nc = ot === "netbsd", rc = ot === "sunos";
let li = 0, ui = 0, Vi = 0, ki = 0;
const Mr = {
  "-2": "UNINITIALIZED",
  "-1": "OTHER",
  0: "HD15",
  1: "SVIDEO",
  2: "Composite video",
  3: "Component video",
  4: "DVI",
  5: "HDMI",
  6: "LVDS",
  8: "D_JPN",
  9: "SDI",
  10: "DP",
  11: "DP embedded",
  12: "UDI",
  13: "UDI embedded",
  14: "SDTVDONGLE",
  15: "MIRACAST",
  "2147483648": "INTERNAL"
};
function Tr(t) {
  const i = [
    { pattern: "^LG.+", manufacturer: "LG" },
    { pattern: "^BENQ.+", manufacturer: "BenQ" },
    { pattern: "^ASUS.+", manufacturer: "Asus" },
    { pattern: "^DELL.+", manufacturer: "Dell" },
    { pattern: "^SAMSUNG.+", manufacturer: "Samsung" },
    { pattern: "^VIEWSON.+", manufacturer: "ViewSonic" },
    { pattern: "^SONY.+", manufacturer: "Sony" },
    { pattern: "^ACER.+", manufacturer: "Acer" },
    { pattern: "^AOC.+", manufacturer: "AOC Monitors" },
    { pattern: "^HP.+", manufacturer: "HP" },
    { pattern: "^EIZO.?", manufacturer: "Eizo" },
    { pattern: "^PHILIPS.?", manufacturer: "Philips" },
    { pattern: "^IIYAMA.?", manufacturer: "Iiyama" },
    { pattern: "^SHARP.?", manufacturer: "Sharp" },
    { pattern: "^NEC.?", manufacturer: "NEC" },
    { pattern: "^LENOVO.?", manufacturer: "Lenovo" },
    { pattern: "COMPAQ.?", manufacturer: "Compaq" },
    { pattern: "APPLE.?", manufacturer: "Apple" },
    { pattern: "INTEL.?", manufacturer: "Intel" },
    { pattern: "AMD.?", manufacturer: "AMD" },
    { pattern: "NVIDIA.?", manufacturer: "NVDIA" }
  ];
  let e = "";
  return t && (t = t.toUpperCase(), i.forEach((n) => {
    RegExp(n.pattern).test(t) && (e = n.manufacturer);
  })), e;
}
function sc(t) {
  return {
    610: "Apple",
    "1e6d": "LG",
    "10ac": "DELL",
    "4dd9": "Sony",
    "38a3": "NEC"
  }[t] || "";
}
function oc(t) {
  let i = "";
  return t = (t || "").toLowerCase(), t.indexOf("apple") >= 0 ? i = "0x05ac" : t.indexOf("nvidia") >= 0 ? i = "0x10de" : t.indexOf("intel") >= 0 ? i = "0x8086" : (t.indexOf("ati") >= 0 || t.indexOf("amd") >= 0) && (i = "0x1002"), i;
}
function ac(t) {
  return {
    spdisplays_mtlgpufamilymac1: "mac1",
    spdisplays_mtlgpufamilymac2: "mac2",
    spdisplays_mtlgpufamilyapple1: "apple1",
    spdisplays_mtlgpufamilyapple2: "apple2",
    spdisplays_mtlgpufamilyapple3: "apple3",
    spdisplays_mtlgpufamilyapple4: "apple4",
    spdisplays_mtlgpufamilyapple5: "apple5",
    spdisplays_mtlgpufamilyapple6: "apple6",
    spdisplays_mtlgpufamilyapple7: "apple7",
    spdisplays_metalfeaturesetfamily11: "family1_v1",
    spdisplays_metalfeaturesetfamily12: "family1_v2",
    spdisplays_metalfeaturesetfamily13: "family1_v3",
    spdisplays_metalfeaturesetfamily14: "family1_v4",
    spdisplays_metalfeaturesetfamily21: "family2_v1"
  }[t] || "";
}
function cc(t) {
  function i(p) {
    const d = {
      controllers: [],
      displays: []
    };
    try {
      return p.forEach(function(m) {
        const h = (m.sppci_bus || "").indexOf("builtin") > -1 ? "Built-In" : (m.sppci_bus || "").indexOf("pcie") > -1 ? "PCIe" : "", y = (parseInt(m.spdisplays_vram || "", 10) || 0) * ((m.spdisplays_vram || "").indexOf("GB") > -1 ? 1024 : 1), g = (parseInt(m.spdisplays_vram_shared || "", 10) || 0) * ((m.spdisplays_vram_shared || "").indexOf("GB") > -1 ? 1024 : 1);
        let x = ac(m.spdisplays_metal || m.spdisplays_metalfamily || "");
        d.controllers.push({
          vendor: Tr(m.spdisplays_vendor || "") || m.spdisplays_vendor || "",
          model: m.sppci_model || "",
          bus: h,
          vramDynamic: h === "Built-In",
          vram: y || g || null,
          deviceId: m["spdisplays_device-id"] || "",
          vendorId: m["spdisplays_vendor-id"] || oc((m.spdisplays_vendor || "") + (m.sppci_model || "")),
          external: m.sppci_device_type === "spdisplays_egpu",
          cores: m.sppci_cores || null,
          metalVersion: x
        }), m.spdisplays_ndrvs && m.spdisplays_ndrvs.length && m.spdisplays_ndrvs.forEach(function(w) {
          const S = w.spdisplays_connection_type || "", C = (w._spdisplays_resolution || "").split("@"), _ = C[0].split("x"), O = (w._spdisplays_pixels || "").split("x"), U = w.spdisplays_depth || "", I = w["_spdisplays_display-serial-number"] || w["_spdisplays_display-serial-number2"] || null;
          d.displays.push({
            vendor: sc(w["_spdisplays_display-vendor-id"] || "") || Tr(w._name || ""),
            vendorId: w["_spdisplays_display-vendor-id"] || "",
            model: w._name || "",
            productionYear: w["_spdisplays_display-year"] || null,
            serial: I !== "0" ? I : null,
            displayId: w._spdisplays_displayID || null,
            main: w.spdisplays_main ? w.spdisplays_main === "spdisplays_yes" : !1,
            builtin: (w.spdisplays_display_type || "").indexOf("built-in") > -1,
            connection: S.indexOf("_internal") > -1 ? "Internal" : S.indexOf("_displayport") > -1 ? "Display Port" : S.indexOf("_hdmi") > -1 ? "HDMI" : null,
            sizeX: null,
            sizeY: null,
            pixelDepth: U === "CGSThirtyBitColor" ? 30 : U === "CGSThirtytwoBitColor" ? 32 : U === "CGSTwentyfourBitColor" ? 24 : null,
            resolutionX: O.length > 1 ? parseInt(O[0], 10) : null,
            resolutionY: O.length > 1 ? parseInt(O[1], 10) : null,
            currentResX: _.length > 1 ? parseInt(_[0], 10) : null,
            currentResY: _.length > 1 ? parseInt(_[1], 10) : null,
            positionX: 0,
            positionY: 0,
            currentRefreshRate: C.length > 1 ? parseInt(C[1], 10) : null
          });
        });
      }), d;
    } catch {
      return d;
    }
  }
  function e(p) {
    let d = [], m = {
      vendor: "",
      subVendor: "",
      model: "",
      bus: "",
      busAddress: "",
      vram: null,
      vramDynamic: !1,
      pciID: ""
    }, h = !1, y = [];
    try {
      y = In('export LC_ALL=C; dmidecode -t 9 2>/dev/null; unset LC_ALL | grep "Bus Address: "', D.execOptsLinux).toString().split(`
`);
      for (let x = 0; x < y.length; x++)
        y[x] = y[x].replace("Bus Address:", "").replace("0000:", "").trim();
      y = y.filter(function(x) {
        return x != null && x;
      });
    } catch {
      D.noop();
    }
    let g = 1;
    return p.forEach((x) => {
      let w = "";
      if (g < p.length && p[g] && (w = p[g], w.indexOf(":") > 0 && (w = w.split(":")[1])), x.trim() !== "") {
        if (x[0] !== " " && x[0] !== "	") {
          let S = y.indexOf(x.split(" ")[0]) >= 0, C = x.toLowerCase().indexOf(" vga "), _ = x.toLowerCase().indexOf("3d controller");
          if (C !== -1 || _ !== -1) {
            _ !== -1 && C === -1 && (C = _), (m.vendor || m.model || m.bus || m.vram !== null || m.vramDynamic) && (d.push(m), m = {
              vendor: "",
              model: "",
              bus: "",
              busAddress: "",
              vram: null,
              vramDynamic: !1
            });
            const O = x.split(" ")[0];
            /[\da-fA-F]{2}:[\da-fA-F]{2}\.[\da-fA-F]/.test(O) && (m.busAddress = O), h = !0;
            let U = x.search(/\[[0-9a-f]{4}:[0-9a-f]{4}]|$/), I = x.substr(C, U - C).split(":");
            if (m.busAddress = x.substr(0, C).trim(), I.length > 1 && (I[1] = I[1].trim(), I[1].toLowerCase().indexOf("corporation") >= 0 ? (m.vendor = I[1].substr(0, I[1].toLowerCase().indexOf("corporation") + 11).trim(), m.model = I[1].substr(I[1].toLowerCase().indexOf("corporation") + 11, 200).split("(")[0].trim(), m.bus = y.length > 0 && S ? "PCIe" : "Onboard", m.vram = null, m.vramDynamic = !1) : I[1].toLowerCase().indexOf(" inc.") >= 0 ? ((I[1].match(/]/g) || []).length > 1 ? (m.vendor = I[1].substr(0, I[1].toLowerCase().indexOf("]") + 1).trim(), m.model = I[1].substr(I[1].toLowerCase().indexOf("]") + 1, 200).trim().split("(")[0].trim()) : (m.vendor = I[1].substr(0, I[1].toLowerCase().indexOf(" inc.") + 5).trim(), m.model = I[1].substr(I[1].toLowerCase().indexOf(" inc.") + 5, 200).trim().split("(")[0].trim()), m.bus = y.length > 0 && S ? "PCIe" : "Onboard", m.vram = null, m.vramDynamic = !1) : I[1].toLowerCase().indexOf(" ltd.") >= 0 && ((I[1].match(/]/g) || []).length > 1 ? (m.vendor = I[1].substr(0, I[1].toLowerCase().indexOf("]") + 1).trim(), m.model = I[1].substr(I[1].toLowerCase().indexOf("]") + 1, 200).trim().split("(")[0].trim()) : (m.vendor = I[1].substr(0, I[1].toLowerCase().indexOf(" ltd.") + 5).trim(), m.model = I[1].substr(I[1].toLowerCase().indexOf(" ltd.") + 5, 200).trim().split("(")[0].trim())), m.model && w.indexOf(m.model) !== -1)) {
              const W = w.split(m.model)[0].trim();
              W && (m.subVendor = W);
            }
          } else
            h = !1;
        }
        if (h) {
          let S = x.split(":");
          if (S.length > 1 && S[0].replace(/ +/g, "").toLowerCase().indexOf("devicename") !== -1 && S[1].toLowerCase().indexOf("onboard") !== -1 && (m.bus = "Onboard"), S.length > 1 && S[0].replace(/ +/g, "").toLowerCase().indexOf("region") !== -1 && S[1].toLowerCase().indexOf("memory") !== -1) {
            let C = S[1].split("=");
            C.length > 1 && (m.vram = parseInt(C[1]));
          }
        }
      }
      g++;
    }), (m.vendor || m.model || m.bus || m.busAddress || m.vram !== null || m.vramDynamic) && d.push(m), d;
  }
  function n(p, d) {
    const m = /\[([^\]]+)\]\s+(\w+)\s+(.*)/, h = d.reduce((y, g) => {
      const x = m.exec(g.trim());
      return x && (y[x[1]] || (y[x[1]] = {}), y[x[1]][x[2]] = x[3]), y;
    }, {});
    for (let y in h) {
      const g = h[y];
      if (g.CL_DEVICE_TYPE === "CL_DEVICE_TYPE_GPU") {
        let x;
        if (g.CL_DEVICE_TOPOLOGY_AMD) {
          const w = g.CL_DEVICE_TOPOLOGY_AMD.match(/[a-zA-Z0-9]+:\d+\.\d+/);
          w && (x = w[0]);
        } else if (g.CL_DEVICE_PCI_BUS_ID_NV && g.CL_DEVICE_PCI_SLOT_ID_NV) {
          const w = parseInt(g.CL_DEVICE_PCI_BUS_ID_NV), S = parseInt(g.CL_DEVICE_PCI_SLOT_ID_NV);
          if (!isNaN(w) && !isNaN(S)) {
            const C = w & 255, _ = S >> 3 & 255, O = S & 7;
            x = `${C.toString().padStart(2, "0")}:${_.toString().padStart(2, "0")}.${O}`;
          }
        }
        if (x) {
          let w = p.find((C) => C.busAddress === x);
          w || (w = {
            vendor: "",
            model: "",
            bus: "",
            busAddress: x,
            vram: null,
            vramDynamic: !1
          }, p.push(w)), w.vendor = g.CL_DEVICE_VENDOR, g.CL_DEVICE_BOARD_NAME_AMD ? w.model = g.CL_DEVICE_BOARD_NAME_AMD : w.model = g.CL_DEVICE_NAME;
          const S = parseInt(g.CL_DEVICE_GLOBAL_MEM_SIZE);
          isNaN(S) || (w.vram = Math.round(S / 1024 / 1024));
        }
      }
    }
    return p;
  }
  function s() {
    if (ci)
      return ci;
    if (Er)
      try {
        const p = D.WINDIR + "\\System32\\DriverStore\\FileRepository", m = Di.readdirSync(p).filter((h) => Di.readdirSync([p, h].join("/")).includes("nvidia-smi.exe")).reduce((h, y) => {
          const g = Di.statSync([p, h, "nvidia-smi.exe"].join("/")), x = Di.statSync([p, y, "nvidia-smi.exe"].join("/"));
          return g.ctimeMs > x.ctimeMs ? h : y;
        });
        m && (ci = [p, m, "nvidia-smi.exe"].join("/"));
      } catch {
        D.noop();
      }
    else Bi && (ci = "nvidia-smi");
    return ci;
  }
  function r(p) {
    const d = s();
    if (p = p || D.execOptsWin, d) {
      const h = d + " " + "--query-gpu=driver_version,pci.sub_device_id,name,pci.bus_id,fan.speed,memory.total,memory.used,memory.free,utilization.gpu,utilization.memory,temperature.gpu,temperature.memory,power.draw,power.limit,clocks.gr,clocks.mem --format=csv,noheader,nounits" + (Bi ? "  2>/dev/null" : "");
      Bi && (p.stdio = ["pipe", "pipe", "ignore"]);
      try {
        return In(h, p).toString();
      } catch {
        D.noop();
      }
    }
    return "";
  }
  function o() {
    function p(y) {
      return [null, void 0].includes(y) ? y : parseFloat(y);
    }
    const d = r();
    if (!d)
      return [];
    let h = d.split(`
`).filter(Boolean).map((y) => {
      const g = y.split(", ").map((x) => x.includes("N/A") ? void 0 : x);
      return g.length === 16 ? {
        driverVersion: g[0],
        subDeviceId: g[1],
        name: g[2],
        pciBus: g[3],
        fanSpeed: p(g[4]),
        memoryTotal: p(g[5]),
        memoryUsed: p(g[6]),
        memoryFree: p(g[7]),
        utilizationGpu: p(g[8]),
        utilizationMemory: p(g[9]),
        temperatureGpu: p(g[10]),
        temperatureMemory: p(g[11]),
        powerDraw: p(g[12]),
        powerLimit: p(g[13]),
        clockCore: p(g[14]),
        clockMemory: p(g[15])
      } : {};
    });
    return h = h.filter((y) => "pciBus" in y), h;
  }
  function a(p, d) {
    return d.driverVersion && (p.driverVersion = d.driverVersion), d.subDeviceId && (p.subDeviceId = d.subDeviceId), d.name && (p.name = d.name), d.pciBus && (p.pciBus = d.pciBus), d.fanSpeed && (p.fanSpeed = d.fanSpeed), d.memoryTotal && (p.memoryTotal = d.memoryTotal, p.vram = d.memoryTotal, p.vramDynamic = !1), d.memoryUsed && (p.memoryUsed = d.memoryUsed), d.memoryFree && (p.memoryFree = d.memoryFree), d.utilizationGpu && (p.utilizationGpu = d.utilizationGpu), d.utilizationMemory && (p.utilizationMemory = d.utilizationMemory), d.temperatureGpu && (p.temperatureGpu = d.temperatureGpu), d.temperatureMemory && (p.temperatureMemory = d.temperatureMemory), d.powerDraw && (p.powerDraw = d.powerDraw), d.powerLimit && (p.powerLimit = d.powerLimit), d.clockCore && (p.clockCore = d.clockCore), d.clockMemory && (p.clockMemory = d.clockMemory), p;
  }
  function l(p) {
    let d = {
      vendor: "",
      model: "",
      deviceName: "",
      main: !1,
      builtin: !1,
      connection: "",
      sizeX: null,
      sizeY: null,
      pixelDepth: null,
      resolutionX: null,
      resolutionY: null,
      currentResX: null,
      currentResY: null,
      positionX: 0,
      positionY: 0,
      currentRefreshRate: null
    }, m = 108;
    if (p.substr(m, 6) === "000000" && (m += 36), p.substr(m, 6) === "000000" && (m += 36), p.substr(m, 6) === "000000" && (m += 36), p.substr(m, 6) === "000000" && (m += 36), d.resolutionX = parseInt("0x0" + p.substr(m + 8, 1) + p.substr(m + 4, 2)), d.resolutionY = parseInt("0x0" + p.substr(m + 14, 1) + p.substr(m + 10, 2)), d.sizeX = parseInt("0x0" + p.substr(m + 28, 1) + p.substr(m + 24, 2)), d.sizeY = parseInt("0x0" + p.substr(m + 29, 1) + p.substr(m + 26, 2)), m = p.indexOf("000000fc00"), m >= 0) {
      let h = p.substr(m + 10, 26);
      h.indexOf("0a") !== -1 && (h = h.substr(0, h.indexOf("0a")));
      try {
        h.length > 2 && (d.model = h.match(/.{1,2}/g).map(function(y) {
          return String.fromCharCode(parseInt(y, 16));
        }).join(""));
      } catch {
        D.noop();
      }
    } else
      d.model = "";
    return d;
  }
  function c(p, d) {
    let m = [], h = {
      vendor: "",
      model: "",
      deviceName: "",
      main: !1,
      builtin: !1,
      connection: "",
      sizeX: null,
      sizeY: null,
      pixelDepth: null,
      resolutionX: null,
      resolutionY: null,
      currentResX: null,
      currentResY: null,
      positionX: 0,
      positionY: 0,
      currentRefreshRate: null
    }, y = !1, g = !1, x = "", w = 0;
    for (let S = 1; S < p.length; S++)
      if (p[S].trim() !== "") {
        if (p[S][0] !== " " && p[S][0] !== "	" && p[S].toLowerCase().indexOf(" connected ") !== -1) {
          (h.model || h.main || h.builtin || h.connection || h.sizeX !== null || h.pixelDepth !== null || h.resolutionX !== null) && (m.push(h), h = {
            vendor: "",
            model: "",
            main: !1,
            builtin: !1,
            connection: "",
            sizeX: null,
            sizeY: null,
            pixelDepth: null,
            resolutionX: null,
            resolutionY: null,
            currentResX: null,
            currentResY: null,
            positionX: 0,
            positionY: 0,
            currentRefreshRate: null
          });
          let C = p[S].split(" ");
          h.connection = C[0], h.main = p[S].toLowerCase().indexOf(" primary ") >= 0, h.builtin = C[0].toLowerCase().indexOf("edp") >= 0;
        }
        if (y)
          if (p[S].search(/\S|$/) > w)
            x += p[S].toLowerCase().trim();
          else {
            let C = l(x);
            h.vendor = C.vendor, h.model = C.model, h.resolutionX = C.resolutionX, h.resolutionY = C.resolutionY, h.sizeX = C.sizeX, h.sizeY = C.sizeY, h.pixelDepth = d, y = !1;
          }
        if (p[S].toLowerCase().indexOf("edid:") >= 0 && (y = !0, w = p[S].search(/\S|$/)), p[S].toLowerCase().indexOf("*current") >= 0) {
          const C = p[S].split("(");
          if (C && C.length > 1 && C[0].indexOf("x") >= 0) {
            const _ = C[0].trim().split("x");
            h.currentResX = D.toInt(_[0]), h.currentResY = D.toInt(_[1]);
          }
          g = !0;
        }
        if (g && p[S].toLowerCase().indexOf("clock") >= 0 && p[S].toLowerCase().indexOf("hz") >= 0 && p[S].toLowerCase().indexOf("v: height") >= 0) {
          const C = p[S].split("clock");
          C && C.length > 1 && C[1].toLowerCase().indexOf("hz") >= 0 && (h.currentRefreshRate = D.toInt(C[1])), g = !1;
        }
      }
    return (h.model || h.main || h.builtin || h.connection || h.sizeX !== null || h.pixelDepth !== null || h.resolutionX !== null) && m.push(h), m;
  }
  return new Promise((p) => {
    process.nextTick(() => {
      let d = {
        controllers: [],
        displays: []
      };
      if (ec && Gt("system_profiler -xml -detailLevel full SPDisplaysDataType", function(h, y) {
        if (!h) {
          try {
            const g = y.toString();
            d = i(D.plistParser(g)[0]._items);
          } catch {
            D.noop();
          }
          try {
            y = In('defaults read /Library/Preferences/com.apple.windowserver.plist 2>/dev/null;defaults read /Library/Preferences/com.apple.windowserver.displays.plist 2>/dev/null; echo ""', { maxBuffer: 1024 * 2e4 });
            const g = (y || "").toString(), x = D.plistReader(g);
            if (x.DisplayAnyUserSets && x.DisplayAnyUserSets.Configs && x.DisplayAnyUserSets.Configs[0] && x.DisplayAnyUserSets.Configs[0].DisplayConfig) {
              const w = x.DisplayAnyUserSets.Configs[0].DisplayConfig;
              let S = 0;
              w.forEach((C) => {
                C.CurrentInfo && C.CurrentInfo.OriginX !== void 0 && d.displays && d.displays[S] && (d.displays[S].positionX = C.CurrentInfo.OriginX), C.CurrentInfo && C.CurrentInfo.OriginY !== void 0 && d.displays && d.displays[S] && (d.displays[S].positionY = C.CurrentInfo.OriginY), S++;
              });
            }
            if (x.DisplayAnyUserSets && x.DisplayAnyUserSets.length > 0 && x.DisplayAnyUserSets[0].length > 0 && x.DisplayAnyUserSets[0][0].DisplayID) {
              const w = x.DisplayAnyUserSets[0];
              let S = 0;
              w.forEach((C) => {
                "OriginX" in C && d.displays && d.displays[S] && (d.displays[S].positionX = C.OriginX), "OriginY" in C && d.displays && d.displays[S] && (d.displays[S].positionY = C.OriginY), C.Mode && C.Mode.BitsPerPixel !== void 0 && d.displays && d.displays[S] && (d.displays[S].pixelDepth = C.Mode.BitsPerPixel), S++;
              });
            }
          } catch {
            D.noop();
          }
        }
        t && t(d), p(d);
      }), Bi && (D.isRaspberry() && Gt(`fbset -s 2> /dev/null | grep 'mode "' ; vcgencmd get_mem gpu 2> /dev/null; tvservice -s 2> /dev/null; tvservice -n 2> /dev/null;`, function(y, g) {
        let x = g.toString().split(`
`);
        if (x.length > 3 && x[0].indexOf('mode "') >= -1 && x[2].indexOf("0x12000a") > -1) {
          const w = x[0].replace("mode", "").replace(/"/g, "").trim().split("x");
          w.length === 2 && d.displays.push({
            vendor: "",
            model: D.getValue(x, "device_name", "="),
            main: !0,
            builtin: !1,
            connection: "HDMI",
            sizeX: null,
            sizeY: null,
            pixelDepth: null,
            resolutionX: parseInt(w[0], 10),
            resolutionY: parseInt(w[1], 10),
            currentResX: null,
            currentResY: null,
            positionX: 0,
            positionY: 0,
            currentRefreshRate: null
          });
        }
        x.length >= 1 && g.toString().indexOf("gpu=") >= -1 && d.controllers.push({
          vendor: "Broadcom",
          model: D.getRpiGpu(),
          bus: "",
          vram: D.getValue(x, "gpu", "=").replace("M", ""),
          vramDynamic: !0
        });
      }), Gt("lspci -vvv  2>/dev/null", function(h, y) {
        if (!h) {
          let x = y.toString().split(`
`);
          if (d.controllers.length === 0) {
            d.controllers = e(x);
            const w = o();
            d.controllers = d.controllers.map((S) => a(S, w.find((C) => C.pciBus.toLowerCase().endsWith(S.busAddress.toLowerCase())) || {}));
          }
        }
        Gt("clinfo --raw", function(x, w) {
          if (!x) {
            let C = w.toString().split(`
`);
            d.controllers = n(d.controllers, C);
          }
          Gt("xdpyinfo 2>/dev/null | grep 'depth of root window' | awk '{ print $5 }'", function(C, _) {
            let O = 0;
            if (!C) {
              let I = _.toString().split(`
`);
              O = parseInt(I[0]) || 0;
            }
            Gt("xrandr --verbose 2>/dev/null", function(I, W) {
              if (!I) {
                let V = W.toString().split(`
`);
                d.displays = c(V, O);
              }
              t && t(d), p(d);
            });
          });
        });
      })), (tc || ic || nc) && (t && t(null), p(null)), rc && (t && t(null), p(null)), Er)
        try {
          const m = [];
          m.push(D.powerShell("Get-CimInstance win32_VideoController | fl *")), m.push(D.powerShell('gp "HKLM:\\SYSTEM\\ControlSet001\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*" -ErrorAction SilentlyContinue | where MatchingDeviceId $null -NE | select MatchingDeviceId,HardwareInformation.qwMemorySize | fl')), m.push(D.powerShell("Get-CimInstance win32_desktopmonitor | fl *")), m.push(D.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | fl")), m.push(D.powerShell("Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::AllScreens")), m.push(D.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorConnectionParams | fl")), m.push(D.powerShell('gwmi WmiMonitorID -Namespace root\\wmi | ForEach-Object {(($_.ManufacturerName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.ProductCodeID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.UserFriendlyName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.SerialNumberID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + $_.InstanceName}'));
          const h = o();
          Promise.all(
            m
          ).then((y) => {
            let g = y[0].replace(/\r/g, "").split(/\n\s*\n/), x = y[1].replace(/\r/g, "").split(/\n\s*\n/);
            d.controllers = u(g, x), d.controllers = d.controllers.map((I) => I.vendor.toLowerCase() === "nvidia" ? a(I, h.find((W) => {
              let V = (I.subDeviceId || "").toLowerCase();
              const ie = W.subDeviceId.split("x");
              let oe = ie.length > 1 ? ie[1].toLowerCase() : ie[0].toLowerCase();
              const le = Math.abs(V.length - oe.length);
              if (V.length > oe.length)
                for (let X = 0; X < le; X++)
                  oe = "0" + oe;
              else if (V.length < oe.length)
                for (let X = 0; X < le; X++)
                  V = "0" + V;
              return V === oe;
            }) || {}) : I);
            let w = y[2].replace(/\r/g, "").split(/\n\s*\n/);
            w[0].trim() === "" && w.shift(), w.length && w[w.length - 1].trim() === "" && w.pop();
            let S = y[3].replace(/\r/g, "").split("Active ");
            S.shift();
            let C = y[4].replace(/\r/g, "").split("BitsPerPixel ");
            C.shift();
            let _ = y[5].replace(/\r/g, "").split(/\n\s*\n/);
            _.shift();
            const O = y[6].replace(/\r/g, "").split(/\n/);
            let U = [];
            O.forEach((I) => {
              const W = I.split("|");
              W.length === 5 && U.push({
                vendor: W[0],
                code: W[1],
                model: W[2],
                serial: W[3],
                instanceId: W[4]
              });
            }), d.displays = f(C, S, w, _, U), d.displays.length === 1 && (li && (d.displays[0].resolutionX = li, d.displays[0].currentResX || (d.displays[0].currentResX = li)), ui && (d.displays[0].resolutionY = ui, d.displays[0].currentResY === 0 && (d.displays[0].currentResY = ui)), Vi && (d.displays[0].pixelDepth = Vi)), d.displays = d.displays.map((I) => (ki && !I.currentRefreshRate && (I.currentRefreshRate = ki), I)), t && t(d), p(d);
          }).catch(() => {
            t && t(d), p(d);
          });
        } catch {
          t && t(d), p(d);
        }
    });
  });
  function u(p, d) {
    const m = {};
    for (const y in d)
      if ({}.hasOwnProperty.call(d, y) && d[y].trim() !== "") {
        const g = d[y].trim().split(`
`), x = D.getValue(g, "MatchingDeviceId").match(/PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i);
        if (x) {
          const w = parseInt(D.getValue(g, "HardwareInformation.qwMemorySize"));
          if (!isNaN(w)) {
            let S = x[1].toUpperCase() + "&" + x[2].toUpperCase();
            x[3] && (S += "&" + x[3].toUpperCase()), x[4] && (S += "&" + x[4].toUpperCase()), m[S] = w;
          }
        }
      }
    let h = [];
    for (let y in p)
      if ({}.hasOwnProperty.call(p, y) && p[y].trim() !== "") {
        let g = p[y].trim().split(`
`), x = D.getValue(g, "PNPDeviceID", ":").match(/PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i), w = null, S = null;
        if (x) {
          if (w = x[3] || "", w && (w = w.split("_")[1]), S == null && x[3] && x[4]) {
            const C = x[1].toUpperCase() + "&" + x[2].toUpperCase() + "&" + x[3].toUpperCase() + "&" + x[4].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (S = m[C]);
          }
          if (S == null && x[3]) {
            const C = x[1].toUpperCase() + "&" + x[2].toUpperCase() + "&" + x[3].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (S = m[C]);
          }
          if (S == null && x[4]) {
            const C = x[1].toUpperCase() + "&" + x[2].toUpperCase() + "&" + x[4].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (S = m[C]);
          }
          if (S == null) {
            const C = x[1].toUpperCase() + "&" + x[2].toUpperCase();
            ({}).hasOwnProperty.call(m, C) && (S = m[C]);
          }
        }
        h.push({
          vendor: D.getValue(g, "AdapterCompatibility", ":"),
          model: D.getValue(g, "name", ":"),
          bus: D.getValue(g, "PNPDeviceID", ":").startsWith("PCI") ? "PCI" : "",
          vram: (S ?? D.toInt(D.getValue(g, "AdapterRAM", ":"))) / 1024 / 1024,
          vramDynamic: D.getValue(g, "VideoMemoryType", ":") === "2",
          subDeviceId: w
        }), li = D.toInt(D.getValue(g, "CurrentHorizontalResolution", ":")) || li, ui = D.toInt(D.getValue(g, "CurrentVerticalResolution", ":")) || ui, ki = D.toInt(D.getValue(g, "CurrentRefreshRate", ":")) || ki, Vi = D.toInt(D.getValue(g, "CurrentBitsPerPixel", ":")) || Vi;
      }
    return h;
  }
  function f(p, d, m, h, y) {
    let g = [], x = "", w = "", S = "", C = 0, _ = 0;
    if (m && m.length) {
      let O = m[0].split(`
`);
      x = D.getValue(O, "MonitorManufacturer", ":"), w = D.getValue(O, "Name", ":"), S = D.getValue(O, "PNPDeviceID", ":").replace(/&amp;/g, "&").toLowerCase(), C = D.toInt(D.getValue(O, "ScreenWidth", ":")), _ = D.toInt(D.getValue(O, "ScreenHeight", ":"));
    }
    for (let O = 0; O < p.length; O++)
      if (p[O].trim() !== "") {
        p[O] = "BitsPerPixel " + p[O], d[O] = "Active " + d[O], (h.length === 0 || h[O] === void 0) && (h[O] = "Unknown");
        let U = p[O].split(`
`), I = d[O].split(`
`), W = h[O].split(`
`);
        const V = D.getValue(U, "BitsPerPixel"), ie = D.getValue(U, "Bounds").replace("{", "").replace("}", "").replace(/=/g, ":").split(","), oe = D.getValue(U, "Primary"), le = D.getValue(I, "MaxHorizontalImageSize"), X = D.getValue(I, "MaxVerticalImageSize"), fe = D.getValue(I, "InstanceName").toLowerCase(), z = D.getValue(W, "VideoOutputTechnology"), Z = D.getValue(U, "DeviceName");
        let H = "", $ = "";
        y.forEach((B) => {
          B.instanceId.toLowerCase().startsWith(fe) && x.startsWith("(") && w.startsWith("PnP") && (H = B.vendor, $ = B.model);
        }), g.push({
          vendor: fe.startsWith(S) && H === "" ? x : H,
          model: fe.startsWith(S) && $ === "" ? w : $,
          deviceName: Z,
          main: oe.toLowerCase() === "true",
          builtin: z === "2147483648",
          connection: z && Mr[z] ? Mr[z] : "",
          resolutionX: D.toInt(D.getValue(ie, "Width", ":")),
          resolutionY: D.toInt(D.getValue(ie, "Height", ":")),
          sizeX: le ? parseInt(le, 10) : null,
          sizeY: X ? parseInt(X, 10) : null,
          pixelDepth: V,
          currentResX: D.toInt(D.getValue(ie, "Width", ":")),
          currentResY: D.toInt(D.getValue(ie, "Height", ":")),
          positionX: D.toInt(D.getValue(ie, "X", ":")),
          positionY: D.toInt(D.getValue(ie, "Y", ":"))
        });
      }
    return p.length === 0 && g.push({
      vendor: x,
      model: w,
      main: !0,
      sizeX: null,
      sizeY: null,
      resolutionX: C,
      resolutionY: _,
      pixelDepth: null,
      currentResX: C,
      currentResY: _,
      positionX: 0,
      positionY: 0
    }), g;
  }
}
Us.graphics = cc;
var Vt = {};
const b = T, Dr = Fe, me = te.exec, et = te.execSync, lc = b.promisifySave(te.exec);
let at = process.platform;
const be = at === "linux" || at === "android", tt = at === "darwin", ri = at === "win32", Ie = at === "freebsd", _e = at === "openbsd", Oe = at === "netbsd", si = at === "sunos";
let ee = {}, R = {};
function uc(t, i) {
  b.isFunction(t) && (i = t, t = "");
  let e = [], n = [];
  function s(l) {
    if (!l.startsWith("/"))
      return "NFS";
    const c = l.split("/"), u = c[c.length - 1], f = e.filter((p) => p.indexOf(u) >= 0);
    return f.length === 1 && f[0].indexOf("APFS") >= 0 ? "APFS" : "HFS";
  }
  function r(l) {
    const c = ["rootfs", "unionfs", "squashfs", "cramfs", "initrd", "initramfs", "devtmpfs", "tmpfs", "udev", "devfs", "specfs", "type", "appimaged"];
    let u = !1;
    return c.forEach((f) => {
      l.toLowerCase().indexOf(f) >= 0 && (u = !0);
    }), u;
  }
  function o(l) {
    let c = l.toString().split(`
`);
    if (c.shift(), l.toString().toLowerCase().indexOf("filesystem")) {
      let u = 0;
      for (let f = 0; f < c.length; f++)
        c[f] && c[f].toLowerCase().startsWith("filesystem") && (u = f);
      for (let f = 0; f < u; f++)
        c.shift();
    }
    return c;
  }
  function a(l) {
    let c = [];
    return l.forEach(function(u) {
      if (u !== "" && (u = u.replace(/ +/g, " ").split(" "), u && (u[0].startsWith("/") || u[6] && u[6] === "/" || u[0].indexOf("/") > 0 || u[0].indexOf(":") === 1 || !tt && !r(u[1])))) {
        const f = u[0], p = be || Ie || _e || Oe ? u[1] : s(u[0]), d = parseInt(be || Ie || _e || Oe ? u[2] : u[1]) * 1024, m = parseInt(be || Ie || _e || Oe ? u[3] : u[2]) * 1024, h = parseInt(be || Ie || _e || Oe ? u[4] : u[3]) * 1024, y = parseFloat((100 * (m / (m + h))).toFixed(2));
        let g = n && Object.keys(n).length > 0 ? n[f] || !1 : null;
        u.splice(0, be || Ie || _e || Oe ? 6 : 5);
        const x = u.join(" ");
        c.find((w) => w.fs === f && w.type === p) || c.push({
          fs: f,
          type: p,
          size: d,
          used: m,
          available: h,
          use: y,
          mount: x,
          rw: g
        });
      }
    }), c;
  }
  return new Promise((l) => {
    process.nextTick(() => {
      let c = [];
      if (be || Ie || _e || Oe || tt) {
        let u = "";
        if (e = [], n = {}, tt) {
          u = "df -kP";
          try {
            e = et("diskutil list").toString().split(`
`).filter((f) => !f.startsWith("/") && f.indexOf(":") > 0), et("mount").toString().split(`
`).filter((f) => f.startsWith("/")).forEach((f) => {
              n[f.split(" ")[0]] = f.toLowerCase().indexOf("read-only") === -1;
            });
          } catch {
            b.noop();
          }
        }
        if (be)
          try {
            u = "export LC_ALL=C; df -lkPTx squashfs; unset LC_ALL", et("cat /proc/mounts 2>/dev/null", b.execOptsLinux).toString().split(`
`).filter((f) => f.startsWith("/")).forEach((f) => {
              n[f.split(" ")[0]] = n[f.split(" ")[0]] || !1, f.toLowerCase().indexOf("/snap/") === -1 && (n[f.split(" ")[0]] = f.toLowerCase().indexOf("rw,") >= 0 || f.toLowerCase().indexOf(" rw ") >= 0);
            });
          } catch {
            b.noop();
          }
        if (Ie || _e || Oe)
          try {
            u = "df -lkPT", et("mount").toString().split(`
`).forEach((f) => {
              n[f.split(" ")[0]] = f.toLowerCase().indexOf("read-only") === -1;
            });
          } catch {
            b.noop();
          }
        me(u, { maxBuffer: 1024 * 1024 }, function(f, p) {
          let d = o(p);
          c = a(d), t && (c = c.filter((m) => m.fs.toLowerCase().indexOf(t.toLowerCase()) >= 0 || m.mount.toLowerCase().indexOf(t.toLowerCase()) >= 0)), (!f || c.length) && p.toString().trim() !== "" ? (i && i(c), l(c)) : me("df -kPT", { maxBuffer: 1024 * 1024 }, function(m, h) {
            if (!m) {
              let y = o(h);
              c = a(y);
            }
            i && i(c), l(c);
          });
        });
      }
      if (si && (i && i(c), l(c)), ri)
        try {
          const u = `Get-WmiObject Win32_logicaldisk | select Access,Caption,FileSystem,FreeSpace,Size ${t ? "| where -property Caption -eq " + t : ""} | fl`;
          b.powerShell(u).then((f, p) => {
            p || f.toString().split(/\n\s*\n/).forEach(function(m) {
              let h = m.split(`\r
`);
              const y = b.toInt(b.getValue(h, "size", ":")), g = b.toInt(b.getValue(h, "freespace", ":")), x = b.getValue(h, "caption", ":"), w = b.getValue(h, "access", ":"), S = w ? b.toInt(w) !== 1 : null;
              y && c.push({
                fs: x,
                type: b.getValue(h, "filesystem", ":"),
                size: y,
                used: y - g,
                available: g,
                use: parseFloat((100 * (y - g) / y).toFixed(2)),
                mount: x,
                rw: S
              });
            }), i && i(c), l(c);
          });
        } catch {
          i && i(c), l(c);
        }
    });
  });
}
Vt.fsSize = uc;
function pc(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      const e = {
        max: null,
        allocated: null,
        available: null
      };
      (Ie || _e || Oe || tt) && me("sysctl -i kern.maxfiles kern.num_files kern.open_files", { maxBuffer: 1024 * 1024 }, function(s, r) {
        if (!s) {
          let o = r.toString().split(`
`);
          e.max = parseInt(b.getValue(o, "kern.maxfiles", ":"), 10), e.allocated = parseInt(b.getValue(o, "kern.num_files", ":"), 10) || parseInt(b.getValue(o, "kern.open_files", ":"), 10), e.available = e.max - e.allocated;
        }
        t && t(e), i(e);
      }), be && Dr.readFile("/proc/sys/fs/file-nr", function(n, s) {
        if (n)
          Dr.readFile("/proc/sys/fs/file-max", function(r, o) {
            if (!r) {
              let a = o.toString().split(`
`);
              a[0] && (e.max = parseInt(a[0], 10));
            }
            t && t(e), i(e);
          });
        else {
          let r = s.toString().split(`
`);
          if (r[0]) {
            const o = r[0].replace(/\s+/g, " ").split(" ");
            o.length === 3 && (e.allocated = parseInt(o[0], 10), e.available = parseInt(o[1], 10), e.max = parseInt(o[2], 10), e.available || (e.available = e.max - e.allocated));
          }
          t && t(e), i(e);
        }
      }), si && (t && t(null), i(null)), ri && (t && t(null), i(null));
    });
  });
}
Vt.fsOpenFiles = pc;
function fc(t) {
  return parseInt(t.substr(t.indexOf(" (") + 2, t.indexOf(" Bytes)") - 10));
}
function dc(t) {
  let i = [], e = 0;
  return t.forEach((n) => {
    if (n.length > 0)
      if (n[0] === "*")
        e++;
      else {
        let s = n.split(":");
        s.length > 1 && (i[e] || (i[e] = {
          name: "",
          identifier: "",
          type: "disk",
          fsType: "",
          mount: "",
          size: 0,
          physical: "HDD",
          uuid: "",
          label: "",
          model: "",
          serial: "",
          removable: !1,
          protocol: "",
          group: "",
          device: ""
        }), s[0] = s[0].trim().toUpperCase().replace(/ +/g, ""), s[1] = s[1].trim(), s[0] === "DEVICEIDENTIFIER" && (i[e].identifier = s[1]), s[0] === "DEVICENODE" && (i[e].name = s[1]), s[0] === "VOLUMENAME" && s[1].indexOf("Not applicable") === -1 && (i[e].label = s[1]), s[0] === "PROTOCOL" && (i[e].protocol = s[1]), s[0] === "DISKSIZE" && (i[e].size = fc(s[1])), s[0] === "FILESYSTEMPERSONALITY" && (i[e].fsType = s[1]), s[0] === "MOUNTPOINT" && (i[e].mount = s[1]), s[0] === "VOLUMEUUID" && (i[e].uuid = s[1]), s[0] === "READ-ONLYMEDIA" && s[1] === "Yes" && (i[e].physical = "CD/DVD"), s[0] === "SOLIDSTATE" && s[1] === "Yes" && (i[e].physical = "SSD"), s[0] === "VIRTUAL" && (i[e].type = "virtual"), s[0] === "REMOVABLEMEDIA" && (i[e].removable = s[1] === "Removable"), s[0] === "PARTITIONTYPE" && (i[e].type = "part"), s[0] === "DEVICE/MEDIANAME" && (i[e].model = s[1]));
      }
  }), i;
}
function jn(t) {
  let i = [];
  return t.filter((e) => e !== "").forEach((e) => {
    try {
      e = decodeURIComponent(e.replace(/\\x/g, "%")), e = e.replace(/\\/g, "\\\\");
      let n = JSON.parse(e);
      i.push({
        name: n.name,
        type: n.type,
        fsType: n.fsType,
        mount: n.mountpoint,
        size: parseInt(n.size),
        physical: n.type === "disk" ? n.rota === "0" ? "SSD" : "HDD" : n.type === "rom" ? "CD/DVD" : "",
        uuid: n.uuid,
        label: n.label,
        model: (n.model || "").trim(),
        serial: n.serial,
        removable: n.rm === "1",
        protocol: n.tran,
        group: n.group || ""
      });
    } catch {
      b.noop();
    }
  }), i = b.unique(i), i = b.sortByKey(i, ["type", "name"]), i;
}
function mc(t) {
  const i = b.getValue(t, "md_level", "="), e = b.getValue(t, "md_name", "="), n = b.getValue(t, "md_uuid", "="), s = [];
  return t.forEach((r) => {
    r.toLowerCase().startsWith("md_device_dev") && r.toLowerCase().indexOf("/dev/") > 0 && s.push(r.split("/dev/")[1]);
  }), {
    raid: i,
    label: e,
    uuid: n,
    members: s
  };
}
function Br(t) {
  let i = t;
  try {
    t.forEach((e) => {
      if (e.type.startsWith("raid")) {
        const n = et(`mdadm --export --detail /dev/${e.name}`, b.execOptsLinux).toString().split(`
`), s = mc(n);
        e.label = s.label, e.uuid = s.uuid, s.members && s.members.length && s.raid === e.type && (i = i.map((r) => (r.fsType === "linux_raid_member" && s.members.indexOf(r.name) >= 0 && (r.group = e.name), r)));
      }
    });
  } catch {
    b.noop();
  }
  return i;
}
function hc(t) {
  const i = [];
  return t.forEach((e) => {
    e.type.startsWith("disk") && i.push(e.name);
  }), i;
}
function gc(t) {
  let i = t;
  try {
    const e = hc(t);
    i = i.map((n) => ((n.type.startsWith("part") || n.type.startsWith("disk")) && e.forEach((s) => {
      n.name.startsWith(s) && (n.device = "/dev/" + s);
    }), n));
  } catch {
    b.noop();
  }
  return i;
}
function yc(t) {
  const i = [];
  return t.forEach((e) => {
    if (e.type.startsWith("disk") && i.push({ name: e.name, model: e.model, device: e.name }), e.type.startsWith("virtual")) {
      let n = "";
      i.forEach((s) => {
        s.model === e.model && (n = s.device);
      }), n && i.push({ name: e.name, model: e.model, device: n });
    }
  }), i;
}
function xc(t) {
  let i = t;
  try {
    const e = yc(t);
    i = i.map((n) => ((n.type.startsWith("part") || n.type.startsWith("disk") || n.type.startsWith("virtual")) && e.forEach((s) => {
      n.name.startsWith(s.name) && (n.device = s.device);
    }), n));
  } catch {
    b.noop();
  }
  return i;
}
function Sc(t) {
  const i = [];
  return t.forEach((e) => {
    const n = e.split(`\r
`), s = b.getValue(n, "DeviceID", ":");
    let r = e.split("@{DeviceID=");
    r.length > 1 && (r = r.slice(1), r.forEach((o) => {
      i.push({ name: o.split(";")[0].toUpperCase(), device: s });
    }));
  }), i;
}
function wc(t, i) {
  const e = Sc(i);
  return t.map((n) => {
    const s = e.filter((r) => r.name === n.name.toUpperCase());
    return s.length > 0 && (n.device = s[0].device), n;
  }), t;
}
function Xn(t) {
  return t.toString().replace(/NAME=/g, '{"name":').replace(/FSTYPE=/g, ',"fsType":').replace(/TYPE=/g, ',"type":').replace(/SIZE=/g, ',"size":').replace(/MOUNTPOINT=/g, ',"mountpoint":').replace(/UUID=/g, ',"uuid":').replace(/ROTA=/g, ',"rota":').replace(/RO=/g, ',"ro":').replace(/RM=/g, ',"rm":').replace(/TRAN=/g, ',"tran":').replace(/SERIAL=/g, ',"serial":').replace(/LABEL=/g, ',"label":').replace(/MODEL=/g, ',"model":').replace(/OWNER=/g, ',"owner":').replace(/GROUP=/g, ',"group":').replace(/\n/g, `}
`);
}
function Cc(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      if (be && me("lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,TRAN,SERIAL,LABEL,MODEL,OWNER 2>/dev/null", { maxBuffer: 1024 * 1024 }, function(n, s) {
        if (n)
          me("lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER 2>/dev/null", { maxBuffer: 1024 * 1024 }, function(r, o) {
            if (!r) {
              let a = Xn(o).split(`
`);
              e = jn(a), e = Br(e);
            }
            t && t(e), i(e);
          });
        else {
          let r = Xn(s).split(`
`);
          e = jn(r), e = Br(e), e = gc(e), t && t(e), i(e);
        }
      }), tt && me("diskutil info -all", { maxBuffer: 1024 * 1024 }, function(n, s) {
        if (!n) {
          let r = s.toString().split(`
`);
          e = dc(r), e = xc(e);
        }
        t && t(e), i(e);
      }), si && (t && t(e), i(e)), ri) {
        let n = ["Unknown", "NoRoot", "Removable", "Local", "Network", "CD/DVD", "RAM"];
        try {
          const s = [];
          s.push(b.powerShell("Get-CimInstance -ClassName Win32_LogicalDisk | select Caption,DriveType,Name,FileSystem,Size,VolumeSerialNumber,VolumeName | fl")), s.push(b.powerShell("Get-WmiObject -Class Win32_diskdrive | Select-Object -Property PNPDeviceId,DeviceID, Model, Size, @{L='Partitions'; E={$_.GetRelated('Win32_DiskPartition').GetRelated('Win32_LogicalDisk') | Select-Object -Property DeviceID, VolumeName, Size, FreeSpace}} | fl")), b.promiseAll(
            s
          ).then((r) => {
            let o = r.results[0].toString().split(/\n\s*\n/), a = r.results[1].toString().split(/\n\s*\n/);
            o.forEach(function(l) {
              let c = l.split(`\r
`), u = b.getValue(c, "drivetype", ":");
              u && e.push({
                name: b.getValue(c, "name", ":"),
                identifier: b.getValue(c, "caption", ":"),
                type: "disk",
                fsType: b.getValue(c, "filesystem", ":").toLowerCase(),
                mount: b.getValue(c, "caption", ":"),
                size: b.getValue(c, "size", ":"),
                physical: u >= 0 && u <= 6 ? n[u] : n[0],
                uuid: b.getValue(c, "volumeserialnumber", ":"),
                label: b.getValue(c, "volumename", ":"),
                model: "",
                serial: b.getValue(c, "volumeserialnumber", ":"),
                removable: u === "2",
                protocol: "",
                group: "",
                device: ""
              });
            }), e = wc(e, a), t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
      }
      (Ie || _e || Oe) && (t && t(null), i(null));
    });
  });
}
Vt.blockDevices = Cc;
function Vr(t, i) {
  let e = {
    rx: 0,
    wx: 0,
    tx: 0,
    rx_sec: null,
    wx_sec: null,
    tx_sec: null,
    ms: 0
  };
  return ee && ee.ms ? (e.rx = t, e.wx = i, e.tx = e.rx + e.wx, e.ms = Date.now() - ee.ms, e.rx_sec = (e.rx - ee.bytes_read) / (e.ms / 1e3), e.wx_sec = (e.wx - ee.bytes_write) / (e.ms / 1e3), e.tx_sec = e.rx_sec + e.wx_sec, ee.rx_sec = e.rx_sec, ee.wx_sec = e.wx_sec, ee.tx_sec = e.tx_sec, ee.bytes_read = e.rx, ee.bytes_write = e.wx, ee.bytes_overall = e.rx + e.wx, ee.ms = Date.now(), ee.last_ms = e.ms) : (e.rx = t, e.wx = i, e.tx = e.rx + e.wx, ee.rx_sec = null, ee.wx_sec = null, ee.tx_sec = null, ee.bytes_read = e.rx, ee.bytes_write = e.wx, ee.bytes_overall = e.rx + e.wx, ee.ms = Date.now(), ee.last_ms = 0), e;
}
function vc(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      if (ri || Ie || _e || Oe || si)
        return i(null);
      let e = {
        rx: 0,
        wx: 0,
        tx: 0,
        rx_sec: null,
        wx_sec: null,
        tx_sec: null,
        ms: 0
      }, n = 0, s = 0;
      ee && !ee.ms || ee && ee.ms && Date.now() - ee.ms >= 500 ? (be && me("lsblk -r 2>/dev/null | grep /", { maxBuffer: 1024 * 1024 }, function(r, o) {
        if (r)
          t && t(e), i(e);
        else {
          let a = o.toString().split(`
`), l = [];
          a.forEach(function(u) {
            u !== "" && (u = u.trim().split(" "), l.indexOf(u[0]) === -1 && l.push(u[0]));
          });
          let c = l.join("|");
          me('cat /proc/diskstats | egrep "' + c + '"', { maxBuffer: 1024 * 1024 }, function(u, f) {
            u || (f.toString().split(`
`).forEach(function(d) {
              d = d.trim(), d !== "" && (d = d.replace(/ +/g, " ").split(" "), n += parseInt(d[5]) * 512, s += parseInt(d[9]) * 512);
            }), e = Vr(n, s)), t && t(e), i(e);
          });
        }
      }), tt && me(`ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,
"`, { maxBuffer: 1024 * 1024 }, function(r, o) {
        r || (o.toString().split(`
`).forEach(function(l) {
          l = l.trim(), l !== "" && (l = l.split(","), n += parseInt(l[2]), s += parseInt(l[9]));
        }), e = Vr(n, s)), t && t(e), i(e);
      })) : (e.ms = ee.last_ms, e.rx = ee.bytes_read, e.wx = ee.bytes_write, e.tx = ee.bytes_read + ee.bytes_write, e.rx_sec = ee.rx_sec, e.wx_sec = ee.wx_sec, e.tx_sec = ee.tx_sec, t && t(e), i(e));
    });
  });
}
Vt.fsStats = vc;
function kr(t, i, e, n, s) {
  let r = {
    rIO: 0,
    wIO: 0,
    tIO: 0,
    rIO_sec: null,
    wIO_sec: null,
    tIO_sec: null,
    rWaitTime: 0,
    wWaitTime: 0,
    tWaitTime: 0,
    rWaitPercent: null,
    wWaitPercent: null,
    tWaitPercent: null,
    ms: 0
  };
  return R && R.ms ? (r.rIO = t, r.wIO = i, r.tIO = t + i, r.ms = Date.now() - R.ms, r.rIO_sec = (r.rIO - R.rIO) / (r.ms / 1e3), r.wIO_sec = (r.wIO - R.wIO) / (r.ms / 1e3), r.tIO_sec = r.rIO_sec + r.wIO_sec, r.rWaitTime = e, r.wWaitTime = n, r.tWaitTime = s, r.rWaitPercent = (r.rWaitTime - R.rWaitTime) * 100 / r.ms, r.wWaitPercent = (r.wWaitTime - R.wWaitTime) * 100 / r.ms, r.tWaitPercent = (r.tWaitTime - R.tWaitTime) * 100 / r.ms, R.rIO = t, R.wIO = i, R.rIO_sec = r.rIO_sec, R.wIO_sec = r.wIO_sec, R.tIO_sec = r.tIO_sec, R.rWaitTime = e, R.wWaitTime = n, R.tWaitTime = s, R.rWaitPercent = r.rWaitPercent, R.wWaitPercent = r.wWaitPercent, R.tWaitPercent = r.tWaitPercent, R.last_ms = r.ms, R.ms = Date.now()) : (r.rIO = t, r.wIO = i, r.tIO = t + i, r.rWaitTime = e, r.wWaitTime = n, r.tWaitTime = s, R.rIO = t, R.wIO = i, R.rIO_sec = null, R.wIO_sec = null, R.tIO_sec = null, R.rWaitTime = e, R.wWaitTime = n, R.tWaitTime = s, R.rWaitPercent = null, R.wWaitPercent = null, R.tWaitPercent = null, R.last_ms = 0, R.ms = Date.now()), r;
}
function Lc(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      if (ri || si)
        return i(null);
      let e = {
        rIO: 0,
        wIO: 0,
        tIO: 0,
        rIO_sec: null,
        wIO_sec: null,
        tIO_sec: null,
        rWaitTime: 0,
        wWaitTime: 0,
        tWaitTime: 0,
        rWaitPercent: null,
        wWaitPercent: null,
        tWaitPercent: null,
        ms: 0
      }, n = 0, s = 0, r = 0, o = 0, a = 0;
      R && !R.ms || R && R.ms && Date.now() - R.ms >= 500 ? ((be || Ie || _e || Oe) && me('for mount in `lsblk 2>/dev/null | grep " disk " | sed "s/[│└─├]//g" | awk \'{$1=$1};1\' | cut -d " " -f 1 | sort -u`; do cat /sys/block/$mount/stat | sed -r "s/ +/;/g" | sed -r "s/^;//"; done', { maxBuffer: 1024 * 1024 }, function(c, u) {
        c ? (t && t(e), i(e)) : (u.split(`
`).forEach(function(p) {
          if (!p)
            return;
          let d = p.split(";");
          n += parseInt(d[0]), s += parseInt(d[4]), r += parseInt(d[3]), o += parseInt(d[7]), a += parseInt(d[10]);
        }), e = kr(n, s, r, o, a), t && t(e), i(e));
      }), tt && me(`ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,
"`, { maxBuffer: 1024 * 1024 }, function(l, c) {
        l || (c.toString().split(`
`).forEach(function(f) {
          f = f.trim(), f !== "" && (f = f.split(","), n += parseInt(f[10]), s += parseInt(f[0]));
        }), e = kr(n, s, r, o, a)), t && t(e), i(e);
      })) : (e.rIO = R.rIO, e.wIO = R.wIO, e.tIO = R.rIO + R.wIO, e.ms = R.last_ms, e.rIO_sec = R.rIO_sec, e.wIO_sec = R.wIO_sec, e.tIO_sec = R.tIO_sec, e.rWaitTime = R.rWaitTime, e.wWaitTime = R.wWaitTime, e.tWaitTime = R.tWaitTime, e.rWaitPercent = R.rWaitPercent, e.wWaitPercent = R.wWaitPercent, e.tWaitPercent = R.tWaitPercent, t && t(e), i(e));
    });
  });
}
Vt.disksIO = Lc;
function bc(t) {
  function i(e) {
    const n = [
      { pattern: "WESTERN.*", manufacturer: "Western Digital" },
      { pattern: "^WDC.*", manufacturer: "Western Digital" },
      { pattern: "WD.*", manufacturer: "Western Digital" },
      { pattern: "TOSHIBA.*", manufacturer: "Toshiba" },
      { pattern: "HITACHI.*", manufacturer: "Hitachi" },
      { pattern: "^IC.*", manufacturer: "Hitachi" },
      { pattern: "^HTS.*", manufacturer: "Hitachi" },
      { pattern: "SANDISK.*", manufacturer: "SanDisk" },
      { pattern: "KINGSTON.*", manufacturer: "Kingston Technology" },
      { pattern: "^SONY.*", manufacturer: "Sony" },
      { pattern: "TRANSCEND.*", manufacturer: "Transcend" },
      { pattern: "SAMSUNG.*", manufacturer: "Samsung" },
      { pattern: "^ST(?!I\\ ).*", manufacturer: "Seagate" },
      { pattern: "^STI\\ .*", manufacturer: "SimpleTech" },
      { pattern: "^D...-.*", manufacturer: "IBM" },
      { pattern: "^IBM.*", manufacturer: "IBM" },
      { pattern: "^FUJITSU.*", manufacturer: "Fujitsu" },
      { pattern: "^MP.*", manufacturer: "Fujitsu" },
      { pattern: "^MK.*", manufacturer: "Toshiba" },
      { pattern: "MAXTO.*", manufacturer: "Maxtor" },
      { pattern: "PIONEER.*", manufacturer: "Pioneer" },
      { pattern: "PHILIPS.*", manufacturer: "Philips" },
      { pattern: "QUANTUM.*", manufacturer: "Quantum Technology" },
      { pattern: "FIREBALL.*", manufacturer: "Quantum Technology" },
      { pattern: "^VBOX.*", manufacturer: "VirtualBox" },
      { pattern: "CORSAIR.*", manufacturer: "Corsair Components" },
      { pattern: "CRUCIAL.*", manufacturer: "Crucial" },
      { pattern: "ECM.*", manufacturer: "ECM" },
      { pattern: "INTEL.*", manufacturer: "INTEL" },
      { pattern: "EVO.*", manufacturer: "Samsung" },
      { pattern: "APPLE.*", manufacturer: "Apple" }
    ];
    let s = "";
    return e && (e = e.toUpperCase(), n.forEach((r) => {
      RegExp(r.pattern).test(e) && (s = r.manufacturer);
    })), s;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      const n = (o) => {
        for (let a = 0; a < o.length; a++)
          delete o[a].BSDName;
        t && t(o), e(o);
      };
      let s = [], r = "";
      if (be) {
        let o = "";
        me("export LC_ALL=C; lsblk -ablJO 2>/dev/null; unset LC_ALL", { maxBuffer: 1024 * 1024 }, function(a, l) {
          if (!a)
            try {
              const c = l.toString().trim();
              let u = [];
              try {
                const f = JSON.parse(c);
                f && {}.hasOwnProperty.call(f, "blockdevices") && (u = f.blockdevices.filter((p) => p.type === "disk" && p.size > 0 && (p.model !== null || p.mountpoint === null && p.label === null && p.fstype === null && p.parttype === null && p.path && p.path.indexOf("/ram") !== 0 && p.path.indexOf("/loop") !== 0 && p["disc-max"] && p["disc-max"] !== 0)));
              } catch {
                try {
                  const p = et("export LC_ALL=C; lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER,GROUP 2>/dev/null; unset LC_ALL", b.execOptsLinux).toString();
                  let d = Xn(p).split(`
`);
                  u = jn(d).filter((h) => h.type === "disk" && h.size > 0 && (h.model !== null && h.model !== "" || h.mount === "" && h.label === "" && h.fsType === ""));
                } catch {
                  b.noop();
                }
              }
              u.forEach((f) => {
                let p = "";
                const d = "/dev/" + f.name, m = f.name;
                try {
                  p = et("cat /sys/block/" + m + "/queue/rotational 2>/dev/null", b.execOptsLinux).toString().split(`
`)[0];
                } catch {
                  b.noop();
                }
                let h = f.tran ? f.tran.toUpperCase().trim() : "";
                h === "NVME" && (p = "2", h = "PCIe"), s.push({
                  device: d,
                  type: p === "0" ? "SSD" : p === "1" ? "HD" : p === "2" ? "NVMe" : f.model && f.model.indexOf("SSD") > -1 ? "SSD" : f.model && f.model.indexOf("NVM") > -1 ? "NVMe" : "HD",
                  name: f.model || "",
                  vendor: i(f.model) || (f.vendor ? f.vendor.trim() : ""),
                  size: f.size || 0,
                  bytesPerSector: null,
                  totalCylinders: null,
                  totalHeads: null,
                  totalSectors: null,
                  totalTracks: null,
                  tracksPerCylinder: null,
                  sectorsPerTrack: null,
                  firmwareRevision: f.rev ? f.rev.trim() : "",
                  serialNum: f.serial ? f.serial.trim() : "",
                  interfaceType: h,
                  smartStatus: "unknown",
                  temperature: null,
                  BSDName: d
                }), r += `printf "
${d}|"; smartctl -H ${d} | grep overall;`, o += `${o ? 'printf ",";' : ""}smartctl -a -j ${d};`;
              });
            } catch {
              b.noop();
            }
          o ? me(o, { maxBuffer: 1024 * 1024 }, function(c, u) {
            try {
              JSON.parse(`[${u}]`).forEach((p) => {
                const d = p.smartctl.argv[p.smartctl.argv.length - 1];
                for (let m = 0; m < s.length; m++)
                  s[m].BSDName === d && (s[m].smartStatus = p.smart_status.passed ? "Ok" : p.smart_status.passed === !1 ? "Predicted Failure" : "unknown", p.temperature && p.temperature.current && (s[m].temperature = p.temperature.current), s[m].smartData = p);
              }), n(s);
            } catch {
              r ? (r = r + `printf "
"`, me(r, { maxBuffer: 1024 * 1024 }, function(p, d) {
                d.toString().split(`
`).forEach((h) => {
                  if (h) {
                    let y = h.split("|");
                    if (y.length === 2) {
                      let g = y[0];
                      y[1] = y[1].trim();
                      let x = y[1].split(":");
                      if (x.length === 2) {
                        x[1] = x[1].trim();
                        let w = x[1].toLowerCase();
                        for (let S = 0; S < s.length; S++)
                          s[S].BSDName === g && (s[S].smartStatus = w === "passed" ? "Ok" : w === "failed!" ? "Predicted Failure" : "unknown");
                      }
                    }
                  }
                }), n(s);
              })) : n(s);
            }
          }) : n(s);
        });
      }
      if ((Ie || _e || Oe) && (t && t(s), e(s)), si && (t && t(s), e(s)), tt && me("system_profiler SPSerialATADataType SPNVMeDataType SPUSBDataType", { maxBuffer: 1024 * 1024 }, function(o, a) {
        if (!o) {
          let l = a.toString().split(`
`), c = [], u = [], f = [], p = "SATA";
          l.forEach((d) => {
            d === "NVMExpress:" ? p = "NVMe" : d === "USB:" ? p = "USB" : d === "SATA/SATA Express:" ? p = "SATA" : p === "SATA" ? c.push(d) : p === "NVMe" ? u.push(d) : p === "USB" && f.push(d);
          });
          try {
            let d = c.join(`
`).split(" Physical Interconnect: ");
            d.shift(), d.forEach(function(m) {
              m = "InterfaceType: " + m;
              let h = m.split(`
`);
              const y = b.getValue(h, "Medium Type", ":", !0).trim(), g = b.getValue(h, "capacity", ":", !0).trim(), x = b.getValue(h, "BSD Name", ":", !0).trim();
              if (g) {
                let w = 0;
                if (g.indexOf("(") >= 0 && (w = parseInt(g.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""))), w || (w = parseInt(g)), w) {
                  const S = b.getValue(h, "S.M.A.R.T. status", ":", !0).trim().toLowerCase();
                  s.push({
                    device: x,
                    type: y.startsWith("Solid") ? "SSD" : "HD",
                    name: b.getValue(h, "Model", ":", !0).trim(),
                    vendor: i(b.getValue(h, "Model", ":", !0).trim()) || b.getValue(h, "Manufacturer", ":", !0),
                    size: w,
                    bytesPerSector: null,
                    totalCylinders: null,
                    totalHeads: null,
                    totalSectors: null,
                    totalTracks: null,
                    tracksPerCylinder: null,
                    sectorsPerTrack: null,
                    firmwareRevision: b.getValue(h, "Revision", ":", !0).trim(),
                    serialNum: b.getValue(h, "Serial Number", ":", !0).trim(),
                    interfaceType: b.getValue(h, "InterfaceType", ":", !0).trim(),
                    smartStatus: S === "verified" ? "OK" : S || "unknown",
                    temperature: null,
                    BSDName: x
                  }), r = r + `printf "
` + x + '|"; diskutil info /dev/' + x + " | grep SMART;";
                }
              }
            });
          } catch {
            b.noop();
          }
          try {
            let d = u.join(`
`).split(`

          Capacity:`);
            d.shift(), d.forEach(function(m) {
              m = "!Capacity: " + m;
              let h = m.split(`
`);
              const y = b.getValue(h, "link width", ":", !0).trim(), g = b.getValue(h, "!capacity", ":", !0).trim(), x = b.getValue(h, "BSD Name", ":", !0).trim();
              if (g) {
                let w = 0;
                if (g.indexOf("(") >= 0 && (w = parseInt(g.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""))), w || (w = parseInt(g)), w) {
                  const S = b.getValue(h, "S.M.A.R.T. status", ":", !0).trim().toLowerCase();
                  s.push({
                    device: x,
                    type: "NVMe",
                    name: b.getValue(h, "Model", ":", !0).trim(),
                    vendor: i(b.getValue(h, "Model", ":", !0).trim()),
                    size: w,
                    bytesPerSector: null,
                    totalCylinders: null,
                    totalHeads: null,
                    totalSectors: null,
                    totalTracks: null,
                    tracksPerCylinder: null,
                    sectorsPerTrack: null,
                    firmwareRevision: b.getValue(h, "Revision", ":", !0).trim(),
                    serialNum: b.getValue(h, "Serial Number", ":", !0).trim(),
                    interfaceType: ("PCIe " + y).trim(),
                    smartStatus: S === "verified" ? "OK" : S || "unknown",
                    temperature: null,
                    BSDName: x
                  }), r = r + `printf "
` + x + '|"; diskutil info /dev/' + x + " | grep SMART;";
                }
              }
            });
          } catch {
            b.noop();
          }
          try {
            let d = f.join(`
`).replaceAll(`Media:
 `, "Model:").split(`

          Product ID:`);
            d.shift(), d.forEach(function(m) {
              let h = m.split(`
`);
              const y = b.getValue(h, "Capacity", ":", !0).trim(), g = b.getValue(h, "BSD Name", ":", !0).trim();
              if (y) {
                let x = 0;
                if (y.indexOf("(") >= 0 && (x = parseInt(y.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""))), x || (x = parseInt(y)), x) {
                  const w = b.getValue(h, "S.M.A.R.T. status", ":", !0).trim().toLowerCase();
                  s.push({
                    device: g,
                    type: "USB",
                    name: b.getValue(h, "Model", ":", !0).trim().replaceAll(":", ""),
                    vendor: i(b.getValue(h, "Model", ":", !0).trim()),
                    size: x,
                    bytesPerSector: null,
                    totalCylinders: null,
                    totalHeads: null,
                    totalSectors: null,
                    totalTracks: null,
                    tracksPerCylinder: null,
                    sectorsPerTrack: null,
                    firmwareRevision: b.getValue(h, "Revision", ":", !0).trim(),
                    serialNum: b.getValue(h, "Serial Number", ":", !0).trim(),
                    interfaceType: "USB",
                    smartStatus: w === "verified" ? "OK" : w || "unknown",
                    temperature: null,
                    BSDName: g
                  }), r = r + `printf "
` + g + '|"; diskutil info /dev/' + g + " | grep SMART;";
                }
              }
            });
          } catch {
            b.noop();
          }
          if (r)
            r = r + `printf "
"`, me(r, { maxBuffer: 1024 * 1024 }, function(d, m) {
              m.toString().split(`
`).forEach((y) => {
                if (y) {
                  let g = y.split("|");
                  if (g.length === 2) {
                    let x = g[0];
                    g[1] = g[1].trim();
                    let w = g[1].split(":");
                    if (w.length === 2) {
                      w[1] = w[1].trim();
                      let S = w[1].toLowerCase();
                      for (let C = 0; C < s.length; C++)
                        s[C].BSDName === x && (s[C].smartStatus = S === "not supported" ? "not supported" : S === "verified" ? "Ok" : S === "failing" ? "Predicted Failure" : "unknown");
                    }
                  }
                }
              });
              for (let y = 0; y < s.length; y++)
                delete s[y].BSDName;
              t && t(s), e(s);
            });
          else {
            for (let d = 0; d < s.length; d++)
              delete s[d].BSDName;
            t && t(s), e(s);
          }
        }
      }), ri)
        try {
          const o = [];
          if (o.push(b.powerShell("Get-CimInstance Win32_DiskDrive | select Caption,Size,Status,PNPDeviceId,DeviceId,BytesPerSector,TotalCylinders,TotalHeads,TotalSectors,TotalTracks,TracksPerCylinder,SectorsPerTrack,FirmwareRevision,SerialNumber,InterfaceType | fl")), o.push(b.powerShell("Get-PhysicalDisk | select BusType,MediaType,FriendlyName,Model,SerialNumber,Size | fl")), b.smartMonToolsInstalled())
            try {
              const a = JSON.parse(et("smartctl --scan -j").toString());
              a && a.devices && a.devices.length > 0 && a.devices.forEach((l) => {
                o.push(lc(`smartctl -j -a ${l.name}`, b.execOptsWin));
              });
            } catch {
              b.noop();
            }
          b.promiseAll(
            o
          ).then((a) => {
            let l = a.results[0].toString().split(/\n\s*\n/);
            l.forEach(function(c) {
              let u = c.split(`\r
`);
              const f = b.getValue(u, "Size", ":").trim(), p = b.getValue(u, "Status", ":").trim().toLowerCase();
              f && s.push({
                device: b.getValue(u, "DeviceId", ":"),
                // changed from PNPDeviceId to DeviceID (be be able to match devices)
                type: c.indexOf("SSD") > -1 ? "SSD" : "HD",
                // just a starting point ... better: MSFT_PhysicalDisk - Media Type ... see below
                name: b.getValue(u, "Caption", ":"),
                vendor: i(b.getValue(u, "Caption", ":", !0).trim()),
                size: parseInt(f),
                bytesPerSector: parseInt(b.getValue(u, "BytesPerSector", ":")),
                totalCylinders: parseInt(b.getValue(u, "TotalCylinders", ":")),
                totalHeads: parseInt(b.getValue(u, "TotalHeads", ":")),
                totalSectors: parseInt(b.getValue(u, "TotalSectors", ":")),
                totalTracks: parseInt(b.getValue(u, "TotalTracks", ":")),
                tracksPerCylinder: parseInt(b.getValue(u, "TracksPerCylinder", ":")),
                sectorsPerTrack: parseInt(b.getValue(u, "SectorsPerTrack", ":")),
                firmwareRevision: b.getValue(u, "FirmwareRevision", ":").trim(),
                serialNum: b.getValue(u, "SerialNumber", ":").trim(),
                interfaceType: b.getValue(u, "InterfaceType", ":").trim(),
                smartStatus: p === "ok" ? "Ok" : p === "degraded" ? "Degraded" : p === "pred fail" ? "Predicted Failure" : "Unknown",
                temperature: null
              });
            }), l = a.results[1].split(/\n\s*\n/), l.forEach(function(c) {
              let u = c.split(`\r
`);
              const f = b.getValue(u, "SerialNumber", ":").trim(), p = b.getValue(u, "FriendlyName", ":").trim().replace("Msft ", "Microsoft"), d = b.getValue(u, "Size", ":").trim(), m = b.getValue(u, "Model", ":").trim(), h = b.getValue(u, "BusType", ":").trim();
              let y = b.getValue(u, "MediaType", ":").trim();
              if ((y === "3" || y === "HDD") && (y = "HD"), y === "4" && (y = "SSD"), y === "5" && (y = "SCM"), y === "Unspecified" && (m.toLowerCase().indexOf("virtual") > -1 || m.toLowerCase().indexOf("vbox") > -1) && (y = "Virtual"), d) {
                let g = b.findObjectByKey(s, "serialNum", f);
                (g === -1 || f === "") && (g = b.findObjectByKey(s, "name", p)), g != -1 && (s[g].type = y, s[g].interfaceType = h);
              }
            }), a.results.shift(), a.results.shift(), a.results.length && a.results.forEach((c) => {
              try {
                const u = JSON.parse(c);
                if (u.serial_number) {
                  const f = u.serial_number;
                  let p = b.findObjectByKey(s, "serialNum", f);
                  p != -1 && (s[p].smartStatus = u.smart_status && u.smart_status.passed ? "Ok" : u.smart_status && u.smart_status.passed === !1 ? "Predicted Failure" : "unknown", u.temperature && u.temperature.current && (s[p].temperature = u.temperature.current), s[p].smartData = u);
                }
              } catch {
                b.noop();
              }
            }), t && t(s), e(s);
          });
        } catch {
          t && t(s), e(s);
        }
    });
  });
}
Vt.diskLayout = bc;
var kt = {};
const Xi = se, we = te.exec, ce = te.execSync, Ic = Fe, E = T;
let ct = process.platform;
const ze = ct === "linux" || ct === "android", He = ct === "darwin", Ai = ct === "win32", lt = ct === "freebsd", ut = ct === "openbsd", pt = ct === "netbsd", Nr = ct === "sunos";
let Q = {}, Fr = "", Ut = {}, Wr = [], $t = [], zt = {}, At;
function Tt() {
  let t = "", i = "";
  try {
    let e = Xi.networkInterfaces(), n = 9999;
    for (let s in e)
      ({}).hasOwnProperty.call(e, s) && e[s].forEach(function(r) {
        r && r.internal === !1 && (i = i || s, r.scopeid && r.scopeid < n && (t = s, n = r.scopeid));
      });
    if (t = t || i || "", Ai) {
      let s = "";
      if (ce("netstat -r", E.execOptsWin).toString().split(Xi.EOL).forEach((l) => {
        if (l = l.replace(/\s+/g, " ").trim(), l.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(l)) {
          const c = l.split(" ");
          c.length >= 5 && (s = c[c.length - 2]);
        }
      }), s)
        for (let l in e)
          ({}).hasOwnProperty.call(e, l) && e[l].forEach(function(c) {
            c && c.address && c.address === s && (t = l);
          });
    }
    if (ze) {
      let o = ce("ip route 2> /dev/null | grep default", E.execOptsLinux).toString().split(`
`)[0].split(/\s+/);
      o[0] === "none" && o[5] ? t = o[5] : o[4] && (t = o[4]), t.indexOf(":") > -1 && (t = t.split(":")[1].trim());
    }
    if (He || lt || ut || pt || Nr) {
      let s = "";
      ze && (s = "ip route 2> /dev/null | grep default | awk '{print $5}'"), He && (s = "route -n get default 2>/dev/null | grep interface: | awk '{print $2}'"), (lt || ut || pt || Nr) && (s = "route get 0.0.0.0 | grep interface:"), t = ce(s).toString().split(`
`)[0], t.indexOf(":") > -1 && (t = t.split(":")[1].trim());
    }
  } catch {
    E.noop();
  }
  return t && (Fr = t), Fr;
}
kt.getDefaultNetworkInterface = Tt;
function Rr() {
  let t = "", i = "", e = {};
  if (ze || lt || ut || pt) {
    if (typeof At > "u")
      try {
        const n = ce("which ip", E.execOptsLinux).toString().split(`
`);
        n.length && n[0].indexOf(":") === -1 && n[0].indexOf("/") === 0 ? At = n[0] : At = "";
      } catch {
        At = "";
      }
    try {
      const n = "export LC_ALL=C; " + (At ? At + " link show up" : "/sbin/ifconfig") + "; unset LC_ALL", r = ce(n, E.execOptsLinux).toString().split(`
`);
      for (let o = 0; o < r.length; o++)
        if (r[o] && r[o][0] !== " ") {
          if (At) {
            let a = r[o + 1].trim().split(" ");
            a[0] === "link/ether" && (t = r[o].split(" ")[1], t = t.slice(0, t.length - 1), i = a[1]);
          } else
            t = r[o].split(" ")[0], i = r[o].split("HWaddr ")[1];
          t && i && (e[t] = i.trim(), t = "", i = "");
        }
    } catch {
      E.noop();
    }
  }
  if (He)
    try {
      const r = ce("/sbin/ifconfig").toString().split(`
`);
      for (let o = 0; o < r.length; o++)
        r[o] && r[o][0] !== "	" && r[o].indexOf(":") > 0 ? t = r[o].split(":")[0] : r[o].indexOf("	ether ") === 0 && (i = r[o].split("	ether ")[1], t && i && (e[t] = i.trim(), t = "", i = ""));
    } catch {
      E.noop();
    }
  return e;
}
function _c(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = Tt();
      t && t(e), i(e);
    });
  });
}
kt.networkInterfaceDefault = _c;
function Oc(t, i) {
  let e = [];
  for (let n in t)
    try {
      if ({}.hasOwnProperty.call(t, n) && t[n].trim() !== "") {
        let s = t[n].trim().split(`\r
`), r = null;
        try {
          r = i && i[n] ? i[n].trim().split(`\r
`) : [];
        } catch {
          E.noop();
        }
        let o = E.getValue(s, "NetEnabled", ":"), a = E.getValue(s, "AdapterTypeID", ":") === "9" ? "wireless" : "wired", l = E.getValue(s, "Name", ":").replace(/\]/g, ")").replace(/\[/g, "("), c = E.getValue(s, "NetConnectionID", ":").replace(/\]/g, ")").replace(/\[/g, "(");
        if ((l.toLowerCase().indexOf("wi-fi") >= 0 || l.toLowerCase().indexOf("wireless") >= 0) && (a = "wireless"), o !== "") {
          const u = parseInt(E.getValue(s, "speed", ":").trim(), 10) / 1e6;
          e.push({
            mac: E.getValue(s, "MACAddress", ":").toLowerCase(),
            dhcp: E.getValue(r, "dhcpEnabled", ":").toLowerCase() === "true",
            name: l,
            iface: c,
            netEnabled: o === "TRUE",
            speed: isNaN(u) ? null : u,
            operstate: E.getValue(s, "NetConnectionStatus", ":") === "2" ? "up" : "down",
            type: a
          });
        }
      }
    } catch {
      E.noop();
    }
  return e;
}
function Pc() {
  return new Promise((t) => {
    process.nextTick(() => {
      let i = "Get-CimInstance Win32_NetworkAdapter | fl *; echo '#-#-#-#';";
      i += "Get-CimInstance Win32_NetworkAdapterConfiguration | fl DHCPEnabled";
      try {
        E.powerShell(i).then((e) => {
          e = e.split("#-#-#-#");
          const n = (e[0] || "").split(/\n\s*\n/), s = (e[1] || "").split(/\n\s*\n/);
          t(Oc(n, s));
        });
      } catch {
        t([]);
      }
    });
  });
}
function Ac() {
  let t = {}, i = {
    primaryDNS: "",
    exitCode: 0,
    ifaces: []
  };
  try {
    return ce("ipconfig /all", E.execOptsWin).split(`\r
\r
`).forEach((s, r) => {
      if (r == 1) {
        const o = s.split(`\r
`).filter((l) => l.toUpperCase().includes("DNS")), a = o[0].substring(o[0].lastIndexOf(":") + 1);
        i.primaryDNS = a.trim(), i.primaryDNS || (i.primaryDNS = "Not defined");
      }
      if (r > 1)
        if (r % 2 == 0) {
          const o = s.substring(s.lastIndexOf(" ") + 1).replace(":", "");
          t.name = o;
        } else {
          const o = s.split(`\r
`).filter((l) => l.toUpperCase().includes("DNS")), a = o[0].substring(o[0].lastIndexOf(":") + 1);
          t.dnsSuffix = a.trim(), i.ifaces.push(t), t = {};
        }
    }), i;
  } catch {
    return {
      primaryDNS: "",
      exitCode: 0,
      ifaces: []
    };
  }
}
function Ec(t, i) {
  let e = "";
  const n = i + ".";
  try {
    const s = t.filter((r) => n.includes(r.name + ".")).map((r) => r.dnsSuffix);
    return s[0] && (e = s[0]), e || (e = ""), e;
  } catch {
    return "Unknown";
  }
}
function Mc() {
  try {
    return ce("netsh lan show profiles", E.execOptsWin).split(`\r
Profile on interface`);
  } catch (t) {
    return t.status === 1 && t.stdout.includes("AutoConfig") ? "Disabled" : [];
  }
}
function Tc(t) {
  try {
    return ce(`netsh wlan show  interface name="${t}" | findstr "SSID"`, E.execOptsWin).split(`\r
`).shift().split(":").pop().trim();
  } catch {
    return "Unknown";
  }
}
function Dc(t, i, e) {
  let n = {
    state: "Unknown",
    protocol: "Unknown"
  };
  if (e === "Disabled")
    return n.state = "Disabled", n.protocol = "Not defined", n;
  if (t == "wired" && e.length > 0)
    try {
      const r = e.find((a) => a.includes(i + `\r
`)).split(`\r
`), o = r.find((a) => a.includes("802.1x"));
      if (o.includes("Disabled"))
        n.state = "Disabled", n.protocol = "Not defined";
      else if (o.includes("Enabled")) {
        const a = r.find((l) => l.includes("EAP"));
        n.protocol = a.split(":").pop(), n.state = "Enabled";
      }
    } catch {
      return n;
    }
  else if (t == "wireless") {
    let s = "", r = "";
    try {
      const o = Tc(i);
      if (o !== "Unknown") {
        let a = "";
        const l = E.isPrototypePolluted() ? "---" : E.sanitizeShellString(o), c = E.mathMin(l.length, 32);
        for (let u = 0; u <= c; u++)
          l[u] !== void 0 && (a = a + l[u]);
        s = ce(`netsh wlan show profiles "${a}" | findstr "802.1X"`, E.execOptsWin), r = ce(`netsh wlan show profiles "${a}" | findstr "EAP"`, E.execOptsWin);
      }
      s.includes(":") && r.includes(":") && (n.state = s.split(":").pop(), n.protocol = r.split(":").pop());
    } catch (o) {
      return o.status === 1 && o.stdout.includes("AutoConfig") && (n.state = "Disabled", n.protocol = "Not defined"), n;
    }
  }
  return n;
}
function $s(t) {
  const i = [];
  let e = [];
  return t.forEach(function(n) {
    !n.startsWith("	") && !n.startsWith(" ") && e.length && (i.push(e), e = []), e.push(n);
  }), e.length && i.push(e), i;
}
function Bc(t) {
  let i = [];
  return t.forEach((e) => {
    let n = {
      iface: "",
      mtu: null,
      mac: "",
      ip6: "",
      ip4: "",
      speed: null,
      type: "",
      operstate: "",
      duplex: "",
      internal: !1
    };
    const s = e[0];
    n.iface = s.split(":")[0].trim();
    let r = s.split("> mtu");
    n.mtu = r.length > 1 ? parseInt(r[1], 10) : null, isNaN(n.mtu) && (n.mtu = null), n.internal = r[0].toLowerCase().indexOf("loopback") > -1, e.forEach((l) => {
      l.trim().startsWith("ether ") && (n.mac = l.split("ether ")[1].toLowerCase().trim()), l.trim().startsWith("inet6 ") && !n.ip6 && (n.ip6 = l.split("inet6 ")[1].toLowerCase().split("%")[0].split(" ")[0]), l.trim().startsWith("inet ") && !n.ip4 && (n.ip4 = l.split("inet ")[1].toLowerCase().split(" ")[0]);
    });
    let o = E.getValue(e, "link rate");
    n.speed = o ? parseFloat(o) : null, n.speed === null ? (o = E.getValue(e, "uplink rate"), n.speed = o ? parseFloat(o) : null, n.speed !== null && o.toLowerCase().indexOf("gbps") >= 0 && (n.speed = n.speed * 1e3)) : o.toLowerCase().indexOf("gbps") >= 0 && (n.speed = n.speed * 1e3), n.type = E.getValue(e, "type").toLowerCase().indexOf("wi-fi") > -1 ? "wireless" : "wired";
    const a = E.getValue(e, "status").toLowerCase();
    n.operstate = a === "active" ? "up" : a === "inactive" ? "down" : "unknown", n.duplex = E.getValue(e, "media").toLowerCase().indexOf("half-duplex") > -1 ? "half" : "full", (n.ip6 || n.ip4 || n.mac) && i.push(n);
  }), i;
}
function Vc() {
  const t = "/sbin/ifconfig -v";
  try {
    const i = ce(t, { maxBuffer: 2048e4 }).toString().split(`
`), e = $s(i);
    return Bc(e);
  } catch {
    return [];
  }
}
function kc(t) {
  const i = `nmcli device status 2>/dev/null | grep ${t}`;
  try {
    const r = ce(i, E.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(3).join(" ");
    return r != "--" ? r : "";
  } catch {
    return "";
  }
}
function zs(t) {
  let i = [];
  try {
    let e = `cat ${t} 2> /dev/null | grep 'iface\\|source'`;
    ce(e, E.execOptsLinux).toString().split(`
`).forEach((s) => {
      const r = s.replace(/\s+/g, " ").trim().split(" ");
      if (r.length >= 4 && s.toLowerCase().indexOf(" inet ") >= 0 && s.toLowerCase().indexOf("dhcp") >= 0 && i.push(r[1]), s.toLowerCase().includes("source")) {
        let o = s.split(" ")[1];
        i = i.concat(zs(o));
      }
    });
  } catch {
    E.noop();
  }
  return i;
}
function Nc() {
  let t = "ip a 2> /dev/null", i = [];
  try {
    const e = ce(t, E.execOptsLinux).toString().split(`
`), n = $s(e);
    i = Fc(n);
  } catch {
    E.noop();
  }
  try {
    i = zs("/etc/network/interfaces");
  } catch {
    E.noop();
  }
  return i;
}
function Fc(t) {
  const i = [];
  return t && t.length && t.forEach((e) => {
    if (e && e.length && e[0].split(":").length > 2) {
      for (let s of e)
        if (s.indexOf(" inet ") >= 0 && s.indexOf(" dynamic ") >= 0) {
          const r = s.split(" "), o = r[r.length - 1].trim();
          i.push(o);
          break;
        }
    }
  }), i;
}
function Wc(t, i, e) {
  let n = !1;
  if (i) {
    const s = `nmcli connection show "${i}" 2>/dev/null | grep ipv4.method;`;
    try {
      switch (ce(s, E.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(1).toString()) {
        case "auto":
          n = !0;
          break;
        default:
          n = !1;
          break;
      }
      return n;
    } catch {
      return e.indexOf(t) >= 0;
    }
  } else
    return e.indexOf(t) >= 0;
}
function Rc(t) {
  let i = !1;
  const e = `ipconfig getpacket "${t}" 2>/dev/null | grep lease_time;`;
  try {
    const n = ce(e).toString().split(`
`);
    n.length && n[0].startsWith("lease_time") && (i = !0);
  } catch {
    E.noop();
  }
  return i;
}
function Gc(t) {
  if (t) {
    const i = `nmcli connection show "${t}" 2>/dev/null | grep ipv4.dns-search;`;
    try {
      const s = ce(i, E.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(1).toString();
      return s == "--" ? "Not defined" : s;
    } catch {
      return "Unknown";
    }
  } else
    return "Unknown";
}
function Uc(t) {
  if (t) {
    const i = `nmcli connection show "${t}" 2>/dev/null | grep 802-1x.eap;`;
    try {
      const s = ce(i, E.execOptsLinux).toString().replace(/\s+/g, " ").trim().split(" ").slice(1).toString();
      return s == "--" ? "" : s;
    } catch {
      return "Not defined";
    }
  } else
    return "Not defined";
}
function $c(t) {
  return t ? t == "Not defined" ? "Disabled" : "Enabled" : "Unknown";
}
function _n(t, i, e) {
  const n = ["00:00:00:00:00:00", "00:03:FF", "00:05:69", "00:0C:29", "00:0F:4B", "00:13:07", "00:13:BE", "00:15:5d", "00:16:3E", "00:1C:42", "00:21:F6", "00:24:0B", "00:50:56", "00:A0:B1", "00:E0:C8", "08:00:27", "0A:00:27", "18:92:2C", "16:DF:49", "3C:F3:92", "54:52:00", "FC:15:97"];
  return e ? n.filter((s) => e.toUpperCase().toUpperCase().startsWith(s.substring(0, e.length))).length > 0 || t.toLowerCase().indexOf(" virtual ") > -1 || i.toLowerCase().indexOf(" virtual ") > -1 || t.toLowerCase().indexOf("vethernet ") > -1 || i.toLowerCase().indexOf("vethernet ") > -1 || t.toLowerCase().startsWith("veth") || i.toLowerCase().startsWith("veth") || t.toLowerCase().startsWith("vboxnet") || i.toLowerCase().startsWith("vboxnet") : !1;
}
function sr(t, i, e) {
  return typeof t == "string" && (e = t, i = !0, t = null), typeof t == "boolean" && (i = t, t = null, e = ""), typeof i > "u" && (i = !0), e = e || "", e = "" + e, new Promise((n) => {
    process.nextTick(() => {
      let s = Xi.networkInterfaces(), r = [], o = [], a = [], l = [];
      if (He || lt || ut || pt)
        if (JSON.stringify(s) === JSON.stringify(Ut) && !i)
          r = $t, t && t(r), n(r);
        else {
          const c = Tt();
          Ut = JSON.parse(JSON.stringify(s)), o = Vc(), o.forEach((u) => {
            ({}).hasOwnProperty.call(s, u.iface) && s[u.iface].forEach(function(m) {
              (m.family === "IPv4" || m.family === 4) && (u.ip4subnet = m.netmask), (m.family === "IPv6" || m.family === 6) && (u.ip6subnet = m.netmask);
            });
            let f = "";
            const p = E.isPrototypePolluted() ? "---" : E.sanitizeShellString(u.iface), d = E.mathMin(p.length, 2e3);
            for (let m = 0; m <= d; m++)
              p[m] !== void 0 && (f = f + p[m]);
            r.push({
              iface: u.iface,
              ifaceName: u.iface,
              default: u.iface === c,
              ip4: u.ip4,
              ip4subnet: u.ip4subnet || "",
              ip6: u.ip6,
              ip6subnet: u.ip6subnet || "",
              mac: u.mac,
              internal: u.internal,
              virtual: u.internal ? !1 : _n(u.iface, u.iface, u.mac),
              operstate: u.operstate,
              type: u.type,
              duplex: u.duplex,
              mtu: u.mtu,
              speed: u.speed,
              dhcp: Rc(f),
              dnsSuffix: "",
              ieee8021xAuth: "",
              ieee8021xState: "",
              carrierChanges: 0
            });
          }), $t = r, e.toLowerCase().indexOf("default") >= 0 && (r = r.filter((u) => u.default), r.length > 0 ? r = r[0] : r = []), t && t(r), n(r);
        }
      if (ze)
        if (JSON.stringify(s) === JSON.stringify(Ut) && !i)
          r = $t, t && t(r), n(r);
        else {
          Ut = JSON.parse(JSON.stringify(s)), Wr = Nc();
          const c = Tt();
          for (let u in s) {
            let f = "", p = "", d = "", m = "", h = "", y = "", g = "", x = null, w = 0, S = !1, C = "", _ = "", O = "", U = "";
            if ({}.hasOwnProperty.call(s, u)) {
              let I = u;
              s[u].forEach(function(B) {
                (B.family === "IPv4" || B.family === 4) && (f = B.address, p = B.netmask), (B.family === "IPv6" || B.family === 6) && (!d || d.match(/^fe80::/i)) && (d = B.address, m = B.netmask), h = B.mac;
                const K = parseInt(process.versions.node.split("."), 10);
                h.indexOf("00:00:0") > -1 && (ze || He) && !B.internal && K >= 8 && K <= 11 && (Object.keys(zt).length === 0 && (zt = Rr()), h = zt[u] || "");
              });
              let W = u.split(":")[0].trim().toLowerCase(), V = "";
              const ie = E.isPrototypePolluted() ? "---" : E.sanitizeShellString(W), oe = E.mathMin(ie.length, 2e3);
              for (let B = 0; B <= oe; B++)
                ie[B] !== void 0 && (V = V + ie[B]);
              const le = `echo -n "addr_assign_type: "; cat /sys/class/net/${V}/addr_assign_type 2>/dev/null; echo;
            echo -n "address: "; cat /sys/class/net/${V}/address 2>/dev/null; echo;
            echo -n "addr_len: "; cat /sys/class/net/${V}/addr_len 2>/dev/null; echo;
            echo -n "broadcast: "; cat /sys/class/net/${V}/broadcast 2>/dev/null; echo;
            echo -n "carrier: "; cat /sys/class/net/${V}/carrier 2>/dev/null; echo;
            echo -n "carrier_changes: "; cat /sys/class/net/${V}/carrier_changes 2>/dev/null; echo;
            echo -n "dev_id: "; cat /sys/class/net/${V}/dev_id 2>/dev/null; echo;
            echo -n "dev_port: "; cat /sys/class/net/${V}/dev_port 2>/dev/null; echo;
            echo -n "dormant: "; cat /sys/class/net/${V}/dormant 2>/dev/null; echo;
            echo -n "duplex: "; cat /sys/class/net/${V}/duplex 2>/dev/null; echo;
            echo -n "flags: "; cat /sys/class/net/${V}/flags 2>/dev/null; echo;
            echo -n "gro_flush_timeout: "; cat /sys/class/net/${V}/gro_flush_timeout 2>/dev/null; echo;
            echo -n "ifalias: "; cat /sys/class/net/${V}/ifalias 2>/dev/null; echo;
            echo -n "ifindex: "; cat /sys/class/net/${V}/ifindex 2>/dev/null; echo;
            echo -n "iflink: "; cat /sys/class/net/${V}/iflink 2>/dev/null; echo;
            echo -n "link_mode: "; cat /sys/class/net/${V}/link_mode 2>/dev/null; echo;
            echo -n "mtu: "; cat /sys/class/net/${V}/mtu 2>/dev/null; echo;
            echo -n "netdev_group: "; cat /sys/class/net/${V}/netdev_group 2>/dev/null; echo;
            echo -n "operstate: "; cat /sys/class/net/${V}/operstate 2>/dev/null; echo;
            echo -n "proto_down: "; cat /sys/class/net/${V}/proto_down 2>/dev/null; echo;
            echo -n "speed: "; cat /sys/class/net/${V}/speed 2>/dev/null; echo;
            echo -n "tx_queue_len: "; cat /sys/class/net/${V}/tx_queue_len 2>/dev/null; echo;
            echo -n "type: "; cat /sys/class/net/${V}/type 2>/dev/null; echo;
            echo -n "wireless: "; cat /proc/net/wireless 2>/dev/null | grep ${V}; echo;
            echo -n "wirelessspeed: "; iw dev ${V} link 2>&1 | grep bitrate; echo;`;
              let X = [];
              try {
                X = ce(le, E.execOptsLinux).toString().split(`
`);
                const B = kc(V);
                S = Wc(V, B, Wr), C = Gc(B), _ = Uc(B), O = $c(_);
              } catch {
                E.noop();
              }
              y = E.getValue(X, "duplex"), y = y.startsWith("cat") ? "" : y, g = parseInt(E.getValue(X, "mtu"), 10);
              let fe = parseInt(E.getValue(X, "speed"), 10);
              x = isNaN(fe) ? null : fe;
              let z = E.getValue(X, "wirelessspeed").split("tx bitrate: ");
              x === null && z.length === 2 && (fe = parseFloat(z[1]), x = isNaN(fe) ? null : fe), w = parseInt(E.getValue(X, "carrier_changes"), 10);
              const Z = E.getValue(X, "operstate");
              U = Z === "up" ? E.getValue(X, "wireless").trim() ? "wireless" : "wired" : "unknown", (V === "lo" || V.startsWith("bond")) && (U = "virtual");
              let H = s[u] && s[u][0] ? s[u][0].internal : !1;
              (u.toLowerCase().indexOf("loopback") > -1 || I.toLowerCase().indexOf("loopback") > -1) && (H = !0);
              const $ = H ? !1 : _n(u, I, h);
              r.push({
                iface: V,
                ifaceName: I,
                default: W === c,
                ip4: f,
                ip4subnet: p,
                ip6: d,
                ip6subnet: m,
                mac: h,
                internal: H,
                virtual: $,
                operstate: Z,
                type: U,
                duplex: y,
                mtu: g,
                speed: x,
                dhcp: S,
                dnsSuffix: C,
                ieee8021xAuth: _,
                ieee8021xState: O,
                carrierChanges: w
              });
            }
          }
          $t = r, e.toLowerCase().indexOf("default") >= 0 && (r = r.filter((u) => u.default), r.length > 0 ? r = r[0] : r = []), t && t(r), n(r);
        }
      if (Ai)
        if (JSON.stringify(s) === JSON.stringify(Ut) && !i)
          r = $t, t && t(r), n(r);
        else {
          Ut = JSON.parse(JSON.stringify(s));
          const c = Tt();
          Pc().then(function(u) {
            u.forEach((f) => {
              let p = !1;
              Object.keys(s).forEach((d) => {
                p || s[d].forEach((m) => {
                  Object.keys(m).indexOf("mac") >= 0 && (p = m.mac === f.mac);
                });
              }), p || (s[f.name] = [{ mac: f.mac }]);
            }), l = Mc(), a = Ac();
            for (let f in s) {
              let p = "";
              const d = E.isPrototypePolluted() ? "---" : E.sanitizeShellString(f), m = E.mathMin(d.length, 2e3);
              for (let X = 0; X <= m; X++)
                d[X] !== void 0 && (p = p + d[X]);
              let h = f, y = "", g = "", x = "", w = "", S = "", C = "", _ = "", O = null, U = 0, I = "down", W = !1, V = "", ie = "", oe = "", le = "";
              if ({}.hasOwnProperty.call(s, f)) {
                let X = f;
                s[f].forEach(function($) {
                  ($.family === "IPv4" || $.family === 4) && (y = $.address, g = $.netmask), ($.family === "IPv6" || $.family === 6) && (!x || x.match(/^fe80::/i)) && (x = $.address, w = $.netmask), S = $.mac;
                  const B = parseInt(process.versions.node.split("."), 10);
                  S.indexOf("00:00:0") > -1 && (ze || He) && !$.internal && B >= 8 && B <= 11 && (Object.keys(zt).length === 0 && (zt = Rr()), S = zt[f] || "");
                }), V = Ec(a.ifaces, p);
                let fe = !1;
                u.forEach(($) => {
                  $.mac === S && !fe && (h = $.iface || h, X = $.name, W = $.dhcp, I = $.operstate, O = I === "up" ? $.speed : 0, le = $.type, fe = !0);
                }), (f.toLowerCase().indexOf("wlan") >= 0 || X.toLowerCase().indexOf("wlan") >= 0 || X.toLowerCase().indexOf("802.11n") >= 0 || X.toLowerCase().indexOf("wireless") >= 0 || X.toLowerCase().indexOf("wi-fi") >= 0 || X.toLowerCase().indexOf("wifi") >= 0) && (le = "wireless");
                const z = Dc(le, p, l);
                ie = z.protocol, oe = z.state;
                let Z = s[f] && s[f][0] ? s[f][0].internal : !1;
                (f.toLowerCase().indexOf("loopback") > -1 || X.toLowerCase().indexOf("loopback") > -1) && (Z = !0);
                const H = Z ? !1 : _n(f, X, S);
                r.push({
                  iface: h,
                  ifaceName: X,
                  default: h === c,
                  ip4: y,
                  ip4subnet: g,
                  ip6: x,
                  ip6subnet: w,
                  mac: S,
                  internal: Z,
                  virtual: H,
                  operstate: I,
                  type: le,
                  duplex: C,
                  mtu: _,
                  speed: O,
                  dhcp: W,
                  dnsSuffix: V,
                  ieee8021xAuth: ie,
                  ieee8021xState: oe,
                  carrierChanges: U
                });
              }
            }
            $t = r, e.toLowerCase().indexOf("default") >= 0 && (r = r.filter((f) => f.default), r.length > 0 ? r = r[0] : r = []), t && t(r), n(r);
          });
        }
    });
  });
}
kt.networkInterfaces = sr;
function Ni(t, i, e, n, s, r, o, a) {
  let l = {
    iface: t,
    operstate: n,
    rx_bytes: i,
    rx_dropped: s,
    rx_errors: r,
    tx_bytes: e,
    tx_dropped: o,
    tx_errors: a,
    rx_sec: null,
    tx_sec: null,
    ms: 0
  };
  return Q[t] && Q[t].ms ? (l.ms = Date.now() - Q[t].ms, l.rx_sec = i - Q[t].rx_bytes >= 0 ? (i - Q[t].rx_bytes) / (l.ms / 1e3) : 0, l.tx_sec = e - Q[t].tx_bytes >= 0 ? (e - Q[t].tx_bytes) / (l.ms / 1e3) : 0, Q[t].rx_bytes = i, Q[t].tx_bytes = e, Q[t].rx_sec = l.rx_sec, Q[t].tx_sec = l.tx_sec, Q[t].ms = Date.now(), Q[t].last_ms = l.ms, Q[t].operstate = n) : (Q[t] || (Q[t] = {}), Q[t].rx_bytes = i, Q[t].tx_bytes = e, Q[t].rx_sec = null, Q[t].tx_sec = null, Q[t].ms = Date.now(), Q[t].last_ms = 0, Q[t].operstate = n), l;
}
function Hs(t, i) {
  let e = [];
  return new Promise((n) => {
    process.nextTick(() => {
      if (E.isFunction(t) && !i)
        i = t, e = [Tt()];
      else {
        if (typeof t != "string" && t !== void 0)
          return i && i([]), n([]);
        t = t || Tt();
        try {
          t.__proto__.toLowerCase = E.stringToLower, t.__proto__.replace = E.stringReplace, t.__proto__.toString = E.stringToString, t.__proto__.substr = E.stringSubstr, t.__proto__.substring = E.stringSubstring, t.__proto__.trim = E.stringTrim, t.__proto__.startsWith = E.stringStartWith;
        } catch {
          Object.setPrototypeOf(t, E.stringObj);
        }
        t = t.trim().toLowerCase().replace(/,+/g, "|"), e = t.split("|");
      }
      const s = [], r = [];
      if (e.length && e[0].trim() === "*")
        e = [], sr(!1).then((o) => {
          for (let a of o)
            e.push(a.iface);
          Hs(e.join(",")).then((a) => {
            i && i(a), n(a);
          });
        });
      else {
        for (let o of e)
          r.push(zc(o.trim()));
        r.length ? Promise.all(
          r
        ).then((o) => {
          i && i(o), n(o);
        }) : (i && i(s), n(s));
      }
    });
  });
}
function zc(t) {
  function i(e) {
    let n = [];
    for (let s in e)
      if ({}.hasOwnProperty.call(e, s) && e[s].trim() !== "") {
        let r = e[s].trim().split(`\r
`);
        n.push({
          name: E.getValue(r, "Name", ":").replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase(),
          rx_bytes: parseInt(E.getValue(r, "BytesReceivedPersec", ":"), 10),
          rx_errors: parseInt(E.getValue(r, "PacketsReceivedErrors", ":"), 10),
          rx_dropped: parseInt(E.getValue(r, "PacketsReceivedDiscarded", ":"), 10),
          tx_bytes: parseInt(E.getValue(r, "BytesSentPersec", ":"), 10),
          tx_errors: parseInt(E.getValue(r, "PacketsOutboundErrors", ":"), 10),
          tx_dropped: parseInt(E.getValue(r, "PacketsOutboundDiscarded", ":"), 10)
        });
      }
    return n;
  }
  return new Promise((e) => {
    process.nextTick(() => {
      let n = "";
      const s = E.isPrototypePolluted() ? "---" : E.sanitizeShellString(t), r = E.mathMin(s.length, 2e3);
      for (let g = 0; g <= r; g++)
        s[g] !== void 0 && (n = n + s[g]);
      let o = {
        iface: n,
        operstate: "unknown",
        rx_bytes: 0,
        rx_dropped: 0,
        rx_errors: 0,
        tx_bytes: 0,
        tx_dropped: 0,
        tx_errors: 0,
        rx_sec: null,
        tx_sec: null,
        ms: 0
      }, a = "unknown", l = 0, c = 0, u = 0, f = 0, p = 0, d = 0, m, h, y;
      if (!Q[n] || Q[n] && !Q[n].ms || Q[n] && Q[n].ms && Date.now() - Q[n].ms >= 500) {
        if (ze && (Ic.existsSync("/sys/class/net/" + n) ? (m = "cat /sys/class/net/" + n + "/operstate; cat /sys/class/net/" + n + "/statistics/rx_bytes; cat /sys/class/net/" + n + "/statistics/tx_bytes; cat /sys/class/net/" + n + "/statistics/rx_dropped; cat /sys/class/net/" + n + "/statistics/rx_errors; cat /sys/class/net/" + n + "/statistics/tx_dropped; cat /sys/class/net/" + n + "/statistics/tx_errors; ", we(m, function(g, x) {
          g || (h = x.toString().split(`
`), a = h[0].trim(), l = parseInt(h[1], 10), c = parseInt(h[2], 10), u = parseInt(h[3], 10), f = parseInt(h[4], 10), p = parseInt(h[5], 10), d = parseInt(h[6], 10), o = Ni(n, l, c, a, u, f, p, d)), e(o);
        })) : e(o)), (lt || ut || pt) && (m = "netstat -ibndI " + n, we(m, function(g, x) {
          if (!g) {
            h = x.toString().split(`
`);
            for (let w = 1; w < h.length; w++) {
              const S = h[w].replace(/ +/g, " ").split(" ");
              S && S[0] && S[7] && S[10] && (l = l + parseInt(S[7]), S[6].trim() !== "-" && (u = u + parseInt(S[6])), S[5].trim() !== "-" && (f = f + parseInt(S[5])), c = c + parseInt(S[10]), S[12].trim() !== "-" && (p = p + parseInt(S[12])), S[9].trim() !== "-" && (d = d + parseInt(S[9])), a = "up");
            }
            o = Ni(n, l, c, a, u, f, p, d);
          }
          e(o);
        })), He && (m = "ifconfig " + n + ' | grep "status"', we(m, function(g, x) {
          o.operstate = (x.toString().split(":")[1] || "").trim(), o.operstate = (o.operstate || "").toLowerCase(), o.operstate = o.operstate === "active" ? "up" : o.operstate === "inactive" ? "down" : "unknown", m = "netstat -bdI " + n, we(m, function(w, S) {
            if (!w && (h = S.toString().split(`
`), h.length > 1 && h[1].trim() !== "")) {
              y = h[1].replace(/ +/g, " ").split(" ");
              const C = y.length > 11 ? 1 : 0;
              l = parseInt(y[C + 5]), u = parseInt(y[C + 10]), f = parseInt(y[C + 4]), c = parseInt(y[C + 8]), p = parseInt(y[C + 10]), d = parseInt(y[C + 7]), o = Ni(n, l, c, o.operstate, u, f, p, d);
            }
            e(o);
          });
        })), Ai) {
          let g = [], x = n;
          E.powerShell("Get-CimInstance Win32_PerfRawData_Tcpip_NetworkInterface | select Name,BytesReceivedPersec,PacketsReceivedErrors,PacketsReceivedDiscarded,BytesSentPersec,PacketsOutboundErrors,PacketsOutboundDiscarded | fl").then((w, S) => {
            if (!S) {
              const C = w.toString().split(/\n\s*\n/);
              g = i(C);
            }
            sr(!1).then((C) => {
              l = 0, c = 0, g.forEach((_) => {
                C.forEach((O) => {
                  (O.iface.toLowerCase() === n.toLowerCase() || O.mac.toLowerCase() === n.toLowerCase() || O.ip4.toLowerCase() === n.toLowerCase() || O.ip6.toLowerCase() === n.toLowerCase() || O.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === n.replace(/[()[\] ]+/g, "").replace("#", "_").toLowerCase()) && O.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === _.name && (x = O.iface, l = _.rx_bytes, u = _.rx_dropped, f = _.rx_errors, c = _.tx_bytes, p = _.tx_dropped, d = _.tx_errors, a = O.operstate);
                });
              }), l && c && (o = Ni(x, parseInt(l), parseInt(c), a, u, f, p, d)), e(o);
            });
          });
        }
      } else
        o.rx_bytes = Q[n].rx_bytes, o.tx_bytes = Q[n].tx_bytes, o.rx_sec = Q[n].rx_sec, o.tx_sec = Q[n].tx_sec, o.ms = Q[n].last_ms, o.operstate = Q[n].operstate, e(o);
    });
  });
}
kt.networkStats = Hs;
function Hc(t, i) {
  let e = "";
  return t.forEach((n) => {
    const s = n.split(" ");
    (parseInt(s[0], 10) || -1) === i && (s.shift(), e = s.join(" ").split(":")[0]);
  }), e = e.split(" -")[0], e = e.split(" /")[0], e;
}
function qc(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      if (ze || lt || ut || pt) {
        let n = 'export LC_ALL=C; netstat -tunap | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
        (lt || ut || pt) && (n = 'export LC_ALL=C; netstat -na | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL'), we(n, { maxBuffer: 1024 * 2e4 }, function(s, r) {
          let o = r.toString().split(`
`);
          !s && (o.length > 1 || o[0] != "") ? (o.forEach(function(a) {
            if (a = a.replace(/ +/g, " ").split(" "), a.length >= 7) {
              let l = a[3], c = "", u = a[3].split(":");
              u.length > 1 && (c = u[u.length - 1], u.pop(), l = u.join(":"));
              let f = a[4], p = "", d = a[4].split(":");
              d.length > 1 && (p = d[d.length - 1], d.pop(), f = d.join(":"));
              let m = a[5], h = a[6].split("/");
              m && e.push({
                protocol: a[0],
                localAddress: l,
                localPort: c,
                peerAddress: f,
                peerPort: p,
                state: m,
                pid: h[0] && h[0] !== "-" ? parseInt(h[0], 10) : null,
                process: h[1] ? h[1].split(" ")[0].split(":")[0] : ""
              });
            }
          }), t && t(e), i(e)) : (n = 'ss -tunap | grep "ESTAB\\|SYN-SENT\\|SYN-RECV\\|FIN-WAIT1\\|FIN-WAIT2\\|TIME-WAIT\\|CLOSE\\|CLOSE-WAIT\\|LAST-ACK\\|LISTEN\\|CLOSING"', we(n, { maxBuffer: 1024 * 2e4 }, function(a, l) {
            a || l.toString().split(`
`).forEach(function(u) {
              if (u = u.replace(/ +/g, " ").split(" "), u.length >= 6) {
                let f = u[4], p = "", d = u[4].split(":");
                d.length > 1 && (p = d[d.length - 1], d.pop(), f = d.join(":"));
                let m = u[5], h = "", y = u[5].split(":");
                y.length > 1 && (h = y[y.length - 1], y.pop(), m = y.join(":"));
                let g = u[1];
                g === "ESTAB" && (g = "ESTABLISHED"), g === "TIME-WAIT" && (g = "TIME_WAIT");
                let x = null, w = "";
                if (u.length >= 7 && u[6].indexOf("users:") > -1) {
                  let S = u[6].replace('users:(("', "").replace(/"/g, "").split(",");
                  S.length > 2 && (w = S[0].split(" ")[0].split(":")[0], x = parseInt(S[1], 10));
                }
                g && e.push({
                  protocol: u[0],
                  localAddress: f,
                  localPort: p,
                  peerAddress: m,
                  peerPort: h,
                  state: g,
                  pid: x,
                  process: w
                });
              }
            }), t && t(e), i(e);
          }));
        });
      }
      if (He) {
        let n = 'netstat -natvln | head -n2; netstat -natvln | grep "tcp4\\|tcp6\\|udp4\\|udp6"';
        const s = "ESTABLISHED|SYN_SENT|SYN_RECV|FIN_WAIT1|FIN_WAIT_1|FIN_WAIT2|FIN_WAIT_2|TIME_WAIT|CLOSE|CLOSE_WAIT|LAST_ACK|LISTEN|CLOSING|UNKNOWN".split("|");
        we(n, { maxBuffer: 1024 * 2e4 }, function(r, o) {
          r || we("ps -axo pid,command", { maxBuffer: 1024 * 2e4 }, function(a, l) {
            let c = l.toString().split(`
`);
            c = c.map((p) => p.trim().replace(/ +/g, " "));
            let u = o.toString().split(`
`);
            u.shift();
            let f = 8;
            u.length > 1 && u[0].indexOf("pid") > 0 && (f = (u.shift() || "").replace(/ Address/g, "_Address").replace(/ +/g, " ").split(" ").indexOf("pid")), u.forEach(function(p) {
              if (p = p.replace(/ +/g, " ").split(" "), p.length >= 8) {
                let d = p[3], m = "", h = p[3].split(".");
                h.length > 1 && (m = h[h.length - 1], h.pop(), d = h.join("."));
                let y = p[4], g = "", x = p[4].split(".");
                x.length > 1 && (g = x[x.length - 1], x.pop(), y = x.join("."));
                const w = s.indexOf(p[5]) >= 0;
                let S = w ? p[5] : "UNKNOWN", C = parseInt(p[f + (w ? 0 : -1)], 10);
                S && e.push({
                  protocol: p[0],
                  localAddress: d,
                  localPort: m,
                  peerAddress: y,
                  peerPort: g,
                  state: S,
                  pid: C,
                  process: Hc(c, C)
                });
              }
            }), t && t(e), i(e);
          });
        });
      }
      if (Ai) {
        let n = "netstat -nao";
        try {
          we(n, E.execOptsWin, function(s, r) {
            s || (r.toString().split(`\r
`).forEach(function(a) {
              if (a = a.trim().replace(/ +/g, " ").split(" "), a.length >= 4) {
                let l = a[1], c = "", u = a[1].split(":");
                u.length > 1 && (c = u[u.length - 1], u.pop(), l = u.join(":")), l = l.replace(/\[/g, "").replace(/\]/g, "");
                let f = a[2], p = "", d = a[2].split(":");
                d.length > 1 && (p = d[d.length - 1], d.pop(), f = d.join(":")), f = f.replace(/\[/g, "").replace(/\]/g, "");
                let m = E.toInt(a[4]), h = a[3];
                h === "HERGESTELLT" && (h = "ESTABLISHED"), h.startsWith("ABH") && (h = "LISTEN"), h === "SCHLIESSEN_WARTEN" && (h = "CLOSE_WAIT"), h === "WARTEND" && (h = "TIME_WAIT"), h === "SYN_GESENDET" && (h = "SYN_SENT"), h === "LISTENING" && (h = "LISTEN"), h === "SYN_RECEIVED" && (h = "SYN_RECV"), h === "FIN_WAIT_1" && (h = "FIN_WAIT1"), h === "FIN_WAIT_2" && (h = "FIN_WAIT2"), a[0].toLowerCase() !== "udp" && h ? e.push({
                  protocol: a[0].toLowerCase(),
                  localAddress: l,
                  localPort: c,
                  peerAddress: f,
                  peerPort: p,
                  state: h,
                  pid: m,
                  process: ""
                }) : a[0].toLowerCase() === "udp" && e.push({
                  protocol: a[0].toLowerCase(),
                  localAddress: l,
                  localPort: c,
                  peerAddress: f,
                  peerPort: p,
                  state: "",
                  pid: parseInt(a[3], 10),
                  process: ""
                });
              }
            }), t && t(e), i(e));
          });
        } catch {
          t && t(e), i(e);
        }
      }
    });
  });
}
kt.networkConnections = qc;
function jc(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = "";
      if (ze || lt || ut || pt) {
        let n = "ip route get 1";
        try {
          we(n, { maxBuffer: 1024 * 2e4 }, function(s, r) {
            if (s)
              t && t(e), i(e);
            else {
              let o = r.toString().split(`
`), l = (o && o[0] ? o[0] : "").split(" via ");
              l && l[1] && (l = l[1].split(" "), e = l[0]), t && t(e), i(e);
            }
          });
        } catch {
          t && t(e), i(e);
        }
      }
      if (He) {
        let n = "route -n get default";
        try {
          we(n, { maxBuffer: 1024 * 2e4 }, function(s, r) {
            if (!s) {
              const o = r.toString().split(`
`).map((a) => a.trim());
              e = E.getValue(o, "gateway");
            }
            e ? (t && t(e), i(e)) : (n = "netstat -rn | awk '/default/ {print $2}'", we(n, { maxBuffer: 1024 * 2e4 }, function(o, a) {
              e = a.toString().split(`
`).map((c) => c.trim()).find((c) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(c)), t && t(e), i(e);
            }));
          });
        } catch {
          t && t(e), i(e);
        }
      }
      if (Ai)
        try {
          we("netstat -r", E.execOptsWin, function(n, s) {
            s.toString().split(Xi.EOL).forEach((o) => {
              if (o = o.replace(/\s+/g, " ").trim(), o.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(o)) {
                const a = o.split(" ");
                a.length >= 5 && a[a.length - 3].indexOf(".") > -1 && (e = a[a.length - 3]);
              }
            }), e ? (t && t(e), i(e)) : E.powerShell("Get-CimInstance -ClassName Win32_IP4RouteTable | Where-Object { $_.Destination -eq '0.0.0.0' -and $_.Mask -eq '0.0.0.0' }").then((o) => {
              let a = o.toString().split(`\r
`);
              a.length > 1 && !e && (e = E.getValue(a, "NextHop"), t && t(e), i(e));
            });
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}
kt.networkGatewayDefault = jc;
var fn = {};
const mi = se, or = te.exec, ft = te.execSync, A = T;
let Ki = process.platform;
const ar = Ki === "linux" || Ki === "android", cr = Ki === "darwin", lr = Ki === "win32";
function ur(t) {
  const i = parseFloat(t);
  return i < 0 ? 0 : i >= 100 ? -50 : i / 2 - 100;
}
function Yi(t) {
  const i = 2 * (parseFloat(t) + 100);
  return i <= 100 ? i : 100;
}
const yi = {
  1: 2412,
  2: 2417,
  3: 2422,
  4: 2427,
  5: 2432,
  6: 2437,
  7: 2442,
  8: 2447,
  9: 2452,
  10: 2457,
  11: 2462,
  12: 2467,
  13: 2472,
  14: 2484,
  32: 5160,
  34: 5170,
  36: 5180,
  38: 5190,
  40: 5200,
  42: 5210,
  44: 5220,
  46: 5230,
  48: 5240,
  50: 5250,
  52: 5260,
  54: 5270,
  56: 5280,
  58: 5290,
  60: 5300,
  62: 5310,
  64: 5320,
  68: 5340,
  96: 5480,
  100: 5500,
  102: 5510,
  104: 5520,
  106: 5530,
  108: 5540,
  110: 5550,
  112: 5560,
  114: 5570,
  116: 5580,
  118: 5590,
  120: 5600,
  122: 5610,
  124: 5620,
  126: 5630,
  128: 5640,
  132: 5660,
  134: 5670,
  136: 5680,
  138: 5690,
  140: 5700,
  142: 5710,
  144: 5720,
  149: 5745,
  151: 5755,
  153: 5765,
  155: 5775,
  157: 5785,
  159: 5795,
  161: 5805,
  165: 5825,
  169: 5845,
  173: 5865,
  183: 4915,
  184: 4920,
  185: 4925,
  187: 4935,
  188: 4940,
  189: 4945,
  192: 4960,
  196: 4980
};
function xi(t) {
  return {}.hasOwnProperty.call(yi, t) ? yi[t] : null;
}
function Xc(t) {
  let i = 0;
  for (let e in yi)
    ({}).hasOwnProperty.call(yi, e) && yi[e] === t && (i = A.toInt(e));
  return i;
}
function qs() {
  const t = [], i = "iw dev 2>/dev/null";
  try {
    const n = ft(i, A.execOptsLinux).toString().split(`
`).map((s) => s.trim()).join(`
`).split(`
Interface `);
    return n.shift(), n.forEach((s) => {
      const r = s.split(`
`), o = r[0], a = A.toInt(A.getValue(r, "ifindex", " ")), l = A.getValue(r, "addr", " "), c = A.toInt(A.getValue(r, "channel", " "));
      t.push({
        id: a,
        iface: o,
        mac: l,
        channel: c
      });
    }), t;
  } catch {
    try {
      const s = ft("nmcli -t -f general,wifi-properties,wired-properties,interface-flags,capabilities,nsp device show 2>/dev/null", A.execOptsLinux).toString().split(`

`);
      let r = 1;
      return s.forEach((o) => {
        const a = o.split(`
`), l = A.getValue(a, "GENERAL.DEVICE"), c = A.getValue(a, "GENERAL.TYPE"), u = r++, f = A.getValue(a, "GENERAL.HWADDR");
        c.toLowerCase() === "wifi" && t.push({
          id: u,
          iface: l,
          mac: f,
          channel: ""
        });
      }), t;
    } catch {
      return [];
    }
  }
}
function js(t) {
  const i = `nmcli -t -f general,wifi-properties,capabilities,ip4,ip6 device show ${t} 2> /dev/null`;
  try {
    const e = ft(i, A.execOptsLinux).toString().split(`
`), n = A.getValue(e, "GENERAL.CONNECTION");
    return {
      iface: t,
      type: A.getValue(e, "GENERAL.TYPE"),
      vendor: A.getValue(e, "GENERAL.VENDOR"),
      product: A.getValue(e, "GENERAL.PRODUCT"),
      mac: A.getValue(e, "GENERAL.HWADDR").toLowerCase(),
      ssid: n !== "--" ? n : null
    };
  } catch {
    return {};
  }
}
function Kc(t) {
  const i = `nmcli -t --show-secrets connection show ${t} 2>/dev/null`;
  try {
    const e = ft(i, A.execOptsLinux).toString().split(`
`), n = A.getValue(e, "802-11-wireless.seen-bssids").toLowerCase();
    return {
      ssid: t !== "--" ? t : null,
      uuid: A.getValue(e, "connection.uuid"),
      type: A.getValue(e, "connection.type"),
      autoconnect: A.getValue(e, "connection.autoconnect") === "yes",
      security: A.getValue(e, "802-11-wireless-security.key-mgmt"),
      bssid: n !== "--" ? n : null
    };
  } catch {
    return {};
  }
}
function Yc(t) {
  if (!t)
    return {};
  const i = `wpa_cli -i ${t} status 2>&1`;
  try {
    const e = ft(i, A.execOptsLinux).toString().split(`
`), n = A.toInt(A.getValue(e, "freq", "="));
    return {
      ssid: A.getValue(e, "ssid", "="),
      uuid: A.getValue(e, "uuid", "="),
      security: A.getValue(e, "key_mgmt", "="),
      freq: n,
      channel: Xc(n),
      bssid: A.getValue(e, "bssid", "=").toLowerCase()
    };
  } catch {
    return {};
  }
}
function Xs() {
  const t = [], i = "nmcli -t -m multiline --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list 2>/dev/null";
  try {
    const n = ft(i, A.execOptsLinux).toString().split("ACTIVE:");
    return n.shift(), n.forEach((s) => {
      s = "ACTIVE:" + s;
      const r = s.split(mi.EOL), o = A.getValue(r, "CHAN"), a = A.getValue(r, "FREQ").toLowerCase().replace("mhz", "").trim(), l = A.getValue(r, "SECURITY").replace("(", "").replace(")", ""), c = A.getValue(r, "WPA-FLAGS").replace("(", "").replace(")", ""), u = A.getValue(r, "RSN-FLAGS").replace("(", "").replace(")", ""), f = A.getValue(r, "SIGNAL");
      t.push({
        ssid: A.getValue(r, "SSID"),
        bssid: A.getValue(r, "BSSID").toLowerCase(),
        mode: A.getValue(r, "MODE"),
        channel: o ? parseInt(o, 10) : null,
        frequency: a ? parseInt(a, 10) : null,
        signalLevel: ur(f),
        quality: f ? parseInt(f, 10) : null,
        security: l && l !== "none" ? l.split(" ") : [],
        wpaFlags: c && c !== "none" ? c.split(" ") : [],
        rsnFlags: u && u !== "none" ? u.split(" ") : []
      });
    }), t;
  } catch {
    return [];
  }
}
function Gr(t) {
  const i = [];
  try {
    let e = ft(`export LC_ALL=C; iwlist ${t} scan 2>&1; unset LC_ALL`, A.execOptsLinux).toString().split("        Cell ");
    return e[0].indexOf("resource busy") >= 0 ? -1 : (e.length > 1 && (e.shift(), e.forEach((n) => {
      const s = n.split(`
`), r = A.getValue(s, "channel", ":", !0), o = s && s.length && s[0].indexOf("Address:") >= 0 ? s[0].split("Address:")[1].trim().toLowerCase() : "", a = A.getValue(s, "mode", ":", !0), l = A.getValue(s, "frequency", ":", !0), u = A.getValue(s, "Quality", "=", !0).toLowerCase().split("signal level="), f = u.length > 1 ? A.toInt(u[1]) : 0, p = f ? Yi(f) : 0, d = A.getValue(s, "essid", ":", !0), m = n.indexOf(" WPA ") >= 0, h = n.indexOf("WPA2 ") >= 0, y = [];
      m && y.push("WPA"), h && y.push("WPA2");
      const g = [];
      let x = "";
      s.forEach(function(w) {
        const S = w.trim().toLowerCase();
        if (S.indexOf("group cipher") >= 0) {
          x && g.push(x);
          const C = S.split(":");
          C.length > 1 && (x = C[1].trim().toUpperCase());
        }
        if (S.indexOf("pairwise cipher") >= 0) {
          const C = S.split(":");
          C.length > 1 && (C[1].indexOf("tkip") ? x = x ? "TKIP/" + x : "TKIP" : C[1].indexOf("ccmp") ? x = x ? "CCMP/" + x : "CCMP" : C[1].indexOf("proprietary") && (x = x ? "PROP/" + x : "PROP"));
        }
        if (S.indexOf("authentication suites") >= 0) {
          const C = S.split(":");
          C.length > 1 && (C[1].indexOf("802.1x") ? x = x ? "802.1x/" + x : "802.1x" : C[1].indexOf("psk") && (x = x ? "PSK/" + x : "PSK"));
        }
      }), x && g.push(x), i.push({
        ssid: d,
        bssid: o,
        mode: a,
        channel: r ? A.toInt(r) : null,
        frequency: l ? A.toInt(l.replace(".", "")) : null,
        signalLevel: f,
        quality: p,
        security: y,
        wpaFlags: g,
        rsnFlags: []
      });
    })), i);
  } catch {
    return -1;
  }
}
function Jc(t) {
  const i = [];
  try {
    let e = JSON.parse(t);
    return e = e.SPAirPortDataType[0].spairport_airport_interfaces[0].spairport_airport_other_local_wireless_networks, e.forEach(function(n) {
      let s = [];
      const r = n.spairport_security_mode;
      r === "spairport_security_mode_wep" ? s.push("WEP") : r === "spairport_security_mode_wpa2_personal" ? s.push("WPA2") : r.startsWith("spairport_security_mode_wpa2_enterprise") ? s.push("WPA2 EAP") : r.startsWith("pairport_security_mode_wpa3_transition") ? s.push("WPA2/WPA3") : r.startsWith("pairport_security_mode_wpa3") && s.push("WPA3");
      const o = parseInt(("" + n.spairport_network_channel).split(" ")[0]) || 0, a = n.spairport_signal_noise || null;
      i.push({
        ssid: n._name || "",
        bssid: n.spairport_network_bssid || null,
        mode: n.spairport_network_phymode,
        channel: o,
        frequency: xi(o),
        signalLevel: a ? parseInt(a, 10) : null,
        quality: Yi(a),
        security: s,
        wpaFlags: [],
        rsnFlags: []
      });
    }), i;
  } catch {
    return i;
  }
}
function Qc(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      if (ar)
        if (e = Xs(), e.length === 0)
          try {
            const n = ft("export LC_ALL=C; iwconfig 2>/dev/null; unset LC_ALL", A.execOptsLinux).toString().split(`

`);
            let s = "";
            if (n.forEach((r) => {
              r.indexOf("no wireless") === -1 && r.trim() !== "" && (s = r.split(" ")[0]);
            }), s) {
              let r = "";
              const o = A.isPrototypePolluted() ? "---" : A.sanitizeShellString(s, !0), a = A.mathMin(o.length, 2e3);
              for (let c = 0; c <= a; c++)
                o[c] !== void 0 && (r = r + o[c]);
              const l = Gr(r);
              l === -1 ? setTimeout(function(c) {
                const u = Gr(c);
                u != -1 && (e = u), t && t(e), i(e);
              }, 4e3) : (e = l, t && t(e), i(e));
            } else
              t && t(e), i(e);
          } catch {
            t && t(e), i(e);
          }
        else
          t && t(e), i(e);
      else cr ? or("system_profiler SPAirPortDataType -json 2>/dev/null", { maxBuffer: 1024 * 4e4 }, function(s, r) {
        e = Jc(r.toString()), t && t(e), i(e);
      }) : lr ? A.powerShell("netsh wlan show networks mode=Bssid").then((s) => {
        const r = s.toString("utf8").split(mi.EOL + mi.EOL + "SSID ");
        r.shift(), r.forEach((o) => {
          const a = o.split(mi.EOL);
          if (a && a.length >= 8 && a[0].indexOf(":") >= 0) {
            const l = o.split(" BSSID");
            l.shift(), l.forEach((c) => {
              const u = c.split(mi.EOL), f = u[0].split(":");
              f.shift();
              const p = f.join(":").trim().toLowerCase(), d = u[3].split(":").pop().trim(), m = u[1].split(":").pop().trim();
              e.push({
                ssid: a[0].split(":").pop().trim(),
                bssid: p,
                mode: "",
                channel: d ? parseInt(d, 10) : null,
                frequency: xi(d),
                signalLevel: ur(m),
                quality: m ? parseInt(m, 10) : null,
                security: [a[2].split(":").pop().trim()],
                wpaFlags: [a[3].split(":").pop().trim()],
                rsnFlags: []
              });
            });
          }
        }), t && t(e), i(e);
      }) : (t && t(e), i(e));
    });
  });
}
fn.wifiNetworks = Qc;
function Zc(t) {
  t = t.toLowerCase();
  let i = "";
  return t.indexOf("intel") >= 0 ? i = "Intel" : t.indexOf("realtek") >= 0 ? i = "Realtek" : t.indexOf("qualcom") >= 0 ? i = "Qualcom" : t.indexOf("broadcom") >= 0 ? i = "Broadcom" : t.indexOf("cavium") >= 0 ? i = "Cavium" : t.indexOf("cisco") >= 0 ? i = "Cisco" : t.indexOf("marvel") >= 0 ? i = "Marvel" : t.indexOf("zyxel") >= 0 ? i = "Zyxel" : t.indexOf("melanox") >= 0 ? i = "Melanox" : t.indexOf("d-link") >= 0 ? i = "D-Link" : t.indexOf("tp-link") >= 0 ? i = "TP-Link" : t.indexOf("asus") >= 0 ? i = "Asus" : t.indexOf("linksys") >= 0 && (i = "Linksys"), i;
}
function el(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      const e = [];
      if (ar) {
        const n = qs(), s = Xs();
        n.forEach((r) => {
          let o = "";
          const a = A.isPrototypePolluted() ? "---" : A.sanitizeShellString(r.iface, !0), l = A.mathMin(a.length, 2e3);
          for (let S = 0; S <= l; S++)
            a[S] !== void 0 && (o = o + a[S]);
          const c = js(o), u = Yc(o), f = c.ssid || u.ssid, p = s.filter((S) => S.ssid === f);
          let d = "";
          const m = A.isPrototypePolluted() ? "---" : A.sanitizeShellString(f, !0), h = A.mathMin(m.length, 32);
          for (let S = 0; S <= h; S++)
            m[S] !== void 0 && (d = d + m[S]);
          const y = Kc(d), g = p && p.length && p[0].channel ? p[0].channel : u.channel ? u.channel : null, x = p && p.length && p[0].bssid ? p[0].bssid : u.bssid ? u.bssid : null, w = p && p.length && p[0].signalLevel ? p[0].signalLevel : null;
          f && x && e.push({
            id: r.id,
            iface: r.iface,
            model: c.product,
            ssid: f,
            bssid: p && p.length && p[0].bssid ? p[0].bssid : u.bssid ? u.bssid : null,
            channel: g,
            frequency: g ? xi(g) : null,
            type: y.type ? y.type : "802.11",
            security: y.security ? y.security : u.security ? u.security : null,
            signalLevel: w,
            quality: Yi(w),
            txRate: null
          });
        }), t && t(e), i(e);
      } else cr ? or('system_profiler SPNetworkDataType SPAirPortDataType -xml 2>/dev/null; echo "######" ; ioreg -n AppleBCMWLANSkywalkInterface -r 2>/dev/null', function(s, r) {
        try {
          const o = r.toString().split("######"), a = A.plistParser(o[0]), l = a[0]._SPCommandLineArguments.indexOf("SPNetworkDataType") >= 0 ? a[0]._items : a[1]._items, c = a[0]._SPCommandLineArguments.indexOf("SPAirPortDataType") >= 0 ? a[0]._items[0].spairport_airport_interfaces : a[1]._items[0].spairport_airport_interfaces;
          let u = [];
          o[1].indexOf("  | {") > 0 && o[1].indexOf("  | }") > o[1].indexOf("  | {") && (u = o[1].split("  | {")[1].split("  | }")[0].replace(/ \| /g, "").replace(/"/g, "").split(`
`));
          const f = l.find((g) => g._name === "Wi-Fi"), p = c[0].spairport_current_network_information, d = parseInt(("" + p.spairport_network_channel).split(" ")[0]) || 0, m = p.spairport_signal_noise || null;
          let h = [];
          const y = p.spairport_security_mode;
          y === "spairport_security_mode_wep" ? h.push("WEP") : y === "spairport_security_mode_wpa2_personal" ? h.push("WPA2") : y.startsWith("spairport_security_mode_wpa2_enterprise") ? h.push("WPA2 EAP") : y.startsWith("pairport_security_mode_wpa3_transition") ? h.push("WPA2/WPA3") : y.startsWith("pairport_security_mode_wpa3") && h.push("WPA3"), e.push({
            id: f._name || "Wi-Fi",
            iface: f.interface || "",
            model: f.hardware || "",
            ssid: p._name || "",
            bssid: p.spairport_network_bssid || "",
            channel: d,
            frequency: d ? xi(d) : null,
            type: p.spairport_network_phymode || "802.11",
            security: h,
            signalLevel: m ? parseInt(m, 10) : null,
            quality: Yi(m),
            txRate: p.spairport_network_rate || null
          });
        } catch {
          A.noop();
        }
        t && t(e), i(e);
      }) : lr ? A.powerShell("netsh wlan show interfaces").then(function(s) {
        const r = s.toString().split(`\r
`);
        for (let a = 0; a < r.length; a++)
          r[a] = r[a].trim();
        const o = r.join(`\r
`).split(`:\r
\r
`);
        o.shift(), o.forEach((a) => {
          const l = a.split(`\r
`);
          if (l.length >= 5) {
            const c = l[0].indexOf(":") >= 0 ? l[0].split(":")[1].trim() : "", u = l[1].indexOf(":") >= 0 ? l[1].split(":")[1].trim() : "", f = l[2].indexOf(":") >= 0 ? l[2].split(":")[1].trim() : "", p = A.getValue(l, "SSID", ":", !0), d = A.getValue(l, "BSSID", ":", !0) || A.getValue(l, "AP BSSID", ":", !0), m = A.getValue(l, "Signal", ":", !0), h = ur(m), y = A.getValue(l, "Radio type", ":", !0) || A.getValue(l, "Type de radio", ":", !0) || A.getValue(l, "Funktyp", ":", !0) || null, g = A.getValue(l, "authentication", ":", !0) || A.getValue(l, "Authentification", ":", !0) || A.getValue(l, "Authentifizierung", ":", !0) || null, x = A.getValue(l, "Channel", ":", !0) || A.getValue(l, "Canal", ":", !0) || A.getValue(l, "Kanal", ":", !0) || null, w = A.getValue(l, "Transmit rate (mbps)", ":", !0) || A.getValue(l, "Transmission (mbit/s)", ":", !0) || A.getValue(l, "Empfangsrate (MBit/s)", ":", !0) || null;
            u && f && p && d && e.push({
              id: f,
              iface: c,
              model: u,
              ssid: p,
              bssid: d,
              channel: A.toInt(x),
              frequency: x ? xi(x) : null,
              type: y,
              security: g,
              signalLevel: h,
              quality: m ? parseInt(m, 10) : null,
              txRate: A.toInt(w) || null
            });
          }
        }), t && t(e), i(e);
      }) : (t && t(e), i(e));
    });
  });
}
fn.wifiConnections = el;
function tl(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      const e = [];
      ar ? (qs().forEach((s) => {
        const r = js(s.iface);
        e.push({
          id: s.id,
          iface: s.iface,
          model: r.product ? r.product : null,
          vendor: r.vendor ? r.vendor : null,
          mac: s.mac
        });
      }), t && t(e), i(e)) : cr ? or("system_profiler SPNetworkDataType", function(s, r) {
        const o = r.toString().split(`

    Wi-Fi:

`);
        if (o.length > 1) {
          const a = o[1].split(`

`)[0].split(`
`), l = A.getValue(a, "BSD Device Name", ":", !0), c = A.getValue(a, "MAC Address", ":", !0), u = A.getValue(a, "hardware", ":", !0);
          e.push({
            id: "Wi-Fi",
            iface: l,
            model: u,
            vendor: "",
            mac: c
          });
        }
        t && t(e), i(e);
      }) : lr ? A.powerShell("netsh wlan show interfaces").then(function(s) {
        const r = s.toString().split(`\r
`);
        for (let a = 0; a < r.length; a++)
          r[a] = r[a].trim();
        const o = r.join(`\r
`).split(`:\r
\r
`);
        o.shift(), o.forEach((a) => {
          const l = a.split(`\r
`);
          if (l.length >= 5) {
            const c = l[0].indexOf(":") >= 0 ? l[0].split(":")[1].trim() : "", u = l[1].indexOf(":") >= 0 ? l[1].split(":")[1].trim() : "", f = l[2].indexOf(":") >= 0 ? l[2].split(":")[1].trim() : "", p = l[3].indexOf(":") >= 0 ? l[3].split(":") : [];
            p.shift();
            const d = p.join(":").trim(), m = Zc(u);
            c && u && f && d && e.push({
              id: f,
              iface: c,
              model: u,
              vendor: m,
              mac: d
            });
          }
        }), t && t(e), i(e);
      }) : (t && t(e), i(e));
    });
  });
}
fn.wifiInterfaces = tl;
var dn = {};
const Ji = se, il = Fe, nl = Yn, Si = te.exec, On = te.execSync, k = T;
let dt = process.platform;
const Re = dt === "linux" || dt === "android", Mt = dt === "darwin", pr = dt === "win32", bi = dt === "freebsd", Ii = dt === "openbsd", _i = dt === "netbsd", Fi = dt === "sunos", ue = {
  all: 0,
  all_utime: 0,
  all_stime: 0,
  list: {},
  ms: 0,
  result: {}
}, Ht = {
  all: 0,
  list: {},
  ms: 0,
  result: {}
}, xe = {
  all: 0,
  all_utime: 0,
  all_stime: 0,
  list: {},
  ms: 0,
  result: {}
}, Ur = {
  0: "unknown",
  1: "other",
  2: "ready",
  3: "running",
  4: "blocked",
  5: "suspended blocked",
  6: "suspended ready",
  7: "terminated",
  8: "stopped",
  9: "growing"
};
function rl(t) {
  let i = t, e = t.replace(/ +/g, " ").split(" ");
  return e.length === 5 && (i = e[4] + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(e[1].toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + e[2]).slice(-2) + " " + e[3]), i;
}
function sl(t) {
  let i = /* @__PURE__ */ new Date();
  i = new Date(i.getTime() - i.getTimezoneOffset() * 6e4);
  const e = t.split("-"), n = e.length - 1, s = n > 0 ? parseInt(e[n - 1]) : 0, r = e[n].split(":"), o = r.length === 3 ? parseInt(r[0] || 0) : 0, a = parseInt(r[r.length === 3 ? 1 : 0] || 0), l = parseInt(r[r.length === 3 ? 2 : 1] || 0), c = (((s * 24 + o) * 60 + a) * 60 + l) * 1e3;
  let u = new Date(i.getTime()), f = u.toISOString().substring(0, 10) + " " + u.toISOString().substring(11, 19);
  try {
    u = new Date(i.getTime() - c), f = u.toISOString().substring(0, 10) + " " + u.toISOString().substring(11, 19);
  } catch {
    k.noop();
  }
  return f;
}
function ol(t, i) {
  return k.isFunction(t) && !i && (i = t, t = ""), new Promise((e) => {
    process.nextTick(() => {
      if (typeof t != "string")
        return i && i([]), e([]);
      if (t) {
        let n = "";
        try {
          n.__proto__.toLowerCase = k.stringToLower, n.__proto__.replace = k.stringReplace, n.__proto__.toString = k.stringToString, n.__proto__.substr = k.stringSubstr, n.__proto__.substring = k.stringSubstring, n.__proto__.trim = k.stringTrim, n.__proto__.startsWith = k.stringStartWith;
        } catch {
          Object.setPrototypeOf(n, k.stringObj);
        }
        const s = k.sanitizeShellString(t), r = k.mathMin(s.length, 2e3);
        for (let c = 0; c <= r; c++)
          s[c] !== void 0 && (n = n + s[c]);
        n = n.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|"), n === "" && (n = "*"), k.isPrototypePolluted() && n !== "*" && (n = "------");
        let o = n.split("|"), a = [], l = [];
        if (Re || bi || Ii || _i || Mt) {
          if ((Re || bi || Ii || _i) && n === "*")
            try {
              const u = On("systemctl --all --type=service --no-legend 2> /dev/null", k.execOptsLinux).toString().split(`
`);
              o = [];
              for (const f of u) {
                const p = f.split(".service")[0];
                p && f.indexOf(" not-found ") === -1 && o.push(p.trim());
              }
              n = o.join("|");
            } catch {
              try {
                n = "";
                const f = On("service --status-all 2> /dev/null", k.execOptsLinux).toString().split(`
`);
                for (const p of f) {
                  const d = p.split("]");
                  d.length === 2 && (n += (n !== "" ? "|" : "") + d[1].trim());
                }
                o = n.split("|");
              } catch {
                try {
                  const p = On("ls /etc/init.d/ -m 2> /dev/null", k.execOptsLinux).toString().split(`
`).join("");
                  if (n = "", p) {
                    const d = p.split(",");
                    for (const m of d) {
                      const h = m.trim();
                      h && (n += (n !== "" ? "|" : "") + h);
                    }
                    o = n.split("|");
                  }
                } catch {
                  n = "", o = [];
                }
              }
            }
          Mt && n === "*" && (i && i(a), e(a));
          let c = Mt ? ["-caxo", "pcpu,pmem,pid,command"] : ["-axo", "pcpu,pmem,pid,command"];
          n !== "" && o.length > 0 ? k.execSafe("ps", c).then((u) => {
            if (u) {
              let f = u.replace(/ +/g, " ").replace(/,+/g, ".").split(`
`);
              if (o.forEach(function(p) {
                let d;
                Mt ? d = f.filter(function(h) {
                  return h.toLowerCase().indexOf(p) !== -1;
                }) : d = f.filter(function(h) {
                  return h.toLowerCase().indexOf(" " + p.toLowerCase() + ":") !== -1 || h.toLowerCase().indexOf("/" + p.toLowerCase()) !== -1;
                });
                const m = [];
                for (const h of d) {
                  const y = h.trim().split(" ")[2];
                  y && m.push(parseInt(y, 10));
                }
                a.push({
                  name: p,
                  running: d.length > 0,
                  startmode: "",
                  pids: m,
                  cpu: parseFloat(d.reduce(function(h, y) {
                    return h + parseFloat(y.trim().split(" ")[0]);
                  }, 0).toFixed(2)),
                  mem: parseFloat(d.reduce(function(h, y) {
                    return h + parseFloat(y.trim().split(" ")[1]);
                  }, 0).toFixed(2))
                });
              }), Re) {
                let p = 'cat /proc/stat | grep "cpu "';
                for (let d in a)
                  for (let m in a[d].pids)
                    p += ";cat /proc/" + a[d].pids[m] + "/stat";
                Si(p, { maxBuffer: 1024 * 2e4 }, function(d, m) {
                  let h = m.toString().split(`
`), y = fr(h.shift()), g = {}, x = {};
                  h.forEach((w) => {
                    if (x = dr(w, y, Ht), x.pid) {
                      let S = -1;
                      for (let C in a)
                        for (let _ in a[C].pids)
                          parseInt(a[C].pids[_]) === parseInt(x.pid) && (S = C);
                      S >= 0 && (a[S].cpu += x.cpuu + x.cpus), g[x.pid] = {
                        cpuu: x.cpuu,
                        cpus: x.cpus,
                        utime: x.utime,
                        stime: x.stime,
                        cutime: x.cutime,
                        cstime: x.cstime
                      };
                    }
                  }), Ht.all = y, Ht.list = Object.assign({}, g), Ht.ms = Date.now() - Ht.ms, Ht.result = Object.assign({}, a), i && i(a), e(a);
                });
              } else
                i && i(a), e(a);
            } else
              c = ["-o", "comm"], k.execSafe("ps", c).then((f) => {
                if (f) {
                  let p = f.replace(/ +/g, " ").replace(/,+/g, ".").split(`
`);
                  o.forEach(function(d) {
                    let m = p.filter(function(h) {
                      return h.indexOf(d) !== -1;
                    });
                    a.push({
                      name: d,
                      running: m.length > 0,
                      startmode: "",
                      cpu: 0,
                      mem: 0
                    });
                  }), i && i(a), e(a);
                } else
                  o.forEach(function(p) {
                    a.push({
                      name: p,
                      running: !1,
                      startmode: "",
                      cpu: 0,
                      mem: 0
                    });
                  }), i && i(a), e(a);
              });
          }) : (i && i(a), e(a));
        }
        if (pr)
          try {
            let c = "Get-CimInstance Win32_Service";
            o[0] !== "*" && (c += ' -Filter "', o.forEach((u) => {
              c += `Name='${u}' or `;
            }), c = `${c.slice(0, -4)}"`), c += " | select Name,Caption,Started,StartMode,ProcessId | fl", k.powerShell(c).then((u, f) => {
              f ? (o.forEach(function(p) {
                a.push({
                  name: p,
                  running: !1,
                  startmode: "",
                  cpu: 0,
                  mem: 0
                });
              }), i && i(a), e(a)) : (u.split(/\n\s*\n/).forEach((d) => {
                if (d.trim() !== "") {
                  let m = d.trim().split(`\r
`), h = k.getValue(m, "Name", ":", !0).toLowerCase(), y = k.getValue(m, "Caption", ":", !0).toLowerCase(), g = k.getValue(m, "Started", ":", !0), x = k.getValue(m, "StartMode", ":", !0), w = k.getValue(m, "ProcessId", ":", !0);
                  (n === "*" || o.indexOf(h) >= 0 || o.indexOf(y) >= 0) && (a.push({
                    name: h,
                    running: g.toLowerCase() === "true",
                    startmode: x,
                    pids: [w],
                    cpu: 0,
                    mem: 0
                  }), l.push(h), l.push(y));
                }
              }), n !== "*" && o.filter(function(m) {
                return l.indexOf(m) === -1;
              }).forEach(function(m) {
                a.push({
                  name: m,
                  running: !1,
                  startmode: "",
                  pids: [],
                  cpu: 0,
                  mem: 0
                });
              }), i && i(a), e(a));
            });
          } catch {
            i && i(a), e(a);
          }
      } else
        i && i([]), e([]);
    });
  });
}
dn.services = ol;
function fr(t) {
  let i = t.replace(/ +/g, " ").split(" "), e = i.length >= 2 ? parseInt(i[1]) : 0, n = i.length >= 3 ? parseInt(i[2]) : 0, s = i.length >= 4 ? parseInt(i[3]) : 0, r = i.length >= 5 ? parseInt(i[4]) : 0, o = i.length >= 6 ? parseInt(i[5]) : 0, a = i.length >= 7 ? parseInt(i[6]) : 0, l = i.length >= 8 ? parseInt(i[7]) : 0, c = i.length >= 9 ? parseInt(i[8]) : 0, u = i.length >= 10 ? parseInt(i[9]) : 0, f = i.length >= 11 ? parseInt(i[10]) : 0;
  return e + n + s + r + o + a + l + c + u + f;
}
function dr(t, i, e) {
  let n = t.replace(/ +/g, " ").split(")");
  if (n.length >= 2) {
    let s = n[1].split(" ");
    if (s.length >= 16) {
      let r = parseInt(n[0].split(" ")[0]), o = parseInt(s[12]), a = parseInt(s[13]), l = parseInt(s[14]), c = parseInt(s[15]), u = 0, f = 0;
      return e.all > 0 && e.list[r] ? (u = (o + l - e.list[r].utime - e.list[r].cutime) / (i - e.all) * 100, f = (a + c - e.list[r].stime - e.list[r].cstime) / (i - e.all) * 100) : (u = (o + l) / i * 100, f = (a + c) / i * 100), {
        pid: r,
        utime: o,
        stime: a,
        cutime: l,
        cstime: c,
        cpuu: u,
        cpus: f
      };
    } else
      return {
        pid: 0,
        utime: 0,
        stime: 0,
        cutime: 0,
        cstime: 0,
        cpuu: 0,
        cpus: 0
      };
  } else
    return {
      pid: 0,
      utime: 0,
      stime: 0,
      cutime: 0,
      cstime: 0,
      cpuu: 0,
      cpus: 0
    };
}
function Ks(t, i, e) {
  let n = 0, s = 0;
  return e.all > 0 && e.list[t.pid] ? (n = (t.utime - e.list[t.pid].utime) / (i - e.all) * 100, s = (t.stime - e.list[t.pid].stime) / (i - e.all) * 100) : (n = t.utime / i * 100, s = t.stime / i * 100), {
    pid: t.pid,
    utime: t.utime,
    stime: t.stime,
    cpuu: n > 0 ? n : 0,
    cpus: s > 0 ? s : 0
  };
}
function al(t) {
  let i = [];
  function e(o) {
    o = o || "";
    let a = o.split(" ")[0];
    if (a.substr(-1) === ":" && (a = a.substr(0, a.length - 1)), a.substr(0, 1) !== "[") {
      let l = a.split("/");
      isNaN(parseInt(l[l.length - 1])) ? a = l[l.length - 1] : a = l[0];
    }
    return a;
  }
  function n(o) {
    let a = 0, l = 0;
    function c(W) {
      a = l, i[W] ? l = o.substring(i[W].to + a, 1e4).indexOf(" ") : l = 1e4;
    }
    c(0);
    const u = parseInt(o.substring(i[0].from + a, i[0].to + l));
    c(1);
    const f = parseInt(o.substring(i[1].from + a, i[1].to + l));
    c(2);
    const p = parseFloat(o.substring(i[2].from + a, i[2].to + l).replace(/,/g, "."));
    c(3);
    const d = parseFloat(o.substring(i[3].from + a, i[3].to + l).replace(/,/g, "."));
    c(4);
    const m = parseInt(o.substring(i[4].from + a, i[4].to + l));
    c(5);
    const h = parseInt(o.substring(i[5].from + a, i[5].to + l));
    c(6);
    const y = parseInt(o.substring(i[6].from + a, i[6].to + l));
    c(7);
    const g = parseInt(o.substring(i[7].from + a, i[7].to + l)) || 0;
    c(8);
    const x = Fi ? rl(o.substring(i[8].from + a, i[8].to + l).trim()) : sl(o.substring(i[8].from + a, i[8].to + l).trim());
    c(9);
    let w = o.substring(i[9].from + a, i[9].to + l).trim();
    w = w[0] === "R" ? "running" : w[0] === "S" ? "sleeping" : w[0] === "T" ? "stopped" : w[0] === "W" ? "paging" : w[0] === "X" ? "dead" : w[0] === "Z" ? "zombie" : w[0] === "D" || w[0] === "U" ? "blocked" : "unknown", c(10);
    let S = o.substring(i[10].from + a, i[10].to + l).trim();
    (S === "?" || S === "??") && (S = ""), c(11);
    const C = o.substring(i[11].from + a, i[11].to + l).trim();
    c(12);
    let _ = "", O = "", U = "", I = o.substring(i[12].from + a, i[12].to + l).trim();
    if (I.substr(I.length - 1) === "]" && (I = I.slice(0, -1)), I.substr(0, 1) === "[")
      O = I.substring(1);
    else {
      const W = I.indexOf("("), V = I.indexOf(")"), ie = I.indexOf("/"), oe = I.indexOf(":");
      if (W < V && W < ie && ie < V)
        O = I.split(" ")[0], O = O.replace(/:/g, "");
      else if (oe > 0 && (ie === -1 || ie > 3))
        O = I.split(" ")[0], O = O.replace(/:/g, "");
      else {
        let le = I.indexOf(" -"), X = I.indexOf(" /");
        le = le >= 0 ? le : 1e4, X = X >= 0 ? X : 1e4;
        const fe = Math.min(le, X);
        let z = I.substr(0, fe);
        const Z = I.substr(fe), H = z.lastIndexOf("/");
        if (H >= 0 && (_ = z.substr(0, H), z = z.substr(H + 1)), fe === 1e4 && z.indexOf(" ") > -1) {
          const $ = z.split(" ");
          il.existsSync(nl.join(_, $[0])) ? (O = $.shift(), U = ($.join(" ") + " " + Z).trim()) : (O = z.trim(), U = Z.trim());
        } else
          O = z.trim(), U = Z.trim();
      }
    }
    return {
      pid: u,
      parentPid: f,
      name: Re ? e(O) : O,
      cpu: p,
      cpuu: 0,
      cpus: 0,
      mem: d,
      priority: m,
      memVsz: h,
      memRss: y,
      nice: g,
      started: x,
      state: w,
      tty: S,
      user: C,
      command: O,
      params: U,
      path: _
    };
  }
  function s(o) {
    let a = [];
    if (o.length > 1) {
      let l = o[0];
      i = k.parseHead(l, 8), o.shift(), o.forEach(function(c) {
        c.trim() !== "" && a.push(n(c));
      });
    }
    return a;
  }
  function r(o) {
    function a(u) {
      const f = ("0" + (u.getMonth() + 1).toString()).slice(-2), p = u.getFullYear().toString(), d = ("0" + u.getDate().toString()).slice(-2), m = ("0" + u.getHours().toString()).slice(-2), h = ("0" + u.getMinutes().toString()).slice(-2), y = ("0" + u.getSeconds().toString()).slice(-2);
      return p + "-" + f + "-" + d + " " + m + ":" + h + ":" + y;
    }
    function l(u) {
      let f = "";
      if (u.indexOf("d") >= 0) {
        const p = u.split("d");
        f = a(new Date(Date.now() - (p[0] * 24 + p[1] * 1) * 60 * 60 * 1e3));
      } else if (u.indexOf("h") >= 0) {
        const p = u.split("h");
        f = a(new Date(Date.now() - (p[0] * 60 + p[1] * 1) * 60 * 1e3));
      } else if (u.indexOf(":") >= 0) {
        const p = u.split(":");
        f = a(new Date(Date.now() - (p.length > 1 ? (p[0] * 60 + p[1]) * 1e3 : p[0] * 1e3)));
      }
      return f;
    }
    let c = [];
    return o.forEach(function(u) {
      if (u.trim() !== "") {
        u = u.trim().replace(/ +/g, " ").replace(/,+/g, ".");
        const f = u.split(" "), p = f.slice(9).join(" "), d = parseFloat((1 * parseInt(f[3]) * 1024 / Ji.totalmem()).toFixed(1)), m = l(f[5]);
        c.push({
          pid: parseInt(f[0]),
          parentPid: parseInt(f[1]),
          name: e(p),
          cpu: 0,
          cpuu: 0,
          cpus: 0,
          mem: d,
          priority: 0,
          memVsz: parseInt(f[2]),
          memRss: parseInt(f[3]),
          nice: parseInt(f[4]),
          started: m,
          state: f[6] === "R" ? "running" : f[6] === "S" ? "sleeping" : f[6] === "T" ? "stopped" : f[6] === "W" ? "paging" : f[6] === "X" ? "dead" : f[6] === "Z" ? "zombie" : f[6] === "D" || f[6] === "U" ? "blocked" : "unknown",
          tty: f[7],
          user: f[8],
          command: p
        });
      }
    }), c;
  }
  return new Promise((o) => {
    process.nextTick(() => {
      let a = {
        all: 0,
        running: 0,
        blocked: 0,
        sleeping: 0,
        unknown: 0,
        list: []
      }, l = "";
      if (ue.ms && Date.now() - ue.ms >= 500 || ue.ms === 0)
        if (Re || bi || Ii || _i || Mt || Fi)
          Re && (l = "export LC_ALL=C; ps -axo pid:11,ppid:11,pcpu:6,pmem:6,pri:5,vsz:11,rss:11,ni:5,etime:30,state:5,tty:15,user:20,command; unset LC_ALL"), (bi || Ii || _i) && (l = "export LC_ALL=C; ps -axo pid,ppid,pcpu,pmem,pri,vsz,rss,ni,etime,state,tty,user,command; unset LC_ALL"), Mt && (l = "ps -axo pid,ppid,pcpu,pmem,pri,vsz=temp_title_1,rss=temp_title_2,nice,etime=temp_title_3,state,tty,user,command -r"), Fi && (l = "ps -Ao pid,ppid,pcpu,pmem,pri,vsz,rss,nice,stime,s,tty,user,comm"), Si(l, { maxBuffer: 1024 * 2e4 }, function(c, u) {
            !c && u.toString().trim() ? (a.list = s(u.toString().split(`
`)).slice(), a.all = a.list.length, a.running = a.list.filter(function(f) {
              return f.state === "running";
            }).length, a.blocked = a.list.filter(function(f) {
              return f.state === "blocked";
            }).length, a.sleeping = a.list.filter(function(f) {
              return f.state === "sleeping";
            }).length, Re ? (l = 'cat /proc/stat | grep "cpu "', a.list.forEach((f) => {
              l += ";cat /proc/" + f.pid + "/stat";
            }), Si(l, { maxBuffer: 1024 * 2e4 }, function(f, p) {
              let d = p.toString().split(`
`), m = fr(d.shift()), h = {}, y = {};
              d.forEach((g) => {
                if (y = dr(g, m, ue), y.pid) {
                  let x = a.list.map(function(w) {
                    return w.pid;
                  }).indexOf(y.pid);
                  x >= 0 && (a.list[x].cpu = y.cpuu + y.cpus, a.list[x].cpuu = y.cpuu, a.list[x].cpus = y.cpus), h[y.pid] = {
                    cpuu: y.cpuu,
                    cpus: y.cpus,
                    utime: y.utime,
                    stime: y.stime,
                    cutime: y.cutime,
                    cstime: y.cstime
                  };
                }
              }), ue.all = m, ue.list = Object.assign({}, h), ue.ms = Date.now() - ue.ms, ue.result = Object.assign({}, a), t && t(a), o(a);
            })) : (t && t(a), o(a))) : (l = "ps -o pid,ppid,vsz,rss,nice,etime,stat,tty,user,comm", Fi && (l = "ps -o pid,ppid,vsz,rss,nice,etime,s,tty,user,comm"), Si(l, { maxBuffer: 1024 * 2e4 }, function(f, p) {
              if (f)
                t && t(a), o(a);
              else {
                let d = p.toString().split(`
`);
                d.shift(), a.list = r(d).slice(), a.all = a.list.length, a.running = a.list.filter(function(m) {
                  return m.state === "running";
                }).length, a.blocked = a.list.filter(function(m) {
                  return m.state === "blocked";
                }).length, a.sleeping = a.list.filter(function(m) {
                  return m.state === "sleeping";
                }).length, t && t(a), o(a);
              }
            }));
          });
        else if (pr)
          try {
            k.powerShell('Get-CimInstance Win32_Process | select-Object ProcessId,ParentProcessId,ExecutionState,Caption,CommandLine,ExecutablePath,UserModeTime,KernelModeTime,WorkingSetSize,Priority,PageFileUsage, @{n="CreationDate";e={$_.CreationDate.ToString("yyyy-MM-dd HH:mm:ss")}} | fl').then((c, u) => {
              if (!u) {
                let f = c.split(/\n\s*\n/), p = [], d = [], m = {}, h = 0, y = 0;
                f.forEach((g) => {
                  if (g.trim() !== "") {
                    let x = g.trim().split(`\r
`), w = parseInt(k.getValue(x, "ProcessId", ":", !0), 10), S = parseInt(k.getValue(x, "ParentProcessId", ":", !0), 10), C = k.getValue(x, "ExecutionState", ":"), _ = k.getValue(x, "Caption", ":", !0), O = k.getValue(x, "CommandLine", ":", !0), U = !1;
                    x.forEach((oe) => {
                      U && oe.toLowerCase().startsWith(" ") ? O += " " + oe.trim() : U = !1, oe.toLowerCase().startsWith("commandline") && (U = !0);
                    });
                    let I = k.getValue(x, "ExecutablePath", ":", !0), W = parseInt(k.getValue(x, "UserModeTime", ":", !0), 10), V = parseInt(k.getValue(x, "KernelModeTime", ":", !0), 10), ie = parseInt(k.getValue(x, "WorkingSetSize", ":", !0), 10);
                    h = h + W, y = y + V, a.all++, C || a.unknown++, C === "3" && a.running++, (C === "4" || C === "5") && a.blocked++, d.push({
                      pid: w,
                      utime: W,
                      stime: V,
                      cpu: 0,
                      cpuu: 0,
                      cpus: 0
                    }), p.push({
                      pid: w,
                      parentPid: S,
                      name: _,
                      cpu: 0,
                      cpuu: 0,
                      cpus: 0,
                      mem: ie / Ji.totalmem() * 100,
                      priority: parseInt(k.getValue(x, "Priority", ":", !0), 10),
                      memVsz: parseInt(k.getValue(x, "PageFileUsage", ":", !0), 10),
                      memRss: Math.floor(parseInt(k.getValue(x, "WorkingSetSize", ":", !0), 10) / 1024),
                      nice: 0,
                      started: k.getValue(x, "CreationDate", ":", !0),
                      state: C ? Ur[C] : Ur[0],
                      tty: "",
                      user: "",
                      command: O || _,
                      path: I,
                      params: ""
                    });
                  }
                }), a.sleeping = a.all - a.running - a.blocked - a.unknown, a.list = p, d.forEach((g) => {
                  let x = Ks(g, h + y, ue), w = a.list.map(function(S) {
                    return S.pid;
                  }).indexOf(x.pid);
                  w >= 0 && (a.list[w].cpu = x.cpuu + x.cpus, a.list[w].cpuu = x.cpuu, a.list[w].cpus = x.cpus), m[x.pid] = {
                    cpuu: x.cpuu,
                    cpus: x.cpus,
                    utime: x.utime,
                    stime: x.stime
                  };
                }), ue.all = h + y, ue.all_utime = h, ue.all_stime = y, ue.list = Object.assign({}, m), ue.ms = Date.now() - ue.ms, ue.result = Object.assign({}, a);
              }
              t && t(a), o(a);
            });
          } catch {
            t && t(a), o(a);
          }
        else
          t && t(a), o(a);
      else
        t && t(ue.result), o(ue.result);
    });
  });
}
dn.processes = al;
function cl(t, i) {
  return k.isFunction(t) && !i && (i = t, t = ""), new Promise((e) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return i && i([]), e([]);
      let n = "";
      try {
        n.__proto__.toLowerCase = k.stringToLower, n.__proto__.replace = k.stringReplace, n.__proto__.toString = k.stringToString, n.__proto__.substr = k.stringSubstr, n.__proto__.substring = k.stringSubstring, n.__proto__.trim = k.stringTrim, n.__proto__.startsWith = k.stringStartWith;
      } catch {
        Object.setPrototypeOf(n, k.stringObj);
      }
      const s = k.sanitizeShellString(t), r = k.mathMin(s.length, 2e3);
      for (let c = 0; c <= r; c++)
        s[c] !== void 0 && (n = n + s[c]);
      n = n.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|"), n === "" && (n = "*"), k.isPrototypePolluted() && n !== "*" && (n = "------");
      let o = n.split("|"), a = [];
      if ((k.isPrototypePolluted() ? "" : k.sanitizeShellString(t) || "*") && o.length && o[0] !== "------") {
        if (pr)
          try {
            k.powerShell("Get-CimInstance Win32_Process | select ProcessId,Caption,UserModeTime,KernelModeTime,WorkingSetSize | fl").then((c, u) => {
              if (!u) {
                let f = c.split(/\n\s*\n/), p = [], d = {}, m = 0, h = 0;
                f.forEach((y) => {
                  if (y.trim() !== "") {
                    let g = y.trim().split(`\r
`), x = parseInt(k.getValue(g, "ProcessId", ":", !0), 10), w = k.getValue(g, "Caption", ":", !0), S = parseInt(k.getValue(g, "UserModeTime", ":", !0), 10), C = parseInt(k.getValue(g, "KernelModeTime", ":", !0), 10), _ = parseInt(k.getValue(g, "WorkingSetSize", ":", !0), 10);
                    m = m + S, h = h + C, p.push({
                      pid: x,
                      name: w,
                      utime: S,
                      stime: C,
                      cpu: 0,
                      cpuu: 0,
                      cpus: 0,
                      mem: _
                    });
                    let O = "", U = !1;
                    if (o.forEach(function(I) {
                      w.toLowerCase().indexOf(I.toLowerCase()) >= 0 && !U && (U = !0, O = I);
                    }), n === "*" || U) {
                      let I = !1;
                      a.forEach(function(W) {
                        W.proc.toLowerCase() === O.toLowerCase() && (W.pids.push(x), W.mem += _ / Ji.totalmem() * 100, I = !0);
                      }), I || a.push({
                        proc: O,
                        pid: x,
                        pids: [x],
                        cpu: 0,
                        mem: _ / Ji.totalmem() * 100
                      });
                    }
                  }
                }), n !== "*" && o.filter(function(g) {
                  return p.filter(function(x) {
                    return x.name.toLowerCase().indexOf(g) >= 0;
                  }).length === 0;
                }).forEach(function(g) {
                  a.push({
                    proc: g,
                    pid: null,
                    pids: [],
                    cpu: 0,
                    mem: 0
                  });
                }), p.forEach((y) => {
                  let g = Ks(y, m + h, xe), x = -1;
                  for (let w = 0; w < a.length; w++)
                    (a[w].pid === g.pid || a[w].pids.indexOf(g.pid) >= 0) && (x = w);
                  x >= 0 && (a[x].cpu += g.cpuu + g.cpus), d[g.pid] = {
                    cpuu: g.cpuu,
                    cpus: g.cpus,
                    utime: g.utime,
                    stime: g.stime
                  };
                }), xe.all = m + h, xe.all_utime = m, xe.all_stime = h, xe.list = Object.assign({}, d), xe.ms = Date.now() - xe.ms, xe.result = JSON.parse(JSON.stringify(a)), i && i(a), e(a);
              }
            });
          } catch {
            i && i(a), e(a);
          }
        if (Mt || Re || bi || Ii || _i) {
          const c = ["-axo", "pid,ppid,pcpu,pmem,comm"];
          k.execSafe("ps", c).then((u) => {
            if (u) {
              let f = [], p = u.toString().split(`
`).filter(function(d) {
                if (n === "*")
                  return !0;
                if (d.toLowerCase().indexOf("grep") !== -1)
                  return !1;
                let m = !1;
                return o.forEach(function(h) {
                  m = m || d.toLowerCase().indexOf(h.toLowerCase()) >= 0;
                }), m;
              });
              if (p.shift(), p.forEach(function(d) {
                let m = d.trim().replace(/ +/g, " ").split(" ");
                if (m.length > 4) {
                  const h = m[4].indexOf("/") >= 0 ? m[4].substring(0, m[4].indexOf("/")) : m[4], y = Re ? h : m[4].substring(m[4].lastIndexOf("/") + 1);
                  f.push({
                    name: y,
                    pid: parseInt(m[0]) || 0,
                    ppid: parseInt(m[1]) || 0,
                    cpu: parseFloat(m[2].replace(",", ".")),
                    mem: parseFloat(m[3].replace(",", "."))
                  });
                }
              }), f.forEach(function(d) {
                let m = -1, h = !1, y = d.name;
                for (let g = 0; g < a.length; g++)
                  d.name.toLowerCase().indexOf(a[g].proc.toLowerCase()) >= 0 && (m = g);
                o.forEach(function(g) {
                  d.name.toLowerCase().indexOf(g.toLowerCase()) >= 0 && !h && (h = !0, y = g);
                }), (n === "*" || h) && (m < 0 ? y && a.push({
                  proc: y,
                  pid: d.pid,
                  pids: [d.pid],
                  cpu: d.cpu,
                  mem: d.mem
                }) : (d.ppid < 10 && (a[m].pid = d.pid), a[m].pids.push(d.pid), a[m].cpu += d.cpu, a[m].mem += d.mem));
              }), n !== "*" && o.filter(function(m) {
                return f.filter(function(h) {
                  return h.name.toLowerCase().indexOf(m) >= 0;
                }).length === 0;
              }).forEach(function(m) {
                a.push({
                  proc: m,
                  pid: null,
                  pids: [],
                  cpu: 0,
                  mem: 0
                });
              }), Re) {
                a.forEach(function(m) {
                  m.cpu = 0;
                });
                let d = 'cat /proc/stat | grep "cpu "';
                for (let m in a)
                  for (let h in a[m].pids)
                    d += ";cat /proc/" + a[m].pids[h] + "/stat";
                Si(d, { maxBuffer: 1024 * 2e4 }, function(m, h) {
                  let y = h.toString().split(`
`), g = fr(y.shift()), x = {}, w = {};
                  y.forEach((S) => {
                    if (w = dr(S, g, xe), w.pid) {
                      let C = -1;
                      for (let _ in a)
                        a[_].pids.indexOf(w.pid) >= 0 && (C = _);
                      C >= 0 && (a[C].cpu += w.cpuu + w.cpus), x[w.pid] = {
                        cpuu: w.cpuu,
                        cpus: w.cpus,
                        utime: w.utime,
                        stime: w.stime,
                        cutime: w.cutime,
                        cstime: w.cstime
                      };
                    }
                  }), a.forEach(function(S) {
                    S.cpu = Math.round(S.cpu * 100) / 100;
                  }), xe.all = g, xe.list = Object.assign({}, x), xe.ms = Date.now() - xe.ms, xe.result = Object.assign({}, a), i && i(a), e(a);
                });
              } else
                i && i(a), e(a);
            } else
              i && i(a), e(a);
          });
        }
      }
    });
  });
}
dn.processLoad = cl;
var Ys = {};
const pi = te.exec, qe = T;
let mt = process.platform;
const ll = mt === "linux" || mt === "android", ul = mt === "darwin", pl = mt === "win32", fl = mt === "freebsd", dl = mt === "openbsd", ml = mt === "netbsd", hl = mt === "sunos";
function $r(t, i) {
  let e = [], n = [], s = {}, r = !0, o = [], a = [], l = {}, c = !0;
  return t.forEach(function(u) {
    if (u === "---")
      c = !1;
    else {
      let f = u.replace(/ +/g, " ").split(" ");
      c ? n.push({
        user: f[0],
        tty: f[1],
        date: f[2],
        time: f[3],
        ip: f && f.length > 4 ? f[4].replace(/\(/g, "").replace(/\)/g, "") : ""
      }) : r ? (o = f, o.forEach(function(p) {
        a.push(u.indexOf(p));
      }), r = !1) : (s.user = u.substring(a[0], a[1] - 1).trim(), s.tty = u.substring(a[1], a[2] - 1).trim(), s.ip = u.substring(a[2], a[3] - 1).replace(/\(/g, "").replace(/\)/g, "").trim(), s.command = u.substring(a[7], 1e3).trim(), l = n.filter(function(p) {
        return p.user.substring(0, 8).trim() === s.user && p.tty === s.tty;
      }), l.length === 1 && e.push({
        user: l[0].user,
        tty: l[0].tty,
        date: l[0].date,
        time: l[0].time,
        ip: l[0].ip,
        command: s.command
      }));
    }
  }), e.length === 0 && i === 2 ? n : e;
}
function Pn(t) {
  let i = [], e = [], n = {}, s = {}, r = !0;
  return t.forEach(function(o) {
    if (o === "---")
      r = !1;
    else {
      let a = o.replace(/ +/g, " ").split(" ");
      if (r) {
        let l = "" + (/* @__PURE__ */ new Date()).getFullYear() + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(a[2].toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + a[3]).slice(-2);
        try {
          new Date(l) > /* @__PURE__ */ new Date() && (l = "" + ((/* @__PURE__ */ new Date()).getFullYear() - 1) + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(a[2].toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + a[3]).slice(-2));
        } catch {
          qe.noop();
        }
        e.push({
          user: a[0],
          tty: a[1],
          date: l,
          time: a[4]
        });
      } else
        n.user = a[0], n.tty = a[1], n.ip = a[2] !== "-" ? a[2] : "", n.command = a.slice(5, 1e3).join(" "), s = e.filter(function(l) {
          return l.user.substring(0, 10) === n.user.substring(0, 10) && (l.tty.substring(3, 1e3) === n.tty || l.tty === n.tty);
        }), s.length === 1 && i.push({
          user: s[0].user,
          tty: s[0].tty,
          date: s[0].date,
          time: s[0].time,
          ip: n.ip,
          command: n.command
        });
    }
  }), i;
}
function gl(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      if (ll && pi('export LC_ALL=C; who --ips; echo "---"; w; unset LC_ALL | tail -n +2', function(n, s) {
        if (n)
          t && t(e), i(e);
        else {
          let r = s.toString().split(`
`);
          e = $r(r, 1), e.length === 0 ? pi('who; echo "---"; w | tail -n +2', function(o, a) {
            o || (r = a.toString().split(`
`), e = $r(r, 2)), t && t(e), i(e);
          }) : (t && t(e), i(e));
        }
      }), (fl || dl || ml) && pi('who; echo "---"; w -ih', function(n, s) {
        if (!n) {
          let r = s.toString().split(`
`);
          e = Pn(r);
        }
        t && t(e), i(e);
      }), hl && pi('who; echo "---"; w -h', function(n, s) {
        if (!n) {
          let r = s.toString().split(`
`);
          e = Pn(r);
        }
        t && t(e), i(e);
      }), ul && pi('export LC_ALL=C; who; echo "---"; w -ih; unset LC_ALL', function(n, s) {
        if (!n) {
          let r = s.toString().split(`
`);
          e = Pn(r);
        }
        t && t(e), i(e);
      }), pl)
        try {
          let n = `Get-CimInstance Win32_LogonSession | select LogonId,@{n="StartTime";e={$_.StartTime.ToString("yyyy-MM-dd HH:mm:ss")}} | fl; echo '#-#-#-#';`;
          n += "Get-CimInstance Win32_LoggedOnUser | select antecedent,dependent | fl ; echo '#-#-#-#';", n += `$process = (Get-CimInstance Win32_Process -Filter "name = 'explorer.exe'"); Invoke-CimMethod -InputObject $process[0] -MethodName GetOwner | select user, domain | fl; get-process -name explorer | select-object sessionid | fl; echo '#-#-#-#';`, n += "query user", qe.powerShell(n).then((s) => {
            if (s) {
              s = s.split("#-#-#-#");
              let r = yl((s[0] || "").split(/\n\s*\n/)), o = wl((s[1] || "").split(/\n\s*\n/)), a = Cl((s[3] || "").split(`\r
`)), l = Sl((s[2] || "").split(/\n\s*\n/), a);
              for (let c in o)
                ({}).hasOwnProperty.call(o, c) && (o[c].dateTime = {}.hasOwnProperty.call(r, c) ? r[c] : "");
              l.forEach((c) => {
                let u = "";
                for (let f in o)
                  ({}).hasOwnProperty.call(o, f) && o[f].user === c.user && (!u || u < o[f].dateTime) && (u = o[f].dateTime);
                e.push({
                  user: c.user,
                  tty: c.tty,
                  date: `${u.substring(0, 10)}`,
                  time: `${u.substring(11, 19)}`,
                  ip: "",
                  command: ""
                });
              });
            }
            t && t(e), i(e);
          });
        } catch {
          t && t(e), i(e);
        }
    });
  });
}
function yl(t) {
  const i = {};
  return t.forEach((e) => {
    const n = e.split(`\r
`), s = qe.getValue(n, "LogonId"), r = qe.getValue(n, "starttime");
    s && (i[s] = r);
  }), i;
}
function xl(t, i) {
  t = t.toLowerCase(), i = i.toLowerCase();
  let e = 0, n = t.length;
  i.length > n && (n = i.length);
  for (let s = 0; s < n; s++) {
    const r = t[s] || "", o = i[s] || "";
    r === o && e++;
  }
  return n > 10 ? e / n > 0.9 : n > 0 ? e / n > 0.8 : !1;
}
function Sl(t, i) {
  const e = [];
  return t.forEach((n) => {
    const s = n.split(`\r
`), r = qe.getValue(s, "domain", ":", !0), o = qe.getValue(s, "user", ":", !0), a = qe.getValue(s, "sessionid", ":", !0);
    if (o) {
      const l = i.filter((c) => xl(c.user, o));
      e.push({
        domain: r,
        user: o,
        tty: l && l[0] && l[0].tty ? l[0].tty : a
      });
    }
  }), e;
}
function wl(t) {
  const i = {};
  return t.forEach((e) => {
    const n = e.split(`\r
`);
    let r = qe.getValue(n, "antecedent", ":", !0).split("=");
    const o = r.length > 2 ? r[1].split(",")[0].replace(/"/g, "").trim() : "", a = r.length > 2 ? r[2].replace(/"/g, "").replace(/\)/g, "").trim() : "";
    r = qe.getValue(n, "dependent", ":", !0).split("=");
    const c = r.length > 1 ? r[1].replace(/"/g, "").replace(/\)/g, "").trim() : "";
    c && (i[c] = {
      domain: a,
      user: o
    });
  }), i;
}
function Cl(t) {
  t = t.filter((s) => s);
  let i = [];
  const e = t[0], n = [];
  if (e) {
    const s = e[0] === " " ? 1 : 0;
    n.push(s - 1);
    let r = 0;
    for (let o = s + 1; o < e.length; o++)
      e[o] === " " && (e[o - 1] === " " || e[o - 1] === ".") ? r = o : r && (n.push(r), r = 0);
    for (let o = 1; o < t.length; o++)
      if (t[o].trim()) {
        const a = t[o].substring(n[0] + 1, n[1]).trim() || "", l = t[o].substring(n[1] + 1, n[2] - 2).trim() || "";
        i.push({
          user: a,
          tty: l
        });
      }
  }
  return i;
}
Ys.users = gl;
var mr = {};
const ae = T;
let ht = process.platform;
const zr = ht === "linux" || ht === "android", Hr = ht === "darwin", vl = ht === "win32", qr = ht === "freebsd", jr = ht === "openbsd", Xr = ht === "netbsd", Ll = ht === "sunos";
function bl(t, i) {
  return new Promise((e) => {
    process.nextTick(() => {
      let n = {
        url: t,
        ok: !1,
        status: 404,
        ms: null
      };
      if (typeof t != "string")
        return i && i(n), e(n);
      let s = "";
      const r = ae.sanitizeShellString(t, !0), o = ae.mathMin(r.length, 2e3);
      for (let a = 0; a <= o; a++)
        if (r[a] !== void 0) {
          try {
            r[a].__proto__.toLowerCase = ae.stringToLower;
          } catch {
            Object.setPrototypeOf(r[a], ae.stringObj);
          }
          const l = r[a].toLowerCase();
          l && l[0] && !l[1] && l[0].length === 1 && (s = s + l[0]);
        }
      n.url = s;
      try {
        if (s && !ae.isPrototypePolluted()) {
          try {
            s.__proto__.startsWith = ae.stringStartWith;
          } catch {
            Object.setPrototypeOf(s, ae.stringObj);
          }
          if (s.startsWith("file:") || s.startsWith("gopher:") || s.startsWith("telnet:") || s.startsWith("mailto:") || s.startsWith("news:") || s.startsWith("nntp:"))
            return i && i(n), e(n);
          ae.checkWebsite(s).then((a) => {
            n.status = a.statusCode, n.ok = a.statusCode >= 200 && a.statusCode <= 399, n.ms = n.ok ? a.time : null, i && i(n), e(n);
          });
        } else
          i && i(n), e(n);
      } catch {
        i && i(n), e(n);
      }
    });
  });
}
mr.inetChecksite = bl;
function Il(t, i) {
  return ae.isFunction(t) && !i && (i = t, t = ""), t = t || "8.8.8.8", new Promise((e) => {
    process.nextTick(() => {
      if (typeof t != "string")
        return i && i(null), e(null);
      let n = "";
      const s = (ae.isPrototypePolluted() ? "8.8.8.8" : ae.sanitizeShellString(t, !0)).trim(), r = ae.mathMin(s.length, 2e3);
      for (let a = 0; a <= r; a++)
        if (s[a] !== void 0) {
          try {
            s[a].__proto__.toLowerCase = ae.stringToLower;
          } catch {
            Object.setPrototypeOf(s[a], ae.stringObj);
          }
          const l = s[a].toLowerCase();
          l && l[0] && !l[1] && (n = n + l[0]);
        }
      try {
        n.__proto__.startsWith = ae.stringStartWith;
      } catch {
        Object.setPrototypeOf(n, ae.stringObj);
      }
      if (n.startsWith("file:") || n.startsWith("gopher:") || n.startsWith("telnet:") || n.startsWith("mailto:") || n.startsWith("news:") || n.startsWith("nntp:"))
        return i && i(null), e(null);
      let o;
      if ((zr || qr || jr || Xr || Hr) && (zr && (o = ["-c", "2", "-w", "3", n]), (qr || jr || Xr) && (o = ["-c", "2", "-t", "3", n]), Hr && (o = ["-c2", "-t3", n]), ae.execSafe("ping", o).then((a) => {
        let l = null;
        if (a) {
          const u = a.split(`
`).filter((f) => f.indexOf("rtt") >= 0 || f.indexOf("round-trip") >= 0 || f.indexOf("avg") >= 0).join(`
`).split("=");
          if (u.length > 1) {
            const f = u[1].split("/");
            f.length > 1 && (l = parseFloat(f[1]));
          }
        }
        i && i(l), e(l);
      })), Ll) {
        const a = ["-s", "-a", n, "56", "2"], l = "avg";
        ae.execSafe("ping", a, { timeout: 3e3 }).then((c) => {
          let u = null;
          if (c) {
            const p = c.split(`
`).filter((d) => d.indexOf(l) >= 0).join(`
`).split("=");
            if (p.length > 1) {
              const d = p[1].split("/");
              d.length > 1 && (u = parseFloat(d[1].replace(",", ".")));
            }
          }
          i && i(u), e(u);
        });
      }
      if (vl) {
        let a = null;
        try {
          const l = [n, "-n", "1"];
          ae.execSafe("ping", l, ae.execOptsWin).then((c) => {
            if (c) {
              let u = c.split(`\r
`);
              u.shift(), u.forEach(function(f) {
                if ((f.toLowerCase().match(/ms/g) || []).length === 3) {
                  let p = f.replace(/ +/g, " ").split(" ");
                  p.length > 6 && (a = parseFloat(p[p.length - 1]));
                }
              });
            }
            i && i(a), e(a);
          });
        } catch {
          i && i(a), e(a);
        }
      }
    });
  });
}
mr.inetLatency = Il;
var Ct = {};
const Ke = vo, _l = se.type() === "Windows_NT", Ye = _l ? "//./pipe/docker_engine" : "/var/run/docker.sock";
let Ol = class {
  getInfo(i) {
    try {
      let e = Ke.createConnection({ path: Ye }), n = "", s;
      e.on("connect", () => {
        e.write(`GET http:/info HTTP/1.0\r
\r
`);
      }), e.on("data", (r) => {
        n = n + r.toString();
      }), e.on("error", () => {
        e = !1, i({});
      }), e.on("end", () => {
        let r = n.indexOf(`\r
\r
`);
        n = n.substring(r + 4), e = !1;
        try {
          s = JSON.parse(n), i(s);
        } catch {
          i({});
        }
      });
    } catch {
      i({});
    }
  }
  listImages(i, e) {
    try {
      let n = Ke.createConnection({ path: Ye }), s = "", r;
      n.on("connect", () => {
        n.write("GET http:/images/json" + (i ? "?all=1" : "") + ` HTTP/1.0\r
\r
`);
      }), n.on("data", (o) => {
        s = s + o.toString();
      }), n.on("error", () => {
        n = !1, e({});
      }), n.on("end", () => {
        let o = s.indexOf(`\r
\r
`);
        s = s.substring(o + 4), n = !1;
        try {
          r = JSON.parse(s), e(r);
        } catch {
          e({});
        }
      });
    } catch {
      e({});
    }
  }
  inspectImage(i, e) {
    if (i = i || "", i)
      try {
        let n = Ke.createConnection({ path: Ye }), s = "", r;
        n.on("connect", () => {
          n.write("GET http:/images/" + i + `/json?stream=0 HTTP/1.0\r
\r
`);
        }), n.on("data", (o) => {
          s = s + o.toString();
        }), n.on("error", () => {
          n = !1, e({});
        }), n.on("end", () => {
          let o = s.indexOf(`\r
\r
`);
          s = s.substring(o + 4), n = !1;
          try {
            r = JSON.parse(s), e(r);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  listContainers(i, e) {
    try {
      let n = Ke.createConnection({ path: Ye }), s = "", r;
      n.on("connect", () => {
        n.write("GET http:/containers/json" + (i ? "?all=1" : "") + ` HTTP/1.0\r
\r
`);
      }), n.on("data", (o) => {
        s = s + o.toString();
      }), n.on("error", () => {
        n = !1, e({});
      }), n.on("end", () => {
        let o = s.indexOf(`\r
\r
`);
        s = s.substring(o + 4), n = !1;
        try {
          r = JSON.parse(s), e(r);
        } catch {
          e({});
        }
      });
    } catch {
      e({});
    }
  }
  getStats(i, e) {
    if (i = i || "", i)
      try {
        let n = Ke.createConnection({ path: Ye }), s = "", r;
        n.on("connect", () => {
          n.write("GET http:/containers/" + i + `/stats?stream=0 HTTP/1.0\r
\r
`);
        }), n.on("data", (o) => {
          s = s + o.toString();
        }), n.on("error", () => {
          n = !1, e({});
        }), n.on("end", () => {
          let o = s.indexOf(`\r
\r
`);
          s = s.substring(o + 4), n = !1;
          try {
            r = JSON.parse(s), e(r);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  getInspect(i, e) {
    if (i = i || "", i)
      try {
        let n = Ke.createConnection({ path: Ye }), s = "", r;
        n.on("connect", () => {
          n.write("GET http:/containers/" + i + `/json?stream=0 HTTP/1.0\r
\r
`);
        }), n.on("data", (o) => {
          s = s + o.toString();
        }), n.on("error", () => {
          n = !1, e({});
        }), n.on("end", () => {
          let o = s.indexOf(`\r
\r
`);
          s = s.substring(o + 4), n = !1;
          try {
            r = JSON.parse(s), e(r);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  getProcesses(i, e) {
    if (i = i || "", i)
      try {
        let n = Ke.createConnection({ path: Ye }), s = "", r;
        n.on("connect", () => {
          n.write("GET http:/containers/" + i + `/top?ps_args=-opid,ppid,pgid,vsz,time,etime,nice,ruser,user,rgroup,group,stat,rss,args HTTP/1.0\r
\r
`);
        }), n.on("data", (o) => {
          s = s + o.toString();
        }), n.on("error", () => {
          n = !1, e({});
        }), n.on("end", () => {
          let o = s.indexOf(`\r
\r
`);
          s = s.substring(o + 4), n = !1;
          try {
            r = JSON.parse(s), e(r);
          } catch {
            e({});
          }
        });
      } catch {
        e({});
      }
    else
      e({});
  }
  listVolumes(i) {
    try {
      let e = Ke.createConnection({ path: Ye }), n = "", s;
      e.on("connect", () => {
        e.write(`GET http:/volumes HTTP/1.0\r
\r
`);
      }), e.on("data", (r) => {
        n = n + r.toString();
      }), e.on("error", () => {
        e = !1, i({});
      }), e.on("end", () => {
        let r = n.indexOf(`\r
\r
`);
        n = n.substring(r + 4), e = !1;
        try {
          s = JSON.parse(n), i(s);
        } catch {
          i({});
        }
      });
    } catch {
      i({});
    }
  }
};
var Pl = Ol;
const ne = T, vt = Pl;
let Al = process.platform;
const El = Al === "win32";
let qt = {}, re, An = 0;
function Ml(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      re || (re = new vt());
      const e = {};
      re.getInfo((n) => {
        e.id = n.ID, e.containers = n.Containers, e.containersRunning = n.ContainersRunning, e.containersPaused = n.ContainersPaused, e.containersStopped = n.ContainersStopped, e.images = n.Images, e.driver = n.Driver, e.memoryLimit = n.MemoryLimit, e.swapLimit = n.SwapLimit, e.kernelMemory = n.KernelMemory, e.cpuCfsPeriod = n.CpuCfsPeriod, e.cpuCfsQuota = n.CpuCfsQuota, e.cpuShares = n.CPUShares, e.cpuSet = n.CPUSet, e.ipv4Forwarding = n.IPv4Forwarding, e.bridgeNfIptables = n.BridgeNfIptables, e.bridgeNfIp6tables = n.BridgeNfIp6tables, e.debug = n.Debug, e.nfd = n.NFd, e.oomKillDisable = n.OomKillDisable, e.ngoroutines = n.NGoroutines, e.systemTime = n.SystemTime, e.loggingDriver = n.LoggingDriver, e.cgroupDriver = n.CgroupDriver, e.nEventsListener = n.NEventsListener, e.kernelVersion = n.KernelVersion, e.operatingSystem = n.OperatingSystem, e.osType = n.OSType, e.architecture = n.Architecture, e.ncpu = n.NCPU, e.memTotal = n.MemTotal, e.dockerRootDir = n.DockerRootDir, e.httpProxy = n.HttpProxy, e.httpsProxy = n.HttpsProxy, e.noProxy = n.NoProxy, e.name = n.Name, e.labels = n.Labels, e.experimentalBuild = n.ExperimentalBuild, e.serverVersion = n.ServerVersion, e.clusterStore = n.ClusterStore, e.clusterAdvertise = n.ClusterAdvertise, e.defaultRuntime = n.DefaultRuntime, e.liveRestoreEnabled = n.LiveRestoreEnabled, e.isolation = n.Isolation, e.initBinary = n.InitBinary, e.productLicense = n.ProductLicense, t && t(e), i(e);
      });
    });
  });
}
Ct.dockerInfo = Ml;
function Tl(t, i) {
  ne.isFunction(t) && !i && (i = t, t = !1), typeof t == "string" && t === "true" && (t = !0), typeof t != "boolean" && t !== void 0 && (t = !1), t = t || !1;
  let e = [];
  return new Promise((n) => {
    process.nextTick(() => {
      re || (re = new vt());
      const s = [];
      re.listImages(t, (r) => {
        let o = {};
        try {
          o = r, o && Object.prototype.toString.call(o) === "[object Array]" && o.length > 0 ? (o.forEach(function(a) {
            a.Names && Object.prototype.toString.call(a.Names) === "[object Array]" && a.Names.length > 0 && (a.Name = a.Names[0].replace(/^\/|\/$/g, "")), s.push(Dl(a.Id.trim(), a));
          }), s.length ? Promise.all(
            s
          ).then((a) => {
            i && i(a), n(a);
          }) : (i && i(e), n(e))) : (i && i(e), n(e));
        } catch {
          i && i(e), n(e);
        }
      });
    });
  });
}
function Dl(t, i) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return e();
      const n = (ne.isPrototypePolluted() ? "" : ne.sanitizeShellString(t, !0)).trim();
      n ? (re || (re = new vt()), re.inspectImage(n.trim(), (s) => {
        try {
          e({
            id: i.Id,
            container: s.Container,
            comment: s.Comment,
            os: s.Os,
            architecture: s.Architecture,
            parent: s.Parent,
            dockerVersion: s.DockerVersion,
            size: s.Size,
            sharedSize: i.SharedSize,
            virtualSize: s.VirtualSize,
            author: s.Author,
            created: s.Created ? Math.round(new Date(s.Created).getTime() / 1e3) : 0,
            containerConfig: s.ContainerConfig ? s.ContainerConfig : {},
            graphDriver: s.GraphDriver ? s.GraphDriver : {},
            repoDigests: s.RepoDigests ? s.RepoDigests : {},
            repoTags: s.RepoTags ? s.RepoTags : {},
            config: s.Config ? s.Config : {},
            rootFS: s.RootFS ? s.RootFS : {}
          });
        } catch {
          e();
        }
      })) : e();
    });
  });
}
Ct.dockerImages = Tl;
function hr(t, i) {
  function e(s, r) {
    return s.filter((a) => a.Id && a.Id === r).length > 0;
  }
  ne.isFunction(t) && !i && (i = t, t = !1), typeof t == "string" && t === "true" && (t = !0), typeof t != "boolean" && t !== void 0 && (t = !1), t = t || !1;
  let n = [];
  return new Promise((s) => {
    process.nextTick(() => {
      re || (re = new vt());
      const r = [];
      re.listContainers(t, (o) => {
        let a = {};
        try {
          if (a = o, a && Object.prototype.toString.call(a) === "[object Array]" && a.length > 0) {
            for (let l in qt)
              ({}).hasOwnProperty.call(qt, l) && (e(a, l) || delete qt[l]);
            a.forEach(function(l) {
              l.Names && Object.prototype.toString.call(l.Names) === "[object Array]" && l.Names.length > 0 && (l.Name = l.Names[0].replace(/^\/|\/$/g, "")), r.push(Bl(l.Id.trim(), l));
            }), r.length ? Promise.all(
              r
            ).then((l) => {
              i && i(l), s(l);
            }) : (i && i(n), s(n));
          } else
            i && i(n), s(n);
        } catch {
          for (let c in qt)
            ({}).hasOwnProperty.call(qt, c) && (e(a, c) || delete qt[c]);
          i && i(n), s(n);
        }
      });
    });
  });
}
function Bl(t, i) {
  return new Promise((e) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return e();
      const n = (ne.isPrototypePolluted() ? "" : ne.sanitizeShellString(t, !0)).trim();
      n ? (re || (re = new vt()), re.getInspect(n.trim(), (s) => {
        try {
          e({
            id: i.Id,
            name: i.Name,
            image: i.Image,
            imageID: i.ImageID,
            command: i.Command,
            created: i.Created,
            started: s.State && s.State.StartedAt ? Math.round(new Date(s.State.StartedAt).getTime() / 1e3) : 0,
            finished: s.State && s.State.FinishedAt && !s.State.FinishedAt.startsWith("0001-01-01") ? Math.round(new Date(s.State.FinishedAt).getTime() / 1e3) : 0,
            createdAt: s.Created ? s.Created : "",
            startedAt: s.State && s.State.StartedAt ? s.State.StartedAt : "",
            finishedAt: s.State && s.State.FinishedAt && !s.State.FinishedAt.startsWith("0001-01-01") ? s.State.FinishedAt : "",
            state: i.State,
            restartCount: s.RestartCount || 0,
            platform: s.Platform || "",
            driver: s.Driver || "",
            ports: i.Ports,
            mounts: i.Mounts
            // hostconfig: payload.HostConfig,
            // network: payload.NetworkSettings
          });
        } catch {
          e();
        }
      })) : e();
    });
  });
}
Ct.dockerContainers = hr;
function Vl(t, i) {
  if (El) {
    let e = ne.nanoSeconds(), n = 0;
    if (An > 0) {
      let s = e - An, r = t.cpu_usage.total_usage - i.cpu_usage.total_usage;
      s > 0 && (n = 100 * r / s);
    }
    return An = e, n;
  } else {
    let e = 0, n = t.cpu_usage.total_usage - i.cpu_usage.total_usage, s = t.system_cpu_usage - i.system_cpu_usage;
    return s > 0 && n > 0 && (i.online_cpus ? e = n / s * i.online_cpus * 100 : e = n / s * t.cpu_usage.percpu_usage.length * 100), e;
  }
}
function kl(t) {
  let i, e;
  for (let n in t) {
    if (!{}.hasOwnProperty.call(t, n))
      continue;
    let s = t[n];
    i = +s.rx_bytes, e = +s.tx_bytes;
  }
  return {
    rx: i,
    wx: e
  };
}
function Nl(t) {
  let i = {
    r: 0,
    w: 0
  };
  return t && t.io_service_bytes_recursive && Object.prototype.toString.call(t.io_service_bytes_recursive) === "[object Array]" && t.io_service_bytes_recursive.length > 0 && t.io_service_bytes_recursive.forEach(function(e) {
    e.op && e.op.toLowerCase() === "read" && e.value && (i.r += e.value), e.op && e.op.toLowerCase() === "write" && e.value && (i.w += e.value);
  }), i;
}
function gr(t, i) {
  let e = [];
  return new Promise((n) => {
    process.nextTick(() => {
      if (ne.isFunction(t) && !i)
        i = t, e = ["*"];
      else {
        if (t = t || "*", typeof t != "string")
          return i && i([]), n([]);
        let o = "";
        try {
          o.__proto__.toLowerCase = ne.stringToLower, o.__proto__.replace = ne.stringReplace, o.__proto__.toString = ne.stringToString, o.__proto__.substr = ne.stringSubstr, o.__proto__.substring = ne.stringSubstring, o.__proto__.trim = ne.stringTrim, o.__proto__.startsWith = ne.stringStartWith;
        } catch {
          Object.setPrototypeOf(o, ne.stringObj);
        }
        if (o = t, o = o.trim(), o !== "*") {
          o = "";
          const a = (ne.isPrototypePolluted() ? "" : ne.sanitizeShellString(t, !0)).trim(), l = ne.mathMin(a.length, 2e3);
          for (let c = 0; c <= l; c++)
            if (a[c] !== void 0) {
              a[c].__proto__.toLowerCase = ne.stringToLower;
              const u = a[c].toLowerCase();
              u && u[0] && !u[1] && (o = o + u[0]);
            }
        }
        o = o.trim().toLowerCase().replace(/,+/g, "|"), e = o.split("|");
      }
      const s = [], r = [];
      if (e.length && e[0].trim() === "*")
        e = [], hr().then((o) => {
          for (let a of o)
            e.push(a.id.substring(0, 12));
          e.length ? gr(e.join(",")).then((a) => {
            i && i(a), n(a);
          }) : (i && i(s), n(s));
        });
      else {
        for (let o of e)
          r.push(Fl(o.trim()));
        r.length ? Promise.all(
          r
        ).then((o) => {
          i && i(o), n(o);
        }) : (i && i(s), n(s));
      }
    });
  });
}
function Fl(t) {
  t = t || "";
  let i = {
    id: t,
    memUsage: 0,
    memLimit: 0,
    memPercent: 0,
    cpuPercent: 0,
    pids: 0,
    netIO: {
      rx: 0,
      wx: 0
    },
    blockIO: {
      r: 0,
      w: 0
    },
    restartCount: 0,
    cpuStats: {},
    precpuStats: {},
    memoryStats: {},
    networks: {}
  };
  return new Promise((e) => {
    process.nextTick(() => {
      t ? (re || (re = new vt()), re.getInspect(t, (n) => {
        try {
          re.getStats(t, (s) => {
            try {
              let r = s;
              r.message || (s.id && (i.id = s.id), i.memUsage = r.memory_stats && r.memory_stats.usage ? r.memory_stats.usage : 0, i.memLimit = r.memory_stats && r.memory_stats.limit ? r.memory_stats.limit : 0, i.memPercent = r.memory_stats && r.memory_stats.usage && r.memory_stats.limit ? r.memory_stats.usage / r.memory_stats.limit * 100 : 0, i.cpuPercent = r.cpu_stats && r.precpu_stats ? Vl(r.cpu_stats, r.precpu_stats) : 0, i.pids = r.pids_stats && r.pids_stats.current ? r.pids_stats.current : 0, i.restartCount = n.RestartCount ? n.RestartCount : 0, r.networks && (i.netIO = kl(r.networks)), r.blkio_stats && (i.blockIO = Nl(r.blkio_stats)), i.cpuStats = r.cpu_stats ? r.cpu_stats : {}, i.precpuStats = r.precpu_stats ? r.precpu_stats : {}, i.memoryStats = r.memory_stats ? r.memory_stats : {}, i.networks = r.networks ? r.networks : {});
            } catch {
              ne.noop();
            }
            e(i);
          });
        } catch {
          ne.noop();
        }
      })) : e(i);
    });
  });
}
Ct.dockerContainerStats = gr;
function Js(t, i) {
  let e = [];
  return new Promise((n) => {
    process.nextTick(() => {
      if (t = t || "", typeof t != "string")
        return n(e);
      const s = (ne.isPrototypePolluted() ? "" : ne.sanitizeShellString(t, !0)).trim();
      s ? (re || (re = new vt()), re.getProcesses(s, (r) => {
        try {
          if (r && r.Titles && r.Processes) {
            let o = r.Titles.map(function(C) {
              return C.toUpperCase();
            }), a = o.indexOf("PID"), l = o.indexOf("PPID"), c = o.indexOf("PGID"), u = o.indexOf("VSZ"), f = o.indexOf("TIME"), p = o.indexOf("ELAPSED"), d = o.indexOf("NI"), m = o.indexOf("RUSER"), h = o.indexOf("USER"), y = o.indexOf("RGROUP"), g = o.indexOf("GROUP"), x = o.indexOf("STAT"), w = o.indexOf("RSS"), S = o.indexOf("COMMAND");
            r.Processes.forEach((C) => {
              e.push({
                pidHost: a >= 0 ? C[a] : "",
                ppid: l >= 0 ? C[l] : "",
                pgid: c >= 0 ? C[c] : "",
                user: h >= 0 ? C[h] : "",
                ruser: m >= 0 ? C[m] : "",
                group: g >= 0 ? C[g] : "",
                rgroup: y >= 0 ? C[y] : "",
                stat: x >= 0 ? C[x] : "",
                time: f >= 0 ? C[f] : "",
                elapsed: p >= 0 ? C[p] : "",
                nice: d >= 0 ? C[d] : "",
                rss: w >= 0 ? C[w] : "",
                vsz: u >= 0 ? C[u] : "",
                command: S >= 0 ? C[S] : ""
              });
            });
          }
        } catch {
          ne.noop();
        }
        i && i(e), n(e);
      })) : (i && i(e), n(e));
    });
  });
}
Ct.dockerContainerProcesses = Js;
function Wl(t) {
  let i = [];
  return new Promise((e) => {
    process.nextTick(() => {
      re || (re = new vt()), re.listVolumes((n) => {
        let s = {};
        try {
          s = n, s && s.Volumes && Object.prototype.toString.call(s.Volumes) === "[object Array]" && s.Volumes.length > 0 ? (s.Volumes.forEach(function(r) {
            i.push({
              name: r.Name,
              driver: r.Driver,
              labels: r.Labels,
              mountpoint: r.Mountpoint,
              options: r.Options,
              scope: r.Scope,
              created: r.CreatedAt ? Math.round(new Date(r.CreatedAt).getTime() / 1e3) : 0
            });
          }), t && t(i), e(i)) : (t && t(i), e(i));
        } catch {
          t && t(i), e(i);
        }
      });
    });
  });
}
Ct.dockerVolumes = Wl;
function Rl(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      hr(!0).then((e) => {
        if (e && Object.prototype.toString.call(e) === "[object Array]" && e.length > 0) {
          let n = e.length;
          e.forEach(function(s) {
            gr(s.id).then((r) => {
              s.memUsage = r[0].memUsage, s.memLimit = r[0].memLimit, s.memPercent = r[0].memPercent, s.cpuPercent = r[0].cpuPercent, s.pids = r[0].pids, s.netIO = r[0].netIO, s.blockIO = r[0].blockIO, s.cpuStats = r[0].cpuStats, s.precpuStats = r[0].precpuStats, s.memoryStats = r[0].memoryStats, s.networks = r[0].networks, Js(s.id).then((o) => {
                s.processes = o, n -= 1, n === 0 && (t && t(e), i(e));
              });
            });
          });
        } else
          t && t(e), i(e);
      });
    });
  });
}
Ct.dockerAll = Rl;
var Qs = {};
const En = se, Gl = te.exec, J = T;
function Ul(t) {
  let i = [];
  return new Promise((e) => {
    process.nextTick(() => {
      try {
        Gl(J.getVboxmanage() + " list vms --long", function(n, s) {
          let r = (En.EOL + s.toString()).split(En.EOL + "Name:");
          r.shift(), r.forEach((o) => {
            const a = ("Name:" + o).split(En.EOL), l = J.getValue(a, "State"), c = l.startsWith("running"), u = c ? l.replace("running (since ", "").replace(")", "").trim() : "";
            let f = 0;
            try {
              if (c) {
                const m = new Date(u), h = m.getTimezoneOffset();
                f = Math.round((Date.now() - Date.parse(m)) / 1e3) + h * 60;
              }
            } catch {
              J.noop();
            }
            const p = c ? "" : l.replace("powered off (since", "").replace(")", "").trim();
            let d = 0;
            try {
              if (!c) {
                const m = new Date(p), h = m.getTimezoneOffset();
                d = Math.round((Date.now() - Date.parse(m)) / 1e3) + h * 60;
              }
            } catch {
              J.noop();
            }
            i.push({
              id: J.getValue(a, "UUID"),
              name: J.getValue(a, "Name"),
              running: c,
              started: u,
              runningSince: f,
              stopped: p,
              stoppedSince: d,
              guestOS: J.getValue(a, "Guest OS"),
              hardwareUUID: J.getValue(a, "Hardware UUID"),
              memory: parseInt(J.getValue(a, "Memory size", "     "), 10),
              vram: parseInt(J.getValue(a, "VRAM size"), 10),
              cpus: parseInt(J.getValue(a, "Number of CPUs"), 10),
              cpuExepCap: J.getValue(a, "CPU exec cap"),
              cpuProfile: J.getValue(a, "CPUProfile"),
              chipset: J.getValue(a, "Chipset"),
              firmware: J.getValue(a, "Firmware"),
              pageFusion: J.getValue(a, "Page Fusion") === "enabled",
              configFile: J.getValue(a, "Config file"),
              snapshotFolder: J.getValue(a, "Snapshot folder"),
              logFolder: J.getValue(a, "Log folder"),
              hpet: J.getValue(a, "HPET") === "enabled",
              pae: J.getValue(a, "PAE") === "enabled",
              longMode: J.getValue(a, "Long Mode") === "enabled",
              tripleFaultReset: J.getValue(a, "Triple Fault Reset") === "enabled",
              apic: J.getValue(a, "APIC") === "enabled",
              x2Apic: J.getValue(a, "X2APIC") === "enabled",
              acpi: J.getValue(a, "ACPI") === "enabled",
              ioApic: J.getValue(a, "IOAPIC") === "enabled",
              biosApicMode: J.getValue(a, "BIOS APIC mode"),
              bootMenuMode: J.getValue(a, "Boot menu mode"),
              bootDevice1: J.getValue(a, "Boot Device 1"),
              bootDevice2: J.getValue(a, "Boot Device 2"),
              bootDevice3: J.getValue(a, "Boot Device 3"),
              bootDevice4: J.getValue(a, "Boot Device 4"),
              timeOffset: J.getValue(a, "Time offset"),
              rtc: J.getValue(a, "RTC")
            });
          }), t && t(i), e(i);
        });
      } catch {
        t && t(i), e(i);
      }
    });
  });
}
Qs.vboxInfo = Ul;
var Zs = {};
const Mn = te.exec, de = T;
let gt = process.platform;
const Kr = gt === "linux" || gt === "android", $l = gt === "darwin", zl = gt === "win32", Hl = gt === "freebsd", ql = gt === "openbsd", jl = gt === "netbsd", Xl = gt === "sunos", Yr = {
  1: "Other",
  2: "Unknown",
  3: "Idle",
  4: "Printing",
  5: "Warmup",
  6: "Stopped Printing",
  7: "Offline"
};
function Kl(t) {
  const i = {};
  if (t && t.length && t[0].indexOf(" CUPS v") > 0) {
    const e = t[0].split(" CUPS v");
    i.cupsVersion = e[1];
  }
  return i;
}
function Yl(t) {
  const i = {}, e = de.getValue(t, "PrinterId", " ");
  return i.id = e ? parseInt(e, 10) : null, i.name = de.getValue(t, "Info", " "), i.model = t.length > 0 && t[0] ? t[0].split(" ")[0] : "", i.uri = de.getValue(t, "DeviceURI", " "), i.uuid = de.getValue(t, "UUID", " "), i.status = de.getValue(t, "State", " "), i.local = de.getValue(t, "Location", " ").toLowerCase().startsWith("local"), i.default = null, i.shared = de.getValue(t, "Shared", " ").toLowerCase().startsWith("yes"), i;
}
function Jl(t, i) {
  const e = {};
  return e.id = i, e.name = de.getValue(t, "Description", ":", !0), e.model = t.length > 0 && t[0] ? t[0].split(" ")[0] : "", e.uri = null, e.uuid = null, e.status = t.length > 0 && t[0] ? t[0].indexOf(" idle") > 0 ? "idle" : t[0].indexOf(" printing") > 0 ? "printing" : "unknown" : null, e.local = de.getValue(t, "Location", ":", !0).toLowerCase().startsWith("local"), e.default = null, e.shared = de.getValue(t, "Shared", " ").toLowerCase().startsWith("yes"), e;
}
function Ql(t, i) {
  const e = {}, n = t.uri.split("/");
  return e.id = i, e.name = t._name, e.model = n.length ? n[n.length - 1] : "", e.uri = t.uri, e.uuid = null, e.status = t.status, e.local = t.printserver === "local", e.default = t.default === "yes", e.shared = t.shared === "yes", e;
}
function Zl(t, i) {
  const e = {}, n = parseInt(de.getValue(t, "PrinterStatus", ":"), 10);
  return e.id = i, e.name = de.getValue(t, "name", ":"), e.model = de.getValue(t, "DriverName", ":"), e.uri = null, e.uuid = null, e.status = Yr[n] ? Yr[n] : null, e.local = de.getValue(t, "Local", ":").toUpperCase() === "TRUE", e.default = de.getValue(t, "Default", ":").toUpperCase() === "TRUE", e.shared = de.getValue(t, "Shared", ":").toUpperCase() === "TRUE", e;
}
function e0(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      if (Kr || Hl || ql || jl) {
        let n = "cat /etc/cups/printers.conf 2>/dev/null";
        Mn(n, function(s, r) {
          if (!s) {
            const o = r.toString().split("<Printer "), a = Kl(o[0]);
            for (let l = 1; l < o.length; l++) {
              const c = Yl(o[l].split(`
`));
              c.name && (c.engine = "CUPS", c.engineVersion = a.cupsVersion, e.push(c));
            }
          }
          e.length === 0 && Kr ? (n = "export LC_ALL=C; lpstat -lp 2>/dev/null; unset LC_ALL", Mn(n, function(o, a) {
            const l = (`
` + a.toString()).split(`
printer `);
            for (let c = 1; c < l.length; c++) {
              const u = Jl(l[c].split(`
`), c);
              e.push(u);
            }
          }), t && t(e), i(e)) : (t && t(e), i(e));
        });
      }
      $l && Mn("system_profiler SPPrintersDataType -json", function(s, r) {
        if (!s)
          try {
            const o = JSON.parse(r.toString());
            if (o.SPPrintersDataType && o.SPPrintersDataType.length)
              for (let a = 0; a < o.SPPrintersDataType.length; a++) {
                const l = Ql(o.SPPrintersDataType[a], a);
                e.push(l);
              }
          } catch {
            de.noop();
          }
        t && t(e), i(e);
      }), zl && de.powerShell("Get-CimInstance Win32_Printer | select PrinterStatus,Name,DriverName,Local,Default,Shared | fl").then((n, s) => {
        if (!s) {
          const r = n.toString().split(/\n\s*\n/);
          for (let o = 0; o < r.length; o++) {
            const a = Zl(r[o].split(`
`), o);
            (a.name || a.model) && e.push(a);
          }
        }
        t && t(e), i(e);
      }), Xl && i(null);
    });
  });
}
Zs.printer = e0;
var eo = {};
const Jr = te.exec, Pe = T;
let yt = process.platform;
const t0 = yt === "linux" || yt === "android", i0 = yt === "darwin", n0 = yt === "win32", r0 = yt === "freebsd", s0 = yt === "openbsd", o0 = yt === "netbsd", a0 = yt === "sunos";
function c0(t, i) {
  let e = t;
  const n = (i + " " + t).toLowerCase();
  return n.indexOf("camera") >= 0 ? e = "Camera" : n.indexOf("hub") >= 0 ? e = "Hub" : n.indexOf("keybrd") >= 0 || n.indexOf("keyboard") >= 0 ? e = "Keyboard" : n.indexOf("mouse") >= 0 ? e = "Mouse" : n.indexOf("stora") >= 0 ? e = "Storage" : n.indexOf("microp") >= 0 ? e = "Microphone" : (n.indexOf("headset") >= 0 || n.indexOf("audio") >= 0) && (e = "Audio"), e;
}
function l0(t) {
  const i = {}, e = t.split(`
`);
  if (e && e.length && e[0].indexOf("Device") >= 0) {
    const x = e[0].split(" ");
    i.bus = parseInt(x[0], 10), x[2] ? i.deviceId = parseInt(x[2], 10) : i.deviceId = null;
  } else
    i.bus = null, i.deviceId = null;
  const n = Pe.getValue(e, "idVendor", " ", !0).trim();
  let s = n.split(" ");
  s.shift();
  const r = s.join(" "), o = Pe.getValue(e, "idProduct", " ", !0).trim();
  let a = o.split(" ");
  a.shift();
  const l = a.join(" ");
  let u = Pe.getValue(e, "bInterfaceClass", " ", !0).trim().split(" ");
  u.shift();
  const f = u.join(" ");
  let d = Pe.getValue(e, "iManufacturer", " ", !0).trim().split(" ");
  d.shift();
  const m = d.join(" ");
  let y = Pe.getValue(e, "iSerial", " ", !0).trim().split(" ");
  y.shift();
  const g = y.join(" ");
  return i.id = (n.startsWith("0x") ? n.split(" ")[0].substr(2, 10) : "") + ":" + (o.startsWith("0x") ? o.split(" ")[0].substr(2, 10) : ""), i.name = l, i.type = c0(f, l), i.removable = null, i.vendor = r, i.manufacturer = m, i.maxPower = Pe.getValue(e, "MaxPower", " ", !0), i.serialNumber = g, i;
}
function u0(t) {
  let i = "";
  return t.indexOf("camera") >= 0 ? i = "Camera" : t.indexOf("touch bar") >= 0 ? i = "Touch Bar" : t.indexOf("controller") >= 0 ? i = "Controller" : t.indexOf("headset") >= 0 ? i = "Audio" : t.indexOf("keyboard") >= 0 ? i = "Keyboard" : t.indexOf("trackpad") >= 0 ? i = "Trackpad" : t.indexOf("sensor") >= 0 ? i = "Sensor" : t.indexOf("bthusb") >= 0 || t.indexOf("bth") >= 0 || t.indexOf("rfcomm") >= 0 ? i = "Bluetooth" : t.indexOf("usbhub") >= 0 || t.indexOf(" hub") >= 0 ? i = "Hub" : t.indexOf("mouse") >= 0 ? i = "Mouse" : t.indexOf("microp") >= 0 ? i = "Microphone" : t.indexOf("removable") >= 0 && (i = "Storage"), i;
}
function p0(t, i) {
  const e = {};
  e.id = i, t = t.replace(/ \|/g, ""), t = t.trim();
  let n = t.split(`
`);
  n.shift();
  try {
    for (let o = 0; o < n.length; o++) {
      n[o] = n[o].trim(), n[o] = n[o].replace(/=/g, ":"), n[o] !== "{" && n[o] !== "}" && n[o + 1] && n[o + 1].trim() !== "}" && (n[o] = n[o] + ","), n[o] = n[o].replace(":Yes,", ':"Yes",'), n[o] = n[o].replace(": Yes,", ': "Yes",'), n[o] = n[o].replace(": Yes", ': "Yes"'), n[o] = n[o].replace(":No,", ':"No",'), n[o] = n[o].replace(": No,", ': "No",'), n[o] = n[o].replace(": No", ': "No"'), n[o] = n[o].replace("((", "").replace("))", "");
      const a = /<(\w+)>/.exec(n[o]);
      if (a) {
        const l = a[0];
        n[o] = n[o].replace(l, `"${l}"`);
      }
    }
    const s = JSON.parse(n.join(`
`)), r = (s["Built-In"] ? s["Built-In"].toLowerCase() !== "yes" : !0) && (s["non-removable"] ? s["non-removable"].toLowerCase() === "no" : !0);
    return e.bus = null, e.deviceId = null, e.id = s["USB Address"] || null, e.name = s.kUSBProductString || s["USB Product Name"] || null, e.type = u0((s.kUSBProductString || s["USB Product Name"] || "").toLowerCase() + (r ? " removable" : "")), e.removable = s["non-removable"] ? s["non-removable"].toLowerCase() || !1 : !0, e.vendor = s.kUSBVendorString || s["USB Vendor Name"] || null, e.manufacturer = s.kUSBVendorString || s["USB Vendor Name"] || null, e.maxPower = null, e.serialNumber = s.kUSBSerialNumberString || null, e.name ? e : null;
  } catch {
    return null;
  }
}
function f0(t, i) {
  let e = "";
  return i.indexOf("storage") >= 0 || i.indexOf("speicher") >= 0 ? e = "Storage" : t.indexOf("usbhub") >= 0 ? e = "Hub" : t.indexOf("storage") >= 0 ? e = "Storage" : t.indexOf("usbcontroller") >= 0 ? e = "Controller" : t.indexOf("keyboard") >= 0 ? e = "Keyboard" : t.indexOf("pointing") >= 0 ? e = "Mouse" : t.indexOf("microp") >= 0 ? e = "Microphone" : t.indexOf("disk") >= 0 && (e = "Storage"), e;
}
function d0(t, i) {
  const e = f0(Pe.getValue(t, "CreationClassName", ":").toLowerCase(), Pe.getValue(t, "name", ":").toLowerCase());
  if (e) {
    const n = {};
    return n.bus = null, n.deviceId = Pe.getValue(t, "deviceid", ":"), n.id = i, n.name = Pe.getValue(t, "name", ":"), n.type = e, n.removable = null, n.vendor = null, n.manufacturer = Pe.getValue(t, "Manufacturer", ":"), n.maxPower = null, n.serialNumber = null, n;
  } else
    return null;
}
function m0(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      t0 && Jr("export LC_ALL=C; lsusb -v 2>/dev/null; unset LC_ALL", { maxBuffer: 1024 * 1024 * 128 }, function(s, r) {
        if (!s) {
          const o = (`

` + r.toString()).split(`

Bus `);
          for (let a = 1; a < o.length; a++) {
            const l = l0(o[a]);
            e.push(l);
          }
        }
        t && t(e), i(e);
      }), i0 && Jr("ioreg -p IOUSB -c AppleUSBRootHubDevice -w0 -l", { maxBuffer: 1024 * 1024 * 128 }, function(s, r) {
        if (!s) {
          const o = r.toString().split(" +-o ");
          for (let a = 1; a < o.length; a++) {
            const l = p0(o[a]);
            l && e.push(l);
          }
          t && t(e), i(e);
        }
        t && t(e), i(e);
      }), n0 && Pe.powerShell('Get-CimInstance CIM_LogicalDevice | where { $_.Description -match "USB"} | select Name,CreationClassName,DeviceId,Manufacturer | fl').then((n, s) => {
        if (!s) {
          const r = n.toString().split(/\n\s*\n/);
          for (let o = 0; o < r.length; o++) {
            const a = d0(r[o].split(`
`), o);
            a && e.filter((l) => l.deviceId === a.deviceId).length === 0 && e.push(a);
          }
        }
        t && t(e), i(e);
      }), (a0 || r0 || s0 || o0) && i(null);
    });
  });
}
eo.usb = m0;
var to = {};
const Qr = te.exec, h0 = te.execSync, ge = T;
let xt = process.platform;
const g0 = xt === "linux" || xt === "android", y0 = xt === "darwin", x0 = xt === "win32", S0 = xt === "freebsd", w0 = xt === "openbsd", C0 = xt === "netbsd", v0 = xt === "sunos";
function yr(t, i, e) {
  t = t.toLowerCase();
  let n = "";
  return t.indexOf("input") >= 0 && (n = "Microphone"), t.indexOf("display audio") >= 0 && (n = "Speaker"), t.indexOf("speak") >= 0 && (n = "Speaker"), t.indexOf("laut") >= 0 && (n = "Speaker"), t.indexOf("loud") >= 0 && (n = "Speaker"), t.indexOf("head") >= 0 && (n = "Headset"), t.indexOf("mic") >= 0 && (n = "Microphone"), t.indexOf("mikr") >= 0 && (n = "Microphone"), t.indexOf("phone") >= 0 && (n = "Phone"), t.indexOf("controll") >= 0 && (n = "Controller"), t.indexOf("line o") >= 0 && (n = "Line Out"), t.indexOf("digital o") >= 0 && (n = "Digital Out"), t.indexOf("smart sound technology") >= 0 && (n = "Digital Signal Processor"), t.indexOf("high definition audio") >= 0 && (n = "Sound Driver"), !n && e ? n = "Speaker" : !n && i && (n = "Microphone"), n;
}
function L0() {
  let t = "lspci -v 2>/dev/null", i = [];
  try {
    return h0(t, ge.execOptsLinux).toString().split(`

`).forEach((n) => {
      const s = n.split(`
`);
      if (s && s.length && s[0].toLowerCase().indexOf("audio") >= 0) {
        const r = {};
        r.slotId = s[0].split(" ")[0], r.driver = ge.getValue(s, "Kernel driver in use", ":", !0) || ge.getValue(s, "Kernel modules", ":", !0), i.push(r);
      }
    }), i;
  } catch {
    return i;
  }
}
function b0(t, i) {
  const e = {}, n = ge.getValue(t, "Slot"), s = i.filter(function(r) {
    return r.slotId === n;
  });
  return e.id = n, e.name = ge.getValue(t, "SDevice"), e.manufacturer = ge.getValue(t, "SVendor"), e.revision = ge.getValue(t, "Rev"), e.driver = s && s.length === 1 && s[0].driver ? s[0].driver : "", e.default = null, e.channel = "PCIe", e.type = yr(e.name, null, null), e.in = null, e.out = null, e.status = "online", e;
}
function I0(t) {
  let i = "";
  return t.indexOf("builtin") >= 0 && (i = "Built-In"), t.indexOf("extern") >= 0 && (i = "Audio-Jack"), t.indexOf("hdmi") >= 0 && (i = "HDMI"), t.indexOf("displayport") >= 0 && (i = "Display-Port"), t.indexOf("usb") >= 0 && (i = "USB"), t.indexOf("pci") >= 0 && (i = "PCIe"), i;
}
function _0(t, i) {
  const e = {}, n = ((t.coreaudio_device_transport || "") + " " + (t._name || "")).toLowerCase();
  return e.id = i, e.name = t._name, e.manufacturer = t.coreaudio_device_manufacturer, e.revision = null, e.driver = null, e.default = !!t.coreaudio_default_audio_input_device || !!t.coreaudio_default_audio_output_device, e.channel = I0(n), e.type = yr(e.name, !!t.coreaudio_device_input, !!t.coreaudio_device_output), e.in = !!t.coreaudio_device_input, e.out = !!t.coreaudio_device_output, e.status = "online", e;
}
function O0(t) {
  const i = {}, e = ge.getValue(t, "StatusInfo", ":");
  return i.id = ge.getValue(t, "DeviceID", ":"), i.name = ge.getValue(t, "name", ":"), i.manufacturer = ge.getValue(t, "manufacturer", ":"), i.revision = null, i.driver = null, i.default = null, i.channel = null, i.type = yr(i.name, null, null), i.in = null, i.out = null, i.status = e, i;
}
function P0(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      (g0 || S0 || w0 || C0) && Qr("lspci -vmm 2>/dev/null", function(s, r) {
        if (!s) {
          const o = L0();
          r.toString().split(`

`).forEach((l) => {
            const c = l.split(`
`);
            if (ge.getValue(c, "class", ":", !0).toLowerCase().indexOf("audio") >= 0) {
              const u = b0(c, o);
              e.push(u);
            }
          });
        }
        t && t(e), i(e);
      }), y0 && Qr("system_profiler SPAudioDataType -json", function(s, r) {
        if (!s)
          try {
            const o = JSON.parse(r.toString());
            if (o.SPAudioDataType && o.SPAudioDataType.length && o.SPAudioDataType[0] && o.SPAudioDataType[0]._items && o.SPAudioDataType[0]._items.length)
              for (let a = 0; a < o.SPAudioDataType[0]._items.length; a++) {
                const l = _0(o.SPAudioDataType[0]._items[a], a);
                e.push(l);
              }
          } catch {
            ge.noop();
          }
        t && t(e), i(e);
      }), x0 && ge.powerShell("Get-CimInstance Win32_SoundDevice | select DeviceID,StatusInfo,Name,Manufacturer | fl").then((n, s) => {
        s || n.toString().split(/\n\s*\n/).forEach((o) => {
          const a = o.split(`
`);
          ge.getValue(a, "name", ":") && e.push(O0(a));
        }), t && t(e), i(e);
      }), v0 && i(null);
    });
  });
}
to.audio = P0;
var io = {}, A0 = {
  0: "Ericsson Technology Licensing",
  1: "Nokia Mobile Phones",
  2: "Intel Corp.",
  3: "IBM Corp.",
  4: "Toshiba Corp.",
  5: "3Com",
  6: "Microsoft",
  7: "Lucent",
  8: "Motorola",
  9: "Infineon Technologies AG",
  10: "Cambridge Silicon Radio",
  11: "Silicon Wave",
  12: "Digianswer A/S",
  13: "Texas Instruments Inc.",
  14: "Ceva, Inc. (formerly Parthus Technologies, Inc.)",
  15: "Broadcom Corporation",
  16: "Mitel Semiconductor",
  17: "Widcomm, Inc",
  18: "Zeevo, Inc.",
  19: "Atmel Corporation",
  20: "Mitsubishi Electric Corporation",
  21: "RTX Telecom A/S",
  22: "KC Technology Inc.",
  23: "NewLogic",
  24: "Transilica, Inc.",
  25: "Rohde & Schwarz GmbH & Co. KG",
  26: "TTPCom Limited",
  27: "Signia Technologies, Inc.",
  28: "Conexant Systems Inc.",
  29: "Qualcomm",
  30: "Inventel",
  31: "AVM Berlin",
  32: "BandSpeed, Inc.",
  33: "Mansella Ltd",
  34: "NEC Corporation",
  35: "WavePlus Technology Co., Ltd.",
  36: "Alcatel",
  37: "NXP Semiconductors (formerly Philips Semiconductors)",
  38: "C Technologies",
  39: "Open Interface",
  40: "R F Micro Devices",
  41: "Hitachi Ltd",
  42: "Symbol Technologies, Inc.",
  43: "Tenovis",
  44: "Macronix International Co. Ltd.",
  45: "GCT Semiconductor",
  46: "Norwood Systems",
  47: "MewTel Technology Inc.",
  48: "ST Microelectronics",
  49: "Synopsis",
  50: "Red-M (Communications) Ltd",
  51: "Commil Ltd",
  52: "Computer Access Technology Corporation (CATC)",
  53: "Eclipse (HQ Espana) S.L.",
  54: "Renesas Electronics Corporation",
  55: "Mobilian Corporation",
  56: "Terax",
  57: "Integrated System Solution Corp.",
  58: "Matsushita Electric Industrial Co., Ltd.",
  59: "Gennum Corporation",
  60: "BlackBerry Limited (formerly Research In Motion)",
  61: "IPextreme, Inc.",
  62: "Systems and Chips, Inc.",
  63: "Bluetooth SIG, Inc.",
  64: "Seiko Epson Corporation",
  65: "Integrated Silicon Solution Taiwan, Inc.",
  66: "CONWISE Technology Corporation Ltd",
  67: "PARROT SA",
  68: "Socket Mobile",
  69: "Atheros Communications, Inc.",
  70: "MediaTek, Inc.",
  71: "Bluegiga",
  72: "Marvell Technology Group Ltd.",
  73: "3DSP Corporation",
  74: "Accel Semiconductor Ltd.",
  75: "Continental Automotive Systems",
  76: "Apple, Inc.",
  77: "Staccato Communications, Inc.",
  78: "Avago Technologies",
  79: "APT Licensing Ltd.",
  80: "SiRF Technology",
  81: "Tzero Technologies, Inc.",
  82: "J&M Corporation",
  83: "Free2move AB",
  84: "3DiJoy Corporation",
  85: "Plantronics, Inc.",
  86: "Sony Ericsson Mobile Communications",
  87: "Harman International Industries, Inc.",
  88: "Vizio, Inc.",
  89: "Nordic Semiconductor ASA",
  90: "EM Microelectronic-Marin SA",
  91: "Ralink Technology Corporation",
  92: "Belkin International, Inc.",
  93: "Realtek Semiconductor Corporation",
  94: "Stonestreet One, LLC",
  95: "Wicentric, Inc.",
  96: "RivieraWaves S.A.S",
  97: "RDA Microelectronics",
  98: "Gibson Guitars",
  99: "MiCommand Inc.",
  100: "Band XI International, LLC",
  101: "Hewlett-Packard Company",
  102: "9Solutions Oy",
  103: "GN Netcom A/S",
  104: "General Motors",
  105: "A&D Engineering, Inc.",
  106: "MindTree Ltd.",
  107: "Polar Electro OY",
  108: "Beautiful Enterprise Co., Ltd.",
  109: "BriarTek, Inc.",
  110: "Summit Data Communications, Inc.",
  111: "Sound ID",
  112: "Monster, LLC",
  113: "connectBlue AB",
  114: "ShangHai Super Smart Electronics Co. Ltd.",
  115: "Group Sense Ltd.",
  116: "Zomm, LLC",
  117: "Samsung Electronics Co. Ltd.",
  118: "Creative Technology Ltd.",
  119: "Laird Technologies",
  120: "Nike, Inc.",
  121: "lesswire AG",
  122: "MStar Semiconductor, Inc.",
  123: "Hanlynn Technologies",
  124: "A & R Cambridge",
  125: "Seers Technology Co. Ltd",
  126: "Sports Tracking Technologies Ltd.",
  127: "Autonet Mobile",
  128: "DeLorme Publishing Company, Inc.",
  129: "WuXi Vimicro",
  130: "Sennheiser Communications A/S",
  131: "TimeKeeping Systems, Inc.",
  132: "Ludus Helsinki Ltd.",
  133: "BlueRadios, Inc.",
  134: "equinox AG",
  135: "Garmin International, Inc.",
  136: "Ecotest",
  137: "GN ReSound A/S",
  138: "Jawbone",
  139: "Topcorn Positioning Systems, LLC",
  140: "Gimbal Inc. (formerly Qualcomm Labs, Inc. and Qualcomm Retail Solutions, Inc.)",
  141: "Zscan Software",
  142: "Quintic Corp.",
  143: "Stollman E+V GmbH",
  144: "Funai Electric Co., Ltd.",
  145: "Advanced PANMOBIL Systems GmbH & Co. KG",
  146: "ThinkOptics, Inc.",
  147: "Universal Electronics, Inc.",
  148: "Airoha Technology Corp.",
  149: "NEC Lighting, Ltd.",
  150: "ODM Technology, Inc.",
  151: "ConnecteDevice Ltd.",
  152: "zer01.tv GmbH",
  153: "i.Tech Dynamic Global Distribution Ltd.",
  154: "Alpwise",
  155: "Jiangsu Toppower Automotive Electronics Co., Ltd.",
  156: "Colorfy, Inc.",
  157: "Geoforce Inc.",
  158: "Bose Corporation",
  159: "Suunto Oy",
  160: "Kensington Computer Products Group",
  161: "SR-Medizinelektronik",
  162: "Vertu Corporation Limited",
  163: "Meta Watch Ltd.",
  164: "LINAK A/S",
  165: "OTL Dynamics LLC",
  166: "Panda Ocean Inc.",
  167: "Visteon Corporation",
  168: "ARP Devices Limited",
  169: "Magneti Marelli S.p.A",
  170: "CAEN RFID srl",
  171: "Ingenieur-Systemgruppe Zahn GmbH",
  172: "Green Throttle Games",
  173: "Peter Systemtechnik GmbH",
  174: "Omegawave Oy",
  175: "Cinetix",
  176: "Passif Semiconductor Corp",
  177: "Saris Cycling Group, Inc",
  178: "Bekey A/S",
  179: "Clarinox Technologies Pty. Ltd.",
  180: "BDE Technology Co., Ltd.",
  181: "Swirl Networks",
  182: "Meso international",
  183: "TreLab Ltd",
  184: "Qualcomm Innovation Center, Inc. (QuIC)",
  185: "Johnson Controls, Inc.",
  186: "Starkey Laboratories Inc.",
  187: "S-Power Electronics Limited",
  188: "Ace Sensor Inc",
  189: "Aplix Corporation",
  190: "AAMP of America",
  191: "Stalmart Technology Limited",
  192: "AMICCOM Electronics Corporation",
  193: "Shenzhen Excelsecu Data Technology Co.,Ltd",
  194: "Geneq Inc.",
  195: "adidas AG",
  196: "LG Electronics",
  197: "Onset Computer Corporation",
  198: "Selfly BV",
  199: "Quuppa Oy.",
  200: "GeLo Inc",
  201: "Evluma",
  202: "MC10",
  203: "Binauric SE",
  204: "Beats Electronics",
  205: "Microchip Technology Inc.",
  206: "Elgato Systems GmbH",
  207: "ARCHOS SA",
  208: "Dexcom, Inc.",
  209: "Polar Electro Europe B.V.",
  210: "Dialog Semiconductor B.V.",
  211: "Taixingbang Technology (HK) Co,. LTD.",
  212: "Kawantech",
  213: "Austco Communication Systems",
  214: "Timex Group USA, Inc.",
  215: "Qualcomm Technologies, Inc.",
  216: "Qualcomm Connected Experiences, Inc.",
  217: "Voyetra Turtle Beach",
  218: "txtr GmbH",
  219: "Biosentronics",
  220: "Procter & Gamble",
  221: "Hosiden Corporation",
  222: "Muzik LLC",
  223: "Misfit Wearables Corp",
  224: "Google",
  225: "Danlers Ltd",
  226: "Semilink Inc",
  227: "inMusic Brands, Inc",
  228: "L.S. Research Inc.",
  229: "Eden Software Consultants Ltd.",
  230: "Freshtemp",
  231: "KS Technologies",
  232: "ACTS Technologies",
  233: "Vtrack Systems",
  234: "Nielsen-Kellerman Company",
  235: "Server Technology, Inc.",
  236: "BioResearch Associates",
  237: "Jolly Logic, LLC",
  238: "Above Average Outcomes, Inc.",
  239: "Bitsplitters GmbH",
  240: "PayPal, Inc.",
  241: "Witron Technology Limited",
  242: "Aether Things Inc. (formerly Morse Project Inc.)",
  243: "Kent Displays Inc.",
  244: "Nautilus Inc.",
  245: "Smartifier Oy",
  246: "Elcometer Limited",
  247: "VSN Technologies Inc.",
  248: "AceUni Corp., Ltd.",
  249: "StickNFind",
  250: "Crystal Code AB",
  251: "KOUKAAM a.s.",
  252: "Delphi Corporation",
  253: "ValenceTech Limited",
  254: "Reserved",
  255: "Typo Products, LLC",
  256: "TomTom International BV",
  257: "Fugoo, Inc",
  258: "Keiser Corporation",
  259: "Bang & Olufsen A/S",
  260: "PLUS Locations Systems Pty Ltd",
  261: "Ubiquitous Computing Technology Corporation",
  262: "Innovative Yachtter Solutions",
  263: "William Demant Holding A/S",
  264: "Chicony Electronics Co., Ltd.",
  265: "Atus BV",
  266: "Codegate Ltd.",
  267: "ERi, Inc.",
  268: "Transducers Direct, LLC",
  269: "Fujitsu Ten Limited",
  270: "Audi AG",
  271: "HiSilicon Technologies Co., Ltd.",
  272: "Nippon Seiki Co., Ltd.",
  273: "Steelseries ApS",
  274: "vyzybl Inc.",
  275: "Openbrain Technologies, Co., Ltd.",
  276: "Xensr",
  277: "e.solutions",
  278: "1OAK Technologies",
  279: "Wimoto Technologies Inc",
  280: "Radius Networks, Inc.",
  281: "Wize Technology Co., Ltd.",
  282: "Qualcomm Labs, Inc.",
  283: "Aruba Networks",
  284: "Baidu",
  285: "Arendi AG",
  286: "Skoda Auto a.s.",
  287: "Volkswagon AG",
  288: "Porsche AG",
  289: "Sino Wealth Electronic Ltd.",
  290: "AirTurn, Inc.",
  291: "Kinsa, Inc.",
  292: "HID Global",
  293: "SEAT es",
  294: "Promethean Ltd.",
  295: "Salutica Allied Solutions",
  296: "GPSI Group Pty Ltd",
  297: "Nimble Devices Oy",
  298: "Changzhou Yongse Infotech Co., Ltd",
  299: "SportIQ",
  300: "TEMEC Instruments B.V.",
  301: "Sony Corporation",
  302: "ASSA ABLOY",
  303: "Clarion Co., Ltd.",
  304: "Warehouse Innovations",
  305: "Cypress Semiconductor Corporation",
  306: "MADS Inc",
  307: "Blue Maestro Limited",
  308: "Resolution Products, Inc.",
  309: "Airewear LLC",
  310: "Seed Labs, Inc. (formerly ETC sp. z.o.o.)",
  311: "Prestigio Plaza Ltd.",
  312: "NTEO Inc.",
  313: "Focus Systems Corporation",
  314: "Tencent Holdings Limited",
  315: "Allegion",
  316: "Murata Manufacuring Co., Ltd.",
  318: "Nod, Inc.",
  319: "B&B Manufacturing Company",
  320: "Alpine Electronics (China) Co., Ltd",
  321: "FedEx Services",
  322: "Grape Systems Inc.",
  323: "Bkon Connect",
  324: "Lintech GmbH",
  325: "Novatel Wireless",
  326: "Ciright",
  327: "Mighty Cast, Inc.",
  328: "Ambimat Electronics",
  329: "Perytons Ltd.",
  330: "Tivoli Audio, LLC",
  331: "Master Lock",
  332: "Mesh-Net Ltd",
  333: "Huizhou Desay SV Automotive CO., LTD.",
  334: "Tangerine, Inc.",
  335: "B&W Group Ltd.",
  336: "Pioneer Corporation",
  337: "OnBeep",
  338: "Vernier Software & Technology",
  339: "ROL Ergo",
  340: "Pebble Technology",
  341: "NETATMO",
  342: "Accumulate AB",
  343: "Anhui Huami Information Technology Co., Ltd.",
  344: "Inmite s.r.o.",
  345: "ChefSteps, Inc.",
  346: "micas AG",
  347: "Biomedical Research Ltd.",
  348: "Pitius Tec S.L.",
  349: "Estimote, Inc.",
  350: "Unikey Technologies, Inc.",
  351: "Timer Cap Co.",
  352: "AwoX",
  353: "yikes",
  354: "MADSGlobal NZ Ltd.",
  355: "PCH International",
  356: "Qingdao Yeelink Information Technology Co., Ltd.",
  357: "Milwaukee Tool (formerly Milwaukee Electric Tools)",
  358: "MISHIK Pte Ltd",
  359: "Bayer HealthCare",
  360: "Spicebox LLC",
  361: "emberlight",
  362: "Cooper-Atkins Corporation",
  363: "Qblinks",
  364: "MYSPHERA",
  365: "LifeScan Inc",
  366: "Volantic AB",
  367: "Podo Labs, Inc",
  368: "Roche Diabetes Care AG",
  369: "Amazon Fulfillment Service",
  370: "Connovate Technology Private Limited",
  371: "Kocomojo, LLC",
  372: "Everykey LLC",
  373: "Dynamic Controls",
  374: "SentriLock",
  375: "I-SYST inc.",
  376: "CASIO COMPUTER CO., LTD.",
  377: "LAPIS Semiconductor Co., Ltd.",
  378: "Telemonitor, Inc.",
  379: "taskit GmbH",
  380: "Daimler AG",
  381: "BatAndCat",
  382: "BluDotz Ltd",
  383: "XTel ApS",
  384: "Gigaset Communications GmbH",
  385: "Gecko Health Innovations, Inc.",
  386: "HOP Ubiquitous",
  387: "To Be Assigned",
  388: "Nectar",
  389: "bel’apps LLC",
  390: "CORE Lighting Ltd",
  391: "Seraphim Sense Ltd",
  392: "Unico RBC",
  393: "Physical Enterprises Inc.",
  394: "Able Trend Technology Limited",
  395: "Konica Minolta, Inc.",
  396: "Wilo SE",
  397: "Extron Design Services",
  398: "Fitbit, Inc.",
  399: "Fireflies Systems",
  400: "Intelletto Technologies Inc.",
  401: "FDK CORPORATION",
  402: "Cloudleaf, Inc",
  403: "Maveric Automation LLC",
  404: "Acoustic Stream Corporation",
  405: "Zuli",
  406: "Paxton Access Ltd",
  407: "WiSilica Inc",
  408: "Vengit Limited",
  409: "SALTO SYSTEMS S.L.",
  410: "TRON Forum (formerly T-Engine Forum)",
  411: "CUBETECH s.r.o.",
  412: "Cokiya Incorporated",
  413: "CVS Health",
  414: "Ceruus",
  415: "Strainstall Ltd",
  416: "Channel Enterprises (HK) Ltd.",
  417: "FIAMM",
  418: "GIGALANE.CO.,LTD",
  419: "EROAD",
  420: "Mine Safety Appliances",
  421: "Icon Health and Fitness",
  422: "Asandoo GmbH",
  423: "ENERGOUS CORPORATION",
  424: "Taobao",
  425: "Canon Inc.",
  426: "Geophysical Technology Inc.",
  427: "Facebook, Inc.",
  428: "Nipro Diagnostics, Inc.",
  429: "FlightSafety International",
  430: "Earlens Corporation",
  431: "Sunrise Micro Devices, Inc.",
  432: "Star Micronics Co., Ltd.",
  433: "Netizens Sp. z o.o.",
  434: "Nymi Inc.",
  435: "Nytec, Inc.",
  436: "Trineo Sp. z o.o.",
  437: "Nest Labs Inc.",
  438: "LM Technologies Ltd",
  439: "General Electric Company",
  440: "i+D3 S.L.",
  441: "HANA Micron",
  442: "Stages Cycling LLC",
  443: "Cochlear Bone Anchored Solutions AB",
  444: "SenionLab AB",
  445: "Syszone Co., Ltd",
  446: "Pulsate Mobile Ltd.",
  447: "Hong Kong HunterSun Electronic Limited",
  448: "pironex GmbH",
  449: "BRADATECH Corp.",
  450: "Transenergooil AG",
  451: "Bunch",
  452: "DME Microelectronics",
  453: "Bitcraze AB",
  454: "HASWARE Inc.",
  455: "Abiogenix Inc.",
  456: "Poly-Control ApS",
  457: "Avi-on",
  458: "Laerdal Medical AS",
  459: "Fetch My Pet",
  460: "Sam Labs Ltd.",
  461: "Chengdu Synwing Technology Ltd",
  462: "HOUWA SYSTEM DESIGN, k.k.",
  463: "BSH",
  464: "Primus Inter Pares Ltd",
  465: "August",
  466: "Gill Electronics",
  467: "Sky Wave Design",
  468: "Newlab S.r.l.",
  469: "ELAD srl",
  470: "G-wearables inc.",
  471: "Squadrone Systems Inc.",
  472: "Code Corporation",
  473: "Savant Systems LLC",
  474: "Logitech International SA",
  475: "Innblue Consulting",
  476: "iParking Ltd.",
  477: "Koninklijke Philips Electronics N.V.",
  478: "Minelab Electronics Pty Limited",
  479: "Bison Group Ltd.",
  480: "Widex A/S",
  481: "Jolla Ltd",
  482: "Lectronix, Inc.",
  483: "Caterpillar Inc",
  484: "Freedom Innovations",
  485: "Dynamic Devices Ltd",
  486: "Technology Solutions (UK) Ltd",
  487: "IPS Group Inc.",
  488: "STIR",
  489: "Sano, Inc",
  490: "Advanced Application Design, Inc.",
  491: "AutoMap LLC",
  492: "Spreadtrum Communications Shanghai Ltd",
  493: "CuteCircuit LTD",
  494: "Valeo Service",
  495: "Fullpower Technologies, Inc.",
  496: "KloudNation",
  497: "Zebra Technologies Corporation",
  498: "Itron, Inc.",
  499: "The University of Tokyo",
  500: "UTC Fire and Security",
  501: "Cool Webthings Limited",
  502: "DJO Global",
  503: "Gelliner Limited",
  504: "Anyka (Guangzhou) Microelectronics Technology Co, LTD",
  505: "Medtronic, Inc.",
  506: "Gozio, Inc.",
  507: "Form Lifting, LLC",
  508: "Wahoo Fitness, LLC",
  509: "Kontakt Micro-Location Sp. z o.o.",
  510: "Radio System Corporation",
  511: "Freescale Semiconductor, Inc.",
  512: "Verifone Systems PTe Ltd. Taiwan Branch",
  513: "AR Timing",
  514: "Rigado LLC",
  515: "Kemppi Oy",
  516: "Tapcentive Inc.",
  517: "Smartbotics Inc.",
  518: "Otter Products, LLC",
  519: "STEMP Inc.",
  520: "LumiGeek LLC",
  521: "InvisionHeart Inc.",
  522: "Macnica Inc. ",
  523: "Jaguar Land Rover Limited",
  524: "CoroWare Technologies, Inc",
  525: "Simplo Technology Co., LTD",
  526: "Omron Healthcare Co., LTD",
  527: "Comodule GMBH",
  528: "ikeGPS",
  529: "Telink Semiconductor Co. Ltd",
  530: "Interplan Co., Ltd",
  531: "Wyler AG",
  532: "IK Multimedia Production srl",
  533: "Lukoton Experience Oy",
  534: "MTI Ltd",
  535: "Tech4home, Lda",
  536: "Hiotech AB",
  537: "DOTT Limited",
  538: "Blue Speck Labs, LLC",
  539: "Cisco Systems, Inc",
  540: "Mobicomm Inc",
  541: "Edamic",
  542: "Goodnet, Ltd",
  543: "Luster Leaf Products Inc",
  544: "Manus Machina BV",
  545: "Mobiquity Networks Inc",
  546: "Praxis Dynamics",
  547: "Philip Morris Products S.A.",
  548: "Comarch SA",
  549: "Nestl Nespresso S.A.",
  550: "Merlinia A/S",
  551: "LifeBEAM Technologies",
  552: "Twocanoes Labs, LLC",
  553: "Muoverti Limited",
  554: "Stamer Musikanlagen GMBH",
  555: "Tesla Motors",
  556: "Pharynks Corporation",
  557: "Lupine",
  558: "Siemens AG",
  559: "Huami (Shanghai) Culture Communication CO., LTD",
  560: "Foster Electric Company, Ltd",
  561: "ETA SA",
  562: "x-Senso Solutions Kft",
  563: "Shenzhen SuLong Communication Ltd",
  564: "FengFan (BeiJing) Technology Co, Ltd",
  565: "Qrio Inc",
  566: "Pitpatpet Ltd",
  567: "MSHeli s.r.l.",
  568: "Trakm8 Ltd",
  569: "JIN CO, Ltd",
  570: "Alatech Tehnology",
  571: "Beijing CarePulse Electronic Technology Co, Ltd",
  572: "Awarepoint",
  573: "ViCentra B.V.",
  574: "Raven Industries",
  575: "WaveWare Technologies Inc.",
  576: "Argenox Technologies",
  577: "Bragi GmbH",
  578: "16Lab Inc",
  579: "Masimo Corp",
  580: "Iotera Inc",
  581: "Endress+Hauser",
  582: "ACKme Networks, Inc.",
  583: "FiftyThree Inc.",
  584: "Parker Hannifin Corp",
  585: "Transcranial Ltd",
  586: "Uwatec AG",
  587: "Orlan LLC",
  588: "Blue Clover Devices",
  589: "M-Way Solutions GmbH",
  590: "Microtronics Engineering GmbH",
  591: "Schneider Schreibgerte GmbH",
  592: "Sapphire Circuits LLC",
  593: "Lumo Bodytech Inc.",
  594: "UKC Technosolution",
  595: "Xicato Inc.",
  596: "Playbrush",
  597: "Dai Nippon Printing Co., Ltd.",
  598: "G24 Power Limited",
  599: "AdBabble Local Commerce Inc.",
  600: "Devialet SA",
  601: "ALTYOR",
  602: "University of Applied Sciences Valais/Haute Ecole Valaisanne",
  603: "Five Interactive, LLC dba Zendo",
  604: "NetEaseHangzhouNetwork co.Ltd.",
  605: "Lexmark International Inc.",
  606: "Fluke Corporation",
  607: "Yardarm Technologies",
  608: "SensaRx",
  609: "SECVRE GmbH",
  610: "Glacial Ridge Technologies",
  611: "Identiv, Inc.",
  612: "DDS, Inc.",
  613: "SMK Corporation",
  614: "Schawbel Technologies LLC",
  615: "XMI Systems SA",
  616: "Cerevo",
  617: "Torrox GmbH & Co KG",
  618: "Gemalto",
  619: "DEKA Research & Development Corp.",
  620: "Domster Tadeusz Szydlowski",
  621: "Technogym SPA",
  622: "FLEURBAEY BVBA",
  623: "Aptcode Solutions",
  624: "LSI ADL Technology",
  625: "Animas Corp",
  626: "Alps Electric Co., Ltd.",
  627: "OCEASOFT",
  628: "Motsai Research",
  629: "Geotab",
  630: "E.G.O. Elektro-Gertebau GmbH",
  631: "bewhere inc",
  632: "Johnson Outdoors Inc",
  633: "steute Schaltgerate GmbH & Co. KG",
  634: "Ekomini inc.",
  635: "DEFA AS",
  636: "Aseptika Ltd",
  637: "HUAWEI Technologies Co., Ltd. ( )",
  638: "HabitAware, LLC",
  639: "ruwido austria gmbh",
  640: "ITEC corporation",
  641: "StoneL",
  642: "Sonova AG",
  643: "Maven Machines, Inc.",
  644: "Synapse Electronics",
  645: "Standard Innovation Inc.",
  646: "RF Code, Inc.",
  647: "Wally Ventures S.L.",
  648: "Willowbank Electronics Ltd",
  649: "SK Telecom",
  650: "Jetro AS",
  651: "Code Gears LTD",
  652: "NANOLINK APS",
  653: "IF, LLC",
  654: "RF Digital Corp",
  655: "Church & Dwight Co., Inc",
  656: "Multibit Oy",
  657: "CliniCloud Inc",
  658: "SwiftSensors",
  659: "Blue Bite",
  660: "ELIAS GmbH",
  661: "Sivantos GmbH",
  662: "Petzl",
  663: "storm power ltd",
  664: "EISST Ltd",
  665: "Inexess Technology Simma KG",
  666: "Currant, Inc.",
  667: "C2 Development, Inc.",
  668: "Blue Sky Scientific, LLC",
  669: "ALOTTAZS LABS, LLC",
  670: "Kupson spol. s r.o.",
  671: "Areus Engineering GmbH",
  672: "Impossible Camera GmbH",
  673: "InventureTrack Systems",
  674: "LockedUp",
  675: "Itude",
  676: "Pacific Lock Company",
  677: "Tendyron Corporation ( )",
  678: "Robert Bosch GmbH",
  679: "Illuxtron international B.V.",
  680: "miSport Ltd.",
  681: "Chargelib",
  682: "Doppler Lab",
  683: "BBPOS Limited",
  684: "RTB Elektronik GmbH & Co. KG",
  685: "Rx Networks, Inc.",
  686: "WeatherFlow, Inc.",
  687: "Technicolor USA Inc.",
  688: "Bestechnic(Shanghai),Ltd",
  689: "Raden Inc",
  690: "JouZen Oy",
  691: "CLABER S.P.A.",
  692: "Hyginex, Inc.",
  693: "HANSHIN ELECTRIC RAILWAY CO.,LTD.",
  694: "Schneider Electric",
  695: "Oort Technologies LLC",
  696: "Chrono Therapeutics",
  697: "Rinnai Corporation",
  698: "Swissprime Technologies AG",
  699: "Koha.,Co.Ltd",
  700: "Genevac Ltd",
  701: "Chemtronics",
  702: "Seguro Technology Sp. z o.o.",
  703: "Redbird Flight Simulations",
  704: "Dash Robotics",
  705: "LINE Corporation",
  706: "Guillemot Corporation",
  707: "Techtronic Power Tools Technology Limited",
  708: "Wilson Sporting Goods",
  709: "Lenovo (Singapore) Pte Ltd. ( )",
  710: "Ayatan Sensors",
  711: "Electronics Tomorrow Limited",
  712: "VASCO Data Security International, Inc.",
  713: "PayRange Inc.",
  714: "ABOV Semiconductor",
  715: "AINA-Wireless Inc.",
  716: "Eijkelkamp Soil & Water",
  717: "BMA ergonomics b.v.",
  718: "Teva Branded Pharmaceutical Products R&D, Inc.",
  719: "Anima",
  720: "3M",
  721: "Empatica Srl",
  722: "Afero, Inc.",
  723: "Powercast Corporation",
  724: "Secuyou ApS",
  725: "OMRON Corporation",
  726: "Send Solutions",
  727: "NIPPON SYSTEMWARE CO.,LTD.",
  728: "Neosfar",
  729: "Fliegl Agrartechnik GmbH",
  730: "Gilvader",
  731: "Digi International Inc (R)",
  732: "DeWalch Technologies, Inc.",
  733: "Flint Rehabilitation Devices, LLC",
  734: "Samsung SDS Co., Ltd.",
  735: "Blur Product Development",
  736: "University of Michigan",
  737: "Victron Energy BV",
  738: "NTT docomo",
  739: "Carmanah Technologies Corp.",
  740: "Bytestorm Ltd.",
  741: "Espressif Incorporated ( () )",
  742: "Unwire",
  743: "Connected Yard, Inc.",
  744: "American Music Environments",
  745: "Sensogram Technologies, Inc.",
  746: "Fujitsu Limited",
  747: "Ardic Technology",
  748: "Delta Systems, Inc",
  749: "HTC Corporation",
  750: "Citizen Holdings Co., Ltd.",
  751: "SMART-INNOVATION.inc",
  752: "Blackrat Software",
  753: "The Idea Cave, LLC",
  754: "GoPro, Inc.",
  755: "AuthAir, Inc",
  756: "Vensi, Inc.",
  757: "Indagem Tech LLC",
  758: "Intemo Technologies",
  759: "DreamVisions co., Ltd.",
  760: "Runteq Oy Ltd",
  761: "IMAGINATION TECHNOLOGIES LTD",
  762: "CoSTAR TEchnologies",
  763: "Clarius Mobile Health Corp.",
  764: "Shanghai Frequen Microelectronics Co., Ltd.",
  765: "Uwanna, Inc.",
  766: "Lierda Science & Technology Group Co., Ltd.",
  767: "Silicon Laboratories",
  768: "World Moto Inc.",
  769: "Giatec Scientific Inc.",
  770: "Loop Devices, Inc",
  771: "IACA electronique",
  772: "Martians Inc",
  773: "Swipp ApS",
  774: "Life Laboratory Inc.",
  775: "FUJI INDUSTRIAL CO.,LTD.",
  776: "Surefire, LLC",
  777: "Dolby Labs",
  778: "Ellisys",
  779: "Magnitude Lighting Converters",
  780: "Hilti AG",
  781: "Devdata S.r.l.",
  782: "Deviceworx",
  783: "Shortcut Labs",
  784: "SGL Italia S.r.l.",
  785: "PEEQ DATA",
  786: "Ducere Technologies Pvt Ltd",
  787: "DiveNav, Inc.",
  788: "RIIG AI Sp. z o.o.",
  789: "Thermo Fisher Scientific",
  790: "AG Measurematics Pvt. Ltd.",
  791: "CHUO Electronics CO., LTD.",
  792: "Aspenta International",
  793: "Eugster Frismag AG",
  794: "Amber wireless GmbH",
  795: "HQ Inc",
  796: "Lab Sensor Solutions",
  797: "Enterlab ApS",
  798: "Eyefi, Inc.",
  799: "MetaSystem S.p.A.",
  800: "SONO ELECTRONICS. CO., LTD",
  801: "Jewelbots",
  802: "Compumedics Limited",
  803: "Rotor Bike Components",
  804: "Astro, Inc.",
  805: "Amotus Solutions",
  806: "Healthwear Technologies (Changzhou)Ltd",
  807: "Essex Electronics",
  808: "Grundfos A/S",
  809: "Eargo, Inc.",
  810: "Electronic Design Lab",
  811: "ESYLUX",
  812: "NIPPON SMT.CO.,Ltd",
  813: "BM innovations GmbH",
  814: "indoormap",
  815: "OttoQ Inc",
  816: "North Pole Engineering",
  817: "3flares Technologies Inc.",
  818: "Electrocompaniet A.S.",
  819: "Mul-T-Lock",
  820: "Corentium AS",
  821: "Enlighted Inc",
  822: "GISTIC",
  823: "AJP2 Holdings, LLC",
  824: "COBI GmbH",
  825: "Blue Sky Scientific, LLC",
  826: "Appception, Inc.",
  827: "Courtney Thorne Limited",
  828: "Virtuosys",
  829: "TPV Technology Limited",
  830: "Monitra SA",
  831: "Automation Components, Inc.",
  832: "Letsense s.r.l.",
  833: "Etesian Technologies LLC",
  834: "GERTEC BRASIL LTDA.",
  835: "Drekker Development Pty. Ltd.",
  836: "Whirl Inc",
  837: "Locus Positioning",
  838: "Acuity Brands Lighting, Inc",
  839: "Prevent Biometrics",
  840: "Arioneo",
  841: "VersaMe",
  842: "Vaddio",
  843: "Libratone A/S",
  844: "HM Electronics, Inc.",
  845: "TASER International, Inc.",
  846: "SafeTrust Inc.",
  847: "Heartland Payment Systems",
  848: "Bitstrata Systems Inc.",
  849: "Pieps GmbH",
  850: "iRiding(Xiamen)Technology Co.,Ltd.",
  851: "Alpha Audiotronics, Inc.",
  852: "TOPPAN FORMS CO.,LTD.",
  853: "Sigma Designs, Inc.",
  854: "Spectrum Brands, Inc.",
  855: "Polymap Wireless",
  856: "MagniWare Ltd.",
  857: "Novotec Medical GmbH",
  858: "Medicom Innovation Partner a/s",
  859: "Matrix Inc.",
  860: "Eaton Corporation",
  861: "KYS",
  862: "Naya Health, Inc.",
  863: "Acromag",
  864: "Insulet Corporation",
  865: "Wellinks Inc.",
  866: "ON Semiconductor",
  867: "FREELAP SA",
  868: "Favero Electronics Srl",
  869: "BioMech Sensor LLC",
  870: "BOLTT Sports technologies Private limited",
  871: "Saphe International",
  872: "Metormote AB",
  873: "littleBits",
  874: "SetPoint Medical",
  875: "BRControls Products BV",
  876: "Zipcar",
  877: "AirBolt Pty Ltd",
  878: "KeepTruckin Inc",
  879: "Motiv, Inc.",
  880: "Wazombi Labs O",
  881: "ORBCOMM",
  882: "Nixie Labs, Inc.",
  883: "AppNearMe Ltd",
  884: "Holman Industries",
  885: "Expain AS",
  886: "Electronic Temperature Instruments Ltd",
  887: "Plejd AB",
  888: "Propeller Health",
  889: "Shenzhen iMCO Electronic Technology Co.,Ltd",
  890: "Algoria",
  891: "Apption Labs Inc.",
  892: "Cronologics Corporation",
  893: "MICRODIA Ltd.",
  894: "lulabytes S.L.",
  895: "Nestec S.A.",
  896: "LLC MEGA - F service",
  897: "Sharp Corporation",
  898: "Precision Outcomes Ltd",
  899: "Kronos Incorporated",
  900: "OCOSMOS Co., Ltd.",
  901: "Embedded Electronic Solutions Ltd. dba e2Solutions",
  902: "Aterica Inc.",
  903: "BluStor PMC, Inc.",
  904: "Kapsch TrafficCom AB",
  905: "ActiveBlu Corporation",
  906: "Kohler Mira Limited",
  907: "Noke",
  908: "Appion Inc.",
  909: "Resmed Ltd",
  910: "Crownstone B.V.",
  911: "Xiaomi Inc.",
  912: "INFOTECH s.r.o.",
  913: "Thingsquare AB",
  914: "T&D",
  915: "LAVAZZA S.p.A.",
  916: "Netclearance Systems, Inc.",
  917: "SDATAWAY",
  918: "BLOKS GmbH",
  919: "LEGO System A/S",
  920: "Thetatronics Ltd",
  921: "Nikon Corporation",
  922: "NeST",
  923: "South Silicon Valley Microelectronics",
  924: "ALE International",
  925: "CareView Communications, Inc.",
  926: "SchoolBoard Limited",
  927: "Molex Corporation",
  928: "IVT Wireless Limited",
  929: "Alpine Labs LLC",
  930: "Candura Instruments",
  931: "SmartMovt Technology Co., Ltd",
  932: "Token Zero Ltd",
  933: "ACE CAD Enterprise Co., Ltd. (ACECAD)",
  934: "Medela, Inc",
  935: "AeroScout",
  936: "Esrille Inc.",
  937: "THINKERLY SRL",
  938: "Exon Sp. z o.o.",
  939: "Meizu Technology Co., Ltd.",
  940: "Smablo LTD",
  941: "XiQ",
  942: "Allswell Inc.",
  943: "Comm-N-Sense Corp DBA Verigo",
  944: "VIBRADORM GmbH",
  945: "Otodata Wireless Network Inc.",
  946: "Propagation Systems Limited",
  947: "Midwest Instruments & Controls",
  948: "Alpha Nodus, inc.",
  949: "petPOMM, Inc",
  950: "Mattel",
  951: "Airbly Inc.",
  952: "A-Safe Limited",
  953: "FREDERIQUE CONSTANT SA",
  954: "Maxscend Microelectronics Company Limited",
  955: "Abbott Diabetes Care",
  956: "ASB Bank Ltd",
  957: "amadas",
  958: "Applied Science, Inc.",
  959: "iLumi Solutions Inc.",
  960: "Arch Systems Inc.",
  961: "Ember Technologies, Inc.",
  962: "Snapchat Inc",
  963: "Casambi Technologies Oy",
  964: "Pico Technology Inc.",
  965: "St. Jude Medical, Inc.",
  966: "Intricon",
  967: "Structural Health Systems, Inc.",
  968: "Avvel International",
  969: "Gallagher Group",
  970: "In2things Automation Pvt. Ltd.",
  971: "SYSDEV Srl",
  972: "Vonkil Technologies Ltd",
  973: "Wynd Technologies, Inc.",
  974: "CONTRINEX S.A.",
  975: "MIRA, Inc.",
  976: "Watteam Ltd",
  977: "Density Inc.",
  978: "IOT Pot India Private Limited",
  979: "Sigma Connectivity AB",
  980: "PEG PEREGO SPA",
  981: "Wyzelink Systems Inc.",
  982: "Yota Devices LTD",
  983: "FINSECUR",
  984: "Zen-Me Labs Ltd",
  985: "3IWare Co., Ltd.",
  986: "EnOcean GmbH",
  987: "Instabeat, Inc",
  988: "Nima Labs",
  989: "Andreas Stihl AG & Co. KG",
  990: "Nathan Rhoades LLC",
  991: "Grob Technologies, LLC",
  992: "Actions (Zhuhai) Technology Co., Limited",
  993: "SPD Development Company Ltd",
  994: "Sensoan Oy",
  995: "Qualcomm Life Inc",
  996: "Chip-ing AG",
  997: "ffly4u",
  998: "IoT Instruments Oy",
  999: "TRUE Fitness Technology",
  1e3: "Reiner Kartengeraete GmbH & Co. KG.",
  1001: "SHENZHEN LEMONJOY TECHNOLOGY CO., LTD.",
  1002: "Hello Inc.",
  1003: "Evollve Inc.",
  1004: "Jigowatts Inc.",
  1005: "BASIC MICRO.COM,INC.",
  1006: "CUBE TECHNOLOGIES",
  1007: "foolography GmbH",
  1008: "CLINK",
  1009: "Hestan Smart Cooking Inc.",
  1010: "WindowMaster A/S",
  1011: "Flowscape AB",
  1012: "PAL Technologies Ltd",
  1013: "WHERE, Inc.",
  1014: "Iton Technology Corp.",
  1015: "Owl Labs Inc.",
  1016: "Rockford Corp.",
  1017: "Becon Technologies Co.,Ltd.",
  1018: "Vyassoft Technologies Inc",
  1019: "Nox Medical",
  1020: "Kimberly-Clark",
  1021: "Trimble Navigation Ltd.",
  1022: "Littelfuse",
  1023: "Withings",
  1024: "i-developer IT Beratung UG",
  1026: "Sears Holdings Corporation",
  1027: "Gantner Electronic GmbH",
  1028: "Authomate Inc",
  1029: "Vertex International, Inc.",
  1030: "Airtago",
  1031: "Swiss Audio SA",
  1032: "ToGetHome Inc.",
  1033: "AXIS",
  1034: "Openmatics",
  1035: "Jana Care Inc.",
  1036: "Senix Corporation",
  1037: "NorthStar Battery Company, LLC",
  1038: "SKF (U.K.) Limited",
  1039: "CO-AX Technology, Inc.",
  1040: "Fender Musical Instruments",
  1041: "Luidia Inc",
  1042: "SEFAM",
  1043: "Wireless Cables Inc",
  1044: "Lightning Protection International Pty Ltd",
  1045: "Uber Technologies Inc",
  1046: "SODA GmbH",
  1047: "Fatigue Science",
  1048: "Alpine Electronics Inc.",
  1049: "Novalogy LTD",
  1050: "Friday Labs Limited",
  1051: "OrthoAccel Technologies",
  1052: "WaterGuru, Inc.",
  1053: "Benning Elektrotechnik und Elektronik GmbH & Co. KG",
  1054: "Dell Computer Corporation",
  1055: "Kopin Corporation",
  1056: "TecBakery GmbH",
  1057: "Backbone Labs, Inc.",
  1058: "DELSEY SA",
  1059: "Chargifi Limited",
  1060: "Trainesense Ltd.",
  1061: "Unify Software and Solutions GmbH & Co. KG",
  1062: "Husqvarna AB",
  1063: "Focus fleet and fuel management inc",
  1064: "SmallLoop, LLC",
  1065: "Prolon Inc.",
  1066: "BD Medical",
  1067: "iMicroMed Incorporated",
  1068: "Ticto N.V.",
  1069: "Meshtech AS",
  1070: "MemCachier Inc.",
  1071: "Danfoss A/S",
  1072: "SnapStyk Inc.",
  1073: "Amyway Corporation",
  1074: "Silk Labs, Inc.",
  1075: "Pillsy Inc.",
  1076: "Hatch Baby, Inc.",
  1077: "Blocks Wearables Ltd.",
  1078: "Drayson Technologies (Europe) Limited",
  1079: "eBest IOT Inc.",
  1080: "Helvar Ltd",
  1081: "Radiance Technologies",
  1082: "Nuheara Limited",
  1083: "Appside co., ltd.",
  1084: "DeLaval",
  1085: "Coiler Corporation",
  1086: "Thermomedics, Inc.",
  1087: "Tentacle Sync GmbH",
  1088: "Valencell, Inc.",
  1089: "iProtoXi Oy",
  1090: "SECOM CO., LTD.",
  1091: "Tucker International LLC",
  1092: "Metanate Limited",
  1093: "Kobian Canada Inc.",
  1094: "NETGEAR, Inc.",
  1095: "Fabtronics Australia Pty Ltd",
  1096: "Grand Centrix GmbH",
  1097: "1UP USA.com llc",
  1098: "SHIMANO INC.",
  1099: "Nain Inc.",
  1100: "LifeStyle Lock, LLC",
  1101: "VEGA Grieshaber KG",
  1102: "Xtrava Inc.",
  1103: "TTS Tooltechnic Systems AG & Co. KG",
  1104: "Teenage Engineering AB",
  1105: "Tunstall Nordic AB",
  1106: "Svep Design Center AB",
  1107: "GreenPeak Technologies BV",
  1108: "Sphinx Electronics GmbH & Co KG",
  1109: "Atomation",
  1110: "Nemik Consulting Inc",
  1111: "RF INNOVATION",
  1112: "Mini Solution Co., Ltd.",
  1113: "Lumenetix, Inc",
  1114: "2048450 Ontario Inc",
  1115: "SPACEEK LTD",
  1116: "Delta T Corporation",
  1117: "Boston Scientific Corporation",
  1118: "Nuviz, Inc.",
  1119: "Real Time Automation, Inc.",
  1120: "Kolibree",
  1121: "vhf elektronik GmbH",
  1122: "Bonsai Systems GmbH",
  1123: "Fathom Systems Inc.",
  1124: "Bellman & Symfon",
  1125: "International Forte Group LLC",
  1126: "CycleLabs Solutions inc.",
  1127: "Codenex Oy",
  1128: "Kynesim Ltd",
  1129: "Palago AB",
  1130: "INSIGMA INC.",
  1131: "PMD Solutions",
  1132: "Qingdao Realtime Technology Co., Ltd.",
  1133: "BEGA Gantenbrink-Leuchten KG",
  1134: "Pambor Ltd.",
  65535: "SPECIAL USE/DEFAULT"
};
const E0 = te.exec, M0 = te.execSync, T0 = Yn, $e = T, D0 = A0, B0 = Fe;
let St = process.platform;
const V0 = St === "linux" || St === "android", k0 = St === "darwin", N0 = St === "win32", F0 = St === "freebsd", W0 = St === "openbsd", R0 = St === "netbsd", G0 = St === "sunos";
function xr(t) {
  let i = "";
  return t.indexOf("keyboard") >= 0 && (i = "Keyboard"), t.indexOf("mouse") >= 0 && (i = "Mouse"), t.indexOf("trackpad") >= 0 && (i = "Trackpad"), t.indexOf("speaker") >= 0 && (i = "Speaker"), t.indexOf("headset") >= 0 && (i = "Headset"), t.indexOf("phone") >= 0 && (i = "Phone"), t.indexOf("macbook") >= 0 && (i = "Computer"), t.indexOf("imac") >= 0 && (i = "Computer"), t.indexOf("ipad") >= 0 && (i = "Tablet"), t.indexOf("watch") >= 0 && (i = "Watch"), t.indexOf("headphone") >= 0 && (i = "Headset"), i;
}
function U0(t) {
  let i = t.split(" ")[0];
  return t = t.toLowerCase(), t.indexOf("apple") >= 0 && (i = "Apple"), t.indexOf("ipad") >= 0 && (i = "Apple"), t.indexOf("imac") >= 0 && (i = "Apple"), t.indexOf("iphone") >= 0 && (i = "Apple"), t.indexOf("magic mouse") >= 0 && (i = "Apple"), t.indexOf("magic track") >= 0 && (i = "Apple"), t.indexOf("macbook") >= 0 && (i = "Apple"), i;
}
function $0(t) {
  const i = parseInt(t);
  if (!isNaN(i)) return D0[i];
}
function z0(t, i, e) {
  const n = {};
  return n.device = null, n.name = $e.getValue(t, "name", "="), n.manufacturer = null, n.macDevice = i, n.macHost = e, n.batteryPercent = null, n.type = xr(n.name.toLowerCase()), n.connected = !1, n;
}
function Tn(t, i) {
  const e = {}, n = ((t.device_minorClassOfDevice_string || t.device_majorClassOfDevice_string || t.device_minorType || "") + (t.device_name || "")).toLowerCase();
  return e.device = t.device_services || "", e.name = t.device_name || "", e.manufacturer = t.device_manufacturer || $0(t.device_vendorID) || U0(t.device_name || "") || "", e.macDevice = (t.device_addr || t.device_address || "").toLowerCase().replace(/-/g, ":"), e.macHost = i, e.batteryPercent = t.device_batteryPercent || null, e.type = xr(n), e.connected = t.device_isconnected === "attrib_Yes" || !1, e;
}
function H0(t) {
  const i = {};
  return i.device = null, i.name = $e.getValue(t, "name", ":"), i.manufacturer = $e.getValue(t, "manufacturer", ":"), i.macDevice = null, i.macHost = null, i.batteryPercent = null, i.type = xr(i.name.toLowerCase()), i.connected = null, i;
}
function q0(t) {
  return new Promise((i) => {
    process.nextTick(() => {
      let e = [];
      if (V0) {
        $e.getFilesInPath("/var/lib/bluetooth/").forEach((s) => {
          const r = T0.basename(s), o = s.split("/"), a = o.length >= 6 ? o[o.length - 2] : null, l = o.length >= 7 ? o[o.length - 3] : null;
          if (r === "info") {
            const c = B0.readFileSync(s, { encoding: "utf8" }).split(`
`);
            e.push(z0(c, a, l));
          }
        });
        try {
          const s = M0("hcitool con", $e.execOptsLinux).toString().toLowerCase();
          for (let r = 0; r < e.length; r++)
            e[r].macDevice && e[r].macDevice.length > 10 && s.indexOf(e[r].macDevice.toLowerCase()) >= 0 && (e[r].connected = !0);
        } catch {
          $e.noop();
        }
        t && t(e), i(e);
      }
      k0 && E0("system_profiler SPBluetoothDataType -json", function(s, r) {
        if (!s)
          try {
            const o = JSON.parse(r.toString());
            if (o.SPBluetoothDataType && o.SPBluetoothDataType.length && o.SPBluetoothDataType[0] && o.SPBluetoothDataType[0].device_title && o.SPBluetoothDataType[0].device_title.length) {
              let a = null;
              o.SPBluetoothDataType[0].local_device_title && o.SPBluetoothDataType[0].local_device_title.general_address && (a = o.SPBluetoothDataType[0].local_device_title.general_address.toLowerCase().replace(/-/g, ":")), o.SPBluetoothDataType[0].device_title.forEach((l) => {
                const c = l, u = Object.keys(c);
                if (u && u.length === 1) {
                  const f = c[u[0]];
                  f.device_name = u[0];
                  const p = Tn(f, a);
                  e.push(p);
                }
              });
            }
            if (o.SPBluetoothDataType && o.SPBluetoothDataType.length && o.SPBluetoothDataType[0] && o.SPBluetoothDataType[0].device_connected && o.SPBluetoothDataType[0].device_connected.length) {
              const a = o.SPBluetoothDataType[0].controller_properties && o.SPBluetoothDataType[0].controller_properties.controller_address ? o.SPBluetoothDataType[0].controller_properties.controller_address.toLowerCase().replace(/-/g, ":") : null;
              o.SPBluetoothDataType[0].device_connected.forEach((l) => {
                const c = l, u = Object.keys(c);
                if (u && u.length === 1) {
                  const f = c[u[0]];
                  f.device_name = u[0], f.device_isconnected = "attrib_Yes";
                  const p = Tn(f, a);
                  e.push(p);
                }
              });
            }
            if (o.SPBluetoothDataType && o.SPBluetoothDataType.length && o.SPBluetoothDataType[0] && o.SPBluetoothDataType[0].device_not_connected && o.SPBluetoothDataType[0].device_not_connected.length) {
              const a = o.SPBluetoothDataType[0].controller_properties && o.SPBluetoothDataType[0].controller_properties.controller_address ? o.SPBluetoothDataType[0].controller_properties.controller_address.toLowerCase().replace(/-/g, ":") : null;
              o.SPBluetoothDataType[0].device_not_connected.forEach((l) => {
                const c = l, u = Object.keys(c);
                if (u && u.length === 1) {
                  const f = c[u[0]];
                  f.device_name = u[0], f.device_isconnected = "attrib_No";
                  const p = Tn(f, a);
                  e.push(p);
                }
              });
            }
          } catch {
            $e.noop();
          }
        t && t(e), i(e);
      }), N0 && $e.powerShell("Get-CimInstance Win32_PNPEntity | select PNPClass, Name, Manufacturer | fl").then((n, s) => {
        s || n.toString().split(/\n\s*\n/).forEach((o) => {
          $e.getValue(o.split(`
`), "PNPClass", ":") === "Bluetooth" && e.push(H0(o.split(`
`)));
        }), t && t(e), i(e);
      }), (F0 || R0 || W0 || G0) && i(null);
    });
  });
}
io.bluetoothDevices = q0;
(function(t) {
  const i = Oo.version, e = T, n = Pi, s = ti, r = wt, o = rr, a = Za, l = Us, c = Vt, u = kt, f = fn, p = dn, d = Ys, m = mr, h = Ct, y = Qs, g = Zs, x = eo, w = to, S = io;
  let C = process.platform;
  const _ = C === "win32", O = C === "freebsd", U = C === "openbsd", I = C === "netbsd", W = C === "sunos";
  _ && (e.getCodepage(), e.getPowershell());
  function V() {
    return i;
  }
  function ie(z) {
    return new Promise((Z) => {
      process.nextTick(() => {
        let H = {};
        H.version = V(), Promise.all([
          n.system(),
          n.bios(),
          n.baseboard(),
          n.chassis(),
          s.osInfo(),
          s.uuid(),
          s.versions(),
          r.cpu(),
          r.cpuFlags(),
          l.graphics(),
          u.networkInterfaces(),
          o.memLayout(),
          c.diskLayout()
        ]).then(($) => {
          H.system = $[0], H.bios = $[1], H.baseboard = $[2], H.chassis = $[3], H.os = $[4], H.uuid = $[5], H.versions = $[6], H.cpu = $[7], H.cpu.flags = $[8], H.graphics = $[9], H.net = $[10], H.memLayout = $[11], H.diskLayout = $[12], z && z(H), Z(H);
        });
      });
    });
  }
  function oe(z, Z, H) {
    return e.isFunction(Z) && (H = Z, Z = ""), e.isFunction(z) && (H = z, z = ""), new Promise(($) => {
      process.nextTick(() => {
        Z = Z || u.getDefaultNetworkInterface(), z = z || "";
        let B = function() {
          let G = 15;
          return _ && (G = 13), (O || U || I) && (G = 11), W && (G = 6), function() {
            --G === 0 && (H && H(K), $(K));
          };
        }(), K = {};
        K.time = s.time(), K.node = process.versions.node, K.v8 = process.versions.v8, r.cpuCurrentSpeed().then((G) => {
          K.cpuCurrentSpeed = G, B();
        }), d.users().then((G) => {
          K.users = G, B();
        }), p.processes().then((G) => {
          K.processes = G, B();
        }), r.currentLoad().then((G) => {
          K.currentLoad = G, B();
        }), W || r.cpuTemperature().then((G) => {
          K.temp = G, B();
        }), !U && !O && !I && !W && u.networkStats(Z).then((G) => {
          K.networkStats = G, B();
        }), W || u.networkConnections().then((G) => {
          K.networkConnections = G, B();
        }), o.mem().then((G) => {
          K.mem = G, B();
        }), W || a().then((G) => {
          K.battery = G, B();
        }), W || p.services(z).then((G) => {
          K.services = G, B();
        }), W || c.fsSize().then((G) => {
          K.fsSize = G, B();
        }), !_ && !U && !O && !I && !W && c.fsStats().then((G) => {
          K.fsStats = G, B();
        }), !_ && !U && !O && !I && !W && c.disksIO().then((G) => {
          K.disksIO = G, B();
        }), !U && !O && !I && !W && f.wifiNetworks().then((G) => {
          K.wifiNetworks = G, B();
        }), m.inetLatency().then((G) => {
          K.inetLatency = G, B();
        });
      });
    });
  }
  function le(z, Z, H) {
    return new Promise(($) => {
      process.nextTick(() => {
        let B = {};
        Z && e.isFunction(Z) && !H && (H = Z, Z = ""), z && e.isFunction(z) && !Z && !H && (H = z, z = "", Z = ""), ie().then((K) => {
          B = K, oe(z, Z).then((G) => {
            for (let Se in G)
              ({}).hasOwnProperty.call(G, Se) && (B[Se] = G[Se]);
            H && H(B), $(B);
          });
        });
      });
    });
  }
  function X(z, Z) {
    return new Promise((H) => {
      process.nextTick(() => {
        const $ = Object.keys(z).filter((B) => ({}).hasOwnProperty.call(t, B)).map((B) => {
          const K = z[B].substring(z[B].lastIndexOf("(") + 1, z[B].lastIndexOf(")"));
          let G = B.indexOf(")") >= 0 ? B.split(")")[1].trim() : B;
          return G = B.indexOf("|") >= 0 ? B.split("|")[0].trim() : G, K ? t[G](K) : t[G]("");
        });
        Promise.all($).then((B) => {
          const K = {};
          let G = 0;
          for (let Se in z)
            if ({}.hasOwnProperty.call(z, Se) && {}.hasOwnProperty.call(t, Se) && B.length > G) {
              if (z[Se] === "*" || z[Se] === "all")
                K[Se] = B[G];
              else {
                let ye = z[Se], yn = "", Ft = [];
                if (ye.indexOf(")") >= 0 && (ye = ye.split(")")[1].trim()), ye.indexOf("|") >= 0 && (yn = ye.split("|")[1].trim(), Ft = yn.split(":"), ye = ye.split("|")[0].trim()), ye = ye.replace(/,/g, " ").replace(/ +/g, " ").split(" "), B[G])
                  if (Array.isArray(B[G])) {
                    const bt = [];
                    B[G].forEach((It) => {
                      let _t = {};
                      if (ye.length === 1 && (ye[0] === "*" || ye[0] === "all") ? _t = It : ye.forEach((je) => {
                        ({}).hasOwnProperty.call(It, je) && (_t[je] = It[je]);
                      }), yn && Ft.length === 2) {
                        if ({}.hasOwnProperty.call(_t, Ft[0].trim())) {
                          const je = _t[Ft[0].trim()];
                          typeof je == "number" ? je === parseFloat(Ft[1].trim()) && bt.push(_t) : typeof je == "string" && je.toLowerCase() === Ft[1].trim().toLowerCase() && bt.push(_t);
                        }
                      } else
                        bt.push(_t);
                    }), K[Se] = bt;
                  } else {
                    const bt = {};
                    ye.forEach((It) => {
                      ({}).hasOwnProperty.call(B[G], It) && (bt[It] = B[G][It]);
                    }), K[Se] = bt;
                  }
                else
                  K[Se] = {};
              }
              G++;
            }
          Z && Z(K), H(K);
        });
      });
    });
  }
  function fe(z, Z, H) {
    let $ = null;
    return setInterval(() => {
      X(z).then((K) => {
        JSON.stringify($) !== JSON.stringify(K) && ($ = Object.assign({}, K), H(K));
      });
    }, Z);
  }
  t.version = V, t.system = n.system, t.bios = n.bios, t.baseboard = n.baseboard, t.chassis = n.chassis, t.time = s.time, t.osInfo = s.osInfo, t.versions = s.versions, t.shell = s.shell, t.uuid = s.uuid, t.cpu = r.cpu, t.cpuFlags = r.cpuFlags, t.cpuCache = r.cpuCache, t.cpuCurrentSpeed = r.cpuCurrentSpeed, t.cpuTemperature = r.cpuTemperature, t.currentLoad = r.currentLoad, t.fullLoad = r.fullLoad, t.mem = o.mem, t.memLayout = o.memLayout, t.battery = a, t.graphics = l.graphics, t.fsSize = c.fsSize, t.fsOpenFiles = c.fsOpenFiles, t.blockDevices = c.blockDevices, t.fsStats = c.fsStats, t.disksIO = c.disksIO, t.diskLayout = c.diskLayout, t.networkInterfaceDefault = u.networkInterfaceDefault, t.networkGatewayDefault = u.networkGatewayDefault, t.networkInterfaces = u.networkInterfaces, t.networkStats = u.networkStats, t.networkConnections = u.networkConnections, t.wifiNetworks = f.wifiNetworks, t.wifiInterfaces = f.wifiInterfaces, t.wifiConnections = f.wifiConnections, t.services = p.services, t.processes = p.processes, t.processLoad = p.processLoad, t.users = d.users, t.inetChecksite = m.inetChecksite, t.inetLatency = m.inetLatency, t.dockerInfo = h.dockerInfo, t.dockerImages = h.dockerImages, t.dockerContainers = h.dockerContainers, t.dockerContainerStats = h.dockerContainerStats, t.dockerContainerProcesses = h.dockerContainerProcesses, t.dockerVolumes = h.dockerVolumes, t.dockerAll = h.dockerAll, t.vboxInfo = y.vboxInfo, t.printer = g.printer, t.usb = x.usb, t.audio = w.audio, t.bluetoothDevices = S.bluetoothDevices, t.getStaticData = ie, t.getDynamicData = oe, t.getAllData = le, t.get = X, t.observe = fe, t.powerShellStart = e.powerShellStart, t.powerShellRelease = e.powerShellRelease;
})(gs);
const Wi = /* @__PURE__ */ Io(gs);
var ei = {}, mn = {}, oi = {};
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.Constants = void 0;
var j0 = (
  /** @class */
  function() {
    function t() {
    }
    return t.WINDOWS_COMMAND = "wmic logicaldisk get Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list", t.LINUX_COMMAND = "df -P | awk 'NR > 1'", t.DARWIN_COMMAND = "df -P | awk 'NR > 1'", t;
  }()
);
oi.Constants = j0;
var Ei = {};
Object.defineProperty(Ei, "__esModule", { value: !0 });
var X0 = (
  /** @class */
  function() {
    function t(i, e, n, s, r, o) {
      this._filesystem = i, this._blocks = e, this._used = n, this._available = s, this._capacity = r, this._mounted = o;
    }
    return Object.defineProperty(t.prototype, "filesystem", {
      /**
       * Drive filesystem.
       *
       * @return Gets drive filesystem.
       */
      get: function() {
        return this._filesystem;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "blocks", {
      /**
       * Blocks associated to disk.
       *
       * @return Gets blocks associated to disk.
       */
      get: function() {
        return this._blocks;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "used", {
      /**
       * Used disk space.
       *
       * @return Gets used disk space.
       */
      get: function() {
        return this._used;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "available", {
      /**
       * Available disk space.
       *
       * @return Gets available disk space.
       */
      get: function() {
        return this._available;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "capacity", {
      /**
       * Disk capacity.
       *
       * @return Gets disk capacity.
       */
      get: function() {
        return this._capacity;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(t.prototype, "mounted", {
      /**
       * Indicates the mount point of the disk.
       *
       * @return Gets the mount point of the disk.
       */
      get: function() {
        return this._mounted;
      },
      enumerable: !1,
      configurable: !0
    }), t;
  }()
);
Ei.default = X0;
var Nt = {}, K0 = Te && Te.__createBinding || (Object.create ? function(t, i, e, n) {
  n === void 0 && (n = e), Object.defineProperty(t, n, { enumerable: !0, get: function() {
    return i[e];
  } });
} : function(t, i, e, n) {
  n === void 0 && (n = e), t[n] = i[e];
}), Y0 = Te && Te.__setModuleDefault || (Object.create ? function(t, i) {
  Object.defineProperty(t, "default", { enumerable: !0, value: i });
} : function(t, i) {
  t.default = i;
}), J0 = Te && Te.__importStar || function(t) {
  if (t && t.__esModule) return t;
  var i = {};
  if (t != null) for (var e in t) e !== "default" && Object.prototype.hasOwnProperty.call(t, e) && K0(i, t, e);
  return Y0(i, t), i;
};
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.Utils = void 0;
var Q0 = J0(se), Zr = te, Z0 = (
  /** @class */
  function() {
    function t() {
    }
    return t.detectPlatform = function() {
      return Q0.platform().toLowerCase();
    }, t.chcp = function() {
      return Zr.execSync("chcp").toString().split(":")[1].trim();
    }, t.execute = function(i) {
      return Zr.execSync(i, { windowsHide: !0, encoding: "buffer" });
    }, t;
  }()
);
Nt.Utils = Z0;
var eu = Te && Te.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.Darwin = void 0;
var tu = oi, iu = eu(Ei), nu = Nt, ru = (
  /** @class */
  function() {
    function t() {
    }
    return t.run = function() {
      var i = [], e = nu.Utils.execute(tu.Constants.DARWIN_COMMAND), n = e.toString().split(`
`);
      return n.forEach(function(s, r, o) {
        if (s !== "") {
          var a = s.replace(/ +(?= )/g, ""), l = a.split(" "), c = new iu.default(l[0], isNaN(parseFloat(l[1])) ? 0 : +l[1], isNaN(parseFloat(l[2])) ? 0 : +l[2], isNaN(parseFloat(l[3])) ? 0 : +l[3], l[4], l[5]);
          i.push(c);
        }
      }), i;
    }, t;
  }()
);
mn.Darwin = ru;
var hn = {}, su = Te && Te.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.Linux = void 0;
var ou = oi, au = su(Ei), cu = Nt, lu = (
  /** @class */
  function() {
    function t() {
    }
    return t.run = function() {
      var i = [], e = cu.Utils.execute(ou.Constants.LINUX_COMMAND), n = e.toString().split(`
`);
      return n.forEach(function(s) {
        if (s !== "") {
          var r = s.replace(/ +(?= )/g, ""), o = r.split(" "), a = new au.default(o[0], isNaN(parseFloat(o[1])) ? 0 : +o[1], isNaN(parseFloat(o[2])) ? 0 : +o[2], isNaN(parseFloat(o[3])) ? 0 : +o[3], o[4], o[5]);
          i.push(a);
        }
      }), i;
    }, t;
  }()
);
hn.Linux = lu;
var gn = {}, no = { exports: {} }, zi = Lo, Kt = zi.Buffer, Ae = {}, Ee;
for (Ee in zi)
  zi.hasOwnProperty(Ee) && (Ee === "SlowBuffer" || Ee === "Buffer" || (Ae[Ee] = zi[Ee]));
var Yt = Ae.Buffer = {};
for (Ee in Kt)
  Kt.hasOwnProperty(Ee) && (Ee === "allocUnsafe" || Ee === "allocUnsafeSlow" || (Yt[Ee] = Kt[Ee]));
Ae.Buffer.prototype = Kt.prototype;
(!Yt.from || Yt.from === Uint8Array.from) && (Yt.from = function(t, i, e) {
  if (typeof t == "number")
    throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof t);
  if (t && typeof t.length > "u")
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
  return Kt(t, i, e);
});
Yt.alloc || (Yt.alloc = function(t, i, e) {
  if (typeof t != "number")
    throw new TypeError('The "size" argument must be of type number. Received type ' + typeof t);
  if (t < 0 || t >= 2 * (1 << 30))
    throw new RangeError('The value "' + t + '" is invalid for option "size"');
  var n = Kt(t);
  return !i || i.length === 0 ? n.fill(0) : typeof e == "string" ? n.fill(i, e) : n.fill(i), n;
});
if (!Ae.kStringMaxLength)
  try {
    Ae.kStringMaxLength = process.binding("buffer").kStringMaxLength;
  } catch {
  }
Ae.constants || (Ae.constants = {
  MAX_LENGTH: Ae.kMaxLength
}, Ae.kStringMaxLength && (Ae.constants.MAX_STRING_LENGTH = Ae.kStringMaxLength));
var Lt = Ae, Sr = {}, ro = "\uFEFF";
Sr.PrependBOM = wr;
function wr(t, i) {
  this.encoder = t, this.addBOM = !0;
}
wr.prototype.write = function(t) {
  return this.addBOM && (t = ro + t, this.addBOM = !1), this.encoder.write(t);
};
wr.prototype.end = function() {
  return this.encoder.end();
};
Sr.StripBOM = Cr;
function Cr(t, i) {
  this.decoder = t, this.pass = !1, this.options = i || {};
}
Cr.prototype.write = function(t) {
  var i = this.decoder.write(t);
  return this.pass || !i || (i[0] === ro && (i = i.slice(1), typeof this.options.stripBOM == "function" && this.options.stripBOM()), this.pass = !0), i;
};
Cr.prototype.end = function() {
  return this.decoder.end();
};
var Dn = {}, Bn, es;
function uu() {
  if (es) return Bn;
  es = 1;
  var t = Lt.Buffer;
  Bn = {
    // Encodings
    utf8: { type: "_internal", bomAware: !0 },
    cesu8: { type: "_internal", bomAware: !0 },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: !0 },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    // Codec.
    _internal: i
  };
  function i(l, c) {
    this.enc = l.encodingName, this.bomAware = l.bomAware, this.enc === "base64" ? this.encoder = r : this.enc === "cesu8" && (this.enc = "utf8", this.encoder = o, t.from("eda0bdedb2a9", "hex").toString() !== "💩" && (this.decoder = a, this.defaultCharUnicode = c.defaultCharUnicode));
  }
  i.prototype.encoder = s, i.prototype.decoder = n;
  var e = bo.StringDecoder;
  e.prototype.end || (e.prototype.end = function() {
  });
  function n(l, c) {
    this.decoder = new e(c.enc);
  }
  n.prototype.write = function(l) {
    return t.isBuffer(l) || (l = t.from(l)), this.decoder.write(l);
  }, n.prototype.end = function() {
    return this.decoder.end();
  };
  function s(l, c) {
    this.enc = c.enc;
  }
  s.prototype.write = function(l) {
    return t.from(l, this.enc);
  }, s.prototype.end = function() {
  };
  function r(l, c) {
    this.prevStr = "";
  }
  r.prototype.write = function(l) {
    l = this.prevStr + l;
    var c = l.length - l.length % 4;
    return this.prevStr = l.slice(c), l = l.slice(0, c), t.from(l, "base64");
  }, r.prototype.end = function() {
    return t.from(this.prevStr, "base64");
  };
  function o(l, c) {
  }
  o.prototype.write = function(l) {
    for (var c = t.alloc(l.length * 3), u = 0, f = 0; f < l.length; f++) {
      var p = l.charCodeAt(f);
      p < 128 ? c[u++] = p : p < 2048 ? (c[u++] = 192 + (p >>> 6), c[u++] = 128 + (p & 63)) : (c[u++] = 224 + (p >>> 12), c[u++] = 128 + (p >>> 6 & 63), c[u++] = 128 + (p & 63));
    }
    return c.slice(0, u);
  }, o.prototype.end = function() {
  };
  function a(l, c) {
    this.acc = 0, this.contBytes = 0, this.accBytes = 0, this.defaultCharUnicode = c.defaultCharUnicode;
  }
  return a.prototype.write = function(l) {
    for (var c = this.acc, u = this.contBytes, f = this.accBytes, p = "", d = 0; d < l.length; d++) {
      var m = l[d];
      (m & 192) !== 128 ? (u > 0 && (p += this.defaultCharUnicode, u = 0), m < 128 ? p += String.fromCharCode(m) : m < 224 ? (c = m & 31, u = 1, f = 1) : m < 240 ? (c = m & 15, u = 2, f = 1) : p += this.defaultCharUnicode) : u > 0 ? (c = c << 6 | m & 63, u--, f++, u === 0 && (f === 2 && c < 128 && c > 0 ? p += this.defaultCharUnicode : f === 3 && c < 2048 ? p += this.defaultCharUnicode : p += String.fromCharCode(c))) : p += this.defaultCharUnicode;
    }
    return this.acc = c, this.contBytes = u, this.accBytes = f, p;
  }, a.prototype.end = function() {
    var l = 0;
    return this.contBytes > 0 && (l += this.defaultCharUnicode), l;
  }, Bn;
}
var Ue = {}, ts;
function pu() {
  if (ts) return Ue;
  ts = 1;
  var t = Lt.Buffer;
  Ue._utf32 = i;
  function i(c, u) {
    this.iconv = u, this.bomAware = !0, this.isLE = c.isLE;
  }
  Ue.utf32le = { type: "_utf32", isLE: !0 }, Ue.utf32be = { type: "_utf32", isLE: !1 }, Ue.ucs4le = "utf32le", Ue.ucs4be = "utf32be", i.prototype.encoder = e, i.prototype.decoder = n;
  function e(c, u) {
    this.isLE = u.isLE, this.highSurrogate = 0;
  }
  e.prototype.write = function(c) {
    for (var u = t.from(c, "ucs2"), f = t.alloc(u.length * 2), p = this.isLE ? f.writeUInt32LE : f.writeUInt32BE, d = 0, m = 0; m < u.length; m += 2) {
      var h = u.readUInt16LE(m), y = 55296 <= h && h < 56320, g = 56320 <= h && h < 57344;
      if (this.highSurrogate)
        if (y || !g)
          p.call(f, this.highSurrogate, d), d += 4;
        else {
          var x = (this.highSurrogate - 55296 << 10 | h - 56320) + 65536;
          p.call(f, x, d), d += 4, this.highSurrogate = 0;
          continue;
        }
      y ? this.highSurrogate = h : (p.call(f, h, d), d += 4, this.highSurrogate = 0);
    }
    return d < f.length && (f = f.slice(0, d)), f;
  }, e.prototype.end = function() {
    if (this.highSurrogate) {
      var c = t.alloc(4);
      return this.isLE ? c.writeUInt32LE(this.highSurrogate, 0) : c.writeUInt32BE(this.highSurrogate, 0), this.highSurrogate = 0, c;
    }
  };
  function n(c, u) {
    this.isLE = u.isLE, this.badChar = u.iconv.defaultCharUnicode.charCodeAt(0), this.overflow = [];
  }
  n.prototype.write = function(c) {
    if (c.length === 0)
      return "";
    var u = 0, f = 0, p = t.alloc(c.length + 4), d = 0, m = this.isLE, h = this.overflow, y = this.badChar;
    if (h.length > 0) {
      for (; u < c.length && h.length < 4; u++)
        h.push(c[u]);
      h.length === 4 && (m ? f = h[u] | h[u + 1] << 8 | h[u + 2] << 16 | h[u + 3] << 24 : f = h[u + 3] | h[u + 2] << 8 | h[u + 1] << 16 | h[u] << 24, h.length = 0, d = s(p, d, f, y));
    }
    for (; u < c.length - 3; u += 4)
      m ? f = c[u] | c[u + 1] << 8 | c[u + 2] << 16 | c[u + 3] << 24 : f = c[u + 3] | c[u + 2] << 8 | c[u + 1] << 16 | c[u] << 24, d = s(p, d, f, y);
    for (; u < c.length; u++)
      h.push(c[u]);
    return p.slice(0, d).toString("ucs2");
  };
  function s(c, u, f, p) {
    if ((f < 0 || f > 1114111) && (f = p), f >= 65536) {
      f -= 65536;
      var d = 55296 | f >> 10;
      c[u++] = d & 255, c[u++] = d >> 8;
      var f = 56320 | f & 1023;
    }
    return c[u++] = f & 255, c[u++] = f >> 8, u;
  }
  n.prototype.end = function() {
    this.overflow.length = 0;
  }, Ue.utf32 = r, Ue.ucs4 = "utf32";
  function r(c, u) {
    this.iconv = u;
  }
  r.prototype.encoder = o, r.prototype.decoder = a;
  function o(c, u) {
    c = c || {}, c.addBOM === void 0 && (c.addBOM = !0), this.encoder = u.iconv.getEncoder(c.defaultEncoding || "utf-32le", c);
  }
  o.prototype.write = function(c) {
    return this.encoder.write(c);
  }, o.prototype.end = function() {
    return this.encoder.end();
  };
  function a(c, u) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = c || {}, this.iconv = u.iconv;
  }
  a.prototype.write = function(c) {
    if (!this.decoder) {
      if (this.initialBufs.push(c), this.initialBufsLen += c.length, this.initialBufsLen < 32)
        return "";
      var u = l(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(u, this.options);
      for (var f = "", p = 0; p < this.initialBufs.length; p++)
        f += this.decoder.write(this.initialBufs[p]);
      return this.initialBufs.length = this.initialBufsLen = 0, f;
    }
    return this.decoder.write(c);
  }, a.prototype.end = function() {
    if (!this.decoder) {
      var c = l(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(c, this.options);
      for (var u = "", f = 0; f < this.initialBufs.length; f++)
        u += this.decoder.write(this.initialBufs[f]);
      var p = this.decoder.end();
      return p && (u += p), this.initialBufs.length = this.initialBufsLen = 0, u;
    }
    return this.decoder.end();
  };
  function l(c, u) {
    var f = [], p = 0, d = 0, m = 0, h = 0, y = 0;
    e:
      for (var g = 0; g < c.length; g++)
        for (var x = c[g], w = 0; w < x.length; w++)
          if (f.push(x[w]), f.length === 4) {
            if (p === 0) {
              if (f[0] === 255 && f[1] === 254 && f[2] === 0 && f[3] === 0)
                return "utf-32le";
              if (f[0] === 0 && f[1] === 0 && f[2] === 254 && f[3] === 255)
                return "utf-32be";
            }
            if ((f[0] !== 0 || f[1] > 16) && m++, (f[3] !== 0 || f[2] > 16) && d++, f[0] === 0 && f[1] === 0 && (f[2] !== 0 || f[3] !== 0) && y++, (f[0] !== 0 || f[1] !== 0) && f[2] === 0 && f[3] === 0 && h++, f.length = 0, p++, p >= 100)
              break e;
          }
    return y - m > h - d ? "utf-32be" : y - m < h - d ? "utf-32le" : u || "utf-32le";
  }
  return Ue;
}
var Ri = {}, is;
function fu() {
  if (is) return Ri;
  is = 1;
  var t = Lt.Buffer;
  Ri.utf16be = i;
  function i() {
  }
  i.prototype.encoder = e, i.prototype.decoder = n, i.prototype.bomAware = !0;
  function e() {
  }
  e.prototype.write = function(l) {
    for (var c = t.from(l, "ucs2"), u = 0; u < c.length; u += 2) {
      var f = c[u];
      c[u] = c[u + 1], c[u + 1] = f;
    }
    return c;
  }, e.prototype.end = function() {
  };
  function n() {
    this.overflowByte = -1;
  }
  n.prototype.write = function(l) {
    if (l.length == 0)
      return "";
    var c = t.alloc(l.length + 1), u = 0, f = 0;
    for (this.overflowByte !== -1 && (c[0] = l[0], c[1] = this.overflowByte, u = 1, f = 2); u < l.length - 1; u += 2, f += 2)
      c[f] = l[u + 1], c[f + 1] = l[u];
    return this.overflowByte = u == l.length - 1 ? l[l.length - 1] : -1, c.slice(0, f).toString("ucs2");
  }, n.prototype.end = function() {
    this.overflowByte = -1;
  }, Ri.utf16 = s;
  function s(l, c) {
    this.iconv = c;
  }
  s.prototype.encoder = r, s.prototype.decoder = o;
  function r(l, c) {
    l = l || {}, l.addBOM === void 0 && (l.addBOM = !0), this.encoder = c.iconv.getEncoder("utf-16le", l);
  }
  r.prototype.write = function(l) {
    return this.encoder.write(l);
  }, r.prototype.end = function() {
    return this.encoder.end();
  };
  function o(l, c) {
    this.decoder = null, this.initialBufs = [], this.initialBufsLen = 0, this.options = l || {}, this.iconv = c.iconv;
  }
  o.prototype.write = function(l) {
    if (!this.decoder) {
      if (this.initialBufs.push(l), this.initialBufsLen += l.length, this.initialBufsLen < 16)
        return "";
      var c = a(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(c, this.options);
      for (var u = "", f = 0; f < this.initialBufs.length; f++)
        u += this.decoder.write(this.initialBufs[f]);
      return this.initialBufs.length = this.initialBufsLen = 0, u;
    }
    return this.decoder.write(l);
  }, o.prototype.end = function() {
    if (!this.decoder) {
      var l = a(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(l, this.options);
      for (var c = "", u = 0; u < this.initialBufs.length; u++)
        c += this.decoder.write(this.initialBufs[u]);
      var f = this.decoder.end();
      return f && (c += f), this.initialBufs.length = this.initialBufsLen = 0, c;
    }
    return this.decoder.end();
  };
  function a(l, c) {
    var u = [], f = 0, p = 0, d = 0;
    e:
      for (var m = 0; m < l.length; m++)
        for (var h = l[m], y = 0; y < h.length; y++)
          if (u.push(h[y]), u.length === 2) {
            if (f === 0) {
              if (u[0] === 255 && u[1] === 254) return "utf-16le";
              if (u[0] === 254 && u[1] === 255) return "utf-16be";
            }
            if (u[0] === 0 && u[1] !== 0 && d++, u[0] !== 0 && u[1] === 0 && p++, u.length = 0, f++, f >= 100)
              break e;
          }
    return d > p ? "utf-16be" : d < p ? "utf-16le" : c || "utf-16le";
  }
  return Ri;
}
var fi = {}, ns;
function du() {
  if (ns) return fi;
  ns = 1;
  var t = Lt.Buffer;
  fi.utf7 = i, fi.unicode11utf7 = "utf7";
  function i(h, y) {
    this.iconv = y;
  }
  i.prototype.encoder = n, i.prototype.decoder = s, i.prototype.bomAware = !0;
  var e = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function n(h, y) {
    this.iconv = y.iconv;
  }
  n.prototype.write = function(h) {
    return t.from(h.replace(e, (function(y) {
      return "+" + (y === "+" ? "" : this.iconv.encode(y, "utf16-be").toString("base64").replace(/=+$/, "")) + "-";
    }).bind(this)));
  }, n.prototype.end = function() {
  };
  function s(h, y) {
    this.iconv = y.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  for (var r = /[A-Za-z0-9\/+]/, o = [], a = 0; a < 256; a++)
    o[a] = r.test(String.fromCharCode(a));
  var l = 43, c = 45, u = 38;
  s.prototype.write = function(h) {
    for (var y = "", g = 0, x = this.inBase64, w = this.base64Accum, S = 0; S < h.length; S++)
      if (!x)
        h[S] == l && (y += this.iconv.decode(h.slice(g, S), "ascii"), g = S + 1, x = !0);
      else if (!o[h[S]]) {
        if (S == g && h[S] == c)
          y += "+";
        else {
          var C = w + this.iconv.decode(h.slice(g, S), "ascii");
          y += this.iconv.decode(t.from(C, "base64"), "utf16-be");
        }
        h[S] != c && S--, g = S + 1, x = !1, w = "";
      }
    if (!x)
      y += this.iconv.decode(h.slice(g), "ascii");
    else {
      var C = w + this.iconv.decode(h.slice(g), "ascii"), _ = C.length - C.length % 8;
      w = C.slice(_), C = C.slice(0, _), y += this.iconv.decode(t.from(C, "base64"), "utf16-be");
    }
    return this.inBase64 = x, this.base64Accum = w, y;
  }, s.prototype.end = function() {
    var h = "";
    return this.inBase64 && this.base64Accum.length > 0 && (h = this.iconv.decode(t.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", h;
  }, fi.utf7imap = f;
  function f(h, y) {
    this.iconv = y;
  }
  f.prototype.encoder = p, f.prototype.decoder = d, f.prototype.bomAware = !0;
  function p(h, y) {
    this.iconv = y.iconv, this.inBase64 = !1, this.base64Accum = t.alloc(6), this.base64AccumIdx = 0;
  }
  p.prototype.write = function(h) {
    for (var y = this.inBase64, g = this.base64Accum, x = this.base64AccumIdx, w = t.alloc(h.length * 5 + 10), S = 0, C = 0; C < h.length; C++) {
      var _ = h.charCodeAt(C);
      32 <= _ && _ <= 126 ? (y && (x > 0 && (S += w.write(g.slice(0, x).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), S), x = 0), w[S++] = c, y = !1), y || (w[S++] = _, _ === u && (w[S++] = c))) : (y || (w[S++] = u, y = !0), y && (g[x++] = _ >> 8, g[x++] = _ & 255, x == g.length && (S += w.write(g.toString("base64").replace(/\//g, ","), S), x = 0)));
    }
    return this.inBase64 = y, this.base64AccumIdx = x, w.slice(0, S);
  }, p.prototype.end = function() {
    var h = t.alloc(10), y = 0;
    return this.inBase64 && (this.base64AccumIdx > 0 && (y += h.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), y), this.base64AccumIdx = 0), h[y++] = c, this.inBase64 = !1), h.slice(0, y);
  };
  function d(h, y) {
    this.iconv = y.iconv, this.inBase64 = !1, this.base64Accum = "";
  }
  var m = o.slice();
  return m[44] = !0, d.prototype.write = function(h) {
    for (var y = "", g = 0, x = this.inBase64, w = this.base64Accum, S = 0; S < h.length; S++)
      if (!x)
        h[S] == u && (y += this.iconv.decode(h.slice(g, S), "ascii"), g = S + 1, x = !0);
      else if (!m[h[S]]) {
        if (S == g && h[S] == c)
          y += "&";
        else {
          var C = w + this.iconv.decode(h.slice(g, S), "ascii").replace(/,/g, "/");
          y += this.iconv.decode(t.from(C, "base64"), "utf16-be");
        }
        h[S] != c && S--, g = S + 1, x = !1, w = "";
      }
    if (!x)
      y += this.iconv.decode(h.slice(g), "ascii");
    else {
      var C = w + this.iconv.decode(h.slice(g), "ascii").replace(/,/g, "/"), _ = C.length - C.length % 8;
      w = C.slice(_), C = C.slice(0, _), y += this.iconv.decode(t.from(C, "base64"), "utf16-be");
    }
    return this.inBase64 = x, this.base64Accum = w, y;
  }, d.prototype.end = function() {
    var h = "";
    return this.inBase64 && this.base64Accum.length > 0 && (h = this.iconv.decode(t.from(this.base64Accum, "base64"), "utf16-be")), this.inBase64 = !1, this.base64Accum = "", h;
  }, fi;
}
var Vn = {}, rs;
function mu() {
  if (rs) return Vn;
  rs = 1;
  var t = Lt.Buffer;
  Vn._sbcs = i;
  function i(s, r) {
    if (!s)
      throw new Error("SBCS codec is called without the data.");
    if (!s.chars || s.chars.length !== 128 && s.chars.length !== 256)
      throw new Error("Encoding '" + s.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (s.chars.length === 128) {
      for (var o = "", a = 0; a < 128; a++)
        o += String.fromCharCode(a);
      s.chars = o + s.chars;
    }
    this.decodeBuf = t.from(s.chars, "ucs2");
    for (var l = t.alloc(65536, r.defaultCharSingleByte.charCodeAt(0)), a = 0; a < s.chars.length; a++)
      l[s.chars.charCodeAt(a)] = a;
    this.encodeBuf = l;
  }
  i.prototype.encoder = e, i.prototype.decoder = n;
  function e(s, r) {
    this.encodeBuf = r.encodeBuf;
  }
  e.prototype.write = function(s) {
    for (var r = t.alloc(s.length), o = 0; o < s.length; o++)
      r[o] = this.encodeBuf[s.charCodeAt(o)];
    return r;
  }, e.prototype.end = function() {
  };
  function n(s, r) {
    this.decodeBuf = r.decodeBuf;
  }
  return n.prototype.write = function(s) {
    for (var r = this.decodeBuf, o = t.alloc(s.length * 2), a = 0, l = 0, c = 0; c < s.length; c++)
      a = s[c] * 2, l = c * 2, o[l] = r[a], o[l + 1] = r[a + 1];
    return o.toString("ucs2");
  }, n.prototype.end = function() {
  }, Vn;
}
var kn, ss;
function hu() {
  return ss || (ss = 1, kn = {
    // Not supported by iconv, not sure why.
    10029: "maccenteuro",
    maccenteuro: {
      type: "_sbcs",
      chars: "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },
    808: "cp808",
    ibm808: "cp808",
    cp808: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },
    mik: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    cp720: {
      type: "_sbcs",
      chars: "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■ "
    },
    // Aliases of generated encodings.
    ascii8bit: "ascii",
    usascii: "ascii",
    ansix34: "ascii",
    ansix341968: "ascii",
    ansix341986: "ascii",
    csascii: "ascii",
    cp367: "ascii",
    ibm367: "ascii",
    isoir6: "ascii",
    iso646us: "ascii",
    iso646irv: "ascii",
    us: "ascii",
    latin1: "iso88591",
    latin2: "iso88592",
    latin3: "iso88593",
    latin4: "iso88594",
    latin5: "iso88599",
    latin6: "iso885910",
    latin7: "iso885913",
    latin8: "iso885914",
    latin9: "iso885915",
    latin10: "iso885916",
    csisolatin1: "iso88591",
    csisolatin2: "iso88592",
    csisolatin3: "iso88593",
    csisolatin4: "iso88594",
    csisolatincyrillic: "iso88595",
    csisolatinarabic: "iso88596",
    csisolatingreek: "iso88597",
    csisolatinhebrew: "iso88598",
    csisolatin5: "iso88599",
    csisolatin6: "iso885910",
    l1: "iso88591",
    l2: "iso88592",
    l3: "iso88593",
    l4: "iso88594",
    l5: "iso88599",
    l6: "iso885910",
    l7: "iso885913",
    l8: "iso885914",
    l9: "iso885915",
    l10: "iso885916",
    isoir14: "iso646jp",
    isoir57: "iso646cn",
    isoir100: "iso88591",
    isoir101: "iso88592",
    isoir109: "iso88593",
    isoir110: "iso88594",
    isoir144: "iso88595",
    isoir127: "iso88596",
    isoir126: "iso88597",
    isoir138: "iso88598",
    isoir148: "iso88599",
    isoir157: "iso885910",
    isoir166: "tis620",
    isoir179: "iso885913",
    isoir199: "iso885914",
    isoir203: "iso885915",
    isoir226: "iso885916",
    cp819: "iso88591",
    ibm819: "iso88591",
    cyrillic: "iso88595",
    arabic: "iso88596",
    arabic8: "iso88596",
    ecma114: "iso88596",
    asmo708: "iso88596",
    greek: "iso88597",
    greek8: "iso88597",
    ecma118: "iso88597",
    elot928: "iso88597",
    hebrew: "iso88598",
    hebrew8: "iso88598",
    turkish: "iso88599",
    turkish8: "iso88599",
    thai: "iso885911",
    thai8: "iso885911",
    celtic: "iso885914",
    celtic8: "iso885914",
    isoceltic: "iso885914",
    tis6200: "tis620",
    tis62025291: "tis620",
    tis62025330: "tis620",
    1e4: "macroman",
    10006: "macgreek",
    10007: "maccyrillic",
    10079: "maciceland",
    10081: "macturkish",
    cspc8codepage437: "cp437",
    cspc775baltic: "cp775",
    cspc850multilingual: "cp850",
    cspcp852: "cp852",
    cspc862latinhebrew: "cp862",
    cpgr: "cp869",
    msee: "cp1250",
    mscyrl: "cp1251",
    msansi: "cp1252",
    msgreek: "cp1253",
    msturk: "cp1254",
    mshebr: "cp1255",
    msarab: "cp1256",
    winbaltrim: "cp1257",
    cp20866: "koi8r",
    20866: "koi8r",
    ibm878: "koi8r",
    cskoi8r: "koi8r",
    cp21866: "koi8u",
    21866: "koi8u",
    ibm1168: "koi8u",
    strk10482002: "rk1048",
    tcvn5712: "tcvn",
    tcvn57121: "tcvn",
    gb198880: "iso646cn",
    cn: "iso646cn",
    csiso14jisc6220ro: "iso646jp",
    jisc62201969ro: "iso646jp",
    jp: "iso646jp",
    cshproman8: "hproman8",
    r8: "hproman8",
    roman8: "hproman8",
    xroman8: "hproman8",
    ibm1051: "hproman8",
    mac: "macintosh",
    csmacintosh: "macintosh"
  }), kn;
}
var Nn, os;
function gu() {
  return os || (os = 1, Nn = {
    437: "cp437",
    737: "cp737",
    775: "cp775",
    850: "cp850",
    852: "cp852",
    855: "cp855",
    856: "cp856",
    857: "cp857",
    858: "cp858",
    860: "cp860",
    861: "cp861",
    862: "cp862",
    863: "cp863",
    864: "cp864",
    865: "cp865",
    866: "cp866",
    869: "cp869",
    874: "windows874",
    922: "cp922",
    1046: "cp1046",
    1124: "cp1124",
    1125: "cp1125",
    1129: "cp1129",
    1133: "cp1133",
    1161: "cp1161",
    1162: "cp1162",
    1163: "cp1163",
    1250: "windows1250",
    1251: "windows1251",
    1252: "windows1252",
    1253: "windows1253",
    1254: "windows1254",
    1255: "windows1255",
    1256: "windows1256",
    1257: "windows1257",
    1258: "windows1258",
    28591: "iso88591",
    28592: "iso88592",
    28593: "iso88593",
    28594: "iso88594",
    28595: "iso88595",
    28596: "iso88596",
    28597: "iso88597",
    28598: "iso88598",
    28599: "iso88599",
    28600: "iso885910",
    28601: "iso885911",
    28603: "iso885913",
    28604: "iso885914",
    28605: "iso885915",
    28606: "iso885916",
    windows874: {
      type: "_sbcs",
      chars: "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    win874: "windows874",
    cp874: "windows874",
    windows1250: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    win1250: "windows1250",
    cp1250: "windows1250",
    windows1251: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    win1251: "windows1251",
    cp1251: "windows1251",
    windows1252: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    win1252: "windows1252",
    cp1252: "windows1252",
    windows1253: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    win1253: "windows1253",
    cp1253: "windows1253",
    windows1254: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    win1254: "windows1254",
    cp1254: "windows1254",
    windows1255: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    win1255: "windows1255",
    cp1255: "windows1255",
    windows1256: {
      type: "_sbcs",
      chars: "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
    },
    win1256: "windows1256",
    cp1256: "windows1256",
    windows1257: {
      type: "_sbcs",
      chars: "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
    },
    win1257: "windows1257",
    cp1257: "windows1257",
    windows1258: {
      type: "_sbcs",
      chars: "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    win1258: "windows1258",
    cp1258: "windows1258",
    iso88591: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28591: "iso88591",
    iso88592: {
      type: "_sbcs",
      chars: " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    cp28592: "iso88592",
    iso88593: {
      type: "_sbcs",
      chars: " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
    },
    cp28593: "iso88593",
    iso88594: {
      type: "_sbcs",
      chars: " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
    },
    cp28594: "iso88594",
    iso88595: {
      type: "_sbcs",
      chars: " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
    },
    cp28595: "iso88595",
    iso88596: {
      type: "_sbcs",
      chars: " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
    },
    cp28596: "iso88596",
    iso88597: {
      type: "_sbcs",
      chars: " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    cp28597: "iso88597",
    iso88598: {
      type: "_sbcs",
      chars: " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    cp28598: "iso88598",
    iso88599: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    cp28599: "iso88599",
    iso885910: {
      type: "_sbcs",
      chars: " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
    },
    cp28600: "iso885910",
    iso885911: {
      type: "_sbcs",
      chars: " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    cp28601: "iso885911",
    iso885913: {
      type: "_sbcs",
      chars: " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
    },
    cp28603: "iso885913",
    iso885914: {
      type: "_sbcs",
      chars: " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
    },
    cp28604: "iso885914",
    iso885915: {
      type: "_sbcs",
      chars: " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    cp28605: "iso885915",
    iso885916: {
      type: "_sbcs",
      chars: " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
    },
    cp28606: "iso885916",
    cp437: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm437: "cp437",
    csibm437: "cp437",
    cp737: {
      type: "_sbcs",
      chars: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
    },
    ibm737: "cp737",
    csibm737: "cp737",
    cp775: {
      type: "_sbcs",
      chars: "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
    },
    ibm775: "cp775",
    csibm775: "cp775",
    cp850: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm850: "cp850",
    csibm850: "cp850",
    cp852: {
      type: "_sbcs",
      chars: "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
    },
    ibm852: "cp852",
    csibm852: "cp852",
    cp855: {
      type: "_sbcs",
      chars: "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
    },
    ibm855: "cp855",
    csibm855: "cp855",
    cp856: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm856: "cp856",
    csibm856: "cp856",
    cp857: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
    },
    ibm857: "cp857",
    csibm857: "cp857",
    cp858: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    ibm858: "cp858",
    csibm858: "cp858",
    cp860: {
      type: "_sbcs",
      chars: "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm860: "cp860",
    csibm860: "cp860",
    cp861: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm861: "cp861",
    csibm861: "cp861",
    cp862: {
      type: "_sbcs",
      chars: "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm862: "cp862",
    csibm862: "cp862",
    cp863: {
      type: "_sbcs",
      chars: "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm863: "cp863",
    csibm863: "cp863",
    cp864: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�`
    },
    ibm864: "cp864",
    csibm864: "cp864",
    cp865: {
      type: "_sbcs",
      chars: "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    ibm865: "cp865",
    csibm865: "cp865",
    cp866: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
    },
    ibm866: "cp866",
    csibm866: "cp866",
    cp869: {
      type: "_sbcs",
      chars: "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
    },
    ibm869: "cp869",
    csibm869: "cp869",
    cp922: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
    },
    ibm922: "cp922",
    csibm922: "cp922",
    cp1046: {
      type: "_sbcs",
      chars: "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
    },
    ibm1046: "cp1046",
    csibm1046: "cp1046",
    cp1124: {
      type: "_sbcs",
      chars: " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
    },
    ibm1124: "cp1124",
    csibm1124: "cp1124",
    cp1125: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
    },
    ibm1125: "cp1125",
    csibm1125: "cp1125",
    cp1129: {
      type: "_sbcs",
      chars: " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1129: "cp1129",
    csibm1129: "cp1129",
    cp1133: {
      type: "_sbcs",
      chars: " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
    },
    ibm1133: "cp1133",
    csibm1133: "cp1133",
    cp1161: {
      type: "_sbcs",
      chars: "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
    },
    ibm1161: "cp1161",
    csibm1161: "cp1161",
    cp1162: {
      type: "_sbcs",
      chars: "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    ibm1162: "cp1162",
    csibm1162: "cp1162",
    cp1163: {
      type: "_sbcs",
      chars: " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    ibm1163: "cp1163",
    csibm1163: "cp1163",
    maccroatian: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
    },
    maccyrillic: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    macgreek: {
      type: "_sbcs",
      chars: "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
    },
    maciceland: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macroman: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macromania: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macthai: {
      type: "_sbcs",
      chars: "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\uFEFF​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
    },
    macturkish: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
    },
    macukraine: {
      type: "_sbcs",
      chars: "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    koi8r: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8u: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8ru: {
      type: "_sbcs",
      chars: "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    koi8t: {
      type: "_sbcs",
      chars: "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    armscii8: {
      type: "_sbcs",
      chars: " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
    },
    rk1048: {
      type: "_sbcs",
      chars: "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    tcvn: {
      type: "_sbcs",
      chars: `\0ÚỤỪỬỮ\x07\b	
\v\f\rỨỰỲỶỸÝỴ\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ`
    },
    georgianacademy: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    georgianps: {
      type: "_sbcs",
      chars: "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    pt154: {
      type: "_sbcs",
      chars: "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    viscii: {
      type: "_sbcs",
      chars: `\0ẲẴẪ\x07\b	
\v\f\rỶỸ\x1BỴ !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ`
    },
    iso646cn: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    iso646jp: {
      type: "_sbcs",
      chars: `\0\x07\b	
\v\f\r\x1B !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_\`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������`
    },
    hproman8: {
      type: "_sbcs",
      chars: " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
    },
    macintosh: {
      type: "_sbcs",
      chars: "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    ascii: {
      type: "_sbcs",
      chars: "��������������������������������������������������������������������������������������������������������������������������������"
    },
    tis620: {
      type: "_sbcs",
      chars: "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    }
  }), Nn;
}
var Fn = {}, as;
function yu() {
  if (as) return Fn;
  as = 1;
  var t = Lt.Buffer;
  Fn._dbcs = l;
  for (var i = -1, e = -2, n = -10, s = -1e3, r = new Array(256), o = -1, a = 0; a < 256; a++)
    r[a] = i;
  function l(p, d) {
    if (this.encodingName = p.encodingName, !p)
      throw new Error("DBCS codec is called without the data.");
    if (!p.table)
      throw new Error("Encoding '" + this.encodingName + "' has no data.");
    var m = p.table();
    this.decodeTables = [], this.decodeTables[0] = r.slice(0), this.decodeTableSeq = [];
    for (var h = 0; h < m.length; h++)
      this._addDecodeChunk(m[h]);
    if (typeof p.gb18030 == "function") {
      this.gb18030 = p.gb18030();
      var y = this.decodeTables.length;
      this.decodeTables.push(r.slice(0));
      var g = this.decodeTables.length;
      this.decodeTables.push(r.slice(0));
      for (var x = this.decodeTables[0], h = 129; h <= 254; h++)
        for (var w = this.decodeTables[s - x[h]], S = 48; S <= 57; S++) {
          if (w[S] === i)
            w[S] = s - y;
          else if (w[S] > s)
            throw new Error("gb18030 decode tables conflict at byte 2");
          for (var C = this.decodeTables[s - w[S]], _ = 129; _ <= 254; _++) {
            if (C[_] === i)
              C[_] = s - g;
            else {
              if (C[_] === s - g)
                continue;
              if (C[_] > s)
                throw new Error("gb18030 decode tables conflict at byte 3");
            }
            for (var O = this.decodeTables[s - C[_]], U = 48; U <= 57; U++)
              O[U] === i && (O[U] = e);
          }
        }
    }
    this.defaultCharUnicode = d.defaultCharUnicode, this.encodeTable = [], this.encodeTableSeq = [];
    var I = {};
    if (p.encodeSkipVals)
      for (var h = 0; h < p.encodeSkipVals.length; h++) {
        var W = p.encodeSkipVals[h];
        if (typeof W == "number")
          I[W] = !0;
        else
          for (var S = W.from; S <= W.to; S++)
            I[S] = !0;
      }
    if (this._fillEncodeTable(0, 0, I), p.encodeAdd)
      for (var V in p.encodeAdd)
        Object.prototype.hasOwnProperty.call(p.encodeAdd, V) && this._setEncodeChar(V.charCodeAt(0), p.encodeAdd[V]);
    this.defCharSB = this.encodeTable[0][d.defaultCharSingleByte.charCodeAt(0)], this.defCharSB === i && (this.defCharSB = this.encodeTable[0]["?"]), this.defCharSB === i && (this.defCharSB = 63);
  }
  l.prototype.encoder = c, l.prototype.decoder = u, l.prototype._getDecodeTrieNode = function(p) {
    for (var d = []; p > 0; p >>>= 8)
      d.push(p & 255);
    d.length == 0 && d.push(0);
    for (var m = this.decodeTables[0], h = d.length - 1; h > 0; h--) {
      var y = m[d[h]];
      if (y == i)
        m[d[h]] = s - this.decodeTables.length, this.decodeTables.push(m = r.slice(0));
      else if (y <= s)
        m = this.decodeTables[s - y];
      else
        throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + p.toString(16));
    }
    return m;
  }, l.prototype._addDecodeChunk = function(p) {
    var d = parseInt(p[0], 16), m = this._getDecodeTrieNode(d);
    d = d & 255;
    for (var h = 1; h < p.length; h++) {
      var y = p[h];
      if (typeof y == "string")
        for (var g = 0; g < y.length; ) {
          var x = y.charCodeAt(g++);
          if (55296 <= x && x < 56320) {
            var w = y.charCodeAt(g++);
            if (56320 <= w && w < 57344)
              m[d++] = 65536 + (x - 55296) * 1024 + (w - 56320);
            else
              throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + p[0]);
          } else if (4080 < x && x <= 4095) {
            for (var S = 4095 - x + 2, C = [], _ = 0; _ < S; _++)
              C.push(y.charCodeAt(g++));
            m[d++] = n - this.decodeTableSeq.length, this.decodeTableSeq.push(C);
          } else
            m[d++] = x;
        }
      else if (typeof y == "number")
        for (var O = m[d - 1] + 1, g = 0; g < y; g++)
          m[d++] = O++;
      else
        throw new Error("Incorrect type '" + typeof y + "' given in " + this.encodingName + " at chunk " + p[0]);
    }
    if (d > 255)
      throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + p[0] + ": too long" + d);
  }, l.prototype._getEncodeBucket = function(p) {
    var d = p >> 8;
    return this.encodeTable[d] === void 0 && (this.encodeTable[d] = r.slice(0)), this.encodeTable[d];
  }, l.prototype._setEncodeChar = function(p, d) {
    var m = this._getEncodeBucket(p), h = p & 255;
    m[h] <= n ? this.encodeTableSeq[n - m[h]][o] = d : m[h] == i && (m[h] = d);
  }, l.prototype._setEncodeSequence = function(p, d) {
    var m = p[0], h = this._getEncodeBucket(m), y = m & 255, g;
    h[y] <= n ? g = this.encodeTableSeq[n - h[y]] : (g = {}, h[y] !== i && (g[o] = h[y]), h[y] = n - this.encodeTableSeq.length, this.encodeTableSeq.push(g));
    for (var x = 1; x < p.length - 1; x++) {
      var w = g[m];
      typeof w == "object" ? g = w : (g = g[m] = {}, w !== void 0 && (g[o] = w));
    }
    m = p[p.length - 1], g[m] = d;
  }, l.prototype._fillEncodeTable = function(p, d, m) {
    for (var h = this.decodeTables[p], y = !1, g = {}, x = 0; x < 256; x++) {
      var w = h[x], S = d + x;
      if (!m[S])
        if (w >= 0)
          this._setEncodeChar(w, S), y = !0;
        else if (w <= s) {
          var C = s - w;
          if (!g[C]) {
            var _ = S << 8 >>> 0;
            this._fillEncodeTable(C, _, m) ? y = !0 : g[C] = !0;
          }
        } else w <= n && (this._setEncodeSequence(this.decodeTableSeq[n - w], S), y = !0);
    }
    return y;
  };
  function c(p, d) {
    this.leadSurrogate = -1, this.seqObj = void 0, this.encodeTable = d.encodeTable, this.encodeTableSeq = d.encodeTableSeq, this.defaultCharSingleByte = d.defCharSB, this.gb18030 = d.gb18030;
  }
  c.prototype.write = function(p) {
    for (var d = t.alloc(p.length * (this.gb18030 ? 4 : 3)), m = this.leadSurrogate, h = this.seqObj, y = -1, g = 0, x = 0; ; ) {
      if (y === -1) {
        if (g == p.length) break;
        var w = p.charCodeAt(g++);
      } else {
        var w = y;
        y = -1;
      }
      if (55296 <= w && w < 57344)
        if (w < 56320)
          if (m === -1) {
            m = w;
            continue;
          } else
            m = w, w = i;
        else
          m !== -1 ? (w = 65536 + (m - 55296) * 1024 + (w - 56320), m = -1) : w = i;
      else m !== -1 && (y = w, w = i, m = -1);
      var S = i;
      if (h !== void 0 && w != i) {
        var C = h[w];
        if (typeof C == "object") {
          h = C;
          continue;
        } else typeof C == "number" ? S = C : C == null && (C = h[o], C !== void 0 && (S = C, y = w));
        h = void 0;
      } else if (w >= 0) {
        var _ = this.encodeTable[w >> 8];
        if (_ !== void 0 && (S = _[w & 255]), S <= n) {
          h = this.encodeTableSeq[n - S];
          continue;
        }
        if (S == i && this.gb18030) {
          var O = f(this.gb18030.uChars, w);
          if (O != -1) {
            var S = this.gb18030.gbChars[O] + (w - this.gb18030.uChars[O]);
            d[x++] = 129 + Math.floor(S / 12600), S = S % 12600, d[x++] = 48 + Math.floor(S / 1260), S = S % 1260, d[x++] = 129 + Math.floor(S / 10), S = S % 10, d[x++] = 48 + S;
            continue;
          }
        }
      }
      S === i && (S = this.defaultCharSingleByte), S < 256 ? d[x++] = S : S < 65536 ? (d[x++] = S >> 8, d[x++] = S & 255) : S < 16777216 ? (d[x++] = S >> 16, d[x++] = S >> 8 & 255, d[x++] = S & 255) : (d[x++] = S >>> 24, d[x++] = S >>> 16 & 255, d[x++] = S >>> 8 & 255, d[x++] = S & 255);
    }
    return this.seqObj = h, this.leadSurrogate = m, d.slice(0, x);
  }, c.prototype.end = function() {
    if (!(this.leadSurrogate === -1 && this.seqObj === void 0)) {
      var p = t.alloc(10), d = 0;
      if (this.seqObj) {
        var m = this.seqObj[o];
        m !== void 0 && (m < 256 ? p[d++] = m : (p[d++] = m >> 8, p[d++] = m & 255)), this.seqObj = void 0;
      }
      return this.leadSurrogate !== -1 && (p[d++] = this.defaultCharSingleByte, this.leadSurrogate = -1), p.slice(0, d);
    }
  }, c.prototype.findIdx = f;
  function u(p, d) {
    this.nodeIdx = 0, this.prevBytes = [], this.decodeTables = d.decodeTables, this.decodeTableSeq = d.decodeTableSeq, this.defaultCharUnicode = d.defaultCharUnicode, this.gb18030 = d.gb18030;
  }
  u.prototype.write = function(p) {
    for (var d = t.alloc(p.length * 2), m = this.nodeIdx, h = this.prevBytes, y = this.prevBytes.length, g = -this.prevBytes.length, x, w = 0, S = 0; w < p.length; w++) {
      var C = w >= 0 ? p[w] : h[w + y], x = this.decodeTables[m][C];
      if (!(x >= 0)) if (x === i)
        x = this.defaultCharUnicode.charCodeAt(0), w = g;
      else if (x === e) {
        if (w >= 3)
          var _ = (p[w - 3] - 129) * 12600 + (p[w - 2] - 48) * 1260 + (p[w - 1] - 129) * 10 + (C - 48);
        else
          var _ = (h[w - 3 + y] - 129) * 12600 + ((w - 2 >= 0 ? p[w - 2] : h[w - 2 + y]) - 48) * 1260 + ((w - 1 >= 0 ? p[w - 1] : h[w - 1 + y]) - 129) * 10 + (C - 48);
        var O = f(this.gb18030.gbChars, _);
        x = this.gb18030.uChars[O] + _ - this.gb18030.gbChars[O];
      } else if (x <= s) {
        m = s - x;
        continue;
      } else if (x <= n) {
        for (var U = this.decodeTableSeq[n - x], I = 0; I < U.length - 1; I++)
          x = U[I], d[S++] = x & 255, d[S++] = x >> 8;
        x = U[U.length - 1];
      } else
        throw new Error("iconv-lite internal error: invalid decoding table value " + x + " at " + m + "/" + C);
      if (x >= 65536) {
        x -= 65536;
        var W = 55296 | x >> 10;
        d[S++] = W & 255, d[S++] = W >> 8, x = 56320 | x & 1023;
      }
      d[S++] = x & 255, d[S++] = x >> 8, m = 0, g = w + 1;
    }
    return this.nodeIdx = m, this.prevBytes = g >= 0 ? Array.prototype.slice.call(p, g) : h.slice(g + y).concat(Array.prototype.slice.call(p)), d.slice(0, S).toString("ucs2");
  }, u.prototype.end = function() {
    for (var p = ""; this.prevBytes.length > 0; ) {
      p += this.defaultCharUnicode;
      var d = this.prevBytes.slice(1);
      this.prevBytes = [], this.nodeIdx = 0, d.length > 0 && (p += this.write(d));
    }
    return this.prevBytes = [], this.nodeIdx = 0, p;
  };
  function f(p, d) {
    if (p[0] > d)
      return -1;
    for (var m = 0, h = p.length; m < h - 1; ) {
      var y = m + (h - m + 1 >> 1);
      p[y] <= d ? m = y : h = y;
    }
    return m;
  }
  return Fn;
}
const xu = [
  [
    "0",
    "\0",
    128
  ],
  [
    "a1",
    "｡",
    62
  ],
  [
    "8140",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×"
  ],
  [
    "8180",
    "÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "81b8",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "81c8",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "81da",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "81f0",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "81fc",
    "◯"
  ],
  [
    "824f",
    "０",
    9
  ],
  [
    "8260",
    "Ａ",
    25
  ],
  [
    "8281",
    "ａ",
    25
  ],
  [
    "829f",
    "ぁ",
    82
  ],
  [
    "8340",
    "ァ",
    62
  ],
  [
    "8380",
    "ム",
    22
  ],
  [
    "839f",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "83bf",
    "α",
    16,
    "σ",
    6
  ],
  [
    "8440",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "8470",
    "а",
    5,
    "ёж",
    7
  ],
  [
    "8480",
    "о",
    17
  ],
  [
    "849f",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "8740",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "875f",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "877e",
    "㍻"
  ],
  [
    "8780",
    "〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "889f",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "8940",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円"
  ],
  [
    "8980",
    "園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "8a40",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫"
  ],
  [
    "8a80",
    "橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "8b40",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救"
  ],
  [
    "8b80",
    "朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "8c40",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨"
  ],
  [
    "8c80",
    "劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "8d40",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降"
  ],
  [
    "8d80",
    "項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "8e40",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止"
  ],
  [
    "8e80",
    "死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "8f40",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳"
  ],
  [
    "8f80",
    "準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "9040",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨"
  ],
  [
    "9080",
    "逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "9140",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻"
  ],
  [
    "9180",
    "操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "9240",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄"
  ],
  [
    "9280",
    "逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "9340",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬"
  ],
  [
    "9380",
    "凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "9440",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅"
  ],
  [
    "9480",
    "楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "9540",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷"
  ],
  [
    "9580",
    "斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "9640",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆"
  ],
  [
    "9680",
    "摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "9740",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲"
  ],
  [
    "9780",
    "沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "9840",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "989f",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "9940",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭"
  ],
  [
    "9980",
    "凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "9a40",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸"
  ],
  [
    "9a80",
    "噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "9b40",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀"
  ],
  [
    "9b80",
    "它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "9c40",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠"
  ],
  [
    "9c80",
    "怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "9d40",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫"
  ],
  [
    "9d80",
    "捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "9e40",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎"
  ],
  [
    "9e80",
    "梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "9f40",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯"
  ],
  [
    "9f80",
    "麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "e040",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝"
  ],
  [
    "e080",
    "烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e140",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿"
  ],
  [
    "e180",
    "痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e240",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰"
  ],
  [
    "e280",
    "窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e340",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷"
  ],
  [
    "e380",
    "縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e440",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤"
  ],
  [
    "e480",
    "艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e540",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬"
  ],
  [
    "e580",
    "蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "e640",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧"
  ],
  [
    "e680",
    "諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "e740",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜"
  ],
  [
    "e780",
    "轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "e840",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙"
  ],
  [
    "e880",
    "閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "e940",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃"
  ],
  [
    "e980",
    "騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "ea40",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯"
  ],
  [
    "ea80",
    "黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙"
  ],
  [
    "ed40",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏"
  ],
  [
    "ed80",
    "塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "ee40",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙"
  ],
  [
    "ee80",
    "蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "eeef",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "f040",
    "",
    62
  ],
  [
    "f080",
    "",
    124
  ],
  [
    "f140",
    "",
    62
  ],
  [
    "f180",
    "",
    124
  ],
  [
    "f240",
    "",
    62
  ],
  [
    "f280",
    "",
    124
  ],
  [
    "f340",
    "",
    62
  ],
  [
    "f380",
    "",
    124
  ],
  [
    "f440",
    "",
    62
  ],
  [
    "f480",
    "",
    124
  ],
  [
    "f540",
    "",
    62
  ],
  [
    "f580",
    "",
    124
  ],
  [
    "f640",
    "",
    62
  ],
  [
    "f680",
    "",
    124
  ],
  [
    "f740",
    "",
    62
  ],
  [
    "f780",
    "",
    124
  ],
  [
    "f840",
    "",
    62
  ],
  [
    "f880",
    "",
    124
  ],
  [
    "f940",
    ""
  ],
  [
    "fa40",
    "ⅰ",
    9,
    "Ⅰ",
    9,
    "￢￤＇＂㈱№℡∵纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊"
  ],
  [
    "fa80",
    "兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯"
  ],
  [
    "fb40",
    "涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神"
  ],
  [
    "fb80",
    "祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙"
  ],
  [
    "fc40",
    "髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ]
], Su = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8ea1",
    "｡",
    62
  ],
  [
    "a1a1",
    "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈",
    9,
    "＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇"
  ],
  [
    "a2a1",
    "◆□■△▲▽▼※〒→←↑↓〓"
  ],
  [
    "a2ba",
    "∈∋⊆⊇⊂⊃∪∩"
  ],
  [
    "a2ca",
    "∧∨￢⇒⇔∀∃"
  ],
  [
    "a2dc",
    "∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬"
  ],
  [
    "a2f2",
    "Å‰♯♭♪†‡¶"
  ],
  [
    "a2fe",
    "◯"
  ],
  [
    "a3b0",
    "０",
    9
  ],
  [
    "a3c1",
    "Ａ",
    25
  ],
  [
    "a3e1",
    "ａ",
    25
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a8a1",
    "─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂"
  ],
  [
    "ada1",
    "①",
    19,
    "Ⅰ",
    9
  ],
  [
    "adc0",
    "㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡"
  ],
  [
    "addf",
    "㍻〝〟№㏍℡㊤",
    4,
    "㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
  ],
  [
    "b0a1",
    "亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭"
  ],
  [
    "b1a1",
    "院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応"
  ],
  [
    "b2a1",
    "押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改"
  ],
  [
    "b3a1",
    "魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱"
  ],
  [
    "b4a1",
    "粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄"
  ],
  [
    "b5a1",
    "機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京"
  ],
  [
    "b6a1",
    "供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈"
  ],
  [
    "b7a1",
    "掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲"
  ],
  [
    "b8a1",
    "検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向"
  ],
  [
    "b9a1",
    "后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込"
  ],
  [
    "baa1",
    "此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷"
  ],
  [
    "bba1",
    "察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時"
  ],
  [
    "bca1",
    "次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周"
  ],
  [
    "bda1",
    "宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償"
  ],
  [
    "bea1",
    "勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾"
  ],
  [
    "bfa1",
    "拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾"
  ],
  [
    "c0a1",
    "澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線"
  ],
  [
    "c1a1",
    "繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎"
  ],
  [
    "c2a1",
    "臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只"
  ],
  [
    "c3a1",
    "叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵"
  ],
  [
    "c4a1",
    "帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓"
  ],
  [
    "c5a1",
    "邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到"
  ],
  [
    "c6a1",
    "董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入"
  ],
  [
    "c7a1",
    "如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦"
  ],
  [
    "c8a1",
    "函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美"
  ],
  [
    "c9a1",
    "鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服"
  ],
  [
    "caa1",
    "福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋"
  ],
  [
    "cba1",
    "法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満"
  ],
  [
    "cca1",
    "漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒"
  ],
  [
    "cda1",
    "諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃"
  ],
  [
    "cea1",
    "痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯"
  ],
  [
    "cfa1",
    "蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕"
  ],
  [
    "d0a1",
    "弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲"
  ],
  [
    "d1a1",
    "僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨"
  ],
  [
    "d2a1",
    "辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨"
  ],
  [
    "d3a1",
    "咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉"
  ],
  [
    "d4a1",
    "圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩"
  ],
  [
    "d5a1",
    "奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓"
  ],
  [
    "d6a1",
    "屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏"
  ],
  [
    "d7a1",
    "廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚"
  ],
  [
    "d8a1",
    "悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛"
  ],
  [
    "d9a1",
    "戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼"
  ],
  [
    "daa1",
    "據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼"
  ],
  [
    "dba1",
    "曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍"
  ],
  [
    "dca1",
    "棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣"
  ],
  [
    "dda1",
    "檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾"
  ],
  [
    "dea1",
    "沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌"
  ],
  [
    "dfa1",
    "漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼"
  ],
  [
    "e0a1",
    "燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱"
  ],
  [
    "e1a1",
    "瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰"
  ],
  [
    "e2a1",
    "癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬"
  ],
  [
    "e3a1",
    "磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐"
  ],
  [
    "e4a1",
    "筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆"
  ],
  [
    "e5a1",
    "紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺"
  ],
  [
    "e6a1",
    "罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋"
  ],
  [
    "e7a1",
    "隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙"
  ],
  [
    "e8a1",
    "茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈"
  ],
  [
    "e9a1",
    "蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙"
  ],
  [
    "eaa1",
    "蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞"
  ],
  [
    "eba1",
    "襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫"
  ],
  [
    "eca1",
    "譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊"
  ],
  [
    "eda1",
    "蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸"
  ],
  [
    "eea1",
    "遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮"
  ],
  [
    "efa1",
    "錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞"
  ],
  [
    "f0a1",
    "陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰"
  ],
  [
    "f1a1",
    "顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷"
  ],
  [
    "f2a1",
    "髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈"
  ],
  [
    "f3a1",
    "鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠"
  ],
  [
    "f4a1",
    "堯槇遙瑤凜熙"
  ],
  [
    "f9a1",
    "纊褜鍈銈蓜俉炻昱棈鋹曻彅丨仡仼伀伃伹佖侒侊侚侔俍偀倢俿倞偆偰偂傔僴僘兊兤冝冾凬刕劜劦勀勛匀匇匤卲厓厲叝﨎咜咊咩哿喆坙坥垬埈埇﨏塚增墲夋奓奛奝奣妤妺孖寀甯寘寬尞岦岺峵崧嵓﨑嵂嵭嶸嶹巐弡弴彧德"
  ],
  [
    "faa1",
    "忞恝悅悊惞惕愠惲愑愷愰憘戓抦揵摠撝擎敎昀昕昻昉昮昞昤晥晗晙晴晳暙暠暲暿曺朎朗杦枻桒柀栁桄棏﨓楨﨔榘槢樰橫橆橳橾櫢櫤毖氿汜沆汯泚洄涇浯涖涬淏淸淲淼渹湜渧渼溿澈澵濵瀅瀇瀨炅炫焏焄煜煆煇凞燁燾犱"
  ],
  [
    "fba1",
    "犾猤猪獷玽珉珖珣珒琇珵琦琪琩琮瑢璉璟甁畯皂皜皞皛皦益睆劯砡硎硤硺礰礼神祥禔福禛竑竧靖竫箞精絈絜綷綠緖繒罇羡羽茁荢荿菇菶葈蒴蕓蕙蕫﨟薰蘒﨡蠇裵訒訷詹誧誾諟諸諶譓譿賰賴贒赶﨣軏﨤逸遧郞都鄕鄧釚"
  ],
  [
    "fca1",
    "釗釞釭釮釤釥鈆鈐鈊鈺鉀鈼鉎鉙鉑鈹鉧銧鉷鉸鋧鋗鋙鋐﨧鋕鋠鋓錥錡鋻﨨錞鋿錝錂鍰鍗鎤鏆鏞鏸鐱鑅鑈閒隆﨩隝隯霳霻靃靍靏靑靕顗顥飯飼餧館馞驎髙髜魵魲鮏鮱鮻鰀鵰鵫鶴鸙黑"
  ],
  [
    "fcf1",
    "ⅰ",
    9,
    "￢￤＇＂"
  ],
  [
    "8fa2af",
    "˘ˇ¸˙˝¯˛˚～΄΅"
  ],
  [
    "8fa2c2",
    "¡¦¿"
  ],
  [
    "8fa2eb",
    "ºª©®™¤№"
  ],
  [
    "8fa6e1",
    "ΆΈΉΊΪ"
  ],
  [
    "8fa6e7",
    "Ό"
  ],
  [
    "8fa6e9",
    "ΎΫ"
  ],
  [
    "8fa6ec",
    "Ώ"
  ],
  [
    "8fa6f1",
    "άέήίϊΐόςύϋΰώ"
  ],
  [
    "8fa7c2",
    "Ђ",
    10,
    "ЎЏ"
  ],
  [
    "8fa7f2",
    "ђ",
    10,
    "ўџ"
  ],
  [
    "8fa9a1",
    "ÆĐ"
  ],
  [
    "8fa9a4",
    "Ħ"
  ],
  [
    "8fa9a6",
    "Ĳ"
  ],
  [
    "8fa9a8",
    "ŁĿ"
  ],
  [
    "8fa9ab",
    "ŊØŒ"
  ],
  [
    "8fa9af",
    "ŦÞ"
  ],
  [
    "8fa9c1",
    "æđðħıĳĸłŀŉŋøœßŧþ"
  ],
  [
    "8faaa1",
    "ÁÀÄÂĂǍĀĄÅÃĆĈČÇĊĎÉÈËÊĚĖĒĘ"
  ],
  [
    "8faaba",
    "ĜĞĢĠĤÍÌÏÎǏİĪĮĨĴĶĹĽĻŃŇŅÑÓÒÖÔǑŐŌÕŔŘŖŚŜŠŞŤŢÚÙÜÛŬǓŰŪŲŮŨǗǛǙǕŴÝŸŶŹŽŻ"
  ],
  [
    "8faba1",
    "áàäâăǎāąåãćĉčçċďéèëêěėēęǵĝğ"
  ],
  [
    "8fabbd",
    "ġĥíìïîǐ"
  ],
  [
    "8fabc5",
    "īįĩĵķĺľļńňņñóòöôǒőōõŕřŗśŝšşťţúùüûŭǔűūųůũǘǜǚǖŵýÿŷźžż"
  ],
  [
    "8fb0a1",
    "丂丄丅丌丒丟丣两丨丫丮丯丰丵乀乁乄乇乑乚乜乣乨乩乴乵乹乿亍亖亗亝亯亹仃仐仚仛仠仡仢仨仯仱仳仵份仾仿伀伂伃伈伋伌伒伕伖众伙伮伱你伳伵伷伹伻伾佀佂佈佉佋佌佒佔佖佘佟佣佪佬佮佱佷佸佹佺佽佾侁侂侄"
  ],
  [
    "8fb1a1",
    "侅侉侊侌侎侐侒侓侔侗侙侚侞侟侲侷侹侻侼侽侾俀俁俅俆俈俉俋俌俍俏俒俜俠俢俰俲俼俽俿倀倁倄倇倊倌倎倐倓倗倘倛倜倝倞倢倧倮倰倲倳倵偀偁偂偅偆偊偌偎偑偒偓偗偙偟偠偢偣偦偧偪偭偰偱倻傁傃傄傆傊傎傏傐"
  ],
  [
    "8fb2a1",
    "傒傓傔傖傛傜傞",
    4,
    "傪傯傰傹傺傽僀僃僄僇僌僎僐僓僔僘僜僝僟僢僤僦僨僩僯僱僶僺僾儃儆儇儈儋儌儍儎僲儐儗儙儛儜儝儞儣儧儨儬儭儯儱儳儴儵儸儹兂兊兏兓兕兗兘兟兤兦兾冃冄冋冎冘冝冡冣冭冸冺冼冾冿凂"
  ],
  [
    "8fb3a1",
    "凈减凑凒凓凕凘凞凢凥凮凲凳凴凷刁刂刅划刓刕刖刘刢刨刱刲刵刼剅剉剕剗剘剚剜剟剠剡剦剮剷剸剹劀劂劅劊劌劓劕劖劗劘劚劜劤劥劦劧劯劰劶劷劸劺劻劽勀勄勆勈勌勏勑勔勖勛勜勡勥勨勩勪勬勰勱勴勶勷匀匃匊匋"
  ],
  [
    "8fb4a1",
    "匌匑匓匘匛匜匞匟匥匧匨匩匫匬匭匰匲匵匼匽匾卂卌卋卙卛卡卣卥卬卭卲卹卾厃厇厈厎厓厔厙厝厡厤厪厫厯厲厴厵厷厸厺厽叀叅叏叒叓叕叚叝叞叠另叧叵吂吓吚吡吧吨吪启吱吴吵呃呄呇呍呏呞呢呤呦呧呩呫呭呮呴呿"
  ],
  [
    "8fb5a1",
    "咁咃咅咈咉咍咑咕咖咜咟咡咦咧咩咪咭咮咱咷咹咺咻咿哆哊响哎哠哪哬哯哶哼哾哿唀唁唅唈唉唌唍唎唕唪唫唲唵唶唻唼唽啁啇啉啊啍啐啑啘啚啛啞啠啡啤啦啿喁喂喆喈喎喏喑喒喓喔喗喣喤喭喲喿嗁嗃嗆嗉嗋嗌嗎嗑嗒"
  ],
  [
    "8fb6a1",
    "嗓嗗嗘嗛嗞嗢嗩嗶嗿嘅嘈嘊嘍",
    5,
    "嘙嘬嘰嘳嘵嘷嘹嘻嘼嘽嘿噀噁噃噄噆噉噋噍噏噔噞噠噡噢噣噦噩噭噯噱噲噵嚄嚅嚈嚋嚌嚕嚙嚚嚝嚞嚟嚦嚧嚨嚩嚫嚬嚭嚱嚳嚷嚾囅囉囊囋囏囐囌囍囙囜囝囟囡囤",
    4,
    "囱囫园"
  ],
  [
    "8fb7a1",
    "囶囷圁圂圇圊圌圑圕圚圛圝圠圢圣圤圥圩圪圬圮圯圳圴圽圾圿坅坆坌坍坒坢坥坧坨坫坭",
    4,
    "坳坴坵坷坹坺坻坼坾垁垃垌垔垗垙垚垜垝垞垟垡垕垧垨垩垬垸垽埇埈埌埏埕埝埞埤埦埧埩埭埰埵埶埸埽埾埿堃堄堈堉埡"
  ],
  [
    "8fb8a1",
    "堌堍堛堞堟堠堦堧堭堲堹堿塉塌塍塏塐塕塟塡塤塧塨塸塼塿墀墁墇墈墉墊墌墍墏墐墔墖墝墠墡墢墦墩墱墲壄墼壂壈壍壎壐壒壔壖壚壝壡壢壩壳夅夆夋夌夒夓夔虁夝夡夣夤夨夯夰夳夵夶夿奃奆奒奓奙奛奝奞奟奡奣奫奭"
  ],
  [
    "8fb9a1",
    "奯奲奵奶她奻奼妋妌妎妒妕妗妟妤妧妭妮妯妰妳妷妺妼姁姃姄姈姊姍姒姝姞姟姣姤姧姮姯姱姲姴姷娀娄娌娍娎娒娓娞娣娤娧娨娪娭娰婄婅婇婈婌婐婕婞婣婥婧婭婷婺婻婾媋媐媓媖媙媜媞媟媠媢媧媬媱媲媳媵媸媺媻媿"
  ],
  [
    "8fbaa1",
    "嫄嫆嫈嫏嫚嫜嫠嫥嫪嫮嫵嫶嫽嬀嬁嬈嬗嬴嬙嬛嬝嬡嬥嬭嬸孁孋孌孒孖孞孨孮孯孼孽孾孿宁宄宆宊宎宐宑宓宔宖宨宩宬宭宯宱宲宷宺宼寀寁寍寏寖",
    4,
    "寠寯寱寴寽尌尗尞尟尣尦尩尫尬尮尰尲尵尶屙屚屜屢屣屧屨屩"
  ],
  [
    "8fbba1",
    "屭屰屴屵屺屻屼屽岇岈岊岏岒岝岟岠岢岣岦岪岲岴岵岺峉峋峒峝峗峮峱峲峴崁崆崍崒崫崣崤崦崧崱崴崹崽崿嵂嵃嵆嵈嵕嵑嵙嵊嵟嵠嵡嵢嵤嵪嵭嵰嵹嵺嵾嵿嶁嶃嶈嶊嶒嶓嶔嶕嶙嶛嶟嶠嶧嶫嶰嶴嶸嶹巃巇巋巐巎巘巙巠巤"
  ],
  [
    "8fbca1",
    "巩巸巹帀帇帍帒帔帕帘帟帠帮帨帲帵帾幋幐幉幑幖幘幛幜幞幨幪",
    4,
    "幰庀庋庎庢庤庥庨庪庬庱庳庽庾庿廆廌廋廎廑廒廔廕廜廞廥廫异弆弇弈弎弙弜弝弡弢弣弤弨弫弬弮弰弴弶弻弽弿彀彄彅彇彍彐彔彘彛彠彣彤彧"
  ],
  [
    "8fbda1",
    "彯彲彴彵彸彺彽彾徉徍徏徖徜徝徢徧徫徤徬徯徰徱徸忄忇忈忉忋忐",
    4,
    "忞忡忢忨忩忪忬忭忮忯忲忳忶忺忼怇怊怍怓怔怗怘怚怟怤怭怳怵恀恇恈恉恌恑恔恖恗恝恡恧恱恾恿悂悆悈悊悎悑悓悕悘悝悞悢悤悥您悰悱悷"
  ],
  [
    "8fbea1",
    "悻悾惂惄惈惉惊惋惎惏惔惕惙惛惝惞惢惥惲惵惸惼惽愂愇愊愌愐",
    4,
    "愖愗愙愜愞愢愪愫愰愱愵愶愷愹慁慅慆慉慞慠慬慲慸慻慼慿憀憁憃憄憋憍憒憓憗憘憜憝憟憠憥憨憪憭憸憹憼懀懁懂懎懏懕懜懝懞懟懡懢懧懩懥"
  ],
  [
    "8fbfa1",
    "懬懭懯戁戃戄戇戓戕戜戠戢戣戧戩戫戹戽扂扃扄扆扌扐扑扒扔扖扚扜扤扭扯扳扺扽抍抎抏抐抦抨抳抶抷抺抾抿拄拎拕拖拚拪拲拴拼拽挃挄挊挋挍挐挓挖挘挩挪挭挵挶挹挼捁捂捃捄捆捊捋捎捒捓捔捘捛捥捦捬捭捱捴捵"
  ],
  [
    "8fc0a1",
    "捸捼捽捿掂掄掇掊掐掔掕掙掚掞掤掦掭掮掯掽揁揅揈揎揑揓揔揕揜揠揥揪揬揲揳揵揸揹搉搊搐搒搔搘搞搠搢搤搥搩搪搯搰搵搽搿摋摏摑摒摓摔摚摛摜摝摟摠摡摣摭摳摴摻摽撅撇撏撐撑撘撙撛撝撟撡撣撦撨撬撳撽撾撿"
  ],
  [
    "8fc1a1",
    "擄擉擊擋擌擎擐擑擕擗擤擥擩擪擭擰擵擷擻擿攁攄攈攉攊攏攓攔攖攙攛攞攟攢攦攩攮攱攺攼攽敃敇敉敐敒敔敟敠敧敫敺敽斁斅斊斒斕斘斝斠斣斦斮斲斳斴斿旂旈旉旎旐旔旖旘旟旰旲旴旵旹旾旿昀昄昈昉昍昑昒昕昖昝"
  ],
  [
    "8fc2a1",
    "昞昡昢昣昤昦昩昪昫昬昮昰昱昳昹昷晀晅晆晊晌晑晎晗晘晙晛晜晠晡曻晪晫晬晾晳晵晿晷晸晹晻暀晼暋暌暍暐暒暙暚暛暜暟暠暤暭暱暲暵暻暿曀曂曃曈曌曎曏曔曛曟曨曫曬曮曺朅朇朎朓朙朜朠朢朳朾杅杇杈杌杔杕杝"
  ],
  [
    "8fc3a1",
    "杦杬杮杴杶杻极构枎枏枑枓枖枘枙枛枰枱枲枵枻枼枽柹柀柂柃柅柈柉柒柗柙柜柡柦柰柲柶柷桒栔栙栝栟栨栧栬栭栯栰栱栳栻栿桄桅桊桌桕桗桘桛桫桮",
    4,
    "桵桹桺桻桼梂梄梆梈梖梘梚梜梡梣梥梩梪梮梲梻棅棈棌棏"
  ],
  [
    "8fc4a1",
    "棐棑棓棖棙棜棝棥棨棪棫棬棭棰棱棵棶棻棼棽椆椉椊椐椑椓椖椗椱椳椵椸椻楂楅楉楎楗楛楣楤楥楦楨楩楬楰楱楲楺楻楿榀榍榒榖榘榡榥榦榨榫榭榯榷榸榺榼槅槈槑槖槗槢槥槮槯槱槳槵槾樀樁樃樏樑樕樚樝樠樤樨樰樲"
  ],
  [
    "8fc5a1",
    "樴樷樻樾樿橅橆橉橊橎橐橑橒橕橖橛橤橧橪橱橳橾檁檃檆檇檉檋檑檛檝檞檟檥檫檯檰檱檴檽檾檿櫆櫉櫈櫌櫐櫔櫕櫖櫜櫝櫤櫧櫬櫰櫱櫲櫼櫽欂欃欆欇欉欏欐欑欗欛欞欤欨欫欬欯欵欶欻欿歆歊歍歒歖歘歝歠歧歫歮歰歵歽"
  ],
  [
    "8fc6a1",
    "歾殂殅殗殛殟殠殢殣殨殩殬殭殮殰殸殹殽殾毃毄毉毌毖毚毡毣毦毧毮毱毷毹毿氂氄氅氉氍氎氐氒氙氟氦氧氨氬氮氳氵氶氺氻氿汊汋汍汏汒汔汙汛汜汫汭汯汴汶汸汹汻沅沆沇沉沔沕沗沘沜沟沰沲沴泂泆泍泏泐泑泒泔泖"
  ],
  [
    "8fc7a1",
    "泚泜泠泧泩泫泬泮泲泴洄洇洊洎洏洑洓洚洦洧洨汧洮洯洱洹洼洿浗浞浟浡浥浧浯浰浼涂涇涑涒涔涖涗涘涪涬涴涷涹涽涿淄淈淊淎淏淖淛淝淟淠淢淥淩淯淰淴淶淼渀渄渞渢渧渲渶渹渻渼湄湅湈湉湋湏湑湒湓湔湗湜湝湞"
  ],
  [
    "8fc8a1",
    "湢湣湨湳湻湽溍溓溙溠溧溭溮溱溳溻溿滀滁滃滇滈滊滍滎滏滫滭滮滹滻滽漄漈漊漌漍漖漘漚漛漦漩漪漯漰漳漶漻漼漭潏潑潒潓潗潙潚潝潞潡潢潨潬潽潾澃澇澈澋澌澍澐澒澓澔澖澚澟澠澥澦澧澨澮澯澰澵澶澼濅濇濈濊"
  ],
  [
    "8fc9a1",
    "濚濞濨濩濰濵濹濼濽瀀瀅瀆瀇瀍瀗瀠瀣瀯瀴瀷瀹瀼灃灄灈灉灊灋灔灕灝灞灎灤灥灬灮灵灶灾炁炅炆炔",
    4,
    "炛炤炫炰炱炴炷烊烑烓烔烕烖烘烜烤烺焃",
    4,
    "焋焌焏焞焠焫焭焯焰焱焸煁煅煆煇煊煋煐煒煗煚煜煞煠"
  ],
  [
    "8fcaa1",
    "煨煹熀熅熇熌熒熚熛熠熢熯熰熲熳熺熿燀燁燄燋燌燓燖燙燚燜燸燾爀爇爈爉爓爗爚爝爟爤爫爯爴爸爹牁牂牃牅牎牏牐牓牕牖牚牜牞牠牣牨牫牮牯牱牷牸牻牼牿犄犉犍犎犓犛犨犭犮犱犴犾狁狇狉狌狕狖狘狟狥狳狴狺狻"
  ],
  [
    "8fcba1",
    "狾猂猄猅猇猋猍猒猓猘猙猞猢猤猧猨猬猱猲猵猺猻猽獃獍獐獒獖獘獝獞獟獠獦獧獩獫獬獮獯獱獷獹獼玀玁玃玅玆玎玐玓玕玗玘玜玞玟玠玢玥玦玪玫玭玵玷玹玼玽玿珅珆珉珋珌珏珒珓珖珙珝珡珣珦珧珩珴珵珷珹珺珻珽"
  ],
  [
    "8fcca1",
    "珿琀琁琄琇琊琑琚琛琤琦琨",
    9,
    "琹瑀瑃瑄瑆瑇瑋瑍瑑瑒瑗瑝瑢瑦瑧瑨瑫瑭瑮瑱瑲璀璁璅璆璇璉璏璐璑璒璘璙璚璜璟璠璡璣璦璨璩璪璫璮璯璱璲璵璹璻璿瓈瓉瓌瓐瓓瓘瓚瓛瓞瓟瓤瓨瓪瓫瓯瓴瓺瓻瓼瓿甆"
  ],
  [
    "8fcda1",
    "甒甖甗甠甡甤甧甩甪甯甶甹甽甾甿畀畃畇畈畎畐畒畗畞畟畡畯畱畹",
    5,
    "疁疅疐疒疓疕疙疜疢疤疴疺疿痀痁痄痆痌痎痏痗痜痟痠痡痤痧痬痮痯痱痹瘀瘂瘃瘄瘇瘈瘊瘌瘏瘒瘓瘕瘖瘙瘛瘜瘝瘞瘣瘥瘦瘩瘭瘲瘳瘵瘸瘹"
  ],
  [
    "8fcea1",
    "瘺瘼癊癀癁癃癄癅癉癋癕癙癟癤癥癭癮癯癱癴皁皅皌皍皕皛皜皝皟皠皢",
    6,
    "皪皭皽盁盅盉盋盌盎盔盙盠盦盨盬盰盱盶盹盼眀眆眊眎眒眔眕眗眙眚眜眢眨眭眮眯眴眵眶眹眽眾睂睅睆睊睍睎睏睒睖睗睜睞睟睠睢"
  ],
  [
    "8fcfa1",
    "睤睧睪睬睰睲睳睴睺睽瞀瞄瞌瞍瞔瞕瞖瞚瞟瞢瞧瞪瞮瞯瞱瞵瞾矃矉矑矒矕矙矞矟矠矤矦矪矬矰矱矴矸矻砅砆砉砍砎砑砝砡砢砣砭砮砰砵砷硃硄硇硈硌硎硒硜硞硠硡硣硤硨硪确硺硾碊碏碔碘碡碝碞碟碤碨碬碭碰碱碲碳"
  ],
  [
    "8fd0a1",
    "碻碽碿磇磈磉磌磎磒磓磕磖磤磛磟磠磡磦磪磲磳礀磶磷磺磻磿礆礌礐礚礜礞礟礠礥礧礩礭礱礴礵礻礽礿祄祅祆祊祋祏祑祔祘祛祜祧祩祫祲祹祻祼祾禋禌禑禓禔禕禖禘禛禜禡禨禩禫禯禱禴禸离秂秄秇秈秊秏秔秖秚秝秞"
  ],
  [
    "8fd1a1",
    "秠秢秥秪秫秭秱秸秼稂稃稇稉稊稌稑稕稛稞稡稧稫稭稯稰稴稵稸稹稺穄穅穇穈穌穕穖穙穜穝穟穠穥穧穪穭穵穸穾窀窂窅窆窊窋窐窑窔窞窠窣窬窳窵窹窻窼竆竉竌竎竑竛竨竩竫竬竱竴竻竽竾笇笔笟笣笧笩笪笫笭笮笯笰"
  ],
  [
    "8fd2a1",
    "笱笴笽笿筀筁筇筎筕筠筤筦筩筪筭筯筲筳筷箄箉箎箐箑箖箛箞箠箥箬箯箰箲箵箶箺箻箼箽篂篅篈篊篔篖篗篙篚篛篨篪篲篴篵篸篹篺篼篾簁簂簃簄簆簉簋簌簎簏簙簛簠簥簦簨簬簱簳簴簶簹簺籆籊籕籑籒籓籙",
    5
  ],
  [
    "8fd3a1",
    "籡籣籧籩籭籮籰籲籹籼籽粆粇粏粔粞粠粦粰粶粷粺粻粼粿糄糇糈糉糍糏糓糔糕糗糙糚糝糦糩糫糵紃紇紈紉紏紑紒紓紖紝紞紣紦紪紭紱紼紽紾絀絁絇絈絍絑絓絗絙絚絜絝絥絧絪絰絸絺絻絿綁綂綃綅綆綈綋綌綍綑綖綗綝"
  ],
  [
    "8fd4a1",
    "綞綦綧綪綳綶綷綹緂",
    4,
    "緌緍緎緗緙縀緢緥緦緪緫緭緱緵緶緹緺縈縐縑縕縗縜縝縠縧縨縬縭縯縳縶縿繄繅繇繎繐繒繘繟繡繢繥繫繮繯繳繸繾纁纆纇纊纍纑纕纘纚纝纞缼缻缽缾缿罃罄罇罏罒罓罛罜罝罡罣罤罥罦罭"
  ],
  [
    "8fd5a1",
    "罱罽罾罿羀羋羍羏羐羑羖羗羜羡羢羦羪羭羴羼羿翀翃翈翎翏翛翟翣翥翨翬翮翯翲翺翽翾翿耇耈耊耍耎耏耑耓耔耖耝耞耟耠耤耦耬耮耰耴耵耷耹耺耼耾聀聄聠聤聦聭聱聵肁肈肎肜肞肦肧肫肸肹胈胍胏胒胔胕胗胘胠胭胮"
  ],
  [
    "8fd6a1",
    "胰胲胳胶胹胺胾脃脋脖脗脘脜脞脠脤脧脬脰脵脺脼腅腇腊腌腒腗腠腡腧腨腩腭腯腷膁膐膄膅膆膋膎膖膘膛膞膢膮膲膴膻臋臃臅臊臎臏臕臗臛臝臞臡臤臫臬臰臱臲臵臶臸臹臽臿舀舃舏舓舔舙舚舝舡舢舨舲舴舺艃艄艅艆"
  ],
  [
    "8fd7a1",
    "艋艎艏艑艖艜艠艣艧艭艴艻艽艿芀芁芃芄芇芉芊芎芑芔芖芘芚芛芠芡芣芤芧芨芩芪芮芰芲芴芷芺芼芾芿苆苐苕苚苠苢苤苨苪苭苯苶苷苽苾茀茁茇茈茊茋荔茛茝茞茟茡茢茬茭茮茰茳茷茺茼茽荂荃荄荇荍荎荑荕荖荗荰荸"
  ],
  [
    "8fd8a1",
    "荽荿莀莂莄莆莍莒莔莕莘莙莛莜莝莦莧莩莬莾莿菀菇菉菏菐菑菔菝荓菨菪菶菸菹菼萁萆萊萏萑萕萙莭萯萹葅葇葈葊葍葏葑葒葖葘葙葚葜葠葤葥葧葪葰葳葴葶葸葼葽蒁蒅蒒蒓蒕蒞蒦蒨蒩蒪蒯蒱蒴蒺蒽蒾蓀蓂蓇蓈蓌蓏蓓"
  ],
  [
    "8fd9a1",
    "蓜蓧蓪蓯蓰蓱蓲蓷蔲蓺蓻蓽蔂蔃蔇蔌蔎蔐蔜蔞蔢蔣蔤蔥蔧蔪蔫蔯蔳蔴蔶蔿蕆蕏",
    4,
    "蕖蕙蕜",
    6,
    "蕤蕫蕯蕹蕺蕻蕽蕿薁薅薆薉薋薌薏薓薘薝薟薠薢薥薧薴薶薷薸薼薽薾薿藂藇藊藋藎薭藘藚藟藠藦藨藭藳藶藼"
  ],
  [
    "8fdaa1",
    "藿蘀蘄蘅蘍蘎蘐蘑蘒蘘蘙蘛蘞蘡蘧蘩蘶蘸蘺蘼蘽虀虂虆虒虓虖虗虘虙虝虠",
    4,
    "虩虬虯虵虶虷虺蚍蚑蚖蚘蚚蚜蚡蚦蚧蚨蚭蚱蚳蚴蚵蚷蚸蚹蚿蛀蛁蛃蛅蛑蛒蛕蛗蛚蛜蛠蛣蛥蛧蚈蛺蛼蛽蜄蜅蜇蜋蜎蜏蜐蜓蜔蜙蜞蜟蜡蜣"
  ],
  [
    "8fdba1",
    "蜨蜮蜯蜱蜲蜹蜺蜼蜽蜾蝀蝃蝅蝍蝘蝝蝡蝤蝥蝯蝱蝲蝻螃",
    6,
    "螋螌螐螓螕螗螘螙螞螠螣螧螬螭螮螱螵螾螿蟁蟈蟉蟊蟎蟕蟖蟙蟚蟜蟟蟢蟣蟤蟪蟫蟭蟱蟳蟸蟺蟿蠁蠃蠆蠉蠊蠋蠐蠙蠒蠓蠔蠘蠚蠛蠜蠞蠟蠨蠭蠮蠰蠲蠵"
  ],
  [
    "8fdca1",
    "蠺蠼衁衃衅衈衉衊衋衎衑衕衖衘衚衜衟衠衤衩衱衹衻袀袘袚袛袜袟袠袨袪袺袽袾裀裊",
    4,
    "裑裒裓裛裞裧裯裰裱裵裷褁褆褍褎褏褕褖褘褙褚褜褠褦褧褨褰褱褲褵褹褺褾襀襂襅襆襉襏襒襗襚襛襜襡襢襣襫襮襰襳襵襺"
  ],
  [
    "8fdda1",
    "襻襼襽覉覍覐覔覕覛覜覟覠覥覰覴覵覶覷覼觔",
    4,
    "觥觩觫觭觱觳觶觹觽觿訄訅訇訏訑訒訔訕訞訠訢訤訦訫訬訯訵訷訽訾詀詃詅詇詉詍詎詓詖詗詘詜詝詡詥詧詵詶詷詹詺詻詾詿誀誃誆誋誏誐誒誖誗誙誟誧誩誮誯誳"
  ],
  [
    "8fdea1",
    "誶誷誻誾諃諆諈諉諊諑諓諔諕諗諝諟諬諰諴諵諶諼諿謅謆謋謑謜謞謟謊謭謰謷謼譂",
    4,
    "譈譒譓譔譙譍譞譣譭譶譸譹譼譾讁讄讅讋讍讏讔讕讜讞讟谸谹谽谾豅豇豉豋豏豑豓豔豗豘豛豝豙豣豤豦豨豩豭豳豵豶豻豾貆"
  ],
  [
    "8fdfa1",
    "貇貋貐貒貓貙貛貜貤貹貺賅賆賉賋賏賖賕賙賝賡賨賬賯賰賲賵賷賸賾賿贁贃贉贒贗贛赥赩赬赮赿趂趄趈趍趐趑趕趞趟趠趦趫趬趯趲趵趷趹趻跀跅跆跇跈跊跎跑跔跕跗跙跤跥跧跬跰趼跱跲跴跽踁踄踅踆踋踑踔踖踠踡踢"
  ],
  [
    "8fe0a1",
    "踣踦踧踱踳踶踷踸踹踽蹀蹁蹋蹍蹎蹏蹔蹛蹜蹝蹞蹡蹢蹩蹬蹭蹯蹰蹱蹹蹺蹻躂躃躉躐躒躕躚躛躝躞躢躧躩躭躮躳躵躺躻軀軁軃軄軇軏軑軔軜軨軮軰軱軷軹軺軭輀輂輇輈輏輐輖輗輘輞輠輡輣輥輧輨輬輭輮輴輵輶輷輺轀轁"
  ],
  [
    "8fe1a1",
    "轃轇轏轑",
    4,
    "轘轝轞轥辝辠辡辤辥辦辵辶辸达迀迁迆迊迋迍运迒迓迕迠迣迤迨迮迱迵迶迻迾适逄逈逌逘逛逨逩逯逪逬逭逳逴逷逿遃遄遌遛遝遢遦遧遬遰遴遹邅邈邋邌邎邐邕邗邘邙邛邠邡邢邥邰邲邳邴邶邽郌邾郃"
  ],
  [
    "8fe2a1",
    "郄郅郇郈郕郗郘郙郜郝郟郥郒郶郫郯郰郴郾郿鄀鄄鄅鄆鄈鄍鄐鄔鄖鄗鄘鄚鄜鄞鄠鄥鄢鄣鄧鄩鄮鄯鄱鄴鄶鄷鄹鄺鄼鄽酃酇酈酏酓酗酙酚酛酡酤酧酭酴酹酺酻醁醃醅醆醊醎醑醓醔醕醘醞醡醦醨醬醭醮醰醱醲醳醶醻醼醽醿"
  ],
  [
    "8fe3a1",
    "釂釃釅釓釔釗釙釚釞釤釥釩釪釬",
    5,
    "釷釹釻釽鈀鈁鈄鈅鈆鈇鈉鈊鈌鈐鈒鈓鈖鈘鈜鈝鈣鈤鈥鈦鈨鈮鈯鈰鈳鈵鈶鈸鈹鈺鈼鈾鉀鉂鉃鉆鉇鉊鉍鉎鉏鉑鉘鉙鉜鉝鉠鉡鉥鉧鉨鉩鉮鉯鉰鉵",
    4,
    "鉻鉼鉽鉿銈銉銊銍銎銒銗"
  ],
  [
    "8fe4a1",
    "銙銟銠銤銥銧銨銫銯銲銶銸銺銻銼銽銿",
    4,
    "鋅鋆鋇鋈鋋鋌鋍鋎鋐鋓鋕鋗鋘鋙鋜鋝鋟鋠鋡鋣鋥鋧鋨鋬鋮鋰鋹鋻鋿錀錂錈錍錑錔錕錜錝錞錟錡錤錥錧錩錪錳錴錶錷鍇鍈鍉鍐鍑鍒鍕鍗鍘鍚鍞鍤鍥鍧鍩鍪鍭鍯鍰鍱鍳鍴鍶"
  ],
  [
    "8fe5a1",
    "鍺鍽鍿鎀鎁鎂鎈鎊鎋鎍鎏鎒鎕鎘鎛鎞鎡鎣鎤鎦鎨鎫鎴鎵鎶鎺鎩鏁鏄鏅鏆鏇鏉",
    4,
    "鏓鏙鏜鏞鏟鏢鏦鏧鏹鏷鏸鏺鏻鏽鐁鐂鐄鐈鐉鐍鐎鐏鐕鐖鐗鐟鐮鐯鐱鐲鐳鐴鐻鐿鐽鑃鑅鑈鑊鑌鑕鑙鑜鑟鑡鑣鑨鑫鑭鑮鑯鑱鑲钄钃镸镹"
  ],
  [
    "8fe6a1",
    "镾閄閈閌閍閎閝閞閟閡閦閩閫閬閴閶閺閽閿闆闈闉闋闐闑闒闓闙闚闝闞闟闠闤闦阝阞阢阤阥阦阬阱阳阷阸阹阺阼阽陁陒陔陖陗陘陡陮陴陻陼陾陿隁隂隃隄隉隑隖隚隝隟隤隥隦隩隮隯隳隺雊雒嶲雘雚雝雞雟雩雯雱雺霂"
  ],
  [
    "8fe7a1",
    "霃霅霉霚霛霝霡霢霣霨霱霳靁靃靊靎靏靕靗靘靚靛靣靧靪靮靳靶靷靸靻靽靿鞀鞉鞕鞖鞗鞙鞚鞞鞟鞢鞬鞮鞱鞲鞵鞶鞸鞹鞺鞼鞾鞿韁韄韅韇韉韊韌韍韎韐韑韔韗韘韙韝韞韠韛韡韤韯韱韴韷韸韺頇頊頙頍頎頔頖頜頞頠頣頦"
  ],
  [
    "8fe8a1",
    "頫頮頯頰頲頳頵頥頾顄顇顊顑顒顓顖顗顙顚顢顣顥顦顪顬颫颭颮颰颴颷颸颺颻颿飂飅飈飌飡飣飥飦飧飪飳飶餂餇餈餑餕餖餗餚餛餜餟餢餦餧餫餱",
    4,
    "餹餺餻餼饀饁饆饇饈饍饎饔饘饙饛饜饞饟饠馛馝馟馦馰馱馲馵"
  ],
  [
    "8fe9a1",
    "馹馺馽馿駃駉駓駔駙駚駜駞駧駪駫駬駰駴駵駹駽駾騂騃騄騋騌騐騑騖騞騠騢騣騤騧騭騮騳騵騶騸驇驁驄驊驋驌驎驑驔驖驝骪骬骮骯骲骴骵骶骹骻骾骿髁髃髆髈髎髐髒髕髖髗髛髜髠髤髥髧髩髬髲髳髵髹髺髽髿",
    4
  ],
  [
    "8feaa1",
    "鬄鬅鬈鬉鬋鬌鬍鬎鬐鬒鬖鬙鬛鬜鬠鬦鬫鬭鬳鬴鬵鬷鬹鬺鬽魈魋魌魕魖魗魛魞魡魣魥魦魨魪",
    4,
    "魳魵魷魸魹魿鮀鮄鮅鮆鮇鮉鮊鮋鮍鮏鮐鮔鮚鮝鮞鮦鮧鮩鮬鮰鮱鮲鮷鮸鮻鮼鮾鮿鯁鯇鯈鯎鯐鯗鯘鯝鯟鯥鯧鯪鯫鯯鯳鯷鯸"
  ],
  [
    "8feba1",
    "鯹鯺鯽鯿鰀鰂鰋鰏鰑鰖鰘鰙鰚鰜鰞鰢鰣鰦",
    4,
    "鰱鰵鰶鰷鰽鱁鱃鱄鱅鱉鱊鱎鱏鱐鱓鱔鱖鱘鱛鱝鱞鱟鱣鱩鱪鱜鱫鱨鱮鱰鱲鱵鱷鱻鳦鳲鳷鳹鴋鴂鴑鴗鴘鴜鴝鴞鴯鴰鴲鴳鴴鴺鴼鵅鴽鵂鵃鵇鵊鵓鵔鵟鵣鵢鵥鵩鵪鵫鵰鵶鵷鵻"
  ],
  [
    "8feca1",
    "鵼鵾鶃鶄鶆鶊鶍鶎鶒鶓鶕鶖鶗鶘鶡鶪鶬鶮鶱鶵鶹鶼鶿鷃鷇鷉鷊鷔鷕鷖鷗鷚鷞鷟鷠鷥鷧鷩鷫鷮鷰鷳鷴鷾鸊鸂鸇鸎鸐鸑鸒鸕鸖鸙鸜鸝鹺鹻鹼麀麂麃麄麅麇麎麏麖麘麛麞麤麨麬麮麯麰麳麴麵黆黈黋黕黟黤黧黬黭黮黰黱黲黵"
  ],
  [
    "8feda1",
    "黸黿鼂鼃鼉鼏鼐鼑鼒鼔鼖鼗鼙鼚鼛鼟鼢鼦鼪鼫鼯鼱鼲鼴鼷鼹鼺鼼鼽鼿齁齃",
    4,
    "齓齕齖齗齘齚齝齞齨齩齭",
    4,
    "齳齵齺齽龏龐龑龒龔龖龗龞龡龢龣龥"
  ]
], Wn = [
  [
    "0",
    "\0",
    127,
    "€"
  ],
  [
    "8140",
    "丂丄丅丆丏丒丗丟丠両丣並丩丮丯丱丳丵丷丼乀乁乂乄乆乊乑乕乗乚乛乢乣乤乥乧乨乪",
    5,
    "乲乴",
    9,
    "乿",
    6,
    "亇亊"
  ],
  [
    "8180",
    "亐亖亗亙亜亝亞亣亪亯亰亱亴亶亷亸亹亼亽亾仈仌仏仐仒仚仛仜仠仢仦仧仩仭仮仯仱仴仸仹仺仼仾伀伂",
    6,
    "伋伌伒",
    4,
    "伜伝伡伣伨伩伬伭伮伱伳伵伷伹伻伾",
    4,
    "佄佅佇",
    5,
    "佒佔佖佡佢佦佨佪佫佭佮佱佲併佷佸佹佺佽侀侁侂侅來侇侊侌侎侐侒侓侕侖侘侙侚侜侞侟価侢"
  ],
  [
    "8240",
    "侤侫侭侰",
    4,
    "侶",
    8,
    "俀俁係俆俇俈俉俋俌俍俒",
    4,
    "俙俛俠俢俤俥俧俫俬俰俲俴俵俶俷俹俻俼俽俿",
    11
  ],
  [
    "8280",
    "個倎倐們倓倕倖倗倛倝倞倠倢倣値倧倫倯",
    10,
    "倻倽倿偀偁偂偄偅偆偉偊偋偍偐",
    4,
    "偖偗偘偙偛偝",
    7,
    "偦",
    5,
    "偭",
    8,
    "偸偹偺偼偽傁傂傃傄傆傇傉傊傋傌傎",
    20,
    "傤傦傪傫傭",
    4,
    "傳",
    6,
    "傼"
  ],
  [
    "8340",
    "傽",
    17,
    "僐",
    5,
    "僗僘僙僛",
    10,
    "僨僩僪僫僯僰僱僲僴僶",
    4,
    "僼",
    9,
    "儈"
  ],
  [
    "8380",
    "儉儊儌",
    5,
    "儓",
    13,
    "儢",
    28,
    "兂兇兊兌兎兏児兒兓兗兘兙兛兝",
    4,
    "兣兤兦內兩兪兯兲兺兾兿冃冄円冇冊冋冎冏冐冑冓冔冘冚冝冞冟冡冣冦",
    4,
    "冭冮冴冸冹冺冾冿凁凂凃凅凈凊凍凎凐凒",
    5
  ],
  [
    "8440",
    "凘凙凚凜凞凟凢凣凥",
    5,
    "凬凮凱凲凴凷凾刄刅刉刋刌刏刐刓刔刕刜刞刟刡刢刣別刦刧刪刬刯刱刲刴刵刼刾剄",
    5,
    "剋剎剏剒剓剕剗剘"
  ],
  [
    "8480",
    "剙剚剛剝剟剠剢剣剤剦剨剫剬剭剮剰剱剳",
    9,
    "剾劀劃",
    4,
    "劉",
    6,
    "劑劒劔",
    6,
    "劜劤劥劦劧劮劯劰労",
    9,
    "勀勁勂勄勅勆勈勊勌勍勎勏勑勓勔動勗務",
    5,
    "勠勡勢勣勥",
    10,
    "勱",
    7,
    "勻勼勽匁匂匃匄匇匉匊匋匌匎"
  ],
  [
    "8540",
    "匑匒匓匔匘匛匜匞匟匢匤匥匧匨匩匫匬匭匯",
    9,
    "匼匽區卂卄卆卋卌卍卐協単卙卛卝卥卨卪卬卭卲卶卹卻卼卽卾厀厁厃厇厈厊厎厏"
  ],
  [
    "8580",
    "厐",
    4,
    "厖厗厙厛厜厞厠厡厤厧厪厫厬厭厯",
    6,
    "厷厸厹厺厼厽厾叀參",
    4,
    "収叏叐叒叓叕叚叜叝叞叡叢叧叴叺叾叿吀吂吅吇吋吔吘吙吚吜吢吤吥吪吰吳吶吷吺吽吿呁呂呄呅呇呉呌呍呎呏呑呚呝",
    4,
    "呣呥呧呩",
    7,
    "呴呹呺呾呿咁咃咅咇咈咉咊咍咑咓咗咘咜咞咟咠咡"
  ],
  [
    "8640",
    "咢咥咮咰咲咵咶咷咹咺咼咾哃哅哊哋哖哘哛哠",
    4,
    "哫哬哯哰哱哴",
    5,
    "哻哾唀唂唃唄唅唈唊",
    4,
    "唒唓唕",
    5,
    "唜唝唞唟唡唥唦"
  ],
  [
    "8680",
    "唨唩唫唭唲唴唵唶唸唹唺唻唽啀啂啅啇啈啋",
    4,
    "啑啒啓啔啗",
    4,
    "啝啞啟啠啢啣啨啩啫啯",
    5,
    "啹啺啽啿喅喆喌喍喎喐喒喓喕喖喗喚喛喞喠",
    6,
    "喨",
    8,
    "喲喴営喸喺喼喿",
    4,
    "嗆嗇嗈嗊嗋嗎嗏嗐嗕嗗",
    4,
    "嗞嗠嗢嗧嗩嗭嗮嗰嗱嗴嗶嗸",
    4,
    "嗿嘂嘃嘄嘅"
  ],
  [
    "8740",
    "嘆嘇嘊嘋嘍嘐",
    7,
    "嘙嘚嘜嘝嘠嘡嘢嘥嘦嘨嘩嘪嘫嘮嘯嘰嘳嘵嘷嘸嘺嘼嘽嘾噀",
    11,
    "噏",
    4,
    "噕噖噚噛噝",
    4
  ],
  [
    "8780",
    "噣噥噦噧噭噮噯噰噲噳噴噵噷噸噹噺噽",
    7,
    "嚇",
    6,
    "嚐嚑嚒嚔",
    14,
    "嚤",
    10,
    "嚰",
    6,
    "嚸嚹嚺嚻嚽",
    12,
    "囋",
    8,
    "囕囖囘囙囜団囥",
    5,
    "囬囮囯囲図囶囷囸囻囼圀圁圂圅圇國",
    6
  ],
  [
    "8840",
    "園",
    9,
    "圝圞圠圡圢圤圥圦圧圫圱圲圴",
    4,
    "圼圽圿坁坃坄坅坆坈坉坋坒",
    4,
    "坘坙坢坣坥坧坬坮坰坱坲坴坵坸坹坺坽坾坿垀"
  ],
  [
    "8880",
    "垁垇垈垉垊垍",
    4,
    "垔",
    6,
    "垜垝垞垟垥垨垪垬垯垰垱垳垵垶垷垹",
    8,
    "埄",
    6,
    "埌埍埐埑埓埖埗埛埜埞埡埢埣埥",
    7,
    "埮埰埱埲埳埵埶執埻埼埾埿堁堃堄堅堈堉堊堌堎堏堐堒堓堔堖堗堘堚堛堜堝堟堢堣堥",
    4,
    "堫",
    4,
    "報堲堳場堶",
    7
  ],
  [
    "8940",
    "堾",
    5,
    "塅",
    6,
    "塎塏塐塒塓塕塖塗塙",
    4,
    "塟",
    5,
    "塦",
    4,
    "塭",
    16,
    "塿墂墄墆墇墈墊墋墌"
  ],
  [
    "8980",
    "墍",
    4,
    "墔",
    4,
    "墛墜墝墠",
    7,
    "墪",
    17,
    "墽墾墿壀壂壃壄壆",
    10,
    "壒壓壔壖",
    13,
    "壥",
    5,
    "壭壯壱売壴壵壷壸壺",
    7,
    "夃夅夆夈",
    4,
    "夎夐夑夒夓夗夘夛夝夞夠夡夢夣夦夨夬夰夲夳夵夶夻"
  ],
  [
    "8a40",
    "夽夾夿奀奃奅奆奊奌奍奐奒奓奙奛",
    4,
    "奡奣奤奦",
    12,
    "奵奷奺奻奼奾奿妀妅妉妋妌妎妏妐妑妔妕妘妚妛妜妝妟妠妡妢妦"
  ],
  [
    "8a80",
    "妧妬妭妰妱妳",
    5,
    "妺妼妽妿",
    6,
    "姇姈姉姌姍姎姏姕姖姙姛姞",
    4,
    "姤姦姧姩姪姫姭",
    11,
    "姺姼姽姾娀娂娊娋娍娎娏娐娒娔娕娖娗娙娚娛娝娞娡娢娤娦娧娨娪",
    6,
    "娳娵娷",
    4,
    "娽娾娿婁",
    4,
    "婇婈婋",
    9,
    "婖婗婘婙婛",
    5
  ],
  [
    "8b40",
    "婡婣婤婥婦婨婩婫",
    8,
    "婸婹婻婼婽婾媀",
    17,
    "媓",
    6,
    "媜",
    13,
    "媫媬"
  ],
  [
    "8b80",
    "媭",
    4,
    "媴媶媷媹",
    4,
    "媿嫀嫃",
    5,
    "嫊嫋嫍",
    4,
    "嫓嫕嫗嫙嫚嫛嫝嫞嫟嫢嫤嫥嫧嫨嫪嫬",
    4,
    "嫲",
    22,
    "嬊",
    11,
    "嬘",
    25,
    "嬳嬵嬶嬸",
    7,
    "孁",
    6
  ],
  [
    "8c40",
    "孈",
    7,
    "孒孖孞孠孡孧孨孫孭孮孯孲孴孶孷學孹孻孼孾孿宂宆宊宍宎宐宑宒宔宖実宧宨宩宬宭宮宯宱宲宷宺宻宼寀寁寃寈寉寊寋寍寎寏"
  ],
  [
    "8c80",
    "寑寔",
    8,
    "寠寢寣實寧審",
    4,
    "寯寱",
    6,
    "寽対尀専尃尅將專尋尌對導尐尒尓尗尙尛尞尟尠尡尣尦尨尩尪尫尭尮尯尰尲尳尵尶尷屃屄屆屇屌屍屒屓屔屖屗屘屚屛屜屝屟屢層屧",
    6,
    "屰屲",
    6,
    "屻屼屽屾岀岃",
    4,
    "岉岊岋岎岏岒岓岕岝",
    4,
    "岤",
    4
  ],
  [
    "8d40",
    "岪岮岯岰岲岴岶岹岺岻岼岾峀峂峃峅",
    5,
    "峌",
    5,
    "峓",
    5,
    "峚",
    6,
    "峢峣峧峩峫峬峮峯峱",
    9,
    "峼",
    4
  ],
  [
    "8d80",
    "崁崄崅崈",
    5,
    "崏",
    4,
    "崕崗崘崙崚崜崝崟",
    4,
    "崥崨崪崫崬崯",
    4,
    "崵",
    7,
    "崿",
    7,
    "嵈嵉嵍",
    10,
    "嵙嵚嵜嵞",
    10,
    "嵪嵭嵮嵰嵱嵲嵳嵵",
    12,
    "嶃",
    21,
    "嶚嶛嶜嶞嶟嶠"
  ],
  [
    "8e40",
    "嶡",
    21,
    "嶸",
    12,
    "巆",
    6,
    "巎",
    12,
    "巜巟巠巣巤巪巬巭"
  ],
  [
    "8e80",
    "巰巵巶巸",
    4,
    "巿帀帄帇帉帊帋帍帎帒帓帗帞",
    7,
    "帨",
    4,
    "帯帰帲",
    4,
    "帹帺帾帿幀幁幃幆",
    5,
    "幍",
    6,
    "幖",
    4,
    "幜幝幟幠幣",
    14,
    "幵幷幹幾庁庂広庅庈庉庌庍庎庒庘庛庝庡庢庣庤庨",
    4,
    "庮",
    4,
    "庴庺庻庼庽庿",
    6
  ],
  [
    "8f40",
    "廆廇廈廋",
    5,
    "廔廕廗廘廙廚廜",
    11,
    "廩廫",
    8,
    "廵廸廹廻廼廽弅弆弇弉弌弍弎弐弒弔弖弙弚弜弝弞弡弢弣弤"
  ],
  [
    "8f80",
    "弨弫弬弮弰弲",
    6,
    "弻弽弾弿彁",
    14,
    "彑彔彙彚彛彜彞彟彠彣彥彧彨彫彮彯彲彴彵彶彸彺彽彾彿徃徆徍徎徏徑従徔徖徚徛徝從徟徠徢",
    5,
    "復徫徬徯",
    5,
    "徶徸徹徺徻徾",
    4,
    "忇忈忊忋忎忓忔忕忚忛応忞忟忢忣忥忦忨忩忬忯忰忲忳忴忶忷忹忺忼怇"
  ],
  [
    "9040",
    "怈怉怋怌怐怑怓怗怘怚怞怟怢怣怤怬怭怮怰",
    4,
    "怶",
    4,
    "怽怾恀恄",
    6,
    "恌恎恏恑恓恔恖恗恘恛恜恞恟恠恡恥恦恮恱恲恴恵恷恾悀"
  ],
  [
    "9080",
    "悁悂悅悆悇悈悊悋悎悏悐悑悓悕悗悘悙悜悞悡悢悤悥悧悩悪悮悰悳悵悶悷悹悺悽",
    7,
    "惇惈惉惌",
    4,
    "惒惓惔惖惗惙惛惞惡",
    4,
    "惪惱惲惵惷惸惻",
    4,
    "愂愃愄愅愇愊愋愌愐",
    4,
    "愖愗愘愙愛愜愝愞愡愢愥愨愩愪愬",
    18,
    "慀",
    6
  ],
  [
    "9140",
    "慇慉態慍慏慐慒慓慔慖",
    6,
    "慞慟慠慡慣慤慥慦慩",
    6,
    "慱慲慳慴慶慸",
    18,
    "憌憍憏",
    4,
    "憕"
  ],
  [
    "9180",
    "憖",
    6,
    "憞",
    8,
    "憪憫憭",
    9,
    "憸",
    5,
    "憿懀懁懃",
    4,
    "應懌",
    4,
    "懓懕",
    16,
    "懧",
    13,
    "懶",
    8,
    "戀",
    5,
    "戇戉戓戔戙戜戝戞戠戣戦戧戨戩戫戭戯戰戱戲戵戶戸",
    4,
    "扂扄扅扆扊"
  ],
  [
    "9240",
    "扏扐払扖扗扙扚扜",
    6,
    "扤扥扨扱扲扴扵扷扸扺扻扽抁抂抃抅抆抇抈抋",
    5,
    "抔抙抜抝択抣抦抧抩抪抭抮抯抰抲抳抴抶抷抸抺抾拀拁"
  ],
  [
    "9280",
    "拃拋拏拑拕拝拞拠拡拤拪拫拰拲拵拸拹拺拻挀挃挄挅挆挊挋挌挍挏挐挒挓挔挕挗挘挙挜挦挧挩挬挭挮挰挱挳",
    5,
    "挻挼挾挿捀捁捄捇捈捊捑捒捓捔捖",
    7,
    "捠捤捥捦捨捪捫捬捯捰捲捳捴捵捸捹捼捽捾捿掁掃掄掅掆掋掍掑掓掔掕掗掙",
    6,
    "採掤掦掫掯掱掲掵掶掹掻掽掿揀"
  ],
  [
    "9340",
    "揁揂揃揅揇揈揊揋揌揑揓揔揕揗",
    6,
    "揟揢揤",
    4,
    "揫揬揮揯揰揱揳揵揷揹揺揻揼揾搃搄搆",
    4,
    "損搎搑搒搕",
    5,
    "搝搟搢搣搤"
  ],
  [
    "9380",
    "搥搧搨搩搫搮",
    5,
    "搵",
    4,
    "搻搼搾摀摂摃摉摋",
    6,
    "摓摕摖摗摙",
    4,
    "摟",
    7,
    "摨摪摫摬摮",
    9,
    "摻",
    6,
    "撃撆撈",
    8,
    "撓撔撗撘撚撛撜撝撟",
    4,
    "撥撦撧撨撪撫撯撱撲撳撴撶撹撻撽撾撿擁擃擄擆",
    6,
    "擏擑擓擔擕擖擙據"
  ],
  [
    "9440",
    "擛擜擝擟擠擡擣擥擧",
    24,
    "攁",
    7,
    "攊",
    7,
    "攓",
    4,
    "攙",
    8
  ],
  [
    "9480",
    "攢攣攤攦",
    4,
    "攬攭攰攱攲攳攷攺攼攽敀",
    4,
    "敆敇敊敋敍敎敐敒敓敔敗敘敚敜敟敠敡敤敥敧敨敩敪敭敮敯敱敳敵敶數",
    14,
    "斈斉斊斍斎斏斒斔斕斖斘斚斝斞斠斢斣斦斨斪斬斮斱",
    7,
    "斺斻斾斿旀旂旇旈旉旊旍旐旑旓旔旕旘",
    7,
    "旡旣旤旪旫"
  ],
  [
    "9540",
    "旲旳旴旵旸旹旻",
    4,
    "昁昄昅昇昈昉昋昍昐昑昒昖昗昘昚昛昜昞昡昢昣昤昦昩昪昫昬昮昰昲昳昷",
    4,
    "昽昿晀時晄",
    6,
    "晍晎晐晑晘"
  ],
  [
    "9580",
    "晙晛晜晝晞晠晢晣晥晧晩",
    4,
    "晱晲晳晵晸晹晻晼晽晿暀暁暃暅暆暈暉暊暋暍暎暏暐暒暓暔暕暘",
    4,
    "暞",
    8,
    "暩",
    4,
    "暯",
    4,
    "暵暶暷暸暺暻暼暽暿",
    25,
    "曚曞",
    7,
    "曧曨曪",
    5,
    "曱曵曶書曺曻曽朁朂會"
  ],
  [
    "9640",
    "朄朅朆朇朌朎朏朑朒朓朖朘朙朚朜朞朠",
    5,
    "朧朩朮朰朲朳朶朷朸朹朻朼朾朿杁杄杅杇杊杋杍杒杔杕杗",
    4,
    "杝杢杣杤杦杧杫杬杮東杴杶"
  ],
  [
    "9680",
    "杸杹杺杻杽枀枂枃枅枆枈枊枌枍枎枏枑枒枓枔枖枙枛枟枠枡枤枦枩枬枮枱枲枴枹",
    7,
    "柂柅",
    9,
    "柕柖柗柛柟柡柣柤柦柧柨柪柫柭柮柲柵",
    7,
    "柾栁栂栃栄栆栍栐栒栔栕栘",
    4,
    "栞栟栠栢",
    6,
    "栫",
    6,
    "栴栵栶栺栻栿桇桋桍桏桒桖",
    5
  ],
  [
    "9740",
    "桜桝桞桟桪桬",
    7,
    "桵桸",
    8,
    "梂梄梇",
    7,
    "梐梑梒梔梕梖梘",
    9,
    "梣梤梥梩梪梫梬梮梱梲梴梶梷梸"
  ],
  [
    "9780",
    "梹",
    6,
    "棁棃",
    5,
    "棊棌棎棏棐棑棓棔棖棗棙棛",
    4,
    "棡棢棤",
    9,
    "棯棲棳棴棶棷棸棻棽棾棿椀椂椃椄椆",
    4,
    "椌椏椑椓",
    11,
    "椡椢椣椥",
    7,
    "椮椯椱椲椳椵椶椷椸椺椻椼椾楀楁楃",
    16,
    "楕楖楘楙楛楜楟"
  ],
  [
    "9840",
    "楡楢楤楥楧楨楩楪楬業楯楰楲",
    4,
    "楺楻楽楾楿榁榃榅榊榋榌榎",
    5,
    "榖榗榙榚榝",
    9,
    "榩榪榬榮榯榰榲榳榵榶榸榹榺榼榽"
  ],
  [
    "9880",
    "榾榿槀槂",
    7,
    "構槍槏槑槒槓槕",
    5,
    "槜槝槞槡",
    11,
    "槮槯槰槱槳",
    9,
    "槾樀",
    9,
    "樋",
    11,
    "標",
    5,
    "樠樢",
    5,
    "権樫樬樭樮樰樲樳樴樶",
    6,
    "樿",
    4,
    "橅橆橈",
    7,
    "橑",
    6,
    "橚"
  ],
  [
    "9940",
    "橜",
    4,
    "橢橣橤橦",
    10,
    "橲",
    6,
    "橺橻橽橾橿檁檂檃檅",
    8,
    "檏檒",
    4,
    "檘",
    7,
    "檡",
    5
  ],
  [
    "9980",
    "檧檨檪檭",
    114,
    "欥欦欨",
    6
  ],
  [
    "9a40",
    "欯欰欱欳欴欵欶欸欻欼欽欿歀歁歂歄歅歈歊歋歍",
    11,
    "歚",
    7,
    "歨歩歫",
    13,
    "歺歽歾歿殀殅殈"
  ],
  [
    "9a80",
    "殌殎殏殐殑殔殕殗殘殙殜",
    4,
    "殢",
    7,
    "殫",
    7,
    "殶殸",
    6,
    "毀毃毄毆",
    4,
    "毌毎毐毑毘毚毜",
    4,
    "毢",
    7,
    "毬毭毮毰毱毲毴毶毷毸毺毻毼毾",
    6,
    "氈",
    4,
    "氎氒気氜氝氞氠氣氥氫氬氭氱氳氶氷氹氺氻氼氾氿汃汄汅汈汋",
    4,
    "汑汒汓汖汘"
  ],
  [
    "9b40",
    "汙汚汢汣汥汦汧汫",
    4,
    "汱汳汵汷汸決汻汼汿沀沄沇沊沋沍沎沑沒沕沖沗沘沚沜沝沞沠沢沨沬沯沰沴沵沶沷沺泀況泂泃泆泇泈泋泍泎泏泑泒泘"
  ],
  [
    "9b80",
    "泙泚泜泝泟泤泦泧泩泬泭泲泴泹泿洀洂洃洅洆洈洉洊洍洏洐洑洓洔洕洖洘洜洝洟",
    5,
    "洦洨洩洬洭洯洰洴洶洷洸洺洿浀浂浄浉浌浐浕浖浗浘浛浝浟浡浢浤浥浧浨浫浬浭浰浱浲浳浵浶浹浺浻浽",
    4,
    "涃涄涆涇涊涋涍涏涐涒涖",
    4,
    "涜涢涥涬涭涰涱涳涴涶涷涹",
    5,
    "淁淂淃淈淉淊"
  ],
  [
    "9c40",
    "淍淎淏淐淒淓淔淕淗淚淛淜淟淢淣淥淧淨淩淪淭淯淰淲淴淵淶淸淺淽",
    7,
    "渆渇済渉渋渏渒渓渕渘渙減渜渞渟渢渦渧渨渪測渮渰渱渳渵"
  ],
  [
    "9c80",
    "渶渷渹渻",
    7,
    "湅",
    7,
    "湏湐湑湒湕湗湙湚湜湝湞湠",
    10,
    "湬湭湯",
    14,
    "満溁溂溄溇溈溊",
    4,
    "溑",
    6,
    "溙溚溛溝溞溠溡溣溤溦溨溩溫溬溭溮溰溳溵溸溹溼溾溿滀滃滄滅滆滈滉滊滌滍滎滐滒滖滘滙滛滜滝滣滧滪",
    5
  ],
  [
    "9d40",
    "滰滱滲滳滵滶滷滸滺",
    7,
    "漃漄漅漇漈漊",
    4,
    "漐漑漒漖",
    9,
    "漡漢漣漥漦漧漨漬漮漰漲漴漵漷",
    6,
    "漿潀潁潂"
  ],
  [
    "9d80",
    "潃潄潅潈潉潊潌潎",
    9,
    "潙潚潛潝潟潠潡潣潤潥潧",
    5,
    "潯潰潱潳潵潶潷潹潻潽",
    6,
    "澅澆澇澊澋澏",
    12,
    "澝澞澟澠澢",
    4,
    "澨",
    10,
    "澴澵澷澸澺",
    5,
    "濁濃",
    5,
    "濊",
    6,
    "濓",
    10,
    "濟濢濣濤濥"
  ],
  [
    "9e40",
    "濦",
    7,
    "濰",
    32,
    "瀒",
    7,
    "瀜",
    6,
    "瀤",
    6
  ],
  [
    "9e80",
    "瀫",
    9,
    "瀶瀷瀸瀺",
    17,
    "灍灎灐",
    13,
    "灟",
    11,
    "灮灱灲灳灴灷灹灺灻災炁炂炃炄炆炇炈炋炌炍炏炐炑炓炗炘炚炛炞",
    12,
    "炰炲炴炵炶為炾炿烄烅烆烇烉烋",
    12,
    "烚"
  ],
  [
    "9f40",
    "烜烝烞烠烡烢烣烥烪烮烰",
    6,
    "烸烺烻烼烾",
    10,
    "焋",
    4,
    "焑焒焔焗焛",
    10,
    "焧",
    7,
    "焲焳焴"
  ],
  [
    "9f80",
    "焵焷",
    13,
    "煆煇煈煉煋煍煏",
    12,
    "煝煟",
    4,
    "煥煩",
    4,
    "煯煰煱煴煵煶煷煹煻煼煾",
    5,
    "熅",
    4,
    "熋熌熍熎熐熑熒熓熕熖熗熚",
    4,
    "熡",
    6,
    "熩熪熫熭",
    5,
    "熴熶熷熸熺",
    8,
    "燄",
    9,
    "燏",
    4
  ],
  [
    "a040",
    "燖",
    9,
    "燡燢燣燤燦燨",
    5,
    "燯",
    9,
    "燺",
    11,
    "爇",
    19
  ],
  [
    "a080",
    "爛爜爞",
    9,
    "爩爫爭爮爯爲爳爴爺爼爾牀",
    6,
    "牉牊牋牎牏牐牑牓牔牕牗牘牚牜牞牠牣牤牥牨牪牫牬牭牰牱牳牴牶牷牸牻牼牽犂犃犅",
    4,
    "犌犎犐犑犓",
    11,
    "犠",
    11,
    "犮犱犲犳犵犺",
    6,
    "狅狆狇狉狊狋狌狏狑狓狔狕狖狘狚狛"
  ],
  [
    "a1a1",
    "　、。·ˉˇ¨〃々—～‖…‘’“”〔〕〈",
    7,
    "〖〗【】±×÷∶∧∨∑∏∪∩∈∷√⊥∥∠⌒⊙∫∮≡≌≈∽∝≠≮≯≤≥∞∵∴♂♀°′″℃＄¤￠￡‰§№☆★○●◎◇◆□■△▲※→←↑↓〓"
  ],
  [
    "a2a1",
    "ⅰ",
    9
  ],
  [
    "a2b1",
    "⒈",
    19,
    "⑴",
    19,
    "①",
    9
  ],
  [
    "a2e5",
    "㈠",
    9
  ],
  [
    "a2f1",
    "Ⅰ",
    11
  ],
  [
    "a3a1",
    "！＂＃￥％",
    88,
    "￣"
  ],
  [
    "a4a1",
    "ぁ",
    82
  ],
  [
    "a5a1",
    "ァ",
    85
  ],
  [
    "a6a1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a6c1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a6e0",
    "︵︶︹︺︿﹀︽︾﹁﹂﹃﹄"
  ],
  [
    "a6ee",
    "︻︼︷︸︱"
  ],
  [
    "a6f4",
    "︳︴"
  ],
  [
    "a7a1",
    "А",
    5,
    "ЁЖ",
    25
  ],
  [
    "a7d1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "a840",
    "ˊˋ˙–―‥‵℅℉↖↗↘↙∕∟∣≒≦≧⊿═",
    35,
    "▁",
    6
  ],
  [
    "a880",
    "█",
    7,
    "▓▔▕▼▽◢◣◤◥☉⊕〒〝〞"
  ],
  [
    "a8a1",
    "āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüêɑ"
  ],
  [
    "a8bd",
    "ńň"
  ],
  [
    "a8c0",
    "ɡ"
  ],
  [
    "a8c5",
    "ㄅ",
    36
  ],
  [
    "a940",
    "〡",
    8,
    "㊣㎎㎏㎜㎝㎞㎡㏄㏎㏑㏒㏕︰￢￤"
  ],
  [
    "a959",
    "℡㈱"
  ],
  [
    "a95c",
    "‐"
  ],
  [
    "a960",
    "ー゛゜ヽヾ〆ゝゞ﹉",
    9,
    "﹔﹕﹖﹗﹙",
    8
  ],
  [
    "a980",
    "﹢",
    4,
    "﹨﹩﹪﹫"
  ],
  [
    "a996",
    "〇"
  ],
  [
    "a9a4",
    "─",
    75
  ],
  [
    "aa40",
    "狜狝狟狢",
    5,
    "狪狫狵狶狹狽狾狿猀猂猄",
    5,
    "猋猌猍猏猐猑猒猔猘猙猚猟猠猣猤猦猧猨猭猯猰猲猳猵猶猺猻猼猽獀",
    8
  ],
  [
    "aa80",
    "獉獊獋獌獎獏獑獓獔獕獖獘",
    7,
    "獡",
    10,
    "獮獰獱"
  ],
  [
    "ab40",
    "獲",
    11,
    "獿",
    4,
    "玅玆玈玊玌玍玏玐玒玓玔玕玗玘玙玚玜玝玞玠玡玣",
    5,
    "玪玬玭玱玴玵玶玸玹玼玽玾玿珁珃",
    4
  ],
  [
    "ab80",
    "珋珌珎珒",
    6,
    "珚珛珜珝珟珡珢珣珤珦珨珪珫珬珮珯珰珱珳",
    4
  ],
  [
    "ac40",
    "珸",
    10,
    "琄琇琈琋琌琍琎琑",
    8,
    "琜",
    5,
    "琣琤琧琩琫琭琯琱琲琷",
    4,
    "琽琾琿瑀瑂",
    11
  ],
  [
    "ac80",
    "瑎",
    6,
    "瑖瑘瑝瑠",
    12,
    "瑮瑯瑱",
    4,
    "瑸瑹瑺"
  ],
  [
    "ad40",
    "瑻瑼瑽瑿璂璄璅璆璈璉璊璌璍璏璑",
    10,
    "璝璟",
    7,
    "璪",
    15,
    "璻",
    12
  ],
  [
    "ad80",
    "瓈",
    9,
    "瓓",
    8,
    "瓝瓟瓡瓥瓧",
    6,
    "瓰瓱瓲"
  ],
  [
    "ae40",
    "瓳瓵瓸",
    6,
    "甀甁甂甃甅",
    7,
    "甎甐甒甔甕甖甗甛甝甞甠",
    4,
    "甦甧甪甮甴甶甹甼甽甿畁畂畃畄畆畇畉畊畍畐畑畒畓畕畖畗畘"
  ],
  [
    "ae80",
    "畝",
    7,
    "畧畨畩畫",
    6,
    "畳畵當畷畺",
    4,
    "疀疁疂疄疅疇"
  ],
  [
    "af40",
    "疈疉疊疌疍疎疐疓疕疘疛疜疞疢疦",
    4,
    "疭疶疷疺疻疿痀痁痆痋痌痎痏痐痑痓痗痙痚痜痝痟痠痡痥痩痬痭痮痯痲痳痵痶痷痸痺痻痽痾瘂瘄瘆瘇"
  ],
  [
    "af80",
    "瘈瘉瘋瘍瘎瘏瘑瘒瘓瘔瘖瘚瘜瘝瘞瘡瘣瘧瘨瘬瘮瘯瘱瘲瘶瘷瘹瘺瘻瘽癁療癄"
  ],
  [
    "b040",
    "癅",
    6,
    "癎",
    5,
    "癕癗",
    4,
    "癝癟癠癡癢癤",
    6,
    "癬癭癮癰",
    7,
    "癹発發癿皀皁皃皅皉皊皌皍皏皐皒皔皕皗皘皚皛"
  ],
  [
    "b080",
    "皜",
    7,
    "皥",
    8,
    "皯皰皳皵",
    9,
    "盀盁盃啊阿埃挨哎唉哀皑癌蔼矮艾碍爱隘鞍氨安俺按暗岸胺案肮昂盎凹敖熬翱袄傲奥懊澳芭捌扒叭吧笆八疤巴拔跋靶把耙坝霸罢爸白柏百摆佰败拜稗斑班搬扳般颁板版扮拌伴瓣半办绊邦帮梆榜膀绑棒磅蚌镑傍谤苞胞包褒剥"
  ],
  [
    "b140",
    "盄盇盉盋盌盓盕盙盚盜盝盞盠",
    4,
    "盦",
    7,
    "盰盳盵盶盷盺盻盽盿眀眂眃眅眆眊県眎",
    10,
    "眛眜眝眞眡眣眤眥眧眪眫"
  ],
  [
    "b180",
    "眬眮眰",
    4,
    "眹眻眽眾眿睂睄睅睆睈",
    7,
    "睒",
    7,
    "睜薄雹保堡饱宝抱报暴豹鲍爆杯碑悲卑北辈背贝钡倍狈备惫焙被奔苯本笨崩绷甭泵蹦迸逼鼻比鄙笔彼碧蓖蔽毕毙毖币庇痹闭敝弊必辟壁臂避陛鞭边编贬扁便变卞辨辩辫遍标彪膘表鳖憋别瘪彬斌濒滨宾摈兵冰柄丙秉饼炳"
  ],
  [
    "b240",
    "睝睞睟睠睤睧睩睪睭",
    11,
    "睺睻睼瞁瞂瞃瞆",
    5,
    "瞏瞐瞓",
    11,
    "瞡瞣瞤瞦瞨瞫瞭瞮瞯瞱瞲瞴瞶",
    4
  ],
  [
    "b280",
    "瞼瞾矀",
    12,
    "矎",
    8,
    "矘矙矚矝",
    4,
    "矤病并玻菠播拨钵波博勃搏铂箔伯帛舶脖膊渤泊驳捕卜哺补埠不布步簿部怖擦猜裁材才财睬踩采彩菜蔡餐参蚕残惭惨灿苍舱仓沧藏操糙槽曹草厕策侧册测层蹭插叉茬茶查碴搽察岔差诧拆柴豺搀掺蝉馋谗缠铲产阐颤昌猖"
  ],
  [
    "b340",
    "矦矨矪矯矰矱矲矴矵矷矹矺矻矼砃",
    5,
    "砊砋砎砏砐砓砕砙砛砞砠砡砢砤砨砪砫砮砯砱砲砳砵砶砽砿硁硂硃硄硆硈硉硊硋硍硏硑硓硔硘硙硚"
  ],
  [
    "b380",
    "硛硜硞",
    11,
    "硯",
    7,
    "硸硹硺硻硽",
    6,
    "场尝常长偿肠厂敞畅唱倡超抄钞朝嘲潮巢吵炒车扯撤掣彻澈郴臣辰尘晨忱沉陈趁衬撑称城橙成呈乘程惩澄诚承逞骋秤吃痴持匙池迟弛驰耻齿侈尺赤翅斥炽充冲虫崇宠抽酬畴踌稠愁筹仇绸瞅丑臭初出橱厨躇锄雏滁除楚"
  ],
  [
    "b440",
    "碄碅碆碈碊碋碏碐碒碔碕碖碙碝碞碠碢碤碦碨",
    7,
    "碵碶碷碸確碻碼碽碿磀磂磃磄磆磇磈磌磍磎磏磑磒磓磖磗磘磚",
    9
  ],
  [
    "b480",
    "磤磥磦磧磩磪磫磭",
    4,
    "磳磵磶磸磹磻",
    5,
    "礂礃礄礆",
    6,
    "础储矗搐触处揣川穿椽传船喘串疮窗幢床闯创吹炊捶锤垂春椿醇唇淳纯蠢戳绰疵茨磁雌辞慈瓷词此刺赐次聪葱囱匆从丛凑粗醋簇促蹿篡窜摧崔催脆瘁粹淬翠村存寸磋撮搓措挫错搭达答瘩打大呆歹傣戴带殆代贷袋待逮"
  ],
  [
    "b540",
    "礍",
    5,
    "礔",
    9,
    "礟",
    4,
    "礥",
    14,
    "礵",
    4,
    "礽礿祂祃祄祅祇祊",
    8,
    "祔祕祘祙祡祣"
  ],
  [
    "b580",
    "祤祦祩祪祫祬祮祰",
    6,
    "祹祻",
    4,
    "禂禃禆禇禈禉禋禌禍禎禐禑禒怠耽担丹单郸掸胆旦氮但惮淡诞弹蛋当挡党荡档刀捣蹈倒岛祷导到稻悼道盗德得的蹬灯登等瞪凳邓堤低滴迪敌笛狄涤翟嫡抵底地蒂第帝弟递缔颠掂滇碘点典靛垫电佃甸店惦奠淀殿碉叼雕凋刁掉吊钓调跌爹碟蝶迭谍叠"
  ],
  [
    "b640",
    "禓",
    6,
    "禛",
    11,
    "禨",
    10,
    "禴",
    4,
    "禼禿秂秄秅秇秈秊秌秎秏秐秓秔秖秗秙",
    5,
    "秠秡秢秥秨秪"
  ],
  [
    "b680",
    "秬秮秱",
    6,
    "秹秺秼秾秿稁稄稅稇稈稉稊稌稏",
    4,
    "稕稖稘稙稛稜丁盯叮钉顶鼎锭定订丢东冬董懂动栋侗恫冻洞兜抖斗陡豆逗痘都督毒犊独读堵睹赌杜镀肚度渡妒端短锻段断缎堆兑队对墩吨蹲敦顿囤钝盾遁掇哆多夺垛躲朵跺舵剁惰堕蛾峨鹅俄额讹娥恶厄扼遏鄂饿恩而儿耳尔饵洱二"
  ],
  [
    "b740",
    "稝稟稡稢稤",
    14,
    "稴稵稶稸稺稾穀",
    5,
    "穇",
    9,
    "穒",
    4,
    "穘",
    16
  ],
  [
    "b780",
    "穩",
    6,
    "穱穲穳穵穻穼穽穾窂窅窇窉窊窋窌窎窏窐窓窔窙窚窛窞窡窢贰发罚筏伐乏阀法珐藩帆番翻樊矾钒繁凡烦反返范贩犯饭泛坊芳方肪房防妨仿访纺放菲非啡飞肥匪诽吠肺废沸费芬酚吩氛分纷坟焚汾粉奋份忿愤粪丰封枫蜂峰锋风疯烽逢冯缝讽奉凤佛否夫敷肤孵扶拂辐幅氟符伏俘服"
  ],
  [
    "b840",
    "窣窤窧窩窪窫窮",
    4,
    "窴",
    10,
    "竀",
    10,
    "竌",
    9,
    "竗竘竚竛竜竝竡竢竤竧",
    5,
    "竮竰竱竲竳"
  ],
  [
    "b880",
    "竴",
    4,
    "竻竼竾笀笁笂笅笇笉笌笍笎笐笒笓笖笗笘笚笜笝笟笡笢笣笧笩笭浮涪福袱弗甫抚辅俯釜斧脯腑府腐赴副覆赋复傅付阜父腹负富讣附妇缚咐噶嘎该改概钙盖溉干甘杆柑竿肝赶感秆敢赣冈刚钢缸肛纲岗港杠篙皋高膏羔糕搞镐稿告哥歌搁戈鸽胳疙割革葛格蛤阁隔铬个各给根跟耕更庚羹"
  ],
  [
    "b940",
    "笯笰笲笴笵笶笷笹笻笽笿",
    5,
    "筆筈筊筍筎筓筕筗筙筜筞筟筡筣",
    10,
    "筯筰筳筴筶筸筺筼筽筿箁箂箃箄箆",
    6,
    "箎箏"
  ],
  [
    "b980",
    "箑箒箓箖箘箙箚箛箞箟箠箣箤箥箮箯箰箲箳箵箶箷箹",
    7,
    "篂篃範埂耿梗工攻功恭龚供躬公宫弓巩汞拱贡共钩勾沟苟狗垢构购够辜菇咕箍估沽孤姑鼓古蛊骨谷股故顾固雇刮瓜剐寡挂褂乖拐怪棺关官冠观管馆罐惯灌贯光广逛瑰规圭硅归龟闺轨鬼诡癸桂柜跪贵刽辊滚棍锅郭国果裹过哈"
  ],
  [
    "ba40",
    "篅篈築篊篋篍篎篏篐篒篔",
    4,
    "篛篜篞篟篠篢篣篤篧篨篩篫篬篭篯篰篲",
    4,
    "篸篹篺篻篽篿",
    7,
    "簈簉簊簍簎簐",
    5,
    "簗簘簙"
  ],
  [
    "ba80",
    "簚",
    4,
    "簠",
    5,
    "簨簩簫",
    12,
    "簹",
    5,
    "籂骸孩海氦亥害骇酣憨邯韩含涵寒函喊罕翰撼捍旱憾悍焊汗汉夯杭航壕嚎豪毫郝好耗号浩呵喝荷菏核禾和何合盒貉阂河涸赫褐鹤贺嘿黑痕很狠恨哼亨横衡恒轰哄烘虹鸿洪宏弘红喉侯猴吼厚候后呼乎忽瑚壶葫胡蝴狐糊湖"
  ],
  [
    "bb40",
    "籃",
    9,
    "籎",
    36,
    "籵",
    5,
    "籾",
    9
  ],
  [
    "bb80",
    "粈粊",
    6,
    "粓粔粖粙粚粛粠粡粣粦粧粨粩粫粬粭粯粰粴",
    4,
    "粺粻弧虎唬护互沪户花哗华猾滑画划化话槐徊怀淮坏欢环桓还缓换患唤痪豢焕涣宦幻荒慌黄磺蝗簧皇凰惶煌晃幌恍谎灰挥辉徽恢蛔回毁悔慧卉惠晦贿秽会烩汇讳诲绘荤昏婚魂浑混豁活伙火获或惑霍货祸击圾基机畸稽积箕"
  ],
  [
    "bc40",
    "粿糀糂糃糄糆糉糋糎",
    6,
    "糘糚糛糝糞糡",
    6,
    "糩",
    5,
    "糰",
    7,
    "糹糺糼",
    13,
    "紋",
    5
  ],
  [
    "bc80",
    "紑",
    14,
    "紡紣紤紥紦紨紩紪紬紭紮細",
    6,
    "肌饥迹激讥鸡姬绩缉吉极棘辑籍集及急疾汲即嫉级挤几脊己蓟技冀季伎祭剂悸济寄寂计记既忌际妓继纪嘉枷夹佳家加荚颊贾甲钾假稼价架驾嫁歼监坚尖笺间煎兼肩艰奸缄茧检柬碱硷拣捡简俭剪减荐槛鉴践贱见键箭件"
  ],
  [
    "bd40",
    "紷",
    54,
    "絯",
    7
  ],
  [
    "bd80",
    "絸",
    32,
    "健舰剑饯渐溅涧建僵姜将浆江疆蒋桨奖讲匠酱降蕉椒礁焦胶交郊浇骄娇嚼搅铰矫侥脚狡角饺缴绞剿教酵轿较叫窖揭接皆秸街阶截劫节桔杰捷睫竭洁结解姐戒藉芥界借介疥诫届巾筋斤金今津襟紧锦仅谨进靳晋禁近烬浸"
  ],
  [
    "be40",
    "継",
    12,
    "綧",
    6,
    "綯",
    42
  ],
  [
    "be80",
    "線",
    32,
    "尽劲荆兢茎睛晶鲸京惊精粳经井警景颈静境敬镜径痉靖竟竞净炯窘揪究纠玖韭久灸九酒厩救旧臼舅咎就疚鞠拘狙疽居驹菊局咀矩举沮聚拒据巨具距踞锯俱句惧炬剧捐鹃娟倦眷卷绢撅攫抉掘倔爵觉决诀绝均菌钧军君峻"
  ],
  [
    "bf40",
    "緻",
    62
  ],
  [
    "bf80",
    "縺縼",
    4,
    "繂",
    4,
    "繈",
    21,
    "俊竣浚郡骏喀咖卡咯开揩楷凯慨刊堪勘坎砍看康慷糠扛抗亢炕考拷烤靠坷苛柯棵磕颗科壳咳可渴克刻客课肯啃垦恳坑吭空恐孔控抠口扣寇枯哭窟苦酷库裤夸垮挎跨胯块筷侩快宽款匡筐狂框矿眶旷况亏盔岿窥葵奎魁傀"
  ],
  [
    "c040",
    "繞",
    35,
    "纃",
    23,
    "纜纝纞"
  ],
  [
    "c080",
    "纮纴纻纼绖绤绬绹缊缐缞缷缹缻",
    6,
    "罃罆",
    9,
    "罒罓馈愧溃坤昆捆困括扩廓阔垃拉喇蜡腊辣啦莱来赖蓝婪栏拦篮阑兰澜谰揽览懒缆烂滥琅榔狼廊郎朗浪捞劳牢老佬姥酪烙涝勒乐雷镭蕾磊累儡垒擂肋类泪棱楞冷厘梨犁黎篱狸离漓理李里鲤礼莉荔吏栗丽厉励砾历利傈例俐"
  ],
  [
    "c140",
    "罖罙罛罜罝罞罠罣",
    4,
    "罫罬罭罯罰罳罵罶罷罸罺罻罼罽罿羀羂",
    7,
    "羋羍羏",
    4,
    "羕",
    4,
    "羛羜羠羢羣羥羦羨",
    6,
    "羱"
  ],
  [
    "c180",
    "羳",
    4,
    "羺羻羾翀翂翃翄翆翇翈翉翋翍翏",
    4,
    "翖翗翙",
    5,
    "翢翣痢立粒沥隶力璃哩俩联莲连镰廉怜涟帘敛脸链恋炼练粮凉梁粱良两辆量晾亮谅撩聊僚疗燎寥辽潦了撂镣廖料列裂烈劣猎琳林磷霖临邻鳞淋凛赁吝拎玲菱零龄铃伶羚凌灵陵岭领另令溜琉榴硫馏留刘瘤流柳六龙聋咙笼窿"
  ],
  [
    "c240",
    "翤翧翨翪翫翬翭翯翲翴",
    6,
    "翽翾翿耂耇耈耉耊耎耏耑耓耚耛耝耞耟耡耣耤耫",
    5,
    "耲耴耹耺耼耾聀聁聄聅聇聈聉聎聏聐聑聓聕聖聗"
  ],
  [
    "c280",
    "聙聛",
    13,
    "聫",
    5,
    "聲",
    11,
    "隆垄拢陇楼娄搂篓漏陋芦卢颅庐炉掳卤虏鲁麓碌露路赂鹿潞禄录陆戮驴吕铝侣旅履屡缕虑氯律率滤绿峦挛孪滦卵乱掠略抡轮伦仑沦纶论萝螺罗逻锣箩骡裸落洛骆络妈麻玛码蚂马骂嘛吗埋买麦卖迈脉瞒馒蛮满蔓曼慢漫"
  ],
  [
    "c340",
    "聾肁肂肅肈肊肍",
    5,
    "肔肕肗肙肞肣肦肧肨肬肰肳肵肶肸肹肻胅胇",
    4,
    "胏",
    6,
    "胘胟胠胢胣胦胮胵胷胹胻胾胿脀脁脃脄脅脇脈脋"
  ],
  [
    "c380",
    "脌脕脗脙脛脜脝脟",
    12,
    "脭脮脰脳脴脵脷脹",
    4,
    "脿谩芒茫盲氓忙莽猫茅锚毛矛铆卯茂冒帽貌贸么玫枚梅酶霉煤没眉媒镁每美昧寐妹媚门闷们萌蒙檬盟锰猛梦孟眯醚靡糜迷谜弥米秘觅泌蜜密幂棉眠绵冕免勉娩缅面苗描瞄藐秒渺庙妙蔑灭民抿皿敏悯闽明螟鸣铭名命谬摸"
  ],
  [
    "c440",
    "腀",
    5,
    "腇腉腍腎腏腒腖腗腘腛",
    4,
    "腡腢腣腤腦腨腪腫腬腯腲腳腵腶腷腸膁膃",
    4,
    "膉膋膌膍膎膐膒",
    5,
    "膙膚膞",
    4,
    "膤膥"
  ],
  [
    "c480",
    "膧膩膫",
    7,
    "膴",
    5,
    "膼膽膾膿臄臅臇臈臉臋臍",
    6,
    "摹蘑模膜磨摩魔抹末莫墨默沫漠寞陌谋牟某拇牡亩姆母墓暮幕募慕木目睦牧穆拿哪呐钠那娜纳氖乃奶耐奈南男难囊挠脑恼闹淖呢馁内嫩能妮霓倪泥尼拟你匿腻逆溺蔫拈年碾撵捻念娘酿鸟尿捏聂孽啮镊镍涅您柠狞凝宁"
  ],
  [
    "c540",
    "臔",
    14,
    "臤臥臦臨臩臫臮",
    4,
    "臵",
    5,
    "臽臿舃與",
    4,
    "舎舏舑舓舕",
    5,
    "舝舠舤舥舦舧舩舮舲舺舼舽舿"
  ],
  [
    "c580",
    "艀艁艂艃艅艆艈艊艌艍艎艐",
    7,
    "艙艛艜艝艞艠",
    7,
    "艩拧泞牛扭钮纽脓浓农弄奴努怒女暖虐疟挪懦糯诺哦欧鸥殴藕呕偶沤啪趴爬帕怕琶拍排牌徘湃派攀潘盘磐盼畔判叛乓庞旁耪胖抛咆刨炮袍跑泡呸胚培裴赔陪配佩沛喷盆砰抨烹澎彭蓬棚硼篷膨朋鹏捧碰坯砒霹批披劈琵毗"
  ],
  [
    "c640",
    "艪艫艬艭艱艵艶艷艸艻艼芀芁芃芅芆芇芉芌芐芓芔芕芖芚芛芞芠芢芣芧芲芵芶芺芻芼芿苀苂苃苅苆苉苐苖苙苚苝苢苧苨苩苪苬苭苮苰苲苳苵苶苸"
  ],
  [
    "c680",
    "苺苼",
    4,
    "茊茋茍茐茒茓茖茘茙茝",
    9,
    "茩茪茮茰茲茷茻茽啤脾疲皮匹痞僻屁譬篇偏片骗飘漂瓢票撇瞥拼频贫品聘乒坪苹萍平凭瓶评屏坡泼颇婆破魄迫粕剖扑铺仆莆葡菩蒲埔朴圃普浦谱曝瀑期欺栖戚妻七凄漆柒沏其棋奇歧畦崎脐齐旗祈祁骑起岂乞企启契砌器气迄弃汽泣讫掐"
  ],
  [
    "c740",
    "茾茿荁荂荄荅荈荊",
    4,
    "荓荕",
    4,
    "荝荢荰",
    6,
    "荹荺荾",
    6,
    "莇莈莊莋莌莍莏莐莑莔莕莖莗莙莚莝莟莡",
    6,
    "莬莭莮"
  ],
  [
    "c780",
    "莯莵莻莾莿菂菃菄菆菈菉菋菍菎菐菑菒菓菕菗菙菚菛菞菢菣菤菦菧菨菫菬菭恰洽牵扦钎铅千迁签仟谦乾黔钱钳前潜遣浅谴堑嵌欠歉枪呛腔羌墙蔷强抢橇锹敲悄桥瞧乔侨巧鞘撬翘峭俏窍切茄且怯窃钦侵亲秦琴勤芹擒禽寝沁青轻氢倾卿清擎晴氰情顷请庆琼穷秋丘邱球求囚酋泅趋区蛆曲躯屈驱渠"
  ],
  [
    "c840",
    "菮華菳",
    4,
    "菺菻菼菾菿萀萂萅萇萈萉萊萐萒",
    5,
    "萙萚萛萞",
    5,
    "萩",
    7,
    "萲",
    5,
    "萹萺萻萾",
    7,
    "葇葈葉"
  ],
  [
    "c880",
    "葊",
    6,
    "葒",
    4,
    "葘葝葞葟葠葢葤",
    4,
    "葪葮葯葰葲葴葷葹葻葼取娶龋趣去圈颧权醛泉全痊拳犬券劝缺炔瘸却鹊榷确雀裙群然燃冉染瓤壤攘嚷让饶扰绕惹热壬仁人忍韧任认刃妊纫扔仍日戎茸蓉荣融熔溶容绒冗揉柔肉茹蠕儒孺如辱乳汝入褥软阮蕊瑞锐闰润若弱撒洒萨腮鳃塞赛三叁"
  ],
  [
    "c940",
    "葽",
    4,
    "蒃蒄蒅蒆蒊蒍蒏",
    7,
    "蒘蒚蒛蒝蒞蒟蒠蒢",
    12,
    "蒰蒱蒳蒵蒶蒷蒻蒼蒾蓀蓂蓃蓅蓆蓇蓈蓋蓌蓎蓏蓒蓔蓕蓗"
  ],
  [
    "c980",
    "蓘",
    4,
    "蓞蓡蓢蓤蓧",
    4,
    "蓭蓮蓯蓱",
    10,
    "蓽蓾蔀蔁蔂伞散桑嗓丧搔骚扫嫂瑟色涩森僧莎砂杀刹沙纱傻啥煞筛晒珊苫杉山删煽衫闪陕擅赡膳善汕扇缮墒伤商赏晌上尚裳梢捎稍烧芍勺韶少哨邵绍奢赊蛇舌舍赦摄射慑涉社设砷申呻伸身深娠绅神沈审婶甚肾慎渗声生甥牲升绳"
  ],
  [
    "ca40",
    "蔃",
    8,
    "蔍蔎蔏蔐蔒蔔蔕蔖蔘蔙蔛蔜蔝蔞蔠蔢",
    8,
    "蔭",
    9,
    "蔾",
    4,
    "蕄蕅蕆蕇蕋",
    10
  ],
  [
    "ca80",
    "蕗蕘蕚蕛蕜蕝蕟",
    4,
    "蕥蕦蕧蕩",
    8,
    "蕳蕵蕶蕷蕸蕼蕽蕿薀薁省盛剩胜圣师失狮施湿诗尸虱十石拾时什食蚀实识史矢使屎驶始式示士世柿事拭誓逝势是嗜噬适仕侍释饰氏市恃室视试收手首守寿授售受瘦兽蔬枢梳殊抒输叔舒淑疏书赎孰熟薯暑曙署蜀黍鼠属术述树束戍竖墅庶数漱"
  ],
  [
    "cb40",
    "薂薃薆薈",
    6,
    "薐",
    10,
    "薝",
    6,
    "薥薦薧薩薫薬薭薱",
    5,
    "薸薺",
    6,
    "藂",
    6,
    "藊",
    4,
    "藑藒"
  ],
  [
    "cb80",
    "藔藖",
    5,
    "藝",
    6,
    "藥藦藧藨藪",
    14,
    "恕刷耍摔衰甩帅栓拴霜双爽谁水睡税吮瞬顺舜说硕朔烁斯撕嘶思私司丝死肆寺嗣四伺似饲巳松耸怂颂送宋讼诵搜艘擞嗽苏酥俗素速粟僳塑溯宿诉肃酸蒜算虽隋随绥髓碎岁穗遂隧祟孙损笋蓑梭唆缩琐索锁所塌他它她塔"
  ],
  [
    "cc40",
    "藹藺藼藽藾蘀",
    4,
    "蘆",
    10,
    "蘒蘓蘔蘕蘗",
    15,
    "蘨蘪",
    13,
    "蘹蘺蘻蘽蘾蘿虀"
  ],
  [
    "cc80",
    "虁",
    11,
    "虒虓處",
    4,
    "虛虜虝號虠虡虣",
    7,
    "獭挞蹋踏胎苔抬台泰酞太态汰坍摊贪瘫滩坛檀痰潭谭谈坦毯袒碳探叹炭汤塘搪堂棠膛唐糖倘躺淌趟烫掏涛滔绦萄桃逃淘陶讨套特藤腾疼誊梯剔踢锑提题蹄啼体替嚏惕涕剃屉天添填田甜恬舔腆挑条迢眺跳贴铁帖厅听烃"
  ],
  [
    "cd40",
    "虭虯虰虲",
    6,
    "蚃",
    6,
    "蚎",
    4,
    "蚔蚖",
    5,
    "蚞",
    4,
    "蚥蚦蚫蚭蚮蚲蚳蚷蚸蚹蚻",
    4,
    "蛁蛂蛃蛅蛈蛌蛍蛒蛓蛕蛖蛗蛚蛜"
  ],
  [
    "cd80",
    "蛝蛠蛡蛢蛣蛥蛦蛧蛨蛪蛫蛬蛯蛵蛶蛷蛺蛻蛼蛽蛿蜁蜄蜅蜆蜋蜌蜎蜏蜐蜑蜔蜖汀廷停亭庭挺艇通桐酮瞳同铜彤童桶捅筒统痛偷投头透凸秃突图徒途涂屠土吐兔湍团推颓腿蜕褪退吞屯臀拖托脱鸵陀驮驼椭妥拓唾挖哇蛙洼娃瓦袜歪外豌弯湾玩顽丸烷完碗挽晚皖惋宛婉万腕汪王亡枉网往旺望忘妄威"
  ],
  [
    "ce40",
    "蜙蜛蜝蜟蜠蜤蜦蜧蜨蜪蜫蜬蜭蜯蜰蜲蜳蜵蜶蜸蜹蜺蜼蜽蝀",
    6,
    "蝊蝋蝍蝏蝐蝑蝒蝔蝕蝖蝘蝚",
    5,
    "蝡蝢蝦",
    7,
    "蝯蝱蝲蝳蝵"
  ],
  [
    "ce80",
    "蝷蝸蝹蝺蝿螀螁螄螆螇螉螊螌螎",
    4,
    "螔螕螖螘",
    6,
    "螠",
    4,
    "巍微危韦违桅围唯惟为潍维苇萎委伟伪尾纬未蔚味畏胃喂魏位渭谓尉慰卫瘟温蚊文闻纹吻稳紊问嗡翁瓮挝蜗涡窝我斡卧握沃巫呜钨乌污诬屋无芜梧吾吴毋武五捂午舞伍侮坞戊雾晤物勿务悟误昔熙析西硒矽晰嘻吸锡牺"
  ],
  [
    "cf40",
    "螥螦螧螩螪螮螰螱螲螴螶螷螸螹螻螼螾螿蟁",
    4,
    "蟇蟈蟉蟌",
    4,
    "蟔",
    6,
    "蟜蟝蟞蟟蟡蟢蟣蟤蟦蟧蟨蟩蟫蟬蟭蟯",
    9
  ],
  [
    "cf80",
    "蟺蟻蟼蟽蟿蠀蠁蠂蠄",
    5,
    "蠋",
    7,
    "蠔蠗蠘蠙蠚蠜",
    4,
    "蠣稀息希悉膝夕惜熄烯溪汐犀檄袭席习媳喜铣洗系隙戏细瞎虾匣霞辖暇峡侠狭下厦夏吓掀锨先仙鲜纤咸贤衔舷闲涎弦嫌显险现献县腺馅羡宪陷限线相厢镶香箱襄湘乡翔祥详想响享项巷橡像向象萧硝霄削哮嚣销消宵淆晓"
  ],
  [
    "d040",
    "蠤",
    13,
    "蠳",
    5,
    "蠺蠻蠽蠾蠿衁衂衃衆",
    5,
    "衎",
    5,
    "衕衖衘衚",
    6,
    "衦衧衪衭衯衱衳衴衵衶衸衹衺"
  ],
  [
    "d080",
    "衻衼袀袃袆袇袉袊袌袎袏袐袑袓袔袕袗",
    4,
    "袝",
    4,
    "袣袥",
    5,
    "小孝校肖啸笑效楔些歇蝎鞋协挟携邪斜胁谐写械卸蟹懈泄泻谢屑薪芯锌欣辛新忻心信衅星腥猩惺兴刑型形邢行醒幸杏性姓兄凶胸匈汹雄熊休修羞朽嗅锈秀袖绣墟戌需虚嘘须徐许蓄酗叙旭序畜恤絮婿绪续轩喧宣悬旋玄"
  ],
  [
    "d140",
    "袬袮袯袰袲",
    4,
    "袸袹袺袻袽袾袿裀裃裄裇裈裊裋裌裍裏裐裑裓裖裗裚",
    4,
    "裠裡裦裧裩",
    6,
    "裲裵裶裷裺裻製裿褀褁褃",
    5
  ],
  [
    "d180",
    "褉褋",
    4,
    "褑褔",
    4,
    "褜",
    4,
    "褢褣褤褦褧褨褩褬褭褮褯褱褲褳褵褷选癣眩绚靴薛学穴雪血勋熏循旬询寻驯巡殉汛训讯逊迅压押鸦鸭呀丫芽牙蚜崖衙涯雅哑亚讶焉咽阉烟淹盐严研蜒岩延言颜阎炎沿奄掩眼衍演艳堰燕厌砚雁唁彦焰宴谚验殃央鸯秧杨扬佯疡羊洋阳氧仰痒养样漾邀腰妖瑶"
  ],
  [
    "d240",
    "褸",
    8,
    "襂襃襅",
    24,
    "襠",
    5,
    "襧",
    19,
    "襼"
  ],
  [
    "d280",
    "襽襾覀覂覄覅覇",
    26,
    "摇尧遥窑谣姚咬舀药要耀椰噎耶爷野冶也页掖业叶曳腋夜液一壹医揖铱依伊衣颐夷遗移仪胰疑沂宜姨彝椅蚁倚已乙矣以艺抑易邑屹亿役臆逸肄疫亦裔意毅忆义益溢诣议谊译异翼翌绎茵荫因殷音阴姻吟银淫寅饮尹引隐"
  ],
  [
    "d340",
    "覢",
    30,
    "觃觍觓觔觕觗觘觙觛觝觟觠觡觢觤觧觨觩觪觬觭觮觰觱觲觴",
    6
  ],
  [
    "d380",
    "觻",
    4,
    "訁",
    5,
    "計",
    21,
    "印英樱婴鹰应缨莹萤营荧蝇迎赢盈影颖硬映哟拥佣臃痈庸雍踊蛹咏泳涌永恿勇用幽优悠忧尤由邮铀犹油游酉有友右佑釉诱又幼迂淤于盂榆虞愚舆余俞逾鱼愉渝渔隅予娱雨与屿禹宇语羽玉域芋郁吁遇喻峪御愈欲狱育誉"
  ],
  [
    "d440",
    "訞",
    31,
    "訿",
    8,
    "詉",
    21
  ],
  [
    "d480",
    "詟",
    25,
    "詺",
    6,
    "浴寓裕预豫驭鸳渊冤元垣袁原援辕园员圆猿源缘远苑愿怨院曰约越跃钥岳粤月悦阅耘云郧匀陨允运蕴酝晕韵孕匝砸杂栽哉灾宰载再在咱攒暂赞赃脏葬遭糟凿藻枣早澡蚤躁噪造皂灶燥责择则泽贼怎增憎曾赠扎喳渣札轧"
  ],
  [
    "d540",
    "誁",
    7,
    "誋",
    7,
    "誔",
    46
  ],
  [
    "d580",
    "諃",
    32,
    "铡闸眨栅榨咋乍炸诈摘斋宅窄债寨瞻毡詹粘沾盏斩辗崭展蘸栈占战站湛绽樟章彰漳张掌涨杖丈帐账仗胀瘴障招昭找沼赵照罩兆肇召遮折哲蛰辙者锗蔗这浙珍斟真甄砧臻贞针侦枕疹诊震振镇阵蒸挣睁征狰争怔整拯正政"
  ],
  [
    "d640",
    "諤",
    34,
    "謈",
    27
  ],
  [
    "d680",
    "謤謥謧",
    30,
    "帧症郑证芝枝支吱蜘知肢脂汁之织职直植殖执值侄址指止趾只旨纸志挚掷至致置帜峙制智秩稚质炙痔滞治窒中盅忠钟衷终种肿重仲众舟周州洲诌粥轴肘帚咒皱宙昼骤珠株蛛朱猪诸诛逐竹烛煮拄瞩嘱主著柱助蛀贮铸筑"
  ],
  [
    "d740",
    "譆",
    31,
    "譧",
    4,
    "譭",
    25
  ],
  [
    "d780",
    "讇",
    24,
    "讬讱讻诇诐诪谉谞住注祝驻抓爪拽专砖转撰赚篆桩庄装妆撞壮状椎锥追赘坠缀谆准捉拙卓桌琢茁酌啄着灼浊兹咨资姿滋淄孜紫仔籽滓子自渍字鬃棕踪宗综总纵邹走奏揍租足卒族祖诅阻组钻纂嘴醉最罪尊遵昨左佐柞做作坐座"
  ],
  [
    "d840",
    "谸",
    8,
    "豂豃豄豅豈豊豋豍",
    7,
    "豖豗豘豙豛",
    5,
    "豣",
    6,
    "豬",
    6,
    "豴豵豶豷豻",
    6,
    "貃貄貆貇"
  ],
  [
    "d880",
    "貈貋貍",
    6,
    "貕貖貗貙",
    20,
    "亍丌兀丐廿卅丕亘丞鬲孬噩丨禺丿匕乇夭爻卮氐囟胤馗毓睾鼗丶亟鼐乜乩亓芈孛啬嘏仄厍厝厣厥厮靥赝匚叵匦匮匾赜卦卣刂刈刎刭刳刿剀剌剞剡剜蒯剽劂劁劐劓冂罔亻仃仉仂仨仡仫仞伛仳伢佤仵伥伧伉伫佞佧攸佚佝"
  ],
  [
    "d940",
    "貮",
    62
  ],
  [
    "d980",
    "賭",
    32,
    "佟佗伲伽佶佴侑侉侃侏佾佻侪佼侬侔俦俨俪俅俚俣俜俑俟俸倩偌俳倬倏倮倭俾倜倌倥倨偾偃偕偈偎偬偻傥傧傩傺僖儆僭僬僦僮儇儋仝氽佘佥俎龠汆籴兮巽黉馘冁夔勹匍訇匐凫夙兕亠兖亳衮袤亵脔裒禀嬴蠃羸冫冱冽冼"
  ],
  [
    "da40",
    "贎",
    14,
    "贠赑赒赗赟赥赨赩赪赬赮赯赱赲赸",
    8,
    "趂趃趆趇趈趉趌",
    4,
    "趒趓趕",
    9,
    "趠趡"
  ],
  [
    "da80",
    "趢趤",
    12,
    "趲趶趷趹趻趽跀跁跂跅跇跈跉跊跍跐跒跓跔凇冖冢冥讠讦讧讪讴讵讷诂诃诋诏诎诒诓诔诖诘诙诜诟诠诤诨诩诮诰诳诶诹诼诿谀谂谄谇谌谏谑谒谔谕谖谙谛谘谝谟谠谡谥谧谪谫谮谯谲谳谵谶卩卺阝阢阡阱阪阽阼陂陉陔陟陧陬陲陴隈隍隗隰邗邛邝邙邬邡邴邳邶邺"
  ],
  [
    "db40",
    "跕跘跙跜跠跡跢跥跦跧跩跭跮跰跱跲跴跶跼跾",
    6,
    "踆踇踈踋踍踎踐踑踒踓踕",
    7,
    "踠踡踤",
    4,
    "踫踭踰踲踳踴踶踷踸踻踼踾"
  ],
  [
    "db80",
    "踿蹃蹅蹆蹌",
    4,
    "蹓",
    5,
    "蹚",
    11,
    "蹧蹨蹪蹫蹮蹱邸邰郏郅邾郐郄郇郓郦郢郜郗郛郫郯郾鄄鄢鄞鄣鄱鄯鄹酃酆刍奂劢劬劭劾哿勐勖勰叟燮矍廴凵凼鬯厶弁畚巯坌垩垡塾墼壅壑圩圬圪圳圹圮圯坜圻坂坩垅坫垆坼坻坨坭坶坳垭垤垌垲埏垧垴垓垠埕埘埚埙埒垸埴埯埸埤埝"
  ],
  [
    "dc40",
    "蹳蹵蹷",
    4,
    "蹽蹾躀躂躃躄躆躈",
    6,
    "躑躒躓躕",
    6,
    "躝躟",
    11,
    "躭躮躰躱躳",
    6,
    "躻",
    7
  ],
  [
    "dc80",
    "軃",
    10,
    "軏",
    21,
    "堋堍埽埭堀堞堙塄堠塥塬墁墉墚墀馨鼙懿艹艽艿芏芊芨芄芎芑芗芙芫芸芾芰苈苊苣芘芷芮苋苌苁芩芴芡芪芟苄苎芤苡茉苷苤茏茇苜苴苒苘茌苻苓茑茚茆茔茕苠苕茜荑荛荜茈莒茼茴茱莛荞茯荏荇荃荟荀茗荠茭茺茳荦荥"
  ],
  [
    "dd40",
    "軥",
    62
  ],
  [
    "dd80",
    "輤",
    32,
    "荨茛荩荬荪荭荮莰荸莳莴莠莪莓莜莅荼莶莩荽莸荻莘莞莨莺莼菁萁菥菘堇萘萋菝菽菖萜萸萑萆菔菟萏萃菸菹菪菅菀萦菰菡葜葑葚葙葳蒇蒈葺蒉葸萼葆葩葶蒌蒎萱葭蓁蓍蓐蓦蒽蓓蓊蒿蒺蓠蒡蒹蒴蒗蓥蓣蔌甍蔸蓰蔹蔟蔺"
  ],
  [
    "de40",
    "轅",
    32,
    "轪辀辌辒辝辠辡辢辤辥辦辧辪辬辭辮辯農辳辴辵辷辸辺辻込辿迀迃迆"
  ],
  [
    "de80",
    "迉",
    4,
    "迏迒迖迗迚迠迡迣迧迬迯迱迲迴迵迶迺迻迼迾迿逇逈逌逎逓逕逘蕖蔻蓿蓼蕙蕈蕨蕤蕞蕺瞢蕃蕲蕻薤薨薇薏蕹薮薜薅薹薷薰藓藁藜藿蘧蘅蘩蘖蘼廾弈夼奁耷奕奚奘匏尢尥尬尴扌扪抟抻拊拚拗拮挢拶挹捋捃掭揶捱捺掎掴捭掬掊捩掮掼揲揸揠揿揄揞揎摒揆掾摅摁搋搛搠搌搦搡摞撄摭撖"
  ],
  [
    "df40",
    "這逜連逤逥逧",
    5,
    "逰",
    4,
    "逷逹逺逽逿遀遃遅遆遈",
    4,
    "過達違遖遙遚遜",
    5,
    "遤遦遧適遪遫遬遯",
    4,
    "遶",
    6,
    "遾邁"
  ],
  [
    "df80",
    "還邅邆邇邉邊邌",
    4,
    "邒邔邖邘邚邜邞邟邠邤邥邧邨邩邫邭邲邷邼邽邿郀摺撷撸撙撺擀擐擗擤擢攉攥攮弋忒甙弑卟叱叽叩叨叻吒吖吆呋呒呓呔呖呃吡呗呙吣吲咂咔呷呱呤咚咛咄呶呦咝哐咭哂咴哒咧咦哓哔呲咣哕咻咿哌哙哚哜咩咪咤哝哏哞唛哧唠哽唔哳唢唣唏唑唧唪啧喏喵啉啭啁啕唿啐唼"
  ],
  [
    "e040",
    "郂郃郆郈郉郋郌郍郒郔郕郖郘郙郚郞郟郠郣郤郥郩郪郬郮郰郱郲郳郵郶郷郹郺郻郼郿鄀鄁鄃鄅",
    19,
    "鄚鄛鄜"
  ],
  [
    "e080",
    "鄝鄟鄠鄡鄤",
    10,
    "鄰鄲",
    6,
    "鄺",
    8,
    "酄唷啖啵啶啷唳唰啜喋嗒喃喱喹喈喁喟啾嗖喑啻嗟喽喾喔喙嗪嗷嗉嘟嗑嗫嗬嗔嗦嗝嗄嗯嗥嗲嗳嗌嗍嗨嗵嗤辔嘞嘈嘌嘁嘤嘣嗾嘀嘧嘭噘嘹噗嘬噍噢噙噜噌噔嚆噤噱噫噻噼嚅嚓嚯囔囗囝囡囵囫囹囿圄圊圉圜帏帙帔帑帱帻帼"
  ],
  [
    "e140",
    "酅酇酈酑酓酔酕酖酘酙酛酜酟酠酦酧酨酫酭酳酺酻酼醀",
    4,
    "醆醈醊醎醏醓",
    6,
    "醜",
    5,
    "醤",
    5,
    "醫醬醰醱醲醳醶醷醸醹醻"
  ],
  [
    "e180",
    "醼",
    10,
    "釈釋釐釒",
    9,
    "針",
    8,
    "帷幄幔幛幞幡岌屺岍岐岖岈岘岙岑岚岜岵岢岽岬岫岱岣峁岷峄峒峤峋峥崂崃崧崦崮崤崞崆崛嵘崾崴崽嵬嵛嵯嵝嵫嵋嵊嵩嵴嶂嶙嶝豳嶷巅彳彷徂徇徉後徕徙徜徨徭徵徼衢彡犭犰犴犷犸狃狁狎狍狒狨狯狩狲狴狷猁狳猃狺"
  ],
  [
    "e240",
    "釦",
    62
  ],
  [
    "e280",
    "鈥",
    32,
    "狻猗猓猡猊猞猝猕猢猹猥猬猸猱獐獍獗獠獬獯獾舛夥飧夤夂饣饧",
    5,
    "饴饷饽馀馄馇馊馍馐馑馓馔馕庀庑庋庖庥庠庹庵庾庳赓廒廑廛廨廪膺忄忉忖忏怃忮怄忡忤忾怅怆忪忭忸怙怵怦怛怏怍怩怫怊怿怡恸恹恻恺恂"
  ],
  [
    "e340",
    "鉆",
    45,
    "鉵",
    16
  ],
  [
    "e380",
    "銆",
    7,
    "銏",
    24,
    "恪恽悖悚悭悝悃悒悌悛惬悻悱惝惘惆惚悴愠愦愕愣惴愀愎愫慊慵憬憔憧憷懔懵忝隳闩闫闱闳闵闶闼闾阃阄阆阈阊阋阌阍阏阒阕阖阗阙阚丬爿戕氵汔汜汊沣沅沐沔沌汨汩汴汶沆沩泐泔沭泷泸泱泗沲泠泖泺泫泮沱泓泯泾"
  ],
  [
    "e440",
    "銨",
    5,
    "銯",
    24,
    "鋉",
    31
  ],
  [
    "e480",
    "鋩",
    32,
    "洹洧洌浃浈洇洄洙洎洫浍洮洵洚浏浒浔洳涑浯涞涠浞涓涔浜浠浼浣渚淇淅淞渎涿淠渑淦淝淙渖涫渌涮渫湮湎湫溲湟溆湓湔渲渥湄滟溱溘滠漭滢溥溧溽溻溷滗溴滏溏滂溟潢潆潇漤漕滹漯漶潋潴漪漉漩澉澍澌潸潲潼潺濑"
  ],
  [
    "e540",
    "錊",
    51,
    "錿",
    10
  ],
  [
    "e580",
    "鍊",
    31,
    "鍫濉澧澹澶濂濡濮濞濠濯瀚瀣瀛瀹瀵灏灞宀宄宕宓宥宸甯骞搴寤寮褰寰蹇謇辶迓迕迥迮迤迩迦迳迨逅逄逋逦逑逍逖逡逵逶逭逯遄遑遒遐遨遘遢遛暹遴遽邂邈邃邋彐彗彖彘尻咫屐屙孱屣屦羼弪弩弭艴弼鬻屮妁妃妍妩妪妣"
  ],
  [
    "e640",
    "鍬",
    34,
    "鎐",
    27
  ],
  [
    "e680",
    "鎬",
    29,
    "鏋鏌鏍妗姊妫妞妤姒妲妯姗妾娅娆姝娈姣姘姹娌娉娲娴娑娣娓婀婧婊婕娼婢婵胬媪媛婷婺媾嫫媲嫒嫔媸嫠嫣嫱嫖嫦嫘嫜嬉嬗嬖嬲嬷孀尕尜孚孥孳孑孓孢驵驷驸驺驿驽骀骁骅骈骊骐骒骓骖骘骛骜骝骟骠骢骣骥骧纟纡纣纥纨纩"
  ],
  [
    "e740",
    "鏎",
    7,
    "鏗",
    54
  ],
  [
    "e780",
    "鐎",
    32,
    "纭纰纾绀绁绂绉绋绌绐绔绗绛绠绡绨绫绮绯绱绲缍绶绺绻绾缁缂缃缇缈缋缌缏缑缒缗缙缜缛缟缡",
    6,
    "缪缫缬缭缯",
    4,
    "缵幺畿巛甾邕玎玑玮玢玟珏珂珑玷玳珀珉珈珥珙顼琊珩珧珞玺珲琏琪瑛琦琥琨琰琮琬"
  ],
  [
    "e840",
    "鐯",
    14,
    "鐿",
    43,
    "鑬鑭鑮鑯"
  ],
  [
    "e880",
    "鑰",
    20,
    "钑钖钘铇铏铓铔铚铦铻锜锠琛琚瑁瑜瑗瑕瑙瑷瑭瑾璜璎璀璁璇璋璞璨璩璐璧瓒璺韪韫韬杌杓杞杈杩枥枇杪杳枘枧杵枨枞枭枋杷杼柰栉柘栊柩枰栌柙枵柚枳柝栀柃枸柢栎柁柽栲栳桠桡桎桢桄桤梃栝桕桦桁桧桀栾桊桉栩梵梏桴桷梓桫棂楮棼椟椠棹"
  ],
  [
    "e940",
    "锧锳锽镃镈镋镕镚镠镮镴镵長",
    7,
    "門",
    42
  ],
  [
    "e980",
    "閫",
    32,
    "椤棰椋椁楗棣椐楱椹楠楂楝榄楫榀榘楸椴槌榇榈槎榉楦楣楹榛榧榻榫榭槔榱槁槊槟榕槠榍槿樯槭樗樘橥槲橄樾檠橐橛樵檎橹樽樨橘橼檑檐檩檗檫猷獒殁殂殇殄殒殓殍殚殛殡殪轫轭轱轲轳轵轶轸轷轹轺轼轾辁辂辄辇辋"
  ],
  [
    "ea40",
    "闌",
    27,
    "闬闿阇阓阘阛阞阠阣",
    6,
    "阫阬阭阯阰阷阸阹阺阾陁陃陊陎陏陑陒陓陖陗"
  ],
  [
    "ea80",
    "陘陙陚陜陝陞陠陣陥陦陫陭",
    4,
    "陳陸",
    12,
    "隇隉隊辍辎辏辘辚軎戋戗戛戟戢戡戥戤戬臧瓯瓴瓿甏甑甓攴旮旯旰昊昙杲昃昕昀炅曷昝昴昱昶昵耆晟晔晁晏晖晡晗晷暄暌暧暝暾曛曜曦曩贲贳贶贻贽赀赅赆赈赉赇赍赕赙觇觊觋觌觎觏觐觑牮犟牝牦牯牾牿犄犋犍犏犒挈挲掰"
  ],
  [
    "eb40",
    "隌階隑隒隓隕隖隚際隝",
    9,
    "隨",
    7,
    "隱隲隴隵隷隸隺隻隿雂雃雈雊雋雐雑雓雔雖",
    9,
    "雡",
    6,
    "雫"
  ],
  [
    "eb80",
    "雬雭雮雰雱雲雴雵雸雺電雼雽雿霂霃霅霊霋霌霐霑霒霔霕霗",
    4,
    "霝霟霠搿擘耄毪毳毽毵毹氅氇氆氍氕氘氙氚氡氩氤氪氲攵敕敫牍牒牖爰虢刖肟肜肓肼朊肽肱肫肭肴肷胧胨胩胪胛胂胄胙胍胗朐胝胫胱胴胭脍脎胲胼朕脒豚脶脞脬脘脲腈腌腓腴腙腚腱腠腩腼腽腭腧塍媵膈膂膑滕膣膪臌朦臊膻"
  ],
  [
    "ec40",
    "霡",
    8,
    "霫霬霮霯霱霳",
    4,
    "霺霻霼霽霿",
    18,
    "靔靕靗靘靚靜靝靟靣靤靦靧靨靪",
    7
  ],
  [
    "ec80",
    "靲靵靷",
    4,
    "靽",
    7,
    "鞆",
    4,
    "鞌鞎鞏鞐鞓鞕鞖鞗鞙",
    4,
    "臁膦欤欷欹歃歆歙飑飒飓飕飙飚殳彀毂觳斐齑斓於旆旄旃旌旎旒旖炀炜炖炝炻烀炷炫炱烨烊焐焓焖焯焱煳煜煨煅煲煊煸煺熘熳熵熨熠燠燔燧燹爝爨灬焘煦熹戾戽扃扈扉礻祀祆祉祛祜祓祚祢祗祠祯祧祺禅禊禚禧禳忑忐"
  ],
  [
    "ed40",
    "鞞鞟鞡鞢鞤",
    6,
    "鞬鞮鞰鞱鞳鞵",
    46
  ],
  [
    "ed80",
    "韤韥韨韮",
    4,
    "韴韷",
    23,
    "怼恝恚恧恁恙恣悫愆愍慝憩憝懋懑戆肀聿沓泶淼矶矸砀砉砗砘砑斫砭砜砝砹砺砻砟砼砥砬砣砩硎硭硖硗砦硐硇硌硪碛碓碚碇碜碡碣碲碹碥磔磙磉磬磲礅磴礓礤礞礴龛黹黻黼盱眄眍盹眇眈眚眢眙眭眦眵眸睐睑睇睃睚睨"
  ],
  [
    "ee40",
    "頏",
    62
  ],
  [
    "ee80",
    "顎",
    32,
    "睢睥睿瞍睽瞀瞌瞑瞟瞠瞰瞵瞽町畀畎畋畈畛畲畹疃罘罡罟詈罨罴罱罹羁罾盍盥蠲钅钆钇钋钊钌钍钏钐钔钗钕钚钛钜钣钤钫钪钭钬钯钰钲钴钶",
    4,
    "钼钽钿铄铈",
    6,
    "铐铑铒铕铖铗铙铘铛铞铟铠铢铤铥铧铨铪"
  ],
  [
    "ef40",
    "顯",
    5,
    "颋颎颒颕颙颣風",
    37,
    "飏飐飔飖飗飛飜飝飠",
    4
  ],
  [
    "ef80",
    "飥飦飩",
    30,
    "铩铫铮铯铳铴铵铷铹铼铽铿锃锂锆锇锉锊锍锎锏锒",
    4,
    "锘锛锝锞锟锢锪锫锩锬锱锲锴锶锷锸锼锾锿镂锵镄镅镆镉镌镎镏镒镓镔镖镗镘镙镛镞镟镝镡镢镤",
    8,
    "镯镱镲镳锺矧矬雉秕秭秣秫稆嵇稃稂稞稔"
  ],
  [
    "f040",
    "餈",
    4,
    "餎餏餑",
    28,
    "餯",
    26
  ],
  [
    "f080",
    "饊",
    9,
    "饖",
    12,
    "饤饦饳饸饹饻饾馂馃馉稹稷穑黏馥穰皈皎皓皙皤瓞瓠甬鸠鸢鸨",
    4,
    "鸲鸱鸶鸸鸷鸹鸺鸾鹁鹂鹄鹆鹇鹈鹉鹋鹌鹎鹑鹕鹗鹚鹛鹜鹞鹣鹦",
    6,
    "鹱鹭鹳疒疔疖疠疝疬疣疳疴疸痄疱疰痃痂痖痍痣痨痦痤痫痧瘃痱痼痿瘐瘀瘅瘌瘗瘊瘥瘘瘕瘙"
  ],
  [
    "f140",
    "馌馎馚",
    10,
    "馦馧馩",
    47
  ],
  [
    "f180",
    "駙",
    32,
    "瘛瘼瘢瘠癀瘭瘰瘿瘵癃瘾瘳癍癞癔癜癖癫癯翊竦穸穹窀窆窈窕窦窠窬窨窭窳衤衩衲衽衿袂袢裆袷袼裉裢裎裣裥裱褚裼裨裾裰褡褙褓褛褊褴褫褶襁襦襻疋胥皲皴矜耒耔耖耜耠耢耥耦耧耩耨耱耋耵聃聆聍聒聩聱覃顸颀颃"
  ],
  [
    "f240",
    "駺",
    62
  ],
  [
    "f280",
    "騹",
    32,
    "颉颌颍颏颔颚颛颞颟颡颢颥颦虍虔虬虮虿虺虼虻蚨蚍蚋蚬蚝蚧蚣蚪蚓蚩蚶蛄蚵蛎蚰蚺蚱蚯蛉蛏蚴蛩蛱蛲蛭蛳蛐蜓蛞蛴蛟蛘蛑蜃蜇蛸蜈蜊蜍蜉蜣蜻蜞蜥蜮蜚蜾蝈蜴蜱蜩蜷蜿螂蜢蝽蝾蝻蝠蝰蝌蝮螋蝓蝣蝼蝤蝙蝥螓螯螨蟒"
  ],
  [
    "f340",
    "驚",
    17,
    "驲骃骉骍骎骔骕骙骦骩",
    6,
    "骲骳骴骵骹骻骽骾骿髃髄髆",
    4,
    "髍髎髏髐髒體髕髖髗髙髚髛髜"
  ],
  [
    "f380",
    "髝髞髠髢髣髤髥髧髨髩髪髬髮髰",
    8,
    "髺髼",
    6,
    "鬄鬅鬆蟆螈螅螭螗螃螫蟥螬螵螳蟋蟓螽蟑蟀蟊蟛蟪蟠蟮蠖蠓蟾蠊蠛蠡蠹蠼缶罂罄罅舐竺竽笈笃笄笕笊笫笏筇笸笪笙笮笱笠笥笤笳笾笞筘筚筅筵筌筝筠筮筻筢筲筱箐箦箧箸箬箝箨箅箪箜箢箫箴篑篁篌篝篚篥篦篪簌篾篼簏簖簋"
  ],
  [
    "f440",
    "鬇鬉",
    5,
    "鬐鬑鬒鬔",
    10,
    "鬠鬡鬢鬤",
    10,
    "鬰鬱鬳",
    7,
    "鬽鬾鬿魀魆魊魋魌魎魐魒魓魕",
    5
  ],
  [
    "f480",
    "魛",
    32,
    "簟簪簦簸籁籀臾舁舂舄臬衄舡舢舣舭舯舨舫舸舻舳舴舾艄艉艋艏艚艟艨衾袅袈裘裟襞羝羟羧羯羰羲籼敉粑粝粜粞粢粲粼粽糁糇糌糍糈糅糗糨艮暨羿翎翕翥翡翦翩翮翳糸絷綦綮繇纛麸麴赳趄趔趑趱赧赭豇豉酊酐酎酏酤"
  ],
  [
    "f540",
    "魼",
    62
  ],
  [
    "f580",
    "鮻",
    32,
    "酢酡酰酩酯酽酾酲酴酹醌醅醐醍醑醢醣醪醭醮醯醵醴醺豕鹾趸跫踅蹙蹩趵趿趼趺跄跖跗跚跞跎跏跛跆跬跷跸跣跹跻跤踉跽踔踝踟踬踮踣踯踺蹀踹踵踽踱蹉蹁蹂蹑蹒蹊蹰蹶蹼蹯蹴躅躏躔躐躜躞豸貂貊貅貘貔斛觖觞觚觜"
  ],
  [
    "f640",
    "鯜",
    62
  ],
  [
    "f680",
    "鰛",
    32,
    "觥觫觯訾謦靓雩雳雯霆霁霈霏霎霪霭霰霾龀龃龅",
    5,
    "龌黾鼋鼍隹隼隽雎雒瞿雠銎銮鋈錾鍪鏊鎏鐾鑫鱿鲂鲅鲆鲇鲈稣鲋鲎鲐鲑鲒鲔鲕鲚鲛鲞",
    5,
    "鲥",
    4,
    "鲫鲭鲮鲰",
    7,
    "鲺鲻鲼鲽鳄鳅鳆鳇鳊鳋"
  ],
  [
    "f740",
    "鰼",
    62
  ],
  [
    "f780",
    "鱻鱽鱾鲀鲃鲄鲉鲊鲌鲏鲓鲖鲗鲘鲙鲝鲪鲬鲯鲹鲾",
    4,
    "鳈鳉鳑鳒鳚鳛鳠鳡鳌",
    4,
    "鳓鳔鳕鳗鳘鳙鳜鳝鳟鳢靼鞅鞑鞒鞔鞯鞫鞣鞲鞴骱骰骷鹘骶骺骼髁髀髅髂髋髌髑魅魃魇魉魈魍魑飨餍餮饕饔髟髡髦髯髫髻髭髹鬈鬏鬓鬟鬣麽麾縻麂麇麈麋麒鏖麝麟黛黜黝黠黟黢黩黧黥黪黯鼢鼬鼯鼹鼷鼽鼾齄"
  ],
  [
    "f840",
    "鳣",
    62
  ],
  [
    "f880",
    "鴢",
    32
  ],
  [
    "f940",
    "鵃",
    62
  ],
  [
    "f980",
    "鶂",
    32
  ],
  [
    "fa40",
    "鶣",
    62
  ],
  [
    "fa80",
    "鷢",
    32
  ],
  [
    "fb40",
    "鸃",
    27,
    "鸤鸧鸮鸰鸴鸻鸼鹀鹍鹐鹒鹓鹔鹖鹙鹝鹟鹠鹡鹢鹥鹮鹯鹲鹴",
    9,
    "麀"
  ],
  [
    "fb80",
    "麁麃麄麅麆麉麊麌",
    5,
    "麔",
    8,
    "麞麠",
    5,
    "麧麨麩麪"
  ],
  [
    "fc40",
    "麫",
    8,
    "麵麶麷麹麺麼麿",
    4,
    "黅黆黇黈黊黋黌黐黒黓黕黖黗黙黚點黡黣黤黦黨黫黬黭黮黰",
    8,
    "黺黽黿",
    6
  ],
  [
    "fc80",
    "鼆",
    4,
    "鼌鼏鼑鼒鼔鼕鼖鼘鼚",
    5,
    "鼡鼣",
    8,
    "鼭鼮鼰鼱"
  ],
  [
    "fd40",
    "鼲",
    4,
    "鼸鼺鼼鼿",
    4,
    "齅",
    10,
    "齒",
    38
  ],
  [
    "fd80",
    "齹",
    5,
    "龁龂龍",
    11,
    "龜龝龞龡",
    4,
    "郎凉秊裏隣"
  ],
  [
    "fe40",
    "兀嗀﨎﨏﨑﨓﨔礼﨟蘒﨡﨣﨤﨧﨨﨩"
  ]
], cs = [
  [
    "a140",
    "",
    62
  ],
  [
    "a180",
    "",
    32
  ],
  [
    "a240",
    "",
    62
  ],
  [
    "a280",
    "",
    32
  ],
  [
    "a2ab",
    "",
    5
  ],
  [
    "a2e3",
    "€"
  ],
  [
    "a2ef",
    ""
  ],
  [
    "a2fd",
    ""
  ],
  [
    "a340",
    "",
    62
  ],
  [
    "a380",
    "",
    31,
    "　"
  ],
  [
    "a440",
    "",
    62
  ],
  [
    "a480",
    "",
    32
  ],
  [
    "a4f4",
    "",
    10
  ],
  [
    "a540",
    "",
    62
  ],
  [
    "a580",
    "",
    32
  ],
  [
    "a5f7",
    "",
    7
  ],
  [
    "a640",
    "",
    62
  ],
  [
    "a680",
    "",
    32
  ],
  [
    "a6b9",
    "",
    7
  ],
  [
    "a6d9",
    "",
    6
  ],
  [
    "a6ec",
    ""
  ],
  [
    "a6f3",
    ""
  ],
  [
    "a6f6",
    "",
    8
  ],
  [
    "a740",
    "",
    62
  ],
  [
    "a780",
    "",
    32
  ],
  [
    "a7c2",
    "",
    14
  ],
  [
    "a7f2",
    "",
    12
  ],
  [
    "a896",
    "",
    10
  ],
  [
    "a8bc",
    "ḿ"
  ],
  [
    "a8bf",
    "ǹ"
  ],
  [
    "a8c1",
    ""
  ],
  [
    "a8ea",
    "",
    20
  ],
  [
    "a958",
    ""
  ],
  [
    "a95b",
    ""
  ],
  [
    "a95d",
    ""
  ],
  [
    "a989",
    "〾⿰",
    11
  ],
  [
    "a997",
    "",
    12
  ],
  [
    "a9f0",
    "",
    14
  ],
  [
    "aaa1",
    "",
    93
  ],
  [
    "aba1",
    "",
    93
  ],
  [
    "aca1",
    "",
    93
  ],
  [
    "ada1",
    "",
    93
  ],
  [
    "aea1",
    "",
    93
  ],
  [
    "afa1",
    "",
    93
  ],
  [
    "d7fa",
    "",
    4
  ],
  [
    "f8a1",
    "",
    93
  ],
  [
    "f9a1",
    "",
    93
  ],
  [
    "faa1",
    "",
    93
  ],
  [
    "fba1",
    "",
    93
  ],
  [
    "fca1",
    "",
    93
  ],
  [
    "fda1",
    "",
    93
  ],
  [
    "fe50",
    "⺁⺄㑳㑇⺈⺋㖞㘚㘎⺌⺗㥮㤘㧏㧟㩳㧐㭎㱮㳠⺧⺪䁖䅟⺮䌷⺳⺶⺷䎱䎬⺻䏝䓖䙡䙌"
  ],
  [
    "fe80",
    "䜣䜩䝼䞍⻊䥇䥺䥽䦂䦃䦅䦆䦟䦛䦷䦶䲣䲟䲠䲡䱷䲢䴓",
    6,
    "䶮",
    93
  ],
  [
    "8135f437",
    ""
  ]
], wu = [
  128,
  165,
  169,
  178,
  184,
  216,
  226,
  235,
  238,
  244,
  248,
  251,
  253,
  258,
  276,
  284,
  300,
  325,
  329,
  334,
  364,
  463,
  465,
  467,
  469,
  471,
  473,
  475,
  477,
  506,
  594,
  610,
  712,
  716,
  730,
  930,
  938,
  962,
  970,
  1026,
  1104,
  1106,
  8209,
  8215,
  8218,
  8222,
  8231,
  8241,
  8244,
  8246,
  8252,
  8365,
  8452,
  8454,
  8458,
  8471,
  8482,
  8556,
  8570,
  8596,
  8602,
  8713,
  8720,
  8722,
  8726,
  8731,
  8737,
  8740,
  8742,
  8748,
  8751,
  8760,
  8766,
  8777,
  8781,
  8787,
  8802,
  8808,
  8816,
  8854,
  8858,
  8870,
  8896,
  8979,
  9322,
  9372,
  9548,
  9588,
  9616,
  9622,
  9634,
  9652,
  9662,
  9672,
  9676,
  9680,
  9702,
  9735,
  9738,
  9793,
  9795,
  11906,
  11909,
  11913,
  11917,
  11928,
  11944,
  11947,
  11951,
  11956,
  11960,
  11964,
  11979,
  12284,
  12292,
  12312,
  12319,
  12330,
  12351,
  12436,
  12447,
  12535,
  12543,
  12586,
  12842,
  12850,
  12964,
  13200,
  13215,
  13218,
  13253,
  13263,
  13267,
  13270,
  13384,
  13428,
  13727,
  13839,
  13851,
  14617,
  14703,
  14801,
  14816,
  14964,
  15183,
  15471,
  15585,
  16471,
  16736,
  17208,
  17325,
  17330,
  17374,
  17623,
  17997,
  18018,
  18212,
  18218,
  18301,
  18318,
  18760,
  18811,
  18814,
  18820,
  18823,
  18844,
  18848,
  18872,
  19576,
  19620,
  19738,
  19887,
  40870,
  59244,
  59336,
  59367,
  59413,
  59417,
  59423,
  59431,
  59437,
  59443,
  59452,
  59460,
  59478,
  59493,
  63789,
  63866,
  63894,
  63976,
  63986,
  64016,
  64018,
  64021,
  64025,
  64034,
  64037,
  64042,
  65074,
  65093,
  65107,
  65112,
  65127,
  65132,
  65375,
  65510,
  65536
], Cu = [
  0,
  36,
  38,
  45,
  50,
  81,
  89,
  95,
  96,
  100,
  103,
  104,
  105,
  109,
  126,
  133,
  148,
  172,
  175,
  179,
  208,
  306,
  307,
  308,
  309,
  310,
  311,
  312,
  313,
  341,
  428,
  443,
  544,
  545,
  558,
  741,
  742,
  749,
  750,
  805,
  819,
  820,
  7922,
  7924,
  7925,
  7927,
  7934,
  7943,
  7944,
  7945,
  7950,
  8062,
  8148,
  8149,
  8152,
  8164,
  8174,
  8236,
  8240,
  8262,
  8264,
  8374,
  8380,
  8381,
  8384,
  8388,
  8390,
  8392,
  8393,
  8394,
  8396,
  8401,
  8406,
  8416,
  8419,
  8424,
  8437,
  8439,
  8445,
  8482,
  8485,
  8496,
  8521,
  8603,
  8936,
  8946,
  9046,
  9050,
  9063,
  9066,
  9076,
  9092,
  9100,
  9108,
  9111,
  9113,
  9131,
  9162,
  9164,
  9218,
  9219,
  11329,
  11331,
  11334,
  11336,
  11346,
  11361,
  11363,
  11366,
  11370,
  11372,
  11375,
  11389,
  11682,
  11686,
  11687,
  11692,
  11694,
  11714,
  11716,
  11723,
  11725,
  11730,
  11736,
  11982,
  11989,
  12102,
  12336,
  12348,
  12350,
  12384,
  12393,
  12395,
  12397,
  12510,
  12553,
  12851,
  12962,
  12973,
  13738,
  13823,
  13919,
  13933,
  14080,
  14298,
  14585,
  14698,
  15583,
  15847,
  16318,
  16434,
  16438,
  16481,
  16729,
  17102,
  17122,
  17315,
  17320,
  17402,
  17418,
  17859,
  17909,
  17911,
  17915,
  17916,
  17936,
  17939,
  17961,
  18664,
  18703,
  18814,
  18962,
  19043,
  33469,
  33470,
  33471,
  33484,
  33485,
  33490,
  33497,
  33501,
  33505,
  33513,
  33520,
  33536,
  33550,
  37845,
  37921,
  37948,
  38029,
  38038,
  38064,
  38065,
  38066,
  38069,
  38075,
  38076,
  38078,
  39108,
  39109,
  39113,
  39114,
  39115,
  39116,
  39265,
  39394,
  189e3
], vu = {
  uChars: wu,
  gbChars: Cu
}, Lu = [
  [
    "0",
    "\0",
    127
  ],
  [
    "8141",
    "갂갃갅갆갋",
    4,
    "갘갞갟갡갢갣갥",
    6,
    "갮갲갳갴"
  ],
  [
    "8161",
    "갵갶갷갺갻갽갾갿걁",
    9,
    "걌걎",
    5,
    "걕"
  ],
  [
    "8181",
    "걖걗걙걚걛걝",
    18,
    "걲걳걵걶걹걻",
    4,
    "겂겇겈겍겎겏겑겒겓겕",
    6,
    "겞겢",
    5,
    "겫겭겮겱",
    6,
    "겺겾겿곀곂곃곅곆곇곉곊곋곍",
    7,
    "곖곘",
    7,
    "곢곣곥곦곩곫곭곮곲곴곷",
    4,
    "곾곿괁괂괃괅괇",
    4,
    "괎괐괒괓"
  ],
  [
    "8241",
    "괔괕괖괗괙괚괛괝괞괟괡",
    7,
    "괪괫괮",
    5
  ],
  [
    "8261",
    "괶괷괹괺괻괽",
    6,
    "굆굈굊",
    5,
    "굑굒굓굕굖굗"
  ],
  [
    "8281",
    "굙",
    7,
    "굢굤",
    7,
    "굮굯굱굲굷굸굹굺굾궀궃",
    4,
    "궊궋궍궎궏궑",
    10,
    "궞",
    5,
    "궥",
    17,
    "궸",
    7,
    "귂귃귅귆귇귉",
    6,
    "귒귔",
    7,
    "귝귞귟귡귢귣귥",
    18
  ],
  [
    "8341",
    "귺귻귽귾긂",
    5,
    "긊긌긎",
    5,
    "긕",
    7
  ],
  [
    "8361",
    "긝",
    18,
    "긲긳긵긶긹긻긼"
  ],
  [
    "8381",
    "긽긾긿깂깄깇깈깉깋깏깑깒깓깕깗",
    4,
    "깞깢깣깤깦깧깪깫깭깮깯깱",
    6,
    "깺깾",
    5,
    "꺆",
    5,
    "꺍",
    46,
    "꺿껁껂껃껅",
    6,
    "껎껒",
    5,
    "껚껛껝",
    8
  ],
  [
    "8441",
    "껦껧껩껪껬껮",
    5,
    "껵껶껷껹껺껻껽",
    8
  ],
  [
    "8461",
    "꼆꼉꼊꼋꼌꼎꼏꼑",
    18
  ],
  [
    "8481",
    "꼤",
    7,
    "꼮꼯꼱꼳꼵",
    6,
    "꼾꽀꽄꽅꽆꽇꽊",
    5,
    "꽑",
    10,
    "꽞",
    5,
    "꽦",
    18,
    "꽺",
    5,
    "꾁꾂꾃꾅꾆꾇꾉",
    6,
    "꾒꾓꾔꾖",
    5,
    "꾝",
    26,
    "꾺꾻꾽꾾"
  ],
  [
    "8541",
    "꾿꿁",
    5,
    "꿊꿌꿏",
    4,
    "꿕",
    6,
    "꿝",
    4
  ],
  [
    "8561",
    "꿢",
    5,
    "꿪",
    5,
    "꿲꿳꿵꿶꿷꿹",
    6,
    "뀂뀃"
  ],
  [
    "8581",
    "뀅",
    6,
    "뀍뀎뀏뀑뀒뀓뀕",
    6,
    "뀞",
    9,
    "뀩",
    26,
    "끆끇끉끋끍끏끐끑끒끖끘끚끛끜끞",
    29,
    "끾끿낁낂낃낅",
    6,
    "낎낐낒",
    5,
    "낛낝낞낣낤"
  ],
  [
    "8641",
    "낥낦낧낪낰낲낶낷낹낺낻낽",
    6,
    "냆냊",
    5,
    "냒"
  ],
  [
    "8661",
    "냓냕냖냗냙",
    6,
    "냡냢냣냤냦",
    10
  ],
  [
    "8681",
    "냱",
    22,
    "넊넍넎넏넑넔넕넖넗넚넞",
    4,
    "넦넧넩넪넫넭",
    6,
    "넶넺",
    5,
    "녂녃녅녆녇녉",
    6,
    "녒녓녖녗녙녚녛녝녞녟녡",
    22,
    "녺녻녽녾녿놁놃",
    4,
    "놊놌놎놏놐놑놕놖놗놙놚놛놝"
  ],
  [
    "8741",
    "놞",
    9,
    "놩",
    15
  ],
  [
    "8761",
    "놹",
    18,
    "뇍뇎뇏뇑뇒뇓뇕"
  ],
  [
    "8781",
    "뇖",
    5,
    "뇞뇠",
    7,
    "뇪뇫뇭뇮뇯뇱",
    7,
    "뇺뇼뇾",
    5,
    "눆눇눉눊눍",
    6,
    "눖눘눚",
    5,
    "눡",
    18,
    "눵",
    6,
    "눽",
    26,
    "뉙뉚뉛뉝뉞뉟뉡",
    6,
    "뉪",
    4
  ],
  [
    "8841",
    "뉯",
    4,
    "뉶",
    5,
    "뉽",
    6,
    "늆늇늈늊",
    4
  ],
  [
    "8861",
    "늏늒늓늕늖늗늛",
    4,
    "늢늤늧늨늩늫늭늮늯늱늲늳늵늶늷"
  ],
  [
    "8881",
    "늸",
    15,
    "닊닋닍닎닏닑닓",
    4,
    "닚닜닞닟닠닡닣닧닩닪닰닱닲닶닼닽닾댂댃댅댆댇댉",
    6,
    "댒댖",
    5,
    "댝",
    54,
    "덗덙덚덝덠덡덢덣"
  ],
  [
    "8941",
    "덦덨덪덬덭덯덲덳덵덶덷덹",
    6,
    "뎂뎆",
    5,
    "뎍"
  ],
  [
    "8961",
    "뎎뎏뎑뎒뎓뎕",
    10,
    "뎢",
    5,
    "뎩뎪뎫뎭"
  ],
  [
    "8981",
    "뎮",
    21,
    "돆돇돉돊돍돏돑돒돓돖돘돚돜돞돟돡돢돣돥돦돧돩",
    18,
    "돽",
    18,
    "됑",
    6,
    "됙됚됛됝됞됟됡",
    6,
    "됪됬",
    7,
    "됵",
    15
  ],
  [
    "8a41",
    "둅",
    10,
    "둒둓둕둖둗둙",
    6,
    "둢둤둦"
  ],
  [
    "8a61",
    "둧",
    4,
    "둭",
    18,
    "뒁뒂"
  ],
  [
    "8a81",
    "뒃",
    4,
    "뒉",
    19,
    "뒞",
    5,
    "뒥뒦뒧뒩뒪뒫뒭",
    7,
    "뒶뒸뒺",
    5,
    "듁듂듃듅듆듇듉",
    6,
    "듑듒듓듔듖",
    5,
    "듞듟듡듢듥듧",
    4,
    "듮듰듲",
    5,
    "듹",
    26,
    "딖딗딙딚딝"
  ],
  [
    "8b41",
    "딞",
    5,
    "딦딫",
    4,
    "딲딳딵딶딷딹",
    6,
    "땂땆"
  ],
  [
    "8b61",
    "땇땈땉땊땎땏땑땒땓땕",
    6,
    "땞땢",
    8
  ],
  [
    "8b81",
    "땫",
    52,
    "떢떣떥떦떧떩떬떭떮떯떲떶",
    4,
    "떾떿뗁뗂뗃뗅",
    6,
    "뗎뗒",
    5,
    "뗙",
    18,
    "뗭",
    18
  ],
  [
    "8c41",
    "똀",
    15,
    "똒똓똕똖똗똙",
    4
  ],
  [
    "8c61",
    "똞",
    6,
    "똦",
    5,
    "똭",
    6,
    "똵",
    5
  ],
  [
    "8c81",
    "똻",
    12,
    "뙉",
    26,
    "뙥뙦뙧뙩",
    50,
    "뚞뚟뚡뚢뚣뚥",
    5,
    "뚭뚮뚯뚰뚲",
    16
  ],
  [
    "8d41",
    "뛃",
    16,
    "뛕",
    8
  ],
  [
    "8d61",
    "뛞",
    17,
    "뛱뛲뛳뛵뛶뛷뛹뛺"
  ],
  [
    "8d81",
    "뛻",
    4,
    "뜂뜃뜄뜆",
    33,
    "뜪뜫뜭뜮뜱",
    6,
    "뜺뜼",
    7,
    "띅띆띇띉띊띋띍",
    6,
    "띖",
    9,
    "띡띢띣띥띦띧띩",
    6,
    "띲띴띶",
    5,
    "띾띿랁랂랃랅",
    6,
    "랎랓랔랕랚랛랝랞"
  ],
  [
    "8e41",
    "랟랡",
    6,
    "랪랮",
    5,
    "랶랷랹",
    8
  ],
  [
    "8e61",
    "럂",
    4,
    "럈럊",
    19
  ],
  [
    "8e81",
    "럞",
    13,
    "럮럯럱럲럳럵",
    6,
    "럾렂",
    4,
    "렊렋렍렎렏렑",
    6,
    "렚렜렞",
    5,
    "렦렧렩렪렫렭",
    6,
    "렶렺",
    5,
    "롁롂롃롅",
    11,
    "롒롔",
    7,
    "롞롟롡롢롣롥",
    6,
    "롮롰롲",
    5,
    "롹롺롻롽",
    7
  ],
  [
    "8f41",
    "뢅",
    7,
    "뢎",
    17
  ],
  [
    "8f61",
    "뢠",
    7,
    "뢩",
    6,
    "뢱뢲뢳뢵뢶뢷뢹",
    4
  ],
  [
    "8f81",
    "뢾뢿룂룄룆",
    5,
    "룍룎룏룑룒룓룕",
    7,
    "룞룠룢",
    5,
    "룪룫룭룮룯룱",
    6,
    "룺룼룾",
    5,
    "뤅",
    18,
    "뤙",
    6,
    "뤡",
    26,
    "뤾뤿륁륂륃륅",
    6,
    "륍륎륐륒",
    5
  ],
  [
    "9041",
    "륚륛륝륞륟륡",
    6,
    "륪륬륮",
    5,
    "륶륷륹륺륻륽"
  ],
  [
    "9061",
    "륾",
    5,
    "릆릈릋릌릏",
    15
  ],
  [
    "9081",
    "릟",
    12,
    "릮릯릱릲릳릵",
    6,
    "릾맀맂",
    5,
    "맊맋맍맓",
    4,
    "맚맜맟맠맢맦맧맩맪맫맭",
    6,
    "맶맻",
    4,
    "먂",
    5,
    "먉",
    11,
    "먖",
    33,
    "먺먻먽먾먿멁멃멄멅멆"
  ],
  [
    "9141",
    "멇멊멌멏멐멑멒멖멗멙멚멛멝",
    6,
    "멦멪",
    5
  ],
  [
    "9161",
    "멲멳멵멶멷멹",
    9,
    "몆몈몉몊몋몍",
    5
  ],
  [
    "9181",
    "몓",
    20,
    "몪몭몮몯몱몳",
    4,
    "몺몼몾",
    5,
    "뫅뫆뫇뫉",
    14,
    "뫚",
    33,
    "뫽뫾뫿묁묂묃묅",
    7,
    "묎묐묒",
    5,
    "묙묚묛묝묞묟묡",
    6
  ],
  [
    "9241",
    "묨묪묬",
    7,
    "묷묹묺묿",
    4,
    "뭆뭈뭊뭋뭌뭎뭑뭒"
  ],
  [
    "9261",
    "뭓뭕뭖뭗뭙",
    7,
    "뭢뭤",
    7,
    "뭭",
    4
  ],
  [
    "9281",
    "뭲",
    21,
    "뮉뮊뮋뮍뮎뮏뮑",
    18,
    "뮥뮦뮧뮩뮪뮫뮭",
    6,
    "뮵뮶뮸",
    7,
    "믁믂믃믅믆믇믉",
    6,
    "믑믒믔",
    35,
    "믺믻믽믾밁"
  ],
  [
    "9341",
    "밃",
    4,
    "밊밎밐밒밓밙밚밠밡밢밣밦밨밪밫밬밮밯밲밳밵"
  ],
  [
    "9361",
    "밶밷밹",
    6,
    "뱂뱆뱇뱈뱊뱋뱎뱏뱑",
    8
  ],
  [
    "9381",
    "뱚뱛뱜뱞",
    37,
    "벆벇벉벊벍벏",
    4,
    "벖벘벛",
    4,
    "벢벣벥벦벩",
    6,
    "벲벶",
    5,
    "벾벿볁볂볃볅",
    7,
    "볎볒볓볔볖볗볙볚볛볝",
    22,
    "볷볹볺볻볽"
  ],
  [
    "9441",
    "볾",
    5,
    "봆봈봊",
    5,
    "봑봒봓봕",
    8
  ],
  [
    "9461",
    "봞",
    5,
    "봥",
    6,
    "봭",
    12
  ],
  [
    "9481",
    "봺",
    5,
    "뵁",
    6,
    "뵊뵋뵍뵎뵏뵑",
    6,
    "뵚",
    9,
    "뵥뵦뵧뵩",
    22,
    "붂붃붅붆붋",
    4,
    "붒붔붖붗붘붛붝",
    6,
    "붥",
    10,
    "붱",
    6,
    "붹",
    24
  ],
  [
    "9541",
    "뷒뷓뷖뷗뷙뷚뷛뷝",
    11,
    "뷪",
    5,
    "뷱"
  ],
  [
    "9561",
    "뷲뷳뷵뷶뷷뷹",
    6,
    "븁븂븄븆",
    5,
    "븎븏븑븒븓"
  ],
  [
    "9581",
    "븕",
    6,
    "븞븠",
    35,
    "빆빇빉빊빋빍빏",
    4,
    "빖빘빜빝빞빟빢빣빥빦빧빩빫",
    4,
    "빲빶",
    4,
    "빾빿뺁뺂뺃뺅",
    6,
    "뺎뺒",
    5,
    "뺚",
    13,
    "뺩",
    14
  ],
  [
    "9641",
    "뺸",
    23,
    "뻒뻓"
  ],
  [
    "9661",
    "뻕뻖뻙",
    6,
    "뻡뻢뻦",
    5,
    "뻭",
    8
  ],
  [
    "9681",
    "뻶",
    10,
    "뼂",
    5,
    "뼊",
    13,
    "뼚뼞",
    33,
    "뽂뽃뽅뽆뽇뽉",
    6,
    "뽒뽓뽔뽖",
    44
  ],
  [
    "9741",
    "뾃",
    16,
    "뾕",
    8
  ],
  [
    "9761",
    "뾞",
    17,
    "뾱",
    7
  ],
  [
    "9781",
    "뾹",
    11,
    "뿆",
    5,
    "뿎뿏뿑뿒뿓뿕",
    6,
    "뿝뿞뿠뿢",
    89,
    "쀽쀾쀿"
  ],
  [
    "9841",
    "쁀",
    16,
    "쁒",
    5,
    "쁙쁚쁛"
  ],
  [
    "9861",
    "쁝쁞쁟쁡",
    6,
    "쁪",
    15
  ],
  [
    "9881",
    "쁺",
    21,
    "삒삓삕삖삗삙",
    6,
    "삢삤삦",
    5,
    "삮삱삲삷",
    4,
    "삾샂샃샄샆샇샊샋샍샎샏샑",
    6,
    "샚샞",
    5,
    "샦샧샩샪샫샭",
    6,
    "샶샸샺",
    5,
    "섁섂섃섅섆섇섉",
    6,
    "섑섒섓섔섖",
    5,
    "섡섢섥섨섩섪섫섮"
  ],
  [
    "9941",
    "섲섳섴섵섷섺섻섽섾섿셁",
    6,
    "셊셎",
    5,
    "셖셗"
  ],
  [
    "9961",
    "셙셚셛셝",
    6,
    "셦셪",
    5,
    "셱셲셳셵셶셷셹셺셻"
  ],
  [
    "9981",
    "셼",
    8,
    "솆",
    5,
    "솏솑솒솓솕솗",
    4,
    "솞솠솢솣솤솦솧솪솫솭솮솯솱",
    11,
    "솾",
    5,
    "쇅쇆쇇쇉쇊쇋쇍",
    6,
    "쇕쇖쇙",
    6,
    "쇡쇢쇣쇥쇦쇧쇩",
    6,
    "쇲쇴",
    7,
    "쇾쇿숁숂숃숅",
    6,
    "숎숐숒",
    5,
    "숚숛숝숞숡숢숣"
  ],
  [
    "9a41",
    "숤숥숦숧숪숬숮숰숳숵",
    16
  ],
  [
    "9a61",
    "쉆쉇쉉",
    6,
    "쉒쉓쉕쉖쉗쉙",
    6,
    "쉡쉢쉣쉤쉦"
  ],
  [
    "9a81",
    "쉧",
    4,
    "쉮쉯쉱쉲쉳쉵",
    6,
    "쉾슀슂",
    5,
    "슊",
    5,
    "슑",
    6,
    "슙슚슜슞",
    5,
    "슦슧슩슪슫슮",
    5,
    "슶슸슺",
    33,
    "싞싟싡싢싥",
    5,
    "싮싰싲싳싴싵싷싺싽싾싿쌁",
    6,
    "쌊쌋쌎쌏"
  ],
  [
    "9b41",
    "쌐쌑쌒쌖쌗쌙쌚쌛쌝",
    6,
    "쌦쌧쌪",
    8
  ],
  [
    "9b61",
    "쌳",
    17,
    "썆",
    7
  ],
  [
    "9b81",
    "썎",
    25,
    "썪썫썭썮썯썱썳",
    4,
    "썺썻썾",
    5,
    "쎅쎆쎇쎉쎊쎋쎍",
    50,
    "쏁",
    22,
    "쏚"
  ],
  [
    "9c41",
    "쏛쏝쏞쏡쏣",
    4,
    "쏪쏫쏬쏮",
    5,
    "쏶쏷쏹",
    5
  ],
  [
    "9c61",
    "쏿",
    8,
    "쐉",
    6,
    "쐑",
    9
  ],
  [
    "9c81",
    "쐛",
    8,
    "쐥",
    6,
    "쐭쐮쐯쐱쐲쐳쐵",
    6,
    "쐾",
    9,
    "쑉",
    26,
    "쑦쑧쑩쑪쑫쑭",
    6,
    "쑶쑷쑸쑺",
    5,
    "쒁",
    18,
    "쒕",
    6,
    "쒝",
    12
  ],
  [
    "9d41",
    "쒪",
    13,
    "쒹쒺쒻쒽",
    8
  ],
  [
    "9d61",
    "쓆",
    25
  ],
  [
    "9d81",
    "쓠",
    8,
    "쓪",
    5,
    "쓲쓳쓵쓶쓷쓹쓻쓼쓽쓾씂",
    9,
    "씍씎씏씑씒씓씕",
    6,
    "씝",
    10,
    "씪씫씭씮씯씱",
    6,
    "씺씼씾",
    5,
    "앆앇앋앏앐앑앒앖앚앛앜앟앢앣앥앦앧앩",
    6,
    "앲앶",
    5,
    "앾앿얁얂얃얅얆얈얉얊얋얎얐얒얓얔"
  ],
  [
    "9e41",
    "얖얙얚얛얝얞얟얡",
    7,
    "얪",
    9,
    "얶"
  ],
  [
    "9e61",
    "얷얺얿",
    4,
    "엋엍엏엒엓엕엖엗엙",
    6,
    "엢엤엦엧"
  ],
  [
    "9e81",
    "엨엩엪엫엯엱엲엳엵엸엹엺엻옂옃옄옉옊옋옍옎옏옑",
    6,
    "옚옝",
    6,
    "옦옧옩옪옫옯옱옲옶옸옺옼옽옾옿왂왃왅왆왇왉",
    6,
    "왒왖",
    5,
    "왞왟왡",
    10,
    "왭왮왰왲",
    5,
    "왺왻왽왾왿욁",
    6,
    "욊욌욎",
    5,
    "욖욗욙욚욛욝",
    6,
    "욦"
  ],
  [
    "9f41",
    "욨욪",
    5,
    "욲욳욵욶욷욻",
    4,
    "웂웄웆",
    5,
    "웎"
  ],
  [
    "9f61",
    "웏웑웒웓웕",
    6,
    "웞웟웢",
    5,
    "웪웫웭웮웯웱웲"
  ],
  [
    "9f81",
    "웳",
    4,
    "웺웻웼웾",
    5,
    "윆윇윉윊윋윍",
    6,
    "윖윘윚",
    5,
    "윢윣윥윦윧윩",
    6,
    "윲윴윶윸윹윺윻윾윿읁읂읃읅",
    4,
    "읋읎읐읙읚읛읝읞읟읡",
    6,
    "읩읪읬",
    7,
    "읶읷읹읺읻읿잀잁잂잆잋잌잍잏잒잓잕잙잛",
    4,
    "잢잧",
    4,
    "잮잯잱잲잳잵잶잷"
  ],
  [
    "a041",
    "잸잹잺잻잾쟂",
    5,
    "쟊쟋쟍쟏쟑",
    6,
    "쟙쟚쟛쟜"
  ],
  [
    "a061",
    "쟞",
    5,
    "쟥쟦쟧쟩쟪쟫쟭",
    13
  ],
  [
    "a081",
    "쟻",
    4,
    "젂젃젅젆젇젉젋",
    4,
    "젒젔젗",
    4,
    "젞젟젡젢젣젥",
    6,
    "젮젰젲",
    5,
    "젹젺젻젽젾젿졁",
    6,
    "졊졋졎",
    5,
    "졕",
    26,
    "졲졳졵졶졷졹졻",
    4,
    "좂좄좈좉좊좎",
    5,
    "좕",
    7,
    "좞좠좢좣좤"
  ],
  [
    "a141",
    "좥좦좧좩",
    18,
    "좾좿죀죁"
  ],
  [
    "a161",
    "죂죃죅죆죇죉죊죋죍",
    6,
    "죖죘죚",
    5,
    "죢죣죥"
  ],
  [
    "a181",
    "죦",
    14,
    "죶",
    5,
    "죾죿줁줂줃줇",
    4,
    "줎　、。·‥…¨〃­―∥＼∼‘’“”〔〕〈",
    9,
    "±×÷≠≤≥∞∴°′″℃Å￠￡￥♂♀∠⊥⌒∂∇≡≒§※☆★○●◎◇◆□■△▲▽▼→←↑↓↔〓≪≫√∽∝∵∫∬∈∋⊆⊇⊂⊃∪∩∧∨￢"
  ],
  [
    "a241",
    "줐줒",
    5,
    "줙",
    18
  ],
  [
    "a261",
    "줭",
    6,
    "줵",
    18
  ],
  [
    "a281",
    "쥈",
    7,
    "쥒쥓쥕쥖쥗쥙",
    6,
    "쥢쥤",
    7,
    "쥭쥮쥯⇒⇔∀∃´～ˇ˘˝˚˙¸˛¡¿ː∮∑∏¤℉‰◁◀▷▶♤♠♡♥♧♣⊙◈▣◐◑▒▤▥▨▧▦▩♨☏☎☜☞¶†‡↕↗↙↖↘♭♩♪♬㉿㈜№㏇™㏂㏘℡€®"
  ],
  [
    "a341",
    "쥱쥲쥳쥵",
    6,
    "쥽",
    10,
    "즊즋즍즎즏"
  ],
  [
    "a361",
    "즑",
    6,
    "즚즜즞",
    16
  ],
  [
    "a381",
    "즯",
    16,
    "짂짃짅짆짉짋",
    4,
    "짒짔짗짘짛！",
    58,
    "￦］",
    32,
    "￣"
  ],
  [
    "a441",
    "짞짟짡짣짥짦짨짩짪짫짮짲",
    5,
    "짺짻짽짾짿쨁쨂쨃쨄"
  ],
  [
    "a461",
    "쨅쨆쨇쨊쨎",
    5,
    "쨕쨖쨗쨙",
    12
  ],
  [
    "a481",
    "쨦쨧쨨쨪",
    28,
    "ㄱ",
    93
  ],
  [
    "a541",
    "쩇",
    4,
    "쩎쩏쩑쩒쩓쩕",
    6,
    "쩞쩢",
    5,
    "쩩쩪"
  ],
  [
    "a561",
    "쩫",
    17,
    "쩾",
    5,
    "쪅쪆"
  ],
  [
    "a581",
    "쪇",
    16,
    "쪙",
    14,
    "ⅰ",
    9
  ],
  [
    "a5b0",
    "Ⅰ",
    9
  ],
  [
    "a5c1",
    "Α",
    16,
    "Σ",
    6
  ],
  [
    "a5e1",
    "α",
    16,
    "σ",
    6
  ],
  [
    "a641",
    "쪨",
    19,
    "쪾쪿쫁쫂쫃쫅"
  ],
  [
    "a661",
    "쫆",
    5,
    "쫎쫐쫒쫔쫕쫖쫗쫚",
    5,
    "쫡",
    6
  ],
  [
    "a681",
    "쫨쫩쫪쫫쫭",
    6,
    "쫵",
    18,
    "쬉쬊─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂┒┑┚┙┖┕┎┍┞┟┡┢┦┧┩┪┭┮┱┲┵┶┹┺┽┾╀╁╃",
    7
  ],
  [
    "a741",
    "쬋",
    4,
    "쬑쬒쬓쬕쬖쬗쬙",
    6,
    "쬢",
    7
  ],
  [
    "a761",
    "쬪",
    22,
    "쭂쭃쭄"
  ],
  [
    "a781",
    "쭅쭆쭇쭊쭋쭍쭎쭏쭑",
    6,
    "쭚쭛쭜쭞",
    5,
    "쭥",
    7,
    "㎕㎖㎗ℓ㎘㏄㎣㎤㎥㎦㎙",
    9,
    "㏊㎍㎎㎏㏏㎈㎉㏈㎧㎨㎰",
    9,
    "㎀",
    4,
    "㎺",
    5,
    "㎐",
    4,
    "Ω㏀㏁㎊㎋㎌㏖㏅㎭㎮㎯㏛㎩㎪㎫㎬㏝㏐㏓㏃㏉㏜㏆"
  ],
  [
    "a841",
    "쭭",
    10,
    "쭺",
    14
  ],
  [
    "a861",
    "쮉",
    18,
    "쮝",
    6
  ],
  [
    "a881",
    "쮤",
    19,
    "쮹",
    11,
    "ÆÐªĦ"
  ],
  [
    "a8a6",
    "Ĳ"
  ],
  [
    "a8a8",
    "ĿŁØŒºÞŦŊ"
  ],
  [
    "a8b1",
    "㉠",
    27,
    "ⓐ",
    25,
    "①",
    14,
    "½⅓⅔¼¾⅛⅜⅝⅞"
  ],
  [
    "a941",
    "쯅",
    14,
    "쯕",
    10
  ],
  [
    "a961",
    "쯠쯡쯢쯣쯥쯦쯨쯪",
    18
  ],
  [
    "a981",
    "쯽",
    14,
    "찎찏찑찒찓찕",
    6,
    "찞찟찠찣찤æđðħıĳĸŀłøœßþŧŋŉ㈀",
    27,
    "⒜",
    25,
    "⑴",
    14,
    "¹²³⁴ⁿ₁₂₃₄"
  ],
  [
    "aa41",
    "찥찦찪찫찭찯찱",
    6,
    "찺찿",
    4,
    "챆챇챉챊챋챍챎"
  ],
  [
    "aa61",
    "챏",
    4,
    "챖챚",
    5,
    "챡챢챣챥챧챩",
    6,
    "챱챲"
  ],
  [
    "aa81",
    "챳챴챶",
    29,
    "ぁ",
    82
  ],
  [
    "ab41",
    "첔첕첖첗첚첛첝첞첟첡",
    6,
    "첪첮",
    5,
    "첶첷첹"
  ],
  [
    "ab61",
    "첺첻첽",
    6,
    "쳆쳈쳊",
    5,
    "쳑쳒쳓쳕",
    5
  ],
  [
    "ab81",
    "쳛",
    8,
    "쳥",
    6,
    "쳭쳮쳯쳱",
    12,
    "ァ",
    85
  ],
  [
    "ac41",
    "쳾쳿촀촂",
    5,
    "촊촋촍촎촏촑",
    6,
    "촚촜촞촟촠"
  ],
  [
    "ac61",
    "촡촢촣촥촦촧촩촪촫촭",
    11,
    "촺",
    4
  ],
  [
    "ac81",
    "촿",
    28,
    "쵝쵞쵟А",
    5,
    "ЁЖ",
    25
  ],
  [
    "acd1",
    "а",
    5,
    "ёж",
    25
  ],
  [
    "ad41",
    "쵡쵢쵣쵥",
    6,
    "쵮쵰쵲",
    5,
    "쵹",
    7
  ],
  [
    "ad61",
    "춁",
    6,
    "춉",
    10,
    "춖춗춙춚춛춝춞춟"
  ],
  [
    "ad81",
    "춠춡춢춣춦춨춪",
    5,
    "춱",
    18,
    "췅"
  ],
  [
    "ae41",
    "췆",
    5,
    "췍췎췏췑",
    16
  ],
  [
    "ae61",
    "췢",
    5,
    "췩췪췫췭췮췯췱",
    6,
    "췺췼췾",
    4
  ],
  [
    "ae81",
    "츃츅츆츇츉츊츋츍",
    6,
    "츕츖츗츘츚",
    5,
    "츢츣츥츦츧츩츪츫"
  ],
  [
    "af41",
    "츬츭츮츯츲츴츶",
    19
  ],
  [
    "af61",
    "칊",
    13,
    "칚칛칝칞칢",
    5,
    "칪칬"
  ],
  [
    "af81",
    "칮",
    5,
    "칶칷칹칺칻칽",
    6,
    "캆캈캊",
    5,
    "캒캓캕캖캗캙"
  ],
  [
    "b041",
    "캚",
    5,
    "캢캦",
    5,
    "캮",
    12
  ],
  [
    "b061",
    "캻",
    5,
    "컂",
    19
  ],
  [
    "b081",
    "컖",
    13,
    "컦컧컩컪컭",
    6,
    "컶컺",
    5,
    "가각간갇갈갉갊감",
    7,
    "같",
    4,
    "갠갤갬갭갯갰갱갸갹갼걀걋걍걔걘걜거걱건걷걸걺검겁것겄겅겆겉겊겋게겐겔겜겝겟겠겡겨격겪견겯결겸겹겻겼경곁계곈곌곕곗고곡곤곧골곪곬곯곰곱곳공곶과곽관괄괆"
  ],
  [
    "b141",
    "켂켃켅켆켇켉",
    6,
    "켒켔켖",
    5,
    "켝켞켟켡켢켣"
  ],
  [
    "b161",
    "켥",
    6,
    "켮켲",
    5,
    "켹",
    11
  ],
  [
    "b181",
    "콅",
    14,
    "콖콗콙콚콛콝",
    6,
    "콦콨콪콫콬괌괍괏광괘괜괠괩괬괭괴괵괸괼굄굅굇굉교굔굘굡굣구국군굳굴굵굶굻굼굽굿궁궂궈궉권궐궜궝궤궷귀귁귄귈귐귑귓규균귤그극근귿글긁금급긋긍긔기긱긴긷길긺김깁깃깅깆깊까깍깎깐깔깖깜깝깟깠깡깥깨깩깬깰깸"
  ],
  [
    "b241",
    "콭콮콯콲콳콵콶콷콹",
    6,
    "쾁쾂쾃쾄쾆",
    5,
    "쾍"
  ],
  [
    "b261",
    "쾎",
    18,
    "쾢",
    5,
    "쾩"
  ],
  [
    "b281",
    "쾪",
    5,
    "쾱",
    18,
    "쿅",
    6,
    "깹깻깼깽꺄꺅꺌꺼꺽꺾껀껄껌껍껏껐껑께껙껜껨껫껭껴껸껼꼇꼈꼍꼐꼬꼭꼰꼲꼴꼼꼽꼿꽁꽂꽃꽈꽉꽐꽜꽝꽤꽥꽹꾀꾄꾈꾐꾑꾕꾜꾸꾹꾼꿀꿇꿈꿉꿋꿍꿎꿔꿜꿨꿩꿰꿱꿴꿸뀀뀁뀄뀌뀐뀔뀜뀝뀨끄끅끈끊끌끎끓끔끕끗끙"
  ],
  [
    "b341",
    "쿌",
    19,
    "쿢쿣쿥쿦쿧쿩"
  ],
  [
    "b361",
    "쿪",
    5,
    "쿲쿴쿶",
    5,
    "쿽쿾쿿퀁퀂퀃퀅",
    5
  ],
  [
    "b381",
    "퀋",
    5,
    "퀒",
    5,
    "퀙",
    19,
    "끝끼끽낀낄낌낍낏낑나낙낚난낟날낡낢남납낫",
    4,
    "낱낳내낵낸낼냄냅냇냈냉냐냑냔냘냠냥너넉넋넌널넒넓넘넙넛넜넝넣네넥넨넬넴넵넷넸넹녀녁년녈념녑녔녕녘녜녠노녹논놀놂놈놉놋농높놓놔놘놜놨뇌뇐뇔뇜뇝"
  ],
  [
    "b441",
    "퀮",
    5,
    "퀶퀷퀹퀺퀻퀽",
    6,
    "큆큈큊",
    5
  ],
  [
    "b461",
    "큑큒큓큕큖큗큙",
    6,
    "큡",
    10,
    "큮큯"
  ],
  [
    "b481",
    "큱큲큳큵",
    6,
    "큾큿킀킂",
    18,
    "뇟뇨뇩뇬뇰뇹뇻뇽누눅눈눋눌눔눕눗눙눠눴눼뉘뉜뉠뉨뉩뉴뉵뉼늄늅늉느늑는늘늙늚늠늡늣능늦늪늬늰늴니닉닌닐닒님닙닛닝닢다닥닦단닫",
    4,
    "닳담답닷",
    4,
    "닿대댁댄댈댐댑댓댔댕댜더덕덖던덛덜덞덟덤덥"
  ],
  [
    "b541",
    "킕",
    14,
    "킦킧킩킪킫킭",
    5
  ],
  [
    "b561",
    "킳킶킸킺",
    5,
    "탂탃탅탆탇탊",
    5,
    "탒탖",
    4
  ],
  [
    "b581",
    "탛탞탟탡탢탣탥",
    6,
    "탮탲",
    5,
    "탹",
    11,
    "덧덩덫덮데덱덴델뎀뎁뎃뎄뎅뎌뎐뎔뎠뎡뎨뎬도독돈돋돌돎돐돔돕돗동돛돝돠돤돨돼됐되된될됨됩됫됴두둑둔둘둠둡둣둥둬뒀뒈뒝뒤뒨뒬뒵뒷뒹듀듄듈듐듕드득든듣들듦듬듭듯등듸디딕딘딛딜딤딥딧딨딩딪따딱딴딸"
  ],
  [
    "b641",
    "턅",
    7,
    "턎",
    17
  ],
  [
    "b661",
    "턠",
    15,
    "턲턳턵턶턷턹턻턼턽턾"
  ],
  [
    "b681",
    "턿텂텆",
    5,
    "텎텏텑텒텓텕",
    6,
    "텞텠텢",
    5,
    "텩텪텫텭땀땁땃땄땅땋때땍땐땔땜땝땟땠땡떠떡떤떨떪떫떰떱떳떴떵떻떼떽뗀뗄뗌뗍뗏뗐뗑뗘뗬또똑똔똘똥똬똴뙈뙤뙨뚜뚝뚠뚤뚫뚬뚱뛔뛰뛴뛸뜀뜁뜅뜨뜩뜬뜯뜰뜸뜹뜻띄띈띌띔띕띠띤띨띰띱띳띵라락란랄람랍랏랐랑랒랖랗"
  ],
  [
    "b741",
    "텮",
    13,
    "텽",
    6,
    "톅톆톇톉톊"
  ],
  [
    "b761",
    "톋",
    20,
    "톢톣톥톦톧"
  ],
  [
    "b781",
    "톩",
    6,
    "톲톴톶톷톸톹톻톽톾톿퇁",
    14,
    "래랙랜랠램랩랫랬랭랴략랸럇량러럭런럴럼럽럿렀렁렇레렉렌렐렘렙렛렝려력련렬렴렵렷렸령례롄롑롓로록론롤롬롭롯롱롸롼뢍뢨뢰뢴뢸룀룁룃룅료룐룔룝룟룡루룩룬룰룸룹룻룽뤄뤘뤠뤼뤽륀륄륌륏륑류륙륜률륨륩"
  ],
  [
    "b841",
    "퇐",
    7,
    "퇙",
    17
  ],
  [
    "b861",
    "퇫",
    8,
    "퇵퇶퇷퇹",
    13
  ],
  [
    "b881",
    "툈툊",
    5,
    "툑",
    24,
    "륫륭르륵른를름릅릇릉릊릍릎리릭린릴림립릿링마막만많",
    4,
    "맘맙맛망맞맡맣매맥맨맬맴맵맷맸맹맺먀먁먈먕머먹먼멀멂멈멉멋멍멎멓메멕멘멜멤멥멧멨멩며멱면멸몃몄명몇몌모목몫몬몰몲몸몹못몽뫄뫈뫘뫙뫼"
  ],
  [
    "b941",
    "툪툫툮툯툱툲툳툵",
    6,
    "툾퉀퉂",
    5,
    "퉉퉊퉋퉌"
  ],
  [
    "b961",
    "퉍",
    14,
    "퉝",
    6,
    "퉥퉦퉧퉨"
  ],
  [
    "b981",
    "퉩",
    22,
    "튂튃튅튆튇튉튊튋튌묀묄묍묏묑묘묜묠묩묫무묵묶문묻물묽묾뭄뭅뭇뭉뭍뭏뭐뭔뭘뭡뭣뭬뮈뮌뮐뮤뮨뮬뮴뮷므믄믈믐믓미믹민믿밀밂밈밉밋밌밍및밑바",
    4,
    "받",
    4,
    "밤밥밧방밭배백밴밸뱀뱁뱃뱄뱅뱉뱌뱍뱐뱝버벅번벋벌벎범법벗"
  ],
  [
    "ba41",
    "튍튎튏튒튓튔튖",
    5,
    "튝튞튟튡튢튣튥",
    6,
    "튭"
  ],
  [
    "ba61",
    "튮튯튰튲",
    5,
    "튺튻튽튾틁틃",
    4,
    "틊틌",
    5
  ],
  [
    "ba81",
    "틒틓틕틖틗틙틚틛틝",
    6,
    "틦",
    9,
    "틲틳틵틶틷틹틺벙벚베벡벤벧벨벰벱벳벴벵벼벽변별볍볏볐병볕볘볜보복볶본볼봄봅봇봉봐봔봤봬뵀뵈뵉뵌뵐뵘뵙뵤뵨부북분붇불붉붊붐붑붓붕붙붚붜붤붰붸뷔뷕뷘뷜뷩뷰뷴뷸븀븃븅브븍븐블븜븝븟비빅빈빌빎빔빕빗빙빚빛빠빡빤"
  ],
  [
    "bb41",
    "틻",
    4,
    "팂팄팆",
    5,
    "팏팑팒팓팕팗",
    4,
    "팞팢팣"
  ],
  [
    "bb61",
    "팤팦팧팪팫팭팮팯팱",
    6,
    "팺팾",
    5,
    "퍆퍇퍈퍉"
  ],
  [
    "bb81",
    "퍊",
    31,
    "빨빪빰빱빳빴빵빻빼빽뺀뺄뺌뺍뺏뺐뺑뺘뺙뺨뻐뻑뻔뻗뻘뻠뻣뻤뻥뻬뼁뼈뼉뼘뼙뼛뼜뼝뽀뽁뽄뽈뽐뽑뽕뾔뾰뿅뿌뿍뿐뿔뿜뿟뿡쀼쁑쁘쁜쁠쁨쁩삐삑삔삘삠삡삣삥사삭삯산삳살삵삶삼삽삿샀상샅새색샌샐샘샙샛샜생샤"
  ],
  [
    "bc41",
    "퍪",
    17,
    "퍾퍿펁펂펃펅펆펇"
  ],
  [
    "bc61",
    "펈펉펊펋펎펒",
    5,
    "펚펛펝펞펟펡",
    6,
    "펪펬펮"
  ],
  [
    "bc81",
    "펯",
    4,
    "펵펶펷펹펺펻펽",
    6,
    "폆폇폊",
    5,
    "폑",
    5,
    "샥샨샬샴샵샷샹섀섄섈섐섕서",
    4,
    "섣설섦섧섬섭섯섰성섶세섹센셀셈셉셋셌셍셔셕션셜셤셥셧셨셩셰셴셸솅소속솎손솔솖솜솝솟송솥솨솩솬솰솽쇄쇈쇌쇔쇗쇘쇠쇤쇨쇰쇱쇳쇼쇽숀숄숌숍숏숑수숙순숟술숨숩숫숭"
  ],
  [
    "bd41",
    "폗폙",
    7,
    "폢폤",
    7,
    "폮폯폱폲폳폵폶폷"
  ],
  [
    "bd61",
    "폸폹폺폻폾퐀퐂",
    5,
    "퐉",
    13
  ],
  [
    "bd81",
    "퐗",
    5,
    "퐞",
    25,
    "숯숱숲숴쉈쉐쉑쉔쉘쉠쉥쉬쉭쉰쉴쉼쉽쉿슁슈슉슐슘슛슝스슥슨슬슭슴습슷승시식신싣실싫심십싯싱싶싸싹싻싼쌀쌈쌉쌌쌍쌓쌔쌕쌘쌜쌤쌥쌨쌩썅써썩썬썰썲썸썹썼썽쎄쎈쎌쏀쏘쏙쏜쏟쏠쏢쏨쏩쏭쏴쏵쏸쐈쐐쐤쐬쐰"
  ],
  [
    "be41",
    "퐸",
    7,
    "푁푂푃푅",
    14
  ],
  [
    "be61",
    "푔",
    7,
    "푝푞푟푡푢푣푥",
    7,
    "푮푰푱푲"
  ],
  [
    "be81",
    "푳",
    4,
    "푺푻푽푾풁풃",
    4,
    "풊풌풎",
    5,
    "풕",
    8,
    "쐴쐼쐽쑈쑤쑥쑨쑬쑴쑵쑹쒀쒔쒜쒸쒼쓩쓰쓱쓴쓸쓺쓿씀씁씌씐씔씜씨씩씬씰씸씹씻씽아악안앉않알앍앎앓암압앗았앙앝앞애액앤앨앰앱앳앴앵야약얀얄얇얌얍얏양얕얗얘얜얠얩어억언얹얻얼얽얾엄",
    6,
    "엌엎"
  ],
  [
    "bf41",
    "풞",
    10,
    "풪",
    14
  ],
  [
    "bf61",
    "풹",
    18,
    "퓍퓎퓏퓑퓒퓓퓕"
  ],
  [
    "bf81",
    "퓖",
    5,
    "퓝퓞퓠",
    7,
    "퓩퓪퓫퓭퓮퓯퓱",
    6,
    "퓹퓺퓼에엑엔엘엠엡엣엥여역엮연열엶엷염",
    5,
    "옅옆옇예옌옐옘옙옛옜오옥온올옭옮옰옳옴옵옷옹옻와왁완왈왐왑왓왔왕왜왝왠왬왯왱외왹왼욀욈욉욋욍요욕욘욜욤욥욧용우욱운울욹욺움웁웃웅워웍원월웜웝웠웡웨"
  ],
  [
    "c041",
    "퓾",
    5,
    "픅픆픇픉픊픋픍",
    6,
    "픖픘",
    5
  ],
  [
    "c061",
    "픞",
    25
  ],
  [
    "c081",
    "픸픹픺픻픾픿핁핂핃핅",
    6,
    "핎핐핒",
    5,
    "핚핛핝핞핟핡핢핣웩웬웰웸웹웽위윅윈윌윔윕윗윙유육윤율윰윱윳융윷으윽은을읊음읍읏응",
    7,
    "읜읠읨읫이익인일읽읾잃임입잇있잉잊잎자작잔잖잗잘잚잠잡잣잤장잦재잭잰잴잼잽잿쟀쟁쟈쟉쟌쟎쟐쟘쟝쟤쟨쟬저적전절젊"
  ],
  [
    "c141",
    "핤핦핧핪핬핮",
    5,
    "핶핷핹핺핻핽",
    6,
    "햆햊햋"
  ],
  [
    "c161",
    "햌햍햎햏햑",
    19,
    "햦햧"
  ],
  [
    "c181",
    "햨",
    31,
    "점접젓정젖제젝젠젤젬젭젯젱져젼졀졈졉졌졍졔조족존졸졺좀좁좃종좆좇좋좌좍좔좝좟좡좨좼좽죄죈죌죔죕죗죙죠죡죤죵주죽준줄줅줆줌줍줏중줘줬줴쥐쥑쥔쥘쥠쥡쥣쥬쥰쥴쥼즈즉즌즐즘즙즛증지직진짇질짊짐집짓"
  ],
  [
    "c241",
    "헊헋헍헎헏헑헓",
    4,
    "헚헜헞",
    5,
    "헦헧헩헪헫헭헮"
  ],
  [
    "c261",
    "헯",
    4,
    "헶헸헺",
    5,
    "혂혃혅혆혇혉",
    6,
    "혒"
  ],
  [
    "c281",
    "혖",
    5,
    "혝혞혟혡혢혣혥",
    7,
    "혮",
    9,
    "혺혻징짖짙짚짜짝짠짢짤짧짬짭짯짰짱째짹짼쨀쨈쨉쨋쨌쨍쨔쨘쨩쩌쩍쩐쩔쩜쩝쩟쩠쩡쩨쩽쪄쪘쪼쪽쫀쫄쫌쫍쫏쫑쫓쫘쫙쫠쫬쫴쬈쬐쬔쬘쬠쬡쭁쭈쭉쭌쭐쭘쭙쭝쭤쭸쭹쮜쮸쯔쯤쯧쯩찌찍찐찔찜찝찡찢찧차착찬찮찰참찹찻"
  ],
  [
    "c341",
    "혽혾혿홁홂홃홄홆홇홊홌홎홏홐홒홓홖홗홙홚홛홝",
    4
  ],
  [
    "c361",
    "홢",
    4,
    "홨홪",
    5,
    "홲홳홵",
    11
  ],
  [
    "c381",
    "횁횂횄횆",
    5,
    "횎횏횑횒횓횕",
    7,
    "횞횠횢",
    5,
    "횩횪찼창찾채책챈챌챔챕챗챘챙챠챤챦챨챰챵처척천철첨첩첫첬청체첵첸첼쳄쳅쳇쳉쳐쳔쳤쳬쳰촁초촉촌촐촘촙촛총촤촨촬촹최쵠쵤쵬쵭쵯쵱쵸춈추축춘출춤춥춧충춰췄췌췐취췬췰췸췹췻췽츄츈츌츔츙츠측츤츨츰츱츳층"
  ],
  [
    "c441",
    "횫횭횮횯횱",
    7,
    "횺횼",
    7,
    "훆훇훉훊훋"
  ],
  [
    "c461",
    "훍훎훏훐훒훓훕훖훘훚",
    5,
    "훡훢훣훥훦훧훩",
    4
  ],
  [
    "c481",
    "훮훯훱훲훳훴훶",
    5,
    "훾훿휁휂휃휅",
    11,
    "휒휓휔치칙친칟칠칡침칩칫칭카칵칸칼캄캅캇캉캐캑캔캘캠캡캣캤캥캬캭컁커컥컨컫컬컴컵컷컸컹케켁켄켈켐켑켓켕켜켠켤켬켭켯켰켱켸코콕콘콜콤콥콧콩콰콱콴콸쾀쾅쾌쾡쾨쾰쿄쿠쿡쿤쿨쿰쿱쿳쿵쿼퀀퀄퀑퀘퀭퀴퀵퀸퀼"
  ],
  [
    "c541",
    "휕휖휗휚휛휝휞휟휡",
    6,
    "휪휬휮",
    5,
    "휶휷휹"
  ],
  [
    "c561",
    "휺휻휽",
    6,
    "흅흆흈흊",
    5,
    "흒흓흕흚",
    4
  ],
  [
    "c581",
    "흟흢흤흦흧흨흪흫흭흮흯흱흲흳흵",
    6,
    "흾흿힀힂",
    5,
    "힊힋큄큅큇큉큐큔큘큠크큭큰클큼큽킁키킥킨킬킴킵킷킹타탁탄탈탉탐탑탓탔탕태택탠탤탬탭탯탰탱탸턍터턱턴털턺텀텁텃텄텅테텍텐텔템텝텟텡텨텬텼톄톈토톡톤톨톰톱톳통톺톼퇀퇘퇴퇸툇툉툐투툭툰툴툼툽툿퉁퉈퉜"
  ],
  [
    "c641",
    "힍힎힏힑",
    6,
    "힚힜힞",
    5
  ],
  [
    "c6a1",
    "퉤튀튁튄튈튐튑튕튜튠튤튬튱트특튼튿틀틂틈틉틋틔틘틜틤틥티틱틴틸팀팁팃팅파팍팎판팔팖팜팝팟팠팡팥패팩팬팰팸팹팻팼팽퍄퍅퍼퍽펀펄펌펍펏펐펑페펙펜펠펨펩펫펭펴편펼폄폅폈평폐폘폡폣포폭폰폴폼폽폿퐁"
  ],
  [
    "c7a1",
    "퐈퐝푀푄표푠푤푭푯푸푹푼푿풀풂품풉풋풍풔풩퓌퓐퓔퓜퓟퓨퓬퓰퓸퓻퓽프픈플픔픕픗피픽핀필핌핍핏핑하학한할핥함합핫항해핵핸핼햄햅햇했행햐향허헉헌헐헒험헙헛헝헤헥헨헬헴헵헷헹혀혁현혈혐협혓혔형혜혠"
  ],
  [
    "c8a1",
    "혤혭호혹혼홀홅홈홉홋홍홑화확환활홧황홰홱홴횃횅회획횐횔횝횟횡효횬횰횹횻후훅훈훌훑훔훗훙훠훤훨훰훵훼훽휀휄휑휘휙휜휠휨휩휫휭휴휵휸휼흄흇흉흐흑흔흖흗흘흙흠흡흣흥흩희흰흴흼흽힁히힉힌힐힘힙힛힝"
  ],
  [
    "caa1",
    "伽佳假價加可呵哥嘉嫁家暇架枷柯歌珂痂稼苛茄街袈訶賈跏軻迦駕刻却各恪慤殼珏脚覺角閣侃刊墾奸姦干幹懇揀杆柬桿澗癎看磵稈竿簡肝艮艱諫間乫喝曷渴碣竭葛褐蝎鞨勘坎堪嵌感憾戡敢柑橄減甘疳監瞰紺邯鑑鑒龕"
  ],
  [
    "cba1",
    "匣岬甲胛鉀閘剛堈姜岡崗康强彊慷江畺疆糠絳綱羌腔舡薑襁講鋼降鱇介价個凱塏愷愾慨改槪漑疥皆盖箇芥蓋豈鎧開喀客坑更粳羹醵倨去居巨拒据據擧渠炬祛距踞車遽鉅鋸乾件健巾建愆楗腱虔蹇鍵騫乞傑杰桀儉劍劒檢"
  ],
  [
    "cca1",
    "瞼鈐黔劫怯迲偈憩揭擊格檄激膈覡隔堅牽犬甄絹繭肩見譴遣鵑抉決潔結缺訣兼慊箝謙鉗鎌京俓倞傾儆勁勍卿坰境庚徑慶憬擎敬景暻更梗涇炅烱璟璥瓊痙硬磬竟競絅經耕耿脛莖警輕逕鏡頃頸驚鯨係啓堺契季屆悸戒桂械"
  ],
  [
    "cda1",
    "棨溪界癸磎稽系繫繼計誡谿階鷄古叩告呱固姑孤尻庫拷攷故敲暠枯槁沽痼皐睾稿羔考股膏苦苽菰藁蠱袴誥賈辜錮雇顧高鼓哭斛曲梏穀谷鵠困坤崑昆梱棍滾琨袞鯤汨滑骨供公共功孔工恐恭拱控攻珙空蚣貢鞏串寡戈果瓜"
  ],
  [
    "cea1",
    "科菓誇課跨過鍋顆廓槨藿郭串冠官寬慣棺款灌琯瓘管罐菅觀貫關館刮恝括适侊光匡壙廣曠洸炚狂珖筐胱鑛卦掛罫乖傀塊壞怪愧拐槐魁宏紘肱轟交僑咬喬嬌嶠巧攪敎校橋狡皎矯絞翹膠蕎蛟較轎郊餃驕鮫丘久九仇俱具勾"
  ],
  [
    "cfa1",
    "區口句咎嘔坵垢寇嶇廐懼拘救枸柩構歐毆毬求溝灸狗玖球瞿矩究絿耉臼舅舊苟衢謳購軀逑邱鉤銶駒驅鳩鷗龜國局菊鞠鞫麴君窘群裙軍郡堀屈掘窟宮弓穹窮芎躬倦券勸卷圈拳捲權淃眷厥獗蕨蹶闕机櫃潰詭軌饋句晷歸貴"
  ],
  [
    "d0a1",
    "鬼龜叫圭奎揆槻珪硅窺竅糾葵規赳逵閨勻均畇筠菌鈞龜橘克剋劇戟棘極隙僅劤勤懃斤根槿瑾筋芹菫覲謹近饉契今妗擒昑檎琴禁禽芩衾衿襟金錦伋及急扱汲級給亘兢矜肯企伎其冀嗜器圻基埼夔奇妓寄岐崎己幾忌技旗旣"
  ],
  [
    "d1a1",
    "朞期杞棋棄機欺氣汽沂淇玘琦琪璂璣畸畿碁磯祁祇祈祺箕紀綺羈耆耭肌記譏豈起錡錤飢饑騎騏驥麒緊佶吉拮桔金喫儺喇奈娜懦懶拏拿癩",
    5,
    "那樂",
    4,
    "諾酪駱亂卵暖欄煖爛蘭難鸞捏捺南嵐枏楠湳濫男藍襤拉"
  ],
  [
    "d2a1",
    "納臘蠟衲囊娘廊",
    4,
    "乃來內奈柰耐冷女年撚秊念恬拈捻寧寗努勞奴弩怒擄櫓爐瑙盧",
    5,
    "駑魯",
    10,
    "濃籠聾膿農惱牢磊腦賂雷尿壘",
    7,
    "嫩訥杻紐勒",
    5,
    "能菱陵尼泥匿溺多茶"
  ],
  [
    "d3a1",
    "丹亶但單團壇彖斷旦檀段湍短端簞緞蛋袒鄲鍛撻澾獺疸達啖坍憺擔曇淡湛潭澹痰聃膽蕁覃談譚錟沓畓答踏遝唐堂塘幢戇撞棠當糖螳黨代垈坮大對岱帶待戴擡玳臺袋貸隊黛宅德悳倒刀到圖堵塗導屠島嶋度徒悼挑掉搗桃"
  ],
  [
    "d4a1",
    "棹櫂淘渡滔濤燾盜睹禱稻萄覩賭跳蹈逃途道都鍍陶韜毒瀆牘犢獨督禿篤纛讀墩惇敦旽暾沌焞燉豚頓乭突仝冬凍動同憧東桐棟洞潼疼瞳童胴董銅兜斗杜枓痘竇荳讀豆逗頭屯臀芚遁遯鈍得嶝橙燈登等藤謄鄧騰喇懶拏癩羅"
  ],
  [
    "d5a1",
    "蘿螺裸邏樂洛烙珞絡落諾酪駱丹亂卵欄欒瀾爛蘭鸞剌辣嵐擥攬欖濫籃纜藍襤覽拉臘蠟廊朗浪狼琅瑯螂郞來崍徠萊冷掠略亮倆兩凉梁樑粮粱糧良諒輛量侶儷勵呂廬慮戾旅櫚濾礪藜蠣閭驢驪麗黎力曆歷瀝礫轢靂憐戀攣漣"
  ],
  [
    "d6a1",
    "煉璉練聯蓮輦連鍊冽列劣洌烈裂廉斂殮濂簾獵令伶囹寧岺嶺怜玲笭羚翎聆逞鈴零靈領齡例澧禮醴隷勞怒撈擄櫓潞瀘爐盧老蘆虜路輅露魯鷺鹵碌祿綠菉錄鹿麓論壟弄朧瀧瓏籠聾儡瀨牢磊賂賚賴雷了僚寮廖料燎療瞭聊蓼"
  ],
  [
    "d7a1",
    "遼鬧龍壘婁屢樓淚漏瘻累縷蔞褸鏤陋劉旒柳榴流溜瀏琉瑠留瘤硫謬類六戮陸侖倫崙淪綸輪律慄栗率隆勒肋凜凌楞稜綾菱陵俚利厘吏唎履悧李梨浬犁狸理璃異痢籬罹羸莉裏裡里釐離鯉吝潾燐璘藺躪隣鱗麟林淋琳臨霖砬"
  ],
  [
    "d8a1",
    "立笠粒摩瑪痲碼磨馬魔麻寞幕漠膜莫邈万卍娩巒彎慢挽晩曼滿漫灣瞞萬蔓蠻輓饅鰻唜抹末沫茉襪靺亡妄忘忙望網罔芒茫莽輞邙埋妹媒寐昧枚梅每煤罵買賣邁魅脈貊陌驀麥孟氓猛盲盟萌冪覓免冕勉棉沔眄眠綿緬面麵滅"
  ],
  [
    "d9a1",
    "蔑冥名命明暝椧溟皿瞑茗蓂螟酩銘鳴袂侮冒募姆帽慕摸摹暮某模母毛牟牡瑁眸矛耗芼茅謀謨貌木沐牧目睦穆鶩歿沒夢朦蒙卯墓妙廟描昴杳渺猫竗苗錨務巫憮懋戊拇撫无楙武毋無珷畝繆舞茂蕪誣貿霧鵡墨默們刎吻問文"
  ],
  [
    "daa1",
    "汶紊紋聞蚊門雯勿沕物味媚尾嵋彌微未梶楣渼湄眉米美薇謎迷靡黴岷悶愍憫敏旻旼民泯玟珉緡閔密蜜謐剝博拍搏撲朴樸泊珀璞箔粕縛膊舶薄迫雹駁伴半反叛拌搬攀斑槃泮潘班畔瘢盤盼磐磻礬絆般蟠返頒飯勃拔撥渤潑"
  ],
  [
    "dba1",
    "發跋醱鉢髮魃倣傍坊妨尨幇彷房放方旁昉枋榜滂磅紡肪膀舫芳蒡蚌訪謗邦防龐倍俳北培徘拜排杯湃焙盃背胚裴裵褙賠輩配陪伯佰帛柏栢白百魄幡樊煩燔番磻繁蕃藩飜伐筏罰閥凡帆梵氾汎泛犯範范法琺僻劈壁擘檗璧癖"
  ],
  [
    "dca1",
    "碧蘗闢霹便卞弁變辨辯邊別瞥鱉鼈丙倂兵屛幷昞昺柄棅炳甁病秉竝輧餠騈保堡報寶普步洑湺潽珤甫菩補褓譜輔伏僕匐卜宓復服福腹茯蔔複覆輹輻馥鰒本乶俸奉封峯峰捧棒烽熢琫縫蓬蜂逢鋒鳳不付俯傅剖副否咐埠夫婦"
  ],
  [
    "dda1",
    "孚孵富府復扶敷斧浮溥父符簿缶腐腑膚艀芙莩訃負賦賻赴趺部釜阜附駙鳧北分吩噴墳奔奮忿憤扮昐汾焚盆粉糞紛芬賁雰不佛弗彿拂崩朋棚硼繃鵬丕備匕匪卑妃婢庇悲憊扉批斐枇榧比毖毗毘沸泌琵痺砒碑秕秘粃緋翡肥"
  ],
  [
    "dea1",
    "脾臂菲蜚裨誹譬費鄙非飛鼻嚬嬪彬斌檳殯浜濱瀕牝玭貧賓頻憑氷聘騁乍事些仕伺似使俟僿史司唆嗣四士奢娑寫寺射巳師徙思捨斜斯柶査梭死沙泗渣瀉獅砂社祀祠私篩紗絲肆舍莎蓑蛇裟詐詞謝賜赦辭邪飼駟麝削數朔索"
  ],
  [
    "dfa1",
    "傘刪山散汕珊産疝算蒜酸霰乷撒殺煞薩三參杉森渗芟蔘衫揷澁鈒颯上傷像償商喪嘗孀尙峠常床庠廂想桑橡湘爽牀狀相祥箱翔裳觴詳象賞霜塞璽賽嗇塞穡索色牲生甥省笙墅壻嶼序庶徐恕抒捿敍暑曙書栖棲犀瑞筮絮緖署"
  ],
  [
    "e0a1",
    "胥舒薯西誓逝鋤黍鼠夕奭席惜昔晳析汐淅潟石碩蓆釋錫仙僊先善嬋宣扇敾旋渲煽琁瑄璇璿癬禪線繕羨腺膳船蘚蟬詵跣選銑鐥饍鮮卨屑楔泄洩渫舌薛褻設說雪齧剡暹殲纖蟾贍閃陝攝涉燮葉城姓宬性惺成星晟猩珹盛省筬"
  ],
  [
    "e1a1",
    "聖聲腥誠醒世勢歲洗稅笹細說貰召嘯塑宵小少巢所掃搔昭梳沼消溯瀟炤燒甦疏疎瘙笑篠簫素紹蔬蕭蘇訴逍遡邵銷韶騷俗屬束涑粟續謖贖速孫巽損蓀遜飡率宋悚松淞訟誦送頌刷殺灑碎鎖衰釗修受嗽囚垂壽嫂守岫峀帥愁"
  ],
  [
    "e2a1",
    "戍手授搜收數樹殊水洙漱燧狩獸琇璲瘦睡秀穗竪粹綏綬繡羞脩茱蒐蓚藪袖誰讐輸遂邃酬銖銹隋隧隨雖需須首髓鬚叔塾夙孰宿淑潚熟琡璹肅菽巡徇循恂旬栒楯橓殉洵淳珣盾瞬筍純脣舜荀蓴蕣詢諄醇錞順馴戌術述鉥崇崧"
  ],
  [
    "e3a1",
    "嵩瑟膝蝨濕拾習褶襲丞乘僧勝升承昇繩蠅陞侍匙嘶始媤尸屎屍市弑恃施是時枾柴猜矢示翅蒔蓍視試詩諡豕豺埴寔式息拭植殖湜熄篒蝕識軾食飾伸侁信呻娠宸愼新晨燼申神紳腎臣莘薪藎蜃訊身辛辰迅失室實悉審尋心沁"
  ],
  [
    "e4a1",
    "沈深瀋甚芯諶什十拾雙氏亞俄兒啞娥峨我牙芽莪蛾衙訝阿雅餓鴉鵝堊岳嶽幄惡愕握樂渥鄂鍔顎鰐齷安岸按晏案眼雁鞍顔鮟斡謁軋閼唵岩巖庵暗癌菴闇壓押狎鴨仰央怏昻殃秧鴦厓哀埃崖愛曖涯碍艾隘靄厄扼掖液縊腋額"
  ],
  [
    "e5a1",
    "櫻罌鶯鸚也倻冶夜惹揶椰爺耶若野弱掠略約若葯蒻藥躍亮佯兩凉壤孃恙揚攘敭暘梁楊樣洋瀁煬痒瘍禳穰糧羊良襄諒讓釀陽量養圄御於漁瘀禦語馭魚齬億憶抑檍臆偃堰彦焉言諺孼蘖俺儼嚴奄掩淹嶪業円予余勵呂女如廬"
  ],
  [
    "e6a1",
    "旅歟汝濾璵礖礪與艅茹輿轝閭餘驪麗黎亦力域役易曆歷疫繹譯轢逆驛嚥堧姸娟宴年延憐戀捐挻撚椽沇沿涎涓淵演漣烟然煙煉燃燕璉硏硯秊筵緣練縯聯衍軟輦蓮連鉛鍊鳶列劣咽悅涅烈熱裂說閱厭廉念捻染殮炎焰琰艶苒"
  ],
  [
    "e7a1",
    "簾閻髥鹽曄獵燁葉令囹塋寧嶺嶸影怜映暎楹榮永泳渶潁濚瀛瀯煐營獰玲瑛瑩瓔盈穎纓羚聆英詠迎鈴鍈零霙靈領乂倪例刈叡曳汭濊猊睿穢芮藝蘂禮裔詣譽豫醴銳隸霓預五伍俉傲午吾吳嗚塢墺奧娛寤悟惡懊敖旿晤梧汚澳"
  ],
  [
    "e8a1",
    "烏熬獒筽蜈誤鰲鼇屋沃獄玉鈺溫瑥瘟穩縕蘊兀壅擁瓮甕癰翁邕雍饔渦瓦窩窪臥蛙蝸訛婉完宛梡椀浣玩琓琬碗緩翫脘腕莞豌阮頑曰往旺枉汪王倭娃歪矮外嵬巍猥畏了僚僥凹堯夭妖姚寥寮尿嶢拗搖撓擾料曜樂橈燎燿瑤療"
  ],
  [
    "e9a1",
    "窈窯繇繞耀腰蓼蟯要謠遙遼邀饒慾欲浴縟褥辱俑傭冗勇埇墉容庸慂榕涌湧溶熔瑢用甬聳茸蓉踊鎔鏞龍于佑偶優又友右宇寓尤愚憂旴牛玗瑀盂祐禑禹紆羽芋藕虞迂遇郵釪隅雨雩勖彧旭昱栯煜稶郁頊云暈橒殞澐熉耘芸蕓"
  ],
  [
    "eaa1",
    "運隕雲韻蔚鬱亐熊雄元原員圓園垣媛嫄寃怨愿援沅洹湲源爰猿瑗苑袁轅遠阮院願鴛月越鉞位偉僞危圍委威尉慰暐渭爲瑋緯胃萎葦蔿蝟衛褘謂違韋魏乳侑儒兪劉唯喩孺宥幼幽庾悠惟愈愉揄攸有杻柔柚柳楡楢油洧流游溜"
  ],
  [
    "eba1",
    "濡猶猷琉瑜由留癒硫紐維臾萸裕誘諛諭踰蹂遊逾遺酉釉鍮類六堉戮毓肉育陸倫允奫尹崙淪潤玧胤贇輪鈗閏律慄栗率聿戎瀜絨融隆垠恩慇殷誾銀隱乙吟淫蔭陰音飮揖泣邑凝應膺鷹依倚儀宜意懿擬椅毅疑矣義艤薏蟻衣誼"
  ],
  [
    "eca1",
    "議醫二以伊利吏夷姨履已弛彛怡易李梨泥爾珥理異痍痢移罹而耳肄苡荑裏裡貽貳邇里離飴餌匿溺瀷益翊翌翼謚人仁刃印吝咽因姻寅引忍湮燐璘絪茵藺蚓認隣靭靷鱗麟一佚佾壹日溢逸鎰馹任壬妊姙恁林淋稔臨荏賃入卄"
  ],
  [
    "eda1",
    "立笠粒仍剩孕芿仔刺咨姉姿子字孜恣慈滋炙煮玆瓷疵磁紫者自茨蔗藉諮資雌作勺嚼斫昨灼炸爵綽芍酌雀鵲孱棧殘潺盞岑暫潛箴簪蠶雜丈仗匠場墻壯奬將帳庄張掌暲杖樟檣欌漿牆狀獐璋章粧腸臟臧莊葬蔣薔藏裝贓醬長"
  ],
  [
    "eea1",
    "障再哉在宰才材栽梓渽滓災縡裁財載齋齎爭箏諍錚佇低儲咀姐底抵杵楮樗沮渚狙猪疽箸紵苧菹著藷詛貯躇這邸雎齟勣吊嫡寂摘敵滴狄炙的積笛籍績翟荻謫賊赤跡蹟迪迹適鏑佃佺傳全典前剪塡塼奠專展廛悛戰栓殿氈澱"
  ],
  [
    "efa1",
    "煎琠田甸畑癲筌箋箭篆纏詮輾轉鈿銓錢鐫電顚顫餞切截折浙癤竊節絶占岾店漸点粘霑鮎點接摺蝶丁井亭停偵呈姃定幀庭廷征情挺政整旌晶晸柾楨檉正汀淀淨渟湞瀞炡玎珽町睛碇禎程穽精綎艇訂諪貞鄭酊釘鉦鋌錠霆靖"
  ],
  [
    "f0a1",
    "靜頂鼎制劑啼堤帝弟悌提梯濟祭第臍薺製諸蹄醍除際霽題齊俎兆凋助嘲弔彫措操早晁曺曹朝條棗槽漕潮照燥爪璪眺祖祚租稠窕粗糟組繰肇藻蚤詔調趙躁造遭釣阻雕鳥族簇足鏃存尊卒拙猝倧宗從悰慫棕淙琮種終綜縱腫"
  ],
  [
    "f1a1",
    "踪踵鍾鐘佐坐左座挫罪主住侏做姝胄呪周嗾奏宙州廚晝朱柱株注洲湊澍炷珠疇籌紂紬綢舟蛛註誅走躊輳週酎酒鑄駐竹粥俊儁准埈寯峻晙樽浚準濬焌畯竣蠢逡遵雋駿茁中仲衆重卽櫛楫汁葺增憎曾拯烝甑症繒蒸證贈之只"
  ],
  [
    "f2a1",
    "咫地址志持指摯支旨智枝枳止池沚漬知砥祉祗紙肢脂至芝芷蜘誌識贄趾遲直稙稷織職唇嗔塵振搢晉晋桭榛殄津溱珍瑨璡畛疹盡眞瞋秦縉縝臻蔯袗診賑軫辰進鎭陣陳震侄叱姪嫉帙桎瓆疾秩窒膣蛭質跌迭斟朕什執潗緝輯"
  ],
  [
    "f3a1",
    "鏶集徵懲澄且侘借叉嗟嵯差次此磋箚茶蹉車遮捉搾着窄錯鑿齪撰澯燦璨瓚竄簒纂粲纘讚贊鑽餐饌刹察擦札紮僭參塹慘慙懺斬站讒讖倉倡創唱娼廠彰愴敞昌昶暢槍滄漲猖瘡窓脹艙菖蒼債埰寀寨彩採砦綵菜蔡采釵冊柵策"
  ],
  [
    "f4a1",
    "責凄妻悽處倜刺剔尺慽戚拓擲斥滌瘠脊蹠陟隻仟千喘天川擅泉淺玔穿舛薦賤踐遷釧闡阡韆凸哲喆徹撤澈綴輟轍鐵僉尖沾添甛瞻簽籤詹諂堞妾帖捷牒疊睫諜貼輒廳晴淸聽菁請靑鯖切剃替涕滯締諦逮遞體初剿哨憔抄招梢"
  ],
  [
    "f5a1",
    "椒楚樵炒焦硝礁礎秒稍肖艸苕草蕉貂超酢醋醮促囑燭矗蜀觸寸忖村邨叢塚寵悤憁摠總聰蔥銃撮催崔最墜抽推椎楸樞湫皺秋芻萩諏趨追鄒酋醜錐錘鎚雛騶鰍丑畜祝竺筑築縮蓄蹙蹴軸逐春椿瑃出朮黜充忠沖蟲衝衷悴膵萃"
  ],
  [
    "f6a1",
    "贅取吹嘴娶就炊翠聚脆臭趣醉驟鷲側仄厠惻測層侈値嗤峙幟恥梔治淄熾痔痴癡稚穉緇緻置致蚩輜雉馳齒則勅飭親七柒漆侵寢枕沈浸琛砧針鍼蟄秤稱快他咤唾墮妥惰打拖朶楕舵陀馱駝倬卓啄坼度托拓擢晫柝濁濯琢琸託"
  ],
  [
    "f7a1",
    "鐸呑嘆坦彈憚歎灘炭綻誕奪脫探眈耽貪塔搭榻宕帑湯糖蕩兌台太怠態殆汰泰笞胎苔跆邰颱宅擇澤撑攄兎吐土討慟桶洞痛筒統通堆槌腿褪退頹偸套妬投透鬪慝特闖坡婆巴把播擺杷波派爬琶破罷芭跛頗判坂板版瓣販辦鈑"
  ],
  [
    "f8a1",
    "阪八叭捌佩唄悖敗沛浿牌狽稗覇貝彭澎烹膨愎便偏扁片篇編翩遍鞭騙貶坪平枰萍評吠嬖幣廢弊斃肺蔽閉陛佈包匍匏咆哺圃布怖抛抱捕暴泡浦疱砲胞脯苞葡蒲袍褒逋鋪飽鮑幅暴曝瀑爆輻俵剽彪慓杓標漂瓢票表豹飇飄驃"
  ],
  [
    "f9a1",
    "品稟楓諷豊風馮彼披疲皮被避陂匹弼必泌珌畢疋筆苾馝乏逼下何厦夏廈昰河瑕荷蝦賀遐霞鰕壑學虐謔鶴寒恨悍旱汗漢澣瀚罕翰閑閒限韓割轄函含咸啣喊檻涵緘艦銜陷鹹合哈盒蛤閤闔陜亢伉姮嫦巷恒抗杭桁沆港缸肛航"
  ],
  [
    "faa1",
    "行降項亥偕咳垓奚孩害懈楷海瀣蟹解該諧邂駭骸劾核倖幸杏荇行享向嚮珦鄕響餉饗香噓墟虛許憲櫶獻軒歇險驗奕爀赫革俔峴弦懸晛泫炫玄玹現眩睍絃絢縣舷衒見賢鉉顯孑穴血頁嫌俠協夾峽挾浹狹脅脇莢鋏頰亨兄刑型"
  ],
  [
    "fba1",
    "形泂滎瀅灐炯熒珩瑩荊螢衡逈邢鎣馨兮彗惠慧暳蕙蹊醯鞋乎互呼壕壺好岵弧戶扈昊晧毫浩淏湖滸澔濠濩灝狐琥瑚瓠皓祜糊縞胡芦葫蒿虎號蝴護豪鎬頀顥惑或酷婚昏混渾琿魂忽惚笏哄弘汞泓洪烘紅虹訌鴻化和嬅樺火畵"
  ],
  [
    "fca1",
    "禍禾花華話譁貨靴廓擴攫確碻穫丸喚奐宦幻患換歡晥桓渙煥環紈還驩鰥活滑猾豁闊凰幌徨恍惶愰慌晃晄榥況湟滉潢煌璜皇篁簧荒蝗遑隍黃匯回廻徊恢悔懷晦會檜淮澮灰獪繪膾茴蛔誨賄劃獲宖橫鐄哮嚆孝效斅曉梟涍淆"
  ],
  [
    "fda1",
    "爻肴酵驍侯候厚后吼喉嗅帿後朽煦珝逅勛勳塤壎焄熏燻薰訓暈薨喧暄煊萱卉喙毁彙徽揮暉煇諱輝麾休携烋畦虧恤譎鷸兇凶匈洶胸黑昕欣炘痕吃屹紇訖欠欽歆吸恰洽翕興僖凞喜噫囍姬嬉希憙憘戱晞曦熙熹熺犧禧稀羲詰"
  ]
], ls = [
  [
    "0",
    "\0",
    127
  ],
  [
    "a140",
    "　，、。．‧；：？！︰…‥﹐﹑﹒·﹔﹕﹖﹗｜–︱—︳╴︴﹏（）︵︶｛｝︷︸〔〕︹︺【】︻︼《》︽︾〈〉︿﹀「」﹁﹂『』﹃﹄﹙﹚"
  ],
  [
    "a1a1",
    "﹛﹜﹝﹞‘’“”〝〞‵′＃＆＊※§〃○●△▲◎☆★◇◆□■▽▼㊣℅¯￣＿ˍ﹉﹊﹍﹎﹋﹌﹟﹠﹡＋－×÷±√＜＞＝≦≧≠∞≒≡﹢",
    4,
    "～∩∪⊥∠∟⊿㏒㏑∫∮∵∴♀♂⊕⊙↑↓←→↖↗↙↘∥∣／"
  ],
  [
    "a240",
    "＼∕﹨＄￥〒￠￡％＠℃℉﹩﹪﹫㏕㎜㎝㎞㏎㎡㎎㎏㏄°兙兛兞兝兡兣嗧瓩糎▁",
    7,
    "▏▎▍▌▋▊▉┼┴┬┤├▔─│▕┌┐└┘╭"
  ],
  [
    "a2a1",
    "╮╰╯═╞╪╡◢◣◥◤╱╲╳０",
    9,
    "Ⅰ",
    9,
    "〡",
    8,
    "十卄卅Ａ",
    25,
    "ａ",
    21
  ],
  [
    "a340",
    "ｗｘｙｚΑ",
    16,
    "Σ",
    6,
    "α",
    16,
    "σ",
    6,
    "ㄅ",
    10
  ],
  [
    "a3a1",
    "ㄐ",
    25,
    "˙ˉˊˇˋ"
  ],
  [
    "a3e1",
    "€"
  ],
  [
    "a440",
    "一乙丁七乃九了二人儿入八几刀刁力匕十卜又三下丈上丫丸凡久么也乞于亡兀刃勺千叉口土士夕大女子孑孓寸小尢尸山川工己已巳巾干廾弋弓才"
  ],
  [
    "a4a1",
    "丑丐不中丰丹之尹予云井互五亢仁什仃仆仇仍今介仄元允內六兮公冗凶分切刈勻勾勿化匹午升卅卞厄友及反壬天夫太夭孔少尤尺屯巴幻廿弔引心戈戶手扎支文斗斤方日曰月木欠止歹毋比毛氏水火爪父爻片牙牛犬王丙"
  ],
  [
    "a540",
    "世丕且丘主乍乏乎以付仔仕他仗代令仙仞充兄冉冊冬凹出凸刊加功包匆北匝仟半卉卡占卯卮去可古右召叮叩叨叼司叵叫另只史叱台句叭叻四囚外"
  ],
  [
    "a5a1",
    "央失奴奶孕它尼巨巧左市布平幼弁弘弗必戊打扔扒扑斥旦朮本未末札正母民氐永汁汀氾犯玄玉瓜瓦甘生用甩田由甲申疋白皮皿目矛矢石示禾穴立丞丟乒乓乩亙交亦亥仿伉伙伊伕伍伐休伏仲件任仰仳份企伋光兇兆先全"
  ],
  [
    "a640",
    "共再冰列刑划刎刖劣匈匡匠印危吉吏同吊吐吁吋各向名合吃后吆吒因回囝圳地在圭圬圯圩夙多夷夸妄奸妃好她如妁字存宇守宅安寺尖屹州帆并年"
  ],
  [
    "a6a1",
    "式弛忙忖戎戌戍成扣扛托收早旨旬旭曲曳有朽朴朱朵次此死氖汝汗汙江池汐汕污汛汍汎灰牟牝百竹米糸缶羊羽老考而耒耳聿肉肋肌臣自至臼舌舛舟艮色艾虫血行衣西阡串亨位住佇佗佞伴佛何估佐佑伽伺伸佃佔似但佣"
  ],
  [
    "a740",
    "作你伯低伶余佝佈佚兌克免兵冶冷別判利刪刨劫助努劬匣即卵吝吭吞吾否呎吧呆呃吳呈呂君吩告吹吻吸吮吵吶吠吼呀吱含吟听囪困囤囫坊坑址坍"
  ],
  [
    "a7a1",
    "均坎圾坐坏圻壯夾妝妒妨妞妣妙妖妍妤妓妊妥孝孜孚孛完宋宏尬局屁尿尾岐岑岔岌巫希序庇床廷弄弟彤形彷役忘忌志忍忱快忸忪戒我抄抗抖技扶抉扭把扼找批扳抒扯折扮投抓抑抆改攻攸旱更束李杏材村杜杖杞杉杆杠"
  ],
  [
    "a840",
    "杓杗步每求汞沙沁沈沉沅沛汪決沐汰沌汨沖沒汽沃汲汾汴沆汶沍沔沘沂灶灼災灸牢牡牠狄狂玖甬甫男甸皂盯矣私秀禿究系罕肖肓肝肘肛肚育良芒"
  ],
  [
    "a8a1",
    "芋芍見角言谷豆豕貝赤走足身車辛辰迂迆迅迄巡邑邢邪邦那酉釆里防阮阱阪阬並乖乳事些亞享京佯依侍佳使佬供例來侃佰併侈佩佻侖佾侏侑佺兔兒兕兩具其典冽函刻券刷刺到刮制剁劾劻卒協卓卑卦卷卸卹取叔受味呵"
  ],
  [
    "a940",
    "咖呸咕咀呻呷咄咒咆呼咐呱呶和咚呢周咋命咎固垃坷坪坩坡坦坤坼夜奉奇奈奄奔妾妻委妹妮姑姆姐姍始姓姊妯妳姒姅孟孤季宗定官宜宙宛尚屈居"
  ],
  [
    "a9a1",
    "屆岷岡岸岩岫岱岳帘帚帖帕帛帑幸庚店府底庖延弦弧弩往征彿彼忝忠忽念忿怏怔怯怵怖怪怕怡性怩怫怛或戕房戾所承拉拌拄抿拂抹拒招披拓拔拋拈抨抽押拐拙拇拍抵拚抱拘拖拗拆抬拎放斧於旺昔易昌昆昂明昀昏昕昊"
  ],
  [
    "aa40",
    "昇服朋杭枋枕東果杳杷枇枝林杯杰板枉松析杵枚枓杼杪杲欣武歧歿氓氛泣注泳沱泌泥河沽沾沼波沫法泓沸泄油況沮泗泅泱沿治泡泛泊沬泯泜泖泠"
  ],
  [
    "aaa1",
    "炕炎炒炊炙爬爭爸版牧物狀狎狙狗狐玩玨玟玫玥甽疝疙疚的盂盲直知矽社祀祁秉秈空穹竺糾罔羌羋者肺肥肢肱股肫肩肴肪肯臥臾舍芳芝芙芭芽芟芹花芬芥芯芸芣芰芾芷虎虱初表軋迎返近邵邸邱邶采金長門阜陀阿阻附"
  ],
  [
    "ab40",
    "陂隹雨青非亟亭亮信侵侯便俠俑俏保促侶俘俟俊俗侮俐俄係俚俎俞侷兗冒冑冠剎剃削前剌剋則勇勉勃勁匍南卻厚叛咬哀咨哎哉咸咦咳哇哂咽咪品"
  ],
  [
    "aba1",
    "哄哈咯咫咱咻咩咧咿囿垂型垠垣垢城垮垓奕契奏奎奐姜姘姿姣姨娃姥姪姚姦威姻孩宣宦室客宥封屎屏屍屋峙峒巷帝帥帟幽庠度建弈弭彥很待徊律徇後徉怒思怠急怎怨恍恰恨恢恆恃恬恫恪恤扁拜挖按拼拭持拮拽指拱拷"
  ],
  [
    "ac40",
    "拯括拾拴挑挂政故斫施既春昭映昧是星昨昱昤曷柿染柱柔某柬架枯柵柩柯柄柑枴柚查枸柏柞柳枰柙柢柝柒歪殃殆段毒毗氟泉洋洲洪流津洌洱洞洗"
  ],
  [
    "aca1",
    "活洽派洶洛泵洹洧洸洩洮洵洎洫炫為炳炬炯炭炸炮炤爰牲牯牴狩狠狡玷珊玻玲珍珀玳甚甭畏界畎畋疫疤疥疢疣癸皆皇皈盈盆盃盅省盹相眉看盾盼眇矜砂研砌砍祆祉祈祇禹禺科秒秋穿突竿竽籽紂紅紀紉紇約紆缸美羿耄"
  ],
  [
    "ad40",
    "耐耍耑耶胖胥胚胃胄背胡胛胎胞胤胝致舢苧范茅苣苛苦茄若茂茉苒苗英茁苜苔苑苞苓苟苯茆虐虹虻虺衍衫要觔計訂訃貞負赴赳趴軍軌述迦迢迪迥"
  ],
  [
    "ada1",
    "迭迫迤迨郊郎郁郃酋酊重閂限陋陌降面革韋韭音頁風飛食首香乘亳倌倍倣俯倦倥俸倩倖倆值借倚倒們俺倀倔倨俱倡個候倘俳修倭倪俾倫倉兼冤冥冢凍凌准凋剖剜剔剛剝匪卿原厝叟哨唐唁唷哼哥哲唆哺唔哩哭員唉哮哪"
  ],
  [
    "ae40",
    "哦唧唇哽唏圃圄埂埔埋埃堉夏套奘奚娑娘娜娟娛娓姬娠娣娩娥娌娉孫屘宰害家宴宮宵容宸射屑展屐峭峽峻峪峨峰島崁峴差席師庫庭座弱徒徑徐恙"
  ],
  [
    "aea1",
    "恣恥恐恕恭恩息悄悟悚悍悔悌悅悖扇拳挈拿捎挾振捕捂捆捏捉挺捐挽挪挫挨捍捌效敉料旁旅時晉晏晃晒晌晅晁書朔朕朗校核案框桓根桂桔栩梳栗桌桑栽柴桐桀格桃株桅栓栘桁殊殉殷氣氧氨氦氤泰浪涕消涇浦浸海浙涓"
  ],
  [
    "af40",
    "浬涉浮浚浴浩涌涊浹涅浥涔烊烘烤烙烈烏爹特狼狹狽狸狷玆班琉珮珠珪珞畔畝畜畚留疾病症疲疳疽疼疹痂疸皋皰益盍盎眩真眠眨矩砰砧砸砝破砷"
  ],
  [
    "afa1",
    "砥砭砠砟砲祕祐祠祟祖神祝祗祚秤秣秧租秦秩秘窄窈站笆笑粉紡紗紋紊素索純紐紕級紜納紙紛缺罟羔翅翁耆耘耕耙耗耽耿胱脂胰脅胭胴脆胸胳脈能脊胼胯臭臬舀舐航舫舨般芻茫荒荔荊茸荐草茵茴荏茲茹茶茗荀茱茨荃"
  ],
  [
    "b040",
    "虔蚊蚪蚓蚤蚩蚌蚣蚜衰衷袁袂衽衹記訐討訌訕訊託訓訖訏訑豈豺豹財貢起躬軒軔軏辱送逆迷退迺迴逃追逅迸邕郡郝郢酒配酌釘針釗釜釙閃院陣陡"
  ],
  [
    "b0a1",
    "陛陝除陘陞隻飢馬骨高鬥鬲鬼乾偺偽停假偃偌做偉健偶偎偕偵側偷偏倏偯偭兜冕凰剪副勒務勘動匐匏匙匿區匾參曼商啪啦啄啞啡啃啊唱啖問啕唯啤唸售啜唬啣唳啁啗圈國圉域堅堊堆埠埤基堂堵執培夠奢娶婁婉婦婪婀"
  ],
  [
    "b140",
    "娼婢婚婆婊孰寇寅寄寂宿密尉專將屠屜屝崇崆崎崛崖崢崑崩崔崙崤崧崗巢常帶帳帷康庸庶庵庾張強彗彬彩彫得徙從徘御徠徜恿患悉悠您惋悴惦悽"
  ],
  [
    "b1a1",
    "情悻悵惜悼惘惕惆惟悸惚惇戚戛扈掠控捲掖探接捷捧掘措捱掩掉掃掛捫推掄授掙採掬排掏掀捻捩捨捺敝敖救教敗啟敏敘敕敔斜斛斬族旋旌旎晝晚晤晨晦晞曹勗望梁梯梢梓梵桿桶梱梧梗械梃棄梭梆梅梔條梨梟梡梂欲殺"
  ],
  [
    "b240",
    "毫毬氫涎涼淳淙液淡淌淤添淺清淇淋涯淑涮淞淹涸混淵淅淒渚涵淚淫淘淪深淮淨淆淄涪淬涿淦烹焉焊烽烯爽牽犁猜猛猖猓猙率琅琊球理現琍瓠瓶"
  ],
  [
    "b2a1",
    "瓷甜產略畦畢異疏痔痕疵痊痍皎盔盒盛眷眾眼眶眸眺硫硃硎祥票祭移窒窕笠笨笛第符笙笞笮粒粗粕絆絃統紮紹紼絀細紳組累終紲紱缽羞羚翌翎習耜聊聆脯脖脣脫脩脰脤舂舵舷舶船莎莞莘荸莢莖莽莫莒莊莓莉莠荷荻荼"
  ],
  [
    "b340",
    "莆莧處彪蛇蛀蚶蛄蚵蛆蛋蚱蚯蛉術袞袈被袒袖袍袋覓規訪訝訣訥許設訟訛訢豉豚販責貫貨貪貧赧赦趾趺軛軟這逍通逗連速逝逐逕逞造透逢逖逛途"
  ],
  [
    "b3a1",
    "部郭都酗野釵釦釣釧釭釩閉陪陵陳陸陰陴陶陷陬雀雪雩章竟頂頃魚鳥鹵鹿麥麻傢傍傅備傑傀傖傘傚最凱割剴創剩勞勝勛博厥啻喀喧啼喊喝喘喂喜喪喔喇喋喃喳單喟唾喲喚喻喬喱啾喉喫喙圍堯堪場堤堰報堡堝堠壹壺奠"
  ],
  [
    "b440",
    "婷媚婿媒媛媧孳孱寒富寓寐尊尋就嵌嵐崴嵇巽幅帽幀幃幾廊廁廂廄弼彭復循徨惑惡悲悶惠愜愣惺愕惰惻惴慨惱愎惶愉愀愒戟扉掣掌描揀揩揉揆揍"
  ],
  [
    "b4a1",
    "插揣提握揖揭揮捶援揪換摒揚揹敞敦敢散斑斐斯普晰晴晶景暑智晾晷曾替期朝棺棕棠棘棗椅棟棵森棧棹棒棲棣棋棍植椒椎棉棚楮棻款欺欽殘殖殼毯氮氯氬港游湔渡渲湧湊渠渥渣減湛湘渤湖湮渭渦湯渴湍渺測湃渝渾滋"
  ],
  [
    "b540",
    "溉渙湎湣湄湲湩湟焙焚焦焰無然煮焜牌犄犀猶猥猴猩琺琪琳琢琥琵琶琴琯琛琦琨甥甦畫番痢痛痣痙痘痞痠登發皖皓皴盜睏短硝硬硯稍稈程稅稀窘"
  ],
  [
    "b5a1",
    "窗窖童竣等策筆筐筒答筍筋筏筑粟粥絞結絨絕紫絮絲絡給絢絰絳善翔翕耋聒肅腕腔腋腑腎脹腆脾腌腓腴舒舜菩萃菸萍菠菅萋菁華菱菴著萊菰萌菌菽菲菊萸萎萄菜萇菔菟虛蛟蛙蛭蛔蛛蛤蛐蛞街裁裂袱覃視註詠評詞証詁"
  ],
  [
    "b640",
    "詔詛詐詆訴診訶詖象貂貯貼貳貽賁費賀貴買貶貿貸越超趁跎距跋跚跑跌跛跆軻軸軼辜逮逵週逸進逶鄂郵鄉郾酣酥量鈔鈕鈣鈉鈞鈍鈐鈇鈑閔閏開閑"
  ],
  [
    "b6a1",
    "間閒閎隊階隋陽隅隆隍陲隄雁雅雄集雇雯雲韌項順須飧飪飯飩飲飭馮馭黃黍黑亂傭債傲傳僅傾催傷傻傯僇剿剷剽募勦勤勢勣匯嗟嗨嗓嗦嗎嗜嗇嗑嗣嗤嗯嗚嗡嗅嗆嗥嗉園圓塞塑塘塗塚塔填塌塭塊塢塒塋奧嫁嫉嫌媾媽媼"
  ],
  [
    "b740",
    "媳嫂媲嵩嵯幌幹廉廈弒彙徬微愚意慈感想愛惹愁愈慎慌慄慍愾愴愧愍愆愷戡戢搓搾搞搪搭搽搬搏搜搔損搶搖搗搆敬斟新暗暉暇暈暖暄暘暍會榔業"
  ],
  [
    "b7a1",
    "楚楷楠楔極椰概楊楨楫楞楓楹榆楝楣楛歇歲毀殿毓毽溢溯滓溶滂源溝滇滅溥溘溼溺溫滑準溜滄滔溪溧溴煎煙煩煤煉照煜煬煦煌煥煞煆煨煖爺牒猷獅猿猾瑯瑚瑕瑟瑞瑁琿瑙瑛瑜當畸瘀痰瘁痲痱痺痿痴痳盞盟睛睫睦睞督"
  ],
  [
    "b840",
    "睹睪睬睜睥睨睢矮碎碰碗碘碌碉硼碑碓硿祺祿禁萬禽稜稚稠稔稟稞窟窠筷節筠筮筧粱粳粵經絹綑綁綏絛置罩罪署義羨群聖聘肆肄腱腰腸腥腮腳腫"
  ],
  [
    "b8a1",
    "腹腺腦舅艇蒂葷落萱葵葦葫葉葬葛萼萵葡董葩葭葆虞虜號蛹蜓蜈蜇蜀蛾蛻蜂蜃蜆蜊衙裟裔裙補裘裝裡裊裕裒覜解詫該詳試詩詰誇詼詣誠話誅詭詢詮詬詹詻訾詨豢貊貉賊資賈賄貲賃賂賅跡跟跨路跳跺跪跤跦躲較載軾輊"
  ],
  [
    "b940",
    "辟農運遊道遂達逼違遐遇遏過遍遑逾遁鄒鄗酬酪酩釉鈷鉗鈸鈽鉀鈾鉛鉋鉤鉑鈴鉉鉍鉅鈹鈿鉚閘隘隔隕雍雋雉雊雷電雹零靖靴靶預頑頓頊頒頌飼飴"
  ],
  [
    "b9a1",
    "飽飾馳馱馴髡鳩麂鼎鼓鼠僧僮僥僖僭僚僕像僑僱僎僩兢凳劃劂匱厭嗾嘀嘛嘗嗽嘔嘆嘉嘍嘎嗷嘖嘟嘈嘐嗶團圖塵塾境墓墊塹墅塽壽夥夢夤奪奩嫡嫦嫩嫗嫖嫘嫣孵寞寧寡寥實寨寢寤察對屢嶄嶇幛幣幕幗幔廓廖弊彆彰徹慇"
  ],
  [
    "ba40",
    "愿態慷慢慣慟慚慘慵截撇摘摔撤摸摟摺摑摧搴摭摻敲斡旗旖暢暨暝榜榨榕槁榮槓構榛榷榻榫榴槐槍榭槌榦槃榣歉歌氳漳演滾漓滴漩漾漠漬漏漂漢"
  ],
  [
    "baa1",
    "滿滯漆漱漸漲漣漕漫漯澈漪滬漁滲滌滷熔熙煽熊熄熒爾犒犖獄獐瑤瑣瑪瑰瑭甄疑瘧瘍瘋瘉瘓盡監瞄睽睿睡磁碟碧碳碩碣禎福禍種稱窪窩竭端管箕箋筵算箝箔箏箸箇箄粹粽精綻綰綜綽綾綠緊綴網綱綺綢綿綵綸維緒緇綬"
  ],
  [
    "bb40",
    "罰翠翡翟聞聚肇腐膀膏膈膊腿膂臧臺與舔舞艋蓉蒿蓆蓄蒙蒞蒲蒜蓋蒸蓀蓓蒐蒼蓑蓊蜿蜜蜻蜢蜥蜴蜘蝕蜷蜩裳褂裴裹裸製裨褚裯誦誌語誣認誡誓誤"
  ],
  [
    "bba1",
    "說誥誨誘誑誚誧豪貍貌賓賑賒赫趙趕跼輔輒輕輓辣遠遘遜遣遙遞遢遝遛鄙鄘鄞酵酸酷酴鉸銀銅銘銖鉻銓銜銨鉼銑閡閨閩閣閥閤隙障際雌雒需靼鞅韶頗領颯颱餃餅餌餉駁骯骰髦魁魂鳴鳶鳳麼鼻齊億儀僻僵價儂儈儉儅凜"
  ],
  [
    "bc40",
    "劇劈劉劍劊勰厲嘮嘻嘹嘲嘿嘴嘩噓噎噗噴嘶嘯嘰墀墟增墳墜墮墩墦奭嬉嫻嬋嫵嬌嬈寮寬審寫層履嶝嶔幢幟幡廢廚廟廝廣廠彈影德徵慶慧慮慝慕憂"
  ],
  [
    "bca1",
    "慼慰慫慾憧憐憫憎憬憚憤憔憮戮摩摯摹撞撲撈撐撰撥撓撕撩撒撮播撫撚撬撙撢撳敵敷數暮暫暴暱樣樟槨樁樞標槽模樓樊槳樂樅槭樑歐歎殤毅毆漿潼澄潑潦潔澆潭潛潸潮澎潺潰潤澗潘滕潯潠潟熟熬熱熨牖犛獎獗瑩璋璃"
  ],
  [
    "bd40",
    "瑾璀畿瘠瘩瘟瘤瘦瘡瘢皚皺盤瞎瞇瞌瞑瞋磋磅確磊碾磕碼磐稿稼穀稽稷稻窯窮箭箱範箴篆篇篁箠篌糊締練緯緻緘緬緝編緣線緞緩綞緙緲緹罵罷羯"
  ],
  [
    "bda1",
    "翩耦膛膜膝膠膚膘蔗蔽蔚蓮蔬蔭蔓蔑蔣蔡蔔蓬蔥蓿蔆螂蝴蝶蝠蝦蝸蝨蝙蝗蝌蝓衛衝褐複褒褓褕褊誼諒談諄誕請諸課諉諂調誰論諍誶誹諛豌豎豬賠賞賦賤賬賭賢賣賜質賡赭趟趣踫踐踝踢踏踩踟踡踞躺輝輛輟輩輦輪輜輞"
  ],
  [
    "be40",
    "輥適遮遨遭遷鄰鄭鄧鄱醇醉醋醃鋅銻銷鋪銬鋤鋁銳銼鋒鋇鋰銲閭閱霄霆震霉靠鞍鞋鞏頡頫頜颳養餓餒餘駝駐駟駛駑駕駒駙骷髮髯鬧魅魄魷魯鴆鴉"
  ],
  [
    "bea1",
    "鴃麩麾黎墨齒儒儘儔儐儕冀冪凝劑劓勳噙噫噹噩噤噸噪器噥噱噯噬噢噶壁墾壇壅奮嬝嬴學寰導彊憲憑憩憊懍憶憾懊懈戰擅擁擋撻撼據擄擇擂操撿擒擔撾整曆曉暹曄曇暸樽樸樺橙橫橘樹橄橢橡橋橇樵機橈歙歷氅濂澱澡"
  ],
  [
    "bf40",
    "濃澤濁澧澳激澹澶澦澠澴熾燉燐燒燈燕熹燎燙燜燃燄獨璜璣璘璟璞瓢甌甍瘴瘸瘺盧盥瞠瞞瞟瞥磨磚磬磧禦積穎穆穌穋窺篙簑築篤篛篡篩篦糕糖縊"
  ],
  [
    "bfa1",
    "縑縈縛縣縞縝縉縐罹羲翰翱翮耨膳膩膨臻興艘艙蕊蕙蕈蕨蕩蕃蕉蕭蕪蕞螃螟螞螢融衡褪褲褥褫褡親覦諦諺諫諱謀諜諧諮諾謁謂諷諭諳諶諼豫豭貓賴蹄踱踴蹂踹踵輻輯輸輳辨辦遵遴選遲遼遺鄴醒錠錶鋸錳錯錢鋼錫錄錚"
  ],
  [
    "c040",
    "錐錦錡錕錮錙閻隧隨險雕霎霑霖霍霓霏靛靜靦鞘頰頸頻頷頭頹頤餐館餞餛餡餚駭駢駱骸骼髻髭鬨鮑鴕鴣鴦鴨鴒鴛默黔龍龜優償儡儲勵嚎嚀嚐嚅嚇"
  ],
  [
    "c0a1",
    "嚏壕壓壑壎嬰嬪嬤孺尷屨嶼嶺嶽嶸幫彌徽應懂懇懦懋戲戴擎擊擘擠擰擦擬擱擢擭斂斃曙曖檀檔檄檢檜櫛檣橾檗檐檠歜殮毚氈濘濱濟濠濛濤濫濯澀濬濡濩濕濮濰燧營燮燦燥燭燬燴燠爵牆獰獲璩環璦璨癆療癌盪瞳瞪瞰瞬"
  ],
  [
    "c140",
    "瞧瞭矯磷磺磴磯礁禧禪穗窿簇簍篾篷簌篠糠糜糞糢糟糙糝縮績繆縷縲繃縫總縱繅繁縴縹繈縵縿縯罄翳翼聱聲聰聯聳臆臃膺臂臀膿膽臉膾臨舉艱薪"
  ],
  [
    "c1a1",
    "薄蕾薜薑薔薯薛薇薨薊虧蟀蟑螳蟒蟆螫螻螺蟈蟋褻褶襄褸褽覬謎謗謙講謊謠謝謄謐豁谿豳賺賽購賸賻趨蹉蹋蹈蹊轄輾轂轅輿避遽還邁邂邀鄹醣醞醜鍍鎂錨鍵鍊鍥鍋錘鍾鍬鍛鍰鍚鍔闊闋闌闈闆隱隸雖霜霞鞠韓顆颶餵騁"
  ],
  [
    "c240",
    "駿鮮鮫鮪鮭鴻鴿麋黏點黜黝黛鼾齋叢嚕嚮壙壘嬸彝懣戳擴擲擾攆擺擻擷斷曜朦檳檬櫃檻檸櫂檮檯歟歸殯瀉瀋濾瀆濺瀑瀏燻燼燾燸獷獵璧璿甕癖癘"
  ],
  [
    "c2a1",
    "癒瞽瞿瞻瞼礎禮穡穢穠竄竅簫簧簪簞簣簡糧織繕繞繚繡繒繙罈翹翻職聶臍臏舊藏薩藍藐藉薰薺薹薦蟯蟬蟲蟠覆覲觴謨謹謬謫豐贅蹙蹣蹦蹤蹟蹕軀轉轍邇邃邈醫醬釐鎔鎊鎖鎢鎳鎮鎬鎰鎘鎚鎗闔闖闐闕離雜雙雛雞霤鞣鞦"
  ],
  [
    "c340",
    "鞭韹額顏題顎顓颺餾餿餽餮馥騎髁鬃鬆魏魎魍鯊鯉鯽鯈鯀鵑鵝鵠黠鼕鼬儳嚥壞壟壢寵龐廬懲懷懶懵攀攏曠曝櫥櫝櫚櫓瀛瀟瀨瀚瀝瀕瀘爆爍牘犢獸"
  ],
  [
    "c3a1",
    "獺璽瓊瓣疇疆癟癡矇礙禱穫穩簾簿簸簽簷籀繫繭繹繩繪羅繳羶羹羸臘藩藝藪藕藤藥藷蟻蠅蠍蟹蟾襠襟襖襞譁譜識證譚譎譏譆譙贈贊蹼蹲躇蹶蹬蹺蹴轔轎辭邊邋醱醮鏡鏑鏟鏃鏈鏜鏝鏖鏢鏍鏘鏤鏗鏨關隴難霪霧靡韜韻類"
  ],
  [
    "c440",
    "願顛颼饅饉騖騙鬍鯨鯧鯖鯛鶉鵡鵲鵪鵬麒麗麓麴勸嚨嚷嚶嚴嚼壤孀孃孽寶巉懸懺攘攔攙曦朧櫬瀾瀰瀲爐獻瓏癢癥礦礪礬礫竇競籌籃籍糯糰辮繽繼"
  ],
  [
    "c4a1",
    "纂罌耀臚艦藻藹蘑藺蘆蘋蘇蘊蠔蠕襤覺觸議譬警譯譟譫贏贍躉躁躅躂醴釋鐘鐃鏽闡霰飄饒饑馨騫騰騷騵鰓鰍鹹麵黨鼯齟齣齡儷儸囁囀囂夔屬巍懼懾攝攜斕曩櫻欄櫺殲灌爛犧瓖瓔癩矓籐纏續羼蘗蘭蘚蠣蠢蠡蠟襪襬覽譴"
  ],
  [
    "c540",
    "護譽贓躊躍躋轟辯醺鐮鐳鐵鐺鐸鐲鐫闢霸霹露響顧顥饗驅驃驀騾髏魔魑鰭鰥鶯鶴鷂鶸麝黯鼙齜齦齧儼儻囈囊囉孿巔巒彎懿攤權歡灑灘玀瓤疊癮癬"
  ],
  [
    "c5a1",
    "禳籠籟聾聽臟襲襯觼讀贖贗躑躓轡酈鑄鑑鑒霽霾韃韁顫饕驕驍髒鬚鱉鰱鰾鰻鷓鷗鼴齬齪龔囌巖戀攣攫攪曬欐瓚竊籤籣籥纓纖纔臢蘸蘿蠱變邐邏鑣鑠鑤靨顯饜驚驛驗髓體髑鱔鱗鱖鷥麟黴囑壩攬灞癱癲矗罐羈蠶蠹衢讓讒"
  ],
  [
    "c640",
    "讖艷贛釀鑪靂靈靄韆顰驟鬢魘鱟鷹鷺鹼鹽鼇齷齲廳欖灣籬籮蠻觀躡釁鑲鑰顱饞髖鬣黌灤矚讚鑷韉驢驥纜讜躪釅鑽鑾鑼鱷鱸黷豔鑿鸚爨驪鬱鸛鸞籲"
  ],
  [
    "c940",
    "乂乜凵匚厂万丌乇亍囗兀屮彳丏冇与丮亓仂仉仈冘勼卬厹圠夃夬尐巿旡殳毌气爿丱丼仨仜仩仡仝仚刌匜卌圢圣夗夯宁宄尒尻屴屳帄庀庂忉戉扐氕"
  ],
  [
    "c9a1",
    "氶汃氿氻犮犰玊禸肊阞伎优伬仵伔仱伀价伈伝伂伅伢伓伄仴伒冱刓刉刐劦匢匟卍厊吇囡囟圮圪圴夼妀奼妅奻奾奷奿孖尕尥屼屺屻屾巟幵庄异弚彴忕忔忏扜扞扤扡扦扢扙扠扚扥旯旮朾朹朸朻机朿朼朳氘汆汒汜汏汊汔汋"
  ],
  [
    "ca40",
    "汌灱牞犴犵玎甪癿穵网艸艼芀艽艿虍襾邙邗邘邛邔阢阤阠阣佖伻佢佉体佤伾佧佒佟佁佘伭伳伿佡冏冹刜刞刡劭劮匉卣卲厎厏吰吷吪呔呅吙吜吥吘"
  ],
  [
    "caa1",
    "吽呏呁吨吤呇囮囧囥坁坅坌坉坋坒夆奀妦妘妠妗妎妢妐妏妧妡宎宒尨尪岍岏岈岋岉岒岊岆岓岕巠帊帎庋庉庌庈庍弅弝彸彶忒忑忐忭忨忮忳忡忤忣忺忯忷忻怀忴戺抃抌抎抏抔抇扱扻扺扰抁抈扷扽扲扴攷旰旴旳旲旵杅杇"
  ],
  [
    "cb40",
    "杙杕杌杈杝杍杚杋毐氙氚汸汧汫沄沋沏汱汯汩沚汭沇沕沜汦汳汥汻沎灴灺牣犿犽狃狆狁犺狅玕玗玓玔玒町甹疔疕皁礽耴肕肙肐肒肜芐芏芅芎芑芓"
  ],
  [
    "cba1",
    "芊芃芄豸迉辿邟邡邥邞邧邠阰阨阯阭丳侘佼侅佽侀侇佶佴侉侄佷佌侗佪侚佹侁佸侐侜侔侞侒侂侕佫佮冞冼冾刵刲刳剆刱劼匊匋匼厒厔咇呿咁咑咂咈呫呺呾呥呬呴呦咍呯呡呠咘呣呧呤囷囹坯坲坭坫坱坰坶垀坵坻坳坴坢"
  ],
  [
    "cc40",
    "坨坽夌奅妵妺姏姎妲姌姁妶妼姃姖妱妽姀姈妴姇孢孥宓宕屄屇岮岤岠岵岯岨岬岟岣岭岢岪岧岝岥岶岰岦帗帔帙弨弢弣弤彔徂彾彽忞忥怭怦怙怲怋"
  ],
  [
    "cca1",
    "怴怊怗怳怚怞怬怢怍怐怮怓怑怌怉怜戔戽抭抴拑抾抪抶拊抮抳抯抻抩抰抸攽斨斻昉旼昄昒昈旻昃昋昍昅旽昑昐曶朊枅杬枎枒杶杻枘枆构杴枍枌杺枟枑枙枃杽极杸杹枔欥殀歾毞氝沓泬泫泮泙沶泔沭泧沷泐泂沺泃泆泭泲"
  ],
  [
    "cd40",
    "泒泝沴沊沝沀泞泀洰泍泇沰泹泏泩泑炔炘炅炓炆炄炑炖炂炚炃牪狖狋狘狉狜狒狔狚狌狑玤玡玭玦玢玠玬玝瓝瓨甿畀甾疌疘皯盳盱盰盵矸矼矹矻矺"
  ],
  [
    "cda1",
    "矷祂礿秅穸穻竻籵糽耵肏肮肣肸肵肭舠芠苀芫芚芘芛芵芧芮芼芞芺芴芨芡芩苂芤苃芶芢虰虯虭虮豖迒迋迓迍迖迕迗邲邴邯邳邰阹阽阼阺陃俍俅俓侲俉俋俁俔俜俙侻侳俛俇俖侺俀侹俬剄剉勀勂匽卼厗厖厙厘咺咡咭咥哏"
  ],
  [
    "ce40",
    "哃茍咷咮哖咶哅哆咠呰咼咢咾呲哞咰垵垞垟垤垌垗垝垛垔垘垏垙垥垚垕壴复奓姡姞姮娀姱姝姺姽姼姶姤姲姷姛姩姳姵姠姾姴姭宨屌峐峘峌峗峋峛"
  ],
  [
    "cea1",
    "峞峚峉峇峊峖峓峔峏峈峆峎峟峸巹帡帢帣帠帤庰庤庢庛庣庥弇弮彖徆怷怹恔恲恞恅恓恇恉恛恌恀恂恟怤恄恘恦恮扂扃拏挍挋拵挎挃拫拹挏挌拸拶挀挓挔拺挕拻拰敁敃斪斿昶昡昲昵昜昦昢昳昫昺昝昴昹昮朏朐柁柲柈枺"
  ],
  [
    "cf40",
    "柜枻柸柘柀枷柅柫柤柟枵柍枳柷柶柮柣柂枹柎柧柰枲柼柆柭柌枮柦柛柺柉柊柃柪柋欨殂殄殶毖毘毠氠氡洨洴洭洟洼洿洒洊泚洳洄洙洺洚洑洀洝浂"
  ],
  [
    "cfa1",
    "洁洘洷洃洏浀洇洠洬洈洢洉洐炷炟炾炱炰炡炴炵炩牁牉牊牬牰牳牮狊狤狨狫狟狪狦狣玅珌珂珈珅玹玶玵玴珫玿珇玾珃珆玸珋瓬瓮甮畇畈疧疪癹盄眈眃眄眅眊盷盻盺矧矨砆砑砒砅砐砏砎砉砃砓祊祌祋祅祄秕种秏秖秎窀"
  ],
  [
    "d040",
    "穾竑笀笁籺籸籹籿粀粁紃紈紁罘羑羍羾耇耎耏耔耷胘胇胠胑胈胂胐胅胣胙胜胊胕胉胏胗胦胍臿舡芔苙苾苹茇苨茀苕茺苫苖苴苬苡苲苵茌苻苶苰苪"
  ],
  [
    "d0a1",
    "苤苠苺苳苭虷虴虼虳衁衎衧衪衩觓訄訇赲迣迡迮迠郱邽邿郕郅邾郇郋郈釔釓陔陏陑陓陊陎倞倅倇倓倢倰倛俵俴倳倷倬俶俷倗倜倠倧倵倯倱倎党冔冓凊凄凅凈凎剡剚剒剞剟剕剢勍匎厞唦哢唗唒哧哳哤唚哿唄唈哫唑唅哱"
  ],
  [
    "d140",
    "唊哻哷哸哠唎唃唋圁圂埌堲埕埒垺埆垽垼垸垶垿埇埐垹埁夎奊娙娖娭娮娕娏娗娊娞娳孬宧宭宬尃屖屔峬峿峮峱峷崀峹帩帨庨庮庪庬弳弰彧恝恚恧"
  ],
  [
    "d1a1",
    "恁悢悈悀悒悁悝悃悕悛悗悇悜悎戙扆拲挐捖挬捄捅挶捃揤挹捋捊挼挩捁挴捘捔捙挭捇挳捚捑挸捗捀捈敊敆旆旃旄旂晊晟晇晑朒朓栟栚桉栲栳栻桋桏栖栱栜栵栫栭栯桎桄栴栝栒栔栦栨栮桍栺栥栠欬欯欭欱欴歭肂殈毦毤"
  ],
  [
    "d240",
    "毨毣毢毧氥浺浣浤浶洍浡涒浘浢浭浯涑涍淯浿涆浞浧浠涗浰浼浟涂涘洯浨涋浾涀涄洖涃浻浽浵涐烜烓烑烝烋缹烢烗烒烞烠烔烍烅烆烇烚烎烡牂牸"
  ],
  [
    "d2a1",
    "牷牶猀狺狴狾狶狳狻猁珓珙珥珖玼珧珣珩珜珒珛珔珝珚珗珘珨瓞瓟瓴瓵甡畛畟疰痁疻痄痀疿疶疺皊盉眝眛眐眓眒眣眑眕眙眚眢眧砣砬砢砵砯砨砮砫砡砩砳砪砱祔祛祏祜祓祒祑秫秬秠秮秭秪秜秞秝窆窉窅窋窌窊窇竘笐"
  ],
  [
    "d340",
    "笄笓笅笏笈笊笎笉笒粄粑粊粌粈粍粅紞紝紑紎紘紖紓紟紒紏紌罜罡罞罠罝罛羖羒翃翂翀耖耾耹胺胲胹胵脁胻脀舁舯舥茳茭荄茙荑茥荖茿荁茦茜茢"
  ],
  [
    "d3a1",
    "荂荎茛茪茈茼荍茖茤茠茷茯茩荇荅荌荓茞茬荋茧荈虓虒蚢蚨蚖蚍蚑蚞蚇蚗蚆蚋蚚蚅蚥蚙蚡蚧蚕蚘蚎蚝蚐蚔衃衄衭衵衶衲袀衱衿衯袃衾衴衼訒豇豗豻貤貣赶赸趵趷趶軑軓迾迵适迿迻逄迼迶郖郠郙郚郣郟郥郘郛郗郜郤酐"
  ],
  [
    "d440",
    "酎酏釕釢釚陜陟隼飣髟鬯乿偰偪偡偞偠偓偋偝偲偈偍偁偛偊偢倕偅偟偩偫偣偤偆偀偮偳偗偑凐剫剭剬剮勖勓匭厜啵啶唼啍啐唴唪啑啢唶唵唰啒啅"
  ],
  [
    "d4a1",
    "唌唲啥啎唹啈唭唻啀啋圊圇埻堔埢埶埜埴堀埭埽堈埸堋埳埏堇埮埣埲埥埬埡堎埼堐埧堁堌埱埩埰堍堄奜婠婘婕婧婞娸娵婭婐婟婥婬婓婤婗婃婝婒婄婛婈媎娾婍娹婌婰婩婇婑婖婂婜孲孮寁寀屙崞崋崝崚崠崌崨崍崦崥崏"
  ],
  [
    "d540",
    "崰崒崣崟崮帾帴庱庴庹庲庳弶弸徛徖徟悊悐悆悾悰悺惓惔惏惤惙惝惈悱惛悷惊悿惃惍惀挲捥掊掂捽掽掞掭掝掗掫掎捯掇掐据掯捵掜捭掮捼掤挻掟"
  ],
  [
    "d5a1",
    "捸掅掁掑掍捰敓旍晥晡晛晙晜晢朘桹梇梐梜桭桮梮梫楖桯梣梬梩桵桴梲梏桷梒桼桫桲梪梀桱桾梛梖梋梠梉梤桸桻梑梌梊桽欶欳欷欸殑殏殍殎殌氪淀涫涴涳湴涬淩淢涷淶淔渀淈淠淟淖涾淥淜淝淛淴淊涽淭淰涺淕淂淏淉"
  ],
  [
    "d640",
    "淐淲淓淽淗淍淣涻烺焍烷焗烴焌烰焄烳焐烼烿焆焓焀烸烶焋焂焎牾牻牼牿猝猗猇猑猘猊猈狿猏猞玈珶珸珵琄琁珽琇琀珺珼珿琌琋珴琈畤畣痎痒痏"
  ],
  [
    "d6a1",
    "痋痌痑痐皏皉盓眹眯眭眱眲眴眳眽眥眻眵硈硒硉硍硊硌砦硅硐祤祧祩祪祣祫祡离秺秸秶秷窏窔窐笵筇笴笥笰笢笤笳笘笪笝笱笫笭笯笲笸笚笣粔粘粖粣紵紽紸紶紺絅紬紩絁絇紾紿絊紻紨罣羕羜羝羛翊翋翍翐翑翇翏翉耟"
  ],
  [
    "d740",
    "耞耛聇聃聈脘脥脙脛脭脟脬脞脡脕脧脝脢舑舸舳舺舴舲艴莐莣莨莍荺荳莤荴莏莁莕莙荵莔莩荽莃莌莝莛莪莋荾莥莯莈莗莰荿莦莇莮荶莚虙虖蚿蚷"
  ],
  [
    "d7a1",
    "蛂蛁蛅蚺蚰蛈蚹蚳蚸蛌蚴蚻蚼蛃蚽蚾衒袉袕袨袢袪袚袑袡袟袘袧袙袛袗袤袬袌袓袎覂觖觙觕訰訧訬訞谹谻豜豝豽貥赽赻赹趼跂趹趿跁軘軞軝軜軗軠軡逤逋逑逜逌逡郯郪郰郴郲郳郔郫郬郩酖酘酚酓酕釬釴釱釳釸釤釹釪"
  ],
  [
    "d840",
    "釫釷釨釮镺閆閈陼陭陫陱陯隿靪頄飥馗傛傕傔傞傋傣傃傌傎傝偨傜傒傂傇兟凔匒匑厤厧喑喨喥喭啷噅喢喓喈喏喵喁喣喒喤啽喌喦啿喕喡喎圌堩堷"
  ],
  [
    "d8a1",
    "堙堞堧堣堨埵塈堥堜堛堳堿堶堮堹堸堭堬堻奡媯媔媟婺媢媞婸媦婼媥媬媕媮娷媄媊媗媃媋媩婻婽媌媜媏媓媝寪寍寋寔寑寊寎尌尰崷嵃嵫嵁嵋崿崵嵑嵎嵕崳崺嵒崽崱嵙嵂崹嵉崸崼崲崶嵀嵅幄幁彘徦徥徫惉悹惌惢惎惄愔"
  ],
  [
    "d940",
    "惲愊愖愅惵愓惸惼惾惁愃愘愝愐惿愄愋扊掔掱掰揎揥揨揯揃撝揳揊揠揶揕揲揵摡揟掾揝揜揄揘揓揂揇揌揋揈揰揗揙攲敧敪敤敜敨敥斌斝斞斮旐旒"
  ],
  [
    "d9a1",
    "晼晬晻暀晱晹晪晲朁椌棓椄棜椪棬棪棱椏棖棷棫棤棶椓椐棳棡椇棌椈楰梴椑棯棆椔棸棐棽棼棨椋椊椗棎棈棝棞棦棴棑椆棔棩椕椥棇欹欻欿欼殔殗殙殕殽毰毲毳氰淼湆湇渟湉溈渼渽湅湢渫渿湁湝湳渜渳湋湀湑渻渃渮湞"
  ],
  [
    "da40",
    "湨湜湡渱渨湠湱湫渹渢渰湓湥渧湸湤湷湕湹湒湦渵渶湚焠焞焯烻焮焱焣焥焢焲焟焨焺焛牋牚犈犉犆犅犋猒猋猰猢猱猳猧猲猭猦猣猵猌琮琬琰琫琖"
  ],
  [
    "daa1",
    "琚琡琭琱琤琣琝琩琠琲瓻甯畯畬痧痚痡痦痝痟痤痗皕皒盚睆睇睄睍睅睊睎睋睌矞矬硠硤硥硜硭硱硪确硰硩硨硞硢祴祳祲祰稂稊稃稌稄窙竦竤筊笻筄筈筌筎筀筘筅粢粞粨粡絘絯絣絓絖絧絪絏絭絜絫絒絔絩絑絟絎缾缿罥"
  ],
  [
    "db40",
    "罦羢羠羡翗聑聏聐胾胔腃腊腒腏腇脽腍脺臦臮臷臸臹舄舼舽舿艵茻菏菹萣菀菨萒菧菤菼菶萐菆菈菫菣莿萁菝菥菘菿菡菋菎菖菵菉萉萏菞萑萆菂菳"
  ],
  [
    "dba1",
    "菕菺菇菑菪萓菃菬菮菄菻菗菢萛菛菾蛘蛢蛦蛓蛣蛚蛪蛝蛫蛜蛬蛩蛗蛨蛑衈衖衕袺裗袹袸裀袾袶袼袷袽袲褁裉覕覘覗觝觚觛詎詍訹詙詀詗詘詄詅詒詈詑詊詌詏豟貁貀貺貾貰貹貵趄趀趉跘跓跍跇跖跜跏跕跙跈跗跅軯軷軺"
  ],
  [
    "dc40",
    "軹軦軮軥軵軧軨軶軫軱軬軴軩逭逴逯鄆鄬鄄郿郼鄈郹郻鄁鄀鄇鄅鄃酡酤酟酢酠鈁鈊鈥鈃鈚鈦鈏鈌鈀鈒釿釽鈆鈄鈧鈂鈜鈤鈙鈗鈅鈖镻閍閌閐隇陾隈"
  ],
  [
    "dca1",
    "隉隃隀雂雈雃雱雰靬靰靮頇颩飫鳦黹亃亄亶傽傿僆傮僄僊傴僈僂傰僁傺傱僋僉傶傸凗剺剸剻剼嗃嗛嗌嗐嗋嗊嗝嗀嗔嗄嗩喿嗒喍嗏嗕嗢嗖嗈嗲嗍嗙嗂圔塓塨塤塏塍塉塯塕塎塝塙塥塛堽塣塱壼嫇嫄嫋媺媸媱媵媰媿嫈媻嫆"
  ],
  [
    "dd40",
    "媷嫀嫊媴媶嫍媹媐寖寘寙尟尳嵱嵣嵊嵥嵲嵬嵞嵨嵧嵢巰幏幎幊幍幋廅廌廆廋廇彀徯徭惷慉慊愫慅愶愲愮慆愯慏愩慀戠酨戣戥戤揅揱揫搐搒搉搠搤"
  ],
  [
    "dda1",
    "搳摃搟搕搘搹搷搢搣搌搦搰搨摁搵搯搊搚摀搥搧搋揧搛搮搡搎敯斒旓暆暌暕暐暋暊暙暔晸朠楦楟椸楎楢楱椿楅楪椹楂楗楙楺楈楉椵楬椳椽楥棰楸椴楩楀楯楄楶楘楁楴楌椻楋椷楜楏楑椲楒椯楻椼歆歅歃歂歈歁殛嗀毻毼"
  ],
  [
    "de40",
    "毹毷毸溛滖滈溏滀溟溓溔溠溱溹滆滒溽滁溞滉溷溰滍溦滏溲溾滃滜滘溙溒溎溍溤溡溿溳滐滊溗溮溣煇煔煒煣煠煁煝煢煲煸煪煡煂煘煃煋煰煟煐煓"
  ],
  [
    "dea1",
    "煄煍煚牏犍犌犑犐犎猼獂猻猺獀獊獉瑄瑊瑋瑒瑑瑗瑀瑏瑐瑎瑂瑆瑍瑔瓡瓿瓾瓽甝畹畷榃痯瘏瘃痷痾痼痹痸瘐痻痶痭痵痽皙皵盝睕睟睠睒睖睚睩睧睔睙睭矠碇碚碔碏碄碕碅碆碡碃硹碙碀碖硻祼禂祽祹稑稘稙稒稗稕稢稓"
  ],
  [
    "df40",
    "稛稐窣窢窞竫筦筤筭筴筩筲筥筳筱筰筡筸筶筣粲粴粯綈綆綀綍絿綅絺綎絻綃絼綌綔綄絽綒罭罫罧罨罬羦羥羧翛翜耡腤腠腷腜腩腛腢腲朡腞腶腧腯"
  ],
  [
    "dfa1",
    "腄腡舝艉艄艀艂艅蓱萿葖葶葹蒏蒍葥葑葀蒆葧萰葍葽葚葙葴葳葝蔇葞萷萺萴葺葃葸萲葅萩菙葋萯葂萭葟葰萹葎葌葒葯蓅蒎萻葇萶萳葨葾葄萫葠葔葮葐蜋蜄蛷蜌蛺蛖蛵蝍蛸蜎蜉蜁蛶蜍蜅裖裋裍裎裞裛裚裌裐覅覛觟觥觤"
  ],
  [
    "e040",
    "觡觠觢觜触詶誆詿詡訿詷誂誄詵誃誁詴詺谼豋豊豥豤豦貆貄貅賌赨赩趑趌趎趏趍趓趔趐趒跰跠跬跱跮跐跩跣跢跧跲跫跴輆軿輁輀輅輇輈輂輋遒逿"
  ],
  [
    "e0a1",
    "遄遉逽鄐鄍鄏鄑鄖鄔鄋鄎酮酯鉈鉒鈰鈺鉦鈳鉥鉞銃鈮鉊鉆鉭鉬鉏鉠鉧鉯鈶鉡鉰鈱鉔鉣鉐鉲鉎鉓鉌鉖鈲閟閜閞閛隒隓隑隗雎雺雽雸雵靳靷靸靲頏頍頎颬飶飹馯馲馰馵骭骫魛鳪鳭鳧麀黽僦僔僗僨僳僛僪僝僤僓僬僰僯僣僠"
  ],
  [
    "e140",
    "凘劀劁勩勫匰厬嘧嘕嘌嘒嗼嘏嘜嘁嘓嘂嗺嘝嘄嗿嗹墉塼墐墘墆墁塿塴墋塺墇墑墎塶墂墈塻墔墏壾奫嫜嫮嫥嫕嫪嫚嫭嫫嫳嫢嫠嫛嫬嫞嫝嫙嫨嫟孷寠"
  ],
  [
    "e1a1",
    "寣屣嶂嶀嵽嶆嵺嶁嵷嶊嶉嶈嵾嵼嶍嵹嵿幘幙幓廘廑廗廎廜廕廙廒廔彄彃彯徶愬愨慁慞慱慳慒慓慲慬憀慴慔慺慛慥愻慪慡慖戩戧戫搫摍摛摝摴摶摲摳摽摵摦撦摎撂摞摜摋摓摠摐摿搿摬摫摙摥摷敳斠暡暠暟朅朄朢榱榶槉"
  ],
  [
    "e240",
    "榠槎榖榰榬榼榑榙榎榧榍榩榾榯榿槄榽榤槔榹槊榚槏榳榓榪榡榞槙榗榐槂榵榥槆歊歍歋殞殟殠毃毄毾滎滵滱漃漥滸漷滻漮漉潎漙漚漧漘漻漒滭漊"
  ],
  [
    "e2a1",
    "漶潳滹滮漭潀漰漼漵滫漇漎潃漅滽滶漹漜滼漺漟漍漞漈漡熇熐熉熀熅熂熏煻熆熁熗牄牓犗犕犓獃獍獑獌瑢瑳瑱瑵瑲瑧瑮甀甂甃畽疐瘖瘈瘌瘕瘑瘊瘔皸瞁睼瞅瞂睮瞀睯睾瞃碲碪碴碭碨硾碫碞碥碠碬碢碤禘禊禋禖禕禔禓"
  ],
  [
    "e340",
    "禗禈禒禐稫穊稰稯稨稦窨窫窬竮箈箜箊箑箐箖箍箌箛箎箅箘劄箙箤箂粻粿粼粺綧綷緂綣綪緁緀緅綝緎緄緆緋緌綯綹綖綼綟綦綮綩綡緉罳翢翣翥翞"
  ],
  [
    "e3a1",
    "耤聝聜膉膆膃膇膍膌膋舕蒗蒤蒡蒟蒺蓎蓂蒬蒮蒫蒹蒴蓁蓍蒪蒚蒱蓐蒝蒧蒻蒢蒔蓇蓌蒛蒩蒯蒨蓖蒘蒶蓏蒠蓗蓔蓒蓛蒰蒑虡蜳蜣蜨蝫蝀蜮蜞蜡蜙蜛蝃蜬蝁蜾蝆蜠蜲蜪蜭蜼蜒蜺蜱蜵蝂蜦蜧蜸蜤蜚蜰蜑裷裧裱裲裺裾裮裼裶裻"
  ],
  [
    "e440",
    "裰裬裫覝覡覟覞觩觫觨誫誙誋誒誏誖谽豨豩賕賏賗趖踉踂跿踍跽踊踃踇踆踅跾踀踄輐輑輎輍鄣鄜鄠鄢鄟鄝鄚鄤鄡鄛酺酲酹酳銥銤鉶銛鉺銠銔銪銍"
  ],
  [
    "e4a1",
    "銦銚銫鉹銗鉿銣鋮銎銂銕銢鉽銈銡銊銆銌銙銧鉾銇銩銝銋鈭隞隡雿靘靽靺靾鞃鞀鞂靻鞄鞁靿韎韍頖颭颮餂餀餇馝馜駃馹馻馺駂馽駇骱髣髧鬾鬿魠魡魟鳱鳲鳵麧僿儃儰僸儆儇僶僾儋儌僽儊劋劌勱勯噈噂噌嘵噁噊噉噆噘"
  ],
  [
    "e540",
    "噚噀嘳嘽嘬嘾嘸嘪嘺圚墫墝墱墠墣墯墬墥墡壿嫿嫴嫽嫷嫶嬃嫸嬂嫹嬁嬇嬅嬏屧嶙嶗嶟嶒嶢嶓嶕嶠嶜嶡嶚嶞幩幝幠幜緳廛廞廡彉徲憋憃慹憱憰憢憉"
  ],
  [
    "e5a1",
    "憛憓憯憭憟憒憪憡憍慦憳戭摮摰撖撠撅撗撜撏撋撊撌撣撟摨撱撘敶敺敹敻斲斳暵暰暩暲暷暪暯樀樆樗槥槸樕槱槤樠槿槬槢樛樝槾樧槲槮樔槷槧橀樈槦槻樍槼槫樉樄樘樥樏槶樦樇槴樖歑殥殣殢殦氁氀毿氂潁漦潾澇濆澒"
  ],
  [
    "e640",
    "澍澉澌潢潏澅潚澖潶潬澂潕潲潒潐潗澔澓潝漀潡潫潽潧澐潓澋潩潿澕潣潷潪潻熲熯熛熰熠熚熩熵熝熥熞熤熡熪熜熧熳犘犚獘獒獞獟獠獝獛獡獚獙"
  ],
  [
    "e6a1",
    "獢璇璉璊璆璁瑽璅璈瑼瑹甈甇畾瘥瘞瘙瘝瘜瘣瘚瘨瘛皜皝皞皛瞍瞏瞉瞈磍碻磏磌磑磎磔磈磃磄磉禚禡禠禜禢禛歶稹窲窴窳箷篋箾箬篎箯箹篊箵糅糈糌糋緷緛緪緧緗緡縃緺緦緶緱緰緮緟罶羬羰羭翭翫翪翬翦翨聤聧膣膟"
  ],
  [
    "e740",
    "膞膕膢膙膗舖艏艓艒艐艎艑蔤蔻蔏蔀蔩蔎蔉蔍蔟蔊蔧蔜蓻蔫蓺蔈蔌蓴蔪蓲蔕蓷蓫蓳蓼蔒蓪蓩蔖蓾蔨蔝蔮蔂蓽蔞蓶蔱蔦蓧蓨蓰蓯蓹蔘蔠蔰蔋蔙蔯虢"
  ],
  [
    "e7a1",
    "蝖蝣蝤蝷蟡蝳蝘蝔蝛蝒蝡蝚蝑蝞蝭蝪蝐蝎蝟蝝蝯蝬蝺蝮蝜蝥蝏蝻蝵蝢蝧蝩衚褅褌褔褋褗褘褙褆褖褑褎褉覢覤覣觭觰觬諏諆誸諓諑諔諕誻諗誾諀諅諘諃誺誽諙谾豍貏賥賟賙賨賚賝賧趠趜趡趛踠踣踥踤踮踕踛踖踑踙踦踧"
  ],
  [
    "e840",
    "踔踒踘踓踜踗踚輬輤輘輚輠輣輖輗遳遰遯遧遫鄯鄫鄩鄪鄲鄦鄮醅醆醊醁醂醄醀鋐鋃鋄鋀鋙銶鋏鋱鋟鋘鋩鋗鋝鋌鋯鋂鋨鋊鋈鋎鋦鋍鋕鋉鋠鋞鋧鋑鋓"
  ],
  [
    "e8a1",
    "銵鋡鋆銴镼閬閫閮閰隤隢雓霅霈霂靚鞊鞎鞈韐韏頞頝頦頩頨頠頛頧颲餈飺餑餔餖餗餕駜駍駏駓駔駎駉駖駘駋駗駌骳髬髫髳髲髱魆魃魧魴魱魦魶魵魰魨魤魬鳼鳺鳽鳿鳷鴇鴀鳹鳻鴈鴅鴄麃黓鼏鼐儜儓儗儚儑凞匴叡噰噠噮"
  ],
  [
    "e940",
    "噳噦噣噭噲噞噷圜圛壈墽壉墿墺壂墼壆嬗嬙嬛嬡嬔嬓嬐嬖嬨嬚嬠嬞寯嶬嶱嶩嶧嶵嶰嶮嶪嶨嶲嶭嶯嶴幧幨幦幯廩廧廦廨廥彋徼憝憨憖懅憴懆懁懌憺"
  ],
  [
    "e9a1",
    "憿憸憌擗擖擐擏擉撽撉擃擛擳擙攳敿敼斢曈暾曀曊曋曏暽暻暺曌朣樴橦橉橧樲橨樾橝橭橶橛橑樨橚樻樿橁橪橤橐橏橔橯橩橠樼橞橖橕橍橎橆歕歔歖殧殪殫毈毇氄氃氆澭濋澣濇澼濎濈潞濄澽澞濊澨瀄澥澮澺澬澪濏澿澸"
  ],
  [
    "ea40",
    "澢濉澫濍澯澲澰燅燂熿熸燖燀燁燋燔燊燇燏熽燘熼燆燚燛犝犞獩獦獧獬獥獫獪瑿璚璠璔璒璕璡甋疀瘯瘭瘱瘽瘳瘼瘵瘲瘰皻盦瞚瞝瞡瞜瞛瞢瞣瞕瞙"
  ],
  [
    "eaa1",
    "瞗磝磩磥磪磞磣磛磡磢磭磟磠禤穄穈穇窶窸窵窱窷篞篣篧篝篕篥篚篨篹篔篪篢篜篫篘篟糒糔糗糐糑縒縡縗縌縟縠縓縎縜縕縚縢縋縏縖縍縔縥縤罃罻罼罺羱翯耪耩聬膱膦膮膹膵膫膰膬膴膲膷膧臲艕艖艗蕖蕅蕫蕍蕓蕡蕘"
  ],
  [
    "eb40",
    "蕀蕆蕤蕁蕢蕄蕑蕇蕣蔾蕛蕱蕎蕮蕵蕕蕧蕠薌蕦蕝蕔蕥蕬虣虥虤螛螏螗螓螒螈螁螖螘蝹螇螣螅螐螑螝螄螔螜螚螉褞褦褰褭褮褧褱褢褩褣褯褬褟觱諠"
  ],
  [
    "eba1",
    "諢諲諴諵諝謔諤諟諰諈諞諡諨諿諯諻貑貒貐賵賮賱賰賳赬赮趥趧踳踾踸蹀蹅踶踼踽蹁踰踿躽輶輮輵輲輹輷輴遶遹遻邆郺鄳鄵鄶醓醐醑醍醏錧錞錈錟錆錏鍺錸錼錛錣錒錁鍆錭錎錍鋋錝鋺錥錓鋹鋷錴錂錤鋿錩錹錵錪錔錌"
  ],
  [
    "ec40",
    "錋鋾錉錀鋻錖閼闍閾閹閺閶閿閵閽隩雔霋霒霐鞙鞗鞔韰韸頵頯頲餤餟餧餩馞駮駬駥駤駰駣駪駩駧骹骿骴骻髶髺髹髷鬳鮀鮅鮇魼魾魻鮂鮓鮒鮐魺鮕"
  ],
  [
    "eca1",
    "魽鮈鴥鴗鴠鴞鴔鴩鴝鴘鴢鴐鴙鴟麈麆麇麮麭黕黖黺鼒鼽儦儥儢儤儠儩勴嚓嚌嚍嚆嚄嚃噾嚂噿嚁壖壔壏壒嬭嬥嬲嬣嬬嬧嬦嬯嬮孻寱寲嶷幬幪徾徻懃憵憼懧懠懥懤懨懞擯擩擣擫擤擨斁斀斶旚曒檍檖檁檥檉檟檛檡檞檇檓檎"
  ],
  [
    "ed40",
    "檕檃檨檤檑橿檦檚檅檌檒歛殭氉濌澩濴濔濣濜濭濧濦濞濲濝濢濨燡燱燨燲燤燰燢獳獮獯璗璲璫璐璪璭璱璥璯甐甑甒甏疄癃癈癉癇皤盩瞵瞫瞲瞷瞶"
  ],
  [
    "eda1",
    "瞴瞱瞨矰磳磽礂磻磼磲礅磹磾礄禫禨穜穛穖穘穔穚窾竀竁簅簏篲簀篿篻簎篴簋篳簂簉簃簁篸篽簆篰篱簐簊糨縭縼繂縳顈縸縪繉繀繇縩繌縰縻縶繄縺罅罿罾罽翴翲耬膻臄臌臊臅臇膼臩艛艚艜薃薀薏薧薕薠薋薣蕻薤薚薞"
  ],
  [
    "ee40",
    "蕷蕼薉薡蕺蕸蕗薎薖薆薍薙薝薁薢薂薈薅蕹蕶薘薐薟虨螾螪螭蟅螰螬螹螵螼螮蟉蟃蟂蟌螷螯蟄蟊螴螶螿螸螽蟞螲褵褳褼褾襁襒褷襂覭覯覮觲觳謞"
  ],
  [
    "eea1",
    "謘謖謑謅謋謢謏謒謕謇謍謈謆謜謓謚豏豰豲豱豯貕貔賹赯蹎蹍蹓蹐蹌蹇轃轀邅遾鄸醚醢醛醙醟醡醝醠鎡鎃鎯鍤鍖鍇鍼鍘鍜鍶鍉鍐鍑鍠鍭鎏鍌鍪鍹鍗鍕鍒鍏鍱鍷鍻鍡鍞鍣鍧鎀鍎鍙闇闀闉闃闅閷隮隰隬霠霟霘霝霙鞚鞡鞜"
  ],
  [
    "ef40",
    "鞞鞝韕韔韱顁顄顊顉顅顃餥餫餬餪餳餲餯餭餱餰馘馣馡騂駺駴駷駹駸駶駻駽駾駼騃骾髾髽鬁髼魈鮚鮨鮞鮛鮦鮡鮥鮤鮆鮢鮠鮯鴳鵁鵧鴶鴮鴯鴱鴸鴰"
  ],
  [
    "efa1",
    "鵅鵂鵃鴾鴷鵀鴽翵鴭麊麉麍麰黈黚黻黿鼤鼣鼢齔龠儱儭儮嚘嚜嚗嚚嚝嚙奰嬼屩屪巀幭幮懘懟懭懮懱懪懰懫懖懩擿攄擽擸攁攃擼斔旛曚曛曘櫅檹檽櫡櫆檺檶檷櫇檴檭歞毉氋瀇瀌瀍瀁瀅瀔瀎濿瀀濻瀦濼濷瀊爁燿燹爃燽獶"
  ],
  [
    "f040",
    "璸瓀璵瓁璾璶璻瓂甔甓癜癤癙癐癓癗癚皦皽盬矂瞺磿礌礓礔礉礐礒礑禭禬穟簜簩簙簠簟簭簝簦簨簢簥簰繜繐繖繣繘繢繟繑繠繗繓羵羳翷翸聵臑臒"
  ],
  [
    "f0a1",
    "臐艟艞薴藆藀藃藂薳薵薽藇藄薿藋藎藈藅薱薶藒蘤薸薷薾虩蟧蟦蟢蟛蟫蟪蟥蟟蟳蟤蟔蟜蟓蟭蟘蟣螤蟗蟙蠁蟴蟨蟝襓襋襏襌襆襐襑襉謪謧謣謳謰謵譇謯謼謾謱謥謷謦謶謮謤謻謽謺豂豵貙貘貗賾贄贂贀蹜蹢蹠蹗蹖蹞蹥蹧"
  ],
  [
    "f140",
    "蹛蹚蹡蹝蹩蹔轆轇轈轋鄨鄺鄻鄾醨醥醧醯醪鎵鎌鎒鎷鎛鎝鎉鎧鎎鎪鎞鎦鎕鎈鎙鎟鎍鎱鎑鎲鎤鎨鎴鎣鎥闒闓闑隳雗雚巂雟雘雝霣霢霥鞬鞮鞨鞫鞤鞪"
  ],
  [
    "f1a1",
    "鞢鞥韗韙韖韘韺顐顑顒颸饁餼餺騏騋騉騍騄騑騊騅騇騆髀髜鬈鬄鬅鬩鬵魊魌魋鯇鯆鯃鮿鯁鮵鮸鯓鮶鯄鮹鮽鵜鵓鵏鵊鵛鵋鵙鵖鵌鵗鵒鵔鵟鵘鵚麎麌黟鼁鼀鼖鼥鼫鼪鼩鼨齌齕儴儵劖勷厴嚫嚭嚦嚧嚪嚬壚壝壛夒嬽嬾嬿巃幰"
  ],
  [
    "f240",
    "徿懻攇攐攍攉攌攎斄旞旝曞櫧櫠櫌櫑櫙櫋櫟櫜櫐櫫櫏櫍櫞歠殰氌瀙瀧瀠瀖瀫瀡瀢瀣瀩瀗瀤瀜瀪爌爊爇爂爅犥犦犤犣犡瓋瓅璷瓃甖癠矉矊矄矱礝礛"
  ],
  [
    "f2a1",
    "礡礜礗礞禰穧穨簳簼簹簬簻糬糪繶繵繸繰繷繯繺繲繴繨罋罊羃羆羷翽翾聸臗臕艤艡艣藫藱藭藙藡藨藚藗藬藲藸藘藟藣藜藑藰藦藯藞藢蠀蟺蠃蟶蟷蠉蠌蠋蠆蟼蠈蟿蠊蠂襢襚襛襗襡襜襘襝襙覈覷覶觶譐譈譊譀譓譖譔譋譕"
  ],
  [
    "f340",
    "譑譂譒譗豃豷豶貚贆贇贉趬趪趭趫蹭蹸蹳蹪蹯蹻軂轒轑轏轐轓辴酀鄿醰醭鏞鏇鏏鏂鏚鏐鏹鏬鏌鏙鎩鏦鏊鏔鏮鏣鏕鏄鏎鏀鏒鏧镽闚闛雡霩霫霬霨霦"
  ],
  [
    "f3a1",
    "鞳鞷鞶韝韞韟顜顙顝顗颿颽颻颾饈饇饃馦馧騚騕騥騝騤騛騢騠騧騣騞騜騔髂鬋鬊鬎鬌鬷鯪鯫鯠鯞鯤鯦鯢鯰鯔鯗鯬鯜鯙鯥鯕鯡鯚鵷鶁鶊鶄鶈鵱鶀鵸鶆鶋鶌鵽鵫鵴鵵鵰鵩鶅鵳鵻鶂鵯鵹鵿鶇鵨麔麑黀黼鼭齀齁齍齖齗齘匷嚲"
  ],
  [
    "f440",
    "嚵嚳壣孅巆巇廮廯忀忁懹攗攖攕攓旟曨曣曤櫳櫰櫪櫨櫹櫱櫮櫯瀼瀵瀯瀷瀴瀱灂瀸瀿瀺瀹灀瀻瀳灁爓爔犨獽獼璺皫皪皾盭矌矎矏矍矲礥礣礧礨礤礩"
  ],
  [
    "f4a1",
    "禲穮穬穭竷籉籈籊籇籅糮繻繾纁纀羺翿聹臛臙舋艨艩蘢藿蘁藾蘛蘀藶蘄蘉蘅蘌藽蠙蠐蠑蠗蠓蠖襣襦覹觷譠譪譝譨譣譥譧譭趮躆躈躄轙轖轗轕轘轚邍酃酁醷醵醲醳鐋鐓鏻鐠鐏鐔鏾鐕鐐鐨鐙鐍鏵鐀鏷鐇鐎鐖鐒鏺鐉鏸鐊鏿"
  ],
  [
    "f540",
    "鏼鐌鏶鐑鐆闞闠闟霮霯鞹鞻韽韾顠顢顣顟飁飂饐饎饙饌饋饓騲騴騱騬騪騶騩騮騸騭髇髊髆鬐鬒鬑鰋鰈鯷鰅鰒鯸鱀鰇鰎鰆鰗鰔鰉鶟鶙鶤鶝鶒鶘鶐鶛"
  ],
  [
    "f5a1",
    "鶠鶔鶜鶪鶗鶡鶚鶢鶨鶞鶣鶿鶩鶖鶦鶧麙麛麚黥黤黧黦鼰鼮齛齠齞齝齙龑儺儹劘劗囃嚽嚾孈孇巋巏廱懽攛欂櫼欃櫸欀灃灄灊灈灉灅灆爝爚爙獾甗癪矐礭礱礯籔籓糲纊纇纈纋纆纍罍羻耰臝蘘蘪蘦蘟蘣蘜蘙蘧蘮蘡蘠蘩蘞蘥"
  ],
  [
    "f640",
    "蠩蠝蠛蠠蠤蠜蠫衊襭襩襮襫觺譹譸譅譺譻贐贔趯躎躌轞轛轝酆酄酅醹鐿鐻鐶鐩鐽鐼鐰鐹鐪鐷鐬鑀鐱闥闤闣霵霺鞿韡顤飉飆飀饘饖騹騽驆驄驂驁騺"
  ],
  [
    "f6a1",
    "騿髍鬕鬗鬘鬖鬺魒鰫鰝鰜鰬鰣鰨鰩鰤鰡鶷鶶鶼鷁鷇鷊鷏鶾鷅鷃鶻鶵鷎鶹鶺鶬鷈鶱鶭鷌鶳鷍鶲鹺麜黫黮黭鼛鼘鼚鼱齎齥齤龒亹囆囅囋奱孋孌巕巑廲攡攠攦攢欋欈欉氍灕灖灗灒爞爟犩獿瓘瓕瓙瓗癭皭礵禴穰穱籗籜籙籛籚"
  ],
  [
    "f740",
    "糴糱纑罏羇臞艫蘴蘵蘳蘬蘲蘶蠬蠨蠦蠪蠥襱覿覾觻譾讄讂讆讅譿贕躕躔躚躒躐躖躗轠轢酇鑌鑐鑊鑋鑏鑇鑅鑈鑉鑆霿韣顪顩飋饔饛驎驓驔驌驏驈驊"
  ],
  [
    "f7a1",
    "驉驒驐髐鬙鬫鬻魖魕鱆鱈鰿鱄鰹鰳鱁鰼鰷鰴鰲鰽鰶鷛鷒鷞鷚鷋鷐鷜鷑鷟鷩鷙鷘鷖鷵鷕鷝麶黰鼵鼳鼲齂齫龕龢儽劙壨壧奲孍巘蠯彏戁戃戄攩攥斖曫欑欒欏毊灛灚爢玂玁玃癰矔籧籦纕艬蘺虀蘹蘼蘱蘻蘾蠰蠲蠮蠳襶襴襳觾"
  ],
  [
    "f840",
    "讌讎讋讈豅贙躘轤轣醼鑢鑕鑝鑗鑞韄韅頀驖驙鬞鬟鬠鱒鱘鱐鱊鱍鱋鱕鱙鱌鱎鷻鷷鷯鷣鷫鷸鷤鷶鷡鷮鷦鷲鷰鷢鷬鷴鷳鷨鷭黂黐黲黳鼆鼜鼸鼷鼶齃齏"
  ],
  [
    "f8a1",
    "齱齰齮齯囓囍孎屭攭曭曮欓灟灡灝灠爣瓛瓥矕礸禷禶籪纗羉艭虃蠸蠷蠵衋讔讕躞躟躠躝醾醽釂鑫鑨鑩雥靆靃靇韇韥驞髕魙鱣鱧鱦鱢鱞鱠鸂鷾鸇鸃鸆鸅鸀鸁鸉鷿鷽鸄麠鼞齆齴齵齶囔攮斸欘欙欗欚灢爦犪矘矙礹籩籫糶纚"
  ],
  [
    "f940",
    "纘纛纙臠臡虆虇虈襹襺襼襻觿讘讙躥躤躣鑮鑭鑯鑱鑳靉顲饟鱨鱮鱭鸋鸍鸐鸏鸒鸑麡黵鼉齇齸齻齺齹圞灦籯蠼趲躦釃鑴鑸鑶鑵驠鱴鱳鱱鱵鸔鸓黶鼊"
  ],
  [
    "f9a1",
    "龤灨灥糷虪蠾蠽蠿讞貜躩軉靋顳顴飌饡馫驤驦驧鬤鸕鸗齈戇欞爧虌躨钂钀钁驩驨鬮鸙爩虋讟钃鱹麷癵驫鱺鸝灩灪麤齾齉龘碁銹裏墻恒粧嫺╔╦╗╠╬╣╚╩╝╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜║═╭╮╰╯▓"
  ]
], bu = [
  [
    "8740",
    "䏰䰲䘃䖦䕸𧉧䵷䖳𧲱䳢𧳅㮕䜶䝄䱇䱀𤊿𣘗𧍒𦺋𧃒䱗𪍑䝏䗚䲅𧱬䴇䪤䚡𦬣爥𥩔𡩣𣸆𣽡晍囻"
  ],
  [
    "8767",
    "綕夝𨮹㷴霴𧯯寛𡵞媤㘥𩺰嫑宷峼杮薓𩥅瑡璝㡵𡵓𣚞𦀡㻬"
  ],
  [
    "87a1",
    "𥣞㫵竼龗𤅡𨤍𣇪𠪊𣉞䌊蒄龖鐯䤰蘓墖靊鈘秐稲晠権袝瑌篅枂稬剏遆㓦珄𥶹瓆鿇垳䤯呌䄱𣚎堘穲𧭥讏䚮𦺈䆁𥶙箮𢒼鿈𢓁𢓉𢓌鿉蔄𣖻䂴鿊䓡𪷿拁灮鿋"
  ],
  [
    "8840",
    "㇀",
    4,
    "𠄌㇅𠃑𠃍㇆㇇𠃋𡿨㇈𠃊㇉㇊㇋㇌𠄎㇍㇎ĀÁǍÀĒÉĚÈŌÓǑÒ࿿Ê̄Ế࿿Ê̌ỀÊāáǎàɑēéěèīíǐìōóǒòūúǔùǖǘǚ"
  ],
  [
    "88a1",
    "ǜü࿿ê̄ế࿿ê̌ềêɡ⏚⏛"
  ],
  [
    "8940",
    "𪎩𡅅"
  ],
  [
    "8943",
    "攊"
  ],
  [
    "8946",
    "丽滝鵎釟"
  ],
  [
    "894c",
    "𧜵撑会伨侨兖兴农凤务动医华发变团声处备夲头学实実岚庆总斉柾栄桥济炼电纤纬纺织经统缆缷艺苏药视设询车轧轮"
  ],
  [
    "89a1",
    "琑糼緍楆竉刧"
  ],
  [
    "89ab",
    "醌碸酞肼"
  ],
  [
    "89b0",
    "贋胶𠧧"
  ],
  [
    "89b5",
    "肟黇䳍鷉鸌䰾𩷶𧀎鸊𪄳㗁"
  ],
  [
    "89c1",
    "溚舾甙"
  ],
  [
    "89c5",
    "䤑马骏龙禇𨑬𡷊𠗐𢫦两亁亀亇亿仫伷㑌侽㹈倃傈㑽㒓㒥円夅凛凼刅争剹劐匧㗇厩㕑厰㕓参吣㕭㕲㚁咓咣咴咹哐哯唘唣唨㖘唿㖥㖿嗗㗅"
  ],
  [
    "8a40",
    "𧶄唥"
  ],
  [
    "8a43",
    "𠱂𠴕𥄫喐𢳆㧬𠍁蹆𤶸𩓥䁓𨂾睺𢰸㨴䟕𨅝𦧲𤷪擝𠵼𠾴𠳕𡃴撍蹾𠺖𠰋𠽤𢲩𨉖𤓓"
  ],
  [
    "8a64",
    "𠵆𩩍𨃩䟴𤺧𢳂骲㩧𩗴㿭㔆𥋇𩟔𧣈𢵄鵮頕"
  ],
  [
    "8a76",
    "䏙𦂥撴哣𢵌𢯊𡁷㧻𡁯"
  ],
  [
    "8aa1",
    "𦛚𦜖𧦠擪𥁒𠱃蹨𢆡𨭌𠜱"
  ],
  [
    "8aac",
    "䠋𠆩㿺塳𢶍"
  ],
  [
    "8ab2",
    "𤗈𠓼𦂗𠽌𠶖啹䂻䎺"
  ],
  [
    "8abb",
    "䪴𢩦𡂝膪飵𠶜捹㧾𢝵跀嚡摼㹃"
  ],
  [
    "8ac9",
    "𪘁𠸉𢫏𢳉"
  ],
  [
    "8ace",
    "𡃈𣧂㦒㨆𨊛㕸𥹉𢃇噒𠼱𢲲𩜠㒼氽𤸻"
  ],
  [
    "8adf",
    "𧕴𢺋𢈈𪙛𨳍𠹺𠰴𦠜羓𡃏𢠃𢤹㗻𥇣𠺌𠾍𠺪㾓𠼰𠵇𡅏𠹌"
  ],
  [
    "8af6",
    "𠺫𠮩𠵈𡃀𡄽㿹𢚖搲𠾭"
  ],
  [
    "8b40",
    "𣏴𧘹𢯎𠵾𠵿𢱑𢱕㨘𠺘𡃇𠼮𪘲𦭐𨳒𨶙𨳊閪哌苄喹"
  ],
  [
    "8b55",
    "𩻃鰦骶𧝞𢷮煀腭胬尜𦕲脴㞗卟𨂽醶𠻺𠸏𠹷𠻻㗝𤷫㘉𠳖嚯𢞵𡃉𠸐𠹸𡁸𡅈𨈇𡑕𠹹𤹐𢶤婔𡀝𡀞𡃵𡃶垜𠸑"
  ],
  [
    "8ba1",
    "𧚔𨋍𠾵𠹻𥅾㜃𠾶𡆀𥋘𪊽𤧚𡠺𤅷𨉼墙剨㘚𥜽箲孨䠀䬬鼧䧧鰟鮍𥭴𣄽嗻㗲嚉丨夂𡯁屮靑𠂆乛亻㔾尣彑忄㣺扌攵歺氵氺灬爫丬犭𤣩罒礻糹罓𦉪㓁"
  ],
  [
    "8bde",
    "𦍋耂肀𦘒𦥑卝衤见𧢲讠贝钅镸长门𨸏韦页风飞饣𩠐鱼鸟黄歯龜丷𠂇阝户钢"
  ],
  [
    "8c40",
    "倻淾𩱳龦㷉袏𤅎灷峵䬠𥇍㕙𥴰愢𨨲辧釶熑朙玺𣊁𪄇㲋𡦀䬐磤琂冮𨜏䀉橣𪊺䈣蘏𠩯稪𩥇𨫪靕灍匤𢁾鏴盙𨧣龧矝亣俰傼丯众龨吴綋墒壐𡶶庒庙忂𢜒斋"
  ],
  [
    "8ca1",
    "𣏹椙橃𣱣泿"
  ],
  [
    "8ca7",
    "爀𤔅玌㻛𤨓嬕璹讃𥲤𥚕窓篬糃繬苸薗龩袐龪躹龫迏蕟駠鈡龬𨶹𡐿䁱䊢娚"
  ],
  [
    "8cc9",
    "顨杫䉶圽"
  ],
  [
    "8cce",
    "藖𤥻芿𧄍䲁𦵴嵻𦬕𦾾龭龮宖龯曧繛湗秊㶈䓃𣉖𢞖䎚䔶"
  ],
  [
    "8ce6",
    "峕𣬚諹屸㴒𣕑嵸龲煗䕘𤃬𡸣䱷㥸㑊𠆤𦱁諌侴𠈹妿腬顖𩣺弻"
  ],
  [
    "8d40",
    "𠮟"
  ],
  [
    "8d42",
    "𢇁𨥭䄂䚻𩁹㼇龳𪆵䃸㟖䛷𦱆䅼𨚲𧏿䕭㣔𥒚䕡䔛䶉䱻䵶䗪㿈𤬏㙡䓞䒽䇭崾嵈嵖㷼㠏嶤嶹㠠㠸幂庽弥徃㤈㤔㤿㥍惗愽峥㦉憷憹懏㦸戬抐拥挘㧸嚱"
  ],
  [
    "8da1",
    "㨃揢揻搇摚㩋擀崕嘡龟㪗斆㪽旿晓㫲暒㬢朖㭂枤栀㭘桊梄㭲㭱㭻椉楃牜楤榟榅㮼槖㯝橥橴橱檂㯬檙㯲檫檵櫔櫶殁毁毪汵沪㳋洂洆洦涁㳯涤涱渕渘温溆𨧀溻滢滚齿滨滩漤漴㵆𣽁澁澾㵪㵵熷岙㶊瀬㶑灐灔灯灿炉𠌥䏁㗱𠻘"
  ],
  [
    "8e40",
    "𣻗垾𦻓焾𥟠㙎榢𨯩孴穉𥣡𩓙穥穽𥦬窻窰竂竃燑𦒍䇊竚竝竪䇯咲𥰁笋筕笩𥌎𥳾箢筯莜𥮴𦱿篐萡箒箸𥴠㶭𥱥蒒篺簆簵𥳁籄粃𤢂粦晽𤕸糉糇糦籴糳糵糎"
  ],
  [
    "8ea1",
    "繧䔝𦹄絝𦻖璍綉綫焵綳緒𤁗𦀩緤㴓緵𡟹緥𨍭縝𦄡𦅚繮纒䌫鑬縧罀罁罇礶𦋐駡羗𦍑羣𡙡𠁨䕜𣝦䔃𨌺翺𦒉者耈耝耨耯𪂇𦳃耻耼聡𢜔䦉𦘦𣷣𦛨朥肧𨩈脇脚墰𢛶汿𦒘𤾸擧𡒊舘𡡞橓𤩥𤪕䑺舩𠬍𦩒𣵾俹𡓽蓢荢𦬊𤦧𣔰𡝳𣷸芪椛芳䇛"
  ],
  [
    "8f40",
    "蕋苐茚𠸖𡞴㛁𣅽𣕚艻苢茘𣺋𦶣𦬅𦮗𣗎㶿茝嗬莅䔋𦶥莬菁菓㑾𦻔橗蕚㒖𦹂𢻯葘𥯤葱㷓䓤檧葊𣲵祘蒨𦮖𦹷𦹃蓞萏莑䒠蒓蓤𥲑䉀𥳀䕃蔴嫲𦺙䔧蕳䔖枿蘖"
  ],
  [
    "8fa1",
    "𨘥𨘻藁𧂈蘂𡖂𧃍䕫䕪蘨㙈𡢢号𧎚虾蝱𪃸蟮𢰧螱蟚蠏噡虬桖䘏衅衆𧗠𣶹𧗤衞袜䙛袴袵揁装睷𧜏覇覊覦覩覧覼𨨥觧𧤤𧪽誜瞓釾誐𧩙竩𧬺𣾏䜓𧬸煼謌謟𥐰𥕥謿譌譍誩𤩺讐讛誯𡛟䘕衏貛𧵔𧶏貫㜥𧵓賖𧶘𧶽贒贃𡤐賛灜贑𤳉㻐起"
  ],
  [
    "9040",
    "趩𨀂𡀔𤦊㭼𨆼𧄌竧躭躶軃鋔輙輭𨍥𨐒辥錃𪊟𠩐辳䤪𨧞𨔽𣶻廸𣉢迹𪀔𨚼𨔁𢌥㦀𦻗逷𨔼𧪾遡𨕬𨘋邨𨜓郄𨛦邮都酧㫰醩釄粬𨤳𡺉鈎沟鉁鉢𥖹銹𨫆𣲛𨬌𥗛"
  ],
  [
    "90a1",
    "𠴱錬鍫𨫡𨯫炏嫃𨫢𨫥䥥鉄𨯬𨰹𨯿鍳鑛躼閅閦鐦閠濶䊹𢙺𨛘𡉼𣸮䧟氜陻隖䅬隣𦻕懚隶磵𨫠隽双䦡𦲸𠉴𦐐𩂯𩃥𤫑𡤕𣌊霱虂霶䨏䔽䖅𤫩灵孁霛靜𩇕靗孊𩇫靟鐥僐𣂷𣂼鞉鞟鞱鞾韀韒韠𥑬韮琜𩐳響韵𩐝𧥺䫑頴頳顋顦㬎𧅵㵑𠘰𤅜"
  ],
  [
    "9140",
    "𥜆飊颷飈飇䫿𦴧𡛓喰飡飦飬鍸餹𤨩䭲𩡗𩤅駵騌騻騐驘𥜥㛄𩂱𩯕髠髢𩬅髴䰎鬔鬭𨘀倴鬴𦦨㣃𣁽魐魀𩴾婅𡡣鮎𤉋鰂鯿鰌𩹨鷔𩾷𪆒𪆫𪃡𪄣𪇟鵾鶃𪄴鸎梈"
  ],
  [
    "91a1",
    "鷄𢅛𪆓𪈠𡤻𪈳鴹𪂹𪊴麐麕麞麢䴴麪麯𤍤黁㭠㧥㴝伲㞾𨰫鼂鼈䮖鐤𦶢鼗鼖鼹嚟嚊齅馸𩂋韲葿齢齩竜龎爖䮾𤥵𤦻煷𤧸𤍈𤩑玞𨯚𡣺禟𨥾𨸶鍩鏳𨩄鋬鎁鏋𨥬𤒹爗㻫睲穃烐𤑳𤏸煾𡟯炣𡢾𣖙㻇𡢅𥐯𡟸㜢𡛻𡠹㛡𡝴𡣑𥽋㜣𡛀坛𤨥𡏾𡊨"
  ],
  [
    "9240",
    "𡏆𡒶蔃𣚦蔃葕𤦔𧅥𣸱𥕜𣻻𧁒䓴𣛮𩦝𦼦柹㜳㰕㷧塬𡤢栐䁗𣜿𤃡𤂋𤄏𦰡哋嚞𦚱嚒𠿟𠮨𠸍鏆𨬓鎜仸儫㠙𤐶亼𠑥𠍿佋侊𥙑婨𠆫𠏋㦙𠌊𠐔㐵伩𠋀𨺳𠉵諚𠈌亘"
  ],
  [
    "92a1",
    "働儍侢伃𤨎𣺊佂倮偬傁俌俥偘僼兙兛兝兞湶𣖕𣸹𣺿浲𡢄𣺉冨凃𠗠䓝𠒣𠒒𠒑赺𨪜𠜎剙劤𠡳勡鍮䙺熌𤎌𠰠𤦬𡃤槑𠸝瑹㻞璙琔瑖玘䮎𤪼𤂍叐㖄爏𤃉喴𠍅响𠯆圝鉝雴鍦埝垍坿㘾壋媙𨩆𡛺𡝯𡜐娬妸銏婾嫏娒𥥆𡧳𡡡𤊕㛵洅瑃娡𥺃"
  ],
  [
    "9340",
    "媁𨯗𠐓鏠璌𡌃焅䥲鐈𨧻鎽㞠尞岞幞幈𡦖𡥼𣫮廍孏𡤃𡤄㜁𡢠㛝𡛾㛓脪𨩇𡶺𣑲𨦨弌弎𡤧𡞫婫𡜻孄蘔𧗽衠恾𢡠𢘫忛㺸𢖯𢖾𩂈𦽳懀𠀾𠁆𢘛憙憘恵𢲛𢴇𤛔𩅍"
  ],
  [
    "93a1",
    "摱𤙥𢭪㨩𢬢𣑐𩣪𢹸挷𪑛撶挱揑𤧣𢵧护𢲡搻敫楲㯴𣂎𣊭𤦉𣊫唍𣋠𡣙𩐿曎𣊉𣆳㫠䆐𥖄𨬢𥖏𡛼𥕛𥐥磮𣄃𡠪𣈴㑤𣈏𣆂𤋉暎𦴤晫䮓昰𧡰𡷫晣𣋒𣋡昞𥡲㣑𣠺𣞼㮙𣞢𣏾瓐㮖枏𤘪梶栞㯄檾㡣𣟕𤒇樳橒櫉欅𡤒攑梘橌㯗橺歗𣿀𣲚鎠鋲𨯪𨫋"
  ],
  [
    "9440",
    "銉𨀞𨧜鑧涥漋𤧬浧𣽿㶏渄𤀼娽渊塇洤硂焻𤌚𤉶烱牐犇犔𤞏𤜥兹𤪤𠗫瑺𣻸𣙟𤩊𤤗𥿡㼆㺱𤫟𨰣𣼵悧㻳瓌琼鎇琷䒟𦷪䕑疃㽣𤳙𤴆㽘畕癳𪗆㬙瑨𨫌𤦫𤦎㫻"
  ],
  [
    "94a1",
    "㷍𤩎㻿𤧅𤣳釺圲鍂𨫣𡡤僟𥈡𥇧睸𣈲眎眏睻𤚗𣞁㩞𤣰琸璛㺿𤪺𤫇䃈𤪖𦆮錇𥖁砞碍碈磒珐祙𧝁𥛣䄎禛蒖禥樭𣻺稺秴䅮𡛦䄲鈵秱𠵌𤦌𠊙𣶺𡝮㖗啫㕰㚪𠇔𠰍竢婙𢛵𥪯𥪜娍𠉛磰娪𥯆竾䇹籝籭䈑𥮳𥺼𥺦糍𤧹𡞰粎籼粮檲緜縇緓罎𦉡"
  ],
  [
    "9540",
    "𦅜𧭈綗𥺂䉪𦭵𠤖柖𠁎𣗏埄𦐒𦏸𤥢翝笧𠠬𥫩𥵃笌𥸎駦虅驣樜𣐿㧢𤧷𦖭騟𦖠蒀𧄧𦳑䓪脷䐂胆脉腂𦞴飃𦩂艢艥𦩑葓𦶧蘐𧈛媆䅿𡡀嬫𡢡嫤𡣘蚠蜨𣶏蠭𧐢娂"
  ],
  [
    "95a1",
    "衮佅袇袿裦襥襍𥚃襔𧞅𧞄𨯵𨯙𨮜𨧹㺭蒣䛵䛏㟲訽訜𩑈彍鈫𤊄旔焩烄𡡅鵭貟賩𧷜妚矃姰䍮㛔踪躧𤰉輰轊䋴汘澻𢌡䢛潹溋𡟚鯩㚵𤤯邻邗啱䤆醻鐄𨩋䁢𨫼鐧𨰝𨰻蓥訫閙閧閗閖𨴴瑅㻂𤣿𤩂𤏪㻧𣈥随𨻧𨹦𨹥㻌𤧭𤩸𣿮琒瑫㻼靁𩂰"
  ],
  [
    "9640",
    "桇䨝𩂓𥟟靝鍨𨦉𨰦𨬯𦎾銺嬑譩䤼珹𤈛鞛靱餸𠼦巁𨯅𤪲頟𩓚鋶𩗗釥䓀𨭐𤩧𨭤飜𨩅㼀鈪䤥萔餻饍𧬆㷽馛䭯馪驜𨭥𥣈檏騡嫾騯𩣱䮐𩥈馼䮽䮗鍽塲𡌂堢𤦸"
  ],
  [
    "96a1",
    "𡓨硄𢜟𣶸棅㵽鑘㤧慐𢞁𢥫愇鱏鱓鱻鰵鰐魿鯏𩸭鮟𪇵𪃾鴡䲮𤄄鸘䲰鴌𪆴𪃭𪃳𩤯鶥蒽𦸒𦿟𦮂藼䔳𦶤𦺄𦷰萠藮𦸀𣟗𦁤秢𣖜𣙀䤭𤧞㵢鏛銾鍈𠊿碹鉷鑍俤㑀遤𥕝砽硔碶硋𡝗𣇉𤥁㚚佲濚濙瀞瀞吔𤆵垻壳垊鴖埗焴㒯𤆬燫𦱀𤾗嬨𡞵𨩉"
  ],
  [
    "9740",
    "愌嫎娋䊼𤒈㜬䭻𨧼鎻鎸𡣖𠼝葲𦳀𡐓𤋺𢰦𤏁妔𣶷𦝁綨𦅛𦂤𤦹𤦋𨧺鋥珢㻩璴𨭣𡢟㻡𤪳櫘珳珻㻖𤨾𤪔𡟙𤩦𠎧𡐤𤧥瑈𤤖炥𤥶銄珦鍟𠓾錱𨫎𨨖鎆𨯧𥗕䤵𨪂煫"
  ],
  [
    "97a1",
    "𤥃𠳿嚤𠘚𠯫𠲸唂秄𡟺緾𡛂𤩐𡡒䔮鐁㜊𨫀𤦭妰𡢿𡢃𧒄媡㛢𣵛㚰鉟婹𨪁𡡢鍴㳍𠪴䪖㦊僴㵩㵌𡎜煵䋻𨈘渏𩃤䓫浗𧹏灧沯㳖𣿭𣸭渂漌㵯𠏵畑㚼㓈䚀㻚䡱姄鉮䤾轁𨰜𦯀堒埈㛖𡑒烾𤍢𤩱𢿣𡊰𢎽梹楧𡎘𣓥𧯴𣛟𨪃𣟖𣏺𤲟樚𣚭𦲷萾䓟䓎"
  ],
  [
    "9840",
    "𦴦𦵑𦲂𦿞漗𧄉茽𡜺菭𦲀𧁓𡟛妉媂𡞳婡婱𡤅𤇼㜭姯𡜼㛇熎鎐暚𤊥婮娫𤊓樫𣻹𧜶𤑛𤋊焝𤉙𨧡侰𦴨峂𤓎𧹍𤎽樌𤉖𡌄炦焳𤏩㶥泟勇𤩏繥姫崯㷳彜𤩝𡟟綤萦"
  ],
  [
    "98a1",
    "咅𣫺𣌀𠈔坾𠣕𠘙㿥𡾞𪊶瀃𩅛嵰玏糓𨩙𩐠俈翧狍猐𧫴猸猹𥛶獁獈㺩𧬘遬燵𤣲珡臶㻊県㻑沢国琙琞琟㻢㻰㻴㻺瓓㼎㽓畂畭畲疍㽼痈痜㿀癍㿗癴㿜発𤽜熈嘣覀塩䀝睃䀹条䁅㗛瞘䁪䁯属瞾矋売砘点砜䂨砹硇硑硦葈𥔵礳栃礲䄃"
  ],
  [
    "9940",
    "䄉禑禙辻稆込䅧窑䆲窼艹䇄竏竛䇏両筢筬筻簒簛䉠䉺类粜䊌粸䊔糭输烀𠳏総緔緐緽羮羴犟䎗耠耥笹耮耱联㷌垴炠肷胩䏭脌猪脎脒畠脔䐁㬹腖腙腚"
  ],
  [
    "99a1",
    "䐓堺腼膄䐥膓䐭膥埯臁臤艔䒏芦艶苊苘苿䒰荗险榊萅烵葤惣蒈䔄蒾蓡蓸蔐蔸蕒䔻蕯蕰藠䕷虲蚒蚲蛯际螋䘆䘗袮裿褤襇覑𧥧訩訸誔誴豑賔賲贜䞘塟跃䟭仮踺嗘坔蹱嗵躰䠷軎転軤軭軲辷迁迊迌逳駄䢭飠鈓䤞鈨鉘鉫銱銮銿"
  ],
  [
    "9a40",
    "鋣鋫鋳鋴鋽鍃鎄鎭䥅䥑麿鐗匁鐝鐭鐾䥪鑔鑹锭関䦧间阳䧥枠䨤靀䨵鞲韂噔䫤惨颹䬙飱塄餎餙冴餜餷饂饝饢䭰駅䮝騼鬏窃魩鮁鯝鯱鯴䱭鰠㝯𡯂鵉鰺"
  ],
  [
    "9aa1",
    "黾噐鶓鶽鷀鷼银辶鹻麬麱麽黆铜黢黱黸竈齄𠂔𠊷𠎠椚铃妬𠓗塀铁㞹𠗕𠘕𠙶𡚺块煳𠫂𠫍𠮿呪吆𠯋咞𠯻𠰻𠱓𠱥𠱼惧𠲍噺𠲵𠳝𠳭𠵯𠶲𠷈楕鰯螥𠸄𠸎𠻗𠾐𠼭𠹳尠𠾼帋𡁜𡁏𡁶朞𡁻𡂈𡂖㙇𡂿𡃓𡄯𡄻卤蒭𡋣𡍵𡌶讁𡕷𡘙𡟃𡟇乸炻𡠭𡥪"
  ],
  [
    "9b40",
    "𡨭𡩅𡰪𡱰𡲬𡻈拃𡻕𡼕熘桕𢁅槩㛈𢉼𢏗𢏺𢜪𢡱𢥏苽𢥧𢦓𢫕覥𢫨辠𢬎鞸𢬿顇骽𢱌"
  ],
  [
    "9b62",
    "𢲈𢲷𥯨𢴈𢴒𢶷𢶕𢹂𢽴𢿌𣀳𣁦𣌟𣏞徱晈暿𧩹𣕧𣗳爁𤦺矗𣘚𣜖纇𠍆墵朎"
  ],
  [
    "9ba1",
    "椘𣪧𧙗𥿢𣸑𣺹𧗾𢂚䣐䪸𤄙𨪚𤋮𤌍𤀻𤌴𤎖𤩅𠗊凒𠘑妟𡺨㮾𣳿𤐄𤓖垈𤙴㦛𤜯𨗨𩧉㝢𢇃譞𨭎駖𤠒𤣻𤨕爉𤫀𠱸奥𤺥𤾆𠝹軚𥀬劏圿煱𥊙𥐙𣽊𤪧喼𥑆𥑮𦭒釔㑳𥔿𧘲𥕞䜘𥕢𥕦𥟇𤤿𥡝偦㓻𣏌惞𥤃䝼𨥈𥪮𥮉𥰆𡶐垡煑澶𦄂𧰒遖𦆲𤾚譢𦐂𦑊"
  ],
  [
    "9c40",
    "嵛𦯷輶𦒄𡤜諪𤧶𦒈𣿯𦔒䯀𦖿𦚵𢜛鑥𥟡憕娧晉侻嚹𤔡𦛼乪𤤴陖涏𦲽㘘襷𦞙𦡮𦐑𦡞營𦣇筂𩃀𠨑𦤦鄄𦤹穅鷰𦧺騦𦨭㙟𦑩𠀡禃𦨴𦭛崬𣔙菏𦮝䛐𦲤画补𦶮墶"
  ],
  [
    "9ca1",
    "㜜𢖍𧁋𧇍㱔𧊀𧊅銁𢅺𧊋錰𧋦𤧐氹钟𧑐𠻸蠧裵𢤦𨑳𡞱溸𤨪𡠠㦤㚹尐秣䔿暶𩲭𩢤襃𧟌𧡘囖䃟𡘊㦡𣜯𨃨𡏅熭荦𧧝𩆨婧䲷𧂯𨦫𧧽𧨊𧬋𧵦𤅺筃祾𨀉澵𪋟樃𨌘厢𦸇鎿栶靝𨅯𨀣𦦵𡏭𣈯𨁈嶅𨰰𨂃圕頣𨥉嶫𤦈斾槕叒𤪥𣾁㰑朶𨂐𨃴𨄮𡾡𨅏"
  ],
  [
    "9d40",
    "𨆉𨆯𨈚𨌆𨌯𨎊㗊𨑨𨚪䣺揦𨥖砈鉕𨦸䏲𨧧䏟𨧨𨭆𨯔姸𨰉輋𨿅𩃬筑𩄐𩄼㷷𩅞𤫊运犏嚋𩓧𩗩𩖰𩖸𩜲𩣑𩥉𩥪𩧃𩨨𩬎𩵚𩶛纟𩻸𩼣䲤镇𪊓熢𪋿䶑递𪗋䶜𠲜达嗁"
  ],
  [
    "9da1",
    "辺𢒰边𤪓䔉繿潖檱仪㓤𨬬𧢝㜺躀𡟵𨀤𨭬𨮙𧨾𦚯㷫𧙕𣲷𥘵𥥖亚𥺁𦉘嚿𠹭踎孭𣺈𤲞揞拐𡟶𡡻攰嘭𥱊吚𥌑㷆𩶘䱽嘢嘞罉𥻘奵𣵀蝰东𠿪𠵉𣚺脗鵞贘瘻鱅癎瞹鍅吲腈苷嘥脲萘肽嗪祢噃吖𠺝㗎嘅嗱曱𨋢㘭甴嗰喺咗啲𠱁𠲖廐𥅈𠹶𢱢"
  ],
  [
    "9e40",
    "𠺢麫絚嗞𡁵抝靭咔賍燶酶揼掹揾啩𢭃鱲𢺳冚㓟𠶧冧呍唞唓癦踭𦢊疱肶蠄螆裇膶萜𡃁䓬猄𤜆宐茋𦢓噻𢛴𧴯𤆣𧵳𦻐𧊶酰𡇙鈈𣳼𪚩𠺬𠻹牦𡲢䝎𤿂𧿹𠿫䃺"
  ],
  [
    "9ea1",
    "鱝攟𢶠䣳𤟠𩵼𠿬𠸊恢𧖣𠿭"
  ],
  [
    "9ead",
    "𦁈𡆇熣纎鵐业丄㕷嬍沲卧㚬㧜卽㚥𤘘墚𤭮舭呋垪𥪕𠥹"
  ],
  [
    "9ec5",
    "㩒𢑥獴𩺬䴉鯭𣳾𩼰䱛𤾩𩖞𩿞葜𣶶𧊲𦞳𣜠挮紥𣻷𣸬㨪逈勌㹴㙺䗩𠒎癀嫰𠺶硺𧼮墧䂿噼鮋嵴癔𪐴麅䳡痹㟻愙𣃚𤏲"
  ],
  [
    "9ef5",
    "噝𡊩垧𤥣𩸆刴𧂮㖭汊鵼"
  ],
  [
    "9f40",
    "籖鬹埞𡝬屓擓𩓐𦌵𧅤蚭𠴨𦴢𤫢𠵱"
  ],
  [
    "9f4f",
    "凾𡼏嶎霃𡷑麁遌笟鬂峑箣扨挵髿篏鬪籾鬮籂粆鰕篼鬉鼗鰛𤤾齚啳寃俽麘俲剠㸆勑坧偖妷帒韈鶫轜呩鞴饀鞺匬愰"
  ],
  [
    "9fa1",
    "椬叚鰊鴂䰻陁榀傦畆𡝭駚剳"
  ],
  [
    "9fae",
    "酙隁酜"
  ],
  [
    "9fb2",
    "酑𨺗捿𦴣櫊嘑醎畺抅𠏼獏籰𥰡𣳽"
  ],
  [
    "9fc1",
    "𤤙盖鮝个𠳔莾衂"
  ],
  [
    "9fc9",
    "届槀僭坺刟巵从氱𠇲伹咜哚劚趂㗾弌㗳"
  ],
  [
    "9fdb",
    "歒酼龥鮗頮颴骺麨麄煺笔"
  ],
  [
    "9fe7",
    "毺蠘罸"
  ],
  [
    "9feb",
    "嘠𪙊蹷齓"
  ],
  [
    "9ff0",
    "跔蹏鸜踁抂𨍽踨蹵竓𤩷稾磘泪詧瘇"
  ],
  [
    "a040",
    "𨩚鼦泎蟖痃𪊲硓咢贌狢獱謭猂瓱賫𤪻蘯徺袠䒷"
  ],
  [
    "a055",
    "𡠻𦸅"
  ],
  [
    "a058",
    "詾𢔛"
  ],
  [
    "a05b",
    "惽癧髗鵄鍮鮏蟵"
  ],
  [
    "a063",
    "蠏賷猬霡鮰㗖犲䰇籑饊𦅙慙䰄麖慽"
  ],
  [
    "a073",
    "坟慯抦戹拎㩜懢厪𣏵捤栂㗒"
  ],
  [
    "a0a1",
    "嵗𨯂迚𨸹"
  ],
  [
    "a0a6",
    "僙𡵆礆匲阸𠼻䁥"
  ],
  [
    "a0ae",
    "矾"
  ],
  [
    "a0b0",
    "糂𥼚糚稭聦聣絍甅瓲覔舚朌聢𧒆聛瓰脃眤覉𦟌畓𦻑螩蟎臈螌詉貭譃眫瓸蓚㘵榲趦"
  ],
  [
    "a0d4",
    "覩瑨涹蟁𤀑瓧㷛煶悤憜㳑煢恷"
  ],
  [
    "a0e2",
    "罱𨬭牐惩䭾删㰘𣳇𥻗𧙖𥔱𡥄𡋾𩤃𦷜𧂭峁𦆭𨨏𣙷𠃮𦡆𤼎䕢嬟𦍌齐麦𦉫"
  ],
  [
    "a3c0",
    "␀",
    31,
    "␡"
  ],
  [
    "c6a1",
    "①",
    9,
    "⑴",
    9,
    "ⅰ",
    9,
    "丶丿亅亠冂冖冫勹匸卩厶夊宀巛⼳广廴彐彡攴无疒癶辵隶¨ˆヽヾゝゞ〃仝々〆〇ー［］✽ぁ",
    23
  ],
  [
    "c740",
    "す",
    58,
    "ァアィイ"
  ],
  [
    "c7a1",
    "ゥ",
    81,
    "А",
    5,
    "ЁЖ",
    4
  ],
  [
    "c840",
    "Л",
    26,
    "ёж",
    25,
    "⇧↸↹㇏𠃌乚𠂊刂䒑"
  ],
  [
    "c8a1",
    "龰冈龱𧘇"
  ],
  [
    "c8cd",
    "￢￤＇＂㈱№℡゛゜⺀⺄⺆⺇⺈⺊⺌⺍⺕⺜⺝⺥⺧⺪⺬⺮⺶⺼⺾⻆⻊⻌⻍⻏⻖⻗⻞⻣"
  ],
  [
    "c8f5",
    "ʃɐɛɔɵœøŋʊɪ"
  ],
  [
    "f9fe",
    "￭"
  ],
  [
    "fa40",
    "𠕇鋛𠗟𣿅蕌䊵珯况㙉𤥂𨧤鍄𡧛苮𣳈砼杄拟𤤳𨦪𠊠𦮳𡌅侫𢓭倈𦴩𧪄𣘀𤪱𢔓倩𠍾徤𠎀𠍇滛𠐟偽儁㑺儎顬㝃萖𤦤𠒇兠𣎴兪𠯿𢃼𠋥𢔰𠖎𣈳𡦃宂蝽𠖳𣲙冲冸"
  ],
  [
    "faa1",
    "鴴凉减凑㳜凓𤪦决凢卂凭菍椾𣜭彻刋刦刼劵剗劔効勅簕蕂勠蘍𦬓包𨫞啉滙𣾀𠥔𣿬匳卄𠯢泋𡜦栛珕恊㺪㣌𡛨燝䒢卭却𨚫卾卿𡖖𡘓矦厓𨪛厠厫厮玧𥝲㽙玜叁叅汉义埾叙㪫𠮏叠𣿫𢶣叶𠱷吓灹唫晗浛呭𦭓𠵴啝咏咤䞦𡜍𠻝㶴𠵍"
  ],
  [
    "fb40",
    "𨦼𢚘啇䳭启琗喆喩嘅𡣗𤀺䕒𤐵暳𡂴嘷曍𣊊暤暭噍噏磱囱鞇叾圀囯园𨭦㘣𡉏坆𤆥汮炋坂㚱𦱾埦𡐖堃𡑔𤍣堦𤯵塜墪㕡壠壜𡈼壻寿坃𪅐𤉸鏓㖡够梦㛃湙"
  ],
  [
    "fba1",
    "𡘾娤啓𡚒蔅姉𠵎𦲁𦴪𡟜姙𡟻𡞲𦶦浱𡠨𡛕姹𦹅媫婣㛦𤦩婷㜈媖瑥嫓𦾡𢕔㶅𡤑㜲𡚸広勐孶斈孼𧨎䀄䡝𠈄寕慠𡨴𥧌𠖥寳宝䴐尅𡭄尓珎尔𡲥𦬨屉䣝岅峩峯嶋𡷹𡸷崐崘嵆𡺤岺巗苼㠭𤤁𢁉𢅳芇㠶㯂帮檊幵幺𤒼𠳓厦亷廐厨𡝱帉廴𨒂"
  ],
  [
    "fc40",
    "廹廻㢠廼栾鐛弍𠇁弢㫞䢮𡌺强𦢈𢏐彘𢑱彣鞽𦹮彲鍀𨨶徧嶶㵟𥉐𡽪𧃸𢙨釖𠊞𨨩怱暅𡡷㥣㷇㘹垐𢞴祱㹀悞悤悳𤦂𤦏𧩓璤僡媠慤萤慂慈𦻒憁凴𠙖憇宪𣾷"
  ],
  [
    "fca1",
    "𢡟懓𨮝𩥝懐㤲𢦀𢣁怣慜攞掋𠄘担𡝰拕𢸍捬𤧟㨗搸揸𡎎𡟼撐澊𢸶頔𤂌𥜝擡擥鑻㩦携㩗敍漖𤨨𤨣斅敭敟𣁾斵𤥀䬷旑䃘𡠩无旣忟𣐀昘𣇷𣇸晄𣆤𣆥晋𠹵晧𥇦晳晴𡸽𣈱𨗴𣇈𥌓矅𢣷馤朂𤎜𤨡㬫槺𣟂杞杧杢𤇍𩃭柗䓩栢湐鈼栁𣏦𦶠桝"
  ],
  [
    "fd40",
    "𣑯槡樋𨫟楳棃𣗍椁椀㴲㨁𣘼㮀枬楡𨩊䋼椶榘㮡𠏉荣傐槹𣙙𢄪橅𣜃檝㯳枱櫈𩆜㰍欝𠤣惞欵歴𢟍溵𣫛𠎵𡥘㝀吡𣭚毡𣻼毜氷𢒋𤣱𦭑汚舦汹𣶼䓅𣶽𤆤𤤌𤤀"
  ],
  [
    "fda1",
    "𣳉㛥㳫𠴲鮃𣇹𢒑羏样𦴥𦶡𦷫涖浜湼漄𤥿𤂅𦹲蔳𦽴凇沜渝萮𨬡港𣸯瑓𣾂秌湏媑𣁋濸㜍澝𣸰滺𡒗𤀽䕕鏰潄潜㵎潴𩅰㴻澟𤅄濓𤂑𤅕𤀹𣿰𣾴𤄿凟𤅖𤅗𤅀𦇝灋灾炧炁烌烕烖烟䄄㷨熴熖𤉷焫煅媈煊煮岜𤍥煏鍢𤋁焬𤑚𤨧𤨢熺𨯨炽爎"
  ],
  [
    "fe40",
    "鑂爕夑鑃爤鍁𥘅爮牀𤥴梽牕牗㹕𣁄栍漽犂猪猫𤠣𨠫䣭𨠄猨献珏玪𠰺𦨮珉瑉𤇢𡛧𤨤昣㛅𤦷𤦍𤧻珷琕椃𤨦琹𠗃㻗瑜𢢭瑠𨺲瑇珤瑶莹瑬㜰瑴鏱樬璂䥓𤪌"
  ],
  [
    "fea1",
    "𤅟𤩹𨮏孆𨰃𡢞瓈𡦈甎瓩甞𨻙𡩋寗𨺬鎅畍畊畧畮𤾂㼄𤴓疎瑝疞疴瘂瘬癑癏癯癶𦏵皐臯㟸𦤑𦤎皡皥皷盌𦾟葢𥂝𥅽𡸜眞眦着撯𥈠睘𣊬瞯𨥤𨥨𡛁矴砉𡍶𤨒棊碯磇磓隥礮𥗠磗礴碱𧘌辸袄𨬫𦂃𢘜禆褀椂禀𥡗禝𧬹礼禩渪𧄦㺨秆𩄍秔"
  ]
];
var Rn, us;
function Iu() {
  return us || (us = 1, Rn = {
    // == Japanese/ShiftJIS ====================================================
    // All japanese encodings are based on JIS X set of standards:
    // JIS X 0201 - Single-byte encoding of ASCII + ¥ + Kana chars at 0xA1-0xDF.
    // JIS X 0208 - Main set of 6879 characters, placed in 94x94 plane, to be encoded by 2 bytes. 
    //              Has several variations in 1978, 1983, 1990 and 1997.
    // JIS X 0212 - Supplementary plane of 6067 chars in 94x94 plane. 1990. Effectively dead.
    // JIS X 0213 - Extension and modern replacement of 0208 and 0212. Total chars: 11233.
    //              2 planes, first is superset of 0208, second - revised 0212.
    //              Introduced in 2000, revised 2004. Some characters are in Unicode Plane 2 (0x2xxxx)
    // Byte encodings are:
    //  * Shift_JIS: Compatible with 0201, uses not defined chars in top half as lead bytes for double-byte
    //               encoding of 0208. Lead byte ranges: 0x81-0x9F, 0xE0-0xEF; Trail byte ranges: 0x40-0x7E, 0x80-0x9E, 0x9F-0xFC.
    //               Windows CP932 is a superset of Shift_JIS. Some companies added more chars, notably KDDI.
    //  * EUC-JP:    Up to 3 bytes per character. Used mostly on *nixes.
    //               0x00-0x7F       - lower part of 0201
    //               0x8E, 0xA1-0xDF - upper part of 0201
    //               (0xA1-0xFE)x2   - 0208 plane (94x94).
    //               0x8F, (0xA1-0xFE)x2 - 0212 plane (94x94).
    //  * JIS X 208: 7-bit, direct encoding of 0208. Byte ranges: 0x21-0x7E (94 values). Uncommon.
    //               Used as-is in ISO2022 family.
    //  * ISO2022-JP: Stateful encoding, with escape sequences to switch between ASCII, 
    //                0201-1976 Roman, 0208-1978, 0208-1983.
    //  * ISO2022-JP-1: Adds esc seq for 0212-1990.
    //  * ISO2022-JP-2: Adds esc seq for GB2313-1980, KSX1001-1992, ISO8859-1, ISO8859-7.
    //  * ISO2022-JP-3: Adds esc seq for 0201-1976 Kana set, 0213-2000 Planes 1, 2.
    //  * ISO2022-JP-2004: Adds 0213-2004 Plane 1.
    //
    // After JIS X 0213 appeared, Shift_JIS-2004, EUC-JISX0213 and ISO2022-JP-2004 followed, with just changing the planes.
    //
    // Overall, it seems that it's a mess :( http://www8.plala.or.jp/tkubota1/unicode-symbols-map2.html
    shiftjis: {
      type: "_dbcs",
      table: function() {
        return xu;
      },
      encodeAdd: { "¥": 92, "‾": 126 },
      encodeSkipVals: [{ from: 60736, to: 63808 }]
    },
    csshiftjis: "shiftjis",
    mskanji: "shiftjis",
    sjis: "shiftjis",
    windows31j: "shiftjis",
    ms31j: "shiftjis",
    xsjis: "shiftjis",
    windows932: "shiftjis",
    ms932: "shiftjis",
    932: "shiftjis",
    cp932: "shiftjis",
    eucjp: {
      type: "_dbcs",
      table: function() {
        return Su;
      },
      encodeAdd: { "¥": 92, "‾": 126 }
    },
    // TODO: KDDI extension to Shift_JIS
    // TODO: IBM CCSID 942 = CP932, but F0-F9 custom chars and other char changes.
    // TODO: IBM CCSID 943 = Shift_JIS = CP932 with original Shift_JIS lower 128 chars.
    // == Chinese/GBK ==========================================================
    // http://en.wikipedia.org/wiki/GBK
    // We mostly implement W3C recommendation: https://www.w3.org/TR/encoding/#gbk-encoder
    // Oldest GB2312 (1981, ~7600 chars) is a subset of CP936
    gb2312: "cp936",
    gb231280: "cp936",
    gb23121980: "cp936",
    csgb2312: "cp936",
    csiso58gb231280: "cp936",
    euccn: "cp936",
    // Microsoft's CP936 is a subset and approximation of GBK.
    windows936: "cp936",
    ms936: "cp936",
    936: "cp936",
    cp936: {
      type: "_dbcs",
      table: function() {
        return Wn;
      }
    },
    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    gbk: {
      type: "_dbcs",
      table: function() {
        return Wn.concat(cs);
      }
    },
    xgbk: "gbk",
    isoir58: "gbk",
    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    gb18030: {
      type: "_dbcs",
      table: function() {
        return Wn.concat(cs);
      },
      gb18030: function() {
        return vu;
      },
      encodeSkipVals: [128],
      encodeAdd: { "€": 41699 }
    },
    chinese: "gb18030",
    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    windows949: "cp949",
    ms949: "cp949",
    949: "cp949",
    cp949: {
      type: "_dbcs",
      table: function() {
        return Lu;
      }
    },
    cseuckr: "cp949",
    csksc56011987: "cp949",
    euckr: "cp949",
    isoir149: "cp949",
    korean: "cp949",
    ksc56011987: "cp949",
    ksc56011989: "cp949",
    ksc5601: "cp949",
    // == Big5/Taiwan/Hong Kong ================================================
    // There are lots of tables for Big5 and cp950. Please see the following links for history:
    // http://moztw.org/docs/big5/  http://www.haible.de/bruno/charsets/conversion-tables/Big5.html
    // Variations, in roughly number of defined chars:
    //  * Windows CP 950: Microsoft variant of Big5. Canonical: http://www.unicode.org/Public/MAPPINGS/VENDORS/MICSFT/WINDOWS/CP950.TXT
    //  * Windows CP 951: Microsoft variant of Big5-HKSCS-2001. Seems to be never public. http://me.abelcheung.org/articles/research/what-is-cp951/
    //  * Big5-2003 (Taiwan standard) almost superset of cp950.
    //  * Unicode-at-on (UAO) / Mozilla 1.8. Falling out of use on the Web. Not supported by other browsers.
    //  * Big5-HKSCS (-2001, -2004, -2008). Hong Kong standard. 
    //    many unicode code points moved from PUA to Supplementary plane (U+2XXXX) over the years.
    //    Plus, it has 4 combining sequences.
    //    Seems that Mozilla refused to support it for 10 yrs. https://bugzilla.mozilla.org/show_bug.cgi?id=162431 https://bugzilla.mozilla.org/show_bug.cgi?id=310299
    //    because big5-hkscs is the only encoding to include astral characters in non-algorithmic way.
    //    Implementations are not consistent within browsers; sometimes labeled as just big5.
    //    MS Internet Explorer switches from big5 to big5-hkscs when a patch applied.
    //    Great discussion & recap of what's going on https://bugzilla.mozilla.org/show_bug.cgi?id=912470#c31
    //    In the encoder, it might make sense to support encoding old PUA mappings to Big5 bytes seq-s.
    //    Official spec: http://www.ogcio.gov.hk/en/business/tech_promotion/ccli/terms/doc/2003cmp_2008.txt
    //                   http://www.ogcio.gov.hk/tc/business/tech_promotion/ccli/terms/doc/hkscs-2008-big5-iso.txt
    // 
    // Current understanding of how to deal with Big5(-HKSCS) is in the Encoding Standard, http://encoding.spec.whatwg.org/#big5-encoder
    // Unicode mapping (http://www.unicode.org/Public/MAPPINGS/OBSOLETE/EASTASIA/OTHER/BIG5.TXT) is said to be wrong.
    windows950: "cp950",
    ms950: "cp950",
    950: "cp950",
    cp950: {
      type: "_dbcs",
      table: function() {
        return ls;
      }
    },
    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    big5: "big5hkscs",
    big5hkscs: {
      type: "_dbcs",
      table: function() {
        return ls.concat(bu);
      },
      encodeSkipVals: [
        // Although Encoding Standard says we should avoid encoding to HKSCS area (See Step 1 of
        // https://encoding.spec.whatwg.org/#index-big5-pointer), we still do it to increase compatibility with ICU.
        // But if a single unicode point can be encoded both as HKSCS and regular Big5, we prefer the latter.
        36457,
        36463,
        36478,
        36523,
        36532,
        36557,
        36560,
        36695,
        36713,
        36718,
        36811,
        36862,
        36973,
        36986,
        37060,
        37084,
        37105,
        37311,
        37551,
        37552,
        37553,
        37554,
        37585,
        37959,
        38090,
        38361,
        38652,
        39285,
        39798,
        39800,
        39803,
        39878,
        39902,
        39916,
        39926,
        40002,
        40019,
        40034,
        40040,
        40043,
        40055,
        40124,
        40125,
        40144,
        40279,
        40282,
        40388,
        40431,
        40443,
        40617,
        40687,
        40701,
        40800,
        40907,
        41079,
        41180,
        41183,
        36812,
        37576,
        38468,
        38637,
        // Step 2 of https://encoding.spec.whatwg.org/#index-big5-pointer: Use last pointer for U+2550, U+255E, U+2561, U+256A, U+5341, or U+5345
        41636,
        41637,
        41639,
        41638,
        41676,
        41678
      ]
    },
    cnbig5: "big5hkscs",
    csbig5: "big5hkscs",
    xxbig5: "big5hkscs"
  }), Rn;
}
var ps;
function _u() {
  return ps || (ps = 1, function(t) {
    for (var i = [
      uu(),
      pu(),
      fu(),
      du(),
      mu(),
      hu(),
      gu(),
      yu(),
      Iu()
    ], e = 0; e < i.length; e++) {
      var n = i[e];
      for (var s in n)
        Object.prototype.hasOwnProperty.call(n, s) && (t[s] = n[s]);
    }
  }(Dn)), Dn;
}
var Gn, fs;
function Ou() {
  if (fs) return Gn;
  fs = 1;
  var t = Lt.Buffer;
  return Gn = function(i) {
    var e = i.Transform;
    function n(r, o) {
      this.conv = r, o = o || {}, o.decodeStrings = !1, e.call(this, o);
    }
    n.prototype = Object.create(e.prototype, {
      constructor: { value: n }
    }), n.prototype._transform = function(r, o, a) {
      if (typeof r != "string")
        return a(new Error("Iconv encoding stream needs strings as its input."));
      try {
        var l = this.conv.write(r);
        l && l.length && this.push(l), a();
      } catch (c) {
        a(c);
      }
    }, n.prototype._flush = function(r) {
      try {
        var o = this.conv.end();
        o && o.length && this.push(o), r();
      } catch (a) {
        r(a);
      }
    }, n.prototype.collect = function(r) {
      var o = [];
      return this.on("error", r), this.on("data", function(a) {
        o.push(a);
      }), this.on("end", function() {
        r(null, t.concat(o));
      }), this;
    };
    function s(r, o) {
      this.conv = r, o = o || {}, o.encoding = this.encoding = "utf8", e.call(this, o);
    }
    return s.prototype = Object.create(e.prototype, {
      constructor: { value: s }
    }), s.prototype._transform = function(r, o, a) {
      if (!t.isBuffer(r) && !(r instanceof Uint8Array))
        return a(new Error("Iconv decoding stream needs buffers as its input."));
      try {
        var l = this.conv.write(r);
        l && l.length && this.push(l, this.encoding), a();
      } catch (c) {
        a(c);
      }
    }, s.prototype._flush = function(r) {
      try {
        var o = this.conv.end();
        o && o.length && this.push(o, this.encoding), r();
      } catch (a) {
        r(a);
      }
    }, s.prototype.collect = function(r) {
      var o = "";
      return this.on("error", r), this.on("data", function(a) {
        o += a;
      }), this.on("end", function() {
        r(null, o);
      }), this;
    }, {
      IconvLiteEncoderStream: n,
      IconvLiteDecoderStream: s
    };
  }, Gn;
}
(function(t) {
  var i = Lt.Buffer, e = Sr, n = t.exports;
  n.encodings = null, n.defaultCharUnicode = "�", n.defaultCharSingleByte = "?", n.encode = function(o, a, l) {
    o = "" + (o || "");
    var c = n.getEncoder(a, l), u = c.write(o), f = c.end();
    return f && f.length > 0 ? i.concat([u, f]) : u;
  }, n.decode = function(o, a, l) {
    typeof o == "string" && (n.skipDecodeWarning || (console.error("Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding"), n.skipDecodeWarning = !0), o = i.from("" + (o || ""), "binary"));
    var c = n.getDecoder(a, l), u = c.write(o), f = c.end();
    return f ? u + f : u;
  }, n.encodingExists = function(o) {
    try {
      return n.getCodec(o), !0;
    } catch {
      return !1;
    }
  }, n.toEncoding = n.encode, n.fromEncoding = n.decode, n._codecDataCache = {}, n.getCodec = function(o) {
    n.encodings || (n.encodings = _u());
    for (var a = n._canonicalizeEncoding(o), l = {}; ; ) {
      var c = n._codecDataCache[a];
      if (c)
        return c;
      var u = n.encodings[a];
      switch (typeof u) {
        case "string":
          a = u;
          break;
        case "object":
          for (var f in u)
            l[f] = u[f];
          l.encodingName || (l.encodingName = a), a = u.type;
          break;
        case "function":
          return l.encodingName || (l.encodingName = a), c = new u(l, n), n._codecDataCache[l.encodingName] = c, c;
        default:
          throw new Error("Encoding not recognized: '" + o + "' (searched as: '" + a + "')");
      }
    }
  }, n._canonicalizeEncoding = function(r) {
    return ("" + r).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
  }, n.getEncoder = function(o, a) {
    var l = n.getCodec(o), c = new l.encoder(a, l);
    return l.bomAware && a && a.addBOM && (c = new e.PrependBOM(c, a)), c;
  }, n.getDecoder = function(o, a) {
    var l = n.getCodec(o), c = new l.decoder(a, l);
    return l.bomAware && !(a && a.stripBOM === !1) && (c = new e.StripBOM(c, a)), c;
  }, n.enableStreamingAPI = function(o) {
    if (!n.supportsStreams) {
      var a = Ou()(o);
      n.IconvLiteEncoderStream = a.IconvLiteEncoderStream, n.IconvLiteDecoderStream = a.IconvLiteDecoderStream, n.encodeStream = function(c, u) {
        return new n.IconvLiteEncoderStream(n.getEncoder(c, u), u);
      }, n.decodeStream = function(c, u) {
        return new n.IconvLiteDecoderStream(n.getDecoder(c, u), u);
      }, n.supportsStreams = !0;
    }
  };
  var s;
  try {
    s = require("stream");
  } catch {
  }
  s && s.Transform ? n.enableStreamingAPI(s) : n.encodeStream = n.decodeStream = function() {
    throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
  };
})(no);
var Pu = no.exports, so = Te && Te.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.Windows = void 0;
var Au = oi, Eu = so(Ei), ds = Nt, ms = so(Pu), Mu = (
  /** @class */
  function() {
    function t() {
    }
    return t.run = function() {
      var i = [], e = ds.Utils.execute(Au.Constants.WINDOWS_COMMAND), n = ds.Utils.chcp(), s = "";
      switch (n) {
        case "65000":
          s = "UTF-7";
          break;
        case "65001":
          s = "UTF-8";
          break;
        default:
          /^-?[\d.]+(?:e-?\d+)?$/.test(n) ? s = "cp" + n : s = n;
      }
      e = ms.default.encode(ms.default.decode(e, s), "UTF-8");
      var r = e.toString().split(`\r\r
`), o = !1, a = "", l = "", c = 0, u = 0;
      return r.forEach(function(f) {
        if (f !== "") {
          var p = f.split("="), d = p[0], m = p[1];
          switch (d) {
            case "Caption":
              a = m, o = !0;
              break;
            case "Description":
              l = m;
              break;
            case "FreeSpace":
              c = isNaN(parseFloat(m)) ? 0 : +m;
              break;
            case "Size":
              u = isNaN(parseFloat(m)) ? 0 : +m;
              break;
          }
        } else if (o) {
          var h = u - c, y = "0%";
          u > 0 && (y = Math.round(h / u * 100) + "%");
          var g = new Eu.default(l, u, h, c, y, a);
          i.push(g), o = !1, a = "", l = "", c = 0, u = 0;
        }
      }), i;
    }, t;
  }()
);
gn.Windows = Mu;
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.getDiskInfoSync = ei.getDiskInfo = void 0;
var Jt = mn, oo = hn, ao = gn, co = Nt;
function Tu() {
  return new Promise(function(t, i) {
    try {
      var e = co.Utils.detectPlatform(), n = void 0;
      switch (e) {
        case "aix":
          i(new Error("Platform not supported: " + e));
          break;
        case "android":
          i(new Error("Platform not supported: " + e));
          break;
        case "darwin":
          n = Jt.Darwin.run(), t(n);
          break;
        case "freebsd":
          n = Jt.Darwin.run(), t(n);
          break;
        case "linux":
          n = oo.Linux.run(), t(n);
          break;
        case "openbsd":
          n = Jt.Darwin.run(), t(n);
          break;
        case "sunos":
          i(new Error("Platform not supported: " + e));
          break;
        case "win32":
          n = ao.Windows.run(), t(n);
          break;
        default:
          i(new Error("Platform not recognized: " + e));
      }
    } catch (s) {
      i(s);
    }
  });
}
ei.getDiskInfo = Tu;
function Du() {
  var t = co.Utils.detectPlatform(), i;
  switch (t) {
    case "aix":
      throw new Error("Platform not supported: " + t);
    case "android":
      throw new Error("Platform not supported: " + t);
    case "darwin":
      return i = Jt.Darwin.run(), i;
    case "freebsd":
      return i = Jt.Darwin.run(), i;
    case "linux":
      return i = oo.Linux.run(), i;
    case "openbsd":
      return i = Jt.Darwin.run(), i;
    case "sunos":
      throw new Error("Platform not supported: " + t);
    case "win32":
      return i = ao.Windows.run(), i;
    default:
      throw new Error("Platform not recognized: " + t);
  }
}
ei.getDiskInfoSync = Du;
class Bu {
  /**
   * İşlemci bilgilerini döndürür
   * @returns İşlemci bilgileri
   */
  async getCpuInfo() {
    const i = se.cpus()[0], e = se.cpus().length, n = se.cpus().length;
    return {
      model: i.model,
      speed: `${i.speed / 1e3} GHz`,
      cores: e,
      threads: n
    };
  }
  /**
   * Bellek bilgilerini döndürür
   * @returns Bellek bilgileri
   */
  getMemoryInfo() {
    const i = se.totalmem(), e = se.freemem();
    return {
      total: `${(i / 1024 / 1024 / 1024).toFixed(2)} GB`,
      free: `${(e / 1024 / 1024 / 1024).toFixed(2)} GB`
    };
  }
  /**
   * Disk bilgilerini döndürür
   * @returns Disk bilgileri
   */
  async getDiskInfo() {
    let i = "Bilinmiyor", e = "Bilinmiyor";
    try {
      const n = ei.getDiskInfoSync(), s = n.find((r) => r.mounted === "C:") || n[0];
      s && (i = `${Math.floor(s.blocks / (1024 * 1024 * 1024))} GB`, e = `${Math.floor(s.available / (1024 * 1024 * 1024))} GB`);
    } catch (n) {
      console.error("Disk bilgileri alınamadı:", n);
    }
    return {
      total: i,
      free: e
    };
  }
  /**
   * İşletim sistemi bilgilerini döndürür
   * @returns İşletim sistemi bilgileri
   */
  getOsInfo() {
    return {
      os: `${se.type()} ${se.arch()}`,
      version: se.release(),
      networkName: se.networkInterfaces().Ethernet ? "Ethernet" : "Wi-Fi"
    };
  }
  /**
   * Ekran çözünürlüğünü döndürür
   * @returns Ekran çözünürlüğü
   */
  getScreenResolution() {
    let i = "Bilinmiyor";
    try {
      const e = ho.getPrimaryDisplay(), { width: n, height: s } = e.size;
      i = `${n}x${s}`;
    } catch (e) {
      console.error("Ekran çözünürlüğü alınamadı:", e);
    }
    return i;
  }
  /**
   * Batarya seviyesini döndürür
   * @returns Batarya seviyesi
   */
  async getBatteryLevel() {
    let i = 0;
    try {
      i = (await Wi.battery()).percent;
    } catch (e) {
      console.error("Batarya bilgisi alınamadı:", e);
    }
    return i;
  }
  /**
   * Sistemin çalışma süresini döndürür
   * @returns Çalışma süresi
   */
  getUptime() {
    const i = se.uptime(), e = Math.floor(i / 3600), n = Math.floor(i % 3600 / 60);
    return `${e} saat ${n} dakika`;
  }
  /**
   * CPU kullanım yüzdesini döndürür
   * @returns CPU kullanım yüzdesi
   */
  async getCpuUsage() {
    try {
      const i = await Wi.currentLoad();
      return Math.round(i.currentLoad);
    } catch (i) {
      return console.error("CPU kullanım bilgisi alınamadı:", i), 0;
    }
  }
  /**
   * GPU bilgilerini döndürür
   * @returns GPU bilgileri
   */
  async getGpuInfo() {
    try {
      const i = await Wi.graphics();
      if (i.controllers && i.controllers.length > 0) {
        const e = i.controllers[0];
        return {
          name: e.model,
          vram: e.vram ? `${Math.round(e.vram / 1024)} GB` : "Bilinmiyor",
          usage: e.utilizationGpu || 0
        };
      }
      return {
        name: "Bilinmiyor",
        vram: "Bilinmiyor",
        usage: 0
      };
    } catch (i) {
      return console.error("GPU bilgisi alınamadı:", i), {
        name: "Bilinmiyor",
        vram: "Bilinmiyor",
        usage: 0
      };
    }
  }
  /**
   * Bellek kullanım yüzdesini döndürür
   * @returns Bellek kullanım yüzdesi
   */
  getMemoryUsage() {
    const i = se.totalmem(), e = se.freemem(), n = i - e;
    return Math.round(n / i * 100);
  }
  /**
   * Ağ kullanım bilgilerini döndürür
   * @returns Ağ kullanım bilgileri
   */
  async getNetworkUsage() {
    try {
      const i = await Wi.networkStats();
      if (i && i.length > 0) {
        const e = i.find((n) => n.operstate === "up") || i[0];
        return {
          interface: e.iface,
          download: Math.round(e.rx_sec / 1024),
          // KB/s
          upload: Math.round(e.tx_sec / 1024),
          // KB/s
          usage: Math.round((e.rx_sec + e.tx_sec) / (10 * 1024 * 1024) * 100)
          // % of 10 Mbps
        };
      }
      return {
        interface: "Bilinmiyor",
        download: 0,
        upload: 0,
        usage: 0
      };
    } catch (i) {
      return console.error("Ağ kullanım bilgisi alınamadı:", i), {
        interface: "Bilinmiyor",
        download: 0,
        upload: 0,
        usage: 0
      };
    }
  }
  /**
   * Performans puanını hesaplar
   * @param cpuUsage CPU kullanım yüzdesi
   * @param memoryUsage Bellek kullanım yüzdesi
   * @param gpuUsage GPU kullanım yüzdesi
   * @param networkUsage Ağ kullanım yüzdesi
   * @returns 10 üzerinden performans puanı
   */
  calculatePerformanceScore(i, e, n, s) {
    const r = 10 - i / 10, o = 10 - e / 10, a = 10 - n / 10, l = 10 - s / 10, c = r * 0.4 + o * 0.3 + a * 0.2 + l * 0.1;
    return Math.round(c * 10) / 10;
  }
  /**
   * Tüm sistem bilgilerini döndürür
   * @returns Tüm sistem bilgileri
   */
  async getAllSystemInfo() {
    const i = await this.getCpuInfo(), e = this.getMemoryInfo(), n = await this.getDiskInfo(), s = this.getOsInfo(), r = this.getScreenResolution(), o = await this.getBatteryLevel(), a = this.getUptime(), l = await this.getCpuUsage(), c = await this.getGpuInfo(), u = this.getMemoryUsage(), f = await this.getNetworkUsage(), p = this.calculatePerformanceScore(
      l,
      u,
      c.usage,
      f.usage
    );
    return {
      cpu: i.model,
      cpuSpeed: i.speed,
      cpuCores: i.cores,
      cpuThreads: i.threads,
      cpuUsage: l,
      ram: e.total,
      freeRam: e.free,
      memoryUsage: u,
      gpu: c.name,
      gpuVram: c.vram,
      gpuUsage: c.usage,
      networkInterface: f.interface,
      networkDownload: f.download,
      networkUpload: f.upload,
      networkUsage: f.usage,
      os: s.os,
      version: s.version,
      networkName: s.networkName,
      batteryLevel: o,
      screenResolution: r,
      uptime: a,
      diskSpace: n.total,
      diskFree: n.free,
      performanceScore: p,
      totalApps: 0
      // Default value, will be updated by IpcHandlerService
    };
  }
}
class Vu {
  constructor(i) {
    Ge(this, "isWindows");
    Ge(this, "wingetAvailable", null);
    // private windowsTerminalAvailable: boolean;
    // private readonly execAsync: Function;
    Ge(this, "updatingApps", /* @__PURE__ */ new Set());
    Ge(this, "installingApps", /* @__PURE__ */ new Set());
    Ge(this, "app");
    // Örnek uygulama verileri - winget çalışmazsa kullanılacak
    Ge(this, "mockApps", [
      { name: "Visual Studio Code", version: "1.76.0", newVersion: "1.80.1" },
      { name: "Google Chrome", version: "115.0.1", newVersion: "" },
      { name: "Mozilla Firefox", version: "115.0", newVersion: "116.0" },
      { name: "Node.js", version: "18.15.0", newVersion: "20.5.1" },
      { name: "WinRAR", version: "6.10", newVersion: "6.23" },
      { name: "7-Zip", version: "22.01", newVersion: "" },
      { name: "Notepad++", version: "8.5.0", newVersion: "8.5.4" },
      { name: "VLC Media Player", version: "3.0.18", newVersion: "" },
      { name: "Adobe Acrobat Reader", version: "23.001.20143", newVersion: "23.003.20244" },
      { name: "Spotify", version: "1.2.8.923", newVersion: "1.2.9.743" },
      { name: "Discord", version: "1.0.9012", newVersion: "1.0.9016" },
      { name: "WhatsApp", version: "2.2320.2", newVersion: "" }
    ]);
    this.isWindows = xo() === "win32", this.app = i;
  }
  /**
   * Winget komutunun çalışıp çalışmadığını kontrol eder
   * @returns Winget'in kullanılabilir olup olmadığı
   */
  async checkWingetAvailability() {
    return this.wingetAvailable !== null ? this.wingetAvailable : (console.log(this.app), this.isWindows ? new Promise((i) => {
      const e = setTimeout(() => {
        console.warn("Winget availability check timed out"), this.wingetAvailable = !1, i(!1);
      }, 3e3);
      try {
        const n = xn("winget", ["--version"]);
        n.on("error", (s) => {
          clearTimeout(e), console.warn("Winget not available:", s.message), this.wingetAvailable = !1, i(!1);
        }), n.on("close", (s) => {
          clearTimeout(e), this.wingetAvailable = s === 0, i(s === 0);
        });
      } catch (n) {
        clearTimeout(e), console.warn("Error checking winget availability:", n), this.wingetAvailable = !1, i(!1);
      }
    }) : (console.warn("Winget only works on Windows OS"), this.wingetAvailable = !1, !1));
  }
  /**
   * Winget'i yükler
   * @returns Yükleme işleminin sonucu
   */
  async installWinget() {
    try {
      if (!this.isWindows)
        return {
          success: !1,
          message: "Winget only works on Windows OS"
        };
      console.log("Installing winget...");
      const i = xn("cmd.exe", ["/c", "start", "ms-appinstaller:?source=winget"]);
      return new Promise((e) => {
        i.on("error", (n) => {
          console.error("Error installing winget:", n), e({
            success: !1,
            message: `Winget yüklenirken hata oluştu: ${n.message}`
          });
        }), i.on("close", (n) => {
          n === 0 ? (console.log("Winget installation process started successfully"), this.wingetAvailable = null, e({
            success: !0,
            message: "Winget yükleme işlemi başlatıldı. Lütfen Microsoft Store'daki yükleme işlemini tamamlayın."
          })) : (console.error(`Winget installation process exited with code ${n}`), e({
            success: !1,
            message: `Winget yükleme işlemi başlatılamadı (Kod: ${n})`
          }));
        });
      });
    } catch (i) {
      return console.error("Error installing winget:", i), {
        success: !1,
        message: `Winget yüklenirken hata oluştu: ${i.message || "Bilinmeyen bir hata"}`
      };
    }
  }
  /**
   * Yüklü uygulamaların listesini döndürür
   * @returns Yüklü uygulamaların listesi
   */
  async getInstalledApps() {
    try {
      if (!this.wingetAvailable && (await this.checkWingetAvailability(), !this.wingetAvailable))
        return {
          error: "Winget yüklü değil veya erişilemiyor"
        };
      const i = await this.executeCommand("list", ["--source", "winget"]);
      return this.parseInstalledAppsList(i);
    } catch (i) {
      throw console.error("Winget getInstalledApps error:", i), i.message.includes("0x80070002") || i.message.includes("not found") ? new Error("Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun") : new Error(`Uygulama listesi alınamadı: ${i.message}`);
    }
  }
  /**
   * Winget ile uygulama arama
   * @param keyword Aranacak anahtar kelime
   * @returns Bulunan uygulamaların listesi
   */
  async searchApps(i) {
    try {
      if (!this.wingetAvailable && (await this.checkWingetAvailability(), !this.wingetAvailable))
        return {
          error: "Winget yüklü değil veya erişilemiyor"
        };
      const e = await this.executeCommand("search", [i, "--source", "winget", "--accept-source-agreements"]);
      return this.parseSearchResults(e);
    } catch (e) {
      throw console.error("Winget searchApps error:", e), e.message.includes("0x80070002") || e.message.includes("not found") ? new Error("Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun") : new Error(`Uygulama araması yapılamadı: ${e.message}`);
    }
  }
  /**
   * Winget ile uygulama güncelleme
   * @param app Güncellenecek uygulama (AppInfo objesi veya string olarak id)
   * @returns İşlem sonucu
   */
  async updateApp(i) {
    try {
      if (!this.wingetAvailable && (await this.checkWingetAvailability(), !this.wingetAvailable))
        return {
          success: !1,
          message: "Winget yüklü değil veya erişilemiyor"
        };
      const e = typeof i == "string" ? i : i.id;
      if (!e)
        return {
          success: !1,
          message: "Geçersiz uygulama ID. Güncelleme yapılamadı."
        };
      if (console.log(`Updating app with ID: ${e}`), this.updatingApps.has(e))
        return {
          success: !1,
          message: "Bu uygulama zaten güncelleniyor"
        };
      this.updatingApps.add(e);
      try {
        const n = await this.getInstalledApps();
        if (!(Array.isArray(n) && n.some((o) => o.id === e)))
          return this.updatingApps.delete(e), {
            success: !1,
            message: `${e} uygulaması yüklü değil ve güncellenemez`
          };
        const r = await this.executeCommand("upgrade", [e, "--source", "winget"]);
        if (r.includes("successfully") || r.includes("başarıyla"))
          return console.log(`Successfully updated app: ${e}`), this.updatingApps.delete(e), {
            success: !0,
            message: `${e} başarıyla güncellendi`
          };
        if (r.includes("No applicable update found") || r.includes("güncelleştirme bulunamadı") || r.includes("is already installed") || r.includes("zaten yüklü"))
          return console.log(`App is already up to date: ${e}`), this.updatingApps.delete(e), {
            success: !0,
            message: `${e} zaten güncel`
          };
        if (!r.includes("failed") && !r.includes("error") && !r.includes("hata"))
          return console.log(`App updated with custom message: ${e}`), this.updatingApps.delete(e), {
            success: !0,
            message: `${e} güncellendi: ${r.split(`
`)[0]}`
          };
        if (r.includes("Access denied") || r.includes("access is denied") || r.includes("Erişim reddedildi") || r.includes("yetkisiz"))
          return console.error(`Access denied error while updating app: ${e}`, r), this.updatingApps.delete(e), {
            success: !1,
            message: `${e} güncellenemedi: Erişim reddedildi. Yönetici olarak çalıştırmayı deneyin.`
          };
        if (r.includes("No package found") || r.includes("bulunamadı") || r.includes("not found"))
          return console.error(`Package not found error while updating app: ${e}`, r), this.updatingApps.delete(e), {
            success: !1,
            message: `${e} paketi kaynakta bulunamadı.`
          };
        {
          console.error(`Error updating app: ${e}`, r), this.updatingApps.delete(e);
          const o = r.split(`
`).find(
            (a) => a.includes("failed") || a.includes("error") || a.includes("hata") || a.includes("başarısız")
          );
          return {
            success: !1,
            message: `${e} güncellenemedi: ${o || r.split(`
`)[0]}`
          };
        }
      } catch (n) {
        console.error(`Exception when updating app ${e}:`, n), this.updatingApps.delete(e);
        let s = n.message || "Bilinmeyen bir hata oluştu";
        return s.includes("0x80070002") || s.includes("not found") ? s = "Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun" : s.includes("0x8007139f") ? s = "Bu işlem için yönetici izinleri gerekli" : (s.includes("NetworkError") || s.includes("network")) && (s = "Ağ hatası: Lütfen internet bağlantınızı kontrol edin"), {
          success: !1,
          message: `Hata: ${s}`
        };
      }
    } catch (e) {
      return console.error("updateApp error:", e), {
        success: !1,
        message: `Hata: ${e.message || "Bilinmeyen bir hata oluştu"}`
      };
    }
  }
  /**
   * Seçili uygulamaları güncelleme
   * @param apps Güncellenecek uygulama listesi
   * @returns Güncelleme sonuçları
   */
  async update(i) {
    try {
      if (!Array.isArray(i) || i.length === 0)
        return [{
          id: "batch",
          success: !1,
          message: "Güncellenecek uygulama listesi boş veya geçersiz"
        }];
      const e = [];
      for (const n of i) {
        const s = await this.updateApp(n), r = typeof n == "string" ? n : n.id;
        e.push({
          id: r || "unknown",
          ...s
        });
      }
      return e;
    } catch (e) {
      return console.error("Batch update error:", e), [{
        id: "batch",
        success: !1,
        message: `Toplu güncelleme hatası: ${e.message || "Bilinmeyen bir hata oluştu"}`
      }];
    }
  }
  /**
   * Winget ile uygulama yükleme
   * @param appId Uygulamanın ID'si
   * @returns İşlem sonucu
   */
  async installApp(i) {
    try {
      if (!this.wingetAvailable && (await this.checkWingetAvailability(), !this.wingetAvailable))
        return {
          success: !1,
          message: "Winget yüklü değil veya erişilemiyor"
        };
      if (console.log(`Installing app with ID: ${i}`), this.installingApps.has(i))
        return { success: !1, message: "Bu uygulama zaten yükleniyor" };
      this.installingApps.add(i);
      try {
        if ((await this.getInstalledApps()).some((r) => r.id === i))
          return this.installingApps.delete(i), {
            success: !1,
            message: `${i} uygulaması zaten yüklü`
          };
        const s = await this.executeCommand("install", [i, "--source", "winget", "--accept-source-agreements", "--accept-package-agreements"]);
        return s.includes("successfully") || s.includes("başarıyla") ? (console.log(`Successfully installed app: ${i}`), this.installingApps.delete(i), {
          success: !0,
          message: `${i} başarıyla yüklendi`
        }) : s.includes("is already installed") || s.includes("zaten yüklü") ? (console.log(`App is already installed: ${i}`), this.installingApps.delete(i), {
          success: !0,
          message: `${i} zaten yüklü`
        }) : !s.includes("failed") && !s.includes("error") ? (console.log(`App installed with custom message: ${i}`), this.installingApps.delete(i), {
          success: !0,
          message: `${i} yüklendi: ${s.split(`
`)[0]}`
        }) : (console.error(`Error installing app: ${i}`, s), this.installingApps.delete(i), {
          success: !1,
          message: `${i} yüklenemedi: ${s.split(`
`)[0]}`
        });
      } catch (e) {
        return console.error(`Exception when installing app ${i}:`, e), this.installingApps.delete(i), {
          success: !1,
          message: `Hata: ${e.message || "Bilinmeyen bir hata oluştu"}`
        };
      }
    } catch (e) {
      return console.error("installApp error:", e), {
        success: !1,
        message: `Hata: ${e.message || "Bilinmeyen bir hata oluştu"}`
      };
    }
  }
  /**
   * Winget ile uygulama kaldırma
   * @param appId Kaldırılacak uygulamanın ID'si
   * @returns İşlem sonucu
   */
  async uninstallApp(i) {
    try {
      if (!this.wingetAvailable && (await this.checkWingetAvailability(), !this.wingetAvailable))
        return {
          success: !1,
          message: "Winget yüklü değil veya erişilemiyor"
        };
      if (console.log(`Uninstalling app with ID: ${i}`), !(await this.getInstalledApps()).some((r) => r.id === i))
        return {
          success: !1,
          message: `${i} uygulaması yüklü değil`
        };
      const s = await this.executeCommand("uninstall", [i, "--accept-source-agreements"]);
      return s.includes("successfully") || s.includes("başarıyla") ? (console.log(`Successfully uninstalled app: ${i}`), (await this.getInstalledApps()).some((a) => a.id === i) ? (console.error(`App ${i} is still installed despite successful uninstall message`), {
        success: !1,
        message: `${i} kaldırma işlemi başarısız oldu: Uygulama hala yüklü görünüyor`
      }) : {
        success: !0,
        message: `${i} başarıyla kaldırıldı`
      }) : !s.includes("failed") && !s.includes("error") ? (console.log(`App uninstalled with custom message: ${i}`), (await this.getInstalledApps()).some((a) => a.id === i) ? (console.error(`App ${i} is still installed despite successful uninstall message`), {
        success: !1,
        message: `${i} kaldırma işlemi başarısız oldu: Uygulama hala yüklü görünüyor`
      }) : {
        success: !0,
        message: `${i} kaldırıldı: ${s.split(`
`)[0]}`
      }) : (console.error(`Error uninstalling app: ${i}`, s), {
        success: !1,
        message: `${i} kaldırılamadı: ${s.split(`
`)[0]}`
      });
    } catch (e) {
      return console.error("uninstallApp error:", e), {
        success: !1,
        message: `Hata: ${e.message || "Bilinmeyen bir hata oluştu"}`
      };
    }
  }
  /**
   * Mock veri üreten yardımcı metod
   * @returns Örnek uygulama listesi
   */
  generateMockData() {
    return this.mockApps.map((i) => {
      const e = i.name.replace(/\s+/g, ".").toLowerCase();
      return {
        ...i,
        id: e
        // Uygulamanın güncelleme durumunu korumak için burada değişiklik yapmıyoruz
      };
    });
  }
  async executeCommand(i, e = []) {
    try {
      try {
        return await new Promise((s, r) => {
          console.log(`Executing winget command: winget ${i} ${e.join(" ")}`);
          const o = xn("winget", [i, ...e], {
            shell: !0
          });
          let a = "", l = "";
          o.stdout.on("data", (u) => {
            const f = u.toString();
            a += f, console.log(`[winget stdout]: ${f}`);
          }), o.stderr.on("data", (u) => {
            const f = u.toString();
            l += f, console.error(`[winget stderr]: ${f}`);
          }), o.on("close", (u) => {
            if (console.log(`Winget command exited with code ${u}`), u !== 0) {
              const f = l || `Winget komutu ${u} kodu ile başarısız oldu`, p = {
                command: `winget ${i} ${e.join(" ")}`,
                exitCode: u,
                stdout: a,
                stderr: l
              };
              console.error("Winget command failed:", p), l.includes("0x80070002") || l.includes("not found") ? r(new Error("Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun")) : l.includes("0x8007139f") ? r(new Error("Bu işlem için yönetici izinleri gerekli olabilir")) : l.includes("NetworkError") || l.includes("network") ? r(new Error("Ağ hatası: Lütfen internet bağlantınızı kontrol edin")) : l.includes("Failed to update package") ? r(new Error("Paket güncellenirken hata oluştu: Güncelleme engellenmiş veya paket kilitli olabilir")) : l.includes("Access denied") || l.includes("access is denied") ? r(new Error("Erişim reddedildi: Bu işlem için yönetici izinleri gerekli olabilir")) : l.includes("Package not found") ? r(new Error("Paket bulunamadı: Belirtilen paket mevcut değil veya kaynak kullanılamıyor")) : r(new Error(f));
            } else
              a.trim() ? ((a.includes("failed") || a.includes("error")) && console.warn("Winget command output contains error indicators:", a), s(a)) : (console.warn("Winget command returned empty output"), s("Komut başarıyla çalıştı fakat çıktı üretmedi"));
          }), o.on("error", (u) => {
            console.error("Winget process error:", u), r(new Error(`Winget komutu çalıştırılamadı: ${u.message}`));
          });
          const c = setTimeout(() => {
            o.kill(), console.error("Winget command timed out after 30 seconds"), r(new Error("Winget komutu zaman aşımına uğradı. İşlem iptal edildi."));
          }, 3e4);
          o.on("close", () => clearTimeout(c));
        });
      } catch (n) {
        throw console.error(`Winget command failed: ${n.message}`), n;
      }
    } catch (n) {
      throw console.error("Winget executeCommand error:", n), n;
    }
  }
  parseInstalledAppsList(i) {
    try {
      console.log("Parsing winget list output:", i.slice(0, 200) + "...");
      const e = i.split(`
`);
      let n = 0;
      for (let o = 0; o < e.length; o++)
        if (e[o].includes("Name") && e[o].includes("Id") && e[o].includes("Version")) {
          n = o + 2;
          break;
        }
      n === 0 && (console.warn("Winget output header not found, using default parsing logic"), n = 2);
      const r = e.slice(n).map((o) => o.trim()).filter((o) => o.length > 0).map((o) => {
        try {
          const a = o.split(/\s{2,}/);
          return a.length < 3 ? (console.warn("Invalid winget output line format:", o), null) : {
            name: a[0] || "Unknown App",
            id: a[1] || "",
            version: a[2] || "",
            newVersion: a[3] || ""
          };
        } catch (a) {
          return console.warn("Error parsing winget output line:", o, a), null;
        }
      }).filter((o) => o !== null);
      return console.log(`Successfully parsed ${r.length} applications`), r;
    } catch (e) {
      return console.error("Error parsing winget output:", e), console.log("Returning mock data due to parsing error"), this.generateMockData();
    }
  }
  parseSearchResults(i) {
    try {
      console.log("Parsing winget search output:", i.slice(0, 200) + "...");
      const e = i.split(`
`);
      let n = 0;
      for (let o = 0; o < e.length; o++)
        if (e[o].includes("Name") && e[o].includes("Id") && e[o].includes("Version")) {
          n = o + 2;
          break;
        }
      n === 0 && (console.warn("Winget search output header not found, using default parsing logic"), n = 2);
      const r = e.slice(n).map((o) => o.trim()).filter((o) => o.length > 0).map((o) => {
        try {
          const a = o.split(/\s{2,}/);
          return a.length < 2 ? (console.warn("Invalid winget search output line format:", o), null) : {
            name: a[0] || "Unknown App",
            id: a[1] || "",
            version: a[2] || "",
            installed: !1
            // Varsayılan olarak yüklü değil
          };
        } catch (a) {
          return console.warn("Error parsing winget search output line:", o, a), null;
        }
      }).filter((o) => o !== null);
      return console.log(`Successfully parsed ${r.length} search results`), r;
    } catch (e) {
      return console.error("Error parsing winget search output:", e), console.log("Returning mock data due to parsing error"), this.mockApps.filter((n) => n.name.toLowerCase().includes("")).map((n) => ({
        ...n,
        id: n.name.replace(/\s+/g, ".").toLowerCase(),
        installed: !1
      }));
    }
  }
}
class ku {
  constructor() {
    Ge(this, "systemInfoService");
    Ge(this, "wingetService");
    this.systemInfoService = new Bu(), this.wingetService = new Vu(wi);
  }
  /**
   * Tüm IPC işleyicilerini kaydeder
   */
  registerHandlers() {
    this.registerSystemInfoHandlers(), this.registerWingetHandlers();
  }
  /**
   * Sistem bilgileriyle ilgili IPC işleyicilerini kaydeder
   */
  registerSystemInfoHandlers() {
    Ot.handle("getSystemInfo", async () => {
      try {
        const i = await this.systemInfoService.getAllSystemInfo();
        try {
          const e = await this.wingetService.getInstalledApps();
          Array.isArray(e) && (i.totalApps = e.length);
        } catch (e) {
          console.error("Error getting installed apps count:", e), i.totalApps = 0;
        }
        return i;
      } catch (i) {
        return console.error("Error getting system info:", i), {
          cpu: "Error getting system info",
          ram: "Unknown",
          os: "Unknown",
          version: "Unknown",
          totalApps: 0
        };
      }
    });
  }
  /**
   * Winget ile ilgili IPC işleyicilerini kaydeder
   */
  registerWingetHandlers() {
    Ot.handle("get-installed-apps", async () => {
      try {
        const i = await this.wingetService.getInstalledApps();
        return i && typeof i == "object" && "error" in i || Array.isArray(i) ? i : (console.error("Unexpected result format from getInstalledApps:", i), { error: "Unexpected result format from getInstalledApps" });
      } catch (i) {
        return console.error("IPC handler get-installed-apps error:", i), { error: i.message || "Uygulama listesi alınırken bir hata oluştu" };
      }
    }), Ot.handle("search-apps", async (i, e) => {
      try {
        const n = await this.wingetService.searchApps(e);
        return n && typeof n == "object" && "error" in n || Array.isArray(n) ? n : (console.error("Unexpected result format from searchApps:", n), { error: "Unexpected result format from searchApps" });
      } catch (n) {
        return console.error("IPC handler search-apps error:", n), { error: n.message || "Uygulama araması yapılırken bir hata oluştu" };
      }
    }), Ot.handle("update-app", async (i, e) => {
      try {
        const n = await this.wingetService.updateApp(e);
        return n && typeof n == "object" && "success" in n ? n : { success: !0, message: n };
      } catch (n) {
        return console.error("IPC handler update-app error:", n), {
          success: !1,
          message: n.message || "Uygulama güncellenirken bir hata oluştu",
          details: n.stack
        };
      }
    }), Ot.handle("install-app", async (i, e) => {
      try {
        const n = await this.wingetService.installApp(e);
        return n && typeof n == "object" && "success" in n ? n : { success: !0, message: n };
      } catch (n) {
        return console.error("IPC handler install-app error:", n), {
          success: !1,
          message: n.message || "Uygulama yüklenirken bir hata oluştu",
          details: n.stack
        };
      }
    }), Ot.handle("uninstall-app", async (i, e) => {
      try {
        const n = await this.wingetService.uninstallApp(e);
        return n && typeof n == "object" && "success" in n ? n : { success: !0, message: n };
      } catch (n) {
        return console.error("IPC handler uninstall-app error:", n), {
          success: !1,
          message: n.message || "Uygulama kaldırılırken bir hata oluştu",
          details: n.stack
        };
      }
    }), Ot.handle("install-winget", async () => {
      try {
        return await this.wingetService.installWinget();
      } catch (i) {
        return console.error("IPC handler install-winget error:", i), {
          success: !1,
          message: i.message || "Winget yüklenirken bir hata oluştu",
          details: i.stack
        };
      }
    });
  }
}
go(import.meta.url);
const lo = Dt.dirname(yo(import.meta.url));
process.env.APP_ROOT = Dt.join(lo, "..");
const Kn = process.env.VITE_DEV_SERVER_URL, ep = Dt.join(process.env.APP_ROOT, "dist-electron"), uo = Dt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Kn ? Dt.join(process.env.APP_ROOT, "public") : uo;
const Nu = "https://yunusemretopcu.com/uploads/wingetui/icon.svg";
let Je;
function po() {
  Je = new hs({
    width: 1200,
    height: 830,
    resizable: !0,
    icon: Nu,
    webPreferences: {
      preload: Dt.join(lo, "preload.mjs")
    }
  }), new ku().registerHandlers(), Je.webContents.on("did-finish-load", () => {
    console.log("Page Loaded"), Je == null || Je.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Kn ? Je.loadURL(Kn) : Je.loadFile(Dt.join(uo, "index.html"));
}
wi.on("window-all-closed", () => {
  process.platform !== "darwin" && (wi.quit(), Je = null);
});
wi.on("activate", () => {
  hs.getAllWindows().length === 0 && po();
});
wi.whenReady().then(po);
export {
  ep as MAIN_DIST,
  uo as RENDERER_DIST,
  Kn as VITE_DEV_SERVER_URL
};
