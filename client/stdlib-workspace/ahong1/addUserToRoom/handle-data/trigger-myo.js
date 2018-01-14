var Myo = require('myo');

Myo.connect('com.example.ticktocktock', require('ws'));

console.log('here');
Myo.on('fist', function(){
    console.log('Hello Myo!');
    this.vibrate();
});