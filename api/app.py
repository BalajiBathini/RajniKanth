from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# Configure the generative AI API key
genai.configure(api_key="AIzaSyBP4rn0V_1wAZ-9P1_uu20QwF8On2fE8tM")
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/generate-response', methods=['POST'])
def generate_response():
    # Get the user's query from the request
    data = request.get_json()
    query = data.get("query", "")

    # If no query is provided, return an error message
    if not query:
        return jsonify({"error": "Query is required"}), 400

    # Generate the AI response
    response = model.generate_content(query)

    # Return the AI-generated response
    return jsonify({"response": response.text})

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
