# Isometric Atlanta

An AI-generated isometric pixel art map of downtown Atlanta, Georgia — rendered in RollerCoaster Tycoon style using real-world 3D geometry from Google Maps.

Inspired by [Isometric NYC](https://isometric.nyc) by Andy Coenen.

## Overview

This project uses a tile-by-tile generation pipeline to convert real-world satellite imagery and 3D building geometry into isometric pixel art, styled after the aesthetic of late-90s/early-2000s games like RollerCoaster Tycoon.

### Pipeline

```
Google Maps 3D Tiles API → Orthographic Renderer → Fine-tuned Qwen/Image-Edit → Tile Assembly → Interactive Web Viewer
```

1. **Render**: Capture isometric orthographic views of downtown Atlanta from Google Maps 3D Tiles
2. **Train**: Fine-tune Qwen/Image-Edit on ~40 input/output training pairs (source render → RCT-style pixel art)
3. **Generate**: Run the model across all tiles using an infill/masking strategy for seamless edges
4. **View**: Assemble tiles into a scrollable, zoomable web map

### Style

The initial rendering style targets **RollerCoaster Tycoon** (1999) aesthetics:
- Rich 8/16-bit pixel art with detailed color depth
- Isometric 2:1 projection
- Warm palette with distinct building materials (brick, glass, concrete)
- Visible rooftop detail and street-level elements
- Charming, hand-crafted feel despite AI generation

Additional styles (Moebius, SimCity 2000, etc.) can be swapped in by retraining the model with new training pairs — the geometry pipeline is style-independent.

## Project Structure

```
isometric-atlanta/
├── README.md
├── requirements.txt
├── config.py                  # API keys, tile bounds, settings
├── renderer/
│   ├── README.md              # Setup instructions for the 3D tile renderer
│   ├── index.html             # Three.js orthographic renderer
│   └── capture.js             # Automated tile capture script
├── training/
│   ├── README.md              # How to create training pairs and fine-tune
│   ├── pairs/                 # Input/output training pairs (~40)
│   │   ├── input/             # Raw orthographic renders
│   │   └── output/            # Hand-curated RCT-style targets
│   └── prepare_dataset.py     # Format pairs for oxen.ai fine-tuning
├── generator/
│   ├── README.md              # Generation pipeline docs
│   ├── generate_tiles.py      # Main generation script with infill strategy
│   ├── database.py            # SQLite quadrant tracking
│   └── postprocess.py         # Cleanup, color correction, edge fixes
├── viewer/
│   ├── README.md              # Web viewer docs
│   ├── index.html             # Interactive map viewer
│   └── tile_server.py         # Serve tiles at multiple zoom levels
├── styles/                    # Style presets for future rendering styles
│   └── rct/
│       ├── style_guide.md     # Visual reference and rules for this style
│       └── sample_pairs/      # Example training pairs
└── docs/
    ├── setup.md               # Full environment setup guide
    ├── google_maps_api.md     # How to get and configure 3D Tiles API access
    └── area_bounds.md         # Downtown Atlanta coordinates and tile grid
```

## Coverage Area

**Downtown Atlanta** — roughly bounded by:
- North: North Avenue / Georgia Tech
- South: I-20
- East: Boulevard / Old Fourth Ward
- West: Northside Drive

Key landmarks within bounds:
- Peachtree Street corridor
- Centennial Olympic Park
- Mercedes-Benz Stadium
- State Farm Arena
- CNN Center / Omni area
- Georgia State Capitol
- Five Points MARTA station
- Woodruff Park
- AmericasMart

## Prerequisites

- Python 3.10+
- Node.js (for renderer)
- Google Cloud account with Maps 3D Tiles API enabled
- [oxen.ai](https://oxen.ai) account (for model fine-tuning)
- GPU access for tile generation (RunPod, Vast.ai, or local NVIDIA GPU)

## Getting Started

See [docs/setup.md](docs/setup.md) for full environment setup.

### Quick Start

```bash
# Clone and install
git clone https://github.com/YOUR_USERNAME/isometric-atlanta.git
cd isometric-atlanta
pip install -r requirements.txt

# Configure (add your API keys)
cp config.example.py config.py

# Steps are meant to be followed in order:
# 1. Set up renderer    → see renderer/README.md
# 2. Create training data → see training/README.md
# 3. Run generation     → see generator/README.md
# 4. Launch viewer      → see viewer/README.md
```

## Swapping Styles

The rendering style is independent of the geometry pipeline. To create a new style:

1. Create a new directory under `styles/` (e.g., `styles/moebius/`)
2. Generate ~40 new input/output training pairs
3. Fine-tune a new Qwen/Image-Edit model (~$12, ~4 hours on oxen.ai)
4. Re-run the generation pipeline with the new model
5. Same tiles, same viewer — new look

## Credits

- Pipeline approach inspired by [Isometric NYC](https://cannoneyed.com/projects/isometric-nyc) by Andy Coenen
- Built with Claude Code
- 3D geometry from Google Maps 3D Tiles API
- Model fine-tuning on [oxen.ai](https://oxen.ai)
- Style inspired by RollerCoaster Tycoon (Chris Sawyer, 1999)

## License

MIT
