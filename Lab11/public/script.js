(function($){
    
    function displayDataForURL(url) {
        let requestConfig = {
            url: url,
            beforeSend: (currentText)=> { currentText.overrideMimeType("text/plain");}
        }
        $.ajax(requestConfig).then(function (allShows) {
            let showArea = $('#show');
            let showListArea = $('#showList');
            showArea.hide();
            showListArea.show();
            let showData = JSON.parse(allShows);
            let current = 0;
            while(current < showData.length){
                let nameOfShow = showData[current].name;
                let hrefURL = showData[current]._links.self.href;
                let currentList = `<li> <a href= ${hrefURL}>  ${nameOfShow} </a></li>`;
                showListArea.append(currentList);
                current++;
            }
        });
    }
    
    $(document).on('click', "#showList a", function (event) {
        event.preventDefault();
        let showArea = $('#show');
        let showListArea = $('#showList');
        let homeLink = $("#homeLink");
        let clickedShow = $(this);
        let URLclickedShow = clickedShow.attr('href');
        let requestConfig = {
            url: URLclickedShow,
            beforeSend: (currentText)=> { currentText.overrideMimeType("text/plain");}
        }
        $.ajax(requestConfig).then(function (currentShow) {
            let showData = JSON.parse(currentShow);
            showListArea.hide();
            showListArea.html("");
            homeLink.show();
            showArea.show();

            let showName, showImage, showGenres, showLanguage, showRating, showSummary, showNetwork;
            if(showData.name)  showName = showData.name;
            else  showName = "N/A"
            
            if(showData.image === null || showData.image.medium=== null)  showImage = '/public/no_image.jpeg'
            else  showImage = showData.image.medium;

            if(showData.genres.length === 0)  showGenres = "N/A";
            else{
                showGenres=""
                for (i = 0; i < showData.genres.length; i++) 
                    showGenres = showGenres + '<li>' + showData.genres[i] + '</li>'; 
            }

            if(showData.language)  showLanguage = showData.language;
            else  showLanguage = "N/A"

            if(showData.rating === null || showData.rating.average === null)  showRating = "N/A"
            else  showRating = showData.rating.average;

            if(showData.summary !== null)  showSummary = showData.summary;
            else  showSummary = "N/A"

            if(showData.network === null || showData.network.name === null)  showNetwork = "N/A";
            else  showNetwork = showData.network.name;

            let showAreaCode = `<h1> ${showName} </h1><img src="${showImage}"><dl><dt><h3>Language</h3></dt><dd> ${showLanguage} </dd></dl><dl><dt><h3>Genres</h3></dt><ul> ${showGenres} </ul></dl><dl><dt></dt></dd></dd></dl><div><h3>Ratings</h3><p> ${showRating} </p></div><div><h3>Summary</h3><p> ${showSummary} </p></div><div><h3>Network</h3><p> ${showNetwork} </p></div>`;
  
            showArea.append(showAreaCode);
        });
    });

    let searchForm = $('#searchForm');
    searchForm.submit(function(event) {
        event.preventDefault();
        let searchTerm = $('#search_term');
        let errorDiv = $('#errorDiv');
        let showArea = $('#show');
        let showListArea = $('#showList');
        let homeLink = $("#homeLink");
        let enteredSearchTerm = searchTerm.val().trim();
        if(enteredSearchTerm === null || enteredSearchTerm.trim() === '' || enteredSearchTerm === undefined){
            errorDiv.html("");
            showListArea.hide();
            showListArea.html("");
            showArea.html("");
            homeLink.show();
            errorDiv.show();
            errorDiv.append('<p>Please give a valid data !!</p>');
            return 0;
        }
        showArea.html("");
        errorDiv.hide();
        showArea.hide();
        homeLink.show();

        let requestConfig = {
            url: `https://api.tvmaze.com/search/shows?q= ${enteredSearchTerm}`,
            beforeSend: (currentText)=> { currentText.overrideMimeType("text/plain");}
        }
        $.ajax(requestConfig).then(function (searchedShows) {
            showListArea.show();
            showListArea.html("");
            homeLink.show();
            showArea.hide();
            let showData = JSON.parse(searchedShows);

            let current = 0;
            
            while(current < showData.length){
                let nameOfShow = showData[current].show.name;
                let hrefURL = showData[current].show._links.self.href;
                var currentList =  `<li> <a href= ${hrefURL}>  ${nameOfShow} </a></li>`;
                showListArea.append(currentList);
                current++;
            }
        });
    })

    displayDataForURL("https://api.tvmaze.com/shows");
})(window.jQuery);
