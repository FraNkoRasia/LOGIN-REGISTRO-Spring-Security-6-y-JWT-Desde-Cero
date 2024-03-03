import './Css/Home.css';

export function Home({ user, setUser }) {
   
    return (
        <div>
            <h1>Bienvenido</h1>
            <h2>{user}</h2>
            
            
        </div>
    );
}
