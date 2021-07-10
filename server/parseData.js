const parseData = (inputData) => {
  var body = Object.keys(inputData)[0];
  var arr = body.split('\r\n');
  var keys = arr[0].split(';');
  var data = [];
  for (var i = 1; i < arr.length; i++) {
    var line = arr[i].split(';');
    var obj = {};
    for (var j = 0; j < line.length; j++) {
      if (line[j]) {
        obj[keys[j]] = line[j];
      }
    }
    if (obj[keys[0]] !== undefined) {
      data.push(obj);
    }
  }
  return data;
}

module.exports.parseData = parseData;
