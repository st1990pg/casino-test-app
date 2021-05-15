import React, { useEffect, useState } from 'react';
import RegistrationPage from 'Pages/RegistrationPage';
import LoaderMain from 'Components/LoaderMain';
import { LanguageContext } from './contexts/language.context';
import TranslateProvider from './i18n/provired';
import LOCALES from './i18n/locales';
import { FormattedMessage } from 'react-intl';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const App = () => {
  const [loader, setLoader] = useState(true);
  const [language, setLanguage] = useState(LOCALES.ENGLISH);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{language}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setLanguage(LOCALES.ENGLISH)}>
            {LOCALES.ENGLISH}
          </DropdownItem>
          <DropdownItem onClick={() => setLanguage(LOCALES.SERBIAN)}>
            {LOCALES.SERBIAN}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <TranslateProvider locale={language}>
          <h1>
            <FormattedMessage id="HELLO" />
          </h1>
          {!loader && <RegistrationPage />}
        </TranslateProvider>
      </LanguageContext.Provider>
      <LoaderMain display={loader} />
    </div>
  );
};

export default App;
