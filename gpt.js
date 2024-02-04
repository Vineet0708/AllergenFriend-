const axios = require('axios');

const apiKey = "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";
const food = "grilled chicken";

async function getIngredients(food) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo-1106",
                messages: [{ role: "user", content: "list only ingredients for " + food + " in one python parsable string with only ingredients and commas. include common allergens, be sure to include all possibilities" }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const choice = response.data.choices[0];
        if (choice && choice.message && choice.message.content) {
            const text = choice.message.content;
            const ingredients = text.trim().split(", ");
            return ingredients;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

async function main() {
    const ingredients = await getIngredients(food);
    if (ingredients) {
        console.log(ingredients);
    } else {
        console.log("Failed to retrieve ingredients.");
    }
}

main();
