<script>
	import { IpAddress } from "./classes/IpAddress";

	let numOfHostsNeeded, subnetMask;

	const calcSubnetMask = () => subnetMask = IpAddress.minimumSubnetMask(numOfHostsNeeded);
</script>

<div>
	<h1>Number of hosts needed:</h1>
	<input
		type="number"
		id="num-of-hosts"
		min="0"
		placeholder="254"
		bind:value={numOfHostsNeeded}>
	<button
		class="calc"
		disabled
		on:click={calcSubnetMask}>Calc</button>

	{#if subnetMask}
		<div class="result">
			<p>
				<span>Subnet mask</span>
				{subnetMask}
			</p>
		</div>
	{/if}
</div>

<style></style>