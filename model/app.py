from flask import Flask, jsonify, request
import openai

app = Flask(__name__)

openai.api_key = "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"

def get_ingredients(food):
    stream = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-1106",
        messages=[{"role": "system", "content": "You are a helpful assistant."},
                  {"role": "user", "content": f"list only ingredients for {food} in one python parsable string with only ingredients and commas. include common allergens, be sure to include all possibilities"}],
        stream=True,
    )

    return stream

@app.route('/get_ingredients', methods=['POST'])
def handle_get_ingredients():
    food = request.json['food']
    result = ""
    stream = get_ingredients(food)
    for part in stream:
        result += part['choices'][0]['message']['content'] or ""

    result = result.split(", ")
    result[-1] = result[-1].strip(".")  
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=False)