# AI Research Gap Discovery Engine

An full-stack web application that helps researchers identify gaps in existing literature. Upload a research paper (PDF), and the system extracts keywords, finds related work via Semantic Scholar, and uses an LLM to generate a structured gap-analysis report.

## Features

- **PDF upload & text extraction** — Parse research papers and extract full text using PyMuPDF
- **Keyword extraction** — Automatically identify key topics with KeyBERT
- **Related paper search** — Fetch similar papers from the Semantic Scholar API
- **AI-powered gap analysis** — Generate structured reports via OpenRouter (free model)
- **User authentication** — Register, login, and JWT-based session management
- **Dashboard** — View stats, keyword frequency charts, and recent reports
- **Report history** — Browse, search, and delete past analyses
- **Markdown reports** — Rendered AI output with sections for summary, gaps, limitations, and future directions

## How It Works

```
Upload PDF → Extract Text → Extract Keywords → Search Semantic Scholar → LLM Analysis → Save & Display Report
```

1. User uploads a PDF research paper
2. Text is extracted and keywords are identified
3. Top keywords are used to query Semantic Scholar for related papers
4. The uploaded text, keywords, and related papers are sent to an LLM
5. A Markdown report is generated and stored in MongoDB
6. Results appear on the Upload page, Dashboard, and History

## Tech Stack

| Layer      | Technologies                                      |
|------------|---------------------------------------------------|
| Frontend   | React 19, TypeScript, Vite, Tailwind CSS, Recharts |
| Backend    | FastAPI, Python                                   |
| Database   | MongoDB Atlas (Motor async driver)                |
| AI / NLP   | OpenRouter API, KeyBERT                           |
| External   | Semantic Scholar Graph API                        |
| Auth       | JWT (python-jose), bcrypt (passlib)               |

## Project Structure

```
research-gap-discovery-engine/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI app entry point
│       ├── database/            # MongoDB connection
│       ├── routers/             # API route handlers
│       ├── schemas/             # Pydantic models
│       ├── security/            # JWT middleware
│       └── services/            # PDF, keywords, LLM, auth logic
├── frontend/
│   └── src/
│       ├── pages/               # Login, Register, Upload, Dashboard, History, Profile
│       ├── components/          # Navbar, FileUpload, ReportCard, Loading
│       └── services/            # Axios API client
└── README.md
```

## Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.10+
- **MongoDB Atlas** cluster (or local MongoDB)
- **OpenRouter API key** — [openrouter.ai](https://openrouter.ai/)
- **Semantic Scholar API key** (optional, improves rate limits)

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# MongoDB
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
DATABASE_NAME=research_gap_db

# JWT
JWT_SECRET_KEY=your-secret-key-here

# OpenRouter (required for AI reports)
OPENROUTER_API_KEY=sk-or-v1-...

# Semantic Scholar (optional)
SEMANTIC_SCHOLAR_API_KEY=your-key-here
```

## Setup

### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

# Install dependencies
pip install fastapi uvicorn motor python-dotenv passlib[bcrypt] python-jose pydantic requests pymupdf keybert email-validator

# Start the server
uvicorn app.main:app --reload --port 8000
```

API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### Frontend

```bash
cd frontend

npm install
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

## API Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | `/auth/register`  | Register a new user                  |
| POST   | `/auth/login`     | Login and receive JWT token          |
| POST   | `/upload/pdf`     | Upload PDF and generate full report  |
| POST   | `/analyze/`       | Analyze text with keywords & papers  |
| POST   | `/keywords/`      | Extract keywords from text           |
| GET    | `/search/`        | Search papers on Semantic Scholar    |
| GET    | `/reports/`       | List all saved reports               |
| DELETE | `/reports/{id}`   | Delete a report                      |
| GET    | `/dashboard/`     | Dashboard stats and keyword chart    |
| GET    | `/profile/`       | User profile information             |

## Usage

1. Start the backend (`uvicorn`) and frontend (`npm run dev`)
2. Open [http://localhost:5173](http://localhost:5173) and register an account
3. Log in and go to **Upload Paper**
4. Select a PDF and click **Analyze**
5. Review the generated report with:
   - Executive Summary
   - Existing Research
   - Research Gaps
   - Limitations
   - Future Research Directions
   - Novel Research Ideas
6. View aggregated stats on the **Dashboard** or browse past reports in **History**

## AI Report Sections

Each analysis produces a Markdown report covering:

- **Executive Summary** — High-level overview of the paper
- **Existing Research** — Context from related literature
- **Research Gaps** — Unexplored or under-studied areas
- **Limitations** — Weaknesses in current approaches
- **Future Research Directions** — Suggested next steps
- **Novel Research Ideas** — Original angles for new work

## License

This project is for educational and research purposes.

