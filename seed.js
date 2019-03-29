const { User } = require("./db");

module.exports = () => {
  return Promise.all([
    User.create({
      name: "Groucho",
      bio: "He was Groucho, then he died.",
      rank: 10
    }),
    User.create({
      name: "Harpo",
      bio: "Was once Harpo. It was a whole thing.",
      rank: 3
    }),
    User.create({
      name: "Karl",
      bio: "A whole other kind of Marx.",
      rank: 1
    }),
    User.create({
      name: "Richard",
      bio: "Will be right here waiting for you.",
      rank: 1
    })
  ]);
};
