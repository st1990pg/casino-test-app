import { createContext } from 'react';
import LOCALES from '../i18n/locales';

export const LanguageContext = createContext(LOCALES.ENGLISH);
