pragma solidity ^0.4.23;

contract BikeRegistry {

    address public owner;
    
    struct Bike {
        string name;
        string color;
        uint wheels;
        string brakes;
        string basket;
    }

    mapping (uint => Bike) bikes;

    uint public nextBikeNum;

    /* Function registers a bicycle into the Bike Registry */
    function registerBike(string _name, string _color, uint _wheels, string _brakes, string _basket) public returns (uint bikeID) {

        require( (bytes(_name).length <= 50) && (bytes(_color).length <= 50) && (bytes(_brakes).length <= 50) && (bytes(_basket).length <= 50) );

        bikeID = nextBikeNum++;

        bikes[bikeID] = Bike(_name, _color, _wheels, _brakes, _basket);

        return bikeID;
    }

    /* Function retrieves bicycle from Bike Registry */
    function getBike(uint bikeID) view external returns (string _name, string _color, uint _wheels, string _brakes, string basket) {

        require(bikeID < nextBikeNum);

        Bike memory bi = bikes[bikeID];

        return (bi.name, bi.color, bi.wheels, bi.brakes, bi.basket);
    }

    /* Function transfer ownership of bikeID */
    function transferBike(uint bikeID, address newOwner) public returns (uint _bike, address _newOwner) {

        require(newOwner != address(0));
        require(bikeID < nextBikeNum);

        owner = newOwner;

        Bike storage bike = bikes[bikeID];

        return (bikeID, newOwner);

    }


}
