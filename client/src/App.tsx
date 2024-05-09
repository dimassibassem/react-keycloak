import {useState} from 'react';
import './index.css';
import axios from "axios";

function App() {

    const [data, setData] = useState()

    const whoAmI = async () => {
        try {
            const response = await axios.get('/api/me')
            setData(response.data)
        } catch (e) {
            setData("You are not logged in")
        }
    }

    return (
        <div>
            <form action="/api/auth" method="get">
                <button type="submit">Login</button>
            </form>
            <button onClick={whoAmI}>Who am I?</button>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}

export default App;
