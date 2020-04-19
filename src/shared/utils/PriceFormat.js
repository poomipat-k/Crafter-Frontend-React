const priceFormat = (price) => {
  let strPrice = "";
  try {
    strPrice = price.toString();
  } catch (err) {}
  let strLength = strPrice.length;
  let c = -3;
  let output = "";
  while (strLength > 0) {
    if (c + 3 === 0) {
      output = "," + strPrice.slice(c) + output;
    } else {
      output = "," + strPrice.slice(c, c + 3) + output;
    }
    strLength -= 3;
    c -= 3;
  }

  output = output.slice(1);
  return output;
};

export default priceFormat;
