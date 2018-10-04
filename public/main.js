window.onload = function () {
    window.timers = []
    window.notifications = []
    init()
}
/**
 * Render all components also loads data from webservice
 */
async function init() {
    console.log("Initializing...")
    let beerList = await loadBreweryList();

    renderBreweryComponent('brewery-component', beerList);
}

function renderBreweryComponent(elementId, list) {
    console.log('Rendering Beer component')
    let element = document.getElementById(elementId);

    list.forEach((item, idFridge) => {
        let fridgeDiv = document.createElement('div');
        fridgeDiv.innerHTML = `
        <div class="fridge" id="fridge::${idFridge}">
            <div class="title">
            ${item.name}
            </div>
            <div class="fridge-information" id="fridgeInformation::${idFridge}">
            <div class="temperature" id="fridgeTemperatureContainer::${idFridge}">
                <div class="temperature-value" id="fridgeTemperature::${idFridge}"                  
                data-status=${item.status}
                data-maxTemp=${item.maxTemp}
                data-minTemp=${item.minTemp}
                >
                ${item.currentTemp}
                </div>
            </div>
            </div>
            <button class="open-fridge-button" onclick="openCloseDoor(this)" 
                data-id-fridge="${idFridge}" data-door-state="closed"
                data-fridge-name=${item.name}
                >Open Door</button>
        </div>`
        element.appendChild(fridgeDiv)
    });
}

function renderNotify(message) {
    var elem = document.createElement('div');

    elem.innerHTML = `
    <div class="aviso">
        ${message.title}
    </div>`

    document.body.appendChild(elem);

    setTimeout(() => { elem.innerHTML = "" }, 8000)
}

function loadBreweryList() {
    console.log("Fetching data");
    const breweryArrayPromise = fetch('/api/')
        .then(response => response.json());
    return breweryArrayPromise;
}

async function openCloseDoor(element) {
    const idFridge = element.getAttribute("data-id-fridge");
    const nameFridge = element.getAttribute("data-fridge-name");
    const divTemperature = document.getElementById(`fridgeTemperature::${idFridge}`)
    const doorState = element.getAttribute("data-door-state");
    const statusFridge = divTemperature.getAttribute('data-status');
    const maxTemperature = divTemperature.getAttribute('data-maxTemp');
    const minTemperature = divTemperature.getAttribute('data-minTemp');

    if (doorState == "closed") {
        element.innerText = 'Close Door'
        element.setAttribute('data-door-state', 'opened')


        renderNotify({ title: `${nameFridge} opened` })

        window[`timer::${idFridge}`] = setInterval(async function () {
            let response = await fetch('/api/', {
                method: "PUT",
                body: JSON.stringify({
                    "currentTemp": document.getElementById(`fridgeTemperature::${idFridge}`).innerText,
                    "currentState": "opened",
                    "status": statusFridge,
                    "maxTemp": maxTemperature,
                    "minTemp": minTemperature,
                    "currentState": element.getAttribute("data-door-state")
                })
            })
                .then(response => response.json());
            document.getElementById(`fridgeTemperature::${idFridge}`).innerText = response.currentTemp;
            if (response.status == "danger") {
                const divFridge = document.getElementById(`fridgeTemperatureContainer::${idFridge}`)
                divFridge.className = "temperature blink"

                renderNotify({ title: `The ${nameFridge}'s door is open...` })
            } else {
                const divFridge = document.getElementById(`fridgeTemperatureContainer::${idFridge}`)
                divFridge.className = "temperature"
            }
        }, 5000);

    } else {
        element.setAttribute('data-door-state', 'closed')
        element.innerText = 'Open Door'
        window[`timer::${idFridge}`] = setInterval(async function () {
            let response = await fetch('/api/', {
                method: "PUT",
                body: JSON.stringify({
                    "currentTemp": document.getElementById(`fridgeTemperature::${idFridge}`).innerText,
                    "currentState": "closed",
                    "status": statusFridge,
                    "maxTemp": maxTemperature,
                    "minTemp": minTemperature,
                    "currentState": element.getAttribute("data-door-state")
                })
            })
                .then(response => response.json());
            if (response.status == "danger") {
                const divFridge = document.getElementById(`fridgeTemperatureContainer::${idFridge}`)
                divFridge.className = "temperature blink"

                renderNotify({ title: `The ${nameFridge}'s door is open...` })
            } else {
                const divFridge = document.getElementById(`fridgeTemperatureContainer::${idFridge}`)
                divFridge.className = "temperature"
            }
            document.getElementById(`fridgeTemperature::${idFridge}`).innerText = response.currentTemp;
        }, 5000);
    }
}