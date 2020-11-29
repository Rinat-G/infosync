import Axios from "axios";

const ajax = (url, payload) => {
    return Axios({
        method: 'get',
        url: url,
        data: payload,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}

export default ajax;