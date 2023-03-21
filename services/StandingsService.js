const fs = require('fs');
const path = require('path');

const readFile = util.promisify(fs.readFile);

class StandingService {
  constructor(datafile) {
    this.datafile = datafile;
  }
  // Returns a list of Western Conference teams

  // Returns a list of Eastern Conference teams

  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data);
  }
}

module.exports = StandingService;