import React from "react";
import AddNew from "./AddNew";
import css from "./styles/index.module.css";
import {encryptData} from "../utils/helper"


const ShowData = (props) => {

    const {data, newTx, handelChange, handelSubmit, handelCancel, form, onClickNewTx, 
        deposit, coniform, initiateS, initiateB, cancelTx} = props
    return(
        <>
         <div className={css.all_tx_main}>
            <div className={css.all_tx_container}>
                {!newTx && <div className={css.add_owner} onClick={onClickNewTx}>Add New</div>}
                {newTx && <AddNew form = {form} handelCancel = {handelCancel} handelChange = {handelChange}
                handelSubmit = {handelSubmit} />}
                <div className={css.all_tx_conatiner_2}>
                <h1>All Data: {data && data.length}</h1>
                </div>
                {data && data.length !== 0 && <div className={css.all_tx_conatiner_2}>
                    <table>
                        <tr>
                            <th>Seller Address</th>
                            <th>Buyer Address</th>
                            <th>Initiate By Seller</th>
                            <th>Initiate By Buyer</th>
                            <th>Details</th>
                            <th>Amount(wei)</th>
                            <th>Action</th>
                        </tr>
                        {data && data.map((item) => <tr key={encryptData(item.id)}>
                            <td>{item.seller}</td>
                            <td>{item.buyer}</td>
                            <td>{!item.isSeller ? <div className={css.add_owner} onClick={() => initiateS(item.id)}>initiate</div> 
                            : <div className={css.add_owner}>done</div>}</td>
                            <td>{!item.isBuyer ? <div className={css.add_owner} onClick={() => initiateB(item.id)}>initiate</div> 
                            : <div className={css.add_owner}>done</div>}</td>
                            <td>{item.details}</td>
                            <td>{item.price}</td>
                            {item.isBuyer && item.isSeller && item.flag == 1 && <td> 
                                <div className={css.add_owner} onClick={() => deposit(item.id)}>deposit</div>
                                <div className={css.add_owner} onClick={() => cancelTx(item.id)}>cancel</div></td>}
                            {item.isBuyer && item.isSeller && item.flag == 2 && <td> 
                                <div className={css.add_owner} onClick={() => coniform(item.id)}>coniform</div>  
                                <div className={css.add_owner} onClick={() => cancelTx(item.id)}>cancel</div> </td>}
                            {item.isBuyer && item.isSeller && item.flag == 3 && <td> 
                                <div className={css.add_owner}>done</div> </td>}
                        </tr>)}
                    </table>
                </div>}
            </div>
        </div>
        </>
    )
}

export default ShowData