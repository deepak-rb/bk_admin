import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import AddBook from './AddBook'
import EditBook from './EditBook'
import DeleteConfirmation from './DeleteConfirmation'
import './Book.css'

interface Book {
  id: number
  name: string
  author: string
  condition: 'new' | 'good' | 'fair' | 'poor'
  publisher: string
  listerBy: string
  isbn: string
  publishedYear: number
  availability: 'available' | 'rented' | 'sold'
  genres: string[]
  buyPrice: number
  rentPrice: number
  dateAdded: string
  coverImage: string
  isVisible: boolean
}

function BookManagement() {
  const [books, setBooks] = useState<Book[]>([])
  const [showAddBook, setShowAddBook] = useState(false)
  const [showEditBook, setShowEditBook] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  useEffect(() => {
    const mockBooks: Book[] = [
      {
        id: 1,
        name: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        condition: 'good',
        publisher: 'Scribner',
        listerBy: 'John Doe',
        isbn: '978-0-7432-7356-5',
        publishedYear: 1925,
        availability: 'available',
        genres: ['Fiction', 'Classic'],
        buyPrice: 15.99,
        rentPrice: 3.99,
        dateAdded: '2024-07-01',
        coverImage: 'https://picsum.photos/200/300?random=1',
        isVisible: true
      },
      {
        id: 2,
        name: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        condition: 'new',
        publisher: 'J.B. Lippincott & Co.',
        listerBy: 'Jane Smith',
        isbn: '978-0-06-112008-4',
        publishedYear: 1960,
        availability: 'rented',
        genres: ['Fiction', 'Gothic'],
        buyPrice: 18.50,
        rentPrice: 4.50,
        dateAdded: '2024-07-05',
        coverImage: 'https://picsum.photos/200/300?random=2',
        isVisible: true
      },
      {
        id: 3,
        name: '1984',
        author: 'George Orwell',
        condition: 'fair',
        publisher: 'Secker & Warburg',
        listerBy: 'Mike Johnson',
        isbn: '978-0-452-28423-4',
        publishedYear: 1949,
        availability: 'sold',
        genres: ['Dystopian', 'Fiction'],
        buyPrice: 14.99,
        rentPrice: 3.50,
        dateAdded: '2024-06-28',
        coverImage: 'https://picsum.photos/200/300?random=3',
        isVisible: false
      },
      {
        id: 4,
        name: 'Pride and Prejudice',
        author: 'Jane Austen',
        condition: 'good',
        publisher: 'T. Egerton',
        listerBy: 'Sarah Wilson',
        isbn: '978-0-14-143951-8',
        publishedYear: 1813,
        availability: 'available',
        genres: ['Romance', 'Classic'],
        buyPrice: 12.99,
        rentPrice: 2.99,
        dateAdded: '2024-07-10',
        coverImage: 'https://picsum.photos/200/300?random=4',
        isVisible: true
      },
      {
        id: 5,
        name: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        condition: 'new',
        publisher: 'Little, Brown and Company',
        listerBy: 'Tom Brown',
        isbn: '978-0-316-76948-0',
        publishedYear: 1951,
        availability: 'available',
        genres: ['Fiction', 'Coming-of-age'],
        buyPrice: 16.99,
        rentPrice: 4.25,
        dateAdded: '2024-07-12',
        coverImage: 'https://picsum.photos/200/300?random=5',
        isVisible: true
      },
      {
        id: 6,
        name: 'Lord of the Flies',
        author: 'William Golding',
        condition: 'fair',
        publisher: 'Faber & Faber',
        listerBy: 'Emily Davis',
        isbn: '978-0-571-05686-2',
        publishedYear: 1954,
        availability: 'rented',
        genres: ['Fiction', 'Dystopian'],
        buyPrice: 13.99,
        rentPrice: 3.25,
        dateAdded: '2024-07-08',
        coverImage: 'https://picsum.photos/200/300?random=6',
        isVisible: true
      },
      {
        id: 7,
        name: 'Harry Potter and the Philosopher\'s Stone',
        author: 'J.K. Rowling',
        condition: 'new',
        publisher: 'Bloomsbury',
        listerBy: 'Chris Green',
        isbn: '978-0-7475-3269-9',
        publishedYear: 1997,
        availability: 'available',
        genres: ['Fantasy', 'Young Adult'],
        buyPrice: 19.99,
        rentPrice: 5.99,
        dateAdded: '2024-07-15',
        coverImage: 'https://picsum.photos/200/300?random=7',
        isVisible: true
      },
      {
        id: 8,
        name: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        condition: 'good',
        publisher: 'George Allen & Unwin',
        listerBy: 'Alex Turner',
        isbn: '978-0-547-92822-7',
        publishedYear: 1937,
        availability: 'available',
        genres: ['Fantasy', 'Adventure'],
        buyPrice: 17.99,
        rentPrice: 4.75,
        dateAdded: '2024-07-03',
        coverImage: 'https://picsum.photos/200/300?random=8',
        isVisible: true
      },
      {
        id: 9,
        name: 'Brave New World',
        author: 'Aldous Huxley',
        condition: 'fair',
        publisher: 'Chatto & Windus',
        listerBy: 'Lisa Martin',
        isbn: '978-0-06-085052-4',
        publishedYear: 1932,
        availability: 'sold',
        genres: ['Dystopian', 'Science Fiction'],
        buyPrice: 14.50,
        rentPrice: 3.75,
        dateAdded: '2024-06-30',
        coverImage: 'https://picsum.photos/200/300?random=9',
        isVisible: false
      },
      {
        id: 10,
        name: 'The Alchemist',
        author: 'Paulo Coelho',
        condition: 'new',
        publisher: 'HarperCollins',
        listerBy: 'David Lee',
        isbn: '978-0-06-112241-5',
        publishedYear: 1988,
        availability: 'available',
        genres: ['Fiction', 'Philosophy'],
        buyPrice: 15.25,
        rentPrice: 3.95,
        dateAdded: '2024-07-18',
        coverImage: 'https://picsum.photos/200/300?random=10',
        isVisible: true
      },
      {
        id: 11,
        name: 'Animal Farm',
        author: 'George Orwell',
        condition: 'good',
        publisher: 'Secker & Warburg',
        listerBy: 'Rachel Adams',
        isbn: '978-0-452-28424-1',
        publishedYear: 1945,
        availability: 'rented',
        genres: ['Political Fiction', 'Satire'],
        buyPrice: 11.99,
        rentPrice: 2.75,
        dateAdded: '2024-07-06',
        coverImage: 'https://picsum.photos/200/300?random=11',
        isVisible: true
      },
      {
        id: 12,
        name: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        condition: 'new',
        publisher: 'George Allen & Unwin',
        listerBy: 'Mark Thompson',
        isbn: '978-0-544-00341-5',
        publishedYear: 1954,
        availability: 'available',
        genres: ['Fantasy', 'Epic'],
        buyPrice: 24.99,
        rentPrice: 6.99,
        dateAdded: '2024-07-20',
        coverImage: 'https://picsum.photos/200/300?random=12',
        isVisible: true
      },
      {
        id: 13,
        name: 'Fahrenheit 451',
        author: 'Ray Bradbury',
        condition: 'fair',
        publisher: 'Ballantine Books',
        listerBy: 'Jennifer White',
        isbn: '978-1-4516-7331-9',
        publishedYear: 1953,
        availability: 'available',
        genres: ['Dystopian', 'Science Fiction'],
        buyPrice: 13.75,
        rentPrice: 3.45,
        dateAdded: '2024-07-09',
        coverImage: 'https://picsum.photos/200/300?random=13',
        isVisible: true
      },
      {
        id: 14,
        name: 'Jane Eyre',
        author: 'Charlotte Brontë',
        condition: 'good',
        publisher: 'Smith, Elder & Co.',
        listerBy: 'Patricia Clark',
        isbn: '978-0-14-144114-6',
        publishedYear: 1847,
        availability: 'sold',
        genres: ['Gothic', 'Romance'],
        buyPrice: 14.25,
        rentPrice: 3.65,
        dateAdded: '2024-07-02',
        coverImage: 'https://picsum.photos/200/300?random=14',
        isVisible: false
      },
      {
        id: 15,
        name: 'Moby Dick',
        author: 'Herman Melville',
        condition: 'poor',
        publisher: 'Richard Bentley',
        listerBy: 'Robert Taylor',
        isbn: '978-0-14-243724-7',
        publishedYear: 1851,
        availability: 'available',
        genres: ['Adventure', 'Classic'],
        buyPrice: 10.99,
        rentPrice: 2.25,
        dateAdded: '2024-06-25',
        coverImage: 'https://picsum.photos/200/300?random=15',
        isVisible: true
      },
      {
        id: 16,
        name: 'The Chronicles of Narnia',
        author: 'C.S. Lewis',
        condition: 'new',
        publisher: 'Geoffrey Bles',
        listerBy: 'Michael Scott',
        isbn: '978-0-06-623850-8',
        publishedYear: 1950,
        availability: 'available',
        genres: ['Fantasy', 'Children'],
        buyPrice: 22.99,
        rentPrice: 5.50,
        dateAdded: '2024-07-16',
        coverImage: 'https://picsum.photos/200/300?random=16',
        isVisible: true
      },
      {
        id: 17,
        name: 'Wuthering Heights',
        author: 'Emily Brontë',
        condition: 'good',
        publisher: 'Thomas Cautley Newby',
        listerBy: 'Amanda Johnson',
        isbn: '978-0-14-143955-6',
        publishedYear: 1847,
        availability: 'rented',
        genres: ['Gothic', 'Romance'],
        buyPrice: 13.50,
        rentPrice: 3.25,
        dateAdded: '2024-07-04',
        coverImage: 'https://picsum.photos/200/300?random=17',
        isVisible: true
      },
      {
        id: 18,
        name: 'The Picture of Dorian Gray',
        author: 'Oscar Wilde',
        condition: 'fair',
        publisher: 'Ward, Lock & Co.',
        listerBy: 'Steven Brown',
        isbn: '978-0-14-143957-0',
        publishedYear: 1890,
        availability: 'available',
        genres: ['Gothic', 'Philosophy'],
        buyPrice: 12.75,
        rentPrice: 3.15,
        dateAdded: '2024-07-11',
        coverImage: 'https://picsum.photos/200/300?random=18',
        isVisible: true
      }
    ]
    setBooks(mockBooks)
  }, [])

  // Event Handlers
  const handleCreateBook = () => {
    setShowAddBook(true)
  }

  const handleBookCreated = (newBook: Book) => {
    const updatedBooks = [...books, newBook]
    setBooks(updatedBooks)
    setShowAddBook(false)
    
    // Navigate to the last page where the new book will appear
    const newTotalPages = Math.ceil(updatedBooks.length / itemsPerPage)
    setCurrentPage(newTotalPages)
  }

  const handleCancelAddBook = () => {
    setShowAddBook(false)
  }

  const handleEditBook = (book: Book) => {
    setSelectedBook(book)
    setShowEditBook(true)
  }

  const handleBookUpdated = (updatedBook: Book) => {
    setBooks(books.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ))
    setShowEditBook(false)
    setSelectedBook(null)
  }

  const handleCancelEditBook = () => {
    setShowEditBook(false)
    setSelectedBook(null)
  }

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book)
    setShowDeleteConfirmation(true)
  }

  const confirmDeleteBook = () => {
    if (bookToDelete) {
      const updatedBooks = books.filter(b => b.id !== bookToDelete.id)
      setBooks(updatedBooks)
      setShowDeleteConfirmation(false)
      setBookToDelete(null)
      
      // Adjust current page if necessary
      const newTotalPages = Math.ceil(updatedBooks.length / itemsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      } else if (updatedBooks.length === 0) {
        setCurrentPage(1)
      }
    }
  }

  const cancelDeleteBook = () => {
    setShowDeleteConfirmation(false)
    setBookToDelete(null)
  }

  const handleToggleVisibility = (bookId: number) => {
    setBooks(books.map(book => 
      book.id === bookId 
        ? { ...book, isVisible: !book.isVisible }
        : book
    ))
  }

  // Utility Functions
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
  }

  // Pagination Logic
  const totalPages = Math.ceil(books.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentBooks = books.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="book-management">
      {showAddBook ? (
        <AddBook 
          onBookCreated={handleBookCreated}
          onCancel={handleCancelAddBook}
        />
      ) : showEditBook && selectedBook ? (
        <EditBook 
          book={selectedBook}
          onBookUpdated={handleBookUpdated}
          onCancel={handleCancelEditBook}
        />
      ) : (
        <>
          <div className="book-header">
            <h1>Book Management</h1>
            <button className="btn btn-primary" onClick={handleCreateBook}>
              <Plus size={16} />
              Add New Book
            </button>
          </div>

          <div className="books-table-container">
            <div className="pagination-controls-top">
              <div className="items-per-page">
                <label htmlFor="itemsPerPage">Items:</label>
                <select 
                  id="itemsPerPage"
                  value={itemsPerPage} 
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="form-select"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <div className="pagination-info">
                Showing {startIndex + 1} to {Math.min(endIndex, books.length)} of {books.length} books
              </div>
            </div>

            <div className="table-wrapper">
              <table className="books-table">
                <thead>
                  <tr>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Condition</th>
                    <th>Publisher</th>
                    <th>Listed By</th>
                    <th>ISBN</th>
                    <th>Year</th>
                    <th>Availability</th>
                    <th>Visibility</th>
                    <th>Genres</th>
                    <th>Buy Price</th>
                    <th>Rent Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentBooks.map(book => (
                    <tr key={book.id}>
                      <td>
                        <div className="book-info">
                          <img src={book.coverImage} alt={book.name} className="book-cover" />
                          <span className="book-name">{book.name}</span>
                        </div>
                      </td>
                      <td>{book.author}</td>
                      <td>
                        <span className={`condition-badge ${book.condition}`}>
                          {book.condition}
                        </span>
                      </td>
                      <td>{book.publisher}</td>
                      <td>{book.listerBy}</td>
                      <td className="isbn-cell">{book.isbn}</td>
                      <td>{book.publishedYear}</td>
                      <td>
                        <span className={`availability-badge ${book.availability}`}>
                          {book.availability}
                        </span>
                      </td>
                      <td>
                        <span className={`visibility-badge ${book.isVisible ? 'visible' : 'hidden'}`}>
                          {book.isVisible ? 'Visible' : 'Hidden'}
                        </span>
                      </td>
                      <td>
                        <div className="genres-list">
                          {book.genres.map((genre, index) => (
                            <span key={index} className="genre-tag">
                              {genre}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="price-cell">{formatPrice(book.buyPrice)}</td>
                      <td className="price-cell">{formatPrice(book.rentPrice)}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => handleEditBook(book)}
                            title="Edit Book"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            className={`btn btn-sm ${book.isVisible ? 'btn-warning' : 'btn-success'}`}
                            onClick={() => handleToggleVisibility(book.id)}
                            title={book.isVisible ? 'Hide Book' : 'Show Book'}
                          >
                            {book.isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteBook(book)}
                            title="Delete Book"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination-controls">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;
                    const isCurrentPage = page === currentPage;
                    
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`btn ${isCurrentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return <span key={page} className="pagination-ellipsis">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                <button 
                  className="btn btn-outline-secondary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </>
      )}
      
      {showDeleteConfirmation && bookToDelete && (
        <DeleteConfirmation
          bookName={bookToDelete.name}
          onConfirm={confirmDeleteBook}
          onCancel={cancelDeleteBook}
        />
      )}
    </div>
  )
}

export default BookManagement