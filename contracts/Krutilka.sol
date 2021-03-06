pragma solidity ^0.4.23;
import "./IRandomPermutation.sol";

contract Krutilka {

  ////////////////////////////////////////////
  // Participant's puclic functions
  function Register(string yourName) public onlyStage(Stage.Register) 
  {
    participants_.push(
      Participant({
        address_:msg.sender, 
        name_:yourName}));
  }
  function GetMyName() public view returns(string)
  {
    uint myIndex = FindIn(participants_,msg.sender);
    require(myIndex < participants_.length);
    return participants_[myIndex].name_;
  }
  function WhoToGift() public onlyStage(Stage.Gift) view returns(string) 
  {
    require (orderedGifters_.length == participants_.length);
    uint myIndex = FindIn(orderedGifters_,msg.sender);
    require(myIndex < orderedGifters_.length);

    uint who = myIndex+1;
    if (who == orderedGifters_.length) who = 0;

    return orderedGifters_[who].name_;
  }
  function GetCurrentStage() public view returns(string)
  {
    if (stage_ == Stage.Register)
      return "Register";
    if ( stage_ == Stage.Gift )
      return "Gift";
    return "Error";
  }
  function GetParticipantsCount() public view returns(uint)
  {
    return participants_.length;
  }

  /////////////////////////////////////////////
  // Owner's public functions
  constructor(
    address randomPermutationContractAddress
    ) public 
  {
    owner = msg.sender;
    stage_ = Stage.Register;
    randomPermutationContract_ = IRandomPermutation(randomPermutationContractAddress);
  }

  function StartRegisterStage() public restricted 
  {
    ClearParticipants();
    stage_ = Stage.Register;
  }

  function StartKrutilka() public onlyStage(Stage.Register) restricted 
  {
    require( participants_.length > 1 );
    RandomReorder();
    stage_ = Stage.Gift;
  }

  ////////////////////////////////////
  // Internal

  address public owner;
  modifier restricted() {
    if (msg.sender == owner) _;
  }

  enum Stage { Register, Gift }
  Stage public stage_;
  modifier onlyStage(Stage stage) {
    if (stage == stage_) _;
  }


  ////////////
  // data
  struct Participant {
    address address_;
    string name_;
  }
  Participant[] private participants_;
  Participant[] private orderedGifters_;

  function ClearParticipants() internal {
    delete participants_;
    delete orderedGifters_;
  }

  function FindIn(Participant[] participants, address participantAddress) internal pure returns(uint) {
    for(uint i = 0; i < participants.length; i++) {
      if (participants[i].address_ == participantAddress) return i;
    }
    return participants.length;
  }

  IRandomPermutation randomPermutationContract_;

  function RandomReorder() internal {
    uint[] memory randomArray = randomPermutationContract_.Go(participants_.length);
    for(uint i = 0; i < participants_.length; i++ )
    {
      orderedGifters_.push( participants_[randomArray[i]] );
    }
  }
}
