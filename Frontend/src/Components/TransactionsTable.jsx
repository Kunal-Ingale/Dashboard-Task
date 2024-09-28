import React, { useState } from 'react';
import '../index.css';

const TransactionsTable = ({ transactions, totalPages, currentPage, onPageChange }) => {
    const [searchText, setSearchText] = useState('');

    const filteredTransactions = Array.isArray(transactions)
        ? transactions.filter((t) =>
            t.title.toLowerCase().includes(searchText.toLowerCase()) ||
            t.description.toLowerCase().includes(searchText.toLowerCase()) ||
            (typeof t.price === 'number' && t.price.toString().includes(searchText))
        )
        : [];

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="transactions-table-container">
            <h2>Transactions</h2>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Transactions"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length === 0 ? (
                        <tr>
                            <td colSpan="7">No transactions found.</td>
                        </tr>
                    ) : (
                        filteredTransactions.map((t) => (
                            <tr key={t._id}>
                                <td>{t.id}</td>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <td>{t.price}</td>
                                <td>{t.category}</td>
                                <td>{t.sold ? 'Yes' : 'No'}</td>
                                <td>
                                    <img
                                        src={t.image || 'placeholder.jpg'}
                                        alt={t.title}
                                        className="transaction-image"
                                    />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button type="button" onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionsTable;
