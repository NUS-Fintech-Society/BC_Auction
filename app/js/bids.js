export function bidComponent(bid) {
    var icon, explanation, btnCss;
    if (bid.type === "sold") {
        icon = "fa-check";
        explanation = "You have successfully won this item in the auction!";
        btnCss = "btn-success";
    } else if (bid.type === "outbid") {
        icon = "fa-times";
        explanation = "You have been outbid by someone else! Head to the product page to bid again."
        btnCss = "btn-danger";
    } else if (bid.type === "pending") {
        icon = "fa-exclamation-circle";
        explanation = "You are currently the top bidder! However, the seller has not closed the auction yet. On your toes.";
        btnCss = "btn-warning";
    } else if (bid.type === "closed") {
        icon = "fa-times";
        explanation = "Seller has decided that the product isn't up for sale anymore";
        btnCss = "btn-danger";
    }

    return `
    <div class="card bid border-light ${"bid-" + bid.type} m-5">
        <div class="card-body">
            <div class="row">
                <h1 class="col-md-auto align-self-center p-lg-5">
                    <i class="fa ${icon}" aria-hidden="true"></i>
                </h1>
                <div class="col">
                    <h5 class="card-title">${bid.name}</h5>
                    <p class="card-text">
                        ${bid.desc}
                        <p>Seller: ${bid.seller}</p>
                        <p><small>
                            ${explanation}
                        </small></p>
                    </p>
                    <a href="product.html?id=${bid.productId}" class="btn ${btnCss} bid-btn">View Product</a>
                </div>
                <h4 class="col-md-auto align-self-center p-lg-5">
                    ${bid.price} ETH
                </h4>
            </div>
        </div>
    </div>
    `;
}

export function getAllBids(contract, account, callback) {
    contract.events.BidPlacedEvent({
        filter: { bidder: account },
        fromBlock: 0
    }, (_error, event) => {
        contract.events.ProductLaunchEvent({
            filter: { productId: event.returnValues.productId },
            fromBlock: 0
        }, async(_error, launchEvent) => {
            if (launchEvent.returnValues.productId === event.returnValues.productId) {
                var bid = {
                    name: launchEvent.returnValues.name,
                    desc: launchEvent.returnValues.description,
                    seller: launchEvent.returnValues.seller,
                    price: web3.utils.fromWei(event.returnValues.price, 'ether'),
                    productId: event.returnValues.productId,
                };

                try {
                    const res = await contract
                        .methods
                        .getProductDetailsById(event.returnValues.productId)
                        .call();

                    if (res.highestBid.bidder === account) {
                        bid.type = "pending";
                        callback(bid);
                    } else {
                        bid.type = "outbid";
                        callback(bid);
                    }

                } catch (error) {

                    contract.events.ProductSoldEvent({
                        filter: { productId: event.returnValues.productId },
                        fromBlock: 0
                    }, async(_error, closeEvent) => {
                        if (closeEvent.returnValues.buyer === account && closeEvent.returnValues.price === event.returnValues.price) {
                            bid.type = "sold";
                            callback(bid);
                        } else {
                            bid.type = "outbid";
                            callback(bid);
                        }
                    });

                    contract.events.ProductClosedEvent({
                        filter: { productId: event.returnValues.productId },
                        fromBlock: 0
                    }, async(_error, _closeEvent) => {
                        bid.type = "closed";
                        callback(bid);
                    });

                }
            }
        });
    });

}