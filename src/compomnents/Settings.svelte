<script>
  import { Octokit } from "octokit";

  import { userQuery } from "../utils";
  import {
    token,
    login,
    orgId,
    projectId,
    setToken,
    setLogin,
    setOrgId,
    setProjectId,
  } from "../stores.js";
  import Separator from "./Separator.svelte";
  import XIcon from "./icons/XIcon.svelte";

  export let gotoProjectSizes;

  let isLoading = false;
  let tokenInput = $token || "";
  let orgIdInput = $orgId || "";
  let projectIdInput = $projectId || "";
  let errorMessage = "";

  async function fetchUser() {
    isLoading = true;

    const octokit = new Octokit({ auth: tokenInput });
    try {
      const result = await octokit.graphql(userQuery);
      const loginResult = result.viewer.login;
      if (loginResult) {
        setToken(tokenInput);
        setLogin(loginResult);
        setOrgId(orgIdInput);
        setProjectId(Number(projectIdInput));
        errorMessage = "";
      }
    } catch (error) {
      errorMessage = error;
    }

    isLoading = false;
  }
</script>

<div class="bg-white rounded shadow py-2 px-4">
  <h2 class="mb-2 text-lg flex items-center justify-between">
    <span>Authentification</span>
    {#if gotoProjectSizes}
      <span on:click={gotoProjectSizes} class="cursor-pointer">
        <XIcon />
      </span>
    {/if}
  </h2>

  {#if errorMessage}
    <p
      class="w-full rounded border border-red-600 my-1 py-2 px-3 bg-red-100 text-red-600"
    >
      {errorMessage}
    </p>
  {:else if $token && $login}
    <p
      class="w-full rounded border border-green-600 my-1 py-2 px-3 bg-green-100 text-green-600"
    >
      Vous êtes connecté en temps que `{$login}`
    </p>
  {:else}
    <p
      class="w-full rounded border border-red-600 my-1 py-2 px-3 bg-red-100 text-red-600"
    >
      Vous n'êtes pas connecté
    </p>
  {/if}
  <Separator />

  <div class="flex flex-col gap-1">
    <input
      bind:value={tokenInput}
      type="text"
      name="token"
      class="flex-1 block outline-none w-full rounded border border-gray-300 my-1 py-2 px-3 bg-gray-100"
      placeholder="Token..."
    />
    <input
      bind:value={orgIdInput}
      type="text"
      name="orgId"
      class="flex-1 block outline-none w-full rounded border border-gray-300 my-1 py-2 px-3 bg-gray-100"
      placeholder="Id d'organisation..."
    />
    <input
      bind:value={projectIdInput}
      type="text"
      name="projectIdInput"
      class="flex-1 block outline-none w-full rounded border border-gray-300 my-1 py-2 px-3 bg-gray-100"
      placeholder="Id du projet..."
    />
    <button
      on:click={fetchUser}
      disabled={isLoading}
      class="w-full rounded my-1 py-2 px-3 bg-blue-600 text-white border border-blue-700 shadow"
      >Se connecter</button
    >
  </div>
</div>
