# Isometric Atlanta

An AI-generated isometric pixel art map of downtown Atlanta, Georgia â rendered in RollerCoaster Tycoon style using real-world 3D geometry from Google Maps.

Inspired by [Isometric NYC](https://isometric.nyc) by Andy Coenen.

## Overview

This project uses a tile-by-tile generation pipeline to convert real-world satellite imagery and 3D building geometry into isometric pixel art, styled after the aesthetic of late-90s/early-2000s games like RollerCoaster Tycoon.

### Pipeline

```
Google Maps 3D Tiles API â Orthographic Renderer â Fine-tuned Qwen/Image-Edit â Tile Assembly â Interactive Web Viewer
```

1. **Render**: Capture isometric orthographic views of downtown Atlanta from Google Maps 3D Tiles
2. **Train**: Fine-tune Qwen/Image-Edit on ~40 input/output training pairs (source render â RCT-style pixel art)
3. **Generate**: Run the model across all tiles using an infill/masking strategy for seamless edges
4. **View**: Assemble tiles into a scrollable, zoomable web map

### Style

The initial rendering style targets **RollerCoaster Tycoon** (1999) aesthetics:
- Rich 8/16-bit pixel art with detailed color depth
- Isometric 2:1 projection
- Warm palette with distinct building materials (brick, glass, concrete)
- Visible rooftop detail and street-level elements
- Charming, hand-crafted feel despite AI generation

Additional styles (Moebius, SimCity 2000, etc.) can be swapped in by retraining the model with new training pairs â the geometry pipeline is style-independent.

## Project Structure

```
isometric-atlanta/
âââ README.md
âââ requirements.txt
âââ config.py                  # API keys, tile bounds, settings
âââ renderer/
â   âââ README.md              # Setup instructions for the 3D tile renderer
â   âââ index.html             # Three.js orthographic renderer
â   âââ capture.js             # Automated tile capture script
âââ training/
â   âââ README.md              # How to create training pairs and fine-tune
â   âââ pairs/                 # Input/output training pairs (~40)
â   â   âââ input/             # Raw orthographic renders
â   â   âââ output/            # Hand-curated RCT-style targets
â   âââ prepare_dataset.py     # Format pairs for oxen.ai fine-tuning
âââ generator/
â   âââ README.md              # Generation pipeline docs
â   âââ generate_tiles.py      # Main generation script with infill strategy
â   âââ database.py            # SQLite quadrant tracking
â   âââ postprocess.py         # Cleanup, color correction, edge fixes
âââ viewer/
â   âââ README.md              # Web viewer docs
â   âââ index.html             # Interactive map viewer
â   âââ tile_server.py         # Serve tiles at multiple zoom levels
âââ styles/                    # Style presets for future rendering styles
â   âââ rct/
â       âââ style_guide.md     # Visual reference and rules for this style
â       âââ sample_pairs/      # Example training pairs
âââ docs/
    âââ setup.md               # Full environment setup guide
    âââ google_maps_api.md     # How to get and configure 3D Tiles API access
    âââ area_bounds.md         # Downtown Atlanta coordinates and tile grid
```

## Coverage Area

**Downtown Atlanta** â roughly bounded by:
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
# 1. Set up renderer    â see renderer/README.md
# 2. Create training data â see training/README.md
# 3. Run generation     â see generator/README.md
# 4. Launch viewer      â see viewer/README.md
```

## Swapping Styles

The rendering style is independent of the geometry pipeline. To create a new style:

1. Create a new directory under `styles/` (e.g., `styles/moebius/`)
2. Generate ~40 new input/output training pairs
3. Fine-tune a new Qwen/Image-Edit model (~$12, ~4 hours on oxen.ai)
4. Re-run the generation pipeline with the new model
5. Same tiles, same viewer â new look

## Credits

- Pipeline approach inspired by [Isometric NYC](https://cannoneyed.com/projects/isometric-nyc) by Andy Coenen
- Built with Claude Code
- 3D geometry from Google Maps 3D Tiles API
- Model fine-tuning on [oxen.ai](https://oxen.ai)
- Style inspired by RollerCoaster Tycoon (Chris Sawyer, 1999)

## License

MIT
