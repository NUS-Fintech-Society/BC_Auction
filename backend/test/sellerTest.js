const Products = artifacts.require("./Products.sol")

contract("Product", accounts =>{
    
    it("... should show correct number of products a user has", async function() {
        const prodInstance = await Products.deployed();
        const p1= await prodInstance.addProduct("p1", "first", 1, 070, {from:accounts[0]})
        console.log(p1)
        const prods= await prodInstance.getMyProducts({from:accounts[0]})
        console.log(prods)
        assert.equal(prods.length,1)

    })




})