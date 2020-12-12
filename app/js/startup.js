export async function isEthEnabled(window) {
    console.log("aasasa");
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        return true;
    }
    return false;
}
