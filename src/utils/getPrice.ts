export const getPrice = (
  features: any[],
  options?: {
    noCredits?: boolean;
  }
) => {
  var price = features.reduce((acc, feature) => {
    return acc + feature.price;
  }, 0);

  //TODO add coupon code
  return price.toFixed(2);
};

export const getDiscounts = (features: any[], featuresData: any) => {
  var discountFeatures: any[] = [];
  var currentFeatures = [...features.map((f) => f._id)];

  //Add on core feature discount
  if (
    currentFeatures.includes('6328aadfd0c3abb536eae7ad') &&
    currentFeatures.includes('632b65745ddb31bf9714ef69')
  ) {
    discountFeatures.push(
      featuresData?.allFeatures.find(
        (f: any) => f._id === '63457a948c492c0963977ab6'
      )
    );
  }

  return discountFeatures;
};
