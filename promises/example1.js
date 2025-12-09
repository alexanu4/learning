function fetchUser() {
    console.log(1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random < 0.7) {
                resolve({ id: 1, name: "Jon" });
            } else {
                reject("Failed fetching user!");
            }
        }, 3000);
    })
}

function fetchPosts() {
    console.log(2);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            if (random < 0.7) {
                resolve({ id: 1, text: "Hi there!" });
            } else {
                reject("Failed fetching posts!");
            }
        }, 2000);
    })
}

function fetchComments() {
    console.log(3);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const firstRandom = Math.random();
            const secondRandom = Math.random();

            if (firstRandom < secondRandom) {
                resolve({ id: 1, comment: "Who is this??" });
            } else {
                reject("Failed fetching comments!");
            }
        }, 1500);
    })
}


fetchUser()
    .then(user => {
        console.log(user)
        fetchPosts()
            .then(post => {
                console.log(post);
                fetchComments()
                    .then(comment => console.log(comment))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    })
    .catch(error => console.log(error))
    .finally(() => console.log("Done!"));

console.log(4);
