import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react'

const API_KEY = "api/habr/news"

class TabPostContent extends React.Component {

    gettingNews = async (event) => {
        event.preventDefault();
        const API_URL = await fetch(`http://localhost:8080/${API_KEY}`);
        const news = await API_URL.json();
        console.log(news);
    }


    render() {
        return (

        );
    }
}



export default TabPostContent


