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
    return result;
  }
}