var mysql = require('mysql');
var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "chris",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
  var queryString = 'SELECT users.UserID, UserName, Message, CreatedAt, RoomName FROM users inner join messages ON users.UserID = messages.UserID';
  dbConnection.query(queryString, function(err, messages){
    console.log(messages);
    cb(err, messages);
  });
};

exports.findUser = function(username, cb){
  // dbConnection.query('SELECT UserName FROM users WHERE UserName = ' + username, cb);
  var test = 'SELECT * FROM users WHERE UserName = ?';
  dbConnection.query(test, [username], cb);
};

exports.saveUser = function(username, cb){
  console.log('got here', username, cb);
  dbConnection.query('INSERT INTO users (UserName) values (?)', [username], function(){
    dbConnection.query('SELECT * from users WHERE UserID = LAST_INSERT_ID()', function(err, results){
      cb(results);
    });
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  var values = [null, userid, message, null, roomname];
  dbConnection.query('INSERT INTO messages values(?)', [values], function(){
    dbConnection.query('SELECT * from messages WHERE MessageID = LAST_INSERT_ID()', [values], function(err,results){
      console.log(results);
      cb();
    });
  });
};
