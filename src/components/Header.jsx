import './header.css'
import healthIcon from "../assets/health_icon.png"

export default function Header() {
    return(
        <div className="header">
            <img src={healthIcon} className="logo" alt="Health icon" />
            <h1 className="title">T2 Lifestyle Checker</h1>
            <h2 className="subtitle">A lifestyle checking web app</h2>
        </div>
    );
}