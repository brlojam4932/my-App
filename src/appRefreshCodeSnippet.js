handleRefresh = (valueChangeTicker) => {

  const newCoinData = this.state.coinData.map((values) => {
    let newValues = { ...values }; // shallow cloning / deep copy
    if (valueChangeTicker === values.ticker) {
      //manipulate price here
      const randomPercentage = 0.995 + Math.random() * 0.01;
      newValues.price *= randomPercentage;
    } return newValues;

  });
  // this.setState(prevState => {}) one way to write the new state
  this.setState({ coinData: newCoinData }) // here we get the object 'coinData'

}