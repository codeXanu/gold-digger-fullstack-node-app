export function getGoldPrice() {
    const minPrice = 9910;
    const maxPrice = 10150;
    const price = (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
    return parseFloat(price);
}