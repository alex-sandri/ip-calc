<script>
	import { IpAddress } from "./classes/IpAddress";

    let valid = false;

    let majorNetworkAddress, subnetMask;

    const validate = () => valid = IpAddress.isValidIpAddress(majorNetworkAddress) && IpAddress.isValidSubnetMask(subnetMask);

    const reset = () =>
    {
        valid = false;

        majorNetworkAddress = subnetMask = "";
    }

	const calc = () =>
	{ }
</script>

<div>
	<h1>Variable Length Subnet Mask (VLSM)</h1>
    <label for="ip-address">IP Address</label>
	<input
		type="text"
		id="ipv4"
		minlength="7"
		maxlength="15"
		placeholder="192.168.1.1"
		bind:value={majorNetworkAddress}
        on:input={validate}>
	<label for="subnet-mask">Subnet Mask</label>
	<input
		type="text"
		id="subnet-mask"
		minlength="9"
		maxlength="15"
		placeholder="255.255.255.0 or /24"
		bind:value={subnetMask}
        on:input={validate}>
	<button
		class="calc"
		disabled={!valid}
		on:click={calc}>Calc</button>
    <button
        on:click={reset}>Reset</button>
</div>

<style>
    label
    {
        display: inline-block;
        margin-bottom: calc(var(--spacing) / 2);
    }
</style>