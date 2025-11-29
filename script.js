document.addEventListener('DOMContentLoaded', () => {
    // Entrance page logic
    const infoButton = document.getElementById('infoButton');
    const enterSection = document.getElementById('enterSection');
    const cartiAudio = document.getElementById('cartiAudio');

    if (infoButton && enterSection) {
        infoButton.addEventListener('click', () => {
            if (cartiAudio) {
                cartiAudio.play().catch(() => {
                    console.log('Audio play blocked or file missing. Make sure bg-music.mp3 exists or update the src.');
                });
            }
            enterSection.classList.remove('hidden');
        });
    }

    // Profile modal logic
    const profileCards = document.querySelectorAll('.profile-card');
    const modal = document.getElementById('profileModal');

    if (modal && profileCards.length > 0) {
        const modalAvatar = document.getElementById('modalAvatar');
        const modalName = document.getElementById('modalName');
        const modalAge = document.getElementById('modalAge');
        const modalLocation = document.getElementById('modalLocation');
        const modalTagline = document.getElementById('modalTagline');
        const modalClose = document.querySelector('.modal-close');
        const modalBackdrop = document.querySelector('.modal-backdrop');

        const openModal = (card) => {
            const name = card.dataset.name || '';
            const age = card.dataset.age || '';
            const location = card.dataset.location || '';
            const tagline = card.dataset.tagline || '';
            const avatar = card.dataset.avatar || '';

            modalName.textContent = name;
            modalAge.textContent = age ? age + ' years old' : '';
            modalLocation.textContent = location;
            modalTagline.textContent = tagline;
            if (avatar) modalAvatar.src = avatar;

            modal.classList.remove('hidden');
        };

        const closeModal = () => {
            modal.classList.add('hidden');
        };

        profileCards.forEach(card => {
            card.addEventListener('click', () => openModal(card));
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeModal);
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Application page logic (localStorage comments)
    const appForm = document.getElementById('applicationForm');
    const appsList = document.getElementById('applicationsList');

    const storageKey = 'homeDiscordApplications';

    const loadApplications = () => {
        if (!appsList) return;
        appsList.innerHTML = '';
        let stored = [];
        try {
            stored = JSON.parse(localStorage.getItem(storageKey)) || [];
        } catch (e) {
            stored = [];
        }
        stored.forEach(addApplicationCard);
    };

    const saveApplications = (apps) => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(apps));
        } catch (e) {
            console.log('Could not save applications to localStorage.', e);
        }
    };

    const addApplicationCard = (app) => {
        if (!appsList) return;
        const card = document.createElement('div');
        card.className = 'application-card';

        const header = document.createElement('div');
        header.className = 'application-header';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'application-name';
        nameSpan.textContent = app.name;

        const discordSpan = document.createElement('span');
        discordSpan.className = 'application-discord';
        discordSpan.textContent = app.discord;

        header.appendChild(nameSpan);
        header.appendChild(discordSpan);

        const reasonP = document.createElement('p');
        reasonP.className = 'application-reason';
        reasonP.textContent = app.reason;

        card.appendChild(header);
        card.appendChild(reasonP);

        appsList.prepend(card);
    };

    if (appForm && appsList) {
        loadApplications();

        appForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('appName').value.trim();
            const discord = document.getElementById('appDiscord').value.trim();
            const reason = document.getElementById('appReason').value.trim();

            if (!name || !discord || !reason) return;

            const newApp = { name, discord, reason, time: Date.now() };

            let existing = [];
            try {
                existing = JSON.parse(localStorage.getItem(storageKey)) || [];
            } catch (err) {
                existing = [];
            }
            existing.push(newApp);
            saveApplications(existing);
            addApplicationCard(newApp);

            appForm.reset();
        });
    }
});
