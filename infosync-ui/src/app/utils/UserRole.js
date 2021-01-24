import React from "react";
import Axios from "axios";

const userRole = () => {
    return Axios
        .get('/api/user/role')
        .then(response => {
            return response
        })
        .catch(error => alert(error))
}

const isTeacher = () => {
    return userRole()
        .then(response => { return response.data === "teacher" })
        .catch(error => alert(error))
}

const isStudent = () => {
    return userRole()
        .then(response => { return response.data === "student" })
        .catch(error => alert(error))
}

const UserRole = {
    userRole,
    isTeacher,
    isStudent
}

export default UserRole