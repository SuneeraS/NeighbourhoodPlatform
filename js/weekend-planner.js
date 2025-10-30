const mealPlannerForm = document.getElementById('meal-planner-form');
const daysContainer = document.getElementById('days-container');

const daysOfWeek = ['Saturday', 'Sunday'];

daysOfWeek.forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.innerHTML = `
        <h3>${day}</h3>
        <input type="text" name="${day.toLowerCase()}" placeholder="Enter plan for ${day}" required>
    `;
    daysContainer.appendChild(dayDiv);
});

mealPlannerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(mealPlannerForm);
    const data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    try {
        const response = await fetch('/weekend-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Weekend plan saved!');
            mealPlannerForm.reset();
        } else {
            const errorText = await response.text();
            alert('Error saving plan: ' + errorText);
        }
    } catch (error) {
        console.error('Network error:', error);
        alert('Network error occurred. Please try again.');
    }
});
