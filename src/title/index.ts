import { noop } from 'call-thru';
import { examplesContext } from '../common';
import { BexTitleComponent } from './bex-title.component';

examplesContext.load(BexTitleComponent)(noop).whenOff(reason => {
  console.error('Failed to load title component', reason);
});
