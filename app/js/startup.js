export async function isEthEnabled(window) {
    console.log("aasasa");
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        return true;
    }
    return false;
}

export function setAccount(window) {
    window.ethereum.enable().then((account) => {
            window.defaultAccount = account[0];
            web3.eth.defaultAccount = defaultAccount;
            window.account = defaultAccount;
    });
}
