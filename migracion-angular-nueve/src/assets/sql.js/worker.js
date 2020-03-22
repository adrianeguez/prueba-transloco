// Generated by CoffeeScript 1.10.0
var createDb, db;

if (typeof importScripts === 'function') {
  db = null;
  createDb = function(data) {
    if (db != null) {
      db.close();
    }
    return db = new SQL.Database(data);
  };
  self.onmessage = function(event) {
    var buff, callback, data, done, err, error, result;
    data = event['data'];
    switch (data != null ? data['action'] : void 0) {
      case 'open':
        buff = data['buffer'];
        createDb((buff ? new Uint8Array(buff) : void 0));
        return postMessage({
          'id': data['id'],
          'ready': true
        });
      case 'exec':
        if (db === null) {
          createDb();
        }
        if (!data['sql']) {
          throw 'exec: Missing query string';
        }
        return postMessage({
          'id': data['id'],
          'results': db.exec(data['sql'])
        });
      case 'each':
        if (db === null) {
          createDb();
        }
        callback = function(row) {
          return postMessage({
            'id': data['id'],
            'row': row,
            'finished': false
          });
        };
        done = function() {
          return postMessage({
            'id': data['id'],
            'finished': true
          });
        };
        return db.each(data['sql'], data['params'], callback, done);
      case 'export':
        buff = db["export"]();
        result = {
          'id': data['id'],
          'buffer': buff
        };
        try {
          return postMessage(result, [result]);
        } catch (error) {
          err = error;
          return postMessage(result);
        }
        break;
      case 'close':
        return db != null ? db.close() : void 0;
      default:
        throw new 'Invalid action : ' + (data != null ? data['action'] : void 0);
    }
  };
}