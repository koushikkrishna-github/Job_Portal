from PIL import Image, ImageDraw

def crop_to_circle(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    
    # Create a circular mask
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, img.size[0], img.size[1]), fill=255)
    
    # Apply the mask
    result = Image.new("RGBA", img.size)
    result.paste(img, (0, 0), mask=mask)
    
    result.save(output_path)
    print(f"Saved circular logo to {output_path}")

if __name__ == "__main__":
    crop_to_circle(
        r"c:\Users\Sravani\Downloads\Job_Portal\Job_Portal\frontend\public\logo.png",
        r"c:\Users\Sravani\Downloads\Job_Portal\Job_Portal\frontend\public\logo-circle.png"
    )
