// spinner and toggle
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
};
const toggleSearchResult = displayStyle => {
    document.getElementById('results').style.display = displayStyle;
};

// get data by using api
const getBookDetails = () => {
    const searchInput = document.getElementById('search-box');
    const searchValue = searchInput.value;
    searchInput.value = '';

    // // toggle & spinner
    toggleSpinner('block');
    toggleSearchResult('none');

    const url = `https://openlibrary.org/search.json?q=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBookDetails(data));
};

// display data on ui
const displayBookDetails = details => {

    // error message for invalid or blank search
    const errorText = document.getElementById('error-text');
    if (details.numFound === 0){
        errorText.innerText = '';
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card text-center text-danger border-danger">
                <div class="card-header">
                    This Is An Error Alert!!!
                </div>
                <div class="card-body">
                    <h5 class="card-title">This Error Is Due To Either Blank Search Or Invalid Search.</h5>
                </div>
                <div class="card-footer text-muted">
                    Please Enter A Book Name So That We Can Help You To Find It. Thank You!!!
                </div>
            </div>`;

        errorText.appendChild(div);
        toggleSpinner('none');
        
    }

    else{
        // numbers of total results found
        errorText.innerText = '';
        const resultContainer = document.getElementById('result-container')
        resultContainer.textContent = '';
        const totalResult = document.getElementById('total-results');
        totalResult.textContent = '';
        const div = document.createElement('div');
        div.innerHTML =`
            <h2 class="text-center text-dark">Total <span class="fw-bold">${details.numFound} </span> Books Found
            Related To Your Search
            </h2>`;
    
        totalResult.appendChild(div);
        

    // shown search results by card
    details.docs.forEach(detail => {
        const col = document.createElement('col');
        col.innerHTML = `
            <div class="card h-100 shadow rounded border border-light">
                <img src="https://covers.openlibrary.org/b/id/${detail.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title"><span class="fw-bold">Book Name</span>: ${detail.title}</h3>
                    <h4><span class="fw-bold">Author</span>: ${detail.author_name ? detail.author_name : '<span class="text-danger">Not Found</span>'}</h4>
                    <h4><span class="fw-bold">Publisher</span>: ${detail.publisher ? detail.publisher : '<span class="text-danger">Not Found</span>'}</h4>
                    <h5 class="card-title"><span class="fw-bold">First Published On</span>: ${detail.first_publish_year ? detail.first_publish_year : '<span class="text-danger">Not Found</span>'}</h5>
                </div>
            </div>`;
        
            resultContainer.appendChild(col);

            // toggle & spinner
            toggleSpinner('none');
            toggleSearchResult('block');
        });
    }
};


