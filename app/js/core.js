const $ = require('jquery');
var Person = require('./modules/Person');

var john = new Person("John Doe", "blue");
john.great();

var jane = new Person("Jane Smith", "red");
jane.great();

