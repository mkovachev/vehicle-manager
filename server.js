const express = require('express');
const app = express();

// on project load copy dependencies in public/scripts (requires run as admin!!!)
//const depLinker = require('dep-linker');
//depLinker.copyDependenciesTo('./public/scripts');


app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Server running on port 3000');
})