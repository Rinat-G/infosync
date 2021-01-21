import React, {useState} from 'react'
import {Box, Container} from "@material-ui/core";
import UserRole from "../../utils/UserRole";
import TeacherNewsPage from "./TeacherNewsPage";
import StudentNewsPage from "./StudentNewsPage";
import styles from '../../../css/NewsPage.css';

export default function NewsPage() {

    const [role, setRole] = useState(`student`)

    const setCurrentRole = () => {
        return UserRole.userRole()
            .then(response => {
                    setRole(response.data)
                    console.log(`ROLE -- ${role}`)
                }
            )
            .catch(error => alert(`${error}\n roleController crush`))
    }

    const Content = () => {

        setCurrentRole()
            .then(() => console.log(`Launch role controller`))
            .catch(err => console.log(err))

        switch (role) {
            case `student`:
                return (
                    <StudentNewsPage/>
                )
            case `teacher`:
                return (
                    <TeacherNewsPage/>
                )
        }
    }

    return (
            <Box>
                <div className={styles.newsHeader}>
                </div>
                <div className='news_content'>
                    <Content/>
                </div>
            </Box>
    );
}