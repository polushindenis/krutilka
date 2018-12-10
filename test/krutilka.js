var krutilka = artifacts.require("./Krutilka.sol");

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
        var who = await thisInst.WhoToGift({from:accounts[i]});
        console.log("who to Gift %d = %s",i, who);
      }  
    });
  }
);


/*
contract('Krutilka', 
  function(accounts) 
  {
    var thisInst;
    it("should be deployed", function() {
      return krutilka.deployed().then(
        function(instance)
        {
          thisInst = instance;
          thisInst.GetCurrentStage().then(
            function(result)
            {
              assert.equal(result,"Register", "check Register Stage after deploy")
            }
          )
          console.log("check current stage - ok");
          thisInst.GetParticipantsCount().then(
            function(result)
            {
              assert.equal(result,0, "Count must be 0 after deploy")
            }
          )
          console.log("check participants count - ok");
          thisInst.Register("Elza",       {from:accounts[1]}).then(function(){
          thisInst.Register("Lu",         {from:accounts[2]}).then(function(){
          thisInst.Register("U",          {from:accounts[3]}).then(function(){
          thisInst.Register("Ryzhaya",      {from:accounts[4]}).then(function(){
          thisInst.Register("Den",        {from:accounts[5]}).then(function(){
          thisInst.Register("Jenechkin",  {from:accounts[6]}).then(function(){
          thisInst.Register("Shmyaka",    {from:accounts[7]}).then(function(){
          thisInst.Register("Cheshka",    {from:accounts[8]}).then(function(){
          thisInst.Register("Vojatik",    {from:accounts[9]}).then(function(){
            thisInst.GetParticipantsCount().then(
              function(result)
              {
                assert.equal(result,9, "Count must be 9 after registration")
              }
            )
          })})})})})})})})})
          console.log("register - ok");
          thisInst.StartKrutilka().then( function() 
          {
            thisInst.GetCurrentStage().then(
              function(result)
              {
                assert.equal(result,"Gift", "check Register Stage after deploy")
              }
            )
          });
          console.log("start Krutilka - ok");
          thisInst.WhoToGift({from:accounts[1]}).then( function(result)
          {
            console.log("who to Gift 0 = %s",result);
          }, function()
          {
            console.log("fail who to gift")
          })
        }
      );
    });
  }
);
*/ 