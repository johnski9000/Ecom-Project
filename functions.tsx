export function truncateTitle(title: any) {
  const titleWords = title.split(" ");
  if (titleWords.length > 3) {
    return titleWords.slice(0, 3).join(" ") + "...";
  }
  return title;
}
export function calculateTotal(basket: any) {
  return basket
    .reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0)
    .toFixed(2);
}
