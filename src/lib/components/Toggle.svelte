<script lang="ts">
  export let toggleState = false
  export let eventToggler = () => {
    toggleState = !toggleState
  }

  const keyToggler = (e: KeyboardEvent) => {
    if (e.key === "Enter") eventToggler()
  }
</script>

<div
  on:click={eventToggler}
  on:keydown={keyToggler}
  role="checkbox"
  aria-checked={toggleState}
  tabindex="0"
  class="*:aria-checked:translate-x-full w-[2.9rem] *:aria-checked:bg-green-600 cursor-pointer rounded-2xl border bg-slate-200 p-0.5 aria-checked:bg-green-200 transition-colors border-gray-400 aria-checked:border-green-600"
>
  <div
    aria-hidden="true"
    class="size-5 rounded-full bg-slate-500 transition-[transform,background-color]"
  />
</div>
