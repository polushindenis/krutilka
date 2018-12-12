var krutilka = artifacts.require("./Krutilka.sol");
var randomPermutation = artifacts.require("./RandomPermutation.sol");

contract('Krutilka', 
  function(accounts) 
  {
    var thisInst;
    it("should be tested", async function() {
      thisInst = await krutilka.deployed();
      var currentStage = await thisInst.GetCurrentStage();
      assert.equal(currentStage,"Register", "check Register Stage after deploy")
      console.log("check current stage - ok");
      var count = await thisInst.GetParticipantsCount();
      assert.equal(count,0, "Count must be 0 after deploy")
      console.log("check participants count - ok");
      await thisInst.Register("Elza",       {from:accounts[1]});
      await thisInst.Register("Lu",         {from:accounts[2]});
      await thisInst.Register("U",          {from:accounts[3]});
      await thisInst.Register("Ryzhaya",      {from:accounts[4]});
      await thisInst.Register("Den",        {from:accounts[5]});
      await thisInst.Register("Jenechkin",  {from:accounts[6]});
      await thisInst.Register("Shmyaka",    {from:accounts[7]});
      await thisInst.Register("Cheshka",    {from:accounts[8]});
      await thisInst.Register("Vojatik",    {from:accounts[9]});
      count = await thisInst.GetParticipantsCount();
      assert.equal(count,9, "Count must be 9 after registration")
      console.log("register - ok");
      await thisInst.StartKrutilka();
      currentStage = await thisInst.GetCurrentStage();
      assert.equal(currentStage,"Gift", "check Register Stage after Krutilka");
      console.log("start Krutilka - ok");
      for(var i=1; i<10 ;i++)
      {
        var who = await thisInst.GetMyName({from:accounts[i]});
        var whom = await thisInst.WhoToGift({from:accounts[i]});
        console.log("who to Gift %s --> %s",who, whom);
      }  
    });

    it("should be OK with randomPermutation", async function()
    {
      var rand = await randomPermutation.deployed();
      for(var j = 0; j<20; j++)
      {
        let seed = await rand.getSeed();
        //console.log("seed=%d",seed.valueOf());
        let r1 = await rand.Go.call(10);
        rand.Go(10);
        let s = "";
        let r = r1.valueOf();
        for(var i=0; i<r.length; ++i)
          s += " " + r[i];
        console.log(s);
      }
    });
  }
);

