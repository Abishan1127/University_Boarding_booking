import "./Footer.css";
import { Link } from "react-router-dom";
import { FacebookFilled, YoutubeFilled, LinkedinFilled, InstagramFilled } from '@ant-design/icons';
import Icon from "../../assets/logo-removebg-preview.png"


const Footer = () => {
	return (
		<div>
			<footer className="footer">
				<div className="container">
					<div className="row">
						<div className="footer-col">
							<img src={Icon} alt="" />
						</div>
						<div className="footer-col">
							<h4>Quik Links</h4>
							<ul>
								<li><Link to="/" className="nav-item">Home</Link></li>
								<li><Link to="/about" className="nav-item">About</Link></li>
								<li><Link to="/contact" className="nav-item">Contact</Link></li>
								<li><Link to="/register" className="nav-item">Register</Link></li>

							</ul>
						</div>
						<div className="footer-col">
							<h4>Contact us</h4>
							<ul>
								<li><a href="#">Address:Colombo 07,Sri Lanka</a></li>
								<li><a href="#">Email:staynearu@gmail.com</a></li>
								<li><a href="#">Phone:+94 k,0764101633</a></li>

							</ul>
						</div>

						<div className="footer-col">
							<h4>follow us</h4>
							<div className="social-links">
								<a href="https://www.facebook.com/profile.php?id=61558518655299"><i className="facebook"><FacebookFilled /></i></a>
								<a href="https://www.youtube.com/channel/UCQ2atoxf4JtdXE3kvdRPl1w"><i className="youtube"><YoutubeFilled /></i></a>
								<a href="https://www.instagram.com/abishankunananthan/"><i className="instagram">< InstagramFilled /></i></a>
								<a href="https://www.linkedin.com/in/abishan-kunananthan-0058112b0/"><i className="linkedin"><LinkedinFilled /></i></a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Footer
