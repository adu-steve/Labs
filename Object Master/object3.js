//Challenge 4: Prototypal Inheritance
function Hero(name, secretIdentity, powers, weakness) {
  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
  this.weakness = weakness;
}

Hero.prototype.usePower = function (powerName) {
  if (this.powers.includes(powerName)) {
    console.log(`${this.name} uses their power: ${powerName}`);
  } else {
    console.log(`${this.name} doesn't have the power: ${powerName}`);
  }
};

Hero.prototype.revealIdentity = function () {
  console.log(`${this.name}'s secret identity is ${this.secretIdentity}`);
};

function Superhero(name, secretIdentity, powers, weakness, ally) {
  Hero.call(this, name, secretIdentity, powers, weakness);
  this.ally = ally;
}

Superhero.prototype = Object.create(Hero.prototype);
Superhero.prototype.constructor = Superhero;

Superhero.prototype.teamUp = function () {
  console.log(`${this.name} teams up with ${this.ally}`);
};

const wonderWoman = new Superhero(
  "Wonder Woman",
  "Diana Prince",
  ["super strength", "flight"],
  "lack of magic",
  "Batman"
);
wonderWoman.usePower("flight");
