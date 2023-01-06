const input = document.querySelector('.input');
const btnSend = document.querySelector('.btnSend');
const btnGeo = document.querySelector('.btnGeo');
const clear = document.querySelector('.clear');
const dialogueScreen = document.querySelector('.dialogueScreen');

let websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

websocket.onmessage = function (evt) {
    addMessage(evt.data, 'flex-start');
};

input.addEventListener(`input`, () => {
    setButtonEnabled();
});

btnSend.addEventListener('click', () => {
    let message = input.value;
    websocket.send(message);
    addMessage(message);
    input.value = '';
    setButtonEnabled();
});

btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log('Геолокация не поддерживается вашим браузером')
    } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
});

clear.addEventListener('click', () => {
    dialogueScreen.innerHTML = '';
});

function setButtonEnabled() {
    if (input.value.trim() === '') {
        btnSend.disabled = true;
    } else {
        btnSend.disabled = false;
    }
}

function addMessage(message, position = 'flex-end') {
    let element = `
        <p class='message' style='align-self: ${position}'>
            ${message}
        </p>
    `;
    dialogueScreen.innerHTML += element;
}

const onError = () => {
    addMessage("Позиция не может быть определена");
}

const onSuccess = (position) => {
    addLink(`https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`)
}

function addLink(link) {
    let element = `
    <a href = '${link}' target='_blank' style=text-decoration: none;>
        Геолокация
        </a>
    `;
    addMessage(element);
};