const signIn = (loginMethod) => {
    if (loginMethod === 'google') {
        const provider = new firebase.auth.GoogleAuthProvider();
    } else if (loginMethod === 'username') {
        // sign in with username by creating new database
    } else {
        console.log('invalid login method.')
    }

    console.log("Calling sign in");

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
};

const signInEmail = () => {
    console.log("Calling sign in");
    const provider = new firebase.auth.EmailAuthProvider();

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
};