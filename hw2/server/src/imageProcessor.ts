import axios from 'axios';
import * as fs from 'fs';

class ImageProcessor {

    async processImage(imageUrl: string, filePath: string): Promise<void> {

        try {

            const response = await axios.get(imageUrl, { responseType: 'stream' });

            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            await new Promise<void>((resolve, reject) => {

                writer.on('finish', () => resolve());
                writer.on('error', (err) => reject(err));

            });

        } catch (error) { throw new Error(`Помилка при обробці зображення: ${error}`); }

    }

}

export default ImageProcessor;
