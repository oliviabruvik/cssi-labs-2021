const signIn = (loginMethod) => {

    console.log("Calling sign in");

    if (loginMethod === 'google') {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            // do
            console.log(`Result is: ${result}`);
            const credential = result.credential;
            const token = credential.accessToken;
            const user = result.user;

            console.log(user.uid);
            window.location = 'writeNote.html';
        })
        .catch(error => {
            // Smth bad happened :(
            console.log(error);
        })

    } else if (loginMethod === 'username') {
        // sign in with username by creating new database

        const usernameInput = document.querySelector("#usernameInput").value;
        const passwordInput = document.querySelector("#passwordInput").value;
        
        console.log(usernameInput);
        console.log(passwordInput);

        // sign in with username by creating new database

        const usernameRef = firebase.database().ref('users');
        usernameRef.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);

            for (const recordKey in data) {
                console.log(recordKey);
                console.log(data[recordKey]);

                const record = data[recordKey];
                const username = record.username;
                const passcode = record.passcode;

                if (username === usernameInput && passcode === passwordInput) {
                    console.log("Success!")
                    window.location = 'writeNote.html';
                    return;
                }

            }
            alert("Incorrect username or password");
        })

    } else {
        console.log('invalid login method.')
    }
};


const showSignInBox = (signInStatus) => {
    const signInBox = document.querySelector("#signInBox");
    signInBox.classList.remove("hidden");

    const signInButton = document.querySelector("#signInButton");
    signInButton.innerHTML = signInStatus;
};

const signUp = () => {

    const usernameInput = document.querySelector("#usernameInput").value;
    const passwordInput = document.querySelector("#passwordInput").value;
        
    firebase.database().ref('users').push(
        {
            username: usernameInput,
            passcode: passwordInput,
        }
    )
    .then(() => {
        console.log('success')
    })
    .catch(error => {
        console.log(`Something bad happened ...\n${error}`)
    })
};