import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
const Footer = () => {
	return (
		<div>
			&copy;Copyright: Made with{" "}
			<FavoriteIcon style={{ fontSize: "12px" }} /> by
			<a
				href="https://www.linkedin.com/in/karan-tyagi-3b73281a0/"
				style={{ textDecoration: "none" }}
			>
				<b> Karan Tyagi</b>
			</a>
		</div>
	);
};

export default Footer;
