pragma solidity ^0.4.20;
contract Marketplace {
    // Custom types
    struct Article {
        uint id;
        uint price;
        address seller;
        address buyer;
        string name;
        string description;
    }
    // State variables
    mapping(uint => Article) public articles;
    uint articleCounter;
  // Events
    event sellArticleEvent (
        uint _id,
        address _seller,
        string _name,
        uint256 _price
    );
    // sell an article
    function sellArticle(string _name, string _description, uint _price) external {
        // a new article
        articleCounter++;
        // store this article
        articles[articleCounter] = Article(
            articleCounter,
            _price,
            msg.sender,
            0x0,
            _name,
            _description
        );
        // trigger the event
        emit sellArticleEvent(articleCounter, msg.sender, _name, _price);
    }
    // fetch the number of articles in the contract
    function getNumberOfArticles() external view returns (uint) {
        return articleCounter;
    }
}