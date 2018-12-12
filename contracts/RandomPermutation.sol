pragma solidity ^0.4.23;
import "./IRandomPermutation.sol";

contract RandomPermutation is IRandomPermutation
{
  function Go(uint n) public payable returns(uint[] memory)
  {
    uint[] memory result = new uint[](n);
    if (n<2) return result;

    for(uint i=0; i<n; i++)
    {
      result[i]=i;
    }
    
    for(uint k=n-1; k>=0 && k<n; k--)
    {
      uint j = random(k);
      uint t = result[k];
      result[k] = result[j];
      result[j] = t;   
    }
    return result;
  }

  uint public seed_;

  function getSeed() public view returns(uint)
  {
    return seed_;
  }

  constructor() public
  {
    bytes memory t1 = abi.encodePacked(block.timestamp+block.number);
    seed_ = uint( keccak256( t1 ));
  }
  
  function random(uint maxValue) internal returns(uint)
  {
    uint value = seed_ % (maxValue+1);
    bytes memory t1 = abi.encodePacked(seed_ + block.timestamp + block.number);
    seed_ = uint( keccak256( t1 ));
    return value;
  }
}
