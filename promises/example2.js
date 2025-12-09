function fetchUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random();
            console.log(random);
            if (random < 0.7) {
                resolve({ id: 1, name: "Jon" });
            } else {
                reject("Failed fetching user!");
            }
        }, 3000);
    })
}
function onFullfil(){
    console.log(user);
}

function onReject(){
    console.log("Rejected from then reject handler")
}

fetchUser()
.then(onFullfil,onReject) //if the promise rejects, onReject will always be called and catch is skipped
.catch(()=>console.log("catch"));//is executed only if the promise resolves because i did not define the user for onFullfil and that will be a new promise reject

fetchUser()
.catch(()=>console.log("catch"))
.then(onFullfil,onReject);
