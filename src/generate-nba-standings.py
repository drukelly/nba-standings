import http.client
import json
from dotenv import load_dotenv
import os
from datetime import date
from datetime import datetime

load_dotenv()

rapid_api_key = os.getenv("RAPID_API_KEY")
rapid_api_host = os.getenv("RAPID_API_HOST")

conn = http.client.HTTPSConnection(rapid_api_host)

headers = {'X-RapidAPI-Key': rapid_api_key, 'X-RapidAPI-Host': rapid_api_host}

today = date.today()
this_year = today.year
last_year = this_year - 1
season_years = str(last_year) + "-" + str(this_year)

conn.request("GET",
             "/standings?league=12&season=" + season_years,
             headers=headers)

res = conn.getresponse()
data = res.read()

western_conf = []
eastern_conf = []


def main():
    theJSON = json.loads(data.decode("utf-8"))
    theJSON = theJSON["response"][0]

    for team in theJSON:
        if team["group"]["name"] == "Western Conference":
            western_conf.append({
                "team": team["team"]["name"],
                "wins": team["games"]["win"]["total"],
                "losses": team["games"]["lose"]["total"]
            })

        elif team["group"]["name"] == "Eastern Conference":
            eastern_conf.append({
                "team": team["team"]["name"],
                "wins": team["games"]["win"]["total"],
                "losses": team["games"]["lose"]["total"]
            })

    with open("data/western-conference-teams.json", "w") as wc:
        json.dump(western_conf, wc, indent=4)
    with open("data/eastern-conference-teams.json", "w") as ec:
        json.dump(eastern_conf, ec, indent=4)

    wc.close()
    ec.close()

    conn.close()

    print("Western and Eastern conference JSON files generated.")


if __name__ == "__main__":
    main()
