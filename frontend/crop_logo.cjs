const { Jimp } = require('jimp');
const path = require('path');

async function main() {
    const inputFile = path.join(__dirname, 'public', 'logo.png');
    const outputFile = path.join(__dirname, 'public', 'logo-circle.png');

    try {
        console.log('Reading image from:', inputFile);
        // In Jimp v1, read() is a static method on the Jimp class
        const image = await Jimp.read(inputFile);

        console.log('Cropping to circle...');
        image.circle();

        console.log('Saving to:', outputFile);
        await image.write(outputFile);

        console.log('Success!');
    } catch (error) {
        console.error('Error:', error);
        // Fallback for older Jimp versions if the above fails
        try {
            console.log('Attempting fallback import...');
            const OldJimp = require('jimp');
            const img = await OldJimp.read(inputFile);
            img.circle().write(outputFile);
            console.log('Success with fallback!');
        } catch (err2) {
            console.error('Fallback failed too:', err2);
        }
    }
}

main();
