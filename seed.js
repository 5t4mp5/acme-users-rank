const { User } = require("./db");

module.exports = () => {
  return Promise.all([
    User.create({
      name: "Groucho Marx",
      bio: "Would never join any club that would have him as a member",
      rank: 1
    }),
    User.create({
      name: "Chico Marx",
      bio: "Nice hat, but kind of a con man.",
      rank: 3
    }),
    User.create({
      name: "Karl Marx",
      bio: "A whole other kind of Marx.",
      rank: 2
    }),
    User.create({
      name: "Richard Marx",
      bio: "Will be right here waiting for you.",
      rank: 1
    })
  ]);
};
