document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.getElementById('imageGrid');
    const searchInput = document.getElementById('search');
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.getElementById('menu');
    const closeMenuButton = document.getElementById('closeMenu');
    const savedMenu = document.getElementById('savedMenu');
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

    // Imágenes de ejemplo
    const images = [
        { src: '1.jpg', alt: '1917', large: true },
        { src: 'furry.jpg', alt: 'Furry', large: false },
        { src: '8 mile.jpg', alt: '8 ile', large: false },
        { src: 'https://via.placeholder.com/200', alt: '', large: false },
        { src: 'https://via.placeholder.com/200', alt: '', large: false }
    ];

    function loadImages() {
        imageGrid.innerHTML = '';
        images.forEach(image => {
            const div = document.createElement('div');
            div.className = image.large ? 'grid-item large' : 'grid-item';
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            const button = document.createElement('button');
            button.className = 'save-button';
            button.textContent = 'Guardar';
            button.addEventListener('click', () => saveImage(image));
            div.appendChild(img);
            div.appendChild(button);
            imageGrid.appendChild(div);
        });
    }

    function filterImages() {
        const query = searchInput.value.toLowerCase();
        const filteredImages = images.filter(image => image.alt.toLowerCase().includes(query));
        imageGrid.innerHTML = '';
        filteredImages.forEach(image => {
            const div = document.createElement('div');
            div.className = image.large ? 'grid-item large' : 'grid-item';
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            const button = document.createElement('button');
            button.className = 'save-button';
            button.textContent = 'Guardar';
            button.addEventListener('click', () => saveImage(image));
            div.appendChild(img);
            div.appendChild(button);
            imageGrid.appendChild(div);
        });
    }

    function saveImage(image) {
        if (!savedItems.some(item => item.src === image.src)) {
            savedItems.push(image);
            localStorage.setItem('savedItems', JSON.stringify(savedItems));
            alert(`${image.alt} guardado.`);
            updateSavedMenu();
        }
    }

    function deleteImage(image) {
        savedItems = savedItems.filter(item => item.src !== image.src);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        updateSavedMenu();
    }

    function updateSavedMenu() {
        savedMenu.innerHTML = '';
        savedItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.alt;
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            img.style.width = '150px'; // Añade un estilo para reducir el tamaño de la imagen en el menú de guardados
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteImage(item));
            li.appendChild(img); // Añadir la imagen al elemento de la lista
            li.appendChild(deleteButton);
            savedMenu.appendChild(li);
        });
    }

    menuIcon.addEventListener('click', () => {
        menu.style.width = menu.style.width === '0px' || menu.style.width === '' ? '100%' : '0px';
    });

    closeMenuButton.addEventListener('click', () => {
        menu.style.width = '0px';
    });

    searchInput.addEventListener('input', filterImages);

    // Inicialmente carga las imágenes
    loadImages();
    // Inicialmente carga el menú de guardados
    updateSavedMenu();
});
