export function showProduct(contract, productId, callback) {
    contract.methods.getProductDetailsById(productId).call().then(product => { 
        var date = new Date(product.deadline*1000);
        var price = product.lowerBound * 0.000000000000000001;
        callback( `
                <div class="row">
                    <div class="col">
                        <h5 class="card-title"><strong>${product.name}</strong></h5>
                        <p class="card-text">
                            
                            <p><strong>Product Description</strong>: ${product.description}</p>
                            <p><strong>Seller</strong>: ${product.seller}</p>
                            <p><strong>Deadline</strong>: ${date}</p>
                            <p><strong>Lowest Price</strong>: ${price} ETH
                        </p>
                    </div>
                </div>
        `);}
    ); 
}

export function makeBid(contract, account, productId, bidPrice, callback) {
    contract.methods.placeBid(productId).send({from: account, value: bidPrice})
        .on('transactionHash', hash => callback(`Transaction Hash: ${hash}`))
        .on('error', (error, receipt) => callback(`Error has occured: ${error}`));
}