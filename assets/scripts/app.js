window.addEventListener('DOMContentLoaded', () => {
    // todo
    // Get all snippets
    // Generate content based on the json
    const brixSnippets = document.querySelectorAll('.brix');

    brixSnippets.forEach(_el => {
        let el_data = _el.getAttribute('data');
        let is_valid_data = false;
        try {
            el_data = JSON.parse(el_data)
            is_valid_data = true;
        } catch (err) {
            console.error('Section error:', err.message);
            // Skip if data is not a valid JSON
            return;
        }

        // HTML structure
        let html_structure = `
    <div class="text-center my-5">
        <div class="subtitle text-uppercase text-primary">Our features</div>
        <div class="color-neutral-800">
            <h2 class="display-6 fw-bold">Simple, yet powerful features</h2>
        </div>
    </div>
    <div class="tab-section d-flex position-relative">
        <div class="tab-menu">
            <ul class="nav flex-column">
            </ul>
        </div>
        <div class="card">
            <div class="card-body p-4 p-md-5">
                <div class="mb-3 mt-4">
                    <h3 class="card-title fw-bold">Mobile app</h4>
                </div>
                <div class="mb-5">
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipiscing elit sem amet amet amet sit amet urna risus pretium enim cursus nullam aliquet luctus nunc porttitor volutpat.</p>
                </div>
                <div class="card-bottom">
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    </div>
    `;

        // create HTML container and append the html structure
        const container = document.createElement('div');
        container.innerHTML = html_structure.trim();
        container.classList.add('container');

        // set active
        let current_active = _el.getAttribute('active');
        if (!current_active) {
            const default_active = 0;
            _el.setAttribute('active', default_active);
            current_active = default_active;
        }

        // Map all data
        if (is_valid_data) {
            for (const [index, data] of el_data.entries()) {
                const li = document.createElement('li');
                li.classList.add('nav-item');
                li.innerHTML = `
                <a class="nav-link${index == current_active ? ' active' : ''}" aria-current="page" href="#">
                <div class="icon text-primary"><i class="${data.icon}" aria-hidden="true"></i></div>
                <div class="ms-3 fw-bold text-dark">${data.title}</div>
                </a>`;
                // navigation menu
                const navigation = container.querySelector('.nav')
                navigation.appendChild(li);
                if (index == current_active) {
                    // card
                    const card = container.querySelector('.card');
                    // card title
                    const cardTitle = card.querySelector('.card-title');
                    cardTitle.innerText = data.title;
                    // card text
                    const cardText = card.querySelector('.card-text');
                    cardText.innerText = data.content;
                    // card image
                    const cardImg = card.querySelector('.card-bottom img');
                    cardImg.src = data.image;
                    cardImg.alt = data.image;
                }
            }
            _el.appendChild(container);

        }

        function updateCardData(brix, index) {
            // Todo: update dynamically
        }
    });
})