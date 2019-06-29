module.exports = {
  getTranslateDir: ['E:/cocobay/book/src'],
  regexGetData: /translate\(('|")(.*?)('|")\)/ ,///sails.__\('(.*?)'\)/gi,
  languages: ['vi', 'en'],
  regexGetDataIndex: 2 //vị trí lấy dữ liệu trong regex ở đây là lấy phần (.*?)
}