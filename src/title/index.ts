import { noop } from 'call-thru';
import { examplesContext } from '../common';
import { TitleComponent } from './title.component';

examplesContext.load(TitleComponent)(noop).whenOff(reason => {
  console.error('Failed to load title component', reason);
});
