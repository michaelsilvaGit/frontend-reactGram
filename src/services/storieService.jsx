import {api, requestConfig} from "../utils/config";




//Publish an Storie
const publishStorie = async (data, token) => {

    const config = requestConfig("POST", data, token, true);

    try {

        const res = await fetch(api + "stories", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error)

    }

}

//Delete a storie
const deleteStorie = async (id, token) => {

    const config = requestConfig("DELETE", null, token);

    try {

        const res = await fetch(api + "stories/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
        
    } catch (error) {
        console.log(error)
    }
}


//Get user Stories
const getUserStories = async (id, token) => {

    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "stories/user/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);
        
        return res;

    } catch (error) {
        console.log(error)
    }
}



//Get all photos
const getAllStories = async (token) => {

    const config = requestConfig("GET", null, token);

    try {
        const res = await fetch(api + "stories", config)
        .then((res) => res.json())
        .catch((err) => err);
        
        return res;

    } catch (error) {
        console.log(error)
    }
}



//Like a photo
const likeStorie = async (id, token) => {

    const config = requestConfig("PUT", null, token);

    try {
        const res = await fetch(api + "stories/like/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error)
    }
}



const storieService = {
    publishStorie,
    getUserStories,
    deleteStorie,
    getAllStories,
    likeStorie,
}



export default storieService;