function getUser(id, callback) {
    let user = {
        id: id,
        name: 'Javi'
    };
    setTimeout(() => {
        callback(user);
    }, 500);
}

getUser(31, (user) => {
    console.log(user);
});
