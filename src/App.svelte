<script>
	import Header from "./Header.svelte";

	import { IpAddress } from "./classes/IpAddress";

	let showResult = false, isClassfulAddress = false;

	let ipv4Address, subnetMaskDecimalDotNotation, subnetMaskSlashNotation;

	let networkAddress, broadcastAddress, maxNumOfHosts;

	let numOfHostsNeeded, subnetMask;

	let addressClass;

	const fillSubnetMaskFields = (subnetMask) =>
	{
		if (!IpAddress.isValidSubnetMask(subnetMask)) return;

		subnetMaskDecimalDotNotation = IpAddress.convertSubnetMask(subnetMask, "decimal-dot");
		subnetMaskSlashNotation = IpAddress.convertSubnetMask(subnetMask, "slash");
	}

	const calc = () =>
	{
		networkAddress = IpAddress.getNetworkAddress(ipv4Address, subnetMaskSlashNotation);
		broadcastAddress = IpAddress.getBroadcastAddress(ipv4Address, subnetMaskSlashNotation);
		maxNumOfHosts = IpAddress.getMaxNumberOfHosts(subnetMaskSlashNotation);

		isClassfulAddress = IpAddress.isClassful(ipv4Address, subnetMaskSlashNotation);

		if (isClassfulAddress) addressClass = IpAddress.getClass(ipv4Address);

		showResult = true;
	}

	const calcSubnetMask = () => subnetMask = IpAddress.minimumSubnetMask(numOfHostsNeeded);
</script>

<svelte:head>
	<title>IP Calculator</title>
</svelte:head>

<Header/>

<main>
	<h1>IPv4 address:</h1>
	<input
		type="text"
		id="ipv4"
		minlength="7"
		maxlength="15"
		placeholder="192.168.1.1"
		bind:value={ipv4Address}>
	<h1>Subnet Mask:</h1>
	<input
		type="text"
		id="subnet-mask-ddn"
		minlength="9"
		maxlength="15"
		placeholder="255.255.255.0"
		bind:value={subnetMaskDecimalDotNotation}
		on:input={fillSubnetMaskFields(subnetMaskDecimalDotNotation)}>
	<input
		type="text"
		id="subnet-mask-sn"
		minlength="2"
		maxlength="3"
		placeholder="/24"
		bind:value={subnetMaskSlashNotation}
		on:input={fillSubnetMaskFields(subnetMaskSlashNotation)}>
	<button
		class="calc"
		on:click={calc}>Calc</button>

	{#if showResult}
		<div id="result">
			<p>Network address: {networkAddress}</p>
			<p>Broadcast address: {broadcastAddress}</p>
			<p>Maximum number of hosts: {maxNumOfHosts}</p>
			<p>Classful: {isClassfulAddress}</p>
			{#if isClassfulAddress}
				<p>Address class: {addressClass}</p>
			{/if}
		</div>
	{/if}

	<hr>

	<h1>Number of hosts needed:</h1>
	<input
		type="number"
		id="num-of-hosts"
		min="0"
		placeholder="254"
		bind:value={numOfHostsNeeded}>
	<button
		class="calc"
		on:click={calcSubnetMask}>Calc</button>

	{#if subnetMask}
		<p>Subnet mask: {subnetMask}</p>
	{/if}
</main>

<style>
	main
	{
		padding: var(--spacing);
	}

	h1
	{
		margin: 0;
		margin-bottom: var(--spacing);
	}

	button, input
	{
		padding: 10px;
		border: var(--border-width) solid var(--secondary-color);
		border-radius: var(--border-radius);
		width: 100%;
		transition: var(--transition-duration);
		margin: 0;
		margin-bottom: var(--spacing);
	}

	button:focus,
	input:focus
	{
		box-shadow: 0 0 0 calc(var(--border-width) * 2) var(--secondary-color);
	}

	button:hover,
	button:focus
	{
		background-color: var(--primary-color);
		color: var(--secondary-color);
	}

	input
	{
		background-color: var(--primary-color);
		color: var(--secondary-color);
	}

	input::placeholder
	{
		color: var(--secondary-color);
		opacity: 0.7;
	}
	
	.calc
	{
		display: block;
		cursor: pointer;
	}

	:global(:root)
	{
		--primary-color: #3f3f3f;
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
			--secondary-color: #3f3f3f;
		}
	}
</style>