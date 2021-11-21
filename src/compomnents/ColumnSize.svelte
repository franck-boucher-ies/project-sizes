<script>
  import StarEmptyIcon from "./icons/StarEmptyIcon.svelte";
  import StarFullIcon from "./icons/StarFullIcon.svelte";

  export let toggleFavorite;
  export let isFavorite = false;
  export let column;
</script>

<div
  class="bg-white py-2 px-3 rounded flex items-center justify-between shadow h-10"
>
  <span class="flex items-center gap-2">
    <span class="cursor-pointer" on:click={toggleFavorite}>
      {#if isFavorite}
        <StarFullIcon />
      {:else}
        <StarEmptyIcon />
      {/if}
    </span>
    <span>{column.name}</span>
  </span>
  <span>{column.totalSize}{column.totalSize > 1 ? "pts" : "pt"}</span>
</div>
