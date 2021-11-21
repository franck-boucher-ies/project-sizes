import { writable } from "svelte/store";

localStorage.removeItem("lol");

const getItem = (str) => {
  const item = localStorage.getItem(str);
  return JSON.parse(item) || "";
};

const setItem = (str, value) => {
  localStorage.setItem(str, JSON.stringify(value));
};

export const token = writable(getItem("token"));
export const setToken = (value) => {
  token.set(value);
  setItem("token", value);
};

export const login = writable(getItem("login"));
export const setLogin = (value) => {
  login.set(value);
  setItem("login", value);
};

export const orgId = writable(getItem("orgId"));
export const setOrgId = (value) => {
  orgId.set(value);
  setItem("orgId", value);
};

export const projectId = writable(getItem("projectId"));
export const setProjectId = (value) => {
  projectId.set(value);
  setItem("projectId", value);
};

export const projectName = writable(getItem("projectName"));
export const setProjectName = (value) => {
  projectName.set(value);
  setItem("projectName", value);
};

export const columns = writable([]);
