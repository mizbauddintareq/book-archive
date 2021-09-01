// get data by using api
const getBookDetails = () => {
    const searchInput = document.getElementById('search-box');
    const searchValue = searchInput.value;
    searchInput.value = '';

    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBookDetails(data));
};

// display data on ui
const displayBookDetails = details => {
    const resultContainer = document.getElementById('result-container')
    resultContainer.textContent = '';
    const totalResult = document.getElementById('total-results');
    totalResult.textContent = '';
    const div = document.createElement('div');
    div.innerHTML =`
        <h1 class="text-center text-danger">Total <span class="fw-bold">${details.numFound} </span> Books Found
        Related To Your Search
        </h1>
    `;
    totalResult.appendChild(div)
    details.docs.forEach(detail => {
        const col = document.createElement('col');
        col.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${detail.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title"><span class="fw-bold">Book Name</span>: ${detail.title}</h3>
                    <h4><span class="fw-bold">Author</span>: ${detail.author_name ? detail.author_name : '<span class="text-danger">Not Found</span>'}</h4>
                    <h4><span class="fw-bold">Publisher</span>: ${detail.publisher ? detail.publisher : '<span class="text-danger">Not Found</span>'}</h4>
                    <h5 class="card-title"><span class="fw-bold">First Published On</span>: ${detail.first_publish_year ? detail.first_publish_year : '<span class="text-danger">Not Found</span>'}</h5>
                </div>
            </div>
        `;
        resultContainer.appendChild(col);
    })
};


