export function showProduct(contract, productId) {
    var product = contract.methods.getProductDetailById(productId);
    return `
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
            </div>
        </div>
    `
}