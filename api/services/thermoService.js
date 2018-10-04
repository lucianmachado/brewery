module.exports = {
    getTempAndStatus: (body) => {
        let currentTemp = parseFloat(JSON.parse(body)['currentTemp'])
        let currentState = JSON.parse(body)['currentState']
        const maxTemp = parseFloat(JSON.parse(body)['maxTemp'])
        const minTemp = parseFloat(JSON.parse(body)['minTemp'])
        let status = "ok";

        if (currentState == "closed" && currentTemp > minTemp) {
            currentTemp -= 0.5
        } else {
            currentTemp += 0.5
        }
        if (currentTemp > maxTemp || currentTemp < minTemp) {
            status = "danger"
        } else {
            status = "ok"
        }
        return JSON.stringify({ currentTemp: currentTemp, status: status });
    }
}