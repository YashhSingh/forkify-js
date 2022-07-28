import { TIMEOUT_SEC } from "./config.js";

//putting all those functions here which will be used more than one time and place

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

//putting the functionality of error handling when user has slow internet and website doesnt load in time,
//so when this happens we would give an error and terminate the promise which will then end the functionality

export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)])//using dynamic id to get the api data to create our stuff 
        const data = await res.json()

        if (!res.ok) throw Error(`something Happened  ${res.status} ${res.statusText}`);
        return data
    } catch (err) {
        // console.log(err);
        throw err
    }
}

