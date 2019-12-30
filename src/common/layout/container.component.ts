import { ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext } from '@wesib/wesib';
import { stypRules, StypRules } from 'style-producer';
import { Examples__NS } from '../examples.ns';
import { mediaStyle, ThemeSettings } from '../theme';
import { MainComponent } from './main.component';
import { NavComponent } from './nav.component';

@Component({
  name: ['container', Examples__NS],
  feature: {
    needs: [
      MainComponent,
      NavComponent,
    ],
  },
})
export class ContainerComponent {

  constructor(private readonly _context: ComponentContext) {
  }

  @ProduceStyle()
  style(): StypRules {
    return this._context.get(Theme).style(ContainerStyle);
  }

}

const Container__qualifier = 'bex:container';

function ContainerStyle(theme: Theme): StypRules {

  const settings = theme.ref(ThemeSettings).read.keep;
  const { root: { rules } } = theme;

  return stypRules(
      rules.add(
          { u: [':', 'host'], $: Container__qualifier },
          {
            height: '100%',
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'stretch',
            alignContent: 'flex-start',
          },
      ).add(
          settings.thru(mediaStyle),
      ),
      rules.add(
          { u: [':', 'host'], $: [Container__qualifier, '@media:sm'] },
          {
            height: 'auto',
          },
      ),
  );
}
