//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Escorw {

    struct Data{
        uint id;
        address payable seller;
        address buyer;
        uint price;
        uint flag;
        string details;
        bool isSeller;
        bool isBuyer;
    }

    uint private mainId;

    Data[] public data;

    modifier onlyForBuyer(uint _id){
        Data memory d = data[_id];
        require(msg.sender == d.buyer, "Only buyer can call this function !");
        _;
    }

    modifier initatedCompletedCheck(uint _id){
         Data memory d = data[_id];
         require(d.flag == 1, "not initated by buyer or seller or both");
         _;
    }

    modifier checkDeposit(uint _id){
         Data memory d = data[_id];
         require(d.flag == 2, "money deposited only");
         _;
    }

    modifier nullCheck(address addr){
        require(addr != address(0), "invalid address");
        _;
    }

    modifier priceCheck(uint _price){
        require(_price > 0, "invalid amount");
        _;
    }

    modifier checkDetails(string memory _details){
        bytes memory temp = bytes(_details);
        require(temp.length != 0, "invalid details");
        _;
    }

    modifier checkValidId(uint _id){
        require(_id <= data.length, "invalid ID");
        _;
    }

    function start(address payable _seller, address _buyer, uint _price, string memory _details) 
        nullCheck(_seller) nullCheck(_buyer) priceCheck(_price) checkDetails(_details)
    public{
        Data memory d = Data(mainId, _seller, _buyer, _price, 0, _details, false, false);
        data.push(d);
        mainId += 1;
    }

    function getData() public view returns(Data[] memory){
        return data;
    }

    function initiateContract(uint _id) checkValidId(_id) public {
        Data storage d = data[_id];
        require(msg.sender == d.seller || msg.sender == d.buyer, "invalid address");

        if(msg.sender == d.seller){
            d.isSeller = true;
        }

        if(msg.sender == d.buyer){
            d.isBuyer = true;
        }

        if(d.isSeller && d.isBuyer){
            d.flag = 1;
        }
    }

    function coniformPayment(uint _id) checkValidId(_id) checkDeposit(_id) onlyForBuyer(_id) public {
        Data storage d = data[_id];
        d.seller.transfer(d.price);
        d.flag = 3;
    }

    function deposit(uint _id) checkValidId(_id) initatedCompletedCheck(_id) onlyForBuyer(_id) payable public {
        Data storage d = data[_id];
        require(msg.value == d.price, "Wrong amount");
        d.flag = 2;
    }

    function withdraw(uint amount) private{
        payable(msg.sender).transfer(amount);
    }

    function cancelTx(uint _id) checkValidId(_id) public{
        Data storage d = data[_id];
        require(msg.sender == d.seller || msg.sender == d.buyer, "only buyer or seller can call this");
        if(msg.sender == d.buyer && d.flag == 2){
            uint amount = d.price;
            withdraw(amount);
            d.isBuyer = false;
            d.isSeller = false;
            d.flag = 0;
        }

        if(msg.sender == d.seller){
            d.isBuyer = false;
            d.isSeller = false;
            d.flag = 0;
        }

        if( (msg.sender == d.seller || msg.sender == d.buyer) && d.flag == 1 ){
                d.isBuyer = false;
                d.isSeller = false;
                d.flag = 0;
        }
    }
}
