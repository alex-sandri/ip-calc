<script>
	import { IpAddress } from "./classes/IpAddress";

    let valid = false;

    let ipAddress = "172.31.103.0", subnetMask = "/24", numOfSubnets = 5;

    let subnetContainer;

    const validate = () => valid = IpAddress.isValidIpAddress(ipAddress) &&
        IpAddress.isValidSubnetMask(subnetMask) &&
        Number.isInteger(numOfSubnets) &&
        Array.from(subnetContainer.children).every(element => element.querySelector(".subnet-name").value.length > 0 && Number.isInteger(parseInt(element.querySelector(".subnet-size").value)));

    const reset = () =>
    {
        valid = false;

        ipAddress = subnetMask = numOfSubnets = subnetContainer.innerHTML = "";
    }

	const calc = () =>
    {
        Array.from(subnetContainer.children).forEach(subnet =>
        {
            const minimumSubnetMask = IpAddress.minimumSubnetMask(parseInt(subnet.querySelector(".subnet-size").value), "slash");

            const maxNumOfHosts = IpAddress.getMaxNumberOfHosts(minimumSubnetMask);

            const networkAddress = IpAddress.getNetworkAddress(ipAddress, minimumSubnetMask);

            console.log(minimumSubnetMask, maxNumOfHosts, networkAddress, IpAddress.getFirstUsableHostAddress(ipAddress, minimumSubnetMask), IpAddress.getLastUsableHostAddress(ipAddress, minimumSubnetMask));

            ipAddress = IpAddress.getNthAddress(ipAddress, maxNumOfHosts + 2);
        });
    }

    const createSubnetInputs = () =>
    {
        subnetContainer.innerHTML = "";

        for (let i = 0; i < numOfSubnets; i++)
            subnetContainer.insertAdjacentHTML(
                "beforeend", `<div class="subnet"><input type="text" class="subnet-name" value="Subnet${i + 1}"><input type="number" class="subnet-size" placeholder="Size"></div>`);

        subnetContainer.querySelectorAll("input").forEach(input => input.addEventListener("input", validate));
    }
</script>

<div>
	<h1>Variable Length Subnet Mask (VLSM)</h1>
    <label for="vlsm-ip-address">IP Address</label>
	<input
		type="text"
		id="vlsm-ip-address"
		minlength="7"
		maxlength="15"
		placeholder="192.168.1.1"
		bind:value={ipAddress}
        on:input={validate}>
	<label for="vlsm-subnet-mask">Subnet Mask</label>
	<input
		type="text"
		id="vlsm-subnet-mask"
		minlength="2"
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