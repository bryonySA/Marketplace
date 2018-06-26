//Import market place contract
var Marketplace = artifacts.require("./Marketplace.sol");

//start contract testing
//this function doesn't use gas, so no need to define which account gas must be taken from
contract("Marketplace",function(accounts){
    //create global test variables
    var articleName = "test_article";
    var articleDescription = "this is a test";
    //web3 is a global variable which is automatically injected into a test framework. Metamask can also inject it.
    var articlePrice = web3.toWei(10,"ether");
   

    //start first test - "it" is the Mocha function used for testing
    it("should have an articleCounter of zero in the beginning",function(){
        //get an instance of a Marketplace contract - in this case, just a single one
        //"then" is a promise and it ensures that the code works for the previous part to complete
        //fetching the deployed contract
        return Marketplace.deployed().then(function(instance){
            //call the getNumberOfArticles function
            return instance.getNumberOfArticles();
            // pass on return value of getNumberOfArticles function
        }).then(function(articleNumber){
            // check condition - assert.equal is a predefined function within Chai
            assert.equal(articleNumber,0,"Initial number not equal to zero")
        });
    });

    it("should have one article for sale",function(){
        var MarketplaceInstance;
        return Marketplace.deployed().then(function(instance){
            MarketplaceInstance = instance;
            return MarketplaceInstance.sellArticle(
                articleName,
                articleDescription,
                articlePrice,
                {'from': accounts[0]}
            )
        }).then(function(){
            return MarketplaceInstance.getNumberOfArticles();
        }).then(function(articleCounter){
            //check counter has increased
            assert.equal(articleCounter,1,"articleCounter has not increased")
        }).then(function(){
            return MarketplaceInstance.articles(1)
        }).then(function(article){
            //article[0] is the id
            assert.equal(article[0],1,"id is not 1")
            assert.equal(article[1],articlePrice,"price is not 10 ether")
            assert.equal(article[2],accounts[0],"seller is not correct")
            assert.equal(article[3],0x0,"buyer is not unknown")
            assert.equal(article[4],articleName,"articleName is not correct")
            assert.equal(article[5],articleDescription,"articleDescription is not correct")

        });

    });
});

// once saved, go to the terminal and type truffle test