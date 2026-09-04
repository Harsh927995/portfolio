import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image(output_path, portrait_path):
    W, H = 1200, 630
    # Create base canvas with deep void color
    img = Image.new('RGB', (W, H), '#0c0f0f')
    draw = ImageDraw.Draw(img)

    # 1. Atmospheric Glow Blooms
    glow_cyan = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_cyan)
    # Cyan bloom on top-left
    glow_draw.ellipse([(-100, -100), (500, 500)], fill=(0, 242, 255, 30))
    # Purple bloom on bottom-right
    glow_draw.ellipse([(700, 250), (1350, 750)], fill=(235, 178, 255, 25))
    glow_cyan = glow_cyan.filter(ImageFilter.GaussianBlur(80))
    img.paste(Image.alpha_composite(Image.new('RGBA', (W, H), (12, 15, 15, 255)), glow_cyan).convert('RGB'))
    draw = ImageDraw.Draw(img)

    # 2. Cyber Border Frame
    frame_margin = 30
    draw.rounded_rectangle(
        [(frame_margin, frame_margin), (W - frame_margin, H - frame_margin)],
        radius=20,
        outline=(255, 255, 255, 30),
        width=1
    )
    # Corner Accents
    accent_len = 25
    c_color = '#00f2ff'
    # Top-Left Corner
    draw.line([(frame_margin, frame_margin + 20), (frame_margin, frame_margin + 20 + accent_len)], fill=c_color, width=3)
    draw.line([(frame_margin + 20, frame_margin), (frame_margin + 20 + accent_len, frame_margin)], fill=c_color, width=3)
    # Bottom-Right Corner
    draw.line([(W - frame_margin, H - frame_margin - 20), (W - frame_margin, H - frame_margin - 20 - accent_len)], fill='#ebb2ff', width=3)
    draw.line([(W - frame_margin - 20, H - frame_margin), (W - frame_margin - 20 - accent_len, H - frame_margin)], fill='#ebb2ff', width=3)

    # 3. Fonts
    font_bold_path = "C:/Windows/Fonts/arialbd.ttf"
    font_reg_path = "C:/Windows/Fonts/arial.ttf"
    font_mono_path = "C:/Windows/Fonts/consola.ttf"
    if not os.path.exists(font_mono_path):
        font_mono_path = font_reg_path

    font_badge = ImageFont.truetype(font_mono_path, 13)
    font_title = ImageFont.truetype(font_bold_path, 52)
    font_subtitle = ImageFont.truetype(font_bold_path, 24)
    font_desc = ImageFont.truetype(font_reg_path, 16)
    font_tag = ImageFont.truetype(font_mono_path, 13)
    font_footer = ImageFont.truetype(font_mono_path, 14)

    # 4. Status Badge (Top-Left)
    badge_x, badge_y = 70, 70
    badge_w, badge_h = 290, 32
    draw.rounded_rectangle([(badge_x, badge_y), (badge_x + badge_w, badge_y + badge_h)], radius=16, fill='#161919', outline='#00f2ff', width=1)
    draw.ellipse([(badge_x + 14, badge_y + 11), (badge_x + 24, badge_y + 21)], fill='#00ff66')
    draw.text((badge_x + 34, badge_y + 8), "ONLINE // AVAILABLE FOR ROLES", fill='#00f2ff', font=font_badge)

    # 5. Main Title & Role
    title_y = 126
    draw.text((70, title_y), "HARSH KASHYAP", fill='#e1fdff', font=font_title)
    
    sub_y = title_y + 68
    draw.text((70, sub_y), "Software Engineer & Frontend Architect", fill='#00f2ff', font=font_subtitle)

    # 6. Description
    desc_y = sub_y + 44
    draw.text((70, desc_y), "Engineering high-performance Single Page Applications with React,", fill='#b9cacb', font=font_desc)
    draw.text((70, desc_y + 24), "Vite, modern design systems, and Generative AI foundations.", fill='#b9cacb', font=font_desc)

    # 7. Tech Stack Tags
    tags = ["React.js", "Vite", "TypeScript", "Tailwind CSS", "Python / GenAI", "Khoje Khatam"]
    tag_x, tag_y = 70, desc_y + 70
    cur_x = tag_x
    for tag in tags:
        bbox = draw.textbbox((0, 0), tag, font=font_tag)
        t_w = bbox[2] - bbox[0] + 20
        draw.rounded_rectangle([(cur_x, tag_y), (cur_x + t_w, tag_y + 28)], radius=6, fill='#141717', outline=(255, 255, 255, 40), width=1)
        draw.text((cur_x + 10, tag_y + 6), tag, fill='#e1fdff', font=font_tag)
        cur_x += t_w + 10
        if cur_x > 620:
            cur_x = tag_x
            tag_y += 36

    # 8. Bottom Footer Details
    footer_y = H - 85
    draw.text((70, footer_y), ">_ portfolio", fill='#00f2ff', font=font_footer)
    draw.text((220, footer_y), "|  github.com/Harsh927995", fill='#b9cacb', font=font_footer)
    draw.text((490, footer_y), "|  harshjha9279@gmail.com", fill='#b9cacb', font=font_footer)

    # 9. Right Column: Portrait Card
    if os.path.exists(portrait_path):
        portrait = Image.open(portrait_path).convert('RGB')
        # Target portrait dimensions
        port_w, port_h = 360, 440
        port_x = W - frame_margin - port_w - 45
        port_y = 95

        # Resize and crop portrait to fill
        aspect = portrait.width / portrait.height
        target_aspect = port_w / port_h
        if aspect > target_aspect:
            new_h = port_h
            new_w = int(new_h * aspect)
        else:
            new_w = port_w
            new_h = int(new_w / aspect)
        portrait = portrait.resize((new_w, new_h), Image.Resampling.LANCZOS)
        # Center crop
        left = (new_w - port_w) // 2
        top = 0
        portrait = portrait.crop((left, top, left + port_w, top + port_h))

        # Rounded mask for portrait
        mask = Image.new('L', (port_w, port_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle([(0, 0), (port_w, port_h)], radius=24, fill=255)

        # Outer cyber gradient frame
        frame_offset = 4
        outer_frame = Image.new('RGBA', (port_w + frame_offset * 2, port_h + frame_offset * 2), (0, 0, 0, 0))
        outer_draw = ImageDraw.Draw(outer_frame)
        outer_draw.rounded_rectangle(
            [(0, 0), (port_w + frame_offset * 2, port_h + frame_offset * 2)],
            radius=26,
            fill='#00f2ff'
        )
        img.paste(outer_frame, (port_x - frame_offset, port_y - frame_offset), outer_frame)
        img.paste(portrait, (port_x, port_y), mask)

        # Bottom badge over portrait
        pill_w, pill_h = 240, 30
        pill_x = port_x + (port_w - pill_w) // 2
        pill_y = port_y + port_h - 45
        draw.rounded_rectangle([(pill_x, pill_y), (pill_x + pill_w, pill_y + pill_h)], radius=15, fill='#0c0f0f', outline='#00f2ff', width=1)
        draw.ellipse([(pill_x + 12, pill_y + 10), (pill_x + 20, pill_y + 18)], fill='#00f2ff')
        draw.text((pill_x + 28, pill_y + 7), "DEVELOPER NODE // VERIFIED", fill='#e1fdff', font=ImageFont.truetype(font_mono_path, 11))

    # Save final composite
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img.save(output_path, format='PNG', quality=95)
    print(f"Generated social preview OG image at: {output_path}")

if __name__ == "__main__":
    current_dir = os.path.dirname(__file__)
    pub_dir = os.path.join(current_dir, "..", "public")
    out_og = os.path.join(pub_dir, "og-image.png")
    portrait_file = os.path.join(pub_dir, "harsh_portrait.jpg")
    create_og_image(out_og, portrait_file)
