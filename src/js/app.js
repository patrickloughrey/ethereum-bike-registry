/* JavaScript Smart Contract logic */
App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('BikeRegistry.json', function(data) {
      /* Get the necessary contract artifact file and instantiate it with truffle-contract */
      var BikeRegistryArtifact = data;
      App.contracts.BikeRegistry = TruffleContract(BikeRegistryArtifact);

      /* Set the provider for our contract */
      App.contracts.BikeRegistry.setProvider(App.web3Provider);

      return App.bindEvents();

    });

  },

  bindEvents: function() {
    $(document).on('click', '#registerBike', App.newBike);
  },

  newBike: function(event) {
    event.preventDefault();

    var BikeInstance;

    App.contracts.BikeRegistry.deployed().then(function(instance) {
      // console.log(instance);
      BikeInstance = instance;

      return BikeInstance.registerBike($('#name').val(), $('#color').val(), $('#wheels').val(), $('#brakes').val(), $('#basket').val());

    }).then(function(result) {
        console.log(result);
        console.log('Contract has been deployed!\n');

    }).catch(function(err) {
        console.log(err)
    });

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
