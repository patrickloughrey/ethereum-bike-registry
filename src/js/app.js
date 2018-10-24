/* Initialize variables */
var name = $('#name');
var color = $('#color');
var wheels = $('#wheels');
var brakes = $('#brakes');
var basket = $('#basket');

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
      var TutorialTokenArtifact = data;
      App.contracts.TutorialToken = TruffleContract(TutorialTokenArtifact);

      /* Set the provider for our contract */
      App.contracts.TutorialToken.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#registerBike', App.registerBike);
  },

  registerBike: function(event) {
    event.preventDefault();

    var BikeInstance;

    App.contracts.BikeRegistry.deployed().then(function(instance) {
      console.log(instance);
      BikeInstance = instance;

      return BikeInstance.registerBike(name.val(), color.val(), wheels.val(), brakes.val(), basket.val());

    }).then(function(result) {
        console.log('Contract has been deployed!\n')
    }

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
