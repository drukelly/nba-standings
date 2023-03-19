import http.client
import json
from dotenv import load_dotenv
import os
from datetime import date
from datetime import datetime

load_dotenv()

rapid_api_key = os.getenv("RAPID_API_KEY")
rapid_api_host = os.getenv("RAPID_API_HOST")

conn = http.client.HTTPSConnection("api-basketball.p.rapidapi.com")

headers = {
    'X-RapidAPI-Key': rapid_api_key,
    'X-RapidAPI-Host': rapid_api_host
}

today = date.today()
this_year = today.year
last_year = this_year - 1
season_years = str(last_year) + "-" + str(this_year)

conn.request("GET", "/standings?league=12&season=" +
             season_years, headers=headers)

res = conn.getresponse()
data = res.read()

# prints the data
# print(data.decode("utf-8"))

# writes the data to a file
f = open("data/nba-standings.json", "w")
f.write(data.decode("utf-8"))
f.close()


def main():
    theJSON = json.loads(data.decode("utf-8"))
    print("NBA Standings: " + season_years)
    print("Western Conference Standings:")
    print("=====================================")
    seed = 0
    for i in theJSON["response"][0]:
        if i["group"]["name"] == "Western Conference":
            seed += 1
            print(str(seed) + ". " + i["team"]["name"])
            if seed == 6:
                print("---------------------")
            if seed == 10:
                print("---------------------")

    print("\nEastern Conference Standings:")
    print("=====================================")
    seed = 0
    for i in theJSON["response"][0]:
        if i["group"]["name"] == "Eastern Conference":
            seed += 1
            print(str(seed) + ". " + i["team"]["name"])
            if seed == 6:
                print("---------------------")
            if seed == 10:
                print("---------------------")


if __name__ == "__main__":
    main()
