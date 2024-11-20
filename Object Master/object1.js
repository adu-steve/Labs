//Challenge 1 & 2
const superhero = {
  name: "Superman",
  secretIdentity: "Clark Kent",
  powers: ["flight", "super strength", "heat vision"],
  weakness: "kryptonite",

  usePower(powerName) {
    if (this.powers.includes(powerName)) {
      console.log(`${this.name} uses their power: ${powerName}`);
    } else {
      console.log(`${this.name} doesn't have the power: ${powerName}`);
    }
  },

  revealIdentity() {
    console.log(`${this.name}'s secret identity is ${this.secretIdentity}`);
  },
};

// Testing the methods
superhero.usePower("flight");
