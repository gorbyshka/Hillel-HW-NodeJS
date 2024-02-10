import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import ImageProcessor from './imageProcessor';
import { UsersData } from './types/UserData';
import { UserType } from './types/UserType';

const app = express();
const port = 4000;

app.use(express.json());

app.post('/users', async (req: Request, res: Response) => {

    try {

        const { login, password }: UserType = req.body;

        if (!login || !password) return res.status(400).json({ message: 'Не вказано логін або пароль' });


        const folderPath = path.join(__dirname, 'database');
        fs.mkdirSync(folderPath, { recursive: true });

        const filePath = path.join(folderPath, 'db.json');

        let usersData: UsersData = { users: [] };

        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            usersData = JSON.parse(fileContent);
        }

        usersData.users.push({ login, password });

        fs.writeFileSync(filePath, JSON.stringify(usersData, null, 2));

        console.log(`Дані успішно записані в файл: ${filePath}`);

        res.status(201).json({ message: 'Користувач успішно створений' });

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'Помилка сервера при створенні користувача' });

    }

});

app.get('/api/v1/users', (req: Request, res: Response) => {

    try {

        const folderPath = path.join(__dirname, 'database');
        const filePath = path.join(folderPath, 'db.json');

        if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Файл користувачів не знайдено' });


        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const usersData: UsersData = JSON.parse(fileContent);

        res.status(200).json(usersData.users);

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'Помилка сервера при отриманні списку користувачів' });

    }

});

app.post('/process-image', async (req: Request, res: Response) => {
    
    try {

        const { imageUrl }: { imageUrl: string } = req.body;

        if (!imageUrl) return res.status(400).json({ message: 'Не вказано URL зображення' });
        

        const savePath = path.join(__dirname, 'images', 'image.png'); 

        const imageProcessor = new ImageProcessor();
        await imageProcessor.processImage(imageUrl, savePath); 

        res.status(200).json({ message: 'Зображення успішно оброблено та збережено' });

    } catch (error) {

        console.error('Помилка під час обробки зображення:', error);
        res.status(500).json({ message: 'Помилка сервера при обробці зображення' });

    }

});

app.listen(port, async () => console.log(`Сервер запущено на порті ${port}`));
