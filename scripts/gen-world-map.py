def land(lon, lat):
    if lat > 78 or lat < -58:
        return False
    # North America
    if -168 <= lon <= -52 and 12 <= lat <= 72:
        if -105 <= lon <= -75 and 24 <= lat <= 30:
            return False
        if lon > -82 and lat < 22:
            return False
        return True
    # Central America bridge
    if -92 <= lon <= -77 and 8 <= lat <= 22:
        return True
    # South America
    if -81 <= lon <= -34 and -55 <= lat <= 12:
        return True
    # Europe
    if -12 <= lon <= 42 and 35 <= lat <= 71:
        return True
    # Africa
    if -18 <= lon <= 52 and -35 <= lat <= 37:
        return True
    # Middle East / Asia
    if 25 <= lon <= 145 and 5 <= lat <= 55:
        return True
    # Russia / North Asia
    if 40 <= lon <= 180 and 50 <= lat <= 75:
        return True
    if -180 <= lon <= -165 and 52 <= lat <= 72:
        return True
    # India / SE Asia
    if 65 <= lon <= 125 and 5 <= lat <= 35:
        return True
    # Japan
    if 129 <= lon <= 146 and 30 <= lat <= 46:
        return True
    # Australia
    if 112 <= lon <= 155 and -44 <= lat <= -10:
        return True
    # Greenland
    if -58 <= lon <= -18 and 58 <= lat <= 83:
        return True
    # UK / Iceland
    if -11 <= lon <= 2 and 49 <= lat <= 61:
        return True
    if -25 <= lon <= -12 and 63 <= lat <= 67:
        return True
    # Turkey highlight region (ensure visible)
    if 26 <= lon <= 45 and 36 <= lat <= 42:
        return True
    return False

cols, rows = 120, 60
cell_w = 1000 / cols
cell_h = 500 / rows
dots = []

for gy in range(rows):
    for gx in range(cols):
        lon = gx / (cols - 1) * 360 - 180
        lat = 90 - gy / (rows - 1) * 180
        if land(lon, lat):
            x = gx / (cols - 1) * 1000
            y = gy / (rows - 1) * 500
            dots.append((x, y))

lines = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" fill="none" aria-hidden="true">',
    '<g class="map-graticule" stroke="currentColor" fill="none" stroke-width="0.4" opacity="0.1">',
]
for i in range(1, 6):
    y = i * 500 / 6
    lines.append(f'<line x1="0" y1="{y:.1f}" x2="1000" y2="{y:.1f}"/>')
for i in range(1, 12):
    x = i * 1000 / 12
    lines.append(f'<line x1="{x:.1f}" y1="0" x2="{x:.1f}" y2="500"/>')
lines.append('</g>')
lines.append('<g class="map-dots">')
for x, y in dots:
    lines.append(
        f'<rect class="map-dot" x="{x - cell_w * 0.42:.2f}" y="{y - cell_h * 0.42:.2f}" '
        f'width="{cell_w * 0.84:.2f}" height="{cell_h * 0.84:.2f}" rx="0.6"/>'
    )
lines.append('</g>')
# Antalya ~ 30.7E, 36.9N
pin_x = (30.7133 + 180) / 360 * 1000
pin_y = (90 - 36.8969) / 180 * 500
lines.append(f'<g class="map-pin" transform="translate({pin_x:.1f}, {pin_y:.1f})">')
lines.append('<circle class="map-pulse map-pulse--2" r="6"/>')
lines.append('<circle class="map-pulse" r="6"/>')
lines.append('<circle class="map-pin-core" r="3"/>')
lines.append('</g>')
lines.append('</svg>')

out = r'c:\Users\ardai\Documents\GitHub\tierstudios.github.io\assets\img\world-map.svg'
with open(out, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
print(f'wrote {len(dots)} cells to {out}')
