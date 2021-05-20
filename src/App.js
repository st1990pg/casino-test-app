import React, { useEffect, useState } from 'react';
import RegistrationPage from './pages/RegistrationPage';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const [loader, setLoader] = useState(true);
  const [language, setLanguage] = useState(LOCALES.ENGLISH);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const classes = useStyles();

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
          <div className="p-10">
            <div className={classes.root}>
              <Grid container spacing={3} className="mt-30">
                <Grid item sm={false} md={6}></Grid>
                <Grid item sm={12} md={6}>
                  <h1 className="white center bold">
                    <FormattedMessage id="WELCOME" />
                  </h1>
                  <Paper className={classes.paper} elevation={3}>
                    <RegistrationPage />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </TranslateProvider>
      </LanguageContext.Provider>
      {/* <LoaderMain display={loader} /> */}
    </div>
  );
};

export default App;
