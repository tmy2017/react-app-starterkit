import React, { Component } from "react";
import NavLink from "../../containers/NavLink";
import Login from "./Login";
import Register from "./Register";
import { Route } from "react-router-dom";
import { AppConfig } from "../../config";

const Auth = class extends Component {
  render() {
    const { location } = this.props;
    return location.pathname === "/auth" ? (
      <div className="row">
        {AppConfig.projectUrl !== "https://reactstarter.form.io" ? (
          <div className="col-md-12">
            <div className="alert alert-warning">
              use <b>hihi@hihi.com</b> to login as admin for seeing "form" link
              <br />
              <br />
              if regiseter as normal user - then only see "event" link
              ._15._y20.0406-2259
              <br />
              <br />
              portal link -
              <a href="https://next.form.io/#/project/5d55b19fe19cfa428e9536eb/overview">
                https://next.form.io/#/project/5d55b19fe19cfa428e9536eb/overview{" "}
              </a>
            </div>

            <div>
              {" "}
              You can register a regular user here. To register an Admin user,
              go to your project in the form.io portal, navigate to the Admin
              resource and create an Admin.
            </div>
          </div>
        ) : null}
        <div className="col-lg-6 col-md-6">
          <div className="panel panel-primary login-container card">
            <div className="panel-heading card-header">Login</div>
            <div className="panel-body card-body">
              <Login />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="panel panel-primary register-container card">
            <div className="panel-heading card-header">Register</div>
            <div className="panel-body card-body">
              <Register />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="panel panel-default card">
            <div
              className="panel-heading card-header"
              style={{ paddingBottom: 0, borderBottom: "none" }}
            >
              <ul className="nav nav-tabs" style={{ borderBottom: "none" }}>
                <NavLink to={"/auth/login"}>Login</NavLink>
                <NavLink to={"/auth/register"}>Register</NavLink>
              </ul>
            </div>
            <div className="panel-body card-body">
              <div className="row">
                <div className="col-lg-12">
                  <Route path="/auth/login" component={Login} />
                  <Route path="/auth/register" component={Register} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Auth;
