function excuse() {
  function random(x) {return Math.floor(x*Math.random());}
  var a = random(10);
  var b = random(6);
  var c;
  while(!c || c==a) c = random(10);
  var things = ['baby', 'plumber', 'cat', 'mail carrier', 'dog', 'UPS guy', 'rabbit', 'washing machine', 'car', 'neighbor'];
  var verbs = ['ate', 'forgot', 'vomitted over', 'broke', 'upset', 'ran off with'];
  console.log("The", things[a], verbs[b], "the", things[c]);
}