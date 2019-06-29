const path = require('path');
const fs = require('fs');
const config = require('./config');

let sortJSON = (unordered) => {
  const ordered = {};
  Object.keys(unordered).sort().forEach(function (key) {
    ordered[key] = unordered[key];
  });
  return ordered;
}
let getFileContentInDir = (dir) => {
  let rootURL = dir
  return fs.readdirSync(rootURL, {
      withFileTypes: true
    })
    .filter(item => !item.isDirectory())
    .map(item => {
      return {
        fileName: item.name,
        content: fs.readFileSync(path.join(rootURL, item.name), 'utf8')
      }
    });
}

let getAllFileDir = (dir) => {
  let rootURL = dir
  let ret = fs.readdirSync(rootURL, {
      withFileTypes: true
    })
    .filter(item => item.isDirectory())
    .map(item => {
      return dir + '/' + item.name
    });
  return ret;
}

let getAllDirWithChild = (listDir) => {
  let allDir = [];
  allDir = allDir.concat(listDir);

  let getAllDirWithChild1 = (rootDir) => {
    let tmp = [];

    for (let i = 0; i < rootDir.length; i++) {
      const element = rootDir[i];
      if (!element) continue;
      let rootDir1 = getAllFileDir(element)
      allDir = allDir.concat(rootDir1);
      tmp = tmp.concat(rootDir1);
    }
    if (tmp.length) {
      return getAllDirWithChild1(tmp)
    } else {
      return allDir;
    }
  }
  return getAllDirWithChild1(listDir);
}

function fillterContentByRegex(content, regex) {
  let ret = [];
  ret = (content.match(regex) || [])
  return ret;
}

let getTranslateDir = config.getTranslateDir;
let regex = config.regexGetData;

let needTranslate = {};

let count = 0;
let countFile = 0;


getAllDirWithChild(getTranslateDir).map(v => getFileContentInDir(v).map(j => {
  if (needTranslate[j.fileName]) {
    needTranslate[j.fileName].push(...fillterContentByRegex(j.content, regex).map(v => v.replace(regex, `$${config.regexGetDataIndex}`)));
  } else {
    needTranslate[j.fileName] = fillterContentByRegex(j.content, regex).map(v => v.replace(regex, `$${config.regexGetDataIndex}`));
  }
}));

let jsonTrans = {};
for (const iterator in needTranslate) {
  let temp = needTranslate[iterator];
  count += temp.length;
  if (temp.length) {
    countFile += 1;
  }
  temp.map(v => jsonTrans[v] = v);
}

jsonTrans = sortJSON(jsonTrans);

console.log(`find ${count} in ${countFile} files`)



let createTranslate = (jsonIn, jsonExisted) => {
  let out = {};
  for (const key in jsonIn) {
    if (jsonIn.hasOwnProperty(key)) {
      const data = jsonExisted[key] || jsonIn[key];
      out[key] = data
    }
  }
  return out;
}

let writeJson2FileSync = (fileName, json) => {
  return fs.writeFileSync(path.join('./lang/output', fileName.toLowerCase().endsWith('.json') ? fileName : fileName + ".json"), typeof json === 'string' ? json : JSON.stringify(json), 'utf8');
}

function getOutput(lang) {
  const langFileExisted = require(`./lang/input/${lang}.json`);
  writeJson2FileSync(lang, createTranslate(jsonTrans, langFileExisted));
}

config.languages.map(v => {
  getOutput(v);
})