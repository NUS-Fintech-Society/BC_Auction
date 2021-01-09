export function showProduct(contract, productId, callback) {
    contract.methods.getProductDetailsById(productId).call().then(product => { 
        var date = new Date(product.deadline*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var timeTillDeadline = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        callback( `
            <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5 class="card-title">ID: ${product.id} Name: ${product.name}</h5>
                        <p class="card-text">
                            ${product.description}
                            <p>Seller: ${product.seller}</p>
                            <p>Deadline: ${timeTillDeadline}</p>
                        </p>
                    </div>
                    <h4 class="col-md-auto align-self-center p-lg-5">
                        Lowest Price: ${product.lowerBound} ETH
                    </h4>
                    
                    
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