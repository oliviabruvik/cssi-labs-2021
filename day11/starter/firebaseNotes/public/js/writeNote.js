let googleUser, userId;

window.onload = () => {
    firebase.auth()
        .onAuthStateChanged(user => {
            if (user) {
                console.log(`Logged in as: ${user.displayName}`);
                googleUser = user;
                userId = googleUser.uid;
                window.alert(`Welcome, ${user.displayName}!`);

            } else {
                window.location = 'index.html';
            }
        });

}

const submitNote = () => {

    let today = new Date();
    date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    const note = document.querySelector("#noteText").value;
    const title = document.querySelector("#noteTitle").value;
    const label = document.querySelector("#noteLabel").value;

    firebase.database().ref(`users/${userId}`).push(
        {
            title: title,
            note: note,
            timestamp: dateTime,
            label: label
        }
    )
    .then(() => {
        document.querySelector("#noteText").value = "";
        document.querySelector("#noteTitle").value = "";
        document.querySelector("#noteLabel").value = "";
        alert("Note successfully submitted!");
    })
    .catch(error => {
        console.log(`Something bad happened ...\n${error}`)
    })
};
