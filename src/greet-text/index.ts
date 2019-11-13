import { examplesContext } from '../common';
import { GreetTextComponent } from './greet-text.component';

examplesContext.load(GreetTextComponent)(loaded => {
  console.log(loaded);
}).whenOff(reason => {
  console.error('Failed to load greet-text example', reason);
});
