const calculateArtistProfit = () => {
  let monthlyStreams = 30;
  let annualStreams = monthlyStreams * 12;
  let minProfit = 0.33;
  let maxProfit = 0.55;
  let totalProfit = `${monthlyStreams * minProfit} - ${
    monthlyStreams * maxProfit
  }`;
};
