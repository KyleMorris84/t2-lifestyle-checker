import './header.css'
import healthIcon from "../assets/health_icon.png"

export default function Header() {

    const refreshPage = () => window.location.reload()

    return(
        <div className="header">
            <img src={healthIcon} className="logo" alt="Health icon" onClick={refreshPage}/>
            <h1 className="title" onClick={refreshPage}>T2 Lifestyle Checker</h1>
            <h2 className="subtitle">A lifestyle checking web app</h2>
        </div>
    );
}