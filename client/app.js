/**
 * @file Client-side main file.
 * @author Dan Lopez 2016
 */

let player = null;
let fr = new FileReader();
Template.app.events({
});

Template.app.onRendered(() => {
  console.log('on rendered');
  song = fr.readFile('./Klonoa - Untamed Heart.flac');
  console.log(song);
  //fr.onload(() => {player = AV.Asset.fromFile(song);});
  console.log(player);
  player.play();
});

Template.app.events({

});
