import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";
import Home from "./routes/Home";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route path="/search">
						<Search />
					</Route>
					<Route path="/tv">
						<Tv />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				<Footer />
			</Router>
		</>
	);
}

export default App;
