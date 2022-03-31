import React from "react";
import css from "./styles/index.module.css"
import SignInImage from "../assets/sign_in.png"

const SignInCard = (props) => {

    const { isAuth, logoOutuser, loginUser } = props
    return(
        <>
        <div className={css.navbar_card}>
            <div className={css.navbar_card_container}>
                <div className={css.welcome}> Welcome !</div>
                <div className={css.login_bar}>
                    <div className={css.login_bar_card}>
                        <div className={css.sign_in_img}>
                            <img src={SignInImage} width='30' alt="Sign in Image" style={{cursor: 'pointer'}} onClick={isAuth ? logoOutuser : loginUser} />
                        </div>
                        <div style={{paddingLeft: "10px", cursor: 'pointer'}} onClick={isAuth ? logoOutuser : loginUser}>Sign In With Wallet</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default SignInCard