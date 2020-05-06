<script>
    import { IpAddress } from "./classes/IpAddress";
    
    let valid = false;

	let showResult = false, isClassfulAddress = false;

	let ipAddress, subnetMask;

	let networkAddress, broadcastAddress, maxNumOfHosts;

	let addressClass;
    
    const validate = () => valid = IpAddress.isValidIpAddress(ipAddress) && IpAddress.isValidSubnetMask(subnetMask);

    const reset = () =>
    {
        valid = showResult = false;

        ipAddress = subnetMask = "";
    }

	const calc = () =>
	{
		networkAddress = IpAddress.getNetworkAddress(ipAddress, subnetMask);
		broadcastAddress = IpAddress.getBroadcastAddress(ipAddress, subnetMask);
		maxNumOfHosts = IpAddress.getMaxNumberOfHosts(subnetMask);

		isClassfulAddress = IpAddress.isClassful(ipAddress, subnetMask);

		if (isClassfulAddress) addressClass = IpAddress.getClass(ipAddress);

		showResult = true;
	}
</script>

<div>
	<h1>IP Address Info</h1>
	<label for="ipv4">IP address</label>
	<input
		type="text"
		id="ipv4"
		minlength="7"
		maxlength="15"
		placeholder="192.168.1.1"
		bind:value={ipAddress}
        on:input={validate}>
	<h1>Subnet Mask:</h1>
	<label for="subnet-mask">Subnet mask</label>
	<input
		type="text"
		id="subnet-mask"
		minlength="2"
		maxlength="15"
		placeholder="255.255.255.0 or /24"
		bind:value={subnetMask}
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
		display: inline-block;
		margin-bottom: calc(var(--spacing) / 2);
	}
</style>