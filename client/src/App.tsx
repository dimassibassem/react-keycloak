import {useState} from 'react';
import './index.css';
import axios from "axios";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        if (error.code === "ERR_NETWORK") {
            window.location.href = '/login';
        } else {
            return Promise.reject(error);
        }
    }
);

function WhoAmI() {

    const [data, setData] = useState()

    const whoAmI = async () => {
        try {
            const response = await axiosInstance.get('/api/me', {withCredentials: true})
            setData(response.data)
        } catch (e) {
            setData("You are not logged in")
        }
    }

    return (
        <div>
            <button onClick={whoAmI}>Who am I?</button>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}


function LoginPage() {
    return (
        <div>
            <form action="/api/auth" method="get">
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WhoAmI/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </Router>
    );
}

export default App;
