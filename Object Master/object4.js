//Challenge 5: Object Iteration and Transformation
const heroes = [
  {
    name: "Superman",
    secretIdentity: "Clark Kent",
    powers: ["flight", "super strength"],
    weakness: "kryptonite",
  },
  {
    name: "Batman",
    secretIdentity: "Bruce Wayne",
    powers: ["martial arts", "intelligence"],
    weakness: "lack of superpowers",
  },
  {
    name: "Wonder Woman",
    secretIdentity: "Diana Prince",
    powers: ["super strength", "flight"],
    weakness: "lack of magic",
  },
];

const heroNames = heroes.map((hero) => hero.name);
console.log(heroNames);

const flyingHeroes = heroes.filter((hero) => hero.powers.includes("flight"));
console.log(flyingHeroes);
