/**
 * it is a constructor for MyPromise. It takes a function as an argument.
 * @param {*} task function which will be executed in furture.
 */
function MyPromise(task) {
    this.__thenable = [];
    this.__catch;
    /**
     * Whenever future function job is done it calls resolve function
     * and resolve function's job is to notify all the clients.
     * @param {*} value This is a result when promise completed successfully.
     */
    function resolve(value) {
        this.__thenable.forEach(element => {
            value = element(value);
        });
    }
    /**
     * When future function gets an error reject funtion gets call. 
     * Reject function's job is to notify the error to client.
     * @param {*} err 
     */
    function reject(err) {
        if (this.__catch)
            this.__catch(err);
    }
    task(resolve.bind(this), reject.bind(this));
}
/**
 * This function allows client to register a function, 
 * so that they can get the result of MyPromise.
 * @param {*} callback This is a function.
 */
MyPromise.prototype.then = function (callback) {
    this.__thenable.push(callback);
    return this;
}
/**
 * This function allows client to register a fucntion,
 * so that they can get the error if MyPromise fails.
 * @param {*} callback 
 */
MyPromise.prototype.catch = function (callback) {
    this.__catch = callback;
    return this;
}

// Testing MyPromise
const myPromise = new MyPromise(function (resolve, reject) {
    setTimeout(function () {
        const num = Math.floor(Math.random() * 10);
        if (num % 2 === 0)
            resolve("Hello Jyotir");
        else
            reject("Something is wrong");
    }, 2000);
});

myPromise.then(function (value) {
    console.log(`1st then -- ${value}`);
    return "From 1st promise";
}).then(function (value) {
    console.log(`2nd then -- ${value}`);
    return "From 2nd promise";
}).then(function (value) {
    console.log(`3rd then -- ${value}`);
    return "From 3rd promise";
}).catch(function (err) {
    console.log(err);
});