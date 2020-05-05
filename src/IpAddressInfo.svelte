<script>
	import { IpAddress } from "./classes/IpAddress";

	let showResult = false, isClassfulAddress = false;

	let ipv4Address, subnetMaskDecimalDotNotation, subnetMaskSlashNotation;

	let networkAddress, broadcastAddress, maxNumOfHosts;

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
</script>

<div>
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
		disabled
		on:click={calc}>Calc</button>

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

<style></style>