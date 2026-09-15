# HealthScan AI

You are an expert frontend engineer and UI/UX designer.

Create a complete, modern, responsive frontend for my college project:

PROJECT NAME:

Multimodal Disease Diagnosis Assistant

PROJECT PURPOSE:

The application allows a user to upload a chest X-ray image and enter patient symptoms and basic patient information. The frontend sends this data to a FastAPI backend, which uses a trained multimodal deep learning model to predict disease probabilities.

TECH STACK:

- React.js

- Vite

- JavaScript

- CSS

- Axios for API requests

- Do NOT use Tailwind CSS

- Use clean, well-organized reusable React components

- Use Lucide React icons if needed

BACKEND API:

The FastAPI backend runs at:

http://127.0.0.1:8000

Prediction endpoint:

POST http://127.0.0.1:8000/predict

The endpoint accepts multipart/form-data with these fields:

1. image

   - Chest X-ray image file

2. symptoms

   - Patient symptoms text

3. age

   - Patient age

4. medical_history

   - Patient medical history

Example frontend request:

const formData = new FormData();

formData.append("image", imageFile);

formData.append("symptoms", symptoms);

formData.append("age", age);

formData.append("medical_history", medicalHistory);

await axios.post(

  "http://127.0.0.1:8000/predict",

  formData,

  {

    headers: {

      "Content-Type": "multipart/form-data"

    }

  }

);

EXPECTED API RESPONSE:

{

  "success": true,

  "prediction": {

    "Cardiomegaly": 12.45,

    "Pleural Effusion": 74.21,

    "Atelectasis": 22.18,

    "Pneumonia": 8.31,

    "Pneumothorax": 3.55,

    "Edema": 19.87

  },

  "top_prediction": "Pleural Effusion",

  "message": "This result is for research/demo purposes and is not a medical diagnosis."

}

DISEASE LABELS:

- Cardiomegaly

- Pleural Effusion

- Atelectasis

- Pneumonia

- Pneumothorax

- Edema

DESIGN REQUIREMENTS:

Create a premium healthcare AI dashboard with a clean, professional and futuristic appearance.

Color theme:

- Dark navy or deep blue background

- White and light gray text

- Cyan/blue accents

- Green for safe/low probability

- Orange/red for higher probability

- Glassmorphism cards

- Soft shadows

- Rounded corners

- Smooth animations

- Professional medical dashboard style

The frontend must look like a real AI healthcare product, not a basic student form.

PAGE STRUCTURE:

1. NAVBAR

Include:

- Logo icon

- Project name: MedAI

- Navigation links:

  - Dashboard

  - Diagnosis

  - History

  - About

- A small status badge:

  "AI System Online"

2. HERO SECTION

Include:

- Heading:

  "Multimodal Disease Diagnosis Assistant"

- Subtitle:

  "Analyze chest X-rays and patient symptoms using an AI-powered diagnostic research assistant."

- Small badge:

  "AI-Powered Medical Imaging"

- Attractive medical AI illustration or abstract X-ray visual

- CTA button:

  "Start Diagnosis"

3. DIAGNOSIS WORKSPACE

Create a large two-column layout.

LEFT CARD: X-RAY UPLOAD

Features:

- Drag-and-drop upload area

- Browse files button

- Accept PNG, JPG, JPEG

- Show image preview after upload

- Show file name

- Show image size

- Remove image button

- Upload icon

- Clear validation message for invalid files

RIGHT CARD: PATIENT INFORMATION

Fields:

- Symptoms textarea

- Age number input

- Medical history textarea

- Optional gender dropdown

- Optional patient ID field

Use clean labels and helpful placeholder text.

4. ANALYZE BUTTON

Create a prominent button:

"Analyze X-ray"

When clicked:

- Validate image and symptoms

- Disable button

- Show loading state

- Display animated loader

- Show text:

  "Analyzing image and symptoms..."

- Send data to the FastAPI backend

- Display errors clearly if request fails

5. RESULTS SECTION

After receiving the API response, display a beautiful results dashboard.

Include:

A. TOP PREDICTION CARD

Show:

- "Top Prediction"

- Disease name

- Probability percentage

- Confidence-style visual indicator

- Small disclaimer that this is a research prototype

B. DISEASE PROBABILITY CARDS

Show all six diseases in a responsive grid.

Each card should include:

- Disease name

- Probability percentage

- Horizontal progress bar

- Appropriate color based on probability

- Small status label:

  - Low probability

  - Moderate probability

  - Higher probability

Use this threshold logic:

- Below 30%: Low probability

- 30% to 60%: Moderate probability

- Above 60%: Higher probability

C. VISUAL CHART

Add a horizontal bar chart or clean custom chart showing all disease probabilities.

You may use Recharts if necessary.

D. INPUT SUMMARY

Display:

- Uploaded X-ray preview

- Symptoms

- Age

- Medical history

6. EMPTY STATE

Before prediction, show an attractive empty state:

- Medical scan icon

- Text:

  "Your diagnosis results will appear here"

- Subtitle:

  "Upload a chest X-ray and enter symptoms to begin."

7. ERROR HANDLING

Handle:

- No image selected

- No symptoms entered

- Unsupported file type

- Backend unavailable

- Network error

- Invalid API response

- Prediction failure

Show user-friendly error messages.

8. RESPONSIVE DESIGN

The application must work properly on:

- Desktop

- Laptop

- Tablet

- Mobile

On mobile:

- Stack the two-column layout

- Make buttons full width

- Keep cards readable

- Avoid horizontal scrolling

9. EXTRA FEATURES

Add:

- Reset/Clear button

- Smooth scroll to results

- "New Diagnosis" button

- Animated progress bars

- Toast-style success/error messages

- Dark mode by default

- Accessible form labels

- Keyboard-friendly controls

- Proper loading states

COMPONENT STRUCTURE:

Create reusable components such as:

src/

├── components/

│   ├── Navbar.jsx

│   ├── HeroSection.jsx

│   ├── ImageUpload.jsx

│   ├── PatientForm.jsx

│   ├── AnalyzeButton.jsx

│   ├── ResultsDashboard.jsx

│   ├── PredictionCard.jsx

│   ├── ProbabilityChart.jsx

│   ├── LoadingState.jsx

│   └── Disclaimer.jsx

│

├── services/

│   └── api.js

│

├── App.jsx

├── main.jsx

└── styles/

    └── global.css

API SERVICE:

Create a separate file:

src/services/api.js

Use Axios and export a function:

predictDisease(formData)

The function should call:

http://127.0.0.1:8000/predict

APP FUNCTIONALITY:

The complete frontend must actually work:

- File upload must work

- Image preview must work

- Form validation must work

- Axios request must work

- Loading state must work

- API response must be displayed dynamically

- Probability values must be read from the API response

- Do not use hardcoded prediction results

- Do not create fake backend data

- Do not use placeholder prediction values in the final working code

IMPORTANT:

- Provide complete code for every file

- Explain where each file should be created

- Include installation commands

- Include how to run the frontend

- Include the exact backend CORS configuration required

- Make sure the code has no missing imports

- Make sure all components are connected correctly

- Use normal CSS, not Tailwind

- Do not only provide a design mockup; provide a fully functional frontend

- Keep the code beginner-friendly but professional

- Ensure the frontend works with the FastAPI API described above

The FastAPI backend must already be running at:

http://127.0.0.1:8000

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8337886f-5743-44b6-a441-8da4bdfd9cfb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
