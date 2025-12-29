const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 300);
});

function handleFulfilledA() {
    console.log(1);
}

function handleRejectedA() {
    console.log(2);
}

function handleFulfilledB() {
    console.log(3);
}

function handleRejectedB() {
    console.log(4);
}

function handleFulfilledC() {
    console.log(5);
}

function handleRejectedC() {
    console.log(6);
}


myPromise
    .then(handleFulfilledA, handleRejectedA)
    .then(handleFulfilledB, handleRejectedB)
    .then(handleFulfilledC, handleRejectedC);