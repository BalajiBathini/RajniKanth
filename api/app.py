from flask import Flask, request, jsonify
import google.generativeai as genai

# Configure the generative AI API key
genai.configure(api_key="AIzaSyDu4_B4_k_-MSI9SW8G9ySViO3gN30lsv4")
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize the Flask app
app = Flask(__name__)

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
