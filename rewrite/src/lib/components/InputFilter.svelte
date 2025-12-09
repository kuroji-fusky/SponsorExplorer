<script lang="ts">
  import {
    FILTER_TAGS,
    type FilterParams,
    type TagLiteral,
  } from "../constants/filterMap";
  import { onMount } from "svelte";
  import { ChevronDownIcon, XIcon } from "@lucide/svelte";

  interface Props {
    filters?: FilterParams[];
  }

  const props: Props = $props();

  let filterStore = $state<FilterParams[]>([]);
  // biome-ignore lint/style/useConst: temporary
  let errorMsg = $state("");

  let rawInputEl: HTMLInputElement;
  let bindRawInput = $state("");

  const computedRawInputs = $derived([
    ...filterStore.map((s) => s.__rawInput!),
    bindRawInput,
  ]);

  onMount(() => {
    if (props.filters) {
      props.filters.forEach((item) => filterStore.push(item));
    }

    // some data binding
    rawInputEl.addEventListener("input", (e) => {
      bindRawInput = (e.target as HTMLInputElement).value;
    });
  });

  // TODO: might need to refactor this

  function _softClearQuery() {
    rawInputEl.value = "";
    bindRawInput = "";
  }

  function clearQuery() {
    _softClearQuery();
    filterStore = [];
  }

  function handleKeyEvents(e: KeyboardEvent) {
    const rawTextInput = (e.target as HTMLInputElement).value;
    const keyEnter = e.key === "Enter";

    if (keyEnter && rawTextInput === "") {
      console.error("Syntax error: Cannot pass empty string");
      return;
    }

    const fire = keyEnter || e.key === ",";

    const separators = rawTextInput.split(":");
    const [tag, query] = separators.map((dw) => dw.trim());

    console.log({ tag, query });

    if (fire && separators.length >= 3) {
      console.error("Parse error: Only one colon (:) is allowed.");
      return;
    }

    const isAcceptedTag = FILTER_TAGS.some((x) => x === tag.replace(/^-/, ""));

    // might need to add a check for non-negate tags
    const hasNegateTag = tag.startsWith("-");
    console.debug(`hasNegateTag for ${tag} =>`, hasNegateTag);

    if (fire && tag.includes(" ")) {
      console.error(
        `Tags should not contain whitespaces. Expected values: ${FILTER_TAGS.join(", ")}`,
      );
      return;
    }

    if (fire && !isAcceptedTag) {
      console.error(
        `'${tag}' is not a valid tag. Expected values: ${FILTER_TAGS.join(", ")}`,
      );
      return;
    }

    // If all tag checks returns valid
    if (fire) {
      if (query === "") {
        console.error(`'${query}' can't be empty, use '*' for catch-all`);
        return;
      }
      filterStore.push({
        __rawInput: rawTextInput,
        tag: tag.replace(/^-/, "") as TagLiteral,
        query,
        operators: [hasNegateTag ? "-" : undefined],
      });
      // kuro: I think this timeout is weird but a hacky way to make sure the input is empty
      setTimeout(() => {
        _softClearQuery();
      }, 2);
    }
  }
</script>

<label
  data-input-filter-parser=""
  for="filter-input"
  class="flex items-center border *:not-[.flex-1]:shrink-0"
>
  <input
    data-input-filter=""
    id="__raw-filter-input"
    class="hidden"
    type="text"
    value={computedRawInputs}
  />
  <div class="flex flex-wrap items-center gap-x-1 flex-1">
    {#each filterStore as { tag, query }, idx}
      <div data-tag-index={idx} class="inline-flex rounded-md overflow-hidden">
        <span class="px-1.5 py-1 bg-amber-500/50">
          {tag}
        </span>
        <span class="px-2 py-1 bg-amber-700">
          {query}
        </span>
      </div>
    {/each}
    <input
      bind:this={rawInputEl}
      id="filter-input"
      class="flex-1 rounded-md bg-transparent text-sm"
      type="text"
      spellcheck="false"
      autocapitalize="off"
      autocorrect="off"
      onkeypress={handleKeyEvents}
      placeholder="Filters"
    />
  </div>

  <button class="p-2" onclick={clearQuery}>
    <XIcon size={18} />
  </button>

  <button class="p-2">
    <ChevronDownIcon size={18} />
  </button>
</label>
