# RajniKanth

# Flask + Gemini AI + Cloud SQL Project

This is a simple web application that uses Flask to handle POST requests, generates AI responses using Google's Gemini model via the **Generative AI API**, and stores user queries and AI responses in a **PostgreSQL database** hosted on **Google Cloud SQL**.

## Features

- **AI Response Generation**: Uses Google's Gemini API to generate responses based on user queries.
- **Cloud SQL Integration**: Stores user queries and AI responses in a PostgreSQL database.
- **Dockerized**: The application is Dockerized for easy deployment to Google Cloud Run.
- **Cloud SQL Connector**: Secure connection to Cloud SQL using Google’s Cloud SQL Connector.

## Prerequisites

Before running or deploying the application, ensure you have the following prerequisites:

- **Python 3.9+**
- **Google Cloud Account**
- **Google Cloud Project**
- **Cloud SQL PostgreSQL Database**
- **Google Generative AI API Key** for accessing the Gemini model.
  
## Getting Started

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/flask-gemini-cloudsql.git
cd flask-gemini-cloudsql
```

### 2. Set Up Environment Variables

You can set your environment variables either in the `.env` file for local development or through the Google Cloud Console for cloud deployment.

Create a `.env` file (add this file to `.gitignore` to keep sensitive info secure):

```bash
GENAI_API_KEY=your-gemini-api-key
DB_PASSWORD=your-db-password
```

Replace `your-gemini-api-key` and `your-db-password` with your actual API key and database password.

### 3. Install Dependencies

Create a Python virtual environment and install the required dependencies:

```bash
python3 -m venv venv
source venv/bin/activate   # For Linux/macOS
# OR
venv\Scripts\activate      # For Windows

pip install -r requirements.txt
```

### 4. Set Up Cloud SQL (Google Cloud SQL)

1. Set up a **PostgreSQL** instance in Google Cloud SQL.
2. Create a database named `ai_responses` and set up a table to store queries and responses:

```sql
CREATE TABLE user_queries (
    id SERIAL PRIMARY KEY,
    user_query TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

3. Allow your application to access Cloud SQL using the Cloud SQL Connector or by configuring the appropriate IAM roles.

### 5. Run the Application Locally

Run the Flask application locally for development:

```bash
python app.py
```

The app will run on `http://127.0.0.1:5000`.

### 6. Dockerize the Application (For Deployment)

If you're deploying to **Google Cloud Run** or another containerized service, use the provided `Dockerfile` to build the container image.

Build the Docker image:

```bash
docker build -t flask-gemini-cloudsql .
```

Run the Docker container locally (optional):

```bash
docker run -p 8080:8080 flask-gemini-cloudsql
```

### 7. Deploy to Google Cloud Run

1. **Build the container image**:

```bash
gcloud builds submit --tag gcr.io/your-project-id/flask-gemini-cloudsql
```

2. **Deploy the container to Google Cloud Run**:

```bash
gcloud run deploy --image gcr.io/your-project-id/flask-gemini-cloudsql --platform managed --region us-central1 --allow-unauthenticated
```

Make sure to replace `your-project-id` with your actual Google Cloud project ID.

## Endpoints

### `/generate-response` (POST)

This endpoint accepts a JSON payload containing a query and returns an AI-generated response using the Gemini model. The query and response are also stored in the PostgreSQL database.

#### Request Body:

```json
{
  "query": "What is the weather today?"
}
```

#### Response Body:

```json
{
  "response": "The weather today is sunny with a high of 25°C."
}
```

### Error Responses

- If no query is provided:

```json
{
  "error": "Query is required"
}
```

- If there’s an internal error:

```json
{
  "error": "Internal server error"
}
```

## Additional Information

### Cloud SQL Integration

This application uses **Google Cloud SQL** for storing user queries and responses. The **Cloud SQL Connector** is used to securely connect to the Cloud SQL database without exposing credentials.

For deployment, ensure that you configure Cloud Run or App Engine with the necessary IAM roles to access Cloud SQL.

### Security Considerations

- **API Keys**: Store sensitive information like API keys and database credentials securely using **Google Secret Manager** or environment variables.
- **Database Security**: Make sure to restrict database access to only the necessary services.


