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

function Book() {
  const [books, setBooks] = useState<Book[]>([])
  const [showAddBook, setShowAddBook] = useState(false)
  const [showEditBook, setShowEditBook] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)

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
      }
    ]
    setBooks(mockBooks)
  }, [])

  const handleCreateBook = () => {
    setShowAddBook(true)
  }

  const handleBookCreated = (newBook: Book) => {
    setBooks([...books, newBook])
    setShowAddBook(false)
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
      setBooks(books.filter(b => b.id !== bookToDelete.id))
      setShowDeleteConfirmation(false)
      setBookToDelete(null)
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

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`
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
                {books.map(book => (
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

export default Book