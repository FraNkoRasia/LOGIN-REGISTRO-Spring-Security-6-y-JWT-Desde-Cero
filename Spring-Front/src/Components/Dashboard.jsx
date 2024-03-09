import './Css/Dashboard.css';

export default function Dashboard({ user, setUser }) {

   
    return (
        <div>
            <h1>Welcome</h1>
            <h2>{user}</h2>
        </div>
    );
}
