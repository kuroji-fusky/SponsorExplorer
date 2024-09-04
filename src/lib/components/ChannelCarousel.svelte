<script lang="ts">
  import { onMount } from "svelte"
  import { kebabCase } from "lodash-es"
  import ChevronLeft from "lucide-svelte/icons/chevron-left"
  import ChevronRight from "lucide-svelte/icons/chevron-right"

  export let heading: string

  const headingAria = `${kebabCase(heading)}-${crypto.randomUUID()}`

  let scrollerRef: HTMLDivElement
  let scrollLock = {
    left: true,
    right: false
  }

  const scrollIncrement = 140

  const scrollLeft = () => {
    scrollerRef.scrollTo({
      left: scrollerRef.scrollLeft - scrollIncrement,
      behavior: "smooth"
    })
  }

  const scrollRight = () => {
    scrollerRef.scrollTo({
      left: scrollerRef.scrollLeft + scrollIncrement,
      behavior: "smooth"
    })
  }

  const handleScroll = () => {
    const scrollPos = scrollerRef.scrollLeft
    const maxScrollPos = scrollerRef.scrollWidth - scrollerRef.offsetWidth

    const roundRelativePos = (scrollPos / maxScrollPos) * 100

    scrollLock.left = roundRelativePos <= 0.1
    scrollLock.right = roundRelativePos >= 100
  }

  onMount(() => {
    scrollerRef.addEventListener("scroll", handleScroll)
  })
</script>

<section aria-labelledby={headingAria}>
  <h2 class="text-xl lg:text-2xl mb-3.5" id={headingAria}>{heading}</h2>
  <div
    class="relative [&_button]:absolute [&_button]:top-[calc(50%/1.15)] [&_button]:p-2.5 [&_button]:transition-opacity [&_button[disabled]]:opacity-30 [&_button[disabled]]:cursor-not-allowed"
  >
    <button
      class="left-0"
      disabled={scrollLock.left ?? undefined}
      on:click={scrollLeft}
    >
      <ChevronLeft />
    </button>
    <div
      bind:this={scrollerRef}
      class="hide-scrollbar mx-11 flex gap-x-1 overflow-x-scroll overflow-y-hidden rounded-md snap-proximity snap-x *:snap-center"
    >
      <slot />
    </div>
    <button
      class="right-0"
      disabled={scrollLock.right ?? undefined}
      on:click={scrollRight}
    >
      <ChevronRight />
    </button>
  </div>
</section>
