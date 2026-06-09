import mongoose from "mongoose";
import User from "./user.js";

mongoose.set("debug", true);

mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch((error) => console.log(error));

function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
        promise = User.find();
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        promise = findUserByJob(job);
    } else {
        promise = findUserByNameAndJob(name, job);
    }
    return promise;
}

function findUserById(id) {
    return User.findById(id);
}

function addUser(user) {
    const userToAdd = new User(user);
    const promise = userToAdd.save();
    return promise;
}

function findUserByName(name) {
    return User.find({ name: name });
}

function findUserByJob(job) {
    return User.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return User.find({ name: name, job: job });
}

function deleteUserById(id) {
    return User.findByIdAndDelete(id);
}

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUserByNameAndJob,
    deleteUserById,
};