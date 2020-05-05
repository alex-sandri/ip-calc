<script>
	import Header from "./Header.svelte";
	import IpAddressInfo from "./IpAddressInfo.svelte";
	import NumOfHostsNeeded from "./NumOfHostsNeeded.svelte";
</script>

<svelte:head>
	<title>IP Calculator</title>
</svelte:head>

<svelte:body on:load={document.body.classList.add("loaded")}/>

<Header/>

<main>
	<IpAddressInfo/>
	<hr>
	<NumOfHostsNeeded/>
</main>

<style>
	main
	{
		padding: var(--spacing);
	}

	:global(h1)
	{
		margin: 0;
		margin-bottom: var(--spacing);
	}

	:global(button, input)
	{
		padding: 10px;
		border: var(--border-width) solid var(--secondary-color);
		border-radius: var(--border-radius);
		width: 100%;
		transition: var(--transition-duration);
		margin: 0;
		margin-bottom: var(--spacing);
	}

	:global(button)
	{
		display: block;
		cursor: pointer;
	}

	:global(button:focus, input:focus)
	{
		box-shadow: 0 0 0 calc(var(--border-width) * 2) var(--secondary-color);
	}

	:global(button:not(:disabled):hover, button:not(:disabled):focus)
	{
		background-color: var(--primary-color);
		color: var(--secondary-color);
	}

	:global(button:disabled)
	{
		cursor: not-allowed;
		opacity: 0.7;
	}

	:global(input)
	{
		background-color: var(--primary-color);
		color: var(--secondary-color);
	}

	:global(input::placeholder)
	{
		color: var(--secondary-color);
		opacity: 0.7;
	}

	:global(.result p)
	{
		font-weight: 100;
	}

	:global(.result p span)
	{
		font-weight: bold;
		display: block;
	}

	:global(:root)
	{
		--primary-color: #181818;
		--secondary-color: #fff;
		--spacing: 15px;
		--border-radius: 5px;
		--border-width: 2px;
		--transition-duration: 300ms;
	}

	:global(body)
	{
		padding: 0;
		background-color: var(--primary-color);
		color: var(--secondary-color);
	}

	:global(body:not(.loaded) *)
	{
		transition: none !important;
	}

	:global(*)
	{
		box-sizing: border-box;
	}

	:global(*:focus)
	{
		outline: none;
	}

	:global(::-webkit-scrollbar)
	{
		width: auto;
		height: auto;
	}
	
	:global(::-webkit-scrollbar-track, ::-webkit-scrollbar-corner)
	{
		background-color: var(--primary-color);
	}
	
	:global(::-webkit-scrollbar-thumb)
	{
		background-color: var(--secondary-color);
	}

	:global(::-moz-focus-inner)
	{
		border: 0;
	}

	@media (prefers-color-scheme: light)
	{
		:global(:root)
		{
			--primary-color: #fff;
			--secondary-color: #181818;
		}
	}
</style>