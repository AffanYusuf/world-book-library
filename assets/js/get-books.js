function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}
  
function uniqueArray(array) {
    return array.filter(onlyUnique);
}
function fetchData() {
    fetch('https://gutendex.com/books') // Replace with your API URL
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loading-books').style.display = 'none';
            console.log('data', data);
            const dataContainer = document.getElementById('list-books');
            data.results.forEach(item => {
                if (item.title.length < 53 && item.id != 1513) {
                    const colDiv = document.createElement('div');
                    colDiv.className = 'col-md-3';

                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card card-book';

                    const img = document.createElement('img');
                    img.src = item.formats['image/jpeg']; // Change to the relevant property of your data
                    img.alt = 'Thumbnail Image';
                    img.className = 'img-raised img-fluid img-book';

                    const cardTitle = document.createElement('h4');
                    cardTitle.className = 'card-title';
                    cardTitle.textContent = item.title; // Change to the relevant property of your data

                    const cardText = document.createElement('p');
                    const genres = item.subjects.map((subject) => {
                        if (!subject.includes('--')) {
                            return subject.trim();
                        }
                        if (subject.includes('--')) {
                            return subject.split('--')[1].trim();
                        }
                    });
                    cardText.innerHTML = `
                        <strong>Authors:</strong>${item.authors[0].name.trim()}<br>
                        <strong>Genres:</strong>${uniqueArray(genres).toString()}
                    `;

                    const statusLabel = document.createElement('b');
                    statusLabel.textContent = 'Status: ';
                    const statusBadge = document.createElement('label');
                    statusBadge.className = 'badge badge-success';
                    statusBadge.textContent = 'Open'; // Change to the relevant property of your data
                    
                    const userSignIn = sessionStorage.getItem("userSignIn");
                    const buttonDiv = document.createElement('div');
                    buttonDiv.className = 'div-btn';

                    const borrowButton = document.createElement('button');
                    borrowButton.className = 'btn btn-danger btn-raised btn-borror';
                    borrowButton.textContent = 'Borrow';
                    borrowButton.style.width = '49%';

                    const readButton = document.createElement('a');
                    readButton.className = 'btn btn-info btn-raised btn-read';
                    readButton.textContent = 'Read';
                    readButton.href = item.formats['text/html'];
                    readButton.target = "_blank";
                    readButton.style.width = '49%';
                    if (!userSignIn) readButton.style.width = '100%';

                    const bookIdInput = document.createElement('input');
                    bookIdInput.type = 'hidden';
                    bookIdInput.name = 'book_id';
                    bookIdInput.id = 'book_id';
                    bookIdInput.value = item.id; // Change to the relevant property of your data

                    statusLabel.appendChild(statusBadge);
                    cardDiv.appendChild(img);
                    cardDiv.appendChild(cardTitle);
                    cardDiv.appendChild(cardText);
                    cardDiv.appendChild(statusLabel);
                    buttonDiv.appendChild(readButton);
                    if (userSignIn) buttonDiv.appendChild(borrowButton);
                    cardDiv.appendChild(buttonDiv);
                    cardDiv.appendChild(bookIdInput);
                    colDiv.appendChild(cardDiv);
                    dataContainer.appendChild(colDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

window.onload = fetchData;