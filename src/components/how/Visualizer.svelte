<script>
export let gist;
export let of;

$: title = `XState visualizer of ${of}`;
</script>

<div class="relative h-128 overflow-hidden">
    <iframe
        src="https://xstate.js.org/viz/?gist={gist}"
        {title}
        class="w-full h-128 absolute -top-8"
    />
</div>