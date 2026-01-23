<script lang="ts">
  import type { Snippet } from "svelte";
  import InputFilter from "./InputFilter.svelte";
  import Button from "./Button.svelte";

  interface Props {
    submissions: Snippet;
  }

  const { submissions }: Props = $props();
</script>

<div id="submissions-layout" class="max-w-screen-2xl mx-auto px-3 w-full">
  <section>
    <div class="flex items-center *:data-input-filter-parser:flex-1">
      <InputFilter />
      <div class="shrink-0 flex items-center gap-x-2">
        <button>Group</button>
        <button>Filters</button>
      </div>
    </div>
  </section>
  <section id="submission-items">
    {@render submissions()}
  </section>
</div>
