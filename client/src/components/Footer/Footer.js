import { Grid, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
const Footer = () => {
	return (
		<Grid
			style={{
				margin: "20px auto 0px",
				padding: "20px 0",
			}}
		>
			<Typography>
				&copy; Copyright 2021<br></br>Made with{" "}
				<FavoriteIcon style={{ fontSize: "16px", color: "#ff0000" }} /> by
				<a
					href="https://www.linkedin.com/in/karan-tyagi-3b73281a0/"
					style={{ textDecoration: "none", color: "rgb(193 13 13)" }}
				>
					<b> Karan Tyagi</b>
				</a>
				<br />
				<small>
					<a
						href="https://www.freepik.com/photos/school"
						style={{ textDecoration: "none" }}
					>
						Background photo created by rawpixel.com - www.freepik.com
					</a>
				</small>
				<br />
				<small>
					Favicon made by{" "}
					<a href="https://www.freepik.com" title="Freepik">
						Freepik
					</a>{" "}
					from{" "}
					<a href="https://www.flaticon.com/" title="Flaticon">
						www.flaticon.com
					</a>
				</small>
			</Typography>
		</Grid>
	);
};

export default Footer;
