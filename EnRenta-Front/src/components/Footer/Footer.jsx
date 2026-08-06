import './Footer.css'
import logo from '../../assets/LogoGrisUniforme.png' 

export const Footer = () => {
  return (
    <div className="footer">
        <img src={logo} alt="Logo" className="footer-logo" />
        <p>&copy; 2023 EnRenta. All rights reserved.</p>
    </div>
  )
}
