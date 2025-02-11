[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-orange.svg)](../../pulls)

# OpenReader WebUI 📄🔊

OpenReader WebUI is web-based reader Text-to-Speech capabilities, offering a TTS read along experience with narration for both PDF and EPUB documents. It can use any OpenAI compatible TTS endpoint, including [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI/tree/v0.0.5post1-stable).

- 🎯 **TTS API Integration**: Compatible with OpenAI text to speech API, Kokoro FastAPI TTS, or any other compatible service; enabling high-quality voice narration
- 💾 **Local-First Architecture**: Uses IndexedDB browser storage - no server uploads required
- 🛜 **Optional Server-side documents**: Manually upload documents to the next backend for all users to download
- 🔍 **Smart Text Processing**: Splits content into sentence blocks (ePub tries to split at paragraphs)
- 📚 **EPUB Support**: Read EPUB files with table of contents and synchronized text
- 📄 **PDF Support**: Read PDF files with text extraction and page navigation
- ⚡ **Modern Tech Stack**: Built with Next.js, React, Tailwind CSS, and some Headless UI React
- 🎨 **Customizable Experience**: 
  - Set TTS API base URL (with optional API key)
  - Adjustable playback speed
  - Multiple voice options (checks `/v1/audio/voices` endpoint)
  - Multiple app layout theme options
  - Persistent user settings

## [**Demo**](https://openreader.richardr.dev/)


https://github.com/user-attachments/assets/1bfc5fc4-8d66-4c71-a3c1-f3ec5b4f4b56


## 🐳 Docker Quick Start

```bash
docker run --name openreader-webui \
  -p 3003:3003 \
  -v openreader_docstore:/app/docstore \
  richardr1126/openreader-webui:latest
```
> Note: The `openreader_docstore` volume is used to store server-side documents. You can mount a local directory instead. Or remove it if you don't need server-side documents.

Visit [http://localhost:3003](http://localhost:3003) to run the app.

### Using Docker Compose
Create or add to a `docker-compose.yml`:
```yaml
volumes:
  openreader_docstore:

services:
  openreader-webui:
    container_name: openreader-webui
    image: richardr1126/openreader-webui:latest
    ports:
      - "3003:3003"
    volumes:
      - openreader_docstore:/app/docstore
    restart: unless-stopped
```

### ⬆️ Update Docker Image
```bash
docker stop openreader-webui && docker rm openreader-webui
docker pull richardr1126/openreader-webui:latest
```

## Dev Installation

### Prerequisites
- Node.js & npm (recommended: use [nvm](https://github.com/nvm-sh/nvm))

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/richardr1126/OpenReader-WebUI.git
   cd OpenReader-WebUI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   ```bash
   cp .env.template .env
   # Edit .env with your configuration settings
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   or build and run the production server:
   ```bash
   npm run build
   npm start
   ```

   Visit [http://localhost:3003](http://localhost:3003) to run the app.

   > Dev server runs on port 3000 by default, while the production server runs on port 3003.


## 💡 Feature requests

For feature requests or ideas you have for the project, please use the [Discussions](https://github.com/richardr1126/OpenReader-WebUI/discussions) tab.

## 🙋‍♂️ Support and issues

For general questions, you can reach out to me on [Bluesky](https://bsky.app/profile/richardr.dev). If you encounter issues, please open an issue on GitHub following the template (which is very simple).

## 👥 Contributing

Contributions are welcome! Fork the repository and submit a pull request with your changes.

## ❤️ Acknowledgements

- [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI) for the API wrapper
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [react-reader](https://github.com/happyr/react-reader)
- [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) for text-to-speech

## Docker Supported Architectures
- linux/amd64 (x86_64)
- linux/arm64 (Apple Silicon)
- linux/arm/v7 (Raspberry Pi)

## Stack

- **Framework:** Next.js (React)
- **Containerization:** Docker
- **Storage:** IndexedDB (in browser db store)
- **PDF Processing:** 
  - [react-pdf](https://github.com/wojtekmaj/react-pdf)
  - [pdf.js](https://mozilla.github.io/pdf.js/)
  - [compromise](https://github.com/spencermountain/compromise): NLP library for sentence splitting
- **EPUB Processing:**
  - [react-reader](https://github.com/happyr/react-reader)
  - [epubjs](https://github.com/futurepress/epub.js/)
- **UI Components:** 
  - [Headless UI](https://headlessui.com)
  - [Tailwind CSS](https://tailwindcss.com)
- **TTS Integration:** (tested on)
  - [OpenAI API](https://platform.openai.com/docs/api-reference/text-to-speech)
  - [Kokoro FastAPI TTS](https://github.com/remsky/Kokoro-FastAPI/tree/v0.0.5post1-stable)

## License

This project is licensed under the MIT License.
