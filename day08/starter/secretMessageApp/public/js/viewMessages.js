let attempts = 3;

const getMessages = number => {
    const card = document.querySelector("#message-card-" + number);
    const messageRef = firebase.database().ref();
    messageRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);

        const passcodeAttempt = document.querySelector(`#passcode${number}`).value;

        for (const recordKey in data) {
            console.log(recordKey);
            console.log(data[recordKey]);

            const record = data[recordKey];
            const storedPasscode = record.passcode;

            if (passcodeAttempt === storedPasscode) {
                console.log(`Message is: ${record.message}`); 
                renderMessageAsHtml(record.message, number);
                return;
            }
        }

        attempts -= 1;

        if (attempts > 1) {
            alert(`Please try again! You have ${attempts} attempts left.`);
        } else if (attempts = 1) {
            alert(`Please try again! You have ${attempts} attempt left.`);
        } else {
             alert(`You have no more attempts. Please return in 20 seconds.`);
        }
        
    });
};
    
const renderMessageAsHtml = (message, number) => {
    const card = document.querySelector("#message-card-" + number);
    card.classList.remove("hidden");

    const passcodeInput = document.querySelector("#passcode" + number);
    passcodeInput.value = "";

    const messageDisplay = document.querySelector("#message" + number);
    messageDisplay.innerHTML = message;
}

const newMessage = (number) => {
    const column = document.querySelector("#column" + number);
    column.classList.remove("hidden");
}