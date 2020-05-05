<script>
    import { IpAddress } from "./classes/IpAddress";
    
    let valid = false;

	let showResult = false, isClassfulAddress = false;

	let ipv4Address, dotDecimalSubnetMask, slashSubnetMask;

	let networkAddress, broadcastAddress, maxNumOfHosts;

	let addressClass;

	const fillSubnetMaskFields = (subnetMask) =>
	{
		if (!IpAddress.isValidSubnetMask(subnetMask)) return;

		dotDecimalSubnetMask = IpAddress.convertSubnetMask(subnetMask, "dot-decimal");
		slashSubnetMask = IpAddress.convertSubnetMask(subnetMask, "slash");
    }
    
    const validate = () => valid = IpAddress.isValidIpAddress(ipv4Address) && IpAddress.isValidSubnetMask(dotDecimalSubnetMask) && IpAddress.isValidSubnetMask(slashSubnetMask);

    const reset = () =>
    {
        valid = showResult = false;

        ipv4Address = dotDecimalSubnetMask = slashSubnetMask = "";
    }

	const calc = () =>
	{
		networkAddress = IpAddress.getNetworkAddress(ipv4Address, slashSubnetMask);
		broadcastAddress = IpAddress.getBroadcastAddress(ipv4Address, slashSubnetMask);
		maxNumOfHosts = IpAddress.getMaxNumberOfHosts(slashSubnetMask);

		isClassfulAddress = IpAddress.isClassful(ipv4Address, slashSubnetMask);

		if (isClassfulAddress) addressClass = IpAddress.getClass(ipv4Address);

		showResult = true;
	}
</script>

<div>
	<h1>IPv4 address:</h1>
	<input
		type="text"
		id="ipv4"
		minlength="7"
		maxlength="15"
		placeholder="192.168.1.1"
		bind:value={ipv4Address}
        on:input={validate}>
	<h1>Subnet Mask:</h1>
	<label for="subnet-mask-ddn">Dot-decimal notation</label>
	<input
		type="text"
		id="subnet-mask-ddn"
		minlength="9"
		maxlength="15"
		placeholder="255.255.255.0"
		bind:value={dotDecimalSubnetMask}
		on:input={fillSubnetMaskFields(dotDecimalSubnetMask)}
        on:input={validate}>
	<label for="subnet-mask-sn">Slash notation</label>
	<input
		type="text"
		id="subnet-mask-sn"
		minlength="2"
		maxlength="3"
		placeholder="/24"
		bind:value={slashSubnetMask}
		on:input={fillSubnetMaskFields(slashSubnetMask)}
        on:input={validate}>
	<button
		disabled={!valid}
		on:click={calc}>Calc</button>
    <button
        on:click={reset}>Reset</button>

	{#if showResult}
		<div class="result">
			<p>
				<span>Network address</span>
				{networkAddress}
			</p>
			<p>
				<span>Broadcast address</span>
				{broadcastAddress}
			</p>
			<p>
				<span>Maximum number of hosts</span>
				{maxNumOfHosts}
			</p>
			<p>
				<span>Classful</span>
				{isClassfulAddress}
			</p>
			{#if isClassfulAddress}
				<p>
					<span>Address class</span>
					{addressClass}
				</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	label
	{
		margin-bottom: calc(var(--spacing) / 2);
	}
</style>