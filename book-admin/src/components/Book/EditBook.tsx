import React, { useState, useEffect } from 'react'
import { ArrowLeft, Save, X } from 'lucide-react'
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

interface EditBookProps {
  book: Book
  onBookUpdated: (book: Book) => void
  onCancel: () => void
}

function EditBook({ book, onBookUpdated, onCancel }: EditBookProps) {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    condition: 'new' as 'new' | 'good' | 'fair' | 'poor',
    publisher: '',
    listerBy: '',
    isbn: '',
    publishedYear: new Date().getFullYear(),
    availability: 'available' as 'available' | 'rented' | 'sold',
    buyPrice: 0,
    rentPrice: 0,
    coverImage: '',
    isVisible: true
  })

  const [genres, setGenres] = useState<string[]>([])
  const [currentGenre, setCurrentGenre] = useState('')

  const [errors, setErrors] = useState({
    name: '',
    author: '',
    isbn: '',
    publisher: '',
    listerBy: '',
    buyPrice: '',
    rentPrice: ''
  })

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name,
        author: book.author,
        condition: book.condition,
        publisher: book.publisher,
        listerBy: book.listerBy,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        availability: book.availability,
        buyPrice: book.buyPrice,
        rentPrice: book.rentPrice,
        coverImage: book.coverImage,
        isVisible: book.isVisible
      })
      setGenres(book.genres)
    }
  }, [book])

  const validateForm = () => {
    const newErrors = { 
      name: '', 
      author: '', 
      isbn: '', 
      publisher: '', 
      listerBy: '',
      buyPrice: '',
      rentPrice: ''
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Book name is required'
      isValid = false
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required'
      isValid = false
    }

    if (!formData.publisher.trim()) {
      newErrors.publisher = 'Publisher is required'
      isValid = false
    }

    if (!formData.listerBy.trim()) {
      newErrors.listerBy = 'Lister name is required'
      isValid = false
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required'
      isValid = false
    } else if (!/^[\d-]+$/.test(formData.isbn)) {
      newErrors.isbn = 'Invalid ISBN format'
      isValid = false
    }

    if (formData.buyPrice <= 0) {
      newErrors.buyPrice = 'Buy price must be greater than 0'
      isValid = false
    }

    if (formData.rentPrice <= 0) {
      newErrors.rentPrice = 'Rent price must be greater than 0'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked 
        : name === 'publishedYear' || name === 'buyPrice' || name === 'rentPrice' 
          ? parseFloat(value) || 0 
          : value
    }))
  }

  const addGenre = () => {
    if (currentGenre.trim() && !genres.includes(currentGenre.trim())) {
      setGenres([...genres, currentGenre.trim()])
      setCurrentGenre('')
    }
  }

  const removeGenre = (genreToRemove: string) => {
    setGenres(genres.filter(genre => genre !== genreToRemove))
  }

  const handleGenreKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addGenre()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const updatedBook: Book = {
      ...book,
      ...formData,
      genres
    }

    onBookUpdated(updatedBook)
  }

  return (
    <div className="book-form-container">
      <div className="book-form-header">
        <button className="btn btn-secondary" onClick={onCancel}>
          <ArrowLeft size={16} />
          Back to Books
        </button>
        <h2>Edit Book</h2>
      </div>

      <div className="book-form-content">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Book Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter book name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
              />
              {errors.author && <span className="error-text">{errors.author}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="condition">Condition</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
              >
                <option value="new">New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="publisher">Publisher *</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                placeholder="Enter publisher name"
              />
              {errors.publisher && <span className="error-text">{errors.publisher}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="listerBy">Listed By *</label>
              <input
                type="text"
                id="listerBy"
                name="listerBy"
                value={formData.listerBy}
                onChange={handleInputChange}
                placeholder="Enter lister name"
              />
              {errors.listerBy && <span className="error-text">{errors.listerBy}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="isbn">ISBN *</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                placeholder="Enter ISBN (e.g., 978-0-123456-78-9)"
              />
              {errors.isbn && <span className="error-text">{errors.isbn}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="publishedYear">Published Year</label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleInputChange}
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="buyPrice">Buy Price ($) *</label>
              <input
                type="number"
                id="buyPrice"
                name="buyPrice"
                value={formData.buyPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
              {errors.buyPrice && <span className="error-text">{errors.buyPrice}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rentPrice">Rent Price ($) *</label>
              <input
                type="number"
                id="rentPrice"
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
              />
              {errors.rentPrice && <span className="error-text">{errors.rentPrice}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="genres">Genres</label>
              <div className="genres-input-container">
                {genres.length > 0 && (
                  <div className="genres-tags">
                    {genres.map((genre, index) => (
                      <div key={index} className="genre-tag-input">
                        {genre}
                        <button
                          type="button"
                          className="remove-genre"
                          onClick={() => removeGenre(genre)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  id="genres"
                  value={currentGenre}
                  onChange={(e) => setCurrentGenre(e.target.value)}
                  onKeyPress={handleGenreKeyPress}
                  placeholder="Type a genre and press Enter"
                  onBlur={addGenre}
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="coverImage">Cover Image URL</label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="Enter cover image URL"
              />
            </div>
          </div>

          <div className="form-actions">
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isVisible"
                  checked={formData.isVisible}
                  onChange={handleInputChange}
                />
                <span className="checkbox-text">Make book visible to users</span>
              </label>
            </div>
            <div className="action-buttons">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Save size={16} />
                Update Book
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBook
