<script lang="ts">
  interface MultiProgressBarProps {
    color: string
    label: string
  }

  export let data: MultiProgressBarProps[] | never[] = []

  const dataLen = data.length

  const calcRelative = () => {}
</script>

<div>
  <div id="bar"></div>
  <div id="details"></div>
</div>
