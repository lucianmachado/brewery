const thermoService = require('../api/services/thermoService')

test('Get temperature and status', () => {
    let payload = JSON.stringify({ "currentTemp": "-6", "currentState": "opened", "status": "ok", "maxTemp": "-5", "minTemp": "-6" })
    expect(
        thermoService
            .getTempAndStatus(payload))
        .toEqual("{\"currentTemp\":-5.5,\"status\":\"ok\"}")
});

test('Get temperature and status danger (maxTemp)', () => {
    let payload = JSON.stringify({ "currentTemp": "10", "currentState": "opened", "status": "ok", "maxTemp": "-5", "minTemp": "-6" })
    expect(
        thermoService
            .getTempAndStatus(payload))
        .toEqual("{\"currentTemp\":10.5,\"status\":\"danger\"}")
});

test('Get temperature and status danger (minTemp)', () => {
    let payload = JSON.stringify({ "currentTemp": "-60", "currentState": "opened", "status": "ok", "maxTemp": "-5", "minTemp": "-4" })
    expect(
        thermoService
            .getTempAndStatus(payload))
        .toEqual("{\"currentTemp\":-59.5,\"status\":\"danger\"}")
});