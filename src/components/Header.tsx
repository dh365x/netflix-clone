import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	top: 0;
	width: 100%;
	height: 68px;
	padding: 0 60px;
	color: ${(props) => props.theme.white.lighter};
`;

const Col = styled.div`
	display: flex;
	align-items: center;
	div {
		margin-left: 25px;
	}
`;

const Logo = styled.svg`
	display: flex;
	width: 92px;
	margin-right: 45px;
	fill: ${(props) => props.theme.red};
`;

const Items = styled.ul`
	display: flex;
	align-items: center;
`;

const Item = styled.li`
	position: relative;
	margin-right: 20px;
	font-size: 13px;
	font-weight: 300;

	&:hover {
		color: ${(porps) => porps.theme.white.normal};
	}
	transition: color 0.3s ease-in-out;
`;

const Search = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	button {
		all: unset;
	}
`;

const Input = styled(motion.input)`
	position: absolute;
	z-index: -1;
	right: 0;
	width: 250px;
	padding: 5px 10px;
	padding-left: 40px;
	border: 1px solid ${(props) => props.theme.white.normal};
	background: ${(props) => props.theme.black.darker};
	color: ${(props) => props.theme.white.normal};
	line-height: 24px;
	transform-origin: right center;
`;

const Notify = styled.div``;

const Account = styled.div`
	img {
		width: 30px;
		border-radius: 5px;
	}
`;

const Circle = styled(motion.span)`
	position: absolute;
	margin: 0 auto;
	left: 0;
	right: 0;
	bottom: -7px;
	width: 5px;
	height: 5px;
	border-radius: 5px;
	background-color: ${(props) => props.theme.red};
`;

const scrollVariants = {
	top: {
		backgroundImage: "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
	},
	scroll: {
		backgroundImage:
			"linear-gradient(rgba(20, 20, 20, 1), rgba(20, 20, 20, 1))",
	},
};

function Header() {
	const homeMatch = useRouteMatch("/");
	const tvMatch = useRouteMatch("/tv");

	const { scrollY } = useScroll();
	const scrollAnimation = useAnimation();

	const [searchOpen, setSearchOpen] = useState(false);

	useEffect(() => {
		scrollY.on("change", () => {
			if (scrollY.get() < 100) {
				scrollAnimation.start("top");
			} else {
				scrollAnimation.start("scroll");
			}
		});
	}, [scrollY, scrollAnimation]);

	const toggleSearch = () => {
		setSearchOpen((prev) => !prev);
	};

	return (
		<Nav variants={scrollVariants} animate={scrollAnimation} initial={"top"}>
			<Col>
				<Link to="/">
					<Logo viewBox="0 0 1024 276.742" xmlns="http://www.w3.org/2000/svg">
						<path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
					</Logo>
				</Link>
				<Items>
					<Item>
						<Link to="/">
							홈{homeMatch?.isExact ? <Circle layoutId="circle" /> : null}
						</Link>
					</Item>
					<Item>
						<Link to="/tv">
							시리즈{tvMatch?.isExact ? <Circle layoutId="circle" /> : null}
						</Link>
					</Item>
				</Items>
			</Col>
			<Col>
				<Search>
					<motion.button
						onClick={toggleSearch}
						animate={{ x: searchOpen ? -215 : 0 }}
						transition={{ type: "linear" }}
					>
						<svg
							width="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M14 11C14 14.3137 11.3137 17 8 17C4.68629 17 2 14.3137 2 11C2 7.68629 4.68629 5 8 5C11.3137 5 14 7.68629 14 11ZM14.3623 15.8506C12.9006 17.7649 10.5945 19 8 19C3.58172 19 0 15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 12.1076 15.7749 13.1626 15.368 14.1218L24.0022 19.1352L22.9979 20.8648L14.3623 15.8506Z"
								fill="currentColor"
							></path>
						</svg>
					</motion.button>
					<Input
						animate={{ scaleX: searchOpen ? 1 : 0 }}
						transition={{ type: "linear" }}
						placeholder="Title, People, Genres"
					/>
				</Search>
				<Notify>
					<svg
						width="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13 4.07092C16.3922 4.55624 18.9998 7.4736 18.9998 11V15.2538C20.0486 15.3307 21.0848 15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 15.4245 3.95095 15.3307 4.99978 15.2538V11C4.99978 7.47345 7.6076 4.55599 11 4.07086V2L13 2V4.07092ZM16.9998 15.1287V11C16.9998 8.23858 14.7612 6 11.9998 6C9.23836 6 6.99978 8.23858 6.99978 11V15.1287C8.64041 15.0437 10.3089 15 11.9998 15C13.6907 15 15.3591 15.0437 16.9998 15.1287ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z"
							fill="currentColor"
						></path>
					</svg>
				</Notify>
				<Account>
					<img
						src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
						alt=""
					/>
				</Account>
			</Col>
		</Nav>
	);
}

export default Header;
