import {ethers} from "ethers"
import {ESABI} from "../ABI/EscrowABI"
import {encrypt, decrypt} from "aes256"

export const getProvider = () => {
    const provider = new ethers.providers.JsonRpcBatchProvider(process.env.REACT_APP_RINKEBY_NEWTORK_URL);
    return provider
}

export const getSigner = () => {
    const provider = getProvider();
    const signer = provider.getSigner(process.env.REACT_APP_MY_ADDRESS);
    return signer
}

export const getProviderWallet = () => {
    const provider = getProvider();
    const wallet = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ESABI, provider );
    return wallet
}

export const getSignerWallet = async () => {
    const signer = getSigner();
    const wallet = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, ESABI, signer );
    return wallet
}

export const getMoralisOption = (functionName, params) => {
    if(functionName && params){
        let option = {
            contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS,
            abi: ESABI,
            functionName: `${functionName}`,
            params: {...params}
        }
        return option
    }else{
        return null
    }
}

export const encryptData = (data) => {
    return encrypt(process.env.REACT_APP_SALT, data.toString())
}

export const decryptData = (data) => {
    return decrypt(process.env.REACT_APP_SALT, data)
}

export const refineData = (data) => {
    if(data){
        let arr = []
        let obj = {}
        data?.forEach((item) => {
            obj = {
                buyer: item.buyer,
                id: item.id.toNumber(),
                seller: item.seller,
                isBuyer: item.isBuyer,
                isSeller: item.isSeller,
                flag: item.flag.toNumber(),
                price: item.price.toNumber(),
                details: item.details
            }
            arr.push(obj)
            obj = {}
        })

        return arr
    }
}

export const checkOwner = (data, user) => {
    let flag = false
    data?.forEach((item) => {
        if(item === user){
            flag = true
        }
    })
    return flag
}

export const getUserBalance = async (userAddress) => {
    let provider = getProvider();
    let bal;
    await provider.getBalance(userAddress).then((balance) => {
        bal = ethers.utils.formatEther(balance)
    })
    return bal
}