const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class StandingsService {
  constructor(datafile, conference) {
    this.datafile = datafile;
    this.conference = conference;
  }

  // Returns a list of based on conference teams
  // async displayConferenceTeam() {
  // const data = await this.getData();
  // return data.filter(team => team.Conference === this.conference);
  // }

  async getStandings() {
    const data = await this.getData();
    return data;
  }

  async getData() {
    const data = await readFile(this.datafile, "utf8");
    return JSON.parse(data);
  }
}

module.exports = StandingsService;