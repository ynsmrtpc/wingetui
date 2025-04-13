var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
import { screen, ipcMain, app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path$3 from "node:path";
import os$a, { platform } from "os";
import require$$1$2 from "fs";
import require$$2$1 from "path";
import require$$1$1, { exec as exec$h, spawn as spawn$1 } from "child_process";
import require$$4$1, { promisify as promisify$1 } from "util";
import require$$5$1 from "https";
import require$$6$1 from "http";
import require$$0$2 from "net";
import require$$0$3 from "buffer";
import require$$1$3 from "string_decoder";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lib$1 = {};
const version = "5.25.11";
const require$$0$1 = {
  version
};
var util$j = {};
const os$9 = os$a;
const fs$a = require$$1$2;
const path$2 = require$$2$1;
const spawn = require$$1$1.spawn;
const exec$g = require$$1$1.exec;
const execSync$b = require$$1$1.execSync;
const util$i = require$$4$1;
let _platform$h = process.platform;
const _linux$g = _platform$h === "linux" || _platform$h === "android";
const _darwin$g = _platform$h === "darwin";
const _windows$h = _platform$h === "win32";
const _freebsd$f = _platform$h === "freebsd";
const _openbsd$f = _platform$h === "openbsd";
const _netbsd$f = _platform$h === "netbsd";
let _cores = 0;
let wmicPath = "";
let codepage = "";
let _smartMonToolsInstalled = null;
let _rpi_cpuinfo = null;
const WINDIR = process.env.WINDIR || "C:\\Windows";
let _psChild;
let _psResult = "";
let _psCmds = [];
let _psPersistent = false;
let _powerShell = "";
const _psToUTF8 = "$OutputEncoding = [System.Console]::OutputEncoding = [System.Console]::InputEncoding = [System.Text.Encoding]::UTF8 ; ";
const _psCmdStart = "--###START###--";
const _psError = "--ERROR--";
const _psCmdSeperator = "--###ENDCMD###--";
const _psIdSeperator = "--##ID##--";
const execOptsWin = {
  windowsHide: true,
  maxBuffer: 1024 * 2e4,
  encoding: "UTF-8",
  env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
};
const execOptsLinux = {
  maxBuffer: 1024 * 2e4,
  encoding: "UTF-8",
  stdio: ["pipe", "pipe", "ignore"]
};
function toInt(value) {
  let result2 = parseInt(value, 10);
  if (isNaN(result2)) {
    result2 = 0;
  }
  return result2;
}
function splitByNumber(str) {
  let numberStarted = false;
  let num = "";
  let cpart = "";
  for (const c of str) {
    if (c >= "0" && c <= "9" || numberStarted) {
      numberStarted = true;
      num += c;
    } else {
      cpart += c;
    }
  }
  return [cpart, num];
}
const stringObj = new String();
const stringReplace = new String().replace;
const stringToLower = new String().toLowerCase;
const stringToString = new String().toString;
const stringSubstr = new String().substr;
const stringSubstring = new String().substring;
const stringTrim = new String().trim;
const stringStartWith = new String().startsWith;
const mathMin = Math.min;
function isFunction(functionToCheck) {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
}
function unique(obj) {
  let uniques = [];
  let stringify = {};
  for (let i = 0; i < obj.length; i++) {
    let keys = Object.keys(obj[i]);
    keys.sort(function(a, b) {
      return a - b;
    });
    let str = "";
    for (let j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j]);
      str += JSON.stringify(obj[i][keys[j]]);
    }
    if (!{}.hasOwnProperty.call(stringify, str)) {
      uniques.push(obj[i]);
      stringify[str] = true;
    }
  }
  return uniques;
}
function sortByKey(array, keys) {
  return array.sort(function(a, b) {
    let x = "";
    let y = "";
    keys.forEach(function(key2) {
      x = x + a[key2];
      y = y + b[key2];
    });
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
function cores() {
  if (_cores === 0) {
    _cores = os$9.cpus().length;
  }
  return _cores;
}
function getValue(lines, property, separator, trimmed, lineMatch) {
  separator = separator || ":";
  property = property.toLowerCase();
  trimmed = trimmed || false;
  lineMatch = lineMatch || false;
  let result2 = "";
  lines.some((line) => {
    let lineLower = line.toLowerCase().replace(/\t/g, "");
    if (trimmed) {
      lineLower = lineLower.trim();
    }
    if (lineLower.startsWith(property) && (lineMatch ? lineLower.match(property + separator) || lineLower.match(property + " " + separator) : true)) {
      const parts = trimmed ? line.trim().split(separator) : line.split(separator);
      if (parts.length >= 2) {
        parts.shift();
        result2 = parts.join(separator).trim();
        return true;
      }
    }
  });
  return result2;
}
function decodeEscapeSequence(str, base) {
  base = base || 16;
  return str.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
    return String.fromCharCode(parseInt(arguments[1], base));
  });
}
function detectSplit(str) {
  let seperator = "";
  let part = 0;
  str.split("").forEach((element) => {
    if (element >= "0" && element <= "9") {
      if (part === 1) {
        part++;
      }
    } else {
      if (part === 0) {
        part++;
      }
      if (part === 1) {
        seperator += element;
      }
    }
  });
  return seperator;
}
function parseTime(t, pmDesignator) {
  pmDesignator = pmDesignator || "";
  t = t.toUpperCase();
  let hour = 0;
  let min = 0;
  let splitter = detectSplit(t);
  let parts = t.split(splitter);
  if (parts.length >= 2) {
    if (parts[2]) {
      parts[1] += parts[2];
    }
    let isPM = parts[1] && parts[1].toLowerCase().indexOf("pm") > -1 || parts[1].toLowerCase().indexOf("p.m.") > -1 || parts[1].toLowerCase().indexOf("p. m.") > -1 || parts[1].toLowerCase().indexOf("n") > -1 || parts[1].toLowerCase().indexOf("ch") > -1 || parts[1].toLowerCase().indexOf("ös") > -1 || pmDesignator && parts[1].toLowerCase().indexOf(pmDesignator) > -1;
    hour = parseInt(parts[0], 10);
    min = parseInt(parts[1], 10);
    hour = isPM && hour < 12 ? hour + 12 : hour;
    return ("0" + hour).substr(-2) + ":" + ("0" + min).substr(-2);
  }
}
function parseDateTime(dt, culture) {
  const result2 = {
    date: "",
    time: ""
  };
  culture = culture || {};
  let dateFormat = (culture.dateFormat || "").toLowerCase();
  let pmDesignator = culture.pmDesignator || "";
  const parts = dt.split(" ");
  if (parts[0]) {
    if (parts[0].indexOf("/") >= 0) {
      const dtparts = parts[0].split("/");
      if (dtparts.length === 3) {
        if (dtparts[0].length === 4) {
          result2.date = dtparts[0] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[2]).substr(-2);
        } else if (dtparts[2].length === 2) {
          if (dateFormat.indexOf("/d/") > -1 || dateFormat.indexOf("/dd/") > -1) {
            result2.date = "20" + dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
          } else {
            result2.date = "20" + dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
          }
        } else {
          const isEN = dt.toLowerCase().indexOf("pm") > -1 || dt.toLowerCase().indexOf("p.m.") > -1 || dt.toLowerCase().indexOf("p. m.") > -1 || dt.toLowerCase().indexOf("am") > -1 || dt.toLowerCase().indexOf("a.m.") > -1 || dt.toLowerCase().indexOf("a. m.") > -1;
          if ((isEN || dateFormat.indexOf("/d/") > -1 || dateFormat.indexOf("/dd/") > -1) && dateFormat.indexOf("dd/") !== 0) {
            result2.date = dtparts[2] + "-" + ("0" + dtparts[0]).substr(-2) + "-" + ("0" + dtparts[1]).substr(-2);
          } else {
            result2.date = dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
          }
        }
      }
    }
    if (parts[0].indexOf(".") >= 0) {
      const dtparts = parts[0].split(".");
      if (dtparts.length === 3) {
        if (dateFormat.indexOf(".d.") > -1 || dateFormat.indexOf(".dd.") > -1) {
          result2.date = dtparts[2] + "-" + ("0" + dtparts[0]).substr(-2) + "-" + ("0" + dtparts[1]).substr(-2);
        } else {
          result2.date = dtparts[2] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[0]).substr(-2);
        }
      }
    }
    if (parts[0].indexOf("-") >= 0) {
      const dtparts = parts[0].split("-");
      if (dtparts.length === 3) {
        result2.date = dtparts[0] + "-" + ("0" + dtparts[1]).substr(-2) + "-" + ("0" + dtparts[2]).substr(-2);
      }
    }
  }
  if (parts[1]) {
    parts.shift();
    let time2 = parts.join(" ");
    result2.time = parseTime(time2, pmDesignator);
  }
  return result2;
}
function parseHead(head, rights) {
  let space = rights > 0;
  let count = 1;
  let from = 0;
  let to = 0;
  let result2 = [];
  for (let i = 0; i < head.length; i++) {
    if (count <= rights) {
      if (/\s/.test(head[i]) && !space) {
        to = i - 1;
        result2.push({
          from,
          to: to + 1,
          cap: head.substring(from, to + 1)
        });
        from = to + 2;
        count++;
      }
      space = head[i] === " ";
    } else {
      if (!/\s/.test(head[i]) && space) {
        to = i - 1;
        if (from < to) {
          result2.push({
            from,
            to,
            cap: head.substring(from, to)
          });
        }
        from = to + 1;
        count++;
      }
      space = head[i] === " ";
    }
  }
  to = 5e3;
  result2.push({
    from,
    to,
    cap: head.substring(from, to)
  });
  let len = result2.length;
  for (let i = 0; i < len; i++) {
    if (result2[i].cap.replace(/\s/g, "").length === 0) {
      if (i + 1 < len) {
        result2[i].to = result2[i + 1].to;
        result2[i].cap = result2[i].cap + result2[i + 1].cap;
        result2.splice(i + 1, 1);
        len = len - 1;
      }
    }
  }
  return result2;
}
function findObjectByKey(array, key2, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key2] === value) {
      return i;
    }
  }
  return -1;
}
function getPowershell() {
  _powerShell = "powershell.exe";
  if (_windows$h) {
    const defaultPath = `${WINDIR}\\system32\\WindowsPowerShell\\v1.0\\powershell.exe`;
    if (fs$a.existsSync(defaultPath)) {
      _powerShell = defaultPath;
    }
  }
}
function getWmic() {
  if (os$9.type() === "Windows_NT" && !wmicPath) {
    wmicPath = WINDIR + "\\system32\\wbem\\wmic.exe";
    if (!fs$a.existsSync(wmicPath)) {
      try {
        const wmicPathArray = execSync$b("WHERE WMIC", execOptsWin).toString().split("\r\n");
        if (wmicPathArray && wmicPathArray.length) {
          wmicPath = wmicPathArray[0];
        } else {
          wmicPath = "wmic";
        }
      } catch (e) {
        wmicPath = "wmic";
      }
    }
  }
  return wmicPath;
}
function wmic(command) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      try {
        powerShell(getWmic() + " " + command).then((stdout) => {
          resolve(stdout, "");
        });
      } catch (e) {
        resolve("", e);
      }
    });
  });
}
function getVboxmanage() {
  return _windows$h ? `"${process.env.VBOX_INSTALL_PATH || process.env.VBOX_MSI_INSTALL_PATH}\\VBoxManage.exe"` : "vboxmanage";
}
function powerShellProceedResults(data) {
  let id = "";
  let parts;
  let res = "";
  if (data.indexOf(_psCmdStart) >= 0) {
    parts = data.split(_psCmdStart);
    const parts2 = parts[1].split(_psIdSeperator);
    id = parts2[0];
    if (parts2.length > 1) {
      data = parts2.slice(1).join(_psIdSeperator);
    }
  }
  if (data.indexOf(_psCmdSeperator) >= 0) {
    parts = data.split(_psCmdSeperator);
    res = parts[0];
  }
  let remove = -1;
  for (let i = 0; i < _psCmds.length; i++) {
    if (_psCmds[i].id === id) {
      remove = i;
      _psCmds[i].callback(res);
    }
  }
  if (remove >= 0) {
    _psCmds.splice(remove, 1);
  }
}
function powerShellStart() {
  if (!_psChild) {
    _psChild = spawn(_powerShell, ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-Command", "-"], {
      stdio: "pipe",
      windowsHide: true,
      maxBuffer: 1024 * 2e4,
      encoding: "UTF-8",
      env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
    });
    if (_psChild && _psChild.pid) {
      _psPersistent = true;
      _psChild.stdout.on("data", function(data) {
        _psResult = _psResult + data.toString("utf8");
        if (data.indexOf(_psCmdSeperator) >= 0) {
          powerShellProceedResults(_psResult);
          _psResult = "";
        }
      });
      _psChild.stderr.on("data", function() {
        powerShellProceedResults(_psResult + _psError);
      });
      _psChild.on("error", function() {
        powerShellProceedResults(_psResult + _psError);
      });
      _psChild.on("close", function() {
        if (_psChild) {
          _psChild.kill();
        }
      });
    }
  }
}
function powerShellRelease() {
  try {
    if (_psChild) {
      _psChild.stdin.write("exit" + os$9.EOL);
      _psChild.stdin.end();
      _psPersistent = false;
    }
  } catch (e) {
    if (_psChild) {
      _psChild.kill();
    }
  }
  _psChild = null;
}
function powerShell(cmd) {
  if (_psPersistent) {
    const id = Math.random().toString(36).substring(2, 12);
    return new Promise((resolve) => {
      process.nextTick(() => {
        function callback(data) {
          resolve(data);
        }
        _psCmds.push({
          id,
          cmd,
          callback,
          start: /* @__PURE__ */ new Date()
        });
        try {
          if (_psChild && _psChild.pid) {
            _psChild.stdin.write(_psToUTF8 + "echo " + _psCmdStart + id + _psIdSeperator + "; " + os$9.EOL + cmd + os$9.EOL + "echo " + _psCmdSeperator + os$9.EOL);
          }
        } catch (e) {
          resolve("");
        }
      });
    });
  } else {
    let result2 = "";
    return new Promise((resolve) => {
      process.nextTick(() => {
        try {
          const child = spawn(_powerShell, ["-NoProfile", "-NoLogo", "-InputFormat", "Text", "-NoExit", "-ExecutionPolicy", "Unrestricted", "-Command", "-"], {
            stdio: "pipe",
            windowsHide: true,
            maxBuffer: 1024 * 2e4,
            encoding: "UTF-8",
            env: Object.assign({}, process.env, { LANG: "en_US.UTF-8" })
          });
          if (child && !child.pid) {
            child.on("error", function() {
              resolve(result2);
            });
          }
          if (child && child.pid) {
            child.stdout.on("data", function(data) {
              result2 = result2 + data.toString("utf8");
            });
            child.stderr.on("data", function() {
              child.kill();
              resolve(result2);
            });
            child.on("close", function() {
              child.kill();
              resolve(result2);
            });
            child.on("error", function() {
              child.kill();
              resolve(result2);
            });
            try {
              child.stdin.write(_psToUTF8 + cmd + os$9.EOL);
              child.stdin.write("exit" + os$9.EOL);
              child.stdin.end();
            } catch (e) {
              child.kill();
              resolve(result2);
            }
          } else {
            resolve(result2);
          }
        } catch (e) {
          resolve(result2);
        }
      });
    });
  }
}
function execSafe(cmd, args, options) {
  let result2 = "";
  options = options || {};
  return new Promise((resolve) => {
    process.nextTick(() => {
      try {
        const child = spawn(cmd, args, options);
        if (child && !child.pid) {
          child.on("error", function() {
            resolve(result2);
          });
        }
        if (child && child.pid) {
          child.stdout.on("data", function(data) {
            result2 += data.toString();
          });
          child.on("close", function() {
            child.kill();
            resolve(result2);
          });
          child.on("error", function() {
            child.kill();
            resolve(result2);
          });
        } else {
          resolve(result2);
        }
      } catch (e) {
        resolve(result2);
      }
    });
  });
}
function getCodepage() {
  if (_windows$h) {
    if (!codepage) {
      try {
        const stdout = execSync$b("chcp", execOptsWin);
        const lines = stdout.toString().split("\r\n");
        const parts = lines[0].split(":");
        codepage = parts.length > 1 ? parts[1].replace(".", "").trim() : "";
      } catch (err) {
        codepage = "437";
      }
    }
    return codepage;
  }
  if (_linux$g || _darwin$g || _freebsd$f || _openbsd$f || _netbsd$f) {
    if (!codepage) {
      try {
        const stdout = execSync$b("echo $LANG", execOptsLinux);
        const lines = stdout.toString().split("\r\n");
        const parts = lines[0].split(".");
        codepage = parts.length > 1 ? parts[1].trim() : "";
        if (!codepage) {
          codepage = "UTF-8";
        }
      } catch (err) {
        codepage = "UTF-8";
      }
    }
    return codepage;
  }
}
function smartMonToolsInstalled() {
  if (_smartMonToolsInstalled !== null) {
    return _smartMonToolsInstalled;
  }
  _smartMonToolsInstalled = false;
  if (_windows$h) {
    try {
      const pathArray = execSync$b("WHERE smartctl 2>nul", execOptsWin).toString().split("\r\n");
      if (pathArray && pathArray.length) {
        _smartMonToolsInstalled = pathArray[0].indexOf(":\\") >= 0;
      } else {
        _smartMonToolsInstalled = false;
      }
    } catch (e) {
      _smartMonToolsInstalled = false;
    }
  }
  if (_linux$g || _darwin$g || _freebsd$f || _openbsd$f || _netbsd$f) {
    try {
      const pathArray = execSync$b("which smartctl 2>/dev/null", execOptsLinux).toString().split("\r\n");
      _smartMonToolsInstalled = pathArray.length > 0;
    } catch (e) {
      util$i.noop();
    }
  }
  return _smartMonToolsInstalled;
}
function isRaspberry(cpuinfo) {
  const PI_MODEL_NO = [
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
  if (_rpi_cpuinfo !== null) {
    cpuinfo = _rpi_cpuinfo;
  } else if (cpuinfo === void 0) {
    try {
      cpuinfo = fs$a.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split("\n");
      _rpi_cpuinfo = cpuinfo;
    } catch (e) {
      return false;
    }
  }
  const hardware = getValue(cpuinfo, "hardware");
  const model = getValue(cpuinfo, "model");
  return hardware && PI_MODEL_NO.indexOf(hardware) > -1 || model && model.indexOf("Raspberry Pi") > -1;
}
function isRaspbian() {
  let osrelease = [];
  try {
    osrelease = fs$a.readFileSync("/etc/os-release", { encoding: "utf8" }).toString().split("\n");
  } catch (e) {
    return false;
  }
  const id = getValue(osrelease, "id", "=");
  return id && id.indexOf("raspbian") > -1;
}
function execWin(cmd, opts, callback) {
  if (!callback) {
    callback = opts;
    opts = execOptsWin;
  }
  let newCmd = "chcp 65001 > nul && cmd /C " + cmd + " && chcp " + codepage + " > nul";
  exec$g(newCmd, opts, function(error, stdout) {
    callback(error, stdout);
  });
}
function darwinXcodeExists() {
  const cmdLineToolsExists = fs$a.existsSync("/Library/Developer/CommandLineTools/usr/bin/");
  const xcodeAppExists = fs$a.existsSync("/Applications/Xcode.app/Contents/Developer/Tools");
  const xcodeExists = fs$a.existsSync("/Library/Developer/Xcode/");
  return cmdLineToolsExists || xcodeExists || xcodeAppExists;
}
function nanoSeconds() {
  const time2 = process.hrtime();
  if (!Array.isArray(time2) || time2.length !== 2) {
    return 0;
  }
  return +time2[0] * 1e9 + +time2[1];
}
function countUniqueLines(lines, startingWith) {
  startingWith = startingWith || "";
  const uniqueLines = [];
  lines.forEach((line) => {
    if (line.startsWith(startingWith)) {
      if (uniqueLines.indexOf(line) === -1) {
        uniqueLines.push(line);
      }
    }
  });
  return uniqueLines.length;
}
function countLines(lines, startingWith) {
  startingWith = startingWith || "";
  const uniqueLines = [];
  lines.forEach((line) => {
    if (line.startsWith(startingWith)) {
      uniqueLines.push(line);
    }
  });
  return uniqueLines.length;
}
function sanitizeShellString(str, strict) {
  if (typeof strict === "undefined") {
    strict = false;
  }
  const s = str || "";
  let result2 = "";
  const l = mathMin(s.length, 2e3);
  for (let i = 0; i <= l; i++) {
    if (!(s[i] === void 0 || s[i] === ">" || s[i] === "<" || s[i] === "*" || s[i] === "?" || s[i] === "[" || s[i] === "]" || s[i] === "|" || s[i] === "˚" || s[i] === "$" || s[i] === ";" || s[i] === "&" || s[i] === "]" || s[i] === "#" || s[i] === "\\" || s[i] === "	" || s[i] === "\n" || s[i] === "\r" || s[i] === "'" || s[i] === "`" || s[i] === '"' || s[i].length > 1 || strict && s[i] === "(" || strict && s[i] === ")" || strict && s[i] === "@" || strict && s[i] === " " || strict && s[i] == "{" || strict && s[i] == ";" || strict && s[i] == "}")) {
      result2 = result2 + s[i];
    }
  }
  return result2;
}
function isPrototypePolluted() {
  const s = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let notPolluted = true;
  let st = "";
  try {
    st.__proto__.replace = stringReplace;
    st.__proto__.toLowerCase = stringToLower;
    st.__proto__.toString = stringToString;
    st.__proto__.substr = stringSubstr;
    st.__proto__.substring = stringSubstring;
    st.__proto__.trim = stringTrim;
    st.__proto__.startsWith = stringStartWith;
  } catch (e) {
    Object.setPrototypeOf(st, stringObj);
  }
  notPolluted = notPolluted || s.length !== 62;
  const ms = Date.now();
  if (typeof ms === "number" && ms > 16e11) {
    const l = ms % 100 + 15;
    for (let i = 0; i < l; i++) {
      const r = Math.random() * 61.99999999 + 1;
      const rs = parseInt(Math.floor(r).toString(), 10);
      const rs2 = parseInt(r.toString().split(".")[0], 10);
      const q = Math.random() * 61.99999999 + 1;
      const qs = parseInt(Math.floor(q).toString(), 10);
      const qs2 = parseInt(q.toString().split(".")[0], 10);
      notPolluted = notPolluted && r !== q;
      notPolluted = notPolluted && rs === rs2 && qs === qs2;
      st += s[rs - 1];
    }
    notPolluted = notPolluted && st.length === l;
    let p = Math.random() * l * 0.9999999999;
    let stm = st.substr(0, p) + " " + st.substr(p, 2e3);
    try {
      stm.__proto__.replace = stringReplace;
    } catch (e) {
      Object.setPrototypeOf(stm, stringObj);
    }
    let sto = stm.replace(/ /g, "");
    notPolluted = notPolluted && st === sto;
    p = Math.random() * l * 0.9999999999;
    stm = st.substr(0, p) + "{" + st.substr(p, 2e3);
    sto = stm.replace(/{/g, "");
    notPolluted = notPolluted && st === sto;
    p = Math.random() * l * 0.9999999999;
    stm = st.substr(0, p) + "*" + st.substr(p, 2e3);
    sto = stm.replace(/\*/g, "");
    notPolluted = notPolluted && st === sto;
    p = Math.random() * l * 0.9999999999;
    stm = st.substr(0, p) + "$" + st.substr(p, 2e3);
    sto = stm.replace(/\$/g, "");
    notPolluted = notPolluted && st === sto;
    const stl = st.toLowerCase();
    notPolluted = notPolluted && stl.length === l && stl[l - 1] && !stl[l];
    for (let i = 0; i < l; i++) {
      const s1 = st[i];
      try {
        s1.__proto__.toLowerCase = stringToLower;
      } catch (e) {
        Object.setPrototypeOf(st, stringObj);
      }
      const s2 = stl ? stl[i] : "";
      const s1l = s1.toLowerCase();
      notPolluted = notPolluted && s1l[0] === s2 && s1l[0] && !s1l[1];
    }
  }
  return !notPolluted;
}
function hex2bin(hex) {
  return ("00000000" + parseInt(hex, 16).toString(2)).substr(-8);
}
function getFilesInPath(source) {
  const lstatSync = fs$a.lstatSync;
  const readdirSync = fs$a.readdirSync;
  const join = path$2.join;
  function isDirectory(source2) {
    return lstatSync(source2).isDirectory();
  }
  function isFile(source2) {
    return lstatSync(source2).isFile();
  }
  function getDirectories(source2) {
    return readdirSync(source2).map(function(name) {
      return join(source2, name);
    }).filter(isDirectory);
  }
  function getFiles(source2) {
    return readdirSync(source2).map(function(name) {
      return join(source2, name);
    }).filter(isFile);
  }
  function getFilesRecursively(source2) {
    try {
      let dirs = getDirectories(source2);
      let files = dirs.map(function(dir) {
        return getFilesRecursively(dir);
      }).reduce(function(a, b) {
        return a.concat(b);
      }, []);
      return files.concat(getFiles(source2));
    } catch (e) {
      return [];
    }
  }
  if (fs$a.existsSync(source)) {
    return getFilesRecursively(source);
  } else {
    return [];
  }
}
function decodePiCpuinfo(lines) {
  if (_rpi_cpuinfo === null) {
    _rpi_cpuinfo = lines;
  } else if (lines === void 0) {
    lines = _rpi_cpuinfo;
  }
  const oldRevisionCodes = {
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
  };
  const processorList = [
    "BCM2835",
    "BCM2836",
    "BCM2837",
    "BCM2711",
    "BCM2712"
  ];
  const manufacturerList = [
    "Sony UK",
    "Egoman",
    "Embest",
    "Sony Japan",
    "Embest",
    "Stadium"
  ];
  const typeList = {
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
    "10": "CM3+",
    "11": "4B",
    "12": "Zero 2 W",
    "13": "400",
    "14": "CM4",
    "15": "CM4S",
    "16": "Internal use only",
    "17": "5",
    "18": "CM5",
    "19": "500",
    "1a": "CM5 Lite"
  };
  const revisionCode = getValue(lines, "revision", ":", true);
  const model = getValue(lines, "model:", ":", true);
  const serial = getValue(lines, "serial", ":", true);
  let result2 = {};
  if ({}.hasOwnProperty.call(oldRevisionCodes, revisionCode)) {
    result2 = {
      model,
      serial,
      revisionCode,
      memory: oldRevisionCodes[revisionCode].memory,
      manufacturer: oldRevisionCodes[revisionCode].manufacturer,
      processor: oldRevisionCodes[revisionCode].processor,
      type: oldRevisionCodes[revisionCode].type,
      revision: oldRevisionCodes[revisionCode].revision
    };
  } else {
    const revision = ("00000000" + getValue(lines, "revision", ":", true).toLowerCase()).substr(-8);
    const memSizeCode = parseInt(hex2bin(revision.substr(2, 1)).substr(5, 3), 2) || 0;
    const manufacturer = manufacturerList[parseInt(revision.substr(3, 1), 10)];
    const processor = processorList[parseInt(revision.substr(4, 1), 10)];
    const typeCode = revision.substr(5, 2);
    result2 = {
      model,
      serial,
      revisionCode,
      memory: 256 * Math.pow(2, memSizeCode),
      manufacturer,
      processor,
      type: {}.hasOwnProperty.call(typeList, typeCode) ? typeList[typeCode] : "",
      revision: "1." + revision.substr(7, 1)
    };
  }
  return result2;
}
function getRpiGpu(cpuinfo) {
  if (_rpi_cpuinfo === null && cpuinfo !== void 0) {
    _rpi_cpuinfo = cpuinfo;
  } else if (cpuinfo === void 0 && _rpi_cpuinfo !== null) {
    cpuinfo = _rpi_cpuinfo;
  } else {
    try {
      cpuinfo = fs$a.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split("\n");
      _rpi_cpuinfo = cpuinfo;
    } catch (e) {
      return false;
    }
  }
  const rpi = decodePiCpuinfo(cpuinfo);
  if (rpi.type === "4B" || rpi.type === "CM4" || rpi.type === "CM4S" || rpi.type === "400") {
    return "VideoCore VI";
  }
  if (rpi.type === "5" || rpi.type === "500") {
    return "VideoCore VII";
  }
  return "VideoCore IV";
}
function promiseAll(promises) {
  const resolvingPromises = promises.map(function(promise) {
    return new Promise(function(resolve) {
      let payload = new Array(2);
      promise.then(function(result2) {
        payload[0] = result2;
      }).catch(function(error) {
        payload[1] = error;
      }).then(function() {
        resolve(payload);
      });
    });
  });
  const errors = [];
  const results = [];
  return Promise.all(resolvingPromises).then(function(items) {
    items.forEach(function(payload) {
      if (payload[1]) {
        errors.push(payload[1]);
        results.push(null);
      } else {
        errors.push(null);
        results.push(payload[0]);
      }
    });
    return {
      errors,
      results
    };
  });
}
function promisify(nodeStyleFunction) {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
      nodeStyleFunction.apply(null, args);
    });
  };
}
function promisifySave(nodeStyleFunction) {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve) {
      args.push(function(err, data) {
        resolve(data);
      });
      nodeStyleFunction.apply(null, args);
    });
  };
}
function linuxVersion() {
  let result2 = "";
  if (_linux$g) {
    try {
      result2 = execSync$b("uname -v", execOptsLinux).toString();
    } catch (e) {
      result2 = "";
    }
  }
  return result2;
}
function plistParser(xmlStr) {
  const tags = ["array", "dict", "key", "string", "integer", "date", "real", "data", "boolean", "arrayEmpty"];
  const startStr = "<plist version";
  let pos = xmlStr.indexOf(startStr);
  let len = xmlStr.length;
  while (xmlStr[pos] !== ">" && pos < len) {
    pos++;
  }
  let depth = 0;
  let inTagStart = false;
  let inTagContent = false;
  let inTagEnd = false;
  let metaData = [{ tagStart: "", tagEnd: "", tagContent: "", key: "", data: null }];
  let c = "";
  let cn = xmlStr[pos];
  while (pos < len) {
    c = cn;
    if (pos + 1 < len) {
      cn = xmlStr[pos + 1];
    }
    if (c === "<") {
      inTagContent = false;
      if (cn === "/") {
        inTagEnd = true;
      } else if (metaData[depth].tagStart) {
        metaData[depth].tagContent = "";
        if (!metaData[depth].data) {
          metaData[depth].data = metaData[depth].tagStart === "array" ? [] : {};
        }
        depth++;
        metaData.push({ tagStart: "", tagEnd: "", tagContent: "", key: null, data: null });
        inTagStart = true;
        inTagContent = false;
      } else if (!inTagStart) {
        inTagStart = true;
      }
    } else if (c === ">") {
      if (metaData[depth].tagStart === "true/") {
        inTagStart = false;
        inTagEnd = true;
        metaData[depth].tagStart = "";
        metaData[depth].tagEnd = "/boolean";
        metaData[depth].data = true;
      }
      if (metaData[depth].tagStart === "false/") {
        inTagStart = false;
        inTagEnd = true;
        metaData[depth].tagStart = "";
        metaData[depth].tagEnd = "/boolean";
        metaData[depth].data = false;
      }
      if (metaData[depth].tagStart === "array/") {
        inTagStart = false;
        inTagEnd = true;
        metaData[depth].tagStart = "";
        metaData[depth].tagEnd = "/arrayEmpty";
        metaData[depth].data = [];
      }
      if (inTagContent) {
        inTagContent = false;
      }
      if (inTagStart) {
        inTagStart = false;
        inTagContent = true;
        if (metaData[depth].tagStart === "array") {
          metaData[depth].data = [];
        }
        if (metaData[depth].tagStart === "dict") {
          metaData[depth].data = {};
        }
      }
      if (inTagEnd) {
        inTagEnd = false;
        if (metaData[depth].tagEnd && tags.indexOf(metaData[depth].tagEnd.substr(1)) >= 0) {
          if (metaData[depth].tagEnd === "/dict" || metaData[depth].tagEnd === "/array") {
            if (depth > 1 && metaData[depth - 2].tagStart === "array") {
              metaData[depth - 2].data.push(metaData[depth - 1].data);
            }
            if (depth > 1 && metaData[depth - 2].tagStart === "dict") {
              metaData[depth - 2].data[metaData[depth - 1].key] = metaData[depth - 1].data;
            }
            depth--;
            metaData.pop();
            metaData[depth].tagContent = "";
            metaData[depth].tagStart = "";
            metaData[depth].tagEnd = "";
          } else {
            if (metaData[depth].tagEnd === "/key" && metaData[depth].tagContent) {
              metaData[depth].key = metaData[depth].tagContent;
            } else {
              if (metaData[depth].tagEnd === "/real" && metaData[depth].tagContent) {
                metaData[depth].data = parseFloat(metaData[depth].tagContent) || 0;
              }
              if (metaData[depth].tagEnd === "/integer" && metaData[depth].tagContent) {
                metaData[depth].data = parseInt(metaData[depth].tagContent) || 0;
              }
              if (metaData[depth].tagEnd === "/string" && metaData[depth].tagContent) {
                metaData[depth].data = metaData[depth].tagContent || "";
              }
              if (metaData[depth].tagEnd === "/boolean") {
                metaData[depth].data = metaData[depth].tagContent || false;
              }
              if (metaData[depth].tagEnd === "/arrayEmpty") {
                metaData[depth].data = metaData[depth].tagContent || [];
              }
              if (depth > 0 && metaData[depth - 1].tagStart === "array") {
                metaData[depth - 1].data.push(metaData[depth].data);
              }
              if (depth > 0 && metaData[depth - 1].tagStart === "dict") {
                metaData[depth - 1].data[metaData[depth].key] = metaData[depth].data;
              }
            }
            metaData[depth].tagContent = "";
            metaData[depth].tagStart = "";
            metaData[depth].tagEnd = "";
          }
        }
        metaData[depth].tagEnd = "";
        inTagStart = false;
        inTagContent = false;
      }
    } else {
      if (inTagStart) {
        metaData[depth].tagStart += c;
      }
      if (inTagEnd) {
        metaData[depth].tagEnd += c;
      }
      if (inTagContent) {
        metaData[depth].tagContent += c;
      }
    }
    pos++;
  }
  return metaData[0].data;
}
function strIsNumeric(str) {
  return typeof str === "string" && !isNaN(str) && !isNaN(parseFloat(str));
}
function plistReader(output) {
  const lines = output.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].indexOf(" = ") >= 0) {
      const lineParts = lines[i].split(" = ");
      lineParts[0] = lineParts[0].trim();
      if (!lineParts[0].startsWith('"')) {
        lineParts[0] = '"' + lineParts[0] + '"';
      }
      lineParts[1] = lineParts[1].trim();
      if (lineParts[1].indexOf('"') === -1 && lineParts[1].endsWith(";")) {
        const valueString = lineParts[1].substring(0, lineParts[1].length - 1);
        if (!strIsNumeric(valueString)) {
          lineParts[1] = `"${valueString}";`;
        }
      }
      if (lineParts[1].indexOf('"') >= 0 && lineParts[1].endsWith(";")) {
        const valueString = lineParts[1].substring(0, lineParts[1].length - 1).replace(/"/g, "");
        if (strIsNumeric(valueString)) {
          lineParts[1] = `${valueString};`;
        }
      }
      lines[i] = lineParts.join(" : ");
    }
    lines[i] = lines[i].replace(/\(/g, "[").replace(/\)/g, "]").replace(/;/g, ",").trim();
    if (lines[i].startsWith("}") && lines[i - 1] && lines[i - 1].endsWith(",")) {
      lines[i - 1] = lines[i - 1].substring(0, lines[i - 1].length - 1);
    }
  }
  output = lines.join("");
  let obj = {};
  try {
    obj = JSON.parse(output);
  } catch (e) {
  }
  return obj;
}
function semverCompare(v1, v2) {
  let res = 0;
  const parts1 = v1.split(".");
  const parts2 = v2.split(".");
  if (parts1[0] < parts2[0]) {
    res = 1;
  } else if (parts1[0] > parts2[0]) {
    res = -1;
  } else if (parts1[0] === parts2[0] && parts1.length >= 2 && parts2.length >= 2) {
    if (parts1[1] < parts2[1]) {
      res = 1;
    } else if (parts1[1] > parts2[1]) {
      res = -1;
    } else if (parts1[1] === parts2[1]) {
      if (parts1.length >= 3 && parts2.length >= 3) {
        if (parts1[2] < parts2[2]) {
          res = 1;
        } else if (parts1[2] > parts2[2]) {
          res = -1;
        }
      } else if (parts2.length >= 3) {
        res = 1;
      }
    }
  }
  return res;
}
function getAppleModel(key2) {
  const appleModelIds = [
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
  ];
  const list = appleModelIds.filter((model) => model.key === key2);
  if (list.length === 0) {
    return {
      key: key2,
      model: "Apple",
      version: "Unknown"
    };
  }
  const features = [];
  if (list[0].size) {
    features.push(list[0].size);
  }
  if (list[0].processor) {
    features.push(list[0].processor);
  }
  if (list[0].year) {
    features.push(list[0].year);
  }
  if (list[0].additional) {
    features.push(list[0].additional);
  }
  return {
    key: key2,
    model: list[0].name,
    version: list[0].name + " (" + features.join(", ") + ")"
  };
}
function checkWebsite(url, timeout = 5e3) {
  const http = url.startsWith("https:") || url.indexOf(":443/") > 0 || url.indexOf(":8443/") > 0 ? require$$5$1 : require$$6$1;
  const t = Date.now();
  return new Promise((resolve) => {
    const request = http.get(url, function(res) {
      res.on("data", () => {
      });
      res.on("end", () => {
        resolve({
          url,
          statusCode: res.statusCode,
          message: res.statusMessage,
          time: Date.now() - t
        });
      });
    }).on("error", function(e) {
      resolve({
        url,
        statusCode: 404,
        message: e.message,
        time: Date.now() - t
      });
    }).setTimeout(timeout, () => {
      request.close();
      resolve({
        url,
        statusCode: 408,
        message: "Request Timeout",
        time: Date.now() - t
      });
    });
  });
}
function cleanString(str) {
  return str.replace(/To Be Filled By O.E.M./g, "");
}
function noop() {
}
util$j.toInt = toInt;
util$j.splitByNumber = splitByNumber;
util$j.execOptsWin = execOptsWin;
util$j.execOptsLinux = execOptsLinux;
util$j.getCodepage = getCodepage;
util$j.execWin = execWin;
util$j.isFunction = isFunction;
util$j.unique = unique;
util$j.sortByKey = sortByKey;
util$j.cores = cores;
util$j.getValue = getValue;
util$j.decodeEscapeSequence = decodeEscapeSequence;
util$j.parseDateTime = parseDateTime;
util$j.parseHead = parseHead;
util$j.findObjectByKey = findObjectByKey;
util$j.getWmic = getWmic;
util$j.wmic = wmic;
util$j.darwinXcodeExists = darwinXcodeExists;
util$j.getVboxmanage = getVboxmanage;
util$j.powerShell = powerShell;
util$j.powerShellStart = powerShellStart;
util$j.powerShellRelease = powerShellRelease;
util$j.execSafe = execSafe;
util$j.nanoSeconds = nanoSeconds;
util$j.countUniqueLines = countUniqueLines;
util$j.countLines = countLines;
util$j.noop = noop;
util$j.isRaspberry = isRaspberry;
util$j.isRaspbian = isRaspbian;
util$j.sanitizeShellString = sanitizeShellString;
util$j.isPrototypePolluted = isPrototypePolluted;
util$j.decodePiCpuinfo = decodePiCpuinfo;
util$j.getRpiGpu = getRpiGpu;
util$j.promiseAll = promiseAll;
util$j.promisify = promisify;
util$j.promisifySave = promisifySave;
util$j.smartMonToolsInstalled = smartMonToolsInstalled;
util$j.linuxVersion = linuxVersion;
util$j.plistParser = plistParser;
util$j.plistReader = plistReader;
util$j.stringObj = stringObj;
util$j.stringReplace = stringReplace;
util$j.stringToLower = stringToLower;
util$j.stringToString = stringToString;
util$j.stringSubstr = stringSubstr;
util$j.stringSubstring = stringSubstring;
util$j.stringTrim = stringTrim;
util$j.stringStartWith = stringStartWith;
util$j.mathMin = mathMin;
util$j.WINDIR = WINDIR;
util$j.getFilesInPath = getFilesInPath;
util$j.semverCompare = semverCompare;
util$j.getAppleModel = getAppleModel;
util$j.checkWebsite = checkWebsite;
util$j.cleanString = cleanString;
util$j.getPowershell = getPowershell;
var system$1 = {};
const fs$9 = require$$1$2;
const os$8 = os$a;
const util$h = util$j;
const exec$f = require$$1$1.exec;
const execSync$a = require$$1$1.execSync;
const execPromise = util$h.promisify(require$$1$1.exec);
let _platform$g = process.platform;
const _linux$f = _platform$g === "linux" || _platform$g === "android";
const _darwin$f = _platform$g === "darwin";
const _windows$g = _platform$g === "win32";
const _freebsd$e = _platform$g === "freebsd";
const _openbsd$e = _platform$g === "openbsd";
const _netbsd$e = _platform$g === "netbsd";
const _sunos$e = _platform$g === "sunos";
function system(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        manufacturer: "",
        model: "Computer",
        version: "",
        serial: "-",
        uuid: "-",
        sku: "-",
        virtual: false
      };
      if (_linux$f || _freebsd$e || _openbsd$e || _netbsd$e) {
        exec$f("export LC_ALL=C; dmidecode -t system 2>/dev/null; unset LC_ALL", function(error, stdout) {
          let lines = stdout.toString().split("\n");
          result2.manufacturer = cleanDefaults(util$h.getValue(lines, "manufacturer"));
          result2.model = cleanDefaults(util$h.getValue(lines, "product name"));
          result2.version = cleanDefaults(util$h.getValue(lines, "version"));
          result2.serial = cleanDefaults(util$h.getValue(lines, "serial number"));
          result2.uuid = cleanDefaults(util$h.getValue(lines, "uuid")).toLowerCase();
          result2.sku = cleanDefaults(util$h.getValue(lines, "sku number"));
          const cmd = `echo -n "product_name: "; cat /sys/devices/virtual/dmi/id/product_name 2>/dev/null; echo;
            echo -n "product_serial: "; cat /sys/devices/virtual/dmi/id/product_serial 2>/dev/null; echo;
            echo -n "product_uuid: "; cat /sys/devices/virtual/dmi/id/product_uuid 2>/dev/null; echo;
            echo -n "product_version: "; cat /sys/devices/virtual/dmi/id/product_version 2>/dev/null; echo;
            echo -n "sys_vendor: "; cat /sys/devices/virtual/dmi/id/sys_vendor 2>/dev/null; echo;`;
          try {
            lines = execSync$a(cmd, util$h.execOptsLinux).toString().split("\n");
            result2.manufacturer = cleanDefaults(result2.manufacturer === "" ? util$h.getValue(lines, "sys_vendor") : result2.manufacturer);
            result2.model = cleanDefaults(result2.model === "" ? util$h.getValue(lines, "product_name") : result2.model);
            result2.version = cleanDefaults(result2.version === "" ? util$h.getValue(lines, "product_version") : result2.version);
            result2.serial = cleanDefaults(result2.serial === "" ? util$h.getValue(lines, "product_serial") : result2.serial);
            result2.uuid = cleanDefaults(result2.uuid === "" ? util$h.getValue(lines, "product_uuid").toLowerCase() : result2.uuid);
          } catch (e) {
            util$h.noop();
          }
          if (!result2.serial) {
            result2.serial = "-";
          }
          if (!result2.manufacturer) {
            result2.manufacturer = "";
          }
          if (!result2.model) {
            result2.model = "Computer";
          }
          if (!result2.version) {
            result2.version = "";
          }
          if (!result2.sku) {
            result2.sku = "-";
          }
          if (result2.model.toLowerCase() === "virtualbox" || result2.model.toLowerCase() === "kvm" || result2.model.toLowerCase() === "virtual machine" || result2.model.toLowerCase() === "bochs" || result2.model.toLowerCase().startsWith("vmware") || result2.model.toLowerCase().startsWith("droplet")) {
            result2.virtual = true;
            switch (result2.model.toLowerCase()) {
              case "virtualbox":
                result2.virtualHost = "VirtualBox";
                break;
              case "vmware":
                result2.virtualHost = "VMware";
                break;
              case "kvm":
                result2.virtualHost = "KVM";
                break;
              case "bochs":
                result2.virtualHost = "bochs";
                break;
            }
          }
          if (result2.manufacturer.toLowerCase().startsWith("vmware") || result2.manufacturer.toLowerCase() === "xen") {
            result2.virtual = true;
            switch (result2.manufacturer.toLowerCase()) {
              case "vmware":
                result2.virtualHost = "VMware";
                break;
              case "xen":
                result2.virtualHost = "Xen";
                break;
            }
          }
          if (!result2.virtual) {
            try {
              const disksById = execSync$a("ls -1 /dev/disk/by-id/ 2>/dev/null", util$h.execOptsLinux).toString();
              if (disksById.indexOf("_QEMU_") >= 0) {
                result2.virtual = true;
                result2.virtualHost = "QEMU";
              }
              if (disksById.indexOf("_VBOX_") >= 0) {
                result2.virtual = true;
                result2.virtualHost = "VirtualBox";
              }
            } catch (e) {
              util$h.noop();
            }
          }
          if (!result2.virtual && (os$8.release().toLowerCase().indexOf("microsoft") >= 0 || os$8.release().toLowerCase().endsWith("wsl2"))) {
            const kernelVersion = parseFloat(os$8.release().toLowerCase());
            result2.virtual = true;
            result2.manufacturer = "Microsoft";
            result2.model = "WSL";
            result2.version = kernelVersion < 4.19 ? "1" : "2";
          }
          if ((_freebsd$e || _openbsd$e || _netbsd$e) && !result2.virtualHost) {
            try {
              const procInfo = execSync$a("dmidecode -t 4", util$h.execOptsLinux);
              const procLines = procInfo.toString().split("\n");
              const procManufacturer = util$h.getValue(procLines, "manufacturer", ":", true);
              switch (procManufacturer.toLowerCase()) {
                case "virtualbox":
                  result2.virtualHost = "VirtualBox";
                  break;
                case "vmware":
                  result2.virtualHost = "VMware";
                  break;
                case "kvm":
                  result2.virtualHost = "KVM";
                  break;
                case "bochs":
                  result2.virtualHost = "bochs";
                  break;
              }
            } catch (e) {
              util$h.noop();
            }
          }
          if (fs$9.existsSync("/.dockerenv") || fs$9.existsSync("/.dockerinit")) {
            result2.model = "Docker Container";
          }
          try {
            const stdout2 = execSync$a('dmesg 2>/dev/null | grep -iE "virtual|hypervisor" | grep -iE "vmware|qemu|kvm|xen" | grep -viE "Nested Virtualization|/virtual/"');
            let lines2 = stdout2.toString().split("\n");
            if (lines2.length > 0) {
              if (result2.model === "Computer") {
                result2.model = "Virtual machine";
              }
              result2.virtual = true;
              if (stdout2.toString().toLowerCase().indexOf("vmware") >= 0 && !result2.virtualHost) {
                result2.virtualHost = "VMware";
              }
              if (stdout2.toString().toLowerCase().indexOf("qemu") >= 0 && !result2.virtualHost) {
                result2.virtualHost = "QEMU";
              }
              if (stdout2.toString().toLowerCase().indexOf("xen") >= 0 && !result2.virtualHost) {
                result2.virtualHost = "Xen";
              }
              if (stdout2.toString().toLowerCase().indexOf("kvm") >= 0 && !result2.virtualHost) {
                result2.virtualHost = "KVM";
              }
            }
          } catch (e) {
            util$h.noop();
          }
          if (result2.manufacturer === "" && result2.model === "Computer" && result2.version === "") {
            fs$9.readFile("/proc/cpuinfo", function(error2, stdout2) {
              if (!error2) {
                let lines2 = stdout2.toString().split("\n");
                result2.model = util$h.getValue(lines2, "hardware", ":", true).toUpperCase();
                result2.version = util$h.getValue(lines2, "revision", ":", true).toLowerCase();
                result2.serial = util$h.getValue(lines2, "serial", ":", true);
                util$h.getValue(lines2, "model:", ":", true);
                if (util$h.isRaspberry(lines2)) {
                  const rPIRevision = util$h.decodePiCpuinfo(lines2);
                  result2.model = rPIRevision.model;
                  result2.version = rPIRevision.revisionCode;
                  result2.manufacturer = "Raspberry Pi Foundation";
                  result2.raspberry = {
                    manufacturer: rPIRevision.manufacturer,
                    processor: rPIRevision.processor,
                    type: rPIRevision.type,
                    revision: rPIRevision.revision
                  };
                }
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        });
      }
      if (_darwin$f) {
        exec$f("ioreg -c IOPlatformExpertDevice -d 2", function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().replace(/[<>"]/g, "").split("\n");
            const model = util$h.getAppleModel(util$h.getValue(lines, "model", "=", true));
            result2.manufacturer = util$h.getValue(lines, "manufacturer", "=", true);
            result2.model = model.key;
            result2.type = macOsChassisType(model.version);
            result2.version = model.version;
            result2.serial = util$h.getValue(lines, "ioplatformserialnumber", "=", true);
            result2.uuid = util$h.getValue(lines, "ioplatformuuid", "=", true).toLowerCase();
            result2.sku = util$h.getValue(lines, "board-id", "=", true) || util$h.getValue(lines, "target-sub-type", "=", true);
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$e) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$g) {
        try {
          util$h.powerShell("Get-CimInstance Win32_ComputerSystemProduct | select Name,Vendor,Version,IdentifyingNumber,UUID | fl").then((stdout, error) => {
            if (!error) {
              let lines = stdout.split("\r\n");
              result2.manufacturer = util$h.getValue(lines, "vendor", ":");
              result2.model = util$h.getValue(lines, "name", ":");
              result2.version = util$h.getValue(lines, "version", ":");
              result2.serial = util$h.getValue(lines, "identifyingnumber", ":");
              result2.uuid = util$h.getValue(lines, "uuid", ":").toLowerCase();
              const model = result2.model.toLowerCase();
              if (model === "virtualbox" || model === "kvm" || model === "virtual machine" || model === "bochs" || model.startsWith("vmware") || model.startsWith("qemu") || model.startsWith("parallels")) {
                result2.virtual = true;
                if (model.startsWith("virtualbox")) {
                  result2.virtualHost = "VirtualBox";
                }
                if (model.startsWith("vmware")) {
                  result2.virtualHost = "VMware";
                }
                if (model.startsWith("kvm")) {
                  result2.virtualHost = "KVM";
                }
                if (model.startsWith("bochs")) {
                  result2.virtualHost = "bochs";
                }
                if (model.startsWith("qemu")) {
                  result2.virtualHost = "KVM";
                }
                if (model.startsWith("parallels")) {
                  result2.virtualHost = "Parallels";
                }
              }
              const manufacturer = result2.manufacturer.toLowerCase();
              if (manufacturer.startsWith("vmware") || manufacturer.startsWith("qemu") || manufacturer === "xen" || manufacturer.startsWith("parallels")) {
                result2.virtual = true;
                if (manufacturer.startsWith("vmware")) {
                  result2.virtualHost = "VMware";
                }
                if (manufacturer.startsWith("xen")) {
                  result2.virtualHost = "Xen";
                }
                if (manufacturer.startsWith("qemu")) {
                  result2.virtualHost = "KVM";
                }
                if (manufacturer.startsWith("parallels")) {
                  result2.virtualHost = "Parallels";
                }
              }
              util$h.powerShell('Get-CimInstance MS_Systeminformation -Namespace "root/wmi" | select systemsku | fl ').then((stdout2, error2) => {
                if (!error2) {
                  let lines2 = stdout2.split("\r\n");
                  result2.sku = util$h.getValue(lines2, "systemsku", ":");
                }
                if (!result2.virtual) {
                  util$h.powerShell("Get-CimInstance Win32_bios | select Version, SerialNumber, SMBIOSBIOSVersion").then((stdout3, error3) => {
                    if (!error3) {
                      let lines2 = stdout3.toString();
                      if (lines2.indexOf("VRTUAL") >= 0 || lines2.indexOf("A M I ") >= 0 || lines2.indexOf("VirtualBox") >= 0 || lines2.indexOf("VMWare") >= 0 || lines2.indexOf("Xen") >= 0 || lines2.indexOf("Parallels") >= 0) {
                        result2.virtual = true;
                        if (lines2.indexOf("VirtualBox") >= 0 && !result2.virtualHost) {
                          result2.virtualHost = "VirtualBox";
                        }
                        if (lines2.indexOf("VMware") >= 0 && !result2.virtualHost) {
                          result2.virtualHost = "VMware";
                        }
                        if (lines2.indexOf("Xen") >= 0 && !result2.virtualHost) {
                          result2.virtualHost = "Xen";
                        }
                        if (lines2.indexOf("VRTUAL") >= 0 && !result2.virtualHost) {
                          result2.virtualHost = "Hyper-V";
                        }
                        if (lines2.indexOf("A M I") >= 0 && !result2.virtualHost) {
                          result2.virtualHost = "Virtual PC";
                        }
                        if (lines2.indexOf("Parallels") >= 0 && !result2.virtualHost) {
                          result2.virtualHost = "Parallels";
                        }
                      }
                      if (callback) {
                        callback(result2);
                      }
                      resolve(result2);
                    } else {
                      if (callback) {
                        callback(result2);
                      }
                      resolve(result2);
                    }
                  });
                } else {
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                }
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
system$1.system = system;
function cleanDefaults(s) {
  const cmpStr = s.toLowerCase();
  if (cmpStr.indexOf("o.e.m.") === -1 && cmpStr.indexOf("default string") === -1 && cmpStr !== "default") {
    return s || "";
  }
  return "";
}
function bios(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        vendor: "",
        version: "",
        releaseDate: "",
        revision: ""
      };
      let cmd = "";
      if (_linux$f || _freebsd$e || _openbsd$e || _netbsd$e) {
        if (process.arch === "arm") {
          cmd = "cat /proc/cpuinfo | grep Serial";
        } else {
          cmd = "export LC_ALL=C; dmidecode -t bios 2>/dev/null; unset LC_ALL";
        }
        exec$f(cmd, function(error, stdout) {
          let lines = stdout.toString().split("\n");
          result2.vendor = util$h.getValue(lines, "Vendor");
          result2.version = util$h.getValue(lines, "Version");
          let datetime = util$h.getValue(lines, "Release Date");
          result2.releaseDate = util$h.parseDateTime(datetime).date;
          result2.revision = util$h.getValue(lines, "BIOS Revision");
          result2.serial = util$h.getValue(lines, "SerialNumber");
          let language = util$h.getValue(lines, "Currently Installed Language").split("|")[0];
          if (language) {
            result2.language = language;
          }
          if (lines.length && stdout.toString().indexOf("Characteristics:") >= 0) {
            const features = [];
            lines.forEach((line) => {
              if (line.indexOf(" is supported") >= 0) {
                const feature = line.split(" is supported")[0].trim();
                features.push(feature);
              }
            });
            result2.features = features;
          }
          const cmd2 = `echo -n "bios_date: "; cat /sys/devices/virtual/dmi/id/bios_date 2>/dev/null; echo;
            echo -n "bios_vendor: "; cat /sys/devices/virtual/dmi/id/bios_vendor 2>/dev/null; echo;
            echo -n "bios_version: "; cat /sys/devices/virtual/dmi/id/bios_version 2>/dev/null; echo;`;
          try {
            lines = execSync$a(cmd2, util$h.execOptsLinux).toString().split("\n");
            result2.vendor = !result2.vendor ? util$h.getValue(lines, "bios_vendor") : result2.vendor;
            result2.version = !result2.version ? util$h.getValue(lines, "bios_version") : result2.version;
            datetime = util$h.getValue(lines, "bios_date");
            result2.releaseDate = !result2.releaseDate ? util$h.parseDateTime(datetime).date : result2.releaseDate;
          } catch (e) {
            util$h.noop();
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$f) {
        result2.vendor = "Apple Inc.";
        exec$f(
          "system_profiler SPHardwareDataType -json",
          function(error, stdout) {
            try {
              const hardwareData = JSON.parse(stdout.toString());
              if (hardwareData && hardwareData.SPHardwareDataType && hardwareData.SPHardwareDataType.length) {
                let bootRomVersion = hardwareData.SPHardwareDataType[0].boot_rom_version;
                bootRomVersion = bootRomVersion ? bootRomVersion.split("(")[0].trim() : null;
                result2.version = bootRomVersion;
              }
            } catch (e) {
              util$h.noop();
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        );
      }
      if (_sunos$e) {
        result2.vendor = "Sun Microsystems";
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$g) {
        try {
          util$h.powerShell('Get-CimInstance Win32_bios | select Description,Version,Manufacturer,@{n="ReleaseDate";e={$_.ReleaseDate.ToString("yyyy-MM-dd")}},BuildNumber,SerialNumber,SMBIOSBIOSVersion | fl').then((stdout, error) => {
            if (!error) {
              let lines = stdout.toString().split("\r\n");
              const description = util$h.getValue(lines, "description", ":");
              const version2 = util$h.getValue(lines, "SMBIOSBIOSVersion", ":");
              if (description.indexOf(" Version ") !== -1) {
                result2.vendor = description.split(" Version ")[0].trim();
                result2.version = description.split(" Version ")[1].trim();
              } else if (description.indexOf(" Ver: ") !== -1) {
                result2.vendor = util$h.getValue(lines, "manufacturer", ":");
                result2.version = description.split(" Ver: ")[1].trim();
              } else {
                result2.vendor = util$h.getValue(lines, "manufacturer", ":");
                result2.version = version2 || util$h.getValue(lines, "version", ":");
              }
              result2.releaseDate = util$h.getValue(lines, "releasedate", ":");
              result2.revision = util$h.getValue(lines, "buildnumber", ":");
              result2.serial = cleanDefaults(util$h.getValue(lines, "serialnumber", ":"));
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
system$1.bios = bios;
function baseboard(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        manufacturer: "",
        model: "",
        version: "",
        serial: "-",
        assetTag: "-",
        memMax: null,
        memSlots: null
      };
      let cmd = "";
      if (_linux$f || _freebsd$e || _openbsd$e || _netbsd$e) {
        if (process.arch === "arm") {
          cmd = "cat /proc/cpuinfo | grep Serial";
        } else {
          cmd = "export LC_ALL=C; dmidecode -t 2 2>/dev/null; unset LC_ALL";
        }
        const workload = [];
        workload.push(execPromise(cmd));
        workload.push(execPromise("export LC_ALL=C; dmidecode -t memory 2>/dev/null"));
        util$h.promiseAll(
          workload
        ).then((data) => {
          let lines = data.results[0] ? data.results[0].toString().split("\n") : [""];
          result2.manufacturer = cleanDefaults(util$h.getValue(lines, "Manufacturer"));
          result2.model = cleanDefaults(util$h.getValue(lines, "Product Name"));
          result2.version = cleanDefaults(util$h.getValue(lines, "Version"));
          result2.serial = cleanDefaults(util$h.getValue(lines, "Serial Number"));
          result2.assetTag = cleanDefaults(util$h.getValue(lines, "Asset Tag"));
          const cmd2 = `echo -n "board_asset_tag: "; cat /sys/devices/virtual/dmi/id/board_asset_tag 2>/dev/null; echo;
            echo -n "board_name: "; cat /sys/devices/virtual/dmi/id/board_name 2>/dev/null; echo;
            echo -n "board_serial: "; cat /sys/devices/virtual/dmi/id/board_serial 2>/dev/null; echo;
            echo -n "board_vendor: "; cat /sys/devices/virtual/dmi/id/board_vendor 2>/dev/null; echo;
            echo -n "board_version: "; cat /sys/devices/virtual/dmi/id/board_version 2>/dev/null; echo;`;
          try {
            lines = execSync$a(cmd2, util$h.execOptsLinux).toString().split("\n");
            result2.manufacturer = cleanDefaults(!result2.manufacturer ? util$h.getValue(lines, "board_vendor") : result2.manufacturer);
            result2.model = cleanDefaults(!result2.model ? util$h.getValue(lines, "board_name") : result2.model);
            result2.version = cleanDefaults(!result2.version ? util$h.getValue(lines, "board_version") : result2.version);
            result2.serial = cleanDefaults(!result2.serial ? util$h.getValue(lines, "board_serial") : result2.serial);
            result2.assetTag = cleanDefaults(!result2.assetTag ? util$h.getValue(lines, "board_asset_tag") : result2.assetTag);
          } catch (e) {
            util$h.noop();
          }
          lines = data.results[1] ? data.results[1].toString().split("\n") : [""];
          result2.memMax = util$h.toInt(util$h.getValue(lines, "Maximum Capacity")) * 1024 * 1024 * 1024 || null;
          result2.memSlots = util$h.toInt(util$h.getValue(lines, "Number Of Devices")) || null;
          if (util$h.isRaspberry()) {
            const rpi = util$h.decodePiCpuinfo();
            result2.manufacturer = rpi.manufacturer;
            result2.model = "Raspberry Pi";
            result2.serial = rpi.serial;
            result2.version = rpi.type + " - " + rpi.revision;
            result2.memMax = os$8.totalmem();
            result2.memSlots = 0;
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$f) {
        const workload = [];
        workload.push(execPromise("ioreg -c IOPlatformExpertDevice -d 2"));
        workload.push(execPromise("system_profiler SPMemoryDataType"));
        util$h.promiseAll(
          workload
        ).then((data) => {
          let lines = data.results[0] ? data.results[0].toString().replace(/[<>"]/g, "").split("\n") : [""];
          result2.manufacturer = util$h.getValue(lines, "manufacturer", "=", true);
          result2.model = util$h.getValue(lines, "model", "=", true);
          result2.version = util$h.getValue(lines, "version", "=", true);
          result2.serial = util$h.getValue(lines, "ioplatformserialnumber", "=", true);
          result2.assetTag = util$h.getValue(lines, "board-id", "=", true);
          let devices = data.results[1] ? data.results[1].toString().split("        BANK ") : [""];
          if (devices.length === 1) {
            devices = data.results[1] ? data.results[1].toString().split("        DIMM") : [""];
          }
          devices.shift();
          result2.memSlots = devices.length;
          if (os$8.arch() === "arm64") {
            result2.memSlots = 0;
            result2.memMax = os$8.totalmem();
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$e) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$g) {
        try {
          const workload = [];
          const win10plus = parseInt(os$8.release()) >= 10;
          const maxCapacityAttribute = win10plus ? "MaxCapacityEx" : "MaxCapacity";
          workload.push(util$h.powerShell("Get-CimInstance Win32_baseboard | select Model,Manufacturer,Product,Version,SerialNumber,PartNumber,SKU | fl"));
          workload.push(util$h.powerShell(`Get-CimInstance Win32_physicalmemoryarray | select ${maxCapacityAttribute}, MemoryDevices | fl`));
          util$h.promiseAll(
            workload
          ).then((data) => {
            let lines = data.results[0] ? data.results[0].toString().split("\r\n") : [""];
            result2.manufacturer = cleanDefaults(util$h.getValue(lines, "manufacturer", ":"));
            result2.model = cleanDefaults(util$h.getValue(lines, "model", ":"));
            if (!result2.model) {
              result2.model = cleanDefaults(util$h.getValue(lines, "product", ":"));
            }
            result2.version = cleanDefaults(util$h.getValue(lines, "version", ":"));
            result2.serial = cleanDefaults(util$h.getValue(lines, "serialnumber", ":"));
            result2.assetTag = cleanDefaults(util$h.getValue(lines, "partnumber", ":"));
            if (!result2.assetTag) {
              result2.assetTag = cleanDefaults(util$h.getValue(lines, "sku", ":"));
            }
            lines = data.results[1] ? data.results[1].toString().split("\r\n") : [""];
            result2.memMax = util$h.toInt(util$h.getValue(lines, maxCapacityAttribute, ":")) * (win10plus ? 1024 : 1) || null;
            result2.memSlots = util$h.toInt(util$h.getValue(lines, "MemoryDevices", ":")) || null;
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
system$1.baseboard = baseboard;
function macOsChassisType(model) {
  model = model.toLowerCase();
  if (model.indexOf("macbookair") >= 0 || model.indexOf("macbook air") >= 0) {
    return "Notebook";
  }
  if (model.indexOf("macbookpro") >= 0 || model.indexOf("macbook pro") >= 0) {
    return "Notebook";
  }
  if (model.indexOf("macbook") >= 0) {
    return "Notebook";
  }
  if (model.indexOf("macmini") >= 0 || model.indexOf("mac mini") >= 0) {
    return "Desktop";
  }
  if (model.indexOf("imac") >= 0) {
    return "Desktop";
  }
  if (model.indexOf("macstudio") >= 0 || model.indexOf("mac studio") >= 0) {
    return "Desktop";
  }
  if (model.indexOf("macpro") >= 0 || model.indexOf("mac pro") >= 0) {
    return "Tower";
  }
  return "Other";
}
function chassis(callback) {
  const chassisTypes = [
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
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        manufacturer: "",
        model: "",
        type: "",
        version: "",
        serial: "-",
        assetTag: "-",
        sku: ""
      };
      if (_linux$f || _freebsd$e || _openbsd$e || _netbsd$e) {
        const cmd = `echo -n "chassis_asset_tag: "; cat /sys/devices/virtual/dmi/id/chassis_asset_tag 2>/dev/null; echo;
            echo -n "chassis_serial: "; cat /sys/devices/virtual/dmi/id/chassis_serial 2>/dev/null; echo;
            echo -n "chassis_type: "; cat /sys/devices/virtual/dmi/id/chassis_type 2>/dev/null; echo;
            echo -n "chassis_vendor: "; cat /sys/devices/virtual/dmi/id/chassis_vendor 2>/dev/null; echo;
            echo -n "chassis_version: "; cat /sys/devices/virtual/dmi/id/chassis_version 2>/dev/null; echo;`;
        exec$f(cmd, function(error, stdout) {
          let lines = stdout.toString().split("\n");
          result2.manufacturer = cleanDefaults(util$h.getValue(lines, "chassis_vendor"));
          const ctype = parseInt(util$h.getValue(lines, "chassis_type").replace(/\D/g, ""));
          result2.type = cleanDefaults(ctype && !isNaN(ctype) && ctype < chassisTypes.length ? chassisTypes[ctype - 1] : "");
          result2.version = cleanDefaults(util$h.getValue(lines, "chassis_version"));
          result2.serial = cleanDefaults(util$h.getValue(lines, "chassis_serial"));
          result2.assetTag = cleanDefaults(util$h.getValue(lines, "chassis_asset_tag"));
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$f) {
        exec$f("ioreg -c IOPlatformExpertDevice -d 2", function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().replace(/[<>"]/g, "").split("\n");
            const model = util$h.getAppleModel(util$h.getValue(lines, "model", "=", true));
            result2.manufacturer = util$h.getValue(lines, "manufacturer", "=", true);
            result2.model = model.key;
            result2.type = macOsChassisType(model.model);
            result2.version = model.version;
            result2.serial = util$h.getValue(lines, "ioplatformserialnumber", "=", true);
            result2.assetTag = util$h.getValue(lines, "board-id", "=", true) || util$h.getValue(lines, "target-type", "=", true);
            result2.sku = util$h.getValue(lines, "target-sub-type", "=", true);
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$e) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$g) {
        try {
          util$h.powerShell("Get-CimInstance Win32_SystemEnclosure | select Model,Manufacturer,ChassisTypes,Version,SerialNumber,PartNumber,SKU,SMBIOSAssetTag | fl").then((stdout, error) => {
            if (!error) {
              let lines = stdout.toString().split("\r\n");
              result2.manufacturer = cleanDefaults(util$h.getValue(lines, "manufacturer", ":"));
              result2.model = cleanDefaults(util$h.getValue(lines, "model", ":"));
              const ctype = parseInt(util$h.getValue(lines, "ChassisTypes", ":").replace(/\D/g, ""));
              result2.type = ctype && !isNaN(ctype) && ctype < chassisTypes.length ? chassisTypes[ctype - 1] : "";
              result2.version = cleanDefaults(util$h.getValue(lines, "version", ":"));
              result2.serial = cleanDefaults(util$h.getValue(lines, "serialnumber", ":"));
              result2.assetTag = cleanDefaults(util$h.getValue(lines, "partnumber", ":"));
              if (!result2.assetTag) {
                result2.assetTag = cleanDefaults(util$h.getValue(lines, "SMBIOSAssetTag", ":"));
              }
              result2.sku = cleanDefaults(util$h.getValue(lines, "sku", ":"));
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
system$1.chassis = chassis;
var osinfo = {};
const os$7 = os$a;
const fs$8 = require$$1$2;
const util$g = util$j;
const exec$e = require$$1$1.exec;
const execSync$9 = require$$1$1.execSync;
let _platform$f = process.platform;
const _linux$e = _platform$f === "linux" || _platform$f === "android";
const _darwin$e = _platform$f === "darwin";
const _windows$f = _platform$f === "win32";
const _freebsd$d = _platform$f === "freebsd";
const _openbsd$d = _platform$f === "openbsd";
const _netbsd$d = _platform$f === "netbsd";
const _sunos$d = _platform$f === "sunos";
function time() {
  let t = (/* @__PURE__ */ new Date()).toString().split(" ");
  const result2 = {
    current: Date.now(),
    uptime: os$7.uptime(),
    timezone: t.length >= 7 ? t[5] : "",
    timezoneName: Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : t.length >= 7 ? t.slice(6).join(" ").replace(/\(/g, "").replace(/\)/g, "") : ""
  };
  if (_darwin$e || _linux$e) {
    try {
      const stdout = execSync$9("date +%Z && date +%z && ls -l /etc/localtime 2>/dev/null", util$g.execOptsLinux);
      const lines = stdout.toString().split(os$7.EOL);
      if (lines.length > 3 && !lines[0]) {
        lines.shift();
      }
      let timezone = lines[0] || "";
      if (timezone.startsWith("+") || timezone.startsWith("-")) {
        timezone = "GMT";
      }
      return {
        current: Date.now(),
        uptime: os$7.uptime(),
        timezone: lines[1] ? timezone + lines[1] : timezone,
        timezoneName: lines[2] && lines[2].indexOf("/zoneinfo/") > 0 ? lines[2].split("/zoneinfo/")[1] || "" : ""
      };
    } catch (e) {
      util$g.noop();
    }
  }
  return result2;
}
osinfo.time = time;
function getLogoFile(distro) {
  distro = distro || "";
  distro = distro.toLowerCase();
  let result2 = _platform$f;
  if (_windows$f) {
    result2 = "windows";
  } else if (distro.indexOf("mac os") !== -1 || distro.indexOf("macos") !== -1) {
    result2 = "apple";
  } else if (distro.indexOf("arch") !== -1) {
    result2 = "arch";
  } else if (distro.indexOf("cachy") !== -1) {
    result2 = "cachy";
  } else if (distro.indexOf("centos") !== -1) {
    result2 = "centos";
  } else if (distro.indexOf("coreos") !== -1) {
    result2 = "coreos";
  } else if (distro.indexOf("debian") !== -1) {
    result2 = "debian";
  } else if (distro.indexOf("deepin") !== -1) {
    result2 = "deepin";
  } else if (distro.indexOf("elementary") !== -1) {
    result2 = "elementary";
  } else if (distro.indexOf("endeavour") !== -1) {
    result2 = "endeavour";
  } else if (distro.indexOf("fedora") !== -1) {
    result2 = "fedora";
  } else if (distro.indexOf("gentoo") !== -1) {
    result2 = "gentoo";
  } else if (distro.indexOf("mageia") !== -1) {
    result2 = "mageia";
  } else if (distro.indexOf("mandriva") !== -1) {
    result2 = "mandriva";
  } else if (distro.indexOf("manjaro") !== -1) {
    result2 = "manjaro";
  } else if (distro.indexOf("mint") !== -1) {
    result2 = "mint";
  } else if (distro.indexOf("mx") !== -1) {
    result2 = "mx";
  } else if (distro.indexOf("openbsd") !== -1) {
    result2 = "openbsd";
  } else if (distro.indexOf("freebsd") !== -1) {
    result2 = "freebsd";
  } else if (distro.indexOf("opensuse") !== -1) {
    result2 = "opensuse";
  } else if (distro.indexOf("pclinuxos") !== -1) {
    result2 = "pclinuxos";
  } else if (distro.indexOf("puppy") !== -1) {
    result2 = "puppy";
  } else if (distro.indexOf("popos") !== -1) {
    result2 = "popos";
  } else if (distro.indexOf("raspbian") !== -1) {
    result2 = "raspbian";
  } else if (distro.indexOf("reactos") !== -1) {
    result2 = "reactos";
  } else if (distro.indexOf("redhat") !== -1) {
    result2 = "redhat";
  } else if (distro.indexOf("slackware") !== -1) {
    result2 = "slackware";
  } else if (distro.indexOf("sugar") !== -1) {
    result2 = "sugar";
  } else if (distro.indexOf("steam") !== -1) {
    result2 = "steam";
  } else if (distro.indexOf("suse") !== -1) {
    result2 = "suse";
  } else if (distro.indexOf("mate") !== -1) {
    result2 = "ubuntu-mate";
  } else if (distro.indexOf("lubuntu") !== -1) {
    result2 = "lubuntu";
  } else if (distro.indexOf("xubuntu") !== -1) {
    result2 = "xubuntu";
  } else if (distro.indexOf("ubuntu") !== -1) {
    result2 = "ubuntu";
  } else if (distro.indexOf("solaris") !== -1) {
    result2 = "solaris";
  } else if (distro.indexOf("tails") !== -1) {
    result2 = "tails";
  } else if (distro.indexOf("feren") !== -1) {
    result2 = "ferenos";
  } else if (distro.indexOf("robolinux") !== -1) {
    result2 = "robolinux";
  } else if (_linux$e && distro) {
    result2 = distro.toLowerCase().trim().replace(/\s+/g, "-");
  }
  return result2;
}
function getFQDN() {
  let fqdn = os$7.hostname;
  if (_linux$e || _darwin$e) {
    try {
      const stdout = execSync$9("hostname -f 2>/dev/null", util$g.execOptsLinux);
      fqdn = stdout.toString().split(os$7.EOL)[0];
    } catch (e) {
      util$g.noop();
    }
  }
  if (_freebsd$d || _openbsd$d || _netbsd$d) {
    try {
      const stdout = execSync$9("hostname 2>/dev/null");
      fqdn = stdout.toString().split(os$7.EOL)[0];
    } catch (e) {
      util$g.noop();
    }
  }
  if (_windows$f) {
    try {
      const stdout = execSync$9("echo %COMPUTERNAME%.%USERDNSDOMAIN%", util$g.execOptsWin);
      fqdn = stdout.toString().replace(".%USERDNSDOMAIN%", "").split(os$7.EOL)[0];
    } catch (e) {
      util$g.noop();
    }
  }
  return fqdn;
}
function osInfo(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        platform: _platform$f === "win32" ? "Windows" : _platform$f,
        distro: "unknown",
        release: "unknown",
        codename: "",
        kernel: os$7.release(),
        arch: os$7.arch(),
        hostname: os$7.hostname(),
        fqdn: getFQDN(),
        codepage: "",
        logofile: "",
        serial: "",
        build: "",
        servicepack: "",
        uefi: false
      };
      if (_linux$e) {
        exec$e("cat /etc/*-release; cat /usr/lib/os-release; cat /etc/openwrt_release", function(error, stdout) {
          let release = {};
          let lines = stdout.toString().split("\n");
          lines.forEach(function(line) {
            if (line.indexOf("=") !== -1) {
              release[line.split("=")[0].trim().toUpperCase()] = line.split("=")[1].trim();
            }
          });
          result2.distro = (release.DISTRIB_ID || release.NAME || "unknown").replace(/"/g, "");
          result2.logofile = getLogoFile(result2.distro);
          let releaseVersion = (release.VERSION || "").replace(/"/g, "");
          let codename = (release.DISTRIB_CODENAME || release.VERSION_CODENAME || "").replace(/"/g, "");
          const prettyName = (release.PRETTY_NAME || "").replace(/"/g, "");
          if (prettyName.indexOf(result2.distro + " ") === 0) {
            releaseVersion = prettyName.replace(result2.distro + " ", "").trim();
          }
          if (releaseVersion.indexOf("(") >= 0) {
            codename = releaseVersion.split("(")[1].replace(/[()]/g, "").trim();
            releaseVersion = releaseVersion.split("(")[0].trim();
          }
          result2.release = (releaseVersion || release.DISTRIB_RELEASE || release.VERSION_ID || "unknown").replace(/"/g, "");
          result2.codename = codename;
          result2.codepage = util$g.getCodepage();
          result2.build = (release.BUILD_ID || "").replace(/"/g, "").trim();
          isUefiLinux().then((uefi) => {
            result2.uefi = uefi;
            uuid().then((data) => {
              result2.serial = data.os;
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          });
        });
      }
      if (_freebsd$d || _openbsd$d || _netbsd$d) {
        exec$e("sysctl kern.ostype kern.osrelease kern.osrevision kern.hostuuid machdep.bootmethod kern.geom.confxml", function(error, stdout) {
          let lines = stdout.toString().split("\n");
          const distro = util$g.getValue(lines, "kern.ostype");
          const logofile = getLogoFile(distro);
          const release = util$g.getValue(lines, "kern.osrelease").split("-")[0];
          const serial = util$g.getValue(lines, "kern.uuid");
          const bootmethod = util$g.getValue(lines, "machdep.bootmethod");
          const uefiConf = stdout.toString().indexOf("<type>efi</type>") >= 0;
          const uefi = bootmethod ? bootmethod.toLowerCase().indexOf("uefi") >= 0 : uefiConf ? uefiConf : null;
          result2.distro = distro || result2.distro;
          result2.logofile = logofile || result2.logofile;
          result2.release = release || result2.release;
          result2.serial = serial || result2.serial;
          result2.codename = "";
          result2.codepage = util$g.getCodepage();
          result2.uefi = uefi || null;
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$e) {
        exec$e("sw_vers; sysctl kern.ostype kern.osrelease kern.osrevision kern.uuid", function(error, stdout) {
          let lines = stdout.toString().split("\n");
          result2.serial = util$g.getValue(lines, "kern.uuid");
          result2.distro = util$g.getValue(lines, "ProductName");
          result2.release = (util$g.getValue(lines, "ProductVersion", ":", true, true) + " " + util$g.getValue(lines, "ProductVersionExtra", ":", true, true)).trim();
          result2.build = util$g.getValue(lines, "BuildVersion");
          result2.logofile = getLogoFile(result2.distro);
          result2.codename = "macOS";
          result2.codename = result2.release.indexOf("10.4") > -1 ? "OS X Tiger" : result2.codename;
          result2.codename = result2.release.indexOf("10.5") > -1 ? "OS X Leopard" : result2.codename;
          result2.codename = result2.release.indexOf("10.6") > -1 ? "OS X Snow Leopard" : result2.codename;
          result2.codename = result2.release.indexOf("10.7") > -1 ? "OS X Lion" : result2.codename;
          result2.codename = result2.release.indexOf("10.8") > -1 ? "OS X Mountain Lion" : result2.codename;
          result2.codename = result2.release.indexOf("10.9") > -1 ? "OS X Mavericks" : result2.codename;
          result2.codename = result2.release.indexOf("10.10") > -1 ? "OS X Yosemite" : result2.codename;
          result2.codename = result2.release.indexOf("10.11") > -1 ? "OS X El Capitan" : result2.codename;
          result2.codename = result2.release.indexOf("10.12") > -1 ? "Sierra" : result2.codename;
          result2.codename = result2.release.indexOf("10.13") > -1 ? "High Sierra" : result2.codename;
          result2.codename = result2.release.indexOf("10.14") > -1 ? "Mojave" : result2.codename;
          result2.codename = result2.release.indexOf("10.15") > -1 ? "Catalina" : result2.codename;
          result2.codename = result2.release.startsWith("11.") ? "Big Sur" : result2.codename;
          result2.codename = result2.release.startsWith("12.") ? "Monterey" : result2.codename;
          result2.codename = result2.release.startsWith("13.") ? "Ventura" : result2.codename;
          result2.codename = result2.release.startsWith("14.") ? "Sonoma" : result2.codename;
          result2.codename = result2.release.startsWith("15.") ? "Sequoia" : result2.codename;
          result2.uefi = true;
          result2.codepage = util$g.getCodepage();
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$d) {
        result2.release = result2.kernel;
        exec$e("uname -o", function(error, stdout) {
          let lines = stdout.toString().split("\n");
          result2.distro = lines[0];
          result2.logofile = getLogoFile(result2.distro);
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows$f) {
        result2.logofile = getLogoFile();
        result2.release = result2.kernel;
        try {
          const workload = [];
          workload.push(util$g.powerShell("Get-CimInstance Win32_OperatingSystem | select Caption,SerialNumber,BuildNumber,ServicePackMajorVersion,ServicePackMinorVersion | fl"));
          workload.push(util$g.powerShell("(Get-CimInstance Win32_ComputerSystem).HypervisorPresent"));
          workload.push(util$g.powerShell("Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SystemInformation]::TerminalServerSession"));
          util$g.promiseAll(
            workload
          ).then((data) => {
            let lines = data.results[0] ? data.results[0].toString().split("\r\n") : [""];
            result2.distro = util$g.getValue(lines, "Caption", ":").trim();
            result2.serial = util$g.getValue(lines, "SerialNumber", ":").trim();
            result2.build = util$g.getValue(lines, "BuildNumber", ":").trim();
            result2.servicepack = util$g.getValue(lines, "ServicePackMajorVersion", ":").trim() + "." + util$g.getValue(lines, "ServicePackMinorVersion", ":").trim();
            result2.codepage = util$g.getCodepage();
            const hyperv = data.results[1] ? data.results[1].toString().toLowerCase() : "";
            result2.hypervisor = hyperv.indexOf("true") !== -1;
            const term = data.results[2] ? data.results[2].toString() : "";
            result2.remoteSession = term.toString().toLowerCase().indexOf("true") >= 0;
            isUefiWindows().then((uefi) => {
              result2.uefi = uefi;
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
osinfo.osInfo = osInfo;
function isUefiLinux() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      fs$8.stat("/sys/firmware/efi", function(err) {
        if (!err) {
          return resolve(true);
        } else {
          exec$e('dmesg | grep -E "EFI v"', function(error, stdout) {
            if (!error) {
              const lines = stdout.toString().split("\n");
              return resolve(lines.length > 0);
            }
            return resolve(false);
          });
        }
      });
    });
  });
}
function isUefiWindows() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      try {
        exec$e('findstr /C:"Detected boot environment" "%windir%\\Panther\\setupact.log"', util$g.execOptsWin, function(error, stdout) {
          if (!error) {
            const line = stdout.toString().split("\n\r")[0];
            return resolve(line.toLowerCase().indexOf("efi") >= 0);
          } else {
            exec$e("echo %firmware_type%", util$g.execOptsWin, function(error2, stdout2) {
              if (!error2) {
                const line = stdout2.toString() || "";
                return resolve(line.toLowerCase().indexOf("efi") >= 0);
              } else {
                return resolve(false);
              }
            });
          }
        });
      } catch (e) {
        return resolve(false);
      }
    });
  });
}
function versions(apps, callback) {
  let versionObject = {
    kernel: os$7.release(),
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
  function checkVersionParam(apps2) {
    if (apps2 === "*") {
      return {
        versions: versionObject,
        counter: 34
      };
    }
    if (!Array.isArray(apps2)) {
      apps2 = apps2.trim().toLowerCase().replace(/,+/g, "|").replace(/ /g, "|");
      apps2 = apps2.split("|");
      const result2 = {
        versions: {},
        counter: 0
      };
      apps2.forEach((el) => {
        if (el) {
          for (let key2 in versionObject) {
            if ({}.hasOwnProperty.call(versionObject, key2)) {
              if (key2.toLowerCase() === el.toLowerCase() && !{}.hasOwnProperty.call(result2.versions, key2)) {
                result2.versions[key2] = versionObject[key2];
                if (key2 === "openssl") {
                  result2.versions.systemOpenssl = "";
                  result2.versions.systemOpensslLib = "";
                }
                if (!result2.versions[key2]) {
                  result2.counter++;
                }
              }
            }
          }
        }
      });
      return result2;
    }
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (util$g.isFunction(apps) && !callback) {
        callback = apps;
        apps = "*";
      } else {
        apps = apps || "*";
        if (typeof apps !== "string") {
          if (callback) {
            callback({});
          }
          return resolve({});
        }
      }
      const appsObj = checkVersionParam(apps);
      let totalFunctions = appsObj.counter;
      let functionProcessed = /* @__PURE__ */ function() {
        return function() {
          if (--totalFunctions === 0) {
            if (callback) {
              callback(appsObj.versions);
            }
            resolve(appsObj.versions);
          }
        };
      }();
      let cmd = "";
      try {
        if ({}.hasOwnProperty.call(appsObj.versions, "openssl")) {
          appsObj.versions.openssl = process.versions.openssl;
          exec$e("openssl version", function(error, stdout) {
            if (!error) {
              let openssl_string = stdout.toString().split("\n")[0].trim();
              let openssl = openssl_string.split(" ");
              appsObj.versions.systemOpenssl = openssl.length > 0 ? openssl[1] : openssl[0];
              appsObj.versions.systemOpensslLib = openssl.length > 0 ? openssl[0] : "openssl";
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "npm")) {
          exec$e("npm -v", function(error, stdout) {
            if (!error) {
              appsObj.versions.npm = stdout.toString().split("\n")[0];
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "pm2")) {
          cmd = "pm2";
          if (_windows$f) {
            cmd += ".cmd";
          }
          exec$e(`${cmd} -v`, function(error, stdout) {
            if (!error) {
              let pm2 = stdout.toString().split("\n")[0].trim();
              if (!pm2.startsWith("[PM2]")) {
                appsObj.versions.pm2 = pm2;
              }
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "yarn")) {
          exec$e("yarn --version", function(error, stdout) {
            if (!error) {
              appsObj.versions.yarn = stdout.toString().split("\n")[0];
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "gulp")) {
          cmd = "gulp";
          if (_windows$f) {
            cmd += ".cmd";
          }
          exec$e(`${cmd} --version`, function(error, stdout) {
            if (!error) {
              const gulp = stdout.toString().split("\n")[0] || "";
              appsObj.versions.gulp = (gulp.toLowerCase().split("version")[1] || "").trim();
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "homebrew")) {
          cmd = "brew";
          exec$e(`${cmd} --version`, function(error, stdout) {
            if (!error) {
              const brew = stdout.toString().split("\n")[0] || "";
              appsObj.versions.homebrew = (brew.toLowerCase().split(" ")[1] || "").trim();
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "tsc")) {
          cmd = "tsc";
          if (_windows$f) {
            cmd += ".cmd";
          }
          exec$e(`${cmd} --version`, function(error, stdout) {
            if (!error) {
              const tsc = stdout.toString().split("\n")[0] || "";
              appsObj.versions.tsc = (tsc.toLowerCase().split("version")[1] || "").trim();
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "grunt")) {
          cmd = "grunt";
          if (_windows$f) {
            cmd += ".cmd";
          }
          exec$e(`${cmd} --version`, function(error, stdout) {
            if (!error) {
              const grunt = stdout.toString().split("\n")[0] || "";
              appsObj.versions.grunt = (grunt.toLowerCase().split("cli v")[1] || "").trim();
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "git")) {
          if (_darwin$e) {
            const gitHomebrewExists = fs$8.existsSync("/usr/local/Cellar/git") || fs$8.existsSync("/opt/homebrew/bin/git");
            if (util$g.darwinXcodeExists() || gitHomebrewExists) {
              exec$e("git --version", function(error, stdout) {
                if (!error) {
                  let git = stdout.toString().split("\n")[0] || "";
                  git = (git.toLowerCase().split("version")[1] || "").trim();
                  appsObj.versions.git = (git.split(" ")[0] || "").trim();
                }
                functionProcessed();
              });
            } else {
              functionProcessed();
            }
          } else {
            exec$e("git --version", function(error, stdout) {
              if (!error) {
                let git = stdout.toString().split("\n")[0] || "";
                git = (git.toLowerCase().split("version")[1] || "").trim();
                appsObj.versions.git = (git.split(" ")[0] || "").trim();
              }
              functionProcessed();
            });
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "apache")) {
          exec$e("apachectl -v 2>&1", function(error, stdout) {
            if (!error) {
              const apache = (stdout.toString().split("\n")[0] || "").split(":");
              appsObj.versions.apache = apache.length > 1 ? apache[1].replace("Apache", "").replace("/", "").split("(")[0].trim() : "";
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "nginx")) {
          exec$e("nginx -v 2>&1", function(error, stdout) {
            if (!error) {
              const nginx = stdout.toString().split("\n")[0] || "";
              appsObj.versions.nginx = (nginx.toLowerCase().split("/")[1] || "").trim();
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "mysql")) {
          exec$e("mysql -V", function(error, stdout) {
            if (!error) {
              let mysql = stdout.toString().split("\n")[0] || "";
              mysql = mysql.toLowerCase();
              if (mysql.indexOf(",") > -1) {
                mysql = (mysql.split(",")[0] || "").trim();
                const parts = mysql.split(" ");
                appsObj.versions.mysql = (parts[parts.length - 1] || "").trim();
              } else {
                if (mysql.indexOf(" ver ") > -1) {
                  mysql = mysql.split(" ver ")[1];
                  appsObj.versions.mysql = mysql.split(" ")[0];
                }
              }
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "php")) {
          exec$e("php -v", function(error, stdout) {
            if (!error) {
              const php = stdout.toString().split("\n")[0] || "";
              let parts = php.split("(");
              if (parts[0].indexOf("-")) {
                parts = parts[0].split("-");
              }
              appsObj.versions.php = parts[0].replace(/[^0-9.]/g, "");
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "redis")) {
          exec$e("redis-server --version", function(error, stdout) {
            if (!error) {
              const redis = stdout.toString().split("\n")[0] || "";
              const parts = redis.split(" ");
              appsObj.versions.redis = util$g.getValue(parts, "v", "=", true);
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "docker")) {
          exec$e("docker --version", function(error, stdout) {
            if (!error) {
              const docker2 = stdout.toString().split("\n")[0] || "";
              const parts = docker2.split(" ");
              appsObj.versions.docker = parts.length > 2 && parts[2].endsWith(",") ? parts[2].slice(0, -1) : "";
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "postfix")) {
          exec$e("postconf -d | grep mail_version", function(error, stdout) {
            if (!error) {
              const postfix = stdout.toString().split("\n") || [];
              appsObj.versions.postfix = util$g.getValue(postfix, "mail_version", "=", true);
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "mongodb")) {
          exec$e("mongod --version", function(error, stdout) {
            if (!error) {
              const mongodb = stdout.toString().split("\n")[0] || "";
              appsObj.versions.mongodb = (mongodb.toLowerCase().split(",")[0] || "").replace(/[^0-9.]/g, "");
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "postgresql")) {
          if (_linux$e) {
            exec$e("locate bin/postgres", function(error, stdout) {
              if (!error) {
                const postgresqlBin = stdout.toString().split("\n").sort();
                if (postgresqlBin.length) {
                  exec$e(postgresqlBin[postgresqlBin.length - 1] + " -V", function(error2, stdout2) {
                    if (!error2) {
                      const postgresql = stdout2.toString().split("\n")[0].split(" ") || [];
                      appsObj.versions.postgresql = postgresql.length ? postgresql[postgresql.length - 1] : "";
                    }
                    functionProcessed();
                  });
                } else {
                  functionProcessed();
                }
              } else {
                exec$e("psql -V", function(error2, stdout2) {
                  if (!error2) {
                    const postgresql = stdout2.toString().split("\n")[0].split(" ") || [];
                    appsObj.versions.postgresql = postgresql.length ? postgresql[postgresql.length - 1] : "";
                    appsObj.versions.postgresql = appsObj.versions.postgresql.split("-")[0];
                  }
                  functionProcessed();
                });
              }
            });
          } else {
            if (_windows$f) {
              util$g.powerShell("Get-CimInstance Win32_Service | select caption | fl").then((stdout) => {
                let serviceSections = stdout.split(/\n\s*\n/);
                serviceSections.forEach((item) => {
                  if (item.trim() !== "") {
                    let lines = item.trim().split("\r\n");
                    let srvCaption = util$g.getValue(lines, "caption", ":", true).toLowerCase();
                    if (srvCaption.indexOf("postgresql") > -1) {
                      const parts = srvCaption.split(" server ");
                      if (parts.length > 1) {
                        appsObj.versions.postgresql = parts[1];
                      }
                    }
                  }
                });
                functionProcessed();
              });
            } else {
              exec$e("postgres -V", function(error, stdout) {
                if (!error) {
                  const postgresql = stdout.toString().split("\n")[0].split(" ") || [];
                  appsObj.versions.postgresql = postgresql.length ? postgresql[postgresql.length - 1] : "";
                } else {
                  exec$e("pg_config --version", function(error2, stdout2) {
                    if (!error2) {
                      const postgresql = stdout2.toString().split("\n")[0].split(" ") || [];
                      appsObj.versions.postgresql = postgresql.length ? postgresql[postgresql.length - 1] : "";
                    }
                  });
                }
                functionProcessed();
              });
            }
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "perl")) {
          exec$e("perl -v", function(error, stdout) {
            if (!error) {
              const perl = stdout.toString().split("\n") || "";
              while (perl.length > 0 && perl[0].trim() === "") {
                perl.shift();
              }
              if (perl.length > 0) {
                appsObj.versions.perl = perl[0].split("(").pop().split(")")[0].replace("v", "");
              }
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "python")) {
          if (_darwin$e) {
            try {
              const stdout = execSync$9("sw_vers");
              const lines = stdout.toString().split("\n");
              const osVersion = util$g.getValue(lines, "ProductVersion", ":");
              const gitHomebrewExists1 = fs$8.existsSync("/usr/local/Cellar/python");
              const gitHomebrewExists2 = fs$8.existsSync("/opt/homebrew/bin/python");
              if (util$g.darwinXcodeExists() && util$g.semverCompare("12.0.1", osVersion) < 0 || gitHomebrewExists1 || gitHomebrewExists2) {
                const cmd2 = gitHomebrewExists1 ? "/usr/local/Cellar/python -V 2>&1" : gitHomebrewExists2 ? "/opt/homebrew/bin/python -V 2>&1" : "python -V 2>&1";
                exec$e(cmd2, function(error, stdout2) {
                  if (!error) {
                    const python = stdout2.toString().split("\n")[0] || "";
                    appsObj.versions.python = python.toLowerCase().replace("python", "").trim();
                  }
                  functionProcessed();
                });
              } else {
                functionProcessed();
              }
            } catch (e) {
              functionProcessed();
            }
          } else {
            exec$e("python -V 2>&1", function(error, stdout) {
              if (!error) {
                const python = stdout.toString().split("\n")[0] || "";
                appsObj.versions.python = python.toLowerCase().replace("python", "").trim();
              }
              functionProcessed();
            });
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "python3")) {
          if (_darwin$e) {
            const gitHomebrewExists = fs$8.existsSync("/usr/local/Cellar/python3") || fs$8.existsSync("/opt/homebrew/bin/python3");
            if (util$g.darwinXcodeExists() || gitHomebrewExists) {
              exec$e("python3 -V 2>&1", function(error, stdout) {
                if (!error) {
                  const python = stdout.toString().split("\n")[0] || "";
                  appsObj.versions.python3 = python.toLowerCase().replace("python", "").trim();
                }
                functionProcessed();
              });
            } else {
              functionProcessed();
            }
          } else {
            exec$e("python3 -V 2>&1", function(error, stdout) {
              if (!error) {
                const python = stdout.toString().split("\n")[0] || "";
                appsObj.versions.python3 = python.toLowerCase().replace("python", "").trim();
              }
              functionProcessed();
            });
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "pip")) {
          if (_darwin$e) {
            const gitHomebrewExists = fs$8.existsSync("/usr/local/Cellar/pip") || fs$8.existsSync("/opt/homebrew/bin/pip");
            if (util$g.darwinXcodeExists() || gitHomebrewExists) {
              exec$e("pip -V 2>&1", function(error, stdout) {
                if (!error) {
                  const pip = stdout.toString().split("\n")[0] || "";
                  const parts = pip.split(" ");
                  appsObj.versions.pip = parts.length >= 2 ? parts[1] : "";
                }
                functionProcessed();
              });
            } else {
              functionProcessed();
            }
          } else {
            exec$e("pip -V 2>&1", function(error, stdout) {
              if (!error) {
                const pip = stdout.toString().split("\n")[0] || "";
                const parts = pip.split(" ");
                appsObj.versions.pip = parts.length >= 2 ? parts[1] : "";
              }
              functionProcessed();
            });
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "pip3")) {
          if (_darwin$e) {
            const gitHomebrewExists = fs$8.existsSync("/usr/local/Cellar/pip3") || fs$8.existsSync("/opt/homebrew/bin/pip3");
            if (util$g.darwinXcodeExists() || gitHomebrewExists) {
              exec$e("pip3 -V 2>&1", function(error, stdout) {
                if (!error) {
                  const pip = stdout.toString().split("\n")[0] || "";
                  const parts = pip.split(" ");
                  appsObj.versions.pip3 = parts.length >= 2 ? parts[1] : "";
                }
                functionProcessed();
              });
            } else {
              functionProcessed();
            }
          } else {
            exec$e("pip3 -V 2>&1", function(error, stdout) {
              if (!error) {
                const pip = stdout.toString().split("\n")[0] || "";
                const parts = pip.split(" ");
                appsObj.versions.pip3 = parts.length >= 2 ? parts[1] : "";
              }
              functionProcessed();
            });
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "java")) {
          if (_darwin$e) {
            exec$e("/usr/libexec/java_home -V 2>&1", function(error, stdout) {
              if (!error && stdout.toString().toLowerCase().indexOf("no java runtime") === -1) {
                exec$e("java -version 2>&1", function(error2, stdout2) {
                  if (!error2) {
                    const java = stdout2.toString().split("\n")[0] || "";
                    const parts = java.split('"');
                    appsObj.versions.java = parts.length === 3 ? parts[1].trim() : "";
                  }
                  functionProcessed();
                });
              } else {
                functionProcessed();
              }
            });
          } else {
            exec$e("java -version 2>&1", function(error, stdout) {
              if (!error) {
                const java = stdout.toString().split("\n")[0] || "";
                const parts = java.split('"');
                appsObj.versions.java = parts.length === 3 ? parts[1].trim() : "";
              }
              functionProcessed();
            });
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "gcc")) {
          if (_darwin$e && util$g.darwinXcodeExists() || !_darwin$e) {
            exec$e("gcc -dumpversion", function(error, stdout) {
              if (!error) {
                appsObj.versions.gcc = stdout.toString().split("\n")[0].trim() || "";
              }
              if (appsObj.versions.gcc.indexOf(".") > -1) {
                functionProcessed();
              } else {
                exec$e("gcc --version", function(error2, stdout2) {
                  if (!error2) {
                    const gcc = stdout2.toString().split("\n")[0].trim();
                    if (gcc.indexOf("gcc") > -1 && gcc.indexOf(")") > -1) {
                      const parts = gcc.split(")");
                      appsObj.versions.gcc = parts[1].trim() || appsObj.versions.gcc;
                    }
                  }
                  functionProcessed();
                });
              }
            });
          } else {
            functionProcessed();
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "virtualbox")) {
          exec$e(util$g.getVboxmanage() + " -v 2>&1", function(error, stdout) {
            if (!error) {
              const vbox = stdout.toString().split("\n")[0] || "";
              const parts = vbox.split("r");
              appsObj.versions.virtualbox = parts[0];
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "bash")) {
          exec$e("bash --version", function(error, stdout) {
            if (!error) {
              const line = stdout.toString().split("\n")[0];
              const parts = line.split(" version ");
              if (parts.length > 1) {
                appsObj.versions.bash = parts[1].split(" ")[0].split("(")[0];
              }
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "zsh")) {
          exec$e("zsh --version", function(error, stdout) {
            if (!error) {
              const line = stdout.toString().split("\n")[0];
              const parts = line.split("zsh ");
              if (parts.length > 1) {
                appsObj.versions.zsh = parts[1].split(" ")[0];
              }
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "fish")) {
          exec$e("fish --version", function(error, stdout) {
            if (!error) {
              const line = stdout.toString().split("\n")[0];
              const parts = line.split(" version ");
              if (parts.length > 1) {
                appsObj.versions.fish = parts[1].split(" ")[0];
              }
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "bun")) {
          exec$e("bun -v", function(error, stdout) {
            if (!error) {
              const line = stdout.toString().split("\n")[0].trim();
              appsObj.versions.bun = line;
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "deno")) {
          exec$e("deno -v", function(error, stdout) {
            if (!error) {
              const line = stdout.toString().split("\n")[0].trim();
              const parts = line.split(" ");
              if (parts.length > 1) {
                appsObj.versions.deno = parts[1];
              }
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "node")) {
          exec$e("node -v", function(error, stdout) {
            if (!error) {
              let line = stdout.toString().split("\n")[0].trim();
              if (line.startsWith("v")) {
                line = line.slice(1);
              }
              appsObj.versions.node = line;
            }
            functionProcessed();
          });
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "powershell")) {
          if (_windows$f) {
            util$g.powerShell("$PSVersionTable").then((stdout) => {
              const lines = stdout.toString().toLowerCase().split("\n").map((line) => line.replace(/ +/g, " ").replace(/ +/g, ":"));
              appsObj.versions.powershell = util$g.getValue(lines, "psversion");
              functionProcessed();
            });
          } else {
            functionProcessed();
          }
        }
        if ({}.hasOwnProperty.call(appsObj.versions, "dotnet")) {
          if (_windows$f) {
            util$g.powerShell('gci "HKLM:\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP" -recurse | gp -name Version,Release -EA 0 | where { $_.PSChildName -match "^(?!S)\\p{L}"} | select PSChildName, Version, Release').then((stdout) => {
              const lines = stdout.toString().split("\r\n");
              let dotnet = "";
              lines.forEach((line) => {
                line = line.replace(/ +/g, " ");
                const parts = line.split(" ");
                dotnet = dotnet || (parts[0].toLowerCase().startsWith("client") && parts.length > 2 ? parts[1].trim() : parts[0].toLowerCase().startsWith("full") && parts.length > 2 ? parts[1].trim() : "");
              });
              appsObj.versions.dotnet = dotnet.trim();
              functionProcessed();
            });
          } else {
            functionProcessed();
          }
        }
      } catch (e) {
        if (callback) {
          callback(appsObj.versions);
        }
        resolve(appsObj.versions);
      }
    });
  });
}
osinfo.versions = versions;
function shell(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (_windows$f) {
        try {
          const result2 = "CMD";
          util$g.powerShell(`Get-CimInstance -className win32_process | where-object {$_.ProcessId -eq ${process.ppid} } | select Name`).then((stdout) => {
            let result3 = "CMD";
            if (stdout) {
              if (stdout.toString().toLowerCase().indexOf("powershell") >= 0) {
                result3 = "PowerShell";
              }
            }
            if (callback) {
              callback(result3);
            }
            resolve(result3);
          });
        } catch {
          if (callback) {
            callback(result);
          }
          resolve(result);
        }
      } else {
        let result2 = "";
        exec$e("echo $SHELL", function(error, stdout) {
          if (!error) {
            result2 = stdout.toString().split("\n")[0];
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
    });
  });
}
osinfo.shell = shell;
function getUniqueMacAdresses() {
  let macs = [];
  try {
    const ifaces = os$7.networkInterfaces();
    for (let dev in ifaces) {
      if ({}.hasOwnProperty.call(ifaces, dev)) {
        ifaces[dev].forEach(function(details) {
          if (details && details.mac && details.mac !== "00:00:00:00:00:00") {
            const mac = details.mac.toLowerCase();
            if (macs.indexOf(mac) === -1) {
              macs.push(mac);
            }
          }
        });
      }
    }
    macs = macs.sort(function(a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });
  } catch (e) {
    macs.push("00:00:00:00:00:00");
  }
  return macs;
}
function uuid(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        os: "",
        hardware: "",
        macs: getUniqueMacAdresses()
      };
      let parts;
      if (_darwin$e) {
        exec$e("system_profiler SPHardwareDataType -json", function(error, stdout) {
          if (!error) {
            try {
              const jsonObj = JSON.parse(stdout.toString());
              if (jsonObj.SPHardwareDataType && jsonObj.SPHardwareDataType.length > 0) {
                const spHardware = jsonObj.SPHardwareDataType[0];
                result2.os = spHardware.platform_UUID.toLowerCase();
                result2.hardware = spHardware.serial_number;
              }
            } catch (e) {
              util$g.noop();
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_linux$e) {
        const cmd = `echo -n "os: "; cat /var/lib/dbus/machine-id 2> /dev/null ||
cat /etc/machine-id 2> /dev/null; echo;
echo -n "hardware: "; cat /sys/class/dmi/id/product_uuid 2> /dev/null; echo;`;
        exec$e(cmd, function(error, stdout) {
          const lines = stdout.toString().split("\n");
          result2.os = util$g.getValue(lines, "os").toLowerCase();
          result2.hardware = util$g.getValue(lines, "hardware").toLowerCase();
          if (!result2.hardware) {
            const lines2 = fs$8.readFileSync("/proc/cpuinfo", { encoding: "utf8" }).toString().split("\n");
            const serial = util$g.getValue(lines2, "serial");
            result2.hardware = serial || "";
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_freebsd$d || _openbsd$d || _netbsd$d) {
        exec$e("sysctl -i kern.hostid kern.hostuuid", function(error, stdout) {
          const lines = stdout.toString().split("\n");
          result2.os = util$g.getValue(lines, "kern.hostid", ":").toLowerCase();
          result2.hardware = util$g.getValue(lines, "kern.hostuuid", ":").toLowerCase();
          if (result2.os.indexOf("unknown") >= 0) {
            result2.os = "";
          }
          if (result2.hardware.indexOf("unknown") >= 0) {
            result2.hardware = "";
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows$f) {
        let sysdir = "%windir%\\System32";
        if (process.arch === "ia32" && Object.prototype.hasOwnProperty.call(process.env, "PROCESSOR_ARCHITEW6432")) {
          sysdir = "%windir%\\sysnative\\cmd.exe /c %windir%\\System32";
        }
        util$g.powerShell("Get-CimInstance Win32_ComputerSystemProduct | select UUID | fl").then((stdout) => {
          let lines = stdout.split("\r\n");
          result2.hardware = util$g.getValue(lines, "uuid", ":").toLowerCase();
          exec$e(`${sysdir}\\reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography" /v MachineGuid`, util$g.execOptsWin, function(error, stdout2) {
            parts = stdout2.toString().split("\n\r")[0].split("REG_SZ");
            result2.os = parts.length > 1 ? parts[1].replace(/\r+|\n+|\s+/ig, "").toLowerCase() : "";
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        });
      }
    });
  });
}
osinfo.uuid = uuid;
var cpu$1 = {};
const os$6 = os$a;
const exec$d = require$$1$1.exec;
const execSync$8 = require$$1$1.execSync;
const fs$7 = require$$1$2;
const util$f = util$j;
let _platform$e = process.platform;
const _linux$d = _platform$e === "linux" || _platform$e === "android";
const _darwin$d = _platform$e === "darwin";
const _windows$e = _platform$e === "win32";
const _freebsd$c = _platform$e === "freebsd";
const _openbsd$c = _platform$e === "openbsd";
const _netbsd$c = _platform$e === "netbsd";
const _sunos$c = _platform$e === "sunos";
let _cpu_speed = 0;
let _current_cpu = {
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
};
let _cpus = [];
let _corecount = 0;
const AMDBaseFrequencies = {
  "8346": "1.8",
  "8347": "1.9",
  "8350": "2.0",
  "8354": "2.2",
  "8356|SE": "2.4",
  "8356": "2.3",
  "8360": "2.5",
  "2372": "2.1",
  "2373": "2.1",
  "2374": "2.2",
  "2376": "2.3",
  "2377": "2.3",
  "2378": "2.4",
  "2379": "2.4",
  "2380": "2.5",
  "2381": "2.5",
  "2382": "2.6",
  "2384": "2.7",
  "2386": "2.8",
  "2387": "2.8",
  "2389": "2.9",
  "2393": "3.1",
  "8374": "2.2",
  "8376": "2.3",
  "8378": "2.4",
  "8379": "2.4",
  "8380": "2.5",
  "8381": "2.5",
  "8382": "2.6",
  "8384": "2.7",
  "8386": "2.8",
  "8387": "2.8",
  "8389": "2.9",
  "8393": "3.1",
  "2419EE": "1.8",
  "2423HE": "2.0",
  "2425HE": "2.1",
  "2427": "2.2",
  "2431": "2.4",
  "2435": "2.6",
  "2439SE": "2.8",
  "8425HE": "2.1",
  "8431": "2.4",
  "8435": "2.6",
  "8439SE": "2.8",
  "4122": "2.2",
  "4130": "2.6",
  "4162EE": "1.7",
  "4164EE": "1.8",
  "4170HE": "2.1",
  "4174HE": "2.3",
  "4176HE": "2.4",
  "4180": "2.6",
  "4184": "2.8",
  "6124HE": "1.8",
  "6128HE": "2.0",
  "6132HE": "2.2",
  "6128": "2.0",
  "6134": "2.3",
  "6136": "2.4",
  "6140": "2.6",
  "6164HE": "1.7",
  "6166HE": "1.8",
  "6168": "1.9",
  "6172": "2.1",
  "6174": "2.2",
  "6176": "2.3",
  "6176SE": "2.3",
  "6180SE": "2.5",
  "3250": "2.5",
  "3260": "2.7",
  "3280": "2.4",
  "4226": "2.7",
  "4228": "2.8",
  "4230": "2.9",
  "4234": "3.1",
  "4238": "3.3",
  "4240": "3.4",
  "4256": "1.6",
  "4274": "2.5",
  "4276": "2.6",
  "4280": "2.8",
  "4284": "3.0",
  "6204": "3.3",
  "6212": "2.6",
  "6220": "3.0",
  "6234": "2.4",
  "6238": "2.6",
  "6262HE": "1.6",
  "6272": "2.1",
  "6274": "2.2",
  "6276": "2.3",
  "6278": "2.4",
  "6282SE": "2.6",
  "6284SE": "2.7",
  "6308": "3.5",
  "6320": "2.8",
  "6328": "3.2",
  "6338P": "2.3",
  "6344": "2.6",
  "6348": "2.8",
  "6366": "1.8",
  "6370P": "2.0",
  "6376": "2.3",
  "6378": "2.4",
  "6380": "2.5",
  "6386": "2.8",
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
  "1200": "3.1",
  "Pro 1200": "3.1",
  "1300X": "3.5",
  "Pro 1300": "3.5",
  "1400": "3.2",
  "1500X": "3.5",
  "Pro 1500": "3.5",
  "1600": "3.2",
  "1600X": "3.6",
  "Pro 1600": "3.2",
  "1700": "3.0",
  "Pro 1700": "3.0",
  "1700X": "3.4",
  "Pro 1700X": "3.4",
  "1800X": "3.6",
  "1900X": "3.8",
  "1920": "3.2",
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
  "7351": "2.4",
  "7351P": "2.4",
  "7401": "2.0",
  "7401P": "2.0",
  "7551P": "2.0",
  "7551": "2.0",
  "7251": "2.1",
  "7261": "2.5",
  "7281": "2.1",
  "7301": "2.2",
  "7371": "3.1",
  "7451": "2.3",
  "7501": "2.0",
  "7571": "2.2",
  "7601": "2.2",
  // ZEN Embedded Processors
  "V1500B": "2.2",
  "V1780B": "3.35",
  "V1202B": "2.3",
  "V1404I": "2.0",
  "V1605B": "2.0",
  "V1756B": "3.25",
  "V1807B": "3.35",
  "3101": "2.1",
  "3151": "2.7",
  "3201": "1.5",
  "3251": "2.5",
  "3255": "2.5",
  "3301": "2.0",
  "3351": "1.9",
  "3401": "1.85",
  "3451": "2.15",
  // ZEN+ Desktop
  "1200|AF": "3.1",
  "2300X": "3.5",
  "2500X": "3.6",
  "2600": "3.4",
  "2600E": "3.1",
  "1600|AF": "3.2",
  "2600X": "3.6",
  "2700": "3.2",
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
  "3100": "3.6",
  "3300X": "3.8",
  "3500": "3.6",
  "3500X": "3.6",
  "3600": "3.6",
  "Pro 3600": "3.6",
  "3600X": "3.8",
  "3600XT": "3.8",
  "Pro 3700": "3.6",
  "3700X": "3.6",
  "3800X": "3.9",
  "3800XT": "3.9",
  "3900": "3.1",
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
  "7252": "3.1",
  "7262": "3.2",
  "7272": "2.9",
  "7282": "2.8",
  "7302": "3.0",
  "7352": "2.3",
  "7402": "2.8",
  "7452": "2.35",
  "7502": "2.5",
  "7532": "2.4",
  "7542": "2.9",
  "7552": "2.2",
  "7642": "2.3",
  "7662": "2.0",
  "7702": "2.0",
  "7742": "2.25",
  "7H12": "2.6",
  "7F32": "3.7",
  "7F52": "3.5",
  "7F72": "3.2",
  // Epyc (Milan)
  "7773X": "2.2",
  "7763": "2.45",
  "7713": "2.0",
  "7713P": "2.0",
  "7663": "2.0",
  "7643": "2.3",
  "7573X": "2.8",
  "75F3": "2.95",
  "7543": "2.8",
  "7543P": "2.8",
  "7513": "2.6",
  "7473X": "2.8",
  "7453": "2.75",
  "74F3": "3.2",
  "7443": "2.85",
  "7443P": "2.85",
  "7413": "2.65",
  "7373X": "3.05",
  "73F3": "3.5",
  "7343": "3.2",
  "7313": "3.0",
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
  "9754": "2.25",
  "9754S": "2.25",
  "9734": "2.2",
  "9684X": "2.55",
  "9384X": "3.1",
  "9184X": "3.55",
  "9654P": "2.4",
  "9654": "2.4",
  "9634": "2.25",
  "9554P": "3.1",
  "9554": "3.1",
  "9534": "2.45",
  "9474F": "3.6",
  "9454P": "2.75",
  "9454": "2.75",
  "9374F": "3.85",
  "9354P": "3.25",
  "9354": "3.25",
  "9334": "2.7",
  "9274F": "4.05",
  "9254": "2.9",
  "9224": "2.5",
  "9174F": "4.1",
  "9124": "3.0"
};
const socketTypes = {
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
};
const socketTypesByName = {
  "LGA1150": "i7-5775C i3-4340 i3-4170 G3250 i3-4160T i3-4160 E3-1231 G3258 G3240 i7-4790S i7-4790K i7-4790 i5-4690K i5-4690 i5-4590T i5-4590S i5-4590 i5-4460 i3-4360 i3-4150 G1820 G3420 G3220 i7-4771 i5-4440 i3-4330 i3-4130T i3-4130 E3-1230 i7-4770S i7-4770K i7-4770 i5-4670K i5-4670 i5-4570T i5-4570S i5-4570 i5-4430",
  "LGA1151": "i9-9900KS E-2288G E-2224 G5420 i9-9900T i9-9900 i7-9700T i7-9700F i7-9700E i7-9700 i5-9600 i5-9500T i5-9500F i5-9500 i5-9400T i3-9350K i3-9300 i3-9100T i3-9100F i3-9100 G4930 i9-9900KF i7-9700KF i5-9600KF i5-9400F i5-9400 i3-9350KF i9-9900K i7-9700K i5-9600K G5500 G5400 i7-8700T i7-8086K i5-8600 i5-8500T i5-8500 i5-8400T i3-8300 i3-8100T G4900 i7-8700K i7-8700 i5-8600K i5-8400 i3-8350K i3-8100 E3-1270 G4600 G4560 i7-7700T i7-7700K i7-7700 i5-7600K i5-7600 i5-7500T i5-7500 i5-7400 i3-7350K i3-7300 i3-7100T i3-7100 G3930 G3900 G4400 i7-6700T i7-6700K i7-6700 i5-6600K i5-6600 i5-6500T i5-6500 i5-6400T i5-6400 i3-6300 i3-6100T i3-6100 E3-1270 E3-1270 T4500 T4400",
  "1155": "G440 G460 G465 G470 G530T G540T G550T G1610T G1620T G530 G540 G1610 G550 G1620 G555 G1630 i3-2100T i3-2120T i3-3220T i3-3240T i3-3250T i3-2100 i3-2105 i3-2102 i3-3210 i3-3220 i3-2125 i3-2120 i3-3225 i3-2130 i3-3245 i3-3240 i3-3250 i5-3570T i5-2500T i5-2400S i5-2405S i5-2390T i5-3330S i5-2500S i5-3335S i5-2300 i5-3450S i5-3340S i5-3470S i5-3475S i5-3470T i5-2310 i5-3550S i5-2320 i5-3330 i5-3350P i5-3450 i5-2400 i5-3340 i5-3570S i5-2380P i5-2450P i5-3470 i5-2500K i5-3550 i5-2500 i5-3570 i5-3570K i5-2550K i7-3770T i7-2600S i7-3770S i7-2600K i7-2600 i7-3770 i7-3770K i7-2700K G620T G630T G640T G2020T G645T G2100T G2030T G622 G860T G620 G632 G2120T G630 G640 G2010 G840 G2020 G850 G645 G2030 G860 G2120 G870 G2130 G2140 E3-1220L E3-1220L E3-1260L E3-1265L E3-1220 E3-1225 E3-1220 E3-1235 E3-1225 E3-1230 E3-1230 E3-1240 E3-1245 E3-1270 E3-1275 E3-1240 E3-1245 E3-1270 E3-1280 E3-1275 E3-1290 E3-1280 E3-1290"
};
function getSocketTypesByName(str) {
  let result2 = "";
  for (const key2 in socketTypesByName) {
    const names = socketTypesByName[key2].split(" ");
    names.forEach((element) => {
      if (str.indexOf(element) >= 0) {
        result2 = key2;
      }
    });
  }
  return result2;
}
function cpuManufacturer(str) {
  let result2 = str;
  str = str.toLowerCase();
  if (str.indexOf("intel") >= 0) {
    result2 = "Intel";
  }
  if (str.indexOf("amd") >= 0) {
    result2 = "AMD";
  }
  if (str.indexOf("qemu") >= 0) {
    result2 = "QEMU";
  }
  if (str.indexOf("hygon") >= 0) {
    result2 = "Hygon";
  }
  if (str.indexOf("centaur") >= 0) {
    result2 = "WinChip/Via";
  }
  if (str.indexOf("vmware") >= 0) {
    result2 = "VMware";
  }
  if (str.indexOf("Xen") >= 0) {
    result2 = "Xen Hypervisor";
  }
  if (str.indexOf("tcg") >= 0) {
    result2 = "QEMU";
  }
  if (str.indexOf("apple") >= 0) {
    result2 = "Apple";
  }
  if (str.indexOf("sifive") >= 0) {
    result2 = "SiFive";
  }
  if (str.indexOf("thead") >= 0) {
    result2 = "T-Head";
  }
  if (str.indexOf("andestech") >= 0) {
    result2 = "Andes Technology";
  }
  return result2;
}
function cpuBrandManufacturer(res) {
  res.brand = res.brand.replace(/\(R\)+/g, "®").replace(/\s+/g, " ").trim();
  res.brand = res.brand.replace(/\(TM\)+/g, "™").replace(/\s+/g, " ").trim();
  res.brand = res.brand.replace(/\(C\)+/g, "©").replace(/\s+/g, " ").trim();
  res.brand = res.brand.replace(/CPU+/g, "").replace(/\s+/g, " ").trim();
  res.manufacturer = cpuManufacturer(res.brand);
  let parts = res.brand.split(" ");
  parts.shift();
  res.brand = parts.join(" ");
  return res;
}
function getAMDSpeed(brand) {
  let result2 = "0";
  for (let key2 in AMDBaseFrequencies) {
    if ({}.hasOwnProperty.call(AMDBaseFrequencies, key2)) {
      let parts = key2.split("|");
      let found = 0;
      parts.forEach((item) => {
        if (brand.indexOf(item) > -1) {
          found++;
        }
      });
      if (found === parts.length) {
        result2 = AMDBaseFrequencies[key2];
      }
    }
  }
  return parseFloat(result2);
}
function getCpu() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      const UNKNOWN = "unknown";
      let result2 = {
        manufacturer: UNKNOWN,
        brand: UNKNOWN,
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
        cores: util$f.cores(),
        physicalCores: util$f.cores(),
        performanceCores: util$f.cores(),
        efficiencyCores: 0,
        processors: 1,
        socket: "",
        flags: "",
        virtualization: false,
        cache: {}
      };
      cpuFlags().then((flags) => {
        result2.flags = flags;
        result2.virtualization = flags.indexOf("vmx") > -1 || flags.indexOf("svm") > -1;
        if (_darwin$d) {
          exec$d("sysctl machdep.cpu hw.cpufrequency_max hw.cpufrequency_min hw.packages hw.physicalcpu_max hw.ncpu hw.tbfrequency hw.cpufamily hw.cpusubfamily", function(error, stdout) {
            let lines = stdout.toString().split("\n");
            const modelline = util$f.getValue(lines, "machdep.cpu.brand_string");
            const modellineParts = modelline.split("@");
            result2.brand = modellineParts[0].trim();
            const speed = modellineParts[1] ? modellineParts[1].trim() : "0";
            result2.speed = parseFloat(speed.replace(/GHz+/g, ""));
            let tbFrequency = util$f.getValue(lines, "hw.tbfrequency") / 1e9;
            tbFrequency = tbFrequency < 0.1 ? tbFrequency * 100 : tbFrequency;
            result2.speed = result2.speed === 0 ? tbFrequency : result2.speed;
            _cpu_speed = result2.speed;
            result2 = cpuBrandManufacturer(result2);
            result2.speedMin = util$f.getValue(lines, "hw.cpufrequency_min") ? util$f.getValue(lines, "hw.cpufrequency_min") / 1e9 : result2.speed;
            result2.speedMax = util$f.getValue(lines, "hw.cpufrequency_max") ? util$f.getValue(lines, "hw.cpufrequency_max") / 1e9 : result2.speed;
            result2.vendor = util$f.getValue(lines, "machdep.cpu.vendor") || "Apple";
            result2.family = util$f.getValue(lines, "machdep.cpu.family") || util$f.getValue(lines, "hw.cpufamily");
            result2.model = util$f.getValue(lines, "machdep.cpu.model");
            result2.stepping = util$f.getValue(lines, "machdep.cpu.stepping") || util$f.getValue(lines, "hw.cpusubfamily");
            result2.virtualization = true;
            const countProcessors = util$f.getValue(lines, "hw.packages");
            const countCores = util$f.getValue(lines, "hw.physicalcpu_max");
            const countThreads = util$f.getValue(lines, "hw.ncpu");
            if (os$6.arch() === "arm64") {
              result2.socket = "SOC";
              try {
                const clusters = execSync$8("ioreg -c IOPlatformDevice -d 3 -r | grep cluster-type").toString().split("\n");
                const efficiencyCores = clusters.filter((line) => line.indexOf('"E"') >= 0).length;
                const performanceCores = clusters.filter((line) => line.indexOf('"P"') >= 0).length;
                result2.efficiencyCores = efficiencyCores;
                result2.performanceCores = performanceCores;
              } catch (e) {
                util$f.noop();
              }
            }
            if (countProcessors) {
              result2.processors = parseInt(countProcessors) || 1;
            }
            if (countCores && countThreads) {
              result2.cores = parseInt(countThreads) || util$f.cores();
              result2.physicalCores = parseInt(countCores) || util$f.cores();
            }
            cpuCache().then((res) => {
              result2.cache = res;
              resolve(result2);
            });
          });
        }
        if (_linux$d) {
          let modelline = "";
          let lines = [];
          if (os$6.cpus()[0] && os$6.cpus()[0].model) {
            modelline = os$6.cpus()[0].model;
          }
          exec$d('export LC_ALL=C; lscpu; echo -n "Governor: "; cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor 2>/dev/null; echo; unset LC_ALL', function(error, stdout) {
            if (!error) {
              lines = stdout.toString().split("\n");
            }
            modelline = util$f.getValue(lines, "model name") || modelline;
            modelline = util$f.getValue(lines, "bios model name") || modelline;
            modelline = util$f.cleanString(modelline);
            const modellineParts = modelline.split("@");
            result2.brand = modellineParts[0].trim();
            result2.speed = modellineParts[1] ? parseFloat(modellineParts[1].trim()) : 0;
            if (result2.speed === 0 && (result2.brand.indexOf("AMD") > -1 || result2.brand.toLowerCase().indexOf("ryzen") > -1)) {
              result2.speed = getAMDSpeed(result2.brand);
            }
            if (result2.speed === 0) {
              const current = getCpuCurrentSpeedSync();
              if (current.avg !== 0) {
                result2.speed = current.avg;
              }
            }
            _cpu_speed = result2.speed;
            result2.speedMin = Math.round(parseFloat(util$f.getValue(lines, "cpu min mhz").replace(/,/g, ".")) / 10) / 100;
            result2.speedMax = Math.round(parseFloat(util$f.getValue(lines, "cpu max mhz").replace(/,/g, ".")) / 10) / 100;
            result2 = cpuBrandManufacturer(result2);
            result2.vendor = cpuManufacturer(util$f.getValue(lines, "vendor id"));
            result2.family = util$f.getValue(lines, "cpu family");
            result2.model = util$f.getValue(lines, "model:");
            result2.stepping = util$f.getValue(lines, "stepping");
            result2.revision = util$f.getValue(lines, "cpu revision");
            result2.cache.l1d = util$f.getValue(lines, "l1d cache");
            if (result2.cache.l1d) {
              result2.cache.l1d = parseInt(result2.cache.l1d) * (result2.cache.l1d.indexOf("M") !== -1 ? 1024 * 1024 : result2.cache.l1d.indexOf("K") !== -1 ? 1024 : 1);
            }
            result2.cache.l1i = util$f.getValue(lines, "l1i cache");
            if (result2.cache.l1i) {
              result2.cache.l1i = parseInt(result2.cache.l1i) * (result2.cache.l1i.indexOf("M") !== -1 ? 1024 * 1024 : result2.cache.l1i.indexOf("K") !== -1 ? 1024 : 1);
            }
            result2.cache.l2 = util$f.getValue(lines, "l2 cache");
            if (result2.cache.l2) {
              result2.cache.l2 = parseInt(result2.cache.l2) * (result2.cache.l2.indexOf("M") !== -1 ? 1024 * 1024 : result2.cache.l2.indexOf("K") !== -1 ? 1024 : 1);
            }
            result2.cache.l3 = util$f.getValue(lines, "l3 cache");
            if (result2.cache.l3) {
              result2.cache.l3 = parseInt(result2.cache.l3) * (result2.cache.l3.indexOf("M") !== -1 ? 1024 * 1024 : result2.cache.l3.indexOf("K") !== -1 ? 1024 : 1);
            }
            const threadsPerCore = util$f.getValue(lines, "thread(s) per core") || "1";
            const processors = util$f.getValue(lines, "socket(s)") || "1";
            const threadsPerCoreInt = parseInt(threadsPerCore, 10);
            const processorsInt = parseInt(processors, 10) || 1;
            const coresPerSocket = parseInt(util$f.getValue(lines, "core(s) per socket"), 10);
            result2.physicalCores = coresPerSocket ? coresPerSocket * processorsInt : result2.cores / threadsPerCoreInt;
            result2.performanceCores = threadsPerCoreInt > 1 ? result2.cores - result2.physicalCores : result2.cores;
            result2.efficiencyCores = threadsPerCoreInt > 1 ? result2.cores - threadsPerCoreInt * result2.performanceCores : 0;
            result2.processors = processorsInt;
            result2.governor = util$f.getValue(lines, "governor") || "";
            if (result2.vendor === "ARM" && util$f.isRaspberry()) {
              const rPIRevision = util$f.decodePiCpuinfo();
              result2.family = result2.manufacturer;
              result2.manufacturer = rPIRevision.manufacturer;
              result2.brand = rPIRevision.processor;
              result2.revision = rPIRevision.revisionCode;
              result2.socket = "SOC";
            }
            if (util$f.getValue(lines, "architecture") === "riscv64") {
              const linesRiscV = fs$7.readFileSync("/proc/cpuinfo").toString().split("\n");
              const uarch = util$f.getValue(linesRiscV, "uarch") || "";
              if (uarch.indexOf(",") > -1) {
                const split = uarch.split(",");
                result2.manufacturer = cpuManufacturer(split[0]);
                result2.brand = split[1];
              }
            }
            let lines2 = [];
            exec$d('export LC_ALL=C; dmidecode –t 4 2>/dev/null | grep "Upgrade: Socket"; unset LC_ALL', function(error2, stdout2) {
              lines2 = stdout2.toString().split("\n");
              if (lines2 && lines2.length) {
                result2.socket = util$f.getValue(lines2, "Upgrade").replace("Socket", "").trim() || result2.socket;
              }
              resolve(result2);
            });
          });
        }
        if (_freebsd$c || _openbsd$c || _netbsd$c) {
          let modelline = "";
          let lines = [];
          if (os$6.cpus()[0] && os$6.cpus()[0].model) {
            modelline = os$6.cpus()[0].model;
          }
          exec$d("export LC_ALL=C; dmidecode -t 4; dmidecode -t 7 unset LC_ALL", function(error, stdout) {
            let cache = [];
            if (!error) {
              const data = stdout.toString().split("# dmidecode");
              const processor = data.length > 1 ? data[1] : "";
              cache = data.length > 2 ? data[2].split("Cache Information") : [];
              lines = processor.split("\n");
            }
            result2.brand = modelline.split("@")[0].trim();
            result2.speed = modelline.split("@")[1] ? parseFloat(modelline.split("@")[1].trim()) : 0;
            if (result2.speed === 0 && (result2.brand.indexOf("AMD") > -1 || result2.brand.toLowerCase().indexOf("ryzen") > -1)) {
              result2.speed = getAMDSpeed(result2.brand);
            }
            if (result2.speed === 0) {
              const current = getCpuCurrentSpeedSync();
              if (current.avg !== 0) {
                result2.speed = current.avg;
              }
            }
            _cpu_speed = result2.speed;
            result2.speedMin = result2.speed;
            result2.speedMax = Math.round(parseFloat(util$f.getValue(lines, "max speed").replace(/Mhz/g, "")) / 10) / 100;
            result2 = cpuBrandManufacturer(result2);
            result2.vendor = cpuManufacturer(util$f.getValue(lines, "manufacturer"));
            let sig = util$f.getValue(lines, "signature");
            sig = sig.split(",");
            for (let i = 0; i < sig.length; i++) {
              sig[i] = sig[i].trim();
            }
            result2.family = util$f.getValue(sig, "Family", " ", true);
            result2.model = util$f.getValue(sig, "Model", " ", true);
            result2.stepping = util$f.getValue(sig, "Stepping", " ", true);
            result2.revision = "";
            const voltage = parseFloat(util$f.getValue(lines, "voltage"));
            result2.voltage = isNaN(voltage) ? "" : voltage.toFixed(2);
            for (let i = 0; i < cache.length; i++) {
              lines = cache[i].split("\n");
              let cacheType = util$f.getValue(lines, "Socket Designation").toLowerCase().replace(" ", "-").split("-");
              cacheType = cacheType.length ? cacheType[0] : "";
              const sizeParts = util$f.getValue(lines, "Installed Size").split(" ");
              let size = parseInt(sizeParts[0], 10);
              const unit = sizeParts.length > 1 ? sizeParts[1] : "kb";
              size = size * (unit === "kb" ? 1024 : unit === "mb" ? 1024 * 1024 : unit === "gb" ? 1024 * 1024 * 1024 : 1);
              if (cacheType) {
                if (cacheType === "l1") {
                  result2.cache[cacheType + "d"] = size / 2;
                  result2.cache[cacheType + "i"] = size / 2;
                } else {
                  result2.cache[cacheType] = size;
                }
              }
            }
            result2.socket = util$f.getValue(lines, "Upgrade").replace("Socket", "").trim();
            const threadCount = util$f.getValue(lines, "thread count").trim();
            const coreCount = util$f.getValue(lines, "core count").trim();
            if (coreCount && threadCount) {
              result2.cores = parseInt(threadCount, 10);
              result2.physicalCores = parseInt(coreCount, 10);
            }
            resolve(result2);
          });
        }
        if (_sunos$c) {
          resolve(result2);
        }
        if (_windows$e) {
          try {
            const workload = [];
            workload.push(util$f.powerShell("Get-CimInstance Win32_processor | select Name, Revision, L2CacheSize, L3CacheSize, Manufacturer, MaxClockSpeed, Description, UpgradeMethod, Caption, NumberOfLogicalProcessors, NumberOfCores | fl"));
            workload.push(util$f.powerShell("Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl"));
            workload.push(util$f.powerShell("(Get-CimInstance Win32_ComputerSystem).HypervisorPresent"));
            Promise.all(
              workload
            ).then((data) => {
              let lines = data[0].split("\r\n");
              let name = util$f.getValue(lines, "name", ":") || "";
              if (name.indexOf("@") >= 0) {
                result2.brand = name.split("@")[0].trim();
                result2.speed = name.split("@")[1] ? parseFloat(name.split("@")[1].trim()) : 0;
                _cpu_speed = result2.speed;
              } else {
                result2.brand = name.trim();
                result2.speed = 0;
              }
              result2 = cpuBrandManufacturer(result2);
              result2.revision = util$f.getValue(lines, "revision", ":");
              result2.vendor = util$f.getValue(lines, "manufacturer", ":");
              result2.speedMax = Math.round(parseFloat(util$f.getValue(lines, "maxclockspeed", ":").replace(/,/g, ".")) / 10) / 100;
              if (result2.speed === 0 && (result2.brand.indexOf("AMD") > -1 || result2.brand.toLowerCase().indexOf("ryzen") > -1)) {
                result2.speed = getAMDSpeed(result2.brand);
              }
              if (result2.speed === 0) {
                result2.speed = result2.speedMax;
              }
              result2.speedMin = result2.speed;
              let description = util$f.getValue(lines, "description", ":").split(" ");
              for (let i = 0; i < description.length; i++) {
                if (description[i].toLowerCase().startsWith("family") && i + 1 < description.length && description[i + 1]) {
                  result2.family = description[i + 1];
                }
                if (description[i].toLowerCase().startsWith("model") && i + 1 < description.length && description[i + 1]) {
                  result2.model = description[i + 1];
                }
                if (description[i].toLowerCase().startsWith("stepping") && i + 1 < description.length && description[i + 1]) {
                  result2.stepping = description[i + 1];
                }
              }
              const socketId = util$f.getValue(lines, "UpgradeMethod", ":");
              if (socketTypes[socketId]) {
                result2.socket = socketTypes[socketId];
              }
              const socketByName = getSocketTypesByName(name);
              if (socketByName) {
                result2.socket = socketByName;
              }
              const countProcessors = util$f.countLines(lines, "Caption");
              const countThreads = util$f.getValue(lines, "NumberOfLogicalProcessors", ":");
              const countCores = util$f.getValue(lines, "NumberOfCores", ":");
              if (countProcessors) {
                result2.processors = parseInt(countProcessors) || 1;
              }
              if (countCores && countThreads) {
                result2.cores = parseInt(countThreads) || util$f.cores();
                result2.physicalCores = parseInt(countCores) || util$f.cores();
              }
              if (countProcessors > 1) {
                result2.cores = result2.cores * countProcessors;
                result2.physicalCores = result2.physicalCores * countProcessors;
              }
              result2.cache = parseWinCache(data[0], data[1]);
              const hyperv = data[2] ? data[2].toString().toLowerCase() : "";
              result2.virtualization = hyperv.indexOf("true") !== -1;
              resolve(result2);
            });
          } catch (e) {
            resolve(result2);
          }
        }
      });
    });
  });
}
function cpu(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      getCpu().then((result2) => {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      });
    });
  });
}
cpu$1.cpu = cpu;
function getCpuCurrentSpeedSync() {
  let cpus = os$6.cpus();
  let minFreq = 999999999;
  let maxFreq = 0;
  let avgFreq = 0;
  let cores2 = [];
  let speeds = [];
  if (cpus && cpus.length && cpus[0].speed) {
    for (let i in cpus) {
      speeds.push(cpus[i].speed > 100 ? (cpus[i].speed + 1) / 1e3 : cpus[i].speed / 10);
    }
  } else if (_linux$d) {
    try {
      const speedStrings = execSync$8('cat /proc/cpuinfo | grep "cpu MHz" | cut -d " " -f 3', util$f.execOptsLinux).toString().split("\n").filter((line) => line.length > 0);
      for (let i in speedStrings) {
        speeds.push(Math.floor(parseInt(speedStrings[i], 10) / 10) / 100);
      }
    } catch {
      util$f.noop();
    }
  }
  if (speeds && speeds.length) {
    for (let i in speeds) {
      avgFreq = avgFreq + speeds[i];
      if (speeds[i] > maxFreq) {
        maxFreq = speeds[i];
      }
      if (speeds[i] < minFreq) {
        minFreq = speeds[i];
      }
      cores2.push(parseFloat(speeds[i].toFixed(2)));
    }
    avgFreq = avgFreq / speeds.length;
    return {
      min: parseFloat(minFreq.toFixed(2)),
      max: parseFloat(maxFreq.toFixed(2)),
      avg: parseFloat(avgFreq.toFixed(2)),
      cores: cores2
    };
  } else {
    return {
      min: 0,
      max: 0,
      avg: 0,
      cores: cores2
    };
  }
}
function cpuCurrentSpeed(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = getCpuCurrentSpeedSync();
      if (result2.avg === 0 && _cpu_speed !== 0) {
        const currCpuSpeed = parseFloat(_cpu_speed);
        result2 = {
          min: currCpuSpeed,
          max: currCpuSpeed,
          avg: currCpuSpeed,
          cores: []
        };
      }
      if (callback) {
        callback(result2);
      }
      resolve(result2);
    });
  });
}
cpu$1.cpuCurrentSpeed = cpuCurrentSpeed;
function cpuTemperature(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        main: null,
        cores: [],
        max: null,
        socket: [],
        chipset: null
      };
      if (_linux$d) {
        try {
          const cmd2 = 'cat /sys/class/thermal/thermal_zone*/type  2>/dev/null; echo "-----"; cat /sys/class/thermal/thermal_zone*/temp 2>/dev/null;';
          const parts = execSync$8(cmd2, util$f.execOptsLinux).toString().split("-----\n");
          if (parts.length === 2) {
            const lines = parts[0].split("\n");
            const lines2 = parts[1].split("\n");
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i].trim();
              if (line.startsWith("acpi") && lines2[i]) {
                result2.socket.push(Math.round(parseInt(lines2[i], 10) / 100) / 10);
              }
              if (line.startsWith("pch") && lines2[i]) {
                result2.chipset = Math.round(parseInt(lines2[i], 10) / 100) / 10;
              }
            }
          }
        } catch (e) {
          util$f.noop();
        }
        const cmd = 'for mon in /sys/class/hwmon/hwmon*; do for label in "$mon"/temp*_label; do if [ -f $label ]; then value=${label%_*}_input; echo $(cat "$label")___$(cat "$value"); fi; done; done;';
        try {
          exec$d(cmd, function(error, stdout) {
            stdout = stdout.toString();
            const tdiePos = stdout.toLowerCase().indexOf("tdie");
            if (tdiePos !== -1) {
              stdout = stdout.substring(tdiePos);
            }
            let lines = stdout.split("\n");
            let tctl = 0;
            lines.forEach((line) => {
              const parts = line.split("___");
              const label = parts[0];
              const value = parts.length > 1 && parts[1] ? parts[1] : "0";
              if (value && label && label.toLowerCase() === "tctl") {
                tctl = result2.main = Math.round(parseInt(value, 10) / 100) / 10;
              }
              if (value && (label === void 0 || label && label.toLowerCase().startsWith("core"))) {
                result2.cores.push(Math.round(parseInt(value, 10) / 100) / 10);
              } else if (value && label && result2.main === null && (label.toLowerCase().indexOf("package") >= 0 || label.toLowerCase().indexOf("physical") >= 0 || label.toLowerCase() === "tccd1")) {
                result2.main = Math.round(parseInt(value, 10) / 100) / 10;
              }
            });
            if (tctl && result2.main === null) {
              result2.main = tctl;
            }
            if (result2.cores.length > 0) {
              if (result2.main === null) {
                result2.main = Math.round(result2.cores.reduce((a, b) => a + b, 0) / result2.cores.length);
              }
              let maxtmp = Math.max.apply(Math, result2.cores);
              result2.max = maxtmp > result2.main ? maxtmp : result2.main;
            }
            if (result2.main !== null) {
              if (result2.max === null) {
                result2.max = result2.main;
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
              return;
            }
            exec$d("sensors", function(error2, stdout2) {
              if (!error2) {
                let lines2 = stdout2.toString().split("\n");
                let tdieTemp = null;
                let newSectionStarts = true;
                let section = "";
                lines2.forEach(function(line) {
                  if (line.trim() === "") {
                    newSectionStarts = true;
                  } else if (newSectionStarts) {
                    if (line.trim().toLowerCase().startsWith("acpi")) {
                      section = "acpi";
                    }
                    if (line.trim().toLowerCase().startsWith("pch")) {
                      section = "pch";
                    }
                    if (line.trim().toLowerCase().startsWith("core")) {
                      section = "core";
                    }
                    newSectionStarts = false;
                  }
                  let regex = /[+-]([^°]*)/g;
                  let temps = line.match(regex);
                  let firstPart = line.split(":")[0].toUpperCase();
                  if (section === "acpi") {
                    if (firstPart.indexOf("TEMP") !== -1) {
                      result2.socket.push(parseFloat(temps));
                    }
                  } else if (section === "pch") {
                    if (firstPart.indexOf("TEMP") !== -1 && !result2.chipset) {
                      result2.chipset = parseFloat(temps);
                    }
                  }
                  if (firstPart.indexOf("PHYSICAL") !== -1 || firstPart.indexOf("PACKAGE") !== -1) {
                    result2.main = parseFloat(temps);
                  }
                  if (firstPart.indexOf("CORE ") !== -1) {
                    result2.cores.push(parseFloat(temps));
                  }
                  if (firstPart.indexOf("TDIE") !== -1 && tdieTemp === null) {
                    tdieTemp = parseFloat(temps);
                  }
                });
                if (result2.cores.length > 0) {
                  result2.main = Math.round(result2.cores.reduce((a, b) => a + b, 0) / result2.cores.length);
                  let maxtmp = Math.max.apply(Math, result2.cores);
                  result2.max = maxtmp > result2.main ? maxtmp : result2.main;
                } else {
                  if (result2.main === null && tdieTemp !== null) {
                    result2.main = tdieTemp;
                    result2.max = tdieTemp;
                  }
                }
                if (result2.main !== null || result2.max !== null) {
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                  return;
                }
              }
              fs$7.stat("/sys/class/thermal/thermal_zone0/temp", function(err) {
                if (err === null) {
                  fs$7.readFile("/sys/class/thermal/thermal_zone0/temp", function(error3, stdout3) {
                    if (!error3) {
                      let lines2 = stdout3.toString().split("\n");
                      if (lines2.length > 0) {
                        result2.main = parseFloat(lines2[0]) / 1e3;
                        result2.max = result2.main;
                      }
                    }
                    if (callback) {
                      callback(result2);
                    }
                    resolve(result2);
                  });
                } else {
                  exec$d("/opt/vc/bin/vcgencmd measure_temp", function(error3, stdout3) {
                    if (!error3) {
                      let lines2 = stdout3.toString().split("\n");
                      if (lines2.length > 0 && lines2[0].indexOf("=")) {
                        result2.main = parseFloat(lines2[0].split("=")[1]);
                        result2.max = result2.main;
                      }
                    }
                    if (callback) {
                      callback(result2);
                    }
                    resolve(result2);
                  });
                }
              });
            });
          });
        } catch (er) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_freebsd$c || _openbsd$c || _netbsd$c) {
        exec$d("sysctl dev.cpu | grep temp", function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            let sum = 0;
            lines.forEach(function(line) {
              const parts = line.split(":");
              if (parts.length > 1) {
                const temp = parseFloat(parts[1].replace(",", "."));
                if (temp > result2.max) {
                  result2.max = temp;
                }
                sum = sum + temp;
                result2.cores.push(temp);
              }
            });
            if (result2.cores.length) {
              result2.main = Math.round(sum / result2.cores.length * 100) / 100;
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$d) {
        let osxTemp = null;
        try {
          osxTemp = require("osx-temperature-sensor");
        } catch (er) {
          osxTemp = null;
        }
        if (osxTemp) {
          result2 = osxTemp.cpuTemperature();
          if (result2.main) {
            result2.main = Math.round(result2.main * 100) / 100;
          }
          if (result2.max) {
            result2.max = Math.round(result2.max * 100) / 100;
          }
          if (result2.cores && result2.cores.length) {
            for (let i = 0; i < result2.cores.length; i++) {
              result2.cores[i] = Math.round(result2.cores[i] * 100) / 100;
            }
          }
        }
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_sunos$c) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$e) {
        try {
          util$f.powerShell('Get-CimInstance MSAcpi_ThermalZoneTemperature -Namespace "root/wmi" | Select CurrentTemperature').then((stdout, error) => {
            if (!error) {
              let sum = 0;
              let lines = stdout.split("\r\n").filter((line) => line.trim() !== "").filter((line, idx) => idx > 0);
              lines.forEach(function(line) {
                let value = (parseInt(line, 10) - 2732) / 10;
                if (!isNaN(value)) {
                  sum = sum + value;
                  if (value > result2.max) {
                    result2.max = value;
                  }
                  result2.cores.push(value);
                }
              });
              if (result2.cores.length) {
                result2.main = sum / result2.cores.length;
              }
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
cpu$1.cpuTemperature = cpuTemperature;
function cpuFlags(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = "";
      if (_windows$e) {
        try {
          exec$d('reg query "HKEY_LOCAL_MACHINE\\HARDWARE\\DESCRIPTION\\System\\CentralProcessor\\0" /v FeatureSet', util$f.execOptsWin, function(error, stdout) {
            if (!error) {
              let flag_hex = stdout.split("0x").pop().trim();
              let flag_bin_unpadded = parseInt(flag_hex, 16).toString(2);
              let flag_bin = "0".repeat(32 - flag_bin_unpadded.length) + flag_bin_unpadded;
              let all_flags = [
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
              for (let f = 0; f < all_flags.length; f++) {
                if (flag_bin[f] === "1" && all_flags[f] !== "") {
                  result2 += " " + all_flags[f];
                }
              }
              result2 = result2.trim().toLowerCase();
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_linux$d) {
        try {
          exec$d("export LC_ALL=C; lscpu; unset LC_ALL", function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              lines.forEach(function(line) {
                if (line.split(":")[0].toUpperCase().indexOf("FLAGS") !== -1) {
                  result2 = line.split(":")[1].trim().toLowerCase();
                }
              });
            }
            if (!result2) {
              fs$7.readFile("/proc/cpuinfo", function(error2, stdout2) {
                if (!error2) {
                  let lines = stdout2.toString().split("\n");
                  result2 = util$f.getValue(lines, "features", ":", true).toLowerCase();
                }
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_freebsd$c || _openbsd$c || _netbsd$c) {
        exec$d("export LC_ALL=C; dmidecode -t 4 2>/dev/null; unset LC_ALL", function(error, stdout) {
          let flags = [];
          if (!error) {
            let parts = stdout.toString().split("	Flags:");
            const lines = parts.length > 1 ? parts[1].split("	Version:")[0].split("\n") : [];
            lines.forEach(function(line) {
              let flag = (line.indexOf("(") ? line.split("(")[0].toLowerCase() : "").trim().replace(/\t/g, "");
              if (flag) {
                flags.push(flag);
              }
            });
          }
          result2 = flags.join(" ").trim().toLowerCase();
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$d) {
        exec$d("sysctl machdep.cpu.features", function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            if (lines.length > 0 && lines[0].indexOf("machdep.cpu.features:") !== -1) {
              result2 = lines[0].split(":")[1].trim().toLowerCase();
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$c) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
cpu$1.cpuFlags = cpuFlags;
function cpuCache(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        l1d: null,
        l1i: null,
        l2: null,
        l3: null
      };
      if (_linux$d) {
        try {
          exec$d("export LC_ALL=C; lscpu; unset LC_ALL", function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              lines.forEach(function(line) {
                let parts = line.split(":");
                if (parts[0].toUpperCase().indexOf("L1D CACHE") !== -1) {
                  result2.l1d = parseInt(parts[1].trim()) * (parts[1].indexOf("M") !== -1 ? 1024 * 1024 : parts[1].indexOf("K") !== -1 ? 1024 : 1);
                }
                if (parts[0].toUpperCase().indexOf("L1I CACHE") !== -1) {
                  result2.l1i = parseInt(parts[1].trim()) * (parts[1].indexOf("M") !== -1 ? 1024 * 1024 : parts[1].indexOf("K") !== -1 ? 1024 : 1);
                }
                if (parts[0].toUpperCase().indexOf("L2 CACHE") !== -1) {
                  result2.l2 = parseInt(parts[1].trim()) * (parts[1].indexOf("M") !== -1 ? 1024 * 1024 : parts[1].indexOf("K") !== -1 ? 1024 : 1);
                }
                if (parts[0].toUpperCase().indexOf("L3 CACHE") !== -1) {
                  result2.l3 = parseInt(parts[1].trim()) * (parts[1].indexOf("M") !== -1 ? 1024 * 1024 : parts[1].indexOf("K") !== -1 ? 1024 : 1);
                }
              });
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_freebsd$c || _openbsd$c || _netbsd$c) {
        exec$d("export LC_ALL=C; dmidecode -t 7 2>/dev/null; unset LC_ALL", function(error, stdout) {
          let cache = [];
          if (!error) {
            const data = stdout.toString();
            cache = data.split("Cache Information");
            cache.shift();
          }
          for (let i = 0; i < cache.length; i++) {
            const lines = cache[i].split("\n");
            let cacheType = util$f.getValue(lines, "Socket Designation").toLowerCase().replace(" ", "-").split("-");
            cacheType = cacheType.length ? cacheType[0] : "";
            const sizeParts = util$f.getValue(lines, "Installed Size").split(" ");
            let size = parseInt(sizeParts[0], 10);
            const unit = sizeParts.length > 1 ? sizeParts[1] : "kb";
            size = size * (unit === "kb" ? 1024 : unit === "mb" ? 1024 * 1024 : unit === "gb" ? 1024 * 1024 * 1024 : 1);
            if (cacheType) {
              if (cacheType === "l1") {
                result2.cache[cacheType + "d"] = size / 2;
                result2.cache[cacheType + "i"] = size / 2;
              } else {
                result2.cache[cacheType] = size;
              }
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$d) {
        exec$d("sysctl hw.l1icachesize hw.l1dcachesize hw.l2cachesize hw.l3cachesize", function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            lines.forEach(function(line) {
              let parts = line.split(":");
              if (parts[0].toLowerCase().indexOf("hw.l1icachesize") !== -1) {
                result2.l1d = parseInt(parts[1].trim()) * (parts[1].indexOf("K") !== -1 ? 1024 : 1);
              }
              if (parts[0].toLowerCase().indexOf("hw.l1dcachesize") !== -1) {
                result2.l1i = parseInt(parts[1].trim()) * (parts[1].indexOf("K") !== -1 ? 1024 : 1);
              }
              if (parts[0].toLowerCase().indexOf("hw.l2cachesize") !== -1) {
                result2.l2 = parseInt(parts[1].trim()) * (parts[1].indexOf("K") !== -1 ? 1024 : 1);
              }
              if (parts[0].toLowerCase().indexOf("hw.l3cachesize") !== -1) {
                result2.l3 = parseInt(parts[1].trim()) * (parts[1].indexOf("K") !== -1 ? 1024 : 1);
              }
            });
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$c) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$e) {
        try {
          const workload = [];
          workload.push(util$f.powerShell("Get-CimInstance Win32_processor | select L2CacheSize, L3CacheSize | fl"));
          workload.push(util$f.powerShell("Get-CimInstance Win32_CacheMemory | select CacheType,InstalledSize,Level | fl"));
          Promise.all(
            workload
          ).then((data) => {
            result2 = parseWinCache(data[0], data[1]);
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
function parseWinCache(linesProc, linesCache) {
  let result2 = {
    l1d: null,
    l1i: null,
    l2: null,
    l3: null
  };
  let lines = linesProc.split("\r\n");
  result2.l1d = 0;
  result2.l1i = 0;
  result2.l2 = util$f.getValue(lines, "l2cachesize", ":");
  result2.l3 = util$f.getValue(lines, "l3cachesize", ":");
  if (result2.l2) {
    result2.l2 = parseInt(result2.l2, 10) * 1024;
  } else {
    result2.l2 = 0;
  }
  if (result2.l3) {
    result2.l3 = parseInt(result2.l3, 10) * 1024;
  } else {
    result2.l3 = 0;
  }
  const parts = linesCache.split(/\n\s*\n/);
  let l1i = 0;
  let l1d = 0;
  let l2 = 0;
  parts.forEach(function(part) {
    const lines2 = part.split("\r\n");
    const cacheType = util$f.getValue(lines2, "CacheType");
    const level = util$f.getValue(lines2, "Level");
    const installedSize = util$f.getValue(lines2, "InstalledSize");
    if (level === "3" && cacheType === "3") {
      result2.l1i = result2.l1i + parseInt(installedSize, 10) * 1024;
    }
    if (level === "3" && cacheType === "4") {
      result2.l1d = result2.l1d + parseInt(installedSize, 10) * 1024;
    }
    if (level === "3" && cacheType === "5") {
      l1i = parseInt(installedSize, 10) / 2;
      l1d = parseInt(installedSize, 10) / 2;
    }
    if (level === "4" && cacheType === "5") {
      l2 = l2 + parseInt(installedSize, 10) * 1024;
    }
  });
  if (!result2.l1i && !result2.l1d) {
    result2.l1i = l1i;
    result2.l1d = l1d;
  }
  if (l2) {
    result2.l2 = l2;
  }
  return result2;
}
cpu$1.cpuCache = cpuCache;
function getLoad() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let loads = os$6.loadavg().map(function(x) {
        return x / util$f.cores();
      });
      let avgLoad = parseFloat(Math.max.apply(Math, loads).toFixed(2));
      let result2 = {};
      let now = Date.now() - _current_cpu.ms;
      if (now >= 200) {
        _current_cpu.ms = Date.now();
        const cpus = os$6.cpus().map(function(cpu2) {
          cpu2.times.steal = 0;
          cpu2.times.guest = 0;
          return cpu2;
        });
        let totalUser = 0;
        let totalSystem = 0;
        let totalNice = 0;
        let totalIrq = 0;
        let totalIdle = 0;
        let totalSteal = 0;
        let totalGuest = 0;
        let cores2 = [];
        _corecount = cpus && cpus.length ? cpus.length : 0;
        if (_linux$d) {
          try {
            const lines = execSync$8("cat /proc/stat 2>/dev/null | grep cpu", util$f.execOptsLinux).toString().split("\n");
            if (lines.length > 1) {
              lines.shift();
              if (lines.length === cpus.length) {
                for (let i = 0; i < lines.length; i++) {
                  let parts = lines[i].split(" ");
                  if (parts.length >= 10) {
                    const steal = parseFloat(parts[8]) || 0;
                    const guest = parseFloat(parts[9]) || 0;
                    cpus[i].times.steal = steal;
                    cpus[i].times.guest = guest;
                  }
                }
              }
            }
          } catch (e) {
            util$f.noop();
          }
        }
        for (let i = 0; i < _corecount; i++) {
          const cpu2 = cpus[i].times;
          totalUser += cpu2.user;
          totalSystem += cpu2.sys;
          totalNice += cpu2.nice;
          totalIdle += cpu2.idle;
          totalIrq += cpu2.irq;
          totalSteal += cpu2.steal || 0;
          totalGuest += cpu2.guest || 0;
          let tmpTick = _cpus && _cpus[i] && _cpus[i].totalTick ? _cpus[i].totalTick : 0;
          let tmpLoad = _cpus && _cpus[i] && _cpus[i].totalLoad ? _cpus[i].totalLoad : 0;
          let tmpUser = _cpus && _cpus[i] && _cpus[i].user ? _cpus[i].user : 0;
          let tmpSystem = _cpus && _cpus[i] && _cpus[i].sys ? _cpus[i].sys : 0;
          let tmpNice = _cpus && _cpus[i] && _cpus[i].nice ? _cpus[i].nice : 0;
          let tmpIdle = _cpus && _cpus[i] && _cpus[i].idle ? _cpus[i].idle : 0;
          let tmpIrq = _cpus && _cpus[i] && _cpus[i].irq ? _cpus[i].irq : 0;
          let tmpSteal = _cpus && _cpus[i] && _cpus[i].steal ? _cpus[i].steal : 0;
          let tmpGuest = _cpus && _cpus[i] && _cpus[i].guest ? _cpus[i].guest : 0;
          _cpus[i] = cpu2;
          _cpus[i].totalTick = _cpus[i].user + _cpus[i].sys + _cpus[i].nice + _cpus[i].irq + _cpus[i].steal + _cpus[i].guest + _cpus[i].idle;
          _cpus[i].totalLoad = _cpus[i].user + _cpus[i].sys + _cpus[i].nice + _cpus[i].irq + _cpus[i].steal + _cpus[i].guest;
          _cpus[i].currentTick = _cpus[i].totalTick - tmpTick;
          _cpus[i].load = _cpus[i].totalLoad - tmpLoad;
          _cpus[i].loadUser = _cpus[i].user - tmpUser;
          _cpus[i].loadSystem = _cpus[i].sys - tmpSystem;
          _cpus[i].loadNice = _cpus[i].nice - tmpNice;
          _cpus[i].loadIdle = _cpus[i].idle - tmpIdle;
          _cpus[i].loadIrq = _cpus[i].irq - tmpIrq;
          _cpus[i].loadSteal = _cpus[i].steal - tmpSteal;
          _cpus[i].loadGuest = _cpus[i].guest - tmpGuest;
          cores2[i] = {};
          cores2[i].load = _cpus[i].load / _cpus[i].currentTick * 100;
          cores2[i].loadUser = _cpus[i].loadUser / _cpus[i].currentTick * 100;
          cores2[i].loadSystem = _cpus[i].loadSystem / _cpus[i].currentTick * 100;
          cores2[i].loadNice = _cpus[i].loadNice / _cpus[i].currentTick * 100;
          cores2[i].loadIdle = _cpus[i].loadIdle / _cpus[i].currentTick * 100;
          cores2[i].loadIrq = _cpus[i].loadIrq / _cpus[i].currentTick * 100;
          cores2[i].loadSteal = _cpus[i].loadSteal / _cpus[i].currentTick * 100;
          cores2[i].loadGuest = _cpus[i].loadGuest / _cpus[i].currentTick * 100;
          cores2[i].rawLoad = _cpus[i].load;
          cores2[i].rawLoadUser = _cpus[i].loadUser;
          cores2[i].rawLoadSystem = _cpus[i].loadSystem;
          cores2[i].rawLoadNice = _cpus[i].loadNice;
          cores2[i].rawLoadIdle = _cpus[i].loadIdle;
          cores2[i].rawLoadIrq = _cpus[i].loadIrq;
          cores2[i].rawLoadSteal = _cpus[i].loadSteal;
          cores2[i].rawLoadGuest = _cpus[i].loadGuest;
        }
        let totalTick = totalUser + totalSystem + totalNice + totalIrq + totalSteal + totalGuest + totalIdle;
        let totalLoad = totalUser + totalSystem + totalNice + totalIrq + totalSteal + totalGuest;
        let currentTick = totalTick - _current_cpu.tick;
        result2 = {
          avgLoad,
          currentLoad: (totalLoad - _current_cpu.load) / currentTick * 100,
          currentLoadUser: (totalUser - _current_cpu.user) / currentTick * 100,
          currentLoadSystem: (totalSystem - _current_cpu.system) / currentTick * 100,
          currentLoadNice: (totalNice - _current_cpu.nice) / currentTick * 100,
          currentLoadIdle: (totalIdle - _current_cpu.idle) / currentTick * 100,
          currentLoadIrq: (totalIrq - _current_cpu.irq) / currentTick * 100,
          currentLoadSteal: (totalSteal - _current_cpu.steal) / currentTick * 100,
          currentLoadGuest: (totalGuest - _current_cpu.guest) / currentTick * 100,
          rawCurrentLoad: totalLoad - _current_cpu.load,
          rawCurrentLoadUser: totalUser - _current_cpu.user,
          rawCurrentLoadSystem: totalSystem - _current_cpu.system,
          rawCurrentLoadNice: totalNice - _current_cpu.nice,
          rawCurrentLoadIdle: totalIdle - _current_cpu.idle,
          rawCurrentLoadIrq: totalIrq - _current_cpu.irq,
          rawCurrentLoadSteal: totalSteal - _current_cpu.steal,
          rawCurrentLoadGuest: totalGuest - _current_cpu.guest,
          cpus: cores2
        };
        _current_cpu = {
          user: totalUser,
          nice: totalNice,
          system: totalSystem,
          idle: totalIdle,
          irq: totalIrq,
          steal: totalSteal,
          guest: totalGuest,
          tick: totalTick,
          load: totalLoad,
          ms: _current_cpu.ms,
          currentLoad: result2.currentLoad,
          currentLoadUser: result2.currentLoadUser,
          currentLoadSystem: result2.currentLoadSystem,
          currentLoadNice: result2.currentLoadNice,
          currentLoadIdle: result2.currentLoadIdle,
          currentLoadIrq: result2.currentLoadIrq,
          currentLoadSteal: result2.currentLoadSteal,
          currentLoadGuest: result2.currentLoadGuest,
          rawCurrentLoad: result2.rawCurrentLoad,
          rawCurrentLoadUser: result2.rawCurrentLoadUser,
          rawCurrentLoadSystem: result2.rawCurrentLoadSystem,
          rawCurrentLoadNice: result2.rawCurrentLoadNice,
          rawCurrentLoadIdle: result2.rawCurrentLoadIdle,
          rawCurrentLoadIrq: result2.rawCurrentLoadIrq,
          rawCurrentLoadSteal: result2.rawCurrentLoadSteal,
          rawCurrentLoadGuest: result2.rawCurrentLoadGuest
        };
      } else {
        let cores2 = [];
        for (let i = 0; i < _corecount; i++) {
          cores2[i] = {};
          cores2[i].load = _cpus[i].load / _cpus[i].currentTick * 100;
          cores2[i].loadUser = _cpus[i].loadUser / _cpus[i].currentTick * 100;
          cores2[i].loadSystem = _cpus[i].loadSystem / _cpus[i].currentTick * 100;
          cores2[i].loadNice = _cpus[i].loadNice / _cpus[i].currentTick * 100;
          cores2[i].loadIdle = _cpus[i].loadIdle / _cpus[i].currentTick * 100;
          cores2[i].loadIrq = _cpus[i].loadIrq / _cpus[i].currentTick * 100;
          cores2[i].rawLoad = _cpus[i].load;
          cores2[i].rawLoadUser = _cpus[i].loadUser;
          cores2[i].rawLoadSystem = _cpus[i].loadSystem;
          cores2[i].rawLoadNice = _cpus[i].loadNice;
          cores2[i].rawLoadIdle = _cpus[i].loadIdle;
          cores2[i].rawLoadIrq = _cpus[i].loadIrq;
          cores2[i].rawLoadSteal = _cpus[i].loadSteal;
          cores2[i].rawLoadGuest = _cpus[i].loadGuest;
        }
        result2 = {
          avgLoad,
          currentLoad: _current_cpu.currentLoad,
          currentLoadUser: _current_cpu.currentLoadUser,
          currentLoadSystem: _current_cpu.currentLoadSystem,
          currentLoadNice: _current_cpu.currentLoadNice,
          currentLoadIdle: _current_cpu.currentLoadIdle,
          currentLoadIrq: _current_cpu.currentLoadIrq,
          currentLoadSteal: _current_cpu.currentLoadSteal,
          currentLoadGuest: _current_cpu.currentLoadGuest,
          rawCurrentLoad: _current_cpu.rawCurrentLoad,
          rawCurrentLoadUser: _current_cpu.rawCurrentLoadUser,
          rawCurrentLoadSystem: _current_cpu.rawCurrentLoadSystem,
          rawCurrentLoadNice: _current_cpu.rawCurrentLoadNice,
          rawCurrentLoadIdle: _current_cpu.rawCurrentLoadIdle,
          rawCurrentLoadIrq: _current_cpu.rawCurrentLoadIrq,
          rawCurrentLoadSteal: _current_cpu.rawCurrentLoadSteal,
          rawCurrentLoadGuest: _current_cpu.rawCurrentLoadGuest,
          cpus: cores2
        };
      }
      resolve(result2);
    });
  });
}
function currentLoad(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      getLoad().then((result2) => {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      });
    });
  });
}
cpu$1.currentLoad = currentLoad;
function getFullLoad() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      const cpus = os$6.cpus();
      let totalUser = 0;
      let totalSystem = 0;
      let totalNice = 0;
      let totalIrq = 0;
      let totalIdle = 0;
      let result2 = 0;
      if (cpus && cpus.length) {
        for (let i = 0, len = cpus.length; i < len; i++) {
          const cpu2 = cpus[i].times;
          totalUser += cpu2.user;
          totalSystem += cpu2.sys;
          totalNice += cpu2.nice;
          totalIrq += cpu2.irq;
          totalIdle += cpu2.idle;
        }
        let totalTicks = totalIdle + totalIrq + totalNice + totalSystem + totalUser;
        result2 = (totalTicks - totalIdle) / totalTicks * 100;
      }
      resolve(result2);
    });
  });
}
function fullLoad(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      getFullLoad().then((result2) => {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      });
    });
  });
}
cpu$1.fullLoad = fullLoad;
var memory = {};
const os$5 = os$a;
const exec$c = require$$1$1.exec;
const execSync$7 = require$$1$1.execSync;
const util$e = util$j;
const fs$6 = require$$1$2;
let _platform$d = process.platform;
const _linux$c = _platform$d === "linux" || _platform$d === "android";
const _darwin$c = _platform$d === "darwin";
const _windows$d = _platform$d === "win32";
const _freebsd$b = _platform$d === "freebsd";
const _openbsd$b = _platform$d === "openbsd";
const _netbsd$b = _platform$d === "netbsd";
const _sunos$b = _platform$d === "sunos";
const OSX_RAM_manufacturers = {
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
};
const LINUX_RAM_manufacturers = {
  "017A": "Apacer",
  "0198": "HyperX",
  "029E": "Corsair",
  "04CB": "A-DATA",
  "04CD": "G-Skill",
  "059B": "Crucial",
  "00CE": "Samsung",
  "1315": "Crucial",
  "014F": "Transcend Information",
  "2C00": "Micron Technology Inc.",
  "802C": "Micron Technology Inc.",
  "80AD": "Hynix Semiconductor Inc.",
  "80CE": "Samsung Electronics Inc.",
  "AD00": "Hynix Semiconductor Inc.",
  "CE00": "Samsung Electronics Inc.",
  "02FE": "Elpida",
  "5105": "Qimonda AG i. In.",
  "8551": "Qimonda AG i. In.",
  "859B": "Crucial"
};
function mem(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        total: os$5.totalmem(),
        free: os$5.freemem(),
        used: os$5.totalmem() - os$5.freemem(),
        active: os$5.totalmem() - os$5.freemem(),
        // temporarily (fallback)
        available: os$5.freemem(),
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
      if (_linux$c) {
        try {
          fs$6.readFile("/proc/meminfo", function(error, stdout) {
            if (!error) {
              const lines = stdout.toString().split("\n");
              result2.total = parseInt(util$e.getValue(lines, "memtotal"), 10);
              result2.total = result2.total ? result2.total * 1024 : os$5.totalmem();
              result2.free = parseInt(util$e.getValue(lines, "memfree"), 10);
              result2.free = result2.free ? result2.free * 1024 : os$5.freemem();
              result2.used = result2.total - result2.free;
              result2.buffers = parseInt(util$e.getValue(lines, "buffers"), 10);
              result2.buffers = result2.buffers ? result2.buffers * 1024 : 0;
              result2.cached = parseInt(util$e.getValue(lines, "cached"), 10);
              result2.cached = result2.cached ? result2.cached * 1024 : 0;
              result2.slab = parseInt(util$e.getValue(lines, "slab"), 10);
              result2.slab = result2.slab ? result2.slab * 1024 : 0;
              result2.buffcache = result2.buffers + result2.cached + result2.slab;
              let available = parseInt(util$e.getValue(lines, "memavailable"), 10);
              result2.available = available ? available * 1024 : result2.free + result2.buffcache;
              result2.active = result2.total - result2.available;
              result2.swaptotal = parseInt(util$e.getValue(lines, "swaptotal"), 10);
              result2.swaptotal = result2.swaptotal ? result2.swaptotal * 1024 : 0;
              result2.swapfree = parseInt(util$e.getValue(lines, "swapfree"), 10);
              result2.swapfree = result2.swapfree ? result2.swapfree * 1024 : 0;
              result2.swapused = result2.swaptotal - result2.swapfree;
              result2.writeback = parseInt(util$e.getValue(lines, "writeback"), 10);
              result2.writeback = result2.writeback ? result2.writeback * 1024 : 0;
              result2.dirty = parseInt(util$e.getValue(lines, "dirty"), 10);
              result2.dirty = result2.dirty ? result2.dirty * 1024 : 0;
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_freebsd$b || _openbsd$b || _netbsd$b) {
        try {
          exec$c("/sbin/sysctl hw.realmem hw.physmem vm.stats.vm.v_page_count vm.stats.vm.v_wire_count vm.stats.vm.v_active_count vm.stats.vm.v_inactive_count vm.stats.vm.v_cache_count vm.stats.vm.v_free_count vm.stats.vm.v_page_size", function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              const pagesize = parseInt(util$e.getValue(lines, "vm.stats.vm.v_page_size"), 10);
              const inactive = parseInt(util$e.getValue(lines, "vm.stats.vm.v_inactive_count"), 10) * pagesize;
              const cache = parseInt(util$e.getValue(lines, "vm.stats.vm.v_cache_count"), 10) * pagesize;
              result2.total = parseInt(util$e.getValue(lines, "hw.realmem"), 10);
              if (isNaN(result2.total)) {
                result2.total = parseInt(util$e.getValue(lines, "hw.physmem"), 10);
              }
              result2.free = parseInt(util$e.getValue(lines, "vm.stats.vm.v_free_count"), 10) * pagesize;
              result2.buffcache = inactive + cache;
              result2.available = result2.buffcache + result2.free;
              result2.active = result2.total - result2.free - result2.buffcache;
              result2.swaptotal = 0;
              result2.swapfree = 0;
              result2.swapused = 0;
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_sunos$b) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_darwin$c) {
        let pageSize = 4096;
        try {
          let sysPpageSize = util$e.toInt(execSync$7("sysctl -n vm.pagesize").toString());
          pageSize = sysPpageSize || pageSize;
        } catch (e) {
          util$e.noop();
        }
        try {
          exec$c('vm_stat 2>/dev/null | grep "Pages active"', function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              result2.active = parseInt(lines[0].split(":")[1], 10) * pageSize;
              result2.buffcache = result2.used - result2.active;
              result2.available = result2.free + result2.buffcache;
            }
            exec$c("sysctl -n vm.swapusage 2>/dev/null", function(error2, stdout2) {
              if (!error2) {
                let lines = stdout2.toString().split("\n");
                if (lines.length > 0) {
                  let firstline = lines[0].replace(/,/g, ".").replace(/M/g, "");
                  let lineArray = firstline.trim().split("  ");
                  lineArray.forEach((line) => {
                    if (line.toLowerCase().indexOf("total") !== -1) {
                      result2.swaptotal = parseFloat(line.split("=")[1].trim()) * 1024 * 1024;
                    }
                    if (line.toLowerCase().indexOf("used") !== -1) {
                      result2.swapused = parseFloat(line.split("=")[1].trim()) * 1024 * 1024;
                    }
                    if (line.toLowerCase().indexOf("free") !== -1) {
                      result2.swapfree = parseFloat(line.split("=")[1].trim()) * 1024 * 1024;
                    }
                  });
                }
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_windows$d) {
        let swaptotal = 0;
        let swapused = 0;
        try {
          util$e.powerShell("Get-CimInstance Win32_PageFileUsage | Select AllocatedBaseSize, CurrentUsage").then((stdout, error) => {
            if (!error) {
              let lines = stdout.split("\r\n").filter((line) => line.trim() !== "").filter((line, idx) => idx > 0);
              lines.forEach(function(line) {
                if (line !== "") {
                  line = line.trim().split(/\s\s+/);
                  swaptotal = swaptotal + (parseInt(line[0], 10) || 0);
                  swapused = swapused + (parseInt(line[1], 10) || 0);
                }
              });
            }
            result2.swaptotal = swaptotal * 1024 * 1024;
            result2.swapused = swapused * 1024 * 1024;
            result2.swapfree = result2.swaptotal - result2.swapused;
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
memory.mem = mem;
function memLayout(callback) {
  function getManufacturerDarwin(manId) {
    if ({}.hasOwnProperty.call(OSX_RAM_manufacturers, manId)) {
      return OSX_RAM_manufacturers[manId];
    }
    return manId;
  }
  function getManufacturerLinux(manId) {
    const manIdSearch = manId.replace("0x", "").toUpperCase();
    if (manIdSearch.length === 4 && {}.hasOwnProperty.call(LINUX_RAM_manufacturers, manIdSearch)) {
      return LINUX_RAM_manufacturers[manIdSearch];
    }
    return manId;
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux$c || _freebsd$b || _openbsd$b || _netbsd$b) {
        exec$c('export LC_ALL=C; dmidecode -t memory 2>/dev/null | grep -iE "Size:|Type|Speed|Manufacturer|Form Factor|Locator|Memory Device|Serial Number|Voltage|Part Number"; unset LC_ALL', function(error, stdout) {
          if (!error) {
            let devices = stdout.toString().split("Memory Device");
            devices.shift();
            devices.forEach(function(device) {
              let lines = device.split("\n");
              const sizeString = util$e.getValue(lines, "Size");
              const size = sizeString.indexOf("GB") >= 0 ? parseInt(sizeString, 10) * 1024 * 1024 * 1024 : parseInt(sizeString, 10) * 1024 * 1024;
              let bank = util$e.getValue(lines, "Bank Locator");
              if (bank.toLowerCase().indexOf("bad") >= 0) {
                bank = "";
              }
              if (parseInt(util$e.getValue(lines, "Size"), 10) > 0) {
                const totalWidth = util$e.toInt(util$e.getValue(lines, "Total Width"));
                const dataWidth = util$e.toInt(util$e.getValue(lines, "Data Width"));
                result2.push({
                  size,
                  bank,
                  type: util$e.getValue(lines, "Type:"),
                  ecc: dataWidth && totalWidth ? totalWidth > dataWidth : false,
                  clockSpeed: util$e.getValue(lines, "Configured Clock Speed:") ? parseInt(util$e.getValue(lines, "Configured Clock Speed:"), 10) : util$e.getValue(lines, "Speed:") ? parseInt(util$e.getValue(lines, "Speed:"), 10) : null,
                  formFactor: util$e.getValue(lines, "Form Factor:"),
                  manufacturer: getManufacturerLinux(util$e.getValue(lines, "Manufacturer:")),
                  partNum: util$e.getValue(lines, "Part Number:"),
                  serialNum: util$e.getValue(lines, "Serial Number:"),
                  voltageConfigured: parseFloat(util$e.getValue(lines, "Configured Voltage:")) || null,
                  voltageMin: parseFloat(util$e.getValue(lines, "Minimum Voltage:")) || null,
                  voltageMax: parseFloat(util$e.getValue(lines, "Maximum Voltage:")) || null
                });
              } else {
                result2.push({
                  size: 0,
                  bank,
                  type: "Empty",
                  ecc: null,
                  clockSpeed: 0,
                  formFactor: util$e.getValue(lines, "Form Factor:"),
                  partNum: "",
                  serialNum: "",
                  voltageConfigured: null,
                  voltageMin: null,
                  voltageMax: null
                });
              }
            });
          }
          if (!result2.length) {
            result2.push({
              size: os$5.totalmem(),
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
              let stdout2 = execSync$7("cat /proc/cpuinfo 2>/dev/null", util$e.execOptsLinux);
              let lines = stdout2.toString().split("\n");
              let version2 = util$e.getValue(lines, "revision", ":", true).toLowerCase();
              if (util$e.isRaspberry(lines)) {
                const clockSpeed = {
                  "0": 400,
                  "1": 450,
                  "2": 450,
                  "3": 3200,
                  "4": 4267
                };
                result2[0].type = "LPDDR2";
                result2[0].type = version2 && version2[2] && version2[2] === "3" ? "LPDDR4" : result2[0].type;
                result2[0].type = version2 && version2[2] && version2[2] === "4" ? "LPDDR4X" : result2[0].type;
                result2[0].ecc = false;
                result2[0].clockSpeed = version2 && version2[2] && clockSpeed[version2[2]] || 400;
                result2[0].clockSpeed = version2 && version2[4] && version2[4] === "d" ? 500 : result2[0].clockSpeed;
                result2[0].formFactor = "SoC";
                stdout2 = execSync$7("vcgencmd get_config sdram_freq 2>/dev/null", util$e.execOptsLinux);
                lines = stdout2.toString().split("\n");
                let freq = parseInt(util$e.getValue(lines, "sdram_freq", "=", true), 10) || 0;
                if (freq) {
                  result2[0].clockSpeed = freq;
                }
                stdout2 = execSync$7("vcgencmd measure_volts sdram_p 2>/dev/null", util$e.execOptsLinux);
                lines = stdout2.toString().split("\n");
                let voltage = parseFloat(util$e.getValue(lines, "volt", "=", true)) || 0;
                if (voltage) {
                  result2[0].voltageConfigured = voltage;
                  result2[0].voltageMin = voltage;
                  result2[0].voltageMax = voltage;
                }
              }
            } catch (e) {
              util$e.noop();
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$c) {
        exec$c("system_profiler SPMemoryDataType", function(error, stdout) {
          if (!error) {
            const allLines = stdout.toString().split("\n");
            const eccStatus = util$e.getValue(allLines, "ecc", ":", true).toLowerCase();
            let devices = stdout.toString().split("        BANK ");
            let hasBank = true;
            if (devices.length === 1) {
              devices = stdout.toString().split("        DIMM");
              hasBank = false;
            }
            devices.shift();
            devices.forEach(function(device) {
              let lines = device.split("\n");
              const bank = (hasBank ? "BANK " : "DIMM") + lines[0].trim().split("/")[0];
              const size = parseInt(util$e.getValue(lines, "          Size"));
              if (size) {
                result2.push({
                  size: size * 1024 * 1024 * 1024,
                  bank,
                  type: util$e.getValue(lines, "          Type:"),
                  ecc: eccStatus ? eccStatus === "enabled" : null,
                  clockSpeed: parseInt(util$e.getValue(lines, "          Speed:"), 10),
                  formFactor: "",
                  manufacturer: getManufacturerDarwin(util$e.getValue(lines, "          Manufacturer:")),
                  partNum: util$e.getValue(lines, "          Part Number:"),
                  serialNum: util$e.getValue(lines, "          Serial Number:"),
                  voltageConfigured: null,
                  voltageMin: null,
                  voltageMax: null
                });
              } else {
                result2.push({
                  size: 0,
                  bank,
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
              }
            });
          }
          if (!result2.length) {
            const lines = stdout.toString().split("\n");
            const size = parseInt(util$e.getValue(lines, "      Memory:"));
            const type = util$e.getValue(lines, "      Type:");
            const manufacturerId = util$e.getValue(lines, "      Manufacturer:");
            if (size && type) {
              result2.push({
                size: size * 1024 * 1024 * 1024,
                bank: "0",
                type,
                ecc: false,
                clockSpeed: null,
                formFactor: "SOC",
                manufacturer: getManufacturerDarwin(manufacturerId),
                partNum: "",
                serialNum: "",
                voltageConfigured: null,
                voltageMin: null,
                voltageMax: null
              });
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$b) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$d) {
        const memoryTypes = "Unknown|Other|DRAM|Synchronous DRAM|Cache DRAM|EDO|EDRAM|VRAM|SRAM|RAM|ROM|FLASH|EEPROM|FEPROM|EPROM|CDRAM|3DRAM|SDRAM|SGRAM|RDRAM|DDR|DDR2|DDR2 FB-DIMM|Reserved|DDR3|FBD2|DDR4|LPDDR|LPDDR2|LPDDR3|LPDDR4|Logical non-volatile device|HBM|HBM2|DDR5|LPDDR5".split("|");
        const FormFactors = "Unknown|Other|SIP|DIP|ZIP|SOJ|Proprietary|SIMM|DIMM|TSOP|PGA|RIMM|SODIMM|SRIMM|SMD|SSMP|QFP|TQFP|SOIC|LCC|PLCC|BGA|FPBGA|LGA".split("|");
        try {
          util$e.powerShell("Get-CimInstance Win32_PhysicalMemory | select DataWidth,TotalWidth,Capacity,BankLabel,MemoryType,SMBIOSMemoryType,ConfiguredClockSpeed,Speed,FormFactor,Manufacturer,PartNumber,SerialNumber,ConfiguredVoltage,MinVoltage,MaxVoltage,Tag | fl").then((stdout, error) => {
            if (!error) {
              let devices = stdout.toString().split(/\n\s*\n/);
              devices.shift();
              devices.forEach(function(device) {
                let lines = device.split("\r\n");
                const dataWidth = util$e.toInt(util$e.getValue(lines, "DataWidth", ":"));
                const totalWidth = util$e.toInt(util$e.getValue(lines, "TotalWidth", ":"));
                const size = parseInt(util$e.getValue(lines, "Capacity", ":"), 10) || 0;
                const tag = util$e.getValue(lines, "Tag", ":");
                const tagInt = util$e.splitByNumber(tag);
                if (size) {
                  result2.push({
                    size,
                    bank: util$e.getValue(lines, "BankLabel", ":") + (tagInt[1] ? "/" + tagInt[1] : ""),
                    // BankLabel
                    type: memoryTypes[parseInt(util$e.getValue(lines, "MemoryType", ":"), 10) || parseInt(util$e.getValue(lines, "SMBIOSMemoryType", ":"), 10)],
                    ecc: dataWidth && totalWidth ? totalWidth > dataWidth : false,
                    clockSpeed: parseInt(util$e.getValue(lines, "ConfiguredClockSpeed", ":"), 10) || parseInt(util$e.getValue(lines, "Speed", ":"), 10) || 0,
                    formFactor: FormFactors[parseInt(util$e.getValue(lines, "FormFactor", ":"), 10) || 0],
                    manufacturer: util$e.getValue(lines, "Manufacturer", ":"),
                    partNum: util$e.getValue(lines, "PartNumber", ":"),
                    serialNum: util$e.getValue(lines, "SerialNumber", ":"),
                    voltageConfigured: (parseInt(util$e.getValue(lines, "ConfiguredVoltage", ":"), 10) || 0) / 1e3,
                    voltageMin: (parseInt(util$e.getValue(lines, "MinVoltage", ":"), 10) || 0) / 1e3,
                    voltageMax: (parseInt(util$e.getValue(lines, "MaxVoltage", ":"), 10) || 0) / 1e3
                  });
                }
              });
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
memory.memLayout = memLayout;
const exec$b = require$$1$1.exec;
const fs$5 = require$$1$2;
const util$d = util$j;
let _platform$c = process.platform;
const _linux$b = _platform$c === "linux" || _platform$c === "android";
const _darwin$b = _platform$c === "darwin";
const _windows$c = _platform$c === "win32";
const _freebsd$a = _platform$c === "freebsd";
const _openbsd$a = _platform$c === "openbsd";
const _netbsd$a = _platform$c === "netbsd";
const _sunos$a = _platform$c === "sunos";
function parseWinBatteryPart(lines, designedCapacity, fullChargeCapacity) {
  const result2 = {};
  let status = util$d.getValue(lines, "BatteryStatus", ":").trim();
  if (status >= 0) {
    const statusValue = status ? parseInt(status) : 0;
    result2.status = statusValue;
    result2.hasBattery = true;
    result2.maxCapacity = fullChargeCapacity || parseInt(util$d.getValue(lines, "DesignCapacity", ":") || 0);
    result2.designedCapacity = parseInt(util$d.getValue(lines, "DesignCapacity", ":") || designedCapacity);
    result2.voltage = parseInt(util$d.getValue(lines, "DesignVoltage", ":") || 0) / 1e3;
    result2.capacityUnit = "mWh";
    result2.percent = parseInt(util$d.getValue(lines, "EstimatedChargeRemaining", ":") || 0);
    result2.currentCapacity = parseInt(result2.maxCapacity * result2.percent / 100);
    result2.isCharging = statusValue >= 6 && statusValue <= 9 || statusValue === 11 || statusValue !== 3 && statusValue !== 1 && result2.percent < 100;
    result2.acConnected = result2.isCharging || statusValue === 2;
    result2.model = util$d.getValue(lines, "DeviceID", ":");
  } else {
    result2.status = -1;
  }
  return result2;
}
var battery = function(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        hasBattery: false,
        cycleCount: 0,
        isCharging: false,
        designedCapacity: 0,
        maxCapacity: 0,
        currentCapacity: 0,
        voltage: 0,
        capacityUnit: "",
        percent: 0,
        timeRemaining: null,
        acConnected: true,
        type: "",
        model: "",
        manufacturer: "",
        serial: ""
      };
      if (_linux$b) {
        let battery_path = "";
        if (fs$5.existsSync("/sys/class/power_supply/BAT1/uevent")) {
          battery_path = "/sys/class/power_supply/BAT1/";
        } else if (fs$5.existsSync("/sys/class/power_supply/BAT0/uevent")) {
          battery_path = "/sys/class/power_supply/BAT0/";
        }
        let acConnected = false;
        let acPath = "";
        if (fs$5.existsSync("/sys/class/power_supply/AC/online")) {
          acPath = "/sys/class/power_supply/AC/online";
        } else if (fs$5.existsSync("/sys/class/power_supply/AC0/online")) {
          acPath = "/sys/class/power_supply/AC0/online";
        }
        if (acPath) {
          const file = fs$5.readFileSync(acPath);
          acConnected = file.toString().trim() === "1";
        }
        if (battery_path) {
          fs$5.readFile(battery_path + "uevent", function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              result2.isCharging = util$d.getValue(lines, "POWER_SUPPLY_STATUS", "=").toLowerCase() === "charging";
              result2.acConnected = acConnected || result2.isCharging;
              result2.voltage = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_VOLTAGE_NOW", "="), 10) / 1e6;
              result2.capacityUnit = result2.voltage ? "mWh" : "mAh";
              result2.cycleCount = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_CYCLE_COUNT", "="), 10);
              result2.maxCapacity = Math.round(parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_CHARGE_FULL", "=", true, true), 10) / 1e3 * (result2.voltage || 1));
              const desingedMinVoltage = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_VOLTAGE_MIN_DESIGN", "="), 10) / 1e6;
              result2.designedCapacity = Math.round(parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_CHARGE_FULL_DESIGN", "=", true, true), 10) / 1e3 * (desingedMinVoltage || result2.voltage || 1));
              result2.currentCapacity = Math.round(parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_CHARGE_NOW", "="), 10) / 1e3 * (result2.voltage || 1));
              if (!result2.maxCapacity) {
                result2.maxCapacity = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_ENERGY_FULL", "=", true, true), 10) / 1e3;
                result2.designedCapacity = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_ENERGY_FULL_DESIGN", "=", true, true), 10) / 1e3 | result2.maxCapacity;
                result2.currentCapacity = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_ENERGY_NOW", "="), 10) / 1e3;
              }
              const percent = util$d.getValue(lines, "POWER_SUPPLY_CAPACITY", "=");
              const energy = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_ENERGY_NOW", "="), 10);
              const power = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_POWER_NOW", "="), 10);
              const current = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_CURRENT_NOW", "="), 10);
              const charge = parseInt("0" + util$d.getValue(lines, "POWER_SUPPLY_CHARGE_NOW", "="), 10);
              result2.percent = parseInt("0" + percent, 10);
              if (result2.maxCapacity && result2.currentCapacity) {
                result2.hasBattery = true;
                if (!percent) {
                  result2.percent = 100 * result2.currentCapacity / result2.maxCapacity;
                }
              }
              if (result2.isCharging) {
                result2.hasBattery = true;
              }
              if (energy && power) {
                result2.timeRemaining = Math.floor(energy / power * 60);
              } else if (current && charge) {
                result2.timeRemaining = Math.floor(charge / current * 60);
              } else if (current && result2.currentCapacity) {
                result2.timeRemaining = Math.floor(result2.currentCapacity / current * 60);
              }
              result2.type = util$d.getValue(lines, "POWER_SUPPLY_TECHNOLOGY", "=");
              result2.model = util$d.getValue(lines, "POWER_SUPPLY_MODEL_NAME", "=");
              result2.manufacturer = util$d.getValue(lines, "POWER_SUPPLY_MANUFACTURER", "=");
              result2.serial = util$d.getValue(lines, "POWER_SUPPLY_SERIAL_NUMBER", "=");
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        } else {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_freebsd$a || _openbsd$a || _netbsd$a) {
        exec$b("sysctl -i hw.acpi.battery hw.acpi.acline", function(error, stdout) {
          let lines = stdout.toString().split("\n");
          const batteries = parseInt("0" + util$d.getValue(lines, "hw.acpi.battery.units"), 10);
          const percent = parseInt("0" + util$d.getValue(lines, "hw.acpi.battery.life"), 10);
          result2.hasBattery = batteries > 0;
          result2.cycleCount = null;
          result2.isCharging = util$d.getValue(lines, "hw.acpi.acline") !== "1";
          result2.acConnected = result2.isCharging;
          result2.maxCapacity = null;
          result2.currentCapacity = null;
          result2.capacityUnit = "unknown";
          result2.percent = batteries ? percent : null;
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$b) {
        exec$b('ioreg -n AppleSmartBattery -r | egrep "CycleCount|IsCharging|DesignCapacity|MaxCapacity|CurrentCapacity|DeviceName|BatterySerialNumber|Serial|TimeRemaining|Voltage"; pmset -g batt | grep %', function(error, stdout) {
          if (stdout) {
            let lines = stdout.toString().replace(/ +/g, "").replace(/"+/g, "").replace(/-/g, "").split("\n");
            result2.cycleCount = parseInt("0" + util$d.getValue(lines, "cyclecount", "="), 10);
            result2.voltage = parseInt("0" + util$d.getValue(lines, "voltage", "="), 10) / 1e3;
            result2.capacityUnit = result2.voltage ? "mWh" : "mAh";
            result2.maxCapacity = Math.round(parseInt("0" + util$d.getValue(lines, "applerawmaxcapacity", "="), 10) * (result2.voltage || 1));
            result2.currentCapacity = Math.round(parseInt("0" + util$d.getValue(lines, "applerawcurrentcapacity", "="), 10) * (result2.voltage || 1));
            result2.designedCapacity = Math.round(parseInt("0" + util$d.getValue(lines, "DesignCapacity", "="), 10) * (result2.voltage || 1));
            result2.manufacturer = "Apple";
            result2.serial = util$d.getValue(lines, "BatterySerialNumber", "=") || util$d.getValue(lines, "Serial", "=");
            result2.model = util$d.getValue(lines, "DeviceName", "=");
            let percent = null;
            const line = util$d.getValue(lines, "internal", "Battery");
            let parts = line.split(";");
            if (parts && parts[0]) {
              let parts2 = parts[0].split("	");
              if (parts2 && parts2[1]) {
                percent = parseFloat(parts2[1].trim().replace(/%/g, ""));
              }
            }
            if (parts && parts[1]) {
              result2.isCharging = parts[1].trim() === "charging";
              result2.acConnected = parts[1].trim() !== "discharging";
            } else {
              result2.isCharging = util$d.getValue(lines, "ischarging", "=").toLowerCase() === "yes";
              result2.acConnected = result2.isCharging;
            }
            if (result2.maxCapacity && result2.currentCapacity) {
              result2.hasBattery = true;
              result2.type = "Li-ion";
              result2.percent = percent !== null ? percent : Math.round(100 * result2.currentCapacity / result2.maxCapacity);
              if (!result2.isCharging) {
                result2.timeRemaining = parseInt("0" + util$d.getValue(lines, "TimeRemaining", "="), 10);
              }
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$a) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_windows$c) {
        try {
          const workload = [];
          workload.push(util$d.powerShell("Get-CimInstance Win32_Battery | select BatteryStatus, DesignCapacity, DesignVoltage, EstimatedChargeRemaining, DeviceID | fl"));
          workload.push(util$d.powerShell("(Get-WmiObject -Class BatteryStaticData -Namespace ROOT/WMI).DesignedCapacity"));
          workload.push(util$d.powerShell("(Get-CimInstance -Class BatteryFullChargedCapacity -Namespace ROOT/WMI).FullChargedCapacity"));
          util$d.promiseAll(
            workload
          ).then((data) => {
            if (data) {
              let parts = data.results[0].split(/\n\s*\n/);
              let batteries = [];
              const hasValue = (value) => /\S/.test(value);
              for (let i = 0; i < parts.length; i++) {
                if (hasValue(parts[i]) && (!batteries.length || !hasValue(parts[i - 1]))) {
                  batteries.push([]);
                }
                if (hasValue(parts[i])) {
                  batteries[batteries.length - 1].push(parts[i]);
                }
              }
              let designCapacities = data.results[1].split("\r\n").filter((e) => e);
              let fullChargeCapacities = data.results[2].split("\r\n").filter((e) => e);
              if (batteries.length) {
                let first = false;
                let additionalBatteries = [];
                for (let i = 0; i < batteries.length; i++) {
                  let lines = batteries[i][0].split("\r\n");
                  const designedCapacity = designCapacities && designCapacities.length >= i + 1 && designCapacities[i] ? util$d.toInt(designCapacities[i]) : 0;
                  const fullChargeCapacity = fullChargeCapacities && fullChargeCapacities.length >= i + 1 && fullChargeCapacities[i] ? util$d.toInt(fullChargeCapacities[i]) : 0;
                  const parsed = parseWinBatteryPart(lines, designedCapacity, fullChargeCapacity);
                  if (!first && parsed.status > 0 && parsed.status !== 10) {
                    result2.hasBattery = parsed.hasBattery;
                    result2.maxCapacity = parsed.maxCapacity;
                    result2.designedCapacity = parsed.designedCapacity;
                    result2.voltage = parsed.voltage;
                    result2.capacityUnit = parsed.capacityUnit;
                    result2.percent = parsed.percent;
                    result2.currentCapacity = parsed.currentCapacity;
                    result2.isCharging = parsed.isCharging;
                    result2.acConnected = parsed.acConnected;
                    result2.model = parsed.model;
                    first = true;
                  } else if (parsed.status !== -1) {
                    additionalBatteries.push(
                      {
                        hasBattery: parsed.hasBattery,
                        maxCapacity: parsed.maxCapacity,
                        designedCapacity: parsed.designedCapacity,
                        voltage: parsed.voltage,
                        capacityUnit: parsed.capacityUnit,
                        percent: parsed.percent,
                        currentCapacity: parsed.currentCapacity,
                        isCharging: parsed.isCharging,
                        timeRemaining: null,
                        acConnected: parsed.acConnected,
                        model: parsed.model,
                        type: "",
                        manufacturer: "",
                        serial: ""
                      }
                    );
                  }
                }
                if (!first && additionalBatteries.length) {
                  result2 = additionalBatteries[0];
                  additionalBatteries.shift();
                }
                if (additionalBatteries.length) {
                  result2.additionalBatteries = additionalBatteries;
                }
              }
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
};
var graphics$1 = {};
const fs$4 = require$$1$2;
const exec$a = require$$1$1.exec;
const execSync$6 = require$$1$1.execSync;
const util$c = util$j;
let _platform$b = process.platform;
let _nvidiaSmiPath = "";
const _linux$a = _platform$b === "linux" || _platform$b === "android";
const _darwin$a = _platform$b === "darwin";
const _windows$b = _platform$b === "win32";
const _freebsd$9 = _platform$b === "freebsd";
const _openbsd$9 = _platform$b === "openbsd";
const _netbsd$9 = _platform$b === "netbsd";
const _sunos$9 = _platform$b === "sunos";
let _resolutionX = 0;
let _resolutionY = 0;
let _pixelDepth = 0;
let _refreshRate = 0;
const videoTypes = {
  "-2": "UNINITIALIZED",
  "-1": "OTHER",
  "0": "HD15",
  "1": "SVIDEO",
  "2": "Composite video",
  "3": "Component video",
  "4": "DVI",
  "5": "HDMI",
  "6": "LVDS",
  "8": "D_JPN",
  "9": "SDI",
  "10": "DP",
  "11": "DP embedded",
  "12": "UDI",
  "13": "UDI embedded",
  "14": "SDTVDONGLE",
  "15": "MIRACAST",
  "2147483648": "INTERNAL"
};
function getVendorFromModel(model) {
  const manufacturers = [
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
  let result2 = "";
  if (model) {
    model = model.toUpperCase();
    manufacturers.forEach((manufacturer) => {
      const re = RegExp(manufacturer.pattern);
      if (re.test(model)) {
        result2 = manufacturer.manufacturer;
      }
    });
  }
  return result2;
}
function getVendorFromId(id) {
  const vendors = {
    "610": "Apple",
    "1e6d": "LG",
    "10ac": "DELL",
    "4dd9": "Sony",
    "38a3": "NEC"
  };
  return vendors[id] || "";
}
function vendorToId(str) {
  let result2 = "";
  str = (str || "").toLowerCase();
  if (str.indexOf("apple") >= 0) {
    result2 = "0x05ac";
  } else if (str.indexOf("nvidia") >= 0) {
    result2 = "0x10de";
  } else if (str.indexOf("intel") >= 0) {
    result2 = "0x8086";
  } else if (str.indexOf("ati") >= 0 || str.indexOf("amd") >= 0) {
    result2 = "0x1002";
  }
  return result2;
}
function getMetalVersion(id) {
  const families = {
    "spdisplays_mtlgpufamilymac1": "mac1",
    "spdisplays_mtlgpufamilymac2": "mac2",
    "spdisplays_mtlgpufamilyapple1": "apple1",
    "spdisplays_mtlgpufamilyapple2": "apple2",
    "spdisplays_mtlgpufamilyapple3": "apple3",
    "spdisplays_mtlgpufamilyapple4": "apple4",
    "spdisplays_mtlgpufamilyapple5": "apple5",
    "spdisplays_mtlgpufamilyapple6": "apple6",
    "spdisplays_mtlgpufamilyapple7": "apple7",
    "spdisplays_metalfeaturesetfamily11": "family1_v1",
    "spdisplays_metalfeaturesetfamily12": "family1_v2",
    "spdisplays_metalfeaturesetfamily13": "family1_v3",
    "spdisplays_metalfeaturesetfamily14": "family1_v4",
    "spdisplays_metalfeaturesetfamily21": "family2_v1"
  };
  return families[id] || "";
}
function graphics(callback) {
  function parseLinesDarwin(graphicsArr) {
    const res = {
      controllers: [],
      displays: []
    };
    try {
      graphicsArr.forEach(function(item) {
        const bus = (item.sppci_bus || "").indexOf("builtin") > -1 ? "Built-In" : (item.sppci_bus || "").indexOf("pcie") > -1 ? "PCIe" : "";
        const vram = (parseInt(item.spdisplays_vram || "", 10) || 0) * ((item.spdisplays_vram || "").indexOf("GB") > -1 ? 1024 : 1);
        const vramDyn = (parseInt(item.spdisplays_vram_shared || "", 10) || 0) * ((item.spdisplays_vram_shared || "").indexOf("GB") > -1 ? 1024 : 1);
        let metalVersion = getMetalVersion(item.spdisplays_metal || item.spdisplays_metalfamily || "");
        res.controllers.push({
          vendor: getVendorFromModel(item.spdisplays_vendor || "") || item.spdisplays_vendor || "",
          model: item.sppci_model || "",
          bus,
          vramDynamic: bus === "Built-In",
          vram: vram || vramDyn || null,
          deviceId: item["spdisplays_device-id"] || "",
          vendorId: item["spdisplays_vendor-id"] || vendorToId((item["spdisplays_vendor"] || "") + (item.sppci_model || "")),
          external: item.sppci_device_type === "spdisplays_egpu",
          cores: item["sppci_cores"] || null,
          metalVersion
        });
        if (item.spdisplays_ndrvs && item.spdisplays_ndrvs.length) {
          item.spdisplays_ndrvs.forEach(function(displayItem) {
            const connectionType = displayItem["spdisplays_connection_type"] || "";
            const currentResolutionParts = (displayItem["_spdisplays_resolution"] || "").split("@");
            const currentResolution = currentResolutionParts[0].split("x");
            const pixelParts = (displayItem["_spdisplays_pixels"] || "").split("x");
            const pixelDepthString = displayItem["spdisplays_depth"] || "";
            const serial = displayItem["_spdisplays_display-serial-number"] || displayItem["_spdisplays_display-serial-number2"] || null;
            res.displays.push({
              vendor: getVendorFromId(displayItem["_spdisplays_display-vendor-id"] || "") || getVendorFromModel(displayItem["_name"] || ""),
              vendorId: displayItem["_spdisplays_display-vendor-id"] || "",
              model: displayItem["_name"] || "",
              productionYear: displayItem["_spdisplays_display-year"] || null,
              serial: serial !== "0" ? serial : null,
              displayId: displayItem["_spdisplays_displayID"] || null,
              main: displayItem["spdisplays_main"] ? displayItem["spdisplays_main"] === "spdisplays_yes" : false,
              builtin: (displayItem["spdisplays_display_type"] || "").indexOf("built-in") > -1,
              connection: connectionType.indexOf("_internal") > -1 ? "Internal" : connectionType.indexOf("_displayport") > -1 ? "Display Port" : connectionType.indexOf("_hdmi") > -1 ? "HDMI" : null,
              sizeX: null,
              sizeY: null,
              pixelDepth: pixelDepthString === "CGSThirtyBitColor" ? 30 : pixelDepthString === "CGSThirtytwoBitColor" ? 32 : pixelDepthString === "CGSTwentyfourBitColor" ? 24 : null,
              resolutionX: pixelParts.length > 1 ? parseInt(pixelParts[0], 10) : null,
              resolutionY: pixelParts.length > 1 ? parseInt(pixelParts[1], 10) : null,
              currentResX: currentResolution.length > 1 ? parseInt(currentResolution[0], 10) : null,
              currentResY: currentResolution.length > 1 ? parseInt(currentResolution[1], 10) : null,
              positionX: 0,
              positionY: 0,
              currentRefreshRate: currentResolutionParts.length > 1 ? parseInt(currentResolutionParts[1], 10) : null
            });
          });
        }
      });
      return res;
    } catch (e) {
      return res;
    }
  }
  function parseLinesLinuxControllers(lines) {
    let controllers = [];
    let currentController = {
      vendor: "",
      subVendor: "",
      model: "",
      bus: "",
      busAddress: "",
      vram: null,
      vramDynamic: false,
      pciID: ""
    };
    let isGraphicsController = false;
    let pciIDs = [];
    try {
      pciIDs = execSync$6('export LC_ALL=C; dmidecode -t 9 2>/dev/null; unset LC_ALL | grep "Bus Address: "', util$c.execOptsLinux).toString().split("\n");
      for (let i2 = 0; i2 < pciIDs.length; i2++) {
        pciIDs[i2] = pciIDs[i2].replace("Bus Address:", "").replace("0000:", "").trim();
      }
      pciIDs = pciIDs.filter(function(el) {
        return el != null && el;
      });
    } catch (e) {
      util$c.noop();
    }
    let i = 1;
    lines.forEach((line) => {
      let subsystem = "";
      if (i < lines.length && lines[i]) {
        subsystem = lines[i];
        if (subsystem.indexOf(":") > 0) {
          subsystem = subsystem.split(":")[1];
        }
      }
      if ("" !== line.trim()) {
        if (" " !== line[0] && "	" !== line[0]) {
          let isExternal = pciIDs.indexOf(line.split(" ")[0]) >= 0;
          let vgapos = line.toLowerCase().indexOf(" vga ");
          let _3dcontrollerpos = line.toLowerCase().indexOf("3d controller");
          if (vgapos !== -1 || _3dcontrollerpos !== -1) {
            if (_3dcontrollerpos !== -1 && vgapos === -1) {
              vgapos = _3dcontrollerpos;
            }
            if (currentController.vendor || currentController.model || currentController.bus || currentController.vram !== null || currentController.vramDynamic) {
              controllers.push(currentController);
              currentController = {
                vendor: "",
                model: "",
                bus: "",
                busAddress: "",
                vram: null,
                vramDynamic: false
              };
            }
            const pciIDCandidate = line.split(" ")[0];
            if (/[\da-fA-F]{2}:[\da-fA-F]{2}\.[\da-fA-F]/.test(pciIDCandidate)) {
              currentController.busAddress = pciIDCandidate;
            }
            isGraphicsController = true;
            let endpos = line.search(/\[[0-9a-f]{4}:[0-9a-f]{4}]|$/);
            let parts = line.substr(vgapos, endpos - vgapos).split(":");
            currentController.busAddress = line.substr(0, vgapos).trim();
            if (parts.length > 1) {
              parts[1] = parts[1].trim();
              if (parts[1].toLowerCase().indexOf("corporation") >= 0) {
                currentController.vendor = parts[1].substr(0, parts[1].toLowerCase().indexOf("corporation") + 11).trim();
                currentController.model = parts[1].substr(parts[1].toLowerCase().indexOf("corporation") + 11, 200).split("(")[0].trim();
                currentController.bus = pciIDs.length > 0 && isExternal ? "PCIe" : "Onboard";
                currentController.vram = null;
                currentController.vramDynamic = false;
              } else if (parts[1].toLowerCase().indexOf(" inc.") >= 0) {
                if ((parts[1].match(/]/g) || []).length > 1) {
                  currentController.vendor = parts[1].substr(0, parts[1].toLowerCase().indexOf("]") + 1).trim();
                  currentController.model = parts[1].substr(parts[1].toLowerCase().indexOf("]") + 1, 200).trim().split("(")[0].trim();
                } else {
                  currentController.vendor = parts[1].substr(0, parts[1].toLowerCase().indexOf(" inc.") + 5).trim();
                  currentController.model = parts[1].substr(parts[1].toLowerCase().indexOf(" inc.") + 5, 200).trim().split("(")[0].trim();
                }
                currentController.bus = pciIDs.length > 0 && isExternal ? "PCIe" : "Onboard";
                currentController.vram = null;
                currentController.vramDynamic = false;
              } else if (parts[1].toLowerCase().indexOf(" ltd.") >= 0) {
                if ((parts[1].match(/]/g) || []).length > 1) {
                  currentController.vendor = parts[1].substr(0, parts[1].toLowerCase().indexOf("]") + 1).trim();
                  currentController.model = parts[1].substr(parts[1].toLowerCase().indexOf("]") + 1, 200).trim().split("(")[0].trim();
                } else {
                  currentController.vendor = parts[1].substr(0, parts[1].toLowerCase().indexOf(" ltd.") + 5).trim();
                  currentController.model = parts[1].substr(parts[1].toLowerCase().indexOf(" ltd.") + 5, 200).trim().split("(")[0].trim();
                }
              }
              if (currentController.model && subsystem.indexOf(currentController.model) !== -1) {
                const subVendor = subsystem.split(currentController.model)[0].trim();
                if (subVendor) {
                  currentController.subVendor = subVendor;
                }
              }
            }
          } else {
            isGraphicsController = false;
          }
        }
        if (isGraphicsController) {
          let parts = line.split(":");
          if (parts.length > 1 && parts[0].replace(/ +/g, "").toLowerCase().indexOf("devicename") !== -1 && parts[1].toLowerCase().indexOf("onboard") !== -1) {
            currentController.bus = "Onboard";
          }
          if (parts.length > 1 && parts[0].replace(/ +/g, "").toLowerCase().indexOf("region") !== -1 && parts[1].toLowerCase().indexOf("memory") !== -1) {
            let memparts = parts[1].split("=");
            if (memparts.length > 1) {
              currentController.vram = parseInt(memparts[1]);
            }
          }
        }
      }
      i++;
    });
    if (currentController.vendor || currentController.model || currentController.bus || currentController.busAddress || currentController.vram !== null || currentController.vramDynamic) {
      controllers.push(currentController);
    }
    return controllers;
  }
  function parseLinesLinuxClinfo(controllers, lines) {
    const fieldPattern = /\[([^\]]+)\]\s+(\w+)\s+(.*)/;
    const devices = lines.reduce((devices2, line) => {
      const field = fieldPattern.exec(line.trim());
      if (field) {
        if (!devices2[field[1]]) {
          devices2[field[1]] = {};
        }
        devices2[field[1]][field[2]] = field[3];
      }
      return devices2;
    }, {});
    for (let deviceId in devices) {
      const device = devices[deviceId];
      if (device["CL_DEVICE_TYPE"] === "CL_DEVICE_TYPE_GPU") {
        let busAddress;
        if (device["CL_DEVICE_TOPOLOGY_AMD"]) {
          const bdf = device["CL_DEVICE_TOPOLOGY_AMD"].match(/[a-zA-Z0-9]+:\d+\.\d+/);
          if (bdf) {
            busAddress = bdf[0];
          }
        } else if (device["CL_DEVICE_PCI_BUS_ID_NV"] && device["CL_DEVICE_PCI_SLOT_ID_NV"]) {
          const bus = parseInt(device["CL_DEVICE_PCI_BUS_ID_NV"]);
          const slot = parseInt(device["CL_DEVICE_PCI_SLOT_ID_NV"]);
          if (!isNaN(bus) && !isNaN(slot)) {
            const b = bus & 255;
            const d = slot >> 3 & 255;
            const f = slot & 7;
            busAddress = `${b.toString().padStart(2, "0")}:${d.toString().padStart(2, "0")}.${f}`;
          }
        }
        if (busAddress) {
          let controller = controllers.find((controller2) => controller2.busAddress === busAddress);
          if (!controller) {
            controller = {
              vendor: "",
              model: "",
              bus: "",
              busAddress,
              vram: null,
              vramDynamic: false
            };
            controllers.push(controller);
          }
          controller.vendor = device["CL_DEVICE_VENDOR"];
          if (device["CL_DEVICE_BOARD_NAME_AMD"]) {
            controller.model = device["CL_DEVICE_BOARD_NAME_AMD"];
          } else {
            controller.model = device["CL_DEVICE_NAME"];
          }
          const memory2 = parseInt(device["CL_DEVICE_GLOBAL_MEM_SIZE"]);
          if (!isNaN(memory2)) {
            controller.vram = Math.round(memory2 / 1024 / 1024);
          }
        }
      }
    }
    return controllers;
  }
  function getNvidiaSmi() {
    if (_nvidiaSmiPath) {
      return _nvidiaSmiPath;
    }
    if (_windows$b) {
      try {
        const basePath = util$c.WINDIR + "\\System32\\DriverStore\\FileRepository";
        const candidateDirs = fs$4.readdirSync(basePath).filter((dir) => {
          return fs$4.readdirSync([basePath, dir].join("/")).includes("nvidia-smi.exe");
        });
        const targetDir = candidateDirs.reduce((prevDir, currentDir) => {
          const previousNvidiaSmi = fs$4.statSync([basePath, prevDir, "nvidia-smi.exe"].join("/"));
          const currentNvidiaSmi = fs$4.statSync([basePath, currentDir, "nvidia-smi.exe"].join("/"));
          return previousNvidiaSmi.ctimeMs > currentNvidiaSmi.ctimeMs ? prevDir : currentDir;
        });
        if (targetDir) {
          _nvidiaSmiPath = [basePath, targetDir, "nvidia-smi.exe"].join("/");
        }
      } catch (e) {
        util$c.noop();
      }
    } else if (_linux$a) {
      _nvidiaSmiPath = "nvidia-smi";
    }
    return _nvidiaSmiPath;
  }
  function nvidiaSmi(options) {
    const nvidiaSmiExe = getNvidiaSmi();
    options = options || util$c.execOptsWin;
    if (nvidiaSmiExe) {
      const nvidiaSmiOpts = "--query-gpu=driver_version,pci.sub_device_id,name,pci.bus_id,fan.speed,memory.total,memory.used,memory.free,utilization.gpu,utilization.memory,temperature.gpu,temperature.memory,power.draw,power.limit,clocks.gr,clocks.mem --format=csv,noheader,nounits";
      const cmd = nvidiaSmiExe + " " + nvidiaSmiOpts + (_linux$a ? "  2>/dev/null" : "");
      if (_linux$a) {
        options.stdio = ["pipe", "pipe", "ignore"];
      }
      try {
        const res = execSync$6(cmd, options).toString();
        return res;
      } catch (e) {
        util$c.noop();
      }
    }
    return "";
  }
  function nvidiaDevices() {
    function safeParseNumber(value) {
      if ([null, void 0].includes(value)) {
        return value;
      }
      return parseFloat(value);
    }
    const stdout = nvidiaSmi();
    if (!stdout) {
      return [];
    }
    const gpus = stdout.split("\n").filter(Boolean);
    let results = gpus.map((gpu) => {
      const splittedData = gpu.split(", ").map((value) => value.includes("N/A") ? void 0 : value);
      if (splittedData.length === 16) {
        return {
          driverVersion: splittedData[0],
          subDeviceId: splittedData[1],
          name: splittedData[2],
          pciBus: splittedData[3],
          fanSpeed: safeParseNumber(splittedData[4]),
          memoryTotal: safeParseNumber(splittedData[5]),
          memoryUsed: safeParseNumber(splittedData[6]),
          memoryFree: safeParseNumber(splittedData[7]),
          utilizationGpu: safeParseNumber(splittedData[8]),
          utilizationMemory: safeParseNumber(splittedData[9]),
          temperatureGpu: safeParseNumber(splittedData[10]),
          temperatureMemory: safeParseNumber(splittedData[11]),
          powerDraw: safeParseNumber(splittedData[12]),
          powerLimit: safeParseNumber(splittedData[13]),
          clockCore: safeParseNumber(splittedData[14]),
          clockMemory: safeParseNumber(splittedData[15])
        };
      } else {
        return {};
      }
    });
    results = results.filter((item) => {
      return "pciBus" in item;
    });
    return results;
  }
  function mergeControllerNvidia(controller, nvidia) {
    if (nvidia.driverVersion) {
      controller.driverVersion = nvidia.driverVersion;
    }
    if (nvidia.subDeviceId) {
      controller.subDeviceId = nvidia.subDeviceId;
    }
    if (nvidia.name) {
      controller.name = nvidia.name;
    }
    if (nvidia.pciBus) {
      controller.pciBus = nvidia.pciBus;
    }
    if (nvidia.fanSpeed) {
      controller.fanSpeed = nvidia.fanSpeed;
    }
    if (nvidia.memoryTotal) {
      controller.memoryTotal = nvidia.memoryTotal;
      controller.vram = nvidia.memoryTotal;
      controller.vramDynamic = false;
    }
    if (nvidia.memoryUsed) {
      controller.memoryUsed = nvidia.memoryUsed;
    }
    if (nvidia.memoryFree) {
      controller.memoryFree = nvidia.memoryFree;
    }
    if (nvidia.utilizationGpu) {
      controller.utilizationGpu = nvidia.utilizationGpu;
    }
    if (nvidia.utilizationMemory) {
      controller.utilizationMemory = nvidia.utilizationMemory;
    }
    if (nvidia.temperatureGpu) {
      controller.temperatureGpu = nvidia.temperatureGpu;
    }
    if (nvidia.temperatureMemory) {
      controller.temperatureMemory = nvidia.temperatureMemory;
    }
    if (nvidia.powerDraw) {
      controller.powerDraw = nvidia.powerDraw;
    }
    if (nvidia.powerLimit) {
      controller.powerLimit = nvidia.powerLimit;
    }
    if (nvidia.clockCore) {
      controller.clockCore = nvidia.clockCore;
    }
    if (nvidia.clockMemory) {
      controller.clockMemory = nvidia.clockMemory;
    }
    return controller;
  }
  function parseLinesLinuxEdid(edid) {
    let result2 = {
      vendor: "",
      model: "",
      deviceName: "",
      main: false,
      builtin: false,
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
    };
    let start = 108;
    if (edid.substr(start, 6) === "000000") {
      start += 36;
    }
    if (edid.substr(start, 6) === "000000") {
      start += 36;
    }
    if (edid.substr(start, 6) === "000000") {
      start += 36;
    }
    if (edid.substr(start, 6) === "000000") {
      start += 36;
    }
    result2.resolutionX = parseInt("0x0" + edid.substr(start + 8, 1) + edid.substr(start + 4, 2));
    result2.resolutionY = parseInt("0x0" + edid.substr(start + 14, 1) + edid.substr(start + 10, 2));
    result2.sizeX = parseInt("0x0" + edid.substr(start + 28, 1) + edid.substr(start + 24, 2));
    result2.sizeY = parseInt("0x0" + edid.substr(start + 29, 1) + edid.substr(start + 26, 2));
    start = edid.indexOf("000000fc00");
    if (start >= 0) {
      let model_raw = edid.substr(start + 10, 26);
      if (model_raw.indexOf("0a") !== -1) {
        model_raw = model_raw.substr(0, model_raw.indexOf("0a"));
      }
      try {
        if (model_raw.length > 2) {
          result2.model = model_raw.match(/.{1,2}/g).map(function(v) {
            return String.fromCharCode(parseInt(v, 16));
          }).join("");
        }
      } catch (e) {
        util$c.noop();
      }
    } else {
      result2.model = "";
    }
    return result2;
  }
  function parseLinesLinuxDisplays(lines, depth) {
    let displays = [];
    let currentDisplay = {
      vendor: "",
      model: "",
      deviceName: "",
      main: false,
      builtin: false,
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
    };
    let is_edid = false;
    let is_current = false;
    let edid_raw = "";
    let start = 0;
    for (let i = 1; i < lines.length; i++) {
      if ("" !== lines[i].trim()) {
        if (" " !== lines[i][0] && "	" !== lines[i][0] && lines[i].toLowerCase().indexOf(" connected ") !== -1) {
          if (currentDisplay.model || currentDisplay.main || currentDisplay.builtin || currentDisplay.connection || currentDisplay.sizeX !== null || currentDisplay.pixelDepth !== null || currentDisplay.resolutionX !== null) {
            displays.push(currentDisplay);
            currentDisplay = {
              vendor: "",
              model: "",
              main: false,
              builtin: false,
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
            };
          }
          let parts = lines[i].split(" ");
          currentDisplay.connection = parts[0];
          currentDisplay.main = lines[i].toLowerCase().indexOf(" primary ") >= 0;
          currentDisplay.builtin = parts[0].toLowerCase().indexOf("edp") >= 0;
        }
        if (is_edid) {
          if (lines[i].search(/\S|$/) > start) {
            edid_raw += lines[i].toLowerCase().trim();
          } else {
            let edid_decoded = parseLinesLinuxEdid(edid_raw);
            currentDisplay.vendor = edid_decoded.vendor;
            currentDisplay.model = edid_decoded.model;
            currentDisplay.resolutionX = edid_decoded.resolutionX;
            currentDisplay.resolutionY = edid_decoded.resolutionY;
            currentDisplay.sizeX = edid_decoded.sizeX;
            currentDisplay.sizeY = edid_decoded.sizeY;
            currentDisplay.pixelDepth = depth;
            is_edid = false;
          }
        }
        if (lines[i].toLowerCase().indexOf("edid:") >= 0) {
          is_edid = true;
          start = lines[i].search(/\S|$/);
        }
        if (lines[i].toLowerCase().indexOf("*current") >= 0) {
          const parts1 = lines[i].split("(");
          if (parts1 && parts1.length > 1 && parts1[0].indexOf("x") >= 0) {
            const resParts = parts1[0].trim().split("x");
            currentDisplay.currentResX = util$c.toInt(resParts[0]);
            currentDisplay.currentResY = util$c.toInt(resParts[1]);
          }
          is_current = true;
        }
        if (is_current && lines[i].toLowerCase().indexOf("clock") >= 0 && lines[i].toLowerCase().indexOf("hz") >= 0 && lines[i].toLowerCase().indexOf("v: height") >= 0) {
          const parts1 = lines[i].split("clock");
          if (parts1 && parts1.length > 1 && parts1[1].toLowerCase().indexOf("hz") >= 0) {
            currentDisplay.currentRefreshRate = util$c.toInt(parts1[1]);
          }
          is_current = false;
        }
      }
    }
    if (currentDisplay.model || currentDisplay.main || currentDisplay.builtin || currentDisplay.connection || currentDisplay.sizeX !== null || currentDisplay.pixelDepth !== null || currentDisplay.resolutionX !== null) {
      displays.push(currentDisplay);
    }
    return displays;
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        controllers: [],
        displays: []
      };
      if (_darwin$a) {
        let cmd = "system_profiler -xml -detailLevel full SPDisplaysDataType";
        exec$a(cmd, function(error, stdout) {
          if (!error) {
            try {
              const output = stdout.toString();
              result2 = parseLinesDarwin(util$c.plistParser(output)[0]._items);
            } catch (e) {
              util$c.noop();
            }
            try {
              stdout = execSync$6('defaults read /Library/Preferences/com.apple.windowserver.plist 2>/dev/null;defaults read /Library/Preferences/com.apple.windowserver.displays.plist 2>/dev/null; echo ""', { maxBuffer: 1024 * 2e4 });
              const output = (stdout || "").toString();
              const obj = util$c.plistReader(output);
              if (obj["DisplayAnyUserSets"] && obj["DisplayAnyUserSets"]["Configs"] && obj["DisplayAnyUserSets"]["Configs"][0] && obj["DisplayAnyUserSets"]["Configs"][0]["DisplayConfig"]) {
                const current = obj["DisplayAnyUserSets"]["Configs"][0]["DisplayConfig"];
                let i = 0;
                current.forEach((o) => {
                  if (o["CurrentInfo"] && o["CurrentInfo"]["OriginX"] !== void 0 && result2.displays && result2.displays[i]) {
                    result2.displays[i].positionX = o["CurrentInfo"]["OriginX"];
                  }
                  if (o["CurrentInfo"] && o["CurrentInfo"]["OriginY"] !== void 0 && result2.displays && result2.displays[i]) {
                    result2.displays[i].positionY = o["CurrentInfo"]["OriginY"];
                  }
                  i++;
                });
              }
              if (obj["DisplayAnyUserSets"] && obj["DisplayAnyUserSets"].length > 0 && obj["DisplayAnyUserSets"][0].length > 0 && obj["DisplayAnyUserSets"][0][0]["DisplayID"]) {
                const current = obj["DisplayAnyUserSets"][0];
                let i = 0;
                current.forEach((o) => {
                  if ("OriginX" in o && result2.displays && result2.displays[i]) {
                    result2.displays[i].positionX = o["OriginX"];
                  }
                  if ("OriginY" in o && result2.displays && result2.displays[i]) {
                    result2.displays[i].positionY = o["OriginY"];
                  }
                  if (o["Mode"] && o["Mode"]["BitsPerPixel"] !== void 0 && result2.displays && result2.displays[i]) {
                    result2.displays[i].pixelDepth = o["Mode"]["BitsPerPixel"];
                  }
                  i++;
                });
              }
            } catch (e) {
              util$c.noop();
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_linux$a) {
        if (util$c.isRaspberry()) {
          let cmd2 = `fbset -s 2> /dev/null | grep 'mode "' ; vcgencmd get_mem gpu 2> /dev/null; tvservice -s 2> /dev/null; tvservice -n 2> /dev/null;`;
          exec$a(cmd2, function(error, stdout) {
            let lines = stdout.toString().split("\n");
            if (lines.length > 3 && lines[0].indexOf('mode "') >= -1 && lines[2].indexOf("0x12000a") > -1) {
              const parts = lines[0].replace("mode", "").replace(/"/g, "").trim().split("x");
              if (parts.length === 2) {
                result2.displays.push({
                  vendor: "",
                  model: util$c.getValue(lines, "device_name", "="),
                  main: true,
                  builtin: false,
                  connection: "HDMI",
                  sizeX: null,
                  sizeY: null,
                  pixelDepth: null,
                  resolutionX: parseInt(parts[0], 10),
                  resolutionY: parseInt(parts[1], 10),
                  currentResX: null,
                  currentResY: null,
                  positionX: 0,
                  positionY: 0,
                  currentRefreshRate: null
                });
              }
            }
            if (lines.length >= 1 && stdout.toString().indexOf("gpu=") >= -1) {
              result2.controllers.push({
                vendor: "Broadcom",
                model: util$c.getRpiGpu(),
                bus: "",
                vram: util$c.getValue(lines, "gpu", "=").replace("M", ""),
                vramDynamic: true
              });
            }
          });
        }
        let cmd = "lspci -vvv  2>/dev/null";
        exec$a(cmd, function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            if (result2.controllers.length === 0) {
              result2.controllers = parseLinesLinuxControllers(lines);
              const nvidiaData = nvidiaDevices();
              result2.controllers = result2.controllers.map((controller) => {
                return mergeControllerNvidia(controller, nvidiaData.find((contr) => contr.pciBus.toLowerCase().endsWith(controller.busAddress.toLowerCase())) || {});
              });
            }
          }
          let cmd2 = "clinfo --raw";
          exec$a(cmd2, function(error2, stdout2) {
            if (!error2) {
              let lines = stdout2.toString().split("\n");
              result2.controllers = parseLinesLinuxClinfo(result2.controllers, lines);
            }
            let cmd3 = "xdpyinfo 2>/dev/null | grep 'depth of root window' | awk '{ print $5 }'";
            exec$a(cmd3, function(error3, stdout3) {
              let depth = 0;
              if (!error3) {
                let lines = stdout3.toString().split("\n");
                depth = parseInt(lines[0]) || 0;
              }
              let cmd4 = "xrandr --verbose 2>/dev/null";
              exec$a(cmd4, function(error4, stdout4) {
                if (!error4) {
                  let lines = stdout4.toString().split("\n");
                  result2.displays = parseLinesLinuxDisplays(lines, depth);
                }
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              });
            });
          });
        });
      }
      if (_freebsd$9 || _openbsd$9 || _netbsd$9) {
        if (callback) {
          callback(null);
        }
        resolve(null);
      }
      if (_sunos$9) {
        if (callback) {
          callback(null);
        }
        resolve(null);
      }
      if (_windows$b) {
        try {
          const workload = [];
          workload.push(util$c.powerShell("Get-CimInstance win32_VideoController | fl *"));
          workload.push(util$c.powerShell('gp "HKLM:\\SYSTEM\\ControlSet001\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\*" -ErrorAction SilentlyContinue | where MatchingDeviceId $null -NE | select MatchingDeviceId,HardwareInformation.qwMemorySize | fl'));
          workload.push(util$c.powerShell("Get-CimInstance win32_desktopmonitor | fl *"));
          workload.push(util$c.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorBasicDisplayParams | fl"));
          workload.push(util$c.powerShell("Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Screen]::AllScreens"));
          workload.push(util$c.powerShell("Get-CimInstance -Namespace root\\wmi -ClassName WmiMonitorConnectionParams | fl"));
          workload.push(util$c.powerShell('gwmi WmiMonitorID -Namespace root\\wmi | ForEach-Object {(($_.ManufacturerName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.ProductCodeID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.UserFriendlyName -notmatch 0 | foreach {[char]$_}) -join "") + "|" + (($_.SerialNumberID -notmatch 0 | foreach {[char]$_}) -join "") + "|" + $_.InstanceName}'));
          const nvidiaData = nvidiaDevices();
          Promise.all(
            workload
          ).then((data) => {
            let csections = data[0].replace(/\r/g, "").split(/\n\s*\n/);
            let vsections = data[1].replace(/\r/g, "").split(/\n\s*\n/);
            result2.controllers = parseLinesWindowsControllers(csections, vsections);
            result2.controllers = result2.controllers.map((controller) => {
              if (controller.vendor.toLowerCase() === "nvidia") {
                return mergeControllerNvidia(controller, nvidiaData.find((device) => {
                  let windowsSubDeviceId = (controller.subDeviceId || "").toLowerCase();
                  const nvidiaSubDeviceIdParts = device.subDeviceId.split("x");
                  let nvidiaSubDeviceId = nvidiaSubDeviceIdParts.length > 1 ? nvidiaSubDeviceIdParts[1].toLowerCase() : nvidiaSubDeviceIdParts[0].toLowerCase();
                  const lengthDifference = Math.abs(windowsSubDeviceId.length - nvidiaSubDeviceId.length);
                  if (windowsSubDeviceId.length > nvidiaSubDeviceId.length) {
                    for (let i = 0; i < lengthDifference; i++) {
                      nvidiaSubDeviceId = "0" + nvidiaSubDeviceId;
                    }
                  } else if (windowsSubDeviceId.length < nvidiaSubDeviceId.length) {
                    for (let i = 0; i < lengthDifference; i++) {
                      windowsSubDeviceId = "0" + windowsSubDeviceId;
                    }
                  }
                  return windowsSubDeviceId === nvidiaSubDeviceId;
                }) || {});
              } else {
                return controller;
              }
            });
            let dsections = data[2].replace(/\r/g, "").split(/\n\s*\n/);
            if (dsections[0].trim() === "") {
              dsections.shift();
            }
            if (dsections.length && dsections[dsections.length - 1].trim() === "") {
              dsections.pop();
            }
            let msections = data[3].replace(/\r/g, "").split("Active ");
            msections.shift();
            let ssections = data[4].replace(/\r/g, "").split("BitsPerPixel ");
            ssections.shift();
            let tsections = data[5].replace(/\r/g, "").split(/\n\s*\n/);
            tsections.shift();
            const res = data[6].replace(/\r/g, "").split(/\n/);
            let isections = [];
            res.forEach((element) => {
              const parts = element.split("|");
              if (parts.length === 5) {
                isections.push({
                  vendor: parts[0],
                  code: parts[1],
                  model: parts[2],
                  serial: parts[3],
                  instanceId: parts[4]
                });
              }
            });
            result2.displays = parseLinesWindowsDisplaysPowershell(ssections, msections, dsections, tsections, isections);
            if (result2.displays.length === 1) {
              if (_resolutionX) {
                result2.displays[0].resolutionX = _resolutionX;
                if (!result2.displays[0].currentResX) {
                  result2.displays[0].currentResX = _resolutionX;
                }
              }
              if (_resolutionY) {
                result2.displays[0].resolutionY = _resolutionY;
                if (result2.displays[0].currentResY === 0) {
                  result2.displays[0].currentResY = _resolutionY;
                }
              }
              if (_pixelDepth) {
                result2.displays[0].pixelDepth = _pixelDepth;
              }
            }
            result2.displays = result2.displays.map((element) => {
              if (_refreshRate && !element.currentRefreshRate) {
                element.currentRefreshRate = _refreshRate;
              }
              return element;
            });
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }).catch(() => {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
  function parseLinesWindowsControllers(sections, vections) {
    const memorySizes = {};
    for (const i in vections) {
      if ({}.hasOwnProperty.call(vections, i)) {
        if (vections[i].trim() !== "") {
          const lines = vections[i].trim().split("\n");
          const matchingDeviceId = util$c.getValue(lines, "MatchingDeviceId").match(/PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i);
          if (matchingDeviceId) {
            const quadWordmemorySize = parseInt(util$c.getValue(lines, "HardwareInformation.qwMemorySize"));
            if (!isNaN(quadWordmemorySize)) {
              let deviceId = matchingDeviceId[1].toUpperCase() + "&" + matchingDeviceId[2].toUpperCase();
              if (matchingDeviceId[3]) {
                deviceId += "&" + matchingDeviceId[3].toUpperCase();
              }
              if (matchingDeviceId[4]) {
                deviceId += "&" + matchingDeviceId[4].toUpperCase();
              }
              memorySizes[deviceId] = quadWordmemorySize;
            }
          }
        }
      }
    }
    let controllers = [];
    for (let i in sections) {
      if ({}.hasOwnProperty.call(sections, i)) {
        if (sections[i].trim() !== "") {
          let lines = sections[i].trim().split("\n");
          let pnpDeviceId = util$c.getValue(lines, "PNPDeviceID", ":").match(/PCI\\(VEN_[0-9A-F]{4})&(DEV_[0-9A-F]{4})(?:&(SUBSYS_[0-9A-F]{8}))?(?:&(REV_[0-9A-F]{2}))?/i);
          let subDeviceId = null;
          let memorySize = null;
          if (pnpDeviceId) {
            subDeviceId = pnpDeviceId[3] || "";
            if (subDeviceId) {
              subDeviceId = subDeviceId.split("_")[1];
            }
            if (memorySize == null && pnpDeviceId[3] && pnpDeviceId[4]) {
              const deviceId = pnpDeviceId[1].toUpperCase() + "&" + pnpDeviceId[2].toUpperCase() + "&" + pnpDeviceId[3].toUpperCase() + "&" + pnpDeviceId[4].toUpperCase();
              if ({}.hasOwnProperty.call(memorySizes, deviceId)) {
                memorySize = memorySizes[deviceId];
              }
            }
            if (memorySize == null && pnpDeviceId[3]) {
              const deviceId = pnpDeviceId[1].toUpperCase() + "&" + pnpDeviceId[2].toUpperCase() + "&" + pnpDeviceId[3].toUpperCase();
              if ({}.hasOwnProperty.call(memorySizes, deviceId)) {
                memorySize = memorySizes[deviceId];
              }
            }
            if (memorySize == null && pnpDeviceId[4]) {
              const deviceId = pnpDeviceId[1].toUpperCase() + "&" + pnpDeviceId[2].toUpperCase() + "&" + pnpDeviceId[4].toUpperCase();
              if ({}.hasOwnProperty.call(memorySizes, deviceId)) {
                memorySize = memorySizes[deviceId];
              }
            }
            if (memorySize == null) {
              const deviceId = pnpDeviceId[1].toUpperCase() + "&" + pnpDeviceId[2].toUpperCase();
              if ({}.hasOwnProperty.call(memorySizes, deviceId)) {
                memorySize = memorySizes[deviceId];
              }
            }
          }
          controllers.push({
            vendor: util$c.getValue(lines, "AdapterCompatibility", ":"),
            model: util$c.getValue(lines, "name", ":"),
            bus: util$c.getValue(lines, "PNPDeviceID", ":").startsWith("PCI") ? "PCI" : "",
            vram: (memorySize == null ? util$c.toInt(util$c.getValue(lines, "AdapterRAM", ":")) : memorySize) / 1024 / 1024,
            vramDynamic: util$c.getValue(lines, "VideoMemoryType", ":") === "2",
            subDeviceId
          });
          _resolutionX = util$c.toInt(util$c.getValue(lines, "CurrentHorizontalResolution", ":")) || _resolutionX;
          _resolutionY = util$c.toInt(util$c.getValue(lines, "CurrentVerticalResolution", ":")) || _resolutionY;
          _refreshRate = util$c.toInt(util$c.getValue(lines, "CurrentRefreshRate", ":")) || _refreshRate;
          _pixelDepth = util$c.toInt(util$c.getValue(lines, "CurrentBitsPerPixel", ":")) || _pixelDepth;
        }
      }
    }
    return controllers;
  }
  function parseLinesWindowsDisplaysPowershell(ssections, msections, dsections, tsections, isections) {
    let displays = [];
    let vendor = "";
    let model = "";
    let deviceID = "";
    let resolutionX = 0;
    let resolutionY = 0;
    if (dsections && dsections.length) {
      let linesDisplay = dsections[0].split("\n");
      vendor = util$c.getValue(linesDisplay, "MonitorManufacturer", ":");
      model = util$c.getValue(linesDisplay, "Name", ":");
      deviceID = util$c.getValue(linesDisplay, "PNPDeviceID", ":").replace(/&amp;/g, "&").toLowerCase();
      resolutionX = util$c.toInt(util$c.getValue(linesDisplay, "ScreenWidth", ":"));
      resolutionY = util$c.toInt(util$c.getValue(linesDisplay, "ScreenHeight", ":"));
    }
    for (let i = 0; i < ssections.length; i++) {
      if (ssections[i].trim() !== "") {
        ssections[i] = "BitsPerPixel " + ssections[i];
        msections[i] = "Active " + msections[i];
        if (tsections.length === 0 || tsections[i] === void 0) {
          tsections[i] = "Unknown";
        }
        let linesScreen = ssections[i].split("\n");
        let linesMonitor = msections[i].split("\n");
        let linesConnection = tsections[i].split("\n");
        const bitsPerPixel = util$c.getValue(linesScreen, "BitsPerPixel");
        const bounds = util$c.getValue(linesScreen, "Bounds").replace("{", "").replace("}", "").replace(/=/g, ":").split(",");
        const primary = util$c.getValue(linesScreen, "Primary");
        const sizeX = util$c.getValue(linesMonitor, "MaxHorizontalImageSize");
        const sizeY = util$c.getValue(linesMonitor, "MaxVerticalImageSize");
        const instanceName = util$c.getValue(linesMonitor, "InstanceName").toLowerCase();
        const videoOutputTechnology = util$c.getValue(linesConnection, "VideoOutputTechnology");
        const deviceName = util$c.getValue(linesScreen, "DeviceName");
        let displayVendor = "";
        let displayModel = "";
        isections.forEach((element) => {
          if (element.instanceId.toLowerCase().startsWith(instanceName) && vendor.startsWith("(") && model.startsWith("PnP")) {
            displayVendor = element.vendor;
            displayModel = element.model;
          }
        });
        displays.push({
          vendor: instanceName.startsWith(deviceID) && displayVendor === "" ? vendor : displayVendor,
          model: instanceName.startsWith(deviceID) && displayModel === "" ? model : displayModel,
          deviceName,
          main: primary.toLowerCase() === "true",
          builtin: videoOutputTechnology === "2147483648",
          connection: videoOutputTechnology && videoTypes[videoOutputTechnology] ? videoTypes[videoOutputTechnology] : "",
          resolutionX: util$c.toInt(util$c.getValue(bounds, "Width", ":")),
          resolutionY: util$c.toInt(util$c.getValue(bounds, "Height", ":")),
          sizeX: sizeX ? parseInt(sizeX, 10) : null,
          sizeY: sizeY ? parseInt(sizeY, 10) : null,
          pixelDepth: bitsPerPixel,
          currentResX: util$c.toInt(util$c.getValue(bounds, "Width", ":")),
          currentResY: util$c.toInt(util$c.getValue(bounds, "Height", ":")),
          positionX: util$c.toInt(util$c.getValue(bounds, "X", ":")),
          positionY: util$c.toInt(util$c.getValue(bounds, "Y", ":"))
        });
      }
    }
    if (ssections.length === 0) {
      displays.push({
        vendor,
        model,
        main: true,
        sizeX: null,
        sizeY: null,
        resolutionX,
        resolutionY,
        pixelDepth: null,
        currentResX: resolutionX,
        currentResY: resolutionY,
        positionX: 0,
        positionY: 0
      });
    }
    return displays;
  }
}
graphics$1.graphics = graphics;
var filesystem = {};
const util$b = util$j;
const fs$3 = require$$1$2;
const exec$9 = require$$1$1.exec;
const execSync$5 = require$$1$1.execSync;
const execPromiseSave = util$b.promisifySave(require$$1$1.exec);
let _platform$a = process.platform;
const _linux$9 = _platform$a === "linux" || _platform$a === "android";
const _darwin$9 = _platform$a === "darwin";
const _windows$a = _platform$a === "win32";
const _freebsd$8 = _platform$a === "freebsd";
const _openbsd$8 = _platform$a === "openbsd";
const _netbsd$8 = _platform$a === "netbsd";
const _sunos$8 = _platform$a === "sunos";
let _fs_speed = {};
let _disk_io = {};
function fsSize(drive2, callback) {
  if (util$b.isFunction(drive2)) {
    callback = drive2;
    drive2 = "";
  }
  let macOsDisks = [];
  let osMounts = [];
  function getmacOsFsType(fs2) {
    if (!fs2.startsWith("/")) {
      return "NFS";
    }
    const parts = fs2.split("/");
    const fsShort = parts[parts.length - 1];
    const macOsDisksSingle = macOsDisks.filter((item) => item.indexOf(fsShort) >= 0);
    if (macOsDisksSingle.length === 1 && macOsDisksSingle[0].indexOf("APFS") >= 0) {
      return "APFS";
    }
    return "HFS";
  }
  function isLinuxTmpFs(fs2) {
    const linuxTmpFileSystems = ["rootfs", "unionfs", "squashfs", "cramfs", "initrd", "initramfs", "devtmpfs", "tmpfs", "udev", "devfs", "specfs", "type", "appimaged"];
    let result2 = false;
    linuxTmpFileSystems.forEach((linuxFs) => {
      if (fs2.toLowerCase().indexOf(linuxFs) >= 0) {
        result2 = true;
      }
    });
    return result2;
  }
  function filterLines(stdout) {
    let lines = stdout.toString().split("\n");
    lines.shift();
    if (stdout.toString().toLowerCase().indexOf("filesystem")) {
      let removeLines = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] && lines[i].toLowerCase().startsWith("filesystem")) {
          removeLines = i;
        }
      }
      for (let i = 0; i < removeLines; i++) {
        lines.shift();
      }
    }
    return lines;
  }
  function parseDf(lines) {
    let data = [];
    lines.forEach(function(line) {
      if (line !== "") {
        line = line.replace(/ +/g, " ").split(" ");
        if (line && (line[0].startsWith("/") || line[6] && line[6] === "/" || line[0].indexOf("/") > 0 || line[0].indexOf(":") === 1 || !_darwin$9 && !isLinuxTmpFs(line[1]))) {
          const fs2 = line[0];
          const fsType = _linux$9 || _freebsd$8 || _openbsd$8 || _netbsd$8 ? line[1] : getmacOsFsType(line[0]);
          const size = parseInt(_linux$9 || _freebsd$8 || _openbsd$8 || _netbsd$8 ? line[2] : line[1]) * 1024;
          const used = parseInt(_linux$9 || _freebsd$8 || _openbsd$8 || _netbsd$8 ? line[3] : line[2]) * 1024;
          const available = parseInt(_linux$9 || _freebsd$8 || _openbsd$8 || _netbsd$8 ? line[4] : line[3]) * 1024;
          const use = parseFloat((100 * (used / (used + available))).toFixed(2));
          let rw = osMounts && Object.keys(osMounts).length > 0 ? osMounts[fs2] || false : null;
          line.splice(0, _linux$9 || _freebsd$8 || _openbsd$8 || _netbsd$8 ? 6 : 5);
          const mount = line.join(" ");
          if (!data.find((el) => el.fs === fs2 && el.type === fsType)) {
            data.push({
              fs: fs2,
              type: fsType,
              size,
              used,
              available,
              use,
              mount,
              rw
            });
          }
        }
      }
    });
    return data;
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      let data = [];
      if (_linux$9 || _freebsd$8 || _openbsd$8 || _netbsd$8 || _darwin$9) {
        let cmd = "";
        macOsDisks = [];
        osMounts = {};
        if (_darwin$9) {
          cmd = "df -kP";
          try {
            macOsDisks = execSync$5("diskutil list").toString().split("\n").filter((line) => {
              return !line.startsWith("/") && line.indexOf(":") > 0;
            });
            execSync$5("mount").toString().split("\n").filter((line) => {
              return line.startsWith("/");
            }).forEach((line) => {
              osMounts[line.split(" ")[0]] = line.toLowerCase().indexOf("read-only") === -1;
            });
          } catch (e) {
            util$b.noop();
          }
        }
        if (_linux$9) {
          try {
            cmd = "export LC_ALL=C; df -lkPTx squashfs; unset LC_ALL";
            execSync$5("cat /proc/mounts 2>/dev/null", util$b.execOptsLinux).toString().split("\n").filter((line) => {
              return line.startsWith("/");
            }).forEach((line) => {
              osMounts[line.split(" ")[0]] = osMounts[line.split(" ")[0]] || false;
              if (line.toLowerCase().indexOf("/snap/") === -1) {
                osMounts[line.split(" ")[0]] = line.toLowerCase().indexOf("rw,") >= 0 || line.toLowerCase().indexOf(" rw ") >= 0;
              }
            });
          } catch (e) {
            util$b.noop();
          }
        }
        if (_freebsd$8 || _openbsd$8 || _netbsd$8) {
          try {
            cmd = "df -lkPT";
            execSync$5("mount").toString().split("\n").forEach((line) => {
              osMounts[line.split(" ")[0]] = line.toLowerCase().indexOf("read-only") === -1;
            });
          } catch (e) {
            util$b.noop();
          }
        }
        exec$9(cmd, { maxBuffer: 1024 * 1024 }, function(error, stdout) {
          let lines = filterLines(stdout);
          data = parseDf(lines);
          if (drive2) {
            data = data.filter((item) => {
              return item.fs.toLowerCase().indexOf(drive2.toLowerCase()) >= 0 || item.mount.toLowerCase().indexOf(drive2.toLowerCase()) >= 0;
            });
          }
          if ((!error || data.length) && stdout.toString().trim() !== "") {
            if (callback) {
              callback(data);
            }
            resolve(data);
          } else {
            exec$9("df -kPT", { maxBuffer: 1024 * 1024 }, function(error2, stdout2) {
              if (!error2) {
                let lines2 = filterLines(stdout2);
                data = parseDf(lines2);
              }
              if (callback) {
                callback(data);
              }
              resolve(data);
            });
          }
        });
      }
      if (_sunos$8) {
        if (callback) {
          callback(data);
        }
        resolve(data);
      }
      if (_windows$a) {
        try {
          const cmd = `Get-WmiObject Win32_logicaldisk | select Access,Caption,FileSystem,FreeSpace,Size ${drive2 ? "| where -property Caption -eq " + drive2 : ""} | fl`;
          util$b.powerShell(cmd).then((stdout, error) => {
            if (!error) {
              let devices = stdout.toString().split(/\n\s*\n/);
              devices.forEach(function(device) {
                let lines = device.split("\r\n");
                const size = util$b.toInt(util$b.getValue(lines, "size", ":"));
                const free = util$b.toInt(util$b.getValue(lines, "freespace", ":"));
                const caption = util$b.getValue(lines, "caption", ":");
                const rwValue = util$b.getValue(lines, "access", ":");
                const rw = rwValue ? util$b.toInt(rwValue) !== 1 : null;
                if (size) {
                  data.push({
                    fs: caption,
                    type: util$b.getValue(lines, "filesystem", ":"),
                    size,
                    used: size - free,
                    available: free,
                    use: parseFloat((100 * (size - free) / size).toFixed(2)),
                    mount: caption,
                    rw
                  });
                }
              });
            }
            if (callback) {
              callback(data);
            }
            resolve(data);
          });
        } catch (e) {
          if (callback) {
            callback(data);
          }
          resolve(data);
        }
      }
    });
  });
}
filesystem.fsSize = fsSize;
function fsOpenFiles(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      const result2 = {
        max: null,
        allocated: null,
        available: null
      };
      if (_freebsd$8 || _openbsd$8 || _netbsd$8 || _darwin$9) {
        let cmd = "sysctl -i kern.maxfiles kern.num_files kern.open_files";
        exec$9(cmd, { maxBuffer: 1024 * 1024 }, function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            result2.max = parseInt(util$b.getValue(lines, "kern.maxfiles", ":"), 10);
            result2.allocated = parseInt(util$b.getValue(lines, "kern.num_files", ":"), 10) || parseInt(util$b.getValue(lines, "kern.open_files", ":"), 10);
            result2.available = result2.max - result2.allocated;
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_linux$9) {
        fs$3.readFile("/proc/sys/fs/file-nr", function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            if (lines[0]) {
              const parts = lines[0].replace(/\s+/g, " ").split(" ");
              if (parts.length === 3) {
                result2.allocated = parseInt(parts[0], 10);
                result2.available = parseInt(parts[1], 10);
                result2.max = parseInt(parts[2], 10);
                if (!result2.available) {
                  result2.available = result2.max - result2.allocated;
                }
              }
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          } else {
            fs$3.readFile("/proc/sys/fs/file-max", function(error2, stdout2) {
              if (!error2) {
                let lines = stdout2.toString().split("\n");
                if (lines[0]) {
                  result2.max = parseInt(lines[0], 10);
                }
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          }
        });
      }
      if (_sunos$8) {
        if (callback) {
          callback(null);
        }
        resolve(null);
      }
      if (_windows$a) {
        if (callback) {
          callback(null);
        }
        resolve(null);
      }
    });
  });
}
filesystem.fsOpenFiles = fsOpenFiles;
function parseBytes(s) {
  return parseInt(s.substr(s.indexOf(" (") + 2, s.indexOf(" Bytes)") - 10));
}
function parseDevices(lines) {
  let devices = [];
  let i = 0;
  lines.forEach((line) => {
    if (line.length > 0) {
      if (line[0] === "*") {
        i++;
      } else {
        let parts = line.split(":");
        if (parts.length > 1) {
          if (!devices[i]) {
            devices[i] = {
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
              removable: false,
              protocol: "",
              group: "",
              device: ""
            };
          }
          parts[0] = parts[0].trim().toUpperCase().replace(/ +/g, "");
          parts[1] = parts[1].trim();
          if ("DEVICEIDENTIFIER" === parts[0]) {
            devices[i].identifier = parts[1];
          }
          if ("DEVICENODE" === parts[0]) {
            devices[i].name = parts[1];
          }
          if ("VOLUMENAME" === parts[0]) {
            if (parts[1].indexOf("Not applicable") === -1) {
              devices[i].label = parts[1];
            }
          }
          if ("PROTOCOL" === parts[0]) {
            devices[i].protocol = parts[1];
          }
          if ("DISKSIZE" === parts[0]) {
            devices[i].size = parseBytes(parts[1]);
          }
          if ("FILESYSTEMPERSONALITY" === parts[0]) {
            devices[i].fsType = parts[1];
          }
          if ("MOUNTPOINT" === parts[0]) {
            devices[i].mount = parts[1];
          }
          if ("VOLUMEUUID" === parts[0]) {
            devices[i].uuid = parts[1];
          }
          if ("READ-ONLYMEDIA" === parts[0] && parts[1] === "Yes") {
            devices[i].physical = "CD/DVD";
          }
          if ("SOLIDSTATE" === parts[0] && parts[1] === "Yes") {
            devices[i].physical = "SSD";
          }
          if ("VIRTUAL" === parts[0]) {
            devices[i].type = "virtual";
          }
          if ("REMOVABLEMEDIA" === parts[0]) {
            devices[i].removable = parts[1] === "Removable";
          }
          if ("PARTITIONTYPE" === parts[0]) {
            devices[i].type = "part";
          }
          if ("DEVICE/MEDIANAME" === parts[0]) {
            devices[i].model = parts[1];
          }
        }
      }
    }
  });
  return devices;
}
function parseBlk(lines) {
  let data = [];
  lines.filter((line) => line !== "").forEach((line) => {
    try {
      line = decodeURIComponent(line.replace(/\\x/g, "%"));
      line = line.replace(/\\/g, "\\\\");
      let disk = JSON.parse(line);
      data.push({
        "name": disk.name,
        "type": disk.type,
        "fsType": disk.fsType,
        "mount": disk.mountpoint,
        "size": parseInt(disk.size),
        "physical": disk.type === "disk" ? disk.rota === "0" ? "SSD" : "HDD" : disk.type === "rom" ? "CD/DVD" : "",
        "uuid": disk.uuid,
        "label": disk.label,
        "model": (disk.model || "").trim(),
        "serial": disk.serial,
        "removable": disk.rm === "1",
        "protocol": disk.tran,
        "group": disk.group || ""
      });
    } catch (e) {
      util$b.noop();
    }
  });
  data = util$b.unique(data);
  data = util$b.sortByKey(data, ["type", "name"]);
  return data;
}
function decodeMdabmData(lines) {
  const raid = util$b.getValue(lines, "md_level", "=");
  const label = util$b.getValue(lines, "md_name", "=");
  const uuid2 = util$b.getValue(lines, "md_uuid", "=");
  const members = [];
  lines.forEach((line) => {
    if (line.toLowerCase().startsWith("md_device_dev") && line.toLowerCase().indexOf("/dev/") > 0) {
      members.push(line.split("/dev/")[1]);
    }
  });
  return {
    raid,
    label,
    uuid: uuid2,
    members
  };
}
function raidMatchLinux(data) {
  let result2 = data;
  try {
    data.forEach((element) => {
      if (element.type.startsWith("raid")) {
        const lines = execSync$5(`mdadm --export --detail /dev/${element.name}`, util$b.execOptsLinux).toString().split("\n");
        const mdData = decodeMdabmData(lines);
        element.label = mdData.label;
        element.uuid = mdData.uuid;
        if (mdData.members && mdData.members.length && mdData.raid === element.type) {
          result2 = result2.map((blockdevice) => {
            if (blockdevice.fsType === "linux_raid_member" && mdData.members.indexOf(blockdevice.name) >= 0) {
              blockdevice.group = element.name;
            }
            return blockdevice;
          });
        }
      }
    });
  } catch (e) {
    util$b.noop();
  }
  return result2;
}
function getDevicesLinux(data) {
  const result2 = [];
  data.forEach((element) => {
    if (element.type.startsWith("disk")) {
      result2.push(element.name);
    }
  });
  return result2;
}
function matchDevicesLinux(data) {
  let result2 = data;
  try {
    const devices = getDevicesLinux(data);
    result2 = result2.map((blockdevice) => {
      if (blockdevice.type.startsWith("part") || blockdevice.type.startsWith("disk")) {
        devices.forEach((element) => {
          if (blockdevice.name.startsWith(element)) {
            blockdevice.device = "/dev/" + element;
          }
        });
      }
      return blockdevice;
    });
  } catch (e) {
    util$b.noop();
  }
  return result2;
}
function getDevicesMac(data) {
  const result2 = [];
  data.forEach((element) => {
    if (element.type.startsWith("disk")) {
      result2.push({ name: element.name, model: element.model, device: element.name });
    }
    if (element.type.startsWith("virtual")) {
      let device = "";
      result2.forEach((e) => {
        if (e.model === element.model) {
          device = e.device;
        }
      });
      if (device) {
        result2.push({ name: element.name, model: element.model, device });
      }
    }
  });
  return result2;
}
function matchDevicesMac(data) {
  let result2 = data;
  try {
    const devices = getDevicesMac(data);
    result2 = result2.map((blockdevice) => {
      if (blockdevice.type.startsWith("part") || blockdevice.type.startsWith("disk") || blockdevice.type.startsWith("virtual")) {
        devices.forEach((element) => {
          if (blockdevice.name.startsWith(element.name)) {
            blockdevice.device = element.device;
          }
        });
      }
      return blockdevice;
    });
  } catch (e) {
    util$b.noop();
  }
  return result2;
}
function getDevicesWin(diskDrives) {
  const result2 = [];
  diskDrives.forEach((element) => {
    const lines = element.split("\r\n");
    const device = util$b.getValue(lines, "DeviceID", ":");
    let partitions = element.split("@{DeviceID=");
    if (partitions.length > 1) {
      partitions = partitions.slice(1);
      partitions.forEach((partition) => {
        result2.push({ name: partition.split(";")[0].toUpperCase(), device });
      });
    }
  });
  return result2;
}
function matchDevicesWin(data, diskDrives) {
  const devices = getDevicesWin(diskDrives);
  data.map((element) => {
    const filteresDevices = devices.filter((e) => {
      return e.name === element.name.toUpperCase();
    });
    if (filteresDevices.length > 0) {
      element.device = filteresDevices[0].device;
    }
    return element;
  });
  return data;
}
function blkStdoutToObject(stdout) {
  return stdout.toString().replace(/NAME=/g, '{"name":').replace(/FSTYPE=/g, ',"fsType":').replace(/TYPE=/g, ',"type":').replace(/SIZE=/g, ',"size":').replace(/MOUNTPOINT=/g, ',"mountpoint":').replace(/UUID=/g, ',"uuid":').replace(/ROTA=/g, ',"rota":').replace(/RO=/g, ',"ro":').replace(/RM=/g, ',"rm":').replace(/TRAN=/g, ',"tran":').replace(/SERIAL=/g, ',"serial":').replace(/LABEL=/g, ',"label":').replace(/MODEL=/g, ',"model":').replace(/OWNER=/g, ',"owner":').replace(/GROUP=/g, ',"group":').replace(/\n/g, "}\n");
}
function blockDevices(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let data = [];
      if (_linux$9) {
        exec$9("lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,TRAN,SERIAL,LABEL,MODEL,OWNER 2>/dev/null", { maxBuffer: 1024 * 1024 }, function(error, stdout) {
          if (!error) {
            let lines = blkStdoutToObject(stdout).split("\n");
            data = parseBlk(lines);
            data = raidMatchLinux(data);
            data = matchDevicesLinux(data);
            if (callback) {
              callback(data);
            }
            resolve(data);
          } else {
            exec$9("lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER 2>/dev/null", { maxBuffer: 1024 * 1024 }, function(error2, stdout2) {
              if (!error2) {
                let lines = blkStdoutToObject(stdout2).split("\n");
                data = parseBlk(lines);
                data = raidMatchLinux(data);
              }
              if (callback) {
                callback(data);
              }
              resolve(data);
            });
          }
        });
      }
      if (_darwin$9) {
        exec$9("diskutil info -all", { maxBuffer: 1024 * 1024 }, function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            data = parseDevices(lines);
            data = matchDevicesMac(data);
          }
          if (callback) {
            callback(data);
          }
          resolve(data);
        });
      }
      if (_sunos$8) {
        if (callback) {
          callback(data);
        }
        resolve(data);
      }
      if (_windows$a) {
        let drivetypes = ["Unknown", "NoRoot", "Removable", "Local", "Network", "CD/DVD", "RAM"];
        try {
          const workload = [];
          workload.push(util$b.powerShell("Get-CimInstance -ClassName Win32_LogicalDisk | select Caption,DriveType,Name,FileSystem,Size,VolumeSerialNumber,VolumeName | fl"));
          workload.push(util$b.powerShell("Get-WmiObject -Class Win32_diskdrive | Select-Object -Property PNPDeviceId,DeviceID, Model, Size, @{L='Partitions'; E={$_.GetRelated('Win32_DiskPartition').GetRelated('Win32_LogicalDisk') | Select-Object -Property DeviceID, VolumeName, Size, FreeSpace}} | fl"));
          util$b.promiseAll(
            workload
          ).then((res) => {
            let logicalDisks = res.results[0].toString().split(/\n\s*\n/);
            let diskDrives = res.results[1].toString().split(/\n\s*\n/);
            logicalDisks.forEach(function(device) {
              let lines = device.split("\r\n");
              let drivetype = util$b.getValue(lines, "drivetype", ":");
              if (drivetype) {
                data.push({
                  name: util$b.getValue(lines, "name", ":"),
                  identifier: util$b.getValue(lines, "caption", ":"),
                  type: "disk",
                  fsType: util$b.getValue(lines, "filesystem", ":").toLowerCase(),
                  mount: util$b.getValue(lines, "caption", ":"),
                  size: util$b.getValue(lines, "size", ":"),
                  physical: drivetype >= 0 && drivetype <= 6 ? drivetypes[drivetype] : drivetypes[0],
                  uuid: util$b.getValue(lines, "volumeserialnumber", ":"),
                  label: util$b.getValue(lines, "volumename", ":"),
                  model: "",
                  serial: util$b.getValue(lines, "volumeserialnumber", ":"),
                  removable: drivetype === "2",
                  protocol: "",
                  group: "",
                  device: ""
                });
              }
            });
            data = matchDevicesWin(data, diskDrives);
            if (callback) {
              callback(data);
            }
            resolve(data);
          });
        } catch (e) {
          if (callback) {
            callback(data);
          }
          resolve(data);
        }
      }
      if (_freebsd$8 || _openbsd$8 || _netbsd$8) {
        if (callback) {
          callback(null);
        }
        resolve(null);
      }
    });
  });
}
filesystem.blockDevices = blockDevices;
function calcFsSpeed(rx, wx) {
  let result2 = {
    rx: 0,
    wx: 0,
    tx: 0,
    rx_sec: null,
    wx_sec: null,
    tx_sec: null,
    ms: 0
  };
  if (_fs_speed && _fs_speed.ms) {
    result2.rx = rx;
    result2.wx = wx;
    result2.tx = result2.rx + result2.wx;
    result2.ms = Date.now() - _fs_speed.ms;
    result2.rx_sec = (result2.rx - _fs_speed.bytes_read) / (result2.ms / 1e3);
    result2.wx_sec = (result2.wx - _fs_speed.bytes_write) / (result2.ms / 1e3);
    result2.tx_sec = result2.rx_sec + result2.wx_sec;
    _fs_speed.rx_sec = result2.rx_sec;
    _fs_speed.wx_sec = result2.wx_sec;
    _fs_speed.tx_sec = result2.tx_sec;
    _fs_speed.bytes_read = result2.rx;
    _fs_speed.bytes_write = result2.wx;
    _fs_speed.bytes_overall = result2.rx + result2.wx;
    _fs_speed.ms = Date.now();
    _fs_speed.last_ms = result2.ms;
  } else {
    result2.rx = rx;
    result2.wx = wx;
    result2.tx = result2.rx + result2.wx;
    _fs_speed.rx_sec = null;
    _fs_speed.wx_sec = null;
    _fs_speed.tx_sec = null;
    _fs_speed.bytes_read = result2.rx;
    _fs_speed.bytes_write = result2.wx;
    _fs_speed.bytes_overall = result2.rx + result2.wx;
    _fs_speed.ms = Date.now();
    _fs_speed.last_ms = 0;
  }
  return result2;
}
function fsStats(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (_windows$a || _freebsd$8 || _openbsd$8 || _netbsd$8 || _sunos$8) {
        return resolve(null);
      }
      let result2 = {
        rx: 0,
        wx: 0,
        tx: 0,
        rx_sec: null,
        wx_sec: null,
        tx_sec: null,
        ms: 0
      };
      let rx = 0;
      let wx = 0;
      if (_fs_speed && !_fs_speed.ms || _fs_speed && _fs_speed.ms && Date.now() - _fs_speed.ms >= 500) {
        if (_linux$9) {
          exec$9("lsblk -r 2>/dev/null | grep /", { maxBuffer: 1024 * 1024 }, function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              let fs_filter = [];
              lines.forEach(function(line) {
                if (line !== "") {
                  line = line.trim().split(" ");
                  if (fs_filter.indexOf(line[0]) === -1) {
                    fs_filter.push(line[0]);
                  }
                }
              });
              let output = fs_filter.join("|");
              exec$9('cat /proc/diskstats | egrep "' + output + '"', { maxBuffer: 1024 * 1024 }, function(error2, stdout2) {
                if (!error2) {
                  let lines2 = stdout2.toString().split("\n");
                  lines2.forEach(function(line) {
                    line = line.trim();
                    if (line !== "") {
                      line = line.replace(/ +/g, " ").split(" ");
                      rx += parseInt(line[5]) * 512;
                      wx += parseInt(line[9]) * 512;
                    }
                  });
                  result2 = calcFsSpeed(rx, wx);
                }
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        }
        if (_darwin$9) {
          exec$9('ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,\n"', { maxBuffer: 1024 * 1024 }, function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              lines.forEach(function(line) {
                line = line.trim();
                if (line !== "") {
                  line = line.split(",");
                  rx += parseInt(line[2]);
                  wx += parseInt(line[9]);
                }
              });
              result2 = calcFsSpeed(rx, wx);
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        }
      } else {
        result2.ms = _fs_speed.last_ms;
        result2.rx = _fs_speed.bytes_read;
        result2.wx = _fs_speed.bytes_write;
        result2.tx = _fs_speed.bytes_read + _fs_speed.bytes_write;
        result2.rx_sec = _fs_speed.rx_sec;
        result2.wx_sec = _fs_speed.wx_sec;
        result2.tx_sec = _fs_speed.tx_sec;
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
filesystem.fsStats = fsStats;
function calcDiskIO(rIO, wIO, rWaitTime, wWaitTime, tWaitTime) {
  let result2 = {
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
  if (_disk_io && _disk_io.ms) {
    result2.rIO = rIO;
    result2.wIO = wIO;
    result2.tIO = rIO + wIO;
    result2.ms = Date.now() - _disk_io.ms;
    result2.rIO_sec = (result2.rIO - _disk_io.rIO) / (result2.ms / 1e3);
    result2.wIO_sec = (result2.wIO - _disk_io.wIO) / (result2.ms / 1e3);
    result2.tIO_sec = result2.rIO_sec + result2.wIO_sec;
    result2.rWaitTime = rWaitTime;
    result2.wWaitTime = wWaitTime;
    result2.tWaitTime = tWaitTime;
    result2.rWaitPercent = (result2.rWaitTime - _disk_io.rWaitTime) * 100 / result2.ms;
    result2.wWaitPercent = (result2.wWaitTime - _disk_io.wWaitTime) * 100 / result2.ms;
    result2.tWaitPercent = (result2.tWaitTime - _disk_io.tWaitTime) * 100 / result2.ms;
    _disk_io.rIO = rIO;
    _disk_io.wIO = wIO;
    _disk_io.rIO_sec = result2.rIO_sec;
    _disk_io.wIO_sec = result2.wIO_sec;
    _disk_io.tIO_sec = result2.tIO_sec;
    _disk_io.rWaitTime = rWaitTime;
    _disk_io.wWaitTime = wWaitTime;
    _disk_io.tWaitTime = tWaitTime;
    _disk_io.rWaitPercent = result2.rWaitPercent;
    _disk_io.wWaitPercent = result2.wWaitPercent;
    _disk_io.tWaitPercent = result2.tWaitPercent;
    _disk_io.last_ms = result2.ms;
    _disk_io.ms = Date.now();
  } else {
    result2.rIO = rIO;
    result2.wIO = wIO;
    result2.tIO = rIO + wIO;
    result2.rWaitTime = rWaitTime;
    result2.wWaitTime = wWaitTime;
    result2.tWaitTime = tWaitTime;
    _disk_io.rIO = rIO;
    _disk_io.wIO = wIO;
    _disk_io.rIO_sec = null;
    _disk_io.wIO_sec = null;
    _disk_io.tIO_sec = null;
    _disk_io.rWaitTime = rWaitTime;
    _disk_io.wWaitTime = wWaitTime;
    _disk_io.tWaitTime = tWaitTime;
    _disk_io.rWaitPercent = null;
    _disk_io.wWaitPercent = null;
    _disk_io.tWaitPercent = null;
    _disk_io.last_ms = 0;
    _disk_io.ms = Date.now();
  }
  return result2;
}
function disksIO(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (_windows$a) {
        return resolve(null);
      }
      if (_sunos$8) {
        return resolve(null);
      }
      let result2 = {
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
      let rIO = 0;
      let wIO = 0;
      let rWaitTime = 0;
      let wWaitTime = 0;
      let tWaitTime = 0;
      if (_disk_io && !_disk_io.ms || _disk_io && _disk_io.ms && Date.now() - _disk_io.ms >= 500) {
        if (_linux$9 || _freebsd$8 || _openbsd$8 || _netbsd$8) {
          let cmd = 'for mount in `lsblk 2>/dev/null | grep " disk " | sed "s/[│└─├]//g" | awk \'{$1=$1};1\' | cut -d " " -f 1 | sort -u`; do cat /sys/block/$mount/stat | sed -r "s/ +/;/g" | sed -r "s/^;//"; done';
          exec$9(cmd, { maxBuffer: 1024 * 1024 }, function(error, stdout) {
            if (!error) {
              let lines = stdout.split("\n");
              lines.forEach(function(line) {
                if (!line) {
                  return;
                }
                let stats = line.split(";");
                rIO += parseInt(stats[0]);
                wIO += parseInt(stats[4]);
                rWaitTime += parseInt(stats[3]);
                wWaitTime += parseInt(stats[7]);
                tWaitTime += parseInt(stats[10]);
              });
              result2 = calcDiskIO(rIO, wIO, rWaitTime, wWaitTime, tWaitTime);
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        }
        if (_darwin$9) {
          exec$9('ioreg -c IOBlockStorageDriver -k Statistics -r -w0 | sed -n "/IOBlockStorageDriver/,/Statistics/p" | grep "Statistics" | tr -cd "01234567890,\n"', { maxBuffer: 1024 * 1024 }, function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              lines.forEach(function(line) {
                line = line.trim();
                if (line !== "") {
                  line = line.split(",");
                  rIO += parseInt(line[10]);
                  wIO += parseInt(line[0]);
                }
              });
              result2 = calcDiskIO(rIO, wIO, rWaitTime, wWaitTime, tWaitTime);
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        }
      } else {
        result2.rIO = _disk_io.rIO;
        result2.wIO = _disk_io.wIO;
        result2.tIO = _disk_io.rIO + _disk_io.wIO;
        result2.ms = _disk_io.last_ms;
        result2.rIO_sec = _disk_io.rIO_sec;
        result2.wIO_sec = _disk_io.wIO_sec;
        result2.tIO_sec = _disk_io.tIO_sec;
        result2.rWaitTime = _disk_io.rWaitTime;
        result2.wWaitTime = _disk_io.wWaitTime;
        result2.tWaitTime = _disk_io.tWaitTime;
        result2.rWaitPercent = _disk_io.rWaitPercent;
        result2.wWaitPercent = _disk_io.wWaitPercent;
        result2.tWaitPercent = _disk_io.tWaitPercent;
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
filesystem.disksIO = disksIO;
function diskLayout(callback) {
  function getVendorFromModel2(model) {
    const diskManufacturers = [
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
    let result2 = "";
    if (model) {
      model = model.toUpperCase();
      diskManufacturers.forEach((manufacturer) => {
        const re = RegExp(manufacturer.pattern);
        if (re.test(model)) {
          result2 = manufacturer.manufacturer;
        }
      });
    }
    return result2;
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      const commitResult = (res) => {
        for (let i = 0; i < res.length; i++) {
          delete res[i].BSDName;
        }
        if (callback) {
          callback(res);
        }
        resolve(res);
      };
      let result2 = [];
      let cmd = "";
      if (_linux$9) {
        let cmdFullSmart = "";
        exec$9("export LC_ALL=C; lsblk -ablJO 2>/dev/null; unset LC_ALL", { maxBuffer: 1024 * 1024 }, function(error, stdout) {
          if (!error) {
            try {
              const out = stdout.toString().trim();
              let devices = [];
              try {
                const outJSON = JSON.parse(out);
                if (outJSON && {}.hasOwnProperty.call(outJSON, "blockdevices")) {
                  devices = outJSON.blockdevices.filter((item) => {
                    return item.type === "disk" && item.size > 0 && (item.model !== null || item.mountpoint === null && item.label === null && item.fstype === null && item.parttype === null && item.path && item.path.indexOf("/ram") !== 0 && item.path.indexOf("/loop") !== 0 && item["disc-max"] && item["disc-max"] !== 0);
                  });
                }
              } catch (e) {
                try {
                  const out2 = execSync$5("export LC_ALL=C; lsblk -bPo NAME,TYPE,SIZE,FSTYPE,MOUNTPOINT,UUID,ROTA,RO,RM,LABEL,MODEL,OWNER,GROUP 2>/dev/null; unset LC_ALL", util$b.execOptsLinux).toString();
                  let lines = blkStdoutToObject(out2).split("\n");
                  const data = parseBlk(lines);
                  devices = data.filter((item) => {
                    return item.type === "disk" && item.size > 0 && (item.model !== null && item.model !== "" || item.mount === "" && item.label === "" && item.fsType === "");
                  });
                } catch (e2) {
                  util$b.noop();
                }
              }
              devices.forEach((device) => {
                let mediumType = "";
                const BSDName = "/dev/" + device.name;
                const logical = device.name;
                try {
                  mediumType = execSync$5("cat /sys/block/" + logical + "/queue/rotational 2>/dev/null", util$b.execOptsLinux).toString().split("\n")[0];
                } catch (e) {
                  util$b.noop();
                }
                let interfaceType = device.tran ? device.tran.toUpperCase().trim() : "";
                if (interfaceType === "NVME") {
                  mediumType = "2";
                  interfaceType = "PCIe";
                }
                result2.push({
                  device: BSDName,
                  type: mediumType === "0" ? "SSD" : mediumType === "1" ? "HD" : mediumType === "2" ? "NVMe" : device.model && device.model.indexOf("SSD") > -1 ? "SSD" : device.model && device.model.indexOf("NVM") > -1 ? "NVMe" : "HD",
                  name: device.model || "",
                  vendor: getVendorFromModel2(device.model) || (device.vendor ? device.vendor.trim() : ""),
                  size: device.size || 0,
                  bytesPerSector: null,
                  totalCylinders: null,
                  totalHeads: null,
                  totalSectors: null,
                  totalTracks: null,
                  tracksPerCylinder: null,
                  sectorsPerTrack: null,
                  firmwareRevision: device.rev ? device.rev.trim() : "",
                  serialNum: device.serial ? device.serial.trim() : "",
                  interfaceType,
                  smartStatus: "unknown",
                  temperature: null,
                  BSDName
                });
                cmd += `printf "
${BSDName}|"; smartctl -H ${BSDName} | grep overall;`;
                cmdFullSmart += `${cmdFullSmart ? 'printf ",";' : ""}smartctl -a -j ${BSDName};`;
              });
            } catch (e) {
              util$b.noop();
            }
          }
          if (cmdFullSmart) {
            exec$9(cmdFullSmart, { maxBuffer: 1024 * 1024 }, function(error2, stdout2) {
              try {
                const data = JSON.parse(`[${stdout2}]`);
                data.forEach((disk) => {
                  const diskBSDName = disk.smartctl.argv[disk.smartctl.argv.length - 1];
                  for (let i = 0; i < result2.length; i++) {
                    if (result2[i].BSDName === diskBSDName) {
                      result2[i].smartStatus = disk.smart_status.passed ? "Ok" : disk.smart_status.passed === false ? "Predicted Failure" : "unknown";
                      if (disk.temperature && disk.temperature.current) {
                        result2[i].temperature = disk.temperature.current;
                      }
                      result2[i].smartData = disk;
                    }
                  }
                });
                commitResult(result2);
              } catch (e) {
                if (cmd) {
                  cmd = cmd + 'printf "\n"';
                  exec$9(cmd, { maxBuffer: 1024 * 1024 }, function(error3, stdout3) {
                    let lines = stdout3.toString().split("\n");
                    lines.forEach((line) => {
                      if (line) {
                        let parts = line.split("|");
                        if (parts.length === 2) {
                          let BSDName = parts[0];
                          parts[1] = parts[1].trim();
                          let parts2 = parts[1].split(":");
                          if (parts2.length === 2) {
                            parts2[1] = parts2[1].trim();
                            let status = parts2[1].toLowerCase();
                            for (let i = 0; i < result2.length; i++) {
                              if (result2[i].BSDName === BSDName) {
                                result2[i].smartStatus = status === "passed" ? "Ok" : status === "failed!" ? "Predicted Failure" : "unknown";
                              }
                            }
                          }
                        }
                      }
                    });
                    commitResult(result2);
                  });
                } else {
                  commitResult(result2);
                }
              }
            });
          } else {
            commitResult(result2);
          }
        });
      }
      if (_freebsd$8 || _openbsd$8 || _netbsd$8) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_sunos$8) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_darwin$9) {
        exec$9("system_profiler SPSerialATADataType SPNVMeDataType SPUSBDataType", { maxBuffer: 1024 * 1024 }, function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            let linesSATA = [];
            let linesNVMe = [];
            let linesUSB = [];
            let dataType = "SATA";
            lines.forEach((line) => {
              if (line === "NVMExpress:") {
                dataType = "NVMe";
              } else if (line === "USB:") {
                dataType = "USB";
              } else if (line === "SATA/SATA Express:") {
                dataType = "SATA";
              } else if (dataType === "SATA") {
                linesSATA.push(line);
              } else if (dataType === "NVMe") {
                linesNVMe.push(line);
              } else if (dataType === "USB") {
                linesUSB.push(line);
              }
            });
            try {
              let devices = linesSATA.join("\n").split(" Physical Interconnect: ");
              devices.shift();
              devices.forEach(function(device) {
                device = "InterfaceType: " + device;
                let lines2 = device.split("\n");
                const mediumType = util$b.getValue(lines2, "Medium Type", ":", true).trim();
                const sizeStr = util$b.getValue(lines2, "capacity", ":", true).trim();
                const BSDName = util$b.getValue(lines2, "BSD Name", ":", true).trim();
                if (sizeStr) {
                  let sizeValue = 0;
                  if (sizeStr.indexOf("(") >= 0) {
                    sizeValue = parseInt(sizeStr.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""));
                  }
                  if (!sizeValue) {
                    sizeValue = parseInt(sizeStr);
                  }
                  if (sizeValue) {
                    const smartStatusString = util$b.getValue(lines2, "S.M.A.R.T. status", ":", true).trim().toLowerCase();
                    result2.push({
                      device: BSDName,
                      type: mediumType.startsWith("Solid") ? "SSD" : "HD",
                      name: util$b.getValue(lines2, "Model", ":", true).trim(),
                      vendor: getVendorFromModel2(util$b.getValue(lines2, "Model", ":", true).trim()) || util$b.getValue(lines2, "Manufacturer", ":", true),
                      size: sizeValue,
                      bytesPerSector: null,
                      totalCylinders: null,
                      totalHeads: null,
                      totalSectors: null,
                      totalTracks: null,
                      tracksPerCylinder: null,
                      sectorsPerTrack: null,
                      firmwareRevision: util$b.getValue(lines2, "Revision", ":", true).trim(),
                      serialNum: util$b.getValue(lines2, "Serial Number", ":", true).trim(),
                      interfaceType: util$b.getValue(lines2, "InterfaceType", ":", true).trim(),
                      smartStatus: smartStatusString === "verified" ? "OK" : smartStatusString || "unknown",
                      temperature: null,
                      BSDName
                    });
                    cmd = cmd + 'printf "\n' + BSDName + '|"; diskutil info /dev/' + BSDName + " | grep SMART;";
                  }
                }
              });
            } catch (e) {
              util$b.noop();
            }
            try {
              let devices = linesNVMe.join("\n").split("\n\n          Capacity:");
              devices.shift();
              devices.forEach(function(device) {
                device = "!Capacity: " + device;
                let lines2 = device.split("\n");
                const linkWidth = util$b.getValue(lines2, "link width", ":", true).trim();
                const sizeStr = util$b.getValue(lines2, "!capacity", ":", true).trim();
                const BSDName = util$b.getValue(lines2, "BSD Name", ":", true).trim();
                if (sizeStr) {
                  let sizeValue = 0;
                  if (sizeStr.indexOf("(") >= 0) {
                    sizeValue = parseInt(sizeStr.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""));
                  }
                  if (!sizeValue) {
                    sizeValue = parseInt(sizeStr);
                  }
                  if (sizeValue) {
                    const smartStatusString = util$b.getValue(lines2, "S.M.A.R.T. status", ":", true).trim().toLowerCase();
                    result2.push({
                      device: BSDName,
                      type: "NVMe",
                      name: util$b.getValue(lines2, "Model", ":", true).trim(),
                      vendor: getVendorFromModel2(util$b.getValue(lines2, "Model", ":", true).trim()),
                      size: sizeValue,
                      bytesPerSector: null,
                      totalCylinders: null,
                      totalHeads: null,
                      totalSectors: null,
                      totalTracks: null,
                      tracksPerCylinder: null,
                      sectorsPerTrack: null,
                      firmwareRevision: util$b.getValue(lines2, "Revision", ":", true).trim(),
                      serialNum: util$b.getValue(lines2, "Serial Number", ":", true).trim(),
                      interfaceType: ("PCIe " + linkWidth).trim(),
                      smartStatus: smartStatusString === "verified" ? "OK" : smartStatusString || "unknown",
                      temperature: null,
                      BSDName
                    });
                    cmd = cmd + 'printf "\n' + BSDName + '|"; diskutil info /dev/' + BSDName + " | grep SMART;";
                  }
                }
              });
            } catch (e) {
              util$b.noop();
            }
            try {
              let devices = linesUSB.join("\n").replaceAll("Media:\n ", "Model:").split("\n\n          Product ID:");
              devices.shift();
              devices.forEach(function(device) {
                let lines2 = device.split("\n");
                const sizeStr = util$b.getValue(lines2, "Capacity", ":", true).trim();
                const BSDName = util$b.getValue(lines2, "BSD Name", ":", true).trim();
                if (sizeStr) {
                  let sizeValue = 0;
                  if (sizeStr.indexOf("(") >= 0) {
                    sizeValue = parseInt(sizeStr.match(/\(([^)]+)\)/)[1].replace(/\./g, "").replace(/,/g, "").replace(/\s/g, ""));
                  }
                  if (!sizeValue) {
                    sizeValue = parseInt(sizeStr);
                  }
                  if (sizeValue) {
                    const smartStatusString = util$b.getValue(lines2, "S.M.A.R.T. status", ":", true).trim().toLowerCase();
                    result2.push({
                      device: BSDName,
                      type: "USB",
                      name: util$b.getValue(lines2, "Model", ":", true).trim().replaceAll(":", ""),
                      vendor: getVendorFromModel2(util$b.getValue(lines2, "Model", ":", true).trim()),
                      size: sizeValue,
                      bytesPerSector: null,
                      totalCylinders: null,
                      totalHeads: null,
                      totalSectors: null,
                      totalTracks: null,
                      tracksPerCylinder: null,
                      sectorsPerTrack: null,
                      firmwareRevision: util$b.getValue(lines2, "Revision", ":", true).trim(),
                      serialNum: util$b.getValue(lines2, "Serial Number", ":", true).trim(),
                      interfaceType: "USB",
                      smartStatus: smartStatusString === "verified" ? "OK" : smartStatusString || "unknown",
                      temperature: null,
                      BSDName
                    });
                    cmd = cmd + 'printf "\n' + BSDName + '|"; diskutil info /dev/' + BSDName + " | grep SMART;";
                  }
                }
              });
            } catch (e) {
              util$b.noop();
            }
            if (cmd) {
              cmd = cmd + 'printf "\n"';
              exec$9(cmd, { maxBuffer: 1024 * 1024 }, function(error2, stdout2) {
                let lines2 = stdout2.toString().split("\n");
                lines2.forEach((line) => {
                  if (line) {
                    let parts = line.split("|");
                    if (parts.length === 2) {
                      let BSDName = parts[0];
                      parts[1] = parts[1].trim();
                      let parts2 = parts[1].split(":");
                      if (parts2.length === 2) {
                        parts2[1] = parts2[1].trim();
                        let status = parts2[1].toLowerCase();
                        for (let i = 0; i < result2.length; i++) {
                          if (result2[i].BSDName === BSDName) {
                            result2[i].smartStatus = status === "not supported" ? "not supported" : status === "verified" ? "Ok" : status === "failing" ? "Predicted Failure" : "unknown";
                          }
                        }
                      }
                    }
                  }
                });
                for (let i = 0; i < result2.length; i++) {
                  delete result2[i].BSDName;
                }
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              });
            } else {
              for (let i = 0; i < result2.length; i++) {
                delete result2[i].BSDName;
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          }
        });
      }
      if (_windows$a) {
        try {
          const workload = [];
          workload.push(util$b.powerShell("Get-CimInstance Win32_DiskDrive | select Caption,Size,Status,PNPDeviceId,DeviceId,BytesPerSector,TotalCylinders,TotalHeads,TotalSectors,TotalTracks,TracksPerCylinder,SectorsPerTrack,FirmwareRevision,SerialNumber,InterfaceType | fl"));
          workload.push(util$b.powerShell("Get-PhysicalDisk | select BusType,MediaType,FriendlyName,Model,SerialNumber,Size | fl"));
          if (util$b.smartMonToolsInstalled()) {
            try {
              const smartDev = JSON.parse(execSync$5("smartctl --scan -j").toString());
              if (smartDev && smartDev.devices && smartDev.devices.length > 0) {
                smartDev.devices.forEach((dev) => {
                  workload.push(execPromiseSave(`smartctl -j -a ${dev.name}`, util$b.execOptsWin));
                });
              }
            } catch (e) {
              util$b.noop();
            }
          }
          util$b.promiseAll(
            workload
          ).then((data) => {
            let devices = data.results[0].toString().split(/\n\s*\n/);
            devices.forEach(function(device) {
              let lines = device.split("\r\n");
              const size = util$b.getValue(lines, "Size", ":").trim();
              const status = util$b.getValue(lines, "Status", ":").trim().toLowerCase();
              if (size) {
                result2.push({
                  device: util$b.getValue(lines, "DeviceId", ":"),
                  // changed from PNPDeviceId to DeviceID (be be able to match devices)
                  type: device.indexOf("SSD") > -1 ? "SSD" : "HD",
                  // just a starting point ... better: MSFT_PhysicalDisk - Media Type ... see below
                  name: util$b.getValue(lines, "Caption", ":"),
                  vendor: getVendorFromModel2(util$b.getValue(lines, "Caption", ":", true).trim()),
                  size: parseInt(size),
                  bytesPerSector: parseInt(util$b.getValue(lines, "BytesPerSector", ":")),
                  totalCylinders: parseInt(util$b.getValue(lines, "TotalCylinders", ":")),
                  totalHeads: parseInt(util$b.getValue(lines, "TotalHeads", ":")),
                  totalSectors: parseInt(util$b.getValue(lines, "TotalSectors", ":")),
                  totalTracks: parseInt(util$b.getValue(lines, "TotalTracks", ":")),
                  tracksPerCylinder: parseInt(util$b.getValue(lines, "TracksPerCylinder", ":")),
                  sectorsPerTrack: parseInt(util$b.getValue(lines, "SectorsPerTrack", ":")),
                  firmwareRevision: util$b.getValue(lines, "FirmwareRevision", ":").trim(),
                  serialNum: util$b.getValue(lines, "SerialNumber", ":").trim(),
                  interfaceType: util$b.getValue(lines, "InterfaceType", ":").trim(),
                  smartStatus: status === "ok" ? "Ok" : status === "degraded" ? "Degraded" : status === "pred fail" ? "Predicted Failure" : "Unknown",
                  temperature: null
                });
              }
            });
            devices = data.results[1].split(/\n\s*\n/);
            devices.forEach(function(device) {
              let lines = device.split("\r\n");
              const serialNum = util$b.getValue(lines, "SerialNumber", ":").trim();
              const name = util$b.getValue(lines, "FriendlyName", ":").trim().replace("Msft ", "Microsoft");
              const size = util$b.getValue(lines, "Size", ":").trim();
              const model = util$b.getValue(lines, "Model", ":").trim();
              const interfaceType = util$b.getValue(lines, "BusType", ":").trim();
              let mediaType = util$b.getValue(lines, "MediaType", ":").trim();
              if (mediaType === "3" || mediaType === "HDD") {
                mediaType = "HD";
              }
              if (mediaType === "4") {
                mediaType = "SSD";
              }
              if (mediaType === "5") {
                mediaType = "SCM";
              }
              if (mediaType === "Unspecified" && (model.toLowerCase().indexOf("virtual") > -1 || model.toLowerCase().indexOf("vbox") > -1)) {
                mediaType = "Virtual";
              }
              if (size) {
                let i = util$b.findObjectByKey(result2, "serialNum", serialNum);
                if (i === -1 || serialNum === "") {
                  i = util$b.findObjectByKey(result2, "name", name);
                }
                if (i != -1) {
                  result2[i].type = mediaType;
                  result2[i].interfaceType = interfaceType;
                }
              }
            });
            data.results.shift();
            data.results.shift();
            if (data.results.length) {
              data.results.forEach((smartStr) => {
                try {
                  const smartData = JSON.parse(smartStr);
                  if (smartData.serial_number) {
                    const serialNum = smartData.serial_number;
                    let i = util$b.findObjectByKey(result2, "serialNum", serialNum);
                    if (i != -1) {
                      result2[i].smartStatus = smartData.smart_status && smartData.smart_status.passed ? "Ok" : smartData.smart_status && smartData.smart_status.passed === false ? "Predicted Failure" : "unknown";
                      if (smartData.temperature && smartData.temperature.current) {
                        result2[i].temperature = smartData.temperature.current;
                      }
                      result2[i].smartData = smartData;
                    }
                  }
                } catch (e) {
                  util$b.noop();
                }
              });
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
filesystem.diskLayout = diskLayout;
var network = {};
const os$4 = os$a;
const exec$8 = require$$1$1.exec;
const execSync$4 = require$$1$1.execSync;
const fs$2 = require$$1$2;
const util$a = util$j;
let _platform$9 = process.platform;
const _linux$8 = _platform$9 === "linux" || _platform$9 === "android";
const _darwin$8 = _platform$9 === "darwin";
const _windows$9 = _platform$9 === "win32";
const _freebsd$7 = _platform$9 === "freebsd";
const _openbsd$7 = _platform$9 === "openbsd";
const _netbsd$7 = _platform$9 === "netbsd";
const _sunos$7 = _platform$9 === "sunos";
let _network = {};
let _default_iface = "";
let _ifaces = {};
let _dhcpNics = [];
let _networkInterfaces = [];
let _mac = {};
let pathToIp;
function getDefaultNetworkInterface() {
  let ifacename = "";
  let ifacenameFirst = "";
  try {
    let ifaces = os$4.networkInterfaces();
    let scopeid = 9999;
    for (let dev in ifaces) {
      if ({}.hasOwnProperty.call(ifaces, dev)) {
        ifaces[dev].forEach(function(details) {
          if (details && details.internal === false) {
            ifacenameFirst = ifacenameFirst || dev;
            if (details.scopeid && details.scopeid < scopeid) {
              ifacename = dev;
              scopeid = details.scopeid;
            }
          }
        });
      }
    }
    ifacename = ifacename || ifacenameFirst || "";
    if (_windows$9) {
      let defaultIp = "";
      const cmd = "netstat -r";
      const result2 = execSync$4(cmd, util$a.execOptsWin);
      const lines = result2.toString().split(os$4.EOL);
      lines.forEach((line) => {
        line = line.replace(/\s+/g, " ").trim();
        if (line.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(line)) {
          const parts = line.split(" ");
          if (parts.length >= 5) {
            defaultIp = parts[parts.length - 2];
          }
        }
      });
      if (defaultIp) {
        for (let dev in ifaces) {
          if ({}.hasOwnProperty.call(ifaces, dev)) {
            ifaces[dev].forEach(function(details) {
              if (details && details.address && details.address === defaultIp) {
                ifacename = dev;
              }
            });
          }
        }
      }
    }
    if (_linux$8) {
      let cmd = "ip route 2> /dev/null | grep default";
      let result2 = execSync$4(cmd, util$a.execOptsLinux);
      let parts = result2.toString().split("\n")[0].split(/\s+/);
      if (parts[0] === "none" && parts[5]) {
        ifacename = parts[5];
      } else if (parts[4]) {
        ifacename = parts[4];
      }
      if (ifacename.indexOf(":") > -1) {
        ifacename = ifacename.split(":")[1].trim();
      }
    }
    if (_darwin$8 || _freebsd$7 || _openbsd$7 || _netbsd$7 || _sunos$7) {
      let cmd = "";
      if (_linux$8) {
        cmd = "ip route 2> /dev/null | grep default | awk '{print $5}'";
      }
      if (_darwin$8) {
        cmd = "route -n get default 2>/dev/null | grep interface: | awk '{print $2}'";
      }
      if (_freebsd$7 || _openbsd$7 || _netbsd$7 || _sunos$7) {
        cmd = "route get 0.0.0.0 | grep interface:";
      }
      let result2 = execSync$4(cmd);
      ifacename = result2.toString().split("\n")[0];
      if (ifacename.indexOf(":") > -1) {
        ifacename = ifacename.split(":")[1].trim();
      }
    }
  } catch (e) {
    util$a.noop();
  }
  if (ifacename) {
    _default_iface = ifacename;
  }
  return _default_iface;
}
network.getDefaultNetworkInterface = getDefaultNetworkInterface;
function getMacAddresses() {
  let iface = "";
  let mac = "";
  let result2 = {};
  if (_linux$8 || _freebsd$7 || _openbsd$7 || _netbsd$7) {
    if (typeof pathToIp === "undefined") {
      try {
        const lines = execSync$4("which ip", util$a.execOptsLinux).toString().split("\n");
        if (lines.length && lines[0].indexOf(":") === -1 && lines[0].indexOf("/") === 0) {
          pathToIp = lines[0];
        } else {
          pathToIp = "";
        }
      } catch (e) {
        pathToIp = "";
      }
    }
    try {
      const cmd = "export LC_ALL=C; " + (pathToIp ? pathToIp + " link show up" : "/sbin/ifconfig") + "; unset LC_ALL";
      let res = execSync$4(cmd, util$a.execOptsLinux);
      const lines = res.toString().split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] && lines[i][0] !== " ") {
          if (pathToIp) {
            let nextline = lines[i + 1].trim().split(" ");
            if (nextline[0] === "link/ether") {
              iface = lines[i].split(" ")[1];
              iface = iface.slice(0, iface.length - 1);
              mac = nextline[1];
            }
          } else {
            iface = lines[i].split(" ")[0];
            mac = lines[i].split("HWaddr ")[1];
          }
          if (iface && mac) {
            result2[iface] = mac.trim();
            iface = "";
            mac = "";
          }
        }
      }
    } catch (e) {
      util$a.noop();
    }
  }
  if (_darwin$8) {
    try {
      const cmd = "/sbin/ifconfig";
      let res = execSync$4(cmd);
      const lines = res.toString().split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] && lines[i][0] !== "	" && lines[i].indexOf(":") > 0) {
          iface = lines[i].split(":")[0];
        } else if (lines[i].indexOf("	ether ") === 0) {
          mac = lines[i].split("	ether ")[1];
          if (iface && mac) {
            result2[iface] = mac.trim();
            iface = "";
            mac = "";
          }
        }
      }
    } catch (e) {
      util$a.noop();
    }
  }
  return result2;
}
function networkInterfaceDefault(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = getDefaultNetworkInterface();
      if (callback) {
        callback(result2);
      }
      resolve(result2);
    });
  });
}
network.networkInterfaceDefault = networkInterfaceDefault;
function parseLinesWindowsNics(sections, nconfigsections) {
  let nics = [];
  for (let i in sections) {
    try {
      if ({}.hasOwnProperty.call(sections, i)) {
        if (sections[i].trim() !== "") {
          let lines = sections[i].trim().split("\r\n");
          let linesNicConfig = null;
          try {
            linesNicConfig = nconfigsections && nconfigsections[i] ? nconfigsections[i].trim().split("\r\n") : [];
          } catch (e) {
            util$a.noop();
          }
          let netEnabled = util$a.getValue(lines, "NetEnabled", ":");
          let adapterType = util$a.getValue(lines, "AdapterTypeID", ":") === "9" ? "wireless" : "wired";
          let ifacename = util$a.getValue(lines, "Name", ":").replace(/\]/g, ")").replace(/\[/g, "(");
          let iface = util$a.getValue(lines, "NetConnectionID", ":").replace(/\]/g, ")").replace(/\[/g, "(");
          if (ifacename.toLowerCase().indexOf("wi-fi") >= 0 || ifacename.toLowerCase().indexOf("wireless") >= 0) {
            adapterType = "wireless";
          }
          if (netEnabled !== "") {
            const speed = parseInt(util$a.getValue(lines, "speed", ":").trim(), 10) / 1e6;
            nics.push({
              mac: util$a.getValue(lines, "MACAddress", ":").toLowerCase(),
              dhcp: util$a.getValue(linesNicConfig, "dhcpEnabled", ":").toLowerCase() === "true",
              name: ifacename,
              iface,
              netEnabled: netEnabled === "TRUE",
              speed: isNaN(speed) ? null : speed,
              operstate: util$a.getValue(lines, "NetConnectionStatus", ":") === "2" ? "up" : "down",
              type: adapterType
            });
          }
        }
      }
    } catch (e) {
      util$a.noop();
    }
  }
  return nics;
}
function getWindowsNics() {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let cmd = "Get-CimInstance Win32_NetworkAdapter | fl *; echo '#-#-#-#';";
      cmd += "Get-CimInstance Win32_NetworkAdapterConfiguration | fl DHCPEnabled";
      try {
        util$a.powerShell(cmd).then((data) => {
          data = data.split("#-#-#-#");
          const nsections = (data[0] || "").split(/\n\s*\n/);
          const nconfigsections = (data[1] || "").split(/\n\s*\n/);
          resolve(parseLinesWindowsNics(nsections, nconfigsections));
        });
      } catch (e) {
        resolve([]);
      }
    });
  });
}
function getWindowsDNSsuffixes() {
  let iface = {};
  let dnsSuffixes = {
    primaryDNS: "",
    exitCode: 0,
    ifaces: []
  };
  try {
    const ipconfig = execSync$4("ipconfig /all", util$a.execOptsWin);
    const ipconfigArray = ipconfig.split("\r\n\r\n");
    ipconfigArray.forEach((element, index) => {
      if (index == 1) {
        const longPrimaryDNS = element.split("\r\n").filter((element2) => {
          return element2.toUpperCase().includes("DNS");
        });
        const primaryDNS = longPrimaryDNS[0].substring(longPrimaryDNS[0].lastIndexOf(":") + 1);
        dnsSuffixes.primaryDNS = primaryDNS.trim();
        if (!dnsSuffixes.primaryDNS) {
          dnsSuffixes.primaryDNS = "Not defined";
        }
      }
      if (index > 1) {
        if (index % 2 == 0) {
          const name = element.substring(element.lastIndexOf(" ") + 1).replace(":", "");
          iface.name = name;
        } else {
          const connectionSpecificDNS = element.split("\r\n").filter((element2) => {
            return element2.toUpperCase().includes("DNS");
          });
          const dnsSuffix = connectionSpecificDNS[0].substring(connectionSpecificDNS[0].lastIndexOf(":") + 1);
          iface.dnsSuffix = dnsSuffix.trim();
          dnsSuffixes.ifaces.push(iface);
          iface = {};
        }
      }
    });
    return dnsSuffixes;
  } catch (error) {
    return {
      primaryDNS: "",
      exitCode: 0,
      ifaces: []
    };
  }
}
function getWindowsIfaceDNSsuffix(ifaces, ifacename) {
  let dnsSuffix = "";
  const interfaceName = ifacename + ".";
  try {
    const connectionDnsSuffix = ifaces.filter((iface) => {
      return interfaceName.includes(iface.name + ".");
    }).map((iface) => iface.dnsSuffix);
    if (connectionDnsSuffix[0]) {
      dnsSuffix = connectionDnsSuffix[0];
    }
    if (!dnsSuffix) {
      dnsSuffix = "";
    }
    return dnsSuffix;
  } catch (error) {
    return "Unknown";
  }
}
function getWindowsWiredProfilesInformation() {
  try {
    const result2 = execSync$4("netsh lan show profiles", util$a.execOptsWin);
    const profileList = result2.split("\r\nProfile on interface");
    return profileList;
  } catch (error) {
    if (error.status === 1 && error.stdout.includes("AutoConfig")) {
      return "Disabled";
    }
    return [];
  }
}
function getWindowsWirelessIfaceSSID(interfaceName) {
  try {
    const result2 = execSync$4(`netsh wlan show  interface name="${interfaceName}" | findstr "SSID"`, util$a.execOptsWin);
    const SSID = result2.split("\r\n").shift();
    const parseSSID = SSID.split(":").pop().trim();
    return parseSSID;
  } catch (error) {
    return "Unknown";
  }
}
function getWindowsIEEE8021x(connectionType, iface, ifaces) {
  let i8021x = {
    state: "Unknown",
    protocol: "Unknown"
  };
  if (ifaces === "Disabled") {
    i8021x.state = "Disabled";
    i8021x.protocol = "Not defined";
    return i8021x;
  }
  if (connectionType == "wired" && ifaces.length > 0) {
    try {
      const iface8021xInfo = ifaces.find((element) => {
        return element.includes(iface + "\r\n");
      });
      const arrayIface8021xInfo = iface8021xInfo.split("\r\n");
      const state8021x = arrayIface8021xInfo.find((element) => {
        return element.includes("802.1x");
      });
      if (state8021x.includes("Disabled")) {
        i8021x.state = "Disabled";
        i8021x.protocol = "Not defined";
      } else if (state8021x.includes("Enabled")) {
        const protocol8021x = arrayIface8021xInfo.find((element) => {
          return element.includes("EAP");
        });
        i8021x.protocol = protocol8021x.split(":").pop();
        i8021x.state = "Enabled";
      }
    } catch (error) {
      return i8021x;
    }
  } else if (connectionType == "wireless") {
    let i8021xState = "";
    let i8021xProtocol = "";
    try {
      const SSID = getWindowsWirelessIfaceSSID(iface);
      if (SSID !== "Unknown") {
        let ifaceSanitized = "";
        const s = util$a.isPrototypePolluted() ? "---" : util$a.sanitizeShellString(SSID);
        const l = util$a.mathMin(s.length, 32);
        for (let i = 0; i <= l; i++) {
          if (s[i] !== void 0) {
            ifaceSanitized = ifaceSanitized + s[i];
          }
        }
        i8021xState = execSync$4(`netsh wlan show profiles "${ifaceSanitized}" | findstr "802.1X"`, util$a.execOptsWin);
        i8021xProtocol = execSync$4(`netsh wlan show profiles "${ifaceSanitized}" | findstr "EAP"`, util$a.execOptsWin);
      }
      if (i8021xState.includes(":") && i8021xProtocol.includes(":")) {
        i8021x.state = i8021xState.split(":").pop();
        i8021x.protocol = i8021xProtocol.split(":").pop();
      }
    } catch (error) {
      if (error.status === 1 && error.stdout.includes("AutoConfig")) {
        i8021x.state = "Disabled";
        i8021x.protocol = "Not defined";
      }
      return i8021x;
    }
  }
  return i8021x;
}
function splitSectionsNics(lines) {
  const result2 = [];
  let section = [];
  lines.forEach(function(line) {
    if (!line.startsWith("	") && !line.startsWith(" ")) {
      if (section.length) {
        result2.push(section);
        section = [];
      }
    }
    section.push(line);
  });
  if (section.length) {
    result2.push(section);
  }
  return result2;
}
function parseLinesDarwinNics(sections) {
  let nics = [];
  sections.forEach((section) => {
    let nic = {
      iface: "",
      mtu: null,
      mac: "",
      ip6: "",
      ip4: "",
      speed: null,
      type: "",
      operstate: "",
      duplex: "",
      internal: false
    };
    const first = section[0];
    nic.iface = first.split(":")[0].trim();
    let parts = first.split("> mtu");
    nic.mtu = parts.length > 1 ? parseInt(parts[1], 10) : null;
    if (isNaN(nic.mtu)) {
      nic.mtu = null;
    }
    nic.internal = parts[0].toLowerCase().indexOf("loopback") > -1;
    section.forEach((line) => {
      if (line.trim().startsWith("ether ")) {
        nic.mac = line.split("ether ")[1].toLowerCase().trim();
      }
      if (line.trim().startsWith("inet6 ") && !nic.ip6) {
        nic.ip6 = line.split("inet6 ")[1].toLowerCase().split("%")[0].split(" ")[0];
      }
      if (line.trim().startsWith("inet ") && !nic.ip4) {
        nic.ip4 = line.split("inet ")[1].toLowerCase().split(" ")[0];
      }
    });
    let speed = util$a.getValue(section, "link rate");
    nic.speed = speed ? parseFloat(speed) : null;
    if (nic.speed === null) {
      speed = util$a.getValue(section, "uplink rate");
      nic.speed = speed ? parseFloat(speed) : null;
      if (nic.speed !== null && speed.toLowerCase().indexOf("gbps") >= 0) {
        nic.speed = nic.speed * 1e3;
      }
    } else {
      if (speed.toLowerCase().indexOf("gbps") >= 0) {
        nic.speed = nic.speed * 1e3;
      }
    }
    nic.type = util$a.getValue(section, "type").toLowerCase().indexOf("wi-fi") > -1 ? "wireless" : "wired";
    const operstate = util$a.getValue(section, "status").toLowerCase();
    nic.operstate = operstate === "active" ? "up" : operstate === "inactive" ? "down" : "unknown";
    nic.duplex = util$a.getValue(section, "media").toLowerCase().indexOf("half-duplex") > -1 ? "half" : "full";
    if (nic.ip6 || nic.ip4 || nic.mac) {
      nics.push(nic);
    }
  });
  return nics;
}
function getDarwinNics() {
  const cmd = "/sbin/ifconfig -v";
  try {
    const lines = execSync$4(cmd, { maxBuffer: 1024 * 2e4 }).toString().split("\n");
    const nsections = splitSectionsNics(lines);
    return parseLinesDarwinNics(nsections);
  } catch (e) {
    return [];
  }
}
function getLinuxIfaceConnectionName(interfaceName) {
  const cmd = `nmcli device status 2>/dev/null | grep ${interfaceName}`;
  try {
    const result2 = execSync$4(cmd, util$a.execOptsLinux).toString();
    const resultFormat = result2.replace(/\s+/g, " ").trim();
    const connectionNameLines = resultFormat.split(" ").slice(3);
    const connectionName = connectionNameLines.join(" ");
    return connectionName != "--" ? connectionName : "";
  } catch (e) {
    return "";
  }
}
function checkLinuxDCHPInterfaces(file) {
  let result2 = [];
  try {
    let cmd = `cat ${file} 2> /dev/null | grep 'iface\\|source'`;
    const lines = execSync$4(cmd, util$a.execOptsLinux).toString().split("\n");
    lines.forEach((line) => {
      const parts = line.replace(/\s+/g, " ").trim().split(" ");
      if (parts.length >= 4) {
        if (line.toLowerCase().indexOf(" inet ") >= 0 && line.toLowerCase().indexOf("dhcp") >= 0) {
          result2.push(parts[1]);
        }
      }
      if (line.toLowerCase().includes("source")) {
        let file2 = line.split(" ")[1];
        result2 = result2.concat(checkLinuxDCHPInterfaces(file2));
      }
    });
  } catch (e) {
    util$a.noop();
  }
  return result2;
}
function getLinuxDHCPNics() {
  let cmd = "ip a 2> /dev/null";
  let result2 = [];
  try {
    const lines = execSync$4(cmd, util$a.execOptsLinux).toString().split("\n");
    const nsections = splitSectionsNics(lines);
    result2 = parseLinuxDHCPNics(nsections);
  } catch (e) {
    util$a.noop();
  }
  try {
    result2 = checkLinuxDCHPInterfaces("/etc/network/interfaces");
  } catch (e) {
    util$a.noop();
  }
  return result2;
}
function parseLinuxDHCPNics(sections) {
  const result2 = [];
  if (sections && sections.length) {
    sections.forEach((lines) => {
      if (lines && lines.length) {
        const parts = lines[0].split(":");
        if (parts.length > 2) {
          for (let line of lines) {
            if (line.indexOf(" inet ") >= 0 && line.indexOf(" dynamic ") >= 0) {
              const parts2 = line.split(" ");
              const nic = parts2[parts2.length - 1].trim();
              result2.push(nic);
              break;
            }
          }
        }
      }
    });
  }
  return result2;
}
function getLinuxIfaceDHCPstatus(iface, connectionName, DHCPNics) {
  let result2 = false;
  if (connectionName) {
    const cmd = `nmcli connection show "${connectionName}" 2>/dev/null | grep ipv4.method;`;
    try {
      const lines = execSync$4(cmd, util$a.execOptsLinux).toString();
      const resultFormat = lines.replace(/\s+/g, " ").trim();
      let dhcStatus = resultFormat.split(" ").slice(1).toString();
      switch (dhcStatus) {
        case "auto":
          result2 = true;
          break;
        default:
          result2 = false;
          break;
      }
      return result2;
    } catch (e) {
      return DHCPNics.indexOf(iface) >= 0;
    }
  } else {
    return DHCPNics.indexOf(iface) >= 0;
  }
}
function getDarwinIfaceDHCPstatus(iface) {
  let result2 = false;
  const cmd = `ipconfig getpacket "${iface}" 2>/dev/null | grep lease_time;`;
  try {
    const lines = execSync$4(cmd).toString().split("\n");
    if (lines.length && lines[0].startsWith("lease_time")) {
      result2 = true;
    }
  } catch (e) {
    util$a.noop();
  }
  return result2;
}
function getLinuxIfaceDNSsuffix(connectionName) {
  if (connectionName) {
    const cmd = `nmcli connection show "${connectionName}" 2>/dev/null | grep ipv4.dns-search;`;
    try {
      const result2 = execSync$4(cmd, util$a.execOptsLinux).toString();
      const resultFormat = result2.replace(/\s+/g, " ").trim();
      const dnsSuffix = resultFormat.split(" ").slice(1).toString();
      return dnsSuffix == "--" ? "Not defined" : dnsSuffix;
    } catch (e) {
      return "Unknown";
    }
  } else {
    return "Unknown";
  }
}
function getLinuxIfaceIEEE8021xAuth(connectionName) {
  if (connectionName) {
    const cmd = `nmcli connection show "${connectionName}" 2>/dev/null | grep 802-1x.eap;`;
    try {
      const result2 = execSync$4(cmd, util$a.execOptsLinux).toString();
      const resultFormat = result2.replace(/\s+/g, " ").trim();
      const authenticationProtocol = resultFormat.split(" ").slice(1).toString();
      return authenticationProtocol == "--" ? "" : authenticationProtocol;
    } catch (e) {
      return "Not defined";
    }
  } else {
    return "Not defined";
  }
}
function getLinuxIfaceIEEE8021xState(authenticationProtocol) {
  if (authenticationProtocol) {
    if (authenticationProtocol == "Not defined") {
      return "Disabled";
    }
    return "Enabled";
  } else {
    return "Unknown";
  }
}
function testVirtualNic(iface, ifaceName, mac) {
  const virtualMacs = ["00:00:00:00:00:00", "00:03:FF", "00:05:69", "00:0C:29", "00:0F:4B", "00:13:07", "00:13:BE", "00:15:5d", "00:16:3E", "00:1C:42", "00:21:F6", "00:24:0B", "00:50:56", "00:A0:B1", "00:E0:C8", "08:00:27", "0A:00:27", "18:92:2C", "16:DF:49", "3C:F3:92", "54:52:00", "FC:15:97"];
  if (mac) {
    return virtualMacs.filter((item) => {
      return mac.toUpperCase().toUpperCase().startsWith(item.substring(0, mac.length));
    }).length > 0 || iface.toLowerCase().indexOf(" virtual ") > -1 || ifaceName.toLowerCase().indexOf(" virtual ") > -1 || iface.toLowerCase().indexOf("vethernet ") > -1 || ifaceName.toLowerCase().indexOf("vethernet ") > -1 || iface.toLowerCase().startsWith("veth") || ifaceName.toLowerCase().startsWith("veth") || iface.toLowerCase().startsWith("vboxnet") || ifaceName.toLowerCase().startsWith("vboxnet");
  } else {
    return false;
  }
}
function networkInterfaces(callback, rescan, defaultString) {
  if (typeof callback === "string") {
    defaultString = callback;
    rescan = true;
    callback = null;
  }
  if (typeof callback === "boolean") {
    rescan = callback;
    callback = null;
    defaultString = "";
  }
  if (typeof rescan === "undefined") {
    rescan = true;
  }
  defaultString = defaultString || "";
  defaultString = "" + defaultString;
  return new Promise((resolve) => {
    process.nextTick(() => {
      let ifaces = os$4.networkInterfaces();
      let result2 = [];
      let nics = [];
      let dnsSuffixes = [];
      let nics8021xInfo = [];
      if (_darwin$8 || _freebsd$7 || _openbsd$7 || _netbsd$7) {
        if (JSON.stringify(ifaces) === JSON.stringify(_ifaces) && !rescan) {
          result2 = _networkInterfaces;
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        } else {
          const defaultInterface = getDefaultNetworkInterface();
          _ifaces = JSON.parse(JSON.stringify(ifaces));
          nics = getDarwinNics();
          nics.forEach((nic) => {
            if ({}.hasOwnProperty.call(ifaces, nic.iface)) {
              ifaces[nic.iface].forEach(function(details) {
                if (details.family === "IPv4" || details.family === 4) {
                  nic.ip4subnet = details.netmask;
                }
                if (details.family === "IPv6" || details.family === 6) {
                  nic.ip6subnet = details.netmask;
                }
              });
            }
            let ifaceSanitized = "";
            const s = util$a.isPrototypePolluted() ? "---" : util$a.sanitizeShellString(nic.iface);
            const l = util$a.mathMin(s.length, 2e3);
            for (let i = 0; i <= l; i++) {
              if (s[i] !== void 0) {
                ifaceSanitized = ifaceSanitized + s[i];
              }
            }
            result2.push({
              iface: nic.iface,
              ifaceName: nic.iface,
              default: nic.iface === defaultInterface,
              ip4: nic.ip4,
              ip4subnet: nic.ip4subnet || "",
              ip6: nic.ip6,
              ip6subnet: nic.ip6subnet || "",
              mac: nic.mac,
              internal: nic.internal,
              virtual: nic.internal ? false : testVirtualNic(nic.iface, nic.iface, nic.mac),
              operstate: nic.operstate,
              type: nic.type,
              duplex: nic.duplex,
              mtu: nic.mtu,
              speed: nic.speed,
              dhcp: getDarwinIfaceDHCPstatus(ifaceSanitized),
              dnsSuffix: "",
              ieee8021xAuth: "",
              ieee8021xState: "",
              carrierChanges: 0
            });
          });
          _networkInterfaces = result2;
          if (defaultString.toLowerCase().indexOf("default") >= 0) {
            result2 = result2.filter((item) => item.default);
            if (result2.length > 0) {
              result2 = result2[0];
            } else {
              result2 = [];
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_linux$8) {
        if (JSON.stringify(ifaces) === JSON.stringify(_ifaces) && !rescan) {
          result2 = _networkInterfaces;
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        } else {
          _ifaces = JSON.parse(JSON.stringify(ifaces));
          _dhcpNics = getLinuxDHCPNics();
          const defaultInterface = getDefaultNetworkInterface();
          for (let dev in ifaces) {
            let ip4 = "";
            let ip4subnet = "";
            let ip6 = "";
            let ip6subnet = "";
            let mac = "";
            let duplex = "";
            let mtu = "";
            let speed = null;
            let carrierChanges = 0;
            let dhcp = false;
            let dnsSuffix = "";
            let ieee8021xAuth = "";
            let ieee8021xState = "";
            let type = "";
            if ({}.hasOwnProperty.call(ifaces, dev)) {
              let ifaceName = dev;
              ifaces[dev].forEach(function(details) {
                if (details.family === "IPv4" || details.family === 4) {
                  ip4 = details.address;
                  ip4subnet = details.netmask;
                }
                if (details.family === "IPv6" || details.family === 6) {
                  if (!ip6 || ip6.match(/^fe80::/i)) {
                    ip6 = details.address;
                    ip6subnet = details.netmask;
                  }
                }
                mac = details.mac;
                const nodeMainVersion = parseInt(process.versions.node.split("."), 10);
                if (mac.indexOf("00:00:0") > -1 && (_linux$8 || _darwin$8) && !details.internal && nodeMainVersion >= 8 && nodeMainVersion <= 11) {
                  if (Object.keys(_mac).length === 0) {
                    _mac = getMacAddresses();
                  }
                  mac = _mac[dev] || "";
                }
              });
              let iface = dev.split(":")[0].trim().toLowerCase();
              let ifaceSanitized = "";
              const s = util$a.isPrototypePolluted() ? "---" : util$a.sanitizeShellString(iface);
              const l = util$a.mathMin(s.length, 2e3);
              for (let i = 0; i <= l; i++) {
                if (s[i] !== void 0) {
                  ifaceSanitized = ifaceSanitized + s[i];
                }
              }
              const cmd = `echo -n "addr_assign_type: "; cat /sys/class/net/${ifaceSanitized}/addr_assign_type 2>/dev/null; echo;
            echo -n "address: "; cat /sys/class/net/${ifaceSanitized}/address 2>/dev/null; echo;
            echo -n "addr_len: "; cat /sys/class/net/${ifaceSanitized}/addr_len 2>/dev/null; echo;
            echo -n "broadcast: "; cat /sys/class/net/${ifaceSanitized}/broadcast 2>/dev/null; echo;
            echo -n "carrier: "; cat /sys/class/net/${ifaceSanitized}/carrier 2>/dev/null; echo;
            echo -n "carrier_changes: "; cat /sys/class/net/${ifaceSanitized}/carrier_changes 2>/dev/null; echo;
            echo -n "dev_id: "; cat /sys/class/net/${ifaceSanitized}/dev_id 2>/dev/null; echo;
            echo -n "dev_port: "; cat /sys/class/net/${ifaceSanitized}/dev_port 2>/dev/null; echo;
            echo -n "dormant: "; cat /sys/class/net/${ifaceSanitized}/dormant 2>/dev/null; echo;
            echo -n "duplex: "; cat /sys/class/net/${ifaceSanitized}/duplex 2>/dev/null; echo;
            echo -n "flags: "; cat /sys/class/net/${ifaceSanitized}/flags 2>/dev/null; echo;
            echo -n "gro_flush_timeout: "; cat /sys/class/net/${ifaceSanitized}/gro_flush_timeout 2>/dev/null; echo;
            echo -n "ifalias: "; cat /sys/class/net/${ifaceSanitized}/ifalias 2>/dev/null; echo;
            echo -n "ifindex: "; cat /sys/class/net/${ifaceSanitized}/ifindex 2>/dev/null; echo;
            echo -n "iflink: "; cat /sys/class/net/${ifaceSanitized}/iflink 2>/dev/null; echo;
            echo -n "link_mode: "; cat /sys/class/net/${ifaceSanitized}/link_mode 2>/dev/null; echo;
            echo -n "mtu: "; cat /sys/class/net/${ifaceSanitized}/mtu 2>/dev/null; echo;
            echo -n "netdev_group: "; cat /sys/class/net/${ifaceSanitized}/netdev_group 2>/dev/null; echo;
            echo -n "operstate: "; cat /sys/class/net/${ifaceSanitized}/operstate 2>/dev/null; echo;
            echo -n "proto_down: "; cat /sys/class/net/${ifaceSanitized}/proto_down 2>/dev/null; echo;
            echo -n "speed: "; cat /sys/class/net/${ifaceSanitized}/speed 2>/dev/null; echo;
            echo -n "tx_queue_len: "; cat /sys/class/net/${ifaceSanitized}/tx_queue_len 2>/dev/null; echo;
            echo -n "type: "; cat /sys/class/net/${ifaceSanitized}/type 2>/dev/null; echo;
            echo -n "wireless: "; cat /proc/net/wireless 2>/dev/null | grep ${ifaceSanitized}; echo;
            echo -n "wirelessspeed: "; iw dev ${ifaceSanitized} link 2>&1 | grep bitrate; echo;`;
              let lines = [];
              try {
                lines = execSync$4(cmd, util$a.execOptsLinux).toString().split("\n");
                const connectionName = getLinuxIfaceConnectionName(ifaceSanitized);
                dhcp = getLinuxIfaceDHCPstatus(ifaceSanitized, connectionName, _dhcpNics);
                dnsSuffix = getLinuxIfaceDNSsuffix(connectionName);
                ieee8021xAuth = getLinuxIfaceIEEE8021xAuth(connectionName);
                ieee8021xState = getLinuxIfaceIEEE8021xState(ieee8021xAuth);
              } catch (e) {
                util$a.noop();
              }
              duplex = util$a.getValue(lines, "duplex");
              duplex = duplex.startsWith("cat") ? "" : duplex;
              mtu = parseInt(util$a.getValue(lines, "mtu"), 10);
              let myspeed = parseInt(util$a.getValue(lines, "speed"), 10);
              speed = isNaN(myspeed) ? null : myspeed;
              let wirelessspeed = util$a.getValue(lines, "wirelessspeed").split("tx bitrate: ");
              if (speed === null && wirelessspeed.length === 2) {
                myspeed = parseFloat(wirelessspeed[1]);
                speed = isNaN(myspeed) ? null : myspeed;
              }
              carrierChanges = parseInt(util$a.getValue(lines, "carrier_changes"), 10);
              const operstate = util$a.getValue(lines, "operstate");
              type = operstate === "up" ? util$a.getValue(lines, "wireless").trim() ? "wireless" : "wired" : "unknown";
              if (ifaceSanitized === "lo" || ifaceSanitized.startsWith("bond")) {
                type = "virtual";
              }
              let internal2 = ifaces[dev] && ifaces[dev][0] ? ifaces[dev][0].internal : false;
              if (dev.toLowerCase().indexOf("loopback") > -1 || ifaceName.toLowerCase().indexOf("loopback") > -1) {
                internal2 = true;
              }
              const virtual = internal2 ? false : testVirtualNic(dev, ifaceName, mac);
              result2.push({
                iface: ifaceSanitized,
                ifaceName,
                default: iface === defaultInterface,
                ip4,
                ip4subnet,
                ip6,
                ip6subnet,
                mac,
                internal: internal2,
                virtual,
                operstate,
                type,
                duplex,
                mtu,
                speed,
                dhcp,
                dnsSuffix,
                ieee8021xAuth,
                ieee8021xState,
                carrierChanges
              });
            }
          }
          _networkInterfaces = result2;
          if (defaultString.toLowerCase().indexOf("default") >= 0) {
            result2 = result2.filter((item) => item.default);
            if (result2.length > 0) {
              result2 = result2[0];
            } else {
              result2 = [];
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_windows$9) {
        if (JSON.stringify(ifaces) === JSON.stringify(_ifaces) && !rescan) {
          result2 = _networkInterfaces;
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        } else {
          _ifaces = JSON.parse(JSON.stringify(ifaces));
          const defaultInterface = getDefaultNetworkInterface();
          getWindowsNics().then(function(nics2) {
            nics2.forEach((nic) => {
              let found = false;
              Object.keys(ifaces).forEach((key2) => {
                if (!found) {
                  ifaces[key2].forEach((value) => {
                    if (Object.keys(value).indexOf("mac") >= 0) {
                      found = value["mac"] === nic.mac;
                    }
                  });
                }
              });
              if (!found) {
                ifaces[nic.name] = [{ mac: nic.mac }];
              }
            });
            nics8021xInfo = getWindowsWiredProfilesInformation();
            dnsSuffixes = getWindowsDNSsuffixes();
            for (let dev in ifaces) {
              let ifaceSanitized = "";
              const s = util$a.isPrototypePolluted() ? "---" : util$a.sanitizeShellString(dev);
              const l = util$a.mathMin(s.length, 2e3);
              for (let i = 0; i <= l; i++) {
                if (s[i] !== void 0) {
                  ifaceSanitized = ifaceSanitized + s[i];
                }
              }
              let iface = dev;
              let ip4 = "";
              let ip4subnet = "";
              let ip6 = "";
              let ip6subnet = "";
              let mac = "";
              let duplex = "";
              let mtu = "";
              let speed = null;
              let carrierChanges = 0;
              let operstate = "down";
              let dhcp = false;
              let dnsSuffix = "";
              let ieee8021xAuth = "";
              let ieee8021xState = "";
              let type = "";
              if ({}.hasOwnProperty.call(ifaces, dev)) {
                let ifaceName = dev;
                ifaces[dev].forEach(function(details) {
                  if (details.family === "IPv4" || details.family === 4) {
                    ip4 = details.address;
                    ip4subnet = details.netmask;
                  }
                  if (details.family === "IPv6" || details.family === 6) {
                    if (!ip6 || ip6.match(/^fe80::/i)) {
                      ip6 = details.address;
                      ip6subnet = details.netmask;
                    }
                  }
                  mac = details.mac;
                  const nodeMainVersion = parseInt(process.versions.node.split("."), 10);
                  if (mac.indexOf("00:00:0") > -1 && (_linux$8 || _darwin$8) && !details.internal && nodeMainVersion >= 8 && nodeMainVersion <= 11) {
                    if (Object.keys(_mac).length === 0) {
                      _mac = getMacAddresses();
                    }
                    mac = _mac[dev] || "";
                  }
                });
                dnsSuffix = getWindowsIfaceDNSsuffix(dnsSuffixes.ifaces, ifaceSanitized);
                let foundFirst = false;
                nics2.forEach((detail) => {
                  if (detail.mac === mac && !foundFirst) {
                    iface = detail.iface || iface;
                    ifaceName = detail.name;
                    dhcp = detail.dhcp;
                    operstate = detail.operstate;
                    speed = operstate === "up" ? detail.speed : 0;
                    type = detail.type;
                    foundFirst = true;
                  }
                });
                if (dev.toLowerCase().indexOf("wlan") >= 0 || ifaceName.toLowerCase().indexOf("wlan") >= 0 || ifaceName.toLowerCase().indexOf("802.11n") >= 0 || ifaceName.toLowerCase().indexOf("wireless") >= 0 || ifaceName.toLowerCase().indexOf("wi-fi") >= 0 || ifaceName.toLowerCase().indexOf("wifi") >= 0) {
                  type = "wireless";
                }
                const IEEE8021x = getWindowsIEEE8021x(type, ifaceSanitized, nics8021xInfo);
                ieee8021xAuth = IEEE8021x.protocol;
                ieee8021xState = IEEE8021x.state;
                let internal2 = ifaces[dev] && ifaces[dev][0] ? ifaces[dev][0].internal : false;
                if (dev.toLowerCase().indexOf("loopback") > -1 || ifaceName.toLowerCase().indexOf("loopback") > -1) {
                  internal2 = true;
                }
                const virtual = internal2 ? false : testVirtualNic(dev, ifaceName, mac);
                result2.push({
                  iface,
                  ifaceName,
                  default: iface === defaultInterface,
                  ip4,
                  ip4subnet,
                  ip6,
                  ip6subnet,
                  mac,
                  internal: internal2,
                  virtual,
                  operstate,
                  type,
                  duplex,
                  mtu,
                  speed,
                  dhcp,
                  dnsSuffix,
                  ieee8021xAuth,
                  ieee8021xState,
                  carrierChanges
                });
              }
            }
            _networkInterfaces = result2;
            if (defaultString.toLowerCase().indexOf("default") >= 0) {
              result2 = result2.filter((item) => item.default);
              if (result2.length > 0) {
                result2 = result2[0];
              } else {
                result2 = [];
              }
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        }
      }
    });
  });
}
network.networkInterfaces = networkInterfaces;
function calcNetworkSpeed(iface, rx_bytes, tx_bytes, operstate, rx_dropped, rx_errors, tx_dropped, tx_errors) {
  let result2 = {
    iface,
    operstate,
    rx_bytes,
    rx_dropped,
    rx_errors,
    tx_bytes,
    tx_dropped,
    tx_errors,
    rx_sec: null,
    tx_sec: null,
    ms: 0
  };
  if (_network[iface] && _network[iface].ms) {
    result2.ms = Date.now() - _network[iface].ms;
    result2.rx_sec = rx_bytes - _network[iface].rx_bytes >= 0 ? (rx_bytes - _network[iface].rx_bytes) / (result2.ms / 1e3) : 0;
    result2.tx_sec = tx_bytes - _network[iface].tx_bytes >= 0 ? (tx_bytes - _network[iface].tx_bytes) / (result2.ms / 1e3) : 0;
    _network[iface].rx_bytes = rx_bytes;
    _network[iface].tx_bytes = tx_bytes;
    _network[iface].rx_sec = result2.rx_sec;
    _network[iface].tx_sec = result2.tx_sec;
    _network[iface].ms = Date.now();
    _network[iface].last_ms = result2.ms;
    _network[iface].operstate = operstate;
  } else {
    if (!_network[iface]) {
      _network[iface] = {};
    }
    _network[iface].rx_bytes = rx_bytes;
    _network[iface].tx_bytes = tx_bytes;
    _network[iface].rx_sec = null;
    _network[iface].tx_sec = null;
    _network[iface].ms = Date.now();
    _network[iface].last_ms = 0;
    _network[iface].operstate = operstate;
  }
  return result2;
}
function networkStats(ifaces, callback) {
  let ifacesArray = [];
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (util$a.isFunction(ifaces) && !callback) {
        callback = ifaces;
        ifacesArray = [getDefaultNetworkInterface()];
      } else {
        if (typeof ifaces !== "string" && ifaces !== void 0) {
          if (callback) {
            callback([]);
          }
          return resolve([]);
        }
        ifaces = ifaces || getDefaultNetworkInterface();
        try {
          ifaces.__proto__.toLowerCase = util$a.stringToLower;
          ifaces.__proto__.replace = util$a.stringReplace;
          ifaces.__proto__.toString = util$a.stringToString;
          ifaces.__proto__.substr = util$a.stringSubstr;
          ifaces.__proto__.substring = util$a.stringSubstring;
          ifaces.__proto__.trim = util$a.stringTrim;
          ifaces.__proto__.startsWith = util$a.stringStartWith;
        } catch (e) {
          Object.setPrototypeOf(ifaces, util$a.stringObj);
        }
        ifaces = ifaces.trim().toLowerCase().replace(/,+/g, "|");
        ifacesArray = ifaces.split("|");
      }
      const result2 = [];
      const workload = [];
      if (ifacesArray.length && ifacesArray[0].trim() === "*") {
        ifacesArray = [];
        networkInterfaces(false).then((allIFaces) => {
          for (let iface of allIFaces) {
            ifacesArray.push(iface.iface);
          }
          networkStats(ifacesArray.join(",")).then((result3) => {
            if (callback) {
              callback(result3);
            }
            resolve(result3);
          });
        });
      } else {
        for (let iface of ifacesArray) {
          workload.push(networkStatsSingle(iface.trim()));
        }
        if (workload.length) {
          Promise.all(
            workload
          ).then((data) => {
            if (callback) {
              callback(data);
            }
            resolve(data);
          });
        } else {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
function networkStatsSingle(iface) {
  function parseLinesWindowsPerfData(sections) {
    let perfData = [];
    for (let i in sections) {
      if ({}.hasOwnProperty.call(sections, i)) {
        if (sections[i].trim() !== "") {
          let lines = sections[i].trim().split("\r\n");
          perfData.push({
            name: util$a.getValue(lines, "Name", ":").replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase(),
            rx_bytes: parseInt(util$a.getValue(lines, "BytesReceivedPersec", ":"), 10),
            rx_errors: parseInt(util$a.getValue(lines, "PacketsReceivedErrors", ":"), 10),
            rx_dropped: parseInt(util$a.getValue(lines, "PacketsReceivedDiscarded", ":"), 10),
            tx_bytes: parseInt(util$a.getValue(lines, "BytesSentPersec", ":"), 10),
            tx_errors: parseInt(util$a.getValue(lines, "PacketsOutboundErrors", ":"), 10),
            tx_dropped: parseInt(util$a.getValue(lines, "PacketsOutboundDiscarded", ":"), 10)
          });
        }
      }
    }
    return perfData;
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      let ifaceSanitized = "";
      const s = util$a.isPrototypePolluted() ? "---" : util$a.sanitizeShellString(iface);
      const l = util$a.mathMin(s.length, 2e3);
      for (let i = 0; i <= l; i++) {
        if (s[i] !== void 0) {
          ifaceSanitized = ifaceSanitized + s[i];
        }
      }
      let result2 = {
        iface: ifaceSanitized,
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
      };
      let operstate = "unknown";
      let rx_bytes = 0;
      let tx_bytes = 0;
      let rx_dropped = 0;
      let rx_errors = 0;
      let tx_dropped = 0;
      let tx_errors = 0;
      let cmd, lines, stats;
      if (!_network[ifaceSanitized] || _network[ifaceSanitized] && !_network[ifaceSanitized].ms || _network[ifaceSanitized] && _network[ifaceSanitized].ms && Date.now() - _network[ifaceSanitized].ms >= 500) {
        if (_linux$8) {
          if (fs$2.existsSync("/sys/class/net/" + ifaceSanitized)) {
            cmd = "cat /sys/class/net/" + ifaceSanitized + "/operstate; cat /sys/class/net/" + ifaceSanitized + "/statistics/rx_bytes; cat /sys/class/net/" + ifaceSanitized + "/statistics/tx_bytes; cat /sys/class/net/" + ifaceSanitized + "/statistics/rx_dropped; cat /sys/class/net/" + ifaceSanitized + "/statistics/rx_errors; cat /sys/class/net/" + ifaceSanitized + "/statistics/tx_dropped; cat /sys/class/net/" + ifaceSanitized + "/statistics/tx_errors; ";
            exec$8(cmd, function(error, stdout) {
              if (!error) {
                lines = stdout.toString().split("\n");
                operstate = lines[0].trim();
                rx_bytes = parseInt(lines[1], 10);
                tx_bytes = parseInt(lines[2], 10);
                rx_dropped = parseInt(lines[3], 10);
                rx_errors = parseInt(lines[4], 10);
                tx_dropped = parseInt(lines[5], 10);
                tx_errors = parseInt(lines[6], 10);
                result2 = calcNetworkSpeed(ifaceSanitized, rx_bytes, tx_bytes, operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
              }
              resolve(result2);
            });
          } else {
            resolve(result2);
          }
        }
        if (_freebsd$7 || _openbsd$7 || _netbsd$7) {
          cmd = "netstat -ibndI " + ifaceSanitized;
          exec$8(cmd, function(error, stdout) {
            if (!error) {
              lines = stdout.toString().split("\n");
              for (let i = 1; i < lines.length; i++) {
                const line = lines[i].replace(/ +/g, " ").split(" ");
                if (line && line[0] && line[7] && line[10]) {
                  rx_bytes = rx_bytes + parseInt(line[7]);
                  if (line[6].trim() !== "-") {
                    rx_dropped = rx_dropped + parseInt(line[6]);
                  }
                  if (line[5].trim() !== "-") {
                    rx_errors = rx_errors + parseInt(line[5]);
                  }
                  tx_bytes = tx_bytes + parseInt(line[10]);
                  if (line[12].trim() !== "-") {
                    tx_dropped = tx_dropped + parseInt(line[12]);
                  }
                  if (line[9].trim() !== "-") {
                    tx_errors = tx_errors + parseInt(line[9]);
                  }
                  operstate = "up";
                }
              }
              result2 = calcNetworkSpeed(ifaceSanitized, rx_bytes, tx_bytes, operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
            }
            resolve(result2);
          });
        }
        if (_darwin$8) {
          cmd = "ifconfig " + ifaceSanitized + ' | grep "status"';
          exec$8(cmd, function(error, stdout) {
            result2.operstate = (stdout.toString().split(":")[1] || "").trim();
            result2.operstate = (result2.operstate || "").toLowerCase();
            result2.operstate = result2.operstate === "active" ? "up" : result2.operstate === "inactive" ? "down" : "unknown";
            cmd = "netstat -bdI " + ifaceSanitized;
            exec$8(cmd, function(error2, stdout2) {
              if (!error2) {
                lines = stdout2.toString().split("\n");
                if (lines.length > 1 && lines[1].trim() !== "") {
                  stats = lines[1].replace(/ +/g, " ").split(" ");
                  const offset = stats.length > 11 ? 1 : 0;
                  rx_bytes = parseInt(stats[offset + 5]);
                  rx_dropped = parseInt(stats[offset + 10]);
                  rx_errors = parseInt(stats[offset + 4]);
                  tx_bytes = parseInt(stats[offset + 8]);
                  tx_dropped = parseInt(stats[offset + 10]);
                  tx_errors = parseInt(stats[offset + 7]);
                  result2 = calcNetworkSpeed(ifaceSanitized, rx_bytes, tx_bytes, result2.operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
                }
              }
              resolve(result2);
            });
          });
        }
        if (_windows$9) {
          let perfData = [];
          let ifaceName = ifaceSanitized;
          util$a.powerShell("Get-CimInstance Win32_PerfRawData_Tcpip_NetworkInterface | select Name,BytesReceivedPersec,PacketsReceivedErrors,PacketsReceivedDiscarded,BytesSentPersec,PacketsOutboundErrors,PacketsOutboundDiscarded | fl").then((stdout, error) => {
            if (!error) {
              const psections = stdout.toString().split(/\n\s*\n/);
              perfData = parseLinesWindowsPerfData(psections);
            }
            networkInterfaces(false).then((interfaces) => {
              rx_bytes = 0;
              tx_bytes = 0;
              perfData.forEach((detail) => {
                interfaces.forEach((det) => {
                  if ((det.iface.toLowerCase() === ifaceSanitized.toLowerCase() || det.mac.toLowerCase() === ifaceSanitized.toLowerCase() || det.ip4.toLowerCase() === ifaceSanitized.toLowerCase() || det.ip6.toLowerCase() === ifaceSanitized.toLowerCase() || det.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === ifaceSanitized.replace(/[()[\] ]+/g, "").replace("#", "_").toLowerCase()) && det.ifaceName.replace(/[()[\] ]+/g, "").replace(/#|\//g, "_").toLowerCase() === detail.name) {
                    ifaceName = det.iface;
                    rx_bytes = detail.rx_bytes;
                    rx_dropped = detail.rx_dropped;
                    rx_errors = detail.rx_errors;
                    tx_bytes = detail.tx_bytes;
                    tx_dropped = detail.tx_dropped;
                    tx_errors = detail.tx_errors;
                    operstate = det.operstate;
                  }
                });
              });
              if (rx_bytes && tx_bytes) {
                result2 = calcNetworkSpeed(ifaceName, parseInt(rx_bytes), parseInt(tx_bytes), operstate, rx_dropped, rx_errors, tx_dropped, tx_errors);
              }
              resolve(result2);
            });
          });
        }
      } else {
        result2.rx_bytes = _network[ifaceSanitized].rx_bytes;
        result2.tx_bytes = _network[ifaceSanitized].tx_bytes;
        result2.rx_sec = _network[ifaceSanitized].rx_sec;
        result2.tx_sec = _network[ifaceSanitized].tx_sec;
        result2.ms = _network[ifaceSanitized].last_ms;
        result2.operstate = _network[ifaceSanitized].operstate;
        resolve(result2);
      }
    });
  });
}
network.networkStats = networkStats;
function getProcessName(processes2, pid) {
  let cmd = "";
  processes2.forEach((line) => {
    const parts = line.split(" ");
    const id = parseInt(parts[0], 10) || -1;
    if (id === pid) {
      parts.shift();
      cmd = parts.join(" ").split(":")[0];
    }
  });
  cmd = cmd.split(" -")[0];
  cmd = cmd.split(" /")[0];
  return cmd;
}
function networkConnections(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux$8 || _freebsd$7 || _openbsd$7 || _netbsd$7) {
        let cmd = 'export LC_ALL=C; netstat -tunap | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
        if (_freebsd$7 || _openbsd$7 || _netbsd$7) {
          cmd = 'export LC_ALL=C; netstat -na | grep "ESTABLISHED\\|SYN_SENT\\|SYN_RECV\\|FIN_WAIT1\\|FIN_WAIT2\\|TIME_WAIT\\|CLOSE\\|CLOSE_WAIT\\|LAST_ACK\\|LISTEN\\|CLOSING\\|UNKNOWN"; unset LC_ALL';
        }
        exec$8(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
          let lines = stdout.toString().split("\n");
          if (!error && (lines.length > 1 || lines[0] != "")) {
            lines.forEach(function(line) {
              line = line.replace(/ +/g, " ").split(" ");
              if (line.length >= 7) {
                let localip = line[3];
                let localport = "";
                let localaddress = line[3].split(":");
                if (localaddress.length > 1) {
                  localport = localaddress[localaddress.length - 1];
                  localaddress.pop();
                  localip = localaddress.join(":");
                }
                let peerip = line[4];
                let peerport = "";
                let peeraddress = line[4].split(":");
                if (peeraddress.length > 1) {
                  peerport = peeraddress[peeraddress.length - 1];
                  peeraddress.pop();
                  peerip = peeraddress.join(":");
                }
                let connstate = line[5];
                let proc = line[6].split("/");
                if (connstate) {
                  result2.push({
                    protocol: line[0],
                    localAddress: localip,
                    localPort: localport,
                    peerAddress: peerip,
                    peerPort: peerport,
                    state: connstate,
                    pid: proc[0] && proc[0] !== "-" ? parseInt(proc[0], 10) : null,
                    process: proc[1] ? proc[1].split(" ")[0].split(":")[0] : ""
                  });
                }
              }
            });
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          } else {
            cmd = 'ss -tunap | grep "ESTAB\\|SYN-SENT\\|SYN-RECV\\|FIN-WAIT1\\|FIN-WAIT2\\|TIME-WAIT\\|CLOSE\\|CLOSE-WAIT\\|LAST-ACK\\|LISTEN\\|CLOSING"';
            exec$8(cmd, { maxBuffer: 1024 * 2e4 }, function(error2, stdout2) {
              if (!error2) {
                let lines2 = stdout2.toString().split("\n");
                lines2.forEach(function(line) {
                  line = line.replace(/ +/g, " ").split(" ");
                  if (line.length >= 6) {
                    let localip = line[4];
                    let localport = "";
                    let localaddress = line[4].split(":");
                    if (localaddress.length > 1) {
                      localport = localaddress[localaddress.length - 1];
                      localaddress.pop();
                      localip = localaddress.join(":");
                    }
                    let peerip = line[5];
                    let peerport = "";
                    let peeraddress = line[5].split(":");
                    if (peeraddress.length > 1) {
                      peerport = peeraddress[peeraddress.length - 1];
                      peeraddress.pop();
                      peerip = peeraddress.join(":");
                    }
                    let connstate = line[1];
                    if (connstate === "ESTAB") {
                      connstate = "ESTABLISHED";
                    }
                    if (connstate === "TIME-WAIT") {
                      connstate = "TIME_WAIT";
                    }
                    let pid = null;
                    let process2 = "";
                    if (line.length >= 7 && line[6].indexOf("users:") > -1) {
                      let proc = line[6].replace('users:(("', "").replace(/"/g, "").split(",");
                      if (proc.length > 2) {
                        process2 = proc[0].split(" ")[0].split(":")[0];
                        pid = parseInt(proc[1], 10);
                      }
                    }
                    if (connstate) {
                      result2.push({
                        protocol: line[0],
                        localAddress: localip,
                        localPort: localport,
                        peerAddress: peerip,
                        peerPort: peerport,
                        state: connstate,
                        pid,
                        process: process2
                      });
                    }
                  }
                });
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          }
        });
      }
      if (_darwin$8) {
        let cmd = 'netstat -natvln | head -n2; netstat -natvln | grep "tcp4\\|tcp6\\|udp4\\|udp6"';
        const states = "ESTABLISHED|SYN_SENT|SYN_RECV|FIN_WAIT1|FIN_WAIT_1|FIN_WAIT2|FIN_WAIT_2|TIME_WAIT|CLOSE|CLOSE_WAIT|LAST_ACK|LISTEN|CLOSING|UNKNOWN".split("|");
        exec$8(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
          if (!error) {
            exec$8("ps -axo pid,command", { maxBuffer: 1024 * 2e4 }, function(err2, stdout2) {
              let processes2 = stdout2.toString().split("\n");
              processes2 = processes2.map((line) => {
                return line.trim().replace(/ +/g, " ");
              });
              let lines = stdout.toString().split("\n");
              lines.shift();
              let pidPos = 8;
              if (lines.length > 1 && lines[0].indexOf("pid") > 0) {
                const header = (lines.shift() || "").replace(/ Address/g, "_Address").replace(/ +/g, " ").split(" ");
                pidPos = header.indexOf("pid");
              }
              lines.forEach(function(line) {
                line = line.replace(/ +/g, " ").split(" ");
                if (line.length >= 8) {
                  let localip = line[3];
                  let localport = "";
                  let localaddress = line[3].split(".");
                  if (localaddress.length > 1) {
                    localport = localaddress[localaddress.length - 1];
                    localaddress.pop();
                    localip = localaddress.join(".");
                  }
                  let peerip = line[4];
                  let peerport = "";
                  let peeraddress = line[4].split(".");
                  if (peeraddress.length > 1) {
                    peerport = peeraddress[peeraddress.length - 1];
                    peeraddress.pop();
                    peerip = peeraddress.join(".");
                  }
                  const hasState = states.indexOf(line[5]) >= 0;
                  let connstate = hasState ? line[5] : "UNKNOWN";
                  let pid = parseInt(line[pidPos + (hasState ? 0 : -1)], 10);
                  if (connstate) {
                    result2.push({
                      protocol: line[0],
                      localAddress: localip,
                      localPort: localport,
                      peerAddress: peerip,
                      peerPort: peerport,
                      state: connstate,
                      pid,
                      process: getProcessName(processes2, pid)
                    });
                  }
                }
              });
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          }
        });
      }
      if (_windows$9) {
        let cmd = "netstat -nao";
        try {
          exec$8(cmd, util$a.execOptsWin, function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\r\n");
              lines.forEach(function(line) {
                line = line.trim().replace(/ +/g, " ").split(" ");
                if (line.length >= 4) {
                  let localip = line[1];
                  let localport = "";
                  let localaddress = line[1].split(":");
                  if (localaddress.length > 1) {
                    localport = localaddress[localaddress.length - 1];
                    localaddress.pop();
                    localip = localaddress.join(":");
                  }
                  localip = localip.replace(/\[/g, "").replace(/\]/g, "");
                  let peerip = line[2];
                  let peerport = "";
                  let peeraddress = line[2].split(":");
                  if (peeraddress.length > 1) {
                    peerport = peeraddress[peeraddress.length - 1];
                    peeraddress.pop();
                    peerip = peeraddress.join(":");
                  }
                  peerip = peerip.replace(/\[/g, "").replace(/\]/g, "");
                  let pid = util$a.toInt(line[4]);
                  let connstate = line[3];
                  if (connstate === "HERGESTELLT") {
                    connstate = "ESTABLISHED";
                  }
                  if (connstate.startsWith("ABH")) {
                    connstate = "LISTEN";
                  }
                  if (connstate === "SCHLIESSEN_WARTEN") {
                    connstate = "CLOSE_WAIT";
                  }
                  if (connstate === "WARTEND") {
                    connstate = "TIME_WAIT";
                  }
                  if (connstate === "SYN_GESENDET") {
                    connstate = "SYN_SENT";
                  }
                  if (connstate === "LISTENING") {
                    connstate = "LISTEN";
                  }
                  if (connstate === "SYN_RECEIVED") {
                    connstate = "SYN_RECV";
                  }
                  if (connstate === "FIN_WAIT_1") {
                    connstate = "FIN_WAIT1";
                  }
                  if (connstate === "FIN_WAIT_2") {
                    connstate = "FIN_WAIT2";
                  }
                  if (line[0].toLowerCase() !== "udp" && connstate) {
                    result2.push({
                      protocol: line[0].toLowerCase(),
                      localAddress: localip,
                      localPort: localport,
                      peerAddress: peerip,
                      peerPort: peerport,
                      state: connstate,
                      pid,
                      process: ""
                    });
                  } else if (line[0].toLowerCase() === "udp") {
                    result2.push({
                      protocol: line[0].toLowerCase(),
                      localAddress: localip,
                      localPort: localport,
                      peerAddress: peerip,
                      peerPort: peerport,
                      state: "",
                      pid: parseInt(line[3], 10),
                      process: ""
                    });
                  }
                }
              });
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
network.networkConnections = networkConnections;
function networkGatewayDefault(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = "";
      if (_linux$8 || _freebsd$7 || _openbsd$7 || _netbsd$7) {
        let cmd = "ip route get 1";
        try {
          exec$8(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
            if (!error) {
              let lines = stdout.toString().split("\n");
              const line = lines && lines[0] ? lines[0] : "";
              let parts = line.split(" via ");
              if (parts && parts[1]) {
                parts = parts[1].split(" ");
                result2 = parts[0];
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_darwin$8) {
        let cmd = "route -n get default";
        try {
          exec$8(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
            if (!error) {
              const lines = stdout.toString().split("\n").map((line) => line.trim());
              result2 = util$a.getValue(lines, "gateway");
            }
            if (!result2) {
              cmd = "netstat -rn | awk '/default/ {print $2}'";
              exec$8(cmd, { maxBuffer: 1024 * 2e4 }, function(error2, stdout2) {
                const lines = stdout2.toString().split("\n").map((line) => line.trim());
                result2 = lines.find((line) => /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(line));
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
      if (_windows$9) {
        try {
          exec$8("netstat -r", util$a.execOptsWin, function(error, stdout) {
            const lines = stdout.toString().split(os$4.EOL);
            lines.forEach((line) => {
              line = line.replace(/\s+/g, " ").trim();
              if (line.indexOf("0.0.0.0 0.0.0.0") > -1 && !/[a-zA-Z]/.test(line)) {
                const parts = line.split(" ");
                if (parts.length >= 5 && parts[parts.length - 3].indexOf(".") > -1) {
                  result2 = parts[parts.length - 3];
                }
              }
            });
            if (!result2) {
              util$a.powerShell("Get-CimInstance -ClassName Win32_IP4RouteTable | Where-Object { $_.Destination -eq '0.0.0.0' -and $_.Mask -eq '0.0.0.0' }").then((data) => {
                let lines2 = data.toString().split("\r\n");
                if (lines2.length > 1 && !result2) {
                  result2 = util$a.getValue(lines2, "NextHop");
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                }
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
network.networkGatewayDefault = networkGatewayDefault;
var wifi = {};
const os$3 = os$a;
const exec$7 = require$$1$1.exec;
const execSync$3 = require$$1$1.execSync;
const util$9 = util$j;
let _platform$8 = process.platform;
const _linux$7 = _platform$8 === "linux" || _platform$8 === "android";
const _darwin$7 = _platform$8 === "darwin";
const _windows$8 = _platform$8 === "win32";
function wifiDBFromQuality(quality) {
  const qual = parseFloat(quality);
  if (qual < 0) {
    return 0;
  }
  if (qual >= 100) {
    return -50;
  }
  return qual / 2 - 100;
}
function wifiQualityFromDB(db) {
  const result2 = 2 * (parseFloat(db) + 100);
  return result2 <= 100 ? result2 : 100;
}
const _wifi_frequencies = {
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
function wifiFrequencyFromChannel(channel) {
  return {}.hasOwnProperty.call(_wifi_frequencies, channel) ? _wifi_frequencies[channel] : null;
}
function wifiChannelFromFrequencs(frequency) {
  let channel = 0;
  for (let key2 in _wifi_frequencies) {
    if ({}.hasOwnProperty.call(_wifi_frequencies, key2)) {
      if (_wifi_frequencies[key2] === frequency) {
        channel = util$9.toInt(key2);
      }
    }
  }
  return channel;
}
function ifaceListLinux() {
  const result2 = [];
  const cmd = "iw dev 2>/dev/null";
  try {
    const all = execSync$3(cmd, util$9.execOptsLinux).toString().split("\n").map((line) => line.trim()).join("\n");
    const parts = all.split("\nInterface ");
    parts.shift();
    parts.forEach((ifaceDetails) => {
      const lines = ifaceDetails.split("\n");
      const iface = lines[0];
      const id = util$9.toInt(util$9.getValue(lines, "ifindex", " "));
      const mac = util$9.getValue(lines, "addr", " ");
      const channel = util$9.toInt(util$9.getValue(lines, "channel", " "));
      result2.push({
        id,
        iface,
        mac,
        channel
      });
    });
    return result2;
  } catch (e) {
    try {
      const all = execSync$3("nmcli -t -f general,wifi-properties,wired-properties,interface-flags,capabilities,nsp device show 2>/dev/null", util$9.execOptsLinux).toString();
      const parts = all.split("\n\n");
      let i = 1;
      parts.forEach((ifaceDetails) => {
        const lines = ifaceDetails.split("\n");
        const iface = util$9.getValue(lines, "GENERAL.DEVICE");
        const type = util$9.getValue(lines, "GENERAL.TYPE");
        const id = i++;
        const mac = util$9.getValue(lines, "GENERAL.HWADDR");
        const channel = "";
        if (type.toLowerCase() === "wifi") {
          result2.push({
            id,
            iface,
            mac,
            channel
          });
        }
      });
      return result2;
    } catch (e2) {
      return [];
    }
  }
}
function nmiDeviceLinux(iface) {
  const cmd = `nmcli -t -f general,wifi-properties,capabilities,ip4,ip6 device show ${iface} 2> /dev/null`;
  try {
    const lines = execSync$3(cmd, util$9.execOptsLinux).toString().split("\n");
    const ssid = util$9.getValue(lines, "GENERAL.CONNECTION");
    return {
      iface,
      type: util$9.getValue(lines, "GENERAL.TYPE"),
      vendor: util$9.getValue(lines, "GENERAL.VENDOR"),
      product: util$9.getValue(lines, "GENERAL.PRODUCT"),
      mac: util$9.getValue(lines, "GENERAL.HWADDR").toLowerCase(),
      ssid: ssid !== "--" ? ssid : null
    };
  } catch (e) {
    return {};
  }
}
function nmiConnectionLinux(ssid) {
  const cmd = `nmcli -t --show-secrets connection show ${ssid} 2>/dev/null`;
  try {
    const lines = execSync$3(cmd, util$9.execOptsLinux).toString().split("\n");
    const bssid = util$9.getValue(lines, "802-11-wireless.seen-bssids").toLowerCase();
    return {
      ssid: ssid !== "--" ? ssid : null,
      uuid: util$9.getValue(lines, "connection.uuid"),
      type: util$9.getValue(lines, "connection.type"),
      autoconnect: util$9.getValue(lines, "connection.autoconnect") === "yes",
      security: util$9.getValue(lines, "802-11-wireless-security.key-mgmt"),
      bssid: bssid !== "--" ? bssid : null
    };
  } catch (e) {
    return {};
  }
}
function wpaConnectionLinux(iface) {
  if (!iface) {
    return {};
  }
  const cmd = `wpa_cli -i ${iface} status 2>&1`;
  try {
    const lines = execSync$3(cmd, util$9.execOptsLinux).toString().split("\n");
    const freq = util$9.toInt(util$9.getValue(lines, "freq", "="));
    return {
      ssid: util$9.getValue(lines, "ssid", "="),
      uuid: util$9.getValue(lines, "uuid", "="),
      security: util$9.getValue(lines, "key_mgmt", "="),
      freq,
      channel: wifiChannelFromFrequencs(freq),
      bssid: util$9.getValue(lines, "bssid", "=").toLowerCase()
    };
  } catch (e) {
    return {};
  }
}
function getWifiNetworkListNmi() {
  const result2 = [];
  const cmd = "nmcli -t -m multiline --fields active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags device wifi list 2>/dev/null";
  try {
    const stdout = execSync$3(cmd, util$9.execOptsLinux);
    const parts = stdout.toString().split("ACTIVE:");
    parts.shift();
    parts.forEach((part) => {
      part = "ACTIVE:" + part;
      const lines = part.split(os$3.EOL);
      const channel = util$9.getValue(lines, "CHAN");
      const frequency = util$9.getValue(lines, "FREQ").toLowerCase().replace("mhz", "").trim();
      const security = util$9.getValue(lines, "SECURITY").replace("(", "").replace(")", "");
      const wpaFlags = util$9.getValue(lines, "WPA-FLAGS").replace("(", "").replace(")", "");
      const rsnFlags = util$9.getValue(lines, "RSN-FLAGS").replace("(", "").replace(")", "");
      const quality = util$9.getValue(lines, "SIGNAL");
      result2.push({
        ssid: util$9.getValue(lines, "SSID"),
        bssid: util$9.getValue(lines, "BSSID").toLowerCase(),
        mode: util$9.getValue(lines, "MODE"),
        channel: channel ? parseInt(channel, 10) : null,
        frequency: frequency ? parseInt(frequency, 10) : null,
        signalLevel: wifiDBFromQuality(quality),
        quality: quality ? parseInt(quality, 10) : null,
        security: security && security !== "none" ? security.split(" ") : [],
        wpaFlags: wpaFlags && wpaFlags !== "none" ? wpaFlags.split(" ") : [],
        rsnFlags: rsnFlags && rsnFlags !== "none" ? rsnFlags.split(" ") : []
      });
    });
    return result2;
  } catch (e) {
    return [];
  }
}
function getWifiNetworkListIw(iface) {
  const result2 = [];
  try {
    let iwlistParts = execSync$3(`export LC_ALL=C; iwlist ${iface} scan 2>&1; unset LC_ALL`, util$9.execOptsLinux).toString().split("        Cell ");
    if (iwlistParts[0].indexOf("resource busy") >= 0) {
      return -1;
    }
    if (iwlistParts.length > 1) {
      iwlistParts.shift();
      iwlistParts.forEach((element) => {
        const lines = element.split("\n");
        const channel = util$9.getValue(lines, "channel", ":", true);
        const address = lines && lines.length && lines[0].indexOf("Address:") >= 0 ? lines[0].split("Address:")[1].trim().toLowerCase() : "";
        const mode = util$9.getValue(lines, "mode", ":", true);
        const frequency = util$9.getValue(lines, "frequency", ":", true);
        const qualityString = util$9.getValue(lines, "Quality", "=", true);
        const dbParts = qualityString.toLowerCase().split("signal level=");
        const db = dbParts.length > 1 ? util$9.toInt(dbParts[1]) : 0;
        const quality = db ? wifiQualityFromDB(db) : 0;
        const ssid = util$9.getValue(lines, "essid", ":", true);
        const isWpa = element.indexOf(" WPA ") >= 0;
        const isWpa2 = element.indexOf("WPA2 ") >= 0;
        const security = [];
        if (isWpa) {
          security.push("WPA");
        }
        if (isWpa2) {
          security.push("WPA2");
        }
        const wpaFlags = [];
        let wpaFlag = "";
        lines.forEach(function(line) {
          const l = line.trim().toLowerCase();
          if (l.indexOf("group cipher") >= 0) {
            if (wpaFlag) {
              wpaFlags.push(wpaFlag);
            }
            const parts = l.split(":");
            if (parts.length > 1) {
              wpaFlag = parts[1].trim().toUpperCase();
            }
          }
          if (l.indexOf("pairwise cipher") >= 0) {
            const parts = l.split(":");
            if (parts.length > 1) {
              if (parts[1].indexOf("tkip")) {
                wpaFlag = wpaFlag ? "TKIP/" + wpaFlag : "TKIP";
              } else if (parts[1].indexOf("ccmp")) {
                wpaFlag = wpaFlag ? "CCMP/" + wpaFlag : "CCMP";
              } else if (parts[1].indexOf("proprietary")) {
                wpaFlag = wpaFlag ? "PROP/" + wpaFlag : "PROP";
              }
            }
          }
          if (l.indexOf("authentication suites") >= 0) {
            const parts = l.split(":");
            if (parts.length > 1) {
              if (parts[1].indexOf("802.1x")) {
                wpaFlag = wpaFlag ? "802.1x/" + wpaFlag : "802.1x";
              } else if (parts[1].indexOf("psk")) {
                wpaFlag = wpaFlag ? "PSK/" + wpaFlag : "PSK";
              }
            }
          }
        });
        if (wpaFlag) {
          wpaFlags.push(wpaFlag);
        }
        result2.push({
          ssid,
          bssid: address,
          mode,
          channel: channel ? util$9.toInt(channel) : null,
          frequency: frequency ? util$9.toInt(frequency.replace(".", "")) : null,
          signalLevel: db,
          quality,
          security,
          wpaFlags,
          rsnFlags: []
        });
      });
    }
    return result2;
  } catch (e) {
    return -1;
  }
}
function parseWifiDarwin(wifiStr) {
  const result2 = [];
  try {
    let wifiObj = JSON.parse(wifiStr);
    wifiObj = wifiObj.SPAirPortDataType[0].spairport_airport_interfaces[0].spairport_airport_other_local_wireless_networks;
    wifiObj.forEach(function(wifiItem) {
      let security = [];
      const sm = wifiItem.spairport_security_mode;
      if (sm === "spairport_security_mode_wep") {
        security.push("WEP");
      } else if (sm === "spairport_security_mode_wpa2_personal") {
        security.push("WPA2");
      } else if (sm.startsWith("spairport_security_mode_wpa2_enterprise")) {
        security.push("WPA2 EAP");
      } else if (sm.startsWith("pairport_security_mode_wpa3_transition")) {
        security.push("WPA2/WPA3");
      } else if (sm.startsWith("pairport_security_mode_wpa3")) {
        security.push("WPA3");
      }
      const channel = parseInt(("" + wifiItem.spairport_network_channel).split(" ")[0]) || 0;
      const signalLevel = wifiItem.spairport_signal_noise || null;
      result2.push({
        ssid: wifiItem._name || "",
        bssid: wifiItem.spairport_network_bssid || null,
        mode: wifiItem.spairport_network_phymode,
        channel,
        frequency: wifiFrequencyFromChannel(channel),
        signalLevel: signalLevel ? parseInt(signalLevel, 10) : null,
        quality: wifiQualityFromDB(signalLevel),
        security,
        wpaFlags: [],
        rsnFlags: []
      });
    });
    return result2;
  } catch (e) {
    return result2;
  }
}
function wifiNetworks(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux$7) {
        result2 = getWifiNetworkListNmi();
        if (result2.length === 0) {
          try {
            const iwconfigParts = execSync$3("export LC_ALL=C; iwconfig 2>/dev/null; unset LC_ALL", util$9.execOptsLinux).toString().split("\n\n");
            let iface = "";
            iwconfigParts.forEach((element) => {
              if (element.indexOf("no wireless") === -1 && element.trim() !== "") {
                iface = element.split(" ")[0];
              }
            });
            if (iface) {
              let ifaceSanitized = "";
              const s = util$9.isPrototypePolluted() ? "---" : util$9.sanitizeShellString(iface, true);
              const l = util$9.mathMin(s.length, 2e3);
              for (let i = 0; i <= l; i++) {
                if (s[i] !== void 0) {
                  ifaceSanitized = ifaceSanitized + s[i];
                }
              }
              const res = getWifiNetworkListIw(ifaceSanitized);
              if (res === -1) {
                setTimeout(function(iface2) {
                  const res2 = getWifiNetworkListIw(iface2);
                  if (res2 != -1) {
                    result2 = res2;
                  }
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                }, 4e3);
              } else {
                result2 = res;
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              }
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          } catch (e) {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        } else {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      } else if (_darwin$7) {
        let cmd = "system_profiler SPAirPortDataType -json 2>/dev/null";
        exec$7(cmd, { maxBuffer: 1024 * 4e4 }, function(error, stdout) {
          result2 = parseWifiDarwin(stdout.toString());
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } else if (_windows$8) {
        let cmd = "netsh wlan show networks mode=Bssid";
        util$9.powerShell(cmd).then((stdout) => {
          const ssidParts = stdout.toString("utf8").split(os$3.EOL + os$3.EOL + "SSID ");
          ssidParts.shift();
          ssidParts.forEach((ssidPart) => {
            const ssidLines = ssidPart.split(os$3.EOL);
            if (ssidLines && ssidLines.length >= 8 && ssidLines[0].indexOf(":") >= 0) {
              const bssidsParts = ssidPart.split(" BSSID");
              bssidsParts.shift();
              bssidsParts.forEach((bssidPart) => {
                const bssidLines = bssidPart.split(os$3.EOL);
                const bssidLine = bssidLines[0].split(":");
                bssidLine.shift();
                const bssid = bssidLine.join(":").trim().toLowerCase();
                const channel = bssidLines[3].split(":").pop().trim();
                const quality = bssidLines[1].split(":").pop().trim();
                result2.push({
                  ssid: ssidLines[0].split(":").pop().trim(),
                  bssid,
                  mode: "",
                  channel: channel ? parseInt(channel, 10) : null,
                  frequency: wifiFrequencyFromChannel(channel),
                  signalLevel: wifiDBFromQuality(quality),
                  quality: quality ? parseInt(quality, 10) : null,
                  security: [ssidLines[2].split(":").pop().trim()],
                  wpaFlags: [ssidLines[3].split(":").pop().trim()],
                  rsnFlags: []
                });
              });
            }
          });
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } else {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
wifi.wifiNetworks = wifiNetworks;
function getVendor(model) {
  model = model.toLowerCase();
  let result2 = "";
  if (model.indexOf("intel") >= 0) {
    result2 = "Intel";
  } else if (model.indexOf("realtek") >= 0) {
    result2 = "Realtek";
  } else if (model.indexOf("qualcom") >= 0) {
    result2 = "Qualcom";
  } else if (model.indexOf("broadcom") >= 0) {
    result2 = "Broadcom";
  } else if (model.indexOf("cavium") >= 0) {
    result2 = "Cavium";
  } else if (model.indexOf("cisco") >= 0) {
    result2 = "Cisco";
  } else if (model.indexOf("marvel") >= 0) {
    result2 = "Marvel";
  } else if (model.indexOf("zyxel") >= 0) {
    result2 = "Zyxel";
  } else if (model.indexOf("melanox") >= 0) {
    result2 = "Melanox";
  } else if (model.indexOf("d-link") >= 0) {
    result2 = "D-Link";
  } else if (model.indexOf("tp-link") >= 0) {
    result2 = "TP-Link";
  } else if (model.indexOf("asus") >= 0) {
    result2 = "Asus";
  } else if (model.indexOf("linksys") >= 0) {
    result2 = "Linksys";
  }
  return result2;
}
function wifiConnections(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      const result2 = [];
      if (_linux$7) {
        const ifaces = ifaceListLinux();
        const networkList = getWifiNetworkListNmi();
        ifaces.forEach((ifaceDetail) => {
          let ifaceSanitized = "";
          const s = util$9.isPrototypePolluted() ? "---" : util$9.sanitizeShellString(ifaceDetail.iface, true);
          const ll = util$9.mathMin(s.length, 2e3);
          for (let i = 0; i <= ll; i++) {
            if (s[i] !== void 0) {
              ifaceSanitized = ifaceSanitized + s[i];
            }
          }
          const nmiDetails = nmiDeviceLinux(ifaceSanitized);
          const wpaDetails = wpaConnectionLinux(ifaceSanitized);
          const ssid = nmiDetails.ssid || wpaDetails.ssid;
          const network2 = networkList.filter((nw) => nw.ssid === ssid);
          let ssidSanitized = "";
          const t = util$9.isPrototypePolluted() ? "---" : util$9.sanitizeShellString(ssid, true);
          const l = util$9.mathMin(t.length, 32);
          for (let i = 0; i <= l; i++) {
            if (t[i] !== void 0) {
              ssidSanitized = ssidSanitized + t[i];
            }
          }
          const nmiConnection = nmiConnectionLinux(ssidSanitized);
          const channel = network2 && network2.length && network2[0].channel ? network2[0].channel : wpaDetails.channel ? wpaDetails.channel : null;
          const bssid = network2 && network2.length && network2[0].bssid ? network2[0].bssid : wpaDetails.bssid ? wpaDetails.bssid : null;
          const signalLevel = network2 && network2.length && network2[0].signalLevel ? network2[0].signalLevel : null;
          if (ssid && bssid) {
            result2.push({
              id: ifaceDetail.id,
              iface: ifaceDetail.iface,
              model: nmiDetails.product,
              ssid,
              bssid: network2 && network2.length && network2[0].bssid ? network2[0].bssid : wpaDetails.bssid ? wpaDetails.bssid : null,
              channel,
              frequency: channel ? wifiFrequencyFromChannel(channel) : null,
              type: nmiConnection.type ? nmiConnection.type : "802.11",
              security: nmiConnection.security ? nmiConnection.security : wpaDetails.security ? wpaDetails.security : null,
              signalLevel,
              quality: wifiQualityFromDB(signalLevel),
              txRate: null
            });
          }
        });
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      } else if (_darwin$7) {
        let cmd = 'system_profiler SPNetworkDataType SPAirPortDataType -xml 2>/dev/null; echo "######" ; ioreg -n AppleBCMWLANSkywalkInterface -r 2>/dev/null';
        exec$7(cmd, function(error, stdout) {
          try {
            const parts = stdout.toString().split("######");
            const profilerObj = util$9.plistParser(parts[0]);
            const networkObj = profilerObj[0]._SPCommandLineArguments.indexOf("SPNetworkDataType") >= 0 ? profilerObj[0]._items : profilerObj[1]._items;
            const airportObj = profilerObj[0]._SPCommandLineArguments.indexOf("SPAirPortDataType") >= 0 ? profilerObj[0]._items[0].spairport_airport_interfaces : profilerObj[1]._items[0].spairport_airport_interfaces;
            let lines3 = [];
            if (parts[1].indexOf("  | {") > 0 && parts[1].indexOf("  | }") > parts[1].indexOf("  | {")) {
              lines3 = parts[1].split("  | {")[1].split("  | }")[0].replace(/ \| /g, "").replace(/"/g, "").split("\n");
            }
            const networkWifiObj = networkObj.find((item) => {
              return item._name === "Wi-Fi";
            });
            const airportWifiObj = airportObj[0].spairport_current_network_information;
            const channel = parseInt(("" + airportWifiObj.spairport_network_channel).split(" ")[0]) || 0;
            const signalLevel = airportWifiObj.spairport_signal_noise || null;
            let security = [];
            const sm = airportWifiObj.spairport_security_mode;
            if (sm === "spairport_security_mode_wep") {
              security.push("WEP");
            } else if (sm === "spairport_security_mode_wpa2_personal") {
              security.push("WPA2");
            } else if (sm.startsWith("spairport_security_mode_wpa2_enterprise")) {
              security.push("WPA2 EAP");
            } else if (sm.startsWith("pairport_security_mode_wpa3_transition")) {
              security.push("WPA2/WPA3");
            } else if (sm.startsWith("pairport_security_mode_wpa3")) {
              security.push("WPA3");
            }
            result2.push({
              id: networkWifiObj._name || "Wi-Fi",
              iface: networkWifiObj.interface || "",
              model: networkWifiObj.hardware || "",
              ssid: airportWifiObj._name || "",
              bssid: airportWifiObj.spairport_network_bssid || "",
              channel,
              frequency: channel ? wifiFrequencyFromChannel(channel) : null,
              type: airportWifiObj.spairport_network_phymode || "802.11",
              security,
              signalLevel: signalLevel ? parseInt(signalLevel, 10) : null,
              quality: wifiQualityFromDB(signalLevel),
              txRate: airportWifiObj.spairport_network_rate || null
            });
          } catch (e) {
            util$9.noop();
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } else if (_windows$8) {
        let cmd = "netsh wlan show interfaces";
        util$9.powerShell(cmd).then(function(stdout) {
          const allLines = stdout.toString().split("\r\n");
          for (let i = 0; i < allLines.length; i++) {
            allLines[i] = allLines[i].trim();
          }
          const parts = allLines.join("\r\n").split(":\r\n\r\n");
          parts.shift();
          parts.forEach((part) => {
            const lines = part.split("\r\n");
            if (lines.length >= 5) {
              const iface = lines[0].indexOf(":") >= 0 ? lines[0].split(":")[1].trim() : "";
              const model = lines[1].indexOf(":") >= 0 ? lines[1].split(":")[1].trim() : "";
              const id = lines[2].indexOf(":") >= 0 ? lines[2].split(":")[1].trim() : "";
              const ssid = util$9.getValue(lines, "SSID", ":", true);
              const bssid = util$9.getValue(lines, "BSSID", ":", true) || util$9.getValue(lines, "AP BSSID", ":", true);
              const quality = util$9.getValue(lines, "Signal", ":", true);
              const signalLevel = wifiDBFromQuality(quality);
              const type = util$9.getValue(lines, "Radio type", ":", true) || util$9.getValue(lines, "Type de radio", ":", true) || util$9.getValue(lines, "Funktyp", ":", true) || null;
              const security = util$9.getValue(lines, "authentication", ":", true) || util$9.getValue(lines, "Authentification", ":", true) || util$9.getValue(lines, "Authentifizierung", ":", true) || null;
              const channel = util$9.getValue(lines, "Channel", ":", true) || util$9.getValue(lines, "Canal", ":", true) || util$9.getValue(lines, "Kanal", ":", true) || null;
              const txRate = util$9.getValue(lines, "Transmit rate (mbps)", ":", true) || util$9.getValue(lines, "Transmission (mbit/s)", ":", true) || util$9.getValue(lines, "Empfangsrate (MBit/s)", ":", true) || null;
              if (model && id && ssid && bssid) {
                result2.push({
                  id,
                  iface,
                  model,
                  ssid,
                  bssid,
                  channel: util$9.toInt(channel),
                  frequency: channel ? wifiFrequencyFromChannel(channel) : null,
                  type,
                  security,
                  signalLevel,
                  quality: quality ? parseInt(quality, 10) : null,
                  txRate: util$9.toInt(txRate) || null
                });
              }
            }
          });
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } else {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
wifi.wifiConnections = wifiConnections;
function wifiInterfaces(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      const result2 = [];
      if (_linux$7) {
        const ifaces = ifaceListLinux();
        ifaces.forEach((ifaceDetail) => {
          const nmiDetails = nmiDeviceLinux(ifaceDetail.iface);
          result2.push({
            id: ifaceDetail.id,
            iface: ifaceDetail.iface,
            model: nmiDetails.product ? nmiDetails.product : null,
            vendor: nmiDetails.vendor ? nmiDetails.vendor : null,
            mac: ifaceDetail.mac
          });
        });
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      } else if (_darwin$7) {
        let cmd = "system_profiler SPNetworkDataType";
        exec$7(cmd, function(error, stdout) {
          const parts1 = stdout.toString().split("\n\n    Wi-Fi:\n\n");
          if (parts1.length > 1) {
            const lines = parts1[1].split("\n\n")[0].split("\n");
            const iface = util$9.getValue(lines, "BSD Device Name", ":", true);
            const mac = util$9.getValue(lines, "MAC Address", ":", true);
            const model = util$9.getValue(lines, "hardware", ":", true);
            result2.push({
              id: "Wi-Fi",
              iface,
              model,
              vendor: "",
              mac
            });
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } else if (_windows$8) {
        let cmd = "netsh wlan show interfaces";
        util$9.powerShell(cmd).then(function(stdout) {
          const allLines = stdout.toString().split("\r\n");
          for (let i = 0; i < allLines.length; i++) {
            allLines[i] = allLines[i].trim();
          }
          const parts = allLines.join("\r\n").split(":\r\n\r\n");
          parts.shift();
          parts.forEach((part) => {
            const lines = part.split("\r\n");
            if (lines.length >= 5) {
              const iface = lines[0].indexOf(":") >= 0 ? lines[0].split(":")[1].trim() : "";
              const model = lines[1].indexOf(":") >= 0 ? lines[1].split(":")[1].trim() : "";
              const id = lines[2].indexOf(":") >= 0 ? lines[2].split(":")[1].trim() : "";
              const macParts = lines[3].indexOf(":") >= 0 ? lines[3].split(":") : [];
              macParts.shift();
              const mac = macParts.join(":").trim();
              const vendor = getVendor(model);
              if (iface && model && id && mac) {
                result2.push({
                  id,
                  iface,
                  model,
                  vendor,
                  mac
                });
              }
            }
          });
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } else {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
wifi.wifiInterfaces = wifiInterfaces;
var processes$1 = {};
const os$2 = os$a;
const fs$1 = require$$1$2;
const path$1 = require$$2$1;
const exec$6 = require$$1$1.exec;
const execSync$2 = require$$1$1.execSync;
const util$8 = util$j;
let _platform$7 = process.platform;
const _linux$6 = _platform$7 === "linux" || _platform$7 === "android";
const _darwin$6 = _platform$7 === "darwin";
const _windows$7 = _platform$7 === "win32";
const _freebsd$6 = _platform$7 === "freebsd";
const _openbsd$6 = _platform$7 === "openbsd";
const _netbsd$6 = _platform$7 === "netbsd";
const _sunos$6 = _platform$7 === "sunos";
const _processes_cpu = {
  all: 0,
  all_utime: 0,
  all_stime: 0,
  list: {},
  ms: 0,
  result: {}
};
const _services_cpu = {
  all: 0,
  list: {},
  ms: 0,
  result: {}
};
const _process_cpu = {
  all: 0,
  all_utime: 0,
  all_stime: 0,
  list: {},
  ms: 0,
  result: {}
};
const _winStatusValues = {
  "0": "unknown",
  "1": "other",
  "2": "ready",
  "3": "running",
  "4": "blocked",
  "5": "suspended blocked",
  "6": "suspended ready",
  "7": "terminated",
  "8": "stopped",
  "9": "growing"
};
function parseTimeUnix(time2) {
  let result2 = time2;
  let parts = time2.replace(/ +/g, " ").split(" ");
  if (parts.length === 5) {
    result2 = parts[4] + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(parts[1].toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + parts[2]).slice(-2) + " " + parts[3];
  }
  return result2;
}
function parseElapsedTime(etime) {
  let current = /* @__PURE__ */ new Date();
  current = new Date(current.getTime() - current.getTimezoneOffset() * 6e4);
  const elapsed = etime.split("-");
  const timeIndex = elapsed.length - 1;
  const days = timeIndex > 0 ? parseInt(elapsed[timeIndex - 1]) : 0;
  const timeStr = elapsed[timeIndex].split(":");
  const hours = timeStr.length === 3 ? parseInt(timeStr[0] || 0) : 0;
  const mins = parseInt(timeStr[timeStr.length === 3 ? 1 : 0] || 0);
  const secs = parseInt(timeStr[timeStr.length === 3 ? 2 : 1] || 0);
  const ms = (((days * 24 + hours) * 60 + mins) * 60 + secs) * 1e3;
  let res = new Date(current.getTime());
  let result2 = res.toISOString().substring(0, 10) + " " + res.toISOString().substring(11, 19);
  try {
    res = new Date(current.getTime() - ms);
    result2 = res.toISOString().substring(0, 10) + " " + res.toISOString().substring(11, 19);
  } catch (e) {
    util$8.noop();
  }
  return result2;
}
function services(srv, callback) {
  if (util$8.isFunction(srv) && !callback) {
    callback = srv;
    srv = "";
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (typeof srv !== "string") {
        if (callback) {
          callback([]);
        }
        return resolve([]);
      }
      if (srv) {
        let srvString = "";
        try {
          srvString.__proto__.toLowerCase = util$8.stringToLower;
          srvString.__proto__.replace = util$8.stringReplace;
          srvString.__proto__.toString = util$8.stringToString;
          srvString.__proto__.substr = util$8.stringSubstr;
          srvString.__proto__.substring = util$8.stringSubstring;
          srvString.__proto__.trim = util$8.stringTrim;
          srvString.__proto__.startsWith = util$8.stringStartWith;
        } catch (e) {
          Object.setPrototypeOf(srvString, util$8.stringObj);
        }
        const s = util$8.sanitizeShellString(srv);
        const l = util$8.mathMin(s.length, 2e3);
        for (let i = 0; i <= l; i++) {
          if (s[i] !== void 0) {
            srvString = srvString + s[i];
          }
        }
        srvString = srvString.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|");
        if (srvString === "") {
          srvString = "*";
        }
        if (util$8.isPrototypePolluted() && srvString !== "*") {
          srvString = "------";
        }
        let srvs = srvString.split("|");
        let result2 = [];
        let dataSrv = [];
        if (_linux$6 || _freebsd$6 || _openbsd$6 || _netbsd$6 || _darwin$6) {
          if ((_linux$6 || _freebsd$6 || _openbsd$6 || _netbsd$6) && srvString === "*") {
            try {
              const tmpsrv = execSync$2("systemctl --all --type=service --no-legend 2> /dev/null", util$8.execOptsLinux).toString().split("\n");
              srvs = [];
              for (const s2 of tmpsrv) {
                const name = s2.split(".service")[0];
                if (name && s2.indexOf(" not-found ") === -1) {
                  srvs.push(name.trim());
                }
              }
              srvString = srvs.join("|");
            } catch (d) {
              try {
                srvString = "";
                const tmpsrv = execSync$2("service --status-all 2> /dev/null", util$8.execOptsLinux).toString().split("\n");
                for (const s2 of tmpsrv) {
                  const parts = s2.split("]");
                  if (parts.length === 2) {
                    srvString += (srvString !== "" ? "|" : "") + parts[1].trim();
                  }
                }
                srvs = srvString.split("|");
              } catch (e) {
                try {
                  const srvStr = execSync$2("ls /etc/init.d/ -m 2> /dev/null", util$8.execOptsLinux).toString().split("\n").join("");
                  srvString = "";
                  if (srvStr) {
                    const tmpsrv = srvStr.split(",");
                    for (const s2 of tmpsrv) {
                      const name = s2.trim();
                      if (name) {
                        srvString += (srvString !== "" ? "|" : "") + name;
                      }
                    }
                    srvs = srvString.split("|");
                  }
                } catch (f) {
                  srvString = "";
                  srvs = [];
                }
              }
            }
          }
          if (_darwin$6 && srvString === "*") {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
          let args = _darwin$6 ? ["-caxo", "pcpu,pmem,pid,command"] : ["-axo", "pcpu,pmem,pid,command"];
          if (srvString !== "" && srvs.length > 0) {
            util$8.execSafe("ps", args).then((stdout) => {
              if (stdout) {
                let lines = stdout.replace(/ +/g, " ").replace(/,+/g, ".").split("\n");
                srvs.forEach(function(srv2) {
                  let ps;
                  if (_darwin$6) {
                    ps = lines.filter(function(e) {
                      return e.toLowerCase().indexOf(srv2) !== -1;
                    });
                  } else {
                    ps = lines.filter(function(e) {
                      return e.toLowerCase().indexOf(" " + srv2.toLowerCase() + ":") !== -1 || e.toLowerCase().indexOf("/" + srv2.toLowerCase()) !== -1;
                    });
                  }
                  const pids = [];
                  for (const p of ps) {
                    const pid = p.trim().split(" ")[2];
                    if (pid) {
                      pids.push(parseInt(pid, 10));
                    }
                  }
                  result2.push({
                    name: srv2,
                    running: ps.length > 0,
                    startmode: "",
                    pids,
                    cpu: parseFloat(ps.reduce(function(pv, cv) {
                      return pv + parseFloat(cv.trim().split(" ")[0]);
                    }, 0).toFixed(2)),
                    mem: parseFloat(ps.reduce(function(pv, cv) {
                      return pv + parseFloat(cv.trim().split(" ")[1]);
                    }, 0).toFixed(2))
                  });
                });
                if (_linux$6) {
                  let cmd = 'cat /proc/stat | grep "cpu "';
                  for (let i in result2) {
                    for (let j in result2[i].pids) {
                      cmd += ";cat /proc/" + result2[i].pids[j] + "/stat";
                    }
                  }
                  exec$6(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout2) {
                    let curr_processes = stdout2.toString().split("\n");
                    let all = parseProcStat(curr_processes.shift());
                    let list_new = {};
                    let resultProcess = {};
                    curr_processes.forEach((element) => {
                      resultProcess = calcProcStatLinux(element, all, _services_cpu);
                      if (resultProcess.pid) {
                        let listPos = -1;
                        for (let i in result2) {
                          for (let j in result2[i].pids) {
                            if (parseInt(result2[i].pids[j]) === parseInt(resultProcess.pid)) {
                              listPos = i;
                            }
                          }
                        }
                        if (listPos >= 0) {
                          result2[listPos].cpu += resultProcess.cpuu + resultProcess.cpus;
                        }
                        list_new[resultProcess.pid] = {
                          cpuu: resultProcess.cpuu,
                          cpus: resultProcess.cpus,
                          utime: resultProcess.utime,
                          stime: resultProcess.stime,
                          cutime: resultProcess.cutime,
                          cstime: resultProcess.cstime
                        };
                      }
                    });
                    _services_cpu.all = all;
                    _services_cpu.list = Object.assign({}, list_new);
                    _services_cpu.ms = Date.now() - _services_cpu.ms;
                    _services_cpu.result = Object.assign({}, result2);
                    if (callback) {
                      callback(result2);
                    }
                    resolve(result2);
                  });
                } else {
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                }
              } else {
                args = ["-o", "comm"];
                util$8.execSafe("ps", args).then((stdout2) => {
                  if (stdout2) {
                    let lines = stdout2.replace(/ +/g, " ").replace(/,+/g, ".").split("\n");
                    srvs.forEach(function(srv2) {
                      let ps = lines.filter(function(e) {
                        return e.indexOf(srv2) !== -1;
                      });
                      result2.push({
                        name: srv2,
                        running: ps.length > 0,
                        startmode: "",
                        cpu: 0,
                        mem: 0
                      });
                    });
                    if (callback) {
                      callback(result2);
                    }
                    resolve(result2);
                  } else {
                    srvs.forEach(function(srv2) {
                      result2.push({
                        name: srv2,
                        running: false,
                        startmode: "",
                        cpu: 0,
                        mem: 0
                      });
                    });
                    if (callback) {
                      callback(result2);
                    }
                    resolve(result2);
                  }
                });
              }
            });
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        }
        if (_windows$7) {
          try {
            let wincommand = "Get-CimInstance Win32_Service";
            if (srvs[0] !== "*") {
              wincommand += ' -Filter "';
              srvs.forEach((srv2) => {
                wincommand += `Name='${srv2}' or `;
              });
              wincommand = `${wincommand.slice(0, -4)}"`;
            }
            wincommand += " | select Name,Caption,Started,StartMode,ProcessId | fl";
            util$8.powerShell(wincommand).then((stdout, error) => {
              if (!error) {
                let serviceSections = stdout.split(/\n\s*\n/);
                serviceSections.forEach((element) => {
                  if (element.trim() !== "") {
                    let lines = element.trim().split("\r\n");
                    let srvName = util$8.getValue(lines, "Name", ":", true).toLowerCase();
                    let srvCaption = util$8.getValue(lines, "Caption", ":", true).toLowerCase();
                    let started = util$8.getValue(lines, "Started", ":", true);
                    let startMode = util$8.getValue(lines, "StartMode", ":", true);
                    let pid = util$8.getValue(lines, "ProcessId", ":", true);
                    if (srvString === "*" || srvs.indexOf(srvName) >= 0 || srvs.indexOf(srvCaption) >= 0) {
                      result2.push({
                        name: srvName,
                        running: started.toLowerCase() === "true",
                        startmode: startMode,
                        pids: [pid],
                        cpu: 0,
                        mem: 0
                      });
                      dataSrv.push(srvName);
                      dataSrv.push(srvCaption);
                    }
                  }
                });
                if (srvString !== "*") {
                  let srvsMissing = srvs.filter(function(e) {
                    return dataSrv.indexOf(e) === -1;
                  });
                  srvsMissing.forEach(function(srvName) {
                    result2.push({
                      name: srvName,
                      running: false,
                      startmode: "",
                      pids: [],
                      cpu: 0,
                      mem: 0
                    });
                  });
                }
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              } else {
                srvs.forEach(function(srvName) {
                  result2.push({
                    name: srvName,
                    running: false,
                    startmode: "",
                    cpu: 0,
                    mem: 0
                  });
                });
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              }
            });
          } catch (e) {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        }
      } else {
        if (callback) {
          callback([]);
        }
        resolve([]);
      }
    });
  });
}
processes$1.services = services;
function parseProcStat(line) {
  let parts = line.replace(/ +/g, " ").split(" ");
  let user = parts.length >= 2 ? parseInt(parts[1]) : 0;
  let nice = parts.length >= 3 ? parseInt(parts[2]) : 0;
  let system2 = parts.length >= 4 ? parseInt(parts[3]) : 0;
  let idle = parts.length >= 5 ? parseInt(parts[4]) : 0;
  let iowait = parts.length >= 6 ? parseInt(parts[5]) : 0;
  let irq = parts.length >= 7 ? parseInt(parts[6]) : 0;
  let softirq = parts.length >= 8 ? parseInt(parts[7]) : 0;
  let steal = parts.length >= 9 ? parseInt(parts[8]) : 0;
  let guest = parts.length >= 10 ? parseInt(parts[9]) : 0;
  let guest_nice = parts.length >= 11 ? parseInt(parts[10]) : 0;
  return user + nice + system2 + idle + iowait + irq + softirq + steal + guest + guest_nice;
}
function calcProcStatLinux(line, all, _cpu_old) {
  let statparts = line.replace(/ +/g, " ").split(")");
  if (statparts.length >= 2) {
    let parts = statparts[1].split(" ");
    if (parts.length >= 16) {
      let pid = parseInt(statparts[0].split(" ")[0]);
      let utime = parseInt(parts[12]);
      let stime = parseInt(parts[13]);
      let cutime = parseInt(parts[14]);
      let cstime = parseInt(parts[15]);
      let cpuu = 0;
      let cpus = 0;
      if (_cpu_old.all > 0 && _cpu_old.list[pid]) {
        cpuu = (utime + cutime - _cpu_old.list[pid].utime - _cpu_old.list[pid].cutime) / (all - _cpu_old.all) * 100;
        cpus = (stime + cstime - _cpu_old.list[pid].stime - _cpu_old.list[pid].cstime) / (all - _cpu_old.all) * 100;
      } else {
        cpuu = (utime + cutime) / all * 100;
        cpus = (stime + cstime) / all * 100;
      }
      return {
        pid,
        utime,
        stime,
        cutime,
        cstime,
        cpuu,
        cpus
      };
    } else {
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
  } else {
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
}
function calcProcStatWin(procStat, all, _cpu_old) {
  let cpuu = 0;
  let cpus = 0;
  if (_cpu_old.all > 0 && _cpu_old.list[procStat.pid]) {
    cpuu = (procStat.utime - _cpu_old.list[procStat.pid].utime) / (all - _cpu_old.all) * 100;
    cpus = (procStat.stime - _cpu_old.list[procStat.pid].stime) / (all - _cpu_old.all) * 100;
  } else {
    cpuu = procStat.utime / all * 100;
    cpus = procStat.stime / all * 100;
  }
  return {
    pid: procStat.pid,
    utime: procStat.utime,
    stime: procStat.stime,
    cpuu: cpuu > 0 ? cpuu : 0,
    cpus: cpus > 0 ? cpus : 0
  };
}
function processes(callback) {
  let parsedhead = [];
  function getName(command) {
    command = command || "";
    let result2 = command.split(" ")[0];
    if (result2.substr(-1) === ":") {
      result2 = result2.substr(0, result2.length - 1);
    }
    if (result2.substr(0, 1) !== "[") {
      let parts = result2.split("/");
      if (isNaN(parseInt(parts[parts.length - 1]))) {
        result2 = parts[parts.length - 1];
      } else {
        result2 = parts[0];
      }
    }
    return result2;
  }
  function parseLine(line) {
    let offset = 0;
    let offset2 = 0;
    function checkColumn(i) {
      offset = offset2;
      if (parsedhead[i]) {
        offset2 = line.substring(parsedhead[i].to + offset, 1e4).indexOf(" ");
      } else {
        offset2 = 1e4;
      }
    }
    checkColumn(0);
    const pid = parseInt(line.substring(parsedhead[0].from + offset, parsedhead[0].to + offset2));
    checkColumn(1);
    const ppid = parseInt(line.substring(parsedhead[1].from + offset, parsedhead[1].to + offset2));
    checkColumn(2);
    const cpu2 = parseFloat(line.substring(parsedhead[2].from + offset, parsedhead[2].to + offset2).replace(/,/g, "."));
    checkColumn(3);
    const mem2 = parseFloat(line.substring(parsedhead[3].from + offset, parsedhead[3].to + offset2).replace(/,/g, "."));
    checkColumn(4);
    const priority = parseInt(line.substring(parsedhead[4].from + offset, parsedhead[4].to + offset2));
    checkColumn(5);
    const vsz = parseInt(line.substring(parsedhead[5].from + offset, parsedhead[5].to + offset2));
    checkColumn(6);
    const rss = parseInt(line.substring(parsedhead[6].from + offset, parsedhead[6].to + offset2));
    checkColumn(7);
    const nice = parseInt(line.substring(parsedhead[7].from + offset, parsedhead[7].to + offset2)) || 0;
    checkColumn(8);
    const started = !_sunos$6 ? parseElapsedTime(line.substring(parsedhead[8].from + offset, parsedhead[8].to + offset2).trim()) : parseTimeUnix(line.substring(parsedhead[8].from + offset, parsedhead[8].to + offset2).trim());
    checkColumn(9);
    let state = line.substring(parsedhead[9].from + offset, parsedhead[9].to + offset2).trim();
    state = state[0] === "R" ? "running" : state[0] === "S" ? "sleeping" : state[0] === "T" ? "stopped" : state[0] === "W" ? "paging" : state[0] === "X" ? "dead" : state[0] === "Z" ? "zombie" : state[0] === "D" || state[0] === "U" ? "blocked" : "unknown";
    checkColumn(10);
    let tty = line.substring(parsedhead[10].from + offset, parsedhead[10].to + offset2).trim();
    if (tty === "?" || tty === "??") {
      tty = "";
    }
    checkColumn(11);
    const user = line.substring(parsedhead[11].from + offset, parsedhead[11].to + offset2).trim();
    checkColumn(12);
    let cmdPath = "";
    let command = "";
    let params = "";
    let fullcommand = line.substring(parsedhead[12].from + offset, parsedhead[12].to + offset2).trim();
    if (fullcommand.substr(fullcommand.length - 1) === "]") {
      fullcommand = fullcommand.slice(0, -1);
    }
    if (fullcommand.substr(0, 1) === "[") {
      command = fullcommand.substring(1);
    } else {
      const p1 = fullcommand.indexOf("(");
      const p2 = fullcommand.indexOf(")");
      const p3 = fullcommand.indexOf("/");
      const p4 = fullcommand.indexOf(":");
      if (p1 < p2 && p1 < p3 && p3 < p2) {
        command = fullcommand.split(" ")[0];
        command = command.replace(/:/g, "");
      } else {
        if (p4 > 0 && (p3 === -1 || p3 > 3)) {
          command = fullcommand.split(" ")[0];
          command = command.replace(/:/g, "");
        } else {
          let firstParamPos = fullcommand.indexOf(" -");
          let firstParamPathPos = fullcommand.indexOf(" /");
          firstParamPos = firstParamPos >= 0 ? firstParamPos : 1e4;
          firstParamPathPos = firstParamPathPos >= 0 ? firstParamPathPos : 1e4;
          const firstPos = Math.min(firstParamPos, firstParamPathPos);
          let tmpCommand = fullcommand.substr(0, firstPos);
          const tmpParams = fullcommand.substr(firstPos);
          const lastSlashPos = tmpCommand.lastIndexOf("/");
          if (lastSlashPos >= 0) {
            cmdPath = tmpCommand.substr(0, lastSlashPos);
            tmpCommand = tmpCommand.substr(lastSlashPos + 1);
          }
          if (firstPos === 1e4 && tmpCommand.indexOf(" ") > -1) {
            const parts = tmpCommand.split(" ");
            if (fs$1.existsSync(path$1.join(cmdPath, parts[0]))) {
              command = parts.shift();
              params = (parts.join(" ") + " " + tmpParams).trim();
            } else {
              command = tmpCommand.trim();
              params = tmpParams.trim();
            }
          } else {
            command = tmpCommand.trim();
            params = tmpParams.trim();
          }
        }
      }
    }
    return {
      pid,
      parentPid: ppid,
      name: _linux$6 ? getName(command) : command,
      cpu: cpu2,
      cpuu: 0,
      cpus: 0,
      mem: mem2,
      priority,
      memVsz: vsz,
      memRss: rss,
      nice,
      started,
      state,
      tty,
      user,
      command,
      params,
      path: cmdPath
    };
  }
  function parseProcesses(lines) {
    let result2 = [];
    if (lines.length > 1) {
      let head = lines[0];
      parsedhead = util$8.parseHead(head, 8);
      lines.shift();
      lines.forEach(function(line) {
        if (line.trim() !== "") {
          result2.push(parseLine(line));
        }
      });
    }
    return result2;
  }
  function parseProcesses2(lines) {
    function formatDateTime(time2) {
      const month = ("0" + (time2.getMonth() + 1).toString()).slice(-2);
      const year = time2.getFullYear().toString();
      const day = ("0" + time2.getDate().toString()).slice(-2);
      const hours = ("0" + time2.getHours().toString()).slice(-2);
      const mins = ("0" + time2.getMinutes().toString()).slice(-2);
      const secs = ("0" + time2.getSeconds().toString()).slice(-2);
      return year + "-" + month + "-" + day + " " + hours + ":" + mins + ":" + secs;
    }
    function parseElapsed(etime) {
      let started = "";
      if (etime.indexOf("d") >= 0) {
        const elapsed_parts = etime.split("d");
        started = formatDateTime(new Date(Date.now() - (elapsed_parts[0] * 24 + elapsed_parts[1] * 1) * 60 * 60 * 1e3));
      } else if (etime.indexOf("h") >= 0) {
        const elapsed_parts = etime.split("h");
        started = formatDateTime(new Date(Date.now() - (elapsed_parts[0] * 60 + elapsed_parts[1] * 1) * 60 * 1e3));
      } else if (etime.indexOf(":") >= 0) {
        const elapsed_parts = etime.split(":");
        started = formatDateTime(new Date(Date.now() - (elapsed_parts.length > 1 ? (elapsed_parts[0] * 60 + elapsed_parts[1]) * 1e3 : elapsed_parts[0] * 1e3)));
      }
      return started;
    }
    let result2 = [];
    lines.forEach(function(line) {
      if (line.trim() !== "") {
        line = line.trim().replace(/ +/g, " ").replace(/,+/g, ".");
        const parts = line.split(" ");
        const command = parts.slice(9).join(" ");
        const pmem = parseFloat((1 * parseInt(parts[3]) * 1024 / os$2.totalmem()).toFixed(1));
        const started = parseElapsed(parts[5]);
        result2.push({
          pid: parseInt(parts[0]),
          parentPid: parseInt(parts[1]),
          name: getName(command),
          cpu: 0,
          cpuu: 0,
          cpus: 0,
          mem: pmem,
          priority: 0,
          memVsz: parseInt(parts[2]),
          memRss: parseInt(parts[3]),
          nice: parseInt(parts[4]),
          started,
          state: parts[6] === "R" ? "running" : parts[6] === "S" ? "sleeping" : parts[6] === "T" ? "stopped" : parts[6] === "W" ? "paging" : parts[6] === "X" ? "dead" : parts[6] === "Z" ? "zombie" : parts[6] === "D" || parts[6] === "U" ? "blocked" : "unknown",
          tty: parts[7],
          user: parts[8],
          command
        });
      }
    });
    return result2;
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        all: 0,
        running: 0,
        blocked: 0,
        sleeping: 0,
        unknown: 0,
        list: []
      };
      let cmd = "";
      if (_processes_cpu.ms && Date.now() - _processes_cpu.ms >= 500 || _processes_cpu.ms === 0) {
        if (_linux$6 || _freebsd$6 || _openbsd$6 || _netbsd$6 || _darwin$6 || _sunos$6) {
          if (_linux$6) {
            cmd = "export LC_ALL=C; ps -axo pid:11,ppid:11,pcpu:6,pmem:6,pri:5,vsz:11,rss:11,ni:5,etime:30,state:5,tty:15,user:20,command; unset LC_ALL";
          }
          if (_freebsd$6 || _openbsd$6 || _netbsd$6) {
            cmd = "export LC_ALL=C; ps -axo pid,ppid,pcpu,pmem,pri,vsz,rss,ni,etime,state,tty,user,command; unset LC_ALL";
          }
          if (_darwin$6) {
            cmd = "ps -axo pid,ppid,pcpu,pmem,pri,vsz=temp_title_1,rss=temp_title_2,nice,etime=temp_title_3,state,tty,user,command -r";
          }
          if (_sunos$6) {
            cmd = "ps -Ao pid,ppid,pcpu,pmem,pri,vsz,rss,nice,stime,s,tty,user,comm";
          }
          exec$6(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout) {
            if (!error && stdout.toString().trim()) {
              result2.list = parseProcesses(stdout.toString().split("\n")).slice();
              result2.all = result2.list.length;
              result2.running = result2.list.filter(function(e) {
                return e.state === "running";
              }).length;
              result2.blocked = result2.list.filter(function(e) {
                return e.state === "blocked";
              }).length;
              result2.sleeping = result2.list.filter(function(e) {
                return e.state === "sleeping";
              }).length;
              if (_linux$6) {
                cmd = 'cat /proc/stat | grep "cpu "';
                result2.list.forEach((element) => {
                  cmd += ";cat /proc/" + element.pid + "/stat";
                });
                exec$6(cmd, { maxBuffer: 1024 * 2e4 }, function(error2, stdout2) {
                  let curr_processes = stdout2.toString().split("\n");
                  let all = parseProcStat(curr_processes.shift());
                  let list_new = {};
                  let resultProcess = {};
                  curr_processes.forEach((element) => {
                    resultProcess = calcProcStatLinux(element, all, _processes_cpu);
                    if (resultProcess.pid) {
                      let listPos = result2.list.map(function(e) {
                        return e.pid;
                      }).indexOf(resultProcess.pid);
                      if (listPos >= 0) {
                        result2.list[listPos].cpu = resultProcess.cpuu + resultProcess.cpus;
                        result2.list[listPos].cpuu = resultProcess.cpuu;
                        result2.list[listPos].cpus = resultProcess.cpus;
                      }
                      list_new[resultProcess.pid] = {
                        cpuu: resultProcess.cpuu,
                        cpus: resultProcess.cpus,
                        utime: resultProcess.utime,
                        stime: resultProcess.stime,
                        cutime: resultProcess.cutime,
                        cstime: resultProcess.cstime
                      };
                    }
                  });
                  _processes_cpu.all = all;
                  _processes_cpu.list = Object.assign({}, list_new);
                  _processes_cpu.ms = Date.now() - _processes_cpu.ms;
                  _processes_cpu.result = Object.assign({}, result2);
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                });
              } else {
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              }
            } else {
              cmd = "ps -o pid,ppid,vsz,rss,nice,etime,stat,tty,user,comm";
              if (_sunos$6) {
                cmd = "ps -o pid,ppid,vsz,rss,nice,etime,s,tty,user,comm";
              }
              exec$6(cmd, { maxBuffer: 1024 * 2e4 }, function(error2, stdout2) {
                if (!error2) {
                  let lines = stdout2.toString().split("\n");
                  lines.shift();
                  result2.list = parseProcesses2(lines).slice();
                  result2.all = result2.list.length;
                  result2.running = result2.list.filter(function(e) {
                    return e.state === "running";
                  }).length;
                  result2.blocked = result2.list.filter(function(e) {
                    return e.state === "blocked";
                  }).length;
                  result2.sleeping = result2.list.filter(function(e) {
                    return e.state === "sleeping";
                  }).length;
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                } else {
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                }
              });
            }
          });
        } else if (_windows$7) {
          try {
            util$8.powerShell('Get-CimInstance Win32_Process | select-Object ProcessId,ParentProcessId,ExecutionState,Caption,CommandLine,ExecutablePath,UserModeTime,KernelModeTime,WorkingSetSize,Priority,PageFileUsage, @{n="CreationDate";e={$_.CreationDate.ToString("yyyy-MM-dd HH:mm:ss")}} | fl').then((stdout, error) => {
              if (!error) {
                let processSections = stdout.split(/\n\s*\n/);
                let procs = [];
                let procStats = [];
                let list_new = {};
                let allcpuu = 0;
                let allcpus = 0;
                processSections.forEach((element) => {
                  if (element.trim() !== "") {
                    let lines = element.trim().split("\r\n");
                    let pid = parseInt(util$8.getValue(lines, "ProcessId", ":", true), 10);
                    let parentPid = parseInt(util$8.getValue(lines, "ParentProcessId", ":", true), 10);
                    let statusValue = util$8.getValue(lines, "ExecutionState", ":");
                    let name = util$8.getValue(lines, "Caption", ":", true);
                    let commandLine = util$8.getValue(lines, "CommandLine", ":", true);
                    let additionalCommand = false;
                    lines.forEach((line) => {
                      if (additionalCommand && line.toLowerCase().startsWith(" ")) {
                        commandLine += " " + line.trim();
                      } else {
                        additionalCommand = false;
                      }
                      if (line.toLowerCase().startsWith("commandline")) {
                        additionalCommand = true;
                      }
                    });
                    let commandPath = util$8.getValue(lines, "ExecutablePath", ":", true);
                    let utime = parseInt(util$8.getValue(lines, "UserModeTime", ":", true), 10);
                    let stime = parseInt(util$8.getValue(lines, "KernelModeTime", ":", true), 10);
                    let memw = parseInt(util$8.getValue(lines, "WorkingSetSize", ":", true), 10);
                    allcpuu = allcpuu + utime;
                    allcpus = allcpus + stime;
                    result2.all++;
                    if (!statusValue) {
                      result2.unknown++;
                    }
                    if (statusValue === "3") {
                      result2.running++;
                    }
                    if (statusValue === "4" || statusValue === "5") {
                      result2.blocked++;
                    }
                    procStats.push({
                      pid,
                      utime,
                      stime,
                      cpu: 0,
                      cpuu: 0,
                      cpus: 0
                    });
                    procs.push({
                      pid,
                      parentPid,
                      name,
                      cpu: 0,
                      cpuu: 0,
                      cpus: 0,
                      mem: memw / os$2.totalmem() * 100,
                      priority: parseInt(util$8.getValue(lines, "Priority", ":", true), 10),
                      memVsz: parseInt(util$8.getValue(lines, "PageFileUsage", ":", true), 10),
                      memRss: Math.floor(parseInt(util$8.getValue(lines, "WorkingSetSize", ":", true), 10) / 1024),
                      nice: 0,
                      started: util$8.getValue(lines, "CreationDate", ":", true),
                      state: !statusValue ? _winStatusValues[0] : _winStatusValues[statusValue],
                      tty: "",
                      user: "",
                      command: commandLine || name,
                      path: commandPath,
                      params: ""
                    });
                  }
                });
                result2.sleeping = result2.all - result2.running - result2.blocked - result2.unknown;
                result2.list = procs;
                procStats.forEach((element) => {
                  let resultProcess = calcProcStatWin(element, allcpuu + allcpus, _processes_cpu);
                  let listPos = result2.list.map(function(e) {
                    return e.pid;
                  }).indexOf(resultProcess.pid);
                  if (listPos >= 0) {
                    result2.list[listPos].cpu = resultProcess.cpuu + resultProcess.cpus;
                    result2.list[listPos].cpuu = resultProcess.cpuu;
                    result2.list[listPos].cpus = resultProcess.cpus;
                  }
                  list_new[resultProcess.pid] = {
                    cpuu: resultProcess.cpuu,
                    cpus: resultProcess.cpus,
                    utime: resultProcess.utime,
                    stime: resultProcess.stime
                  };
                });
                _processes_cpu.all = allcpuu + allcpus;
                _processes_cpu.all_utime = allcpuu;
                _processes_cpu.all_stime = allcpus;
                _processes_cpu.list = Object.assign({}, list_new);
                _processes_cpu.ms = Date.now() - _processes_cpu.ms;
                _processes_cpu.result = Object.assign({}, result2);
              }
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            });
          } catch (e) {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        } else {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      } else {
        if (callback) {
          callback(_processes_cpu.result);
        }
        resolve(_processes_cpu.result);
      }
    });
  });
}
processes$1.processes = processes;
function processLoad(proc, callback) {
  if (util$8.isFunction(proc) && !callback) {
    callback = proc;
    proc = "";
  }
  return new Promise((resolve) => {
    process.nextTick(() => {
      proc = proc || "";
      if (typeof proc !== "string") {
        if (callback) {
          callback([]);
        }
        return resolve([]);
      }
      let processesString = "";
      try {
        processesString.__proto__.toLowerCase = util$8.stringToLower;
        processesString.__proto__.replace = util$8.stringReplace;
        processesString.__proto__.toString = util$8.stringToString;
        processesString.__proto__.substr = util$8.stringSubstr;
        processesString.__proto__.substring = util$8.stringSubstring;
        processesString.__proto__.trim = util$8.stringTrim;
        processesString.__proto__.startsWith = util$8.stringStartWith;
      } catch (e) {
        Object.setPrototypeOf(processesString, util$8.stringObj);
      }
      const s = util$8.sanitizeShellString(proc);
      const l = util$8.mathMin(s.length, 2e3);
      for (let i = 0; i <= l; i++) {
        if (s[i] !== void 0) {
          processesString = processesString + s[i];
        }
      }
      processesString = processesString.trim().toLowerCase().replace(/, /g, "|").replace(/,+/g, "|");
      if (processesString === "") {
        processesString = "*";
      }
      if (util$8.isPrototypePolluted() && processesString !== "*") {
        processesString = "------";
      }
      let processes2 = processesString.split("|");
      let result2 = [];
      const procSanitized = util$8.isPrototypePolluted() ? "" : util$8.sanitizeShellString(proc) || "*";
      if (procSanitized && processes2.length && processes2[0] !== "------") {
        if (_windows$7) {
          try {
            util$8.powerShell("Get-CimInstance Win32_Process | select ProcessId,Caption,UserModeTime,KernelModeTime,WorkingSetSize | fl").then((stdout, error) => {
              if (!error) {
                let processSections = stdout.split(/\n\s*\n/);
                let procStats = [];
                let list_new = {};
                let allcpuu = 0;
                let allcpus = 0;
                processSections.forEach((element) => {
                  if (element.trim() !== "") {
                    let lines = element.trim().split("\r\n");
                    let pid = parseInt(util$8.getValue(lines, "ProcessId", ":", true), 10);
                    let name = util$8.getValue(lines, "Caption", ":", true);
                    let utime = parseInt(util$8.getValue(lines, "UserModeTime", ":", true), 10);
                    let stime = parseInt(util$8.getValue(lines, "KernelModeTime", ":", true), 10);
                    let mem2 = parseInt(util$8.getValue(lines, "WorkingSetSize", ":", true), 10);
                    allcpuu = allcpuu + utime;
                    allcpus = allcpus + stime;
                    procStats.push({
                      pid,
                      name,
                      utime,
                      stime,
                      cpu: 0,
                      cpuu: 0,
                      cpus: 0,
                      mem: mem2
                    });
                    let pname = "";
                    let inList = false;
                    processes2.forEach(function(proc2) {
                      if (name.toLowerCase().indexOf(proc2.toLowerCase()) >= 0 && !inList) {
                        inList = true;
                        pname = proc2;
                      }
                    });
                    if (processesString === "*" || inList) {
                      let processFound = false;
                      result2.forEach(function(item) {
                        if (item.proc.toLowerCase() === pname.toLowerCase()) {
                          item.pids.push(pid);
                          item.mem += mem2 / os$2.totalmem() * 100;
                          processFound = true;
                        }
                      });
                      if (!processFound) {
                        result2.push({
                          proc: pname,
                          pid,
                          pids: [pid],
                          cpu: 0,
                          mem: mem2 / os$2.totalmem() * 100
                        });
                      }
                    }
                  }
                });
                if (processesString !== "*") {
                  let processesMissing = processes2.filter(function(name) {
                    return procStats.filter(function(item) {
                      return item.name.toLowerCase().indexOf(name) >= 0;
                    }).length === 0;
                  });
                  processesMissing.forEach(function(procName) {
                    result2.push({
                      proc: procName,
                      pid: null,
                      pids: [],
                      cpu: 0,
                      mem: 0
                    });
                  });
                }
                procStats.forEach((element) => {
                  let resultProcess = calcProcStatWin(element, allcpuu + allcpus, _process_cpu);
                  let listPos = -1;
                  for (let j = 0; j < result2.length; j++) {
                    if (result2[j].pid === resultProcess.pid || result2[j].pids.indexOf(resultProcess.pid) >= 0) {
                      listPos = j;
                    }
                  }
                  if (listPos >= 0) {
                    result2[listPos].cpu += resultProcess.cpuu + resultProcess.cpus;
                  }
                  list_new[resultProcess.pid] = {
                    cpuu: resultProcess.cpuu,
                    cpus: resultProcess.cpus,
                    utime: resultProcess.utime,
                    stime: resultProcess.stime
                  };
                });
                _process_cpu.all = allcpuu + allcpus;
                _process_cpu.all_utime = allcpuu;
                _process_cpu.all_stime = allcpus;
                _process_cpu.list = Object.assign({}, list_new);
                _process_cpu.ms = Date.now() - _process_cpu.ms;
                _process_cpu.result = JSON.parse(JSON.stringify(result2));
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              }
            });
          } catch (e) {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        }
        if (_darwin$6 || _linux$6 || _freebsd$6 || _openbsd$6 || _netbsd$6) {
          const params = ["-axo", "pid,ppid,pcpu,pmem,comm"];
          util$8.execSafe("ps", params).then((stdout) => {
            if (stdout) {
              let procStats = [];
              let lines = stdout.toString().split("\n").filter(function(line) {
                if (processesString === "*") {
                  return true;
                }
                if (line.toLowerCase().indexOf("grep") !== -1) {
                  return false;
                }
                let found = false;
                processes2.forEach(function(item) {
                  found = found || line.toLowerCase().indexOf(item.toLowerCase()) >= 0;
                });
                return found;
              });
              lines.shift();
              lines.forEach(function(line) {
                let data = line.trim().replace(/ +/g, " ").split(" ");
                if (data.length > 4) {
                  const linuxName = data[4].indexOf("/") >= 0 ? data[4].substring(0, data[4].indexOf("/")) : data[4];
                  const name = _linux$6 ? linuxName : data[4].substring(data[4].lastIndexOf("/") + 1);
                  procStats.push({
                    name,
                    pid: parseInt(data[0]) || 0,
                    ppid: parseInt(data[1]) || 0,
                    cpu: parseFloat(data[2].replace(",", ".")),
                    mem: parseFloat(data[3].replace(",", "."))
                  });
                }
              });
              procStats.forEach(function(item) {
                let listPos = -1;
                let inList = false;
                let name = item.name;
                for (let j = 0; j < result2.length; j++) {
                  if (item.name.toLowerCase().indexOf(result2[j].proc.toLowerCase()) >= 0) {
                    listPos = j;
                  }
                }
                processes2.forEach(function(proc2) {
                  if (item.name.toLowerCase().indexOf(proc2.toLowerCase()) >= 0 && !inList) {
                    inList = true;
                    name = proc2;
                  }
                });
                if (processesString === "*" || inList) {
                  if (listPos < 0) {
                    if (name) {
                      result2.push({
                        proc: name,
                        pid: item.pid,
                        pids: [item.pid],
                        cpu: item.cpu,
                        mem: item.mem
                      });
                    }
                  } else {
                    if (item.ppid < 10) {
                      result2[listPos].pid = item.pid;
                    }
                    result2[listPos].pids.push(item.pid);
                    result2[listPos].cpu += item.cpu;
                    result2[listPos].mem += item.mem;
                  }
                }
              });
              if (processesString !== "*") {
                let processesMissing = processes2.filter(function(name) {
                  return procStats.filter(function(item) {
                    return item.name.toLowerCase().indexOf(name) >= 0;
                  }).length === 0;
                });
                processesMissing.forEach(function(procName) {
                  result2.push({
                    proc: procName,
                    pid: null,
                    pids: [],
                    cpu: 0,
                    mem: 0
                  });
                });
              }
              if (_linux$6) {
                result2.forEach(function(item) {
                  item.cpu = 0;
                });
                let cmd = 'cat /proc/stat | grep "cpu "';
                for (let i in result2) {
                  for (let j in result2[i].pids) {
                    cmd += ";cat /proc/" + result2[i].pids[j] + "/stat";
                  }
                }
                exec$6(cmd, { maxBuffer: 1024 * 2e4 }, function(error, stdout2) {
                  let curr_processes = stdout2.toString().split("\n");
                  let all = parseProcStat(curr_processes.shift());
                  let list_new = {};
                  let resultProcess = {};
                  curr_processes.forEach((element) => {
                    resultProcess = calcProcStatLinux(element, all, _process_cpu);
                    if (resultProcess.pid) {
                      let resultItemId = -1;
                      for (let i in result2) {
                        if (result2[i].pids.indexOf(resultProcess.pid) >= 0) {
                          resultItemId = i;
                        }
                      }
                      if (resultItemId >= 0) {
                        result2[resultItemId].cpu += resultProcess.cpuu + resultProcess.cpus;
                      }
                      list_new[resultProcess.pid] = {
                        cpuu: resultProcess.cpuu,
                        cpus: resultProcess.cpus,
                        utime: resultProcess.utime,
                        stime: resultProcess.stime,
                        cutime: resultProcess.cutime,
                        cstime: resultProcess.cstime
                      };
                    }
                  });
                  result2.forEach(function(item) {
                    item.cpu = Math.round(item.cpu * 100) / 100;
                  });
                  _process_cpu.all = all;
                  _process_cpu.list = Object.assign({}, list_new);
                  _process_cpu.ms = Date.now() - _process_cpu.ms;
                  _process_cpu.result = Object.assign({}, result2);
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                });
              } else {
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              }
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          });
        }
      }
    });
  });
}
processes$1.processLoad = processLoad;
var users$1 = {};
const exec$5 = require$$1$1.exec;
const util$7 = util$j;
let _platform$6 = process.platform;
const _linux$5 = _platform$6 === "linux" || _platform$6 === "android";
const _darwin$5 = _platform$6 === "darwin";
const _windows$6 = _platform$6 === "win32";
const _freebsd$5 = _platform$6 === "freebsd";
const _openbsd$5 = _platform$6 === "openbsd";
const _netbsd$5 = _platform$6 === "netbsd";
const _sunos$5 = _platform$6 === "sunos";
function parseUsersLinux(lines, phase) {
  let result2 = [];
  let result_who = [];
  let result_w = {};
  let w_first = true;
  let w_header = [];
  let w_pos = [];
  let who_line = {};
  let is_whopart = true;
  lines.forEach(function(line) {
    if (line === "---") {
      is_whopart = false;
    } else {
      let l = line.replace(/ +/g, " ").split(" ");
      if (is_whopart) {
        result_who.push({
          user: l[0],
          tty: l[1],
          date: l[2],
          time: l[3],
          ip: l && l.length > 4 ? l[4].replace(/\(/g, "").replace(/\)/g, "") : ""
        });
      } else {
        if (w_first) {
          w_header = l;
          w_header.forEach(function(item) {
            w_pos.push(line.indexOf(item));
          });
          w_first = false;
        } else {
          result_w.user = line.substring(w_pos[0], w_pos[1] - 1).trim();
          result_w.tty = line.substring(w_pos[1], w_pos[2] - 1).trim();
          result_w.ip = line.substring(w_pos[2], w_pos[3] - 1).replace(/\(/g, "").replace(/\)/g, "").trim();
          result_w.command = line.substring(w_pos[7], 1e3).trim();
          who_line = result_who.filter(function(obj) {
            return obj.user.substring(0, 8).trim() === result_w.user && obj.tty === result_w.tty;
          });
          if (who_line.length === 1) {
            result2.push({
              user: who_line[0].user,
              tty: who_line[0].tty,
              date: who_line[0].date,
              time: who_line[0].time,
              ip: who_line[0].ip,
              command: result_w.command
            });
          }
        }
      }
    }
  });
  if (result2.length === 0 && phase === 2) {
    return result_who;
  } else {
    return result2;
  }
}
function parseUsersDarwin(lines) {
  let result2 = [];
  let result_who = [];
  let result_w = {};
  let who_line = {};
  let is_whopart = true;
  lines.forEach(function(line) {
    if (line === "---") {
      is_whopart = false;
    } else {
      let l = line.replace(/ +/g, " ").split(" ");
      if (is_whopart) {
        let dt = "" + (/* @__PURE__ */ new Date()).getFullYear() + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(l[2].toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + l[3]).slice(-2);
        try {
          if (new Date(dt) > /* @__PURE__ */ new Date()) {
            dt = "" + ((/* @__PURE__ */ new Date()).getFullYear() - 1) + "-" + ("0" + ("JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC".indexOf(l[2].toUpperCase()) / 3 + 1)).slice(-2) + "-" + ("0" + l[3]).slice(-2);
          }
        } catch {
          util$7.noop();
        }
        result_who.push({
          user: l[0],
          tty: l[1],
          date: dt,
          time: l[4]
        });
      } else {
        result_w.user = l[0];
        result_w.tty = l[1];
        result_w.ip = l[2] !== "-" ? l[2] : "";
        result_w.command = l.slice(5, 1e3).join(" ");
        who_line = result_who.filter(function(obj) {
          return obj.user.substring(0, 10) === result_w.user.substring(0, 10) && (obj.tty.substring(3, 1e3) === result_w.tty || obj.tty === result_w.tty);
        });
        if (who_line.length === 1) {
          result2.push({
            user: who_line[0].user,
            tty: who_line[0].tty,
            date: who_line[0].date,
            time: who_line[0].time,
            ip: result_w.ip,
            command: result_w.command
          });
        }
      }
    }
  });
  return result2;
}
function users(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux$5) {
        exec$5('export LC_ALL=C; who --ips; echo "---"; w; unset LC_ALL | tail -n +2', function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            result2 = parseUsersLinux(lines, 1);
            if (result2.length === 0) {
              exec$5('who; echo "---"; w | tail -n +2', function(error2, stdout2) {
                if (!error2) {
                  lines = stdout2.toString().split("\n");
                  result2 = parseUsersLinux(lines, 2);
                }
                if (callback) {
                  callback(result2);
                }
                resolve(result2);
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        });
      }
      if (_freebsd$5 || _openbsd$5 || _netbsd$5) {
        exec$5('who; echo "---"; w -ih', function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            result2 = parseUsersDarwin(lines);
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$5) {
        exec$5('who; echo "---"; w -h', function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            result2 = parseUsersDarwin(lines);
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$5) {
        exec$5('export LC_ALL=C; who; echo "---"; w -ih; unset LC_ALL', function(error, stdout) {
          if (!error) {
            let lines = stdout.toString().split("\n");
            result2 = parseUsersDarwin(lines);
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows$6) {
        try {
          let cmd = `Get-CimInstance Win32_LogonSession | select LogonId,@{n="StartTime";e={$_.StartTime.ToString("yyyy-MM-dd HH:mm:ss")}} | fl; echo '#-#-#-#';`;
          cmd += "Get-CimInstance Win32_LoggedOnUser | select antecedent,dependent | fl ; echo '#-#-#-#';";
          cmd += `$process = (Get-CimInstance Win32_Process -Filter "name = 'explorer.exe'"); Invoke-CimMethod -InputObject $process[0] -MethodName GetOwner | select user, domain | fl; get-process -name explorer | select-object sessionid | fl; echo '#-#-#-#';`;
          cmd += "query user";
          util$7.powerShell(cmd).then((data) => {
            if (data) {
              data = data.split("#-#-#-#");
              let sessions = parseWinSessions((data[0] || "").split(/\n\s*\n/));
              let loggedons = parseWinLoggedOn((data[1] || "").split(/\n\s*\n/));
              let queryUser = parseWinUsersQuery((data[3] || "").split("\r\n"));
              let users2 = parseWinUsers((data[2] || "").split(/\n\s*\n/), queryUser);
              for (let id in loggedons) {
                if ({}.hasOwnProperty.call(loggedons, id)) {
                  loggedons[id].dateTime = {}.hasOwnProperty.call(sessions, id) ? sessions[id] : "";
                }
              }
              users2.forEach((user) => {
                let dateTime = "";
                for (let id in loggedons) {
                  if ({}.hasOwnProperty.call(loggedons, id)) {
                    if (loggedons[id].user === user.user && (!dateTime || dateTime < loggedons[id].dateTime)) {
                      dateTime = loggedons[id].dateTime;
                    }
                  }
                }
                result2.push({
                  user: user.user,
                  tty: user.tty,
                  date: `${dateTime.substring(0, 10)}`,
                  time: `${dateTime.substring(11, 19)}`,
                  ip: "",
                  command: ""
                });
              });
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
function parseWinSessions(sessionParts) {
  const sessions = {};
  sessionParts.forEach((session) => {
    const lines = session.split("\r\n");
    const id = util$7.getValue(lines, "LogonId");
    const starttime = util$7.getValue(lines, "starttime");
    if (id) {
      sessions[id] = starttime;
    }
  });
  return sessions;
}
function fuzzyMatch(name1, name2) {
  name1 = name1.toLowerCase();
  name2 = name2.toLowerCase();
  let eq = 0;
  let len = name1.length;
  if (name2.length > len) {
    len = name2.length;
  }
  for (let i = 0; i < len; i++) {
    const c1 = name1[i] || "";
    const c2 = name2[i] || "";
    if (c1 === c2) {
      eq++;
    }
  }
  return len > 10 ? eq / len > 0.9 : len > 0 ? eq / len > 0.8 : false;
}
function parseWinUsers(userParts, userQuery) {
  const users2 = [];
  userParts.forEach((user) => {
    const lines = user.split("\r\n");
    const domain = util$7.getValue(lines, "domain", ":", true);
    const username = util$7.getValue(lines, "user", ":", true);
    const sessionid = util$7.getValue(lines, "sessionid", ":", true);
    if (username) {
      const quser = userQuery.filter((item) => fuzzyMatch(item.user, username));
      users2.push({
        domain,
        user: username,
        tty: quser && quser[0] && quser[0].tty ? quser[0].tty : sessionid
      });
    }
  });
  return users2;
}
function parseWinLoggedOn(loggedonParts) {
  const loggedons = {};
  loggedonParts.forEach((loggedon) => {
    const lines = loggedon.split("\r\n");
    const antecendent = util$7.getValue(lines, "antecedent", ":", true);
    let parts = antecendent.split("=");
    const name = parts.length > 2 ? parts[1].split(",")[0].replace(/"/g, "").trim() : "";
    const domain = parts.length > 2 ? parts[2].replace(/"/g, "").replace(/\)/g, "").trim() : "";
    const dependent = util$7.getValue(lines, "dependent", ":", true);
    parts = dependent.split("=");
    const id = parts.length > 1 ? parts[1].replace(/"/g, "").replace(/\)/g, "").trim() : "";
    if (id) {
      loggedons[id] = {
        domain,
        user: name
      };
    }
  });
  return loggedons;
}
function parseWinUsersQuery(lines) {
  lines = lines.filter((item) => item);
  let result2 = [];
  const header = lines[0];
  const headerDelimiter = [];
  if (header) {
    const start = header[0] === " " ? 1 : 0;
    headerDelimiter.push(start - 1);
    let nextSpace = 0;
    for (let i = start + 1; i < header.length; i++) {
      if (header[i] === " " && (header[i - 1] === " " || header[i - 1] === ".")) {
        nextSpace = i;
      } else {
        if (nextSpace) {
          headerDelimiter.push(nextSpace);
          nextSpace = 0;
        }
      }
    }
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const user = lines[i].substring(headerDelimiter[0] + 1, headerDelimiter[1]).trim() || "";
        const tty = lines[i].substring(headerDelimiter[1] + 1, headerDelimiter[2] - 2).trim() || "";
        result2.push({
          user,
          tty
        });
      }
    }
  }
  return result2;
}
users$1.users = users;
var internet = {};
const util$6 = util$j;
let _platform$5 = process.platform;
const _linux$4 = _platform$5 === "linux" || _platform$5 === "android";
const _darwin$4 = _platform$5 === "darwin";
const _windows$5 = _platform$5 === "win32";
const _freebsd$4 = _platform$5 === "freebsd";
const _openbsd$4 = _platform$5 === "openbsd";
const _netbsd$4 = _platform$5 === "netbsd";
const _sunos$4 = _platform$5 === "sunos";
function inetChecksite(url, callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = {
        url,
        ok: false,
        status: 404,
        ms: null
      };
      if (typeof url !== "string") {
        if (callback) {
          callback(result2);
        }
        return resolve(result2);
      }
      let urlSanitized = "";
      const s = util$6.sanitizeShellString(url, true);
      const l = util$6.mathMin(s.length, 2e3);
      for (let i = 0; i <= l; i++) {
        if (s[i] !== void 0) {
          try {
            s[i].__proto__.toLowerCase = util$6.stringToLower;
          } catch (e) {
            Object.setPrototypeOf(s[i], util$6.stringObj);
          }
          const sl = s[i].toLowerCase();
          if (sl && sl[0] && !sl[1] && sl[0].length === 1) {
            urlSanitized = urlSanitized + sl[0];
          }
        }
      }
      result2.url = urlSanitized;
      try {
        if (urlSanitized && !util$6.isPrototypePolluted()) {
          try {
            urlSanitized.__proto__.startsWith = util$6.stringStartWith;
          } catch (e) {
            Object.setPrototypeOf(urlSanitized, util$6.stringObj);
          }
          if (urlSanitized.startsWith("file:") || urlSanitized.startsWith("gopher:") || urlSanitized.startsWith("telnet:") || urlSanitized.startsWith("mailto:") || urlSanitized.startsWith("news:") || urlSanitized.startsWith("nntp:")) {
            if (callback) {
              callback(result2);
            }
            return resolve(result2);
          }
          util$6.checkWebsite(urlSanitized).then((res) => {
            result2.status = res.statusCode;
            result2.ok = res.statusCode >= 200 && res.statusCode <= 399;
            ;
            result2.ms = result2.ok ? res.time : null;
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } else {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      } catch (err) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
internet.inetChecksite = inetChecksite;
function inetLatency(host, callback) {
  if (util$6.isFunction(host) && !callback) {
    callback = host;
    host = "";
  }
  host = host || "8.8.8.8";
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (typeof host !== "string") {
        if (callback) {
          callback(null);
        }
        return resolve(null);
      }
      let hostSanitized = "";
      const s = (util$6.isPrototypePolluted() ? "8.8.8.8" : util$6.sanitizeShellString(host, true)).trim();
      const l = util$6.mathMin(s.length, 2e3);
      for (let i = 0; i <= l; i++) {
        if (!(s[i] === void 0)) {
          try {
            s[i].__proto__.toLowerCase = util$6.stringToLower;
          } catch (e) {
            Object.setPrototypeOf(s[i], util$6.stringObj);
          }
          const sl = s[i].toLowerCase();
          if (sl && sl[0] && !sl[1]) {
            hostSanitized = hostSanitized + sl[0];
          }
        }
      }
      try {
        hostSanitized.__proto__.startsWith = util$6.stringStartWith;
      } catch (e) {
        Object.setPrototypeOf(hostSanitized, util$6.stringObj);
      }
      if (hostSanitized.startsWith("file:") || hostSanitized.startsWith("gopher:") || hostSanitized.startsWith("telnet:") || hostSanitized.startsWith("mailto:") || hostSanitized.startsWith("news:") || hostSanitized.startsWith("nntp:")) {
        if (callback) {
          callback(null);
        }
        return resolve(null);
      }
      let params;
      if (_linux$4 || _freebsd$4 || _openbsd$4 || _netbsd$4 || _darwin$4) {
        if (_linux$4) {
          params = ["-c", "2", "-w", "3", hostSanitized];
        }
        if (_freebsd$4 || _openbsd$4 || _netbsd$4) {
          params = ["-c", "2", "-t", "3", hostSanitized];
        }
        if (_darwin$4) {
          params = ["-c2", "-t3", hostSanitized];
        }
        util$6.execSafe("ping", params).then((stdout) => {
          let result2 = null;
          if (stdout) {
            const lines = stdout.split("\n").filter((line2) => line2.indexOf("rtt") >= 0 || line2.indexOf("round-trip") >= 0 || line2.indexOf("avg") >= 0).join("\n");
            const line = lines.split("=");
            if (line.length > 1) {
              const parts = line[1].split("/");
              if (parts.length > 1) {
                result2 = parseFloat(parts[1]);
              }
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$4) {
        const params2 = ["-s", "-a", hostSanitized, "56", "2"];
        const filt = "avg";
        util$6.execSafe("ping", params2, { timeout: 3e3 }).then((stdout) => {
          let result2 = null;
          if (stdout) {
            const lines = stdout.split("\n").filter((line2) => line2.indexOf(filt) >= 0).join("\n");
            const line = lines.split("=");
            if (line.length > 1) {
              const parts = line[1].split("/");
              if (parts.length > 1) {
                result2 = parseFloat(parts[1].replace(",", "."));
              }
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows$5) {
        let result2 = null;
        try {
          const params2 = [hostSanitized, "-n", "1"];
          util$6.execSafe("ping", params2, util$6.execOptsWin).then((stdout) => {
            if (stdout) {
              let lines = stdout.split("\r\n");
              lines.shift();
              lines.forEach(function(line) {
                if ((line.toLowerCase().match(/ms/g) || []).length === 3) {
                  let l2 = line.replace(/ +/g, " ").split(" ");
                  if (l2.length > 6) {
                    result2 = parseFloat(l2[l2.length - 1]);
                  }
                }
              });
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          });
        } catch (e) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
internet.inetLatency = inetLatency;
var docker = {};
const net = require$$0$2;
const isWin = os$a.type() === "Windows_NT";
const socketPath = isWin ? "//./pipe/docker_engine" : "/var/run/docker.sock";
let DockerSocket$1 = class DockerSocket {
  getInfo(callback) {
    try {
      let socket = net.createConnection({ path: socketPath });
      let alldata = "";
      let data;
      socket.on("connect", () => {
        socket.write("GET http:/info HTTP/1.0\r\n\r\n");
      });
      socket.on("data", (data2) => {
        alldata = alldata + data2.toString();
      });
      socket.on("error", () => {
        socket = false;
        callback({});
      });
      socket.on("end", () => {
        let startbody = alldata.indexOf("\r\n\r\n");
        alldata = alldata.substring(startbody + 4);
        socket = false;
        try {
          data = JSON.parse(alldata);
          callback(data);
        } catch (err) {
          callback({});
        }
      });
    } catch (err) {
      callback({});
    }
  }
  listImages(all, callback) {
    try {
      let socket = net.createConnection({ path: socketPath });
      let alldata = "";
      let data;
      socket.on("connect", () => {
        socket.write("GET http:/images/json" + (all ? "?all=1" : "") + " HTTP/1.0\r\n\r\n");
      });
      socket.on("data", (data2) => {
        alldata = alldata + data2.toString();
      });
      socket.on("error", () => {
        socket = false;
        callback({});
      });
      socket.on("end", () => {
        let startbody = alldata.indexOf("\r\n\r\n");
        alldata = alldata.substring(startbody + 4);
        socket = false;
        try {
          data = JSON.parse(alldata);
          callback(data);
        } catch (err) {
          callback({});
        }
      });
    } catch (err) {
      callback({});
    }
  }
  inspectImage(id, callback) {
    id = id || "";
    if (id) {
      try {
        let socket = net.createConnection({ path: socketPath });
        let alldata = "";
        let data;
        socket.on("connect", () => {
          socket.write("GET http:/images/" + id + "/json?stream=0 HTTP/1.0\r\n\r\n");
        });
        socket.on("data", (data2) => {
          alldata = alldata + data2.toString();
        });
        socket.on("error", () => {
          socket = false;
          callback({});
        });
        socket.on("end", () => {
          let startbody = alldata.indexOf("\r\n\r\n");
          alldata = alldata.substring(startbody + 4);
          socket = false;
          try {
            data = JSON.parse(alldata);
            callback(data);
          } catch (err) {
            callback({});
          }
        });
      } catch (err) {
        callback({});
      }
    } else {
      callback({});
    }
  }
  listContainers(all, callback) {
    try {
      let socket = net.createConnection({ path: socketPath });
      let alldata = "";
      let data;
      socket.on("connect", () => {
        socket.write("GET http:/containers/json" + (all ? "?all=1" : "") + " HTTP/1.0\r\n\r\n");
      });
      socket.on("data", (data2) => {
        alldata = alldata + data2.toString();
      });
      socket.on("error", () => {
        socket = false;
        callback({});
      });
      socket.on("end", () => {
        let startbody = alldata.indexOf("\r\n\r\n");
        alldata = alldata.substring(startbody + 4);
        socket = false;
        try {
          data = JSON.parse(alldata);
          callback(data);
        } catch (err) {
          callback({});
        }
      });
    } catch (err) {
      callback({});
    }
  }
  getStats(id, callback) {
    id = id || "";
    if (id) {
      try {
        let socket = net.createConnection({ path: socketPath });
        let alldata = "";
        let data;
        socket.on("connect", () => {
          socket.write("GET http:/containers/" + id + "/stats?stream=0 HTTP/1.0\r\n\r\n");
        });
        socket.on("data", (data2) => {
          alldata = alldata + data2.toString();
        });
        socket.on("error", () => {
          socket = false;
          callback({});
        });
        socket.on("end", () => {
          let startbody = alldata.indexOf("\r\n\r\n");
          alldata = alldata.substring(startbody + 4);
          socket = false;
          try {
            data = JSON.parse(alldata);
            callback(data);
          } catch (err) {
            callback({});
          }
        });
      } catch (err) {
        callback({});
      }
    } else {
      callback({});
    }
  }
  getInspect(id, callback) {
    id = id || "";
    if (id) {
      try {
        let socket = net.createConnection({ path: socketPath });
        let alldata = "";
        let data;
        socket.on("connect", () => {
          socket.write("GET http:/containers/" + id + "/json?stream=0 HTTP/1.0\r\n\r\n");
        });
        socket.on("data", (data2) => {
          alldata = alldata + data2.toString();
        });
        socket.on("error", () => {
          socket = false;
          callback({});
        });
        socket.on("end", () => {
          let startbody = alldata.indexOf("\r\n\r\n");
          alldata = alldata.substring(startbody + 4);
          socket = false;
          try {
            data = JSON.parse(alldata);
            callback(data);
          } catch (err) {
            callback({});
          }
        });
      } catch (err) {
        callback({});
      }
    } else {
      callback({});
    }
  }
  getProcesses(id, callback) {
    id = id || "";
    if (id) {
      try {
        let socket = net.createConnection({ path: socketPath });
        let alldata = "";
        let data;
        socket.on("connect", () => {
          socket.write("GET http:/containers/" + id + "/top?ps_args=-opid,ppid,pgid,vsz,time,etime,nice,ruser,user,rgroup,group,stat,rss,args HTTP/1.0\r\n\r\n");
        });
        socket.on("data", (data2) => {
          alldata = alldata + data2.toString();
        });
        socket.on("error", () => {
          socket = false;
          callback({});
        });
        socket.on("end", () => {
          let startbody = alldata.indexOf("\r\n\r\n");
          alldata = alldata.substring(startbody + 4);
          socket = false;
          try {
            data = JSON.parse(alldata);
            callback(data);
          } catch (err) {
            callback({});
          }
        });
      } catch (err) {
        callback({});
      }
    } else {
      callback({});
    }
  }
  listVolumes(callback) {
    try {
      let socket = net.createConnection({ path: socketPath });
      let alldata = "";
      let data;
      socket.on("connect", () => {
        socket.write("GET http:/volumes HTTP/1.0\r\n\r\n");
      });
      socket.on("data", (data2) => {
        alldata = alldata + data2.toString();
      });
      socket.on("error", () => {
        socket = false;
        callback({});
      });
      socket.on("end", () => {
        let startbody = alldata.indexOf("\r\n\r\n");
        alldata = alldata.substring(startbody + 4);
        socket = false;
        try {
          data = JSON.parse(alldata);
          callback(data);
        } catch (err) {
          callback({});
        }
      });
    } catch (err) {
      callback({});
    }
  }
};
var dockerSocket = DockerSocket$1;
const util$5 = util$j;
const DockerSocket2 = dockerSocket;
let _platform$4 = process.platform;
const _windows$4 = _platform$4 === "win32";
let _docker_container_stats = {};
let _docker_socket;
let _docker_last_read = 0;
function dockerInfo(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (!_docker_socket) {
        _docker_socket = new DockerSocket2();
      }
      const result2 = {};
      _docker_socket.getInfo((data) => {
        result2.id = data.ID;
        result2.containers = data.Containers;
        result2.containersRunning = data.ContainersRunning;
        result2.containersPaused = data.ContainersPaused;
        result2.containersStopped = data.ContainersStopped;
        result2.images = data.Images;
        result2.driver = data.Driver;
        result2.memoryLimit = data.MemoryLimit;
        result2.swapLimit = data.SwapLimit;
        result2.kernelMemory = data.KernelMemory;
        result2.cpuCfsPeriod = data.CpuCfsPeriod;
        result2.cpuCfsQuota = data.CpuCfsQuota;
        result2.cpuShares = data.CPUShares;
        result2.cpuSet = data.CPUSet;
        result2.ipv4Forwarding = data.IPv4Forwarding;
        result2.bridgeNfIptables = data.BridgeNfIptables;
        result2.bridgeNfIp6tables = data.BridgeNfIp6tables;
        result2.debug = data.Debug;
        result2.nfd = data.NFd;
        result2.oomKillDisable = data.OomKillDisable;
        result2.ngoroutines = data.NGoroutines;
        result2.systemTime = data.SystemTime;
        result2.loggingDriver = data.LoggingDriver;
        result2.cgroupDriver = data.CgroupDriver;
        result2.nEventsListener = data.NEventsListener;
        result2.kernelVersion = data.KernelVersion;
        result2.operatingSystem = data.OperatingSystem;
        result2.osType = data.OSType;
        result2.architecture = data.Architecture;
        result2.ncpu = data.NCPU;
        result2.memTotal = data.MemTotal;
        result2.dockerRootDir = data.DockerRootDir;
        result2.httpProxy = data.HttpProxy;
        result2.httpsProxy = data.HttpsProxy;
        result2.noProxy = data.NoProxy;
        result2.name = data.Name;
        result2.labels = data.Labels;
        result2.experimentalBuild = data.ExperimentalBuild;
        result2.serverVersion = data.ServerVersion;
        result2.clusterStore = data.ClusterStore;
        result2.clusterAdvertise = data.ClusterAdvertise;
        result2.defaultRuntime = data.DefaultRuntime;
        result2.liveRestoreEnabled = data.LiveRestoreEnabled;
        result2.isolation = data.Isolation;
        result2.initBinary = data.InitBinary;
        result2.productLicense = data.ProductLicense;
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      });
    });
  });
}
docker.dockerInfo = dockerInfo;
function dockerImages(all, callback) {
  if (util$5.isFunction(all) && !callback) {
    callback = all;
    all = false;
  }
  if (typeof all === "string" && all === "true") {
    all = true;
  }
  if (typeof all !== "boolean" && all !== void 0) {
    all = false;
  }
  all = all || false;
  let result2 = [];
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (!_docker_socket) {
        _docker_socket = new DockerSocket2();
      }
      const workload = [];
      _docker_socket.listImages(all, (data) => {
        let dockerImages2 = {};
        try {
          dockerImages2 = data;
          if (dockerImages2 && Object.prototype.toString.call(dockerImages2) === "[object Array]" && dockerImages2.length > 0) {
            dockerImages2.forEach(function(element) {
              if (element.Names && Object.prototype.toString.call(element.Names) === "[object Array]" && element.Names.length > 0) {
                element.Name = element.Names[0].replace(/^\/|\/$/g, "");
              }
              workload.push(dockerImagesInspect(element.Id.trim(), element));
            });
            if (workload.length) {
              Promise.all(
                workload
              ).then((data2) => {
                if (callback) {
                  callback(data2);
                }
                resolve(data2);
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        } catch (err) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      });
    });
  });
}
function dockerImagesInspect(imageID, payload) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      imageID = imageID || "";
      if (typeof imageID !== "string") {
        return resolve();
      }
      const imageIDSanitized = (util$5.isPrototypePolluted() ? "" : util$5.sanitizeShellString(imageID, true)).trim();
      if (imageIDSanitized) {
        if (!_docker_socket) {
          _docker_socket = new DockerSocket2();
        }
        _docker_socket.inspectImage(imageIDSanitized.trim(), (data) => {
          try {
            resolve({
              id: payload.Id,
              container: data.Container,
              comment: data.Comment,
              os: data.Os,
              architecture: data.Architecture,
              parent: data.Parent,
              dockerVersion: data.DockerVersion,
              size: data.Size,
              sharedSize: payload.SharedSize,
              virtualSize: data.VirtualSize,
              author: data.Author,
              created: data.Created ? Math.round(new Date(data.Created).getTime() / 1e3) : 0,
              containerConfig: data.ContainerConfig ? data.ContainerConfig : {},
              graphDriver: data.GraphDriver ? data.GraphDriver : {},
              repoDigests: data.RepoDigests ? data.RepoDigests : {},
              repoTags: data.RepoTags ? data.RepoTags : {},
              config: data.Config ? data.Config : {},
              rootFS: data.RootFS ? data.RootFS : {}
            });
          } catch (err) {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  });
}
docker.dockerImages = dockerImages;
function dockerContainers(all, callback) {
  function inContainers(containers, id) {
    let filtered = containers.filter((obj) => {
      return obj.Id && obj.Id === id;
    });
    return filtered.length > 0;
  }
  if (util$5.isFunction(all) && !callback) {
    callback = all;
    all = false;
  }
  if (typeof all === "string" && all === "true") {
    all = true;
  }
  if (typeof all !== "boolean" && all !== void 0) {
    all = false;
  }
  all = all || false;
  let result2 = [];
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (!_docker_socket) {
        _docker_socket = new DockerSocket2();
      }
      const workload = [];
      _docker_socket.listContainers(all, (data) => {
        let docker_containers = {};
        try {
          docker_containers = data;
          if (docker_containers && Object.prototype.toString.call(docker_containers) === "[object Array]" && docker_containers.length > 0) {
            for (let key2 in _docker_container_stats) {
              if ({}.hasOwnProperty.call(_docker_container_stats, key2)) {
                if (!inContainers(docker_containers, key2)) {
                  delete _docker_container_stats[key2];
                }
              }
            }
            docker_containers.forEach(function(element) {
              if (element.Names && Object.prototype.toString.call(element.Names) === "[object Array]" && element.Names.length > 0) {
                element.Name = element.Names[0].replace(/^\/|\/$/g, "");
              }
              workload.push(dockerContainerInspect(element.Id.trim(), element));
            });
            if (workload.length) {
              Promise.all(
                workload
              ).then((data2) => {
                if (callback) {
                  callback(data2);
                }
                resolve(data2);
              });
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        } catch (err) {
          for (let key2 in _docker_container_stats) {
            if ({}.hasOwnProperty.call(_docker_container_stats, key2)) {
              if (!inContainers(docker_containers, key2)) {
                delete _docker_container_stats[key2];
              }
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      });
    });
  });
}
function dockerContainerInspect(containerID, payload) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      containerID = containerID || "";
      if (typeof containerID !== "string") {
        return resolve();
      }
      const containerIdSanitized = (util$5.isPrototypePolluted() ? "" : util$5.sanitizeShellString(containerID, true)).trim();
      if (containerIdSanitized) {
        if (!_docker_socket) {
          _docker_socket = new DockerSocket2();
        }
        _docker_socket.getInspect(containerIdSanitized.trim(), (data) => {
          try {
            resolve({
              id: payload.Id,
              name: payload.Name,
              image: payload.Image,
              imageID: payload.ImageID,
              command: payload.Command,
              created: payload.Created,
              started: data.State && data.State.StartedAt ? Math.round(new Date(data.State.StartedAt).getTime() / 1e3) : 0,
              finished: data.State && data.State.FinishedAt && !data.State.FinishedAt.startsWith("0001-01-01") ? Math.round(new Date(data.State.FinishedAt).getTime() / 1e3) : 0,
              createdAt: data.Created ? data.Created : "",
              startedAt: data.State && data.State.StartedAt ? data.State.StartedAt : "",
              finishedAt: data.State && data.State.FinishedAt && !data.State.FinishedAt.startsWith("0001-01-01") ? data.State.FinishedAt : "",
              state: payload.State,
              restartCount: data.RestartCount || 0,
              platform: data.Platform || "",
              driver: data.Driver || "",
              ports: payload.Ports,
              mounts: payload.Mounts
              // hostconfig: payload.HostConfig,
              // network: payload.NetworkSettings
            });
          } catch (err) {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  });
}
docker.dockerContainers = dockerContainers;
function docker_calcCPUPercent(cpu_stats, precpu_stats) {
  if (!_windows$4) {
    let cpuPercent = 0;
    let cpuDelta = cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage;
    let systemDelta = cpu_stats.system_cpu_usage - precpu_stats.system_cpu_usage;
    if (systemDelta > 0 && cpuDelta > 0) {
      if (precpu_stats.online_cpus) {
        cpuPercent = cpuDelta / systemDelta * precpu_stats.online_cpus * 100;
      } else {
        cpuPercent = cpuDelta / systemDelta * cpu_stats.cpu_usage.percpu_usage.length * 100;
      }
    }
    return cpuPercent;
  } else {
    let nanoSecNow = util$5.nanoSeconds();
    let cpuPercent = 0;
    if (_docker_last_read > 0) {
      let possIntervals = nanoSecNow - _docker_last_read;
      let intervalsUsed = cpu_stats.cpu_usage.total_usage - precpu_stats.cpu_usage.total_usage;
      if (possIntervals > 0) {
        cpuPercent = 100 * intervalsUsed / possIntervals;
      }
    }
    _docker_last_read = nanoSecNow;
    return cpuPercent;
  }
}
function docker_calcNetworkIO(networks) {
  let rx;
  let wx;
  for (let key2 in networks) {
    if (!{}.hasOwnProperty.call(networks, key2)) {
      continue;
    }
    let obj = networks[key2];
    rx = +obj.rx_bytes;
    wx = +obj.tx_bytes;
  }
  return {
    rx,
    wx
  };
}
function docker_calcBlockIO(blkio_stats) {
  let result2 = {
    r: 0,
    w: 0
  };
  if (blkio_stats && blkio_stats.io_service_bytes_recursive && Object.prototype.toString.call(blkio_stats.io_service_bytes_recursive) === "[object Array]" && blkio_stats.io_service_bytes_recursive.length > 0) {
    blkio_stats.io_service_bytes_recursive.forEach(function(element) {
      if (element.op && element.op.toLowerCase() === "read" && element.value) {
        result2.r += element.value;
      }
      if (element.op && element.op.toLowerCase() === "write" && element.value) {
        result2.w += element.value;
      }
    });
  }
  return result2;
}
function dockerContainerStats(containerIDs, callback) {
  let containerArray = [];
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (util$5.isFunction(containerIDs) && !callback) {
        callback = containerIDs;
        containerArray = ["*"];
      } else {
        containerIDs = containerIDs || "*";
        if (typeof containerIDs !== "string") {
          if (callback) {
            callback([]);
          }
          return resolve([]);
        }
        let containerIDsSanitized = "";
        try {
          containerIDsSanitized.__proto__.toLowerCase = util$5.stringToLower;
          containerIDsSanitized.__proto__.replace = util$5.stringReplace;
          containerIDsSanitized.__proto__.toString = util$5.stringToString;
          containerIDsSanitized.__proto__.substr = util$5.stringSubstr;
          containerIDsSanitized.__proto__.substring = util$5.stringSubstring;
          containerIDsSanitized.__proto__.trim = util$5.stringTrim;
          containerIDsSanitized.__proto__.startsWith = util$5.stringStartWith;
        } catch (e) {
          Object.setPrototypeOf(containerIDsSanitized, util$5.stringObj);
        }
        containerIDsSanitized = containerIDs;
        containerIDsSanitized = containerIDsSanitized.trim();
        if (containerIDsSanitized !== "*") {
          containerIDsSanitized = "";
          const s = (util$5.isPrototypePolluted() ? "" : util$5.sanitizeShellString(containerIDs, true)).trim();
          const l = util$5.mathMin(s.length, 2e3);
          for (let i = 0; i <= l; i++) {
            if (s[i] !== void 0) {
              s[i].__proto__.toLowerCase = util$5.stringToLower;
              const sl = s[i].toLowerCase();
              if (sl && sl[0] && !sl[1]) {
                containerIDsSanitized = containerIDsSanitized + sl[0];
              }
            }
          }
        }
        containerIDsSanitized = containerIDsSanitized.trim().toLowerCase().replace(/,+/g, "|");
        containerArray = containerIDsSanitized.split("|");
      }
      const result2 = [];
      const workload = [];
      if (containerArray.length && containerArray[0].trim() === "*") {
        containerArray = [];
        dockerContainers().then((allContainers) => {
          for (let container of allContainers) {
            containerArray.push(container.id.substring(0, 12));
          }
          if (containerArray.length) {
            dockerContainerStats(containerArray.join(",")).then((result3) => {
              if (callback) {
                callback(result3);
              }
              resolve(result3);
            });
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        });
      } else {
        for (let containerID of containerArray) {
          workload.push(dockerContainerStatsSingle(containerID.trim()));
        }
        if (workload.length) {
          Promise.all(
            workload
          ).then((data) => {
            if (callback) {
              callback(data);
            }
            resolve(data);
          });
        } else {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      }
    });
  });
}
function dockerContainerStatsSingle(containerID) {
  containerID = containerID || "";
  let result2 = {
    id: containerID,
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
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (containerID) {
        if (!_docker_socket) {
          _docker_socket = new DockerSocket2();
        }
        _docker_socket.getInspect(containerID, (dataInspect) => {
          try {
            _docker_socket.getStats(containerID, (data) => {
              try {
                let stats = data;
                if (!stats.message) {
                  if (data.id) {
                    result2.id = data.id;
                  }
                  result2.memUsage = stats.memory_stats && stats.memory_stats.usage ? stats.memory_stats.usage : 0;
                  result2.memLimit = stats.memory_stats && stats.memory_stats.limit ? stats.memory_stats.limit : 0;
                  result2.memPercent = stats.memory_stats && stats.memory_stats.usage && stats.memory_stats.limit ? stats.memory_stats.usage / stats.memory_stats.limit * 100 : 0;
                  result2.cpuPercent = stats.cpu_stats && stats.precpu_stats ? docker_calcCPUPercent(stats.cpu_stats, stats.precpu_stats) : 0;
                  result2.pids = stats.pids_stats && stats.pids_stats.current ? stats.pids_stats.current : 0;
                  result2.restartCount = dataInspect.RestartCount ? dataInspect.RestartCount : 0;
                  if (stats.networks) {
                    result2.netIO = docker_calcNetworkIO(stats.networks);
                  }
                  if (stats.blkio_stats) {
                    result2.blockIO = docker_calcBlockIO(stats.blkio_stats);
                  }
                  result2.cpuStats = stats.cpu_stats ? stats.cpu_stats : {};
                  result2.precpuStats = stats.precpu_stats ? stats.precpu_stats : {};
                  result2.memoryStats = stats.memory_stats ? stats.memory_stats : {};
                  result2.networks = stats.networks ? stats.networks : {};
                }
              } catch (err) {
                util$5.noop();
              }
              resolve(result2);
            });
          } catch (err) {
            util$5.noop();
          }
        });
      } else {
        resolve(result2);
      }
    });
  });
}
docker.dockerContainerStats = dockerContainerStats;
function dockerContainerProcesses(containerID, callback) {
  let result2 = [];
  return new Promise((resolve) => {
    process.nextTick(() => {
      containerID = containerID || "";
      if (typeof containerID !== "string") {
        return resolve(result2);
      }
      const containerIdSanitized = (util$5.isPrototypePolluted() ? "" : util$5.sanitizeShellString(containerID, true)).trim();
      if (containerIdSanitized) {
        if (!_docker_socket) {
          _docker_socket = new DockerSocket2();
        }
        _docker_socket.getProcesses(containerIdSanitized, (data) => {
          try {
            if (data && data.Titles && data.Processes) {
              let titles = data.Titles.map(function(value) {
                return value.toUpperCase();
              });
              let pos_pid = titles.indexOf("PID");
              let pos_ppid = titles.indexOf("PPID");
              let pos_pgid = titles.indexOf("PGID");
              let pos_vsz = titles.indexOf("VSZ");
              let pos_time = titles.indexOf("TIME");
              let pos_elapsed = titles.indexOf("ELAPSED");
              let pos_ni = titles.indexOf("NI");
              let pos_ruser = titles.indexOf("RUSER");
              let pos_user = titles.indexOf("USER");
              let pos_rgroup = titles.indexOf("RGROUP");
              let pos_group = titles.indexOf("GROUP");
              let pos_stat = titles.indexOf("STAT");
              let pos_rss = titles.indexOf("RSS");
              let pos_command = titles.indexOf("COMMAND");
              data.Processes.forEach((process2) => {
                result2.push({
                  pidHost: pos_pid >= 0 ? process2[pos_pid] : "",
                  ppid: pos_ppid >= 0 ? process2[pos_ppid] : "",
                  pgid: pos_pgid >= 0 ? process2[pos_pgid] : "",
                  user: pos_user >= 0 ? process2[pos_user] : "",
                  ruser: pos_ruser >= 0 ? process2[pos_ruser] : "",
                  group: pos_group >= 0 ? process2[pos_group] : "",
                  rgroup: pos_rgroup >= 0 ? process2[pos_rgroup] : "",
                  stat: pos_stat >= 0 ? process2[pos_stat] : "",
                  time: pos_time >= 0 ? process2[pos_time] : "",
                  elapsed: pos_elapsed >= 0 ? process2[pos_elapsed] : "",
                  nice: pos_ni >= 0 ? process2[pos_ni] : "",
                  rss: pos_rss >= 0 ? process2[pos_rss] : "",
                  vsz: pos_vsz >= 0 ? process2[pos_vsz] : "",
                  command: pos_command >= 0 ? process2[pos_command] : ""
                });
              });
            }
          } catch (err) {
            util$5.noop();
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } else {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
docker.dockerContainerProcesses = dockerContainerProcesses;
function dockerVolumes(callback) {
  let result2 = [];
  return new Promise((resolve) => {
    process.nextTick(() => {
      if (!_docker_socket) {
        _docker_socket = new DockerSocket2();
      }
      _docker_socket.listVolumes((data) => {
        let dockerVolumes2 = {};
        try {
          dockerVolumes2 = data;
          if (dockerVolumes2 && dockerVolumes2.Volumes && Object.prototype.toString.call(dockerVolumes2.Volumes) === "[object Array]" && dockerVolumes2.Volumes.length > 0) {
            dockerVolumes2.Volumes.forEach(function(element) {
              result2.push({
                name: element.Name,
                driver: element.Driver,
                labels: element.Labels,
                mountpoint: element.Mountpoint,
                options: element.Options,
                scope: element.Scope,
                created: element.CreatedAt ? Math.round(new Date(element.CreatedAt).getTime() / 1e3) : 0
              });
            });
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        } catch (err) {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      });
    });
  });
}
docker.dockerVolumes = dockerVolumes;
function dockerAll(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      dockerContainers(true).then((result2) => {
        if (result2 && Object.prototype.toString.call(result2) === "[object Array]" && result2.length > 0) {
          let l = result2.length;
          result2.forEach(function(element) {
            dockerContainerStats(element.id).then((res) => {
              element.memUsage = res[0].memUsage;
              element.memLimit = res[0].memLimit;
              element.memPercent = res[0].memPercent;
              element.cpuPercent = res[0].cpuPercent;
              element.pids = res[0].pids;
              element.netIO = res[0].netIO;
              element.blockIO = res[0].blockIO;
              element.cpuStats = res[0].cpuStats;
              element.precpuStats = res[0].precpuStats;
              element.memoryStats = res[0].memoryStats;
              element.networks = res[0].networks;
              dockerContainerProcesses(element.id).then((processes2) => {
                element.processes = processes2;
                l -= 1;
                if (l === 0) {
                  if (callback) {
                    callback(result2);
                  }
                  resolve(result2);
                }
              });
            });
          });
        } else {
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        }
      });
    });
  });
}
docker.dockerAll = dockerAll;
var virtualbox = {};
const os$1 = os$a;
const exec$4 = require$$1$1.exec;
const util$4 = util$j;
function vboxInfo(callback) {
  let result2 = [];
  return new Promise((resolve) => {
    process.nextTick(() => {
      try {
        exec$4(util$4.getVboxmanage() + " list vms --long", function(error, stdout) {
          let parts = (os$1.EOL + stdout.toString()).split(os$1.EOL + "Name:");
          parts.shift();
          parts.forEach((part) => {
            const lines = ("Name:" + part).split(os$1.EOL);
            const state = util$4.getValue(lines, "State");
            const running = state.startsWith("running");
            const runningSinceString = running ? state.replace("running (since ", "").replace(")", "").trim() : "";
            let runningSince = 0;
            try {
              if (running) {
                const sinceDateObj = new Date(runningSinceString);
                const offset = sinceDateObj.getTimezoneOffset();
                runningSince = Math.round((Date.now() - Date.parse(sinceDateObj)) / 1e3) + offset * 60;
              }
            } catch (e) {
              util$4.noop();
            }
            const stoppedSinceString = !running ? state.replace("powered off (since", "").replace(")", "").trim() : "";
            let stoppedSince = 0;
            try {
              if (!running) {
                const sinceDateObj = new Date(stoppedSinceString);
                const offset = sinceDateObj.getTimezoneOffset();
                stoppedSince = Math.round((Date.now() - Date.parse(sinceDateObj)) / 1e3) + offset * 60;
              }
            } catch (e) {
              util$4.noop();
            }
            result2.push({
              id: util$4.getValue(lines, "UUID"),
              name: util$4.getValue(lines, "Name"),
              running,
              started: runningSinceString,
              runningSince,
              stopped: stoppedSinceString,
              stoppedSince,
              guestOS: util$4.getValue(lines, "Guest OS"),
              hardwareUUID: util$4.getValue(lines, "Hardware UUID"),
              memory: parseInt(util$4.getValue(lines, "Memory size", "     "), 10),
              vram: parseInt(util$4.getValue(lines, "VRAM size"), 10),
              cpus: parseInt(util$4.getValue(lines, "Number of CPUs"), 10),
              cpuExepCap: util$4.getValue(lines, "CPU exec cap"),
              cpuProfile: util$4.getValue(lines, "CPUProfile"),
              chipset: util$4.getValue(lines, "Chipset"),
              firmware: util$4.getValue(lines, "Firmware"),
              pageFusion: util$4.getValue(lines, "Page Fusion") === "enabled",
              configFile: util$4.getValue(lines, "Config file"),
              snapshotFolder: util$4.getValue(lines, "Snapshot folder"),
              logFolder: util$4.getValue(lines, "Log folder"),
              hpet: util$4.getValue(lines, "HPET") === "enabled",
              pae: util$4.getValue(lines, "PAE") === "enabled",
              longMode: util$4.getValue(lines, "Long Mode") === "enabled",
              tripleFaultReset: util$4.getValue(lines, "Triple Fault Reset") === "enabled",
              apic: util$4.getValue(lines, "APIC") === "enabled",
              x2Apic: util$4.getValue(lines, "X2APIC") === "enabled",
              acpi: util$4.getValue(lines, "ACPI") === "enabled",
              ioApic: util$4.getValue(lines, "IOAPIC") === "enabled",
              biosApicMode: util$4.getValue(lines, "BIOS APIC mode"),
              bootMenuMode: util$4.getValue(lines, "Boot menu mode"),
              bootDevice1: util$4.getValue(lines, "Boot Device 1"),
              bootDevice2: util$4.getValue(lines, "Boot Device 2"),
              bootDevice3: util$4.getValue(lines, "Boot Device 3"),
              bootDevice4: util$4.getValue(lines, "Boot Device 4"),
              timeOffset: util$4.getValue(lines, "Time offset"),
              rtc: util$4.getValue(lines, "RTC")
            });
          });
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      } catch (e) {
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
    });
  });
}
virtualbox.vboxInfo = vboxInfo;
var printer$1 = {};
const exec$3 = require$$1$1.exec;
const util$3 = util$j;
let _platform$3 = process.platform;
const _linux$3 = _platform$3 === "linux" || _platform$3 === "android";
const _darwin$3 = _platform$3 === "darwin";
const _windows$3 = _platform$3 === "win32";
const _freebsd$3 = _platform$3 === "freebsd";
const _openbsd$3 = _platform$3 === "openbsd";
const _netbsd$3 = _platform$3 === "netbsd";
const _sunos$3 = _platform$3 === "sunos";
const winPrinterStatus = {
  1: "Other",
  2: "Unknown",
  3: "Idle",
  4: "Printing",
  5: "Warmup",
  6: "Stopped Printing",
  7: "Offline"
};
function parseLinuxCupsHeader(lines) {
  const result2 = {};
  if (lines && lines.length) {
    if (lines[0].indexOf(" CUPS v") > 0) {
      const parts = lines[0].split(" CUPS v");
      result2.cupsVersion = parts[1];
    }
  }
  return result2;
}
function parseLinuxCupsPrinter(lines) {
  const result2 = {};
  const printerId = util$3.getValue(lines, "PrinterId", " ");
  result2.id = printerId ? parseInt(printerId, 10) : null;
  result2.name = util$3.getValue(lines, "Info", " ");
  result2.model = lines.length > 0 && lines[0] ? lines[0].split(" ")[0] : "";
  result2.uri = util$3.getValue(lines, "DeviceURI", " ");
  result2.uuid = util$3.getValue(lines, "UUID", " ");
  result2.status = util$3.getValue(lines, "State", " ");
  result2.local = util$3.getValue(lines, "Location", " ").toLowerCase().startsWith("local");
  result2.default = null;
  result2.shared = util$3.getValue(lines, "Shared", " ").toLowerCase().startsWith("yes");
  return result2;
}
function parseLinuxLpstatPrinter(lines, id) {
  const result2 = {};
  result2.id = id;
  result2.name = util$3.getValue(lines, "Description", ":", true);
  result2.model = lines.length > 0 && lines[0] ? lines[0].split(" ")[0] : "";
  result2.uri = null;
  result2.uuid = null;
  result2.status = lines.length > 0 && lines[0] ? lines[0].indexOf(" idle") > 0 ? "idle" : lines[0].indexOf(" printing") > 0 ? "printing" : "unknown" : null;
  result2.local = util$3.getValue(lines, "Location", ":", true).toLowerCase().startsWith("local");
  result2.default = null;
  result2.shared = util$3.getValue(lines, "Shared", " ").toLowerCase().startsWith("yes");
  return result2;
}
function parseDarwinPrinters(printerObject, id) {
  const result2 = {};
  const uriParts = printerObject.uri.split("/");
  result2.id = id;
  result2.name = printerObject._name;
  result2.model = uriParts.length ? uriParts[uriParts.length - 1] : "";
  result2.uri = printerObject.uri;
  result2.uuid = null;
  result2.status = printerObject.status;
  result2.local = printerObject.printserver === "local";
  result2.default = printerObject.default === "yes";
  result2.shared = printerObject.shared === "yes";
  return result2;
}
function parseWindowsPrinters(lines, id) {
  const result2 = {};
  const status = parseInt(util$3.getValue(lines, "PrinterStatus", ":"), 10);
  result2.id = id;
  result2.name = util$3.getValue(lines, "name", ":");
  result2.model = util$3.getValue(lines, "DriverName", ":");
  result2.uri = null;
  result2.uuid = null;
  result2.status = winPrinterStatus[status] ? winPrinterStatus[status] : null;
  result2.local = util$3.getValue(lines, "Local", ":").toUpperCase() === "TRUE";
  result2.default = util$3.getValue(lines, "Default", ":").toUpperCase() === "TRUE";
  result2.shared = util$3.getValue(lines, "Shared", ":").toUpperCase() === "TRUE";
  return result2;
}
function printer(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux$3 || _freebsd$3 || _openbsd$3 || _netbsd$3) {
        let cmd = "cat /etc/cups/printers.conf 2>/dev/null";
        exec$3(cmd, function(error, stdout) {
          if (!error) {
            const parts = stdout.toString().split("<Printer ");
            const printerHeader = parseLinuxCupsHeader(parts[0]);
            for (let i = 1; i < parts.length; i++) {
              const printers = parseLinuxCupsPrinter(parts[i].split("\n"));
              if (printers.name) {
                printers.engine = "CUPS";
                printers.engineVersion = printerHeader.cupsVersion;
                result2.push(printers);
              }
            }
          }
          if (result2.length === 0) {
            if (_linux$3) {
              cmd = "export LC_ALL=C; lpstat -lp 2>/dev/null; unset LC_ALL";
              exec$3(cmd, function(error2, stdout2) {
                const parts = ("\n" + stdout2.toString()).split("\nprinter ");
                for (let i = 1; i < parts.length; i++) {
                  const printers = parseLinuxLpstatPrinter(parts[i].split("\n"), i);
                  result2.push(printers);
                }
              });
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            } else {
              if (callback) {
                callback(result2);
              }
              resolve(result2);
            }
          } else {
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
        });
      }
      if (_darwin$3) {
        let cmd = "system_profiler SPPrintersDataType -json";
        exec$3(cmd, function(error, stdout) {
          if (!error) {
            try {
              const outObj = JSON.parse(stdout.toString());
              if (outObj.SPPrintersDataType && outObj.SPPrintersDataType.length) {
                for (let i = 0; i < outObj.SPPrintersDataType.length; i++) {
                  const printer2 = parseDarwinPrinters(outObj.SPPrintersDataType[i], i);
                  result2.push(printer2);
                }
              }
            } catch (e) {
              util$3.noop();
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows$3) {
        util$3.powerShell("Get-CimInstance Win32_Printer | select PrinterStatus,Name,DriverName,Local,Default,Shared | fl").then((stdout, error) => {
          if (!error) {
            const parts = stdout.toString().split(/\n\s*\n/);
            for (let i = 0; i < parts.length; i++) {
              const printer2 = parseWindowsPrinters(parts[i].split("\n"), i);
              if (printer2.name || printer2.model) {
                result2.push(printer2);
              }
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$3) {
        resolve(null);
      }
    });
  });
}
printer$1.printer = printer;
var usb$1 = {};
const exec$2 = require$$1$1.exec;
const util$2 = util$j;
let _platform$2 = process.platform;
const _linux$2 = _platform$2 === "linux" || _platform$2 === "android";
const _darwin$2 = _platform$2 === "darwin";
const _windows$2 = _platform$2 === "win32";
const _freebsd$2 = _platform$2 === "freebsd";
const _openbsd$2 = _platform$2 === "openbsd";
const _netbsd$2 = _platform$2 === "netbsd";
const _sunos$2 = _platform$2 === "sunos";
function getLinuxUsbType(type, name) {
  let result2 = type;
  const str = (name + " " + type).toLowerCase();
  if (str.indexOf("camera") >= 0) {
    result2 = "Camera";
  } else if (str.indexOf("hub") >= 0) {
    result2 = "Hub";
  } else if (str.indexOf("keybrd") >= 0) {
    result2 = "Keyboard";
  } else if (str.indexOf("keyboard") >= 0) {
    result2 = "Keyboard";
  } else if (str.indexOf("mouse") >= 0) {
    result2 = "Mouse";
  } else if (str.indexOf("stora") >= 0) {
    result2 = "Storage";
  } else if (str.indexOf("microp") >= 0) {
    result2 = "Microphone";
  } else if (str.indexOf("headset") >= 0) {
    result2 = "Audio";
  } else if (str.indexOf("audio") >= 0) {
    result2 = "Audio";
  }
  return result2;
}
function parseLinuxUsb(usb2) {
  const result2 = {};
  const lines = usb2.split("\n");
  if (lines && lines.length && lines[0].indexOf("Device") >= 0) {
    const parts = lines[0].split(" ");
    result2.bus = parseInt(parts[0], 10);
    if (parts[2]) {
      result2.deviceId = parseInt(parts[2], 10);
    } else {
      result2.deviceId = null;
    }
  } else {
    result2.bus = null;
    result2.deviceId = null;
  }
  const idVendor = util$2.getValue(lines, "idVendor", " ", true).trim();
  let vendorParts = idVendor.split(" ");
  vendorParts.shift();
  const vendor = vendorParts.join(" ");
  const idProduct = util$2.getValue(lines, "idProduct", " ", true).trim();
  let productParts = idProduct.split(" ");
  productParts.shift();
  const product = productParts.join(" ");
  const interfaceClass = util$2.getValue(lines, "bInterfaceClass", " ", true).trim();
  let interfaceClassParts = interfaceClass.split(" ");
  interfaceClassParts.shift();
  const usbType = interfaceClassParts.join(" ");
  const iManufacturer = util$2.getValue(lines, "iManufacturer", " ", true).trim();
  let iManufacturerParts = iManufacturer.split(" ");
  iManufacturerParts.shift();
  const manufacturer = iManufacturerParts.join(" ");
  const iSerial = util$2.getValue(lines, "iSerial", " ", true).trim();
  let iSerialParts = iSerial.split(" ");
  iSerialParts.shift();
  const serial = iSerialParts.join(" ");
  result2.id = (idVendor.startsWith("0x") ? idVendor.split(" ")[0].substr(2, 10) : "") + ":" + (idProduct.startsWith("0x") ? idProduct.split(" ")[0].substr(2, 10) : "");
  result2.name = product;
  result2.type = getLinuxUsbType(usbType, product);
  result2.removable = null;
  result2.vendor = vendor;
  result2.manufacturer = manufacturer;
  result2.maxPower = util$2.getValue(lines, "MaxPower", " ", true);
  result2.serialNumber = serial;
  return result2;
}
function getDarwinUsbType(name) {
  let result2 = "";
  if (name.indexOf("camera") >= 0) {
    result2 = "Camera";
  } else if (name.indexOf("touch bar") >= 0) {
    result2 = "Touch Bar";
  } else if (name.indexOf("controller") >= 0) {
    result2 = "Controller";
  } else if (name.indexOf("headset") >= 0) {
    result2 = "Audio";
  } else if (name.indexOf("keyboard") >= 0) {
    result2 = "Keyboard";
  } else if (name.indexOf("trackpad") >= 0) {
    result2 = "Trackpad";
  } else if (name.indexOf("sensor") >= 0) {
    result2 = "Sensor";
  } else if (name.indexOf("bthusb") >= 0) {
    result2 = "Bluetooth";
  } else if (name.indexOf("bth") >= 0) {
    result2 = "Bluetooth";
  } else if (name.indexOf("rfcomm") >= 0) {
    result2 = "Bluetooth";
  } else if (name.indexOf("usbhub") >= 0) {
    result2 = "Hub";
  } else if (name.indexOf(" hub") >= 0) {
    result2 = "Hub";
  } else if (name.indexOf("mouse") >= 0) {
    result2 = "Mouse";
  } else if (name.indexOf("microp") >= 0) {
    result2 = "Microphone";
  } else if (name.indexOf("removable") >= 0) {
    result2 = "Storage";
  }
  return result2;
}
function parseDarwinUsb(usb2, id) {
  const result2 = {};
  result2.id = id;
  usb2 = usb2.replace(/ \|/g, "");
  usb2 = usb2.trim();
  let lines = usb2.split("\n");
  lines.shift();
  try {
    for (let i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim();
      lines[i] = lines[i].replace(/=/g, ":");
      if (lines[i] !== "{" && lines[i] !== "}" && lines[i + 1] && lines[i + 1].trim() !== "}") {
        lines[i] = lines[i] + ",";
      }
      lines[i] = lines[i].replace(":Yes,", ':"Yes",');
      lines[i] = lines[i].replace(": Yes,", ': "Yes",');
      lines[i] = lines[i].replace(": Yes", ': "Yes"');
      lines[i] = lines[i].replace(":No,", ':"No",');
      lines[i] = lines[i].replace(": No,", ': "No",');
      lines[i] = lines[i].replace(": No", ': "No"');
      lines[i] = lines[i].replace("((", "").replace("))", "");
      const match = /<(\w+)>/.exec(lines[i]);
      if (match) {
        const number = match[0];
        lines[i] = lines[i].replace(number, `"${number}"`);
      }
    }
    const usbObj = JSON.parse(lines.join("\n"));
    const removableDrive = (usbObj["Built-In"] ? usbObj["Built-In"].toLowerCase() !== "yes" : true) && (usbObj["non-removable"] ? usbObj["non-removable"].toLowerCase() === "no" : true);
    result2.bus = null;
    result2.deviceId = null;
    result2.id = usbObj["USB Address"] || null;
    result2.name = usbObj["kUSBProductString"] || usbObj["USB Product Name"] || null;
    result2.type = getDarwinUsbType((usbObj["kUSBProductString"] || usbObj["USB Product Name"] || "").toLowerCase() + (removableDrive ? " removable" : ""));
    result2.removable = usbObj["non-removable"] ? usbObj["non-removable"].toLowerCase() || false : true;
    result2.vendor = usbObj["kUSBVendorString"] || usbObj["USB Vendor Name"] || null;
    result2.manufacturer = usbObj["kUSBVendorString"] || usbObj["USB Vendor Name"] || null;
    result2.maxPower = null;
    result2.serialNumber = usbObj["kUSBSerialNumberString"] || null;
    if (result2.name) {
      return result2;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
function getWindowsUsbTypeCreation(creationclass, name) {
  let result2 = "";
  if (name.indexOf("storage") >= 0) {
    result2 = "Storage";
  } else if (name.indexOf("speicher") >= 0) {
    result2 = "Storage";
  } else if (creationclass.indexOf("usbhub") >= 0) {
    result2 = "Hub";
  } else if (creationclass.indexOf("storage") >= 0) {
    result2 = "Storage";
  } else if (creationclass.indexOf("usbcontroller") >= 0) {
    result2 = "Controller";
  } else if (creationclass.indexOf("keyboard") >= 0) {
    result2 = "Keyboard";
  } else if (creationclass.indexOf("pointing") >= 0) {
    result2 = "Mouse";
  } else if (creationclass.indexOf("microp") >= 0) {
    result2 = "Microphone";
  } else if (creationclass.indexOf("disk") >= 0) {
    result2 = "Storage";
  }
  return result2;
}
function parseWindowsUsb(lines, id) {
  const usbType = getWindowsUsbTypeCreation(util$2.getValue(lines, "CreationClassName", ":").toLowerCase(), util$2.getValue(lines, "name", ":").toLowerCase());
  if (usbType) {
    const result2 = {};
    result2.bus = null;
    result2.deviceId = util$2.getValue(lines, "deviceid", ":");
    result2.id = id;
    result2.name = util$2.getValue(lines, "name", ":");
    result2.type = usbType;
    result2.removable = null;
    result2.vendor = null;
    result2.manufacturer = util$2.getValue(lines, "Manufacturer", ":");
    result2.maxPower = null;
    result2.serialNumber = null;
    return result2;
  } else {
    return null;
  }
}
function usb(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux$2) {
        const cmd = "export LC_ALL=C; lsusb -v 2>/dev/null; unset LC_ALL";
        exec$2(cmd, { maxBuffer: 1024 * 1024 * 128 }, function(error, stdout) {
          if (!error) {
            const parts = ("\n\n" + stdout.toString()).split("\n\nBus ");
            for (let i = 1; i < parts.length; i++) {
              const usb2 = parseLinuxUsb(parts[i]);
              result2.push(usb2);
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$2) {
        let cmd = "ioreg -p IOUSB -c AppleUSBRootHubDevice -w0 -l";
        exec$2(cmd, { maxBuffer: 1024 * 1024 * 128 }, function(error, stdout) {
          if (!error) {
            const parts = stdout.toString().split(" +-o ");
            for (let i = 1; i < parts.length; i++) {
              const usb2 = parseDarwinUsb(parts[i]);
              if (usb2) {
                result2.push(usb2);
              }
            }
            if (callback) {
              callback(result2);
            }
            resolve(result2);
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows$2) {
        util$2.powerShell('Get-CimInstance CIM_LogicalDevice | where { $_.Description -match "USB"} | select Name,CreationClassName,DeviceId,Manufacturer | fl').then((stdout, error) => {
          if (!error) {
            const parts = stdout.toString().split(/\n\s*\n/);
            for (let i = 0; i < parts.length; i++) {
              const usb2 = parseWindowsUsb(parts[i].split("\n"), i);
              if (usb2 && result2.filter((x) => x.deviceId === usb2.deviceId).length === 0) {
                result2.push(usb2);
              }
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$2 || _freebsd$2 || _openbsd$2 || _netbsd$2) {
        resolve(null);
      }
    });
  });
}
usb$1.usb = usb;
var audio$1 = {};
const exec$1 = require$$1$1.exec;
const execSync$1 = require$$1$1.execSync;
const util$1 = util$j;
let _platform$1 = process.platform;
const _linux$1 = _platform$1 === "linux" || _platform$1 === "android";
const _darwin$1 = _platform$1 === "darwin";
const _windows$1 = _platform$1 === "win32";
const _freebsd$1 = _platform$1 === "freebsd";
const _openbsd$1 = _platform$1 === "openbsd";
const _netbsd$1 = _platform$1 === "netbsd";
const _sunos$1 = _platform$1 === "sunos";
function parseAudioType(str, input, output) {
  str = str.toLowerCase();
  let result2 = "";
  if (str.indexOf("input") >= 0) {
    result2 = "Microphone";
  }
  if (str.indexOf("display audio") >= 0) {
    result2 = "Speaker";
  }
  if (str.indexOf("speak") >= 0) {
    result2 = "Speaker";
  }
  if (str.indexOf("laut") >= 0) {
    result2 = "Speaker";
  }
  if (str.indexOf("loud") >= 0) {
    result2 = "Speaker";
  }
  if (str.indexOf("head") >= 0) {
    result2 = "Headset";
  }
  if (str.indexOf("mic") >= 0) {
    result2 = "Microphone";
  }
  if (str.indexOf("mikr") >= 0) {
    result2 = "Microphone";
  }
  if (str.indexOf("phone") >= 0) {
    result2 = "Phone";
  }
  if (str.indexOf("controll") >= 0) {
    result2 = "Controller";
  }
  if (str.indexOf("line o") >= 0) {
    result2 = "Line Out";
  }
  if (str.indexOf("digital o") >= 0) {
    result2 = "Digital Out";
  }
  if (str.indexOf("smart sound technology") >= 0) {
    result2 = "Digital Signal Processor";
  }
  if (str.indexOf("high definition audio") >= 0) {
    result2 = "Sound Driver";
  }
  if (!result2 && output) {
    result2 = "Speaker";
  } else if (!result2 && input) {
    result2 = "Microphone";
  }
  return result2;
}
function getLinuxAudioPci() {
  let cmd = "lspci -v 2>/dev/null";
  let result2 = [];
  try {
    const parts = execSync$1(cmd, util$1.execOptsLinux).toString().split("\n\n");
    parts.forEach((element) => {
      const lines = element.split("\n");
      if (lines && lines.length && lines[0].toLowerCase().indexOf("audio") >= 0) {
        const audio2 = {};
        audio2.slotId = lines[0].split(" ")[0];
        audio2.driver = util$1.getValue(lines, "Kernel driver in use", ":", true) || util$1.getValue(lines, "Kernel modules", ":", true);
        result2.push(audio2);
      }
    });
    return result2;
  } catch (e) {
    return result2;
  }
}
function parseLinuxAudioPciMM(lines, audioPCI) {
  const result2 = {};
  const slotId = util$1.getValue(lines, "Slot");
  const pciMatch = audioPCI.filter(function(item) {
    return item.slotId === slotId;
  });
  result2.id = slotId;
  result2.name = util$1.getValue(lines, "SDevice");
  result2.manufacturer = util$1.getValue(lines, "SVendor");
  result2.revision = util$1.getValue(lines, "Rev");
  result2.driver = pciMatch && pciMatch.length === 1 && pciMatch[0].driver ? pciMatch[0].driver : "";
  result2.default = null;
  result2.channel = "PCIe";
  result2.type = parseAudioType(result2.name, null, null);
  result2.in = null;
  result2.out = null;
  result2.status = "online";
  return result2;
}
function parseDarwinChannel(str) {
  let result2 = "";
  if (str.indexOf("builtin") >= 0) {
    result2 = "Built-In";
  }
  if (str.indexOf("extern") >= 0) {
    result2 = "Audio-Jack";
  }
  if (str.indexOf("hdmi") >= 0) {
    result2 = "HDMI";
  }
  if (str.indexOf("displayport") >= 0) {
    result2 = "Display-Port";
  }
  if (str.indexOf("usb") >= 0) {
    result2 = "USB";
  }
  if (str.indexOf("pci") >= 0) {
    result2 = "PCIe";
  }
  return result2;
}
function parseDarwinAudio(audioObject, id) {
  const result2 = {};
  const channelStr = ((audioObject.coreaudio_device_transport || "") + " " + (audioObject._name || "")).toLowerCase();
  result2.id = id;
  result2.name = audioObject._name;
  result2.manufacturer = audioObject.coreaudio_device_manufacturer;
  result2.revision = null;
  result2.driver = null;
  result2.default = !!(audioObject.coreaudio_default_audio_input_device || "") || !!(audioObject.coreaudio_default_audio_output_device || "");
  result2.channel = parseDarwinChannel(channelStr);
  result2.type = parseAudioType(result2.name, !!(audioObject.coreaudio_device_input || ""), !!(audioObject.coreaudio_device_output || ""));
  result2.in = !!(audioObject.coreaudio_device_input || "");
  result2.out = !!(audioObject.coreaudio_device_output || "");
  result2.status = "online";
  return result2;
}
function parseWindowsAudio(lines) {
  const result2 = {};
  const status = util$1.getValue(lines, "StatusInfo", ":");
  result2.id = util$1.getValue(lines, "DeviceID", ":");
  result2.name = util$1.getValue(lines, "name", ":");
  result2.manufacturer = util$1.getValue(lines, "manufacturer", ":");
  result2.revision = null;
  result2.driver = null;
  result2.default = null;
  result2.channel = null;
  result2.type = parseAudioType(result2.name, null, null);
  result2.in = null;
  result2.out = null;
  result2.status = status;
  return result2;
}
function audio(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux$1 || _freebsd$1 || _openbsd$1 || _netbsd$1) {
        let cmd = "lspci -vmm 2>/dev/null";
        exec$1(cmd, function(error, stdout) {
          if (!error) {
            const audioPCI = getLinuxAudioPci();
            const parts = stdout.toString().split("\n\n");
            parts.forEach((element) => {
              const lines = element.split("\n");
              if (util$1.getValue(lines, "class", ":", true).toLowerCase().indexOf("audio") >= 0) {
                const audio2 = parseLinuxAudioPciMM(lines, audioPCI);
                result2.push(audio2);
              }
            });
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_darwin$1) {
        let cmd = "system_profiler SPAudioDataType -json";
        exec$1(cmd, function(error, stdout) {
          if (!error) {
            try {
              const outObj = JSON.parse(stdout.toString());
              if (outObj.SPAudioDataType && outObj.SPAudioDataType.length && outObj.SPAudioDataType[0] && outObj.SPAudioDataType[0]["_items"] && outObj.SPAudioDataType[0]["_items"].length) {
                for (let i = 0; i < outObj.SPAudioDataType[0]["_items"].length; i++) {
                  const audio2 = parseDarwinAudio(outObj.SPAudioDataType[0]["_items"][i], i);
                  result2.push(audio2);
                }
              }
            } catch (e) {
              util$1.noop();
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows$1) {
        util$1.powerShell("Get-CimInstance Win32_SoundDevice | select DeviceID,StatusInfo,Name,Manufacturer | fl").then((stdout, error) => {
          if (!error) {
            const parts = stdout.toString().split(/\n\s*\n/);
            parts.forEach((element) => {
              const lines = element.split("\n");
              if (util$1.getValue(lines, "name", ":")) {
                result2.push(parseWindowsAudio(lines));
              }
            });
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_sunos$1) {
        resolve(null);
      }
    });
  });
}
audio$1.audio = audio;
var bluetooth = {};
var bluetoothVendors$1 = {
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
const exec = require$$1$1.exec;
const execSync = require$$1$1.execSync;
const path = require$$2$1;
const util = util$j;
const bluetoothVendors = bluetoothVendors$1;
const fs = require$$1$2;
let _platform = process.platform;
const _linux = _platform === "linux" || _platform === "android";
const _darwin = _platform === "darwin";
const _windows = _platform === "win32";
const _freebsd = _platform === "freebsd";
const _openbsd = _platform === "openbsd";
const _netbsd = _platform === "netbsd";
const _sunos = _platform === "sunos";
function parseBluetoothType(str) {
  let result2 = "";
  if (str.indexOf("keyboard") >= 0) {
    result2 = "Keyboard";
  }
  if (str.indexOf("mouse") >= 0) {
    result2 = "Mouse";
  }
  if (str.indexOf("trackpad") >= 0) {
    result2 = "Trackpad";
  }
  if (str.indexOf("speaker") >= 0) {
    result2 = "Speaker";
  }
  if (str.indexOf("headset") >= 0) {
    result2 = "Headset";
  }
  if (str.indexOf("phone") >= 0) {
    result2 = "Phone";
  }
  if (str.indexOf("macbook") >= 0) {
    result2 = "Computer";
  }
  if (str.indexOf("imac") >= 0) {
    result2 = "Computer";
  }
  if (str.indexOf("ipad") >= 0) {
    result2 = "Tablet";
  }
  if (str.indexOf("watch") >= 0) {
    result2 = "Watch";
  }
  if (str.indexOf("headphone") >= 0) {
    result2 = "Headset";
  }
  return result2;
}
function parseBluetoothManufacturer(str) {
  let result2 = str.split(" ")[0];
  str = str.toLowerCase();
  if (str.indexOf("apple") >= 0) {
    result2 = "Apple";
  }
  if (str.indexOf("ipad") >= 0) {
    result2 = "Apple";
  }
  if (str.indexOf("imac") >= 0) {
    result2 = "Apple";
  }
  if (str.indexOf("iphone") >= 0) {
    result2 = "Apple";
  }
  if (str.indexOf("magic mouse") >= 0) {
    result2 = "Apple";
  }
  if (str.indexOf("magic track") >= 0) {
    result2 = "Apple";
  }
  if (str.indexOf("macbook") >= 0) {
    result2 = "Apple";
  }
  return result2;
}
function parseBluetoothVendor(str) {
  const id = parseInt(str);
  if (!isNaN(id)) return bluetoothVendors[id];
}
function parseLinuxBluetoothInfo(lines, macAddr1, macAddr2) {
  const result2 = {};
  result2.device = null;
  result2.name = util.getValue(lines, "name", "=");
  result2.manufacturer = null;
  result2.macDevice = macAddr1;
  result2.macHost = macAddr2;
  result2.batteryPercent = null;
  result2.type = parseBluetoothType(result2.name.toLowerCase());
  result2.connected = false;
  return result2;
}
function parseDarwinBluetoothDevices(bluetoothObject, macAddr2) {
  const result2 = {};
  const typeStr = ((bluetoothObject.device_minorClassOfDevice_string || bluetoothObject.device_majorClassOfDevice_string || bluetoothObject.device_minorType || "") + (bluetoothObject.device_name || "")).toLowerCase();
  result2.device = bluetoothObject.device_services || "";
  result2.name = bluetoothObject.device_name || "";
  result2.manufacturer = bluetoothObject.device_manufacturer || parseBluetoothVendor(bluetoothObject.device_vendorID) || parseBluetoothManufacturer(bluetoothObject.device_name || "") || "";
  result2.macDevice = (bluetoothObject.device_addr || bluetoothObject.device_address || "").toLowerCase().replace(/-/g, ":");
  result2.macHost = macAddr2;
  result2.batteryPercent = bluetoothObject.device_batteryPercent || null;
  result2.type = parseBluetoothType(typeStr);
  result2.connected = bluetoothObject.device_isconnected === "attrib_Yes" || false;
  return result2;
}
function parseWindowsBluetooth(lines) {
  const result2 = {};
  result2.device = null;
  result2.name = util.getValue(lines, "name", ":");
  result2.manufacturer = util.getValue(lines, "manufacturer", ":");
  result2.macDevice = null;
  result2.macHost = null;
  result2.batteryPercent = null;
  result2.type = parseBluetoothType(result2.name.toLowerCase());
  result2.connected = null;
  return result2;
}
function bluetoothDevices(callback) {
  return new Promise((resolve) => {
    process.nextTick(() => {
      let result2 = [];
      if (_linux) {
        const btFiles = util.getFilesInPath("/var/lib/bluetooth/");
        btFiles.forEach((element) => {
          const filename = path.basename(element);
          const pathParts = element.split("/");
          const macAddr1 = pathParts.length >= 6 ? pathParts[pathParts.length - 2] : null;
          const macAddr2 = pathParts.length >= 7 ? pathParts[pathParts.length - 3] : null;
          if (filename === "info") {
            const infoFile = fs.readFileSync(element, { encoding: "utf8" }).split("\n");
            result2.push(parseLinuxBluetoothInfo(infoFile, macAddr1, macAddr2));
          }
        });
        try {
          const hdicon = execSync("hcitool con", util.execOptsLinux).toString().toLowerCase();
          for (let i = 0; i < result2.length; i++) {
            if (result2[i].macDevice && result2[i].macDevice.length > 10 && hdicon.indexOf(result2[i].macDevice.toLowerCase()) >= 0) {
              result2[i].connected = true;
            }
          }
        } catch (e) {
          util.noop();
        }
        if (callback) {
          callback(result2);
        }
        resolve(result2);
      }
      if (_darwin) {
        let cmd = "system_profiler SPBluetoothDataType -json";
        exec(cmd, function(error, stdout) {
          if (!error) {
            try {
              const outObj = JSON.parse(stdout.toString());
              if (outObj.SPBluetoothDataType && outObj.SPBluetoothDataType.length && outObj.SPBluetoothDataType[0] && outObj.SPBluetoothDataType[0]["device_title"] && outObj.SPBluetoothDataType[0]["device_title"].length) {
                let macAddr2 = null;
                if (outObj.SPBluetoothDataType[0]["local_device_title"] && outObj.SPBluetoothDataType[0].local_device_title.general_address) {
                  macAddr2 = outObj.SPBluetoothDataType[0].local_device_title.general_address.toLowerCase().replace(/-/g, ":");
                }
                outObj.SPBluetoothDataType[0]["device_title"].forEach((element) => {
                  const obj = element;
                  const objKey = Object.keys(obj);
                  if (objKey && objKey.length === 1) {
                    const innerObject = obj[objKey[0]];
                    innerObject.device_name = objKey[0];
                    const bluetoothDevice = parseDarwinBluetoothDevices(innerObject, macAddr2);
                    result2.push(bluetoothDevice);
                  }
                });
              }
              if (outObj.SPBluetoothDataType && outObj.SPBluetoothDataType.length && outObj.SPBluetoothDataType[0] && outObj.SPBluetoothDataType[0]["device_connected"] && outObj.SPBluetoothDataType[0]["device_connected"].length) {
                const macAddr2 = outObj.SPBluetoothDataType[0].controller_properties && outObj.SPBluetoothDataType[0].controller_properties.controller_address ? outObj.SPBluetoothDataType[0].controller_properties.controller_address.toLowerCase().replace(/-/g, ":") : null;
                outObj.SPBluetoothDataType[0]["device_connected"].forEach((element) => {
                  const obj = element;
                  const objKey = Object.keys(obj);
                  if (objKey && objKey.length === 1) {
                    const innerObject = obj[objKey[0]];
                    innerObject.device_name = objKey[0];
                    innerObject.device_isconnected = "attrib_Yes";
                    const bluetoothDevice = parseDarwinBluetoothDevices(innerObject, macAddr2);
                    result2.push(bluetoothDevice);
                  }
                });
              }
              if (outObj.SPBluetoothDataType && outObj.SPBluetoothDataType.length && outObj.SPBluetoothDataType[0] && outObj.SPBluetoothDataType[0]["device_not_connected"] && outObj.SPBluetoothDataType[0]["device_not_connected"].length) {
                const macAddr2 = outObj.SPBluetoothDataType[0].controller_properties && outObj.SPBluetoothDataType[0].controller_properties.controller_address ? outObj.SPBluetoothDataType[0].controller_properties.controller_address.toLowerCase().replace(/-/g, ":") : null;
                outObj.SPBluetoothDataType[0]["device_not_connected"].forEach((element) => {
                  const obj = element;
                  const objKey = Object.keys(obj);
                  if (objKey && objKey.length === 1) {
                    const innerObject = obj[objKey[0]];
                    innerObject.device_name = objKey[0];
                    innerObject.device_isconnected = "attrib_No";
                    const bluetoothDevice = parseDarwinBluetoothDevices(innerObject, macAddr2);
                    result2.push(bluetoothDevice);
                  }
                });
              }
            } catch (e) {
              util.noop();
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_windows) {
        util.powerShell("Get-CimInstance Win32_PNPEntity | select PNPClass, Name, Manufacturer | fl").then((stdout, error) => {
          if (!error) {
            const parts = stdout.toString().split(/\n\s*\n/);
            parts.forEach((part) => {
              if (util.getValue(part.split("\n"), "PNPClass", ":") === "Bluetooth") {
                result2.push(parseWindowsBluetooth(part.split("\n")));
              }
            });
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      }
      if (_freebsd || _netbsd || _openbsd || _sunos) {
        resolve(null);
      }
    });
  });
}
bluetooth.bluetoothDevices = bluetoothDevices;
(function(exports) {
  const lib_version = require$$0$1.version;
  const util2 = util$j;
  const system2 = system$1;
  const osInfo2 = osinfo;
  const cpu2 = cpu$1;
  const memory$1 = memory;
  const battery$1 = battery;
  const graphics2 = graphics$1;
  const filesystem$1 = filesystem;
  const network$1 = network;
  const wifi$1 = wifi;
  const processes2 = processes$1;
  const users2 = users$1;
  const internet$1 = internet;
  const docker$1 = docker;
  const vbox = virtualbox;
  const printer2 = printer$1;
  const usb2 = usb$1;
  const audio2 = audio$1;
  const bluetooth$1 = bluetooth;
  let _platform2 = process.platform;
  const _windows2 = _platform2 === "win32";
  const _freebsd2 = _platform2 === "freebsd";
  const _openbsd2 = _platform2 === "openbsd";
  const _netbsd2 = _platform2 === "netbsd";
  const _sunos2 = _platform2 === "sunos";
  if (_windows2) {
    util2.getCodepage();
    util2.getPowershell();
  }
  function version2() {
    return lib_version;
  }
  function getStaticData(callback) {
    return new Promise((resolve) => {
      process.nextTick(() => {
        let data = {};
        data.version = version2();
        Promise.all([
          system2.system(),
          system2.bios(),
          system2.baseboard(),
          system2.chassis(),
          osInfo2.osInfo(),
          osInfo2.uuid(),
          osInfo2.versions(),
          cpu2.cpu(),
          cpu2.cpuFlags(),
          graphics2.graphics(),
          network$1.networkInterfaces(),
          memory$1.memLayout(),
          filesystem$1.diskLayout()
        ]).then((res) => {
          data.system = res[0];
          data.bios = res[1];
          data.baseboard = res[2];
          data.chassis = res[3];
          data.os = res[4];
          data.uuid = res[5];
          data.versions = res[6];
          data.cpu = res[7];
          data.cpu.flags = res[8];
          data.graphics = res[9];
          data.net = res[10];
          data.memLayout = res[11];
          data.diskLayout = res[12];
          if (callback) {
            callback(data);
          }
          resolve(data);
        });
      });
    });
  }
  function getDynamicData(srv, iface, callback) {
    if (util2.isFunction(iface)) {
      callback = iface;
      iface = "";
    }
    if (util2.isFunction(srv)) {
      callback = srv;
      srv = "";
    }
    return new Promise((resolve) => {
      process.nextTick(() => {
        iface = iface || network$1.getDefaultNetworkInterface();
        srv = srv || "";
        let functionProcessed = function() {
          let totalFunctions = 15;
          if (_windows2) {
            totalFunctions = 13;
          }
          if (_freebsd2 || _openbsd2 || _netbsd2) {
            totalFunctions = 11;
          }
          if (_sunos2) {
            totalFunctions = 6;
          }
          return function() {
            if (--totalFunctions === 0) {
              if (callback) {
                callback(data);
              }
              resolve(data);
            }
          };
        }();
        let data = {};
        data.time = osInfo2.time();
        data.node = process.versions.node;
        data.v8 = process.versions.v8;
        cpu2.cpuCurrentSpeed().then((res) => {
          data.cpuCurrentSpeed = res;
          functionProcessed();
        });
        users2.users().then((res) => {
          data.users = res;
          functionProcessed();
        });
        processes2.processes().then((res) => {
          data.processes = res;
          functionProcessed();
        });
        cpu2.currentLoad().then((res) => {
          data.currentLoad = res;
          functionProcessed();
        });
        if (!_sunos2) {
          cpu2.cpuTemperature().then((res) => {
            data.temp = res;
            functionProcessed();
          });
        }
        if (!_openbsd2 && !_freebsd2 && !_netbsd2 && !_sunos2) {
          network$1.networkStats(iface).then((res) => {
            data.networkStats = res;
            functionProcessed();
          });
        }
        if (!_sunos2) {
          network$1.networkConnections().then((res) => {
            data.networkConnections = res;
            functionProcessed();
          });
        }
        memory$1.mem().then((res) => {
          data.mem = res;
          functionProcessed();
        });
        if (!_sunos2) {
          battery$1().then((res) => {
            data.battery = res;
            functionProcessed();
          });
        }
        if (!_sunos2) {
          processes2.services(srv).then((res) => {
            data.services = res;
            functionProcessed();
          });
        }
        if (!_sunos2) {
          filesystem$1.fsSize().then((res) => {
            data.fsSize = res;
            functionProcessed();
          });
        }
        if (!_windows2 && !_openbsd2 && !_freebsd2 && !_netbsd2 && !_sunos2) {
          filesystem$1.fsStats().then((res) => {
            data.fsStats = res;
            functionProcessed();
          });
        }
        if (!_windows2 && !_openbsd2 && !_freebsd2 && !_netbsd2 && !_sunos2) {
          filesystem$1.disksIO().then((res) => {
            data.disksIO = res;
            functionProcessed();
          });
        }
        if (!_openbsd2 && !_freebsd2 && !_netbsd2 && !_sunos2) {
          wifi$1.wifiNetworks().then((res) => {
            data.wifiNetworks = res;
            functionProcessed();
          });
        }
        internet$1.inetLatency().then((res) => {
          data.inetLatency = res;
          functionProcessed();
        });
      });
    });
  }
  function getAllData(srv, iface, callback) {
    return new Promise((resolve) => {
      process.nextTick(() => {
        let data = {};
        if (iface && util2.isFunction(iface) && !callback) {
          callback = iface;
          iface = "";
        }
        if (srv && util2.isFunction(srv) && !iface && !callback) {
          callback = srv;
          srv = "";
          iface = "";
        }
        getStaticData().then((res) => {
          data = res;
          getDynamicData(srv, iface).then((res2) => {
            for (let key2 in res2) {
              if ({}.hasOwnProperty.call(res2, key2)) {
                data[key2] = res2[key2];
              }
            }
            if (callback) {
              callback(data);
            }
            resolve(data);
          });
        });
      });
    });
  }
  function get(valueObject, callback) {
    return new Promise((resolve) => {
      process.nextTick(() => {
        const allPromises = Object.keys(valueObject).filter((func) => ({}).hasOwnProperty.call(exports, func)).map((func) => {
          const params = valueObject[func].substring(valueObject[func].lastIndexOf("(") + 1, valueObject[func].lastIndexOf(")"));
          let funcWithoutParams = func.indexOf(")") >= 0 ? func.split(")")[1].trim() : func;
          funcWithoutParams = func.indexOf("|") >= 0 ? func.split("|")[0].trim() : funcWithoutParams;
          if (params) {
            return exports[funcWithoutParams](params);
          } else {
            return exports[funcWithoutParams]("");
          }
        });
        Promise.all(allPromises).then((data) => {
          const result2 = {};
          let i = 0;
          for (let key2 in valueObject) {
            if ({}.hasOwnProperty.call(valueObject, key2) && {}.hasOwnProperty.call(exports, key2) && data.length > i) {
              if (valueObject[key2] === "*" || valueObject[key2] === "all") {
                result2[key2] = data[i];
              } else {
                let keys = valueObject[key2];
                let filter = "";
                let filterParts = [];
                if (keys.indexOf(")") >= 0) {
                  keys = keys.split(")")[1].trim();
                }
                if (keys.indexOf("|") >= 0) {
                  filter = keys.split("|")[1].trim();
                  filterParts = filter.split(":");
                  keys = keys.split("|")[0].trim();
                }
                keys = keys.replace(/,/g, " ").replace(/ +/g, " ").split(" ");
                if (data[i]) {
                  if (Array.isArray(data[i])) {
                    const partialArray = [];
                    data[i].forEach((element) => {
                      let partialRes = {};
                      if (keys.length === 1 && (keys[0] === "*" || keys[0] === "all")) {
                        partialRes = element;
                      } else {
                        keys.forEach((k) => {
                          if ({}.hasOwnProperty.call(element, k)) {
                            partialRes[k] = element[k];
                          }
                        });
                      }
                      if (filter && filterParts.length === 2) {
                        if ({}.hasOwnProperty.call(partialRes, filterParts[0].trim())) {
                          const val = partialRes[filterParts[0].trim()];
                          if (typeof val == "number") {
                            if (val === parseFloat(filterParts[1].trim())) {
                              partialArray.push(partialRes);
                            }
                          } else if (typeof val == "string") {
                            if (val.toLowerCase() === filterParts[1].trim().toLowerCase()) {
                              partialArray.push(partialRes);
                            }
                          }
                        }
                      } else {
                        partialArray.push(partialRes);
                      }
                    });
                    result2[key2] = partialArray;
                  } else {
                    const partialRes = {};
                    keys.forEach((k) => {
                      if ({}.hasOwnProperty.call(data[i], k)) {
                        partialRes[k] = data[i][k];
                      }
                    });
                    result2[key2] = partialRes;
                  }
                } else {
                  result2[key2] = {};
                }
              }
              i++;
            }
          }
          if (callback) {
            callback(result2);
          }
          resolve(result2);
        });
      });
    });
  }
  function observe(valueObject, interval, callback) {
    let _data = null;
    const result2 = setInterval(() => {
      get(valueObject).then((data) => {
        if (JSON.stringify(_data) !== JSON.stringify(data)) {
          _data = Object.assign({}, data);
          callback(data);
        }
      });
    }, interval);
    return result2;
  }
  exports.version = version2;
  exports.system = system2.system;
  exports.bios = system2.bios;
  exports.baseboard = system2.baseboard;
  exports.chassis = system2.chassis;
  exports.time = osInfo2.time;
  exports.osInfo = osInfo2.osInfo;
  exports.versions = osInfo2.versions;
  exports.shell = osInfo2.shell;
  exports.uuid = osInfo2.uuid;
  exports.cpu = cpu2.cpu;
  exports.cpuFlags = cpu2.cpuFlags;
  exports.cpuCache = cpu2.cpuCache;
  exports.cpuCurrentSpeed = cpu2.cpuCurrentSpeed;
  exports.cpuTemperature = cpu2.cpuTemperature;
  exports.currentLoad = cpu2.currentLoad;
  exports.fullLoad = cpu2.fullLoad;
  exports.mem = memory$1.mem;
  exports.memLayout = memory$1.memLayout;
  exports.battery = battery$1;
  exports.graphics = graphics2.graphics;
  exports.fsSize = filesystem$1.fsSize;
  exports.fsOpenFiles = filesystem$1.fsOpenFiles;
  exports.blockDevices = filesystem$1.blockDevices;
  exports.fsStats = filesystem$1.fsStats;
  exports.disksIO = filesystem$1.disksIO;
  exports.diskLayout = filesystem$1.diskLayout;
  exports.networkInterfaceDefault = network$1.networkInterfaceDefault;
  exports.networkGatewayDefault = network$1.networkGatewayDefault;
  exports.networkInterfaces = network$1.networkInterfaces;
  exports.networkStats = network$1.networkStats;
  exports.networkConnections = network$1.networkConnections;
  exports.wifiNetworks = wifi$1.wifiNetworks;
  exports.wifiInterfaces = wifi$1.wifiInterfaces;
  exports.wifiConnections = wifi$1.wifiConnections;
  exports.services = processes2.services;
  exports.processes = processes2.processes;
  exports.processLoad = processes2.processLoad;
  exports.users = users2.users;
  exports.inetChecksite = internet$1.inetChecksite;
  exports.inetLatency = internet$1.inetLatency;
  exports.dockerInfo = docker$1.dockerInfo;
  exports.dockerImages = docker$1.dockerImages;
  exports.dockerContainers = docker$1.dockerContainers;
  exports.dockerContainerStats = docker$1.dockerContainerStats;
  exports.dockerContainerProcesses = docker$1.dockerContainerProcesses;
  exports.dockerVolumes = docker$1.dockerVolumes;
  exports.dockerAll = docker$1.dockerAll;
  exports.vboxInfo = vbox.vboxInfo;
  exports.printer = printer2.printer;
  exports.usb = usb2.usb;
  exports.audio = audio2.audio;
  exports.bluetoothDevices = bluetooth$1.bluetoothDevices;
  exports.getStaticData = getStaticData;
  exports.getDynamicData = getDynamicData;
  exports.getAllData = getAllData;
  exports.get = get;
  exports.observe = observe;
  exports.powerShellStart = util2.powerShellStart;
  exports.powerShellRelease = util2.powerShellRelease;
})(lib$1);
const si = /* @__PURE__ */ getDefaultExportFromCjs(lib$1);
var dist = {};
var darwin = {};
var constants = {};
Object.defineProperty(constants, "__esModule", { value: true });
constants.Constants = void 0;
var Constants = (
  /** @class */
  function() {
    function Constants2() {
    }
    Constants2.WINDOWS_COMMAND = "wmic logicaldisk get Caption,FreeSpace,Size,VolumeSerialNumber,Description  /format:list";
    Constants2.LINUX_COMMAND = "df -P | awk 'NR > 1'";
    Constants2.DARWIN_COMMAND = "df -P | awk 'NR > 1'";
    return Constants2;
  }()
);
constants.Constants = Constants;
var drive = {};
Object.defineProperty(drive, "__esModule", { value: true });
var Drive = (
  /** @class */
  function() {
    function Drive2(filesystem2, blocks, used, available, capacity, mounted) {
      this._filesystem = filesystem2;
      this._blocks = blocks;
      this._used = used;
      this._available = available;
      this._capacity = capacity;
      this._mounted = mounted;
    }
    Object.defineProperty(Drive2.prototype, "filesystem", {
      /**
       * Drive filesystem.
       *
       * @return Gets drive filesystem.
       */
      get: function() {
        return this._filesystem;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Drive2.prototype, "blocks", {
      /**
       * Blocks associated to disk.
       *
       * @return Gets blocks associated to disk.
       */
      get: function() {
        return this._blocks;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Drive2.prototype, "used", {
      /**
       * Used disk space.
       *
       * @return Gets used disk space.
       */
      get: function() {
        return this._used;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Drive2.prototype, "available", {
      /**
       * Available disk space.
       *
       * @return Gets available disk space.
       */
      get: function() {
        return this._available;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Drive2.prototype, "capacity", {
      /**
       * Disk capacity.
       *
       * @return Gets disk capacity.
       */
      get: function() {
        return this._capacity;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Drive2.prototype, "mounted", {
      /**
       * Indicates the mount point of the disk.
       *
       * @return Gets the mount point of the disk.
       */
      get: function() {
        return this._mounted;
      },
      enumerable: false,
      configurable: true
    });
    return Drive2;
  }()
);
drive.default = Drive;
var utils = {};
var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  Object.defineProperty(o, k2, { enumerable: true, get: function() {
    return m[k];
  } });
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
});
var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
} : function(o, v) {
  o["default"] = v;
});
var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
  if (mod && mod.__esModule) return mod;
  var result2 = {};
  if (mod != null) {
    for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result2, mod, k);
  }
  __setModuleDefault(result2, mod);
  return result2;
};
Object.defineProperty(utils, "__esModule", { value: true });
utils.Utils = void 0;
var os = __importStar(os$a);
var child_process_1 = require$$1$1;
var Utils = (
  /** @class */
  function() {
    function Utils2() {
    }
    Utils2.detectPlatform = function() {
      return os.platform().toLowerCase();
    };
    Utils2.chcp = function() {
      return child_process_1.execSync("chcp").toString().split(":")[1].trim();
    };
    Utils2.execute = function(command) {
      return child_process_1.execSync(command, { windowsHide: true, encoding: "buffer" });
    };
    return Utils2;
  }()
);
utils.Utils = Utils;
var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(darwin, "__esModule", { value: true });
darwin.Darwin = void 0;
var constants_1$2 = constants;
var drive_1$2 = __importDefault$2(drive);
var utils_1$3 = utils;
var Darwin = (
  /** @class */
  function() {
    function Darwin2() {
    }
    Darwin2.run = function() {
      var drives = [];
      var buffer2 = utils_1$3.Utils.execute(constants_1$2.Constants.DARWIN_COMMAND);
      var lines = buffer2.toString().split("\n");
      lines.forEach(function(value, index, array) {
        if (value !== "") {
          var line = value.replace(/ +(?= )/g, "");
          var tokens = line.split(" ");
          var d = new drive_1$2.default(tokens[0], isNaN(parseFloat(tokens[1])) ? 0 : +tokens[1], isNaN(parseFloat(tokens[2])) ? 0 : +tokens[2], isNaN(parseFloat(tokens[3])) ? 0 : +tokens[3], tokens[4], tokens[5]);
          drives.push(d);
        }
      });
      return drives;
    };
    return Darwin2;
  }()
);
darwin.Darwin = Darwin;
var linux = {};
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(linux, "__esModule", { value: true });
linux.Linux = void 0;
var constants_1$1 = constants;
var drive_1$1 = __importDefault$1(drive);
var utils_1$2 = utils;
var Linux = (
  /** @class */
  function() {
    function Linux2() {
    }
    Linux2.run = function() {
      var drives = [];
      var buffer2 = utils_1$2.Utils.execute(constants_1$1.Constants.LINUX_COMMAND);
      var lines = buffer2.toString().split("\n");
      lines.forEach(function(value) {
        if (value !== "") {
          var line = value.replace(/ +(?= )/g, "");
          var tokens = line.split(" ");
          var d = new drive_1$1.default(tokens[0], isNaN(parseFloat(tokens[1])) ? 0 : +tokens[1], isNaN(parseFloat(tokens[2])) ? 0 : +tokens[2], isNaN(parseFloat(tokens[3])) ? 0 : +tokens[3], tokens[4], tokens[5]);
          drives.push(d);
        }
      });
      return drives;
    };
    return Linux2;
  }()
);
linux.Linux = Linux;
var windows = {};
var lib = { exports: {} };
var buffer = require$$0$3;
var Buffer2 = buffer.Buffer;
var safer = {};
var key;
for (key in buffer) {
  if (!buffer.hasOwnProperty(key)) continue;
  if (key === "SlowBuffer" || key === "Buffer") continue;
  safer[key] = buffer[key];
}
var Safer = safer.Buffer = {};
for (key in Buffer2) {
  if (!Buffer2.hasOwnProperty(key)) continue;
  if (key === "allocUnsafe" || key === "allocUnsafeSlow") continue;
  Safer[key] = Buffer2[key];
}
safer.Buffer.prototype = Buffer2.prototype;
if (!Safer.from || Safer.from === Uint8Array.from) {
  Safer.from = function(value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
    }
    if (value && typeof value.length === "undefined") {
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    return Buffer2(value, encodingOrOffset, length);
  };
}
if (!Safer.alloc) {
  Safer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
    }
    if (size < 0 || size >= 2 * (1 << 30)) {
      throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
    var buf = Buffer2(size);
    if (!fill || fill.length === 0) {
      buf.fill(0);
    } else if (typeof encoding === "string") {
      buf.fill(fill, encoding);
    } else {
      buf.fill(fill);
    }
    return buf;
  };
}
if (!safer.kStringMaxLength) {
  try {
    safer.kStringMaxLength = process.binding("buffer").kStringMaxLength;
  } catch (e) {
  }
}
if (!safer.constants) {
  safer.constants = {
    MAX_LENGTH: safer.kMaxLength
  };
  if (safer.kStringMaxLength) {
    safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
  }
}
var safer_1 = safer;
var bomHandling = {};
var BOMChar = "\uFEFF";
bomHandling.PrependBOM = PrependBOMWrapper;
function PrependBOMWrapper(encoder, options) {
  this.encoder = encoder;
  this.addBOM = true;
}
PrependBOMWrapper.prototype.write = function(str) {
  if (this.addBOM) {
    str = BOMChar + str;
    this.addBOM = false;
  }
  return this.encoder.write(str);
};
PrependBOMWrapper.prototype.end = function() {
  return this.encoder.end();
};
bomHandling.StripBOM = StripBOMWrapper;
function StripBOMWrapper(decoder, options) {
  this.decoder = decoder;
  this.pass = false;
  this.options = options || {};
}
StripBOMWrapper.prototype.write = function(buf) {
  var res = this.decoder.write(buf);
  if (this.pass || !res)
    return res;
  if (res[0] === BOMChar) {
    res = res.slice(1);
    if (typeof this.options.stripBOM === "function")
      this.options.stripBOM();
  }
  this.pass = true;
  return res;
};
StripBOMWrapper.prototype.end = function() {
  return this.decoder.end();
};
var encodings = {};
var internal;
var hasRequiredInternal;
function requireInternal() {
  if (hasRequiredInternal) return internal;
  hasRequiredInternal = 1;
  var Buffer3 = safer_1.Buffer;
  internal = {
    // Encodings
    utf8: { type: "_internal", bomAware: true },
    cesu8: { type: "_internal", bomAware: true },
    unicode11utf8: "utf8",
    ucs2: { type: "_internal", bomAware: true },
    utf16le: "ucs2",
    binary: { type: "_internal" },
    base64: { type: "_internal" },
    hex: { type: "_internal" },
    // Codec.
    _internal: InternalCodec
  };
  function InternalCodec(codecOptions, iconv) {
    this.enc = codecOptions.encodingName;
    this.bomAware = codecOptions.bomAware;
    if (this.enc === "base64")
      this.encoder = InternalEncoderBase64;
    else if (this.enc === "cesu8") {
      this.enc = "utf8";
      this.encoder = InternalEncoderCesu8;
      if (Buffer3.from("eda0bdedb2a9", "hex").toString() !== "💩") {
        this.decoder = InternalDecoderCesu8;
        this.defaultCharUnicode = iconv.defaultCharUnicode;
      }
    }
  }
  InternalCodec.prototype.encoder = InternalEncoder;
  InternalCodec.prototype.decoder = InternalDecoder;
  var StringDecoder = require$$1$3.StringDecoder;
  if (!StringDecoder.prototype.end)
    StringDecoder.prototype.end = function() {
    };
  function InternalDecoder(options, codec) {
    this.decoder = new StringDecoder(codec.enc);
  }
  InternalDecoder.prototype.write = function(buf) {
    if (!Buffer3.isBuffer(buf)) {
      buf = Buffer3.from(buf);
    }
    return this.decoder.write(buf);
  };
  InternalDecoder.prototype.end = function() {
    return this.decoder.end();
  };
  function InternalEncoder(options, codec) {
    this.enc = codec.enc;
  }
  InternalEncoder.prototype.write = function(str) {
    return Buffer3.from(str, this.enc);
  };
  InternalEncoder.prototype.end = function() {
  };
  function InternalEncoderBase64(options, codec) {
    this.prevStr = "";
  }
  InternalEncoderBase64.prototype.write = function(str) {
    str = this.prevStr + str;
    var completeQuads = str.length - str.length % 4;
    this.prevStr = str.slice(completeQuads);
    str = str.slice(0, completeQuads);
    return Buffer3.from(str, "base64");
  };
  InternalEncoderBase64.prototype.end = function() {
    return Buffer3.from(this.prevStr, "base64");
  };
  function InternalEncoderCesu8(options, codec) {
  }
  InternalEncoderCesu8.prototype.write = function(str) {
    var buf = Buffer3.alloc(str.length * 3), bufIdx = 0;
    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      if (charCode < 128)
        buf[bufIdx++] = charCode;
      else if (charCode < 2048) {
        buf[bufIdx++] = 192 + (charCode >>> 6);
        buf[bufIdx++] = 128 + (charCode & 63);
      } else {
        buf[bufIdx++] = 224 + (charCode >>> 12);
        buf[bufIdx++] = 128 + (charCode >>> 6 & 63);
        buf[bufIdx++] = 128 + (charCode & 63);
      }
    }
    return buf.slice(0, bufIdx);
  };
  InternalEncoderCesu8.prototype.end = function() {
  };
  function InternalDecoderCesu8(options, codec) {
    this.acc = 0;
    this.contBytes = 0;
    this.accBytes = 0;
    this.defaultCharUnicode = codec.defaultCharUnicode;
  }
  InternalDecoderCesu8.prototype.write = function(buf) {
    var acc = this.acc, contBytes = this.contBytes, accBytes = this.accBytes, res = "";
    for (var i = 0; i < buf.length; i++) {
      var curByte = buf[i];
      if ((curByte & 192) !== 128) {
        if (contBytes > 0) {
          res += this.defaultCharUnicode;
          contBytes = 0;
        }
        if (curByte < 128) {
          res += String.fromCharCode(curByte);
        } else if (curByte < 224) {
          acc = curByte & 31;
          contBytes = 1;
          accBytes = 1;
        } else if (curByte < 240) {
          acc = curByte & 15;
          contBytes = 2;
          accBytes = 1;
        } else {
          res += this.defaultCharUnicode;
        }
      } else {
        if (contBytes > 0) {
          acc = acc << 6 | curByte & 63;
          contBytes--;
          accBytes++;
          if (contBytes === 0) {
            if (accBytes === 2 && acc < 128 && acc > 0)
              res += this.defaultCharUnicode;
            else if (accBytes === 3 && acc < 2048)
              res += this.defaultCharUnicode;
            else
              res += String.fromCharCode(acc);
          }
        } else {
          res += this.defaultCharUnicode;
        }
      }
    }
    this.acc = acc;
    this.contBytes = contBytes;
    this.accBytes = accBytes;
    return res;
  };
  InternalDecoderCesu8.prototype.end = function() {
    var res = 0;
    if (this.contBytes > 0)
      res += this.defaultCharUnicode;
    return res;
  };
  return internal;
}
var utf32 = {};
var hasRequiredUtf32;
function requireUtf32() {
  if (hasRequiredUtf32) return utf32;
  hasRequiredUtf32 = 1;
  var Buffer3 = safer_1.Buffer;
  utf32._utf32 = Utf32Codec;
  function Utf32Codec(codecOptions, iconv) {
    this.iconv = iconv;
    this.bomAware = true;
    this.isLE = codecOptions.isLE;
  }
  utf32.utf32le = { type: "_utf32", isLE: true };
  utf32.utf32be = { type: "_utf32", isLE: false };
  utf32.ucs4le = "utf32le";
  utf32.ucs4be = "utf32be";
  Utf32Codec.prototype.encoder = Utf32Encoder;
  Utf32Codec.prototype.decoder = Utf32Decoder;
  function Utf32Encoder(options, codec) {
    this.isLE = codec.isLE;
    this.highSurrogate = 0;
  }
  Utf32Encoder.prototype.write = function(str) {
    var src = Buffer3.from(str, "ucs2");
    var dst = Buffer3.alloc(src.length * 2);
    var write32 = this.isLE ? dst.writeUInt32LE : dst.writeUInt32BE;
    var offset = 0;
    for (var i = 0; i < src.length; i += 2) {
      var code = src.readUInt16LE(i);
      var isHighSurrogate = 55296 <= code && code < 56320;
      var isLowSurrogate = 56320 <= code && code < 57344;
      if (this.highSurrogate) {
        if (isHighSurrogate || !isLowSurrogate) {
          write32.call(dst, this.highSurrogate, offset);
          offset += 4;
        } else {
          var codepoint = (this.highSurrogate - 55296 << 10 | code - 56320) + 65536;
          write32.call(dst, codepoint, offset);
          offset += 4;
          this.highSurrogate = 0;
          continue;
        }
      }
      if (isHighSurrogate)
        this.highSurrogate = code;
      else {
        write32.call(dst, code, offset);
        offset += 4;
        this.highSurrogate = 0;
      }
    }
    if (offset < dst.length)
      dst = dst.slice(0, offset);
    return dst;
  };
  Utf32Encoder.prototype.end = function() {
    if (!this.highSurrogate)
      return;
    var buf = Buffer3.alloc(4);
    if (this.isLE)
      buf.writeUInt32LE(this.highSurrogate, 0);
    else
      buf.writeUInt32BE(this.highSurrogate, 0);
    this.highSurrogate = 0;
    return buf;
  };
  function Utf32Decoder(options, codec) {
    this.isLE = codec.isLE;
    this.badChar = codec.iconv.defaultCharUnicode.charCodeAt(0);
    this.overflow = [];
  }
  Utf32Decoder.prototype.write = function(src) {
    if (src.length === 0)
      return "";
    var i = 0;
    var codepoint = 0;
    var dst = Buffer3.alloc(src.length + 4);
    var offset = 0;
    var isLE = this.isLE;
    var overflow = this.overflow;
    var badChar = this.badChar;
    if (overflow.length > 0) {
      for (; i < src.length && overflow.length < 4; i++)
        overflow.push(src[i]);
      if (overflow.length === 4) {
        if (isLE) {
          codepoint = overflow[i] | overflow[i + 1] << 8 | overflow[i + 2] << 16 | overflow[i + 3] << 24;
        } else {
          codepoint = overflow[i + 3] | overflow[i + 2] << 8 | overflow[i + 1] << 16 | overflow[i] << 24;
        }
        overflow.length = 0;
        offset = _writeCodepoint(dst, offset, codepoint, badChar);
      }
    }
    for (; i < src.length - 3; i += 4) {
      if (isLE) {
        codepoint = src[i] | src[i + 1] << 8 | src[i + 2] << 16 | src[i + 3] << 24;
      } else {
        codepoint = src[i + 3] | src[i + 2] << 8 | src[i + 1] << 16 | src[i] << 24;
      }
      offset = _writeCodepoint(dst, offset, codepoint, badChar);
    }
    for (; i < src.length; i++) {
      overflow.push(src[i]);
    }
    return dst.slice(0, offset).toString("ucs2");
  };
  function _writeCodepoint(dst, offset, codepoint, badChar) {
    if (codepoint < 0 || codepoint > 1114111) {
      codepoint = badChar;
    }
    if (codepoint >= 65536) {
      codepoint -= 65536;
      var high = 55296 | codepoint >> 10;
      dst[offset++] = high & 255;
      dst[offset++] = high >> 8;
      var codepoint = 56320 | codepoint & 1023;
    }
    dst[offset++] = codepoint & 255;
    dst[offset++] = codepoint >> 8;
    return offset;
  }
  Utf32Decoder.prototype.end = function() {
    this.overflow.length = 0;
  };
  utf32.utf32 = Utf32AutoCodec;
  utf32.ucs4 = "utf32";
  function Utf32AutoCodec(options, iconv) {
    this.iconv = iconv;
  }
  Utf32AutoCodec.prototype.encoder = Utf32AutoEncoder;
  Utf32AutoCodec.prototype.decoder = Utf32AutoDecoder;
  function Utf32AutoEncoder(options, codec) {
    options = options || {};
    if (options.addBOM === void 0)
      options.addBOM = true;
    this.encoder = codec.iconv.getEncoder(options.defaultEncoding || "utf-32le", options);
  }
  Utf32AutoEncoder.prototype.write = function(str) {
    return this.encoder.write(str);
  };
  Utf32AutoEncoder.prototype.end = function() {
    return this.encoder.end();
  };
  function Utf32AutoDecoder(options, codec) {
    this.decoder = null;
    this.initialBufs = [];
    this.initialBufsLen = 0;
    this.options = options || {};
    this.iconv = codec.iconv;
  }
  Utf32AutoDecoder.prototype.write = function(buf) {
    if (!this.decoder) {
      this.initialBufs.push(buf);
      this.initialBufsLen += buf.length;
      if (this.initialBufsLen < 32)
        return "";
      var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(encoding, this.options);
      var resStr = "";
      for (var i = 0; i < this.initialBufs.length; i++)
        resStr += this.decoder.write(this.initialBufs[i]);
      this.initialBufs.length = this.initialBufsLen = 0;
      return resStr;
    }
    return this.decoder.write(buf);
  };
  Utf32AutoDecoder.prototype.end = function() {
    if (!this.decoder) {
      var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(encoding, this.options);
      var resStr = "";
      for (var i = 0; i < this.initialBufs.length; i++)
        resStr += this.decoder.write(this.initialBufs[i]);
      var trail = this.decoder.end();
      if (trail)
        resStr += trail;
      this.initialBufs.length = this.initialBufsLen = 0;
      return resStr;
    }
    return this.decoder.end();
  };
  function detectEncoding(bufs, defaultEncoding) {
    var b = [];
    var charsProcessed = 0;
    var invalidLE = 0, invalidBE = 0;
    var bmpCharsLE = 0, bmpCharsBE = 0;
    outer_loop:
      for (var i = 0; i < bufs.length; i++) {
        var buf = bufs[i];
        for (var j = 0; j < buf.length; j++) {
          b.push(buf[j]);
          if (b.length === 4) {
            if (charsProcessed === 0) {
              if (b[0] === 255 && b[1] === 254 && b[2] === 0 && b[3] === 0) {
                return "utf-32le";
              }
              if (b[0] === 0 && b[1] === 0 && b[2] === 254 && b[3] === 255) {
                return "utf-32be";
              }
            }
            if (b[0] !== 0 || b[1] > 16) invalidBE++;
            if (b[3] !== 0 || b[2] > 16) invalidLE++;
            if (b[0] === 0 && b[1] === 0 && (b[2] !== 0 || b[3] !== 0)) bmpCharsBE++;
            if ((b[0] !== 0 || b[1] !== 0) && b[2] === 0 && b[3] === 0) bmpCharsLE++;
            b.length = 0;
            charsProcessed++;
            if (charsProcessed >= 100) {
              break outer_loop;
            }
          }
        }
      }
    if (bmpCharsBE - invalidBE > bmpCharsLE - invalidLE) return "utf-32be";
    if (bmpCharsBE - invalidBE < bmpCharsLE - invalidLE) return "utf-32le";
    return defaultEncoding || "utf-32le";
  }
  return utf32;
}
var utf16 = {};
var hasRequiredUtf16;
function requireUtf16() {
  if (hasRequiredUtf16) return utf16;
  hasRequiredUtf16 = 1;
  var Buffer3 = safer_1.Buffer;
  utf16.utf16be = Utf16BECodec;
  function Utf16BECodec() {
  }
  Utf16BECodec.prototype.encoder = Utf16BEEncoder;
  Utf16BECodec.prototype.decoder = Utf16BEDecoder;
  Utf16BECodec.prototype.bomAware = true;
  function Utf16BEEncoder() {
  }
  Utf16BEEncoder.prototype.write = function(str) {
    var buf = Buffer3.from(str, "ucs2");
    for (var i = 0; i < buf.length; i += 2) {
      var tmp = buf[i];
      buf[i] = buf[i + 1];
      buf[i + 1] = tmp;
    }
    return buf;
  };
  Utf16BEEncoder.prototype.end = function() {
  };
  function Utf16BEDecoder() {
    this.overflowByte = -1;
  }
  Utf16BEDecoder.prototype.write = function(buf) {
    if (buf.length == 0)
      return "";
    var buf2 = Buffer3.alloc(buf.length + 1), i = 0, j = 0;
    if (this.overflowByte !== -1) {
      buf2[0] = buf[0];
      buf2[1] = this.overflowByte;
      i = 1;
      j = 2;
    }
    for (; i < buf.length - 1; i += 2, j += 2) {
      buf2[j] = buf[i + 1];
      buf2[j + 1] = buf[i];
    }
    this.overflowByte = i == buf.length - 1 ? buf[buf.length - 1] : -1;
    return buf2.slice(0, j).toString("ucs2");
  };
  Utf16BEDecoder.prototype.end = function() {
    this.overflowByte = -1;
  };
  utf16.utf16 = Utf16Codec;
  function Utf16Codec(codecOptions, iconv) {
    this.iconv = iconv;
  }
  Utf16Codec.prototype.encoder = Utf16Encoder;
  Utf16Codec.prototype.decoder = Utf16Decoder;
  function Utf16Encoder(options, codec) {
    options = options || {};
    if (options.addBOM === void 0)
      options.addBOM = true;
    this.encoder = codec.iconv.getEncoder("utf-16le", options);
  }
  Utf16Encoder.prototype.write = function(str) {
    return this.encoder.write(str);
  };
  Utf16Encoder.prototype.end = function() {
    return this.encoder.end();
  };
  function Utf16Decoder(options, codec) {
    this.decoder = null;
    this.initialBufs = [];
    this.initialBufsLen = 0;
    this.options = options || {};
    this.iconv = codec.iconv;
  }
  Utf16Decoder.prototype.write = function(buf) {
    if (!this.decoder) {
      this.initialBufs.push(buf);
      this.initialBufsLen += buf.length;
      if (this.initialBufsLen < 16)
        return "";
      var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(encoding, this.options);
      var resStr = "";
      for (var i = 0; i < this.initialBufs.length; i++)
        resStr += this.decoder.write(this.initialBufs[i]);
      this.initialBufs.length = this.initialBufsLen = 0;
      return resStr;
    }
    return this.decoder.write(buf);
  };
  Utf16Decoder.prototype.end = function() {
    if (!this.decoder) {
      var encoding = detectEncoding(this.initialBufs, this.options.defaultEncoding);
      this.decoder = this.iconv.getDecoder(encoding, this.options);
      var resStr = "";
      for (var i = 0; i < this.initialBufs.length; i++)
        resStr += this.decoder.write(this.initialBufs[i]);
      var trail = this.decoder.end();
      if (trail)
        resStr += trail;
      this.initialBufs.length = this.initialBufsLen = 0;
      return resStr;
    }
    return this.decoder.end();
  };
  function detectEncoding(bufs, defaultEncoding) {
    var b = [];
    var charsProcessed = 0;
    var asciiCharsLE = 0, asciiCharsBE = 0;
    outer_loop:
      for (var i = 0; i < bufs.length; i++) {
        var buf = bufs[i];
        for (var j = 0; j < buf.length; j++) {
          b.push(buf[j]);
          if (b.length === 2) {
            if (charsProcessed === 0) {
              if (b[0] === 255 && b[1] === 254) return "utf-16le";
              if (b[0] === 254 && b[1] === 255) return "utf-16be";
            }
            if (b[0] === 0 && b[1] !== 0) asciiCharsBE++;
            if (b[0] !== 0 && b[1] === 0) asciiCharsLE++;
            b.length = 0;
            charsProcessed++;
            if (charsProcessed >= 100) {
              break outer_loop;
            }
          }
        }
      }
    if (asciiCharsBE > asciiCharsLE) return "utf-16be";
    if (asciiCharsBE < asciiCharsLE) return "utf-16le";
    return defaultEncoding || "utf-16le";
  }
  return utf16;
}
var utf7 = {};
var hasRequiredUtf7;
function requireUtf7() {
  if (hasRequiredUtf7) return utf7;
  hasRequiredUtf7 = 1;
  var Buffer3 = safer_1.Buffer;
  utf7.utf7 = Utf7Codec;
  utf7.unicode11utf7 = "utf7";
  function Utf7Codec(codecOptions, iconv) {
    this.iconv = iconv;
  }
  Utf7Codec.prototype.encoder = Utf7Encoder;
  Utf7Codec.prototype.decoder = Utf7Decoder;
  Utf7Codec.prototype.bomAware = true;
  var nonDirectChars = /[^A-Za-z0-9'\(\),-\.\/:\? \n\r\t]+/g;
  function Utf7Encoder(options, codec) {
    this.iconv = codec.iconv;
  }
  Utf7Encoder.prototype.write = function(str) {
    return Buffer3.from(str.replace(nonDirectChars, (function(chunk) {
      return "+" + (chunk === "+" ? "" : this.iconv.encode(chunk, "utf16-be").toString("base64").replace(/=+$/, "")) + "-";
    }).bind(this)));
  };
  Utf7Encoder.prototype.end = function() {
  };
  function Utf7Decoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = "";
  }
  var base64Regex = /[A-Za-z0-9\/+]/;
  var base64Chars = [];
  for (var i = 0; i < 256; i++)
    base64Chars[i] = base64Regex.test(String.fromCharCode(i));
  var plusChar = "+".charCodeAt(0), minusChar = "-".charCodeAt(0), andChar = "&".charCodeAt(0);
  Utf7Decoder.prototype.write = function(buf) {
    var res = "", lastI = 0, inBase64 = this.inBase64, base64Accum = this.base64Accum;
    for (var i2 = 0; i2 < buf.length; i2++) {
      if (!inBase64) {
        if (buf[i2] == plusChar) {
          res += this.iconv.decode(buf.slice(lastI, i2), "ascii");
          lastI = i2 + 1;
          inBase64 = true;
        }
      } else {
        if (!base64Chars[buf[i2]]) {
          if (i2 == lastI && buf[i2] == minusChar) {
            res += "+";
          } else {
            var b64str = base64Accum + this.iconv.decode(buf.slice(lastI, i2), "ascii");
            res += this.iconv.decode(Buffer3.from(b64str, "base64"), "utf16-be");
          }
          if (buf[i2] != minusChar)
            i2--;
          lastI = i2 + 1;
          inBase64 = false;
          base64Accum = "";
        }
      }
    }
    if (!inBase64) {
      res += this.iconv.decode(buf.slice(lastI), "ascii");
    } else {
      var b64str = base64Accum + this.iconv.decode(buf.slice(lastI), "ascii");
      var canBeDecoded = b64str.length - b64str.length % 8;
      base64Accum = b64str.slice(canBeDecoded);
      b64str = b64str.slice(0, canBeDecoded);
      res += this.iconv.decode(Buffer3.from(b64str, "base64"), "utf16-be");
    }
    this.inBase64 = inBase64;
    this.base64Accum = base64Accum;
    return res;
  };
  Utf7Decoder.prototype.end = function() {
    var res = "";
    if (this.inBase64 && this.base64Accum.length > 0)
      res = this.iconv.decode(Buffer3.from(this.base64Accum, "base64"), "utf16-be");
    this.inBase64 = false;
    this.base64Accum = "";
    return res;
  };
  utf7.utf7imap = Utf7IMAPCodec;
  function Utf7IMAPCodec(codecOptions, iconv) {
    this.iconv = iconv;
  }
  Utf7IMAPCodec.prototype.encoder = Utf7IMAPEncoder;
  Utf7IMAPCodec.prototype.decoder = Utf7IMAPDecoder;
  Utf7IMAPCodec.prototype.bomAware = true;
  function Utf7IMAPEncoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = Buffer3.alloc(6);
    this.base64AccumIdx = 0;
  }
  Utf7IMAPEncoder.prototype.write = function(str) {
    var inBase64 = this.inBase64, base64Accum = this.base64Accum, base64AccumIdx = this.base64AccumIdx, buf = Buffer3.alloc(str.length * 5 + 10), bufIdx = 0;
    for (var i2 = 0; i2 < str.length; i2++) {
      var uChar = str.charCodeAt(i2);
      if (32 <= uChar && uChar <= 126) {
        if (inBase64) {
          if (base64AccumIdx > 0) {
            bufIdx += buf.write(base64Accum.slice(0, base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), bufIdx);
            base64AccumIdx = 0;
          }
          buf[bufIdx++] = minusChar;
          inBase64 = false;
        }
        if (!inBase64) {
          buf[bufIdx++] = uChar;
          if (uChar === andChar)
            buf[bufIdx++] = minusChar;
        }
      } else {
        if (!inBase64) {
          buf[bufIdx++] = andChar;
          inBase64 = true;
        }
        if (inBase64) {
          base64Accum[base64AccumIdx++] = uChar >> 8;
          base64Accum[base64AccumIdx++] = uChar & 255;
          if (base64AccumIdx == base64Accum.length) {
            bufIdx += buf.write(base64Accum.toString("base64").replace(/\//g, ","), bufIdx);
            base64AccumIdx = 0;
          }
        }
      }
    }
    this.inBase64 = inBase64;
    this.base64AccumIdx = base64AccumIdx;
    return buf.slice(0, bufIdx);
  };
  Utf7IMAPEncoder.prototype.end = function() {
    var buf = Buffer3.alloc(10), bufIdx = 0;
    if (this.inBase64) {
      if (this.base64AccumIdx > 0) {
        bufIdx += buf.write(this.base64Accum.slice(0, this.base64AccumIdx).toString("base64").replace(/\//g, ",").replace(/=+$/, ""), bufIdx);
        this.base64AccumIdx = 0;
      }
      buf[bufIdx++] = minusChar;
      this.inBase64 = false;
    }
    return buf.slice(0, bufIdx);
  };
  function Utf7IMAPDecoder(options, codec) {
    this.iconv = codec.iconv;
    this.inBase64 = false;
    this.base64Accum = "";
  }
  var base64IMAPChars = base64Chars.slice();
  base64IMAPChars[",".charCodeAt(0)] = true;
  Utf7IMAPDecoder.prototype.write = function(buf) {
    var res = "", lastI = 0, inBase64 = this.inBase64, base64Accum = this.base64Accum;
    for (var i2 = 0; i2 < buf.length; i2++) {
      if (!inBase64) {
        if (buf[i2] == andChar) {
          res += this.iconv.decode(buf.slice(lastI, i2), "ascii");
          lastI = i2 + 1;
          inBase64 = true;
        }
      } else {
        if (!base64IMAPChars[buf[i2]]) {
          if (i2 == lastI && buf[i2] == minusChar) {
            res += "&";
          } else {
            var b64str = base64Accum + this.iconv.decode(buf.slice(lastI, i2), "ascii").replace(/,/g, "/");
            res += this.iconv.decode(Buffer3.from(b64str, "base64"), "utf16-be");
          }
          if (buf[i2] != minusChar)
            i2--;
          lastI = i2 + 1;
          inBase64 = false;
          base64Accum = "";
        }
      }
    }
    if (!inBase64) {
      res += this.iconv.decode(buf.slice(lastI), "ascii");
    } else {
      var b64str = base64Accum + this.iconv.decode(buf.slice(lastI), "ascii").replace(/,/g, "/");
      var canBeDecoded = b64str.length - b64str.length % 8;
      base64Accum = b64str.slice(canBeDecoded);
      b64str = b64str.slice(0, canBeDecoded);
      res += this.iconv.decode(Buffer3.from(b64str, "base64"), "utf16-be");
    }
    this.inBase64 = inBase64;
    this.base64Accum = base64Accum;
    return res;
  };
  Utf7IMAPDecoder.prototype.end = function() {
    var res = "";
    if (this.inBase64 && this.base64Accum.length > 0)
      res = this.iconv.decode(Buffer3.from(this.base64Accum, "base64"), "utf16-be");
    this.inBase64 = false;
    this.base64Accum = "";
    return res;
  };
  return utf7;
}
var sbcsCodec = {};
var hasRequiredSbcsCodec;
function requireSbcsCodec() {
  if (hasRequiredSbcsCodec) return sbcsCodec;
  hasRequiredSbcsCodec = 1;
  var Buffer3 = safer_1.Buffer;
  sbcsCodec._sbcs = SBCSCodec;
  function SBCSCodec(codecOptions, iconv) {
    if (!codecOptions)
      throw new Error("SBCS codec is called without the data.");
    if (!codecOptions.chars || codecOptions.chars.length !== 128 && codecOptions.chars.length !== 256)
      throw new Error("Encoding '" + codecOptions.type + "' has incorrect 'chars' (must be of len 128 or 256)");
    if (codecOptions.chars.length === 128) {
      var asciiString = "";
      for (var i = 0; i < 128; i++)
        asciiString += String.fromCharCode(i);
      codecOptions.chars = asciiString + codecOptions.chars;
    }
    this.decodeBuf = Buffer3.from(codecOptions.chars, "ucs2");
    var encodeBuf = Buffer3.alloc(65536, iconv.defaultCharSingleByte.charCodeAt(0));
    for (var i = 0; i < codecOptions.chars.length; i++)
      encodeBuf[codecOptions.chars.charCodeAt(i)] = i;
    this.encodeBuf = encodeBuf;
  }
  SBCSCodec.prototype.encoder = SBCSEncoder;
  SBCSCodec.prototype.decoder = SBCSDecoder;
  function SBCSEncoder(options, codec) {
    this.encodeBuf = codec.encodeBuf;
  }
  SBCSEncoder.prototype.write = function(str) {
    var buf = Buffer3.alloc(str.length);
    for (var i = 0; i < str.length; i++)
      buf[i] = this.encodeBuf[str.charCodeAt(i)];
    return buf;
  };
  SBCSEncoder.prototype.end = function() {
  };
  function SBCSDecoder(options, codec) {
    this.decodeBuf = codec.decodeBuf;
  }
  SBCSDecoder.prototype.write = function(buf) {
    var decodeBuf = this.decodeBuf;
    var newBuf = Buffer3.alloc(buf.length * 2);
    var idx1 = 0, idx2 = 0;
    for (var i = 0; i < buf.length; i++) {
      idx1 = buf[i] * 2;
      idx2 = i * 2;
      newBuf[idx2] = decodeBuf[idx1];
      newBuf[idx2 + 1] = decodeBuf[idx1 + 1];
    }
    return newBuf.toString("ucs2");
  };
  SBCSDecoder.prototype.end = function() {
  };
  return sbcsCodec;
}
var sbcsData;
var hasRequiredSbcsData;
function requireSbcsData() {
  if (hasRequiredSbcsData) return sbcsData;
  hasRequiredSbcsData = 1;
  sbcsData = {
    // Not supported by iconv, not sure why.
    "10029": "maccenteuro",
    "maccenteuro": {
      "type": "_sbcs",
      "chars": "ÄĀāÉĄÖÜáąČäčĆćéŹźĎíďĒēĖóėôöõúĚěü†°Ę£§•¶ß®©™ę¨≠ģĮįĪ≤≥īĶ∂∑łĻļĽľĹĺŅņŃ¬√ńŇ∆«»… ňŐÕőŌ–—“”‘’÷◊ōŔŕŘ‹›řŖŗŠ‚„šŚśÁŤťÍŽžŪÓÔūŮÚůŰűŲųÝýķŻŁżĢˇ"
    },
    "808": "cp808",
    "ibm808": "cp808",
    "cp808": {
      "type": "_sbcs",
      "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№€■ "
    },
    "mik": {
      "type": "_sbcs",
      "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя└┴┬├─┼╣║╚╔╩╦╠═╬┐░▒▓│┤№§╗╝┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    "cp720": {
      "type": "_sbcs",
      "chars": "éâàçêëèïîّْô¤ـûùءآأؤ£إئابةتثجحخدذرزسشص«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ضطظعغفµقكلمنهوىي≡ًٌٍَُِ≈°∙·√ⁿ²■ "
    },
    // Aliases of generated encodings.
    "ascii8bit": "ascii",
    "usascii": "ascii",
    "ansix34": "ascii",
    "ansix341968": "ascii",
    "ansix341986": "ascii",
    "csascii": "ascii",
    "cp367": "ascii",
    "ibm367": "ascii",
    "isoir6": "ascii",
    "iso646us": "ascii",
    "iso646irv": "ascii",
    "us": "ascii",
    "latin1": "iso88591",
    "latin2": "iso88592",
    "latin3": "iso88593",
    "latin4": "iso88594",
    "latin5": "iso88599",
    "latin6": "iso885910",
    "latin7": "iso885913",
    "latin8": "iso885914",
    "latin9": "iso885915",
    "latin10": "iso885916",
    "csisolatin1": "iso88591",
    "csisolatin2": "iso88592",
    "csisolatin3": "iso88593",
    "csisolatin4": "iso88594",
    "csisolatincyrillic": "iso88595",
    "csisolatinarabic": "iso88596",
    "csisolatingreek": "iso88597",
    "csisolatinhebrew": "iso88598",
    "csisolatin5": "iso88599",
    "csisolatin6": "iso885910",
    "l1": "iso88591",
    "l2": "iso88592",
    "l3": "iso88593",
    "l4": "iso88594",
    "l5": "iso88599",
    "l6": "iso885910",
    "l7": "iso885913",
    "l8": "iso885914",
    "l9": "iso885915",
    "l10": "iso885916",
    "isoir14": "iso646jp",
    "isoir57": "iso646cn",
    "isoir100": "iso88591",
    "isoir101": "iso88592",
    "isoir109": "iso88593",
    "isoir110": "iso88594",
    "isoir144": "iso88595",
    "isoir127": "iso88596",
    "isoir126": "iso88597",
    "isoir138": "iso88598",
    "isoir148": "iso88599",
    "isoir157": "iso885910",
    "isoir166": "tis620",
    "isoir179": "iso885913",
    "isoir199": "iso885914",
    "isoir203": "iso885915",
    "isoir226": "iso885916",
    "cp819": "iso88591",
    "ibm819": "iso88591",
    "cyrillic": "iso88595",
    "arabic": "iso88596",
    "arabic8": "iso88596",
    "ecma114": "iso88596",
    "asmo708": "iso88596",
    "greek": "iso88597",
    "greek8": "iso88597",
    "ecma118": "iso88597",
    "elot928": "iso88597",
    "hebrew": "iso88598",
    "hebrew8": "iso88598",
    "turkish": "iso88599",
    "turkish8": "iso88599",
    "thai": "iso885911",
    "thai8": "iso885911",
    "celtic": "iso885914",
    "celtic8": "iso885914",
    "isoceltic": "iso885914",
    "tis6200": "tis620",
    "tis62025291": "tis620",
    "tis62025330": "tis620",
    "10000": "macroman",
    "10006": "macgreek",
    "10007": "maccyrillic",
    "10079": "maciceland",
    "10081": "macturkish",
    "cspc8codepage437": "cp437",
    "cspc775baltic": "cp775",
    "cspc850multilingual": "cp850",
    "cspcp852": "cp852",
    "cspc862latinhebrew": "cp862",
    "cpgr": "cp869",
    "msee": "cp1250",
    "mscyrl": "cp1251",
    "msansi": "cp1252",
    "msgreek": "cp1253",
    "msturk": "cp1254",
    "mshebr": "cp1255",
    "msarab": "cp1256",
    "winbaltrim": "cp1257",
    "cp20866": "koi8r",
    "20866": "koi8r",
    "ibm878": "koi8r",
    "cskoi8r": "koi8r",
    "cp21866": "koi8u",
    "21866": "koi8u",
    "ibm1168": "koi8u",
    "strk10482002": "rk1048",
    "tcvn5712": "tcvn",
    "tcvn57121": "tcvn",
    "gb198880": "iso646cn",
    "cn": "iso646cn",
    "csiso14jisc6220ro": "iso646jp",
    "jisc62201969ro": "iso646jp",
    "jp": "iso646jp",
    "cshproman8": "hproman8",
    "r8": "hproman8",
    "roman8": "hproman8",
    "xroman8": "hproman8",
    "ibm1051": "hproman8",
    "mac": "macintosh",
    "csmacintosh": "macintosh"
  };
  return sbcsData;
}
var sbcsDataGenerated;
var hasRequiredSbcsDataGenerated;
function requireSbcsDataGenerated() {
  if (hasRequiredSbcsDataGenerated) return sbcsDataGenerated;
  hasRequiredSbcsDataGenerated = 1;
  sbcsDataGenerated = {
    "437": "cp437",
    "737": "cp737",
    "775": "cp775",
    "850": "cp850",
    "852": "cp852",
    "855": "cp855",
    "856": "cp856",
    "857": "cp857",
    "858": "cp858",
    "860": "cp860",
    "861": "cp861",
    "862": "cp862",
    "863": "cp863",
    "864": "cp864",
    "865": "cp865",
    "866": "cp866",
    "869": "cp869",
    "874": "windows874",
    "922": "cp922",
    "1046": "cp1046",
    "1124": "cp1124",
    "1125": "cp1125",
    "1129": "cp1129",
    "1133": "cp1133",
    "1161": "cp1161",
    "1162": "cp1162",
    "1163": "cp1163",
    "1250": "windows1250",
    "1251": "windows1251",
    "1252": "windows1252",
    "1253": "windows1253",
    "1254": "windows1254",
    "1255": "windows1255",
    "1256": "windows1256",
    "1257": "windows1257",
    "1258": "windows1258",
    "28591": "iso88591",
    "28592": "iso88592",
    "28593": "iso88593",
    "28594": "iso88594",
    "28595": "iso88595",
    "28596": "iso88596",
    "28597": "iso88597",
    "28598": "iso88598",
    "28599": "iso88599",
    "28600": "iso885910",
    "28601": "iso885911",
    "28603": "iso885913",
    "28604": "iso885914",
    "28605": "iso885915",
    "28606": "iso885916",
    "windows874": {
      "type": "_sbcs",
      "chars": "€����…�����������‘’“”•–—�������� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    "win874": "windows874",
    "cp874": "windows874",
    "windows1250": {
      "type": "_sbcs",
      "chars": "€�‚�„…†‡�‰Š‹ŚŤŽŹ�‘’“”•–—�™š›śťžź ˇ˘Ł¤Ą¦§¨©Ş«¬­®Ż°±˛ł´µ¶·¸ąş»Ľ˝ľżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    "win1250": "windows1250",
    "cp1250": "windows1250",
    "windows1251": {
      "type": "_sbcs",
      "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—�™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Ї°±Ііґµ¶·ё№є»јЅѕїАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    "win1251": "windows1251",
    "cp1251": "windows1251",
    "windows1252": {
      "type": "_sbcs",
      "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ�Ž��‘’“”•–—˜™š›œ�žŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    "win1252": "windows1252",
    "cp1252": "windows1252",
    "windows1253": {
      "type": "_sbcs",
      "chars": "€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    "win1253": "windows1253",
    "cp1253": "windows1253",
    "windows1254": {
      "type": "_sbcs",
      "chars": "€�‚ƒ„…†‡ˆ‰Š‹Œ����‘’“”•–—˜™š›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    "win1254": "windows1254",
    "cp1254": "windows1254",
    "windows1255": {
      "type": "_sbcs",
      "chars": "€�‚ƒ„…†‡ˆ‰�‹�����‘’“”•–—˜™�›���� ¡¢£₪¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾¿ְֱֲֳִֵֶַָֹֺֻּֽ־ֿ׀ׁׂ׃װױײ׳״�������אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    "win1255": "windows1255",
    "cp1255": "windows1255",
    "windows1256": {
      "type": "_sbcs",
      "chars": "€پ‚ƒ„…†‡ˆ‰ٹ‹Œچژڈگ‘’“”•–—ک™ڑ›œ‌‍ں ،¢£¤¥¦§¨©ھ«¬­®¯°±²³´µ¶·¸¹؛»¼½¾؟ہءآأؤإئابةتثجحخدذرزسشصض×طظعغـفقكàلâمنهوçèéêëىيîïًٌٍَôُِ÷ّùْûü‎‏ے"
    },
    "win1256": "windows1256",
    "cp1256": "windows1256",
    "windows1257": {
      "type": "_sbcs",
      "chars": "€�‚�„…†‡�‰�‹�¨ˇ¸�‘’“”•–—�™�›�¯˛� �¢£¤�¦§Ø©Ŗ«¬­®Æ°±²³´µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž˙"
    },
    "win1257": "windows1257",
    "cp1257": "windows1257",
    "windows1258": {
      "type": "_sbcs",
      "chars": "€�‚ƒ„…†‡ˆ‰�‹Œ����‘’“”•–—˜™�›œ��Ÿ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    "win1258": "windows1258",
    "cp1258": "windows1258",
    "iso88591": {
      "type": "_sbcs",
      "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    "cp28591": "iso88591",
    "iso88592": {
      "type": "_sbcs",
      "chars": " Ą˘Ł¤ĽŚ§¨ŠŞŤŹ­ŽŻ°ą˛ł´ľśˇ¸šşťź˝žżŔÁÂĂÄĹĆÇČÉĘËĚÍÎĎĐŃŇÓÔŐÖ×ŘŮÚŰÜÝŢßŕáâăäĺćçčéęëěíîďđńňóôőö÷řůúűüýţ˙"
    },
    "cp28592": "iso88592",
    "iso88593": {
      "type": "_sbcs",
      "chars": " Ħ˘£¤�Ĥ§¨İŞĞĴ­�Ż°ħ²³´µĥ·¸ışğĵ½�żÀÁÂ�ÄĊĈÇÈÉÊËÌÍÎÏ�ÑÒÓÔĠÖ×ĜÙÚÛÜŬŜßàáâ�äċĉçèéêëìíîï�ñòóôġö÷ĝùúûüŭŝ˙"
    },
    "cp28593": "iso88593",
    "iso88594": {
      "type": "_sbcs",
      "chars": " ĄĸŖ¤ĨĻ§¨ŠĒĢŦ­Ž¯°ą˛ŗ´ĩļˇ¸šēģŧŊžŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎĪĐŅŌĶÔÕÖ×ØŲÚÛÜŨŪßāáâãäåæįčéęëėíîīđņōķôõö÷øųúûüũū˙"
    },
    "cp28594": "iso88594",
    "iso88595": {
      "type": "_sbcs",
      "chars": " ЁЂЃЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђѓєѕіїјљњћќ§ўџ"
    },
    "cp28595": "iso88595",
    "iso88596": {
      "type": "_sbcs",
      "chars": " ���¤�������،­�������������؛���؟�ءآأؤإئابةتثجحخدذرزسشصضطظعغ�����ـفقكلمنهوىيًٌٍَُِّْ�������������"
    },
    "cp28596": "iso88596",
    "iso88597": {
      "type": "_sbcs",
      "chars": " ‘’£€₯¦§¨©ͺ«¬­�―°±²³΄΅Ά·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�"
    },
    "cp28597": "iso88597",
    "iso88598": {
      "type": "_sbcs",
      "chars": " �¢£¤¥¦§¨©×«¬­®¯°±²³´µ¶·¸¹÷»¼½¾��������������������������������‗אבגדהוזחטיךכלםמןנסעףפץצקרשת��‎‏�"
    },
    "cp28598": "iso88598",
    "iso88599": {
      "type": "_sbcs",
      "chars": " ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏĞÑÒÓÔÕÖ×ØÙÚÛÜİŞßàáâãäåæçèéêëìíîïğñòóôõö÷øùúûüışÿ"
    },
    "cp28599": "iso88599",
    "iso885910": {
      "type": "_sbcs",
      "chars": " ĄĒĢĪĨĶ§ĻĐŠŦŽ­ŪŊ°ąēģīĩķ·ļđšŧž―ūŋĀÁÂÃÄÅÆĮČÉĘËĖÍÎÏÐŅŌÓÔÕÖŨØŲÚÛÜÝÞßāáâãäåæįčéęëėíîïðņōóôõöũøųúûüýþĸ"
    },
    "cp28600": "iso885910",
    "iso885911": {
      "type": "_sbcs",
      "chars": " กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    "cp28601": "iso885911",
    "iso885913": {
      "type": "_sbcs",
      "chars": " ”¢£¤„¦§Ø©Ŗ«¬­®Æ°±²³“µ¶·ø¹ŗ»¼½¾æĄĮĀĆÄÅĘĒČÉŹĖĢĶĪĻŠŃŅÓŌÕÖ×ŲŁŚŪÜŻŽßąįāćäåęēčéźėģķīļšńņóōõö÷ųłśūüżž’"
    },
    "cp28603": "iso885913",
    "iso885914": {
      "type": "_sbcs",
      "chars": " Ḃḃ£ĊċḊ§Ẁ©ẂḋỲ­®ŸḞḟĠġṀṁ¶ṖẁṗẃṠỳẄẅṡÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŴÑÒÓÔÕÖṪØÙÚÛÜÝŶßàáâãäåæçèéêëìíîïŵñòóôõöṫøùúûüýŷÿ"
    },
    "cp28604": "iso885914",
    "iso885915": {
      "type": "_sbcs",
      "chars": " ¡¢£€¥Š§š©ª«¬­®¯°±²³Žµ¶·ž¹º»ŒœŸ¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    "cp28605": "iso885915",
    "iso885916": {
      "type": "_sbcs",
      "chars": " ĄąŁ€„Š§š©Ș«Ź­źŻ°±ČłŽ”¶·žčș»ŒœŸżÀÁÂĂÄĆÆÇÈÉÊËÌÍÎÏĐŃÒÓÔŐÖŚŰÙÚÛÜĘȚßàáâăäćæçèéêëìíîïđńòóôőöśűùúûüęțÿ"
    },
    "cp28606": "iso885916",
    "cp437": {
      "type": "_sbcs",
      "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    "ibm437": "cp437",
    "csibm437": "cp437",
    "cp737": {
      "type": "_sbcs",
      "chars": "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρσςτυφχψ░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀ωάέήϊίόύϋώΆΈΉΊΌΎΏ±≥≤ΪΫ÷≈°∙·√ⁿ²■ "
    },
    "ibm737": "cp737",
    "csibm737": "cp737",
    "cp775": {
      "type": "_sbcs",
      "chars": "ĆüéāäģåćłēŖŗīŹÄÅÉæÆōöĢ¢ŚśÖÜø£Ø×¤ĀĪóŻżź”¦©®¬½¼Ł«»░▒▓│┤ĄČĘĖ╣║╗╝ĮŠ┐└┴┬├─┼ŲŪ╚╔╩╦╠═╬Žąčęėįšųūž┘┌█▄▌▐▀ÓßŌŃõÕµńĶķĻļņĒŅ’­±“¾¶§÷„°∙·¹³²■ "
    },
    "ibm775": "cp775",
    "csibm775": "cp775",
    "cp850": {
      "type": "_sbcs",
      "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    "ibm850": "cp850",
    "csibm850": "cp850",
    "cp852": {
      "type": "_sbcs",
      "chars": "ÇüéâäůćçłëŐőîŹÄĆÉĹĺôöĽľŚśÖÜŤťŁ×čáíóúĄąŽžĘę¬źČş«»░▒▓│┤ÁÂĚŞ╣║╗╝Żż┐└┴┬├─┼Ăă╚╔╩╦╠═╬¤đĐĎËďŇÍÎě┘┌█▄ŢŮ▀ÓßÔŃńňŠšŔÚŕŰýÝţ´­˝˛ˇ˘§÷¸°¨˙űŘř■ "
    },
    "ibm852": "cp852",
    "csibm852": "cp852",
    "cp855": {
      "type": "_sbcs",
      "chars": "ђЂѓЃёЁєЄѕЅіІїЇјЈљЉњЊћЋќЌўЎџЏюЮъЪаАбБцЦдДеЕфФгГ«»░▒▓│┤хХиИ╣║╗╝йЙ┐└┴┬├─┼кК╚╔╩╦╠═╬¤лЛмМнНоОп┘┌█▄Пя▀ЯрРсСтТуУжЖвВьЬ№­ыЫзЗшШэЭщЩчЧ§■ "
    },
    "ibm855": "cp855",
    "csibm855": "cp855",
    "cp856": {
      "type": "_sbcs",
      "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת�£�×����������®¬½¼�«»░▒▓│┤���©╣║╗╝¢¥┐└┴┬├─┼��╚╔╩╦╠═╬¤���������┘┌█▄¦�▀������µ�������¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    "ibm856": "cp856",
    "csibm856": "cp856",
    "cp857": {
      "type": "_sbcs",
      "chars": "ÇüéâäàåçêëèïîıÄÅÉæÆôöòûùİÖÜø£ØŞşáíóúñÑĞğ¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ºªÊËÈ�ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµ�×ÚÛÙìÿ¯´­±�¾¶§÷¸°¨·¹³²■ "
    },
    "ibm857": "cp857",
    "csibm857": "cp857",
    "cp858": {
      "type": "_sbcs",
      "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈ€ÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ "
    },
    "ibm858": "cp858",
    "csibm858": "cp858",
    "cp860": {
      "type": "_sbcs",
      "chars": "ÇüéâãàÁçêÊèÍÔìÃÂÉÀÈôõòÚùÌÕÜ¢£Ù₧ÓáíóúñÑªº¿Ò¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    "ibm860": "cp860",
    "csibm860": "cp860",
    "cp861": {
      "type": "_sbcs",
      "chars": "ÇüéâäàåçêëèÐðÞÄÅÉæÆôöþûÝýÖÜø£Ø₧ƒáíóúÁÍÓÚ¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    "ibm861": "cp861",
    "csibm861": "cp861",
    "cp862": {
      "type": "_sbcs",
      "chars": "אבגדהוזחטיךכלםמןנסעףפץצקרשת¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    "ibm862": "cp862",
    "csibm862": "cp862",
    "cp863": {
      "type": "_sbcs",
      "chars": "ÇüéâÂà¶çêëèïî‗À§ÉÈÊôËÏûù¤ÔÜ¢£ÙÛƒ¦´óú¨¸³¯Î⌐¬½¼¾«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    "ibm863": "cp863",
    "csibm863": "cp863",
    "cp864": {
      "type": "_sbcs",
      "chars": "\0\x07\b	\n\v\f\r\x1B !\"#$٪&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~°·∙√▒─│┼┤┬├┴┐┌└┘β∞φ±½¼≈«»ﻷﻸ��ﻻﻼ� ­ﺂ£¤ﺄ��ﺎﺏﺕﺙ،ﺝﺡﺥ٠١٢٣٤٥٦٧٨٩ﻑ؛ﺱﺵﺹ؟¢ﺀﺁﺃﺅﻊﺋﺍﺑﺓﺗﺛﺟﺣﺧﺩﺫﺭﺯﺳﺷﺻﺿﻁﻅﻋﻏ¦¬÷×ﻉـﻓﻗﻛﻟﻣﻧﻫﻭﻯﻳﺽﻌﻎﻍﻡﹽّﻥﻩﻬﻰﻲﻐﻕﻵﻶﻝﻙﻱ■�"
    },
    "ibm864": "cp864",
    "csibm864": "cp864",
    "cp865": {
      "type": "_sbcs",
      "chars": "ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø₧ƒáíóúñÑªº¿⌐¬½¼¡«¤░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ "
    },
    "ibm865": "cp865",
    "csibm865": "cp865",
    "cp866": {
      "type": "_sbcs",
      "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёЄєЇїЎў°∙·√№¤■ "
    },
    "ibm866": "cp866",
    "csibm866": "cp866",
    "cp869": {
      "type": "_sbcs",
      "chars": "������Ά�·¬¦‘’Έ―ΉΊΪΌ��ΎΫ©Ώ²³ά£έήίϊΐόύΑΒΓΔΕΖΗ½ΘΙ«»░▒▓│┤ΚΛΜΝ╣║╗╝ΞΟ┐└┴┬├─┼ΠΡ╚╔╩╦╠═╬ΣΤΥΦΧΨΩαβγ┘┌█▄δε▀ζηθικλμνξοπρσςτ΄­±υφχ§ψ΅°¨ωϋΰώ■ "
    },
    "ibm869": "cp869",
    "csibm869": "cp869",
    "cp922": {
      "type": "_sbcs",
      "chars": " ¡¢£¤¥¦§¨©ª«¬­®‾°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏŠÑÒÓÔÕÖ×ØÙÚÛÜÝŽßàáâãäåæçèéêëìíîïšñòóôõö÷øùúûüýžÿ"
    },
    "ibm922": "cp922",
    "csibm922": "cp922",
    "cp1046": {
      "type": "_sbcs",
      "chars": "ﺈ×÷ﹱ■│─┐┌└┘ﹹﹻﹽﹿﹷﺊﻰﻳﻲﻎﻏﻐﻶﻸﻺﻼ ¤ﺋﺑﺗﺛﺟﺣ،­ﺧﺳ٠١٢٣٤٥٦٧٨٩ﺷ؛ﺻﺿﻊ؟ﻋءآأؤإئابةتثجحخدذرزسشصضطﻇعغﻌﺂﺄﺎﻓـفقكلمنهوىيًٌٍَُِّْﻗﻛﻟﻵﻷﻹﻻﻣﻧﻬﻩ�"
    },
    "ibm1046": "cp1046",
    "csibm1046": "cp1046",
    "cp1124": {
      "type": "_sbcs",
      "chars": " ЁЂҐЄЅІЇЈЉЊЋЌ­ЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя№ёђґєѕіїјљњћќ§ўџ"
    },
    "ibm1124": "cp1124",
    "csibm1124": "cp1124",
    "cp1125": {
      "type": "_sbcs",
      "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмноп░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀рстуфхцчшщъыьэюяЁёҐґЄєІіЇї·√№¤■ "
    },
    "ibm1125": "cp1125",
    "csibm1125": "cp1125",
    "cp1129": {
      "type": "_sbcs",
      "chars": " ¡¢£¤¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    "ibm1129": "cp1129",
    "csibm1129": "cp1129",
    "cp1133": {
      "type": "_sbcs",
      "chars": " ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ���ຯະາຳິີຶືຸູຼັົຽ���ເແໂໃໄ່້໊໋໌ໍໆ�ໜໝ₭����������������໐໑໒໓໔໕໖໗໘໙��¢¬¦�"
    },
    "ibm1133": "cp1133",
    "csibm1133": "cp1133",
    "cp1161": {
      "type": "_sbcs",
      "chars": "��������������������������������่กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู้๊๋€฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛¢¬¦ "
    },
    "ibm1161": "cp1161",
    "csibm1161": "cp1161",
    "cp1162": {
      "type": "_sbcs",
      "chars": "€…‘’“”•–— กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    },
    "ibm1162": "cp1162",
    "csibm1162": "cp1162",
    "cp1163": {
      "type": "_sbcs",
      "chars": " ¡¢£€¥¦§œ©ª«¬­®¯°±²³Ÿµ¶·Œ¹º»¼½¾¿ÀÁÂĂÄÅÆÇÈÉÊË̀ÍÎÏĐÑ̉ÓÔƠÖ×ØÙÚÛÜỮßàáâăäåæçèéêë́íîïđṇ̃óôơö÷øùúûüư₫ÿ"
    },
    "ibm1163": "cp1163",
    "csibm1163": "cp1163",
    "maccroatian": {
      "type": "_sbcs",
      "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®Š™´¨≠ŽØ∞±≤≥∆µ∂∑∏š∫ªºΩžø¿¡¬√ƒ≈Ć«Č… ÀÃÕŒœĐ—“”‘’÷◊�©⁄¤‹›Æ»–·‚„‰ÂćÁčÈÍÎÏÌÓÔđÒÚÛÙıˆ˜¯πË˚¸Êæˇ"
    },
    "maccyrillic": {
      "type": "_sbcs",
      "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°¢£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµ∂ЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    "macgreek": {
      "type": "_sbcs",
      "chars": "Ä¹²É³ÖÜ΅àâä΄¨çéèêë£™îï•½‰ôö¦­ùûü†ΓΔΘΛΞΠß®©ΣΪ§≠°·Α±≤≥¥ΒΕΖΗΙΚΜΦΫΨΩάΝ¬ΟΡ≈Τ«»… ΥΧΆΈœ–―“”‘’÷ΉΊΌΎέήίόΏύαβψδεφγηιξκλμνοπώρστθωςχυζϊϋΐΰ�"
    },
    "maciceland": {
      "type": "_sbcs",
      "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûüÝ°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤ÐðÞþý·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    "macroman": {
      "type": "_sbcs",
      "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    "macromania": {
      "type": "_sbcs",
      "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ĂŞ∞±≤≥¥µ∂∑∏π∫ªºΩăş¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›Ţţ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    "macthai": {
      "type": "_sbcs",
      "chars": "«»…“”�•‘’� กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู\uFEFF​–—฿เแโใไๅๆ็่้๊๋์ํ™๏๐๑๒๓๔๕๖๗๘๙®©����"
    },
    "macturkish": {
      "type": "_sbcs",
      "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸĞğİıŞş‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙ�ˆ˜¯˘˙˚¸˝˛ˇ"
    },
    "macukraine": {
      "type": "_sbcs",
      "chars": "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ†°Ґ£§•¶І®©™Ђђ≠Ѓѓ∞±≤≥іµґЈЄєЇїЉљЊњјЅ¬√ƒ≈∆«»… ЋћЌќѕ–—“”‘’÷„ЎўЏџ№Ёёяабвгдежзийклмнопрстуфхцчшщъыьэю¤"
    },
    "koi8r": {
      "type": "_sbcs",
      "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ё╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡Ё╢╣╤╥╦╧╨╩╪╫╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    "koi8u": {
      "type": "_sbcs",
      "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґ╝╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪Ґ╬©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    "koi8ru": {
      "type": "_sbcs",
      "chars": "─│┌┐└┘├┤┬┴┼▀▄█▌▐░▒▓⌠■∙√≈≤≥ ⌡°²·÷═║╒ёє╔ії╗╘╙╚╛ґў╞╟╠╡ЁЄ╣ІЇ╦╧╨╩╪ҐЎ©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    "koi8t": {
      "type": "_sbcs",
      "chars": "қғ‚Ғ„…†‡�‰ҳ‹ҲҷҶ�Қ‘’“”•–—�™�›�����ӯӮё¤ӣ¦§���«¬­®�°±²Ё�Ӣ¶·�№�»���©юабцдефгхийклмнопярстужвьызшэщчъЮАБЦДЕФГХИЙКЛМНОПЯРСТУЖВЬЫЗШЭЩЧЪ"
    },
    "armscii8": {
      "type": "_sbcs",
      "chars": " �և։)(»«—.՝,-֊…՜՛՞ԱաԲբԳգԴդԵեԶզԷէԸըԹթԺժԻիԼլԽխԾծԿկՀհՁձՂղՃճՄմՅյՆնՇշՈոՉչՊպՋջՌռՍսՎվՏտՐրՑցՒւՓփՔքՕօՖֆ՚�"
    },
    "rk1048": {
      "type": "_sbcs",
      "chars": "ЂЃ‚ѓ„…†‡€‰Љ‹ЊҚҺЏђ‘’“”•–—�™љ›њқһџ ҰұӘ¤Ө¦§Ё©Ғ«¬­®Ү°±Ііөµ¶·ё№ғ»әҢңүАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    "tcvn": {
      "type": "_sbcs",
      "chars": "\0ÚỤỪỬỮ\x07\b	\n\v\f\rỨỰỲỶỸÝỴ\x1B !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ÀẢÃÁẠẶẬÈẺẼÉẸỆÌỈĨÍỊÒỎÕÓỌỘỜỞỠỚỢÙỦŨ ĂÂÊÔƠƯĐăâêôơưđẶ̀̀̉̃́àảãáạẲằẳẵắẴẮẦẨẪẤỀặầẩẫấậèỂẻẽéẹềểễếệìỉỄẾỒĩíịòỔỏõóọồổỗốộờởỡớợùỖủũúụừửữứựỳỷỹýỵỐ"
    },
    "georgianacademy": {
      "type": "_sbcs",
      "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰჱჲჳჴჵჶçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    "georgianps": {
      "type": "_sbcs",
      "chars": "‚ƒ„…†‡ˆ‰Š‹Œ‘’“”•–—˜™š›œŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿აბგდევზჱთიკლმნჲოპჟრსტჳუფქღყშჩცძწჭხჴჯჰჵæçèéêëìíîïðñòóôõö÷øùúûüýþÿ"
    },
    "pt154": {
      "type": "_sbcs",
      "chars": "ҖҒӮғ„…ҶҮҲүҠӢҢҚҺҸҗ‘’“”•–—ҳҷҡӣңқһҹ ЎўЈӨҘҰ§Ё©Ә«¬ӯ®Ҝ°ұІіҙө¶·ё№ә»јҪҫҝАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя"
    },
    "viscii": {
      "type": "_sbcs",
      "chars": "\0ẲẴẪ\x07\b	\n\v\f\rỶỸ\x1BỴ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ẠẮẰẶẤẦẨẬẼẸẾỀỂỄỆỐỒỔỖỘỢỚỜỞỊỎỌỈỦŨỤỲÕắằặấầẩậẽẹếềểễệốồổỗỠƠộờởịỰỨỪỬơớƯÀÁÂÃẢĂẳẵÈÉÊẺÌÍĨỳĐứÒÓÔạỷừửÙÚỹỵÝỡưàáâãảăữẫèéêẻìíĩỉđựòóôõỏọụùúũủýợỮ"
    },
    "iso646cn": {
      "type": "_sbcs",
      "chars": "\0\x07\b	\n\v\f\r\x1B !\"#¥%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
    },
    "iso646jp": {
      "type": "_sbcs",
      "chars": "\0\x07\b	\n\v\f\r\x1B !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[¥]^_`abcdefghijklmnopqrstuvwxyz{|}‾��������������������������������������������������������������������������������������������������������������������������������"
    },
    "hproman8": {
      "type": "_sbcs",
      "chars": " ÀÂÈÊËÎÏ´ˋˆ¨˜ÙÛ₤¯Ýý°ÇçÑñ¡¿¤£¥§ƒ¢âêôûáéóúàèòùäëöüÅîØÆåíøæÄìÖÜÉïßÔÁÃãÐðÍÌÓÒÕõŠšÚŸÿÞþ·µ¶¾—¼½ªº«■»±�"
    },
    "macintosh": {
      "type": "_sbcs",
      "chars": "ÄÅÇÉÑÖÜáàâäãåçéèêëíìîïñóòôöõúùûü†°¢£§•¶ß®©™´¨≠ÆØ∞±≤≥¥µ∂∑∏π∫ªºΩæø¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄¤‹›ﬁﬂ‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔ�ÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ"
    },
    "ascii": {
      "type": "_sbcs",
      "chars": "��������������������������������������������������������������������������������������������������������������������������������"
    },
    "tis620": {
      "type": "_sbcs",
      "chars": "���������������������������������กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรฤลฦวศษสหฬอฮฯะัาำิีึืฺุู����฿เแโใไๅๆ็่้๊๋์ํ๎๏๐๑๒๓๔๕๖๗๘๙๚๛����"
    }
  };
  return sbcsDataGenerated;
}
var dbcsCodec = {};
var hasRequiredDbcsCodec;
function requireDbcsCodec() {
  if (hasRequiredDbcsCodec) return dbcsCodec;
  hasRequiredDbcsCodec = 1;
  var Buffer3 = safer_1.Buffer;
  dbcsCodec._dbcs = DBCSCodec;
  var UNASSIGNED = -1, GB18030_CODE = -2, SEQ_START = -10, NODE_START = -1e3, UNASSIGNED_NODE = new Array(256), DEF_CHAR = -1;
  for (var i = 0; i < 256; i++)
    UNASSIGNED_NODE[i] = UNASSIGNED;
  function DBCSCodec(codecOptions, iconv) {
    this.encodingName = codecOptions.encodingName;
    if (!codecOptions)
      throw new Error("DBCS codec is called without the data.");
    if (!codecOptions.table)
      throw new Error("Encoding '" + this.encodingName + "' has no data.");
    var mappingTable = codecOptions.table();
    this.decodeTables = [];
    this.decodeTables[0] = UNASSIGNED_NODE.slice(0);
    this.decodeTableSeq = [];
    for (var i2 = 0; i2 < mappingTable.length; i2++)
      this._addDecodeChunk(mappingTable[i2]);
    if (typeof codecOptions.gb18030 === "function") {
      this.gb18030 = codecOptions.gb18030();
      var commonThirdByteNodeIdx = this.decodeTables.length;
      this.decodeTables.push(UNASSIGNED_NODE.slice(0));
      var commonFourthByteNodeIdx = this.decodeTables.length;
      this.decodeTables.push(UNASSIGNED_NODE.slice(0));
      var firstByteNode = this.decodeTables[0];
      for (var i2 = 129; i2 <= 254; i2++) {
        var secondByteNode = this.decodeTables[NODE_START - firstByteNode[i2]];
        for (var j = 48; j <= 57; j++) {
          if (secondByteNode[j] === UNASSIGNED) {
            secondByteNode[j] = NODE_START - commonThirdByteNodeIdx;
          } else if (secondByteNode[j] > NODE_START) {
            throw new Error("gb18030 decode tables conflict at byte 2");
          }
          var thirdByteNode = this.decodeTables[NODE_START - secondByteNode[j]];
          for (var k = 129; k <= 254; k++) {
            if (thirdByteNode[k] === UNASSIGNED) {
              thirdByteNode[k] = NODE_START - commonFourthByteNodeIdx;
            } else if (thirdByteNode[k] === NODE_START - commonFourthByteNodeIdx) {
              continue;
            } else if (thirdByteNode[k] > NODE_START) {
              throw new Error("gb18030 decode tables conflict at byte 3");
            }
            var fourthByteNode = this.decodeTables[NODE_START - thirdByteNode[k]];
            for (var l = 48; l <= 57; l++) {
              if (fourthByteNode[l] === UNASSIGNED)
                fourthByteNode[l] = GB18030_CODE;
            }
          }
        }
      }
    }
    this.defaultCharUnicode = iconv.defaultCharUnicode;
    this.encodeTable = [];
    this.encodeTableSeq = [];
    var skipEncodeChars = {};
    if (codecOptions.encodeSkipVals)
      for (var i2 = 0; i2 < codecOptions.encodeSkipVals.length; i2++) {
        var val = codecOptions.encodeSkipVals[i2];
        if (typeof val === "number")
          skipEncodeChars[val] = true;
        else
          for (var j = val.from; j <= val.to; j++)
            skipEncodeChars[j] = true;
      }
    this._fillEncodeTable(0, 0, skipEncodeChars);
    if (codecOptions.encodeAdd) {
      for (var uChar in codecOptions.encodeAdd)
        if (Object.prototype.hasOwnProperty.call(codecOptions.encodeAdd, uChar))
          this._setEncodeChar(uChar.charCodeAt(0), codecOptions.encodeAdd[uChar]);
    }
    this.defCharSB = this.encodeTable[0][iconv.defaultCharSingleByte.charCodeAt(0)];
    if (this.defCharSB === UNASSIGNED) this.defCharSB = this.encodeTable[0]["?"];
    if (this.defCharSB === UNASSIGNED) this.defCharSB = "?".charCodeAt(0);
  }
  DBCSCodec.prototype.encoder = DBCSEncoder;
  DBCSCodec.prototype.decoder = DBCSDecoder;
  DBCSCodec.prototype._getDecodeTrieNode = function(addr) {
    var bytes = [];
    for (; addr > 0; addr >>>= 8)
      bytes.push(addr & 255);
    if (bytes.length == 0)
      bytes.push(0);
    var node = this.decodeTables[0];
    for (var i2 = bytes.length - 1; i2 > 0; i2--) {
      var val = node[bytes[i2]];
      if (val == UNASSIGNED) {
        node[bytes[i2]] = NODE_START - this.decodeTables.length;
        this.decodeTables.push(node = UNASSIGNED_NODE.slice(0));
      } else if (val <= NODE_START) {
        node = this.decodeTables[NODE_START - val];
      } else
        throw new Error("Overwrite byte in " + this.encodingName + ", addr: " + addr.toString(16));
    }
    return node;
  };
  DBCSCodec.prototype._addDecodeChunk = function(chunk) {
    var curAddr = parseInt(chunk[0], 16);
    var writeTable = this._getDecodeTrieNode(curAddr);
    curAddr = curAddr & 255;
    for (var k = 1; k < chunk.length; k++) {
      var part = chunk[k];
      if (typeof part === "string") {
        for (var l = 0; l < part.length; ) {
          var code = part.charCodeAt(l++);
          if (55296 <= code && code < 56320) {
            var codeTrail = part.charCodeAt(l++);
            if (56320 <= codeTrail && codeTrail < 57344)
              writeTable[curAddr++] = 65536 + (code - 55296) * 1024 + (codeTrail - 56320);
            else
              throw new Error("Incorrect surrogate pair in " + this.encodingName + " at chunk " + chunk[0]);
          } else if (4080 < code && code <= 4095) {
            var len = 4095 - code + 2;
            var seq = [];
            for (var m = 0; m < len; m++)
              seq.push(part.charCodeAt(l++));
            writeTable[curAddr++] = SEQ_START - this.decodeTableSeq.length;
            this.decodeTableSeq.push(seq);
          } else
            writeTable[curAddr++] = code;
        }
      } else if (typeof part === "number") {
        var charCode = writeTable[curAddr - 1] + 1;
        for (var l = 0; l < part; l++)
          writeTable[curAddr++] = charCode++;
      } else
        throw new Error("Incorrect type '" + typeof part + "' given in " + this.encodingName + " at chunk " + chunk[0]);
    }
    if (curAddr > 255)
      throw new Error("Incorrect chunk in " + this.encodingName + " at addr " + chunk[0] + ": too long" + curAddr);
  };
  DBCSCodec.prototype._getEncodeBucket = function(uCode) {
    var high = uCode >> 8;
    if (this.encodeTable[high] === void 0)
      this.encodeTable[high] = UNASSIGNED_NODE.slice(0);
    return this.encodeTable[high];
  };
  DBCSCodec.prototype._setEncodeChar = function(uCode, dbcsCode) {
    var bucket = this._getEncodeBucket(uCode);
    var low = uCode & 255;
    if (bucket[low] <= SEQ_START)
      this.encodeTableSeq[SEQ_START - bucket[low]][DEF_CHAR] = dbcsCode;
    else if (bucket[low] == UNASSIGNED)
      bucket[low] = dbcsCode;
  };
  DBCSCodec.prototype._setEncodeSequence = function(seq, dbcsCode) {
    var uCode = seq[0];
    var bucket = this._getEncodeBucket(uCode);
    var low = uCode & 255;
    var node;
    if (bucket[low] <= SEQ_START) {
      node = this.encodeTableSeq[SEQ_START - bucket[low]];
    } else {
      node = {};
      if (bucket[low] !== UNASSIGNED) node[DEF_CHAR] = bucket[low];
      bucket[low] = SEQ_START - this.encodeTableSeq.length;
      this.encodeTableSeq.push(node);
    }
    for (var j = 1; j < seq.length - 1; j++) {
      var oldVal = node[uCode];
      if (typeof oldVal === "object")
        node = oldVal;
      else {
        node = node[uCode] = {};
        if (oldVal !== void 0)
          node[DEF_CHAR] = oldVal;
      }
    }
    uCode = seq[seq.length - 1];
    node[uCode] = dbcsCode;
  };
  DBCSCodec.prototype._fillEncodeTable = function(nodeIdx, prefix, skipEncodeChars) {
    var node = this.decodeTables[nodeIdx];
    var hasValues = false;
    var subNodeEmpty = {};
    for (var i2 = 0; i2 < 256; i2++) {
      var uCode = node[i2];
      var mbCode = prefix + i2;
      if (skipEncodeChars[mbCode])
        continue;
      if (uCode >= 0) {
        this._setEncodeChar(uCode, mbCode);
        hasValues = true;
      } else if (uCode <= NODE_START) {
        var subNodeIdx = NODE_START - uCode;
        if (!subNodeEmpty[subNodeIdx]) {
          var newPrefix = mbCode << 8 >>> 0;
          if (this._fillEncodeTable(subNodeIdx, newPrefix, skipEncodeChars))
            hasValues = true;
          else
            subNodeEmpty[subNodeIdx] = true;
        }
      } else if (uCode <= SEQ_START) {
        this._setEncodeSequence(this.decodeTableSeq[SEQ_START - uCode], mbCode);
        hasValues = true;
      }
    }
    return hasValues;
  };
  function DBCSEncoder(options, codec) {
    this.leadSurrogate = -1;
    this.seqObj = void 0;
    this.encodeTable = codec.encodeTable;
    this.encodeTableSeq = codec.encodeTableSeq;
    this.defaultCharSingleByte = codec.defCharSB;
    this.gb18030 = codec.gb18030;
  }
  DBCSEncoder.prototype.write = function(str) {
    var newBuf = Buffer3.alloc(str.length * (this.gb18030 ? 4 : 3)), leadSurrogate = this.leadSurrogate, seqObj = this.seqObj, nextChar = -1, i2 = 0, j = 0;
    while (true) {
      if (nextChar === -1) {
        if (i2 == str.length) break;
        var uCode = str.charCodeAt(i2++);
      } else {
        var uCode = nextChar;
        nextChar = -1;
      }
      if (55296 <= uCode && uCode < 57344) {
        if (uCode < 56320) {
          if (leadSurrogate === -1) {
            leadSurrogate = uCode;
            continue;
          } else {
            leadSurrogate = uCode;
            uCode = UNASSIGNED;
          }
        } else {
          if (leadSurrogate !== -1) {
            uCode = 65536 + (leadSurrogate - 55296) * 1024 + (uCode - 56320);
            leadSurrogate = -1;
          } else {
            uCode = UNASSIGNED;
          }
        }
      } else if (leadSurrogate !== -1) {
        nextChar = uCode;
        uCode = UNASSIGNED;
        leadSurrogate = -1;
      }
      var dbcsCode = UNASSIGNED;
      if (seqObj !== void 0 && uCode != UNASSIGNED) {
        var resCode = seqObj[uCode];
        if (typeof resCode === "object") {
          seqObj = resCode;
          continue;
        } else if (typeof resCode == "number") {
          dbcsCode = resCode;
        } else if (resCode == void 0) {
          resCode = seqObj[DEF_CHAR];
          if (resCode !== void 0) {
            dbcsCode = resCode;
            nextChar = uCode;
          }
        }
        seqObj = void 0;
      } else if (uCode >= 0) {
        var subtable = this.encodeTable[uCode >> 8];
        if (subtable !== void 0)
          dbcsCode = subtable[uCode & 255];
        if (dbcsCode <= SEQ_START) {
          seqObj = this.encodeTableSeq[SEQ_START - dbcsCode];
          continue;
        }
        if (dbcsCode == UNASSIGNED && this.gb18030) {
          var idx = findIdx(this.gb18030.uChars, uCode);
          if (idx != -1) {
            var dbcsCode = this.gb18030.gbChars[idx] + (uCode - this.gb18030.uChars[idx]);
            newBuf[j++] = 129 + Math.floor(dbcsCode / 12600);
            dbcsCode = dbcsCode % 12600;
            newBuf[j++] = 48 + Math.floor(dbcsCode / 1260);
            dbcsCode = dbcsCode % 1260;
            newBuf[j++] = 129 + Math.floor(dbcsCode / 10);
            dbcsCode = dbcsCode % 10;
            newBuf[j++] = 48 + dbcsCode;
            continue;
          }
        }
      }
      if (dbcsCode === UNASSIGNED)
        dbcsCode = this.defaultCharSingleByte;
      if (dbcsCode < 256) {
        newBuf[j++] = dbcsCode;
      } else if (dbcsCode < 65536) {
        newBuf[j++] = dbcsCode >> 8;
        newBuf[j++] = dbcsCode & 255;
      } else if (dbcsCode < 16777216) {
        newBuf[j++] = dbcsCode >> 16;
        newBuf[j++] = dbcsCode >> 8 & 255;
        newBuf[j++] = dbcsCode & 255;
      } else {
        newBuf[j++] = dbcsCode >>> 24;
        newBuf[j++] = dbcsCode >>> 16 & 255;
        newBuf[j++] = dbcsCode >>> 8 & 255;
        newBuf[j++] = dbcsCode & 255;
      }
    }
    this.seqObj = seqObj;
    this.leadSurrogate = leadSurrogate;
    return newBuf.slice(0, j);
  };
  DBCSEncoder.prototype.end = function() {
    if (this.leadSurrogate === -1 && this.seqObj === void 0)
      return;
    var newBuf = Buffer3.alloc(10), j = 0;
    if (this.seqObj) {
      var dbcsCode = this.seqObj[DEF_CHAR];
      if (dbcsCode !== void 0) {
        if (dbcsCode < 256) {
          newBuf[j++] = dbcsCode;
        } else {
          newBuf[j++] = dbcsCode >> 8;
          newBuf[j++] = dbcsCode & 255;
        }
      }
      this.seqObj = void 0;
    }
    if (this.leadSurrogate !== -1) {
      newBuf[j++] = this.defaultCharSingleByte;
      this.leadSurrogate = -1;
    }
    return newBuf.slice(0, j);
  };
  DBCSEncoder.prototype.findIdx = findIdx;
  function DBCSDecoder(options, codec) {
    this.nodeIdx = 0;
    this.prevBytes = [];
    this.decodeTables = codec.decodeTables;
    this.decodeTableSeq = codec.decodeTableSeq;
    this.defaultCharUnicode = codec.defaultCharUnicode;
    this.gb18030 = codec.gb18030;
  }
  DBCSDecoder.prototype.write = function(buf) {
    var newBuf = Buffer3.alloc(buf.length * 2), nodeIdx = this.nodeIdx, prevBytes = this.prevBytes, prevOffset = this.prevBytes.length, seqStart = -this.prevBytes.length, uCode;
    for (var i2 = 0, j = 0; i2 < buf.length; i2++) {
      var curByte = i2 >= 0 ? buf[i2] : prevBytes[i2 + prevOffset];
      var uCode = this.decodeTables[nodeIdx][curByte];
      if (uCode >= 0) ;
      else if (uCode === UNASSIGNED) {
        uCode = this.defaultCharUnicode.charCodeAt(0);
        i2 = seqStart;
      } else if (uCode === GB18030_CODE) {
        if (i2 >= 3) {
          var ptr = (buf[i2 - 3] - 129) * 12600 + (buf[i2 - 2] - 48) * 1260 + (buf[i2 - 1] - 129) * 10 + (curByte - 48);
        } else {
          var ptr = (prevBytes[i2 - 3 + prevOffset] - 129) * 12600 + ((i2 - 2 >= 0 ? buf[i2 - 2] : prevBytes[i2 - 2 + prevOffset]) - 48) * 1260 + ((i2 - 1 >= 0 ? buf[i2 - 1] : prevBytes[i2 - 1 + prevOffset]) - 129) * 10 + (curByte - 48);
        }
        var idx = findIdx(this.gb18030.gbChars, ptr);
        uCode = this.gb18030.uChars[idx] + ptr - this.gb18030.gbChars[idx];
      } else if (uCode <= NODE_START) {
        nodeIdx = NODE_START - uCode;
        continue;
      } else if (uCode <= SEQ_START) {
        var seq = this.decodeTableSeq[SEQ_START - uCode];
        for (var k = 0; k < seq.length - 1; k++) {
          uCode = seq[k];
          newBuf[j++] = uCode & 255;
          newBuf[j++] = uCode >> 8;
        }
        uCode = seq[seq.length - 1];
      } else
        throw new Error("iconv-lite internal error: invalid decoding table value " + uCode + " at " + nodeIdx + "/" + curByte);
      if (uCode >= 65536) {
        uCode -= 65536;
        var uCodeLead = 55296 | uCode >> 10;
        newBuf[j++] = uCodeLead & 255;
        newBuf[j++] = uCodeLead >> 8;
        uCode = 56320 | uCode & 1023;
      }
      newBuf[j++] = uCode & 255;
      newBuf[j++] = uCode >> 8;
      nodeIdx = 0;
      seqStart = i2 + 1;
    }
    this.nodeIdx = nodeIdx;
    this.prevBytes = seqStart >= 0 ? Array.prototype.slice.call(buf, seqStart) : prevBytes.slice(seqStart + prevOffset).concat(Array.prototype.slice.call(buf));
    return newBuf.slice(0, j).toString("ucs2");
  };
  DBCSDecoder.prototype.end = function() {
    var ret = "";
    while (this.prevBytes.length > 0) {
      ret += this.defaultCharUnicode;
      var bytesArr = this.prevBytes.slice(1);
      this.prevBytes = [];
      this.nodeIdx = 0;
      if (bytesArr.length > 0)
        ret += this.write(bytesArr);
    }
    this.prevBytes = [];
    this.nodeIdx = 0;
    return ret;
  };
  function findIdx(table, val) {
    if (table[0] > val)
      return -1;
    var l = 0, r = table.length;
    while (l < r - 1) {
      var mid = l + (r - l + 1 >> 1);
      if (table[mid] <= val)
        l = mid;
      else
        r = mid;
    }
    return l;
  }
  return dbcsCodec;
}
const require$$0 = [
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
];
const require$$1 = [
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
];
const require$$2 = [
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
];
const require$$3 = [
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
];
const uChars = [
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
];
const gbChars = [
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
];
const require$$4 = {
  uChars,
  gbChars
};
const require$$5 = [
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
];
const require$$6 = [
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
];
const require$$7 = [
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
var dbcsData;
var hasRequiredDbcsData;
function requireDbcsData() {
  if (hasRequiredDbcsData) return dbcsData;
  hasRequiredDbcsData = 1;
  dbcsData = {
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
    "shiftjis": {
      type: "_dbcs",
      table: function() {
        return require$$0;
      },
      encodeAdd: { "¥": 92, "‾": 126 },
      encodeSkipVals: [{ from: 60736, to: 63808 }]
    },
    "csshiftjis": "shiftjis",
    "mskanji": "shiftjis",
    "sjis": "shiftjis",
    "windows31j": "shiftjis",
    "ms31j": "shiftjis",
    "xsjis": "shiftjis",
    "windows932": "shiftjis",
    "ms932": "shiftjis",
    "932": "shiftjis",
    "cp932": "shiftjis",
    "eucjp": {
      type: "_dbcs",
      table: function() {
        return require$$1;
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
    "gb2312": "cp936",
    "gb231280": "cp936",
    "gb23121980": "cp936",
    "csgb2312": "cp936",
    "csiso58gb231280": "cp936",
    "euccn": "cp936",
    // Microsoft's CP936 is a subset and approximation of GBK.
    "windows936": "cp936",
    "ms936": "cp936",
    "936": "cp936",
    "cp936": {
      type: "_dbcs",
      table: function() {
        return require$$2;
      }
    },
    // GBK (~22000 chars) is an extension of CP936 that added user-mapped chars and some other.
    "gbk": {
      type: "_dbcs",
      table: function() {
        return require$$2.concat(require$$3);
      }
    },
    "xgbk": "gbk",
    "isoir58": "gbk",
    // GB18030 is an algorithmic extension of GBK.
    // Main source: https://www.w3.org/TR/encoding/#gbk-encoder
    // http://icu-project.org/docs/papers/gb18030.html
    // http://source.icu-project.org/repos/icu/data/trunk/charset/data/xml/gb-18030-2000.xml
    // http://www.khngai.com/chinese/charmap/tblgbk.php?page=0
    "gb18030": {
      type: "_dbcs",
      table: function() {
        return require$$2.concat(require$$3);
      },
      gb18030: function() {
        return require$$4;
      },
      encodeSkipVals: [128],
      encodeAdd: { "€": 41699 }
    },
    "chinese": "gb18030",
    // == Korean ===============================================================
    // EUC-KR, KS_C_5601 and KS X 1001 are exactly the same.
    "windows949": "cp949",
    "ms949": "cp949",
    "949": "cp949",
    "cp949": {
      type: "_dbcs",
      table: function() {
        return require$$5;
      }
    },
    "cseuckr": "cp949",
    "csksc56011987": "cp949",
    "euckr": "cp949",
    "isoir149": "cp949",
    "korean": "cp949",
    "ksc56011987": "cp949",
    "ksc56011989": "cp949",
    "ksc5601": "cp949",
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
    "windows950": "cp950",
    "ms950": "cp950",
    "950": "cp950",
    "cp950": {
      type: "_dbcs",
      table: function() {
        return require$$6;
      }
    },
    // Big5 has many variations and is an extension of cp950. We use Encoding Standard's as a consensus.
    "big5": "big5hkscs",
    "big5hkscs": {
      type: "_dbcs",
      table: function() {
        return require$$6.concat(require$$7);
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
    "cnbig5": "big5hkscs",
    "csbig5": "big5hkscs",
    "xxbig5": "big5hkscs"
  };
  return dbcsData;
}
var hasRequiredEncodings;
function requireEncodings() {
  if (hasRequiredEncodings) return encodings;
  hasRequiredEncodings = 1;
  (function(exports) {
    var modules = [
      requireInternal(),
      requireUtf32(),
      requireUtf16(),
      requireUtf7(),
      requireSbcsCodec(),
      requireSbcsData(),
      requireSbcsDataGenerated(),
      requireDbcsCodec(),
      requireDbcsData()
    ];
    for (var i = 0; i < modules.length; i++) {
      var module = modules[i];
      for (var enc in module)
        if (Object.prototype.hasOwnProperty.call(module, enc))
          exports[enc] = module[enc];
    }
  })(encodings);
  return encodings;
}
var streams;
var hasRequiredStreams;
function requireStreams() {
  if (hasRequiredStreams) return streams;
  hasRequiredStreams = 1;
  var Buffer3 = safer_1.Buffer;
  streams = function(stream_module) {
    var Transform = stream_module.Transform;
    function IconvLiteEncoderStream(conv, options) {
      this.conv = conv;
      options = options || {};
      options.decodeStrings = false;
      Transform.call(this, options);
    }
    IconvLiteEncoderStream.prototype = Object.create(Transform.prototype, {
      constructor: { value: IconvLiteEncoderStream }
    });
    IconvLiteEncoderStream.prototype._transform = function(chunk, encoding, done) {
      if (typeof chunk != "string")
        return done(new Error("Iconv encoding stream needs strings as its input."));
      try {
        var res = this.conv.write(chunk);
        if (res && res.length) this.push(res);
        done();
      } catch (e) {
        done(e);
      }
    };
    IconvLiteEncoderStream.prototype._flush = function(done) {
      try {
        var res = this.conv.end();
        if (res && res.length) this.push(res);
        done();
      } catch (e) {
        done(e);
      }
    };
    IconvLiteEncoderStream.prototype.collect = function(cb) {
      var chunks = [];
      this.on("error", cb);
      this.on("data", function(chunk) {
        chunks.push(chunk);
      });
      this.on("end", function() {
        cb(null, Buffer3.concat(chunks));
      });
      return this;
    };
    function IconvLiteDecoderStream(conv, options) {
      this.conv = conv;
      options = options || {};
      options.encoding = this.encoding = "utf8";
      Transform.call(this, options);
    }
    IconvLiteDecoderStream.prototype = Object.create(Transform.prototype, {
      constructor: { value: IconvLiteDecoderStream }
    });
    IconvLiteDecoderStream.prototype._transform = function(chunk, encoding, done) {
      if (!Buffer3.isBuffer(chunk) && !(chunk instanceof Uint8Array))
        return done(new Error("Iconv decoding stream needs buffers as its input."));
      try {
        var res = this.conv.write(chunk);
        if (res && res.length) this.push(res, this.encoding);
        done();
      } catch (e) {
        done(e);
      }
    };
    IconvLiteDecoderStream.prototype._flush = function(done) {
      try {
        var res = this.conv.end();
        if (res && res.length) this.push(res, this.encoding);
        done();
      } catch (e) {
        done(e);
      }
    };
    IconvLiteDecoderStream.prototype.collect = function(cb) {
      var res = "";
      this.on("error", cb);
      this.on("data", function(chunk) {
        res += chunk;
      });
      this.on("end", function() {
        cb(null, res);
      });
      return this;
    };
    return {
      IconvLiteEncoderStream,
      IconvLiteDecoderStream
    };
  };
  return streams;
}
(function(module) {
  var Buffer3 = safer_1.Buffer;
  var bomHandling$1 = bomHandling, iconv = module.exports;
  iconv.encodings = null;
  iconv.defaultCharUnicode = "�";
  iconv.defaultCharSingleByte = "?";
  iconv.encode = function encode(str, encoding, options) {
    str = "" + (str || "");
    var encoder = iconv.getEncoder(encoding, options);
    var res = encoder.write(str);
    var trail = encoder.end();
    return trail && trail.length > 0 ? Buffer3.concat([res, trail]) : res;
  };
  iconv.decode = function decode(buf, encoding, options) {
    if (typeof buf === "string") {
      if (!iconv.skipDecodeWarning) {
        console.error("Iconv-lite warning: decode()-ing strings is deprecated. Refer to https://github.com/ashtuchkin/iconv-lite/wiki/Use-Buffers-when-decoding");
        iconv.skipDecodeWarning = true;
      }
      buf = Buffer3.from("" + (buf || ""), "binary");
    }
    var decoder = iconv.getDecoder(encoding, options);
    var res = decoder.write(buf);
    var trail = decoder.end();
    return trail ? res + trail : res;
  };
  iconv.encodingExists = function encodingExists(enc) {
    try {
      iconv.getCodec(enc);
      return true;
    } catch (e) {
      return false;
    }
  };
  iconv.toEncoding = iconv.encode;
  iconv.fromEncoding = iconv.decode;
  iconv._codecDataCache = {};
  iconv.getCodec = function getCodec(encoding) {
    if (!iconv.encodings)
      iconv.encodings = requireEncodings();
    var enc = iconv._canonicalizeEncoding(encoding);
    var codecOptions = {};
    while (true) {
      var codec = iconv._codecDataCache[enc];
      if (codec)
        return codec;
      var codecDef = iconv.encodings[enc];
      switch (typeof codecDef) {
        case "string":
          enc = codecDef;
          break;
        case "object":
          for (var key2 in codecDef)
            codecOptions[key2] = codecDef[key2];
          if (!codecOptions.encodingName)
            codecOptions.encodingName = enc;
          enc = codecDef.type;
          break;
        case "function":
          if (!codecOptions.encodingName)
            codecOptions.encodingName = enc;
          codec = new codecDef(codecOptions, iconv);
          iconv._codecDataCache[codecOptions.encodingName] = codec;
          return codec;
        default:
          throw new Error("Encoding not recognized: '" + encoding + "' (searched as: '" + enc + "')");
      }
    }
  };
  iconv._canonicalizeEncoding = function(encoding) {
    return ("" + encoding).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g, "");
  };
  iconv.getEncoder = function getEncoder(encoding, options) {
    var codec = iconv.getCodec(encoding), encoder = new codec.encoder(options, codec);
    if (codec.bomAware && options && options.addBOM)
      encoder = new bomHandling$1.PrependBOM(encoder, options);
    return encoder;
  };
  iconv.getDecoder = function getDecoder(encoding, options) {
    var codec = iconv.getCodec(encoding), decoder = new codec.decoder(options, codec);
    if (codec.bomAware && !(options && options.stripBOM === false))
      decoder = new bomHandling$1.StripBOM(decoder, options);
    return decoder;
  };
  iconv.enableStreamingAPI = function enableStreamingAPI(stream_module2) {
    if (iconv.supportsStreams)
      return;
    var streams2 = requireStreams()(stream_module2);
    iconv.IconvLiteEncoderStream = streams2.IconvLiteEncoderStream;
    iconv.IconvLiteDecoderStream = streams2.IconvLiteDecoderStream;
    iconv.encodeStream = function encodeStream(encoding, options) {
      return new iconv.IconvLiteEncoderStream(iconv.getEncoder(encoding, options), options);
    };
    iconv.decodeStream = function decodeStream(encoding, options) {
      return new iconv.IconvLiteDecoderStream(iconv.getDecoder(encoding, options), options);
    };
    iconv.supportsStreams = true;
  };
  var stream_module;
  try {
    stream_module = require("stream");
  } catch (e) {
  }
  if (stream_module && stream_module.Transform) {
    iconv.enableStreamingAPI(stream_module);
  } else {
    iconv.encodeStream = iconv.decodeStream = function() {
      throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.");
    };
  }
})(lib);
var libExports = lib.exports;
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(windows, "__esModule", { value: true });
windows.Windows = void 0;
var constants_1 = constants;
var drive_1 = __importDefault(drive);
var utils_1$1 = utils;
var iconv_lite_1 = __importDefault(libExports);
var Windows = (
  /** @class */
  function() {
    function Windows2() {
    }
    Windows2.run = function() {
      var drives = [];
      var buffer2 = utils_1$1.Utils.execute(constants_1.Constants.WINDOWS_COMMAND);
      var cp = utils_1$1.Utils.chcp();
      var encoding = "";
      switch (cp) {
        case "65000":
          encoding = "UTF-7";
          break;
        case "65001":
          encoding = "UTF-8";
          break;
        default:
          if (/^-?[\d.]+(?:e-?\d+)?$/.test(cp)) {
            encoding = "cp" + cp;
          } else {
            encoding = cp;
          }
      }
      buffer2 = iconv_lite_1.default.encode(iconv_lite_1.default.decode(buffer2, encoding), "UTF-8");
      var lines = buffer2.toString().split("\r\r\n");
      var newDiskIteration = false;
      var caption = "";
      var description = "";
      var freeSpace = 0;
      var size = 0;
      lines.forEach(function(value) {
        if (value !== "") {
          var tokens = value.split("=");
          var section = tokens[0];
          var data = tokens[1];
          switch (section) {
            case "Caption":
              caption = data;
              newDiskIteration = true;
              break;
            case "Description":
              description = data;
              break;
            case "FreeSpace":
              freeSpace = isNaN(parseFloat(data)) ? 0 : +data;
              break;
            case "Size":
              size = isNaN(parseFloat(data)) ? 0 : +data;
              break;
          }
        } else {
          if (newDiskIteration) {
            var used = size - freeSpace;
            var percent = "0%";
            if (size > 0) {
              percent = Math.round(used / size * 100) + "%";
            }
            var d = new drive_1.default(description, size, used, freeSpace, percent, caption);
            drives.push(d);
            newDiskIteration = false;
            caption = "";
            description = "";
            freeSpace = 0;
            size = 0;
          }
        }
      });
      return drives;
    };
    return Windows2;
  }()
);
windows.Windows = Windows;
Object.defineProperty(dist, "__esModule", { value: true });
dist.getDiskInfoSync = dist.getDiskInfo = void 0;
var darwin_1 = darwin;
var linux_1 = linux;
var windows_1 = windows;
var utils_1 = utils;
function getDiskInfo() {
  return new Promise(function(resolve, reject) {
    try {
      var platform2 = utils_1.Utils.detectPlatform();
      var drivesInfo = void 0;
      switch (platform2) {
        case "aix":
          reject(new Error("Platform not supported: " + platform2));
          break;
        case "android":
          reject(new Error("Platform not supported: " + platform2));
          break;
        case "darwin":
          drivesInfo = darwin_1.Darwin.run();
          resolve(drivesInfo);
          break;
        case "freebsd":
          drivesInfo = darwin_1.Darwin.run();
          resolve(drivesInfo);
          break;
        case "linux":
          drivesInfo = linux_1.Linux.run();
          resolve(drivesInfo);
          break;
        case "openbsd":
          drivesInfo = darwin_1.Darwin.run();
          resolve(drivesInfo);
          break;
        case "sunos":
          reject(new Error("Platform not supported: " + platform2));
          break;
        case "win32":
          drivesInfo = windows_1.Windows.run();
          resolve(drivesInfo);
          break;
        default:
          reject(new Error("Platform not recognized: " + platform2));
      }
    } catch (e) {
      reject(e);
    }
  });
}
dist.getDiskInfo = getDiskInfo;
function getDiskInfoSync() {
  var platform2 = utils_1.Utils.detectPlatform();
  var drivesInfo;
  switch (platform2) {
    case "aix":
      throw new Error("Platform not supported: " + platform2);
    case "android":
      throw new Error("Platform not supported: " + platform2);
    case "darwin":
      drivesInfo = darwin_1.Darwin.run();
      return drivesInfo;
    case "freebsd":
      drivesInfo = darwin_1.Darwin.run();
      return drivesInfo;
    case "linux":
      drivesInfo = linux_1.Linux.run();
      return drivesInfo;
    case "openbsd":
      drivesInfo = darwin_1.Darwin.run();
      return drivesInfo;
    case "sunos":
      throw new Error("Platform not supported: " + platform2);
    case "win32":
      drivesInfo = windows_1.Windows.run();
      return drivesInfo;
    default:
      throw new Error("Platform not recognized: " + platform2);
  }
}
dist.getDiskInfoSync = getDiskInfoSync;
class SystemInfoService {
  /**
   * İşlemci bilgilerini döndürür
   * @returns İşlemci bilgileri
   */
  async getCpuInfo() {
    const cpuInfo = os$a.cpus()[0];
    const cpuCores = os$a.cpus().length;
    const cpuThreads = os$a.cpus().length;
    return {
      model: cpuInfo.model,
      speed: `${cpuInfo.speed / 1e3} GHz`,
      cores: cpuCores,
      threads: cpuThreads
    };
  }
  /**
   * Bellek bilgilerini döndürür
   * @returns Bellek bilgileri
   */
  getMemoryInfo() {
    const totalMem = os$a.totalmem();
    const freeMem = os$a.freemem();
    return {
      total: `${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`,
      free: `${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`
    };
  }
  /**
   * Disk bilgilerini döndürür
   * @returns Disk bilgileri
   */
  async getDiskInfo() {
    let diskSpace = "Bilinmiyor";
    let diskFree = "Bilinmiyor";
    try {
      const disks = dist.getDiskInfoSync();
      const systemDisk = disks.find((disk) => disk.mounted === "C:") || disks[0];
      if (systemDisk) {
        diskSpace = `${Math.floor(systemDisk.blocks / (1024 * 1024 * 1024))} GB`;
        diskFree = `${Math.floor(systemDisk.available / (1024 * 1024 * 1024))} GB`;
      }
    } catch (error) {
      console.error("Disk bilgileri alınamadı:", error);
    }
    return {
      total: diskSpace,
      free: diskFree
    };
  }
  /**
   * İşletim sistemi bilgilerini döndürür
   * @returns İşletim sistemi bilgileri
   */
  getOsInfo() {
    return {
      os: `${os$a.type()} ${os$a.arch()}`,
      version: os$a.release(),
      networkName: os$a.networkInterfaces().Ethernet ? "Ethernet" : "Wi-Fi"
    };
  }
  /**
   * Ekran çözünürlüğünü döndürür
   * @returns Ekran çözünürlüğü
   */
  getScreenResolution() {
    let screenResolution = "Bilinmiyor";
    try {
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width, height } = primaryDisplay.size;
      screenResolution = `${width}x${height}`;
    } catch (error) {
      console.error("Ekran çözünürlüğü alınamadı:", error);
    }
    return screenResolution;
  }
  /**
   * Batarya seviyesini döndürür
   * @returns Batarya seviyesi
   */
  async getBatteryLevel() {
    let batteryLevel = 0;
    try {
      const batteryInfo = await si.battery();
      batteryLevel = batteryInfo.percent;
    } catch (error) {
      console.error("Batarya bilgisi alınamadı:", error);
    }
    return batteryLevel;
  }
  /**
   * Sistemin çalışma süresini döndürür
   * @returns Çalışma süresi
   */
  getUptime() {
    const uptime = os$a.uptime();
    const uptimeHours = Math.floor(uptime / 3600);
    const uptimeMinutes = Math.floor(uptime % 3600 / 60);
    return `${uptimeHours} saat ${uptimeMinutes} dakika`;
  }
  /**
   * Tüm sistem bilgilerini döndürür
   * @returns Tüm sistem bilgileri
   */
  async getAllSystemInfo() {
    const cpuInfo = await this.getCpuInfo();
    const memoryInfo = this.getMemoryInfo();
    const diskInfo = await this.getDiskInfo();
    const osInfo2 = this.getOsInfo();
    const screenResolution = this.getScreenResolution();
    const batteryLevel = await this.getBatteryLevel();
    const uptime = this.getUptime();
    return {
      cpu: cpuInfo.model,
      cpuSpeed: cpuInfo.speed,
      cpuCores: cpuInfo.cores,
      cpuThreads: cpuInfo.threads,
      ram: memoryInfo.total,
      freeRam: memoryInfo.free,
      os: osInfo2.os,
      version: osInfo2.version,
      networkName: osInfo2.networkName,
      batteryLevel,
      screenResolution,
      uptime,
      diskSpace: diskInfo.total,
      diskFree: diskInfo.free
    };
  }
}
class WingetService {
  constructor(app2) {
    __publicField(this, "isWindows");
    __publicField(this, "wingetAvailable", null);
    __publicField(this, "windowsTerminalAvailable");
    __publicField(this, "execAsync");
    __publicField(this, "updatingApps", /* @__PURE__ */ new Set());
    __publicField(this, "installingApps", /* @__PURE__ */ new Set());
    __publicField(this, "app");
    // Örnek uygulama verileri - winget çalışmazsa kullanılacak
    __publicField(this, "mockApps", [
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
    this.isWindows = platform() === "win32";
    this.windowsTerminalAvailable = platform() === "win32";
    this.execAsync = promisify$1(exec$h);
    this.app = app2;
  }
  /**
   * Winget komutunun çalışıp çalışmadığını kontrol eder
   * @returns Winget'in kullanılabilir olup olmadığı
   */
  async checkWingetAvailability() {
    if (this.wingetAvailable !== null) {
      return this.wingetAvailable;
    }
    if (!this.isWindows) {
      console.warn("Winget only works on Windows OS");
      this.wingetAvailable = false;
      return false;
    }
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        console.warn("Winget availability check timed out");
        this.wingetAvailable = false;
        resolve(false);
      }, 3e3);
      try {
        const process2 = spawn$1("winget", ["--version"]);
        process2.on("error", (error) => {
          clearTimeout(timeout);
          console.warn("Winget not available:", error.message);
          this.wingetAvailable = false;
          resolve(false);
        });
        process2.on("close", (code) => {
          clearTimeout(timeout);
          this.wingetAvailable = code === 0;
          resolve(code === 0);
        });
      } catch (error) {
        clearTimeout(timeout);
        console.warn("Error checking winget availability:", error);
        this.wingetAvailable = false;
        resolve(false);
      }
    });
  }
  /**
   * Yüklü uygulamaların listesini döndürür
   * @returns Yüklü uygulamaların listesi
   */
  async getInstalledApps() {
    try {
      const result2 = await this.executeCommand("list", ["--source", "winget"]);
      const apps = this.parseInstalledAppsList(result2);
      return apps;
    } catch (error) {
      console.error("Winget getInstalledApps error:", error);
      if (error.message.includes("0x80070002") || error.message.includes("not found")) {
        throw new Error("Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun");
      }
      throw new Error(`Uygulama listesi alınamadı: ${error.message}`);
    }
  }
  /**
   * Winget ile uygulama arama
   * @param keyword Aranacak anahtar kelime
   * @returns Bulunan uygulamaların listesi
   */
  async searchApps(keyword) {
    try {
      const result2 = await this.executeCommand("search", [keyword, "--source", "winget", "--accept-source-agreements"]);
      const apps = this.parseSearchResults(result2);
      return apps;
    } catch (error) {
      console.error("Winget searchApps error:", error);
      if (error.message.includes("0x80070002") || error.message.includes("not found")) {
        throw new Error("Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun");
      }
      throw new Error(`Uygulama araması yapılamadı: ${error.message}`);
    }
  }
  /**
   * Winget ile uygulama güncelleme
   * @param app Güncellenecek uygulama (AppInfo objesi veya string olarak id)
   * @returns İşlem sonucu
   */
  async updateApp(app2) {
    try {
      if (!this.wingetAvailable) {
        await this.checkWingetAvailability();
        if (!this.wingetAvailable) {
          return {
            success: false,
            message: "Winget yüklü değil veya erişilemiyor"
          };
        }
      }
      const appId = typeof app2 === "string" ? app2 : app2.id;
      if (!appId) {
        return {
          success: false,
          message: "Geçersiz uygulama ID. Güncelleme yapılamadı."
        };
      }
      console.log(`Updating app with ID: ${appId}`);
      if (this.updatingApps.has(appId)) {
        return {
          success: false,
          message: "Bu uygulama zaten güncelleniyor"
        };
      }
      this.updatingApps.add(appId);
      try {
        const installedApps = await this.getInstalledApps();
        const appExists = Array.isArray(installedApps) && installedApps.some((app22) => app22.id === appId);
        if (!appExists) {
          this.updatingApps.delete(appId);
          return {
            success: false,
            message: `${appId} uygulaması yüklü değil ve güncellenemez`
          };
        }
        const result2 = await this.executeCommand("upgrade", [appId, "--source", "winget"]);
        if (result2.includes("successfully") || result2.includes("başarıyla")) {
          console.log(`Successfully updated app: ${appId}`);
          this.updatingApps.delete(appId);
          return {
            success: true,
            message: `${appId} başarıyla güncellendi`
          };
        } else if (result2.includes("No applicable update found") || result2.includes("güncelleştirme bulunamadı") || result2.includes("is already installed") || result2.includes("zaten yüklü")) {
          console.log(`App is already up to date: ${appId}`);
          this.updatingApps.delete(appId);
          return {
            success: true,
            message: `${appId} zaten güncel`
          };
        } else if (!result2.includes("failed") && !result2.includes("error") && !result2.includes("hata")) {
          console.log(`App updated with custom message: ${appId}`);
          this.updatingApps.delete(appId);
          return {
            success: true,
            message: `${appId} güncellendi: ${result2.split("\n")[0]}`
          };
        } else if (result2.includes("Access denied") || result2.includes("access is denied") || result2.includes("Erişim reddedildi") || result2.includes("yetkisiz")) {
          console.error(`Access denied error while updating app: ${appId}`, result2);
          this.updatingApps.delete(appId);
          return {
            success: false,
            message: `${appId} güncellenemedi: Erişim reddedildi. Yönetici olarak çalıştırmayı deneyin.`
          };
        } else if (result2.includes("No package found") || result2.includes("bulunamadı") || result2.includes("not found")) {
          console.error(`Package not found error while updating app: ${appId}`, result2);
          this.updatingApps.delete(appId);
          return {
            success: false,
            message: `${appId} paketi kaynakta bulunamadı.`
          };
        } else {
          console.error(`Error updating app: ${appId}`, result2);
          this.updatingApps.delete(appId);
          const errorLine = result2.split("\n").find(
            (line) => line.includes("failed") || line.includes("error") || line.includes("hata") || line.includes("başarısız")
          );
          return {
            success: false,
            message: `${appId} güncellenemedi: ${errorLine || result2.split("\n")[0]}`
          };
        }
      } catch (error) {
        console.error(`Exception when updating app ${appId}:`, error);
        this.updatingApps.delete(appId);
        let errorMessage = error.message || "Bilinmeyen bir hata oluştu";
        if (errorMessage.includes("0x80070002") || errorMessage.includes("not found")) {
          errorMessage = "Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun";
        } else if (errorMessage.includes("0x8007139f")) {
          errorMessage = "Bu işlem için yönetici izinleri gerekli";
        } else if (errorMessage.includes("NetworkError") || errorMessage.includes("network")) {
          errorMessage = "Ağ hatası: Lütfen internet bağlantınızı kontrol edin";
        }
        return {
          success: false,
          message: `Hata: ${errorMessage}`
        };
      }
    } catch (error) {
      console.error("updateApp error:", error);
      return {
        success: false,
        message: `Hata: ${error.message || "Bilinmeyen bir hata oluştu"}`
      };
    }
  }
  /**
   * Seçili uygulamaları güncelleme
   * @param apps Güncellenecek uygulama listesi
   * @returns Güncelleme sonuçları
   */
  async update(apps) {
    try {
      if (!Array.isArray(apps) || apps.length === 0) {
        return [{
          id: "batch",
          success: false,
          message: "Güncellenecek uygulama listesi boş veya geçersiz"
        }];
      }
      const results = [];
      for (const app2 of apps) {
        const result2 = await this.updateApp(app2);
        const appId = typeof app2 === "string" ? app2 : app2.id;
        results.push({
          id: appId || "unknown",
          ...result2
        });
      }
      return results;
    } catch (error) {
      console.error("Batch update error:", error);
      return [{
        id: "batch",
        success: false,
        message: `Toplu güncelleme hatası: ${error.message || "Bilinmeyen bir hata oluştu"}`
      }];
    }
  }
  /**
   * Winget ile uygulama yükleme
   * @param appId Uygulamanın ID'si
   * @returns İşlem sonucu
   */
  async installApp(appId) {
    try {
      if (!this.wingetAvailable) {
        throw new Error("Winget yüklü değil.");
      }
      console.log(`Installing app with ID: ${appId}`);
      if (this.installingApps.has(appId)) {
        return { success: false, message: "Bu uygulama zaten yükleniyor" };
      }
      this.installingApps.add(appId);
      try {
        const installedApps = await this.getInstalledApps();
        const alreadyInstalled = installedApps.some((app2) => app2.id === appId);
        if (alreadyInstalled) {
          this.installingApps.delete(appId);
          return {
            success: false,
            message: `${appId} uygulaması zaten yüklü`
          };
        }
        const result2 = await this.executeCommand("install", [appId, "--source", "winget", "--accept-source-agreements", "--accept-package-agreements"]);
        if (result2.includes("successfully") || result2.includes("başarıyla")) {
          console.log(`Successfully installed app: ${appId}`);
          this.installingApps.delete(appId);
          return {
            success: true,
            message: `${appId} başarıyla yüklendi`
          };
        } else if (result2.includes("is already installed") || result2.includes("zaten yüklü")) {
          console.log(`App is already installed: ${appId}`);
          this.installingApps.delete(appId);
          return {
            success: true,
            message: `${appId} zaten yüklü`
          };
        } else if (!result2.includes("failed") && !result2.includes("error")) {
          console.log(`App installed with custom message: ${appId}`);
          this.installingApps.delete(appId);
          return {
            success: true,
            message: `${appId} yüklendi: ${result2.split("\n")[0]}`
          };
        } else {
          console.error(`Error installing app: ${appId}`, result2);
          this.installingApps.delete(appId);
          return {
            success: false,
            message: `${appId} yüklenemedi: ${result2.split("\n")[0]}`
          };
        }
      } catch (error) {
        console.error(`Exception when installing app ${appId}:`, error);
        this.installingApps.delete(appId);
        return {
          success: false,
          message: `Hata: ${error.message || "Bilinmeyen bir hata oluştu"}`
        };
      }
    } catch (error) {
      console.error("installApp error:", error);
      return {
        success: false,
        message: `Hata: ${error.message || "Bilinmeyen bir hata oluştu"}`
      };
    }
  }
  /**
   * Mock veri üreten yardımcı metod
   * @returns Örnek uygulama listesi
   */
  generateMockData() {
    return this.mockApps.map((app2) => {
      const id = app2.name.replace(/\s+/g, ".").toLowerCase();
      return {
        ...app2,
        id
        // Uygulamanın güncelleme durumunu korumak için burada değişiklik yapmıyoruz
      };
    });
  }
  async executeCommand(command, args = []) {
    try {
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const result2 = await new Promise((resolve, reject) => {
            console.log(`Executing winget command: winget ${command} ${args.join(" ")}`);
            const childProcess = spawn$1("winget", [command, ...args], {
              shell: true
            });
            let stdout = "";
            let stderr = "";
            childProcess.stdout.on("data", (data) => {
              const chunk = data.toString();
              stdout += chunk;
              console.log(`[winget stdout]: ${chunk}`);
            });
            childProcess.stderr.on("data", (data) => {
              const chunk = data.toString();
              stderr += chunk;
              console.error(`[winget stderr]: ${chunk}`);
            });
            childProcess.on("close", (code) => {
              console.log(`Winget command exited with code ${code}`);
              if (code !== 0) {
                const errorMessage = stderr || `Winget komutu ${code} kodu ile başarısız oldu`;
                const errorDetail = {
                  command: `winget ${command} ${args.join(" ")}`,
                  exitCode: code,
                  stdout,
                  stderr
                };
                console.error("Winget command failed:", errorDetail);
                if (stderr.includes("0x80070002") || stderr.includes("not found")) {
                  reject(new Error("Winget bulunamadı. Lütfen winget'in yüklü olduğundan emin olun"));
                } else if (stderr.includes("0x8007139f")) {
                  reject(new Error("Bu işlem için yönetici izinleri gerekli olabilir"));
                } else if (stderr.includes("NetworkError") || stderr.includes("network")) {
                  reject(new Error("Ağ hatası: Lütfen internet bağlantınızı kontrol edin"));
                } else if (stderr.includes("Failed to update package")) {
                  reject(new Error("Paket güncellenirken hata oluştu: Güncelleme engellenmiş veya paket kilitli olabilir"));
                } else {
                  reject(new Error(errorMessage));
                }
              } else {
                if (!stdout.trim()) {
                  console.warn("Winget command returned empty output");
                  resolve("Komut başarıyla çalıştı fakat çıktı üretmedi");
                } else if (stdout.includes("failed") || stdout.includes("error")) {
                  console.warn("Winget command output contains error indicators:", stdout);
                  resolve(stdout);
                } else {
                  resolve(stdout);
                }
              }
            });
            childProcess.on("error", (err) => {
              console.error("Winget process error:", err);
              reject(new Error(`Winget komutu çalıştırılamadı: ${err.message}`));
            });
            const timeout = setTimeout(() => {
              childProcess.kill();
              console.error("Winget command timed out after 30 seconds");
              reject(new Error("Winget komutu zaman aşımına uğradı. İşlem iptal edildi."));
            }, 3e4);
            childProcess.on("close", () => clearTimeout(timeout));
          });
          return result2;
        } catch (error) {
          if (attempt === 3) {
            console.error(`Winget command failed after 3 attempts: ${error.message}`);
            throw error;
          }
          const delay = attempt * 2e3;
          console.log(`Winget komutu başarısız oldu, ${attempt}/3 yeniden deneniyor (${delay}ms sonra)...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
      throw new Error("Beklenmeyen bir hata oluştu");
    } catch (error) {
      console.error("Winget executeCommand error:", error);
      throw error;
    }
  }
  parseInstalledAppsList(result2) {
    try {
      console.log("Parsing winget list output:", result2.slice(0, 200) + "...");
      const lines = result2.split("\n");
      let startIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("Name") && lines[i].includes("Id") && lines[i].includes("Version")) {
          startIndex = i + 2;
          break;
        }
      }
      if (startIndex === 0) {
        console.warn("Winget output header not found, using default parsing logic");
        startIndex = 2;
      }
      const dataLines = lines.slice(startIndex);
      const apps = dataLines.map((line) => line.trim()).filter((line) => line.length > 0).map((line) => {
        try {
          const parts = line.split(/\s{2,}/);
          if (parts.length < 3) {
            console.warn("Invalid winget output line format:", line);
            return null;
          }
          return {
            name: parts[0] || "Unknown App",
            id: parts[1] || "",
            version: parts[2] || "",
            newVersion: parts[3] || ""
          };
        } catch (lineError) {
          console.warn("Error parsing winget output line:", line, lineError);
          return null;
        }
      }).filter((app2) => app2 !== null);
      console.log(`Successfully parsed ${apps.length} applications`);
      return apps;
    } catch (parseError) {
      console.error("Error parsing winget output:", parseError);
      console.log("Returning mock data due to parsing error");
      return this.generateMockData();
    }
  }
  parseSearchResults(result2) {
    try {
      console.log("Parsing winget search output:", result2.slice(0, 200) + "...");
      const lines = result2.split("\n");
      let startIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("Name") && lines[i].includes("Id") && lines[i].includes("Version")) {
          startIndex = i + 2;
          break;
        }
      }
      if (startIndex === 0) {
        console.warn("Winget search output header not found, using default parsing logic");
        startIndex = 2;
      }
      const dataLines = lines.slice(startIndex);
      const apps = dataLines.map((line) => line.trim()).filter((line) => line.length > 0).map((line) => {
        try {
          const parts = line.split(/\s{2,}/);
          if (parts.length < 2) {
            console.warn("Invalid winget search output line format:", line);
            return null;
          }
          return {
            name: parts[0] || "Unknown App",
            id: parts[1] || "",
            version: parts[2] || "",
            installed: false
            // Varsayılan olarak yüklü değil
          };
        } catch (lineError) {
          console.warn("Error parsing winget search output line:", line, lineError);
          return null;
        }
      }).filter((app2) => app2 !== null);
      console.log(`Successfully parsed ${apps.length} search results`);
      return apps;
    } catch (parseError) {
      console.error("Error parsing winget search output:", parseError);
      console.log("Returning mock data due to parsing error");
      return this.mockApps.filter((app2) => app2.name.toLowerCase().includes("")).map((app2) => ({
        ...app2,
        id: app2.name.replace(/\s+/g, ".").toLowerCase(),
        installed: false
      }));
    }
  }
}
class IpcHandlerService {
  constructor() {
    __publicField(this, "systemInfoService");
    __publicField(this, "wingetService");
    this.systemInfoService = new SystemInfoService();
    this.wingetService = new WingetService();
  }
  /**
   * Tüm IPC işleyicilerini kaydeder
   */
  registerHandlers() {
    this.registerSystemInfoHandlers();
    this.registerWingetHandlers();
  }
  /**
   * Sistem bilgileriyle ilgili IPC işleyicilerini kaydeder
   */
  registerSystemInfoHandlers() {
    ipcMain.handle("getSystemInfo", async () => {
      return await this.systemInfoService.getAllSystemInfo();
    });
  }
  /**
   * Winget ile ilgili IPC işleyicilerini kaydeder
   */
  registerWingetHandlers() {
    ipcMain.handle("get-installed-apps", async () => {
      try {
        const installedApps = await this.wingetService.getInstalledApps();
        return installedApps;
      } catch (error) {
        console.error("IPC handler get-installed-apps error:", error);
        return { error: error.message || "Uygulama listesi alınırken bir hata oluştu" };
      }
    });
    ipcMain.handle("search-apps", async (_event, keyword) => {
      try {
        const searchResults = await this.wingetService.searchApps(keyword);
        return searchResults;
      } catch (error) {
        console.error("IPC handler search-apps error:", error);
        return { error: error.message || "Uygulama araması yapılırken bir hata oluştu" };
      }
    });
    ipcMain.handle("update-app", async (_event, appId) => {
      try {
        const result2 = await this.wingetService.updateApp(appId);
        return { success: true, message: result2 };
      } catch (error) {
        console.error("IPC handler update-app error:", error);
        return {
          success: false,
          message: error.message || "Uygulama güncellenirken bir hata oluştu",
          details: error.stack
        };
      }
    });
    ipcMain.handle("install-app", async (_event, appId) => {
      try {
        const result2 = await this.wingetService.installApp(appId);
        return { success: true, message: result2 };
      } catch (error) {
        console.error("IPC handler install-app error:", error);
        return {
          success: false,
          message: error.message || "Uygulama yüklenirken bir hata oluştu",
          details: error.stack
        };
      }
    });
  }
}
createRequire(import.meta.url);
const __dirname = path$3.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$3.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$3.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$3.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$3.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 830,
    resizable: true,
    icon: path$3.join(process.env.VITE_PUBLIC, "icon.svg"),
    webPreferences: {
      preload: path$3.join(__dirname, "preload.mjs")
    }
  });
  const ipcHandlerService = new IpcHandlerService();
  ipcHandlerService.registerHandlers();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$3.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
