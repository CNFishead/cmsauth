export const getPrice = (
  features: any[],
  options?: {
    noCredits?: boolean;
  }
) => {
  let price = features.reduce((acc, feature) => {
    return acc + feature.price;
  }, 0);

  if (features.find((f) => f._id === '672e251f4738ac9c1cf8ed6a')) {
    // we need to modify the total price to reflect the discount
    // since they'll be paying for the platform for a year in advance
    // so the price will be the total price of the features times 12, minus 10%
    price = price * 12 * 0.8;
  }

  //TODO add coupon code
  return price.toFixed(2);
};

export const getDiscounts = (features: any[], featuresData: any) => {
  const discountFeatures: any[] = [];
  const currentFeatures = [...features.map((f) => f._id)];

  //If the user has the early adopters feature, then they get a discount
  //since they'll be paying for the platform for a year in advance
  if (currentFeatures.includes('672e251f4738ac9c1cf8ed6a')) {
    // we need to modify the total price to reflect the discount
  }

  return discountFeatures;
};
