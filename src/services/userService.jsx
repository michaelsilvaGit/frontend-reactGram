import {api, requestConfig} from "../utils/config";




//Get user details
const profile = async (data, token) => {

    const config = requestConfig("GET", data, token);

    try {

        const res = await fetch(api + "users/profile", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
        
    } catch (error) {

        console.log(error);
        
    }

};





//Update user details
const updateProfile = async (data, token) => {

    const config = requestConfig("PUT", data, token, true);

    try {

        const res = await fetch(api + "users/", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
        
    } catch (error) {
        console.log(error);
    }
};



//Get user details
const getUserDetails = async (id) => {

    const config = requestConfig("GET");

    try {
        const res = await fetch(api + "users/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
        
    } catch (error) {
        console.log(error)
    }
}



//Get all users
const getAllUsers = async (token) => {

    const config = requestConfig("GET", null, token);


    try {
        const res = await fetch(api + "users", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
        
    } catch (error) {
        console.log(error)
    }
}



//Insert a Storie
const insertStorie = async (data, token) => {

    const config = requestConfig("PUT", data, token);

    try {
        const res = await fetch(api + "users/storieUser", config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
        
    } catch (error) {
        console.log(error);
    }
}


//Remove insert storie
const removeInsertStorie = async (id, token) => {

    console.log("Service: " + id)

    const config = requestConfig("PUT", null, token);

    try {
        const res = await fetch(api + "users/storie/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res;
        
    } catch (error) {
        console.log(error);
    }

}



const userServices = {
    profile,
    updateProfile,
    getUserDetails,
    getAllUsers,
    insertStorie,
    removeInsertStorie,
}

export default userServices;