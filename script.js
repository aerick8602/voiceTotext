document.addEventListener('DOMContentLoaded', () => {
    const clickToConvertButton = document.getElementById('click_to_convert');
    const convertText = document.getElementById('convert_text');

    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
        alert('Your browser does not support Speech Recognition. Please use Google Chrome or another supported browser.');
        return;
    }

    clickToConvertButton.addEventListener('click', () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.addEventListener('result', e => {
            const transcript = Array.from(e.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            convertText.value = transcript;
        });

        recognition.addEventListener('error', e => {
            alert(`Speech Recognition Error: ${e.error}`);
        });

        recognition.addEventListener('end', () => {
            clickToConvertButton.disabled = false;
            clickToConvertButton.textContent = 'Voice to Text';
        });

        clickToConvertButton.disabled = true;
        clickToConvertButton.textContent = 'Listening...';
        recognition.start();
    });
});
