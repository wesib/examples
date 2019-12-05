import { ProduceStyle, Theme } from '@wesib/generic';
import { BootstrapContext, Component, ComponentContext } from '@wesib/wesib';
import { stypRoot, StypRules } from 'style-producer';
import { BEX__NS } from '../bex.ns';
import { ThemeSettings } from '../theme';
import { MainComponent } from './main.component';
import { NavComponent, navLinkBackground } from './nav.component';

@Component({
  name: ['container', BEX__NS],
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
  async style(): Promise<StypRules> {

    const bsContext = this._context.get(BootstrapContext);
    const { elementDef: { name: navName } } = await bsContext.whenDefined(NavComponent);
    const { elementDef: { name: mainName } } = await bsContext.whenDefined(MainComponent);
    const theme = this._context.get(Theme);
    const settings = theme.ref(ThemeSettings).read.keep;

    const root = stypRoot({
      height: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'stretch',
      alignContent: 'flex-start',
    });

    root.rules.add(
        { e: navName },
        settings.thru(sts => ({
          flex: '0 1 200px',
          height: '100%',
          background: navLinkBackground(sts),
        })),
    );
    root.rules.add(
        { e: mainName },
        settings.thru(({ $fontSize }) => ({
          flex: '1 1 auto',
          margin: $fontSize,
        })),
    );

    return root.rules;
  }

}
