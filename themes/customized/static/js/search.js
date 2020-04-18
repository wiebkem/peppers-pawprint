// define globale variables
var idx, searchInput, searchResults = null
var documents = []

function renderSearchResults(results) {

    if (results.length > 0) {

        // show max 10 results
        if (results.length > 9){
            results = results.slice(0,10)
        }

        // reset search results
        searchResults.innerHTML = ''

        // append results
        results.forEach(result => {
        
            // create result item
            var item = document.createElement('div');
            item.className = "col-xs-12 col-sm-12 col-md-6";
            item.innerHTML = `
            <div class="post">
                <p class="post-header-title"><a href="${result.ref}" title="">${documents[result.ref].title}</a></p>
                <div class="post-header">
                    <time class="date" datetime="2014-01-14T11:24">${documents[result.ref].date}</time>
                    <div class="custom-line">
                        <div id="hexagon"></div>
                    </div>
                </div>

                <a href="${result.ref}" title="">
                    <div class="post-image">
                        <img src="${documents[result.ref].imageUrl}" alt="post-image" title="post-image">
                    </div>
                </a>
                
                <div class="post-description">
                    <a href="${result.ref}" title="">${documents[result.ref].description}</a>
                </div>
                <div class="post-button">
                    <a href="${result.ref}" class="button">${documents[result.ref].buttonText}</a>
                </div>
            </div>
            `
            searchResults.appendChild(item);
        })

    // if results are empty
    } else {
        searchResults.innerHTML = `
        <div class="col-xs-12 col-sm-12 col-md-6">
            <h2>${noSearchResults}</h2>
        </div>
        `
    }
}

function registerSearchHandler() {
    // register on input event
    searchInput.oninput = function(event) {

        // remove search results if the user empties the search input field
        if (searchInput.value == '') {
            
            searchResults.innerHTML = ''
        } else {
            
            // get input value
            var query = event.target.value

            // run fuzzy search
            var results = idx.search(query + '*')

            // render results
            renderSearchResults(results)
        }
    }
}

window.onload = function() {

    // get dom elements
    searchInput = document.getElementById('search-input')
    searchResults = document.getElementById('search-results')

    var currentLanguage = $('html').attr('lang');
    var fetchUrl = "/" + currentLanguage + "/blog/index.json";

    // request and index documents
    fetch(fetchUrl, {
        method: 'get'
    }).then(
        res => res.json()
    ).then(
        res => {

            // index document
            idx = lunr(function() {
                this.ref('url')
                this.field('title')
                this.field('date')
                this.field('imageUrl')
                this.field('description')
                this.field('content')
                this.field('buttonText')

                res.forEach(function(doc) {
                    this.add(doc)
                    documents[doc.url] = {
                        'title': doc.title,
                        'date': doc.date,
                        'imageUrl': doc.imageUrl,
                        'description': doc.description,
                        'content': doc.content,
                        'buttonText': doc.buttonText,
                    }
                }, this)
            })

            // data is loaded, next register handler
            registerSearchHandler()
        }
    ).catch(
        err => {
            searchResults.innerHTML = `<p>${err}</p>`
        }
    )
}
