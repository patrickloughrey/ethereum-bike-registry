pragma solidity ^0.4.23;
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract BikeRegistry is Ownable {

    struct Bike {
        string name;
        string color;
        uint wheels;
        string brakes;
        string basket;
    }

    mapping (uint => Bike) public id_to_bikes;
    /* One person can own several bikes */
    mapping (uint => address) public id_to_addr;

    /*
      mapping (address => uint) public addr_to_id;
        in this mapping, one person owns one bike, and that is all
    */

    uint public nextBikeNum;

    /* Function registers a bicycle into the Bike Registry */
    function registerBike(string _name, string _color, uint _wheels, string _brakes, string _basket) public onlyOwner returns (uint bikeID) {

        require( (bytes(_name).length <= 50) && (bytes(_color).length <= 50) && (bytes(_brakes).length <= 50) && (bytes(_basket).length <= 50) );

        bikeID = nextBikeNum++;

        id_to_bikes[bikeID] = Bike(_name, _color, _wheels, _brakes, _basket);

        id_to_addr[bikeID] = msg.sender;

        return bikeID;
    }

    /* Function retrieves bicycle from Bike Registry */
    function getBike(uint bikeID) view external returns (string _name, string _color, uint _wheels, string _brakes, string basket) {

        require(bikeID < nextBikeNum);

        Bike memory bi = id_to_bikes[bikeID];

        return (bi.name, bi.color, bi.wheels, bi.brakes, bi.basket);
    }

    /* Function transfer ownership of bikeID */
    function transferBike(uint bikeID, address newOwner) public returns (bool a) {
        require(id_to_addr[bikeID] == msg.sender);
        require(newOwner != address(0));
        require(bikeID < nextBikeNum);

        id_to_addr[bikeID] = newOwner;

        return true;

    }


}
