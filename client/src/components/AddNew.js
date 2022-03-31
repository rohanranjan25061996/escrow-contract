import React from "react";
import css from "./styles/index.module.css";

const AddNew = (props) => {

    const {form, handelCancel, handelChange, handelSubmit} = props
    return(
        <>
         <div className={css.new_owner_form_tx}>
            <input placeholder="enter seller address" value={form._to} name={"_seller"} onChange = {handelChange} />
            <input placeholder="enter buyer address" value={form._to} name={"_buyer"} onChange = {handelChange} />
            <input placeholder="enter amount to pay in wei" value={form._value} name={"_price"} onChange = {handelChange} />
            <input placeholder="enter selling details" value={form._value} name={"_details"} onChange = {handelChange} />
            <div className={css.submit} onClick={handelSubmit}>submit</div>
            <div className={css.cancel} onClick={handelCancel}>cancel</div>
        </div>
        </>
    )
}

export default AddNew