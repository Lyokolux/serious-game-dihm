<script lang="ts">
    import Send from './Icons/Send.svelte';

    const DEFAULT_LABEL = 'Répondre';

    export let className = '';
    export let label = DEFAULT_LABEL;

    $: autoReply = label === DEFAULT_LABEL;
</script>

<button type="button" class="btn btn-light p-1 reply {className}" on:click>
    {#if !autoReply}
        {label}
    {:else}
        <Send /> {label}
    {/if}
</button>
