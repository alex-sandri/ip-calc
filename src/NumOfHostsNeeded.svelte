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

    const calc = () => subnetMask = IpAddress.minimumSubnetMask(numOfHostsNeeded);
</script>

<div>
	<h1>Number of hosts needed:</h1>
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

<style></style>