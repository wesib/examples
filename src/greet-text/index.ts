import { noop } from 'call-thru';
import { examplesContext } from '../common';
import { GreetTextComponent } from './greet-text.component';

examplesContext.load(GreetTextComponent)(noop).whenOff(reason => {
  console.error('Failed to load greet-text example', reason);
});
