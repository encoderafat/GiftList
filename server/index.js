const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'b0b50100508c494d96ae67a65e9bb7918d0d8696006ae15929854473b3e76d7a';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const {proof, name} = body;
  console.log(proof, name);

  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
