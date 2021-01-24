import React, {useContext} from 'react'
import {Box} from "@material-ui/core";
import TeacherNewsPage from "./TeacherNewsPage";
import StudentNewsPage from "./StudentNewsPage";
import UserContext from "../../context/UserContext";

export default function NewsPage() {
    const user = useContext(UserContext)

    const renderRoleDependentPage = () => {
        switch (user.role) {
            case 'student':
                return (
                    <StudentNewsPage/>
                )
            case 'teacher':
                return (
                    <TeacherNewsPage/>
                )
        }
    }
    return (
        <Box>
            {renderRoleDependentPage()}
        </Box>
    );
}