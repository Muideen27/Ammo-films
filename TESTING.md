# Ammofilms Testing Guide

This guide outlines the steps to test the Ammofilms application, covering local frontend and backend interactions, API testing with `curl` and Postman, and direct database verification.

## Local Testing

Ensure the application is running in development mode (`npm run dev`) and your Supabase environment variables are correctly configured in `.env.local`.

1.  **Test Valid Submissions**:
    - Open the application form in your browser (e.g., `http://localhost:3000/`).
    - Fill in all required fields with valid data (e.g., age >= 18, valid email, sufficient experience/motivation text).
    - Click "Submit Application".
    - **Expected Outcome**: You should see a success message on the frontend: "Application Submitted". The application data should be successfully inserted into your Supabase `applications` table.

2.  **Test Validation Errors**:
    - Open the application form in your browser.
    - Intentionally enter invalid data for various fields:
        - **Full Name**: Less than 2 characters.
        - **Age**: Less than 18 or greater than 65.
        - **Email**: An invalid email format (e.g., `test@`).
        - **Experience/Motivation**: Text shorter than the minimum required length.
    - Attempt to proceed through the form steps and submit.
    - **Expected Outcome**: The frontend should display inline validation errors for each invalid field. The form should prevent submission until all client-side validation passes. If a server-side validation error occurs (e.g., a data type mismatch not caught by client-side Zod), an error message should be displayed on the form after submission attempt.

3.  **Test Database Inserts**:
    - Perform a valid submission as described in "Test Valid Submissions".
    - **Expected Outcome**: After successful submission, verify that a new row exists in your Supabase `applications` table with the submitted data, and the `status` column defaults to `new`.

## API Testing

You can test the `/api/apply` endpoint directly using tools like `curl` or Postman.

### using curl

Replace `http://localhost:3000` with your local development server address or your production domain.

#### Valid Submission

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "age": 25,
    "city": "New York",
    "state": "NY",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "experience": "Experienced in content creation and streaming for 3 years.",
    "motivation": "Passionate about building a global streaming career with Ammofilms."
  }' \
  http://localhost:3000/api/apply
```

**Expected Response (Status: 201 Created)**:
```json
{
  "success": true,
  "message": "Application received successfully."
}
```

#### Invalid Submission (Example: Missing `fullName`)

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "age": 25,
    "city": "New York",
    "state": "NY",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "experience": "Experienced in content creation and streaming for 3 years.",
    "motivation": "Passionate about building a global streaming career with Ammofilms."
  }' \
  http://localhost:3000/api/apply
```

**Expected Response (Status: 400 Bad Request)**:
```json
{
  "error": "Validation failed",
  "details": {
    "fieldErrors": {
      "fullName": [
        "Full name must be at least 2 characters"
      ]
    }
  }
}
```

### using Postman

1.  **Create a New Request**: Open Postman and create a new HTTP Request.
2.  **Method**: Set to `POST`.
3.  **URL**: Enter `http://localhost:3000/api/apply` (or your production URL).
4.  **Headers**: Add a header `Content-Type: application/json`.
5.  **Body**: Select `raw` and `JSON` from the dropdown. Then, paste your JSON payload.
    - **For Valid Submission**: Use the JSON from the `curl` example above.
    - **For Invalid Submission**: Modify the JSON (e.g., remove a required field, provide invalid data).
6.  **Send Request**: Click "Send" and observe the response status and body.

## Database Verification

To confirm that submissions are correctly recorded, you can directly inspect your Supabase database.

1.  **Access Supabase Dashboard**: Go to your [Supabase Dashboard](https://app.supabase.com/).
2.  **Navigate to Table Editor**: Select your project, then go to "Table Editor" in the left sidebar.
3.  **Select `applications` table**: Find and click on the `applications` table.
4.  **Verify Records**: You should see new rows corresponding to your successful form submissions, including all the submitted data and the `status` defaulting to `new`.
