export function showProduct(contract, productId, callback) {
    contract.methods.getProductDetailById(productId).call().then(product => 
        callback( `
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5 class="card-title">ID: ${product.id} Name: ${product.name}</h5>
                        <p class="card-text">
                            ${product.description}
                            <p>Seller: ${product.seller}</p>
                            <p>Deadline: ${product.deadline}</p>
                        </p>
                    </div>
                    <h4 class="col-md-auto align-self-center p-lg-5">
                        Lowest Price: ${product.lowerBound} ETH
                    </h4>
                    <form id="bid-form"> 
                        <label for="bid-price"> Make a bid (ETH) </label>
                        <input type="text" id="bid-price" name="bid-price"><br>
                        <input type="submit" value="Submit"> 
                    </form>
                    <div id="return-message"></div>
                </div>
            </div>
        `)
    ); 
}

export function makeBid(contract, account, productId, bidPrice, callback) {
    contract.methods.placeBid(productId).send({from: account, value:bidPrice})
        .on('transactionHash', hash => callback(`Transaction Hash: ${hash}`))
        .on('error', (error, receipt) => callback(`Error has occured: ${error}`));
}