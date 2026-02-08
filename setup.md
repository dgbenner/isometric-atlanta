# Environment Setup

## Overview

This project has four main phases, each with different tool requirements:

| Phase | Where it runs | What you need |
|-------|--------------|---------------|
| 1. Rendering | Local (VS Code) | Node.js, browser, Google Maps API key |
| 2. Training | Cloud (oxen.ai) | oxen.ai account, ~$12 |
| 3. Generation | Cloud GPU (RunPod) | RunPod account, GPU credits |
| 4. Viewing | Local or hosted | Python (Flask) or static hosting |

## Local Setup

### Prerequisites

- **macOS** (confirmed working)
- **Python 3.10+**: Check with `python3 --version`
- **Node.js 18+**: Check with `node --version`, install from https://nodejs.org if needed
- **VS Code** with Claude Code extension
- **Git**: Check with `git --version`

### Install

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/isometric-atlanta.git
cd isometric-atlanta

# Create Python virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Copy config and add your API keys
cp config.example.py config.py
```

## Accounts You'll Need

### 1. Google Cloud (for 3D Tiles API)

See [google_maps_api.md](google_maps_api.md) for detailed instructions.

- Sign up at https://console.cloud.google.com
- Enable the **Map Tiles API**
- Create an API key
- There's a free tier that should cover initial testing

### 2. oxen.ai (for model fine-tuning)

- Sign up at https://oxen.ai
- This is where you'll upload your training pairs and fine-tune Qwen/Image-Edit
- Cost: ~$12 per fine-tuning run (~4 hours)

### 3. RunPod (for tile generation)

- Sign up at https://runpod.io
- Add GPU credits ($20-50 should be plenty for downtown Atlanta)
- You'll use this to run the fine-tuned model across all your tiles
- Alternative: Vast.ai, Lambda, or any NVIDIA GPU cloud

## Workflow in VS Code

The recommended workflow is to use **Claude Code** as your primary development partner:

1. **Open the repo in VS Code**
2. **Use Claude Code** to build and iterate on each phase
3. **Work through one phase at a time** â don't skip ahead

### Phase order:

```
renderer/README.md â training/README.md â generator/README.md â viewer/README.md
```

Each phase has its own README with specific instructions. Claude Code can help you build out the actual implementation code in each directory â the repo structure is set up as a scaffold for you to fill in.

### Tips for working with Claude Code on this project

- Keep each phase in a separate Claude Code conversation ("agent") for focused context
- Test with a small number of tiles (4-9) before scaling up
- Save working code frequently with descriptive git commits
- The renderer and viewer are web-based (HTML/JS) â use VS Code's Live Server extension to preview

## Estimated Costs

| Item | Cost |
|------|------|
| Google Maps 3D Tiles API | Free tier likely sufficient, then ~$5-10 |
| oxen.ai fine-tuning (per style) | ~$12 |
| RunPod GPU for generation | ~$10-30 depending on tile count |
| **Total for first style** | **~$30-50** |
| **Each additional style** | **~$20-40** |

## Estimated Timeline

- **Week 1**: Set up renderer, capture test tiles, learn the pipeline
- **Week 2**: Create training pairs, fine-tune model, test generation
- **Week 3**: Scale generation to full downtown area, fix edge cases
- **Week 4**: Build viewer, polish, deploy

This is flexible â the actual development time depends on how much iteration you need on the training pairs and edge case fixes.
