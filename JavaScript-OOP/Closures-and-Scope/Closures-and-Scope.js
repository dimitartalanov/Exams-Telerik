function solve() {
	var library = (function () {
		var books = [];
		var categories = [];
		function listBooks() {
			let book = arguments[0];

			if (!book) {
				return books;
			}
			if (book.category) {
				return books.filter(x => x.category === book.category);
			}
			if (book.author) {
				return books.filter(x => x.author === book.author);
			}
			book.sort((firstBook, secondBook) => {
				return firstBook.ID - secondBook.ID;
			});
			return books;
		}

		function addBook(book) {
			if (!book.title||book.title.length < 2 || book.title.length > 100) {
				throw new Error("title lenght shold be between 2 and 100")
			}
			books.forEach(b => {
				if (b.title === book.title || b.isbn === book.isbn) {
					throw new Error('Book title and ISBN should be unique!');
				}
			});
			if (!book.author) {
				throw new Error('Author should not be empty!');
			}
			if (!book.isbn || book.isbn.length !== 10 && book.isbn.length !== 13) {
				throw new Error('Book ISBN should contain 10 or 13 digits!');
			}
			//if(!(/^[a-zA-Z0-9!,. ]*$/.test(book.title))){
			//	throw new Error('Invalid symbol in titleeeeee')
			//}
//autor
			if (book.author === '') {
				throw Error('Invalid author name');
			}
			//category
			//have same category
			if (categories.indexOf(book.category) < 0) {
				categories.push(book.category);
			}
				if (book.category.length < 2 || book.category.length > 100) {
					throw new Error('Category should be between 2 and 100');
				}

			book.ID = books.length + 1;
			books.push(book);
			return book;//.map(p=>{return {title:p.title,autor:p.autor,isbn:p.isbn}});
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
