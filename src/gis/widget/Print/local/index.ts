import english from './en';
import french from './fr';
import finnish from './fi';
import swedish from './sv';
import vietnam from './vi';
import chinese from './cn';

export type Translation = {
  PageSize: string;
  PageOrientation: string;
  Format: string;
  DPI: string;
  Generate: string;
};

export { english, french, finnish, swedish, vietnam, chinese };
