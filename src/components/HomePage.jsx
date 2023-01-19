function Homepage(props) {
    return (
        <div className="App">
            <header>
                {props.accounts.length > 0 ?
                    <div>
                        <p>Connected with : {props.accounts[0]} on the {props.network} network</p>
                    </div>
                    :
                    <div>
                        <p>Please connect your metamask on the goerli network.</p>
                        <button onClick={props.connectWallet} id="connectButton" style={{ position: "absolute", top: "13px", right: "50px" }}>Connect wallet</button>
                    </div>
                }
            </header>
        </div >
    )
}

export default Homepage;