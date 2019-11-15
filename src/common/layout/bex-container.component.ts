import { ProduceStyle, ThemeSupport } from '@wesib/generic';
import { Component } from '@wesib/wesib';
import { stypRoot } from 'style-producer';

@Component({
  name: 'bex-container',
  feature: {
    needs: ThemeSupport,
  },
})
export class BexContainerComponent {

  @ProduceStyle()
  style() {

    const root = stypRoot({
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'stretch',
      alignContent: 'flex-start',
    });

    root.rules.add('bex-nav', {
      flex: '0 1 200px',
    });
    root.rules.add('bex-body', {
      flex: '1 1 auto',
    });

    return root.rules;
  }

}
