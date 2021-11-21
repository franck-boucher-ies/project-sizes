<script>
  import { projectName } from "../stores.js";
  import RefreshIcon from "./icons/RefreshIcon.svelte";
  import SettingsIcon from "./icons/SettingsIcon.svelte";

  export let gotoSettings;
  export let onClickRefresh;
</script>

<div
  class="bg-white mb-4 py-2 px-4 rounded flex items-center justify-between shadow-md border border-gray-300 h-16"
>
  <h1 class="text-xl">{$projectName}</h1>
  <span class="flex items-center gap-2">
    <span
      on:click={onClickRefresh}
      class="border border-gray-400 rounded p-1 hover:shadow cursor-pointer"
    >
      <RefreshIcon />
    </span>

    <span
      on:click={gotoSettings}
      class="border border-gray-400 rounded p-1 hover:shadow cursor-pointer"
    >
      <SettingsIcon />
    </span>
  </span>
</div>
