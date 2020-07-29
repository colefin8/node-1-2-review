const fakeDB = [
  {
    name: "Gengar",
    type: "ghost/poison",
    nickname: "",
  },
];

module.exports = {
  getPokemon: (req, res) => {
    //# variable or data inside the send() is received as res.data on the front end in the axios request
    res.status(200).send(fakeDB);
  },
  addPokemon: (req, res) => {
    //# need to know info of pokemon to add
    const { name, type, nickname } = req.body;
    fakeDB.push({ name, type, nickname });
    res.status(200).send(fakeDB);
  },
  editPokemon: (req, res) => {
    //# need to know info of pokemon to edit
    //# need to know which pokemon to edit
    const { name, type, nickname } = req.body;
    for (let i = 0; i < fakeDB.length; i++) {
      if (fakeDB[i].name === name) {
        fakeDB.splice(i, 1, { name, type, nickname });
      }
    }
    res.status(200).send(fakeDB);
  },
  deletePokemon: (req, res) => {
    //# need to know which pokemon to delete
    const { name } = req.query;
    //# const {name} = req.params
    for (let i = 0; i < fakeDB.length; i++) {
      if (fakeDB[i].name === name) {
        fakeDB.splice(i, 1);
      }
    }
    res.status(200).send(fakeDB);
  },
};
