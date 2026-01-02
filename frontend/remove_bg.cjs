const { Jimp } = require('jimp');
const path = require('path');

async function main() {
    const inputFile = path.join(__dirname, 'public', 'logo.png');
    const outputFile = path.join(__dirname, 'public', 'logo-transparent.png');

    try {
        console.log('Reading image from:', inputFile);
        const image = await Jimp.read(inputFile);

        console.log('Removing white background...');

        // Scan all pixels
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const red = this.bitmap.data[idx + 0];
            const green = this.bitmap.data[idx + 1];
            const blue = this.bitmap.data[idx + 2];

            // Threshold for "White" (240-255)
            if (red > 240 && green > 240 && blue > 240) {
                this.bitmap.data[idx + 3] = 0; // Set Alpha to 0 (Transparent)
            }
        });

        console.log('Saving to:', outputFile);
        await image.write(outputFile);
        console.log('Success!');

    } catch (error) {
        console.error('Main import failed, trying fallback...');
        // Fallback for older Jimp (common issue)
        try {
            const OldJimp = require('jimp');
            const img = await OldJimp.read(inputFile);

            img.scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
                const r = this.bitmap.data[idx + 0];
                const g = this.bitmap.data[idx + 1];
                const b = this.bitmap.data[idx + 2];
                if (r > 240 && g > 240 && b > 240) {
                    this.bitmap.data[idx + 3] = 0;
                }
            });

            await img.writeAsync(outputFile);
            console.log('Success with fallback!');
        } catch (err2) {
            console.error('All attempts failed:', err2);
        }
    }
}

main();
