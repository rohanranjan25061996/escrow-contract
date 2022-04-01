const main = async () => {

    // contract address 0xF92D221205390B4BcEf6D30E96f1BFD7D6E6D936
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