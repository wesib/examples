import { ProduceStyle, Theme } from '@wesib/generic';
import { Component, ComponentContext, ComponentDef } from '@wesib/wesib';
import { stypRoot } from 'style-producer';
import { BEX__NS } from '../bex.ns';
import { ThemeSettings } from '../theme';
import { NavBodyComponent } from './nav-body.component';
import { NavComponent, navLinkBackground } from './nav.component';

@Component({
  name: ['container', BEX__NS],
})
export class ContainerComponent {

  private readonly _theme: Theme;

  constructor(context: ComponentContext) {
    this._theme = context.get(Theme);
  }

  @ProduceStyle()
  style() {

    const root = stypRoot({
      height: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'stretch',
      alignContent: 'flex-start',
    });

    const settings = this._theme.ref(ThemeSettings).read.keep;

    root.rules.add(
        { e: ComponentDef.of(NavComponent).name! },
        settings.thru(sts => ({
          flex: '0 1 200px',
          height: '100%',
          background: navLinkBackground(sts),
        })),
    );
    root.rules.add(
        { e: ComponentDef.of(NavBodyComponent).name! },
        settings.thru(({ $fontSize }) => ({
          flex: '1 1 auto',
          margin: $fontSize,
        })),
    );

    return root.rules;
  }

}
