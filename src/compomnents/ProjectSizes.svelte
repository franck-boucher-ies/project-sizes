<script>
  import { onMount } from "svelte";
  import { Octokit } from "octokit";

  import { labelsQuery, resultToColumnSizes } from "../utils";
  import {
    token,
    columns,
    projectName,
    orgId,
    projectId,
    setProjectName,
  } from "../stores.js";
  import Separator from "./Separator.svelte";
  import ColumnSize from "./ColumnSize.svelte";
  import Header from "./Header.svelte";

  export let gotoSettings;

  let isLoading = false;
  let favotiteColumnNames = [];

  $: favotiteColumns = $columns.filter((column) =>
    favotiteColumnNames.includes(column.name)
  );
  $: restColumns = $columns.filter(
    (column) => !favotiteColumnNames.includes(column.name)
  );

  onMount(async () => {
    if ($columns.length === 0) fetchSizes();
  });

  function toggleFavorite(columnName) {
    if (favotiteColumnNames.includes(columnName)) {
      favotiteColumnNames = favotiteColumnNames.filter(
        (column) => column !== columnName
      );
    } else {
      favotiteColumnNames = [...favotiteColumnNames, columnName];
    }
  }

  async function fetchSizes() {
    isLoading = true;

    const octokit = new Octokit({ auth: $token });
    const result = await octokit.graphql(labelsQuery($orgId, $projectId));
    setProjectName(result.organization.project.name);
    columns.set(resultToColumnSizes(result));

    isLoading = false;
  }
</script>

<div>
  <Header onClickRefresh={fetchSizes} {gotoSettings} />

  <Separator />

  {#if $columns.length > 0 && !isLoading}
    <div class="flex flex-col gap-2">
      {#each favotiteColumns as column}
        <ColumnSize
          toggleFavorite={() => toggleFavorite(column.name)}
          isFavorite
          {column}
        />
      {/each}

      {#if favotiteColumns.length > 0 && !isLoading}
        <Separator />
      {/if}

      {#each restColumns as column}
        <ColumnSize
          toggleFavorite={() => toggleFavorite(column.name)}
          {column}
        />
      {/each}
    </div>
  {:else if isLoading}
    <p class="text-center italic">Chargement...</p>
  {:else}
    <p class="text-center italic">Aucune donnée</p>
  {/if}
</div>
