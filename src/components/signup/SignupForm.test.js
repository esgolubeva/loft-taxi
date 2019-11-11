import React from "react";
import { fireEvent, wait } from "@testing-library/react";
import { App } from "../../App";
import SignupForm from "./SignupForm";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../../modules";
import { fetchRegisterRequest, fetchRegisterSuccess } from "../../modules/auth";

