#!/usr/bin/env python3
"""Generate IDG-inspired concentric ring PWA icons (no external deps)."""
import struct
import zlib
from pathlib import Path

COLORS = [
    (0x66, 0x1A, 0x30),  # acting outer
    (0xFF, 0x7E, 0x2A),
    (0xEF, 0x41, 0x36),
    (0xE5, 0x85, 0xA1),
    (0xD4, 0xB8, 0x8C),  # being inner
]
BG = (0xFA, 0xF7, 0xF5)


def png_chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def write_png(path: Path, width: int, height: int, rgba_rows: list[bytes]) -> None:
    raw = b"".join(b"\x00" + row for row in rgba_rows)
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    data = b"\x89PNG\r\n\x1a\n" + png_chunk(b"IHDR", ihdr) + png_chunk(b"IDAT", zlib.compress(raw, 9)) + png_chunk(b"IEND", b"")
    path.write_bytes(data)


def draw_rings(size: int, pad_ratio: float = 0.08, bg=None) -> list[bytes]:
    rows = []
    cx = cy = size / 2
    max_r = (size / 2) * (1 - pad_ratio)
    radii = [max_r * (1 - i * 0.18) for i in range(5)]
    for y in range(size):
        row = bytearray()
        for x in range(size):
            dx = x + 0.5 - cx
            dy = y + 0.5 - cy
            dist = (dx * dx + dy * dy) ** 0.5
            color = bg
            for i, r in enumerate(radii):
                if dist <= r:
                    color = COLORS[i]
            if color is None:
                row.extend((0, 0, 0, 0))
            else:
                row.extend((*color, 255))
        rows.append(bytes(row))
    return rows


def draw_maskable(size: int) -> list[bytes]:
    # Safe zone: draw rings smaller on light grey background
    rows = []
    cx = cy = size / 2
    max_r = size * 0.36
    radii = [max_r * (1 - i * 0.18) for i in range(5)]
    for y in range(size):
        row = bytearray()
        for x in range(size):
            dx = x + 0.5 - cx
            dy = y + 0.5 - cy
            dist = (dx * dx + dy * dy) ** 0.5
            color = BG
            for i, r in enumerate(radii):
                if dist <= r:
                    color = COLORS[i]
            row.extend((*color, 255))
        rows.append(bytes(row))
    return rows


out = Path(__file__).resolve().parent.parent / "public" / "icons"
out.mkdir(parents=True, exist_ok=True)
pub = out.parent

write_png(out / "icon-192.png", 192, 192, draw_rings(192))
write_png(out / "icon-512.png", 512, 512, draw_rings(512))
write_png(out / "icon-maskable-512.png", 512, 512, draw_maskable(512))
write_png(out / "apple-touch-icon.png", 180, 180, draw_rings(180, pad_ratio=0.06))
write_png(pub / "favicon.png", 32, 32, draw_rings(32, pad_ratio=0.05))
print("Wrote icons to", out)
