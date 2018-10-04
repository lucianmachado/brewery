const beers = require('../api/models/beer')

test('Get beers list', () => {
    expect(beers.findAll().length).toBe(6);
});
  
test('Get get beer', () => {
    expect(beers.findAll()[0]).toEqual({"currentState": "closed", "currentTemp": "-6", "maxTemp": "-4", "minTemp": "-6", "name": "Pilsener", "status": "ok"});
});