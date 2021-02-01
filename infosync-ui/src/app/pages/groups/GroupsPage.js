import React, {useContext} from "react";
import {Box} from "@material-ui/core";
import UserContext from "../../context/UserContext";
import TeacherGroupsPage from "./TeacherGroupsPage";
import StudentGroupsPage from "./StudentGroupsPage";


export default function GroupsPage() {
    const user = useContext(UserContext)

    const renderRoleDependentPage = () => {
        switch (user.role) {
            case 'student':
                return (
                    <StudentGroupsPage/>
                )
            case 'teacher':
                return (
                    <TeacherGroupsPage/>
                )
        }
    }
    return (
        <Box>
            {renderRoleDependentPage()}
        </Box>
    );
}