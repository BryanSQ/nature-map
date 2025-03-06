import { Link } from "react-router-dom";
import { Navigation } from "../Navigation";

import { PiPersonSimpleHikeFill } from "react-icons/pi";
import { MdOutlineTravelExplore } from "react-icons/md";

import "./Island.css";

interface IIslandProps {
	children: React.ReactNode;
}

export const Island = ({ children }: IIslandProps) => {
	return (
		<section className="island">
			<header className="island-header">
				<h1 className="island-header__text">Leaf & Breeze</h1>
			</header>
			<Navigation>
				<Link to="/explore">
					Explore <MdOutlineTravelExplore />
				</Link>
				<Link to="/hiking">
					Hiking
					<PiPersonSimpleHikeFill />
				</Link>
			</Navigation>
			{children}
		</section>
	);
};
