<script lang="ts">
  export let name: string = ""
  export let avatar: string = ""
</script>

<div class="flex gap-y-4 gap-x-6 mt-9">
  <img
    src={avatar}
    alt={`Channel avatar for ${name}`}
    class="size-32 rounded-full"
  />
  <div class="flex flex-col gap-y-2">
    <div>
      <div class="text-sm opacity-75 uppercase mb-1">Segments for channel</div>
      <h1 class="text-2xl mb-1">{name}</h1>
      <div class="flex gap-x-2 items-center mt-2"></div>
    </div>
    <div>stats</div>
    <div>actions</div>
  </div>
</div>
