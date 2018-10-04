module.exports = {
    findAll : () => {
        let cervejas = [
            {
              "name": "Pilsener",
              "maxTemp": "-4",
              "minTemp": "-6",
              "currentTemp": "-6",
              "currentState": "closed",
              "status": "ok"
            },
            {
              "name": "IPA",
              "maxTemp": "-5",
              "minTemp": "-6",
              "currentTemp": "-6",
              "currentState": "closed",
              "status": "ok"
            },
            {
              "name": "Lager",
              "maxTemp": "-4",
              "minTemp": "-7",
              "currentTemp": "-7",
              "currentState": "closed",
              "status": "ok"
            },
            {
              "name": "Stout",
              "maxTemp": "-6",
              "minTemp": "-8",
              "currentTemp": "-8",
              "currentState": "closed",
              "status": "ok"
    
            },
            {
              "name": "Wheat Beer",
              "maxTemp": "-3",
              "minTemp": "-5",
              "currentTemp": "-5",
              "currentState": "closed",
              "status": "ok"
            },
            {
              "name": "Pale Ale",
              "maxTemp": "-4",
              "minTemp": "-6",
              "currentTemp": "-6",
              "currentState": "closed",
              "status": "ok"
            }
          ]
          return cervejas;
    }
}