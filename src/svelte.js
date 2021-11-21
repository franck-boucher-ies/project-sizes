import App from "./App.svelte";
import "./scss/app.scss";

const app = new App({
  target: document.body,
  props: {
    title: "ProjectSizes",
  },
});

export default app;
