import React, {useState} from "react"
import { AuthContext } from "../contextApi/Auth"
import css from "./styles/index.module.css"
import {useMoralis} from "react-moralis"
import {checkOwner, getMoralisOption, getProviderWallet, getUserBalance, refineData} from "../utils/helper"
import ShowData from "./ShowData"

const init = {
    _seller: '',
    _buyer: '',
    _price: '',
    _details: ''
}

const Wallet = () => {
    const {Moralis, logout} = useMoralis();
    const {setUserAddress, handelAuth, userAddress} = React.useContext(AuthContext)
    const [data, setData] = React.useState([])
    const [loading, setLoading] = useState(false)
    const [addFlag, setAddFlag] = React.useState(false)
    const [form, setForm] = React.useState(init)

    React.useEffect(() => {
        getAllData()
    }, [])


    const setFlag = () => {
        setForm(init)
        setAddFlag(prev => !prev)
    }

    const handelChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const createNew = async () => {
        try{
            setLoading(true)
            if(form._buyer !== '' && form._seller !== '' && form._price !== '' && +form._price > 0 && form._details !== ''){
                const options = getMoralisOption('start', form)
                const tx = await Moralis.executeFunction(options)
                await tx.wait();
                setFlag()
                await getAllData()
                setLoading(false)
            }else{
                setLoading(false)
                alert("Invalid input")
            }
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ createNew parse ok ========", parseOk)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }

    const getAllData = async () => {
        setLoading(true)
        try{
            const providerWallet = getProviderWallet();
            // console.log("provider", providerWallet)
            const dd = await providerWallet.getData();
            let refineD = refineData(dd)
            // console.log("=====refine dd", refineD, data)
            setData(refineD)
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ getAllData parse ok ========", parseOk)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }

    const initateSeller= async (id) => {
        if(data[id].seller.toLowerCase() !== userAddress.toLowerCase()){
            alert('You are not seller');
            return
        }
        try{
            setLoading(true)
            let payLoad = {
                _id:id
            }
            const option = getMoralisOption('initiateContract', payLoad)
            const tx = await Moralis.executeFunction(option);
            await tx.wait();
            await getAllData();
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ initateTx parse ok ========", parseOk)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }

    const initateBuyer= async (id) => {
        // console.log("user address => ", userAddress, data[id].buyer.toLowerCase())
        // console.log(userAddress.toLowerCase() == data[id].buyer.toLowerCase() )
        if(data[id].buyer.toLowerCase() !== userAddress.toLowerCase()){
            alert('You are not buyer');
            return
        }
        try{
            setLoading(true)
            let payLoad = {
                _id:id
            }
            const option = getMoralisOption('initiateContract', payLoad)
            const tx = await Moralis.executeFunction(option);
            await tx.wait();
            await getAllData();
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ initateTx parse ok ========", parseOk)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }

    const depositAm = async (id) => {
        try{
            setLoading(true)
            let payLoad = {
                _id: id
            }
            const option = getMoralisOption('deposit', payLoad)
            const tx = await Moralis.executeFunction({...option, msgValue: data[id].price});
            await tx.wait();
            await getAllData()
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ depositAm parse ok ========", parseOk)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }

    const coniformAm = async (id) => {
        try{
            setLoading(true)
            let payLoad = {
                _id: id
            }
            const option = getMoralisOption('coniformPayment', payLoad)
            const tx = await Moralis.executeFunction(option);
            await tx.wait();
            await getAllData()
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ coniformAm parse ok ========", parseOk)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }

    const cancelTxx = async (id) => {
        try{
            setLoading(false);
            let payLoad = {
                _id: id
            }
            const option = getMoralisOption('cancelTx', payLoad)
            const tx = await Moralis.executeFunction(option);
            await tx.wait();
            await getAllData()
            setLoading(false)
        }catch(error){
            setLoading(false)
            let ok = JSON.stringify(error)
            let parseOk = JSON.parse(ok)
            console.log("============ cancelTx parse ok ========", parseOk)
            const {error: txError} = parseOk
            const {message} = txError
            alert(`Error: ${message}`)
        }
    }
    const logOutUser = () => {
        logout();
        setUserAddress("")
        handelAuth()
    }

    return(
        <>
         <div className={css.sign_out} onClick={logOutUser}> Sign Out</div>
        <div className={css.main}>
            {loading && <div className={css.loading}> Processing with request, please wait.......! </div>}
            <ShowData data = {data} newTx = {addFlag} handelChange = {handelChange} handelSubmit = {createNew}
            handelCancel = {setFlag} form = {form} onClickNewTx = {setFlag} initiateS = {initateSeller}
            initiateB = {initateBuyer} deposit = {depositAm} coniform = {coniformAm} cancelTx = {cancelTxx} />
        </div>
        </>
    )
}

export default Wallet