pragma solidity ^0.4.24;
import "remix_tests.sol"; // this import is automatically injected by Remix.

contract ETHBerlin {
    
    // Enum States
    enum PoolStates {
        NONE, // not existing
        NEW,  // created, not active
        ACTIVE, // running 
        END // ended
    }
    
    //variables
    GamblingPool pool; 
    mapping(uint => GamblingPool) challenges; 
    
    
    // functions
    
    function create(uint _poolId, address _address, uint _totalContestants, uint256 _endDate) payable{
        require(challenges[_poolId].state == PoolStates.NONE, "Pool already exists :) "); 
        // pool = GamblingPool(); 
        pool.id = _poolId; 
        pool.Owner = _address; 
        pool.amount = msg.value; 
        pool.totalContestants = _totalContestants; 
        pool.endDate = _endDate; 
        pool.state = PoolStates.NEW; 
        challenges[_poolId] = pool;
    }
    
   function join(uint _poolId, uint _contestantNumber, address _address) payable {
        require(challenges[_poolId].state == PoolStates.NEW, "Challenge not available"); 
        require(challenges[_poolId].totalContestants > _contestantNumber);
        challenges[_poolId].contestantList[_contestantNumber] = _address; 
        challenges[_poolId].amount += msg.value; 
        if (_contestantNumber == challenges[_poolId].totalContestants) {
            challenges[_poolId].state = PoolStates.ACTIVE; 
        }
    }
    
    // leave method for if you mistakenly entered the competisch
    
    function end(uint _poolId){
        require(challenges[_poolId].state == PoolStates.ACTIVE, "Challenge is not active");
        require(now > challenges[_poolId].endDate, "Challenge is not yet done"); 
        challenges[_poolId].state = PoolStates.END;
    }
    
    
    // structs
    
    struct GamblingPool {
        uint id; 
        address Owner; 
        uint amount; 
        uint totalContestants; 
        uint256 endDate; 
        PoolStates state; 
        mapping(uint => address) contestantList;
        mapping(uint => address) idToAddress;
        mapping(address => uint) addressToAmount; 
    }
    
}
