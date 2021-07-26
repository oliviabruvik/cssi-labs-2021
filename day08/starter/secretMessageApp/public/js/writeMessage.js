let number = 1;

const submitMessage = (number) => {
    const messageInput = document.querySelector("#message").value;
    const passcodeInput = document.querySelector("#passcode").value;

    console.log(messageInput);
    console.log(passcodeInput)

    const messageRef = firebase.database().ref();
    const newMessageRef = messageRef.child('UniqueKey' + number);

    newMessageRef.update({
        message: messageInput,
        passcode: passcodeInput,
    });

    number += 1

    // console.log(messageRef.value);
    // messageRef.update({
    //     message: messageInput,
    //     passcode: passcodeInput,
    // });

    // messageRef.on('value', (snapshot) => {
    //     const data = snapshot.val();
    //     updateStarCount(messageInput, passcodeInput);
    // });

};