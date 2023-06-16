import en from '../../locale/en.json';
import fa from '../../locale/fa.json';


const translations: { [key: string]: { [key: string]: string } } = {
    en,
    fa,
};

const translate = (key: string, language: string) => {    
    return translations[language][key];
};

export default translate;
