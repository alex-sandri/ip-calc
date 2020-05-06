<script>
	import { IpAddress } from "./classes/IpAddress";

    let valid = false;

    let ipAddress, subnetMask, numOfSubnets;

    let subnetContainer;

    const validate = () => valid = IpAddress.isValidIpAddress(ipAddress) && IpAddress.isValidSubnetMask(subnetMask);

    const reset = () =>
    {
        valid = false;

        ipAddress = subnetMask = numOfSubnets = "";
    }

	const calc = () =>
    { }

    const createSubnetInputs = () =>
    {
        for (let i = 0; i < numOfSubnets; i++)
            subnetContainer.insertAdjacentHTML(
                "beforeend", `<div class="subnet"><input type="text" class="subnet-name" value="Subnet${i + 1}"><input type="text" class="subnet-size"></div>`);
    }
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
		bind:value={ipAddress}
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
    <label for="num-of-subnets">Number of subnets</label>
	<div>
        <input
            type="number"
            id="num-of-subnets"
            min="1"
            max="99"
            placeholder="4"
            bind:value={numOfSubnets}>
        <button
            on:click={createSubnetInputs}>Create</button>
    </div>
    <div id="subnets" bind:this={subnetContainer}></div>
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

    #subnets :global(.subnet)
    {
        display: flex;
    }

    #subnets :global(.subnet .subnet-size)
    {
        margin-left: var(--spacing);
    }
</style>