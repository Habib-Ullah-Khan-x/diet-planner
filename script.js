document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Current Date
    const today = new Date().toLocaleDateString();
    const currentDateElem = document.getElementById('current-date');
    const resDateElem = document.getElementById('res-date');
    if (currentDateElem) currentDateElem.innerText = "Today's Date: " + today;
    if (resDateElem) resDateElem.innerText = today;

    // 2. Define All Selectors Once
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const submitPasteBtn = document.getElementById('submit-paste-btn');
    
    const formSection = document.getElementById('form-section');
    const resultSection = document.getElementById('result-section');
    const pasteSection = document.getElementById('paste-section');
    const finalSection = document.getElementById('final-display-section');
    
    const aiInput = document.getElementById('ai-paste-input');
    const finalContent = document.getElementById('final-plan-content');

    // 3. Generate Plan Logic
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const fields = [
                'name', 'dob', 'gender', 'food-type', 'weight', 
                'walk', 'fat-area', 'water', 'disease', 
                'breakfast', 'lunch', 'dinner', 'late-night'
            ];

            fields.forEach(field => {
                const input = document.getElementById(field);
                if (input) {
                    const val = input.value;
                    const targetId = 'out-' + (field === 'food-type' ? 'food' : (field === 'fat-area' ? 'fat' : (field === 'breakfast' ? 'bf' : (field === 'late-night' ? 'ln' : field))));
                    const target = document.getElementById(targetId);
                    if (target) target.innerText = val || "N/A";
                }
            });

            // Update calculation summary
            document.getElementById('calc-gender').innerText = document.getElementById('gender').value;
            document.getElementById('calc-food').innerText = document.getElementById('food-type').value;
            document.getElementById('calc-weight').innerText = document.getElementById('weight').value;
            document.getElementById('calc-walk').innerText = document.getElementById('walk').value;
            document.getElementById('calc-fat-list').innerText = document.getElementById('fat-area').value;

            const birthDate = new Date(document.getElementById('dob').value);
            if (birthDate.toString() !== 'Invalid Date') {
                const age = new Date().getFullYear() - birthDate.getFullYear();
                document.getElementById('calc-age').innerText = age;
            }

            resultSection.classList.remove('hidden');
            window.scrollTo({ top: resultSection.offsetTop, behavior: 'smooth' });
        });
    }

    // 4. Copy and Navigate Logic
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = document.getElementById('copy-area').innerText;

            // Fallback Copy Method for better compatibility
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                alert("Data copied! Now paste it into the next screen.");
                
                // Navigation
                formSection.classList.add('hidden');
                resultSection.classList.add('hidden');
                pasteSection.classList.remove('hidden');
                window.scrollTo(0, 0);
            } catch (err) {
                console.error('Unable to copy', err);
            }
            document.body.removeChild(textArea);
        });
    }

    // 5. Submit Pasted Data Logic
    if (submitPasteBtn) {
        submitPasteBtn.addEventListener('click', () => {
            const pastedData = aiInput.value.trim();
            
            if (pastedData === "") {
                alert("Please paste the data before submitting.");
                return;
            }

            finalContent.innerText = pastedData;
            pasteSection.classList.add('hidden');
            finalSection.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }
});