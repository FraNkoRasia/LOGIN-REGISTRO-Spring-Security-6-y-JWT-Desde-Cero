import './Css/Dashboard.css';

export default function Dashboard({ user }) {
console.log("usuario",user)

    return (
        <div>
            <h1>Welcome</h1>
            <h2>{user.name}</h2>
            <h2>{user.lastname}</h2>
            <h2>{user.sub}</h2>
            <h2>{user.passport}</h2>
            <h2>{user.phone}</h2>


        </div>
    );
}
