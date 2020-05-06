<script>
	import { IpAddress } from "./classes/IpAddress";

    let valid = false;
    let showTable = false;
    let showError = false;

    let ipAddress, subnetMask, numOfSubnets;

    let subnetContainer, table;

    const validate = () => valid = IpAddress.isValidIpAddress(ipAddress) &&
        IpAddress.isValidSubnetMask(subnetMask) &&
        Number.isInteger(numOfSubnets) &&
        Array.from(subnetContainer.children).every(element => element.querySelector(".subnet-name").value.length > 0 && Number.isInteger(parseInt(element.querySelector(".subnet-size").value)));

    const reset = () =>
    {
        valid = showTable = showError = false;

        ipAddress = subnetMask = numOfSubnets = subnetContainer.innerHTML = "";

        table.querySelectorAll("tr:not(.head)").forEach(element => element.remove());
    }

	const calc = () =>
    {
        let address = ipAddress;

        table.querySelectorAll("tr:not(.head)").forEach(element => element.remove());

        const collator = new Intl.Collator(undefined, { numeric: true });

        try
        {
            Array
                .from(subnetContainer.children)
                .sort((a, b) => collator.compare(a.querySelector(".subnet-size").value, b.querySelector(".subnet-size").value))
                .reverse()
                .forEach(subnet =>
                {
                    const subnetSize = parseInt(subnet.querySelector(".subnet-size").value);

                    const minimumSubnetMask = IpAddress.minimumSubnetMask(subnetSize, "dot-decimal");

                    const maxNumOfHosts = IpAddress.getMaxNumberOfHosts(minimumSubnetMask);

                    const networkAddress = IpAddress.getNetworkAddress(address, minimumSubnetMask);

                    const data = [
                        subnet.querySelector(".subnet-name").value,
                        subnetSize,
                        maxNumOfHosts,
                        `${minimumSubnetMask} (${IpAddress.convertSubnetMask(minimumSubnetMask, "slash")})`,
                        networkAddress,
                        `${IpAddress.getFirstUsableHostAddress(address, minimumSubnetMask)} - ${IpAddress.getLastUsableHostAddress(address, minimumSubnetMask)}`,
                        IpAddress.getBroadcastAddress(address, minimumSubnetMask)
                    ];

                    address = IpAddress.getNthAddress(networkAddress, maxNumOfHosts + 2);

                    const tr = document.createElement("tr");

                    data.forEach(item =>
                    {
                        const td = document.createElement("td");

                        td.innerText = item;

                        tr.appendChild(td);
                    });

                    table.appendChild(tr);
                });

            showError = false;
            showTable = true;
        }
        catch (err)
        {
            showTable = false;
            showError = true;
        }
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
            disabled={!numOfSubnets}
            on:click={createSubnetInputs}>Create</button>
    </div>
    <div id="subnets" bind:this={subnetContainer}></div>
	<button
		disabled={!valid}
		on:click={calc}>Calc</button>
    <button
        on:click={reset}>Reset</button>
    <div class="table-container">
        <table bind:this={table} class="{showTable ? "show" : ""}">
            <tr class="head">
                <th>Subnet Name</th>
                <th>Needed Size</th>
                <th>Allocated Size</th>
                <th>Subnet Mask</th>
                <th>Network Address</th>
                <th>Assignable Range</th>
                <th>Broadcast Address</th>
            </tr>
        </table>
    </div>
    {#if showError}
        <p class="error">Subnetting error!!!</p>
    {/if}
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

    .table-container
    {
        overflow: auto;
    }

    table
    {
        width: 100%;
        border: var(--border-width) solid var(--secondary-color);
    }

    table:not(.show)
    {
        display: none;
    }

    table :global(td, th)
    {
        border: var(--border-width) solid var(--secondary-color);
        text-align: center;
        white-space: nowrap;
        padding: 5px;
    }

    .error
    {
        margin: 0;
        font-size: x-large;
        color: red;
        font-weight: 900;
        text-align: center;
    }
</style>