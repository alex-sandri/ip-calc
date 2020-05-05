// TODO: Support IPv6

export class IpAddress
{
    static isValidIpAddress (address)
	{
		const ipv4AddressRegex =
			/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;

        return ipv4AddressRegex.test(address);
	}

	static isValidSubnetMask (subnetMask)
	{
		const dotDecimalNotationRegex =
			/^(128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254|255)\.(0|128|192|224|240|248|252|254)$/;

		const slashNotationRegex = /^\/([1-9]|[1-2][0-9]|3[0-1])$/;

		return dotDecimalNotationRegex.test(subnetMask) || slashNotationRegex.test(subnetMask);
	}

    static convertSubnetMask (subnetMask, toFormat)
    {
        if (!IpAddress.isValidSubnetMask(subnetMask))
            throw new Error("subnet-mask/invalid");

        const fromFormat = subnetMask.startsWith("/") ? "slash" : "dot-decimal";

		if (fromFormat === toFormat) return subnetMask;

		if (toFormat === "slash")
			return `/${subnetMask.split(".").map(Number).reduce((accumulator, currentValue) => accumulator += currentValue.toString(2).replace(/0/g, "").length, 0)}`;
		else
		{
			let dotDecimalSubnetMask = "";
			let subnetMaskBits = this.getSubnetBitCount(subnetMask);

			for (let i = 0; i < 4; i++)
			{
				dotDecimalSubnetMask += `${subnetMaskBits >= 8 ? "255" : parseInt("1".repeat(subnetMaskBits).padEnd(8, "0"), 2)}.`;

				subnetMaskBits -= Math.min(subnetMaskBits, 8);
			}

			return dotDecimalSubnetMask.substr(0, dotDecimalSubnetMask.length - 1);
		}
    }

    static getSubnetBitCount (subnetMask) { return parseInt(IpAddress.convertSubnetMask(subnetMask, "slash").replace("/", "")); }

    static getMaxNumberOfHosts (subnetMask) { return Math.pow(2, 32 - IpAddress.getSubnetBitCount(subnetMask)) - 2; }

    static getNetworkAddress (address, subnetMask)
    {
        if (!IpAddress.isValidIpAddress(address)) throw new Error("ip-address/invalid");
        else if (!IpAddress.isValidSubnetMask(subnetMask)) throw new Error("subnet-mask/invalid");

        let networkAddress = "";
        let networkAddressBits = address.split(".").map(num => parseInt(num).toString(2).padStart(8, "0")).join("").substr(0, IpAddress.getSubnetBitCount(subnetMask)).padEnd(32, "0");

        for (let i = 0; i < 4; i++)
        {
            networkAddress += `${parseInt(networkAddressBits.substr(i * 8, 8), 2)}.`;
        }

        return networkAddress.substr(0, networkAddress.length - 1);
    }

    static getBroadcastAddress (address, subnetMask)
    {
        if (!IpAddress.isValidIpAddress(address)) throw new Error("ip-address/invalid");
        else if (!IpAddress.isValidSubnetMask(subnetMask)) throw new Error("subnet-mask/invalid");

        let networkAddress = "";
        let networkAddressBits = IpAddress.getAddressInBits(address).replace(/\./g, "").substr(0, IpAddress.getSubnetBitCount(subnetMask)).padEnd(32, "1");

        for (let i = 0; i < 4; i++)
        {
            networkAddress += `${parseInt(networkAddressBits.substr(i * 8, 8), 2)}.`;
        }

        return networkAddress.substr(0, networkAddress.length - 1);
    }

    static minimumSubnetMask (numOfHostsNeeded, format)
    {
        numOfHostsNeeded += 2; // Network and Broadcast addresses

        let power = 1;

        while (power < numOfHostsNeeded) power *= 2;

        return IpAddress.convertSubnetMask(`/${32 - Math.log2(power)}`, format || "dot-decimal");
    }

    static getAddressInBits (address) { return address.split(".").map(num => parseInt(num).toString(2).padStart(8, "0")).join("."); }

    static isClassful (address, subnetMask)
    {
        const addressClass = IpAddress.getClass(address);
        const slashSubnetMask = IpAddress.convertSubnetMask(subnetMask, "slash");

        // TODO: Add support for class D and E (this classes do not have a subnet mask)
        return (addressClass === "A" && slashSubnetMask === "/8") ||
            (addressClass === "B" && slashSubnetMask === "/16") ||
            (addressClass === "C" && slashSubnetMask === "/24");
    }

    static getClass (address)
    {
        let addressInBits = IpAddress.getAddressInBits(address);
        let addressClass = "";

        if (addressInBits.startsWith("0")) addressClass = "A";
        else if (addressInBits.startsWith("10")) addressClass = "B";
        else if (addressInBits.startsWith("110")) addressClass = "C";
        else if (addressInBits.startsWith("1110")) addressClass = "D";
        else if (addressInBits.startsWith("1111")) addressClass = "E";

        return addressClass;
    }
}