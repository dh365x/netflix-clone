import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movie from "./routes/Movie";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

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
						<Movie />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
