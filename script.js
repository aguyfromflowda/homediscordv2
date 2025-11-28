document.addEventListener('DOMContentLoaded', () => {
    // Entrance page logic
    const infoButton = document.getElementById('infoButton');
    const enterSection = document.getElementById('enterSection');
    const cartiAudio = document.getElementById('cartiAudio');

    if (infoButton && enterSection) {
        infoButton.addEventListener('click', () => {
            if (cartiAudio) {
                // Try to play background music after user interaction
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
});
