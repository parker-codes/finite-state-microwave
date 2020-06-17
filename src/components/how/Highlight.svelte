<script>
export let code;
export let language = 'svelte';
</script>

<div class="my-8">
    <pre class="language-{language} rounded">
        <code>
            {code}
        </code>
    </pre>
</div>