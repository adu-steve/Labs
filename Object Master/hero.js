// Superhero constructor function
function Superhero(name, powers, weakness) {
  this.name = name;
  this.powers = powers;
  this.weakness = weakness;
}

Superhero.prototype.usePower = function () {
  return `${this.name} uses their power: ${
    this.powers[Math.floor(Math.random() * this.powers.length)]
  }`;
};

Superhero.prototype.getWeakness = function () {
  return `${this.name}'s weakness is ${this.weakness}`;
};

//  superheroes
const superman = new Superhero(
  "Superman",
  ["flight", "super strength", "heat vision"],
  "kryptonite"
);
const batman = new Superhero(
  "Batman",
  ["martial arts", "intelligence", "gadgets"],
  "lack of superpowers"
);
const wonderWoman = new Superhero(
  "Wonder Woman",
  ["super strength", "flight", "combat skills"],
  "lack of magic"
);

const superheroes = {
  Superman: superman,
  Batman: batman,
  "Wonder Woman": wonderWoman,
};

function battle(hero1, hero2) {
  const randomWinner = Math.random() < 0.5 ? hero1 : hero2;
  return `${randomWinner.name} wins the battle!`;
}

document.getElementById("startBattle").addEventListener("click", function () {
  const hero1Name = document.getElementById("hero1").value;
  const hero2Name = document.getElementById("hero2").value;

  if (hero1Name === hero2Name) {
    document.getElementById("result").textContent =
      "Please choose two different heroes for the battle!";
    if ((document.getElementById("result").style.color = "green")) {
      document.getElementById("result").style.color = "red";
      document.getElementById("startBattle").style.display = "";
    }
    return;
  }

  const hero1 = superheroes[hero1Name];
  const hero2 = superheroes[hero2Name];

  const result = battle(hero1, hero2);

  document.getElementById("result").textContent = result;
  document.getElementById("result").style.color = "green";

  console.log(hero1.usePower());
  console.log(hero2.usePower());
});
