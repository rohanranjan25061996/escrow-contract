const main = async () => {

    // contract address 0x3bF2319013980753B93994CdA26dAe195A473330
    const Escorw = await ethers.getContractFactory("Escorw");
    const wallet = await Escorw.deploy();

    await wallet.deployed()
    console.log("Escorw wallet deployed !", wallet.address);
}

main().
then(() => process.exit(0))
.catch((error) => {
    console.log("Error in Main Function", error)
    process.exit(1);
})