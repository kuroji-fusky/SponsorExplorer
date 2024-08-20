<script lang="ts">
  export let avatar: string
  export let name: string
  export let handle: string
  export let activeItem: boolean = false
  export let fetchData: boolean = false
</script>

<a
  href="/#"
  class="flex-shrink-0 flex flex-col items-center bg-neutral-900 rounded-md px-3.5 py-4 w-52"
>
  <img
    src={avatar}
    class="aspect-square size-32 rounded-full"
    alt="Avatar for the YouTube channel, {name}"
    draggable="false"
  />
  <div class="text-xl font-extrabold mt-1.5 mb-2.5">{name}</div>
  <span class="text-sm">{`@${handle}`}</span>
  <div class="text-sm">
    <span data-testid="num-segments">0</span>
    <span>{" segments"}</span>
  </div>
</a>
