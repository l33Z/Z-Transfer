// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Transactions {
    struct Transaction {
        uint256 id;
        address sender;
        address receiver;
        uint256 value;
        string message;
        string keyword;
        uint256 timestamp;
    }

    event Transfer(
        address sender,
        address receiver,
        uint256 value,
        string message,
        string keyword,
        uint256 timestamp
    );

    uint256 transactionsCount = 0;
    Transaction[] public transactionsList;

    // ------------------------- Add Transaction -------------------------
    function addTransaction(
        address _receiver,
        uint256 _value,
        string memory _message,
        string memory _keyword
    ) public {
        transactionsCount++;
        transactionsList.push(
            Transaction(
                transactionsCount,
                msg.sender,
                _receiver,
                _value,
                _message,
                _keyword,
                block.timestamp
            )
        );

        emit Transfer(
            msg.sender,
            _receiver,
            _value,
            _message,
            _keyword,
            block.timestamp
        );
    }

    // ------------------------- Get All Transactions -------------------------
    function allTransactionsList() public view returns (Transaction[] memory) {
        return transactionsList;
    }

    // ------------------------- Get Transactions Count -------------------------
    function totalTransactionCount() public view returns (uint256) {
        return transactionsCount;
    }
}
