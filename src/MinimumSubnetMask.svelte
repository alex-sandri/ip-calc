<script>
	import { IpAddress } from "./classes/IpAddress";

    let valid = false;

    let numOfHostsNeeded, subnetMask;

    const validate = () => valid = Number.isInteger(numOfHostsNeeded);

    const reset = () =>
    {
        valid = false;

        numOfHostsNeeded = subnetMask = "";
    }

	const calc = () =>
	{
		const minimumSubnetMask = IpAddress.minimumSubnetMask(numOfHostsNeeded, "dot-decimal");

		subnetMask = `${minimumSubnetMask} (${IpAddress.convertSubnetMask(minimumSubnetMask, "slash")})`;
	}
</script>

<div>
	<h1>Minimum Subnet Mask</h1>
	<label for="subnet-mask-sn">Number of hosts needed</label>
	<input
		type="number"
		id="num-of-hosts"
		min="0"
		placeholder="254"
		bind:value={numOfHostsNeeded}
        on:input={validate}>
	<button
		class="calc"
		disabled={!valid}
		on:click={calc}>Calc</button>
    <button
        on:click={reset}>Reset</button>

	{#if subnetMask}
		<div class="result">
			<p>
				<span>Subnet mask</span>
				{subnetMask}
			</p>
		</div>
	{/if}
</div>

<style>
	label
	{
		display: inline-block;
		margin-bottom: calc(var(--spacing) / 2);
	}
</style>