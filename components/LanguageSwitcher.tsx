import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/system';
import translate from './utils/i18n';

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 24,
  padding: 0,
  display: 'flex',
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#4caf50', // Replace with your desired color
        borderColor: '#4caf50', // Replace with your desired color
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 20,
    height: 20,
    boxShadow: 'none',
    color: 'white',
  },
  '& .MuiSwitch-track': {
    border: '1px solid #ccc',
    borderRadius: 24 / 2,
    opacity: 1,
    backgroundColor: '#ccc',
  },
}));

const LanguageSwitcher = () => {
  const { currentLocale, setCurrentLocale } = useLanguage();
  const [isEnglish, setIsEnglish] = useState(currentLocale === 'en');


  const handleLanguageToggle = () => {
    const newLocale = isEnglish ? 'fa' : 'en';
    setIsEnglish(!isEnglish);
    console.log("newLocale|"+newLocale)
    setCurrentLocale(newLocale);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginRight: '8px' }}>{translate('farsiLangLable', currentLocale)}</div>
      <CustomSwitch
        checked={isEnglish}
        onChange={handleLanguageToggle}
        name="languageSwitch"
        color="primary"
      />
      <div style={{ marginLeft: '8px' }}>{translate('englishLangLable', currentLocale)}</div>
    </div>
  );
};

export default LanguageSwitcher;
