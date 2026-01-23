// Map animal keywords to their corresponding image assets
import mouseImg from '../assets/1.mouse.png';
import cowImg from '../assets/2.cow.png';
import tigerImg from '../assets/3.tiger.png';
import rabbitImg from '../assets/4.rabbit.png';
import dragonImg from '../assets/5.dragon.png';
import snakeImg from '../assets/6.snake.png';
import horseImg from '../assets/7.horse.png';
import sheepImg from '../assets/8.sheep.png';
import monkeyImg from '../assets/9.monkey.png';
import chickenImg from '../assets/10.chicken.png';
import dogImg from '../assets/11.dog.png';
import pigImg from '../assets/12.pig.png';

// Dragon Scenes
import dragonScene1 from '../assets/5.1 dragon scene.png';
import dragonScene2 from '../assets/5.2 dragon scene.png';
import dragonScene3 from '../assets/5.3 dragon scene.png';
import dragonScene5 from '../assets/5.5 dragon scene.png';
import dragonScene6 from '../assets/5.6 dragon scene.png';

const ANIMAL_IMAGES: Record<string, string> = {
    '쥐': mouseImg, '자': mouseImg,
    '소': cowImg, '축': cowImg,
    '호랑이': tigerImg, '인': tigerImg,
    '토끼': rabbitImg, '묘': rabbitImg,
    '용': dragonImg, '청룡': dragonImg, '진': dragonImg,
    '뱀': snakeImg, '사': snakeImg,
    '말': horseImg, '오': horseImg,
    '양': sheepImg, '미': sheepImg,
    '원숭이': monkeyImg, '신': monkeyImg,
    '닭': chickenImg, '유': chickenImg,
    '개': dogImg, '술': dogImg,
    '돼지': pigImg, '해': pigImg,
};

const SCENE_IMAGES: Record<string, Record<number, string>> = {
    '용': {
        1: dragonScene1,
        2: dragonScene2,
        3: dragonScene3,
        5: dragonScene5,
        6: dragonScene6,
    },
    '청룡': {
        1: dragonScene1,
        2: dragonScene2,
        3: dragonScene3,
        5: dragonScene5,
        6: dragonScene6,
    }
};

export const getAnimalImage = (keyword: string): string | undefined => {
    const key = Object.keys(ANIMAL_IMAGES).find(k => keyword.includes(k));
    return key ? ANIMAL_IMAGES[key] : undefined;
};

export const getSceneImage = (animalKeyword: string, sceneNumber: number): string | undefined => {
    const key = Object.keys(SCENE_IMAGES).find(k => animalKeyword.includes(k));
    return key ? SCENE_IMAGES[key][sceneNumber] : undefined;
};
