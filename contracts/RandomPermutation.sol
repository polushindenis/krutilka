pragma solidity ^0.4.23;
import "./IRandomPermutation.sol";

contract RandomPermutation is IRandomPermutation
{
  function Go(uint n) public payable returns(uint[] memory)
  {
    uint[] memory result = new uint[](n);
    for(uint i=0; i<n; i++)
    {
      result[i]=i;
    }
    
    for(uint i=n-1; i>=0; i--)
    {
      uint j = random(n-1);
      uint t = result[i];
      result[i] = result[j];
      result[j] = t;
    }
    
    return result;
  }
  
  function random(uint maxValue) internal returns(uint)
  {
    return 0x123456789 % (maxValue+1);
  }
}
