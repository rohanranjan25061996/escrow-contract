import React from "react";
import css from "./styles/index.module.css"
import { AuthContext } from "../contextApi/Auth";
import {useMoralis} from "react-moralis"
import SignInCard from "./SignInCard";
import Wallet from "../components/Wallet";

const NavBar = () => {

    const {isAuth, setUserAddress, handelAuth} = React.useContext(AuthContext);
    const {isAuthenticated, isWeb3Enabled, authenticate, enableWeb3, logout} = useMoralis();

    React.useEffect(() => {
        if (!isWeb3Enabled && isAuthenticated) {
          enableWeb3({ provider: "walletconnect", chainId: 56 });
          console.log("web3 activated");
        }
      }, [isWeb3Enabled, isAuthenticated, enableWeb3]);

      const loginUser = async () => {
        authenticate({signingMessage: 'Welcome to Escrow Contract App !'}).then((user) => {
           let addr = user.get("ethAddress")
           setUserAddress(addr);
           handelAuth();
      })
    }

    const logoOutuser = () => {
        logout();
        setUserAddress("")
        handelAuth()
    }
    return(
        <>
        <div className= {css.navbar}>
        <div className={css.navbar_container}>
            <div className={css.navbar_half_1}>
                Escrow Contract
            </div>
        </div>
        </div>
        {!isAuth && <SignInCard isAuth = {isAuth} loginUser = {loginUser} logoOutuser = {logoOutuser} />}
        {isAuth && <Wallet />}
        </>
    )
}

export default NavBar