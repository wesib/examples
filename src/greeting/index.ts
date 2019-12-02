import { noop } from 'call-thru';
import { examplesContext } from '../common';
import { GreetingComponent } from './greeting.component';

examplesContext.load(GreetingComponent)(noop).whenOff(reason => {
  console.error('Failed to load greet-text example', reason);
});
