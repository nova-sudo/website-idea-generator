
# Website Idea Generator

## Introduction

The **Website Idea Generator** is a full-stack web application that enables users to input a website idea (e.g., "Landing page for bakery") and generates structured website sections and detailed UI designs.

- **Frontend**: Built with **Next.js** and **Tailwind CSS**, it provides an intuitive interface for submitting ideas, viewing generated sections, and previewing HTML/CSS designs in a modal.
- **Backend**: Powered by **NestJS** and **MongoDB**, it integrates with the **Groq API** using Structured Outputs to ensure reliable JSON responses.


---

## Description

The application allows users to:

- **Submit a Website Idea**: Enter a concept (e.g., "Portfolio for a photographer") via a form on the frontend.
- **Generate Sections**: The backend uses the Groq API to generate three website sections (e.g., Hero, About, Contact), each with:
  - Name
  - Content description
  - Tailwind CSS-based HTML/CSS code
- **Generate UI Designs**: For each section, users can generate a detailed UI design with enhanced code.
- **Store Data**: Sections are saved in a **MongoDB** database for persistence.

---

## Technologies

### Frontend

- Next.js 13 (App Router)
- Tailwind CSS
- Axios

### Backend

- NestJS
- MongoDB with Mongoose
- Groq API
- @nestjs/config

### Other

- TypeScript
- UUID

---

## Project Structure

```

website-idea-generator/
├── frontend/
│   ├── components/
│   │   ├── Modal.tsx
│   │   ├── PreviewModal.tsx
│   │   ├── SectionsList.tsx
│   │   ├── SectionCard.tsx
│   │   └── UIDesignModal.tsx
│   ├── pages/
│   │   └── index.tsx
│   ├── public/
│   ├── styles/
│   │   └── globals.css
│   ├── types.ts
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
├── backend/
│   ├── src/
│   │   ├── sections/
│   │   │   ├── schemas/
│   │   │   │   └── section.schema.ts
│   │   │   ├── sections.controller.ts
│   │   │   ├── sections.service.ts
│   │   │   └── sections.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── nest-cli.json
├── mongodb/
│   └── data/

````

---

## Setup Guide

### Prerequisites

- Node.js (v18.x or higher)
- MongoDB (locally or via MongoDB Atlas)
- Groq API Key (from xAI API)
- Git

### Installation

#### Clone the Repository

```bash
git clone https://github.com/your-username/website-idea-generator.git
cd website-idea-generator
````

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=mongodb://localhost/website-ideas
```

Start MongoDB:

```bash
mongosh mongodb://localhost/website-ideas
# or
sudo systemctl start mongod
```

Start the backend:

```bash
npm run start:dev
# Server runs on http://localhost:3001
```

---

### Frontend Setup

```bash
cd ../frontend
npm install
# Optional:
npm install dompurify
npm run dev
# App runs on http://localhost:3000
```

---

## Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. Enter a website idea (e.g., "Landing page for bakery")
3. Click **Generate UI Design** → view in modal
4. Click **Preview** → view live rendering
5. Use browser dev tools to check errors

---

## Test API Endpoints

### POST `/api/sections`

```bash
curl -X POST http://localhost:3001/api/sections \
-H "Content-Type: application/json" \
-d '{"idea":"Landing page for bakery"}'
```

**Expected Response:**

```json
[
  {
    "id": "uuid1",
    "name": "Hero",
    "content": "A welcoming banner showcasing fresh baked goods.",
    "code": "<section class=\"bg-yellow-100 p-8 text-center\"><h1 class=\"text-4xl font-bold\">Welcome to Our Bakery</h1><p class=\"text-lg\">Freshly baked goods daily!</p></section>"
  }
]
```

---

### GET `/api/sections/:id/ui-design`

```bash
curl -X GET "http://localhost:3001/api/sections/123/ui-design?idea=Landing%20page%20for%20bakery§ionName=Hero"
```

**Expected Response:**

```json
{
  "description": "A vibrant hero section with a full-width background image of freshly baked bread, a bold headline in a warm font, a call-to-action button with hover effects, and a subtle overlay to enhance text readability.",
  "code": "<section class=\"relative bg-cover bg-center h-96\" style=\"background-image: url('/bakery-hero.jpg')\"><div class=\"absolute inset-0 bg-black bg-opacity-30\"></div><div class=\"relative flex flex-col items-center justify-center h-full text-center text-white\"><h1 class=\"text-5xl font-bold mb-4\">Welcome to Our Artisan Bakery</h1><p class=\"text-xl mb-6\">Discover handcrafted breads and pastries made daily.</p><a href=\"#order\" class=\"bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600\">Order Now</a></div></section>"
}
```

---

## Troubleshooting

### 404 Error

* **Cause**: Backend not running or routes misconfigured
* **Fix**:

  ```bash
  lsof -i :3001
  cd backend && npm run start:dev
  ```

Ensure:

* `main.ts` has `app.setGlobalPrefix('api')`
* Controller has `@Post()` and `@Get(':id/ui-design')`

---

### CORS Error

Ensure in `main.ts`:

```ts
app.enableCors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
});
```

---

### TypeScript Errors

* Ensure `.env` contains:

```env
MONGODB_URI=mongodb://localhost/website-ideas
```

* Test with:

```bash
cd backend && node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI);"
```

* Check for `undefined | null` issues and use type guards

---

### MongoDB Connection Issues

```bash
mongosh mongodb://localhost/website-ideas
sudo systemctl start mongod
tail -f backend/nest.log
```

---

### Preview Modal Not Rendering

* Log the API response in `index.tsx`
* Ensure HTML is valid
* Sanitize HTML:

```ts
import DOMPurify from 'dompurify';
const sanitizedCode = DOMPurify.sanitize(code);
```

---

### Groq API Errors

* Check `.env` and `sections.service.ts` for errors
* Increase `max_tokens` if JSON is truncated

---

## Contributing

Contributions are welcome!

```bash
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request.

> Ensure code follows TypeScript conventions and includes tests where applicable.

---

## License

MIT License. See `LICENSE` for details.

---

## Contact

For questions or support, contact [abdelrahmannoa76@gmail.com](mailto:abdelrahmannoa76@gmail.com) or open an issue on GitHub.

```

