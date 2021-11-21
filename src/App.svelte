<script>
  import { token } from "./stores.js";
  import ProjectSizes from "./compomnents/ProjectSizes.svelte";
  import Settings from "./compomnents/Settings.svelte";

  let view = "PROJECT_SIZES"; // PROJECT_SIZES | SETTINGS

  function gotoSettings() {
    view = "SETTINGS";
  }
  function gotoProjectSizes() {
    view = "PROJECT_SIZES";
  }
</script>

<main class="p-4">
  {#if $token && view === "SETTINGS"}
    <Settings {gotoProjectSizes} />
  {:else if $token}
    <ProjectSizes {gotoSettings} />
  {:else}
    <Settings />
  {/if}
</main>
