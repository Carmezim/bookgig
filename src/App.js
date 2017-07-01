import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import PropTypes from "prop-types";
import PrivateRoute from "./common/PrivateRoute/AuthRoute";
import { Route, withRouter } from "react-router-dom";

// Import all components
import Login from "./login";
import Dashboard from "./dashboard";
import Signup from "./signup";
import "./App.css";

// import actions
import { unsetClient } from "./client/actions";

class App extends Component {
	static propTypes = {
		children: PropTypes.node
	};

	render() {
		const { client: { token }, unsetClient } = this.props;
		const hasLocalToken = localStorage.getItem("token") ? true : false;
		console.log(hasLocalToken);
		console.log(token);

		return (
			<div className="App">
				<div className="app-header">
					{!!hasLocalToken && <button onClick={unsetClient}>Logout</button>}
				</div>
				<section className="app-body">
					<Switch>
						<PrivateRoute
							token={token}
							isPrivate={false}
							path="/admin"
							component={Login}
						/>
						<PrivateRoute
							token={token}
							isPrivate={true}
							path="/dashboard"
							component={Dashboard}
						/>
						<PrivateRoute exact isPrivate={false} path="/" component={Signup} />
					</Switch>
				</section>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	client: state.client
});

const AppWithRouter = withRouter(
	connect(mapStateToProps, { unsetClient })(App)
);

export default AppWithRouter;
