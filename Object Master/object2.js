//Challenge 3 - Object Constructors
function Superhero(name, secretIdentity, powers, weakness) {
  this.name = name;
  this.secretIdentity = secretIdentity;
  this.powers = powers;
  this.weakness = weakness;

  this.usePower = function (powerName) {
    if (this.powers.includes(powerName)) {
      console.log(`${this.name} uses their power: ${powerName}`);
    } else {
      console.log(`${this.name} doesn't have the power: ${powerName}`);
    }
  };

  this.revealIdentity = function () {
    console.log(`${this.name}'s secret identity is ${this.secretIdentity}`);
  };
}

const batman = new Superhero(
  "Batman",
  "Bruce Wayne",
  ["martial arts", "intelligence"],
  "lack of superpowers"
);
const spiderMan = new Superhero(
  "Spider-Man",
  "Peter Parker",
  ["wall crawling", "web shooting"],
  "danger to loved ones"
);

batman.usePower("martial arts");
